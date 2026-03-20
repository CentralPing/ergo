import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import range from './range.js';

describe('[Boundary] utils/iterables/range', () => {
  it('generates a range from start to end', () => {
    assert.deepEqual([...range(0, 5)], [0, 1, 2, 3, 4]);
  });

  it('generates a range with a step', () => {
    assert.deepEqual([...range(0, 10, 2)], [0, 2, 4, 6, 8]);
  });

  it('returns empty for start >= end', () => {
    assert.deepEqual([...range(5, 5)], []);
    assert.deepEqual([...range(6, 5)], []);
  });
});
