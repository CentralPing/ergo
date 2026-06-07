/**
 * @fileoverview Shared response timing primitive.
 *
 * Patches `res.writeHead` to inject an `X-Response-Time` header (or custom name)
 * just before headers flush. The timing value captures elapsed milliseconds from
 * the moment `applyResponseTiming` is called until `writeHead` fires.
 *
 * The patch is single-fire: after the first invocation, the original `writeHead`
 * is restored so subsequent calls are unpatched. A `headersSent` guard provides
 * defense-in-depth against edge cases where headers have already been flushed.
 *
 * Consumed by `http/handler.js` (standalone mode) and
 * `ergo-router/lib/auto-wrap.js` (router mode).
 *
 * @module lib/response-time
 * @since 0.5.0
 */

/** @type {string} */
export const DEFAULT_TIMING_HEADER = 'x-response-time';

/** @type {number} */
export const DEFAULT_TIMING_PRECISION = 3;

/**
 * Patch `res.writeHead` to inject a response timing header before headers flush.
 *
 * @param {import('node:http').ServerResponse} res - HTTP response object
 * @param {string} [header] - Header name (default: {@link DEFAULT_TIMING_HEADER})
 * @param {number} [precision] - Decimal places for millisecond value (default: {@link DEFAULT_TIMING_PRECISION})
 */
export default function applyResponseTiming(
  res,
  header = DEFAULT_TIMING_HEADER,
  precision = DEFAULT_TIMING_PRECISION
) {
  const start = performance.now();
  const originalWriteHead = res.writeHead;

  res.writeHead = function patchedWriteHead(...args) {
    res.writeHead = originalWriteHead;

    if (!this.headersSent) {
      const duration = (performance.now() - start).toFixed(precision);
      this.setHeader(header, duration);
    }

    return originalWriteHead.apply(this, args);
  };
}
