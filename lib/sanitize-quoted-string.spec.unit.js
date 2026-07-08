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

  it('strips DEL per wire qdtext allowlist', () => {
    assert.equal(sanitizeQuotedString('a\x7fb'), 'ab');
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
