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
      store.set('key1', 'fp1');
      const response = {statusCode: 201, body: {id: 1}};
      store.complete('key1', response);
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

    it('evicts oldest entry when maxKeys exceeded', () => {
      store = new IdempotencyStore({maxKeys: 2});
      store.set('a', 'fp');
      store.set('b', 'fp');
      store.set('c', 'fp');
      assert.equal(store.get('a'), undefined);
      assert.notEqual(store.get('b'), undefined);
      assert.notEqual(store.get('c'), undefined);
    });

    it('complete is a no-op for nonexistent key', () => {
      assert.doesNotThrow(() => store.complete('nope', {}));
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
