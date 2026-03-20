import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {chain, map} from './index.js';

describe('[Boundary] utils/iterables/map', () => {
  it('transforms each item with a sync transform', () => {
    const result = [
      ...chain(
        [1, 2, 3],
        map(x => x * 2)
      )
    ];
    assert.deepEqual(result, [2, 4, 6]);
  });

  it('passes index as second argument', () => {
    const indices = [];
    [
      ...chain(
        ['a', 'b', 'c'],
        map((v, i) => {
          indices.push(i);
          return v;
        })
      )
    ];
    assert.deepEqual(indices, [0, 1, 2]);
  });

  it('works with empty input', () => {
    const result = [
      ...chain(
        [],
        map(x => x)
      )
    ];
    assert.deepEqual(result, []);
  });

  it('uses async generator when transform is async', async () => {
    const result = [];
    for await (const v of chain(
      [1, 2, 3],
      map(async x => x * 10)
    )) {
      result.push(v);
    }
    assert.deepEqual(result, [10, 20, 30]);
  });

  it('async transform receives index as second argument', async () => {
    const indices = [];
    const gen = chain(
      ['a', 'b'],
      map(async (v, i) => {
        indices.push(i);
        return v;
      })
    );
    for await (const v of gen) {
      void v;
    }
    assert.deepEqual(indices, [0, 1]);
  });
});
