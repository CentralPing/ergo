/**
 * @fileoverview Path-based compose utility for Ergo middleware pipelines.
 *
 * Extends `utils/compose` with declarative path-based argument extraction and result
 * storage. Each operation can be expressed as:
 * - A plain function: `fn` (receives the full accumulator)
 * - A tuple: `[fn, getPaths, setPath]` where:
 *   - `fn` — the middleware function
 *   - `getPaths` — an array of accumulator keys to extract and pass as an argument,
 *     a single string path, or `[]` to pass the full accumulator
 *   - `setPath` — the accumulator key to store the return value under
 *
 * This pattern implements the Fast Fail four-stage pipeline in a declarative way,
 * making each stage's data dependencies and output location explicit.
 *
 * Tuple wrappers are sync-capable: when the underlying middleware returns a
 * non-thenable value the wrapper returns a plain object, allowing `serial()`
 * in compose.js to skip `await` and avoid a microtask hop.
 *
 * @module utils/compose-with
 * @version 0.1.0
 * @since 0.1.0
 * @requires ./compose.js
 * @requires ./get.js
 * @requires ./set.js
 * @requires ./pick.js
 *
 * @example
 * import compose from 'ergo/utils/compose-with';
 * import {authorization, body, logger, send} from 'ergo';
 *
 * const pipeline = compose(
 *   [logger(), [], 'log'],           // log = logger(req, res, acc)
 *   [authorization({...}), [], 'auth'], // auth = await authorization(req, res, acc)
 *   [body(), [], 'body'],            // body = await body(req, res, acc)
 *   (req, res, acc) => ({result: process(acc.body)}),
 *   send()
 * );
 */
import compose from './compose.js';
import get from './get.js';
import set from './set.js';
import pick from './pick.js';

/**
 * Composes middleware with path-based argument extraction and result storage.
 *
 * @param {...(function|Array)} ops - Operation specs; each is a function or `[fn, getPaths, setPath]`
 * @returns {function} - Async composed pipeline
 */
const composeWith = (...ops) => compose(...wrapOps(ops));
composeWith.all = (...ops) => compose.all(...wrapOps(ops));
export default composeWith;

/**
 * Transforms an array of operation specs into standard compose-compatible middleware functions.
 *
 * Tuple operations are wrapped in a sync-capable function that checks the return
 * value for a `.then` method. Sync middleware avoids Promise wrapping entirely;
 * async middleware chains the setPath assignment via `.then()`.
 *
 * @param {Array<function|Array>} ops - Operation specs; each is a function or `[fn, getPaths, setPath]`
 * @returns {function[]} - Wrapped middleware functions suitable for `compose`
 */
function wrapOps(ops) {
  return ops.map(op => {
    if (!Array.isArray(op)) {
      return op;
    }

    const [f, getPaths = [], setPath] = op;

    return (...args) => {
      const acc = args.pop();
      const arg = !Array.isArray(getPaths)
        ? get(acc, getPaths)
        : getPaths.length
          ? pick(acc, getPaths)
          : acc;
      const ret = f(...args, arg);

      if (typeof ret?.then === 'function') {
        return ret.then(value => {
          if (setPath === undefined) return value;
          const retObj = {};
          set(retObj, setPath, value);
          return retObj;
        });
      }

      if (setPath === undefined) return ret;
      const retObj = {};
      set(retObj, setPath, ret);
      return retObj;
    };
  });
}
