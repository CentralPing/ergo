/**
 * @fileoverview Shared Vary header utility.
 *
 * Appends tokens to the `Vary` response header without duplicating existing tokens.
 * Uses Set-based deduplication with case-insensitive comparison.
 *
 * @module lib/vary
 * @version 0.1.0
 * @since 0.1.0
 */

/**
 * Append a Vary token (or comma-separated tokens) to the response, avoiding duplicates.
 *
 * @param {import('node:http').ServerResponse} res - HTTP response object
 * @param {string} value - Token(s) to append (e.g. "Accept-Encoding" or "Accept, Accept-Encoding")
 */
export default function appendVary(res, value) {
  const existing = res.getHeader('Vary');

  if (!existing) {
    res.setHeader('Vary', value);
    return;
  }

  const tokens = new Set(
    String(existing)
      .toLowerCase()
      .split(/,\s*/)
      .map(s => s.trim())
  );
  const toAdd = value
    .split(',')
    .map(s => s.trim())
    .filter(t => !tokens.has(t.toLowerCase()));

  if (toAdd.length) {
    res.setHeader('Vary', `${existing}, ${toAdd.join(', ')}`);
  }
}
