/**
 * @fileoverview Shared OpenTelemetry tracing primitive.
 *
 * Provides a thin abstraction over `@opentelemetry/api` for span lifecycle
 * management. When `@opentelemetry/api` is installed and an SDK is registered,
 * spans are created and propagated normally. When no SDK is registered, the
 * OTEL API's built-in no-op implementations handle all calls with zero
 * functional overhead.
 *
 * This module is a shared primitive — no transport or framework dependencies.
 * Used by `http/tracing.js` (pipeline middleware) and available for direct
 * import by ergo-router or consumer code.
 *
 * @module lib/tracing
 * @since 0.1.0
 * @requires @opentelemetry/api
 *
 * @example
 * import {createTracer, SpanStatusCode} from '@centralping/ergo/lib/tracing';
 *
 * const tracer = createTracer('my-service');
 * const span = tracer.startSpan('operation', {attributes: {'http.method': 'GET'}});
 * // ... do work ...
 * span.setStatus({code: SpanStatusCode.OK});
 * span.end();
 */
import {trace, context, propagation, SpanStatusCode, SpanKind} from '@opentelemetry/api';

/**
 * Creates a named tracer instance from the global tracer provider.
 *
 * When no SDK is registered, `trace.getTracer()` returns a no-op tracer
 * that creates inert spans with zero overhead.
 *
 * @param {string} [name='@centralping/ergo'] - Instrumentation scope name
 * @param {string} [version] - Instrumentation scope version
 * @returns {import('@opentelemetry/api').Tracer} - OTEL Tracer instance
 */
export function createTracer(name = '@centralping/ergo', version) {
  return trace.getTracer(name, version);
}

/**
 * Extracts W3C trace context from incoming HTTP request headers.
 *
 * Delegates to the globally registered propagator (typically W3CTraceContextPropagator).
 * Returns the extracted context which can be used as a parent for new spans.
 *
 * @param {object} headers - Incoming request headers object (lowercase keys)
 * @returns {import('@opentelemetry/api').Context} - Extracted context (or ROOT_CONTEXT if none)
 */
export function extractContext(headers) {
  return propagation.extract(context.active(), headers, {
    get(carrier, key) {
      return carrier[key];
    },
    keys(carrier) {
      return Object.keys(carrier);
    }
  });
}

/**
 * Injects W3C trace context into outgoing response headers.
 *
 * Delegates to the globally registered propagator. Sets `traceparent` and
 * optionally `tracestate` headers on the response.
 *
 * @param {import('@opentelemetry/api').Context} ctx - Active context to propagate
 * @param {import('node:http').ServerResponse} res - HTTP response to inject headers into
 */
export function injectContext(ctx, res) {
  propagation.inject(ctx, res, {
    set(carrier, key, value) {
      if (!carrier.headersSent) {
        carrier.setHeader(key, value);
      }
    }
  });
}

/**
 * Maps an HTTP status code to the appropriate OTEL span status.
 *
 * Per OTEL semantic conventions for HTTP spans:
 * - 1xx-4xx → UNSET (client errors are not server failures)
 * - 5xx → ERROR
 *
 * @param {number} statusCode - HTTP response status code
 * @returns {{code: number, message?: string}} - OTEL SpanStatus object
 */
export function statusFromHttp(statusCode) {
  if (statusCode >= 500) {
    return {code: SpanStatusCode.ERROR, message: `HTTP ${statusCode}`};
  }
  return {code: SpanStatusCode.UNSET};
}

export {trace, context, propagation, SpanStatusCode, SpanKind};
