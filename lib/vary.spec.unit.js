import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import appendVary from './vary.js';

function createStubRes() {
  const headers = Object.create(null);
  return {
    setHeader(name, value) {
      headers[name.toLowerCase()] = value;
    },
    getHeader(name) {
      return headers[name.toLowerCase()];
    }
  };
}

describe('[Boundary] lib/vary', () => {
  it('sets Vary header when none exists', () => {
    const res = createStubRes();

    appendVary(res, 'Accept');

    assert.equal(res.getHeader('vary'), 'Accept');
  });

  it('appends a new token to existing Vary value', () => {
    const res = createStubRes();
    res.setHeader('Vary', 'Accept');

    appendVary(res, 'Accept-Encoding');

    assert.equal(res.getHeader('vary'), 'Accept, Accept-Encoding');
  });

  it('does not duplicate an already-present token (case-insensitive)', () => {
    const res = createStubRes();
    res.setHeader('Vary', 'Accept');

    appendVary(res, 'accept');

    assert.equal(res.getHeader('vary'), 'Accept');
  });

  it('handles wildcard * as a regular token', () => {
    const res = createStubRes();

    appendVary(res, '*');

    assert.equal(res.getHeader('vary'), '*');
  });

  it('does not duplicate wildcard *', () => {
    const res = createStubRes();
    res.setHeader('Vary', '*');

    appendVary(res, '*');

    assert.equal(res.getHeader('vary'), '*');
  });

  it('handles comma-separated input value (multi-token append)', () => {
    const res = createStubRes();
    res.setHeader('Vary', 'Accept');

    appendVary(res, 'Accept-Encoding, Accept-Language');

    assert.equal(res.getHeader('vary'), 'Accept, Accept-Encoding, Accept-Language');
  });

  it('does not modify header when all tokens already present', () => {
    const res = createStubRes();
    res.setHeader('Vary', 'Accept, Accept-Encoding');

    appendVary(res, 'Accept-Encoding');

    assert.equal(res.getHeader('vary'), 'Accept, Accept-Encoding');
  });
});
