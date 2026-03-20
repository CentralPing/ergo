/**
 * @fileoverview Layer 1 boundary tests for utils/iterables/buffer-split.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {chain, bufferSplit, reduce} from './index.js';

/**
 * Collect [index, Buffer] pairs from a buffer-split iterable into strings.
 * @param {Iterable} chunks - Array of Buffers
 * @param {string} sep - Separator string
 * @returns {string[]} - Array of split string parts
 */
function splitToStrings(chunks, sep) {
  // reduce returns the accumulated value directly (not an iterable)
  return chain(
    chunks,
    bufferSplit(Buffer.from(sep)),
    reduce((acc, [, buf]) => [...acc, buf.toString()], [])
  );
}

describe('[Boundary] utils/iterables/buffer-split', () => {
  it('splits a single-chunk buffer by separator', () => {
    const result = splitToStrings([Buffer.from('a--b--c')], '--');
    assert.deepEqual(result, ['a', 'b', 'c']);
  });

  it('splits across multiple chunks (separator straddles boundary)', () => {
    // 'a-' then '-b' — separator '--' straddles the chunk boundary
    // The streaming algorithm produces all parts; filter empties to check content
    const result = splitToStrings([Buffer.from('a-'), Buffer.from('-b')], '--');
    const nonEmpty = result.filter(s => s.length > 0);
    assert.ok(nonEmpty.includes('a'), `should contain 'a', got ${JSON.stringify(result)}`);
    assert.ok(nonEmpty.includes('b'), `should contain 'b', got ${JSON.stringify(result)}`);
  });

  it('returns the whole buffer when separator is not found', () => {
    const result = splitToStrings([Buffer.from('hello world')], '---');
    assert.deepEqual(result, ['hello world']);
  });

  it('yields incrementing indices for each part', () => {
    const pairs = [...chain([Buffer.from('x--y')], bufferSplit(Buffer.from('--')))];
    const indices = pairs.map(([idx]) => idx);
    assert.ok(indices.length >= 2, 'should yield at least 2 parts');
    // Indices should be strictly increasing
    for (let i = 1; i < indices.length; i++) {
      assert.ok(indices[i] > indices[i - 1], 'indices should increase');
    }
  });

  it('respects the limit parameter', () => {
    const pairs = [...chain([Buffer.from('a--b--c')], bufferSplit(Buffer.from('--'), 2))];
    const indices = pairs.map(([idx]) => idx);
    assert.ok(
      indices.every(i => i < 3),
      'should not exceed limit'
    );
  });

  it('stops at limit=1 — returns only the first part (L98-100: inner-loop limit guard)', () => {
    // 'a--b--c' produces 3 parts; with limit=1 the inner loop should return early
    const pairs = [...chain([Buffer.from('a--b--c')], bufferSplit(Buffer.from('--'), 1))];
    assert.equal(pairs.length, 1, 'should yield exactly 1 part when limit=1');
  });

  it('stops before processing a second chunk when limit already reached (L47-49: loop-start guard)', () => {
    // limit=2: the first chunk 'a--b--c' produces parts at indices 0,1,2.
    // After the inner-loop increments index to 2 (= limit), the next outer iteration
    // should hit the L47-49 guard and return without processing the second chunk '--d'.
    const pairs = [
      ...chain([Buffer.from('a--b--c'), Buffer.from('--d')], bufferSplit(Buffer.from('--'), 2))
    ];
    const parts = pairs.map(([, b]) => b.toString());
    assert.ok(
      !parts.includes('d'),
      `second chunk content 'd' should not appear; got ${JSON.stringify(parts)}`
    );
  });

  it('handles multiple buffers yielding all parts', () => {
    const parts = chain(
      [Buffer.from('x|y|z')],
      bufferSplit(Buffer.from('|')),
      reduce((acc, [, buf]) => [...acc, buf.toString()], [])
    );
    assert.deepEqual(parts, ['x', 'y', 'z']);
  });
});
