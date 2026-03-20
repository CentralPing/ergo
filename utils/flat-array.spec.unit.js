import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import flatArray from './flat-array.js';

describe('[Boundary] utils/flat-array', () => {
  it('returns scalar arguments as an array', () => {
    assert.deepEqual(flatArray('a', 'b', 'c'), ['a', 'b', 'c']);
  });

  it('flattens one level of nested arrays', () => {
    assert.deepEqual(flatArray(['a', 'b'], 'c'), ['a', 'b', 'c']);
  });

  it('handles a single array argument', () => {
    assert.deepEqual(flatArray([1, 2, 3]), [1, 2, 3]);
  });

  it('returns empty array for no arguments', () => {
    assert.deepEqual(flatArray(), []);
  });

  it('does not recursively flatten (only one level)', () => {
    assert.deepEqual(flatArray([1, [2, 3]]), [1, [2, 3]]);
  });
});
