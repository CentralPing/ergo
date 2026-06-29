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

/** @type {number} Default page number for offset pagination. */
export const DEFAULT_PAGE = 1;
/** @type {number} Default items per page for offset pagination. */
export const DEFAULT_PER_PAGE = 20;
/** @type {number} Maximum allowed items per page for offset pagination. */
export const MAX_PER_PAGE = 100;
/** @type {number} Default item limit for cursor pagination. */
export const DEFAULT_CURSOR_LIMIT = 20;
/** @type {number} Maximum allowed item limit for cursor pagination. */
export const MAX_CURSOR_LIMIT = 100;

/**
 * Parses offset pagination parameters from a query object.
 *
 * Extracts `page` and `per_page` from the query, validates and clamps them
 * to safe ranges, and computes the corresponding SQL-style `offset` and
 * `limit` values.
 *
 * @param {object} [query] - Parsed query object (typically from `acc.url.query`).
 *   May be `undefined` or a null-prototype object.
 * @param {object} [options] - Override defaults and bounds.
 * @param {number} [options.defaultPage=DEFAULT_PAGE] - Fallback page number
 *   when `query.page` is absent or non-numeric.
 * @param {number} [options.defaultPerPage=DEFAULT_PER_PAGE] - Fallback items
 *   per page when `query.per_page` is absent or non-numeric.
 * @param {number} [options.maxPerPage=MAX_PER_PAGE] - Upper bound for items
 *   per page. Values above this are clamped.
 * @returns {{page: number, perPage: number, offset: number, limit: number}} -
 *   Parsed and bounded pagination parameters.
 */
export function parseOffsetParams(query, options) {
  const {
    defaultPage = DEFAULT_PAGE,
    defaultPerPage = DEFAULT_PER_PAGE,
    maxPerPage = MAX_PER_PAGE
  } = options ?? {};

  const rawPage = parseInt(query?.page, 10);
  const rawPerPage = parseInt(query?.per_page, 10);

  const perPage = Math.min(
    Math.max(1, Number.isNaN(rawPerPage) ? defaultPerPage : rawPerPage),
    maxPerPage
  );
  const page = Math.max(1, Number.isNaN(rawPage) ? defaultPage : rawPage);
  const offset = (page - 1) * perPage;

  return {page, perPage, offset, limit: perPage};
}

/**
 * Parses cursor pagination parameters from a query object.
 *
 * Extracts `cursor` and `limit` from the query. The cursor is an opaque
 * string passed through as-is (or `undefined` when absent). The limit is
 * validated and clamped to safe ranges.
 *
 * @param {object} [query] - Parsed query object (typically from `acc.url.query`).
 * @param {object} [options] - Override defaults and bounds.
 * @param {number} [options.defaultLimit=DEFAULT_CURSOR_LIMIT] - Fallback limit
 *   when `query.limit` is absent or non-numeric.
 * @param {number} [options.maxLimit=MAX_CURSOR_LIMIT] - Upper bound for limit.
 *   Values above this are clamped.
 * @returns {{cursor: string|undefined, limit: number}} - Parsed cursor and
 *   bounded limit.
 */
export function parseCursorParams(query, options) {
  const {defaultLimit = DEFAULT_CURSOR_LIMIT, maxLimit = MAX_CURSOR_LIMIT} = options ?? {};

  const rawLimit = parseInt(query?.limit, 10);
  const limit = Math.min(Math.max(1, Number.isNaN(rawLimit) ? defaultLimit : rawLimit), maxLimit);
  const cursor = query?.cursor;

  return {cursor, limit};
}

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
