/**
 * @fileoverview HTTP middleware factory for CSRF protection.
 *
 * Provides two methods on the returned object:
 * - `issue(req, res, ...acc)` — generates a new CSRF token/UUID pair and sets them as cookies
 * - `verify(req, res, ...acc)` — validates the `X-CSRF-TOKEN` header against the cookie value
 *
 * Tokens are HMAC-signed with a shared `secret` using `lib/csrf`. Verification uses
 * `crypto.timingSafeEqual()` to prevent timing attacks.
 *
 * The CSRF UUID is stored in a separate cookie so the token can be regenerated independently.
 *
 * @module http/csrf
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../lib/csrf.js
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, cookie, csrf} from 'ergo';
 *
 * const csrfMiddleware = csrf({secret: process.env.CSRF_SECRET});
 *
 * // Issue a token on GET (e.g. page load)
 * const issuePipeline = compose(
 *   [cookie(), 'cookies'],
 *   [csrfMiddleware.issue, 'csrf'],
 * );
 *
 * // Verify on state-mutating requests
 * const verifyPipeline = compose(
 *   [cookie(), 'cookies'],
 *   [csrfMiddleware.verify, 'csrf'],
 * );
 *
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html OWASP CSRF Prevention Cheat Sheet}
 */
import {issue, verify} from '../lib/csrf.js';

/**
 * Creates a CSRF token issuance and verification middleware.
 *
 * @param {object} [options] - CSRF configuration
 * @param {string} [options.cookieTokenName='CSRF-TOKEN'] - Cookie name for the CSRF token
 * @param {string} [options.headerTokenName='X-CSRF-TOKEN'] - Request header name for the CSRF token
 * @param {string} [options.cookieUuidName='CSRF-UUID'] - Cookie name for the CSRF UUID
 * @param {string} options.secret - HMAC secret for token signing
 * @param {string} [options.encoding] - Token encoding (default: base64)
 * @param {object} [options.cookieOptions={}] - Cookie directives passed to the cookie factory
 * @returns {object} - Object with `issue(req, res, ...rest)` and `verify(req, res, ...rest)` methods;
 *   `verify` returns `{response: {statusCode: 403}}` when CSRF token verification fails
 */
export default ({
  cookieTokenName = 'CSRF-TOKEN',
  headerTokenName = 'X-CSRF-TOKEN',
  cookieUuidName = 'CSRF-UUID',
  secret,
  encoding,
  cookieOptions = {}
} = {}) => ({
  issue(req, res, acc) {
    const {cookies} = acc;

    const {token, uuid} = issue(secret, undefined, encoding);

    cookies.set(cookieTokenName, token, {...cookieOptions, httpOnly: false, sameSite: 'Strict'});
    cookies.set(cookieUuidName, uuid, {...cookieOptions, sameSite: 'Strict'});
  },
  verify({headers: {[headerTokenName.toLowerCase()]: headerToken} = {}} = {}, res, acc) {
    const {cookies: {[cookieUuidName]: uuid} = {}} = acc;

    if (headerToken === undefined || uuid === undefined || !verify(headerToken, {secret, uuid})) {
      return {response: {statusCode: 403, detail: 'CSRF verification failed'}};
    }
  }
});
