import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createValidate from './validate.js';

describe('[Module] http/validate', () => {
  it('does not throw when all schemas pass', () => {
    const validate = createValidate({
      query: {type: 'object', properties: {page: {type: 'string'}}}
    });
    const acc = {url: {query: {page: '1'}}};
    assert.doesNotThrow(() => validate(null, null, acc));
  });

  it('throws 422 when query schema fails', () => {
    const validate = createValidate({
      query: {
        type: 'object',
        properties: {page: {type: 'integer'}},
        required: ['page']
      }
    });
    let err;
    try {
      validate(null, null, {url: {query: {}}});
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 422);
  });

  it('validates body.parsed when body schema is set', () => {
    const validate = createValidate({
      body: {
        type: 'object',
        properties: {name: {type: 'string'}},
        required: ['name']
      }
    });
    let err;
    try {
      validate(null, null, {body: {parsed: {}}});
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 422);
  });

  it('skips validation when accumulator key is missing', () => {
    const validate = createValidate({
      body: {type: 'object', required: ['name']}
    });
    // acc.body is undefined — should not throw
    assert.doesNotThrow(() => validate(null, null, {}));
  });

  it('validates params when params schema is set', () => {
    const validate = createValidate({
      params: {
        type: 'object',
        properties: {id: {type: 'string', pattern: '^[0-9]+$'}},
        required: ['id']
      }
    });
    let err;
    try {
      validate(null, null, {params: {id: 'notanumber'}});
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 422);
  });
});
