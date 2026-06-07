/**
 * @fileoverview Boundary tests for factory-time option key validation.
 * @module lib/validate-options.spec.unit
 */
import {describe, it, beforeEach} from 'node:test';
import assert from 'node:assert/strict';

import {levenshtein, findSuggestion, validateOptions} from './validate-options.js';

describe('levenshtein', () => {
  it('should return 0 for identical strings', () => {
    assert.equal(levenshtein('abc', 'abc'), 0);
  });

  it('should return the length of the other string when one is empty', () => {
    assert.equal(levenshtein('', 'abc'), 3);
    assert.equal(levenshtein('abc', ''), 3);
  });

  it('should return 0 for two empty strings', () => {
    assert.equal(levenshtein('', ''), 0);
  });

  it('should compute single-character substitution', () => {
    assert.equal(levenshtein('cat', 'car'), 1);
  });

  it('should compute single-character insertion', () => {
    assert.equal(levenshtein('type', 'types'), 1);
  });

  it('should compute single-character deletion', () => {
    assert.equal(levenshtein('types', 'type'), 1);
  });

  it('should compute multi-character edits', () => {
    assert.equal(levenshtein('kitten', 'sitting'), 3);
  });

  it('should be symmetric', () => {
    assert.equal(levenshtein('abc', 'xyz'), levenshtein('xyz', 'abc'));
  });
});

describe('findSuggestion', () => {
  const validKeys = new Set(['types', 'languages', 'charsets', 'encodings', 'throwIfFail']);

  it('should find a close match within threshold', () => {
    assert.equal(findSuggestion('type', validKeys), 'types');
  });

  it('should find the closest match when multiple are close', () => {
    assert.equal(findSuggestion('encoding', validKeys), 'encodings');
  });

  it('should return undefined when no match is within threshold', () => {
    assert.equal(findSuggestion('completelyDifferentKey', validKeys), undefined);
  });

  it('should return exact match when present', () => {
    assert.equal(findSuggestion('types', validKeys), 'types');
  });

  it('should handle single-character valid keys', () => {
    const small = new Set(['a', 'b', 'c']);
    assert.equal(findSuggestion('d', small), 'a');
  });
});

describe('validateOptions', () => {
  const validKeys = new Set(['types', 'languages', 'charsets', 'encodings', 'throwIfFail']);
  let warnings;

  beforeEach(() => {
    warnings = [];
    process.emitWarning = (msg, opts) => {
      warnings.push({message: msg, ...opts});
    };
  });

  it('should be a no-op for null options', () => {
    validateOptions(null, validKeys, 'test');
    assert.equal(warnings.length, 0);
  });

  it('should be a no-op for undefined options', () => {
    validateOptions(undefined, validKeys, 'test');
    assert.equal(warnings.length, 0);
  });

  it('should be a no-op when all keys are valid', () => {
    validateOptions({types: ['application/json'], throwIfFail: true}, validKeys, 'test');
    assert.equal(warnings.length, 0);
  });

  it('should be a no-op for an empty options object', () => {
    validateOptions({}, validKeys, 'test');
    assert.equal(warnings.length, 0);
  });

  it('should emit a warning for unknown keys', () => {
    validateOptions({type: ['application/json']}, validKeys, 'accepts');
    assert.equal(warnings.length, 1);
    assert.equal(warnings[0].type, 'ErgoWarning');
    assert.match(warnings[0].code, /^ERGO_ACCEPTS_UNKNOWN_OPTION$/);
    assert.match(warnings[0].message, /did you mean "types"/);
  });

  it('should include all unknown keys in the warning', () => {
    validateOptions({type: ['json'], lang: ['en']}, validKeys, 'accepts');
    assert.equal(warnings.length, 1);
    assert.match(warnings[0].message, /"type"/);
    assert.match(warnings[0].message, /"lang"/);
  });

  it('should not suggest when edit distance exceeds threshold', () => {
    validateOptions({completelyWrongKey: true}, validKeys, 'accepts');
    assert.equal(warnings.length, 1);
    assert.doesNotMatch(warnings[0].message, /did you mean/);
  });

  it('should deduplicate warnings for identical key sets', () => {
    validateOptions({unknownDedupTestA: true}, validKeys, 'dedupTest');
    validateOptions({unknownDedupTestA: true}, validKeys, 'dedupTest');
    assert.equal(warnings.length, 1);
  });

  it('should emit separate warnings for different key sets', () => {
    validateOptions({unknownDedupTestB: true}, validKeys, 'dedupDiffTest');
    validateOptions({unknownDedupTestC: true}, validKeys, 'dedupDiffTest');
    assert.equal(warnings.length, 2);
  });

  it('should list valid options in the warning message', () => {
    validateOptions({badKey123: true}, validKeys, 'listTest');
    assert.match(warnings[0].message, /Valid options are:/);
    assert.match(warnings[0].message, /charsets/);
    assert.match(warnings[0].message, /types/);
  });

  it('should generate correct warning code for camelCase middleware names', () => {
    validateOptions({bad: true}, new Set(['good']), 'cacheControl');
    assert.equal(warnings.length, 1);
    assert.equal(warnings[0].code, 'ERGO_CACHE_CONTROL_UNKNOWN_OPTION');
  });
});
