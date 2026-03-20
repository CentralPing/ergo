import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import jar from './jar.js';
import parse from './parse.js';

describe('[Boundary] lib/cookie/jar', () => {
  it('creates an empty jar', () => {
    const j = jar();
    assert.equal(j.size, 0);
  });

  it('set() adds a cookie to the jar', () => {
    const j = jar();
    j.set('theme', 'dark');
    assert.equal(j.size, 1);
    assert.ok(j.get('theme'), 'should be able to get the set cookie');
  });

  it('set() cookie toHeader() produces a Set-Cookie string', () => {
    const j = jar();
    j.set('session', 'abc123', {httpOnly: true, path: '/'});
    const headers = j.toHeader();
    assert.ok(headers.length > 0);
    assert.ok(headers[0].includes('session=abc123'));
    assert.ok(headers[0].toLowerCase().includes('httponly'));
  });

  it('get() without argument returns an iterator over all cookies', () => {
    const j = jar();
    j.set('a', '1');
    j.set('b', '2');
    const cookies = [...j.get()];
    assert.equal(cookies.length, 2);
  });

  it('clear(name) removes a specific cookie', () => {
    const j = jar();
    j.set('a', '1');
    j.set('b', '2');
    j.clear('a');
    assert.equal(j.size, 1);
    assert.ok(!j.get('a'));
  });

  it('clear() without argument removes all cookies', () => {
    const j = jar();
    j.set('a', '1');
    j.set('b', '2');
    j.clear();
    assert.equal(j.size, 0);
  });

  it('toHeader() serializes all cookies', () => {
    const j = jar();
    j.set('a', '1');
    j.set('b', '2');
    const headers = j.toHeader();
    assert.equal(headers.length, 2);
  });

  it('isJar property is true', () => {
    assert.equal(jar().isJar, true);
  });

  it('can be initialized from a parsed cookie object', () => {
    const parsed = parse('x=hello; y=world');
    const j = jar(parsed);
    // Properties from parsed are directly on the jar
    assert.equal(j.x, 'hello');
    assert.equal(j.y, 'world');
  });
});
