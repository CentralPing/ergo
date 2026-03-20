/**
 * @fileoverview Iterable reduce utility.
 *
 * Creates a function that eagerly consumes an iterable and reduces it to a single value
 * using a reducer function. When no `initialValue` is provided and the iterable has at
 * least one element, the first element is used as the initial accumulator.
 *
 * @module utils/iterables/reduce
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import {chain, reduce} from 'ergo/utils/iterables';
 *
 * chain([1, 2, 3, 4], reduce((sum, x) => sum + x, 0)) // => 10
 */

/**
 * @param {function} reducer - Reducer `(accumulator, value, index, iterable) => newAccumulator`
 * @param {*} [initialValue] - Initial accumulator value; first element used if omitted
 * @returns {function} - Function `(iterable) => accumulated value`
 */
export default (reducer, initialValue) => {
  /**
   * @param {Iterable} iterable - Source iterable to reduce over
   * @returns {*} - Accumulated value from the reducer function
   */
  return function (iterable) {
    let i = 0;
    let accumulator = initialValue;

    for (const val of iterable) {
      if (i === 0 && accumulator === undefined) {
        accumulator = val;
      } else {
        accumulator = reducer(accumulator, val, i, iterable);
      }
      i++;
    }

    return accumulator;
  };
};
