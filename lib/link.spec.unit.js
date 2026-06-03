import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {formatLinkHeader, paginationLinks, cursorPaginationLinks} from './link.js';

describe('[Boundary] lib/link', () => {
  describe('formatLinkHeader', () => {
    it('formats a single link', () => {
      const result = formatLinkHeader([{href: '/next', rel: 'next'}]);
      assert.equal(result, '</next>; rel="next"');
    });

    it('formats multiple links separated by commas', () => {
      const result = formatLinkHeader([
        {href: '/prev', rel: 'prev'},
        {href: '/next', rel: 'next'}
      ]);
      assert.equal(result, '</prev>; rel="prev", </next>; rel="next"');
    });

    it('includes extra parameters', () => {
      const result = formatLinkHeader([{href: '/page', rel: 'next', title: 'Next Page'}]);
      assert.equal(result, '</page>; rel="next"; title="Next Page"');
    });

    it('returns empty string for empty array', () => {
      assert.equal(formatLinkHeader([]), '');
    });

    it('throws when href contains ">"', () => {
      assert.throws(() => formatLinkHeader([{href: '/bad>path', rel: 'next'}]), {
        name: 'TypeError',
        message: 'Link href contains forbidden characters'
      });
    });

    it('throws when href contains CR (\\r)', () => {
      assert.throws(() => formatLinkHeader([{href: '/bad\rpath', rel: 'next'}]), {
        name: 'TypeError',
        message: 'Link href contains forbidden characters'
      });
    });

    it('throws when href contains LF (\\n)', () => {
      assert.throws(() => formatLinkHeader([{href: '/bad\npath', rel: 'next'}]), {
        name: 'TypeError',
        message: 'Link href contains forbidden characters'
      });
    });

    it('throws when href contains NUL (\\0)', () => {
      assert.throws(() => formatLinkHeader([{href: '/bad\0path', rel: 'next'}]), {
        name: 'TypeError',
        message: 'Link href contains forbidden characters'
      });
    });

    it('escapes double-quotes in rel', () => {
      const result = formatLinkHeader([{href: '/ok', rel: 'ne"xt'}]);
      assert.ok(result.includes('rel="ne\\"xt"'));
      assert.ok(!result.includes('rel="ne"xt"'));
    });

    it('escapes special characters in parameter values', () => {
      const result = formatLinkHeader([{href: '/ok', rel: 'next', title: 'a"b\\c'}]);
      assert.ok(result.includes('title="a\\"b\\\\c"'));
    });

    it('strips CRLF from parameter values', () => {
      const result = formatLinkHeader([{href: '/ok', rel: 'next', title: 'a\r\nb'}]);
      assert.ok(!result.includes('\r'));
      assert.ok(!result.includes('\n'));
      assert.ok(result.includes('title="ab"'));
    });

    it('throws for invalid parameter key (non-token)', () => {
      assert.throws(
        () => formatLinkHeader([{href: '/ok', rel: 'next', 'bad key': 'val'}]),
        TypeError
      );
    });

    it('handles URLs with query strings', () => {
      const result = formatLinkHeader([{href: '/items?page=2&per_page=10', rel: 'next'}]);
      assert.equal(result, '</items?page=2&per_page=10>; rel="next"');
    });
  });

  describe('paginationLinks', () => {
    it('includes first, next, and last on page 1 of many', () => {
      const links = paginationLinks({baseUrl: '/items', page: 1, perPage: 10, total: 50});
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first', 'next', 'last']);
    });

    it('includes first, prev, next, and last on a middle page', () => {
      const links = paginationLinks({baseUrl: '/items', page: 3, perPage: 10, total: 50});
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first', 'prev', 'next', 'last']);
    });

    it('includes first, prev, and last on the last page', () => {
      const links = paginationLinks({baseUrl: '/items', page: 5, perPage: 10, total: 50});
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first', 'prev', 'last']);
    });

    it('only includes first and last when there is one page', () => {
      const links = paginationLinks({baseUrl: '/items', page: 1, perPage: 10, total: 5});
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first', 'last']);
    });

    it('generates correct hrefs', () => {
      const links = paginationLinks({baseUrl: '/items', page: 2, perPage: 10, total: 50});
      const byRel = Object.fromEntries(links.map(l => [l.rel, l.href]));
      assert.equal(byRel.first, '/items?page=1&per_page=10');
      assert.equal(byRel.prev, '/items?page=1&per_page=10');
      assert.equal(byRel.next, '/items?page=3&per_page=10');
      assert.equal(byRel.last, '/items?page=5&per_page=10');
    });

    it('preserves additional search params', () => {
      const links = paginationLinks({
        baseUrl: '/items',
        page: 1,
        perPage: 10,
        total: 30,
        searchParams: 'sort=date&filter=active'
      });
      const first = links.find(l => l.rel === 'first');
      assert.ok(first.href.includes('sort=date&filter=active'));
      assert.ok(first.href.includes('page=1'));
    });

    it('handles total of 0 (empty collection)', () => {
      const links = paginationLinks({baseUrl: '/items', page: 1, perPage: 10, total: 0});
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first', 'last']);
      const last = links.find(l => l.rel === 'last');
      assert.ok(last.href.includes('page=1'), 'last page should be 1 for empty collection');
    });

    it('integrates with formatLinkHeader', () => {
      const links = paginationLinks({baseUrl: '/items', page: 2, perPage: 5, total: 20});
      const header = formatLinkHeader(links);
      assert.ok(header.includes('rel="first"'));
      assert.ok(header.includes('rel="prev"'));
      assert.ok(header.includes('rel="next"'));
      assert.ok(header.includes('rel="last"'));
      assert.ok(header.includes('per_page=5'));
    });
  });

  describe('cursorPaginationLinks', () => {
    it('returns only first link when no cursors are provided', () => {
      const links = cursorPaginationLinks({baseUrl: '/items'});
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first']);
      assert.equal(links[0].href, '/items');
    });

    it('includes first and next on the first page', () => {
      const links = cursorPaginationLinks({
        baseUrl: '/items',
        nextCursor: 'abc123'
      });
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first', 'next']);
    });

    it('includes first, prev, and next on a middle page', () => {
      const links = cursorPaginationLinks({
        baseUrl: '/items',
        prevCursor: 'prev_token',
        nextCursor: 'next_token'
      });
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first', 'prev', 'next']);
    });

    it('includes first and prev on the last page', () => {
      const links = cursorPaginationLinks({
        baseUrl: '/items',
        prevCursor: 'prev_token'
      });
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first', 'prev']);
    });

    it('never includes a last link', () => {
      const links = cursorPaginationLinks({
        baseUrl: '/items',
        prevCursor: 'prev',
        nextCursor: 'next'
      });
      const rels = links.map(l => l.rel);
      assert.ok(!rels.includes('last'));
    });

    it('URL-encodes cursor tokens in href', () => {
      const links = cursorPaginationLinks({
        baseUrl: '/items',
        nextCursor: 'a+b=c/d'
      });
      const next = links.find(l => l.rel === 'next');
      assert.ok(next.href.includes('cursor=a%2Bb%3Dc%2Fd'));
    });

    it('generates correct hrefs with cursors', () => {
      const links = cursorPaginationLinks({
        baseUrl: '/items',
        prevCursor: 'prev_tok',
        nextCursor: 'next_tok'
      });
      const byRel = Object.fromEntries(links.map(l => [l.rel, l.href]));
      assert.equal(byRel.first, '/items');
      assert.equal(byRel.prev, '/items?cursor=prev_tok');
      assert.equal(byRel.next, '/items?cursor=next_tok');
    });

    it('preserves additional search params', () => {
      const links = cursorPaginationLinks({
        baseUrl: '/items',
        searchParams: 'sort=date&filter=active',
        nextCursor: 'tok123'
      });
      const first = links.find(l => l.rel === 'first');
      assert.equal(first.href, '/items?sort=date&filter=active');
      const next = links.find(l => l.rel === 'next');
      assert.ok(next.href.includes('sort=date&filter=active'));
      assert.ok(next.href.includes('cursor=tok123'));
    });

    it('first href includes searchParams without cursor', () => {
      const links = cursorPaginationLinks({
        baseUrl: '/items',
        searchParams: 'sort=name',
        nextCursor: 'xyz'
      });
      const first = links.find(l => l.rel === 'first');
      assert.equal(first.href, '/items?sort=name');
      assert.ok(!first.href.includes('cursor'));
    });

    it('treats empty-string nextCursor as provided', () => {
      const links = cursorPaginationLinks({baseUrl: '/items', nextCursor: ''});
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first', 'next']);
      const next = links.find(l => l.rel === 'next');
      assert.ok(next.href.includes('cursor='));
    });

    it('treats empty-string prevCursor as provided', () => {
      const links = cursorPaginationLinks({baseUrl: '/items', prevCursor: ''});
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first', 'prev']);
      const prev = links.find(l => l.rel === 'prev');
      assert.ok(prev.href.includes('cursor='));
    });

    it('treats undefined cursors as absent', () => {
      const links = cursorPaginationLinks({
        baseUrl: '/items',
        nextCursor: undefined,
        prevCursor: undefined
      });
      const rels = links.map(l => l.rel);
      assert.deepEqual(rels, ['first']);
    });

    it('integrates with formatLinkHeader', () => {
      const links = cursorPaginationLinks({
        baseUrl: '/items',
        searchParams: 'sort=date',
        prevCursor: 'prev_tok',
        nextCursor: 'next_tok'
      });
      const header = formatLinkHeader(links);
      assert.ok(header.includes('rel="first"'));
      assert.ok(header.includes('rel="prev"'));
      assert.ok(header.includes('rel="next"'));
      assert.ok(!header.includes('rel="last"'));
      assert.ok(header.includes('cursor='));
    });
  });
});
