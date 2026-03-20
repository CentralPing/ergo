/**
 * @fileoverview Pure Prefer header parser (RFC 7240).
 *
 * Parses the HTTP `Prefer` request header into a plain object of preference
 * name-value pairs. Supports:
 * - Simple tokens (`respond-async` -> `{'respond-async': true}`)
 * - Token=value pairs (`return=minimal` -> `{return: 'minimal'}`)
 * - Quoted values (`foo="bar baz"` -> `{foo: 'bar baz'}`)
 * - Multiple comma-separated preferences
 * - Per-preference parameters after semicolons (stripped; only the main token is kept)
 *
 * Used by:
 * - `http/prefer.js` (ergo pipeline middleware)
 *
 * @module lib/prefer
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import parsePrefer from 'ergo/lib/prefer';
 *
 * parsePrefer('return=minimal');
 * // {return: 'minimal'}
 *
 * parsePrefer('respond-async, wait=100');
 * // {'respond-async': true, wait: '100'}
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7240 RFC 7240 - Prefer Header for HTTP}
 */

/**
 * Parse a Prefer header value into a preferences object.
 *
 * @param {string} [header] - Raw Prefer header value
 * @returns {object} - Map of preference name to value (string) or `true` for bare tokens
 */
export default function parsePrefer(header) {
  if (!header) return Object.create(null);

  const preferences = Object.create(null);

  for (const part of header.split(',')) {
    const [main] = part.split(';');
    const match = main.trim().match(/^([a-zA-Z][\w-]*)(?:\s*=\s*"([^"]*)"|\s*=\s*(\S+))?$/);

    if (match) {
      preferences[match[1]] = match[2] ?? match[3] ?? true;
    }
  }

  return preferences;
}
