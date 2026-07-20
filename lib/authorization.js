/**
 * @fileoverview Authorization header parsing and strategy dispatch logic.
 *
 * Parses the HTTP `Authorization` header and dispatches to the matching strategy handler.
 * Supports three built-in schemes with pluggable `authorizer` callbacks:
 * - **Basic** — decodes base64 `username:password` credentials, passes `(attributes, username, password)`
 * - **Bearer** — passes the raw token string unchanged `(attributes, token)`; no decoding (JWTs and opaque tokens are not base64 encoded at the HTTP layer)
 * - **$default** — passes raw credentials for any custom scheme `(attributes, credentials)`
 *
 * Each strategy returns `{authorized: boolean, info: object}`. Authorization failure returns
 * 401 for known schemes (with a `WWW-Authenticate` challenge) or 403 for unrecognized schemes.
 *
 * @module lib/authorization
 * @since 0.1.0
 *
 * @example
 * import authorize from '@centralping/ergo/lib/authorization';
 *
 * const authorizer = authorize([{
 *   type: 'Bearer',
 *   attributes: {realm: 'API'},
 *   authorizer: async (attrs, token) => {
 *     const user = await verifyJwt(token);
 *     return user ? {authorized: true, info: {user}} : {authorized: false, info: {}};
 *   }
 * }]);
 *
 * const result = await authorizer('Bearer eyJ...');
 * // result => {authorized: true, info: {user: {...}}}
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6750 RFC 6750 - Bearer Token Usage}
 * @see {@link https://www.rfc-editor.org/rfc/rfc7617 RFC 7617 - The 'Basic' HTTP Authentication Scheme}
 * @see {@link https://www.rfc-editor.org/rfc/rfc7235 RFC 7235 - HTTP Authentication}
 */
import sanitizeQuotedString from './sanitize-quoted-string.js';

/**
 * Creates an authorization dispatcher for the given strategy list.
 *
 * @param {Array<{type: string, attributes?: object, authorizer: function}>} strategies - Authentication strategy definitions
 */
export default (strategies = []) => {
  const dispatcher = createDispatcher(strategies);

  return async (authorization = '') => {
    const [type, rawCredentials] = authorization.split(/ (.*)$/);
    const strategy = dispatcher[type.toLowerCase()];

    if (strategy === undefined || rawCredentials === undefined) {
      const obj = {
        authorized: false,
        info: {
          statusCode: 403
        }
      };

      if (Object.keys(dispatcher).length > 0) {
        obj.info = {
          statusCode: 401,
          authenticate: Object.values(dispatcher)
            .map(s => s.authenticate)
            .join(', ')
        };
      }

      return obj;
    }

    return await strategy.authorizer(rawCredentials);
  };
};

/**
 * Fixed-key scheme handlers. Null-prototype so inherited Object properties
 * (`constructor`, etc.) cannot shadow `$default` when looking up a strategy type.
 *
 * @type {Record<string, function({authorizer: function, attributes: object, authenticate: string}): {authenticate: string, authorizer: function}>}
 */
const schemeHandlers = Object.assign(Object.create(null), {
  basic({authorizer, attributes, authenticate}) {
    return {
      authenticate,
      authorizer: async rawCredentials => {
        const decoded = Buffer.from(rawCredentials, 'base64').toString();
        const [username, password] = decoded.split(/:(.*)$/);
        const {authorized = false, info = {}} = await authorizer(attributes, username, password);

        if (authorized === false) {
          return {
            authorized,
            info: {
              statusCode: 403
            }
          };
        }

        return {authorized, info};
      }
    };
  },
  bearer({authorizer, attributes, authenticate}) {
    return {
      authenticate,
      authorizer: async rawCredentials => {
        const {authorized = false, info = {}} = await authorizer(attributes, rawCredentials);

        if (authorized === false) {
          return {
            authorized,
            info: {
              statusCode:
                info.error === 'invalid_request'
                  ? 400
                  : info.error === 'insufficient_scope'
                    ? 403
                    : 401, // default and 'invalid_token'
              authenticate: [authenticate, ...formatError(info)].join(', ')
            }
          };
        }

        return {authorized, info};
      }
    };
  },
  $default({authorizer, attributes, authenticate}) {
    return {
      authenticate,
      authorizer: async rawCredentials => {
        const {authorized = false, info = {}} = await authorizer(attributes, rawCredentials);

        if (authorized === false) {
          return {
            authorized,
            info: {
              statusCode: 403
            }
          };
        }

        return {authorized, info};
      }
    };
  }
});

/**
 * Builds a dispatcher map from the strategy array, keyed by lowercase scheme name.
 *
 * @param {Array<{type: string, attributes?: object, authorizer: function}>} strategies - Authentication strategy definitions
 * @returns {object} - Dispatcher map keyed by lowercase scheme name
 */
function createDispatcher(strategies) {
  return strategies.reduce((o, {type, attributes = {realm: 'Users'}, authorizer}) => {
    const factory = schemeHandlers[type.toLowerCase()] ?? schemeHandlers.$default;
    o[type.toLowerCase()] = factory({
      attributes,
      authorizer,
      authenticate: `${type} ${Object.entries(attributes)
        .map(([k, v]) => `${k}="${sanitizeQuotedString(v)}"`)
        .join(', ')}`
    });

    return o;
  }, Object.create(null));
}

/**
 * Formats a Bearer token error object into WWW-Authenticate parameter strings (RFC 6750).
 *
 * @param {object} error - Error info from the authorizer (RFC 6750 property names)
 * @param {string} [error.error] - OAuth error type (e.g. 'invalid_token')
 * @param {string} [error.error_description] - Human-readable error description
 * @param {string} [error.error_uri] - URI to more error information
 * @returns {string[]} - Array of key="value" attribute strings for the WWW-Authenticate header
 */
function formatError(error) {
  return ['error', 'error_description', 'error_uri']
    .filter(k => error[k] !== undefined)
    .map(k => `${k}="${sanitizeQuotedString(error[k])}"`);
}
