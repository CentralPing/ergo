import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createUrl from './url.js';

const np = props => Object.assign(Object.create(null), props);

describe('[Module] http/url', () => {
  const url = createUrl();

  it('returns empty query, root pathname, undefined search for plain path', () => {
    const result = url({url: '/users'});
    assert.deepEqual(result.query, np({}));
    assert.equal(result.pathname, '/users');
    assert.equal(result.search, undefined);
  });

  it('parses query string from URL', () => {
    const result = url({url: '/users?page=1&limit=20'});
    assert.deepEqual(result.query, np({page: '1', limit: '20'}));
    assert.equal(result.pathname, '/users');
    assert.equal(result.search, '?page=1&limit=20');
  });

  it('handles URL with no path before query', () => {
    const result = url({url: '?foo=bar'});
    assert.equal(result.query.foo, 'bar');
  });

  it('handles URL with empty query string', () => {
    const result = url({url: '/path?'});
    assert.deepEqual(result.query, np({}));
    assert.equal(result.pathname, '/path');
  });

  it('returns empty query when no url', () => {
    const result = url({});
    assert.deepEqual(result.query, np({}));
  });
});
