/**
 * @fileoverview CORS validation logic implementing the W3C CORS specification.
 *
 * Provides a factory that compiles CORS policy options into efficient validators,
 * then processes each request returning `{allowed, info}`. Used by `http/cors.js`
 * as the pure-logic backing implementation.
 *
 * Supports:
 * - Wildcard origins (`*`) with optional credentials support
 * - String, RegExp, function, and array-based origin validation
 * - Pre-flight (`OPTIONS`) and simple CORS requests
 * - Header filtering (wildcard, RegExp, function, string list)
 * - `Access-Control-Max-Age`, `Access-Control-Expose-Headers`, `Vary`
 *
 * @see {@link https://www.w3.org/TR/2014/REC-cors-20140116/}
 *
 * @module lib/cors
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../utils/type.js
 * @requires ../utils/flat-array.js
 *
 * @example
 * import cors from 'ergo/lib/cors';
 *
 * const corsValidator = cors({
 *   origins: ['https://app.example.com'],
 *   allowMethods: ['GET', 'POST'],
 *   allowCredentials: true
 * });
 *
 * const result = corsValidator({
 *   origin: 'https://app.example.com',
 *   method: 'GET'
 * });
 * // result.allowed => true
 * // result.info.headers => [{h: 'Access-Control-Allow-Origin', v: '...'}, ...]
 *
 * @see {@link https://fetch.spec.whatwg.org/#http-cors-protocol Fetch Standard - CORS Protocol}
 */
import type from '../utils/type.js';
import flatArray from '../utils/flat-array.js';

/*
https://www.w3.org/TR/2014/REC-cors-20140116/
*/

const defaultMethods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'];

/**
 * Creates a CORS policy validator from the given options.
 *
 * @param {object} [options] - CORS policy configuration
 * @param {string|RegExp|function|Array} [options.origins='*'] - Allowed origins
 * @param {string[]} [options.allowMethods] - Allowed HTTP methods
 * @param {boolean} [options.allowCredentials=false] - Whether credentials are allowed
 * @param {string|RegExp|function|Array} [options.allowHeaders='*'] - Allowed request headers
 * @param {string|string[]} [options.exposeHeaders] - Headers to expose to the client
 * @param {number} [options.maxAge] - Pre-flight cache duration in seconds
 * @returns {function} - `({origin, method, requestMethod, requestHeaders}) => {allowed, info}`
 */
export default ({
  origins = '*', // '*', 'foo.com', /foo/, ['foo', /bar/]
  allowMethods = defaultMethods,
  allowCredentials = false,
  allowHeaders = '*',
  exposeHeaders,
  maxAge
} = {}) => {
  const methods = flatArray(allowMethods);
  const headerValidator = configHeaderValidator(allowHeaders);
  const originValidator = configOriginValidator(origins, allowCredentials);
  const baseHeaders = flatArray(
    allowCredentials ? {h: 'Access-Control-Allow-Credentials', v: true} : [],
    exposeHeaders !== undefined
      ? {h: 'Access-Control-Expose-Headers', v: flatArray(exposeHeaders)}
      : [],
    type(origins) !== 'String' || origins === '*' ? {h: 'Vary', v: 'Origin'} : []
  );
  const preflightHeaders = flatArray(
    {h: 'Access-Control-Allow-Methods', v: methods},
    {h: 'Vary', v: 'Access-Control-Request-Methods'},
    maxAge !== undefined ? {h: 'Access-Control-Max-Age', v: maxAge} : [],
    type(allowHeaders) !== 'String' || allowHeaders === '*'
      ? {h: 'Vary', v: 'Access-Control-Request-Headers'}
      : []
  );

  return ({origin, method, requestMethod, requestHeaders} = {}) => {
    const allowedOrigin = originValidator(origin);
    const isPreflight = method === 'OPTIONS' && requestMethod !== undefined;

    if (allowedOrigin === false) {
      return {
        allowed: false,
        info: {
          type: 'invalid_origin',
          origin
        }
      };
    }

    if (!methods.includes(isPreflight ? requestMethod : method)) {
      return {
        allowed: false,
        info: {
          type: 'invalid_method',
          origin,
          method: isPreflight ? requestMethod : method
        }
      };
    }

    return {
      allowed: true,
      info: {
        origin,
        headers: flatArray(
          {h: 'Access-Control-Allow-Origin', v: allowedOrigin},
          baseHeaders,
          isPreflight
            ? flatArray(preflightHeaders, getAllowHeaders(method, headerValidator, requestHeaders))
            : []
        )
      }
    };
  };
};

/**
 * Builds an origin validator function from a policy value.
 *
 * @param {string|RegExp|function|Array<string|RegExp>} valid - Origin policy
 * @param {boolean} [allowCreds] - If true, wildcard reflects the request origin
 * @returns {function} - `(origin: string) => string|false` — returns the allowed origin or false
 */
function configOriginValidator(valid, allowCreds) {
  if (valid === '*') {
    return allowCreds ? origin => origin : () => valid;
  } else if (type(valid) === 'Function') {
    return origin => valid(origin) && origin;
  } else {
    const validators = flatArray(valid).map(v =>
      type(v) === 'RegExp' ? origin => v.test(origin) : origin => v === origin
    );

    return origin => validators.some(v => v(origin)) && origin;
  }
}

/**
 * Builds a request header validator function from an allowed-headers policy.
 *
 * @param {string|RegExp|function|Array<string|RegExp>} allowed - Header policy
 * @returns {function} - `(headers: string[]) => string[]` — returns filtered allowed headers
 */
function configHeaderValidator(allowed) {
  if (allowed === '*') {
    // Current living standard has proposed allowing wildcards for non credential requests.
    // For now, echo back the request headers.
    return headers => headers;
  } else if (type(allowed) === 'Function') {
    return headers => allowed(headers);
  } else {
    const validators = flatArray(allowed).map(v =>
      type(v) === 'RegExp' ? header => v.test(header) : header => v === header
    );

    return (headers = []) => headers.filter(h => validators.some(v => v(h)));
  }
}

/**
 * Returns the `Access-Control-Allow-Headers` header entry for pre-flight requests.
 *
 * @param {string} method - HTTP method (must be 'OPTIONS' for pre-flight)
 * @param {function} validator - Header validator returned by `configHeaderValidator`
 * @param {string[]|undefined} headers - Requested headers from `Access-Control-Request-Headers`
 * @returns {{h: string, v: string[]}|Array} - Header entry or empty array if N/A
 */
function getAllowHeaders(method, validator, headers) {
  if (method === 'OPTIONS' && headers !== undefined) {
    const allowedHeaders = validator(headers);

    if (allowedHeaders !== undefined && allowedHeaders.length) {
      return {h: 'Access-Control-Allow-Headers', v: allowedHeaders};
    }
  }

  return [];
}
