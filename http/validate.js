/**
 * @fileoverview HTTP middleware factory for JSON Schema validation.
 *
 * Validates properties from the accumulator (body, url, route params) against provided
 * JSON Schemas using AJV. Accepts either a targeted `{body?, query?, params?}` schema map
 * or a shorthand raw JSON Schema interpreted as body validation. Schemas are compiled once
 * at middleware creation time for performance. Route params are resolved from
 * `acc.route.params` (ergo-router) with fallback to `acc.params` (standalone).
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
 * @requires ../lib/validate-options.js
 *
 * @example
 * import {compose, body, url, validate} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   body(),
 *   url(),
 *   validate({
 *     body: {
 *       type: 'object',
 *       properties: {name: {type: 'string'}},
 *       required: ['name']
 *     },
 *     query: {
 *       type: 'object',
 *       properties: {page: {type: 'string', pattern: '^[0-9]+$'}}
 *     }
 *   }),
 * );
 */
import createValidator from '../lib/validate.js';
import {validateOptions} from '../lib/validate-options.js';

/** @type {Set<string>} - Recognized keys for the schemas parameter. */
const VALID_SCHEMA_KEYS = new Set(['body', 'query', 'params']);

/** @type {Set<string>} - Recognized keys for the options parameter. */
const VALID_OPTIONS = new Set(['formats', 'allErrors', 'coerceTypes', 'ajv']);

/**
 * @type {Set<string>} - Root-level JSON Schema keywords used to detect shorthand form.
 *
 * When the first argument to `validate()` contains at least one of these keywords and
 * none of the `VALID_SCHEMA_KEYS`, it is treated as a raw JSON Schema for body validation.
 */
const JSON_SCHEMA_INDICATORS = new Set([
  'type',
  'properties',
  'required',
  'items',
  '$schema',
  '$ref',
  '$id',
  '$defs',
  'allOf',
  'anyOf',
  'oneOf',
  'not',
  'if',
  'enum',
  'const',
  'additionalProperties',
  'patternProperties'
]);

/**
 * Detects whether the input is a raw JSON Schema (shorthand form) rather than a
 * targeted `{body?, query?, params?}` schema map.
 *
 * @param {object} schemas - The first argument passed to `validate()`
 * @returns {boolean} - `true` when the input has no targeted keys and at least one JSON Schema indicator
 */
function isSchemaShorthand(schemas) {
  const keys = Object.keys(schemas);

  if (keys.some(k => VALID_SCHEMA_KEYS.has(k))) return false;

  return keys.some(k => JSON_SCHEMA_INDICATORS.has(k));
}

/** @type {Set<string>} - Tracks emitted warning keys to prevent duplicate warnings. */
const emittedWarnings = new Set();

/**
 * Creates a JSON Schema validation middleware.
 *
 * Accepts either a **targeted form** (`{body?, query?, params?}`) or a **shorthand form**
 * (a raw JSON Schema object interpreted as body validation). The shorthand is detected when
 * the first argument contains at least one `JSON_SCHEMA_INDICATORS` keyword and none of the
 * `VALID_SCHEMA_KEYS`. Unrecognized keys that are neither targeted keys nor JSON Schema
 * indicators emit a per-key-set `ERGO_VALIDATE_UNKNOWN_KEY` warning.
 *
 * @param {object} [schemas] - A schema map with `body`, `query`, and/or `params` keys
 *   (targeted form), or a raw JSON Schema object interpreted as body validation
 *   (shorthand form)
 * @param {object} [schemas.body] - JSON Schema for the parsed request body
 * @param {object} [schemas.query] - JSON Schema for parsed query parameters
 * @param {object} [schemas.params] - JSON Schema for route path parameters (reads `acc.route.params` or `acc.params`)
 * @param {object} [options] - AJV options forwarded to each compiled validator
 * @param {boolean} [options.allErrors=true] - Report all errors instead of stopping at the first
 * @param {boolean} [options.coerceTypes=false] - Coerce input values to match schema types
 * @param {boolean|Array<string>|object} [options.formats] - Format keyword support via
 *   `ajv-formats`; forwarded to `createValidator`. Defaults to all standard formats enabled
 * @param {object} [options.ajv] - Additional AJV constructor options
 *
 * @example
 * // Shorthand form — raw JSON Schema interpreted as body validation
 * validate({
 *   type: 'object',
 *   properties: {name: {type: 'string'}},
 *   required: ['name']
 * });
 *
 * @example
 * // Targeted form — explicit body, query, and/or params schemas
 * validate({
 *   body: {type: 'object', properties: {name: {type: 'string'}}, required: ['name']},
 *   query: {type: 'object', properties: {page: {type: 'string', pattern: '^[0-9]+$'}}}
 * });
 */
export default (schemas = {}, options = {}) => {
  validateOptions(options, VALID_OPTIONS, 'validate');
  const resolved = isSchemaShorthand(schemas) ? {body: schemas} : schemas;

  const unknownKeys = Object.keys(resolved).filter(k => !VALID_SCHEMA_KEYS.has(k));

  if (unknownKeys.length > 0) {
    const code = 'ERGO_VALIDATE_UNKNOWN_KEY';
    const dedupKey = `${code}:${[...unknownKeys].sort().join(',')}`;

    if (!emittedWarnings.has(dedupKey)) {
      emittedWarnings.add(dedupKey);
      process.emitWarning(
        `validate() received unrecognized schema keys: ${unknownKeys.join(', ')}. ` +
          'Valid keys are: body, query, params. ' +
          'Pass schemas as direct properties, e.g. validate({body: schema}).',
        {type: 'ErgoWarning', code}
      );
    }
  }

  const validators = {};

  if (resolved.body) {
    validators.body = createValidator(resolved.body, options);
  }
  if (resolved.query) {
    validators.query = createValidator(resolved.query, options);
  }
  if (resolved.params) {
    validators.params = createValidator(resolved.params, options);
  }

  return function validateMiddleware(req, res, acc) {
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
