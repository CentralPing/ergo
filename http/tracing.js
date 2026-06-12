/**
 * @fileoverview Pipeline tracing middleware factory for OpenTelemetry integration.
 *
 * Creates a middleware that:
 * 1. Extracts W3C trace context from incoming request headers
 * 2. Starts a root `ergo.pipeline` span under the extracted (or active) context
 * 3. Returns span metadata on the domain accumulator for downstream correlation
 *
 * The span is NOT ended by this middleware — it is ended by `handler.js` or
 * `auto-wrap.js` after `send()` completes, capturing the full request lifecycle.
 * This parallels the existing `_trace` pattern where debug tracing is initialized
 * before the pipeline and finalized after the pipeline.
 *
 * When no OTEL SDK is registered, all operations are no-ops (spans are inert,
 * context propagation is a passthrough). Zero overhead for the default case.
 *
 * Placement: first in Stage 1 (before logger) so trace context is available
 * for log correlation in `acc.log`.
 *
 * @module http/tracing
 * @since 0.1.0
 * @requires ../lib/tracing.js
 *
 * @example
 * import {compose, tracing, logger, handler} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   tracing(),
 *   logger(),
 *   // ... remaining middleware
 * );
 *
 * const server = http.createServer(handler(pipeline));
 */
import {createTracer, extractContext, injectContext, trace, SpanKind} from '../lib/tracing.js';
import {validateOptions} from '../lib/validate-options.js';

/** @type {Set<string>} */
const VALID_OPTIONS = new Set(['serviceName', 'version', 'tracer', 'attributes', 'perStage']);

/**
 * Creates a pipeline tracing middleware.
 *
 * @param {object} [options] - Tracing configuration
 * @param {string} [options.serviceName='@centralping/ergo'] - OTEL instrumentation scope name
 * @param {string} [options.version] - Instrumentation scope version
 * @param {import('@opentelemetry/api').Tracer} [options.tracer] - Pre-configured tracer instance
 *   (overrides serviceName/version if provided)
 * @param {object} [options.attributes] - Static span attributes added to every pipeline span
 * @param {boolean} [options.perStage=false] - Enable per-stage child spans in compose-with.
 *   When true, `domainAcc.trace.tracer` is populated so compose-with creates child spans
 *   per middleware step.
 */
export default (options = {}) => {
  validateOptions(options, VALID_OPTIONS, 'tracing');
  const {serviceName, version, tracer, attributes, perStage = false} = options;
  const resolvedTracer = tracer ?? createTracer(serviceName, version);

  const inner = function tracingMiddleware(req, res) {
    const parentContext = extractContext(req.headers);

    const span = resolvedTracer.startSpan(
      'ergo.pipeline',
      {
        kind: SpanKind.SERVER,
        attributes: {
          'http.method': req.method,
          'http.url': req.url,
          ...attributes
        }
      },
      parentContext
    );

    const activeCtx = trace.setSpan(parentContext, span);

    injectContext(activeCtx, res);

    const spanContext = span.spanContext();

    return {
      value: {
        span,
        tracer: perStage ? resolvedTracer : undefined,
        activeContext: perStage ? activeCtx : undefined,
        parentContext,
        traceId: spanContext.traceId,
        spanId: spanContext.spanId
      }
    };
  };

  Object.defineProperty(inner, 'setPath', {value: 'trace'});
  return inner;
};
