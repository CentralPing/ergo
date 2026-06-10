import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {compileResponseSerializers, resolveSerializer} from './response-schema.js';

describe('[Boundary] lib/response-schema', () => {
  describe('compileResponseSerializers', () => {
    it('compiles numeric status code keys', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'object', properties: {id: {type: 'number'}}}
      });
      assert.ok(serializers.has(200));
    });

    it('normalizes string numeric keys to numbers', () => {
      const serializers = compileResponseSerializers({
        201: {type: 'object', properties: {id: {type: 'number'}}}
      });
      assert.ok(serializers.has(201));
    });

    it('normalizes uppercase range keys to lowercase', () => {
      const serializers = compileResponseSerializers({
        '2XX': {type: 'object', properties: {id: {type: 'number'}}}
      });
      assert.ok(serializers.has('2xx'));
    });

    it('preserves lowercase range keys', () => {
      const serializers = compileResponseSerializers({
        '2xx': {type: 'object', properties: {id: {type: 'number'}}}
      });
      assert.ok(serializers.has('2xx'));
    });

    it('preserves the default key', () => {
      const serializers = compileResponseSerializers({
        default: {type: 'object', properties: {id: {type: 'number'}}}
      });
      assert.ok(serializers.has('default'));
    });

    it('compiles multiple schema entries', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'object', properties: {id: {type: 'number'}}},
        '2xx': {type: 'object', properties: {ok: {type: 'boolean'}}},
        default: {type: 'object', properties: {msg: {type: 'string'}}}
      });
      assert.equal(serializers.size, 3);
    });
  });

  describe('resolveSerializer', () => {
    const serializers = compileResponseSerializers({
      200: {type: 'object', properties: {exact: {type: 'boolean'}}},
      '2xx': {type: 'object', properties: {range: {type: 'boolean'}}},
      default: {type: 'object', properties: {fallback: {type: 'boolean'}}}
    });

    it('resolves exact numeric match first', () => {
      const projector = resolveSerializer(serializers, 200);
      const result = projector({exact: true, range: true, fallback: true, extra: 'gone'});
      assert.deepEqual(result, {exact: true});
    });

    it('falls back to range key when no exact match', () => {
      const projector = resolveSerializer(serializers, 201);
      const result = projector({exact: true, range: true, fallback: true, extra: 'gone'});
      assert.deepEqual(result, {range: true});
    });

    it('falls back to default when no exact or range match', () => {
      const projector = resolveSerializer(serializers, 302);
      const result = projector({exact: true, range: true, fallback: true, extra: 'gone'});
      assert.deepEqual(result, {fallback: true});
    });

    it('returns undefined when no match exists', () => {
      const noDefault = compileResponseSerializers({
        200: {type: 'object', properties: {id: {type: 'number'}}}
      });
      assert.equal(resolveSerializer(noDefault, 404), undefined);
    });

    it('resolves uppercase range key after normalization', () => {
      const upper = compileResponseSerializers({
        '2XX': {type: 'object', properties: {ok: {type: 'boolean'}}}
      });
      const projector = resolveSerializer(upper, 204);
      const result = projector({ok: true, extra: 'stripped'});
      assert.deepEqual(result, {ok: true});
    });
  });

  describe('projection: flat object', () => {
    it('strips undeclared properties', () => {
      const serializers = compileResponseSerializers({
        200: {
          type: 'object',
          properties: {id: {type: 'number'}, name: {type: 'string'}}
        }
      });
      const project = resolveSerializer(serializers, 200);
      const result = project({id: 1, name: 'Alice', secret: 'password', internal: true});
      assert.deepEqual(result, {id: 1, name: 'Alice'});
    });

    it('passes through declared properties that are missing from the value', () => {
      const serializers = compileResponseSerializers({
        200: {
          type: 'object',
          properties: {id: {type: 'number'}, name: {type: 'string'}, bio: {type: 'string'}}
        }
      });
      const project = resolveSerializer(serializers, 200);
      const result = project({id: 1, name: 'Alice'});
      assert.deepEqual(result, {id: 1, name: 'Alice'});
      assert.ok(!('bio' in result), 'missing properties should not appear in output');
    });

    it('does not mutate the input object', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'object', properties: {id: {type: 'number'}}}
      });
      const project = resolveSerializer(serializers, 200);
      const input = {id: 1, secret: 'x'};
      project(input);
      assert.ok('secret' in input, 'input should not be mutated');
    });

    it('returns null/undefined values unchanged', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'object', properties: {id: {type: 'number'}}}
      });
      const project = resolveSerializer(serializers, 200);
      assert.equal(project(null), null);
      assert.equal(project(undefined), undefined);
    });

    it('returns non-object values unchanged', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'object', properties: {id: {type: 'number'}}}
      });
      const project = resolveSerializer(serializers, 200);
      assert.equal(project('string'), 'string');
      assert.equal(project(42), 42);
    });
  });

  describe('projection: nested object', () => {
    it('recursively strips nested object properties', () => {
      const serializers = compileResponseSerializers({
        200: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: {type: 'number'},
                name: {type: 'string'}
              }
            }
          }
        }
      });
      const project = resolveSerializer(serializers, 200);
      const result = project({
        user: {id: 1, name: 'Alice', passwordHash: 'abc123'},
        debug: true
      });
      assert.deepEqual(result, {user: {id: 1, name: 'Alice'}});
    });

    it('handles deeply nested objects', () => {
      const serializers = compileResponseSerializers({
        200: {
          type: 'object',
          properties: {
            a: {
              type: 'object',
              properties: {
                b: {
                  type: 'object',
                  properties: {
                    c: {type: 'string'}
                  }
                }
              }
            }
          }
        }
      });
      const project = resolveSerializer(serializers, 200);
      const result = project({a: {b: {c: 'deep', extra: 'gone'}, extra: 'gone'}, extra: 'gone'});
      assert.deepEqual(result, {a: {b: {c: 'deep'}}});
    });
  });

  describe('projection: array', () => {
    it('projects each element in an array of objects', () => {
      const serializers = compileResponseSerializers({
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {id: {type: 'number'}, name: {type: 'string'}}
          }
        }
      });
      const project = resolveSerializer(serializers, 200);
      const result = project([
        {id: 1, name: 'Alice', secret: 'x'},
        {id: 2, name: 'Bob', secret: 'y'}
      ]);
      assert.deepEqual(result, [
        {id: 1, name: 'Alice'},
        {id: 2, name: 'Bob'}
      ]);
    });

    it('returns non-array values unchanged for array schema', () => {
      const serializers = compileResponseSerializers({
        200: {
          type: 'array',
          items: {type: 'object', properties: {id: {type: 'number'}}}
        }
      });
      const project = resolveSerializer(serializers, 200);
      assert.equal(project('not-an-array'), 'not-an-array');
    });

    it('handles nested arrays of objects', () => {
      const serializers = compileResponseSerializers({
        200: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {id: {type: 'number'}}
              }
            }
          }
        }
      });
      const project = resolveSerializer(serializers, 200);
      const result = project({
        items: [
          {id: 1, secret: 'a'},
          {id: 2, secret: 'b'}
        ],
        extra: 'gone'
      });
      assert.deepEqual(result, {items: [{id: 1}, {id: 2}]});
    });
  });

  describe('projection: pass-through schemas', () => {
    it('passes through primitive type schemas', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'string'}
      });
      const project = resolveSerializer(serializers, 200);
      assert.equal(project('hello'), 'hello');
    });

    it('passes through schema with no type', () => {
      const serializers = compileResponseSerializers({
        200: {description: 'anything'}
      });
      const project = resolveSerializer(serializers, 200);
      const obj = {a: 1, b: 2};
      assert.deepEqual(project(obj), obj);
    });

    it('passes through object schema without properties', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'object'}
      });
      const project = resolveSerializer(serializers, 200);
      const obj = {a: 1, b: 2};
      assert.deepEqual(project(obj), obj);
    });

    it('passes through array schema without items', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'array'}
      });
      const project = resolveSerializer(serializers, 200);
      const arr = [1, 2, 3];
      assert.deepEqual(project(arr), arr);
    });

    it('passes through anyOf/oneOf schemas (no stripping)', () => {
      const serializers = compileResponseSerializers({
        200: {
          anyOf: [{type: 'object', properties: {id: {type: 'number'}}}, {type: 'string'}]
        }
      });
      const project = resolveSerializer(serializers, 200);
      const obj = {id: 1, extra: 'kept'};
      assert.deepEqual(project(obj), {id: 1, extra: 'kept'});
    });
  });

  describe('projection: edge cases', () => {
    it('handles empty properties object', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'object', properties: {}}
      });
      const project = resolveSerializer(serializers, 200);
      const result = project({a: 1, b: 2});
      assert.deepEqual(result, {});
    });

    it('handles empty array input', () => {
      const serializers = compileResponseSerializers({
        200: {
          type: 'array',
          items: {type: 'object', properties: {id: {type: 'number'}}}
        }
      });
      const project = resolveSerializer(serializers, 200);
      assert.deepEqual(project([]), []);
    });

    it('handles property value of undefined', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'object', properties: {id: {type: 'number'}, name: {type: 'string'}}}
      });
      const project = resolveSerializer(serializers, 200);
      const result = project({id: 1, name: undefined});
      assert.ok('name' in result, 'undefined values are included via in check');
      assert.equal(result.name, undefined);
    });

    it('handles property value of null', () => {
      const serializers = compileResponseSerializers({
        200: {type: 'object', properties: {id: {type: 'number'}, name: {type: 'string'}}}
      });
      const project = resolveSerializer(serializers, 200);
      const result = project({id: 1, name: null});
      assert.equal(result.name, null);
    });
  });
});
