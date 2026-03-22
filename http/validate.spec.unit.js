import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createValidate from './validate.js';

describe('[Module] http/validate', () => {
  it('returns undefined when all schemas pass', () => {
    const validate = createValidate({
      query: {type: 'object', properties: {page: {type: 'string'}}}
    });
    const acc = {url: {query: {page: '1'}}};
    assert.equal(validate(null, null, acc), undefined);
  });

  it('returns 422 response when query schema fails', () => {
    const validate = createValidate({
      query: {
        type: 'object',
        properties: {page: {type: 'integer'}},
        required: ['page']
      }
    });
    const result = validate(null, null, {url: {query: {}}});
    assert.ok(result?.response);
    assert.equal(result.response.statusCode, 422);
    assert.equal(result.response.detail, 'Validation failed');
    assert.ok(Array.isArray(result.response.details));
  });

  it('returns 422 response when body schema fails', () => {
    const validate = createValidate({
      body: {
        type: 'object',
        properties: {name: {type: 'string'}},
        required: ['name']
      }
    });
    const result = validate(null, null, {body: {parsed: {}}});
    assert.ok(result?.response);
    assert.equal(result.response.statusCode, 422);
    assert.equal(result.response.detail, 'Validation failed');
    assert.ok(Array.isArray(result.response.details));
  });

  it('skips validation when accumulator key is missing', () => {
    const validate = createValidate({
      body: {type: 'object', required: ['name']}
    });
    // acc.body is undefined — should not return an error response
    assert.equal(validate(null, null, {}), undefined);
  });

  it('returns 422 response when params schema fails', () => {
    const validate = createValidate({
      params: {
        type: 'object',
        properties: {id: {type: 'string', pattern: '^[0-9]+$'}},
        required: ['id']
      }
    });
    const result = validate(null, null, {params: {id: 'notanumber'}});
    assert.ok(result?.response);
    assert.equal(result.response.statusCode, 422);
    assert.equal(result.response.detail, 'Validation failed');
    assert.ok(Array.isArray(result.response.details));
  });
});
