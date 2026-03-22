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
 * @version 0.2.0
 * @since 0.1.0
 *
 * @example
 * import {compose, timeout} from 'ergo';
 *
 * const pipeline = compose(
 *   [timeout({ms: 10000, statusCode: 504}), 'timeout'],
 *   (req, res, acc) => ({response: {body: await slowCall(), statusCode: 200}})
 * );
 */

/**
 * Creates a request timeout middleware.
 *
 * @param {object} [options] - Timeout configuration
 * @param {number} [options.ms=30000] - Timeout in milliseconds
 * @param {number} [options.statusCode=408] - HTTP status code on timeout (408 or 504)
 * @returns {function} - Ergo middleware `(req, res, domainAcc, responseAcc) => void`
 */
export default ({ms = 30000, statusCode = 408} = {}) => {
  return (req, res, domainAcc, responseAcc) => {
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
