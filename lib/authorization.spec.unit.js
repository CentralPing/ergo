import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createAuthorizer from './authorization.js';

describe('[Boundary] lib/authorization', () => {
  describe('no strategies', () => {
    it('returns authorized:false with 403 for any input', async () => {
      const authorizer = createAuthorizer([]);
      const result = await authorizer('Bearer sometoken');
      assert.equal(result.authorized, false);
      assert.equal(result.info.statusCode, 403);
    });

    it('returns authorized:false with 403 when header is empty', async () => {
      const authorizer = createAuthorizer([]);
      const result = await authorizer('');
      assert.equal(result.authorized, false);
    });
  });

  describe('unknown scheme', () => {
    it('returns 403 when scheme not registered', async () => {
      const authorizer = createAuthorizer([
        {type: 'Bearer', authorizer: async () => ({authorized: true, info: {}})}
      ]);
      const result = await authorizer('ApiKey abc123');
      assert.equal(result.authorized, false);
      assert.equal(result.info.statusCode, 401);
    });
  });

  describe('Basic scheme', () => {
    it('decodes base64 credentials and splits on first colon', async () => {
      let received;
      const authorizer = createAuthorizer([
        {
          type: 'Basic',
          authorizer: async (_attrs, username, password) => {
            received = {username, password};
            return {authorized: true, info: {}};
          }
        }
      ]);

      // "alice:s3cr3t" base64-encoded
      const encoded = Buffer.from('alice:s3cr3t').toString('base64');
      const result = await authorizer(`Basic ${encoded}`);

      assert.equal(result.authorized, true);
      assert.deepEqual(received, {username: 'alice', password: 's3cr3t'});
    });

    it('handles passwords containing colons', async () => {
      let received;
      const authorizer = createAuthorizer([
        {
          type: 'Basic',
          authorizer: async (_attrs, username, password) => {
            received = {username, password};
            return {authorized: true, info: {}};
          }
        }
      ]);

      const encoded = Buffer.from('user:pass:with:colons').toString('base64');
      await authorizer(`Basic ${encoded}`);
      assert.equal(received.username, 'user');
      assert.equal(received.password, 'pass:with:colons');
    });

    it('returns 403 when authorizer rejects', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Basic',
          authorizer: async () => ({authorized: false, info: {}})
        }
      ]);

      const encoded = Buffer.from('bad:creds').toString('base64');
      const result = await authorizer(`Basic ${encoded}`);
      assert.equal(result.authorized, false);
      assert.equal(result.info.statusCode, 403);
    });
  });

  describe('Bearer scheme', () => {
    it('passes the raw token string unchanged (does NOT base64-decode)', async () => {
      let receivedToken;
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          authorizer: async (_attrs, token) => {
            receivedToken = token;
            return {authorized: true, info: {}};
          }
        }
      ]);

      // A JWT-like opaque string — should arrive unchanged
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1MSJ9.sig';
      await authorizer(`Bearer ${token}`);
      assert.equal(receivedToken, token);
    });

    it('returns 401 with WWW-Authenticate when rejected with invalid_token', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          attributes: {realm: 'API'},
          authorizer: async () => ({authorized: false, info: {type: 'invalid_token'}})
        }
      ]);

      const result = await authorizer('Bearer bad');
      assert.equal(result.authorized, false);
      assert.equal(result.info.statusCode, 401);
      assert.ok(result.info.authenticate, 'should include authenticate challenge');
    });

    it('returns 400 for invalid_request error type', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          authorizer: async () => ({authorized: false, info: {type: 'invalid_request'}})
        }
      ]);

      const result = await authorizer('Bearer x');
      assert.equal(result.info.statusCode, 400);
    });

    it('returns 403 for insufficient_scope error type', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          authorizer: async () => ({authorized: false, info: {type: 'insufficient_scope'}})
        }
      ]);

      const result = await authorizer('Bearer x');
      assert.equal(result.info.statusCode, 403);
    });

    it('passes attributes to the authorizer', async () => {
      let receivedAttrs;
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          attributes: {realm: 'TestRealm', audience: 'api'},
          authorizer: async attrs => {
            receivedAttrs = attrs;
            return {authorized: true, info: {}};
          }
        }
      ]);

      await authorizer('Bearer tok');
      assert.deepEqual(receivedAttrs, {realm: 'TestRealm', audience: 'api'});
    });

    it('includes error_description and error_uri in WWW-Authenticate when provided', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          attributes: {realm: 'API'},
          authorizer: async () => ({
            authorized: false,
            info: {
              type: 'invalid_token',
              desc: 'The token has expired',
              uri: 'https://example.com/errors/expired'
            }
          })
        }
      ]);

      const result = await authorizer('Bearer expired');
      assert.equal(result.authorized, false);
      assert.ok(
        result.info.authenticate.includes('error_description'),
        'should include error_description'
      );
      assert.ok(result.info.authenticate.includes('error_uri'), 'should include error_uri');
    });
  });

  describe('custom ($default) scheme', () => {
    it('passes raw credentials for unregistered custom schemes', async () => {
      let received;
      const authorizer = createAuthorizer([
        {
          type: 'ApiKey',
          authorizer: async (_attrs, creds) => {
            received = creds;
            return {authorized: true, info: {}};
          }
        }
      ]);

      await authorizer('ApiKey myrawkey123');
      assert.equal(received, 'myrawkey123');
    });

    it('returns authorized:false with 403 when custom scheme rejects', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'ApiKey',
          authorizer: async () => ({authorized: false, info: {}})
        }
      ]);

      const result = await authorizer('ApiKey badkey');
      assert.equal(result.authorized, false);
      assert.equal(result.info.statusCode, 403);
    });
  });

  describe('WWW-Authenticate challenge format', () => {
    it('builds correct WWW-Authenticate for multiple strategies', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Basic',
          attributes: {realm: 'Users'},
          authorizer: async () => ({authorized: false, info: {}})
        },
        {
          type: 'Bearer',
          attributes: {realm: 'API'},
          authorizer: async () => ({authorized: false, info: {}})
        }
      ]);

      const result = await authorizer('Unknown scheme');
      assert.equal(result.authorized, false);
      assert.equal(result.info.statusCode, 401);
      assert.ok(Array.isArray(result.info.authenticate));
      assert.equal(result.info.authenticate.length, 2);
    });
  });

  describe('createDispatcher authenticate attribute sanitization', () => {
    it('escapes double quotes in realm attribute', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          attributes: {realm: 'My "Realm"'},
          authorizer: async () => ({authorized: false, info: {type: 'invalid_token'}})
        }
      ]);
      const result = await authorizer('Unknown scheme');
      const challenge = result.info.authenticate[0];
      assert.ok(challenge.includes('realm="My \\"Realm\\""'), `got: ${challenge}`);
      assert.ok(!challenge.includes('realm="My "Realm""'));
    });

    it('strips CRLF from realm attribute', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          attributes: {realm: 'bad\r\nInjected: header'},
          authorizer: async () => ({authorized: false, info: {}})
        }
      ]);
      const result = await authorizer('Unknown scheme');
      const challenge = result.info.authenticate[0];
      assert.ok(!challenge.includes('\r'));
      assert.ok(!challenge.includes('\n'));
    });

    it('escapes backslashes in realm attribute', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          attributes: {realm: 'path\\to\\resource'},
          authorizer: async () => ({authorized: false, info: {}})
        }
      ]);
      const result = await authorizer('Unknown scheme');
      const challenge = result.info.authenticate[0];
      assert.ok(challenge.includes('realm="path\\\\to\\\\resource"'), `got: ${challenge}`);
    });
  });

  describe('WWW-Authenticate header sanitization', () => {
    it('escapes double quotes in error description', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          attributes: {realm: 'API'},
          authorizer: async () => ({
            authorized: false,
            info: {type: 'invalid_token', desc: 'token "expired"'}
          })
        }
      ]);
      const result = await authorizer('Bearer bad-token');
      assert.ok(result.info.authenticate.includes('error_description="token \\"expired\\""'));
    });

    it('strips CRLF from error values', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          attributes: {realm: 'API'},
          authorizer: async () => ({
            authorized: false,
            info: {type: 'invalid_token', desc: 'bad\r\nInjected: header'}
          })
        }
      ]);
      const result = await authorizer('Bearer bad-token');
      assert.ok(!result.info.authenticate.includes('\r'));
      assert.ok(!result.info.authenticate.includes('\n'));
      assert.ok(result.info.authenticate.includes('error_description="badInjected: header"'));
    });

    it('escapes backslashes in error values', async () => {
      const authorizer = createAuthorizer([
        {
          type: 'Bearer',
          attributes: {realm: 'API'},
          authorizer: async () => ({
            authorized: false,
            info: {type: 'invalid_token', desc: 'path\\to\\resource'}
          })
        }
      ]);
      const result = await authorizer('Bearer bad-token');
      assert.ok(result.info.authenticate.includes('error_description="path\\\\to\\\\resource"'));
    });
  });
});
