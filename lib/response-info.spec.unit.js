import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import buildResponseInfo from './response-info.js';

describe('[Boundary] lib/response-info', () => {
  function mockReq(overrides = {}) {
    return {method: 'GET', url: '/', ...overrides};
  }

  function mockRes(overrides = {}) {
    const headers = {};
    return {
      statusCode: 200,
      getHeaders() {
        return {...headers};
      },
      getHeader(name) {
        return headers[name.toLowerCase()];
      },
      setHeader(name, value) {
        headers[name.toLowerCase()] = value;
      },
      ...overrides
    };
  }

  it('returns correct shape with all fields', () => {
    const res = mockRes();
    res.setHeader('content-length', '42');
    const info = buildResponseInfo(
      mockReq({method: 'POST', url: '/api/v1'}),
      res,
      performance.now() - 10
    );
    assert.equal(info.statusCode, 200);
    assert.equal(info.method, 'POST');
    assert.equal(info.url, '/api/v1');
    assert.equal(info.bodySize, 42);
    assert.equal(typeof info.duration, 'number');
    assert.ok(info.duration >= 0);
    assert.equal(typeof info.headers, 'object');
  });

  it('bodySize is undefined when content-length header is absent', () => {
    const info = buildResponseInfo(mockReq(), mockRes(), performance.now());
    assert.equal(info.bodySize, undefined);
  });

  it('bodySize is undefined when content-length is non-numeric', () => {
    const res = mockRes();
    res.setHeader('content-length', 'invalid');
    const info = buildResponseInfo(mockReq(), res, performance.now());
    assert.equal(info.bodySize, undefined);
  });

  it('bodySize is undefined when content-length is Infinity', () => {
    const res = mockRes();
    res.setHeader('content-length', 'Infinity');
    const info = buildResponseInfo(mockReq(), res, performance.now());
    assert.equal(info.bodySize, undefined);
  });

  it('bodySize parses numeric content-length correctly', () => {
    const res = mockRes();
    res.setHeader('content-length', '1024');
    const info = buildResponseInfo(mockReq(), res, performance.now());
    assert.equal(info.bodySize, 1024);
  });

  it('bodySize handles zero content-length', () => {
    const res = mockRes();
    res.setHeader('content-length', '0');
    const info = buildResponseInfo(mockReq(), res, performance.now());
    assert.equal(info.bodySize, 0);
  });

  it('duration is computed from startTime', () => {
    const start = performance.now() - 50;
    const info = buildResponseInfo(mockReq(), mockRes(), start);
    assert.ok(info.duration >= 50, `duration should be >= 50ms, got ${info.duration}`);
  });

  it('reflects res.statusCode', () => {
    const res = mockRes();
    res.statusCode = 404;
    const info = buildResponseInfo(mockReq(), res, performance.now());
    assert.equal(info.statusCode, 404);
  });

  it('captures all response headers', () => {
    const res = mockRes();
    res.setHeader('x-custom', 'value');
    res.setHeader('content-type', 'application/json');
    const info = buildResponseInfo(mockReq(), res, performance.now());
    assert.equal(info.headers['x-custom'], 'value');
    assert.equal(info.headers['content-type'], 'application/json');
  });

  it('headers object is a snapshot (not live reference)', () => {
    const res = mockRes();
    res.setHeader('x-test', 'before');
    const info = buildResponseInfo(mockReq(), res, performance.now());
    res.setHeader('x-test', 'after');
    assert.equal(info.headers['x-test'], 'before');
  });
});
