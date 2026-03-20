/**
 * @fileoverview Observable take generator.
 *
 * Push-model variant of `utils/iterables/take`. Passes at most `n` values to the
 * downstream iterator, then calls `.return()` to signal completion.
 *
 * @module utils/observables/take
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * // Used in observable chain pipelines built with utils/observables/chain
 */

/**
 * @param {number} [n=Infinity] - Maximum number of values to pass through
 * @returns {function} - Generator function `(iterator) => Generator` that yields at most n values
 */
export default (n = Infinity) => {
  /**
   * @param {Iterator} iterator - Downstream generator receiving forwarded values via `.next()`
   */
  return function* (iterator) {
    let i = 0;

    try {
      while (true) {
        const val = yield;

        if (i++ >= n) {
          return;
        }

        iterator.next(val);
      }
    } finally {
      iterator.return();
    }
  };
};
