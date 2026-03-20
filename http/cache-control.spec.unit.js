import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createCacheControl from './cache-control.js';

describe('[Module] http/cache-control', () => {
  it('returns default "private, no-cache" when no options given', () => {
    const cacheControl = createCacheControl();
    const result = cacheControl();
    assert.deepEqual(result, [['Cache-Control', 'private, no-cache']]);
  });

  it('accepts a raw directives string', () => {
    const cacheControl = createCacheControl({directives: 'public, max-age=3600'});
    const result = cacheControl();
    assert.deepEqual(result, [['Cache-Control', 'public, max-age=3600']]);
  });

  it('builds directives from structured options', () => {
    const cacheControl = createCacheControl({
      private: true,
      maxAge: 0,
      mustRevalidate: true
    });
    const result = cacheControl();
    assert.deepEqual(result, [['Cache-Control', 'private, must-revalidate, max-age=0']]);
  });

  it('supports public + max-age + s-maxage', () => {
    const cacheControl = createCacheControl({public: true, maxAge: 3600, sMaxAge: 7200});
    const [[, value]] = cacheControl();
    assert.ok(value.includes('public'));
    assert.ok(value.includes('max-age=3600'));
    assert.ok(value.includes('s-maxage=7200'));
  });

  it('supports no-store directive', () => {
    const cacheControl = createCacheControl({noStore: true});
    const [[, value]] = cacheControl();
    assert.ok(value.includes('no-store'));
  });

  it('supports immutable directive', () => {
    const cacheControl = createCacheControl({public: true, maxAge: 31536000, immutable: true});
    const [[, value]] = cacheControl();
    assert.ok(value.includes('immutable'));
  });

  it('supports stale-while-revalidate and stale-if-error', () => {
    const cacheControl = createCacheControl({
      public: true,
      maxAge: 600,
      staleWhileRevalidate: 60,
      staleIfError: 300
    });
    const [[, value]] = cacheControl();
    assert.ok(value.includes('stale-while-revalidate=60'));
    assert.ok(value.includes('stale-if-error=300'));
  });

  it('supports no-transform and proxy-revalidate', () => {
    const cacheControl = createCacheControl({noTransform: true, proxyRevalidate: true});
    const [[, value]] = cacheControl();
    assert.ok(value.includes('no-transform'));
    assert.ok(value.includes('proxy-revalidate'));
  });

  it('raw directives string takes precedence over structured options', () => {
    const cacheControl = createCacheControl({
      directives: 'no-store',
      public: true,
      maxAge: 3600
    });
    const [[, value]] = cacheControl();
    assert.equal(value, 'no-store');
  });

  it('returns the same reference on every call (pre-computed)', () => {
    const cacheControl = createCacheControl({private: true});
    assert.equal(cacheControl(), cacheControl());
  });

  it('falls back to default when all structured options are false/undefined', () => {
    const cacheControl = createCacheControl({});
    const [[, value]] = cacheControl();
    assert.equal(value, 'private, no-cache');
  });

  it('supports maxAge of 0', () => {
    const cacheControl = createCacheControl({noCache: true, maxAge: 0});
    const [[, value]] = cacheControl();
    assert.ok(value.includes('max-age=0'));
  });
});
