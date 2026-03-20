/**
 * @fileoverview Layer 1 boundary tests for utils/set.js.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import set from './set.js';

describe('[Boundary] utils/set', () => {
  it('sets a top-level property', () => {
    const obj = {};
    set(obj, 'a', 42);
    assert.equal(obj.a, 42);
  });

  it('sets a deeply nested property, creating intermediate objects', () => {
    const obj = {};
    set(obj, 'a.b.c', 99);
    assert.equal(obj.a.b.c, 99);
  });

  it('reuses an existing intermediate object (L26: hasOwn short-circuit)', () => {
    const inner = {existing: true};
    const obj = {a: inner};
    set(obj, 'a.b', 'new');
    // a should still be the same object reference
    assert.equal(obj.a, inner, 'should reuse the existing intermediate object');
    assert.equal(obj.a.b, 'new');
    assert.equal(obj.a.existing, true, 'should preserve existing properties');
  });

  it('creates an array when the next path segment is a numeric string', () => {
    const obj = {};
    set(obj, 'tags.0', 'first');
    assert.ok(Array.isArray(obj.tags), 'tags should be an Array');
    assert.equal(obj.tags[0], 'first');
  });

  it('creates a plain object when the next path segment is non-numeric', () => {
    const obj = {};
    set(obj, 'meta.title', 'hello');
    assert.ok(!Array.isArray(obj.meta), 'meta should be a plain object');
    assert.equal(obj.meta.title, 'hello');
  });

  it('returns the value that was set', () => {
    const obj = {};
    const result = set(obj, 'x', 'val');
    assert.equal(result, 'val');
  });

  it('creates null-prototype intermediate objects (no prototype pollution)', () => {
    const obj = Object.create(null);
    set(obj, '__proto__.polluted', 'yes');
    assert.equal({}.polluted, undefined, 'Object.prototype must not be polluted');
  });

  it('intermediate nested objects have null prototype', () => {
    const obj = Object.create(null);
    set(obj, 'a.b', 42);
    assert.equal(Object.getPrototypeOf(obj.a), null);
  });
});
