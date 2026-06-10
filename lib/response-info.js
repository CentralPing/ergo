/**
 * @fileoverview Shared response information builder for post-send lifecycle hooks.
 *
 * Pure function that constructs a read-only response info snapshot for observation
 * callbacks. Contains no transport or framework dependencies — consumed by both
 * `http/handler.js` (standalone) and `ergo-router/lib/auto-wrap.js` (router mode).
 *
 * @module lib/response-info
 * @since 0.5.0
 */

/**
 * Build a response information snapshot for post-send observation hooks.
 *
 * @param {import('node:http').IncomingMessage} req - HTTP request
 * @param {import('node:http').ServerResponse} res - HTTP response (after send)
 * @param {number} startTime - High-resolution timestamp from `performance.now()` captured at handler entry
 * @returns {{statusCode: number, headers: object, method: string, url: string, bodySize: number | undefined, duration: number}} - Response information snapshot
 */
export default function buildResponseInfo(req, res, startTime) {
  const contentLength = res.getHeader('content-length');
  const parsed = contentLength !== undefined ? parseInt(String(contentLength), 10) : undefined;

  return {
    statusCode: res.statusCode,
    headers: res.getHeaders(),
    method: req.method,
    url: req.url,
    bodySize: parsed !== undefined && Number.isFinite(parsed) ? parsed : undefined,
    duration: performance.now() - startTime
  };
}
