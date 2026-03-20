/**
 * @fileoverview Layer 1 boundary tests for utils/get.js.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import get from './get.js';

describe('[Boundary] utils/get', () => {
  it('retrieves a top-level property', () => {
    assert.equal(get({a: 1}, 'a'), 1);
  });

  it('traverses a nested dot-notation path', () => {
    assert.equal(get({a: {b: {c: 42}}}, 'a.b.c'), 42);
  });

  it('returns undefined when the path resolves to undefined (single step)', () => {
    assert.equal(get({a: 1}, 'b'), undefined);
  });

  it('invokes function values at each step by default (invoke:true)', () => {
    const obj = {
      a: () => ({b: 99})
    };
    assert.equal(get(obj, 'a.b'), 99);
  });

  it('does NOT invoke function values when invoke:false', () => {
    const fn = () => 'result';
    const obj = {a: {b: fn}};
    assert.equal(get(obj, 'a.b', {invoke: false}), fn);
  });

  it('breaks early and returns undefined when safe:true and a path step is undefined', () => {
    // 'a.missing' returns undefined, 'c' traversal should short-circuit
    const result = get({a: {}}, 'a.missing.c', {safe: true});
    assert.equal(result, undefined);
  });

  it('throws when safe:false (default) and traversing beyond a null value', () => {
    let err;
    try {
      get({a: null}, 'a.b');
    } catch (e) {
      err = e;
    }
    assert.ok(err instanceof TypeError, 'should throw TypeError when traversing null');
  });

  it('safe:true returns undefined for null traversal', () => {
    assert.equal(get({a: null}, 'a.b', {safe: true}), undefined);
    assert.equal(get({a: null}, 'a.b.c', {safe: true}), undefined);
  });

  it('defaults to empty object and empty path without throwing', () => {
    assert.doesNotThrow(() => get());
  });
});
