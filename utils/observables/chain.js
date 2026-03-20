/**
 * @fileoverview Observable pipeline composition utility.
 *
 * Push-model variant of `utils/iterables/chain`. Chains observable generators in
 * right-to-left order (each generator wraps the previous, pushing data downstream).
 * The last generator in the array is the sink.
 *
 * @module utils/observables/chain
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../type.js
 */
import type from '../type.js';

/**
 * @param {...(function|Generator)} generators - Generator functions or instances; last is the sink
 * @returns {Generator} - Chained generator pipeline composed right-to-left
 */
export default (...generators) => {
  let lastIterator = generators.pop();

  if (type(lastIterator).endsWith('GeneratorFunction')) {
    lastIterator = lastIterator();
    lastIterator.next();
  }

  return generators.reduceRight((prevIterator, generator) => {
    const nextIterator = generator(prevIterator);
    nextIterator.next();

    return nextIterator;
  }, lastIterator);
};
