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
      store.set('key1', 'fp1');
      const entry = store.get('key1');
      assert.equal(entry.fingerprint, 'fp1');
      assert.equal(entry.status, 'processing');
      assert.equal(entry.response, undefined);
    });

    it('marks entry as complete with response', () => {
      const gen = store.set('key1', 'fp1');
      const response = {statusCode: 201, body: {id: 1}};
      assert.equal(store.complete('key1', response, gen), true);
      const entry = store.get('key1');
      assert.equal(entry.status, 'complete');
      assert.deepEqual(entry.response, response);
    });

    it('deletes an entry', () => {
      store.set('key1', 'fp1');
      store.delete('key1');
      assert.equal(store.get('key1'), undefined);
    });

    it('returns undefined for expired entries', async () => {
      store = new IdempotencyStore({ttlMs: 10});
      store.set('key1', 'fp1');
      await new Promise(r => setTimeout(r, 20));
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

    it('evicts complete entries before processing entries', () => {
      store = new IdempotencyStore({maxKeys: 3});
      const genA = store.set('a', 'fp');
      store.set('b', 'fp');
      store.set('c', 'fp');

      store.complete('a', {statusCode: 200}, genA);

      store.set('d', 'fp');

      assert.equal(store.get('a'), undefined);
      assert.notEqual(store.get('b'), undefined);
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
      assert.equal(entry.status, 'processing');
      assert.equal(entry.response, undefined);
      assert.equal(typeof gen, 'string');
    });

    it('complete returns false when entry was evicted and recycled', () => {
      store = new IdempotencyStore({maxKeys: 1});
      const gen1 = store.set('key1', 'fp1');
      store.set('key2', 'fp2');
      store.set('key1', 'fp1');

      assert.equal(store.complete('key1', {statusCode: 200}, gen1), false);
      assert.equal(store.get('key1').status, 'processing');
    });

    it('complete returns false for undefined response', () => {
      const gen = store.set('key1', 'fp1');
      assert.equal(store.complete('key1', undefined, gen), false);
      assert.equal(store.get('key1').status, 'processing');
    });

    it('complete returns false for null response', () => {
      const gen = store.set('key1', 'fp1');
      assert.equal(store.complete('key1', null, gen), false);
      assert.equal(store.get('key1').status, 'processing');
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
      assert.match(fp, /^[0-9a-f]{64}$/);
    });

    it('handles Buffer input', () => {
      const fp = generateFingerprint(Buffer.from('hello'));
      const fpStr = generateFingerprint('hello');
      assert.equal(fp, fpStr);
    });
  });
});
