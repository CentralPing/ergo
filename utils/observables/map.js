/**
 * @fileoverview Observable map generator.
 *
 * Push-model transform generator. Each value pushed in via `.next(value)` is
 * transformed and forwarded downstream via the iterator's `.next()`.
 *
 * @module utils/observables/map
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * // Used in observable chain pipelines built with utils/observables/chain
 */

/**
 * @param {function} transform - Transform `(value, index) => newValue`
 * @returns {function} - Generator function `(iterator) => Generator` that maps values
 */
export default transform => {
  /**
   * @param {Iterator} iterator - Source iterator to transform
   */
  return function* (iterator) {
    let i = 0;

    try {
      while (true) {
        iterator.next(transform(yield, i++));
      }
    } finally {
      iterator.return();
    }
  };
};
