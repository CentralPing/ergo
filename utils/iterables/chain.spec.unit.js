import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {chain, map, filter, reduce} from './index.js';

describe('[Boundary] utils/iterables/chain', () => {
  it('passes items through with a single array source', () => {
    const result = [...chain([1, 2, 3])];
    assert.deepEqual(result, [1, 2, 3]);
  });

  it('applies a single map operator', () => {
    const result = [
      ...chain(
        [1, 2, 3],
        map(x => x * 2)
      )
    ];
    assert.deepEqual(result, [2, 4, 6]);
  });

  it('composes multiple iterable operators', () => {
    const result = [
      ...chain(
        [1, 2, 3, 4, 5],
        filter(x => x % 2 !== 0),
        map(x => x * 10)
      )
    ];
    assert.deepEqual(result, [10, 30, 50]);
  });

  it('returns a plain value when last operator is reduce', () => {
    // reduce returns a value, not an iterable
    const result = chain(
      [1, 2, 3, 4, 5],
      filter(x => x % 2 !== 0),
      map(x => x * 10),
      reduce((acc, x) => acc + x, 0)
    );
    assert.equal(result, 90);
  });

  it('works with empty source', () => {
    const result = [
      ...chain(
        [],
        map(x => x * 2)
      )
    ];
    assert.deepEqual(result, []);
  });
});
