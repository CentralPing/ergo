import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createRateLimit from './rate-limit.js';

describe('[Module] http/rate-limit', () => {
  const mockReq = (ip = '127.0.0.1') => ({socket: {remoteAddress: ip}});

  /** @param {[string, string][]} headerTuples */
  function assertRateLimitHeaders(headerTuples, {limit, remaining}) {
    assert.ok(Array.isArray(headerTuples));
    assert.equal(headerTuples.length, 3);
    const headers = Object.fromEntries(headerTuples);
    assert.equal(headers['X-RateLimit-Limit'], limit);
    if (remaining !== undefined) {
      assert.equal(headers['X-RateLimit-Remaining'], remaining);
    } else {
      assert.ok(Number(headers['X-RateLimit-Remaining']) >= 0);
    }
    assert.ok(Number(headers['X-RateLimit-Reset']) > 0);
  }

  it('returns rate-limit headers under the limit', () => {
    const rateLimit = createRateLimit({max: 10, windowMs: 60000});
    const result = rateLimit(mockReq());

    assert.ok(result?.response?.headers);
    assertRateLimitHeaders(result.response.headers, {limit: '10'});
  });

  it('decrements remaining on subsequent calls', () => {
    const rateLimit = createRateLimit({max: 5, windowMs: 60000});
    const req = mockReq();
    rateLimit(req);
    const result = rateLimit(req);
    const remaining = Number(Object.fromEntries(result.response.headers)['X-RateLimit-Remaining']);
    assert.equal(remaining, 3);
  });

  it('returns 429 response with rate-limit headers when limit is exceeded', () => {
    const rateLimit = createRateLimit({max: 2, windowMs: 60000});
    const req = mockReq();
    rateLimit(req);
    rateLimit(req);

    const result = rateLimit(req);
    assert.equal(result.response.statusCode, 429);
    assert.ok(typeof result.response.retryAfter === 'number');
    assertRateLimitHeaders(result.response.headers, {limit: '2', remaining: '0'});
  });

  it('limited response includes positive retryAfter and rate-limit headers', () => {
    const rateLimit = createRateLimit({max: 1, windowMs: 60000});
    const req = mockReq();
    rateLimit(req);

    const result = rateLimit(req);
    assert.equal(result.response.statusCode, 429);
    assert.ok(result.response.retryAfter > 0);
    assertRateLimitHeaders(result.response.headers, {limit: '1', remaining: '0'});
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
    assertRateLimitHeaders(limited.response.headers, {limit: '1', remaining: '0'});

    // Different key should not be limited
    const result = rateLimit({headers: {'x-api-key': 'key-b'}, socket: {}});
    assert.ok(result?.response?.headers);
    assert.ok(Array.isArray(result.response.headers));
  });

  it('accepts a custom store and includes rate-limit headers on 429', () => {
    const customStore = {
      hit() {
        return {count: 999, resetMs: 1000, resetAt: 1_001_000};
      }
    };
    const rateLimit = createRateLimit({max: 100, windowMs: 60000, store: customStore});

    const result = rateLimit(mockReq());
    assert.equal(result.response.statusCode, 429);
    assertRateLimitHeaders(result.response.headers, {limit: '100', remaining: '0'});
  });

  it('wires custom-store resetAt into X-RateLimit-Reset when under the limit', () => {
    const resetAt = 9_000_001;
    const customStore = {
      hit() {
        return {count: 1, resetMs: 5_000, resetAt};
      }
    };
    const rateLimit = createRateLimit({max: 100, windowMs: 60000, store: customStore});
    const headers = Object.fromEntries(rateLimit(mockReq()).response.headers);
    assert.equal(headers['X-RateLimit-Reset'], '9001');
  });

  it('uses default options when none provided', () => {
    const rateLimit = createRateLimit();
    const result = rateLimit(mockReq());
    const headers = Object.fromEntries(result.response.headers);
    assert.equal(headers['X-RateLimit-Limit'], '100');
  });

  it('throws TypeError when max is not a positive integer', () => {
    for (const max of [0, -1, 1.5, NaN, '10', null]) {
      assert.throws(() => createRateLimit({max}), {
        name: 'TypeError',
        message: /"max" option must be a positive integer/
      });
    }
  });

  it('throws TypeError when windowMs is not a positive finite number', () => {
    for (const windowMs of [0, -1, NaN, Infinity, '1000', null]) {
      assert.throws(() => createRateLimit({windowMs}), {
        name: 'TypeError',
        message: /"windowMs" option must be a positive finite number/
      });
    }
  });

  it('throws TypeError when store is provided without a hit method', () => {
    assert.throws(() => createRateLimit({store: {}}), {
      name: 'TypeError',
      message: /"store" option must implement hit/
    });
  });

  it('throws TypeError when keyGenerator is provided but not a function', () => {
    assert.throws(() => createRateLimit({keyGenerator: 42}), {
      name: 'TypeError',
      message: /"keyGenerator" option must be a function/
    });
    assert.throws(() => createRateLimit({keyGenerator: null}), {
      name: 'TypeError',
      message: /"keyGenerator" option must be a function/
    });
  });
});
