/**
 * @fileoverview KMP (Knuth-Morris-Pratt) substring search for Node.js Buffers.
 *
 * Finds all occurrences of a byte pattern in a Buffer using the KMP algorithm.
 * Supports incremental/streaming search by accepting and returning a `partial` counter
 * and pre-computed `lookup` table, enabling multi-chunk searches without re-scanning.
 *
 * Returns match start indices, the KMP failure function (`lookup`), and the unfinished
 * match state (`partial`) for the next chunk.
 *
 * @module utils/buffers/match
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import bufferMatch from 'ergo/utils/buffers/match';
 *
 * const {matches} = bufferMatch(Buffer.from('hello world'), Buffer.from('l'));
 * // matches => [2, 3, 9]
 */
/**
 * Searches for all occurrences of `searchBuffer` in `buffer` using KMP.
 *
 * @param {import('node:buffer').Buffer} [buffer=Buffer.from('')] - The buffer to search within
 * @param {import('node:buffer').Buffer} [searchBuffer] - The byte pattern to search for
 * @param {object} [options] - KMP search options
 * @param {number} [options.limit=Infinity] - Maximum matches to return
 * @param {number} [options.partial=0] - KMP partial match state from a prior chunk
 * @param {number[]} [options.lookup] - Pre-computed KMP failure function table
 * @returns {{matches: number[], partial: number, lookup: number[]}} - Match result with indices, partial state, and lookup table
 */
export default (
  buffer = Buffer.from(''),
  searchBuffer,
  {limit = Infinity, partial = 0, lookup} = {}
) => {
  /* eslint-disable no-param-reassign */
  const matches = [];

  if (lookup === undefined) {
    lookup = makeLookup(searchBuffer);
  }

  if (lookup.length === 0) {
    return {matches, partial, lookup};
  }

  for (let i = partial; i < buffer.length; i++) {
    while (partial >= 0 && buffer[i] !== searchBuffer[partial]) {
      if (partial > 0) {
        partial = lookup[partial - 1];
      } else {
        partial = -1;
      }
    }

    partial += 1;
    if (partial === searchBuffer.length) {
      matches.push(i - partial + 1);
      partial = 0;

      if (matches.length >= limit) {
        break;
      }
    }
  }

  return {matches, partial, lookup};
  /* eslint-enable no-param-reassign */
};

/**
 * Builds the KMP failure function (partial match table) for a byte pattern.
 *
 * @param {import('node:buffer').Buffer|string} [searchBuffer=''] - The pattern to pre-process
 * @returns {number[]} - The KMP failure function table
 */
function makeLookup(searchBuffer = '') {
  const lookup = [];
  let pos = -1;

  for (let i = 0; i < searchBuffer.length; i++) {
    while (pos >= 0 && searchBuffer[i] !== searchBuffer[pos]) {
      pos -= 1;

      if (pos >= 0) {
        pos = lookup[pos];
      }
    }

    pos += 1;
    lookup.push(pos);
  }

  return lookup;
}
