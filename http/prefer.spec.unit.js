import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createPrefer from './prefer.js';

const np = props => Object.assign(Object.create(null), props);

describe('[Module] http/prefer', () => {
  it('returns parsed preferences from Prefer header', () => {
    const prefer = createPrefer();
    const result = prefer({headers: {prefer: 'return=minimal'}});
    assert.deepEqual(result, np({return: 'minimal'}));
  });

  it('returns empty object when no Prefer header', () => {
    const prefer = createPrefer();
    const result = prefer({headers: {}});
    assert.deepEqual(result, np({}));
  });

  it('returns empty object when headers is missing', () => {
    const prefer = createPrefer();
    const result = prefer({});
    assert.deepEqual(result, np({}));
  });

  it('parses multiple preferences', () => {
    const prefer = createPrefer();
    const result = prefer({headers: {prefer: 'return=representation, handling=strict'}});
    assert.equal(result.return, 'representation');
    assert.equal(result.handling, 'strict');
  });
});
