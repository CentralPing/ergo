/**
 * @fileoverview HTTP middleware factory for outbound response compression.
 *
 * Negotiates Accept-Encoding and wraps the response stream through
 * the appropriate zlib compressor (gzip, br, deflate).
 *
 * Should be placed early in the pipeline (before send) so it can
 * intercept the response before headers are sent.
 *
 * Compression is skipped for:
 * - Responses with status 204 or 304
 * - Non-compressible content types (binary, images, etc.)
 * - Bodies below the configurable `threshold` byte count (default 1 KiB)
 *
 * Compressible content types include all `text/*` types, specific
 * `application/` subtypes (json, javascript, xml, x-www-form-urlencoded),
 * and RFC 6838 structured syntax suffixes (`+json`, `+xml`).
 *
 * @module http/compress
 * @since 0.1.0
 * @requires node:zlib
 * @requires negotiator
 *
 * @example
 * import {compose, compress} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   compress(),
 *   (req, res, acc) => ({response: {body: largePayload}})
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110#section-12.5.3 RFC 9110 Section 12.5.3 - Accept-Encoding}
 * @see {@link https://www.rfc-editor.org/rfc/rfc6838#section-4.2.8 RFC 6838 Section 4.2.8 - Structured Syntax Suffixes}
 */
import zlib from 'node:zlib';
import Negotiator from 'negotiator';
import appendVary from '../lib/vary.js';
import {validateOptions} from '../lib/validate-options.js';

const NO_COMPRESS_STATUSES = new Set([204, 304]);
const COMPRESSIBLE_RE =
  /^(text\/|application\/(json|javascript|xml|x-www-form-urlencoded)\b|application\/[a-z0-9.+-]+\+(json|xml)\b)/;

/** @type {Set<string>} */
const VALID_OPTIONS = new Set(['threshold', 'encodings']);

const DEFAULT_THRESHOLD = 1024; // 1 KiB
const DEFAULT_ENCODINGS = Object.freeze(['br', 'gzip', 'deflate']);

/**
 * Creates a response compression middleware.
 *
 * @param {object} [options] - Compression configuration
 * @param {number} [options.threshold=DEFAULT_THRESHOLD] - Minimum byte size before compression is applied
 * @param {string[]} [options.encodings=DEFAULT_ENCODINGS] - Supported encodings in priority order
 * @returns {function(import('node:http').IncomingMessage, import('node:http').ServerResponse): void} - Response compression middleware
 */
export default (options = {}) => {
  validateOptions(options, VALID_OPTIONS, 'compress');
  const {threshold = DEFAULT_THRESHOLD, encodings = DEFAULT_ENCODINGS} = options;
  return function compressMiddleware(req, res) {
    const acceptEncoding = req.headers['accept-encoding'] ?? '';
    const encoding = negotiate(acceptEncoding, encodings);

    if (!encoding) {
      return;
    }

    const origEnd = res.end.bind(res);
    const origWrite = res.write.bind(res);
    const origSetHeader = res.setHeader.bind(res);

    let headersSent = false;
    let compressor;
    /** @type {((err?: Error) => void)|undefined} */
    let endCallback;

    function takeEndCallback() {
      const cb = endCallback;
      endCallback = undefined;
      return cb;
    }

    function setupCompressor() {
      if (headersSent) {
        return;
      }

      const contentType = res.getHeader('content-type') ?? '';
      if (!COMPRESSIBLE_RE.test(contentType)) {
        return;
      }

      if (NO_COMPRESS_STATUSES.has(res.statusCode)) {
        return;
      }

      compressor = createCompressor(encoding);
      if (!compressor) {
        return;
      }

      origSetHeader('Content-Encoding', encoding);
      res.removeHeader('Content-Length');

      appendVary(res, 'Accept-Encoding');

      headersSent = true;

      compressor.on('data', chunk => origWrite(chunk));
      compressor.on('end', () => {
        const cb = takeEndCallback();
        if (cb) {
          origEnd(cb);
        } else {
          origEnd();
        }
      });
      compressor.on('error', err => {
        const cb = takeEndCallback();
        // Deliver via origEnd's completion callback so cb(err) runs after finish —
        // same contract as the success path (`origEnd(cb)`). Swallow throws after
        // teardown so they cannot race as uncaughtException.
        if (!cb) {
          origEnd();
          return;
        }
        origEnd(() => {
          try {
            // Match success-path `origEnd(cb)` receiver: this === res for non-arrow cbs.
            cb.call(res, err);
          } catch {
            // Swallow throws from the user callback after teardown.
          }
        });
      });
    }

    res.write = function compressedWrite(chunk, encodingArg, cb) {
      if (!compressor) {
        setupCompressor();
      }
      if (compressor) {
        return compressor.write(chunk, encodingArg, cb);
      }
      return origWrite(chunk, encodingArg, cb);
    };

    res.end = function compressedEnd(chunk, encodingArg, cb) {
      // Node Writable.end overloads: end(cb) | end(chunk, cb) | end(chunk, encoding, cb)
      let endChunk = chunk;
      let endEncoding = encodingArg;
      let endCb = cb;
      if (typeof endChunk === 'function') {
        endCb = endChunk;
        endChunk = undefined;
        endEncoding = undefined;
      } else if (typeof endEncoding === 'function') {
        endCb = endEncoding;
        endEncoding = undefined;
      }

      if (!compressor && endChunk) {
        const size =
          typeof endChunk === 'string' ? Buffer.byteLength(endChunk, endEncoding) : endChunk.length;
        if (size < threshold) {
          return origEnd(endChunk, endEncoding, endCb);
        }
        setupCompressor();
      }
      if (compressor) {
        endCallback = endCb;
        if (endChunk) {
          compressor.end(endChunk, endEncoding);
        } else {
          compressor.end();
        }
      } else {
        origEnd(endChunk, endEncoding, endCb);
      }
      // Match ServerResponse.end / OutgoingMessage.end: return this for chaining.
      return res;
    };
  };
};

/**
 * Negotiate the best encoding from Accept-Encoding, respecting quality values.
 * Uses the `negotiator` package for RFC 7231 §5.3.4-compliant parsing.
 * Excludes `identity` since we are selecting a compression encoding.
 *
 * @param {string} acceptEncoding - Value of the Accept-Encoding request header
 * @param {string[]} supported - Supported compression encodings in priority order
 * @returns {string|undefined} - The best matched encoding name, or undefined if none matched
 */
function negotiate(acceptEncoding, supported) {
  if (!acceptEncoding) return;
  const negotiator = new Negotiator({headers: {'accept-encoding': acceptEncoding}});
  const preferred = negotiator.encodings(supported);
  return preferred.find(e => e !== 'identity');
}

/**
 * Create a zlib compressor Transform stream for the given encoding.
 *
 * @param {string} encoding - One of 'gzip', 'deflate', 'br'
 * @returns {import('node:zlib').Gzip|import('node:zlib').Deflate|import('node:zlib').BrotliCompress|undefined} - Compressor stream, or undefined for unsupported encodings
 */
function createCompressor(encoding) {
  switch (encoding) {
    case 'gzip':
      return zlib.createGzip();
    case 'deflate':
      return zlib.createDeflate();
    case 'br':
      return zlib.createBrotliCompress();
    default:
      return;
  }
}
