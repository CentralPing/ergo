/**
 * @fileoverview HTTP middleware factory for request body parsing.
 *
 * Reads and parses the request body according to the declared `Content-Type`. Supports:
 * - `application/json` and `application/vnd.api+json` — parsed via `JSON.parse`
 * - `application/x-www-form-urlencoded` — parsed via the query string parser
 * - `multipart/form-data` — parsed via the RFC 7578 streaming multipart parser
 *
 * Handles both `Content-Length` and `Transfer-Encoding: chunked` requests. Enforces
 * a configurable byte limit (default 1 MiB). Returns `{response: {statusCode, detail}}` for:
 * - `411 Length Required` if neither Content-Length nor chunked encoding is present
 * - `413 Payload Too Large` if the body exceeds the limit
 * - `415 Unsupported Media Type` for unrecognized content types
 * - `400 Bad Request` if Content-Length doesn't match received bytes or the body is malformed
 *
 * Contains a fast path for identity-encoded `application/json` that bypasses the
 * 3-stream pipeline for reduced per-request overhead.
 *
 * @module http/body
 * @version 0.1.0
 * @since 0.1.0
 * @requires node:stream
 * @requires node:zlib
 * @requires content-type
 * @requires ../utils/streams/meter.js
 * @requires ../lib/body/writer.js
 * @requires ../lib/query.js
 * @requires ../lib/body/multiparse.js
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, body} from 'ergo';
 *
 * const pipeline = compose(
 *   [body({limit: 2 * 1024 * 1024}), 'body'],
 *   // acc.body => {type, charset, encoding, length, received, raw, parsed}
 *   // For JSON types, acc.body.parsed is the decoded object
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7578 RFC 7578 - Returning Values from Forms: multipart/form-data}
 */
import zlib from 'node:zlib';
import {PassThrough} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {parse} from 'content-type';

import meter from '../utils/streams/meter.js';
import writer from '../lib/body/writer.js';
import formParse from '../lib/query.js';
import multiParse from '../lib/body/multiparse.js';
import httpErrors from '../utils/http-errors.js';

const errors = {
  TooLarge({limit, length} = {}) {
    return httpErrors(413, {
      message: `Body exceeded limit: [${limit}]; received: [${length}]`
    });
  },
  NoLength({length} = {}) {
    return httpErrors(411, {
      message: `Content-Length is required: [${length}]`
    });
  },
  InvalidLength({length, received} = {}) {
    return httpErrors(400, {
      message: `Invalid Content-Length: [${length}]; received [${received}]`
    });
  },
  Unsupported({prop, value, err} = {}) {
    return httpErrors(415, {
      message: `Unsupported ${prop}: [${value}]`,
      originalError: err
    });
  },
  Malformed({type, err} = {}) {
    return httpErrors(400, {
      message: `Malformed ${type} body`,
      originalError: err
    });
  }
};

const parsers = new Proxy(
  {
    'application/x-www-form-urlencoded': formParse,
    'multipart/form-data': multiParse
  },
  {
    get(o, p) {
      return Object.hasOwn(o, p) ? o[p] : JSON.parse;
    }
  }
);

const decompressors = new Proxy(
  {
    gzip: zlib.createGunzip,
    deflate: zlib.createInflate,
    br: zlib.createBrotliDecompress,
    identity: () => new PassThrough()
  },
  {
    get(o, p) {
      if (Object.hasOwn(o, p)) {
        return o[p]();
      } else {
        throw errors.Unsupported({prop: 'Content-Encoding', value: p});
      }
    }
  }
);

/**
 * Creates a request body parsing middleware.
 *
 * @param {object} [options] - Body parser configuration
 * @param {number} [options.limit=DEFAULT_LIMIT] - Maximum body size in bytes (default 1 MiB)
 * @param {number} [options.decompressedLimit] - Maximum decompressed body size (default 10 * limit, capped at MAX_DECOMPRESSED)
 * @param {string[]} [options.types] - Allowed Content-Type MIME types
 * @param {string} [options.charset='utf-8'] - Default character encoding
 * @returns {function} - Async middleware `(req) => {type, charset, encoding, length, received, boundary, raw, parsed}` on success; on error `{response: {statusCode: 400|411|413|415, detail: string}}`. Errors without `statusCode` are rethrown.
 */
const DEFAULT_LIMIT = 1 << 20; // 1 MiB
const MAX_DECOMPRESSED = 10 * DEFAULT_LIMIT; // 10 MiB hard cap

export default ({
    limit = DEFAULT_LIMIT,
    decompressedLimit = Math.min(10 * limit, MAX_DECOMPRESSED),
    types = [
      'application/vnd.api+json',
      'application/json',
      'application/x-www-form-urlencoded',
      'multipart/form-data'
    ],
    charset = 'utf-8'
  } = {}) =>
  async req => {
    try {
      let type;
      let boundary;
      let charsetEncoding = charset;
      const ctHeader = req.headers['content-type'] ?? '';

      // Fast path: plain "application/json" with no parameters
      if (ctHeader === 'application/json') {
        type = 'application/json';
      } else {
        try {
          ({
            type,
            parameters: {charset: charsetEncoding = charsetEncoding, boundary}
          } = parse(req));
        } catch (err) {
          throw errors.Unsupported({prop: 'Content-Type', value: ctHeader, err});
        }
      }

      if (!types.includes(type)) {
        throw errors.Unsupported({prop: 'Content-Type', value: type});
      }

      const hasContentLength = 'content-length' in req.headers;
      // Per RFC 9112 §6.3, Transfer-Encoding overrides Content-Length when both present.
      // Node's HTTP parser decodes chunked framing before this middleware sees chunks.
      // Keeping the Content-Length check provides an extra integrity validation:
      // if the proxy forwarded both headers, a mismatch results in a 400 rather than
      // silent acceptance of inconsistent framing.
      const isChunked = /\bchunked\b/i.test(req.headers['transfer-encoding'] ?? '');

      let length;

      if (hasContentLength) {
        length = Number(req.headers['content-length']);
        if (Number.isNaN(length) || length < 0) {
          throw errors.NoLength({length: req.headers['content-length']});
        }
        if (length > limit) {
          throw errors.TooLarge({limit, length});
        }
      } else if (!isChunked) {
        throw errors.NoLength({length: req.headers['content-length']});
      }

      const encoding = req.headers['content-encoding'];
      const isIdentity = !encoding || encoding === 'identity';

      const {data: raw, received} = isIdentity
        ? await readBodyDirect(req, {limit, expected: length, encoding: charsetEncoding})
        : await readReqStream(req, {
            limit,
            decompressedLimit,
            expected: length,
            type: encoding,
            encoding: charsetEncoding
          });

      const result = {type, charset: charsetEncoding, encoding, length, received, boundary, raw};

      // Fast path: for JSON types, parse immediately instead of a lazy getter
      if (
        isIdentity &&
        type !== 'multipart/form-data' &&
        type !== 'application/x-www-form-urlencoded'
      ) {
        try {
          result.parsed = JSON.parse(raw);
        } catch (err) {
          throw errors.Malformed({type, err});
        }
        return result;
      }

      Object.defineProperty(result, 'parsed', {
        get() {
          try {
            return (this.parsed = parsers[type](this.raw, this.boundary));
          } catch (err) {
            throw errors.Malformed({type, err});
          }
        },
        set(v) {
          delete this.parsed;
          this.parsed = v;
        },
        configurable: true
      });

      return result;
    } catch (err) {
      if (err?.statusCode) {
        return {response: {statusCode: err.statusCode, detail: err.message}};
      }
      throw err;
    }
  };

/**
 * Fast path: buffer the request body directly without creating intermediate
 * stream objects. Used when Content-Encoding is identity (no compression).
 *
 * Replicates the same size guards as the stream pipeline (meter + writer).
 *
 * @param {import('node:stream').Readable} stream - Incoming request body stream
 * @param {object} options - Size-guard and charset options
 * @returns {Promise<{data: string, received: number}>} - Resolved body string and byte count
 */
async function readBodyDirect(stream, {limit = Infinity, expected, encoding} = {}) {
  const chunks = [];
  let bytesRead = 0;

  for await (const chunk of stream) {
    bytesRead += chunk.length;

    if (bytesRead > limit) {
      stream.destroy();
      throw errors.TooLarge({limit, length: bytesRead});
    }

    if (expected !== undefined && bytesRead > expected) {
      stream.destroy();
      throw errors.InvalidLength({length: expected, received: bytesRead});
    }

    chunks.push(chunk);
  }

  if (expected !== undefined && bytesRead !== expected) {
    throw errors.InvalidLength({length: expected, received: bytesRead});
  }

  try {
    return {data: Buffer.concat(chunks, bytesRead).toString(encoding), received: bytesRead};
  } catch (err) {
    throw errors.Unsupported({prop: 'charset', value: encoding, err});
  }
}

/**
 * Reads and optionally decompresses a request body through a stream pipeline
 * with byte metering and size enforcement. A wire-side meter enforces `limit`
 * on the compressed bytes; a second meter after decompression enforces
 * `decompressedLimit` to protect against decompression bombs.
 *
 * @param {import('node:stream').Readable} stream - Incoming request body stream
 * @param {object} options - Size-guard and decompression options
 * @returns {Promise<{data: string, received: number}>} - Resolved body string and byte count
 */
async function readReqStream(
  stream,
  {limit = Infinity, decompressedLimit = Infinity, expected, encoding, type = 'identity'} = {}
) {
  const wireMeter = meter({limit, expected});
  const inflatedMeter = meter({limit: decompressedLimit});
  const w = writer();
  const decompressor = decompressors[type];

  try {
    await pipeline(stream, wireMeter, decompressor, inflatedMeter, w);
  } catch (err) {
    if (err?.type in errors) {
      throw errors[err.type](err);
    }
    throw err;
  }

  try {
    return {data: w.data.toString(encoding), received: wireMeter.bytesRead};
  } catch (err) {
    throw errors.Unsupported({prop: 'charset', value: encoding, err});
  }
}
