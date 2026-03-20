import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {setupServer, fetch} from '../test/helpers.js';
import createUrl from './url.js';

describe('[Contract] http/url', () => {
  let baseUrl, close;

  const urlMw = createUrl();

  before(async () => {
    ({baseUrl, close} = await setupServer((req, res) => {
      const result = urlMw(req);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    }));
  });

  after(() => close());

  it('parses query string from a real HTTP request', async () => {
    const res = await fetch(`${baseUrl}/users?page=2&limit=10`);
    const data = await res.json();
    assert.equal(data.pathname, '/users');
    assert.equal(data.query.page, '2');
    assert.equal(data.query.limit, '10');
    assert.equal(data.search, '?page=2&limit=10');
  });

  it('returns empty query for request with no query string', async () => {
    const res = await fetch(`${baseUrl}/users`);
    const data = await res.json();
    assert.deepEqual(data.query, {});
    assert.equal(data.search, undefined);
  });

  it('handles multi-value query parameters', async () => {
    const res = await fetch(`${baseUrl}/search?tag=a&tag=b`);
    const data = await res.json();
    assert.deepEqual(data.query.tag, ['a', 'b']);
  });
});
