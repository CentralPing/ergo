/**
 * @fileoverview HTTP middleware factory for content negotiation.
 *
 * Wraps the `negotiator` library to inspect `Accept`, `Accept-Language`,
 * `Accept-Charset`, and `Accept-Encoding` request headers and determine the best
 * matching content type, language, charset, and encoding for the response.
 *
 * When `throwIfFail` is true, a `406 Not Acceptable` error is thrown for any
 * header that cannot be satisfied, enforcing strict content negotiation in the
 * Fast Fail pipeline.
 *
 * @module http/accepts
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../lib/accepts.js
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, accepts} from 'ergo';
 *
 * const pipeline = compose(
 *   [accepts({types: ['application/json']}), [], 'accepts'],
 *   // acc.accepts => {type: 'application/json', language: 'en', charset: 'utf-8', encoding: 'identity'}
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110#section-12.5 RFC 9110 Section 12.5 - Content Negotiation}
 */
import accepts from '../lib/accepts.js';
import httpErrors from '../utils/http-errors.js';

const headerMap = {
  type: 'Accept',
  language: 'Accept-Language',
  charset: 'Accept-Charset',
  encoding: 'Accept-Encoding'
};

/**
 * Creates a content negotiation middleware.
 *
 * @param {object} [options] - Negotiation configuration
 * @param {boolean} [options.throwIfFail=false] - Throw 406 if any negotiation key is undefined
 * @param {string[]} [options.types] - Acceptable media types
 * @param {string[]} [options.languages] - Acceptable languages
 * @param {string[]} [options.charsets] - Acceptable character sets
 * @param {string[]} [options.encodings] - Acceptable content encodings
 * @returns {function} - Middleware `(req) => {type, language, charset, encoding}`
 * @throws {Error} 406 Not Acceptable when `throwIfFail` is true and any negotiation value is undefined
 */
export default ({throwIfFail = false, ...options} = {}) => {
  const acceptor = accepts(options);

  return ({headers = {}} = {}) => {
    const accepted = acceptor(headers);

    if (throwIfFail) {
      for (const [k, v] of Object.entries(accepted)) {
        if (v === undefined) {
          throw httpErrors(406, {
            message: `Failed to negotiate content for: [${headerMap[k]}].`
          });
        }
      }
    }

    return accepted;
  };
};
