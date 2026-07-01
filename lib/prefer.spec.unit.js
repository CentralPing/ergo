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
    assert.ok(elapsed < 500, `Parsing took ${elapsed}ms, expected < 500ms`);
  });

  it('accepts token names starting with a digit', () => {
    assert.deepEqual(parsePrefer('123foo=bar'), np({'123foo': 'bar'}));
  });

  it('accepts token names starting with tchar symbols', () => {
    assert.deepEqual(parsePrefer('!token=val'), np({'!token': 'val'}));
    assert.deepEqual(parsePrefer('#token=val'), np({'#token': 'val'}));
  });

  it('unescapes quoted-pair backslash sequences', () => {
    const result = parsePrefer('foo="bar \\"baz\\""');
    assert.equal(result.foo, 'bar "baz"');
  });

  it('unescapes backslash-backslash in quoted values', () => {
    const result = parsePrefer('foo="back\\\\slash"');
    assert.equal(result.foo, 'back\\slash');
  });

  it('skips preferences with CTL characters in quoted values', () => {
    const result = parsePrefer('foo="bad\x00val", bar=ok');
    assert.equal(result.foo, undefined);
    assert.equal(result.bar, 'ok');
  });

  it('skips preferences with LF in quoted values', () => {
    const result = parsePrefer('foo="bad\nval", bar=ok');
    assert.equal(result.foo, undefined);
    assert.equal(result.bar, 'ok');
  });

  it('handles commas inside quoted values', () => {
    const result = parsePrefer('foo="a,b", bar=c');
    assert.equal(result.foo, 'a,b');
    assert.equal(result.bar, 'c');
  });

  it('parses empty quoted values', () => {
    assert.deepEqual(parsePrefer('foo=""'), np({foo: ''}));
  });

  it('strips parameters without splitting on semicolons inside quotes', () => {
    const result = parsePrefer('foo="a;b"; p=v, bar=c');
    assert.equal(result.foo, 'a;b');
    assert.equal(result.bar, 'c');
  });

  it('skips preferences with invalid names (=bad)', () => {
    const result = parsePrefer('=bad, valid=ok');
    assert.equal(Object.keys(result).length, 1);
    assert.equal(result.valid, 'ok');
  });

  it('skips preferences with unterminated quoted values', () => {
    const result = parsePrefer('valid=yes, foo="unterminated');
    assert.equal(result.valid, 'yes');
    assert.equal(result.foo, undefined);
  });

  it('preserves last-wins semantics for duplicate keys', () => {
    const result = parsePrefer('foo=first, foo=second');
    assert.equal(result.foo, 'second');
  });

  it('rejects unquoted values containing non-token characters', () => {
    const result = parsePrefer('foo=b a r, bar=ok');
    assert.equal(result.foo, undefined);
    assert.equal(result.bar, 'ok');
  });

  it('skips leading and consecutive commas', () => {
    const result = parsePrefer(',,,foo=bar,,baz=qux,');
    assert.equal(result.foo, 'bar');
    assert.equal(result.baz, 'qux');
    assert.equal(Object.keys(result).length, 2);
  });

  it('parses bare token followed by semicolon parameters', () => {
    const result = parsePrefer('respond-async; param=val, bar=ok');
    assert.equal(result['respond-async'], true);
    assert.equal(result.bar, 'ok');
  });

  it('skips preferences with empty unquoted value after equals', () => {
    const result = parsePrefer('foo=, bar=ok');
    assert.equal(result.foo, undefined);
    assert.equal(result.bar, 'ok');
  });

  it('skips quoted-pair accumulation after prior invalid character', () => {
    const result = parsePrefer('foo="\x00\\"", bar=ok');
    assert.equal(result.foo, undefined);
    assert.equal(result.bar, 'ok');
  });

  it('rejects quoted-pair with invalid escape target', () => {
    const result = parsePrefer('foo="\\\x01", bar=ok');
    assert.equal(result.foo, undefined);
    assert.equal(result.bar, 'ok');
  });

  it('skips to next comma past quoted strings with escapes in malformed entries', () => {
    const result = parsePrefer('name "a\\"b", foo=ok');
    assert.equal(result.foo, 'ok');
    assert.equal(Object.keys(result).length, 1);
  });

  it('handles trailing whitespace after comma', () => {
    assert.deepEqual(parsePrefer('foo=bar,   '), np({foo: 'bar'}));
  });

  it('skips preferences with trailing junk after quoted value', () => {
    const result = parsePrefer('foo="bar"baz, qux=ok');
    assert.equal(result.foo, undefined);
    assert.equal(result.qux, 'ok');
  });

  it('rejects quoted values with non-Latin-1 characters', () => {
    const result = parsePrefer('foo="\u0100", bar=ok');
    assert.equal(result.foo, undefined);
    assert.equal(result.bar, 'ok');
  });
});
