import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createRateLimit from './rate-limit.js';

describe('[Module] http/rate-limit', () => {
  const mockReq = (ip = '127.0.0.1') => ({socket: {remoteAddress: ip}});

  it('returns rate-limit headers under the limit', () => {
    const rateLimit = createRateLimit({max: 10, windowMs: 60000});
    const result = rateLimit(mockReq());

    assert.ok(result?.response?.headers);
    assert.equal(result.response.headers.length, 3);

    const headers = Object.fromEntries(result.response.headers);
    assert.equal(headers['X-RateLimit-Limit'], '10');
    assert.ok(Number(headers['X-RateLimit-Remaining']) >= 0);
    assert.ok(Number(headers['X-RateLimit-Reset']) > 0);
  });

  it('decrements remaining on subsequent calls', () => {
    const rateLimit = createRateLimit({max: 5, windowMs: 60000});
    const req = mockReq();
    rateLimit(req);
    const result = rateLimit(req);
    const remaining = Number(Object.fromEntries(result.response.headers)['X-RateLimit-Remaining']);
    assert.equal(remaining, 3);
  });

  it('returns 429 response when limit is exceeded', () => {
    const rateLimit = createRateLimit({max: 2, windowMs: 60000});
    const req = mockReq();
    rateLimit(req);
    rateLimit(req);

    const result = rateLimit(req);
    assert.equal(result.response.statusCode, 429);
    assert.ok(typeof result.response.retryAfter === 'number');
  });

  it('limited response includes positive retryAfter', () => {
    const rateLimit = createRateLimit({max: 1, windowMs: 60000});
    const req = mockReq();
    rateLimit(req);

    const result = rateLimit(req);
    assert.equal(result.response.statusCode, 429);
    assert.ok(result.response.retryAfter > 0);
  });

  it('tracks separate clients independently', () => {
    const rateLimit = createRateLimit({max: 1, windowMs: 60000});
    rateLimit(mockReq('10.0.0.1'));
    // Second client should not be limited
    const result = rateLimit(mockReq('10.0.0.2'));
    assert.ok(result?.response?.headers);
    assert.ok(Array.isArray(result.response.headers));
  });

  it('accepts a custom keyGenerator', () => {
    const rateLimit = createRateLimit({
      max: 1,
      windowMs: 60000,
      keyGenerator: req => req.headers?.['x-api-key'] || 'anon'
    });

    rateLimit({headers: {'x-api-key': 'key-a'}, socket: {}});

    const limited = rateLimit({headers: {'x-api-key': 'key-a'}, socket: {}});
    assert.equal(limited.response.statusCode, 429);

    // Different key should not be limited
    const result = rateLimit({headers: {'x-api-key': 'key-b'}, socket: {}});
    assert.ok(result?.response?.headers);
    assert.ok(Array.isArray(result.response.headers));
  });

  it('accepts a custom store', () => {
    const customStore = {
      hit() {
        return {count: 999, resetMs: 1000};
      }
    };
    const rateLimit = createRateLimit({max: 100, windowMs: 60000, store: customStore});

    const result = rateLimit(mockReq());
    assert.equal(result.response.statusCode, 429);
  });

  it('uses default options when none provided', () => {
    const rateLimit = createRateLimit();
    const result = rateLimit(mockReq());
    const headers = Object.fromEntries(result.response.headers);
    assert.equal(headers['X-RateLimit-Limit'], '100');
  });
});
