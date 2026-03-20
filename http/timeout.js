/**
 * @fileoverview HTTP middleware factory for request timeouts.
 *
 * Races the downstream pipeline against a configurable deadline.
 * Throws 408 Request Timeout (client-facing) or 504 Gateway Timeout
 * depending on configuration.
 *
 * Uses a cancellable setTimeout + res 'close' listener. When the deadline
 * fires before the response ends, the request is destroyed with the
 * appropriate HTTP error. When the response completes normally, the timer
 * is cleared immediately so the req/res closure can be GC'd -- avoiding
 * the 30-second retention that AbortSignal.timeout() would impose.
 *
 * @module http/timeout
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, timeout} from 'ergo';
 *
 * // Apply 10s timeout; use 504 for a gateway/proxy scenario
 * const pipeline = compose(
 *   timeout({ms: 10000, statusCode: 504}),
 *   (req, res, acc) => slowExternalCall(acc),
 *   send()
 * );
 */

import httpErrors from '../utils/http-errors.js';

/**
 * Creates a request timeout middleware.
 *
 * @param {object} [options] - Timeout configuration
 * @param {number} [options.ms=30000] - Timeout in milliseconds
 * @param {number} [options.statusCode=408] - HTTP status code on timeout (408 or 504)
 * @returns {function} - Ergo middleware `(req, res) => void` that arms a cancellable timer
 */
export default ({ms = 30000, statusCode = 408} = {}) => {
  return (req, res) => {
    const timer = setTimeout(() => {
      if (!req.destroyed) {
        req.destroy(
          httpErrors(statusCode, {
            message: `Request timed out after ${ms}ms`
          })
        );
      }
    }, ms);

    // Clear the timer as soon as the response finishes (or the connection
    // closes early), releasing the req/res closure for immediate GC.
    res.on('close', () => clearTimeout(timer));
  };
};
