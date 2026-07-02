import {describe, it, beforeEach} from 'node:test';
import assert from 'node:assert/strict';
import {IdempotencyStore, parseIdempotencyKey, generateFingerprint} from './idempotency.js';

describe('[Boundary] lib/idempotency', () => {
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
      assert.equal(entry.status, 'processing');
      assert.equal(entry.response, undefined);
    });

    it('marks entry as complete with response', () => {
      store.set('key1', 'fp1');
      const response = {statusCode: 201, body: {id: 1}};
      store.complete('key1', response);
      const entry = store.get('key1');
      assert.equal(entry.status, 'complete');
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

    it('evicts oldest entry when maxKeys exceeded', () => {
      store = new IdempotencyStore({maxKeys: 2});
      store.set('a', 'fp');
      assert.equal(store.get('a').fingerprint, 'fp');
      store.set('b', 'fp');
      store.set('c', 'fp');
      assert.equal(store.get('a'), undefined);
      assert.equal(store.get('b').fingerprint, 'fp');
      assert.equal(store.get('b').status, 'processing');
      assert.equal(store.get('c').fingerprint, 'fp');
      assert.equal(store.get('c').status, 'processing');
    });

    it('complete is a no-op for nonexistent key', () => {
      store.complete('nope', {});
      assert.equal(store.get('nope'), undefined);
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
        store.set('key1', 'fp1');
        store.complete('key1', {statusCode: 200, headers: [['x-request-id', 'abc']]});
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
        store.set('key1', 'fp1');
        store.complete('key1', {statusCode: 200, headers: [['x-request-id', 'abc']]});
        const first = store.get('key1');
        first.response.headers[0][1] = 'tampered';
        const second = store.get('key1');
        assert.equal(second.response.headers[0][1], 'abc');
      });
    });

    describe('complete() response snapshot', () => {
      it('stores a shallow copy of the response', () => {
        store.set('key1', 'fp1');
        const response = {statusCode: 201, body: {id: 1}};
        store.complete('key1', response);
        response.statusCode = 500;
        const entry = store.get('key1');
        assert.equal(entry.response.statusCode, 201);
      });

      it('shallow-copies headers array', () => {
        store.set('key1', 'fp1');
        const headers = [['x-request-id', 'abc']];
        const response = {statusCode: 200, headers};
        store.complete('key1', response);
        headers.push(['x-extra', 'injected']);
        const entry = store.get('key1');
        assert.equal(entry.response.headers.length, 1);
      });

      it('does not share header tuple references with the caller', () => {
        store.set('key1', 'fp1');
        const headers = [['x-request-id', 'abc']];
        store.complete('key1', {statusCode: 200, headers});
        headers[0][1] = 'mutated';
        const entry = store.get('key1');
        assert.equal(entry.response.headers[0][1], 'abc');
      });

      it('handles response without headers', () => {
        store.set('key1', 'fp1');
        const response = {statusCode: 200, body: 'ok'};
        store.complete('key1', response);
        const entry = store.get('key1');
        assert.deepEqual(entry.response, {statusCode: 200, body: 'ok'});
      });

      it('does not corrupt entry state when response is nullish', () => {
        store.set('key1', 'fp1');
        assert.throws(() => store.complete('key1', null));
        const entry = store.get('key1');
        assert.equal(entry.status, 'processing');
        assert.equal(entry.response, undefined);
      });
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
