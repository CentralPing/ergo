/**
 * @fileoverview Shared header redaction utility.
 *
 * Pure function that replaces sensitive header values with a redaction marker.
 * Used by `http/handler.js` (responseInfo in onResponse hooks) and
 * `http/logger.js` (request/response log output). No transport or framework
 * dependencies — consumed by both ergo and ergo-router.
 *
 * @module lib/redact-headers
 * @since 0.7.0
 */

/** @type {string} */
const REDACTED = '[REDACTED]';

/**
 * Default set of header names to redact.
 *
 * Matches the set established in `http/logger.js` during Security Audit Pass 3:
 * `authorization`, `proxy-authorization`, `cookie`, `set-cookie`.
 *
 * @type {Set<string>}
 */
export const DEFAULT_REDACTED_HEADERS = new Set([
  'authorization',
  'proxy-authorization',
  'cookie',
  'set-cookie'
]);

/**
 * Return a copy of `headers` with values for names in `redactSet` replaced
 * by `'[REDACTED]'`.
 *
 * When `redactSet` is falsy or empty, returns `headers` unchanged (no copy).
 *
 * @param {object} headers - Header object (e.g. from `res.getHeaders()`)
 * @param {Set<string>} [redactSet] - Header names to redact
 * @returns {object} - Copy with sensitive values replaced, or original if no redaction needed
 */
export function redactHeaders(headers, redactSet) {
  if (!redactSet?.size) return headers;
  const safe = {};
  for (const [k, v] of Object.entries(headers)) {
    safe[k] = redactSet.has(k) ? REDACTED : v;
  }
  return safe;
}
