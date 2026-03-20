/**
 * @fileoverview Iterable forEach generator (side-effect tap).
 *
 * Creates a generator that calls a callback for each value as a side effect,
 * then passes the value through unchanged. Equivalent to `Array.prototype.forEach`
 * for iterables, but composable in a `chain()` pipeline.
 *
 * @module utils/iterables/for-each
 * @version 0.1.0
 * @since 0.1.0
 * @requires ./map.js
 *
 * @example
 * import {chain, forEach, reduce} from 'ergo/utils/iterables';
 *
 * chain(
 *   [1, 2, 3],
 *   forEach(x => console.log('processing', x)),
 *   reduce((acc, x) => acc + x, 0)
 * ); // logs each value, returns 6
 */
import map from './map.js';
/**
 * Side-effect callback for each iterable value.
 *
 * @param {function} cb - Called with `(value, index, iterable)` for each item
 * @returns {function} - Generator function that yields each value unchanged
 */
export default cb =>
  map((val, ...args) => {
    cb(val, ...args);
    return val;
  });
