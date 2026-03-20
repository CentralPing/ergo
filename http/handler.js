/**
 * @fileoverview HTTP middleware factory for request pipeline execution and error handling.
 *
 * Wraps a try pipeline and optional catch pipeline. If the try pipeline throws, the error
 * is normalized (ensuring a `statusCode`), emitted on the response, and forwarded to the
 * catch pipeline (defaulting to `send()` for automatic error serialization).
 *
 * This is the outermost wrapper for any Ergo request handler. It must be the last function
 * passed to `http.createServer()`.
 *
 * @module http/handler
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../utils/attempt.js
 * @requires ../utils/compose-with.js
 *
 * @example
 * import {handler, compose, send, logger, authorization, body} from 'ergo';
 *
 * const pipeline = compose(
 *   [logger(), [], 'log'],
 *   [authorization({strategies}), [], 'auth'],
 *   [body(), [], 'body'],
 *   (req, res, acc) => ({result: processRequest(acc)}),
 *   send()
 * );
 *
 * // Pass to http.createServer -- errors are automatically caught and serialized
 * const server = http.createServer(handler(pipeline, send()));
 */
import attempt from '../utils/attempt.js';
import compose from '../utils/compose-with.js';

const statusCode = 500;

/**
 * Creates the outermost request handler that wraps a try pipeline with error handling.
 *
 * @param {function} tryFn - Primary request pipeline (composed middleware)
 * @param {function} catchFn - Error handling pipeline (typically send())
 * @param {object} [options] - Handler options
 * @param {string} [options.setPath] - Dot-path to store the formatted error result on the accumulator
 * @returns {function} - Async handler suitable for `http.createServer()`
 */
export default (tryFn, catchFn, {setPath} = {}) => {
  return attempt(tryFn, compose([formatError, [], setPath], catchFn));
};

/**
 * Normalizes an error into an accumulator-compatible result for `send()`.
 *
 * Assigns a default `statusCode` of 500 if not present, auto-populates the RFC 9457
 * `instance` field from the request ID when available, emits the error event on the
 * response, and returns a structured result containing the status code, error body, and
 * any custom headers the error carries.
 *
 * @param {import('node:http').IncomingMessage} req - Incoming HTTP request
 * @param {import('node:http').ServerResponse} res - HTTP response (receives error event)
 * @param {Error} err - Error to normalize; must have optional `statusCode`, `headers`
 * @returns {{statusCode: number, body: Error, headers: Array|undefined}} - Normalized error result
 */
function formatError(req, res, err) {
  err.statusCode ??= statusCode;
  err.status ??= err.statusCode;

  // Auto-populate RFC 9457 instance from request ID (set by ergo-router transport or logger)
  if (err.instance === undefined) {
    const requestId = res.getHeader?.('x-request-id');
    if (requestId) err.instance = `urn:uuid:${requestId}`;
  }

  // Emit error on response for any listeners (only if there are listeners to prevent
  // the EventEmitter default behavior of throwing when no 'error' listener exists)
  if (res.listenerCount('error') > 0) {
    res.emit('error', err);
  }

  return {
    statusCode: err.statusCode,
    body: err,
    headers: err.headers
  };
}
