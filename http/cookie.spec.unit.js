import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createCookieMiddleware from './cookie.js';

describe('[Module] http/cookie', () => {
  const cookieMw = createCookieMiddleware();

  it('returns a cookie jar for a request with cookies', () => {
    const jar = cookieMw({headers: {cookie: 'session=abc123; user=alice'}});
    assert.equal(jar.isJar, true);
    assert.equal(jar.session, 'abc123');
    assert.equal(jar.user, 'alice');
  });

  it('returns an empty jar when no cookie header', () => {
    const jar = cookieMw({headers: {}});
    assert.equal(jar.isJar, true);
  });

  it('jar supports set() and toHeader()', () => {
    const jar = cookieMw({headers: {}});
    jar.set('theme', 'dark');
    const headers = jar.toHeader();
    assert.ok(headers.length > 0);
    assert.ok(headers[0].includes('theme=dark'));
  });
});
