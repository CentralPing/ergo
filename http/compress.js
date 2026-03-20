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
 * @module http/compress
 * @version 0.1.0
 * @since 0.1.0
 * @requires node:zlib
 * @requires negotiator
 *
 * @example
 * import {compose, compress, send} from 'ergo';
 *
 * const pipeline = compose(
 *   compress({threshold: 1024, encodings: ['br', 'gzip', 'deflate']}),
 *   (req, res, acc) => ({statusCode: 200, body: largePayload}),
 *   send()
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110#section-12.5.3 RFC 9110 Section 12.5.3 - Accept-Encoding}
 */
import zlib from 'node:zlib';
import Negotiator from 'negotiator';

const NO_COMPRESS_STATUSES = new Set([204, 304]);
const COMPRESSIBLE_RE = /^(text\/|application\/(json|javascript|xml|x-www-form-urlencoded))/;

/**
 * Creates a response compression middleware.
 *
 * @param {object} [options] - Compression configuration
 * @param {number} [options.threshold=1024] - Minimum byte size before compression is applied
 * @param {string[]} [options.encodings=['br','gzip','deflate']] - Supported encodings in priority order
 * @returns {function} - Ergo middleware `(req, res) => void` that wraps `res.write`/`res.end`
 */
export default ({threshold = 1024, encodings = ['br', 'gzip', 'deflate']} = {}) => {
  return (req, res) => {
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

      const existing = res.getHeader('Vary');
      if (!existing || !String(existing).toLowerCase().includes('accept-encoding')) {
        origSetHeader('Vary', existing ? `${existing}, Accept-Encoding` : 'Accept-Encoding');
      }

      headersSent = true;

      compressor.on('data', chunk => origWrite(chunk));
      compressor.on('end', () => origEnd());
      compressor.on('error', () => origEnd());
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
      if (!compressor && chunk) {
        const size = typeof chunk === 'string' ? Buffer.byteLength(chunk) : chunk.length;
        if (size < threshold) {
          return origEnd(chunk, encodingArg, cb);
        }
        setupCompressor();
      }
      if (compressor) {
        if (chunk) {
          compressor.end(chunk, encodingArg);
        } else {
          compressor.end();
        }
      } else {
        origEnd(chunk, encodingArg, cb);
      }
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
