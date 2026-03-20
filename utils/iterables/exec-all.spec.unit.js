/**
 * @fileoverview Layer 1 boundary tests for utils/iterables/exec-all.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import execAll from './exec-all.js';

describe('[Boundary] utils/iterables/exec-all', () => {
  it('yields capture groups for each match', () => {
    const findWords = execAll(/([a-z]+)/i);
    const results = [...findWords('hello world')];
    assert.equal(results.length, 2);
    assert.deepEqual(results[0], ['hello']);
    assert.deepEqual(results[1], ['world']);
  });

  it('yields multiple capture groups per match', () => {
    const pairs = execAll(/(\w+)=(\w+)/);
    const results = [...pairs('a=1 b=2')];
    assert.equal(results.length, 2);
    assert.deepEqual(results[0], ['a', '1']);
    assert.deepEqual(results[1], ['b', '2']);
  });

  it('yields nothing when there are no matches', () => {
    const findDigits = execAll(/(\d+)/);
    const results = [...findDigits('no digits here')];
    assert.equal(results.length, 0);
  });

  it('adds the g flag automatically to prevent infinite loops', () => {
    // Without the g flag, exec() would loop forever on a stateless regex
    const find = execAll(/(\w+)/); // no g flag
    const results = [...find('one two three')];
    assert.equal(results.length, 3);
  });

  it('handles an already-global regex without duplicating the flag', () => {
    const find = execAll(/(\w+)/g);
    const results = [...find('foo bar')];
    assert.equal(results.length, 2);
  });

  it('returns an empty iterator for an empty string', () => {
    const find = execAll(/(\w+)/);
    const results = [...find('')];
    assert.equal(results.length, 0);
  });
});
