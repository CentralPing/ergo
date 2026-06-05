import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createPaginate from './paginate.js';

describe('[Module] http/paginate', () => {
  describe('factory', () => {
    it('returns a middleware function', () => {
      const mw = createPaginate();
      assert.equal(typeof mw, 'function');
    });

    it('defaults to offset strategy', () => {
      const mw = createPaginate();
      const result = mw({}, {}, {url: {query: Object.create(null)}});
      assert.equal(result.value.strategy, 'offset');
    });
  });

  describe('offset strategy', () => {
    it('parses page and per_page from accumulator query', () => {
      const mw = createPaginate();
      const query = Object.assign(Object.create(null), {page: '3', per_page: '10'});
      const result = mw({}, {}, {url: {query}});
      assert.deepEqual(result.value, {
        strategy: 'offset',
        page: 3,
        perPage: 10,
        offset: 20,
        limit: 10
      });
    });

    it('uses defaults when query params are absent', () => {
      const mw = createPaginate();
      const result = mw({}, {}, {url: {query: Object.create(null)}});
      assert.equal(result.value.page, 1);
      assert.equal(result.value.perPage, 20);
      assert.equal(result.value.offset, 0);
      assert.equal(result.value.limit, 20);
    });

    it('respects custom option overrides', () => {
      const mw = createPaginate({defaultPerPage: 50, maxPerPage: 50});
      const result = mw({}, {}, {url: {query: Object.create(null)}});
      assert.equal(result.value.perPage, 50);
    });

    it('clamps perPage to maxPerPage', () => {
      const mw = createPaginate({maxPerPage: 25});
      const query = Object.assign(Object.create(null), {per_page: '100'});
      const result = mw({}, {}, {url: {query}});
      assert.equal(result.value.perPage, 25);
    });
  });

  describe('cursor strategy', () => {
    it('parses cursor and limit from accumulator query', () => {
      const mw = createPaginate({strategy: 'cursor'});
      const query = Object.assign(Object.create(null), {cursor: 'abc123', limit: '15'});
      const result = mw({}, {}, {url: {query}});
      assert.deepEqual(result.value, {
        strategy: 'cursor',
        cursor: 'abc123',
        limit: 15
      });
    });

    it('returns undefined cursor when absent', () => {
      const mw = createPaginate({strategy: 'cursor'});
      const result = mw({}, {}, {url: {query: Object.create(null)}});
      assert.equal(result.value.cursor, undefined);
      assert.equal(result.value.limit, 20);
    });

    it('respects custom limit options', () => {
      const mw = createPaginate({strategy: 'cursor', defaultLimit: 50, maxLimit: 50});
      const result = mw({}, {}, {url: {query: Object.create(null)}});
      assert.equal(result.value.limit, 50);
    });

    it('clamps limit to maxLimit', () => {
      const mw = createPaginate({strategy: 'cursor', maxLimit: 30});
      const query = Object.assign(Object.create(null), {limit: '200'});
      const result = mw({}, {}, {url: {query}});
      assert.equal(result.value.limit, 30);
    });
  });

  describe('fault tolerance', () => {
    it('handles undefined domainAcc gracefully', () => {
      const mw = createPaginate();
      const result = mw({}, {}, undefined);
      assert.equal(result.value.strategy, 'offset');
      assert.equal(result.value.page, 1);
    });

    it('handles missing url on domainAcc', () => {
      const mw = createPaginate();
      const result = mw({}, {}, {});
      assert.equal(result.value.strategy, 'offset');
      assert.equal(result.value.page, 1);
    });

    it('handles undefined query', () => {
      const mw = createPaginate();
      const result = mw({}, {}, {url: {}});
      assert.equal(result.value.strategy, 'offset');
      assert.equal(result.value.page, 1);
    });
  });
});
