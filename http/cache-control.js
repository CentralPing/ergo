/**
 * @fileoverview HTTP middleware factory for Cache-Control header defaults.
 *
 * Returns header tuples that set the `Cache-Control` response header. The directive
 * string is pre-computed at factory time for zero per-request cost. Accepts either
 * a raw directive string or structured options that are assembled into a directive.
 * Structured options are validated at factory time (delta-seconds type/range and
 * mutually exclusive combinations). Defaults to {@link DEFAULT_DIRECTIVES}.
 *
 * @module http/cache-control
 * @since 0.1.0
 *
 * @example
 * import {compose, cacheControl} from '@centralping/ergo';
 *
 * // String shorthand (response-only — use as plain function)
 * const pipeline = compose(
 *   cacheControl({directives: 'public, max-age=3600'}),
 *   // ...
 * );
 *
 * // Structured options
 * const pipeline = compose(
 *   cacheControl({private: true, maxAge: 0, mustRevalidate: true}),
 *   // ...
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9111 RFC 9111 - HTTP Caching}
 */

import {validateOptions} from '../lib/validate-options.js';

/**
 * Security-safe default Cache-Control directive string.
 *
 * @type {string}
 */
export const DEFAULT_DIRECTIVES = 'private, no-cache';

/** @type {Set<string>} */
const VALID_OPTIONS = new Set([
  'directives',
  'public',
  'private',
  'noCache',
  'noStore',
  'noTransform',
  'mustRevalidate',
  'proxyRevalidate',
  'immutable',
  'maxAge',
  'sMaxAge',
  'staleWhileRevalidate',
  'staleIfError'
]);

/**
 * Creates a Cache-Control middleware that returns a pre-computed header tuple.
 *
 * @param {object} [options] - Cache-Control configuration
 * @param {string} [options.directives] - Raw directive string (takes precedence over structured options)
 * @param {boolean} [options.public=false] - Add `public` directive
 * @param {boolean} [options.private=false] - Add `private` directive
 * @param {boolean} [options.noCache=false] - Add `no-cache` directive
 * @param {boolean} [options.noStore=false] - Add `no-store` directive
 * @param {boolean} [options.noTransform=false] - Add `no-transform` directive
 * @param {boolean} [options.mustRevalidate=false] - Add `must-revalidate` directive
 * @param {boolean} [options.proxyRevalidate=false] - Add `proxy-revalidate` directive
 * @param {boolean} [options.immutable=false] - Add `immutable` directive
 * @param {number} [options.maxAge] - `max-age` value in seconds
 * @param {number} [options.sMaxAge] - `s-maxage` value in seconds
 * @param {number} [options.staleWhileRevalidate] - `stale-while-revalidate` value in seconds
 * @param {number} [options.staleIfError] - `stale-if-error` value in seconds
 * @returns {function(): {response: {headers: [string, string][]}}} - Middleware that returns Cache-Control headers
 * @throws {TypeError} When a structured delta-seconds option is not a non-negative integer, or when
 *   `public`+`private` or `noStore`+freshness directives are combined
 */
export default (options = {}) => {
  validateOptions(options, VALID_OPTIONS, 'cacheControl');
  const {
    directives,
    public: isPublic = false,
    private: isPrivate = false,
    noCache = false,
    noStore = false,
    noTransform = false,
    mustRevalidate = false,
    proxyRevalidate = false,
    immutable = false,
    maxAge,
    sMaxAge,
    staleWhileRevalidate,
    staleIfError
  } = options;

  let value;
  if (directives == null) {
    validateDeltaSeconds('maxAge', maxAge);
    validateDeltaSeconds('sMaxAge', sMaxAge);
    validateDeltaSeconds('staleWhileRevalidate', staleWhileRevalidate);
    validateDeltaSeconds('staleIfError', staleIfError);

    if (isPublic && isPrivate) {
      throw new TypeError('cacheControl(): "public" and "private" are mutually exclusive');
    }
    if (
      noStore &&
      (maxAge !== undefined ||
        sMaxAge !== undefined ||
        staleWhileRevalidate !== undefined ||
        staleIfError !== undefined)
    ) {
      throw new TypeError('cacheControl(): "noStore" cannot be combined with freshness directives');
    }

    value = buildDirectives({
      isPublic,
      isPrivate,
      noCache,
      noStore,
      noTransform,
      mustRevalidate,
      proxyRevalidate,
      immutable,
      maxAge,
      sMaxAge,
      staleWhileRevalidate,
      staleIfError
    });
  } else {
    value = directives;
  }

  const headerTuples = [['Cache-Control', value]];
  const response = {response: {headers: headerTuples}};

  return function cacheControlMiddleware() {
    return response;
  };
};

/**
 * Validates a Cache-Control delta-seconds option (RFC 9111 §1.2.2).
 *
 * @param {string} name - Option name for the error message
 * @param {unknown} value - Option value (skipped when `undefined`)
 * @throws {TypeError} When `value` is provided and is not a non-negative integer
 */
function validateDeltaSeconds(name, value) {
  if (value !== undefined && !(Number.isInteger(value) && value >= 0)) {
    throw new TypeError(`cacheControl(): "${name}" option must be a non-negative integer`);
  }
}

/**
 * Assembles a Cache-Control directive string from structured options.
 *
 * @param {object} opts - Structured directive options
 * @returns {string} - Assembled directive string (e.g. "private, no-cache, max-age=0")
 */
function buildDirectives({
  isPublic,
  isPrivate,
  noCache,
  noStore,
  noTransform,
  mustRevalidate,
  proxyRevalidate,
  immutable,
  maxAge,
  sMaxAge,
  staleWhileRevalidate,
  staleIfError
}) {
  const parts = [];

  if (isPublic) parts.push('public');
  if (isPrivate) parts.push('private');
  if (noCache) parts.push('no-cache');
  if (noStore) parts.push('no-store');
  if (noTransform) parts.push('no-transform');
  if (mustRevalidate) parts.push('must-revalidate');
  if (proxyRevalidate) parts.push('proxy-revalidate');
  if (immutable) parts.push('immutable');
  if (maxAge != null) parts.push(`max-age=${maxAge}`);
  if (sMaxAge != null) parts.push(`s-maxage=${sMaxAge}`);
  if (staleWhileRevalidate != null) parts.push(`stale-while-revalidate=${staleWhileRevalidate}`);
  if (staleIfError != null) parts.push(`stale-if-error=${staleIfError}`);

  return parts.join(', ') || DEFAULT_DIRECTIVES;
}
