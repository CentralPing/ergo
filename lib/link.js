/**
 * @fileoverview RFC 8288 Web Linking utilities.
 *
 * Provides functions for formatting `Link` response headers per RFC 8288.
 * `formatLinkHeader` is the low-level formatter; `paginationLinks` is a
 * convenience helper that generates `first`, `prev`, `next`, `last` link
 * objects from pagination parameters.
 *
 * These are pure utility functions (not middleware). Consumers wire the
 * formatted header value into the accumulator's `headers` array for `send()`.
 *
 * @module lib/link
 * @version 0.1.0
 * @since 0.1.0
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8288 RFC 8288 - Web Linking}
 *
 * @example
 * import {formatLinkHeader, paginationLinks} from 'ergo/lib/link';
 *
 * const links = paginationLinks({
 *   baseUrl: '/articles',
 *   searchParams: 'sort=date',
 *   page: 3,
 *   perPage: 25,
 *   total: 100
 * });
 * const header = formatLinkHeader(links);
 * // '</articles?sort=date&page=1&per_page=25>; rel="first", ...'
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
