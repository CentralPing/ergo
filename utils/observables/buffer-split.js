/**
 * @fileoverview Observable Buffer split async generator.
 *
 * Push-model variant of `utils/iterables/buffer-split`. Accepts chunks via generator
 * `.next(chunk)` calls and routes split buffers to a downstream generator. Designed for
 * integration with observable-style pipelines built with `utils/observables/chain`.
 *
 * @module utils/observables/buffer-split
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../buffers/split.js
 *
 * @example
 * // Used internally by the multipart body parser's streaming pipeline
 */
import split from '../buffers/split.js';

/**
 * @param {import('node:buffer').Buffer|string} [separator=Buffer.from('')] - Byte pattern to split on
 * @param {number} [limit=Infinity] - Maximum number of parts to yield
 * @returns {function} - Async generator function `(generator) => AsyncGenerator<[number, import('node:buffer').Buffer]>`
 */
export default (separator = Buffer.from(''), limit = Infinity) => {
  const sepBuffer = Buffer.isBuffer(separator) ? separator : Buffer.from(separator);

  /**
   * @param {Generator} generator - Downstream async generator receiving split buffer segments via `.next()`
   */
  return async function* (generator) {
    let partialCarryover = Buffer.from('');
    let partialCarryoverIndexInc = false;
    let index = 0;
    let value;
    let done;
    let err;

    try {
      let buffers;
      let lookup;
      let partial;

      while (index < limit) {
        let chunk = yield value;

        // Append the previous iteration's carryover from a partial match
        // for the separator.
        const pCoLen = partialCarryover.length;

        if (pCoLen > 0) {
          chunk = Buffer.concat([partialCarryover, chunk], pCoLen + chunk.length);
        }

        const incStart = partialCarryoverIndexInc && partial ? -1 : 0;

        ({buffers, lookup, partial} = split(chunk, sepBuffer, {limit, lookup, partial}));

        partialCarryoverIndexInc = buffers.length > 1;

        if (partial > 0) {
          if (partial === buffers.at(-1).length) {
            partialCarryover = buffers.pop();
          } else {
            const last = buffers.at(-1);
            partialCarryover = last.slice(-partial);
            buffers[buffers.length - 1] = last.slice(0, -partial);
          }
        } else {
          partialCarryover = Buffer.from('');
        }

        for (let i = 0; i < buffers.length; i++) {
          if (i > incStart) {
            index++;
          }

          if (index >= limit) {
            return;
          }

          const buffer = buffers[i];
          ({value, done} = await generator.next([index, buffer]));

          if (done) {
            return;
          }
        }
      }
    } catch (e) {
      err = e;
      throw e;
    } finally {
      if (!err) {
        if (partialCarryoverIndexInc) {
          index++;
        }

        // Push the carryover if a buffer ends with a partial match
        if (partialCarryover.length && index < limit) {
          ({value} = await generator.next([index, partialCarryover]));
        }

        ({value = value} = await generator.return());

        /* eslint-disable-next-line no-unsafe-finally */
        return value;
      }
    }
  };
};
