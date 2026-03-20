import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import type from './type.js';

describe('[Boundary] utils/type', () => {
  it('returns Number for numbers', () => {
    assert.equal(type(42), 'Number');
  });
  it('returns NaN for NaN', () => {
    assert.equal(type(NaN), 'NaN');
  });
  it('returns String for strings', () => {
    assert.equal(type('hi'), 'String');
  });
  it('returns Boolean for booleans', () => {
    assert.equal(type(true), 'Boolean');
  });
  it('returns Array for arrays', () => {
    assert.equal(type([]), 'Array');
  });
  it('returns Object for plain objects', () => {
    assert.equal(type({}), 'Object');
  });
  it('returns Null for null', () => {
    assert.equal(type(null), 'Null');
  });
  it('returns Undefined for undefined', () => {
    assert.equal(type(undefined), 'Undefined');
  });
  it('returns RegExp for regex', () => {
    assert.equal(type(/foo/), 'RegExp');
  });
  it('returns Function for functions', () => {
    assert.equal(
      type(() => {}),
      'Function'
    );
  });
  it('returns AsyncFunction for async functions', () => {
    assert.equal(
      type(async () => {}),
      'AsyncFunction'
    );
  });
  it('returns TypeError for TypeError instances', () => {
    assert.equal(type(new TypeError()), 'TypeError');
  });
});
