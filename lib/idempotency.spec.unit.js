import {describe, it, beforeEach} from 'node:test';
import assert from 'node:assert/strict';
import {
  IdempotencyStore,
  parseIdempotencyKey,
  generateFingerprint,
  STATUS_PROCESSING,
  STATUS_COMPLETE
} from './idempotency.js';

describe('[Boundary] lib/idempotency', () => {
  it('exports STATUS_PROCESSING as "processing"', () => {
    assert.equal(STATUS_PROCESSING, 'processing');
  });

  it('exports STATUS_COMPLETE as "complete"', () => {
    assert.equal(STATUS_COMPLETE, 'complete');
  });

  describe('IdempotencyStore', () => {
    let store;

    beforeEach(() => {
      store = new IdempotencyStore({ttlMs: 1000});
    });

    it('returns undefined for unknown key', () => {
      assert.equal(store.get('unknown'), undefined);
    });

    it('stores and retrieves an entry', () => {
      assert.equal(store.get('key1'), undefined);
      store.set('key1', 'fp1');
      const entry = store.get('key1');
      assert.equal(entry.fingerprint, 'fp1');
      assert.equal(entry.status, STATUS_PROCESSING);
      assert.equal(entry.response, undefined);
    });

    it('marks entry as complete with response', () => {
      const gen = store.set('key1', 'fp1');
      const response = {statusCode: 201, body: {id: 1}};
      assert.equal(store.complete('key1', response, gen), true);
      const entry = store.get('key1');
      assert.equal(entry.status, STATUS_COMPLETE);
      assert.deepEqual(entry.response, response);
      assert.equal(entry.fingerprint, 'fp1');
      assert.equal(typeof entry.expiresAt, 'number');
    });

    it('deletes an entry', () => {
      store.set('key1', 'fp1');
      assert.equal(store.get('key1').fingerprint, 'fp1');
      store.delete('key1');
      assert.equal(store.get('key1'), undefined);
    });

    it('returns undefined for expired entries', async () => {
      store = new IdempotencyStore({ttlMs: 10});
      store.set('key1', 'fp1');
      assert.equal(store.get('key1').fingerprint, 'fp1');
      await new Promise(r => setTimeout(r, 20));
      assert.equal(store.get('key1'), undefined);
      assert.equal(store.get('key1'), undefined);
    });

    it('set returns a generation token string', () => {
      const gen = store.set('key1', 'fp1');
      assert.equal(typeof gen, 'string');
      assert.ok(gen.length > 0);
    });

    it('each set call returns a unique generation token', () => {
      const gen1 = store.set('key1', 'fp1');
      const gen2 = store.set('key2', 'fp2');
      assert.notEqual(gen1, gen2);
    });

    it('prunes expired entries in set before capacity eviction', async () => {
      store = new IdempotencyStore({maxKeys: 2, ttlMs: 10});
      store.set('expired1', 'fp');
      store.set('expired2', 'fp');
      await new Promise(r => setTimeout(r, 20));

      store._ttlMs = 60_000;
      store.set('fresh', 'fp');

      assert.equal(store.get('expired1'), undefined);
      assert.equal(store.get('expired2'), undefined);
      assert.notEqual(store.get('fresh'), undefined);
    });

    it('re-setting an existing key does not trigger spurious eviction', () => {
      store = new IdempotencyStore({maxKeys: 2});
      store.set('a', 'fp');
      store.set('b', 'fp');

      store.set('a', 'fp-new');

      assert.notEqual(store.get('a'), undefined);
      assert.notEqual(store.get('b'), undefined);
      assert.equal(store.get('a').fingerprint, 'fp-new');
    });

    it('re-setting a key preserves prune-loop ordering invariant', async () => {
      store = new IdempotencyStore({maxKeys: 3, ttlMs: 30});
      store.set('a', 'fp');
      store.set('b', 'fp');
      store.set('c', 'fp');

      await new Promise(r => setTimeout(r, 15));
      store.set('a', 'fp-refreshed');
      await new Promise(r => setTimeout(r, 20));

      store.set('d', 'fp');

      assert.equal(store.get('b'), undefined);
      assert.equal(store.get('c'), undefined);
      assert.notEqual(store.get('a'), undefined);
      assert.notEqual(store.get('d'), undefined);
    });

    it('evicts complete entries before processing entries (status over age)', () => {
      store = new IdempotencyStore({maxKeys: 3});
      store.set('a', 'fp');
      const genB = store.set('b', 'fp');
      store.set('c', 'fp');

      store.complete('b', {statusCode: 200}, genB);

      store.set('d', 'fp');

      assert.notEqual(store.get('a'), undefined);
      assert.equal(store.get('b'), undefined);
      assert.notEqual(store.get('c'), undefined);
      assert.notEqual(store.get('d'), undefined);
    });

    it('emits warning when evicting a processing entry', () => {
      const warnings = [];
      const orig = process.emitWarning;
      process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

      try {
        store = new IdempotencyStore({maxKeys: 2});
        store.set('a', 'fp');
        store.set('b', 'fp');
        store.set('c', 'fp');

        assert.equal(warnings.length, 1);
        assert.equal(warnings[0].type, 'ErgoWarning');
        assert.equal(warnings[0].code, 'ERGO_IDEMPOTENCY_PROCESSING_EVICTED');
        assert.ok(warnings[0].message.includes('processing entry'));

        assert.equal(store.get('a'), undefined);
        assert.notEqual(store.get('b'), undefined);
        assert.notEqual(store.get('c'), undefined);
      } finally {
        process.emitWarning = orig;
      }
    });

    it('complete returns false for nonexistent key', () => {
      assert.equal(store.complete('nope', {}, 'gen'), false);
    });

    it('complete returns false when generation token mismatches', () => {
      const gen = store.set('key1', 'fp1');
      assert.equal(store.complete('key1', {statusCode: 200}, 'wrong-gen'), false);
      const entry = store.get('key1');
      assert.equal(entry.status, STATUS_PROCESSING);
      assert.equal(entry.response, undefined);
      assert.equal(typeof gen, 'string');
    });

    it('complete returns false when entry was evicted and recycled', () => {
      store = new IdempotencyStore({maxKeys: 1});
      const gen1 = store.set('key1', 'fp1');
      store.set('key2', 'fp2');
      store.set('key1', 'fp1');

      assert.equal(store.complete('key1', {statusCode: 200}, gen1), false);
      assert.equal(store.get('key1').status, STATUS_PROCESSING);
    });

    it('complete returns false for undefined response', () => {
      const gen = store.set('key1', 'fp1');
      assert.equal(store.complete('key1', undefined, gen), false);
      assert.equal(store.get('key1').status, STATUS_PROCESSING);
    });

    it('complete returns false for null response', () => {
      const gen = store.set('key1', 'fp1');
      assert.equal(store.complete('key1', null, gen), false);
      assert.equal(store.get('key1').status, STATUS_PROCESSING);
    });

    describe('constructor validation', () => {
      it('accepts valid defaults (no arguments)', () => {
        assert.doesNotThrow(() => new IdempotencyStore());
      });

      it('accepts valid maxKeys and ttlMs', () => {
        assert.doesNotThrow(() => new IdempotencyStore({maxKeys: 1, ttlMs: 1}));
      });

      it('throws TypeError for maxKeys: empty string', () => {
        assert.throws(() => new IdempotencyStore({maxKeys: ''}), {
          name: 'TypeError',
          message: 'maxKeys must be a positive integer'
        });
      });

      it('throws TypeError for maxKeys: null', () => {
        assert.throws(() => new IdempotencyStore({maxKeys: null}), {
          name: 'TypeError',
          message: 'maxKeys must be a positive integer'
        });
      });

      it('throws TypeError for maxKeys: 0', () => {
        assert.throws(() => new IdempotencyStore({maxKeys: 0}), {
          name: 'TypeError',
          message: 'maxKeys must be a positive integer'
        });
      });

      it('throws TypeError for maxKeys: -1', () => {
        assert.throws(() => new IdempotencyStore({maxKeys: -1}), {
          name: 'TypeError',
          message: 'maxKeys must be a positive integer'
        });
      });

      it('throws TypeError for maxKeys: 1.5 (non-integer)', () => {
        assert.throws(() => new IdempotencyStore({maxKeys: 1.5}), {
          name: 'TypeError',
          message: 'maxKeys must be a positive integer'
        });
      });

      it('throws TypeError for ttlMs: empty string', () => {
        assert.throws(() => new IdempotencyStore({ttlMs: ''}), {
          name: 'TypeError',
          message: 'ttlMs must be a positive finite number'
        });
      });

      it('throws TypeError for ttlMs: null', () => {
        assert.throws(() => new IdempotencyStore({ttlMs: null}), {
          name: 'TypeError',
          message: 'ttlMs must be a positive finite number'
        });
      });

      it('throws TypeError for ttlMs: 0', () => {
        assert.throws(() => new IdempotencyStore({ttlMs: 0}), {
          name: 'TypeError',
          message: 'ttlMs must be a positive finite number'
        });
      });

      it('throws TypeError for ttlMs: -1', () => {
        assert.throws(() => new IdempotencyStore({ttlMs: -1}), {
          name: 'TypeError',
          message: 'ttlMs must be a positive finite number'
        });
      });

      it('throws TypeError for ttlMs: Infinity', () => {
        assert.throws(() => new IdempotencyStore({ttlMs: Infinity}), {
          name: 'TypeError',
          message: 'ttlMs must be a positive finite number'
        });
      });
    });

    describe('get() reference safety', () => {
      it('returns a frozen snapshot (not live reference)', () => {
        store.set('key1', 'fp1');
        const first = store.get('key1');
        assert.ok(Object.isFrozen(first));
      });

      it('mutating returned entry does not affect stored state', () => {
        store.set('key1', 'fp1');
        const first = store.get('key1');
        try {
          first.fingerprint = 'tampered';
        } catch {
          /* frozen */
        }
        const second = store.get('key1');
        assert.equal(second.fingerprint, 'fp1');
      });

      it('successive get() calls return independent snapshots', () => {
        store.set('key1', 'fp1');
        const first = store.get('key1');
        const second = store.get('key1');
        assert.notEqual(first, second);
        assert.deepEqual(first, second);
      });

      it('mutating returned response does not affect stored state', () => {
        const gen = store.set('key1', 'fp1');
        store.complete('key1', {statusCode: 200, headers: [['x-request-id', 'abc']]}, gen);
        const first = store.get('key1');
        try {
          first.response.statusCode = 500;
        } catch {
          /* frozen */
        }
        try {
          first.response.headers.push(['x-extra', 'injected']);
        } catch {
          /* frozen */
        }
        const second = store.get('key1');
        assert.equal(second.response.statusCode, 200);
        assert.equal(second.response.headers.length, 1);
      });

      it('mutating a header tuple element does not affect stored state', () => {
        const gen = store.set('key1', 'fp1');
        store.complete('key1', {statusCode: 200, headers: [['x-request-id', 'abc']]}, gen);
        const first = store.get('key1');
        first.response.headers[0][1] = 'tampered';
        const second = store.get('key1');
        assert.equal(second.response.headers[0][1], 'abc');
      });

      it('mutating a nested response.body field does not affect stored state', () => {
        const gen = store.set('key1', 'fp1');
        store.complete('key1', {statusCode: 200, body: {id: 1}}, gen);
        const first = store.get('key1');
        first.response.body.id = 999;
        const second = store.get('key1');
        assert.equal(second.response.body.id, 1);
      });
    });

    describe('complete() response snapshot', () => {
      it('stores a deep clone of the response', () => {
        const gen = store.set('key1', 'fp1');
        const response = {statusCode: 201, body: {id: 1}};
        store.complete('key1', response, gen);
        response.statusCode = 500;
        const entry = store.get('key1');
        assert.equal(entry.response.statusCode, 201);
      });

      it('shallow-copies headers array', () => {
        const gen = store.set('key1', 'fp1');
        const headers = [['x-request-id', 'abc']];
        const response = {statusCode: 200, headers};
        store.complete('key1', response, gen);
        headers.push(['x-extra', 'injected']);
        const entry = store.get('key1');
        assert.equal(entry.response.headers.length, 1);
      });

      it('does not share header tuple references with the caller', () => {
        const gen = store.set('key1', 'fp1');
        const headers = [['x-request-id', 'abc']];
        store.complete('key1', {statusCode: 200, headers}, gen);
        headers[0][1] = 'mutated';
        const entry = store.get('key1');
        assert.equal(entry.response.headers[0][1], 'abc');
      });

      it('does not share nested body references with the caller', () => {
        const gen = store.set('key1', 'fp1');
        const body = {id: 1, nested: {value: 'original'}};
        store.complete('key1', {statusCode: 200, body}, gen);
        body.id = 999;
        body.nested.value = 'mutated';
        const entry = store.get('key1');
        assert.equal(entry.response.body.id, 1);
        assert.equal(entry.response.body.nested.value, 'original');
      });

      it('handles response without headers', () => {
        const gen = store.set('key1', 'fp1');
        const response = {statusCode: 200, body: 'ok'};
        store.complete('key1', response, gen);
        const entry = store.get('key1');
        assert.deepEqual(entry.response, {statusCode: 200, body: 'ok'});
      });

      it('does not corrupt entry state when response is nullish', () => {
        const gen = store.set('key1', 'fp1');
        assert.equal(store.complete('key1', null, gen), false);
        const entry = store.get('key1');
        assert.equal(entry.status, STATUS_PROCESSING);
        assert.equal(entry.response, undefined);
      });
    });

    it('frees capacity when expired entries are accessed before new set', async () => {
      store = new IdempotencyStore({maxKeys: 2, ttlMs: 10});
      store.set('a', 'fp');
      store.set('b', 'fp');

      assert.notEqual(store.get('a'), undefined);
      assert.notEqual(store.get('b'), undefined);

      await new Promise(r => setTimeout(r, 20));

      assert.equal(store.get('a'), undefined);
      assert.equal(store.get('b'), undefined);

      store.set('c', 'fp');
      const entry = store.get('c');
      assert.equal(entry.fingerprint, 'fp');
      assert.equal(entry.status, STATUS_PROCESSING);
    });

    it('evicts the first-completed entry when multiple completes compete for capacity', () => {
      store = new IdempotencyStore({maxKeys: 4});
      store.set('a', 'fp');
      const genB = store.set('b', 'fp');
      const genC = store.set('c', 'fp');
      store.set('d', 'fp');

      store.complete('b', {statusCode: 200}, genB);
      store.complete('c', {statusCode: 201}, genC);

      store.set('e', 'fp');

      assert.equal(store.get('b'), undefined);
      assert.notEqual(store.get('c'), undefined);
      assert.equal(store.get('c').status, STATUS_COMPLETE);
      assert.notEqual(store.get('a'), undefined);
      assert.notEqual(store.get('d'), undefined);
      assert.notEqual(store.get('e'), undefined);
    });

    it('re-setting a complete key returns STATUS_PROCESSING', () => {
      const warnings = [];
      const orig = process.emitWarning;
      process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

      try {
        store = new IdempotencyStore({maxKeys: 2});
        const gen = store.set('k1', 'fp');
        store.complete('k1', {statusCode: 200}, gen);
        assert.equal(store.get('k1').status, STATUS_COMPLETE);

        store.set('k1', 'fp-new');
        assert.equal(store.get('k1').status, STATUS_PROCESSING);
        assert.equal(store.get('k1').fingerprint, 'fp-new');
        assert.equal(store.get('k1').response, undefined);

        // Capacity pressure: a ghost `_completeKeys` entry for k1 would make
        // eviction take the complete-key path (no processing warning). Correct
        // re-set clears the side index, so overflow falls back to processing eviction.
        store.set('k2', 'fp');
        store.set('k3', 'fp');
        assert.equal(
          warnings.filter(w => w.code === 'ERGO_IDEMPOTENCY_PROCESSING_EVICTED').length,
          1
        );
        const live = ['k1', 'k2', 'k3'].filter(k => store.get(k) !== undefined);
        assert.equal(live.length, 2);
      } finally {
        process.emitWarning = orig;
      }
    });

    it('complete then delete then set returns STATUS_PROCESSING', () => {
      const gen = store.set('k1', 'fp');
      store.complete('k1', {statusCode: 200}, gen);
      store.delete('k1');
      assert.equal(store.get('k1'), undefined);

      store.set('k1', 'fp-new');
      assert.equal(store.get('k1').status, STATUS_PROCESSING);
      assert.equal(store.get('k1').fingerprint, 'fp-new');
    });

    it('delete of a complete key does not leave a ghost eviction candidate that overflows maxKeys', () => {
      store = new IdempotencyStore({maxKeys: 2});
      const gen = store.set('a', 'fp');
      store.complete('a', {statusCode: 200}, gen);
      store.delete('a');
      assert.equal(store.get('a'), undefined);

      store.set('b', 'fp');
      store.set('c', 'fp');
      store.set('d', 'fp');

      const live = ['a', 'b', 'c', 'd'].filter(k => store.get(k) !== undefined);
      assert.equal(live.length, 2);
    });

    it('prunes expired complete entries before capacity eviction without overflowing maxKeys', async () => {
      const warnings = [];
      const orig = process.emitWarning;
      process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

      try {
        // Two completes + one processing, all expired: without prune, filling
        // maxKeys anew exhausts `_completeKeys` then emits processing eviction.
        // With prune, expired slots are cleared first — no processing warning.
        store = new IdempotencyStore({maxKeys: 3, ttlMs: 10});
        const genA = store.set('a', 'fp');
        const genB = store.set('b', 'fp');
        store.set('c', 'fp');
        store.complete('a', {statusCode: 200}, genA);
        store.complete('b', {statusCode: 200}, genB);

        await new Promise(r => setTimeout(r, 20));

        store._ttlMs = 60_000;
        store.set('d', 'fp');
        store.set('e', 'fp');
        store.set('f', 'fp');

        assert.equal(
          warnings.filter(w => w.code === 'ERGO_IDEMPOTENCY_PROCESSING_EVICTED').length,
          0
        );
        assert.equal(store.get('a'), undefined);
        assert.equal(store.get('b'), undefined);
        assert.equal(store.get('c'), undefined);
        assert.notEqual(store.get('d'), undefined);
        assert.notEqual(store.get('e'), undefined);
        assert.notEqual(store.get('f'), undefined);

        // Ghost `_completeKeys` after prune: next insert overflows maxKeys.
        store.set('g', 'fp');
        const live = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].filter(k => store.get(k) !== undefined);
        assert.equal(live.length, 3);
      } finally {
        process.emitWarning = orig;
      }
    });
  });

  describe('parseIdempotencyKey', () => {
    it('parses a valid sf-string', () => {
      assert.equal(parseIdempotencyKey('"abc-123"'), 'abc-123');
    });

    it('handles escaped characters', () => {
      assert.equal(parseIdempotencyKey('"a\\"b"'), 'a"b');
    });

    it('handles escaped backslash', () => {
      assert.equal(parseIdempotencyKey('"a\\\\b"'), 'a\\b');
    });

    it('returns undefined for missing header', () => {
      assert.equal(parseIdempotencyKey(undefined), undefined);
    });

    it('returns undefined for empty string', () => {
      assert.equal(parseIdempotencyKey(''), undefined);
    });

    it('returns undefined for unquoted value', () => {
      assert.equal(parseIdempotencyKey('abc-123'), undefined);
    });

    it('trims whitespace', () => {
      assert.equal(parseIdempotencyKey('  "key"  '), 'key');
    });

    it('rejects invalid escape \\n per RFC 8941', () => {
      assert.equal(parseIdempotencyKey('"ab\\nc"'), undefined);
    });

    it('rejects invalid escape \\a per RFC 8941', () => {
      assert.equal(parseIdempotencyKey('"ab\\ac"'), undefined);
    });

    it('accepts valid escape \\\\ per RFC 8941', () => {
      assert.equal(parseIdempotencyKey('"a\\\\b"'), 'a\\b');
    });

    it('accepts valid escape \\" per RFC 8941', () => {
      assert.equal(parseIdempotencyKey('"a\\"b"'), 'a"b');
    });

    it('parses empty sf-string', () => {
      assert.equal(parseIdempotencyKey('""'), '');
    });

    it('accepts space (boundary of unescaped range)', () => {
      assert.equal(parseIdempotencyKey('"a b"'), 'a b');
    });

    it('accepts tilde (upper boundary of unescaped range)', () => {
      assert.equal(parseIdempotencyKey('"a~b"'), 'a~b');
    });

    it('accepts ! (\\x21, adjacent to excluded \\")', () => {
      assert.equal(parseIdempotencyKey('"a!b"'), 'a!b');
    });

    it('accepts ] (\\x5D, adjacent to excluded \\\\)', () => {
      assert.equal(parseIdempotencyKey('"a]b"'), 'a]b');
    });

    it('rejects NUL in inner string', () => {
      assert.equal(parseIdempotencyKey('"ab\x00c"'), undefined);
    });

    it('rejects CTL \\x1F in inner string', () => {
      assert.equal(parseIdempotencyKey('"ab\x1Fc"'), undefined);
    });

    it('rejects DEL \\x7F in inner string', () => {
      assert.equal(parseIdempotencyKey('"ab\x7Fc"'), undefined);
    });

    it('rejects non-ASCII \\x80 in inner string', () => {
      assert.equal(parseIdempotencyKey('"ab\x80c"'), undefined);
    });

    it('rejects non-ASCII combining character in inner string', () => {
      assert.equal(parseIdempotencyKey('"cafe\u0301"'), undefined);
    });

    it('rejects HTAB in inner string (not in RFC 8941 unescaped)', () => {
      assert.equal(parseIdempotencyKey('"a\tb"'), undefined);
    });
  });

  describe('generateFingerprint', () => {
    it('returns consistent hash for same input', () => {
      const fp1 = generateFingerprint('hello');
      const fp2 = generateFingerprint('hello');
      assert.equal(fp1, fp2);
    });

    it('returns different hash for different input', () => {
      const fp1 = generateFingerprint('hello');
      const fp2 = generateFingerprint('world');
      assert.notEqual(fp1, fp2);
    });

    it('returns hex string', () => {
      const fp = generateFingerprint('test');
      assert.match(fp, /^[0-9a-f]{64}$/);
    });

    it('handles undefined input', () => {
      const fp = generateFingerprint(undefined);
      assert.equal(fp, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    });

    it('handles Buffer input', () => {
      const fp = generateFingerprint(Buffer.from('hello'));
      const fpStr = generateFingerprint('hello');
      assert.equal(fp, fpStr);
    });
  });
});
