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
import {EventEmitter} from 'node:events';
import zlib from 'node:zlib';
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

    it('uses DEFAULT_THRESHOLD (1024) when threshold option is omitted', async () => {
      // Behavioral oracle for #311 named default — explicit threshold tests cannot catch a wrong default.
      const below = 'x'.repeat(1023);
      const at = 'x'.repeat(1024);
      assert.equal(Buffer.byteLength(below), 1023);
      assert.equal(Buffer.byteLength(at), 1024);

      const resSkip = createMockRes();
      createCompress()({headers: makeHeaders({'accept-encoding': 'gzip'})}, resSkip);
      assert.equal(resSkip.end.name, 'compressedEnd');
      resSkip.setHeader('Content-Type', 'text/plain');
      resSkip.end(below);
      assert.ok(
        resSkip.writableEnded,
        'default-threshold skip must call origEnd (not early-return)'
      );
      assert.equal(
        resSkip._body,
        below,
        'default-threshold skip must forward the chunk to origEnd'
      );
      assert.equal(
        resSkip.getHeader('content-encoding'),
        undefined,
        'default threshold 1024 must skip 1023-byte body'
      );

      const resCompress = createMockRes();
      createCompress()({headers: makeHeaders({'accept-encoding': 'gzip'})}, resCompress);
      resCompress.setHeader('Content-Type', 'text/plain');
      resCompress.statusCode = 200;
      const finished = onFinish(resCompress);
      resCompress.end(at);
      await finished;
      assert.equal(
        resCompress.getHeader('content-encoding'),
        'gzip',
        'default threshold 1024 must compress 1024-byte body (size < threshold)'
      );
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
      assert.equal(res._body, small, 'bypass must forward the chunk to origEnd');
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
      const returnValue = res.end(JSON.stringify({data: 'x'.repeat(100)}));
      assert.equal(returnValue, res, 'compressor path must return res for chaining');
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
      let deliveredViaEndCallback = false;
      let callbackThis;
      res.on('finish', () => {
        if (!callbackCalled) finishBeforeCallback = true;
      });

      // Non-arrow so `this` binding is observable; identity catches decoy wrappers.
      function onEnd(err) {
        callbackCalled = true;
        callbackErr = err;
        callbackThis = this;
        deliveredViaEndCallback = res.deliveringEndCallback;
      }
      res.end(largePayload, 'utf8', onEnd);
      assert.equal(
        callbackCalled,
        false,
        'end callback must not fire synchronously before compress finish'
      );
      await finished;

      assert.equal(callbackCalled, true, 'end callback should fire');
      assert.equal(finishBeforeCallback, true, 'finish must emit before end callback');
      assert.equal(
        deliveredViaEndCallback,
        true,
        'user callback must run inside origEnd(cb), not via decoy/side-channel'
      );
      assert.equal(callbackThis, res, 'success-path end callback this must be the ServerResponse');
      assert.ok(
        res.endInvocations.some(c => c.callback === onEnd),
        'success path must pass the user callback to origEnd (not a decoy wrapper)'
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
      let callbackErr;
      let callbackCalled = false;
      let finishBeforeCallback = false;
      let deliveredViaEndCallback = false;
      let callbackThis;
      res.on('finish', () => {
        if (!callbackCalled) finishBeforeCallback = true;
      });

      // Non-arrow + identity: mirror three-arg success (catches decoy origEnd(() => cb())).
      function onEnd(err) {
        callbackCalled = true;
        callbackErr = err;
        callbackThis = this;
        deliveredViaEndCallback = res.deliveringEndCallback;
      }
      res.end(largePayload, onEnd);
      assert.equal(
        callbackCalled,
        false,
        'end callback must not fire synchronously before compress finish'
      );
      await finished;

      assert.equal(callbackCalled, true, 'end callback should fire for two-arg form');
      assert.equal(finishBeforeCallback, true, 'finish must emit before end callback');
      assert.equal(
        deliveredViaEndCallback,
        true,
        'user callback must run inside origEnd(cb), not via decoy/side-channel'
      );
      assert.equal(callbackThis, res, 'two-arg success this must be the ServerResponse');
      assert.ok(
        res.endInvocations.some(c => c.callback === onEnd),
        'two-arg success must pass the user callback to origEnd (not a decoy wrapper)'
      );
      assert.equal(callbackErr, undefined);
      assert.equal(res.getHeader('content-encoding'), 'gzip');
    });

    it('invokes callback with Error on compressor error', async () => {
      // deliveringEndCallback proves the user cb ran inside origEnd's callback —
      // catches decoy origEnd(noop) + queueMicrotask(() => cb(err)).
      // Capture compressor-emitted Error via EventEmitter.emit (zlib streams extend EE).
      // Do not redefine zlib.createGzip — Deno freezes that export (Node marks it non-writable).
      const origEmit = EventEmitter.prototype.emit;
      /** @type {Error|undefined} */
      let compressorEmittedErr;
      EventEmitter.prototype.emit = function (type, ...args) {
        if (
          type === 'error' &&
          args[0] instanceof Error &&
          (args[0].code === 'ERR_STREAM_WRITE_AFTER_END' || args[0].message === 'write after end')
        ) {
          compressorEmittedErr = args[0];
        }
        return origEmit.apply(this, [type, ...args]);
      };

      try {
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
        let deliveredViaEndCallback = false;
        let callbackThis;
        res.on('finish', () => {
          if (!callbackCalled) finishBeforeCallback = true;
        });

        res.write(JSON.stringify({data: 'x'.repeat(100)}));
        // Non-arrow so `this` binding is observable (matches Writable.end receiver contract).
        res.end(function (err) {
          callbackCalled = true;
          callbackErr = err;
          callbackThis = this;
          endedWhenCallbackRan = res.writableEnded;
          deliveredViaEndCallback = res.deliveringEndCallback;
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
        assert.equal(
          deliveredViaEndCallback,
          true,
          'error callback must run inside origEnd(cb), not via decoy/side-channel'
        );
        assert.equal(callbackThis, res, 'error-path end callback this must be the ServerResponse');
        assert.ok(callbackErr instanceof Error, 'callback should receive an Error');
        assert.ok(compressorEmittedErr instanceof Error, 'compressor must have emitted an Error');
        assert.equal(
          callbackErr,
          compressorEmittedErr,
          'callback must receive the same Error instance the compressor emitted (not a substitute)'
        );
        assert.equal(callbackErr.code, 'ERR_STREAM_WRITE_AFTER_END');
        assert.equal(callbackErr.message, 'write after end');
        assert.ok(res.writableEnded, 'response should have ended via error handler');
      } finally {
        EventEmitter.prototype.emit = origEmit;
      }
    });

    it('ends response even when error-path end callback throws', async () => {
      const res = createMockRes({asyncFinish: true});
      const compress = createCompress({threshold: 1});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      const finished = onFinish(res);
      let callbackCalled = false;
      let deliveredViaEndCallback = false;

      res.write(JSON.stringify({data: 'x'.repeat(100)}));
      res.end(() => {
        callbackCalled = true;
        deliveredViaEndCallback = res.deliveringEndCallback;
        throw new Error('end callback boom');
      });
      res.write('after-end');

      assert.equal(callbackCalled, false, 'throwing callback must not run before response finish');
      await finished;
      assert.equal(callbackCalled, true, 'throwing end callback still ran');
      assert.equal(deliveredViaEndCallback, true, 'throwing callback still ran inside origEnd(cb)');
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
      let deliveredViaEndCallback = false;
      let callbackThis;

      // Non-arrow: bypass calls origEnd(userCb) directly — oracles mock endCb.call(this).
      function onBypassEnd() {
        callbackCalled = true;
        callbackThis = this;
        deliveredViaEndCallback = res.deliveringEndCallback;
      }
      res.end(small, onBypassEnd);

      assert.equal(callbackCalled, true, 'bypass path should invoke callback');
      assert.equal(
        deliveredViaEndCallback,
        true,
        'bypass callback must run inside origEnd(cb), not via decoy/side-channel'
      );
      assert.equal(callbackThis, res, 'bypass end callback this must be the ServerResponse (mock)');
      assert.ok(
        res.endInvocations.some(c => c.callback === onBypassEnd),
        'bypass must pass the user callback to origEnd (not a decoy wrapper)'
      );
      assert.ok(res.writableEnded);
      assert.equal(res._body, small, 'bypass must forward the chunk to origEnd');
      assert.equal(res.getHeader('content-encoding'), undefined);
    });

    it('invokes three-arg below-threshold bypass end(chunk, encoding, cb)', () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      assert.equal(res.end.name, 'compressedEnd', 'bypass path must exercise the compress patch');
      res.setHeader('Content-Type', 'text/plain');
      const small = 'hi';
      let callbackCalled = false;
      let deliveredViaEndCallback = false;
      let callbackThis;

      function onThreeArgEnd() {
        callbackCalled = true;
        callbackThis = this;
        deliveredViaEndCallback = res.deliveringEndCallback;
      }
      const returnValue = res.end(small, 'latin1', onThreeArgEnd);

      assert.equal(returnValue, res, 'compressedEnd must return res for chaining');
      assert.equal(callbackCalled, true, 'three-arg bypass must invoke callback');
      assert.equal(
        deliveredViaEndCallback,
        true,
        'three-arg bypass callback must run inside origEnd(cb)'
      );
      assert.equal(callbackThis, res, 'three-arg bypass this must be the ServerResponse');
      assert.ok(
        res.endInvocations.some(
          c => c.hasCallback && c.encoding === 'latin1' && c.callback === onThreeArgEnd
        ),
        'three-arg bypass must forward encoding and the user callback to origEnd'
      );
      assert.equal(res._body, small, 'three-arg bypass must forward the chunk to origEnd');
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

      const returnValue = res.end(str, 'latin1');

      assert.equal(returnValue, res, 'compressedEnd must return res for chaining');
      assert.ok(res.writableEnded);
      assert.equal(res._body, str, 'latin1 bypass must forward the chunk to origEnd');
      assert.ok(
        res.endInvocations.some(c => c.encoding === 'latin1'),
        'bypass must forward encodingArg to origEnd (not drop it)'
      );
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

    it('uses utf16le encodingArg for threshold (not only latin1/binary aliases)', async () => {
      // Catches a whitelist that only special-cases latin1/binary and otherwise measures utf8.
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      assert.equal(res.end.name, 'compressedEnd');
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      const str = 'a'.repeat(600);
      assert.equal(Buffer.byteLength(str, 'utf8'), 600);
      assert.equal(Buffer.byteLength(str, 'utf16le'), 1200);
      const expected = Buffer.from(str, 'utf16le');

      const finished = onFinish(res);
      res.end(str, 'utf16le');
      await finished;

      assert.equal(
        res.getHeader('content-encoding'),
        'gzip',
        'utf16le size 1200 must compress — encodingArg must reach Buffer.byteLength generically'
      );
      assert.ok(res._writeChunks.length > 0, 'compress path must write compressed chunks');
      assert.deepEqual(
        zlib.gunzipSync(Buffer.concat(res._writeChunks)),
        expected,
        'utf16le encodingArg must reach compressor.end (not dropped or remapped)'
      );
    });

    it('compresses latin1 when byte length meets threshold', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      assert.equal(res.end.name, 'compressedEnd');
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      // 1100 chars in 0x80–0xFF: latin1 = 1100 bytes (≥ threshold 1024)
      const str = String.fromCharCode(...Array.from({length: 1100}, (_, i) => 0x80 + (i % 0x80)));
      assert.equal(Buffer.byteLength(str, 'latin1'), 1100);
      const expected = Buffer.from(str, 'latin1');

      const finished = onFinish(res);
      res.end(str, 'latin1');
      await finished;

      assert.equal(
        res.getHeader('content-encoding'),
        'gzip',
        'latin1 size 1100 is above threshold 1024 — must not always-bypass latin1'
      );
      // Round-trip proves encodingArg reached compressor.end: dropping it would
      // utf8-encode 0x80–0xFF chars and gunzip to a different byte sequence.
      assert.ok(res._writeChunks.length > 0, 'compress path must write compressed chunks');
      assert.deepEqual(
        zlib.gunzipSync(Buffer.concat(res._writeChunks)),
        expected,
        'latin1 encodingArg must reach compressor.end (not dropped)'
      );
    });

    it('compresses when byte length equals threshold exactly', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      assert.equal(res.end.name, 'compressedEnd');
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      // Exact boundary: production uses `size < threshold`, so 1024 must compress.
      const str = String.fromCharCode(...Array.from({length: 1024}, (_, i) => 0x80 + (i % 0x80)));
      assert.equal(Buffer.byteLength(str, 'latin1'), 1024);

      const finished = onFinish(res);
      res.end(str, 'latin1');
      await finished;

      assert.equal(
        res.getHeader('content-encoding'),
        'gzip',
        'size === threshold must compress (not size <= threshold skip)'
      );
    });

    it('skips compression for binary (latin1 alias) byte length below threshold', () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      assert.equal(res.end.name, 'compressedEnd');
      res.setHeader('Content-Type', 'text/plain');
      // Same 600-char payload: binary === latin1 in Node Buffer.byteLength.
      const str = String.fromCharCode(...Array.from({length: 600}, (_, i) => 0x80 + (i % 0x80)));
      assert.equal(Buffer.byteLength(str, 'binary'), 600);
      assert.equal(Buffer.byteLength(str), 1200);

      res.end(str, 'binary');

      assert.ok(res.writableEnded);
      assert.equal(res._body, str, 'binary bypass must forward the chunk to origEnd');
      assert.ok(
        res.endInvocations.some(c => c.encoding === 'binary'),
        'bypass must forward binary encodingArg to origEnd'
      );
      assert.equal(
        res.getHeader('content-encoding'),
        undefined,
        'binary size 600 is below threshold 1024 — must not special-case only latin1'
      );
    });

    it('compresses binary when byte length meets threshold', async () => {
      const res = createMockRes();
      const compress = createCompress({threshold: 1024});
      compress({headers: makeHeaders({'accept-encoding': 'gzip'})}, res);

      assert.equal(res.end.name, 'compressedEnd');
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      const str = String.fromCharCode(...Array.from({length: 1100}, (_, i) => 0x80 + (i % 0x80)));
      assert.equal(Buffer.byteLength(str, 'binary'), 1100);
      const expected = Buffer.from(str, 'binary');

      const finished = onFinish(res);
      res.end(str, 'binary');
      await finished;

      assert.equal(
        res.getHeader('content-encoding'),
        'gzip',
        'binary size 1100 is above threshold — must not always-bypass binary'
      );
      assert.ok(res._writeChunks.length > 0, 'compress path must write compressed chunks');
      assert.deepEqual(
        zlib.gunzipSync(Buffer.concat(res._writeChunks)),
        expected,
        'binary encodingArg must reach compressor.end (not dropped)'
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
