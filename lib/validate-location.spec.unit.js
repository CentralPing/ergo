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
  });

  describe('rejects dangerous schemes', () => {
    it('throws TypeError for javascript: scheme', () => {
      assert.throws(() => validateLocation('javascript:alert(1)'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "javascript"/
      });
    });

    it('throws TypeError for data: scheme', () => {
      assert.throws(() => validateLocation('data:text/html,<script>alert(1)</script>'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "data"/
      });
    });

    it('throws TypeError for vbscript: scheme', () => {
      assert.throws(() => validateLocation('vbscript:MsgBox("xss")'), {
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

  describe('whitespace bypass prevention', () => {
    it('throws for tab-prefixed javascript:', () => {
      assert.throws(() => validateLocation('\tjavascript:alert(1)'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "javascript"/
      });
    });

    it('throws for space-prefixed javascript:', () => {
      assert.throws(() => validateLocation(' javascript:alert(1)'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "javascript"/
      });
    });

    it('throws for multiple-space-prefixed data:', () => {
      assert.throws(() => validateLocation('   data:text/html,xss'), {
        name: 'TypeError',
        message: /dangerous URI scheme: "data"/
      });
    });
  });
});
