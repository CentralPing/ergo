/**
 * @fileoverview Byte-counting Transform stream.
 *
 * Passes all data through while counting received bytes. Emits an error if the
 * byte count exceeds `limit` (TooLarge) or diverges from the expected `Content-Length`
 * (InvalidLength). Used by `http/body.js` to enforce size constraints.
 *
 * @module utils/streams/meter
 * @version 0.1.0
 * @since 0.1.0
 * @requires node:stream
 *
 * @example
 * import {pipeline} from 'node:stream';
 * import meter from 'ergo/utils/streams/meter';
 *
 * const m = meter({limit: 1024 * 1024, expected: 512});
 * pipeline(readable, m, writable, err => {
 *   if (!err) console.log('bytes received:', m.bytesRead);
 * });
 */
import {Transform} from 'node:stream';
/**
 * Creates a byte-metering Transform stream.
 *
 * @param {object} [options] - Meter configuration
 * @param {number} [options.expected] - Expected byte count (from Content-Length)
 * @param {number} [options.limit=Infinity] - Maximum bytes allowed
 * @returns {import('node:stream').Transform} - Transform with `bytesRead`, `limit`, `expected` properties
 */
export default ({expected, limit = Infinity} = {}) =>
  Object.defineProperties(new Transform({transform, final}), {
    limit: {
      value: limit,
      writable: true
    },
    bytesRead: {
      value: 0,
      writable: true
    },
    expected: {
      value: expected,
      writable: true
    }
  });

/**
 * Accumulates byte count and emits an error if limits are exceeded.
 *
 * @param {import('node:buffer').Buffer} chunk - Incoming data chunk
 * @param {string} encoding - Encoding (unused for Buffer chunks)
 * @param {function} cb - Node.js Transform callback
 */
function transform(chunk, encoding, cb) {
  this.bytesRead += Buffer.byteLength(chunk);
  const err =
    this.bytesRead > this.limit
      ? Object.assign(new Error('Body exceeded size limit'), {
          type: 'TooLarge',
          limit: this.limit,
          length: this.bytesRead
        })
      : this.expected !== undefined && this.bytesRead > this.expected
        ? Object.assign(new Error('Body exceeds Content-Length'), {
            type: 'InvalidLength',
            length: this.expected,
            received: this.bytesRead
          })
        : null;

  cb(err, chunk);
}

/**
 * Validates final byte count against expected Content-Length.
 *
 * @param {function} cb - Node.js Transform callback
 */
function final(cb) {
  const err =
    this.expected !== undefined && this.bytesRead !== this.expected
      ? Object.assign(new Error('Body does not match Content-Length'), {
          type: 'InvalidLength',
          length: this.expected,
          received: this.bytesRead
        })
      : null;

  cb(err);
}
