/**
 * @fileoverview Try/catch wrapper for async functions.
 *
 * Wraps an async `fn` so that if it throws, the `fail` function is called with
 * the original arguments plus the caught error appended. Both functions are awaited.
 *
 * Used by `http/handler.js` to wrap the try pipeline with an error handler pipeline.
 *
 * @module utils/attempt
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import attempt from 'ergo/utils/attempt';
 *
 * const safe = attempt(
 *   async (req, res) => { throw new Error('oops'); },
 *   async (req, res, err) => { res.writeHead(500); res.end(err.message); }
 * );
 *
 * await safe(req, res); // calls the fail function with (req, res, err)
 */

/**
 * @param {function} fn - Primary async function to execute
 * @param {function} fail - Error handler called with (...originalArgs, error)
 * @returns {function} - Wrapped async function with try/catch behavior
 */
export default (fn, fail) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (e) {
      return await fail(...args, e);
    }
  };
};
