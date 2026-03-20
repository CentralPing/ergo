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
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import authorize from 'ergo/lib/authorization';
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
/**
 * Creates an authorization dispatcher for the given strategy list.
 *
 * @param {Array<{type: string, attributes?: object, authorizer: function}>} strategies - Authentication strategy definitions
 * @returns {function} - Async `(authorization) => {authorized, info}`
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
          authenticate: Object.values(dispatcher).map(s => s.authenticate)
        };
      }

      return obj;
    }

    return await strategy.authorizer(rawCredentials);
  };
};

const dispatchHelper = new Proxy(
  {
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
                  info.type === 'invalid_request'
                    ? 400
                    : info.type === 'insufficient_scope'
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
  },
  {
    get(o, p) {
      return Object.hasOwn(o, p) ? o[p] : o.$default;
    }
  }
);

/**
 * Builds a dispatcher map from the strategy array, keyed by lowercase scheme name.
 *
 * @param {Array<{type: string, attributes?: object, authorizer: function}>} strategies - Authentication strategy definitions
 * @returns {object} - Dispatcher map keyed by lowercase scheme name
 */
function createDispatcher(strategies) {
  return strategies.reduce((o, {type, attributes = {realm: 'Users'}, authorizer}) => {
    o[type.toLowerCase()] = dispatchHelper[type.toLowerCase()]({
      attributes,
      authorizer,
      authenticate: `${type} ${Object.entries(attributes)
        .map(([k, v]) => `${k}="${v}"`)
        .join(', ')}`
    });

    return o;
  }, {});
}

const errorPropMap = [
  ['type', 'error'],
  ['desc', 'error_description'],
  ['uri', 'error_uri']
];

/**
 * Escapes a string for use inside a quoted-string per RFC 7230 section 3.2.6.
 * Backslashes and double quotes are escaped; control characters are stripped.
 *
 * @param {string} str - Raw value
 * @returns {string} - Safe value for inclusion in a quoted-string
 */
function sanitizeQuotedString(str) {
  return String(str)
    .replaceAll('\\', '\\\\')
    .replaceAll('"', '\\"')
    .replaceAll(/[\r\n\0]/g, '');
}

/**
 * Formats a Bearer token error object into WWW-Authenticate parameter strings (RFC 6750).
 *
 * @param {object} error - Error info from the authorizer
 * @param {string} [error.type] - OAuth error type (e.g. 'invalid_token')
 * @param {string} [error.desc] - Human-readable error description
 * @param {string} [error.uri] - URI to more error information
 * @returns {string[]} - Array of key="value" attribute strings for the WWW-Authenticate header
 */
function formatError(error) {
  return errorPropMap
    .filter(([p]) => error[p] !== undefined)
    .map(([p, k]) => `${k}="${sanitizeQuotedString(error[p])}"`);
}
