/**
 * @fileoverview Query string parser for URL query strings and JSON:API parameters.
 *
 * Parses raw query strings (after `?`) into nested objects, supporting:
 * - Bracket notation: `fields[articles]=title` → `{fields: {articles: 'title'}}`
 * - Array notation: `include[]=a&include[]=b` → `{include: ['a', 'b']}`
 * - Comma-separated values: `sort=name,age` → `{sort: ['name', 'age']}`
 * - Repeated keys: `tag=a&tag=b` → `{tag: ['a', 'b']}`
 *
 * Used by `http/url.js` for URL query parsing and `lib/json-api-query` for
 * JSON:API query parameter parsing.
 *
 * @module lib/query
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../utils/set.js
 *
 * @example
 * import parse from 'ergo/lib/query';
 *
 * parse('include=author&fields%5Barticles%5D=title%2Cbody');
 * // => {include: 'author', fields: {articles: ['title', 'body']}}
 *
 * parse('tag=a&tag=b');
 * // => {tag: ['a', 'b']}
 */
import set from '../utils/set.js';

const subpropRegExp = /^([^[]+)(?:\[(.*)\]|)$/;

/**
 * Safely decode a URI component, returning the raw string on invalid sequences.
 * @param {string} s - Percent-encoded URI component
 * @returns {string} - Decoded string, or the raw input if decoding fails
 */
function safeDecode(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/**
 * Parses a query string into key-value pairs with support for bracket notation
 * and multi-value parameters.
 *
 * @param {string} query - Raw query string (portion after `?`)
 * @param {object} [options] - Parser options
 * @param {boolean} [options.split=true] - Split comma-separated values into arrays
 * @param {number} [options.maxPairs=256] - Maximum number of query pairs to parse (DoS protection)
 * @returns {object} - Parsed key-value object; multi-value keys become arrays
 */
export default (query, {split = true, maxPairs = 256} = {}) => {
  if (!query) {
    return Object.create(null);
  }

  // Single-pass parse: split on '&', decode, accumulate repeated keys
  const q = Object.create(null);
  const pairs = query.split('&');
  const limit = Math.min(pairs.length, maxPairs);

  for (let i = 0; i < limit; i++) {
    const pair = pairs[i];
    if (!pair) {
      continue;
    }
    const eqIdx = pair.indexOf('=');
    const rawKey = eqIdx === -1 ? pair : pair.slice(0, eqIdx);
    const rawVal = eqIdx === -1 ? '' : pair.slice(eqIdx + 1);
    const key = safeDecode(rawKey.replaceAll('+', ' '));
    const val = safeDecode(rawVal.replaceAll('+', ' '));

    if (key in q) {
      if (Array.isArray(q[key])) {
        q[key].push(val);
      } else {
        q[key] = [q[key], val];
      }
    } else {
      q[key] = val;
    }
  }

  const acc = Object.create(null);

  for (const [k, v] of Object.entries(q)) {
    let [, prop, subprop] = subpropRegExp.exec(k);
    let val = v;

    if (subprop === '') {
      val = [v].flat();
    } else {
      if (subprop !== undefined) {
        prop += `.${subprop}`;
      }

      if (typeof v === 'string' && v.includes(',') && split) {
        val = v.split(',').map(s => s.trim());
      }
    }

    set(acc, prop, val);
  }

  return acc;
};
