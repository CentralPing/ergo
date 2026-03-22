import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createAuthorization from './authorization.js';

describe('[Module] http/authorization', () => {
  it('returns info on success', async () => {
    const authorization = createAuthorization({
      strategies: [
        {
          type: 'Bearer',
          authorizer: async () => ({authorized: true, info: {userId: 'u1'}})
        }
      ]
    });
    const result = await authorization({headers: {authorization: 'Bearer tok'}});
    assert.equal(result.userId, 'u1');
  });

  it('returns 401 response when Bearer authorization is denied (default for invalid token)', async () => {
    const authorization = createAuthorization({
      strategies: [
        {
          type: 'Bearer',
          authorizer: async () => ({authorized: false, info: {}})
        }
      ]
    });
    const result = await authorization({headers: {authorization: 'Bearer tok'}});
    assert.equal(result.response.statusCode, 401);
  });

  it('returns 403 response when Basic authorization is denied', async () => {
    const authorization = createAuthorization({
      strategies: [
        {
          type: 'Basic',
          authorizer: async () => ({authorized: false, info: {}})
        }
      ]
    });
    const encoded = Buffer.from('bad:creds').toString('base64');
    const result = await authorization({headers: {authorization: `Basic ${encoded}`}});
    assert.equal(result.response.statusCode, 403);
  });

  it('returns 401 with WWW-Authenticate header when authenticate is provided', async () => {
    const authorization = createAuthorization({
      strategies: [
        {
          type: 'Bearer',
          attributes: {realm: 'API'},
          authorizer: async () => ({
            authorized: false,
            info: {statusCode: 401, type: 'invalid_token'}
          })
        }
      ]
    });
    const result = await authorization({headers: {authorization: 'Bearer bad'}});
    assert.equal(result.response.statusCode, 401);
    assert.ok(Array.isArray(result.response.headers), 'should have headers for WWW-Authenticate');
    const wwwAuth = result.response.headers.find(([name]) => name === 'WWW-Authenticate');
    assert.ok(wwwAuth, 'WWW-Authenticate header tuple present');
    assert.ok(typeof wwwAuth[1] === 'string' && wwwAuth[1].length > 0);
  });

  it('returns 401 when no Authorization header and strategy has authenticate', async () => {
    const authorization = createAuthorization({
      strategies: [
        {
          type: 'Bearer',
          attributes: {realm: 'API'},
          authorizer: async () => ({authorized: false, info: {statusCode: 401}})
        }
      ]
    });
    const result = await authorization({headers: {}});
    assert.equal(result.response.statusCode, 401);
    assert.ok(
      Array.isArray(result.response.headers),
      'should include WWW-Authenticate from dispatcher'
    );
  });
});
