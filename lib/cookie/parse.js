/**
 * @fileoverview RFC 6265 and RFC 2109 cookie string parser using generators.
 *
 * Parses raw `Cookie` header strings into key-value maps using compiled regular expressions
 * derived from the RFC token/value grammars. Supports both RFC 6265 (strict) and RFC 2109
 * (loose/legacy) parsing modes.
 *
 * Multi-value cookies (same name appearing multiple times) are optionally aggregated into
 * arrays via the `collection` option. A `max` option enforces a limit on total cookie count
 * to protect against header-stuffing attacks.
 *
 * @module lib/cookie/parse
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../../utils/iterables/index.js
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6265 RFC 6265 - HTTP State Management Mechanism}
 * @see {@link https://www.rfc-editor.org/rfc/rfc2109 RFC 2109 - HTTP State Management Mechanism (obsoleted)}
 *
 * @example
 * import parse from 'ergo/lib/cookie/parse';
 *
 * parse('session=abc123; user=alice');
 * // => {session: 'abc123', user: 'alice'}
 *
 * parse('tag=a; tag=b', {collection: true});
 * // => {tag: ['a', 'b']}
 */
import {chain, reduce, map, forEach} from '../../utils/iterables/index.js';

export default parse;

/*
https://www.rfc-editor.org/rfc/rfc2109
https://www.rfc-editor.org/rfc/rfc6265
*/
const tokenRFC2109 = /[\x21-\x3a\x3c\x3e-\x7e]+/;
const valueRFC2109 = /[\x20-\x3a\x3c-\x7e]*/;

const tokenRFC6265 = /[\x21\x23-\x27\x2a\x2b\x2d\x2e\x30-\x39\x41-\x5a\x5c\x5e-\x7a\x7c\x7e]+/;
const valueRFC6265 = /[\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]*/;
const dblQuote = /\x22/;
const pairSeparator = /\x3d/;
const listSeparator = /(?:\x3b\x20+|$)/;
const matchRFC6265 = new RegExp(
  `(${tokenRFC6265.source})${pairSeparator.source}(?:(${dblQuote.source}?)(${valueRFC6265.source})\\2)?${listSeparator.source}`,
  'g'
);
const matchRFC2109 = new RegExp(
  `(${tokenRFC2109.source})\x20*(?:${pairSeparator.source}\x20*(${dblQuote.source}?)(${valueRFC2109.source})\\2\x20*)?${listSeparator.source}`,
  'g'
);

/**
 * Parses a `Cookie` header string into a key-value map.
 *
 * @param {string} [cookie=''] - Raw value of the `Cookie` HTTP header
 * @param {object} [options] - Parser configuration
 * @param {function} [options.decoder=v=>v] - Transform applied to each `[name, value]` pair
 * @param {boolean} [options.loose=false] - Use RFC 2109 (lenient) instead of RFC 6265 (strict) parsing
 * @param {boolean} [options.collection=true] - Aggregate duplicate names into arrays
 * @param {number} [options.max=50] - Maximum number of cookies; throws on excess
 * @returns {object} - Plain object of cookie name → value (or string[])
 * @throws {Error} If `max` is exceeded
 */
function parse(cookie = '', {decoder = v => v, loose = false, collection = true, max = 50} = {}) {
  const process = chain(
    matchGenerator(loose ? matchRFC2109 : matchRFC6265, cookie),
    forEach((v, i) => {
      if (i >= max) {
        throw new Error('too many cookies');
      }
    }),
    map(decoder),
    reduce((cookies, [name, value]) => {
      cookies[name] =
        collection && Object.hasOwn(cookies, name) ? [cookies[name], value].flat() : value;

      return cookies;
    }, Object.create(null))
  );

  return process;
}

/**
 * Generator that yields `[name, value]` pairs for all cookie matches in a string.
 *
 * @param {RegExp} re - Compiled RFC cookie regex (must have `g` flag)
 * @param {string} str - The raw cookie header string to scan
 * @yields {[string, string|undefined]} Name-value pair for each matched cookie
 */
function* matchGenerator(re, str) {
  let match;

  while ((match = re.exec(str)) !== null) {
    const [, name, , value] = match;

    yield [name, value];
  }
}
