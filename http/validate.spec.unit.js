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

  it('returns 500 and emits a once-only warning when body schema is configured but acc.body is absent', () => {
    const warnings = [];
    const orig = process.emitWarning;
    process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

    try {
      const validate = createValidate({
        body: {type: 'object', required: ['name']}
      });

      const result = validate(null, null, {});
      assert.ok(result?.response);
      assert.equal(result.response.statusCode, 500);
      assert.ok(result.response.detail.includes('validate()'));

      assert.equal(warnings.length, 1);
      assert.ok(warnings[0].message.includes('validate()'));
      assert.equal(warnings[0].type, 'ErgoWarning');
      assert.equal(warnings[0].code, 'ERGO_VALIDATE_NO_BODY');

      const second = validate(null, null, {});
      assert.equal(second.response.statusCode, 500);
      assert.equal(warnings.length, 1);
    } finally {
      process.emitWarning = orig;
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

  it('does not emit a warning when only valid schema keys are passed', () => {
    const warnings = [];
    const orig = process.emitWarning;
    process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

    try {
      createValidate({
        body: {type: 'object'},
        query: {type: 'object'},
        params: {type: 'object'}
      });

      const unknownKeyCalls = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_KEY');
      assert.equal(unknownKeyCalls.length, 0);
    } finally {
      process.emitWarning = orig;
    }
  });

  it('validates body via shorthand when a raw JSON Schema is passed', () => {
    const validate = createValidate({
      type: 'object',
      properties: {name: {type: 'string'}},
      required: ['name']
    });
    assert.equal(validate(null, null, {body: {parsed: {name: 'Alice'}}}), undefined);
  });

  it('returns 422 via shorthand when body validation fails', () => {
    const validate = createValidate({
      type: 'object',
      properties: {name: {type: 'string'}},
      required: ['name']
    });
    const result = validate(null, null, {body: {parsed: {}}});
    assert.ok(result?.response);
    assert.equal(result.response.statusCode, 422);
    assert.equal(result.response.detail, 'Validation failed');
    assert.ok(Array.isArray(result.response.details));
  });

  it('detects shorthand with only required key (no type)', () => {
    const validate = createValidate({required: ['name']});
    const result = validate(null, null, {body: {parsed: {}}});
    assert.ok(result?.response);
    assert.equal(result.response.statusCode, 422);
  });

  it('passes options as second parameter in shorthand form', () => {
    const validate = createValidate(
      {
        type: 'object',
        properties: {email: {type: 'string', format: 'email'}},
        required: ['email']
      },
      {formats: ['email']}
    );
    const result = validate(null, null, {body: {parsed: {email: 'not-email'}}});
    assert.ok(result?.response);
    assert.equal(result.response.statusCode, 422);
  });

  it('does not treat empty object {} as shorthand', () => {
    const validate = createValidate({});
    assert.equal(validate(null, null, {}), undefined);
  });

  it('still emits warning for non-schema-like objects without targeted keys', () => {
    const warnings = [];
    const orig = process.emitWarning;
    process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

    try {
      createValidate({wrapper: {body: {type: 'object'}}});

      const calls = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_KEY');
      assert.ok(calls.length >= 1, 'should emit unknown key warning for non-schema object');
    } finally {
      process.emitWarning = orig;
    }
  });

  it('uses targeted form when body key is present alongside JSON Schema keywords', () => {
    const warnings = [];
    const orig = process.emitWarning;
    process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

    try {
      const validate = createValidate({
        type: 'string',
        body: {type: 'object', properties: {name: {type: 'string'}}, required: ['name']}
      });
      assert.equal(validate(null, null, {body: {parsed: {name: 'Alice'}}}), undefined);

      const unknownCalls = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_KEY');
      assert.ok(unknownCalls.length >= 1, 'top-level type should be flagged as unknown key');
    } finally {
      process.emitWarning = orig;
    }
  });

  it('emits ERGO_VALIDATE_UNKNOWN_OPTION warning for unknown option keys', () => {
    const warnings = [];
    const orig = process.emitWarning;
    process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

    try {
      createValidate({body: {type: 'object'}}, {format: ['email']});

      const calls = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_OPTION');
      assert.equal(calls.length, 1);
      assert.ok(calls[0].message.includes('"format"'));
      assert.ok(calls[0].message.includes('did you mean "formats"'));
      assert.equal(calls[0].type, 'ErgoWarning');
    } finally {
      process.emitWarning = orig;
    }
  });

  it('does not emit option warning when all option keys are valid', () => {
    const warnings = [];
    const orig = process.emitWarning;
    process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

    try {
      createValidate(
        {body: {type: 'object'}},
        {formats: true, allErrors: false, coerceTypes: true, ajv: {}}
      );

      const calls = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_OPTION');
      assert.equal(calls.length, 0);
    } finally {
      process.emitWarning = orig;
    }
  });

  it('does not emit option warning when options is empty or omitted', () => {
    const warnings = [];
    const orig = process.emitWarning;
    process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

    try {
      createValidate({body: {type: 'object'}}, {});
      createValidate({body: {type: 'object'}});

      const calls = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_OPTION');
      assert.equal(calls.length, 0);
    } finally {
      process.emitWarning = orig;
    }
  });

  it('deduplicates option warnings for identical unknown key sets', () => {
    const warnings = [];
    const orig = process.emitWarning;
    process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

    try {
      createValidate({body: {type: 'object'}}, {bogus: true});

      const first = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_OPTION');
      assert.equal(first.length, 1);

      createValidate({body: {type: 'object'}}, {bogus: true});

      const second = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_OPTION');
      assert.equal(second.length, 1, 'repeated key set is deduplicated');

      createValidate({body: {type: 'object'}}, {other: true});

      const third = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_OPTION');
      assert.equal(third.length, 2, 'different key set emits a separate warning');
    } finally {
      process.emitWarning = orig;
    }
  });

  it('emits per-key-set warnings and deduplicates identical key sets', () => {
    const warnings = [];
    const orig = process.emitWarning;
    process.emitWarning = (msg, opts) => warnings.push({message: msg, ...opts});

    try {
      createValidate({schemas: {body: {type: 'object'}}});

      const calls = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_KEY');
      assert.equal(calls.length, 1);

      const [first] = calls;
      assert.ok(first.message.includes('schemas'));
      assert.ok(first.message.includes('validate()'));
      assert.equal(first.type, 'ErgoWarning');
      assert.equal(first.code, 'ERGO_VALIDATE_UNKNOWN_KEY');

      createValidate({foo: {type: 'object'}});

      const afterCalls = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_KEY');
      assert.equal(afterCalls.length, 2, 'different key set emits a separate warning');

      createValidate({schemas: {body: {type: 'object'}}});

      const dedupCalls = warnings.filter(w => w.code === 'ERGO_VALIDATE_UNKNOWN_KEY');
      assert.equal(dedupCalls.length, 2, 'repeated key set is deduplicated');
    } finally {
      process.emitWarning = orig;
    }
  });
});
