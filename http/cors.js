/**
 * @fileoverview HTTP middleware factory for CORS header injection.
 *
 * Validates incoming CORS requests against configured allowed origins, methods, and headers.
 * When the `Origin` request header is present, runs the CORS policy check and either:
 * - Injects the appropriate CORS response headers (allowed), or
 * - Returns `{response: {statusCode: 403}}` (denied)
 *
 * When no `Origin` header is present, the middleware is a no-op (non-CORS requests pass through).
 * Pre-flight `OPTIONS` requests should be handled at the router level using `ergo-router`.
 *
 * @module http/cors
 * @since 0.1.0
 * @requires ../lib/cors.js
 * @requires ../utils/http-errors.js
 *
 * @example
 * import {compose, cors} from '@centralping/ergo';
 *
 * // cors is response-only — use as a plain function (no config object needed)
 * const pipeline = compose(
 *   cors({
 *     origins: ['https://app.example.com'],
 *     allowMethods: ['GET', 'POST'],
 *     allowHeaders: ['Authorization', 'Content-Type']
 *   }),
 * );
 *
 * @see {@link https://fetch.spec.whatwg.org/#http-cors-protocol Fetch Standard - CORS Protocol}
 */
import cors from '../lib/cors.js';
import {validateOptions} from '../lib/validate-options.js';

/** @type {Set<string>} */
const VALID_OPTIONS = new Set([
  'origins',
  'allowMethods',
  'allowCredentials',
  'allowHeaders',
  'exposeHeaders',
  'maxAge'
]);

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
 */
export default options => {
  validateOptions(options, VALID_OPTIONS, 'cors');
  const corsValidator = cors(options);

  /** @param {{ headers?: { origin?: string, 'access-control-request-method'?: string, 'access-control-request-headers'?: string }, method?: string }} [req] - Incoming HTTP request */
  return function corsMiddleware({
    headers: {
      origin,
      'access-control-request-method': requestMethod,
      'access-control-request-headers': requestHeadersRaw
    } = {},
    method
  } = {}) {
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
        return {response: {statusCode: 403}};
      }

      return {
        response: {
          headers: headers.map(({h, v}) => [h, v])
        }
      };
    }
  };
};
