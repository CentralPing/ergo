/**
 * @fileoverview HTTP middleware factory for CORS header injection.
 *
 * Validates incoming CORS requests against configured allowed origins, methods, and headers.
 * When the `Origin` request header is present, runs the CORS policy check and either:
 * - Injects the appropriate CORS response headers (allowed), or
 * - Throws `403 Forbidden` (denied)
 *
 * When no `Origin` header is present, the middleware is a no-op (non-CORS requests pass through).
 * Pre-flight `OPTIONS` requests should be handled at the router level using `ergo-router`.
 *
 * @module http/cors
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../lib/cors.js
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, cors} from 'ergo';
 *
 * const pipeline = compose(
 *   [cors({
 *     origins: ['https://app.example.com'],
 *     allowMethods: ['GET', 'POST'],
 *     allowHeaders: ['Authorization', 'Content-Type']
 *   }), [], 'cors'],
 * );
 *
 * @see {@link https://fetch.spec.whatwg.org/#http-cors-protocol Fetch Standard - CORS Protocol}
 */
import httpErrors from '../utils/http-errors.js';
import cors from '../lib/cors.js';

/**
 * Creates a CORS validation middleware.
 *
 * @param {object} [options] - CORS policy options forwarded to `lib/cors`
 * @param {string|string[]|RegExp|function} [options.origins='*'] - Allowed origins
 * @param {string[]} [options.allowMethods] - Allowed HTTP methods
 * @param {string|string[]|RegExp|function} [options.allowHeaders='*'] - Allowed request headers
 * @param {string|string[]} [options.exposeHeaders] - Headers to expose to the client
 * @param {boolean} [options.allowCredentials=false] - Whether to allow credentials
 * @param {number} [options.maxAge] - Preflight cache duration in seconds
 * @returns {function} - Ergo middleware `(req) => Array<[string, string|string[]]>|undefined`
 *   Returns header pairs to set on the response, or undefined for non-CORS requests.
 * @throws {Error} 403 if the CORS policy denies the request
 */
export default options => {
  const corsValidator = cors(options);

  return ({
    headers: {
      origin,
      'access-control-request-method': requestMethod,
      'access-control-request-headers': requestHeadersRaw
    } = {},
    method
  } = {}) => {
    // Only if Origin is defined is it CORS
    if (origin !== undefined) {
      const requestHeaders = requestHeadersRaw
        ? requestHeadersRaw.split(',').map(h => h.trim())
        : undefined;

      const {
        allowed,
        info: {headers}
      } = corsValidator({origin, method, requestMethod, requestHeaders});

      if (allowed === false) {
        throw httpErrors(403);
      }

      return Object.entries(
        headers.reduce((o, {h, v}) => {
          o[h] = [...(o[h] ?? []), v];

          return o;
        }, {})
      );
    }
  };
};
