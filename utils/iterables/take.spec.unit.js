import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {chain, take} from './index.js';

describe('[Boundary] utils/iterables/take', () => {
  it('takes the first N items', () => {
    const result = [...chain([1, 2, 3, 4, 5], take(3))];
    assert.deepEqual(result, [1, 2, 3]);
  });

  it('takes all items if N exceeds length', () => {
    const result = [...chain([1, 2], take(10))];
    assert.deepEqual(result, [1, 2]);
  });

  it('returns empty for take(0)', () => {
    const result = [...chain([1, 2, 3], take(0))];
    assert.deepEqual(result, []);
  });
});
