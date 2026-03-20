import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {issue, verify} from './csrf.js';

describe('[Boundary] lib/csrf', () => {
  describe('issue()', () => {
    it('returns a token and uuid', () => {
      const {token, uuid} = issue('secret');
      assert.equal(typeof token, 'string');
      assert.ok(token.length > 0);
      assert.match(uuid, /^[0-9a-f-]{36}$/i);
    });

    it('returns different tokens for different UUIDs with the same secret', () => {
      const {token: t1} = issue('secret', 'uuid-a');
      const {token: t2} = issue('secret', 'uuid-b');
      assert.notEqual(t1, t2);
    });

    it('returns different tokens for different secrets with the same UUID', () => {
      const uuid = 'fixed-uuid';
      const {token: t1} = issue('secret1', uuid);
      const {token: t2} = issue('secret2', uuid);
      assert.notEqual(t1, t2);
    });

    it('returns the provided UUID unchanged', () => {
      const fixedUuid = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
      const {uuid} = issue('secret', fixedUuid);
      assert.equal(uuid, fixedUuid);
    });

    it('supports custom encoding', () => {
      const {token: base64Token} = issue('secret', 'u1', 'base64');
      const {token: hexToken} = issue('secret', 'u1', 'hex');
      assert.notEqual(base64Token, hexToken);
      assert.match(hexToken, /^[0-9a-f]+$/);
    });

    it('throws TypeError when secret is missing', () => {
      assert.throws(() => issue(), TypeError);
    });
  });

  describe('verify()', () => {
    it('returns true for a valid token', () => {
      const {token, uuid} = issue('mysecret');
      assert.equal(verify(token, {secret: 'mysecret', uuid}), true);
    });

    it('returns false for a tampered token', () => {
      const {uuid} = issue('mysecret');
      assert.equal(verify('tampered-token-value', {secret: 'mysecret', uuid}), false);
    });

    it('returns false when the secret is wrong', () => {
      const {token, uuid} = issue('correct-secret');
      assert.equal(verify(token, {secret: 'wrong-secret', uuid}), false);
    });

    it('returns false when the UUID is wrong', () => {
      const {token} = issue('secret', 'correct-uuid');
      assert.equal(verify(token, {secret: 'secret', uuid: 'wrong-uuid'}), false);
    });

    it('returns false for empty string token', () => {
      const {uuid} = issue('secret');
      assert.equal(verify('', {secret: 'secret', uuid}), false);
    });

    it('returns false for non-string token', () => {
      const {uuid} = issue('secret');
      assert.equal(verify(null, {secret: 'secret', uuid}), false);
      assert.equal(verify(undefined, {secret: 'secret', uuid}), false);
    });

    it('throws TypeError when secret is missing', () => {
      assert.throws(() => verify('tok', {uuid: 'u1'}), TypeError);
    });

    it('throws TypeError when uuid is missing', () => {
      assert.throws(() => verify('tok', {secret: 's1'}), TypeError);
    });

    it('is consistent with the encoding used during issue', () => {
      const {token} = issue('secret', 'u1', 'hex');
      assert.equal(verify(token, {secret: 'secret', uuid: 'u1', encoding: 'hex'}), true);
      assert.equal(verify(token, {secret: 'secret', uuid: 'u1', encoding: 'base64'}), false);
    });
  });
});
