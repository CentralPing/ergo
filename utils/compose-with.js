/**
 * @fileoverview Path-based compose utility for Ergo middleware pipelines (v2).
 *
 * Extends `utils/compose` with a two-accumulator model: a **domain accumulator** for
 * inter-middleware data and a **response accumulator** for HTTP response construction.
 *
 * Each operation can be expressed as:
 * - A plain function: `fn` (receives `(...args, domainAcc)`)
 * - A tuple: `[fn, setPath]` where:
 *   - `fn` — the middleware function
 *   - `setPath` — the domain accumulator key to store the return value under
 *
 * Middleware returns are interpreted as `{value?, response?}`:
 * - `value` is merged into the domain accumulator (at `setPath` for tuples, or
 *   `Object.assign` for plain functions)
 * - `response` is merged into the response accumulator (headers append, scalars set)
 * - When `responseAcc.statusCode` is set, serial iteration breaks immediately
 * - `undefined` / `null` returns skip all merges
 *
 * Plain return values (without `value` or `response` keys) are treated as `{value: ret}`
 * for compatibility with simple middleware that only produce domain data.
 *
 * @module utils/compose-with
 * @version 0.2.0
 * @since 0.1.0
 * @requires ./compose.js
 * @requires ./set.js
 *
 * @example
 * import compose, {createResponseAcc} from 'ergo/utils/compose-with';
 *
 * const responseAcc = createResponseAcc();
 * const pipeline = compose(
 *   [logger(), 'log'],
 *   [authorization({...}), 'auth'],
 *   [body(), 'body'],
 *   (req, res, acc) => ({response: {body: process(acc.body), statusCode: 200}})
 * );
 *
 * await pipeline(req, res, responseAcc, domainAcc);
 * // responseAcc.statusCode, responseAcc.headers, etc.
 */
import {accumulator} from './compose.js';
import set from './set.js';

/**
 * Creates a null-prototype response accumulator.
 *
 * The returned object has a non-enumerable `isResponseAcc` flag used by the pipeline
 * to distinguish it from the domain accumulator in the argument list.
 *
 * @returns {object} - Null-prototype object with `isResponseAcc: true`
 */
export function createResponseAcc() {
  const acc = Object.create(null);
  Object.defineProperty(acc, 'isResponseAcc', {value: true});
  return acc;
}

/**
 * Merges a response patch into the response accumulator.
 *
 * - `headers` arrays are **appended** (additive across middleware)
 * - All other properties are **assigned** (last writer wins)
 *
 * @param {object} responseAcc - Mutable response accumulator
 * @param {object} patch - Response contribution from middleware
 */
export function mergeResponse(responseAcc, patch) {
  if (patch.headers) {
    responseAcc.headers ??= [];
    responseAcc.headers.push(...patch.headers);
  }

  for (const key of Object.keys(patch)) {
    if (key !== 'headers') responseAcc[key] = patch[key];
  }
}

/**
 * Extracts `{value, response}` from a middleware return value.
 *
 * If the return is an object with a `value` or `response` key, those are used directly.
 * Otherwise the entire return is treated as `{value: ret}` for backward compatibility
 * with middleware that return plain domain data.
 *
 * @param {*} resolved - Resolved return value from middleware
 * @returns {{value: *, response: *}} - Extracted value and response
 */
function extractReturn(resolved) {
  if (
    resolved !== null &&
    typeof resolved === 'object' &&
    !Array.isArray(resolved) &&
    ('value' in resolved || 'response' in resolved)
  ) {
    return resolved;
  }

  return {value: resolved};
}

/**
 * Converts an operation spec into a normalized descriptor.
 *
 * @param {function|Array} op - A plain function or `[fn, setPath]` tuple
 * @returns {{fn: function, setPath: string|undefined}} - Normalized descriptor
 */
function normalizeOp(op) {
  if (!Array.isArray(op)) return {fn: op, setPath: undefined};
  return {fn: op[0], setPath: op[1]};
}

/**
 * Runs middleware descriptors sequentially with two-accumulator support.
 *
 * Uses a sync fast-path: when a middleware returns a non-thenable value, merging
 * happens immediately without a microtask hop.
 *
 * @param {Array<{fn: function, setPath: string|undefined}>} descriptors - Normalized ops
 * @param {*[]} args - Original request arguments (req, res, etc.)
 * @param {object} domainAcc - Domain accumulator
 * @param {object} responseAcc - Response accumulator
 * @returns {object} - Final domain accumulator
 */
async function serial(descriptors, args, domainAcc, responseAcc) {
  for (const {fn, setPath} of descriptors) {
    const raw = fn(...args, domainAcc, responseAcc);
    const resolved = typeof raw?.then === 'function' ? await raw : raw;

    if (resolved == null) continue;

    const {value, response} = extractReturn(resolved);

    if (value !== undefined) {
      if (setPath !== undefined) {
        set(domainAcc, setPath, value);
      } else if (typeof value === 'object') {
        Object.assign(domainAcc, value);
      }
    }

    if (response !== undefined) {
      mergeResponse(responseAcc, response);
    }

    if (responseAcc.statusCode !== undefined) break;
  }

  return domainAcc;
}

/**
 * Runs middleware descriptors concurrently with two-accumulator support.
 *
 * Each branch receives an isolated domain accumulator copy. After all branches
 * complete, values and responses are merged in declaration order.
 *
 * @param {Array<{fn: function, setPath: string|undefined}>} descriptors - Normalized ops
 * @param {*[]} args - Original request arguments
 * @param {object} domainAcc - Domain accumulator
 * @param {object} responseAcc - Response accumulator
 * @returns {object} - Final domain accumulator
 */
async function concurrent(descriptors, args, domainAcc, responseAcc) {
  const copies = descriptors.map(() => Object.assign(accumulator(), domainAcc));
  const rets = descriptors.map(({fn}, i) => fn(...args, copies[i], responseAcc));
  const hasAsync = rets.some(r => typeof r?.then === 'function');
  const results = hasAsync ? await Promise.all(rets) : rets;

  for (let i = 0; i < descriptors.length; i++) {
    const resolved = results[i];
    if (resolved == null) continue;

    const {setPath} = descriptors[i];
    const {value, response} = extractReturn(resolved);

    if (value !== undefined) {
      if (setPath !== undefined) {
        set(domainAcc, setPath, value);
      } else if (typeof value === 'object') {
        Object.assign(domainAcc, value);
      }
    }

    if (response !== undefined) {
      mergeResponse(responseAcc, response);
    }
  }

  return domainAcc;
}

/**
 * Composes middleware with path-based result storage and two-accumulator support.
 *
 * The composed function pops the domain accumulator (last arg with `isAccumulator`)
 * and response accumulator (last arg with `isResponseAcc`) from its arguments.
 * If either is absent, a fresh one is created.
 *
 * @param {...(function|Array)} ops - Operation specs; each is a function or `[fn, setPath]`
 * @returns {function} - Async composed pipeline
 */
const composeWith = (...ops) => {
  const descriptors = ops.map(normalizeOp);

  return async (...args) => {
    const domainAcc = args.at(-1)?.isAccumulator ? args.pop() : accumulator();
    const responseAcc = args.at(-1)?.isResponseAcc ? args.pop() : createResponseAcc();

    return await serial(descriptors, args, domainAcc, responseAcc);
  };
};

/**
 * Concurrent variant of composeWith.
 *
 * @param {...(function|Array)} ops - Operation specs
 * @returns {function} - Async composed pipeline
 */
composeWith.all = (...ops) => {
  const descriptors = ops.map(normalizeOp);

  return async (...args) => {
    const domainAcc = args.at(-1)?.isAccumulator ? args.pop() : accumulator();
    const responseAcc = args.at(-1)?.isResponseAcc ? args.pop() : createResponseAcc();

    return await concurrent(descriptors, args, domainAcc, responseAcc);
  };
};

export default composeWith;
