/**
 * @fileoverview HTTP middleware factory for request authorization header parsing.
 *
 * Parses the `Authorization` header using one or more configured strategies (e.g. Bearer,
 * Basic, API key). Each strategy provides a `type`, optional `attributes` matcher, and an
 * `authorizer` function that receives the parsed credentials and returns `{authorized, info}`.
 *
 * On authorization failure, throws `403 Forbidden` by default. Strategies may return a custom
 * `statusCode` (e.g. `401`) and an `authenticate` challenge string for the `WWW-Authenticate`
 * response header (RFC 7235).
 *
 * @module http/authorization
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../lib/authorization.js
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, authorization} from 'ergo';
 *
 * const pipeline = compose(
 *   [authorization({
 *     strategies: [{
 *       type: 'Bearer',
 *       authorizer: async (attributes, token) => {
 *         const user = await verifyJwt(token);
 *         return user
 *           ? {authorized: true, info: {user}}
 *           : {authorized: false, info: {statusCode: 401}};
 *       }
 *     }]
 *   }), [], 'auth'],
 *   // acc.auth => {user: {...}} on success
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6750 RFC 6750 - Bearer Token Usage}
 * @see {@link https://www.rfc-editor.org/rfc/rfc7617 RFC 7617 - The 'Basic' HTTP Authentication Scheme}
 * @see {@link https://www.rfc-editor.org/rfc/rfc7235 RFC 7235 - HTTP Authentication}
 */
import authorize from '../lib/authorization.js';
import httpErrors from '../utils/http-errors.js';

/**
 * Creates an authorization middleware that parses the Authorization header
 * and dispatches to the matching strategy handler.
 *
 * @param {object} [options] - Authorization configuration
 * @param {Array<{type: string, attributes?: object, authorizer: function}>} [options.strategies=[]] - Authentication strategy definitions
 * @returns {function} - Async middleware `(req) => info` on success; throws on auth failure
 * @throws {Error} 401 Unauthorized when no valid credentials are provided
 * @throws {Error} 403 Forbidden when credentials are valid but authorization is denied
 */
export default ({strategies = []} = {}) => {
  const authorizer = authorize(strategies);

  return async ({headers: {authorization = ''} = {}} = {}) => {
    const {authorized, info} = await authorizer(authorization);

    if (authorized === false) {
      const {statusCode = 403, authenticate} = info;
      const headers = authenticate ? [['WWW-Authenticate', authenticate]] : undefined;

      throw httpErrors(statusCode, {headers});
    }

    return info;
  };
};
