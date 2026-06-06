/**
 * @fileoverview HTTP middleware factory for JSON:API query parameter validation.
 *
 * Validates the parsed query accumulator against the JSON:API query parameter schema,
 * enforcing correct use of `filter`, `sort`, `fields`, `include`, and `page` parameters.
 *
 * Delegates validation to the vendored `lib/json-api-query` module (AJV 8, JSON Schema 2020-12).
 * On validation failure, returns `{response: {statusCode: 400, detail: ...}}` (RFC 9457 body
 * formatted by `send()` after the pipeline).
 *
 * Must be placed after `url()` in the pipeline so that `acc.url` is populated.
 *
 * @module http/json-api-query
 * @since 0.1.0
 * @requires ../lib/json-api-query/index.js
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, url, jsonApiQuery} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   {fn: url(), setPath: 'url'},
 *   jsonApiQuery(),
 *   // Returns 400 response if query params are not JSON:API compliant
 * );
 */
import {validate} from '../lib/json-api-query/index.js';

/**
 * Creates a JSON:API query validation middleware.
 *
 * @param {...*} options - Options forwarded to the underlying JSON:API validator
 */
export default (...options) => {
  const validator = validate(...options);

  return function jsonApiQueryMiddleware(req, res, acc) {
    const query = acc.url?.query;
    const valid = validator(query);

    if (!valid) {
      return {
        response: {
          statusCode: 400,
          detail: 'Invalid JSON API query'
        }
      };
    }
  };
};
