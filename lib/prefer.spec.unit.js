import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import parsePrefer from './prefer.js';

const np = obj => Object.assign(Object.create(null), obj);

describe('[Boundary] lib/prefer', () => {
  it('returns empty object for undefined input', () => {
    assert.deepEqual(parsePrefer(undefined), np({}));
  });

  it('returns empty object for empty string', () => {
    assert.deepEqual(parsePrefer(''), np({}));
  });

  it('parses return=minimal', () => {
    assert.deepEqual(parsePrefer('return=minimal'), np({return: 'minimal'}));
  });

  it('parses return=representation', () => {
    assert.deepEqual(parsePrefer('return=representation'), np({return: 'representation'}));
  });

  it('parses bare token as true', () => {
    assert.deepEqual(parsePrefer('respond-async'), np({'respond-async': true}));
  });

  it('parses multiple comma-separated preferences', () => {
    const result = parsePrefer('respond-async, wait=100');
    assert.equal(result['respond-async'], true);
    assert.equal(result.wait, '100');
  });

  it('parses quoted values', () => {
    const result = parsePrefer('foo="bar baz"');
    assert.equal(result.foo, 'bar baz');
  });

  it('handles whitespace around = sign', () => {
    assert.deepEqual(parsePrefer('return = minimal'), np({return: 'minimal'}));
  });

  it('handles whitespace around commas', () => {
    const result = parsePrefer('return=minimal , handling=strict');
    assert.equal(result.return, 'minimal');
    assert.equal(result.handling, 'strict');
  });

  it('strips parameters after semicolons', () => {
    const result = parsePrefer('return=minimal; foo=bar');
    assert.equal(result.return, 'minimal');
    assert.equal(result.foo, undefined);
  });

  it('ignores malformed entries', () => {
    const result = parsePrefer('return=minimal, =bad, handling=lenient');
    assert.equal(result.return, 'minimal');
    assert.equal(result.handling, 'lenient');
    assert.equal(Object.keys(result).length, 2);
  });

  it('parses handling=strict and handling=lenient', () => {
    const strict = parsePrefer('handling=strict');
    assert.equal(strict.handling, 'strict');
    const lenient = parsePrefer('handling=lenient');
    assert.equal(lenient.handling, 'lenient');
  });

  it('returns null-prototype objects', () => {
    const empty = parsePrefer();
    assert.equal(Object.getPrototypeOf(empty), null);
    const populated = parsePrefer('return=minimal');
    assert.equal(Object.getPrototypeOf(populated), null);
  });

  it('handles crafted input without excessive backtracking', () => {
    const start = performance.now();
    parsePrefer('a=' + '"'.repeat(1000));
    const elapsed = performance.now() - start;
    assert.ok(elapsed < 50, `Parsing took ${elapsed}ms, expected < 50ms`);
  });
});
