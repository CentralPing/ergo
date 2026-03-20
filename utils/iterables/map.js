/**
 * @fileoverview Iterable map generator.
 *
 * Creates a generator function that transforms each value from the source iterable
 * using a transform function. Automatically detects async transforms and produces
 * async generators; sync transforms produce sync generators.
 *
 * @module utils/iterables/map
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../type.js
 *
 * @example
 * import {chain, map} from 'ergo/utils/iterables';
 *
 * [...chain([1, 2, 3], map(x => x * 2))] // => [2, 4, 6]
 *
 * // Async transform
 * for await (const v of chain([1, 2, 3], map(async x => await fetchSomething(x)))) { ... }
 */
import type from '../type.js';
/**
 * Creates a map generator function.
 *
 * @param {function} transform - Sync or async transform `(value, index, iterable) => newValue`
 * @returns {function} - Generator function `(iterable) => Generator|AsyncGenerator`
 */
export default transform => {
  /**
   * @param {Iterable} iterable - Source iterable to transform
   */
  return type(transform).startsWith('Async')
    ? async function* (iterable) {
        let i = 0;

        for await (const val of iterable) {
          yield await transform(val, i++, iterable);
        }
      }
    : function* (iterable) {
        let i = 0;

        for (const val of iterable) {
          yield transform(val, i++, iterable);
        }
      };
};
