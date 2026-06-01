import {describe, it, mock} from 'node:test';
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

  it('returns 500 and emits a once-only warning when body schema is configured but acc.body is absent', () => {
    const warn = mock.method(process, 'emitWarning', () => {});

    try {
      const validate = createValidate({
        body: {type: 'object', required: ['name']}
      });

      const result = validate(null, null, {});
      assert.ok(result?.response);
      assert.equal(result.response.statusCode, 500);
      assert.ok(result.response.detail.includes('validate()'));

      assert.equal(warn.mock.callCount(), 1);
      const [message, options] = warn.mock.calls[0].arguments;
      assert.ok(message.includes('validate()'));
      assert.equal(options.type, 'ErgoWarning');
      assert.equal(options.code, 'ERGO_VALIDATE_NO_BODY');

      const second = validate(null, null, {});
      assert.equal(second.response.statusCode, 500);
      assert.equal(warn.mock.callCount(), 1);
    } finally {
      warn.mock.restore();
    }
  });

  it('returns undefined when no body schema is configured and acc.body is absent', () => {
    const validate = createValidate({
      query: {type: 'object', properties: {page: {type: 'string'}}}
    });
    assert.equal(validate(null, null, {url: {query: {page: '1'}}}), undefined);
  });

  it('returns 422 response when params schema fails (acc.params)', () => {
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

  it('returns 422 for invalid format in body schema', () => {
    const validate = createValidate({
      body: {
        type: 'object',
        properties: {email: {type: 'string', format: 'email'}},
        required: ['email']
      }
    });
    const result = validate(null, null, {body: {parsed: {email: 'not-an-email'}}});
    assert.ok(result?.response);
    assert.equal(result.response.statusCode, 422);
    assert.ok(Array.isArray(result.response.details));
  });

  it('passes valid format in body schema', () => {
    const validate = createValidate({
      body: {
        type: 'object',
        properties: {email: {type: 'string', format: 'email'}},
        required: ['email']
      }
    });
    assert.equal(validate(null, null, {body: {parsed: {email: 'alice@example.com'}}}), undefined);
  });

  it('returns 422 response when params schema fails (acc.route.params)', () => {
    const validate = createValidate({
      params: {
        type: 'object',
        properties: {id: {type: 'string', pattern: '^[0-9]+$'}},
        required: ['id']
      }
    });
    const result = validate(null, null, {route: {params: {id: 'notanumber'}}});
    assert.ok(result?.response);
    assert.equal(result.response.statusCode, 422);
    assert.equal(result.response.detail, 'Validation failed');
    assert.ok(Array.isArray(result.response.details));
  });

  it('prefers acc.route.params over acc.params when both exist', () => {
    const validate = createValidate({
      params: {
        type: 'object',
        properties: {id: {type: 'string', pattern: '^[0-9]+$'}},
        required: ['id']
      }
    });
    const result = validate(null, null, {
      route: {params: {id: 'notanumber'}},
      params: {id: '123'}
    });
    assert.ok(result?.response);
    assert.equal(result.response.statusCode, 422);
  });
});
