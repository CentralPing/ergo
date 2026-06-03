import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {
  parseOffsetParams,
  parseCursorParams,
  offsetResponse,
  cursorResponse,
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  MAX_PER_PAGE,
  DEFAULT_CURSOR_LIMIT,
  MAX_CURSOR_LIMIT
} from './paginate.js';

describe('[Boundary] lib/paginate', () => {
  describe('named constants', () => {
    it('exports DEFAULT_PAGE as 1', () => assert.equal(DEFAULT_PAGE, 1));
    it('exports DEFAULT_PER_PAGE as 20', () => assert.equal(DEFAULT_PER_PAGE, 20));
    it('exports MAX_PER_PAGE as 100', () => assert.equal(MAX_PER_PAGE, 100));
    it('exports DEFAULT_CURSOR_LIMIT as 20', () => assert.equal(DEFAULT_CURSOR_LIMIT, 20));
    it('exports MAX_CURSOR_LIMIT as 100', () => assert.equal(MAX_CURSOR_LIMIT, 100));
  });

  describe('parseOffsetParams', () => {
    it('returns defaults when query is undefined', () => {
      const result = parseOffsetParams();
      assert.deepEqual(result, {page: 1, perPage: 20, offset: 0, limit: 20});
    });

    it('returns defaults when query is empty', () => {
      const result = parseOffsetParams({});
      assert.deepEqual(result, {page: 1, perPage: 20, offset: 0, limit: 20});
    });

    it('parses explicit page and per_page', () => {
      const result = parseOffsetParams({page: '3', per_page: '25'});
      assert.deepEqual(result, {page: 3, perPage: 25, offset: 50, limit: 25});
    });

    it('computes offset as (page - 1) * perPage', () => {
      const result = parseOffsetParams({page: '5', per_page: '10'});
      assert.equal(result.offset, 40);
    });

    it('sets limit equal to perPage', () => {
      const result = parseOffsetParams({page: '1', per_page: '15'});
      assert.equal(result.limit, result.perPage);
      assert.equal(result.limit, 15);
    });

    it('clamps page to minimum 1 for zero', () => {
      const result = parseOffsetParams({page: '0'});
      assert.equal(result.page, 1);
    });

    it('clamps page to minimum 1 for negative values', () => {
      const result = parseOffsetParams({page: '-5'});
      assert.equal(result.page, 1);
    });

    it('clamps perPage to minimum 1 for zero', () => {
      const result = parseOffsetParams({per_page: '0'});
      assert.equal(result.perPage, 1);
    });

    it('clamps perPage to minimum 1 for negative values', () => {
      const result = parseOffsetParams({per_page: '-10'});
      assert.equal(result.perPage, 1);
    });

    it('clamps perPage to MAX_PER_PAGE', () => {
      const result = parseOffsetParams({per_page: '500'});
      assert.equal(result.perPage, MAX_PER_PAGE);
    });

    it('falls back to defaults for non-numeric page', () => {
      const result = parseOffsetParams({page: 'abc'});
      assert.equal(result.page, DEFAULT_PAGE);
    });

    it('falls back to defaults for non-numeric per_page', () => {
      const result = parseOffsetParams({per_page: 'xyz'});
      assert.equal(result.perPage, DEFAULT_PER_PAGE);
    });

    it('accepts custom defaultPage', () => {
      const result = parseOffsetParams({}, {defaultPage: 5});
      assert.equal(result.page, 5);
    });

    it('accepts custom defaultPerPage', () => {
      const result = parseOffsetParams({}, {defaultPerPage: 50});
      assert.equal(result.perPage, 50);
    });

    it('accepts custom maxPerPage', () => {
      const result = parseOffsetParams({per_page: '200'}, {maxPerPage: 50});
      assert.equal(result.perPage, 50);
    });

    it('handles page as number (non-string)', () => {
      const result = parseOffsetParams({page: 2, per_page: 10});
      assert.equal(result.page, 2);
      assert.equal(result.offset, 10);
    });
  });

  describe('parseCursorParams', () => {
    it('returns defaults when query is undefined', () => {
      const result = parseCursorParams();
      assert.deepEqual(result, {cursor: undefined, limit: 20});
    });

    it('returns defaults when query is empty', () => {
      const result = parseCursorParams({});
      assert.deepEqual(result, {cursor: undefined, limit: 20});
    });

    it('extracts cursor and limit', () => {
      const result = parseCursorParams({cursor: 'abc123', limit: '10'});
      assert.equal(result.cursor, 'abc123');
      assert.equal(result.limit, 10);
    });

    it('returns undefined cursor when absent', () => {
      const result = parseCursorParams({limit: '10'});
      assert.equal(result.cursor, undefined);
    });

    it('treats empty-string cursor as provided', () => {
      const result = parseCursorParams({cursor: ''});
      assert.equal(result.cursor, '');
    });

    it('clamps limit to minimum 1 for zero', () => {
      const result = parseCursorParams({limit: '0'});
      assert.equal(result.limit, 1);
    });

    it('clamps limit to minimum 1 for negative values', () => {
      const result = parseCursorParams({limit: '-5'});
      assert.equal(result.limit, 1);
    });

    it('clamps limit to MAX_CURSOR_LIMIT', () => {
      const result = parseCursorParams({limit: '500'});
      assert.equal(result.limit, MAX_CURSOR_LIMIT);
    });

    it('falls back to defaults for non-numeric limit', () => {
      const result = parseCursorParams({limit: 'abc'});
      assert.equal(result.limit, DEFAULT_CURSOR_LIMIT);
    });

    it('accepts custom defaultLimit', () => {
      const result = parseCursorParams({}, {defaultLimit: 50});
      assert.equal(result.limit, 50);
    });

    it('accepts custom maxLimit', () => {
      const result = parseCursorParams({limit: '200'}, {maxLimit: 30});
      assert.equal(result.limit, 30);
    });
  });

  describe('offsetResponse', () => {
    it('returns pipeline-compatible response shape', () => {
      const result = offsetResponse([{id: 1}], {
        baseUrl: '/items',
        page: 1,
        perPage: 10,
        total: 50
      });
      assert.equal(typeof result.response, 'object');
      assert.equal(result.response.statusCode, 200);
      assert.ok(Array.isArray(result.response.body));
      assert.ok(Array.isArray(result.response.headers));
    });

    it('includes items as response body', () => {
      const items = [{id: 1}, {id: 2}];
      const result = offsetResponse(items, {
        baseUrl: '/items',
        page: 1,
        perPage: 10,
        total: 2
      });
      assert.equal(result.response.body, items);
    });

    it('includes Link header with pagination links', () => {
      const result = offsetResponse([], {
        baseUrl: '/items',
        page: 2,
        perPage: 10,
        total: 50
      });
      const linkHeader = result.response.headers.find(([name]) => name === 'Link');
      assert.ok(linkHeader, 'Link header must be present');
      assert.ok(linkHeader[1].includes('rel="first"'));
      assert.ok(linkHeader[1].includes('rel="prev"'));
      assert.ok(linkHeader[1].includes('rel="next"'));
      assert.ok(linkHeader[1].includes('rel="last"'));
    });

    it('includes X-Total-Count header as string', () => {
      const result = offsetResponse([], {
        baseUrl: '/items',
        page: 1,
        perPage: 10,
        total: 42
      });
      const totalHeader = result.response.headers.find(([name]) => name === 'X-Total-Count');
      assert.ok(totalHeader, 'X-Total-Count header must be present');
      assert.equal(totalHeader[1], '42');
    });

    it('handles empty collection (total: 0)', () => {
      const result = offsetResponse([], {
        baseUrl: '/items',
        page: 1,
        perPage: 10,
        total: 0
      });
      assert.equal(result.response.statusCode, 200);
      const totalHeader = result.response.headers.find(([name]) => name === 'X-Total-Count');
      assert.equal(totalHeader[1], '0');
    });

    it('handles single page', () => {
      const result = offsetResponse([{id: 1}], {
        baseUrl: '/items',
        page: 1,
        perPage: 10,
        total: 5
      });
      const linkHeader = result.response.headers.find(([name]) => name === 'Link');
      assert.ok(linkHeader[1].includes('rel="first"'));
      assert.ok(linkHeader[1].includes('rel="last"'));
      assert.ok(!linkHeader[1].includes('rel="prev"'));
      assert.ok(!linkHeader[1].includes('rel="next"'));
    });

    it('preserves searchParams in Link URLs', () => {
      const result = offsetResponse([], {
        baseUrl: '/items',
        page: 1,
        perPage: 10,
        total: 30,
        searchParams: 'sort=date&filter=active'
      });
      const linkHeader = result.response.headers.find(([name]) => name === 'Link');
      assert.ok(linkHeader[1].includes('sort=date&filter=active'));
    });

    it('produces headers compatible with mergeResponse', () => {
      const result = offsetResponse([], {
        baseUrl: '/items',
        page: 1,
        perPage: 10,
        total: 10
      });
      for (const tuple of result.response.headers) {
        assert.ok(Array.isArray(tuple), 'each header must be an array');
        assert.equal(tuple.length, 2, 'each header must be a [name, value] pair');
        assert.equal(typeof tuple[0], 'string', 'header name must be a string');
        assert.equal(typeof tuple[1], 'string', 'header value must be a string');
      }
    });
  });

  describe('cursorResponse', () => {
    it('returns pipeline-compatible response shape', () => {
      const result = cursorResponse([{id: 1}], {baseUrl: '/items'});
      assert.equal(typeof result.response, 'object');
      assert.equal(result.response.statusCode, 200);
      assert.ok(Array.isArray(result.response.body));
      assert.ok(Array.isArray(result.response.headers));
    });

    it('includes items as response body', () => {
      const items = [{id: 1}, {id: 2}];
      const result = cursorResponse(items, {baseUrl: '/items'});
      assert.equal(result.response.body, items);
    });

    it('includes Link header with first link only when no cursors', () => {
      const result = cursorResponse([], {baseUrl: '/items'});
      const linkHeader = result.response.headers.find(([name]) => name === 'Link');
      assert.ok(linkHeader, 'Link header must be present');
      assert.ok(linkHeader[1].includes('rel="first"'));
      assert.ok(!linkHeader[1].includes('rel="next"'));
      assert.ok(!linkHeader[1].includes('rel="prev"'));
    });

    it('includes next link when nextCursor is provided', () => {
      const result = cursorResponse([], {baseUrl: '/items', nextCursor: 'tok123'});
      const linkHeader = result.response.headers.find(([name]) => name === 'Link');
      assert.ok(linkHeader[1].includes('rel="next"'));
      assert.ok(linkHeader[1].includes('cursor=tok123'));
    });

    it('includes prev link when prevCursor is provided', () => {
      const result = cursorResponse([], {baseUrl: '/items', prevCursor: 'prev_tok'});
      const linkHeader = result.response.headers.find(([name]) => name === 'Link');
      assert.ok(linkHeader[1].includes('rel="prev"'));
      assert.ok(linkHeader[1].includes('cursor=prev_tok'));
    });

    it('URL-encodes cursor tokens', () => {
      const result = cursorResponse([], {baseUrl: '/items', nextCursor: 'a+b=c/d'});
      const linkHeader = result.response.headers.find(([name]) => name === 'Link');
      assert.ok(linkHeader[1].includes('cursor=a%2Bb%3Dc%2Fd'));
    });

    it('does not include X-Total-Count header', () => {
      const result = cursorResponse([], {baseUrl: '/items', nextCursor: 'tok'});
      const totalHeader = result.response.headers.find(([name]) => name === 'X-Total-Count');
      assert.equal(totalHeader, undefined);
    });

    it('preserves searchParams in Link URLs', () => {
      const result = cursorResponse([], {
        baseUrl: '/items',
        searchParams: 'sort=date',
        nextCursor: 'tok'
      });
      const linkHeader = result.response.headers.find(([name]) => name === 'Link');
      assert.ok(linkHeader[1].includes('sort=date'));
    });

    it('produces headers compatible with mergeResponse', () => {
      const result = cursorResponse([], {baseUrl: '/items'});
      for (const tuple of result.response.headers) {
        assert.ok(Array.isArray(tuple), 'each header must be an array');
        assert.equal(tuple.length, 2, 'each header must be a [name, value] pair');
        assert.equal(typeof tuple[0], 'string', 'header name must be a string');
        assert.equal(typeof tuple[1], 'string', 'header value must be a string');
      }
    });
  });
});
