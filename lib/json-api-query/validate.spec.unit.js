import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {validate as createValidator, schema} from './index.js';

// validate is a factory: createValidator(options?) returns a compiled AJV validator function.
// The compiled validator returns true/false and has a .errors property.
const compiled = createValidator();

describe('[Boundary] lib/json-api-query/validate', () => {
  it('exports validate factory and schema object', () => {
    assert.equal(typeof createValidator, 'function');
    assert.equal(typeof schema, 'object');
  });

  it('returns true for an empty query', () => {
    assert.equal(compiled({}), true);
  });

  it('accepts valid fields parameter', () => {
    assert.equal(compiled({fields: {articles: ['title', 'body']}}), true);
  });

  it('accepts valid include parameter', () => {
    assert.equal(compiled({include: ['author', 'tags']}), true);
  });

  it('accepts valid sort parameter', () => {
    assert.equal(compiled({sort: ['-created', 'name']}), true);
  });

  it('accepts valid offset-based pagination', () => {
    assert.equal(compiled({page: {offset: 0, limit: 20}}), true);
  });

  it('accepts valid page number pagination', () => {
    assert.equal(compiled({page: {number: 1, size: 10}}), true);
  });

  it('accepts cursor-based pagination', () => {
    assert.equal(compiled({page: {cursor: 'abc123'}}), true);
  });

  it('returns false for invalid fields type', () => {
    assert.equal(compiled({fields: 'not-an-object'}), false);
  });

  it('compiled.errors is populated on failure', () => {
    compiled({fields: 'not-an-object'});
    assert.ok(Array.isArray(compiled.errors));
    assert.ok(compiled.errors.length > 0);
  });

  it('schema is exported as a non-empty object', () => {
    assert.ok(schema && typeof schema === 'object');
    assert.ok(Object.keys(schema).length > 0);
  });
});
