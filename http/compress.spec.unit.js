/**
 * @fileoverview Layer 2 module tests for http/compress.js middleware factory.
 *
 * Black-box tests for the compression middleware factory using minimal req/res
 * stubs. Covers encoding negotiation, compressor selection, threshold behavior,
 * status code skipping, content-type filtering, res patching, stream error
 * handling, Vary header management, and Content-Length removal.
 *
 * @module http/compress.spec.unit
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {createMockRes} from '../test/helpers.js';
import createCompress from './compress.js';

/**
 * Wait for the mock res to emit 'finish', then run assertions.
 *
 * @param {object} res - Mock response object (EventEmitter)
 * @returns {Promise<void>} - Resolves when 'finish' fires
 */
function onFinish(res) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('res finish timeout')), 2000);
    res.once('finish', () => {
      clearTimeout(timeout);
      resolve();
    });
  });
}

/**
 * Create a null-prototype headers object from an optional initializer.
 *
 * @param {object} [init] - Header key-value pairs
 * @returns {object} - Null-prototype headers object
 */
function makeHeaders(init) {
  return Object.assign(Object.create(null), init);
}

describe('[Module] http/compress', () => {
  describe('factory defaults', () => {
    it('returns a named function "compressMiddleware"', () => {
      const compress = createCompress();
      assert.equal(compress.name, 'compressMiddleware');
    });
  });

  describe('encoding negotiation', () => {
    it('returns undefined when no Accept-Encoding header', () => {
      const compress = createCompress();
      const result = compress({headers: makeHeaders()}, createMockRes());
      assert.equal(result, undefined);
    });

    it('returns undefined when Accept-Encoding is empty string', () => {
      const compress = createCompress();
      const result = compress({headers: makeHeaders({'accept-encoding': ''})}, createMockRes());
      assert.equal(result, undefined);
    });

    it('returns undefined for Accept-Encoding: identity only', () => {
      const compress = createCompress();
      const result = compress(
        {headers: makeHeaders({'accept-encoding': 'identity'})},
        createMockRes()
      );
      assert.equal(result, undefined);
    });

    it('does not patch res when no encoding matches', () => {
      const res = createMockRes();
      const origEnd = res.end;
      const origWrite = res.write;
      const compress = createCompress();
      compress({headers: makeHeaders()}, res);
      assert.equal(res.end, origEnd);
      assert.equal(res.write, origWrite);
    });
  });

  describe('res patching', () => {
    it('replaces res.write and res.end when encoding matches', () => {
      const res = createMockRes();
      const origEnd = res.end;
      const origWrite = res.write;
      const compress = createCompress();
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);
      assert.notEqual(res.end, origEnd, 'res.end should be replaced');
      assert.notEqual(res.write, origWrite, 'res.write should be replaced');
    });

    it('patched write function is named "compressedWrite"', () => {
      const res = createMockRes();
      const compress = createCompress();
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);
      assert.equal(res.write.name, 'compressedWrite');
    });

    it('patched end function is named "compressedEnd"', () => {
      const res = createMockRes();
      const compress = createCompress();
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);
      assert.equal(res.end.name, 'compressedEnd');
    });
  });

  describe('threshold check', () => {
    it('skips compression when body is below threshold', () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      const small = '{"hi":"there"}';
      res.end(small);

      assert.ok(res.writableEnded, 'response should have ended');
      assert.ok(
        !res.getHeader('content-encoding'),
        'should not set Content-Encoding for small body'
      );
    });

    it('applies compression when body meets threshold', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 10});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end(JSON.stringify({data: 'x'.repeat(100)}));
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'gzip');
    });
  });

  describe('status code skipping', () => {
    it('skips compression for 204 No Content', () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.statusCode = 204;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({data: 'x'.repeat(100)}));

      assert.ok(!res.getHeader('content-encoding'), 'should not compress 204');
    });

    it('skips compression for 304 Not Modified', () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.statusCode = 304;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({data: 'x'.repeat(100)}));

      assert.ok(!res.getHeader('content-encoding'), 'should not compress 304');
    });
  });

  describe('content-type filtering', () => {
    it('skips compression for non-compressible content type (image/png)', () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'image/png');
      res.end('x'.repeat(2000));

      assert.ok(!res.getHeader('content-encoding'), 'should not compress image/png');
    });

    it('compresses compressible content type (text/html)', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end('x'.repeat(2000));
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'gzip');
    });
  });

  describe('compressor selection', () => {
    it('sets Content-Encoding to gzip for gzip request', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end(JSON.stringify({data: 'x'.repeat(100)}));
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'gzip');
    });

    it('sets Content-Encoding to deflate for deflate request', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'deflate'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end(JSON.stringify({data: 'x'.repeat(100)}));
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'deflate');
    });

    it('sets Content-Encoding to br for brotli request', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'br'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end(JSON.stringify({data: 'x'.repeat(100)}));
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'br');
    });
  });

  describe('Content-Length removal', () => {
    it('removes Content-Length header when compression is applied', async () => {
      const res = createMockRes();
      res.setHeader('Content-Length', '5000');
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end(JSON.stringify({data: 'x'.repeat(100)}));
      await finished;

      assert.equal(res.getHeader('content-length'), undefined, 'Content-Length should be removed');
    });
  });

  describe('Vary header', () => {
    it('adds Accept-Encoding to Vary header', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end(JSON.stringify({data: 'x'.repeat(100)}));
      await finished;

      const vary = res.getHeader('vary') ?? '';
      assert.ok(
        vary.toLowerCase().includes('accept-encoding'),
        'Vary should include Accept-Encoding'
      );
    });
  });

  describe('stream error handling', () => {
    it('ends response on compressor error without hanging', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);

      res.write(JSON.stringify({data: 'x'.repeat(100)}));
      res.end();
      res.write('after-end');

      await finished;
      assert.ok(res.writableEnded, 'response should have ended via error handler');
    });
  });

  describe('quality value negotiation', () => {
    it('excludes encoding with q=0 (RFC 7231 §5.3.4)', () => {
      const res = createMockRes();
      const origEnd = res.end;
      const compress = createCompress({encodings: ['gzip']});
      compress({headers: makeHeaders({'accept-encoding': 'gzip;q=0'})}, res);
      assert.equal(res.end, origEnd, 'should not patch res when gzip has q=0');
    });

    it('selects higher-quality encoding from Accept-Encoding', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip;q=0.5, deflate;q=1'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end(JSON.stringify({data: 'x'.repeat(100)}));
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'deflate');
    });
  });

  describe('custom encodings option', () => {
    it('does not patch res when Accept-Encoding not in custom encodings', () => {
      const res = createMockRes();
      const origEnd = res.end;
      const compress = createCompress({encodings: ['deflate']});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);
      assert.equal(res.end, origEnd, 'should not patch res when gzip not in encodings');
    });

    it('negotiates within custom encodings', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1, encodings: ['deflate']});
      compress({headers: makeHeaders({'accept-encoding': 'gzip, deflate'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end(JSON.stringify({data: 'x'.repeat(100)}));
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'deflate');
    });
  });
});
