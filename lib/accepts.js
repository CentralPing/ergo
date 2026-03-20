/**
 * @fileoverview Core content negotiation logic using the `negotiator` library.
 *
 * Provides a configurable negotiation factory that matches request `Accept*` headers
 * against allowed types, languages, charsets, and encodings. Used by `http/accepts.js`
 * as the pure-logic backing implementation.
 *
 * @module lib/accepts
 * @version 0.1.0
 * @since 0.1.0
 * @requires negotiator
 * @requires ../utils/flat-array.js
 *
 * @example
 * import accepts from 'ergo/lib/accepts';
 *
 * const negotiate = accepts({types: ['application/json', 'text/html']});
 * const result = negotiate({'accept': 'text/html,application/json;q=0.9'});
 * // result.type => 'text/html'
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110#section-12.5 RFC 9110 Section 12.5 - Content Negotiation}
 */
import Negotiator from 'negotiator';

import flatArray from '../utils/flat-array.js';

/**
 * Creates a content negotiation function for the given preference lists.
 *
 * @param {object} [options] - Negotiation preferences
 * @param {string|string[]} [options.types] - Acceptable media types
 * @param {string|string[]} [options.languages] - Acceptable languages
 * @param {string|string[]} [options.charsets] - Acceptable charsets
 * @param {string|string[]} [options.encodings] - Acceptable encodings
 * @returns {function} - `(headers) => {type, language, charset, encoding}`
 */
export default ({types, languages, charsets, encodings} = {}) =>
  (headers = {}) => {
    const negotiator = new Negotiator({headers: {...headers}});

    const toArr = v => (v ? flatArray(v) : undefined);

    return {
      type: negotiator.mediaType(toArr(types)),
      language: negotiator.language(toArr(languages)),
      charset: negotiator.charset(toArr(charsets)),
      encoding: negotiator.encoding(toArr(encodings))
    };
  };
