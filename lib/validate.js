/**
 * @fileoverview JSON Schema validation factory using AJV 8.
 *
 * Compiles a JSON Schema once at creation time and returns a validator function.
 * The validator throws `422 Unprocessable Entity` with structured error details
 * when validation fails, returning the input data unchanged on success.
 *
 * Used by `http/validate.js` as the pure-logic backing implementation.
 *
 * @module lib/validate
 * @version 0.1.0
 * @since 0.1.0
 * @requires ajv
 * @requires ../utils/http-errors.js
 *
 * @example
 * import createValidator from 'ergo/lib/validate';
 *
 * const validate = createValidator({
 *   type: 'object',
 *   properties: {name: {type: 'string'}},
 *   required: ['name']
 * });
 *
 * validate({name: 'Alice'});       // returns {name: 'Alice'}
 * validate({});                    // throws 422 with details
 */
import Ajv from 'ajv';
import httpErrors from '../utils/http-errors.js';

/**
 * Compiles a JSON Schema and returns a validating function.
 *
 * @param {object} schema - JSON Schema 2020-12 or draft-07 object
 * @param {object} [options] - Validator options
 * @param {boolean} [options.allErrors=true] - Report all errors instead of stopping at the first
 * @param {boolean} [options.coerceTypes=false] - Coerce input values to match schema types
 * @param {object} [options.ajv] - Additional AJV constructor options
 * @returns {function} - `validateData(data)` — returns `data` on success, throws 422 on failure
 * @throws {Error} 422 with `details` array if schema validation fails
 */
export default function createValidator(schema, options = {}) {
  const ajv = new Ajv({
    allErrors: options.allErrors !== false,
    coerceTypes: options.coerceTypes ?? false,
    ...options.ajv
  });

  const validate = ajv.compile(schema);

  return function validateData(data) {
    const valid = validate(data);

    if (!valid) {
      throw httpErrors(422, {
        message: 'Validation failed',
        details: validate.errors.map(formatError)
      });
    }

    return data;
  };
}

/**
 * Formats an AJV error object into a concise detail record.
 *
 * @param {object} err - AJV validation error (from `ajv.errors`)
 * @param {string} err.instancePath - JSON Pointer to the failing field
 * @param {string} err.message - Human-readable error message
 * @param {object} err.params - Additional error parameters
 * @returns {{path: string, message: string, params: object}} - Formatted error detail
 */
function formatError(err) {
  return {
    path: err.instancePath || '/',
    message: err.message,
    params: err.params
  };
}
