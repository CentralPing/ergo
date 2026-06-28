/**
 * @fileoverview HTTP middleware factory for URL parsing.
 *
 * Parses the request URL into pathname, query parameters, and raw search string
 * using a fast single-pass parser (no `URL` construction overhead).
 * Multi-value parameters are returned as arrays.
 *
 * Returns `{query, pathname, search}` where:
 * - `query` is the parsed key-value object (multi-value keys become arrays)
 * - `pathname` is the URL path component (before `?`)
 * - `search` is the raw query string including the `?` prefix, or `undefined`
 *
 * @module http/url
 * @since 0.1.0
 * @requires ../lib/query.js
 *
 * @example
 * import {compose, url} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   url(),
 *   // acc.url => {query: {page: '1', filter: ['a','b']}, pathname: '/users', search: '?page=1&filter=a&filter=b'}
 * );
 */
import queryParse from '../lib/query.js';

/**
 * Creates a URL parsing middleware.
 */
export default () => {
  /** @param {{ url?: string }} [req] - Incoming HTTP request */
  const inner = function urlMiddleware({url} = {}) {
    const raw = url ?? '/';
    const qIdx = raw.indexOf('?');

    if (qIdx === -1) {
      // || is intentional: empty string → undefined (absent value convention)
      return {query: Object.create(null), pathname: raw || undefined, search: undefined};
    }

    return {
      query: queryParse(raw.slice(qIdx + 1)),
      pathname: raw.slice(0, qIdx) || undefined, // || is intentional: empty string → undefined
      search: raw.slice(qIdx)
    };
  };

  Object.defineProperty(inner, 'setPath', {value: 'url'});
  return inner;
};
