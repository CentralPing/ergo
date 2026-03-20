import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {chain, filter} from './index.js';

describe('[Boundary] utils/iterables/filter', () => {
  it('keeps items that pass the predicate', () => {
    const result = [
      ...chain(
        [1, 2, 3, 4, 5],
        filter(x => x % 2 === 0)
      )
    ];
    assert.deepEqual(result, [2, 4]);
  });

  it('returns empty for no matches', () => {
    const result = [
      ...chain(
        [1, 3, 5],
        filter(x => x % 2 === 0)
      )
    ];
    assert.deepEqual(result, []);
  });

  it('works with empty input', () => {
    const result = [
      ...chain(
        [],
        filter(() => true)
      )
    ];
    assert.deepEqual(result, []);
  });
});
