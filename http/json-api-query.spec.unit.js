/**
 * @fileoverview Layer 2 module tests for http/json-api-query middleware.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createJsonApiQuery from './json-api-query.js';
import {createMockReq, createMockRes} from '../test/helpers.js';

describe('[Module] http/json-api-query', () => {
  it('returns undefined when acc.url.query is an empty object (valid)', () => {
    const mw = createJsonApiQuery();
    const req = createMockReq();
    const res = createMockRes();
    assert.equal(mw(req, res, {url: {query: {}}}), undefined);
  });

  it('returns undefined for a valid JSON:API sort array in acc.url.query', () => {
    const mw = createJsonApiQuery();
    assert.equal(
      mw(createMockReq(), createMockRes(), {url: {query: {sort: ['title', '-date']}}}),
      undefined
    );
  });

  it('returns 400 response when acc.url.query is null (not an object)', () => {
    const mw = createJsonApiQuery();
    const result = mw(createMockReq(), createMockRes(), {url: {query: null}});
    assert.ok(result?.response, 'should return error response for null query');
    assert.equal(result.response.statusCode, 400);
    assert.equal(result.response.detail, 'Invalid JSON API query');
  });

  it('returns 400 response when fields is a string (must be an object)', () => {
    const mw = createJsonApiQuery();
    const result = mw(createMockReq(), createMockRes(), {
      url: {query: {fields: 'invalid'}}
    });
    assert.ok(result?.response, 'should return error response for invalid fields type');
    assert.equal(result.response.statusCode, 400);
    assert.equal(result.response.detail, 'Invalid JSON API query');
  });

  it('returns 400 response when page is a string (must be an object)', () => {
    const mw = createJsonApiQuery();
    const result = mw(createMockReq(), createMockRes(), {url: {query: {page: 'invalid'}}});
    assert.ok(result?.response);
    assert.equal(result.response.statusCode, 400);
    assert.equal(result.response.detail, 'Invalid JSON API query');
  });

  it('reads only acc.url.query (ignores unrelated acc keys)', () => {
    const mw = createJsonApiQuery();
    assert.equal(
      mw(createMockReq(), createMockRes(), {
        unrelated: {foo: 'bar'},
        url: {query: {}}
      }),
      undefined
    );
  });

  it('returns undefined for a valid filter object in acc.url.query', () => {
    const mw = createJsonApiQuery();
    assert.equal(
      mw(createMockReq(), createMockRes(), {url: {query: {filter: {name: 'alice'}}}}),
      undefined
    );
  });
});
