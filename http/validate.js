/**
 * @fileoverview HTTP middleware factory for JSON Schema validation.
 *
 * Validates properties from the accumulator (body, url, route params) against provided
 * JSON Schemas using AJV. Schemas are compiled once at middleware creation time for
 * performance. Route params are resolved from `acc.route.params` (ergo-router) with
 * fallback to `acc.params` (standalone).
 *
 * Returns `{response: {statusCode: 422, detail: ...}}` with structured error details
 * on validation failure. When a body schema is configured but `acc.body` is absent
 * (indicating `body()` was not placed before `validate()` in the pipeline), returns
 * `{response: {statusCode: 500}}` and emits a one-time `process.emitWarning` diagnostic.
 *
 * Must be placed after `body()` and/or `url()` in the pipeline so accumulator values
 * are populated before validation runs.
 *
 * @module http/validate
 * @since 0.1.0
 * @requires ../lib/validate.js
 *
 * @example
 * import {compose, body, url, validate} from '@centralping/ergo';
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

/** @type {Set<string>} - Tracks emitted warning codes to prevent per-request spam. */
const emittedWarnings = new Set();

/**
 * Creates a JSON Schema validation middleware.
 *
 * @param {object} [schemas] - Schema map; each key corresponds to an accumulator property
 * @param {object} [schemas.body] - JSON Schema for the parsed request body
 * @param {object} [schemas.query] - JSON Schema for parsed query parameters
 * @param {object} [schemas.params] - JSON Schema for route path parameters (reads `acc.route.params` or `acc.params`)
 * @param {object} [options] - AJV options forwarded to each compiled validator
 * @param {boolean|Array<string>|object} [options.formats] - Format keyword support via
 *   `ajv-formats`; forwarded to `createValidator`. Defaults to all standard formats enabled
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
      if (validators.body) {
        if (!acc.body) {
          const code = 'ERGO_VALIDATE_NO_BODY';

          if (!emittedWarnings.has(code)) {
            emittedWarnings.add(code);
            process.emitWarning(
              'validate() found no parsed body at acc.body. ' +
                'Ensure body() runs before validate() in the pipeline.',
              {type: 'ErgoWarning', code}
            );
          }

          return {
            response: {
              statusCode: 500,
              detail:
                'validate() found no parsed body at acc.body. ' +
                'Ensure body() runs before validate() in the pipeline.'
            }
          };
        }

        if (acc.body.parsed !== undefined) {
          validators.body(acc.body.parsed);
        }
      }

      if (validators.query && acc.url?.query) {
        validators.query(acc.url.query);
      }

      if (validators.params && (acc.route?.params ?? acc.params)) {
        validators.params(acc.route?.params ?? acc.params);
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
