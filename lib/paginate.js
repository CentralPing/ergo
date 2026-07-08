/**
 * @fileoverview Pagination parsing and response-building utilities.
 *
 * Higher-level helpers built on top of {@link module:lib/link}'s RFC 8288
 * formatting primitives. Provides query-parameter parsing with bounded
 * defaults and pipeline-compatible response builders for both offset-based
 * and cursor-based pagination.
 *
 * These are pure utility functions (not middleware). Consumers call them
 * inside an execute handler and return the result directly — the
 * `{response}` shape is compatible with the two-accumulator pipeline.
 *
 * @module lib/paginate
 * @since 0.1.0
 *
 * @requires ./link.js
 *
 * @example
 * import {compose, handler, url} from '@centralping/ergo';
 * import {parseOffsetParams, offsetResponse} from '@centralping/ergo/lib/paginate';
 *
 * const pipeline = compose(
 *   {fn: url(), setPath: 'url'},
 *   async (req, res, acc) => {
 *     const params = parseOffsetParams(acc.url.query);
 *     const items = await db.find(params.offset, params.limit);
 *     const total = await db.count();
 *     return offsetResponse(items, {
 *       baseUrl: acc.url.pathname,
 *       ...params,
 *       total,
 *     });
 *   },
 * );
 */
import {formatLinkHeader, paginationLinks, cursorPaginationLinks} from './link.js';

export {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  MAX_PER_PAGE,
  DEFAULT_CURSOR_LIMIT,
  MAX_CURSOR_LIMIT,
  parseOffsetParams,
  parseCursorParams
} from '@centralping/ergo-wire';

/**
 * Builds a pipeline-compatible response for offset-paginated results.
 *
 * Generates RFC 8288 `Link` headers (first/prev/next/last) and an
 * `X-Total-Count` header. The returned shape can be returned directly
 * from an execute handler — the pipeline's `mergeResponse` applies the
 * headers to the response accumulator.
 *
 * @param {*[]} items - The page of results to include as the response body.
 * @param {object} options - Pagination metadata.
 * @param {string} options.baseUrl - Base URL path (e.g. '/articles').
 * @param {number} options.page - Current page number (1-based).
 * @param {number} options.perPage - Items per page.
 * @param {number} options.total - Total item count across all pages.
 * @param {string} [options.searchParams=''] - Non-pagination query parameters
 *   to preserve in Link URLs (e.g. 'sort=date&filter=active').
 * @returns {{response: {body: *[], statusCode: number, headers: Array<[string, string]>}}} -
 *   Pipeline-compatible response with Link and X-Total-Count headers.
 */
export function offsetResponse(items, options) {
  const {baseUrl, page, perPage, total, searchParams = ''} = options;
  const links = paginationLinks({baseUrl, page, perPage, total, searchParams});
  const linkHeader = formatLinkHeader(links);

  return {
    response: {
      body: items,
      statusCode: 200,
      headers: [
        ['Link', linkHeader],
        ['X-Total-Count', String(total)]
      ]
    }
  };
}

/**
 * Builds a pipeline-compatible response for cursor-paginated results.
 *
 * Generates RFC 8288 `Link` headers (first, and optionally prev/next).
 * Unlike offset pagination, cursor-based responses have no `X-Total-Count`
 * or `last` link because the total count is unknown.
 *
 * @param {*[]} items - The page of results to include as the response body.
 * @param {object} options - Cursor pagination metadata.
 * @param {string} options.baseUrl - Base URL path (e.g. '/articles').
 * @param {string} [options.searchParams=''] - Non-pagination query parameters
 *   to preserve in Link URLs.
 * @param {string} [options.nextCursor] - Opaque cursor token for the next page.
 * @param {string} [options.prevCursor] - Opaque cursor token for the previous page.
 * @returns {{response: {body: *[], statusCode: number, headers: Array<[string, string]>}}} -
 *   Pipeline-compatible response with Link header.
 */
export function cursorResponse(items, options) {
  const {baseUrl, nextCursor, prevCursor, searchParams = ''} = options;
  const links = cursorPaginationLinks({baseUrl, searchParams, nextCursor, prevCursor});
  const linkHeader = formatLinkHeader(links);

  return {
    response: {
      body: items,
      statusCode: 200,
      headers: [['Link', linkHeader]]
    }
  };
}
