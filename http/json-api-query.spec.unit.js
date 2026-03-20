/**
 * @fileoverview Layer 2 module tests for http/json-api-query middleware.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createJsonApiQuery from './json-api-query.js';
import {createMockReq, createMockRes} from '../test/helpers.js';

describe('[Module] http/json-api-query', () => {
  it('does not throw when the query accumulator is empty (valid)', () => {
    const mw = createJsonApiQuery();
    const req = createMockReq();
    const res = createMockRes();
    assert.doesNotThrow(() => mw(req, res, {}));
  });

  it('does not throw for a valid JSON:API sort array', () => {
    const mw = createJsonApiQuery();
    assert.doesNotThrow(() => mw(createMockReq(), createMockRes(), {sort: ['title', '-date']}));
  });

  it('throws 400 when the query is null (not an object)', () => {
    const mw = createJsonApiQuery();
    let err;
    try {
      mw(createMockReq(), createMockRes(), null);
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should throw on null query');
    assert.equal(err.statusCode, 400);
    assert.ok(err.message.toLowerCase().includes('json api'));
  });

  it('throws 400 when fields is a string (must be an object)', () => {
    const mw = createJsonApiQuery();
    let err;
    try {
      mw(createMockReq(), createMockRes(), {fields: 'invalid'});
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should throw on invalid fields type');
    assert.equal(err.statusCode, 400);
  });

  it('throws 400 when page is a string (must be an object)', () => {
    const mw = createJsonApiQuery();
    let err;
    try {
      mw(createMockReq(), createMockRes(), {page: 'invalid'});
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 400);
  });

  it('pops the last argument from rest as the query (ignores leading args)', () => {
    const mw = createJsonApiQuery();
    assert.doesNotThrow(() => mw(createMockReq(), createMockRes(), 'irrelevant-acc', {}));
  });

  it('does not throw for a valid filter object', () => {
    const mw = createJsonApiQuery();
    assert.doesNotThrow(() => mw(createMockReq(), createMockRes(), {filter: {name: 'alice'}}));
  });
});
