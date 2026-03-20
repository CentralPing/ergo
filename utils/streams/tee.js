/**
 * @fileoverview Tee Transform stream for sidecar generator pipelines.
 *
 * Forwards all chunks through a generator's `next()` call, then passes them
 * unchanged to the next stream in the pipeline. Allows intercepting stream data
 * for side-effect processing (hashing, logging, validation) without buffering.
 *
 * If no generator is provided, a no-op generator is used (pure passthrough).
 *
 * @module utils/streams/tee
 * @version 0.1.0
 * @since 0.1.0
 * @requires node:stream
 *
 * @example
 * import {pipeline} from 'node:stream';
 * import tee from 'ergo/utils/streams/tee';
 *
 * async function* inspect(gen) {
 *   let chunk;
 *   while ((chunk = yield) !== undefined) {
 *     console.log('chunk size:', chunk.length);
 *     gen.next(chunk);
 *   }
 *   gen.return();
 * }
 *
 * pipeline(readable, tee(inspect(sink)), writable, err => {});
 */
import {Transform} from 'node:stream';

const generatorSym = Symbol('generator');

/**
 * Creates a Transform stream that forwards each chunk to a generator as a side channel.
 *
 * @param {Generator} generator - Initialized generator to receive chunks via `.next(chunk)`
 * @returns {import('node:stream').Transform} - Transform stream that passes data through while teeing to the generator
 */
export default generator => {
  if (generator === undefined) {
    /* eslint-disable-next-line no-param-reassign */
    generator = (function* () {})();
    generator.next();
  }

  return Object.defineProperties(new Transform({transform, final}), {
    [generatorSym]: {
      value: generator
    }
  });
};

/**
 * @param {import('node:buffer').Buffer} chunk - Incoming data chunk
 * @param {string} encoding - Chunk encoding
 * @param {function} cb - Callback to signal transform completion
 */
async function transform(chunk, encoding, cb) {
  let err = null;

  try {
    await this[generatorSym].next(chunk);
  } catch (e) {
    err = e;
  } finally {
    cb(err, chunk);
  }
}

/**
 * @param {function} cb - Callback to signal finalization is complete
 */
async function final(cb) {
  let err = null;

  try {
    await this[generatorSym].return();
  } catch (e) {
    err = e;
  } finally {
    cb(err);
  }
}
