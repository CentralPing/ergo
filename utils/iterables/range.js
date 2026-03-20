/**
 * @fileoverview Integer range generator.
 *
 * Produces a sequence of integers from `start` (inclusive) to `stop` (exclusive)
 * stepping by `step`. Mirrors Python's `range()` behaviour.
 *
 * @module utils/iterables/range
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import range from 'ergo/utils/iterables/range';
 *
 * [...range(5)]        // => [0, 1, 2, 3, 4]
 * [...range(1, 5)]     // => [1, 2, 3, 4]
 * [...range(0, 10, 2)] // => [0, 2, 4, 6, 8]
 */

/**
 * @param {number} start - Start value (or stop if only one arg)
 * @param {number} [stop] - Exclusive upper bound
 * @param {number} [step=1] - Step increment
 * @returns {Generator<number>} - Sequence of integers
 */
/* eslint-disable-next-line no-param-reassign */
export default function* (start, stop = start + (start = 0), step = 1) {
  if (step === 0) return;

  const length = (stop - start) / step;

  for (let i = 0; i < length; i++) {
    yield i * step + start;
  }
}
