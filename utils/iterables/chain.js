/**
 * @fileoverview Iterable pipeline composition utility.
 *
 * Pipes an initial value (source iterable) through a series of generator functions,
 * where each generator wraps the previous one. The composition is left-to-right:
 * the first generator receives the source, the second receives the first's output, etc.
 *
 * This is the core primitive for building lazy data pipelines with the iterable utilities.
 *
 * @module utils/iterables/chain
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import {chain, map, filter, reduce} from 'ergo/utils/iterables';
 *
 * chain(
 *   [1, 2, 3, 4, 5],
 *   filter(x => x % 2 === 0),
 *   map(x => x * 10),
 *   reduce((acc, x) => acc + x, 0)
 * ); // => 60
 */

/**
 * @param {...(Iterable|function)} generators - Source iterable followed by generator transform functions
 * @returns {*} - Final pipeline result (iterable or reduced value)
 */
export default (...generators) =>
  generators.reduce((iterable, generator) => {
    return generator(iterable);
  });
