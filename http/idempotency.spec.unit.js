import {describe, it, beforeEach} from 'node:test';
import assert from 'node:assert/strict';
import {IdempotencyStore} from '../lib/idempotency.js';
import idempotency from './idempotency.js';

describe('[Boundary] http/idempotency', () => {
  let mw;

  const makeReq = (method = 'POST', key) => ({
    method,
    headers: key != null ? {'idempotency-key': key} : {}
  });

  describe('method filtering', () => {
    beforeEach(() => {
      mw = idempotency();
    });

    it('skips GET requests', () => {
      assert.deepEqual(mw(makeReq('GET', '"k1"'), {}, {}), {});
    });

    it('skips DELETE requests', () => {
      assert.deepEqual(mw(makeReq('DELETE', '"k1"'), {}, {}), {});
    });

    it('processes POST requests', () => {
      const result = mw(makeReq('POST', '"k1"'), {}, {});
      assert.notEqual(result, undefined);
    });

    it('processes PATCH requests', () => {
      const result = mw(makeReq('PATCH', '"k1"'), {}, {});
      assert.notEqual(result, undefined);
    });

    it('respects custom methods option', () => {
      mw = idempotency({methods: ['PUT']});
      assert.deepEqual(mw(makeReq('POST', '"k1"'), {}, {}), {});
      assert.notEqual(mw(makeReq('PUT', '"k1"'), {}, {}), undefined);
    });
  });

  describe('required option', () => {
    it('returns empty object when not required and key missing', () => {
      mw = idempotency();
      assert.deepEqual(mw(makeReq('POST'), {}, {}), {});
    });

    it('returns 400 when required and key missing', () => {
      mw = idempotency({required: true});
      const result = mw(makeReq('POST'), {}, {});
      assert.equal(result.response.statusCode, 400);
      assert.ok(result.response.detail.includes('required'));
    });

    it('returns 400 with format guidance when header is present but unquoted', () => {
      mw = idempotency();
      const result = mw(makeReq('POST', 'unquoted-key'), {}, {});
      assert.equal(result.response.statusCode, 400);
      assert.ok(result.response.detail.includes('RFC 8941'));
    });

    it('returns 400 with format guidance when header is present but malformed', () => {
      mw = idempotency();
      const result = mw(makeReq('POST', 'key"value'), {}, {});
      assert.equal(result.response.statusCode, 400);
      assert.ok(result.response.detail.includes('quoted string'));
    });

    it('returns 400 for malformed header regardless of required option', () => {
      mw = idempotency({required: false});
      const result = mw(makeReq('POST', 'no-quotes'), {}, {});
      assert.equal(result.response.statusCode, 400);
      assert.ok(result.response.detail.includes('RFC 8941'));
    });

    it('returns 400 for empty string header value', () => {
      mw = idempotency();
      const result = mw(makeReq('POST', ''), {}, {});
      assert.equal(result.response.statusCode, 400);
      assert.ok(result.response.detail.includes('RFC 8941'));
    });

    it('returns 400 for whitespace-only header value', () => {
      mw = idempotency();
      const result = mw(makeReq('POST', '   '), {}, {});
      assert.equal(result.response.statusCode, 400);
      assert.ok(result.response.detail.includes('RFC 8941'));
    });
  });

  describe('new key', () => {
    beforeEach(() => {
      mw = idempotency();
    });

    it('returns value with key and lifecycle functions', () => {
      const result = mw(makeReq('POST', '"new-key"'), {}, {});
      assert.equal(result.value.key, 'new-key');
      assert.equal(typeof result.value.fingerprint, 'string');
      assert.equal(typeof result.value.complete, 'function');
      assert.equal(typeof result.value.discard, 'function');
    });

    it('does not return a response for new keys', () => {
      const result = mw(makeReq('POST', '"new-key"'), {}, {});
      assert.equal(result.response, undefined);
    });
  });

  describe('duplicate key with same fingerprint', () => {
    beforeEach(() => {
      mw = idempotency();
    });

    it('replays stored response when complete', () => {
      const storedResponse = {statusCode: 201, body: {id: 42}};
      const req = makeReq('POST', '"dup-key"');
      const domainAcc = {body: {raw: 'test-body'}};

      const first = mw(req, {}, domainAcc);
      first.value.complete(storedResponse);

      const second = mw(req, {}, domainAcc);
      assert.deepEqual(second.response, storedResponse);
      assert.equal(second.value.replayed, true);
    });

    it('returns 409 when still processing', () => {
      const req = makeReq('POST', '"proc-key"');
      const domainAcc = {body: {raw: 'test-body'}};

      mw(req, {}, domainAcc);

      const second = mw(req, {}, domainAcc);
      assert.equal(second.response.statusCode, 409);
      assert.ok(second.response.detail.includes('already being processed'));
    });
  });

  describe('duplicate key with different fingerprint', () => {
    it('returns 409 Conflict', () => {
      mw = idempotency();
      const domainAcc1 = {body: {raw: 'body-a'}};
      const domainAcc2 = {body: {raw: 'body-b'}};
      const req = makeReq('POST', '"fp-key"');

      mw(req, {}, domainAcc1);

      const result = mw(req, {}, domainAcc2);
      assert.equal(result.response.statusCode, 409);
      assert.ok(result.response.detail.includes('different request'));
    });
  });

  describe('discard', () => {
    it('removes entry so next request proceeds as new', () => {
      mw = idempotency();
      const req = makeReq('POST', '"disc-key"');
      const domainAcc = {body: {raw: 'body'}};

      const first = mw(req, {}, domainAcc);
      first.value.discard();

      const second = mw(req, {}, domainAcc);
      assert.equal(second.value.key, 'disc-key');
      assert.equal(typeof second.value.complete, 'function');
    });
  });

  describe('fingerprinting', () => {
    it('uses parsed body when raw is unavailable', () => {
      mw = idempotency();
      const req = makeReq('POST', '"fp2-key"');
      const domainAcc = {body: {parsed: {name: 'test'}}};

      const result = mw(req, {}, domainAcc);
      assert.equal(typeof result.value.fingerprint, 'string');
      assert.match(result.value.fingerprint, /^[0-9a-f]{64}$/);
    });

    it('handles missing body gracefully', () => {
      mw = idempotency();
      const result = mw(makeReq('POST', '"no-body"'), {}, {});
      assert.equal(typeof result.value.fingerprint, 'string');
    });
  });

  describe('generation token lifecycle', () => {
    it('complete returns false after entry eviction (maxKeys: 1)', () => {
      mw = idempotency({store: new IdempotencyStore({maxKeys: 1})});
      const domainAcc = {body: {raw: 'body'}};

      const first = mw(makeReq('POST', '"key-a"'), {}, domainAcc);
      assert.equal(typeof first.value.complete, 'function');

      mw(makeReq('POST', '"key-b"'), {}, domainAcc);

      assert.equal(first.value.complete({statusCode: 200}), false);
    });

    it('complete returns true on successful completion', () => {
      mw = idempotency();
      const domainAcc = {body: {raw: 'body'}};

      const result = mw(makeReq('POST', '"success-key"'), {}, domainAcc);
      assert.equal(result.value.complete({statusCode: 201}), true);
    });
  });

  describe('custom store', () => {
    it('uses the provided store', () => {
      const calls = [];
      const customStore = {
        get: k => {
          calls.push(['get', k]);
          return undefined;
        },
        set: (k, fp) => calls.push(['set', k, fp]),
        complete: () => {},
        delete: () => {}
      };

      mw = idempotency({store: customStore});
      mw(makeReq('POST', '"cs-key"'), {}, {});

      assert.ok(calls.some(([op]) => op === 'get'));
      assert.ok(calls.some(([op]) => op === 'set'));
    });
  });

  describe('keyGenerator option', () => {
    it('uses keyGenerator to scope store key', () => {
      mw = idempotency({
        keyGenerator: (key, _req, acc) => `${acc.auth?.subject}:${key}`
      });
      const domainAcc = {body: {raw: 'same-body'}};

      const first = mw(
        makeReq('POST', '"shared-key"'),
        {},
        {
          ...domainAcc,
          auth: {subject: 'user-a'}
        }
      );
      first.value.complete({statusCode: 201, body: {owner: 'a'}});

      const second = mw(
        makeReq('POST', '"shared-key"'),
        {},
        {
          ...domainAcc,
          auth: {subject: 'user-b'}
        }
      );
      assert.equal(second.value.key, 'shared-key');
      assert.equal(typeof second.value.complete, 'function');
      assert.equal(second.response, undefined);
    });

    it('replays within same scope', () => {
      mw = idempotency({
        keyGenerator: (key, _req, acc) => `${acc.auth?.subject}:${key}`
      });
      const storedResponse = {statusCode: 201, body: {id: 1}};
      const domainAcc = {body: {raw: 'same-body'}, auth: {subject: 'user-a'}};

      const first = mw(makeReq('POST', '"replay-key"'), {}, domainAcc);
      first.value.complete(storedResponse);

      const second = mw(makeReq('POST', '"replay-key"'), {}, domainAcc);
      assert.deepEqual(second.response, storedResponse);
      assert.equal(second.value.replayed, true);
    });

    it('returns original parsed key in value.key', () => {
      mw = idempotency({
        keyGenerator: (key, _req, acc) => `${acc.auth?.subject}:${key}`
      });
      const result = mw(
        makeReq('POST', '"original-key"'),
        {},
        {
          auth: {subject: 'tenant-1'}
        }
      );
      assert.equal(result.value.key, 'original-key');
    });

    it('defaults to identity when keyGenerator not provided', () => {
      const calls = [];
      const customStore = {
        get: k => {
          calls.push(['get', k]);
          return undefined;
        },
        set: (k, fp) => calls.push(['set', k, fp]),
        complete: () => {},
        delete: () => {}
      };

      mw = idempotency({store: customStore});
      mw(makeReq('POST', '"identity-key"'), {}, {});

      assert.ok(calls.some(([op, k]) => op === 'get' && k === 'identity-key'));
      assert.ok(calls.some(([op, k]) => op === 'set' && k === 'identity-key'));
    });
  });
});
