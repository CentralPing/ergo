/**
 * @fileoverview Shared quoted-string sanitizer per RFC 7230 section 3.2.6.
 *
 * Escapes backslashes and double-quotes and strips control characters (all CTL chars
 * except HTAB, which is valid in `qdtext` per RFC 7230 §3.2.6) so the result is safe
 * for inclusion between double-quote delimiters in HTTP headers such as
 * `WWW-Authenticate`, `Link`, and `Set-Cookie`.
 *
 * @module lib/sanitize-quoted-string
 * @version 0.1.0
 * @since 0.1.0
 */

/**
 * Escape a value for use inside a quoted-string per RFC 7230 section 3.2.6.
 *
 * @param {string} str - Raw value
 * @returns {string} - Value safe for inclusion between double-quote delimiters
 */
export default function sanitizeQuotedString(str) {
  return (
    String(str)
      .replaceAll('\\', '\\\\')
      .replaceAll('"', '\\"')
      // eslint-disable-next-line no-control-regex -- intentional: strip CTLs per RFC 7230 §3.2.6
      .replaceAll(/[\x00-\x08\x0a-\x1f\x7f]/g, '')
  );
}
