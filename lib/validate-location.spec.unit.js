import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import validateLocation from './validate-location.js';

describe('[Boundary] lib/validate-location', () => {
  describe('passes through safe values', () => {
    it('passes relative paths', () => {
      assert.equal(validateLocation('/items/1'), '/items/1');
    });

    it('passes relative parent paths', () => {
      assert.equal(validateLocation('../other'), '../other');
    });

    it('passes query-only relative references', () => {
      assert.equal(validateLocation('?foo=bar'), '?foo=bar');
    });

    it('passes absolute URLs with https scheme', () => {
      assert.equal(validateLocation('https://example.com/path'), 'https://example.com/path');
    });

    it('passes absolute URLs with http scheme', () => {
      assert.equal(validateLocation('http://example.com'), 'http://example.com');
    });

    it('passes mailto scheme (not in dangerous set)', () => {
      assert.equal(validateLocation('mailto:user@example.com'), 'mailto:user@example.com');
    });

    it('passes ftp scheme (not in dangerous set)', () => {
      assert.equal(validateLocation('ftp://host/file'), 'ftp://host/file');
    });

    it('passes empty string', () => {
      assert.equal(validateLocation(''), '');
    });

    it('passes values without a colon', () => {
      assert.equal(validateLocation('/no-colon-here'), '/no-colon-here');
    });

    it('passes values with colon but no valid scheme (e.g. port)', () => {
      assert.equal(validateLocation('//localhost:3000/path'), '//localhost:3000/path');
    });

    it('passes well-formed percent-encoded space', () => {
      assert.equal(validateLocation('/path%20value'), '/path%20value');
    });

    it('passes well-formed percent-encoded non-ASCII', () => {
      assert.equal(validateLocation('/items/%E2%9C%93'), '/items/%E2%9C%93');
    });
  });

  describe('rejects dangerous schemes', () => {
    it('throws TypeError for javascript: scheme', () => {
      assert.throws(() => validateLocation('javascript:alert(1)'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "javascript"/
      });
    });

    it('throws TypeError for data: scheme', () => {
      assert.throws(() => validateLocation('data:text/html,xss'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "data"/
      });
    });

    it('throws TypeError for vbscript: scheme', () => {
      assert.throws(() => validateLocation('vbscript:code'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "vbscript"/
      });
    });
  });

  describe('case-insensitive scheme matching', () => {
    it('throws for JavaScript: (mixed case)', () => {
      assert.throws(() => validateLocation('JavaScript:alert(1)'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "javascript"/
      });
    });

    it('throws for JAVASCRIPT: (upper case)', () => {
      assert.throws(() => validateLocation('JAVASCRIPT:alert(1)'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "javascript"/
      });
    });

    it('throws for Data: (capitalized)', () => {
      assert.throws(() => validateLocation('Data:text/html,xss'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "data"/
      });
    });

    it('throws for VBSCRIPT: (upper case)', () => {
      assert.throws(() => validateLocation('VBSCRIPT:code'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "vbscript"/
      });
    });
  });

  describe('rejects invalid URI-reference characters', () => {
    it('throws for space in value', () => {
      assert.throws(() => validateLocation(' javascript:alert(1)'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for NUL character', () => {
      assert.throws(() => validateLocation('/path\x00value'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for tab character', () => {
      assert.throws(() => validateLocation('java\tscript:alert(1)'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for newline character', () => {
      assert.throws(() => validateLocation('java\nscript:alert(1)'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for carriage return character', () => {
      assert.throws(() => validateLocation('java\rscript:alert(1)'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for C0 control \\x01', () => {
      assert.throws(() => validateLocation('/path\x01value'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for C0 control \\x08', () => {
      assert.throws(() => validateLocation('/path\x08value'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for vertical tab \\x0B', () => {
      assert.throws(() => validateLocation('/path\x0Bvalue'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for form feed \\x0C', () => {
      assert.throws(() => validateLocation('/path\x0Cvalue'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for C0 control \\x0E', () => {
      assert.throws(() => validateLocation('/path\x0Evalue'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for C0 control \\x1F', () => {
      assert.throws(() => validateLocation('/path\x1Fvalue'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for DEL \\x7F', () => {
      assert.throws(() => validateLocation('/path\x7Fvalue'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for non-ASCII \\x80', () => {
      assert.throws(() => validateLocation('/path\x80value'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for non-ASCII \\xFF', () => {
      assert.throws(() => validateLocation('/path\xFFvalue'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for bare percent sign', () => {
      assert.throws(() => validateLocation('/path%value'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for malformed percent-encoding %GG', () => {
      assert.throws(() => validateLocation('/path%GGvalue'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for truncated percent-encoding %2', () => {
      assert.throws(() => validateLocation('/path%2'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for mixed control characters in scheme bypass attempt', () => {
      assert.throws(() => validateLocation('j\ta\nv\ra\tscript:alert(1)'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });

    it('throws for angle brackets', () => {
      assert.throws(() => validateLocation('data:text/html,<script>xss</script>'), {
        name: 'TypeError',
        message: /characters not permitted in a URI-reference/
      });
    });
  });
});
