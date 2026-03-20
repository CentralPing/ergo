/**
 * @fileoverview Layer 1 boundary tests for lib/cookie/cookie.js.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import bake from './cookie.js';

describe('[Boundary] lib/cookie/cookie', () => {
  it('creates a cookie with name and value', () => {
    const c = bake('session', 'abc123');
    assert.equal(c.name, 'session');
    assert.equal(c.value, 'abc123');
  });

  it('toHeader() produces basic name=value string', () => {
    const header = bake('id', '42', {secure: false, httpOnly: false, path: undefined}).toHeader();
    assert.ok(header.startsWith('id=42'));
  });

  it('includes Path when provided', () => {
    const header = bake('x', 'y', {path: '/api'}).toHeader();
    assert.ok(header.includes('; Path=/api'));
  });

  it('includes Domain when provided', () => {
    const header = bake('x', 'y', {domain: 'example.com', path: undefined}).toHeader();
    assert.ok(header.includes('; Domain=example.com'));
  });

  it('includes Max-Age when provided', () => {
    const header = bake('x', 'y', {maxAge: 3600}).toHeader();
    assert.ok(header.includes('; Max-Age=3600'));
  });

  it('includes Expires when provided as a Date', () => {
    const date = new Date('2030-01-01T00:00:00.000Z');
    const header = bake('x', 'y', {expires: date}).toHeader();
    assert.ok(header.includes('; Expires='), `header: ${header}`);
    assert.ok(header.includes('2030'));
  });

  it('includes SameSite when provided', () => {
    const header = bake('x', 'y', {sameSite: 'Lax'}).toHeader();
    assert.ok(header.includes('; SameSite=Lax'));
  });

  it('includes SameSite=Strict', () => {
    const header = bake('x', 'y', {sameSite: 'Strict'}).toHeader();
    assert.ok(header.includes('; SameSite=Strict'));
  });

  it('includes Secure flag when secure:true (default)', () => {
    const header = bake('x', 'y').toHeader();
    assert.ok(header.includes('; Secure'));
  });

  it('omits Secure flag when secure:false', () => {
    const header = bake('x', 'y', {secure: false}).toHeader();
    assert.ok(!header.includes('; Secure'), 'Secure should be absent');
  });

  it('includes HttpOnly flag when httpOnly:true (default)', () => {
    const header = bake('x', 'y').toHeader();
    assert.ok(header.includes('; HttpOnly'));
  });

  it('omits HttpOnly when httpOnly:false', () => {
    const header = bake('x', 'y', {httpOnly: false}).toHeader();
    assert.ok(!header.includes('; HttpOnly'), 'HttpOnly should be absent');
  });

  it('sets Max-Age=0 and includes Expires when value is omitted (expiry cookie)', () => {
    const header = bake('session').toHeader();
    assert.ok(header.includes('; Max-Age=0'));
    assert.ok(header.includes('; Expires='));
  });

  it('isCookie property is true', () => {
    assert.equal(bake('x', 'y').isCookie, true);
  });

  it('combines multiple directives correctly', () => {
    const header = bake('token', 'abc', {
      domain: 'api.example.com',
      path: '/v1',
      maxAge: 7200,
      sameSite: 'None',
      secure: true,
      httpOnly: true
    }).toHeader();
    assert.ok(header.includes('token=abc'));
    assert.ok(header.includes('Domain=api.example.com'));
    assert.ok(header.includes('Path=/v1'));
    assert.ok(header.includes('Max-Age=7200'));
    assert.ok(header.includes('SameSite=None'));
    assert.ok(header.includes('Secure'));
    assert.ok(header.includes('HttpOnly'));
  });

  describe('cookie grammar enforcement', () => {
    it('throws TypeError when cookie name contains CRLF', () => {
      assert.throws(() => bake('bad\r\nname', 'val').toHeader(), TypeError);
    });

    it('throws TypeError when cookie value contains CRLF', () => {
      assert.throws(() => bake('name', 'bad\r\nvalue').toHeader(), TypeError);
    });

    it('throws TypeError when domain contains CRLF', () => {
      assert.throws(() => bake('name', 'val', {domain: 'evil\r\n.com'}).toHeader(), TypeError);
    });

    it('throws TypeError when path contains CRLF', () => {
      assert.throws(() => bake('name', 'val', {path: '/bad\r\npath'}).toHeader(), TypeError);
    });

    it('throws TypeError when value contains null byte', () => {
      assert.throws(() => bake('name', 'bad\0val').toHeader(), TypeError);
    });

    it('throws TypeError when value contains semicolon (attribute injection)', () => {
      assert.throws(() => bake('name', 'x; Domain=evil.com').toHeader(), TypeError);
    });

    it('throws TypeError when value contains double-quote', () => {
      assert.throws(() => bake('name', 'a"b').toHeader(), TypeError);
    });

    it('throws TypeError when value contains comma', () => {
      assert.throws(() => bake('name', 'a,b').toHeader(), TypeError);
    });

    it('throws TypeError when value contains backslash', () => {
      assert.throws(() => bake('name', 'a\\b').toHeader(), TypeError);
    });

    it('throws TypeError when value contains space', () => {
      assert.throws(() => bake('name', 'a b').toHeader(), TypeError);
    });

    it('throws TypeError when name contains space (non-token)', () => {
      assert.throws(() => bake('bad name', 'val').toHeader(), TypeError);
    });

    it('throws TypeError when name contains semicolon', () => {
      assert.throws(() => bake('bad;name', 'val').toHeader(), TypeError);
    });

    it('throws TypeError when name contains equals', () => {
      assert.throws(() => bake('bad=name', 'val').toHeader(), TypeError);
    });
  });
});
