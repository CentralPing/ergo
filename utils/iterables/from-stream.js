/**
 * @fileoverview Converts a Node.js Readable stream to an async iterable.
 *
 * All Node.js Readable streams support `Symbol.asyncIterator` natively since
 * Node.js 12. This module simply returns the stream as-is, providing a stable
 * interface for code that receives streams and needs to iterate them.
 *
 * @module utils/iterables/from-stream
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import fromStream from 'ergo/utils/iterables/from-stream';
 * import {Readable} from 'node:stream';
 *
 * const readable = Readable.from(['hello', ' ', 'world']);
 * for await (const chunk of fromStream(readable)) {
 *   process.stdout.write(chunk.toString());
 * }
 */

/**
 * Returns a Node.js Readable stream as an async iterable.
 * All Readable streams support Symbol.asyncIterator since Node.js 12.
 *
 * @param {import('node:stream').Readable} stream - Readable stream to iterate
 * @returns {AsyncIterable} - The stream itself, which natively supports async iteration
 */
export default stream => stream;
