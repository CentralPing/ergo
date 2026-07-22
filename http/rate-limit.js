/**
 * @fileoverview Rate limiting pipeline middleware (RFC 6585 §4).
 *
 * Tracks request counts per client key within a configurable time window.
 * Returns rate-limit header tuples for the response accumulator on every
 * request (allowed and limited). When the limit is exceeded, also returns
 * `{response: {statusCode: 429, retryAfter, headers}}`.
 *
 * Placed in Stage 1 (Negotiation) for Fast Fail — the check is a cheap
 * counter lookup that short-circuits before authorization, body parsing,
 * or execution.
 *
 * @module http/rate-limit
 * @since 0.1.0
 * @requires ../lib/rate-limit.js
 *
 * @example
 * import {compose, rateLimit} from '@centralping/ergo';
 *
 * // response-only — use as plain function
 * const pipeline = compose(
 *   rateLimit({max: 100, windowMs: 60000}),
 *   (req, res, acc) => ({response: {statusCode: 200, body: {ok: true}}})
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6585#section-4 RFC 6585 Section 4 - 429 Too Many Requests}
 */
import {MemoryStore, checkRateLimit, defaultKeyGenerator} from '../lib/rate-limit.js';
import {validateOptions} from '../lib/validate-options.js';

/** @type {Set<string>} */
const VALID_OPTIONS = new Set(['max', 'windowMs', 'store', 'keyGenerator']);

const DEFAULT_MAX_REQUESTS = 100;
const DEFAULT_WINDOW_MS = 60_000;

/**
 * Create a rate limiting middleware.
 *
 * @param {object} [options]
 * @param {number} [options.max=DEFAULT_MAX_REQUESTS] - Maximum requests per window
 * @param {number} [options.windowMs=DEFAULT_WINDOW_MS] - Window size in milliseconds (default: 1 minute)
 * @param {object} [options.store] - Pluggable store implementing
 *   `hit(key, windowMs) => {count: number, resetMs: number, resetAt: number}`
 * @param {function} [options.keyGenerator] - `(req) => string` client identifier (default: remote IP)
 * @returns {function(import('node:http').IncomingMessage): {response: {statusCode: 429, retryAfter: number, headers: [string, string][]}} | {response: {headers: [string, string][]}}} -
 *   Middleware that returns rate-limit headers on every request; adds `statusCode`/`retryAfter` when limited
 * @throws {TypeError} When `max`, `windowMs`, `store`, or `keyGenerator` fail construction-time validation
 */
export default function rateLimit(options = {}) {
  validateOptions(options, VALID_OPTIONS, 'rateLimit');
  const {max = DEFAULT_MAX_REQUESTS, windowMs = DEFAULT_WINDOW_MS, store, keyGenerator} = options;

  if (!Number.isInteger(max) || max < 1) {
    throw new TypeError('rateLimit(): "max" option must be a positive integer');
  }
  if (!Number.isFinite(windowMs) || windowMs <= 0) {
    throw new TypeError('rateLimit(): "windowMs" option must be a positive finite number');
  }
  if (store !== undefined && typeof store?.hit !== 'function') {
    throw new TypeError('rateLimit(): "store" option must implement hit(key, windowMs)');
  }
  if (keyGenerator !== undefined && typeof keyGenerator !== 'function') {
    throw new TypeError('rateLimit(): "keyGenerator" option must be a function');
  }

  const _store = store ?? new MemoryStore();
  const _keyGen = keyGenerator ?? defaultKeyGenerator;
  const limitValue = String(max);

  /**
   * @param {number} remaining
   * @param {number} reset
   * @returns {[string, string][]}
   */
  function rateLimitHeaderTuples(remaining, reset) {
    return [
      ['X-RateLimit-Limit', limitValue],
      ['X-RateLimit-Remaining', String(remaining)],
      ['X-RateLimit-Reset', String(reset)]
    ];
  }

  return function rateLimitMiddleware(req) {
    const result = checkRateLimit(_store, _keyGen(req), max, windowMs);
    const headers = rateLimitHeaderTuples(result.remaining, result.reset);

    if (result.limited) {
      return {
        response: {
          statusCode: 429,
          retryAfter: result.retryAfter,
          headers
        }
      };
    }

    return {
      response: {headers}
    };
  };
}
