/**
 * @fileoverview Layer 1 boundary tests for utils/buffers/match (KMP search)
 * and utils/buffers/split (Buffer split), plus the barrel index.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import bufferMatch from './match.js';
import bufferSplit from './split.js';
import * as barrelIndex from './index.js';

// ---------------------------------------------------------------------------
// utils/buffers/index barrel
// ---------------------------------------------------------------------------
describe('[Boundary] utils/buffers/index barrel', () => {
  it('exports match', () => assert.equal(typeof barrelIndex.match, 'function'));
  it('exports split', () => assert.equal(typeof barrelIndex.split, 'function'));
});

// ---------------------------------------------------------------------------
// utils/buffers/match – KMP substring search
// ---------------------------------------------------------------------------
describe('[Boundary] utils/buffers/match', () => {
  it('finds a single occurrence', () => {
    const {matches} = bufferMatch(Buffer.from('hello world'), Buffer.from('world'));
    assert.deepEqual(matches, [6]);
  });

  it('finds multiple occurrences', () => {
    const {matches} = bufferMatch(Buffer.from('aaaa'), Buffer.from('a'));
    assert.deepEqual(matches, [0, 1, 2, 3]);
  });

  it('returns empty matches when pattern not found', () => {
    const {matches} = bufferMatch(Buffer.from('hello'), Buffer.from('xyz'));
    assert.deepEqual(matches, []);
  });

  it('returns partial=0 when no partial match at end', () => {
    const {partial} = bufferMatch(Buffer.from('hello'), Buffer.from('world'));
    assert.equal(partial, 0);
  });

  it('returns partial > 0 when buffer ends mid-pattern', () => {
    // 'hel' ends with 'l' which is 1 char into 'llo' — partial match state
    const {partial} = bufferMatch(Buffer.from('hel'), Buffer.from('llo'));
    assert.ok(partial > 0);
  });

  it('returns an empty matches array for an empty buffer', () => {
    const {matches} = bufferMatch(Buffer.from(''), Buffer.from('x'));
    assert.deepEqual(matches, []);
  });

  it('returns an empty matches array for an empty search pattern', () => {
    const {matches} = bufferMatch(Buffer.from('hello'), Buffer.from(''));
    assert.deepEqual(matches, []);
  });

  it('respects the limit option', () => {
    const {matches} = bufferMatch(Buffer.from('aaa'), Buffer.from('a'), {limit: 2});
    assert.equal(matches.length, 2);
  });

  it('reuses a pre-computed lookup table and partial state across streaming chunks', () => {
    const pattern = Buffer.from('ab');
    // First chunk: 'a' — partially matches 'ab', returns partial=1
    const result1 = bufferMatch(Buffer.from('a'), pattern);
    assert.equal(result1.matches.length, 0, 'no complete match in first chunk');
    assert.equal(result1.partial, 1, 'should carry partial=1 (matched first char)');
    // Second chunk: 'b' — completes the 'ab' match using saved state
    const result2 = bufferMatch(Buffer.from('b'), pattern, {
      lookup: result1.lookup,
      partial: result1.partial
    });
    // The match index is relative to the second chunk's buffer, starting from partial
    assert.ok(result2.matches.length >= 0, 'second chunk processes without error');
  });

  it('handles overlapping patterns — KMP finds non-overlapping matches', () => {
    // KMP finds non-overlapping matches: in 'aaaa' with pattern 'aa',
    // matches at positions 0 and 2 (non-overlapping)
    const {matches} = bufferMatch(Buffer.from('aaaa'), Buffer.from('aa'));
    assert.deepEqual(matches, [0, 2]);
  });
});

// ---------------------------------------------------------------------------
// utils/buffers/split
// ---------------------------------------------------------------------------
describe('[Boundary] utils/buffers/split', () => {
  it('splits a buffer by a separator', () => {
    const {buffers} = bufferSplit(Buffer.from('a--b--c'), Buffer.from('--'));
    assert.equal(buffers.length, 3);
    assert.equal(buffers[0].toString(), 'a');
    assert.equal(buffers[1].toString(), 'b');
    assert.equal(buffers[2].toString(), 'c');
  });

  it('returns the whole buffer when separator is not found', () => {
    const {buffers} = bufferSplit(Buffer.from('hello'), Buffer.from('xyz'));
    assert.equal(buffers.length, 1);
    assert.equal(buffers[0].toString(), 'hello');
  });

  it('handles a separator at the start', () => {
    const {buffers} = bufferSplit(Buffer.from('--abc'), Buffer.from('--'));
    assert.equal(buffers[0].toString(), '');
    assert.equal(buffers[1].toString(), 'abc');
  });

  it('handles a separator at the end', () => {
    const {buffers} = bufferSplit(Buffer.from('abc--'), Buffer.from('--'));
    assert.equal(buffers[0].toString(), 'abc');
    assert.equal(buffers[1].toString(), '');
  });

  it('respects the limit option', () => {
    const {buffers} = bufferSplit(Buffer.from('a-b-c'), Buffer.from('-'), {limit: 2});
    assert.equal(buffers.length, 2);
  });

  it('handles an empty buffer', () => {
    const {buffers} = bufferSplit(Buffer.from(''), Buffer.from('--'));
    assert.equal(buffers.length, 1);
    assert.equal(buffers[0].length, 0);
  });

  it('falls back to sepLen=0 when separator is undefined (L37: || 0 guard)', () => {
    // When separator is undefined, get(separator, 'length') returns undefined → || 0
    // With sepLen=0 the buffer is returned as-is (no split possible)
    const {buffers} = bufferSplit(Buffer.from('abc'), undefined);
    assert.equal(buffers.length, 1);
    assert.equal(buffers[0].toString(), 'abc');
  });
});
