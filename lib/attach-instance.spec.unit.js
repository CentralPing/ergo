import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import attachInstance from './attach-instance.js';

describe('[Boundary] lib/attach-instance', () => {
  it('sets instance to urn:uuid:{id} when x-request-id header is present', () => {
    const err = {};
    const res = {getHeader: () => 'abc-123'};

    attachInstance(err, res);

    assert.equal(err.instance, 'urn:uuid:abc-123');
  });

  it('does not set instance when x-request-id header is absent', () => {
    const err = {};
    const res = {getHeader: () => undefined};

    attachInstance(err, res);

    assert.equal(err.instance, undefined);
  });

  it('preserves existing instance value', () => {
    const err = {instance: 'urn:uuid:existing'};
    const res = {getHeader: () => 'new-id'};

    attachInstance(err, res);

    assert.equal(err.instance, 'urn:uuid:existing');
  });

  it('handles res.getHeader being undefined (optional chaining)', () => {
    const err = {};
    const res = {};

    attachInstance(err, res);

    assert.equal(err.instance, undefined);
  });

  it('produces urn:uuid: prefix followed by header value verbatim', () => {
    const id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const err = {};
    const res = {getHeader: () => id};

    attachInstance(err, res);

    assert.ok(err.instance.startsWith('urn:uuid:'));
    assert.equal(err.instance, `urn:uuid:${id}`);
  });
});
