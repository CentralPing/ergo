import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createRateLimit from './rate-limit.js';

describe('[Module] http/rate-limit', () => {
  const mockReq = (ip = '127.0.0.1') => ({socket: {remoteAddress: ip}});

  it('returns header tuples when under the limit', () => {
    const rateLimit = createRateLimit({max: 10, windowMs: 60000});
    const result = rateLimit(mockReq());

    assert.ok(Array.isArray(result));
    assert.equal(result.length, 3);

    const headers = Object.fromEntries(result);
    assert.equal(headers['X-RateLimit-Limit'], '10');
    assert.ok(Number(headers['X-RateLimit-Remaining']) >= 0);
    assert.ok(Number(headers['X-RateLimit-Reset']) > 0);
  });

  it('decrements remaining on subsequent calls', () => {
    const rateLimit = createRateLimit({max: 5, windowMs: 60000});
    const req = mockReq();
    rateLimit(req);
    const result = rateLimit(req);
    const remaining = Number(Object.fromEntries(result)['X-RateLimit-Remaining']);
    assert.equal(remaining, 3);
  });

  it('throws 429 when limit is exceeded', () => {
    const rateLimit = createRateLimit({max: 2, windowMs: 60000});
    const req = mockReq();
    rateLimit(req);
    rateLimit(req);

    assert.throws(
      () => rateLimit(req),
      err => {
        assert.equal(err.status, 429);
        assert.equal(err.title, 'Too Many Requests');
        assert.ok(typeof err.retryAfter === 'number');
        return true;
      }
    );
  });

  it('thrown 429 has correct RFC 9457 body shape', () => {
    const rateLimit = createRateLimit({max: 1, windowMs: 60000});
    const req = mockReq();
    rateLimit(req);

    try {
      rateLimit(req);
      assert.fail('expected throw');
    } catch (err) {
      const json = JSON.parse(JSON.stringify(err));
      assert.equal(json.status, 429);
      assert.equal(json.title, 'Too Many Requests');
      assert.ok(json.type);
      assert.ok(json.detail);
      assert.ok(json.retryAfter > 0);
    }
  });

  it('tracks separate clients independently', () => {
    const rateLimit = createRateLimit({max: 1, windowMs: 60000});
    rateLimit(mockReq('10.0.0.1'));
    // Second client should not be limited
    const result = rateLimit(mockReq('10.0.0.2'));
    assert.ok(Array.isArray(result));
  });

  it('accepts a custom keyGenerator', () => {
    const rateLimit = createRateLimit({
      max: 1,
      windowMs: 60000,
      keyGenerator: req => req.headers?.['x-api-key'] || 'anon'
    });

    rateLimit({headers: {'x-api-key': 'key-a'}, socket: {}});

    assert.throws(
      () => rateLimit({headers: {'x-api-key': 'key-a'}, socket: {}}),
      err => err.status === 429
    );

    // Different key should not be limited
    const result = rateLimit({headers: {'x-api-key': 'key-b'}, socket: {}});
    assert.ok(Array.isArray(result));
  });

  it('accepts a custom store', () => {
    const customStore = {
      hit() {
        return {count: 999, resetMs: 1000};
      }
    };
    const rateLimit = createRateLimit({max: 100, windowMs: 60000, store: customStore});

    assert.throws(
      () => rateLimit(mockReq()),
      err => err.status === 429
    );
  });

  it('uses default options when none provided', () => {
    const rateLimit = createRateLimit();
    const result = rateLimit(mockReq());
    const headers = Object.fromEntries(result);
    assert.equal(headers['X-RateLimit-Limit'], '100');
  });
});
