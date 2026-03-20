/**
 * @fileoverview Variadic flat-array utility.
 *
 * Flattens all arguments into a single array using `Array.prototype.flat()`.
 * Equivalent to `[...args].flat()` — accepts any mix of scalars and nested arrays.
 *
 * @module utils/flat-array
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import flatArray from 'ergo/utils/flat-array';
 *
 * flatArray('a', ['b', 'c'], 'd') // => ['a', 'b', 'c', 'd']
 * flatArray(1, [2, 3], 4)         // => [1, 2, 3, 4]
 */

/**
 * @param {...*} items - Values or nested arrays to flatten
 * @returns {Array} - Single-level flattened array
 */
export default (...items) => {
  return items.flat();
};
