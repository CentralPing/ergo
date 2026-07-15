/**
 * @fileoverview Layer 1 boundary tests for utils/set.js.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import set, {PATH_TRAVERSE_ERROR_CODE, trySet} from './set.js';

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

  it('reuses an existing intermediate object when property already exists', () => {
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

  describe('strict array-index detection (#353)', () => {
    for (const segment of ['', '-1', 'Infinity', '0x1', '1e2']) {
      it(`does not create an Array for coerced-but-non-index segment ${JSON.stringify(segment)}`, () => {
        const obj = Object.create(null);
        set(obj, `x.${segment}.y`, 1);
        assert.equal(
          Array.isArray(obj.x),
          false,
          `expected object for segment ${JSON.stringify(segment)}`
        );
        assert.equal(Object.getPrototypeOf(obj.x), null);
        assert.equal(obj.x[segment].y, 1);
      });
    }

    it('creates an Array for digit-only index segments', () => {
      const obj = Object.create(null);
      set(obj, 'items.42', 'v');
      assert.ok(Array.isArray(obj.items));
      assert.equal(obj.items[42], 'v');
    });
  });

  describe('path-conflict type guard (#354)', () => {
    it('throws descriptive TypeError with PATH_TRAVERSE_ERROR_CODE for primitive intermediate', () => {
      const obj = {a: 42};
      assert.throws(
        () => set(obj, 'a.b', 1),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("Cannot traverse path 'a.b'") &&
          err.message.includes("'a' is number")
      );
      assert.equal(obj.a, 42);
    });

    it('throws for null intermediate', () => {
      const obj = {a: null};
      assert.throws(
        () => set(obj, 'a.b', 1),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("'a' is null")
      );
      assert.equal(obj.a, null);
    });

    it('reuses an existing array intermediate', () => {
      const arr = ['keep'];
      const obj = {tags: arr};
      set(obj, 'tags.1', 'next');
      assert.equal(obj.tags, arr);
      assert.equal(obj.tags[1], 'next');
    });

    it('reuses an existing function intermediate', () => {
      const handler = () => {};
      const obj = {handler};
      set(obj, 'handler.timeout', 500);
      assert.equal(obj.handler, handler);
      assert.equal(obj.handler.timeout, 500);
    });
  });

  describe('trySet', () => {
    it('returns true when the value is set', () => {
      const obj = Object.create(null);
      assert.equal(trySet(obj, 'a.b', 1), true);
      assert.equal(obj.a.b, 1);
    });

    it('returns false on path-conflict TypeError without mutating past the conflict', () => {
      const obj = {a: 42};
      assert.equal(trySet(obj, 'a.b', 1), false);
      assert.equal(obj.a, 42);
    });

    it('rethrows unexpected TypeErrors (not path-conflict)', () => {
      const obj = Object.preventExtensions(Object.create(null));
      assert.throws(() => trySet(obj, 'a.b', 1), TypeError);
    });
  });
});
