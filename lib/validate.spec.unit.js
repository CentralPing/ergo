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
});
