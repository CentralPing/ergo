/**
 * @fileoverview Deep property getter with dot-notation path support.
 *
 * Traverses a nested object using a dot-delimited path string. Optionally:
 * - Optionally invokes function values at each step (`invoke: false`, default)
 * - Returns `undefined` gracefully when a step is missing (`safe: true`)
 *
 * @module utils/get
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import get from 'ergo/utils/get';
 *
 * get({a: {b: {c: 42}}}, 'a.b.c') // => 42
 * get({a: null}, 'a.b.c', {safe: true}) // => undefined (no throw)
 */

/**
 * @param {object} [obj={}] - Source object
 * @param {string} [path=''] - Dot-delimited property path
 * @param {object} [options] - Traversal options
 * @param {boolean} [options.safe=false] - Return undefined instead of throwing on missing paths
 * @param {boolean} [options.invoke=false] - Call function values at each path step
 * @returns {*} - Value at the path, or undefined in safe mode
 */
export default (obj = {}, path = '', {safe = false, invoke = false} = {}) => {
  let val = obj;

  for (const subPath of path.split('.')) {
    if (val == null && safe) {
      return undefined;
    }

    val = typeof val[subPath] === 'function' && invoke ? val[subPath]() : val[subPath];
  }

  return val;
};
