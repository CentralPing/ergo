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

    it('compresses structured suffix +json (application/problem+json)', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/problem+json');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end(JSON.stringify({type: 'about:blank', title: 'Bad Request', status: 400}));
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'gzip');
    });

    it('compresses structured suffix +json (application/vnd.api+json)', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/vnd.api+json');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end(JSON.stringify({data: {id: '1', type: 'articles'}}));
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'gzip');
    });

    it('compresses structured suffix +xml (application/hal+xml)', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/hal+xml');
      res.statusCode = 200;

      const finished = onFinish(res);
      res.end('<resource><name>test</name></resource>');
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'gzip');
    });

    it('skips compression for non-compressible type (application/octet-stream)', () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/octet-stream');
      res.end('x'.repeat(2000));

      assert.ok(!res.getHeader('content-encoding'), 'should not compress application/octet-stream');
    });

    it('does not false-match application/jsonp (word boundary)', () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/jsonp');
      res.end('x'.repeat(2000));

      assert.ok(!res.getHeader('content-encoding'), 'should not compress application/jsonp');
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

  describe('Writable.end callback contract', () => {
    it('invokes callback after compress finish (chunk, encoding, cb)', async () => {
      const res = createMockRes({asyncFinish: true});
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const largePayload = JSON.stringify({data: 'x'.repeat(100)});
      const finished = onFinish(res);
      let callbackErr;
      let callbackCalled = false;
      let finishBeforeCallback = false;
      res.on('finish', () => {
        if (!callbackCalled) finishBeforeCallback = true;
      });

      res.end(largePayload, 'utf8', err => {
        callbackCalled = true;
        callbackErr = err;
      });
      assert.equal(
        callbackCalled,
        false,
        'end callback must not fire synchronously before compress finish'
      );
      await finished;

      assert.equal(callbackCalled, true, 'end callback should fire');
      assert.equal(finishBeforeCallback, true, 'finish must emit before end callback');
      assert.ok(
        res.endInvocations.some(c => c.hasCallback),
        'user callback must be delivered via origEnd(cb), not a side-channel call'
      );
      assert.equal(callbackErr, undefined);
      assert.equal(res.getHeader('content-encoding'), 'gzip');
    });

    it('invokes callback after compress finish (chunk, cb)', async () => {
      const res = createMockRes({asyncFinish: true});
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const largePayload = JSON.stringify({data: 'x'.repeat(100)});
      const finished = onFinish(res);
      let callbackCalled = false;
      let finishBeforeCallback = false;
      res.on('finish', () => {
        if (!callbackCalled) finishBeforeCallback = true;
      });

      res.end(largePayload, () => {
        callbackCalled = true;
      });
      assert.equal(
        callbackCalled,
        false,
        'end callback must not fire synchronously before compress finish'
      );
      await finished;

      assert.equal(callbackCalled, true, 'end callback should fire for two-arg form');
      assert.equal(finishBeforeCallback, true, 'finish must emit before end callback');
      assert.ok(
        res.endInvocations.some(c => c.hasCallback),
        'user callback must be delivered via origEnd(cb), not a side-channel call'
      );
      assert.equal(res.getHeader('content-encoding'), 'gzip');
    });

    it('invokes callback with Error on compressor error', async () => {
      // asyncFinish + endInvocations prove delivery via origEnd(cb), not
      // origEnd(); queueMicrotask(() => cb(err)).
      const res = createMockRes({asyncFinish: true});
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      let callbackErr;
      let callbackCalled = false;
      let endedWhenCallbackRan = false;
      let finishBeforeCallback = false;
      res.on('finish', () => {
        if (!callbackCalled) finishBeforeCallback = true;
      });

      res.write(JSON.stringify({data: 'x'.repeat(100)}));
      res.end(err => {
        callbackCalled = true;
        callbackErr = err;
        endedWhenCallbackRan = res.writableEnded;
      });
      res.write('after-end');

      assert.equal(
        callbackCalled,
        false,
        'end callback must not fire synchronously before response finish'
      );
      await finished;
      assert.equal(callbackCalled, true, 'end callback should fire on error path');
      assert.equal(finishBeforeCallback, true, 'finish must emit before end callback');
      assert.equal(endedWhenCallbackRan, true, 'callback must run after response has ended');
      assert.ok(
        res.endInvocations.some(c => c.hasCallback),
        'error callback must be delivered via origEnd(cb), not a side-channel call'
      );
      assert.ok(callbackErr instanceof Error, 'callback should receive an Error');
      assert.ok(res.writableEnded, 'response should have ended via error handler');
    });

    it('ends response even when error-path end callback throws', async () => {
      const res = createMockRes({asyncFinish: true});
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      let callbackCalled = false;

      res.write(JSON.stringify({data: 'x'.repeat(100)}));
      res.end(() => {
        callbackCalled = true;
        throw new Error('end callback boom');
      });
      res.write('after-end');

      assert.equal(callbackCalled, false, 'throwing callback must not run before response finish');
      await finished;
      assert.equal(callbackCalled, true, 'throwing end callback still ran');
      assert.ok(
        res.endInvocations.some(c => c.hasCallback),
        'throwing callback still delivered via origEnd(cb)'
      );
      assert.ok(res.writableEnded, 'origEnd must run despite throwing callback');
    });

    it('invokes callback on below-threshold bypass without Content-Encoding', () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      assert.equal(res.end.name, 'compressedEnd', 'bypass path must exercise the compress patch');
      res.setHeader('Content-Type', 'application/json');
      const small = '{"hi":"there"}';
      let callbackCalled = false;

      res.end(small, () => {
        callbackCalled = true;
      });

      assert.equal(callbackCalled, true, 'bypass path should invoke callback');
      assert.ok(res.writableEnded);
      assert.equal(res.getHeader('content-encoding'), undefined);
    });
  });

  describe('encoding-aware threshold', () => {
    it('skips compression for latin1 byte length below threshold', () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      assert.equal(
        res.end.name,
        'compressedEnd',
        'threshold path must exercise the compress patch'
      );
      res.setHeader('Content-Type', 'text/plain');
      // 600 chars in 0x80–0xFF: latin1 = 600 bytes, utf8 = 1200 bytes
      const str = String.fromCharCode(...Array.from({length: 600}, (_, i) => 0x80 + (i % 0x80)));
      assert.equal(Buffer.byteLength(str, 'latin1'), 600);
      assert.equal(Buffer.byteLength(str), 1200);

      res.end(str, 'latin1');

      assert.ok(res.writableEnded);
      assert.equal(
        res.getHeader('content-encoding'),
        undefined,
        'latin1 size 600 is below threshold 1024'
      );
    });

    it('compresses the same string when measured as utf8', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      const str = String.fromCharCode(...Array.from({length: 600}, (_, i) => 0x80 + (i % 0x80)));

      const finished = onFinish(res);
      res.end(str);
      await finished;

      assert.equal(res.getHeader('content-encoding'), 'gzip');
    });

    it('compresses when the same string is ended with utf8 encoding', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      assert.equal(res.end.name, 'compressedEnd');
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      const str = String.fromCharCode(...Array.from({length: 600}, (_, i) => 0x80 + (i % 0x80)));
      assert.equal(Buffer.byteLength(str, 'utf8'), 1200);

      const finished = onFinish(res);
      res.end(str, 'utf8');
      await finished;

      assert.equal(
        res.getHeader('content-encoding'),
        'gzip',
        'utf8 size 1200 is above threshold 1024 even with an explicit encoding arg'
      );
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
