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
 * prototype-chain mutations. Existing intermediates that are prototype objects,
 * intrinsic global constructors, or singleton intrinsics (`Math`, `JSON`, …)
 * are rejected structurally — not via an incomplete denylist. Assigning
 * `length` on an Array leaf is forbidden (sparse-array DoS).
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
 * Singleton intrinsics that are not constructor.prototype objects but must never
 * be reused as path intermediates (`Math.x = …` would mutate a shared builtin).
 */
const INTRINSIC_SINGLETONS = new Set([Math, JSON, Reflect, Atomics, globalThis]);

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
 * True when `value` is a constructor's `.prototype` object
 * (`value.constructor.prototype === value`).
 * @param {*} value - Candidate intermediate
 * @returns {boolean}
 */
function isPrototypeObject(value) {
  return (
    (typeof value === 'object' || typeof value === 'function') &&
    value !== null &&
    Object.hasOwn(value, 'constructor') &&
    typeof value.constructor === 'function' &&
    value.constructor.prototype === value
  );
}

/**
 * True when `fn` is an intrinsic constructor installed on `globalThis`
 * (e.g. `Object`, `Array`, `RegExp`). Ordinary user functions/classes are not.
 * @param {Function} fn - Candidate function
 * @returns {boolean}
 */
function isIntrinsicGlobalConstructor(fn) {
  if (typeof fn !== 'function' || fn.prototype == null) {
    return false;
  }
  if (fn.prototype.constructor !== fn) {
    return false;
  }
  const {name} = fn;
  if (!name) {
    return false;
  }
  try {
    return globalThis[name] === fn;
  } catch {
    return false;
  }
}

/**
 * True when `value` must not be reused as a path intermediate.
 * Structural — not an incomplete denylist of specific builtins (#386).
 * Safe: Arrays (except `Array.prototype`), null-proto objects, plain objects,
 * user class instances, and ordinary functions (`handler.timeout`).
 * @param {*} value - Existing path intermediate
 * @returns {boolean}
 */
function isUnsafeIntermediate(value) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
    return false;
  }
  // Before Array / null-proto shortcuts: Array.prototype is an Array, and
  // Object.prototype has null [[Prototype]].
  if (isPrototypeObject(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return false;
  }
  if (typeof value === 'object' && Object.getPrototypeOf(value) === null) {
    return false;
  }
  if (typeof value === 'function' && isIntrinsicGlobalConstructor(value)) {
    return true;
  }
  return INTRINSIC_SINGLETONS.has(value);
}

/**
 * @param {object} obj - Target object
 * @param {string} path - Dot-delimited property path
 * @param {*} val - Value to assign
 * @returns {*} - The assigned value
 * @throws {TypeError} When an existing intermediate at `path` is `null`, a
 *   non-object primitive (not including ordinary functions), an unsafe intrinsic
 *   intermediate, when a path segment is `__proto__` / `prototype` /
 *   `constructor`, or when assigning `length` on an Array
 *   (`err.code === 'ERGO_SET_PATH_TRAVERSE'`)
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
      if (isUnsafeIntermediate(existing)) {
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
