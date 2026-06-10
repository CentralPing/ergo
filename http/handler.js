/**
 * @fileoverview HTTP request handler factory (v2 two-accumulator model).
 *
 * Creates a request handler suitable for `http.createServer()` that:
 * 1. Creates a fresh domain accumulator and response accumulator per request.
 * 2. Runs the composed pipeline with both accumulators.
 * 3. On unexpected errors, sets `responseAcc.statusCode = 500` (unless already set by
 *    timeout or an earlier pipeline break) and emits the error on the response for
 *    any listeners.
 * 4. Populates `responseAcc.instance` from the `x-request-id` header (runs on all
 *    paths — pipeline breaks, caught errors, and normal completion).
 * 5. Calls `send()` exactly once with both accumulators.
 *
 * This is the standalone equivalent of ergo-router's `auto-wrap.js` — for users who
 * compose middleware directly without the router.
 *
 * @module http/handler
 * @since 0.1.0
 *
 * @example
 * import {handler, compose, logger, authorization, body} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   {fn: logger(), setPath: 'log'},
 *   {fn: authorization({strategies}), setPath: 'auth'},
 *   {fn: body(), setPath: 'body'},
 *   (req, res, acc) => ({response: {body: processRequest(acc), statusCode: 200}})
 * );
 *
 * const server = http.createServer(handler(pipeline));
 */
import {STATUS_CODES} from 'node:http';
import {accumulator} from '../utils/compose.js';
import {createResponseAcc} from '../utils/compose-with.js';
import attachInstance from '../lib/attach-instance.js';
import applyResponseTiming, {
  DEFAULT_TIMING_HEADER,
  DEFAULT_TIMING_PRECISION
} from '../lib/response-time.js';
import {statusFromHttp} from '../lib/tracing.js';
import buildResponseInfo from '../lib/response-info.js';
import createSend, {SEND_VALID_OPTIONS} from './send.js';
import {validateOptions} from '../lib/validate-options.js';

/** @type {Set<string>} */
const VALID_OPTIONS = new Set([
  'debug',
  'onResponse',
  'redactErrors',
  'timing',
  ...SEND_VALID_OPTIONS
]);

/**
 * Creates the outermost request handler.
 *
 * @param {function} pipeline - Composed middleware pipeline
 * @param {object} [options] - Handler options
 * @param {boolean} [options.debug=false] - Enable pipeline debug tracing. When true,
 *   `responseAcc._trace` is initialized before the pipeline runs. On error responses
 *   (>= 400), `_trace` appears as an RFC 9457 extension member with `{steps, breakAt}`.
 * @param {function} [options.onResponse] - Post-send lifecycle observation hook. Called
 *   after `send()` completes with `(req, res, responseInfo, domainAcc)`. Errors thrown
 *   by the hook are swallowed — the hook cannot affect the response. Async hooks are
 *   awaited (blocking handler return until the hook completes). `responseInfo` provides
 *   a snapshot: `{statusCode, headers, method, url, bodySize, duration}`. For stream
 *   bodies, `bodySize` is `undefined` (headers are committed but body may not be fully sent).
 * @param {boolean} [options.redactErrors=true] - Control whether caught 5xx exception
 *   messages appear in the RFC 9457 response `detail` field. When `true` (default),
 *   `detail` is set to generic status text (e.g. "Internal Server Error"). When `false`,
 *   `err.message` is passed through for 5xx responses only — 4xx responses always use
 *   generic status text regardless of this setting. Stack traces are never exposed.
 *   **Security:** only set to `false` in development — production deployments should
 *   always redact to prevent information leakage.
 * @param {boolean|object} [options.timing=false] - Inject an `X-Response-Time` header
 *   measuring the full request lifecycle (pipeline + error handling + send). Pass `true`
 *   for defaults, or `{header?: string, precision?: number}` for custom configuration.
 *   Zero overhead when disabled.
 * @param {boolean} [options.prettify] - Forwarded to `send()`.
 * @param {string[]} [options.vary] - Forwarded to `send()`.
 * @param {boolean} [options.etag] - Forwarded to `send()`.
 * @param {boolean} [options.prefer] - Forwarded to `send()`.
 * @param {boolean} [options.paginate] - Forwarded to `send()`.
 * @param {boolean|function} [options.envelope] - Forwarded to `send()`.
 * @param {function} [options.errorFormatter] - Forwarded to `send()`. Custom error body
 *   formatter for 4xx/5xx responses.
 * @param {Record<number|string, object>} [options.responseSchema] - Forwarded to `send()`.
 *   Map of status code (or range key like `'2xx'`, `'2XX'`, `'default'`) to JSON Schema
 *   objects. When provided, response bodies for matching success status codes are projected
 *   through a compiled schema projector that strips undeclared properties before serialization.
 *   Only applies to Object bodies with `statusCode < 400`. Resolution order: exact match →
 *   range → default.
 */
export default (pipeline, options = {}) => {
  validateOptions(options, VALID_OPTIONS, 'handler');
  const {debug = false, onResponse, redactErrors = true, timing = false, ...rest} = options;
  const sendOptions = Object.fromEntries(
    Object.entries(rest).filter(([k]) => SEND_VALID_OPTIONS.has(k))
  );
  const send = createSend(sendOptions);

  const timingHeader =
    timing && typeof timing === 'object'
      ? (timing.header ?? DEFAULT_TIMING_HEADER)
      : DEFAULT_TIMING_HEADER;
  const timingPrecision =
    timing && typeof timing === 'object'
      ? (timing.precision ?? DEFAULT_TIMING_PRECISION)
      : DEFAULT_TIMING_PRECISION;

  return async (req, res) => {
    const startTime = performance.now();
    const domainAcc = accumulator();
    const responseAcc = createResponseAcc();
    if (debug) responseAcc._trace = {steps: [], breakAt: undefined};
    if (timing) applyResponseTiming(res, timingHeader, timingPrecision);

    try {
      await pipeline(req, res, responseAcc, domainAcc);
    } catch (err) {
      if (responseAcc.statusCode === undefined) {
        responseAcc.statusCode = 500;
      }

      const statusText = STATUS_CODES[responseAcc.statusCode] ?? STATUS_CODES[500];
      responseAcc.detail ??=
        !redactErrors && responseAcc.statusCode >= 500
          ? String(err?.message ?? '') || statusText
          : statusText;

      if (res.listenerCount('error') > 0) {
        res.emit('error', err);
      }

      const span = domainAcc.trace?.span;
      if (span) {
        span.recordException(err);
      }
    }

    attachInstance(responseAcc, res);

    try {
      send(req, res, responseAcc, domainAcc);
    } catch {
      if (!res.writableEnded) {
        res.statusCode = 500;
        res.end();
      }
    }

    if (onResponse) {
      try {
        await onResponse(req, res, buildResponseInfo(req, res, startTime), domainAcc);
      } catch {
        /* observation hook errors are swallowed */
      }
    }

    const span = domainAcc.trace?.span;
    if (span) {
      const code = responseAcc.statusCode ?? res.statusCode;
      span.setAttribute('http.status_code', code);
      span.setStatus(statusFromHttp(code));
      span.end();
    }
  };
};
