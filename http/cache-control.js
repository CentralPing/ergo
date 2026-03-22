/**
 * @fileoverview HTTP middleware factory for Cache-Control header defaults.
 *
 * Returns header tuples that set the `Cache-Control` response header. The directive
 * string is pre-computed at factory time for zero per-request cost. Accepts either
 * a raw directive string or structured options that are assembled into a directive.
 *
 * @module http/cache-control
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import {compose, cacheControl} from 'ergo';
 *
 * // String shorthand
 * const pipeline = compose(
 *   [cacheControl({directives: 'public, max-age=3600'}), 'cache'],
 *   // ...
 * );
 *
 * // Structured options
 * const pipeline = compose(
 *   [cacheControl({private: true, maxAge: 0, mustRevalidate: true}), 'cache'],
 *   // ...
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9111 RFC 9111 - HTTP Caching}
 */

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
 * @returns {function} - Ergo middleware `() => Array<[string, string]>`
 */
export default ({
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
} = {}) => {
  const value =
    directives ??
    buildDirectives({
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

  const headerTuples = [['Cache-Control', value]];
  const response = {response: {headers: headerTuples}};

  return () => response;
};

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

  return parts.join(', ') || 'private, no-cache';
}
