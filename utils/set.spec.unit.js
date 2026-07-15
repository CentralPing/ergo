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

  it('creates null-prototype intermediate objects', () => {
    const obj = Object.create(null);
    set(obj, 'a.b', 42);
    assert.equal(Object.getPrototypeOf(obj.a), null);
  });

  describe('forbidden path segments (#383)', () => {
    for (const segment of ['__proto__', 'prototype', 'constructor']) {
      it(`throws PATH_TRAVERSE for forbidden segment ${segment}`, () => {
        const obj = Object.create(null);
        assert.throws(
          () => set(obj, `safe.${segment}.x`, 1),
          err =>
            err instanceof TypeError &&
            err.code === PATH_TRAVERSE_ERROR_CODE &&
            err.message.includes(`'${segment}' is a forbidden path segment`)
        );
        // Failed forbidden paths must leave the target untouched (no partial intermediates).
        assert.equal(Object.hasOwn(obj, 'safe'), false);
      });

      it(`trySet returns false for forbidden segment ${segment}`, () => {
        const obj = Object.create(null);
        assert.equal(trySet(obj, `safe.${segment}`, 1), false);
        assert.equal(Object.hasOwn(obj, 'safe'), false);
      });
    }

    it('blocks writing through function.prototype onto builtins', () => {
      const obj = {c: Object};
      assert.throws(
        () => set(obj, 'c.prototype.gotcha', true),
        err => err instanceof TypeError && err.code === PATH_TRAVERSE_ERROR_CODE
      );
      assert.equal(Object.prototype.gotcha, undefined);
    });

    describe('unsafe intermediates (#386)', () => {
      const cases = [
        ['Object.prototype', Object.prototype, 'isAdmin'],
        ['Array.prototype', Array.prototype, 'pwn'],
        ['Function.prototype', Function.prototype, 'pwn'],
        ['RegExp.prototype', RegExp.prototype, 'pwn'],
        ['Object constructor', Object, 'pwn'],
        ['RegExp constructor', RegExp, 'pwn'],
        ['Math singleton', Math, 'pwn']
      ];

      for (const [label, intermediate, leaf] of cases) {
        it(`throws for ${label} intermediate`, () => {
          const obj = {a: intermediate};
          assert.throws(
            () => set(obj, `a.${leaf}`, true),
            err =>
              err instanceof TypeError &&
              err.code === PATH_TRAVERSE_ERROR_CODE &&
              err.message.includes('shared builtin')
          );
          assert.equal(Object.hasOwn(intermediate, leaf), false);
        });

        it(`trySet returns false for ${label} intermediate`, () => {
          const obj = {a: intermediate};
          assert.equal(trySet(obj, `a.${leaf}`, true), false);
          assert.equal(Object.hasOwn(intermediate, leaf), false);
        });
      }

      it('allows ordinary function intermediates (handler.timeout)', () => {
        const handler = () => {};
        const obj = {handler};
        assert.equal(set(obj, 'handler.timeout', 500), 500);
        assert.equal(handler.timeout, 500);
      });

      it('allows user class instances as intermediates', () => {
        class Box {
          constructor() {
            this.n = 0;
          }
        }
        const box = new Box();
        const obj = {box};
        assert.equal(set(obj, 'box.n', 7), 7);
        assert.equal(box.n, 7);
      });
    });

    it('rejects assigning Array length (sparse-array DoS)', () => {
      const obj = {a: []};
      assert.throws(
        () => set(obj, 'a.length', 50_000_000),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("Array 'length'")
      );
      assert.equal(obj.a.length, 0);
    });

    it('trySet returns false for Array length assignment', () => {
      const obj = {a: []};
      assert.equal(trySet(obj, 'a.length', 50_000_000), false);
      assert.equal(obj.a.length, 0);
    });

    it('allows ordinary own-property length on plain objects', () => {
      const obj = Object.create(null);
      assert.equal(set(obj, 'meta.length', 3), 3);
      assert.equal(obj.meta.length, 3);
    });
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

    it('creates an Array for leading-zero digit segments (/^\\d+$/ accepts 01)', () => {
      const obj = Object.create(null);
      set(obj, 'items.01', 'v');
      assert.ok(Array.isArray(obj.items), 'leading-zero segments create Arrays');
      assert.equal(obj.items['01'], 'v');
      assert.equal(Object.hasOwn(obj.items, '01'), true);
      // Not an ES ArrayIndexName — index 1 is not set by this write
      assert.equal(obj.items[1], undefined);
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
