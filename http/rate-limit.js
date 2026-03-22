/**
 * @fileoverview Rate limiting pipeline middleware (RFC 6585 §4).
 *
 * Tracks request counts per client key within a configurable time window.
 * Returns rate-limit header tuples for the response accumulator on allowed requests;
 * returns `{response: {statusCode: 429, retryAfter}}` when the limit is exceeded.
 *
 * Placed in Stage 1 (Negotiation) for Fast Fail — the check is a cheap
 * counter lookup that short-circuits before authorization, body parsing,
 * or execution.
 *
 * @module http/rate-limit
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../lib/rate-limit.js
 *
 * @example
 * import {compose, rateLimit} from 'ergo';
 *
 * const pipeline = compose(
 *   [rateLimit({max: 100, windowMs: 60000}), 'rateLimit'],
 *   (req, res, acc) => ({response: {statusCode: 200, body: {ok: true}}})
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6585#section-4 RFC 6585 Section 4 - 429 Too Many Requests}
 */
import {MemoryStore, checkRateLimit, defaultKeyGenerator} from '../lib/rate-limit.js';

/**
 * Create a rate limiting middleware.
 *
 * @param {object} [options]
 * @param {number} [options.max=100] - Maximum requests per window
 * @param {number} [options.windowMs=60000] - Window size in milliseconds (default: 1 minute)
 * @param {object} [options.store] - Pluggable store (must implement `hit(key, windowMs)`)
 * @param {function} [options.keyGenerator] - `(req) => string` client identifier (default: remote IP)
 * @returns {function} - Middleware `(req) => {response}` that returns rate-limit header tuples on allowed
 *   requests and `{response: {statusCode: 429, retryAfter}}` when the limit is exceeded
 */
export default function rateLimit({max = 100, windowMs = 60000, store, keyGenerator} = {}) {
  const _store = store ?? new MemoryStore();
  const _keyGen = keyGenerator ?? defaultKeyGenerator;

  return req => {
    const result = checkRateLimit(_store, _keyGen(req), max, windowMs);

    if (result.limited) {
      return {
        response: {
          statusCode: 429,
          retryAfter: result.retryAfter
        }
      };
    }

    return {
      response: {
        headers: [
          ['X-RateLimit-Limit', String(max)],
          ['X-RateLimit-Remaining', String(result.remaining)],
          ['X-RateLimit-Reset', String(result.reset)]
        ]
      }
    };
  };
}
