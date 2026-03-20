/**
 * @fileoverview Async pipeline composition utility.
 *
 * Creates an async pipeline from a list of middleware functions. Each function receives
 * the original arguments plus the accumulated state object from prior middleware.
 *
 * - `compose(...fns)` — runs functions sequentially (`serial`)
 * - `compose.all(...fns)` — runs functions concurrently and merges all results
 *
 * State is accumulated into a null-prototype accumulator object with an
 * `isAccumulator: true` flag and a `size` getter. If the last argument passed to the
 * composed pipeline is already an accumulator object, it is reused for accumulation.
 *
 * Serial composition uses a sync fast-path: when a middleware returns a non-thenable
 * value, the result is merged immediately without scheduling a microtask. This
 * eliminates unnecessary `await` overhead for synchronous middleware (the majority
 * of ergo's built-in middleware).
 *
 * @module utils/compose
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import compose from 'ergo/utils/compose';
 *
 * const pipeline = compose(
 *   async (req, res) => ({user: await getUser(req)}),
 *   async (req, res, {user}) => ({role: await getRole(user)})
 * );
 *
 * const result = await pipeline(req, res);
 * // result.user, result.role
 */
/**
 * Composes middleware functions into an async pipeline with result accumulation.
 *
 * @param {...function} fns - Middleware functions to compose
 * @returns {function} - Async composed pipeline
 */
const compose = (...fns) => setup(serial, fns);
compose.all = (...fns) => setup(concurrent, fns);
export default compose;

/**
 * Runs middleware functions sequentially, accumulating results.
 *
 * Uses a sync fast-path: if a function returns a non-thenable value the result
 * is merged immediately, avoiding a microtask hop for synchronous middleware.
 * The accumulator is passed directly (no defensive copy) because serial steps
 * cannot observe concurrent mutations.
 *
 * @param {function[]} fns - Ordered middleware functions
 * @param {*[]} args - Original request arguments (req, res, etc.)
 * @param {object} acc - Accumulator
 * @returns {object} - Final accumulated state
 */
async function serial(fns, args, acc) {
  for (const f of fns) {
    const ret = f(...args, acc);
    Object.assign(acc, typeof ret?.then === 'function' ? await ret : ret);
  }

  return acc;
}

/**
 * Runs middleware functions concurrently, merging all results.
 *
 * Each branch receives an isolated accumulator copy so concurrent functions
 * cannot observe each other's mutations. When every branch returns a
 * non-thenable value, `Promise.all` is skipped entirely.
 *
 * @param {function[]} fns - Middleware functions to run concurrently
 * @param {*[]} args - Original request arguments
 * @param {object} acc - Accumulator
 * @returns {object} - Merged accumulated state
 */
async function concurrent(fns, args, acc) {
  const copies = fns.map(() => accumulator(acc));
  const rets = fns.map((f, i) => f(...args, copies[i]));
  const hasAsync = rets.some(r => typeof r?.then === 'function');

  if (hasAsync) {
    return Object.assign(acc, ...(await Promise.all(rets)));
  }

  return Object.assign(acc, ...rets);
}

/**
 * Creates a composed async function with an initialized accumulator.
 *
 * @param {function} processor - `serial` or `concurrent`
 * @param {function[]} fns - Middleware functions
 * @returns {function} - Async composed function `(...args) => Accumulator`
 */
function setup(processor, fns) {
  return async (...args) => {
    const acc = args.length && args.at(-1)?.isAccumulator ? args.pop() : accumulator();

    return await processor(fns, args, acc);
  };
}

/**
 * Creates a null-prototype accumulator object.
 *
 * @param {object} [defaults={}] - Initial properties to copy into the accumulator
 * @returns {object} - Null-prototype accumulator with `isAccumulator: true` and `size` getter
 */
function accumulator(defaults = {}) {
  const acc = Object.create(null);

  Object.defineProperties(acc, {
    isAccumulator: {value: true},
    size: {
      get() {
        return Object.keys(this).length;
      }
    }
  });

  return Object.assign(acc, defaults);
}
