/**
 * @fileoverview HTTP middleware factory for JSON:API query parameter validation.
 *
 * Validates the parsed query accumulator against the JSON:API query parameter schema,
 * enforcing correct use of `filter`, `sort`, `fields`, `include`, and `page` parameters.
 *
 * Delegates validation to the vendored `lib/json-api-query` module (AJV 8, JSON Schema 2020-12).
 * On validation failure, throws `400 Bad Request` with the AJV error details attached.
 *
 * Must be placed after `url()` in the pipeline so that `acc.url` is populated.
 *
 * @module http/json-api-query
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../lib/json-api-query/index.js
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, url, jsonApiQuery} from 'ergo';
 *
 * const pipeline = compose(
 *   [url(), [], 'url'],
 *   [jsonApiQuery(), 'url.query', 'jsonApiQuery'],
 *   // Throws 400 if query params are not JSON:API compliant
 * );
 */
import {validate} from '../lib/json-api-query/index.js';

/**
 * Creates a JSON:API query validation middleware.
 *
 * @param {...*} options - Options forwarded to the underlying JSON:API validator
 * @returns {function} - Ergo middleware `(req, res, ...acc) => void` that throws 400 on failure
 * @throws {Error} 400 Bad Request when JSON:API query parameters fail validation
 */
export default (...options) => {
  const validator = validate(...options);

  return (req, res, acc) => {
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
