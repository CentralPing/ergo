/**
 * @fileoverview Layer 2 module tests for http/body.js middleware factory.
 *
 * Black-box tests for the body parser factory using minimal async-iterable
 * request stubs. Covers factory defaults, fast path (identity-encoded JSON),
 * type filtering, charset handling, Content-Length validation, decompression
 * limits, lazy getter behavior, error paths, and result shapes.
 *
 * @module http/body.spec.unit
 */
import zlib from 'node:zlib';
import {promisify} from 'node:util';
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createBody from './body.js';

const gzip = promisify(zlib.gzip);
const deflate = promisify(zlib.deflate);
const brotli = promisify(zlib.brotliCompress);

const np = props => Object.assign(Object.create(null), props);

/**
 * Create a minimal request-like object with an async iterable body.
 *
 * @param {object} headers - Request headers (lowercased keys)
 * @param {import('node:buffer').Buffer|string} body - Raw body content
 * @returns {object} - Minimal req stub with async iterator
 */
function makeReq(headers, body) {
  const buf = Buffer.isBuffer(body) ? body : Buffer.from(body);
  return {
    method: 'POST',
    url: '/',
    headers: Object.assign(Object.create(null), headers),
    destroy() {},
    async *[Symbol.asyncIterator]() {
      yield buf;
    }
  };
}

describe('[Module] http/body', () => {
  describe('factory defaults and intrinsics', () => {
    it('attaches setPath property as "body"', () => {
      const bodyMw = createBody();
      assert.equal(bodyMw.setPath, 'body');
    });

    it('returns a named function "bodyMiddleware"', () => {
      const bodyMw = createBody();
      assert.equal(bodyMw.name, 'bodyMiddleware');
    });
  });

  describe('fast path (identity-encoded JSON)', () => {
    it('parses application/json and returns parsed as own property', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({hello: 'world'});
      const req = makeReq(
        {'content-type': 'application/json', 'content-length': String(Buffer.byteLength(payload))},
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/json');
      assert.equal(result.charset, 'utf-8');
      assert.equal(result.encoding, undefined);
      assert.equal(result.received, Buffer.byteLength(payload));
      assert.deepEqual(result.parsed, np({hello: 'world'}));

      const descriptor = Object.getOwnPropertyDescriptor(result, 'parsed');
      assert.equal(
        typeof descriptor.get,
        'undefined',
        'parsed should be a data property, not a getter'
      );
    });

    it('parses application/vnd.api+json via fast path', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({data: {type: 'user', id: '1'}});
      const req = makeReq(
        {
          'content-type': 'application/vnd.api+json',
          'content-length': String(Buffer.byteLength(payload))
        },
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/vnd.api+json');
      assert.equal(result.parsed.data.type, 'user');
    });

    it('parses application/merge-patch+json (RFC 7386)', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({name: 'updated'});
      const req = makeReq(
        {
          'content-type': 'application/merge-patch+json',
          'content-length': String(Buffer.byteLength(payload))
        },
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/merge-patch+json');
      assert.deepEqual(result.parsed, np({name: 'updated'}));
    });

    it('parses application/json-patch+json (RFC 6902)', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify([{op: 'replace', path: '/name', value: 'patched'}]);
      const req = makeReq(
        {
          'content-type': 'application/json-patch+json',
          'content-length': String(Buffer.byteLength(payload))
        },
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/json-patch+json');
      assert.ok(Array.isArray(result.parsed));
      assert.equal(result.parsed[0].op, 'replace');
    });

    it('returns null-prototype objects at all nesting levels', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({top: {nested: {deep: true}}, list: [{item: 1}]});
      const req = makeReq(
        {'content-type': 'application/json', 'content-length': String(Buffer.byteLength(payload))},
        payload
      );
      const result = await bodyMw(req);
      assert.equal(Object.getPrototypeOf(result.parsed), null);
      assert.equal(Object.getPrototypeOf(result.parsed.top), null);
      assert.equal(Object.getPrototypeOf(result.parsed.top.nested), null);
      assert.ok(Array.isArray(result.parsed.list));
      assert.equal(Object.getPrototypeOf(result.parsed.list[0]), null);
    });

    it('returns complete result shape', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({a: 1});
      const req = makeReq(
        {'content-type': 'application/json', 'content-length': String(Buffer.byteLength(payload))},
        payload
      );
      const result = await bodyMw(req);
      assert.ok('type' in result);
      assert.ok('charset' in result);
      assert.ok('encoding' in result);
      assert.ok('length' in result);
      assert.ok('received' in result);
      assert.ok('raw' in result);
      assert.ok('parsed' in result);
    });
  });

  describe('type filtering', () => {
    it('returns 415 for Content-Type not in types list', async () => {
      const bodyMw = createBody();
      const req = makeReq({'content-type': 'text/plain', 'content-length': '5'}, 'hello');
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 415);
      assert.ok(result.response.detail.includes('Content-Type'));
    });

    it('accepts custom types option', async () => {
      const bodyMw = createBody({types: ['application/xml']});
      const payload = JSON.stringify({wrapped: true});
      const req = makeReq(
        {'content-type': 'application/xml', 'content-length': String(Buffer.byteLength(payload))},
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/xml');
    });

    it('rejects default types when custom types specified', async () => {
      const bodyMw = createBody({types: ['application/xml']});
      const payload = JSON.stringify({x: 1});
      const req = makeReq(
        {'content-type': 'application/json', 'content-length': String(Buffer.byteLength(payload))},
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 415);
    });

    it('returns 415 for malformed Content-Type header', async () => {
      const bodyMw = createBody();
      const req = makeReq({'content-type': '///invalid', 'content-length': '2'}, '{}');
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 415);
    });
  });

  describe('charset handling', () => {
    it('uses default charset utf-8', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({x: 1});
      const req = makeReq(
        {'content-type': 'application/json', 'content-length': String(Buffer.byteLength(payload))},
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.charset, 'utf-8');
    });

    it('extracts charset from Content-Type parameter', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({x: 1});
      const req = makeReq(
        {
          'content-type': 'application/json; charset=ascii',
          'content-length': String(Buffer.byteLength(payload))
        },
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.charset, 'ascii');
    });

    it('uses custom charset option as default', async () => {
      const bodyMw = createBody({charset: 'latin1'});
      const payload = JSON.stringify({x: 1});
      const req = makeReq(
        {'content-type': 'application/json', 'content-length': String(Buffer.byteLength(payload))},
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.charset, 'latin1');
    });

    it('returns 415 for invalid charset encoding', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({hello: 'world'});
      const req = makeReq(
        {
          'content-type': 'application/json; charset=FAKE',
          'content-length': String(Buffer.byteLength(payload))
        },
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 415);
      assert.ok(result.response.detail.includes('charset'));
    });
  });

  describe('Content-Length validation', () => {
    it('returns 411 when Content-Length is absent and not chunked', async () => {
      const bodyMw = createBody();
      const req = makeReq({'content-type': 'application/json'}, '{}');
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 411);
    });

    it('returns 411 for NaN Content-Length', async () => {
      const bodyMw = createBody();
      const req = makeReq(
        {'content-type': 'application/json', 'content-length': 'not-a-number'},
        '{}'
      );
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 411);
    });

    it('returns 411 for negative Content-Length', async () => {
      const bodyMw = createBody();
      const req = makeReq({'content-type': 'application/json', 'content-length': '-1'}, '{}');
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 411);
    });

    it('returns 413 when Content-Length exceeds limit', async () => {
      const bodyMw = createBody({limit: 5});
      const req = makeReq({'content-type': 'application/json', 'content-length': '100'}, '{}');
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 413);
    });
  });

  describe('Content-Length mismatch', () => {
    it('returns 400 when received bytes do not match Content-Length', async () => {
      const bodyMw = createBody();
      const req = makeReq(
        {'content-type': 'application/json', 'content-length': '100'},
        '{"short":true}'
      );
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 400);
    });
  });

  describe('body exceeding limit', () => {
    it('returns 413 when body exceeds limit during streaming', async () => {
      const bodyMw = createBody({limit: 5});
      const req = {
        ...makeReq({'content-type': 'application/json', 'transfer-encoding': 'chunked'}, ''),
        async *[Symbol.asyncIterator]() {
          yield Buffer.from('thi');
          yield Buffer.from('s body is much longer than 5 bytes');
        }
      };
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 413);
      assert.ok(result.response.detail.includes('limit'));
    });
  });

  describe('malformed body', () => {
    it('returns 400 for invalid JSON body', async () => {
      const bodyMw = createBody();
      const payload = '{invalid json!!!}';
      const req = makeReq(
        {
          'content-type': 'application/json',
          'content-length': String(Buffer.byteLength(payload))
        },
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 400);
    });
  });

  describe('chunked transfer encoding', () => {
    it('accepts body without Content-Length when transfer-encoding is chunked', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({chunked: true});
      const req = makeReq(
        {'content-type': 'application/json', 'transfer-encoding': 'chunked'},
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/json');
      assert.deepEqual(result.parsed, np({chunked: true}));
    });
  });

  describe('lazy getter (urlencoded)', () => {
    it('has parsed as lazy getter for urlencoded content', async () => {
      const bodyMw = createBody();
      const payload = 'name=alice&age=30';
      const req = makeReq(
        {
          'content-type': 'application/x-www-form-urlencoded',
          'content-length': String(Buffer.byteLength(payload))
        },
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/x-www-form-urlencoded');
      assert.equal(result.raw, payload);

      const descriptor = Object.getOwnPropertyDescriptor(result, 'parsed');
      assert.equal(typeof descriptor.get, 'function', 'parsed should be a getter');

      const parsed = result.parsed;
      assert.equal(parsed.name, 'alice');
      assert.equal(parsed.age, '30');

      const afterAccess = Object.getOwnPropertyDescriptor(result, 'parsed');
      assert.equal(
        typeof afterAccess.get,
        'undefined',
        'getter should be replaced after first access'
      );
    });
  });

  describe('non-HTTP error rethrow', () => {
    it('rethrows errors without statusCode', async () => {
      const bodyMw = createBody();
      const req = {
        method: 'POST',
        url: '/',
        headers: Object.assign(Object.create(null), {
          'content-type': 'application/json',
          'content-length': '10'
        }),
        [Symbol.asyncIterator]() {
          return {
            async next() {
              throw new TypeError('stream broke');
            }
          };
        }
      };
      await assert.rejects(() => bodyMw(req), {
        name: 'TypeError',
        message: 'stream broke'
      });
    });
  });

  describe('compressed body paths (readReqStream)', () => {
    it('parses gzip-compressed JSON body', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({compressed: true});
      const compressed = await gzip(Buffer.from(payload));
      const req = makeReq(
        {
          'content-type': 'application/json',
          'content-encoding': 'gzip',
          'content-length': String(compressed.length)
        },
        compressed
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/json');
      assert.equal(result.encoding, 'gzip');
      assert.deepEqual(result.parsed, np({compressed: true}));
    });

    it('parses deflate-compressed JSON body', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({encoding: 'deflate'});
      const compressed = await deflate(Buffer.from(payload));
      const req = makeReq(
        {
          'content-type': 'application/json',
          'content-encoding': 'deflate',
          'content-length': String(compressed.length)
        },
        compressed
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/json');
      assert.deepEqual(result.parsed, np({encoding: 'deflate'}));
    });

    it('parses brotli-compressed JSON body', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({encoding: 'br'});
      const compressed = await brotli(Buffer.from(payload));
      const req = makeReq(
        {
          'content-type': 'application/json',
          'content-encoding': 'br',
          'content-length': String(compressed.length)
        },
        compressed
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/json');
      assert.deepEqual(result.parsed, np({encoding: 'br'}));
    });

    it('returns null-prototype objects for compressed JSON bodies', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({outer: {inner: 'value'}});
      const compressed = await gzip(Buffer.from(payload));
      const req = makeReq(
        {
          'content-type': 'application/json',
          'content-encoding': 'gzip',
          'content-length': String(compressed.length)
        },
        compressed
      );
      const result = await bodyMw(req);
      assert.equal(Object.getPrototypeOf(result.parsed), null);
      assert.equal(Object.getPrototypeOf(result.parsed.outer), null);
    });

    it('returns 415 for unsupported Content-Encoding', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({x: 1});
      const req = makeReq(
        {
          'content-type': 'application/json',
          'content-encoding': 'zstd',
          'content-length': String(Buffer.byteLength(payload))
        },
        payload
      );
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 415);
    });

    it('returns 415 for invalid charset on compressed body', async () => {
      const bodyMw = createBody();
      const payload = JSON.stringify({hello: 'world'});
      const compressed = await gzip(Buffer.from(payload));
      const req = makeReq(
        {
          'content-type': 'application/json; charset=FAKE',
          'content-encoding': 'gzip',
          'content-length': String(compressed.length)
        },
        compressed
      );
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 415);
      assert.ok(result.response.detail.includes('charset'));
    });
  });

  describe('decompression bomb protection', () => {
    it('returns 413 when decompressed body exceeds decompressedLimit', async () => {
      const bigJson = JSON.stringify({data: 'x'.repeat(2000)});
      const compressed = await gzip(Buffer.from(bigJson));
      const bodyMw = createBody({limit: compressed.length + 100, decompressedLimit: 100});
      const req = makeReq(
        {
          'content-type': 'application/json',
          'content-encoding': 'gzip',
          'content-length': String(compressed.length)
        },
        compressed
      );
      const result = await bodyMw(req);
      assert.equal(result.response.statusCode, 413);
    });

    it('allows compressed body within decompressedLimit', async () => {
      const payload = JSON.stringify({ok: true});
      const compressed = await gzip(Buffer.from(payload));
      const bodyMw = createBody({decompressedLimit: 1024});
      const req = makeReq(
        {
          'content-type': 'application/json',
          'content-encoding': 'gzip',
          'content-length': String(compressed.length)
        },
        compressed
      );
      const result = await bodyMw(req);
      assert.equal(result.type, 'application/json');
      assert.deepEqual(result.parsed, np({ok: true}));
    });
  });
});
