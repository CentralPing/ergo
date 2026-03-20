import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {MemoryStore, checkRateLimit, defaultKeyGenerator} from './rate-limit.js';

describe('[Boundary] lib/rate-limit', () => {
  describe('MemoryStore', () => {
    it('tracks hits per key', () => {
      const store = new MemoryStore();
      const {count} = store.hit('client-a', 60000);
      assert.equal(count, 1);
    });

    it('increments count on subsequent hits', () => {
      const store = new MemoryStore();
      store.hit('client-a', 60000);
      const {count} = store.hit('client-a', 60000);
      assert.equal(count, 2);
    });

    it('tracks separate keys independently', () => {
      const store = new MemoryStore();
      store.hit('client-a', 60000);
      store.hit('client-a', 60000);
      const {count} = store.hit('client-b', 60000);
      assert.equal(count, 1);
    });

    it('returns resetMs indicating when the oldest entry expires', () => {
      const store = new MemoryStore();
      const {resetMs} = store.hit('client-a', 60000);
      assert.ok(resetMs > 0 && resetMs <= 60000);
    });

    it('prunes expired entries', () => {
      const store = new MemoryStore();
      store.hit('client-a', 1);
      // Wait long enough for the entry to expire
      const start = Date.now();
      while (Date.now() - start < 5) {
        /* busy wait */
      }
      const {count} = store.hit('client-a', 1);
      assert.equal(count, 1, 'expired entry should be pruned');
    });
  });

  describe('checkRateLimit', () => {
    it('returns limited=false when under the limit', () => {
      const store = new MemoryStore();
      const result = checkRateLimit(store, 'key', 10, 60000);
      assert.equal(result.limited, false);
      assert.equal(result.remaining, 9);
      assert.equal(result.count, 1);
      assert.equal(result.retryAfter, undefined);
    });

    it('returns limited=true when over the limit', () => {
      const store = new MemoryStore();
      for (let i = 0; i < 3; i++) {
        checkRateLimit(store, 'key', 2, 60000);
      }
      const result = checkRateLimit(store, 'key', 2, 60000);
      assert.equal(result.limited, true);
      assert.equal(result.remaining, 0);
      assert.ok(typeof result.retryAfter === 'number');
      assert.ok(result.retryAfter > 0);
    });

    it('returns reset as a Unix timestamp in seconds', () => {
      const store = new MemoryStore();
      const result = checkRateLimit(store, 'key', 10, 60000);
      const nowSec = Math.floor(Date.now() / 1000);
      assert.ok(result.reset >= nowSec && result.reset <= nowSec + 61);
    });

    it('remaining never goes below zero', () => {
      const store = new MemoryStore();
      for (let i = 0; i < 5; i++) {
        checkRateLimit(store, 'key', 1, 60000);
      }
      const result = checkRateLimit(store, 'key', 1, 60000);
      assert.equal(result.remaining, 0);
    });
  });

  describe('defaultKeyGenerator', () => {
    it('returns remoteAddress from req.socket', () => {
      const req = {socket: {remoteAddress: '192.168.1.1'}};
      assert.equal(defaultKeyGenerator(req), '192.168.1.1');
    });

    it('returns "unknown" when no address is available', () => {
      const req = {};
      assert.equal(defaultKeyGenerator(req), 'unknown');
    });
  });
});
