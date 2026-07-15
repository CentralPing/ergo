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
 * @since 0.1.0
 * @requires ../utils/set.js
 *
 * @example
 * import parse from '@centralping/ergo/lib/query';
 *
 * parse('include=author&fields%5Barticles%5D=title%2Cbody');
 * // => {include: 'author', fields: {articles: ['title', 'body']}}
 *
 * parse('tag=a&tag=b');
 * // => {tag: ['a', 'b']}
 */
import {isArrayIndexSegment, trySet} from '../utils/set.js';

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
 * Whether a value is a traversable container (object, array, or function).
 * @param {*} value - Candidate value
 * @returns {boolean} - True when value can hold nested properties
 */
function isContainer(value) {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

/**
 * Read an own-property value at a dotted path, or `undefined` if any segment is missing.
 * @param {object} obj - Root object
 * @param {string} path - Dot-delimited path
 * @returns {*} - Value at path, or undefined when the path is incomplete
 */
function getOwnAtPath(obj, path) {
  let cur = obj;
  for (const segment of path.split('.')) {
    if (!isContainer(cur) || !Object.hasOwn(cur, segment)) {
      return undefined;
    }
    cur = cur[segment];
  }
  return cur;
}

/**
 * True when a nested write would mix Array indices with non-index keys under the same
 * container (shape first-wins). Array + non-index and plain-object + index both skip
 * (#381, #382). Numeric indices under Arrays and sibling non-index keys under objects
 * remain allowed.
 * @param {object} obj - Accumulator
 * @param {string} path - Dot-delimited destination path
 * @returns {boolean} - True when the next segment conflicts with the established shape
 */
function nestsShapeConflict(obj, path) {
  const segments = path.split('.');
  if (segments.length < 2) {
    return false;
  }
  let cur = obj;
  for (let i = 0; i < segments.length - 1; i++) {
    if (!isContainer(cur) || !Object.hasOwn(cur, segments[i])) {
      return false;
    }
    cur = cur[segments[i]];
    const nextIsIndex = isArrayIndexSegment(segments[i + 1]);
    if (Array.isArray(cur)) {
      if (!nextIsIndex) {
        return true;
      }
    } else if (nextIsIndex) {
      // Plain object / function: reject digit-index keys (symmetric to Array non-index skip).
      return true;
    }
  }
  return false;
}

/**
 * Parses a query string into key-value pairs with support for bracket notation
 * and multi-value parameters.
 *
 * @param {string} query - Raw query string (portion after `?`)
 * @param {object} [options] - Parser options
 * @param {boolean} [options.split=true] - Split comma-separated values into arrays
 * @param {number} [options.maxPairs=256] - Maximum number of query pairs to parse (DoS protection)
 * @param {number} [options.maxLength=8192] - Maximum raw query string length (prevents allocation bomb)
 * @returns {object} - Parsed key-value object; multi-value keys become arrays
 */
export default (query, {split = true, maxPairs = 256, maxLength = 8192} = {}) => {
  if (!query) {
    return Object.create(null);
  }

  const bounded = query.length > maxLength ? query.slice(0, maxLength) : query;

  // Single-pass parse: split on '&', decode, accumulate repeated keys
  const q = Object.create(null);
  const pairs = bounded.split('&');
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
    const match = subpropRegExp.exec(k);
    if (!match) continue;
    let [, prop, subprop] = match;
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

    // Bidirectional first-wins for scalar vs nested conflicts (#354, #379, #380, #381, #382):
    // - a=42&a[b]=99 → trySet throws ERGO_SET_PATH_TRAVERSE → skip nested
    // - a[b]=99&a=42 / a.b[c]=2&a.b=1 → skip replacing an existing container at path
    // - a=42&a[]=2 → skip replacing an existing scalar with an empty-bracket Array
    // - a[]=2&a[b]=1 → skip non-index nesting under an Array; a[0]&a[1] still allowed
    // - a[b]=y&a[0]=x → skip index under a plain object (symmetric shape lock)
    const existingAtPath = getOwnAtPath(acc, prop);
    if (isContainer(existingAtPath)) {
      continue;
    }
    if (existingAtPath !== undefined && Array.isArray(val)) {
      continue;
    }
    if (nestsShapeConflict(acc, prop)) {
      continue;
    }

    if (!trySet(acc, prop, val)) {
      continue;
    }
  }

  return acc;
};
