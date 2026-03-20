/**
 * @fileoverview CSRF token issuance and verification using HMAC-SHA256.
 *
 * Issues UUID-backed CSRF tokens signed with a shared secret. Verification uses
 * `crypto.timingSafeEqual()` to prevent timing side-channel attacks.
 *
 * Token format: `HMAC-SHA256(secret, uuid)` encoded as `base64` (default) or any
 * Node.js digest encoding. The UUID is stored separately (in a cookie) so the token
 * can be reissued without changing the UUID.
 *
 * @module lib/csrf
 * @version 0.1.0
 * @since 0.1.0
 * @requires node:crypto
 * @requires ../utils/type.js
 *
 * @example
 * import {issue, verify} from 'ergo/lib/csrf';
 *
 * const {token, uuid} = issue('my-secret');
 * // token => 'base64-encoded-hmac'
 * // uuid  => 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
 *
 * verify(token, {secret: 'my-secret', uuid}); // => true
 * verify('tampered', {secret: 'my-secret', uuid}); // => false
 *
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html OWASP CSRF Prevention Cheat Sheet}
 */
import {createHmac, timingSafeEqual, randomUUID} from 'node:crypto';

import type from '../utils/type.js';

export {issue};
export {verify};

/**
 * Issues a new CSRF token/UUID pair signed with HMAC-SHA256.
 *
 * @param {string} secret - Shared HMAC secret; throws `TypeError` if missing
 * @param {string} [uuid=randomUUID()] - Pre-existing UUID to bind the token to
 * @param {string} [encoding='base64'] - Node.js digest encoding for the token
 * @returns {{token: string, uuid: string}} - The signed token and its associated UUID
 * @throws {TypeError} If `secret` is not provided
 */
function issue(
  secret = new TypeError('Missing required parameter: "secret"'),
  uuid = randomUUID(),
  encoding = 'base64'
) {
  if (type(secret) === 'TypeError') {
    throw secret;
  }

  return {
    token: createHmac('SHA256', secret).update(uuid).digest(encoding),
    uuid
  };
}

/**
 * Verifies a CSRF token against the expected value for the given secret and UUID.
 *
 * Uses `crypto.timingSafeEqual()` to prevent timing attacks. Returns `false` (not throws)
 * for any mismatch, length difference, or type error.
 *
 * @param {string} token - The token from the request header
 * @param {object} key - Key components used to re-derive the expected token
 * @param {string} key.secret - Shared HMAC secret; throws `TypeError` if missing
 * @param {string} key.uuid - UUID from the CSRF cookie; throws `TypeError` if missing
 * @param {string} [key.encoding='base64'] - Encoding used when the token was issued
 * @returns {boolean} - `true` if the token is valid, `false` otherwise
 * @throws {TypeError} If `secret` or `uuid` are not provided
 */
function verify(
  token,
  {
    secret = new TypeError('Missing required parameter: "secret"'),
    uuid = new TypeError('Missing required parameter: "uuid"'),
    encoding = 'base64'
  } = {}
) {
  if (type(secret) === 'TypeError') {
    throw secret;
  }
  if (type(uuid) === 'TypeError') {
    throw uuid;
  }

  const expected = issue(secret, uuid, encoding).token;

  if (typeof token !== 'string' || token.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}
