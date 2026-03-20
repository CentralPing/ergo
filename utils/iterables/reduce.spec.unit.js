import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {chain, reduce} from './index.js';

describe('[Boundary] utils/iterables/reduce', () => {
  it('reduces to a single value (returns value directly, not an iterable)', () => {
    const result = chain(
      [1, 2, 3, 4],
      reduce((acc, x) => acc + x, 0)
    );
    assert.equal(result, 10);
  });

  it('accumulates into an object', () => {
    const result = chain(
      [
        ['a', 1],
        ['b', 2]
      ],
      reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {})
    );
    assert.deepEqual(result, {a: 1, b: 2});
  });

  it('returns initialValue for empty input', () => {
    const result = chain(
      [],
      reduce((acc, x) => acc + x, 0)
    );
    assert.equal(result, 0);
  });

  it('uses first element as initial value when no initialValue provided', () => {
    const result = chain(
      [5, 3, 2],
      reduce((acc, x) => acc + x)
    );
    assert.equal(result, 10);
  });

  it('passes correct index to reducer matching Array.prototype.reduce semantics', () => {
    const indices = [];
    chain(
      ['a', 'b', 'c'],
      reduce((acc, val, i) => {
        indices.push(i);
        return acc + val;
      }, '')
    );
    assert.deepEqual(indices, [0, 1, 2]);
  });

  it('passes correct index when no initialValue (starts at 1)', () => {
    const indices = [];
    chain(
      ['a', 'b', 'c'],
      reduce((acc, val, i) => {
        indices.push(i);
        return acc + val;
      })
    );
    assert.deepEqual(indices, [1, 2]);
  });
});
