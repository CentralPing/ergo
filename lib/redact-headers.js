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
 * Matching is case-insensitive (HTTP header names are case-insensitive per
 * RFC 9110). Both header keys and set entries are lowercased before comparison.
 *
 * When `redactSet` is falsy or empty, returns `headers` unchanged (no copy).
 *
 * @param {object} headers - Header object (e.g. from `res.getHeaders()`)
 * @param {Set<string>} [redactSet] - Header names to redact (case-insensitive)
 * @returns {object} - Copy with sensitive values replaced, or original if no redaction needed
 */
export function redactHeaders(headers, redactSet) {
  if (!redactSet?.size) return headers;
  const lower = new Set(Array.from(redactSet, h => h.toLowerCase()));
  const safe = Object.create(null);
  for (const [k, v] of Object.entries(headers)) {
    safe[k] = lower.has(k.toLowerCase()) ? REDACTED : v;
  }
  return safe;
}
