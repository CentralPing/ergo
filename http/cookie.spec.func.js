import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {setupServer, fetch} from '../test/helpers.js';
import createCookieMw from './cookie.js';
import createHandler from './handler.js';
import compose from '../utils/compose-with.js';

describe('[Contract] http/cookie', () => {
  let baseUrl, close;

  const pipeline = compose([createCookieMw(), 'cookies'], (req, res, acc) => {
    const cookies = acc.cookies;
    cookies.set('response-cookie', 'set-by-server', {httpOnly: true});
    res.setHeader('Set-Cookie', cookies.toHeader());
    return {
      response: {
        body: {
          session: cookies['session'] ?? null,
          user: cookies['user'] ?? null
        }
      }
    };
  });

  const handler = createHandler(pipeline);

  before(async () => {
    ({baseUrl, close} = await setupServer(handler));
  });

  after(() => close());

  it('reads cookies from Cookie request header', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {cookie: 'session=abc123; user=alice'}
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.session, 'abc123');
    assert.equal(data.user, 'alice');
  });

  it('sets Set-Cookie on response via cookies.set()', async () => {
    const res = await fetch(`${baseUrl}/`);
    const setCookie = res.headers.get('set-cookie');
    assert.ok(setCookie, 'should include Set-Cookie header');
    assert.ok(setCookie.includes('response-cookie=set-by-server'));
    assert.ok(setCookie.toLowerCase().includes('httponly'));
  });

  it('returns null for cookies not present in request', async () => {
    const res = await fetch(`${baseUrl}/`);
    const data = await res.json();
    assert.equal(data.session, null);
    assert.equal(data.user, null);
  });
});
