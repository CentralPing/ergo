/**
 * @fileoverview Writable stream accumulator for collecting request body chunks.
 *
 * Creates a `Writable` stream that buffers all incoming `Buffer` chunks and consolidates
 * them into a single `Buffer` when the stream finishes. Exposed via the `.data` getter.
 *
 * Used by `http/body.js` in the 3-stream decompression pipeline:
 * `pipeline(req, meter, decompressor, writer())`
 *
 * @module lib/body/writer
 * @version 0.1.0
 * @since 0.1.0
 * @requires node:stream
 *
 * @example
 * import {pipeline} from 'node:stream';
 * import writer from 'ergo/lib/body/writer';
 *
 * const w = writer();
 * pipeline(readable, w, err => {
 *   if (!err) console.log(w.data); // => Buffer with all accumulated bytes
 * });
 */
import {Writable} from 'node:stream';

const chunksSym = Symbol('chunks');
const bytesSym = Symbol('bytes');

/**
 * Creates a Writable stream that accumulates chunks into a single Buffer.
 *
 * @returns {import('node:stream').Writable} - Writable stream with a `.data` getter for the concatenated Buffer (available after stream ends)
 */
export default () => {
  const w = Object.defineProperties(new Writable({write, final}), {
    [chunksSym]: {
      value: [],
      writable: true
    },
    [bytesSym]: {
      value: 0,
      writable: true
    },
    data: {
      get() {
        return this[chunksSym];
      }
    }
  });

  return w;
};

/**
 * @param {import('node:buffer').Buffer} chunk - Incoming data chunk
 * @param {string} encoding - Chunk encoding (ignored for Buffers)
 * @param {function} cb - Callback to signal write completion
 */
function write(chunk, encoding, cb) {
  const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);
  this[chunksSym].push(buf);
  this[bytesSym] += buf.length;
  cb(null);
}

/**
 * @param {function} cb - Callback to signal finalization is complete
 */
function final(cb) {
  // Consolidate all chunks into a single Buffer
  this[chunksSym] = Buffer.concat(this[chunksSym], this[bytesSym]);
  cb(null);
}
