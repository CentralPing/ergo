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
      let time = 1000;
      const store = new MemoryStore({now: () => time});
      store.hit('client-a', 100);
      time += 101;
      const {count} = store.hit('client-a', 100);
      assert.equal(count, 1, 'expired entry should be pruned');
    });

    describe('constructor validation', () => {
      it('throws TypeError for maxKeys: empty string', () => {
        assert.throws(() => new MemoryStore({maxKeys: ''}), {
          name: 'TypeError',
          message: 'maxKeys must be a positive integer'
        });
      });

      it('throws TypeError for maxKeys: null', () => {
        assert.throws(() => new MemoryStore({maxKeys: null}), {
          name: 'TypeError',
          message: 'maxKeys must be a positive integer'
        });
      });

      it('throws TypeError for maxKeys: 0', () => {
        assert.throws(() => new MemoryStore({maxKeys: 0}), {
          name: 'TypeError',
          message: 'maxKeys must be a positive integer'
        });
      });

      it('throws TypeError for maxKeys: -1', () => {
        assert.throws(() => new MemoryStore({maxKeys: -1}), {
          name: 'TypeError',
          message: 'maxKeys must be a positive integer'
        });
      });

      it('throws TypeError for maxKeys: 1.5', () => {
        assert.throws(() => new MemoryStore({maxKeys: 1.5}), {
          name: 'TypeError',
          message: 'maxKeys must be a positive integer'
        });
      });

      it('throws TypeError for now: null', () => {
        assert.throws(() => new MemoryStore({now: null}), {
          name: 'TypeError',
          message: 'now must be a function'
        });
      });

      it('throws TypeError for now: string', () => {
        assert.throws(() => new MemoryStore({now: 'string'}), {
          name: 'TypeError',
          message: 'now must be a function'
        });
      });

      it('throws TypeError for now: 0', () => {
        assert.throws(() => new MemoryStore({now: 0}), {
          name: 'TypeError',
          message: 'now must be a function'
        });
      });

      it('does not throw with default options', () => {
        assert.doesNotThrow(() => new MemoryStore());
      });

      it('does not throw with valid explicit options', () => {
        assert.doesNotThrow(() => new MemoryStore({maxKeys: 1, now: () => 0}));
      });
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

  describe('MemoryStore#reset', () => {
    it('clears all tracked keys so subsequent hits restart at count=1', () => {
      const store = new MemoryStore();
      store.hit('client-a', 60000);
      store.hit('client-a', 60000);
      store.hit('client-b', 60000);
      store.reset();
      const {count} = store.hit('client-a', 60000);
      assert.equal(count, 1);
    });

    it('is a no-op on an empty store (does not throw)', () => {
      const store = new MemoryStore();
      assert.doesNotThrow(() => store.reset());
    });

    it('previously limited keys are no longer limited after reset', () => {
      const store = new MemoryStore();
      for (let i = 0; i < 5; i++) store.hit('flood', 60000);
      const before = checkRateLimit(store, 'flood', 2, 60000);
      assert.equal(before.limited, true);

      store.reset();
      const after = checkRateLimit(store, 'flood', 2, 60000);
      assert.equal(after.limited, false);
      assert.equal(after.count, 1);
    });
  });

  describe('MemoryStore key cleanup and eviction', () => {
    it('prunes expired timestamps and re-creates key on new hit', () => {
      let time = 1000;
      const store = new MemoryStore({now: () => time});
      const windowMs = 100;
      store.hit('ephemeral', windowMs);
      assert.ok(store._hits.has('ephemeral'));

      time += windowMs + 1;
      store.hit('ephemeral', windowMs);
      assert.ok(store._hits.has('ephemeral'), 'key should be re-created for new hit');
      assert.equal(store._hits.get('ephemeral').length, 1, 'should only have the new timestamp');
    });

    it('evicts oldest key when maxKeys is exceeded', () => {
      const store = new MemoryStore({maxKeys: 2});
      store.hit('a', 60_000);
      store.hit('b', 60_000);
      store.hit('c', 60_000);
      assert.ok(!store._hits.has('a'), 'oldest key should be evicted');
      assert.ok(store._hits.has('b'));
      assert.ok(store._hits.has('c'));
    });

    it('accepts custom maxKeys in constructor', () => {
      const store = new MemoryStore({maxKeys: 5});
      assert.equal(store._maxKeys, 5);
    });
  });
});
