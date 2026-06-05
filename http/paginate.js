/**
 * @fileoverview HTTP middleware factory for pagination parameter parsing.
 *
 * Wraps the pure utility functions from {@link module:lib/paginate} into a
 * pipeline-compatible middleware. Reads parsed query parameters from the
 * domain accumulator (`domainAcc.url.query`) and returns structured
 * pagination parameters at the configured setPath (`acc.paginate`).
 *
 * Supports two strategies:
 * - **offset** (default): extracts `page` and `per_page`, computes `offset`/`limit`
 * - **cursor**: extracts `cursor` and `limit`
 *
 * Placed in Stage 1 (Negotiation) after `url` — cheap synchronous parsing.
 *
 * @module http/paginate
 * @since 0.3.0
 * @requires ../lib/paginate.js
 *
 * @example
 * import {compose, url, paginate} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   [url(), 'url'],
 *   [paginate(), 'paginate'],
 *   // acc.paginate => {strategy: 'offset', page: 1, perPage: 20, offset: 0, limit: 20}
 * );
 */
import {parseOffsetParams, parseCursorParams} from '../lib/paginate.js';

/** @type {string} */
const STRATEGY_OFFSET = 'offset';
/** @type {string} */
const STRATEGY_CURSOR = 'cursor';

/**
 * Creates a pagination parameter parsing middleware.
 *
 * @param {object} [options] - Pagination middleware configuration.
 * @param {'offset'|'cursor'} [options.strategy='offset'] - Pagination strategy.
 * @param {number} [options.defaultPage] - Default page number (offset strategy).
 * @param {number} [options.defaultPerPage] - Default items per page (offset strategy).
 * @param {number} [options.maxPerPage] - Maximum items per page (offset strategy).
 * @param {number} [options.defaultLimit] - Default item limit (cursor strategy).
 * @param {number} [options.maxLimit] - Maximum item limit (cursor strategy).
 * @returns {function} - Pipeline middleware function.
 */
export default (options = {}) => {
  const {strategy = STRATEGY_OFFSET, ...parseOpts} = options;

  return (_req, _res, domainAcc) => {
    const query = domainAcc?.url?.query;

    if (strategy === STRATEGY_CURSOR) {
      const {cursor, limit} = parseCursorParams(query, parseOpts);
      return {value: {strategy: STRATEGY_CURSOR, cursor, limit}};
    }

    const {page, perPage, offset, limit} = parseOffsetParams(query, parseOpts);
    return {value: {strategy: STRATEGY_OFFSET, page, perPage, offset, limit}};
  };
};
