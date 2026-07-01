/**
 * @fileoverview Location header URI-reference validation.
 *
 * Validates Location header values against the RFC 3986 §2 URI-reference
 * character repertoire and rejects dangerous URI schemes that could facilitate
 * XSS attacks. Provides defense-in-depth at the framework level against
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
 * RFC 3986 §2 URI-reference character repertoire: unreserved, reserved, and
 * well-formed percent-encoded triplets. Characters outside this set are never
 * valid in a URI-reference and are rejected outright.
 *
 * @type {RegExp}
 */
const URI_REF_CHARS_RE = /^(?:%[0-9A-Fa-f]{2}|[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=])+$/;

/**
 * RFC 3986 §3.1 scheme grammar.
 * scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
 *
 * @type {RegExp}
 */
const SCHEME_RE = /^([a-zA-Z][a-zA-Z0-9+\-.]*):$/;

/**
 * Validate a Location header value against the RFC 3986 URI-reference
 * character repertoire and reject dangerous URI schemes.
 *
 * @param {string} location - Location header value to validate
 * @returns {string} The location value unchanged if valid
 * @throws {TypeError} When the location contains characters not permitted
 *   in a URI-reference (RFC 3986 §2)
 * @throws {TypeError} When the location contains a dangerous URI scheme
 */
export default function validateLocation(location) {
  if (location === '') return location;

  if (!URI_REF_CHARS_RE.test(location)) {
    throw new TypeError('Location header contains characters not permitted in a URI-reference');
  }

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
