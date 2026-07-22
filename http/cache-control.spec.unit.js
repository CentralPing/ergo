import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createCacheControl, {DEFAULT_DIRECTIVES} from './cache-control.js';

describe('[Module] http/cache-control', () => {
  it('exports DEFAULT_DIRECTIVES as "private, no-cache"', () => {
    assert.equal(DEFAULT_DIRECTIVES, 'private, no-cache');
  });

  it('returns {response: {headers}} with default DEFAULT_DIRECTIVES', () => {
    const cacheControl = createCacheControl();
    const result = cacheControl();
    assert.ok(result.response, 'should have a response property');
    assert.deepEqual(result.response.headers, [['Cache-Control', DEFAULT_DIRECTIVES]]);
  });

  it('accepts a raw directives string', () => {
    const cacheControl = createCacheControl({directives: 'public, max-age=3600'});
    const {
      response: {headers}
    } = cacheControl();
    assert.deepEqual(headers, [['Cache-Control', 'public, max-age=3600']]);
  });

  it('builds directives from structured options', () => {
    const cacheControl = createCacheControl({
      private: true,
      maxAge: 0,
      mustRevalidate: true
    });
    const {
      response: {headers}
    } = cacheControl();
    assert.deepEqual(headers, [['Cache-Control', 'private, must-revalidate, max-age=0']]);
  });

  it('supports public + max-age + s-maxage', () => {
    const cacheControl = createCacheControl({public: true, maxAge: 3600, sMaxAge: 7200});
    const [[, value]] = cacheControl().response.headers;
    assert.ok(value.includes('public'));
    assert.ok(value.includes('max-age=3600'));
    assert.ok(value.includes('s-maxage=7200'));
  });

  it('supports no-store directive', () => {
    const cacheControl = createCacheControl({noStore: true});
    const [[, value]] = cacheControl().response.headers;
    assert.ok(value.includes('no-store'));
  });

  it('supports immutable directive', () => {
    const cacheControl = createCacheControl({public: true, maxAge: 31536000, immutable: true});
    const [[, value]] = cacheControl().response.headers;
    assert.ok(value.includes('immutable'));
  });

  it('supports stale-while-revalidate and stale-if-error', () => {
    const cacheControl = createCacheControl({
      public: true,
      maxAge: 600,
      staleWhileRevalidate: 60,
      staleIfError: 300
    });
    const [[, value]] = cacheControl().response.headers;
    assert.ok(value.includes('stale-while-revalidate=60'));
    assert.ok(value.includes('stale-if-error=300'));
  });

  it('supports no-transform and proxy-revalidate', () => {
    const cacheControl = createCacheControl({noTransform: true, proxyRevalidate: true});
    const [[, value]] = cacheControl().response.headers;
    assert.ok(value.includes('no-transform'));
    assert.ok(value.includes('proxy-revalidate'));
  });

  it('raw directives string takes precedence over structured options', () => {
    const cacheControl = createCacheControl({
      directives: 'no-store',
      public: true,
      maxAge: 3600
    });
    const [[, value]] = cacheControl().response.headers;
    assert.equal(value, 'no-store');
  });

  it('returns the same reference on every call (pre-computed)', () => {
    const cacheControl = createCacheControl({private: true});
    assert.equal(cacheControl(), cacheControl());
  });

  it('falls back to DEFAULT_DIRECTIVES when all structured options are false/undefined', () => {
    const cacheControl = createCacheControl({});
    const [[, value]] = cacheControl().response.headers;
    assert.equal(value, DEFAULT_DIRECTIVES);
  });

  it('supports maxAge of 0', () => {
    const cacheControl = createCacheControl({noCache: true, maxAge: 0});
    const [[, value]] = cacheControl().response.headers;
    assert.ok(value.includes('max-age=0'));
  });

  it('throws TypeError when a delta-seconds option is not a non-negative integer', () => {
    for (const name of ['maxAge', 'sMaxAge', 'staleWhileRevalidate', 'staleIfError']) {
      for (const value of [-1, 1.5, NaN, Infinity, '3600', true, null]) {
        assert.throws(() => createCacheControl({[name]: value}), {
          name: 'TypeError',
          message: new RegExp(`"${name}" option must be a non-negative integer`)
        });
      }
    }
  });

  it('throws TypeError when public and private are both true', () => {
    assert.throws(() => createCacheControl({public: true, private: true}), {
      name: 'TypeError',
      message: /"public" and "private" are mutually exclusive/
    });
  });

  it('throws TypeError when noStore is combined with freshness directives', () => {
    for (const opts of [
      {noStore: true, maxAge: 0},
      {noStore: true, sMaxAge: 60},
      {noStore: true, staleWhileRevalidate: 30},
      {noStore: true, staleIfError: 120}
    ]) {
      assert.throws(() => createCacheControl(opts), {
        name: 'TypeError',
        message: /"noStore" cannot be combined with freshness directives/
      });
    }
  });

  it('accepts raw directives without structured validation', () => {
    const contradictory = createCacheControl({directives: 'public, private'});
    assert.equal(contradictory().response.headers[0][1], 'public, private');

    assert.doesNotThrow(() => createCacheControl({directives: 'no-store', maxAge: -1}));
    const withInvalidDelta = createCacheControl({directives: 'no-store', maxAge: -1});
    assert.equal(withInvalidDelta().response.headers[0][1], 'no-store');

    assert.doesNotThrow(() =>
      createCacheControl({directives: 'no-store', public: true, private: true})
    );

    assert.doesNotThrow(() =>
      createCacheControl({directives: 'no-store', noStore: true, maxAge: 0})
    );
    const withNoStoreFreshness = createCacheControl({
      directives: 'no-store',
      noStore: true,
      maxAge: 0
    });
    assert.equal(withNoStoreFreshness().response.headers[0][1], 'no-store');
  });
});
