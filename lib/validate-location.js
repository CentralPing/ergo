/**
 * @fileoverview Location header URI scheme validation.
 *
 * Validates Location header values against dangerous URI schemes that could
 * facilitate XSS attacks if application code allows user-controlled data into
 * the location field. Provides defense-in-depth at the framework level against
 * CWE-601 (open redirect via dangerous schemes).
 *
 * @module lib/validate-location
 * @since 0.3.0
 */

/**
 * URI schemes that are never valid in HTTP Location headers.
 * These can facilitate XSS or code execution when browsers follow redirects.
 *
 * @type {Set<string>}
 */
const DANGEROUS_SCHEMES = new Set(['javascript', 'data', 'vbscript']);

/**
 * RFC 3986 Section 3.1 scheme grammar with leading whitespace tolerance.
 * scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
 *
 * @type {RegExp}
 */
const SCHEME_RE = /^[\s]*([a-zA-Z][a-zA-Z0-9+\-.]*):$/;

/**
 * Validate a Location header value, rejecting dangerous URI schemes.
 *
 * @param {string} location - Location header value to validate
 * @returns {string} - The location value unchanged if valid
 * @throws {TypeError} When the location contains a dangerous URI scheme
 */
export default function validateLocation(location) {
  const colonIdx = location.indexOf(':');
  if (colonIdx === -1) return location;

  const candidate = location.slice(0, colonIdx + 1);
  const match = SCHEME_RE.exec(candidate);
  if (!match) return location;

  const scheme = match[1].toLowerCase();
  if (DANGEROUS_SCHEMES.has(scheme)) {
    throw new TypeError(`Location header contains a dangerous URI scheme: "${scheme}"`);
  }

  return location;
}
