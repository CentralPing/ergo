/**
 * @fileoverview HTTP middleware factory for JSON Schema validation.
 *
 * Validates properties from the accumulator (body, url, params) against provided JSON
 * Schemas using AJV. Schemas are compiled once at middleware creation time for performance.
 *
 * Returns `{response: {statusCode: 422, detail: ...}}` with structured error details on validation failure.
 * Must be placed after `body()` and/or `url()` in the pipeline so accumulator values
 * are populated before validation runs.
 *
 * @module http/validate
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../lib/validate.js
 *
 * @example
 * import {compose, body, url, validate} from 'ergo';
 *
 * const pipeline = compose(
 *   [body(), 'body'],
 *   [url(), 'url'],
 *   [validate({
 *     body: {
 *       type: 'object',
 *       properties: {name: {type: 'string'}},
 *       required: ['name']
 *     },
 *     query: {
 *       type: 'object',
 *       properties: {page: {type: 'string', pattern: '^[0-9]+$'}}
 *     }
 *   }), 'validation'],
 * );
 */
import createValidator from '../lib/validate.js';

/**
 * Creates a JSON Schema validation middleware.
 *
 * @param {object} [schemas] - Schema map; each key corresponds to an accumulator property
 * @param {object} [schemas.body] - JSON Schema for the parsed request body
 * @param {object} [schemas.query] - JSON Schema for parsed query parameters
 * @param {object} [schemas.params] - JSON Schema for route path parameters
 * @param {object} [options] - AJV options forwarded to each compiled validator
 * @returns {function} - Ergo middleware `(req, res, acc) => void` that returns `{response: {statusCode: 422}}`
 *   (with `detail` and `details` from AJV) on validation failure
 */
export default (schemas = {}, options = {}) => {
  const validators = {};

  if (schemas.body) {
    validators.body = createValidator(schemas.body, options);
  }
  if (schemas.query) {
    validators.query = createValidator(schemas.query, options);
  }
  if (schemas.params) {
    validators.params = createValidator(schemas.params, options);
  }

  return (req, res, acc) => {
    try {
      if (validators.body && acc.body && acc.body.parsed !== undefined) {
        validators.body(acc.body.parsed);
      }

      if (validators.query && acc.url?.query) {
        validators.query(acc.url.query);
      }

      if (validators.params && acc.params) {
        validators.params(acc.params);
      }
    } catch (err) {
      return {
        response: {
          statusCode: err.statusCode ?? 422,
          detail: err.message,
          details: err.details
        }
      };
    }
  };
};
