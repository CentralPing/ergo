/**
 * @fileoverview HTTP middleware factory for content negotiation.
 *
 * Wraps the `negotiator` library to inspect `Accept`, `Accept-Language`,
 * `Accept-Charset`, and `Accept-Encoding` request headers and determine the best
 * matching content type, language, charset, and encoding for the response.
 *
 * By default, returns `{response: {statusCode: 406, detail}}` for any header
 * that cannot be satisfied, enforcing strict content negotiation in the Fast
 * Fail pipeline. Set `throwIfFail: false` for informational-only negotiation.
 *
 * @module http/accepts
 * @since 0.1.0
 * @requires ../lib/accepts.js
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, accepts} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   {fn: accepts({types: ['application/json']}), setPath: 'accepts'},
 *   // acc.accepts => {type: 'application/json', language: 'en', charset: 'utf-8', encoding: 'identity'}
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110#section-12.5 RFC 9110 Section 12.5 - Content Negotiation}
 */
import accepts from '../lib/accepts.js';

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
 * @param {boolean} [options.throwIfFail=true] - Return `{response: {statusCode: 406, detail}}` if any negotiation key is undefined
 * @param {string[]} [options.types] - Acceptable media types
 * @param {string[]} [options.languages] - Acceptable languages
 * @param {string[]} [options.charsets] - Acceptable character sets
 * @param {string[]} [options.encodings] - Acceptable content encodings
 */
export default ({throwIfFail = true, ...options} = {}) => {
  const acceptor = accepts(options);

  return function acceptsMiddleware({headers = {}} = {}) {
    const accepted = acceptor(headers);

    if (throwIfFail) {
      for (const [k, v] of Object.entries(accepted)) {
        if (v === undefined) {
          return {
            response: {
              statusCode: 406,
              detail: `Failed to negotiate content for: [${headerMap[k]}].`
            }
          };
        }
      }
    }

    return accepted;
  };
};
