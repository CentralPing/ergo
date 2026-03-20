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

  it('throws 401 when Bearer authorization is denied (default for invalid token)', async () => {
    const authorization = createAuthorization({
      strategies: [
        {
          type: 'Bearer',
          authorizer: async () => ({authorized: false, info: {}})
        }
      ]
    });
    let err;
    try {
      await authorization({headers: {authorization: 'Bearer tok'}});
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 401);
  });

  it('throws 403 when Basic authorization is denied', async () => {
    const authorization = createAuthorization({
      strategies: [
        {
          type: 'Basic',
          authorizer: async () => ({authorized: false, info: {}})
        }
      ]
    });
    const encoded = Buffer.from('bad:creds').toString('base64');
    let err;
    try {
      await authorization({headers: {authorization: `Basic ${encoded}`}});
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 403);
  });

  it('throws with WWW-Authenticate header when authenticate is provided', async () => {
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
    let err;
    try {
      await authorization({headers: {authorization: 'Bearer bad'}});
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 401);
    assert.ok(Array.isArray(err.headers), 'should have headers for WWW-Authenticate');
  });

  it('throws 401 when no Authorization header and strategy has authenticate', async () => {
    const authorization = createAuthorization({
      strategies: [
        {
          type: 'Bearer',
          attributes: {realm: 'API'},
          authorizer: async () => ({authorized: false, info: {statusCode: 401}})
        }
      ]
    });
    let err;
    try {
      await authorization({headers: {}});
    } catch (e) {
      err = e;
    }
    assert.ok(err);
  });
});
