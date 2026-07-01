/**
 * @fileoverview Rate limiting shared primitives.
 *
 * Provides the core building blocks for both pipeline-level and transport-level
 * rate limiting. The `MemoryStore` implements a sliding-window counter using
 * per-key timestamp arrays. `checkRateLimit` computes the current state
 * (remaining quota, reset time, whether the client is limited) from any store
 * that implements the `hit(key, windowMs)` interface.
 *
 * Used by:
 * - `http/rate-limit.js` (ergo pipeline middleware)
 * - `ergo-router/lib/transport/rate-limit.js` (transport-level rate limiting)
 *
 * @module lib/rate-limit
 * @since 0.1.0
 *
 * @example
 * import {MemoryStore, checkRateLimit, defaultKeyGenerator} from '@centralping/ergo/lib/rate-limit';
 *
 * const store = new MemoryStore();
 * const key = defaultKeyGenerator(req);
 * const result = checkRateLimit(store, key, 100, 60000);
 * // result.limited === true when over quota
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6585#section-4 RFC 6585 Section 4 - 429 Too Many Requests}
 */

/**
 * In-memory sliding-window rate limit store.
 * Each key maps to an array of request timestamps. Expired entries are pruned
 * on every `hit()` call.
 */
export class MemoryStore {
  /**
   * @param {object} [options] - Store configuration
   * @param {number} [options.maxKeys=10000] - Maximum number of tracked keys before FIFO eviction
   * @param {function} [options.now=Date.now] - Clock function returning current time in milliseconds
   * @throws {TypeError} If maxKeys is not a positive integer
   * @throws {TypeError} If now is not a function
   */
  constructor({maxKeys = 10_000, now = Date.now} = {}) {
    if (!Number.isInteger(maxKeys) || maxKeys < 1) {
      throw new TypeError('maxKeys must be a positive integer');
    }
    if (typeof now !== 'function') {
      throw new TypeError('now must be a function');
    }

    this._hits = new Map();
    this._maxKeys = maxKeys;
    this._now = now;
  }

  /**
   * Record a hit and return the current count within the window.
   * @param {string} key - Client identifier
   * @param {number} windowMs - Window size in milliseconds
   * @returns {{count: number, resetMs: number}} - Current count and ms until the oldest entry expires
   */
  hit(key, windowMs) {
    const now = this._now();
    const cutoff = now - windowMs;
    let timestamps = this._hits.get(key);

    if (!timestamps) {
      timestamps = [];
      this._hits.set(key, timestamps);
    }

    while (timestamps.length && timestamps[0] <= cutoff) {
      timestamps.shift();
    }

    if (!timestamps.length) {
      // Delete-then-set refreshes Map insertion order for FIFO eviction
      this._hits.delete(key);
      timestamps = [now];
      this._hits.set(key, timestamps);
    } else {
      timestamps.push(now);
    }

    // Eviction is silent by design; custom stores can add observability
    if (this._hits.size > this._maxKeys) {
      const oldest = this._hits.keys().next().value;
      this._hits.delete(oldest);
    }

    const resetMs = timestamps[0] + windowMs - now;

    return {count: timestamps.length, resetMs};
  }

  /**
   * Clear all tracked keys, restoring the store to its initial state.
   * @returns {void}
   */
  reset() {
    this._hits.clear();
  }
}

/**
 * Compute rate limit state from a store hit.
 *
 * @param {object} store - Store implementing `hit(key, windowMs) => {count, resetMs}`
 * @param {string} key - Client identifier
 * @param {number} max - Maximum requests allowed per window
 * @param {number} windowMs - Window size in milliseconds
 * @returns {{count: number, remaining: number, reset: number, limited: boolean, retryAfter: number|undefined}}
 *   - `count`: total hits in the current window
 *   - `remaining`: requests remaining before limit
 *   - `reset`: Unix timestamp (seconds) when the window resets
 *   - `limited`: true when count exceeds max
 *   - `retryAfter`: seconds until retry is allowed (only when limited)
 */
export function checkRateLimit(store, key, max, windowMs) {
  const {count, resetMs} = store.hit(key, windowMs);
  const limited = count > max;

  return {
    count,
    remaining: Math.max(0, max - count),
    reset: Math.ceil((Date.now() + resetMs) / 1000),
    limited,
    retryAfter: limited ? Math.ceil(resetMs / 1000) : undefined
  };
}

/**
 * Default key generator: uses the remote IP address.
 * @param {object} req - HTTP request
 * @returns {string} - Client identifier
 */
export function defaultKeyGenerator(req) {
  return req.socket?.remoteAddress ?? 'unknown';
}
