/**
 * @fileoverview Schema-based response body projection.
 *
 * Compiles JSON Schema objects into lightweight projector functions that strip
 * undeclared properties from response bodies before serialization. Projectors
 * are compiled once at factory time and applied per-request with zero schema
 * parsing overhead.
 *
 * Projection semantics:
 * - `type: 'object'` with `properties` — creates a new object containing only
 *   declared keys, recursing into nested schemas
 * - `type: 'array'` with `items` — maps the item projector over each element
 * - All other types (primitives, `anyOf`/`oneOf`/`allOf`, `$ref`, no type) —
 *   identity pass-through (no stripping)
 *
 * Status code resolution order: exact match (`200`) → range (`'2xx'`/`'2XX'`)
 * → `'default'` → `undefined` (no projection).
 *
 * @module lib/response-schema
 * @since 0.5.0
 *
 * @example
 * import {compileResponseSerializers, resolveSerializer} from '@centralping/ergo/lib/response-schema';
 *
 * const serializers = compileResponseSerializers({
 *   200: {
 *     type: 'object',
 *     properties: {id: {type: 'number'}, name: {type: 'string'}}
 *   },
 *   '2xx': {
 *     type: 'object',
 *     properties: {id: {type: 'number'}}
 *   }
 * });
 *
 * const projector = resolveSerializer(serializers, 200);
 * projector({id: 1, name: 'Alice', secret: 'x'});
 * // => {id: 1, name: 'Alice'}
 */

/**
 * Compiles a projector closure from a JSON Schema.
 *
 * @param {object} schema - JSON Schema object
 * @returns {function} - Projector function `(value) => projectedValue`
 */
function compileProjector(schema) {
  if (schema.type === 'object' && schema.properties) {
    const keys = Object.keys(schema.properties);
    const propertyProjectors = new Array(keys.length);

    for (let i = 0; i < keys.length; i++) {
      propertyProjectors[i] = compileProjector(schema.properties[keys[i]]);
    }

    return function projectObject(value) {
      if (value === null || value === undefined || typeof value !== 'object') return value;

      const result = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key in value) {
          result[key] = propertyProjectors[i](value[key]);
        }
      }
      return result;
    };
  }

  if (schema.type === 'array' && schema.items) {
    const itemProjector = compileProjector(schema.items);

    return function projectArray(value) {
      if (!Array.isArray(value)) return value;
      return value.map(itemProjector);
    };
  }

  return function passThrough(value) {
    return value;
  };
}

/**
 * Normalizes a status code key to lowercase range format.
 *
 * Accepts both OpenAPI-style uppercase (`'2XX'`) and Fastify-style lowercase
 * (`'2xx'`). Numeric keys are stored as numbers.
 *
 * @param {number|string} key - Status code or range key
 * @returns {number|string} - Normalized key
 */
function normalizeKey(key) {
  if (typeof key === 'number') return key;
  const s = String(key).toLowerCase();
  const n = Number(s);
  return Number.isFinite(n) ? n : s;
}

/**
 * Compiles a map of JSON Schema objects into a map of projector functions.
 *
 * @param {Record<number|string, object>} schemas - Map of status code (or range
 *   key like `'2xx'`, `'2XX'`, `'default'`) to JSON Schema object
 * @returns {Map<number|string, function>} - Map of normalized keys to compiled
 *   projector functions
 */
export function compileResponseSerializers(schemas) {
  const map = new Map();

  for (const key of Object.keys(schemas)) {
    const normalized = normalizeKey(key);
    map.set(normalized, compileProjector(schemas[key]));
  }

  return map;
}

/**
 * Resolves the best-matching projector for a given status code.
 *
 * Resolution order: exact numeric match → range (`'Nxx'` lowercase) →
 * `'default'` → `undefined`.
 *
 * @param {Map<number|string, function>} serializers - Compiled serializers map
 * @param {number} statusCode - HTTP status code
 * @returns {function|undefined} - The matching projector, or undefined if no
 *   schema matches
 */
export function resolveSerializer(serializers, statusCode) {
  if (serializers.has(statusCode)) return serializers.get(statusCode);

  const rangeKey = `${Math.floor(statusCode / 100)}xx`;
  if (serializers.has(rangeKey)) return serializers.get(rangeKey);

  if (serializers.has('default')) return serializers.get('default');

  return undefined;
}
