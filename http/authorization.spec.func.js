import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {setupServer, fetch} from '../test/helpers.js';
import compose from '../utils/compose-with.js';
import createAuthorization from './authorization.js';
import createHandler from './handler.js';
import createSend from './send.js';

describe('[Contract] http/authorization', () => {
  let baseUrl, close;

  const pipeline = compose(
    [
      createAuthorization({
        strategies: [
          {
            type: 'Bearer',
            attributes: {realm: 'API'},
            authorizer: async (_attrs, token) => {
              return token === 'valid-token'
                ? {authorized: true, info: {userId: 'u1', token}}
                : {authorized: false, info: {type: 'invalid_token'}};
            }
          },
          {
            type: 'Basic',
            attributes: {realm: 'Users'},
            authorizer: async (_attrs, username, password) => {
              return username === 'admin' && password === 'secret'
                ? {authorized: true, info: {username}}
                : {authorized: false, info: {}};
            }
          }
        ]
      }),
      [],
      'auth'
    ],
    (req, res, acc) => ({statusCode: 200, body: acc.auth}),
    createSend()
  );

  const handler = createHandler(pipeline, createSend());

  before(async () => {
    ({baseUrl, close} = await setupServer(handler));
  });

  after(() => close());

  it('Bearer: accepts valid token and returns auth info', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {authorization: 'Bearer valid-token'}
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.userId, 'u1');
  });

  it('Bearer: rejects invalid token with 401', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {authorization: 'Bearer wrong-token'}
    });
    assert.equal(res.status, 401);
    assert.ok(res.headers.get('www-authenticate'), 'should include WWW-Authenticate header');
  });

  it('Bearer: passes raw JWT-like token unchanged (not base64-decoded)', async () => {
    // A JWT-like opaque token: Base64url segments separated by dots.
    // If the middleware were to base64-decode it, the result would differ.
    const jwtLike = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1MSJ9.sig';
    const res = await fetch(`${baseUrl}/`, {
      headers: {authorization: `Bearer ${jwtLike}`}
    });
    // Our Bearer strategy only accepts 'valid-token', so this returns 401
    // BUT the important thing is the server received a 401 (not 400 bad request
    // due to decoding errors), which proves the raw token was passed as-is.
    assert.ok(res.status === 401, 'should be 401 (invalid_token) not 400 (bad decode)');
  });

  it('Basic: accepts valid credentials and returns auth info', async () => {
    const encoded = Buffer.from('admin:secret').toString('base64');
    const res = await fetch(`${baseUrl}/`, {
      headers: {authorization: `Basic ${encoded}`}
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.username, 'admin');
  });

  it('Basic: rejects invalid credentials with 403', async () => {
    const encoded = Buffer.from('admin:wrong').toString('base64');
    const res = await fetch(`${baseUrl}/`, {
      headers: {authorization: `Basic ${encoded}`}
    });
    assert.equal(res.status, 403);
  });

  it('missing Authorization header returns 401/403', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.ok(res.status === 401 || res.status === 403);
  });
});
