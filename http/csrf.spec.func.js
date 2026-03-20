import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {setupServer, fetch} from '../test/helpers.js';
import {parse, jar} from '../lib/cookie/index.js';
import createCsrf from './csrf.js';
import createCookieMw from './cookie.js';
const secret = 'contract-test-secret';
const csrf = createCsrf({secret});

/**
 * Parse Set-Cookie headers from a Response object.
 * @param {Response} res - fetch Response
 * @returns {string} - Cookie header string for subsequent requests
 */
function extractCookies(res) {
  const setCookies = res.headers.getSetCookie ? res.headers.getSetCookie() : [];
  return setCookies.map(h => h.split(';')[0]).join('; ');
}

describe('[Contract] http/csrf', () => {
  let baseUrl, close;

  before(async () => {
    ({baseUrl, close} = await setupServer((req, res) => {
      const cookies = createCookieMw()(req);

      if (req.method === 'GET') {
        // Issue CSRF tokens
        csrf.issue(req, res, cookies);
        res.setHeader('Set-Cookie', cookies.toHeader());
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ok: true}));
        return;
      }

      // Verify CSRF on POST
      try {
        csrf.verify(req, res, cookies);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({verified: true}));
      } catch (err) {
        res.statusCode = err.statusCode ?? 403;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error: err.message}));
      }
    }));
  });

  after(() => close());

  it('issue+verify round-trip succeeds', async () => {
    // GET to obtain CSRF token
    const getRes = await fetch(`${baseUrl}/`);
    assert.equal(getRes.status, 200);

    const cookieStr = extractCookies(getRes);
    const parsedCookies = jar(parse(cookieStr));
    const csrfToken = parsedCookies['CSRF-TOKEN'];
    assert.ok(csrfToken, 'should have CSRF-TOKEN cookie');

    // POST with CSRF header and cookie
    const postRes = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'x-csrf-token': csrfToken,
        cookie: cookieStr,
        'content-type': 'application/json'
      },
      body: '{}'
    });
    assert.equal(postRes.status, 200);
    const data = await postRes.json();
    assert.equal(data.verified, true);
  });

  it('rejects request with missing CSRF token header', async () => {
    const getRes = await fetch(`${baseUrl}/`);
    const cookieStr = extractCookies(getRes);

    const postRes = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        cookie: cookieStr,
        'content-type': 'application/json'
      },
      body: '{}'
    });
    assert.equal(postRes.status, 403);
  });

  it('rejects request with tampered CSRF token', async () => {
    const getRes = await fetch(`${baseUrl}/`);
    const cookieStr = extractCookies(getRes);

    const postRes = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'x-csrf-token': 'tampered-token-value',
        cookie: cookieStr,
        'content-type': 'application/json'
      },
      body: '{}'
    });
    assert.equal(postRes.status, 403);
  });
});
