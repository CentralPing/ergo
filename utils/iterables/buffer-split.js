/**
 * @fileoverview Streaming Buffer split generator for async iterable pipelines.
 *
 * Creates a generator function that consumes an iterable of Buffer chunks and yields
 * `[index, buffer]` pairs split by the given separator. Handles partial matches across
 * chunk boundaries by carrying over unmatched bytes to the next iteration.
 *
 * Used by `lib/body/multiparse.js` for multipart boundary splitting.
 *
 * @module utils/iterables/buffer-split
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../buffers/split.js
 *
 * @example
 * import {chain, bufferSplit, reduce} from 'ergo/utils/iterables';
 *
 * const chunks = [Buffer.from('a--b--c')];
 * const result = chain(chunks, bufferSplit('--'), reduce((acc, [, b]) => [...acc, b.toString()], []));
 * // => ['a', 'b', 'c']
 */
import split from '../buffers/split.js';
/**
 * Creates a Buffer-splitting generator.
 *
 * @param {import('node:buffer').Buffer|string} [separator=Buffer.from('')] - Byte pattern to split on
 * @param {number} [limit=Infinity] - Maximum number of parts to yield
 * @returns {function} - Generator function `(iterable) => Generator<[number, import('node:buffer').Buffer]>`
 */
export default (separator = Buffer.from(''), limit = Infinity) => {
  const sepBuffer = Buffer.isBuffer(separator) ? separator : Buffer.from(separator);

  /**
   * @param {Iterable} iterable - Source iterable of Buffers to split
   */
  return function* (iterable) {
    let partialCarryover = Buffer.from('');
    let partialCarryoverIndexInc = false;
    let index = 0;

    try {
      let buffers;
      let lookup;
      let partial;

      for (let chunk of iterable) {
        if (index >= limit) {
          return;
        }

        // Append the previous iteration's carryover from a partial match
        // for the separator.
        const pCoLen = partialCarryover.length;

        if (pCoLen > 0) {
          chunk = Buffer.concat([partialCarryover, chunk], pCoLen + chunk.length);
        }

        const incStart = partialCarryoverIndexInc && partial ? -1 : 0;

        ({buffers, lookup, partial} = split(chunk, sepBuffer, {limit, lookup, partial}));
        /*
        buffers:
          A: [n] no matches
          B: [0, 0] one match, entire chunk
          C: [0, x[, ...]] one match at beginning and at least one more match after
          D: [x[, ...], 0] one match at end and at least one more match before
          E: [x[, ...], y] at least one match in the middle

        index increment:
          A: none
          B: on second element
          C: on second element and beyond
          D: on second element and beyond
          E: on second element and beyond
        */

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

          yield [index, buffer];
        }
      }
    } finally {
      if (partialCarryoverIndexInc) {
        index++;
      }

      // Push the carryover if a buffer ends with a partial match
      if (partialCarryover.length && index < limit) {
        yield [index, partialCarryover];
      }
    }
  };
};
