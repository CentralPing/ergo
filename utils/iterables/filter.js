/**
 * @fileoverview Iterable filter generator.
 *
 * Creates a generator function that yields only values from the source iterable
 * for which the predicate returns truthy. Passes the value, index, and iterable
 * to the predicate (same signature as `Array.prototype.filter`).
 *
 * @module utils/iterables/filter
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import {chain, filter} from 'ergo/utils/iterables';
 *
 * [...chain([1, 2, 3, 4], filter(x => x % 2 === 0))] // => [2, 4]
 */

/**
 * @param {function} predicate - Filter predicate `(value, index, iterable) => boolean`
 * @returns {function} - Generator function `(iterable) => Generator` yielding matched values
 */
export default predicate => {
  /**
   * @param {Iterable} iterable - Source iterable to filter
   */
  return function* (iterable) {
    let i = 0;

    for (const val of iterable) {
      if (predicate(val, i++, iterable)) {
        yield val;
      }
    }
  };
};
