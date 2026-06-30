/**
 * @fileoverview Shared quoted-string sanitizer per RFC 7230 section 3.2.6.
 *
 * Escapes backslashes and double-quotes, then strips any character not in the
 * allowlist derived from the `qdtext` and `quoted-pair` productions:
 *   - HTAB (\t)
 *   - Printable ASCII (SP through ~, 0x20–0x7E)
 *   - obs-text and extended Unicode (U+0080–U+FFFF)
 *
 * The result is safe for inclusion between double-quote delimiters in HTTP
 * headers such as `WWW-Authenticate` and `Link`.
 *
 * @module lib/sanitize-quoted-string
 * @since 0.1.0
 */

/**
 * Escape a value for use inside a quoted-string per RFC 7230 section 3.2.6.
 *
 * @param {string} str - Raw value
 * @returns {string} - Value safe for inclusion between double-quote delimiters
 */
export default function sanitizeQuotedString(str) {
  return String(str)
    .replaceAll('\\', '\\\\')
    .replaceAll('"', '\\"')
    .replaceAll(/[^\t\x20-\x7e\u0080-\uffff]/g, '');
}
