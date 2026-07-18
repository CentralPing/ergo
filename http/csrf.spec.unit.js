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
  csrf.issue({headers: {}}, {}, {cookies: issueJar});

  // Serialize Set-Cookie values to a Cookie request header string
  const setCookieHeaders = issueJar.toHeader();
  const cookieStr = setCookieHeaders.map(h => h.split(';')[0]).join('; ');

  return jar(parse(cookieStr));
}

describe('[Module] http/csrf', () => {
  it('issue() sets CSRF-TOKEN and CSRF-UUID cookies on the jar', () => {
    const csrf = createCsrf({secret});
    const cookies = createCookieMw()({headers: {}});
    csrf.issue({headers: {}}, {}, {cookies});

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
    const result = csrf.verify({headers: {'x-csrf-token': token}}, {}, {cookies: requestCookies});
    assert.equal(result, undefined);
  });

  it('verify() returns 403 response when header token is missing', () => {
    const csrf = createCsrf({secret});
    const requestCookies = issueCycleJar(csrf);

    const result = csrf.verify({headers: {}}, {}, {cookies: requestCookies});
    assert.deepEqual(result, {
      response: {statusCode: 403, detail: 'CSRF verification failed'}
    });
  });

  it('verify() returns 403 response when header token is tampered', () => {
    const csrf = createCsrf({secret});
    const requestCookies = issueCycleJar(csrf);

    const result = csrf.verify(
      {headers: {'x-csrf-token': 'tampered-value'}},
      {},
      {cookies: requestCookies}
    );
    assert.deepEqual(result, {
      response: {statusCode: 403, detail: 'CSRF verification failed'}
    });
  });

  it('respects custom cookie and header names', () => {
    const csrf = createCsrf({
      secret,
      cookieTokenName: 'MY-CSRF',
      headerTokenName: 'X-MY-CSRF',
      cookieUuidName: 'MY-UUID'
    });
    const cookies = createCookieMw()({headers: {}});
    csrf.issue({headers: {}}, {}, {cookies});

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

  it('verify() returns 403 response when UUID cookie is missing', () => {
    const csrf = createCsrf({secret});
    const result = csrf.verify({headers: {'x-csrf-token': 'some-token'}}, {}, {cookies: {}});
    assert.deepEqual(result, {
      response: {statusCode: 403, detail: 'CSRF verification failed'}
    });
  });

  it('cookieOptions cannot override httpOnly on token cookie', () => {
    const csrf = createCsrf({secret, cookieOptions: {httpOnly: true}});
    const cookies = createCookieMw()({headers: {}});
    csrf.issue({headers: {}}, {}, {cookies});
    const headers = cookies.toHeader();
    const tokenHeader = headers.find(h => h.startsWith('CSRF-TOKEN='));
    assert.ok(!tokenHeader.includes('HttpOnly'), 'token cookie must be JS-readable');
  });

  it('cookieOptions cannot override httpOnly+sameSite together on CSRF cookies', () => {
    const csrf = createCsrf({
      secret,
      cookieOptions: {httpOnly: false, sameSite: 'Lax'}
    });
    const cookies = createCookieMw()({headers: {}});
    csrf.issue({headers: {}}, {}, {cookies});
    const headers = cookies.toHeader();
    const tokenHeader = headers.find(h => h.startsWith('CSRF-TOKEN='));
    const uuidHeader = headers.find(h => h.startsWith('CSRF-UUID='));
    assert.ok(uuidHeader.includes('HttpOnly'), 'UUID cookie must remain HttpOnly');
    assert.ok(tokenHeader.includes('SameSite=Strict'), 'token cookie sameSite must be Strict');
    assert.ok(uuidHeader.includes('SameSite=Strict'), 'UUID cookie sameSite must be Strict');
  });

  it('cookieOptions cannot override sameSite to None on either CSRF cookie', () => {
    const csrf = createCsrf({secret, cookieOptions: {sameSite: 'None'}});
    const cookies = createCookieMw()({headers: {}});
    csrf.issue({headers: {}}, {}, {cookies});
    const headers = cookies.toHeader();
    const tokenHeader = headers.find(h => h.startsWith('CSRF-TOKEN='));
    const uuidHeader = headers.find(h => h.startsWith('CSRF-UUID='));
    assert.ok(tokenHeader.includes('SameSite=Strict'), 'token cookie sameSite must be Strict');
    assert.ok(uuidHeader.includes('SameSite=Strict'), 'UUID cookie sameSite must be Strict');
    assert.ok(!tokenHeader.includes('SameSite=None'), 'token cookie must not emit SameSite=None');
    assert.ok(!uuidHeader.includes('SameSite=None'), 'UUID cookie must not emit SameSite=None');
  });

  it('throws TypeError when secret is missing', () => {
    assert.throws(() => createCsrf({}), {
      name: 'TypeError',
      message: 'csrf(): "secret" option is required and must be a non-empty string'
    });
  });

  it('throws TypeError when secret is an empty string', () => {
    assert.throws(() => createCsrf({secret: ''}), {
      name: 'TypeError',
      message: 'csrf(): "secret" option is required and must be a non-empty string'
    });
  });

  it('throws TypeError when secret is not a string', () => {
    assert.throws(() => createCsrf({secret: 42}), {
      name: 'TypeError',
      message: 'csrf(): "secret" option is required and must be a non-empty string'
    });
  });

  it('encoding option is forwarded to verify() for non-default encodings', () => {
    const csrf = createCsrf({secret, encoding: 'hex'});
    const requestCookies = issueCycleJar(csrf);
    const token = requestCookies['CSRF-TOKEN'];

    assert.ok(token, 'should have CSRF-TOKEN in parsed jar');
    assert.ok(/^[0-9a-f]+$/i.test(token), 'token should be hex-encoded');
    const result = csrf.verify({headers: {'x-csrf-token': token}}, {}, {cookies: requestCookies});
    assert.equal(result, undefined, 'verify should succeed with matching hex encoding');
  });
});
