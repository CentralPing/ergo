import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createCsrf from './csrf.js';
import createCookieMw from './cookie.js';
import {parse, jar} from '../lib/cookie/index.js';

const secret = 'test-secret-12345';

/**
 * Simulate the issue → serialize → parse round-trip:
 * 1. Issue CSRF cookies on an empty jar
 * 2. Serialize to Set-Cookie headers
 * 3. Parse as a Cookie request header
 * 4. Return the new jar for use in verify()
 */
function issueCycleJar(csrf) {
  const cookieMw = createCookieMw();
  const issueJar = cookieMw({headers: {}});
  csrf.issue({headers: {}}, {}, issueJar);

  // Serialize Set-Cookie values to a Cookie request header string
  const setCookieHeaders = issueJar.toHeader();
  const cookieStr = setCookieHeaders.map(h => h.split(';')[0]).join('; ');

  return jar(parse(cookieStr));
}

describe('[Module] http/csrf', () => {
  it('issue() sets CSRF-TOKEN and CSRF-UUID cookies on the jar', () => {
    const csrf = createCsrf({secret});
    const cookies = createCookieMw()({headers: {}});
    csrf.issue({headers: {}}, {}, cookies);

    const headers = cookies.toHeader();
    assert.ok(
      headers.some(h => h.startsWith('CSRF-TOKEN=')),
      'should set CSRF-TOKEN cookie'
    );
    assert.ok(
      headers.some(h => h.startsWith('CSRF-UUID=')),
      'should set CSRF-UUID cookie'
    );
  });

  it('verify() succeeds when header token matches issued token', () => {
    const csrf = createCsrf({secret});
    const requestCookies = issueCycleJar(csrf);
    const token = requestCookies['CSRF-TOKEN'];

    assert.ok(token, 'should have CSRF-TOKEN in parsed jar');
    assert.doesNotThrow(() => {
      csrf.verify({headers: {'x-csrf-token': token}}, {}, requestCookies);
    });
  });

  it('verify() throws 403 when header token is missing', () => {
    const csrf = createCsrf({secret});
    const requestCookies = issueCycleJar(csrf);

    let err;
    try {
      csrf.verify({headers: {}}, {}, requestCookies);
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 403);
  });

  it('verify() throws 403 when header token is tampered', () => {
    const csrf = createCsrf({secret});
    const requestCookies = issueCycleJar(csrf);

    let err;
    try {
      csrf.verify({headers: {'x-csrf-token': 'tampered-value'}}, {}, requestCookies);
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 403);
  });

  it('respects custom cookie and header names', () => {
    const csrf = createCsrf({
      secret,
      cookieTokenName: 'MY-CSRF',
      headerTokenName: 'X-MY-CSRF',
      cookieUuidName: 'MY-UUID'
    });
    const cookies = createCookieMw()({headers: {}});
    csrf.issue({headers: {}}, {}, cookies);

    const headers = cookies.toHeader();
    assert.ok(
      headers.some(h => h.startsWith('MY-CSRF=')),
      'should use custom token cookie name'
    );
    assert.ok(
      headers.some(h => h.startsWith('MY-UUID=')),
      'should use custom uuid cookie name'
    );
  });
});
