/**
 * @fileoverview RFC 8288 Web Linking utilities.
 *
 * Provides functions for formatting `Link` response headers per RFC 8288.
 * `formatLinkHeader` is the low-level formatter; `paginationLinks` and
 * `cursorPaginationLinks` are convenience helpers that generate link objects
 * for offset-based and cursor-based pagination respectively.
 *
 * These are pure utility functions (not middleware). Consumers wire the
 * formatted header value into the accumulator's `headers` array for `send()`.
 *
 * @module lib/link
 * @since 0.1.0
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8288 RFC 8288 - Web Linking}
 *
 * @example
 * import {formatLinkHeader, paginationLinks, cursorPaginationLinks}
 *   from '@centralping/ergo/lib/link';
 *
 * // Offset-based pagination
 * const links = paginationLinks({
 *   baseUrl: '/articles',
 *   searchParams: 'sort=date',
 *   page: 3,
 *   perPage: 25,
 *   total: 100
 * });
 * const header = formatLinkHeader(links);
 * // '</articles?sort=date&page=1&per_page=25>; rel="first", ...'
 *
 * // Cursor-based pagination
 * const cursorLinks = cursorPaginationLinks({
 *   baseUrl: '/articles',
 *   searchParams: 'sort=date',
 *   nextCursor: 'eyJpZCI6NDJ9.abc123'
 * });
 * const cursorHeader = formatLinkHeader(cursorLinks);
 * // '</articles?sort=date>; rel="first", </articles?sort=date&cursor=eyJpZCI6NDJ9.abc123>; rel="next"'
 */
import sanitizeQuotedString from './sanitize-quoted-string.js';

const TOKEN_RE = /^[!#$%&'*+\-.^_`|~\w]+$/;

/**
 * Formats an array of link objects into an RFC 8288 `Link` header value.
 *
 * @param {Array<{href: string, rel: string}>} links - Link descriptors. Each object
 *   must have `href` and `rel`; additional properties become link parameters.
 * @returns {string} - Formatted header value (e.g. `<url>; rel="next", <url>; rel="prev"`)
 * @throws {TypeError} If `href` contains `>` or a parameter key is not a valid token
 */
export function formatLinkHeader(links) {
  return links
    .map(({href, rel, ...params}) => {
      if (String(href).includes('>')) {
        throw new TypeError('Link href must not contain ">"');
      }
      let entry = `<${href}>; rel="${sanitizeQuotedString(rel)}"`;
      for (const [key, value] of Object.entries(params)) {
        if (!TOKEN_RE.test(key)) {
          throw new TypeError(`Link parameter key "${key}" is not a valid token`);
        }
        entry += `; ${key}="${sanitizeQuotedString(value)}"`;
      }
      return entry;
    })
    .join(', ');
}

/**
 * Generates pagination link objects for first, prev, next, and last pages.
 *
 * Only includes `prev` when `page > 1` and `next` when `page < lastPage`.
 * `first` and `last` are always included.
 *
 * @param {object} options - Pagination parameters
 * @param {string} options.baseUrl - Base URL path (e.g. '/articles')
 * @param {number} options.page - Current page number (1-based)
 * @param {number} options.perPage - Items per page
 * @param {number} options.total - Total item count
 * @param {string} [options.searchParams=''] - Additional query parameters to preserve
 *   (e.g. 'sort=date&filter=active'). Appended before pagination params.
 * @returns {Array<{href: string, rel: string}>} - Array of link objects
 */
export function paginationLinks({baseUrl, page, perPage, total, searchParams = ''}) {
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const sep = searchParams ? '&' : '';
  const prefix = `${baseUrl}?${searchParams}${sep}`;

  const buildHref = p => `${prefix}page=${p}&per_page=${perPage}`;

  const links = [{href: buildHref(1), rel: 'first'}];

  if (page > 1) {
    links.push({href: buildHref(page - 1), rel: 'prev'});
  }

  if (page < lastPage) {
    links.push({href: buildHref(page + 1), rel: 'next'});
  }

  links.push({href: buildHref(lastPage), rel: 'last'});

  return links;
}

/**
 * Generates cursor-based pagination link objects for first, prev, and next pages.
 *
 * Unlike offset pagination, cursor-based pagination uses opaque continuation
 * tokens instead of page numbers. There is no `last` link because the total
 * number of pages is unknown in cursor-based schemes.
 *
 * The `first` link is always present and points to the base URL without any
 * cursor parameter (requesting the first page). `prev` and `next` are
 * included only when the corresponding cursor token is provided.
 *
 * @param {object} options - Cursor pagination parameters
 * @param {string} options.baseUrl - Base URL path (e.g. '/articles')
 * @param {string} [options.searchParams=''] - Additional query parameters to preserve
 *   (e.g. 'sort=date&filter=active'). Appended before the cursor parameter.
 * @param {string} [options.nextCursor] - Opaque cursor token for the next page
 * @param {string} [options.prevCursor] - Opaque cursor token for the previous page
 * @returns {Array<{href: string, rel: string}>} - Array of link objects
 */
export function cursorPaginationLinks({baseUrl, searchParams = '', nextCursor, prevCursor}) {
  const base = searchParams ? `${baseUrl}?${searchParams}` : baseUrl;
  const sep = searchParams ? '&' : '?';

  const links = [{href: base, rel: 'first'}];

  if (prevCursor !== undefined) {
    links.push({
      href: `${base}${sep}cursor=${encodeURIComponent(prevCursor)}`,
      rel: 'prev'
    });
  }

  if (nextCursor !== undefined) {
    links.push({
      href: `${base}${sep}cursor=${encodeURIComponent(nextCursor)}`,
      rel: 'next'
    });
  }

  return links;
}
