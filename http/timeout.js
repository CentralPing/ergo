/**
 * @fileoverview HTTP middleware factory for request timeouts (v2).
 *
 * Races the downstream pipeline against a configurable deadline.
 * When the deadline fires, sets `responseAcc.statusCode` and `responseAcc.detail`
 * via closure access, then destroys the request (without an error argument).
 * The pipeline's catch block detects the pre-set statusCode and skips error
 * formatting.
 *
 * Uses a cancellable setTimeout + res 'close' listener. When the response
 * completes normally, the timer is cleared immediately so the req/res closure
 * can be GC'd.
 *
 * @module http/timeout
 * @since 0.1.0
 *
 * @example
 * import {compose, timeout} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   {fn: timeout({ms: 10000, statusCode: 504}), setPath: 'timeout'},
 *   (req, res, acc) => ({response: {body: await slowCall(), statusCode: 200}})
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.9 RFC 9110 Section 15.5.9 - 408 Request Timeout}
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110.html#section-15.6.5 RFC 9110 Section 15.6.5 - 504 Gateway Timeout}
 */

import {validateOptions} from '../lib/validate-options.js';

/** @type {Set<string>} */
const VALID_OPTIONS = new Set(['ms', 'statusCode']);

const DEFAULT_TIMEOUT_MS = 30_000;
const STATUS_CODE_REQUEST_TIMEOUT = 408;
const STATUS_CODE_GATEWAY_TIMEOUT = 504;
const DEFAULT_STATUS_CODE = STATUS_CODE_REQUEST_TIMEOUT;
const VALID_TIMEOUT_STATUS_CODES = new Set([
  STATUS_CODE_REQUEST_TIMEOUT,
  STATUS_CODE_GATEWAY_TIMEOUT
]);

/**
 * Creates a request timeout middleware.
 *
 * @param {object} [options] - Timeout configuration
 * @param {number} [options.ms=DEFAULT_TIMEOUT_MS] - Timeout in milliseconds
 * @param {408|504} [options.statusCode=DEFAULT_STATUS_CODE] - HTTP status code on timeout
 *   (`STATUS_CODE_REQUEST_TIMEOUT` or `STATUS_CODE_GATEWAY_TIMEOUT`)
 * @returns {function(import('node:http').IncomingMessage, import('node:http').ServerResponse, object, object): void} -
 *   Side-effect middleware that arms a deadline timer against `responseAcc`
 * @throws {TypeError} When `ms` or `statusCode` fail construction-time validation
 */
export default (options = {}) => {
  validateOptions(options, VALID_OPTIONS, 'timeout');
  const {ms = DEFAULT_TIMEOUT_MS, statusCode = DEFAULT_STATUS_CODE} = options;

  if (!Number.isFinite(ms) || ms <= 0) {
    throw new TypeError('timeout(): "ms" option must be a positive finite number');
  }
  if (!VALID_TIMEOUT_STATUS_CODES.has(statusCode)) {
    throw new TypeError(
      `timeout(): "statusCode" option must be ${STATUS_CODE_REQUEST_TIMEOUT} or ${STATUS_CODE_GATEWAY_TIMEOUT}`
    );
  }

  return function timeoutMiddleware(req, res, domainAcc, responseAcc) {
    const timer = setTimeout(() => {
      if (!req.destroyed) {
        responseAcc.statusCode = statusCode;
        responseAcc.detail = `Request timed out after ${ms}ms`;
        req.destroy();
      }
    }, ms);

    res.on('close', () => clearTimeout(timer));
  };
};
