/**
 * @fileoverview Deep property setter with dot-notation path support.
 *
 * Sets a value at a dot-delimited path in an object, creating intermediate objects
 * or arrays as needed. Uses `Object.hasOwn()` to check for existing nodes.
 * Array nodes are created when the next path segment is a non-negative integer
 * string (`/^\d+$/`). Existing intermediates that are `null` or non-object
 * primitives throw a descriptive `TypeError` with `code`
 * {@link PATH_TRAVERSE_ERROR_CODE}. Functions are valid intermediates for
 * ordinary own properties (e.g. `handler.timeout`), but path segments
 * `__proto__`, `prototype`, and `constructor` are always rejected to prevent
 * prototype-chain mutations. Existing intermediates that are shared builtins
 * (`Object.prototype`, `Array`/`Function` constructors, etc.) are also rejected,
 * and assigning `length` on an Array leaf is forbidden (sparse-array DoS).
 *
 * @module utils/set
 * @since 0.1.0
 *
 * @example
 * import set from '@centralping/ergo/utils/set';
 *
 * const obj = {};
 * set(obj, 'a.b.c', 42);   // obj => {a: {b: {c: 42}}}
 * set(obj, 'tags.0', 'x'); // obj.tags => ['x']
 */

/** Strict non-negative integer string — used to decide Array vs object intermediates. */
const IS_ARRAY_INDEX = /^\d+$/;

/**
 * Whether a path segment is a digit-only array index (`/^\d+$/`).
 * Shared with `lib/query.js` shape first-wins so index detection cannot drift.
 * @param {string} segment - Single path segment
 * @returns {boolean} - True when the segment is a non-negative integer string
 */
export function isArrayIndexSegment(segment) {
  return IS_ARRAY_INDEX.test(segment);
}

/**
 * Path segments that must never be traversed or assigned — they can mutate
 * shared prototypes (`Object.prototype`, function `.prototype`, etc.).
 */
const FORBIDDEN_SEGMENTS = new Set(['__proto__', 'prototype', 'constructor']);

/**
 * Shared builtin objects that must not be reused as path intermediates.
 * Callers who place these in a graph and then apply a user-influenced path
 * would otherwise write onto the shared prototype/constructor.
 */
const FORBIDDEN_INTERMEDIATES = new Set([
  Object.prototype,
  Array.prototype,
  Function.prototype,
  Object,
  Array,
  Function
]);

/**
 * Stable error code for path-conflict TypeErrors thrown by {@link set}.
 * Callers that absorb user-controlled path conflicts (e.g. `lib/query.js`) should
 * match on `err.code` rather than message text — or use {@link trySet}.
 */
export const PATH_TRAVERSE_ERROR_CODE = 'ERGO_SET_PATH_TRAVERSE';

/**
 * @param {string} message - Error message body
 * @returns {TypeError} - Path-conflict error with {@link PATH_TRAVERSE_ERROR_CODE}
 */
function pathTraverseError(message) {
  const err = new TypeError(message);
  err.code = PATH_TRAVERSE_ERROR_CODE;
  return err;
}

/**
 * @param {string} segment - Path segment
 * @param {string} path - Full path (for error message)
 * @throws {TypeError} When `segment` is a forbidden key
 */
function assertSafeSegment(segment, path) {
  if (FORBIDDEN_SEGMENTS.has(segment)) {
    throw pathTraverseError(
      `Cannot traverse path '${path}': '${segment}' is a forbidden path segment`
    );
  }
}

/**
 * @param {object} obj - Target object
 * @param {string} path - Dot-delimited property path
 * @param {*} val - Value to assign
 * @returns {*} - The assigned value
 * @throws {TypeError} When an existing intermediate at `path` is `null`, a
 *   non-object primitive (not including ordinary functions), a shared builtin,
 *   when a path segment is `__proto__` / `prototype` / `constructor`, or when
 *   assigning `length` on an Array (`err.code === 'ERGO_SET_PATH_TRAVERSE'`)
 */
export default function set(obj, path = '', val) {
  const subPaths = path.split('.');
  // Reject forbidden segments before any mutation so failed paths leave the target untouched.
  for (const segment of subPaths) {
    assertSafeSegment(segment, path);
  }
  const last = subPaths.at(-1);

  const leaf = subPaths.slice(0, -1).reduce((o, p, i) => {
    if (Object.hasOwn(o, p)) {
      const existing = o[p];
      // Functions are objects in JS and are valid intermediates (e.g. handler.timeout).
      if (existing === null || (typeof existing !== 'object' && typeof existing !== 'function')) {
        const kind = existing === null ? 'null' : typeof existing;
        throw pathTraverseError(`Cannot traverse path '${path}': '${p}' is ${kind}, not an object`);
      }
      if (FORBIDDEN_INTERMEDIATES.has(existing)) {
        throw pathTraverseError(
          `Cannot traverse path '${path}': '${p}' is a shared builtin and cannot be traversed`
        );
      }
      return existing;
    }

    return (o[p] = isArrayIndexSegment(subPaths[i + 1]) ? [] : Object.create(null));
  }, obj);

  // Array `length` assignment creates large sparse arrays (DoS); block on Array leaves only.
  // Plain-object `.length` remains a normal own property.
  if (Array.isArray(leaf) && last === 'length') {
    throw pathTraverseError(
      `Cannot traverse path '${path}': assigning Array 'length' is forbidden`
    );
  }

  leaf[last] = val;
  return val;
}

/**
 * Like {@link set}, but returns `false` for path-conflict TypeErrors instead of throwing.
 * Unexpected errors still propagate.
 *
 * @param {object} obj - Target object
 * @param {string} path - Dot-delimited property path
 * @param {*} val - Value to assign
 * @returns {boolean} - `true` if the value was set; `false` if a path conflict was skipped
 */
export function trySet(obj, path, val) {
  try {
    set(obj, path, val);
    return true;
  } catch (err) {
    if (err instanceof TypeError && err.code === PATH_TRAVERSE_ERROR_CODE) {
      return false;
    }
    throw err;
  }
}
