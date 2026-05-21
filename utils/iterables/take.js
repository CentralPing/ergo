/**
 * @fileoverview Iterable take generator.
 *
 * Creates a generator function that yields at most `n` values from the source iterable,
 * then returns (stops iteration).
 *
 * @module utils/iterables/take
 * @since 0.1.0
 *
 * @example
 * import {chain, take} from '@centralping/ergo/utils/iterables';
 *
 * [...chain([1, 2, 3, 4, 5], take(3))] // => [1, 2, 3]
 */

/**
 * @param {number} [n=Infinity] - Maximum number of values to yield
 * @returns {function} - Generator function `(iterable) => Generator` yielding at most n values
 */
export default (n = Infinity) => {
  /**
   * @param {Iterable} iterable - Source iterable to take elements from
   */
  return function* (iterable) {
    let i = 0;

    for (const val of iterable) {
      if (i++ >= n) {
        return;
      }

      yield val;
    }
  };
};
