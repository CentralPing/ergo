import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createValidator from './validate.js';

describe('[Boundary] lib/validate', () => {
  it('returns the data unchanged when valid', () => {
    const validate = createValidator({
      type: 'object',
      properties: {name: {type: 'string'}},
      required: ['name']
    });
    const data = {name: 'Alice'};
    assert.deepEqual(validate(data), data);
  });

  it('throws 422 when validation fails', () => {
    const validate = createValidator({
      type: 'object',
      properties: {age: {type: 'number'}},
      required: ['age']
    });
    let err;
    try {
      validate({age: 'notanumber'});
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should have thrown');
    assert.equal(err.statusCode, 422);
  });

  it('includes structured details on failure', () => {
    const validate = createValidator({
      type: 'object',
      properties: {x: {type: 'integer'}},
      required: ['x']
    });
    let err;
    try {
      validate({});
    } catch (e) {
      err = e;
    }
    assert.ok(Array.isArray(err.details));
    assert.ok(err.details.length > 0);
    assert.ok('path' in err.details[0]);
    assert.ok('message' in err.details[0]);
  });

  it('uses empty string for root-level error path (RFC 6901)', () => {
    const validate = createValidator({
      type: 'object',
      properties: {x: {type: 'integer'}},
      required: ['x']
    });
    let err;
    try {
      validate({});
    } catch (e) {
      err = e;
    }
    assert.equal(err.details[0].path, '', 'root-level path should be empty string per RFC 6901');
  });

  it('uses JSON Pointer path for nested errors', () => {
    const validate = createValidator({
      type: 'object',
      properties: {age: {type: 'integer'}}
    });
    let err;
    try {
      validate({age: 'notanumber'});
    } catch (e) {
      err = e;
    }
    assert.equal(err.details[0].path, '/age', 'nested path should be a JSON Pointer');
  });

  it('reports all errors when allErrors is true (default)', () => {
    const validate = createValidator({
      type: 'object',
      properties: {
        a: {type: 'integer'},
        b: {type: 'integer'}
      },
      required: ['a', 'b']
    });
    let err;
    try {
      validate({});
    } catch (e) {
      err = e;
    }
    assert.ok(err.details.length >= 2, 'should report both missing required fields');
  });

  it('coerces string to number when coerceTypes is true', () => {
    const validate = createValidator(
      {type: 'object', properties: {n: {type: 'number'}}},
      {coerceTypes: true}
    );
    const result = validate({n: '42'});
    assert.equal(result.n, 42);
  });

  it('does not coerce by default — throws 422 for wrong types', () => {
    const validate = createValidator({
      type: 'object',
      properties: {n: {type: 'number'}}
    });
    let err;
    try {
      validate({n: '42'});
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should have thrown');
    assert.equal(err.statusCode, 422);
  });

  it('validates format keywords by default (email)', () => {
    const validate = createValidator({
      type: 'object',
      properties: {email: {type: 'string', format: 'email'}},
      required: ['email']
    });
    assert.deepEqual(validate({email: 'alice@example.com'}), {email: 'alice@example.com'});

    let err;
    try {
      validate({email: 'not-an-email'});
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should have thrown for invalid email');
    assert.equal(err.statusCode, 422);
  });

  it('validates multiple format keywords (uri, date-time, uuid)', () => {
    const validate = createValidator({
      type: 'object',
      properties: {
        uri: {type: 'string', format: 'uri'},
        ts: {type: 'string', format: 'date-time'},
        id: {type: 'string', format: 'uuid'}
      }
    });
    assert.deepEqual(
      validate({
        uri: 'https://example.com',
        ts: '2026-01-01T00:00:00Z',
        id: '550e8400-e29b-41d4-a716-446655440000'
      }),
      {
        uri: 'https://example.com',
        ts: '2026-01-01T00:00:00Z',
        id: '550e8400-e29b-41d4-a716-446655440000'
      }
    );

    let err;
    try {
      validate({uri: 'not a uri'});
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should have thrown for invalid uri');
    assert.equal(err.statusCode, 422);
  });

  it('disables format validation when formats is false', () => {
    const validate = createValidator(
      {
        type: 'object',
        properties: {email: {type: 'string', format: 'email'}}
      },
      {formats: false, ajv: {strict: false}}
    );
    assert.deepEqual(validate({email: 'not-an-email'}), {email: 'not-an-email'});
  });

  it('enables selective formats via array', () => {
    const validate = createValidator(
      {
        type: 'object',
        properties: {email: {type: 'string', format: 'email'}}
      },
      {formats: ['email']}
    );
    assert.deepEqual(validate({email: 'alice@example.com'}), {email: 'alice@example.com'});

    let err;
    try {
      validate({email: 'not-an-email'});
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should have thrown for invalid email');
    assert.equal(err.statusCode, 422);
  });

  it('accepts object config for ajv-formats plugin options', () => {
    const validate = createValidator(
      {
        type: 'object',
        properties: {email: {type: 'string', format: 'email'}}
      },
      {formats: {mode: 'fast'}}
    );
    assert.deepEqual(validate({email: 'alice@example.com'}), {email: 'alice@example.com'});

    let err;
    try {
      validate({email: 'not-an-email'});
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should have thrown for invalid email in fast mode');
    assert.equal(err.statusCode, 422);
  });

  it('defaults to fast mode — accepts structurally valid but semantically invalid dates', () => {
    const validate = createValidator({
      type: 'object',
      properties: {d: {type: 'string', format: 'date'}},
      required: ['d']
    });
    assert.deepEqual(validate({d: '2026-02-31'}), {d: '2026-02-31'});
  });

  it('uses fast mode when formats is true', () => {
    const validate = createValidator(
      {
        type: 'object',
        properties: {d: {type: 'string', format: 'date'}},
        required: ['d']
      },
      {formats: true}
    );
    assert.deepEqual(validate({d: '2026-02-31'}), {d: '2026-02-31'});
  });

  it('rejects semantically invalid dates when full mode is explicitly enabled', () => {
    const validate = createValidator(
      {
        type: 'object',
        properties: {d: {type: 'string', format: 'date'}},
        required: ['d']
      },
      {formats: {mode: 'full'}}
    );

    let err;
    try {
      validate({d: '2026-02-31'});
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should have thrown for semantically invalid date in full mode');
    assert.equal(err.statusCode, 422);
  });
});
