import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import sanitizeQuotedString from './sanitize-quoted-string.js';

describe('[Module] lib/sanitize-quoted-string', () => {
  it('escapes backslashes', () => {
    assert.equal(sanitizeQuotedString('a\\b'), 'a\\\\b');
  });

  it('escapes double-quotes', () => {
    assert.equal(sanitizeQuotedString('say "hi"'), 'say \\"hi\\"');
  });

  it('escapes backslash before quotes (correct ordering)', () => {
    assert.equal(sanitizeQuotedString('a\\"b'), 'a\\\\\\"b');
  });

  it('strips NUL, CR, and LF', () => {
    assert.equal(sanitizeQuotedString('a\0b\rc\nd'), 'abcd');
  });

  it('strips all CTL characters except HTAB', () => {
    const ctls = Array.from({length: 32}, (_, i) => String.fromCharCode(i)).join('');
    const del = String.fromCharCode(0x7f);
    const result = sanitizeQuotedString(ctls + del);
    assert.equal(result, '\t', 'only HTAB (0x09) should survive');
  });

  it('preserves HTAB (0x09) as valid qdtext', () => {
    assert.equal(sanitizeQuotedString('a\tb'), 'a\tb');
  });

  it('preserves printable ASCII characters', () => {
    const printable = 'Hello, World! 123 @#$%';
    assert.equal(sanitizeQuotedString(printable), printable);
  });

  it('preserves UTF-8 characters', () => {
    assert.equal(sanitizeQuotedString('café'), 'café');
  });

  it('coerces non-string input to string', () => {
    assert.equal(sanitizeQuotedString(42), '42');
    assert.equal(sanitizeQuotedString(null), 'null');
    assert.equal(sanitizeQuotedString(undefined), 'undefined');
  });
});
