import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import applyResponseTiming, {
  DEFAULT_TIMING_HEADER,
  DEFAULT_TIMING_PRECISION
} from './response-time.js';

/**
 * Minimal res stub with writeHead support for boundary tests.
 * Mirrors the subset of ServerResponse used by applyResponseTiming.
 */
function createStubRes() {
  const headers = Object.create(null);
  return {
    headersSent: false,
    _headers: headers,
    setHeader(name, value) {
      headers[name.toLowerCase()] = value;
    },
    getHeader(name) {
      return headers[name.toLowerCase()];
    },
    writeHead() {
      this.headersSent = true;
      return this;
    }
  };
}

describe('[Boundary] lib/response-time', () => {
  it('exports DEFAULT_TIMING_HEADER as "x-response-time"', () => {
    assert.equal(DEFAULT_TIMING_HEADER, 'x-response-time');
  });

  it('exports DEFAULT_TIMING_PRECISION as 3', () => {
    assert.equal(DEFAULT_TIMING_PRECISION, 3);
  });

  it('sets the default timing header on writeHead', () => {
    const res = createStubRes();
    applyResponseTiming(res);
    res.writeHead(200);

    const value = res.getHeader(DEFAULT_TIMING_HEADER);
    assert.ok(value !== undefined, 'timing header should be set');
    assert.ok(!Number.isNaN(Number(value)), 'value should be a numeric string');
    assert.ok(Number(value) >= 0, 'value should be non-negative');
  });

  it('uses a custom header name when provided', () => {
    const res = createStubRes();
    applyResponseTiming(res, 'server-timing');
    res.writeHead(200);

    assert.ok(res.getHeader('server-timing') !== undefined);
    assert.equal(res.getHeader(DEFAULT_TIMING_HEADER), undefined);
  });

  it('uses custom precision when provided', () => {
    const res = createStubRes();
    applyResponseTiming(res, DEFAULT_TIMING_HEADER, 0);
    res.writeHead(200);

    const value = res.getHeader(DEFAULT_TIMING_HEADER);
    assert.ok(!value.includes('.'), 'precision 0 should have no decimal point');
  });

  it('respects precision of 6 decimal places', () => {
    const res = createStubRes();
    applyResponseTiming(res, DEFAULT_TIMING_HEADER, 6);
    res.writeHead(200);

    const value = res.getHeader(DEFAULT_TIMING_HEADER);
    const parts = value.split('.');
    assert.equal(parts.length, 2, 'should have a decimal point');
    assert.equal(parts[1].length, 6, 'should have 6 decimal places');
  });

  it('single-fire: second writeHead call does not re-set the header', () => {
    const res = createStubRes();
    applyResponseTiming(res);

    res.writeHead(200);

    res.headersSent = false;
    res.setHeader(DEFAULT_TIMING_HEADER, 'overwritten');
    res.writeHead(200);

    assert.equal(
      res.getHeader(DEFAULT_TIMING_HEADER),
      'overwritten',
      'second writeHead should use the restored original, not the patch'
    );
  });

  it('restores original writeHead after first invocation', () => {
    const res = createStubRes();
    const originalWriteHead = res.writeHead;
    applyResponseTiming(res);

    assert.notEqual(res.writeHead, originalWriteHead, 'should be patched');
    res.writeHead(200);
    assert.equal(res.writeHead, originalWriteHead, 'should be restored');
  });

  it('does not set header when headersSent is true', () => {
    const res = createStubRes();
    applyResponseTiming(res);

    res.headersSent = true;
    res.writeHead(200);

    assert.equal(res.getHeader(DEFAULT_TIMING_HEADER), undefined);
  });

  it('passes writeHead arguments through to the original', () => {
    const calls = [];
    const res = createStubRes();
    const origWriteHead = res.writeHead;
    res.writeHead = function (...args) {
      return origWriteHead.apply(this, args);
    };
    applyResponseTiming(res);

    const origAfterPatch = res.writeHead;
    res.writeHead = function (...args) {
      calls.push(args);
      return origAfterPatch.apply(this, args);
    };
    res.writeHead(201, {'x-custom': 'val'});

    assert.equal(calls.length, 1);
    assert.equal(calls[0][0], 201);
    assert.deepEqual(calls[0][1], {'x-custom': 'val'});
  });

  it('value is a non-negative number string', () => {
    const res = createStubRes();
    applyResponseTiming(res);
    res.writeHead(200);

    const value = res.getHeader(DEFAULT_TIMING_HEADER);
    const num = Number(value);
    assert.ok(Number.isFinite(num), 'should be finite');
    assert.ok(num >= 0, 'should be non-negative');
  });
});
