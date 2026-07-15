/**
 * @fileoverview Deep property setter with dot-notation path support.
 *
 * Sets a value at a dot-delimited path in an object, creating intermediate objects
 * or arrays as needed. Uses `Object.hasOwn()` to check for existing nodes.
 * Array nodes are created when the next path segment is a non-negative integer
 * string (`/^\d+$/`). Digit segments above {@link MAX_ARRAY_INDEX} are rejected
 * only when they index an Array (not as plain-object keys). Existing intermediates
 * that are `null` or non-object primitives throw a descriptive `TypeError` with
 * `code` {@link PATH_TRAVERSE_ERROR_CODE}. Functions are valid intermediates for
 * ordinary own properties (e.g. `handler.timeout`), but path segments
 * `__proto__`, `prototype`, and `constructor` are always rejected to prevent
 * prototype-chain mutations. The root and existing intermediates that are
 * constructor `.prototype` objects, `globalThis` host objects (depth-limited
 * graph from own bindings — `Intl`, `Proxy`, `crypto.subtle`, `process._events`,
 * `Array.prototype.push`, `Intl.NumberFormat.prototype.format`, …), or Proxies
 * are rejected — not via a hand-maintained denylist. Per-instance bound methods
 * created after module load (e.g. `new Intl.NumberFormat().format`) are fresh
 * function objects outside that snapshot and remain valid intermediates — same
 * as ordinary user functions; they are not query-reachable. Assigning `length`
 * on an Array leaf is forbidden (sparse-array DoS).
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
import {types} from 'node:util';

/** Strict non-negative integer string — used to decide Array vs object intermediates. */
const IS_ARRAY_INDEX = /^\d+$/;

/**
 * Maximum allowed digit-only array index segment. Larger indices would grow
 * Array `length` into sparse-DoS territory (query reach via `a[4294967294]=x`).
 * Full design to stop numeric-bracket → array creation remains #280.
 */
export const MAX_ARRAY_INDEX = 1024;

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
 * @param {string} segment - Path segment
 * @param {string} path - Full path (for error message)
 * @throws {TypeError} When `segment` is a digit index above {@link MAX_ARRAY_INDEX}
 */
function assertBoundedArrayIndex(segment, path) {
  if (!isArrayIndexSegment(segment)) {
    return;
  }
  if (Number(segment) > MAX_ARRAY_INDEX) {
    throw pathTraverseError(
      `Cannot traverse path '${path}': array index '${segment}' exceeds maximum ${MAX_ARRAY_INDEX}`
    );
  }
}

/**
 * Reject oversized digit segments **only** where they index an Array (existing or
 * created by this path). Plain-object / top-level digit keys are unconstrained —
 * the sparse-array DoS bound does not apply to object property names.
 * Simulated without mutation so validation stays atomic with forbidden-segment checks.
 * @param {object} obj - Path root
 * @param {string[]} subPaths - Split path segments
 * @param {string} path - Full path (for error message)
 * @throws {TypeError} When an Array-index segment exceeds {@link MAX_ARRAY_INDEX}
 */
function assertArrayIndexBoundsForPath(obj, subPaths, path) {
  let cur = obj;
  for (let i = 0; i < subPaths.length; i++) {
    const segment = subPaths[i];
    if (Array.isArray(cur) && isArrayIndexSegment(segment)) {
      assertBoundedArrayIndex(segment, path);
    }
    if (i === subPaths.length - 1) {
      return;
    }
    if (
      cur !== null &&
      (typeof cur === 'object' || typeof cur === 'function') &&
      Object.hasOwn(cur, segment)
    ) {
      cur = cur[segment];
      continue;
    }
    // Phantom next container: Array when the following segment is a digit index.
    cur = isArrayIndexSegment(subPaths[i + 1]) ? [] : Object.create(null);
  }
}

/**
 * Define an own data property (avoids inherited setters on missing keys).
 * @param {object} target - Object or Array to write
 * @param {string} key - Property key
 * @param {*} value - Property value
 */
function defineOwnDataProperty(target, key, value) {
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    writable: true,
    value
  });
}

/**
 * True when `value` is a constructor's `.prototype` object
 * (`value.constructor.prototype === value`).
 * @param {*} value - Candidate intermediate
 * @returns {boolean}
 */
function isPrototypeObject(value) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
    return false;
  }
  return (
    Object.hasOwn(value, 'constructor') &&
    typeof value.constructor === 'function' &&
    value.constructor.prototype === value
  );
}

/**
 * Expansion rounds from `globalThis`: owns → nested hosts → intrinsic methods
 * (`Array.prototype.push`, `crypto.subtle.encrypt`, …). Prototype-object own
 * descriptors (data + accessor get/set) are enrolled without extra depth (#390).
 */
const HOST_GRAPH_DEPTH = 3;

/**
 * Intrinsic methods from constructor `.prototype` own descriptors.
 * Strong `Set` (not only WeakSet): under Bun, some native accessor functions
 * are not retained as WeakSet keys, so identity rejection would silently fail.
 */
const HOST_PROTOTYPE_FUNCTIONS = new Set();

/**
 * Enroll function values from a constructor `.prototype` object's own descriptors
 * (covers namespaced accessors like `Intl.NumberFormat.prototype.format`).
 * @param {WeakSet<object>} values - Host graph accumulator
 * @param {object} proto - Constructor `.prototype` object
 */
function enrollPrototypeOwnFunctions(values, proto) {
  if (!isPrototypeObject(proto)) {
    return;
  }
  let keys;
  try {
    keys = Reflect.ownKeys(proto);
  } catch {
    return;
  }
  for (const key of keys) {
    let desc;
    try {
      desc = Object.getOwnPropertyDescriptor(proto, key);
    } catch {
      continue;
    }
    if (!desc) {
      continue;
    }
    for (const fn of [desc.value, desc.get, desc.set]) {
      if (typeof fn === 'function') {
        values.add(fn);
        HOST_PROTOTYPE_FUNCTIONS.add(fn);
      }
    }
  }
}

/**
 * @param {WeakSet<object>} values - Accumulator
 * @param {*} candidate - Value to record when newly seen object/function
 * @param {object[]} next - Frontier for the next expansion round
 */
function enrollHostValue(values, candidate, next) {
  if (candidate === null || (typeof candidate !== 'object' && typeof candidate !== 'function')) {
    return;
  }
  if (values.has(candidate)) {
    return;
  }
  values.add(candidate);
  if (typeof candidate === 'object') {
    enrollPrototypeOwnFunctions(values, candidate);
  } else if (typeof candidate === 'function' && candidate.prototype != null) {
    enrollPrototypeOwnFunctions(values, candidate.prototype);
  }
  next.push(candidate);
}

/**
 * @param {object|Function} seed - Host object
 * @param {PropertyKey} key - Property to read
 * @returns {*} - Property value, or `undefined` when the getter throws
 */
function tryGetHostProperty(seed, key) {
  try {
    const value = Reflect.get(seed, key);
    // Some host accessors (e.g. WritableStreamDefaultWriter.closed) return a
    // rejected Promise when read with a mismatched `this`. Absorb so module
    // load does not emit unhandledRejection while still enrolling the value.
    if (
      value != null &&
      (typeof value === 'object' || typeof value === 'function') &&
      typeof value.then === 'function'
    ) {
      Promise.resolve(value).then(
        () => {},
        () => {}
      );
    }
    return value;
  } catch {
    return undefined;
  }
}

function expandHostSeed(values, seed) {
  const next = [];
  try {
    let ownKeys;
    try {
      ownKeys = Reflect.ownKeys(seed);
    } catch {
      ownKeys = [];
    }
    for (const key of ownKeys) {
      enrollHostValue(values, tryGetHostProperty(seed, key), next);
    }

    let proto;
    try {
      proto = Object.getPrototypeOf(seed);
    } catch {
      return next;
    }
    while (proto && proto !== Object.prototype) {
      let protoKeys;
      try {
        protoKeys = Reflect.ownKeys(proto);
      } catch {
        break;
      }
      for (const key of protoKeys) {
        // Resolve accessors against the seed instance (e.g. Crypto.prototype.subtle).
        enrollHostValue(values, tryGetHostProperty(seed, key), next);
      }
      try {
        proto = Object.getPrototypeOf(proto);
      } catch {
        break;
      }
    }
  } catch {
    // Host graph walks must never fail module load.
  }
  return next;
}

/**
 * Host objects reachable from `globalThis` at module load (depth-limited graph).
 * Identity match is durable without a hand-maintained denylist (#386–#389).
 */
const GLOBAL_THIS_HOST_VALUES = (() => {
  const values = new WeakSet([globalThis]);
  let frontier = [globalThis];
  for (let depth = 0; depth < HOST_GRAPH_DEPTH; depth++) {
    const next = [];
    for (const seed of frontier) {
      next.push(...expandHostSeed(values, seed));
    }
    frontier = next;
  }
  return values;
})();

/**
 * True when `value` is a snapshotted host object from {@link GLOBAL_THIS_HOST_VALUES}.
 * @param {*} value - Candidate value
 * @returns {boolean}
 */
function isGlobalThisHostValue(value) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
    return false;
  }
  return GLOBAL_THIS_HOST_VALUES.has(value);
}

/**
 * True when `value` must not be used as a path root or intermediate.
 * Safe: Arrays (except `Array.prototype`), null-proto objects (except snapshotted
 * hosts like `process._events`), plain objects, user class instances, and
 * ordinary functions (`handler.timeout`).
 * Unsafe: Proxies (before Array/null-proto shortcuts), constructor `.prototype`
 * objects, and host objects from the `globalThis` graph (#386–#389).
 * @param {*} value - Existing path container
 * @returns {boolean}
 */
function isUnsafeIntermediate(value) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
    return false;
  }
  // Proxies before Array / null-proto shortcuts: Proxy(Array.prototype) is an
  // Array and Proxy(Object.prototype) has null [[Prototype]] (#387 ordering).
  if (types.isProxy(value)) {
    return true;
  }
  if (isPrototypeObject(value)) {
    return true;
  }
  // Host check before null-proto shortcut: process._events is null-proto (#388).
  if (isGlobalThisHostValue(value)) {
    return true;
  }
  // Strong-Set fallback for prototype descriptor functions (#390; Bun WeakSet gap).
  if (typeof value === 'function' && HOST_PROTOTYPE_FUNCTIONS.has(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return false;
  }
  if (typeof value === 'object' && Object.getPrototypeOf(value) === null) {
    return false;
  }
  return false;
}

/**
 * @param {object} obj - Target object
 * @param {string} path - Dot-delimited property path
 * @param {*} val - Value to assign
 * @returns {*} - The assigned value
 * @throws {TypeError} When the root or an existing intermediate is unsafe, is
 *   `null` / a non-object primitive (not including ordinary functions), when a
 *   path segment is `__proto__` / `prototype` / `constructor`, when a digit
 *   index on an Array exceeds {@link MAX_ARRAY_INDEX}, or when assigning
 *   `length` on an Array (`err.code === 'ERGO_SET_PATH_TRAVERSE'`)
 */
export default function set(obj, path = '', val) {
  const subPaths = path.split('.');
  // Reject forbidden segments and Array-index bounds before any mutation.
  for (const segment of subPaths) {
    assertSafeSegment(segment, path);
  }
  assertArrayIndexBoundsForPath(obj, subPaths, path);
  if (isUnsafeIntermediate(obj)) {
    throw pathTraverseError(
      `Cannot traverse path '${path}': root is a shared builtin and cannot be traversed`
    );
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

    const created = isArrayIndexSegment(subPaths[i + 1]) ? [] : Object.create(null);
    defineOwnDataProperty(o, p, created);
    return created;
  }, obj);

  // Array `length` assignment creates large sparse arrays (DoS); block on Array leaves only.
  // Plain-object `.length` remains a normal own property.
  if (Array.isArray(leaf) && last === 'length') {
    throw pathTraverseError(
      `Cannot traverse path '${path}': assigning Array 'length' is forbidden`
    );
  }

  defineOwnDataProperty(leaf, last, val);
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
