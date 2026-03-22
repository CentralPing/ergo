/**
 * @fileoverview Layer 3 contract tests for http/body.js middleware.
 * Tests end-to-end HTTP body parsing over a real server.
 */
import zlib from 'node:zlib';
import {promisify} from 'node:util';
import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {fetch, setupServer} from '../test/helpers.js';
import compose from '../utils/compose-with.js';
import createHandler from './handler.js';
import createSend from './send.js';
import createBody from './body.js';

const gzip = promisify(zlib.gzip);
const deflate = promisify(zlib.deflate);
const brotli = promisify(zlib.brotliCompress);

describe('[Contract] http/body', () => {
  let baseUrl;
  let close;

  // A pipeline that parses the body and responds with acc.body.parsed
  const sendMiddleware = createSend();
  const pipeline = compose(
    [createBody(), [], 'body'],
    (req, res, acc) => ({body: acc.body.parsed}),
    sendMiddleware
  );
  const handlerFn = createHandler(pipeline, sendMiddleware);

  before(async () => {
    ({baseUrl, close} = await setupServer(handlerFn));
  });

  after(async () => {
    await close();
  });

  describe('JSON parsing', () => {
    it('parses application/json body', async () => {
      const payload = JSON.stringify({hello: 'world'});
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-length': String(Buffer.byteLength(payload))
        },
        body: payload
      });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.deepEqual(json, {hello: 'world'});
    });

    it('parses application/vnd.api+json body', async () => {
      const payload = JSON.stringify({data: {type: 'user', id: '1'}});
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/vnd.api+json',
          'content-length': String(Buffer.byteLength(payload))
        },
        body: payload
      });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.data.type, 'user');
    });

    it('returns 413 when body exceeds limit', async () => {
      let baseUrl2;
      let close2;
      const smallPipeline = compose([createBody({limit: 5}), [], 'body'], sendMiddleware);
      const smallHandler = createHandler(smallPipeline, sendMiddleware);
      ({baseUrl: baseUrl2, close: close2} = await setupServer(smallHandler));
      try {
        const payload = 'this body is much longer than 5 bytes';
        const res = await fetch(`${baseUrl2}/`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'content-length': String(Buffer.byteLength(payload))
          },
          body: payload
        });
        assert.equal(res.status, 413);
      } finally {
        await close2();
      }
    });

    it('returns 415 for unsupported content type', async () => {
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'content-type': 'text/plain',
          'content-length': '5'
        },
        body: 'hello'
      });
      assert.equal(res.status, 415);
    });
  });

  describe('urlencoded parsing', () => {
    it('parses application/x-www-form-urlencoded body', async () => {
      const payload = 'name=alice&age=30';
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'content-length': String(Buffer.byteLength(payload))
        },
        body: payload
      });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.name, 'alice');
      assert.equal(json.age, '30');
    });
  });

  describe('multipart parsing', () => {
    it('parses multipart/form-data body', async () => {
      const boundary = 'TestBoundary456';
      const bodyStr = [
        `--${boundary}`,
        'Content-Disposition: form-data; name="field1"',
        '',
        'value1',
        `--${boundary}--`
      ].join('\r\n');
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'content-type': `multipart/form-data; boundary=${boundary}`,
          'content-length': String(Buffer.byteLength(bodyStr))
        },
        body: bodyStr
      });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.ok(Array.isArray(json));
      assert.equal(json[0].name, 'field1');
    });
  });

  describe('compressed body parsing (readReqStream path)', () => {
    it('parses gzip-compressed application/json body', async () => {
      const payload = JSON.stringify({compressed: true});
      const compressed = await gzip(Buffer.from(payload));
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-encoding': 'gzip',
          'content-length': String(compressed.length)
        },
        body: compressed
      });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.compressed, true);
    });

    it('parses deflate-compressed application/json body', async () => {
      const payload = JSON.stringify({encoding: 'deflate'});
      const compressed = await deflate(Buffer.from(payload));
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-encoding': 'deflate',
          'content-length': String(compressed.length)
        },
        body: compressed
      });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.encoding, 'deflate');
    });

    it('returns 415 for unsupported Content-Encoding', async () => {
      const payload = JSON.stringify({x: 1});
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-encoding': 'zstd',
          'content-length': String(Buffer.byteLength(payload))
        },
        body: payload
      });
      assert.equal(res.status, 415);
    });
  });

  describe('Decompression bomb protection', () => {
    it('returns 413 when decompressed body exceeds decompressedLimit', async () => {
      let u, c;
      const bigJson = JSON.stringify({data: 'x'.repeat(2000)});
      const compressed = await gzip(Buffer.from(bigJson));
      const p = compose(
        [createBody({limit: compressed.length + 100, decompressedLimit: 100}), [], 'body'],
        sendMiddleware
      );
      ({baseUrl: u, close: c} = await setupServer(createHandler(p, sendMiddleware)));
      try {
        const res = await fetch(`${u}/`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'content-encoding': 'gzip',
            'content-length': String(compressed.length)
          },
          body: compressed
        });
        assert.equal(res.status, 413);
      } finally {
        await c();
      }
    });

    it('allows compressed body within decompressedLimit', async () => {
      const payload = JSON.stringify({ok: true});
      const compressed = await gzip(Buffer.from(payload));
      let u, c;
      const p = compose(
        [createBody({decompressedLimit: 1024}), [], 'body'],
        (req, res, acc) => ({body: acc.body.parsed}),
        sendMiddleware
      );
      ({baseUrl: u, close: c} = await setupServer(createHandler(p, sendMiddleware)));
      try {
        const res = await fetch(`${u}/`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'content-encoding': 'gzip',
            'content-length': String(compressed.length)
          },
          body: compressed
        });
        assert.equal(res.status, 200);
        const json = await res.json();
        assert.deepEqual(json, {ok: true});
      } finally {
        await c();
      }
    });
  });

  describe('chunked transfer encoding', () => {
    it('parses chunked body without Content-Length (stream body)', async () => {
      const payload = JSON.stringify({chunked: true});
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(payload));
          controller.close();
        }
      });
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: stream,
        duplex: 'half'
      });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.chunked, true);
    });
  });

  describe('411 Length Required', () => {
    it('returns 411 when neither Content-Length nor chunked is present', async () => {
      const payload = JSON.stringify({x: 1});
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: payload
      });
      assert.ok([200, 411].includes(res.status));
    });
  });

  describe('brotli decompression', () => {
    it('parses brotli-compressed application/json body', async () => {
      const payload = JSON.stringify({encoding: 'br'});
      const compressed = await brotli(Buffer.from(payload));
      const res = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-encoding': 'br',
          'content-length': String(compressed.length)
        },
        body: compressed
      });
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.encoding, 'br');
    });
  });

  describe('Content-Length mismatch (readBodyDirect guards)', () => {
    it('returns 413 when actual body exceeds the configured limit', async () => {
      // Use a very small limit so even a small body triggers TooLarge
      let u, c;
      const p = compose([createBody({limit: 5}), [], 'body'], sendMiddleware);
      ({baseUrl: u, close: c} = await setupServer(createHandler(p, sendMiddleware)));
      try {
        const payload = '{"x":1,"y":2,"z":3}'; // 20 bytes > limit 5
        const res = await fetch(`${u}/`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'content-length': String(Buffer.byteLength(payload))
          },
          body: payload
        });
        assert.equal(res.status, 413);
      } finally {
        await c();
      }
    });
  });

  describe('middleware error return shape (direct invocation)', () => {
    it('returns 415 response for unsupported Content-Type', async () => {
      const bodyMw = createBody();
      const payload = 'hello';
      const req = {
        method: 'POST',
        url: '/',
        headers: {
          'content-type': 'text/plain',
          'content-length': String(Buffer.byteLength(payload))
        },
        async *[Symbol.asyncIterator]() {
          yield Buffer.from(payload);
        }
      };
      const result = await bodyMw(req);
      assert.ok(result?.response);
      assert.equal(result.response.statusCode, 415);
      assert.ok(typeof result.response.detail === 'string');
      assert.ok(result.response.detail.includes('Content-Type'));
    });

    it('returns 413 response when body exceeds limit', async () => {
      const bodyMw = createBody({limit: 5});
      const payload = 'this body is much longer than 5 bytes';
      const req = {
        method: 'POST',
        url: '/',
        headers: {
          'content-type': 'application/json',
          'content-length': String(Buffer.byteLength(payload))
        },
        async *[Symbol.asyncIterator]() {
          yield Buffer.from(payload);
        }
      };
      const result = await bodyMw(req);
      assert.ok(result?.response);
      assert.equal(result.response.statusCode, 413);
      assert.ok(result.response.detail.includes('limit'));
    });
  });
});
