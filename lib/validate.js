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
 * @since 0.1.0
 * @requires ajv
 * @requires ajv-formats
 * @requires ../utils/http-errors.js
 *
 * @example
 * import createValidator from '@centralping/ergo/lib/validate';
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
import addFormats from 'ajv-formats';
import httpErrors from '../utils/http-errors.js';

/**
 * Compiles a JSON Schema and returns a validating function.
 *
 * @param {object} schema - JSON Schema 2020-12 or draft-07 object
 * @param {object} [options] - Validator options
 * @param {boolean} [options.allErrors=true] - Report all errors instead of stopping at the first
 * @param {boolean} [options.coerceTypes=false] - Coerce input values to match schema types
 * @param {boolean|Array<string>|object} [options.formats] - Format keyword support via
 *   `ajv-formats`. `undefined` or `true` enables all standard formats in fast mode
 *   (simplified regexes that mitigate ReDoS — safe for untrusted input); `false` disables
 *   (AJV strict mode rejects unknown formats); an array enables selective formats
 *   (e.g. `['email', 'uri']`) using full-mode regexes; an object is passed as the full
 *   plugin config (e.g. `{mode: 'full'}` for strict RFC compliance at the cost of
 *   ReDoS exposure)
 * @param {object} [options.ajv] - Additional AJV constructor options
 * @throws {Error} 422 with `details` array if schema validation fails
 */
export default function createValidator(schema, options = {}) {
  const ajv = new Ajv({
    allErrors: options.allErrors !== false,
    coerceTypes: options.coerceTypes ?? false,
    ...options.ajv
  });

  if (options.formats !== false) {
    addFormats(
      ajv,
      options.formats === true || options.formats === undefined ? {mode: 'fast'} : options.formats
    );
  }

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
