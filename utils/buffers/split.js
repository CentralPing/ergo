/**
 * @fileoverview Buffer split utility using KMP-based pattern matching.
 *
 * Splits a Buffer by a separator pattern, analogous to `String.prototype.split()`.
 * Supports incremental/streaming operation by threading `partial` and `lookup`
 * state across chunks.
 *
 * Returns `{buffers, partial, lookup}` where `buffers` is the array of Buffer slices.
 *
 * @module utils/buffers/split
 * @version 0.1.0
 * @since 0.1.0
 * @requires ./match.js
 * @requires ../get.js
 *
 * @example
 * import bufferSplit from 'ergo/utils/buffers/split';
 *
 * const {buffers} = bufferSplit(Buffer.from('a--b--c'), Buffer.from('--'));
 * // buffers => [Buffer<'a'>, Buffer<'b'>, Buffer<'c'>]
 */
import bufferMatch from './match.js';
import get from '../get.js';

/**
 * Splits a Buffer by a separator pattern.
 *
 * @param {import('node:buffer').Buffer|string} buffer - Source buffer to split
 * @param {import('node:buffer').Buffer} [separator] - Byte pattern to split on
 * @param {object} [options] - KMP split options
 * @param {number} [options.limit=Infinity] - Maximum splits to produce
 * @param {number} [options.partial=0] - Partial KMP match state from prior chunk
 * @param {number[]} [options.lookup] - Pre-computed KMP failure function table
 * @returns {{buffers: import('node:buffer').Buffer[], partial: number, lookup: number[]}} - Split result with buffer slices, partial state, and lookup table
 */
export default (buffer = Buffer.from(''), separator, {limit = Infinity, ...options} = {}) => {
  const sepLen = get(separator, 'length', {safe: true}) ?? 0;
  const {matches, ...rest} = bufferMatch(buffer, separator, {limit, ...options});

  matches.push(buffer.length);

  const splitsLength = Math.min(limit, matches.length);

  let start = 0;
  const buffers = Array.from({length: splitsLength}, (v, i) => {
    const offset = matches[i];
    const split = buffer.slice(start, offset);

    start = offset + sepLen;

    return split;
  });

  return {buffers, ...rest};
};
