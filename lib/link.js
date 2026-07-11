/**
 * @fileoverview RFC 8288 Web Linking utilities (delegated to ergo-wire).
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

export {formatLinkHeader, paginationLinks, cursorPaginationLinks} from '@centralping/ergo-wire';
