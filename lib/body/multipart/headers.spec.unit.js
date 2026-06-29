/**
 * @fileoverview Layer 1 boundary tests for lib/body/multipart/headers.
 * @module lib/body/multipart/headers.spec
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import parseHeaders from './headers.js';

describe('[Boundary] lib/body/multipart/headers', () => {
  describe('default behavior', () => {
    it('returns default content-type text/plain when no lines are passed', () => {
      const result = parseHeaders([]);
      assert.deepEqual(result['content-type'], {type: 'text/plain'});
    });

    it('returns default content-type text/plain when called with no arguments', () => {
      const result = parseHeaders();
      assert.deepEqual(result['content-type'], {type: 'text/plain'});
    });

    it('uses custom headers object when provided', () => {
      const custom = {'x-custom': {type: 'custom'}};
      const result = parseHeaders([], custom);
      assert.deepEqual(result['x-custom'], {type: 'custom'});
    });

    it('does not include default content-type when custom headers are provided', () => {
      const result = parseHeaders([], {});
      assert.equal(result['content-type'], undefined);
    });
  });

  describe('valid header parsing', () => {
    it('parses Content-Disposition with name parameter', () => {
      const result = parseHeaders(['Content-Disposition: form-data; name="field1"']);
      assert.equal(result['content-disposition'].type, 'form-data');
      assert.equal(result['content-disposition'].parameters.name, 'field1');
    });

    it('parses Content-Disposition with name and filename parameters', () => {
      const result = parseHeaders([
        'Content-Disposition: form-data; name="file"; filename="upload.txt"'
      ]);
      assert.equal(result['content-disposition'].parameters.name, 'file');
      assert.equal(result['content-disposition'].parameters.filename, 'upload.txt');
    });

    it('parses Content-Type header', () => {
      const result = parseHeaders([
        'Content-Disposition: form-data; name="pic"',
        'Content-Type: image/png; '
      ]);
      assert.equal(result['content-type'].type, 'image/png');
    });

    it('parses Content-Transfer-Encoding header', () => {
      const result = parseHeaders(['Content-Transfer-Encoding: binary; ']);
      assert.equal(result['content-transfer-encoding'].type, 'binary');
    });

    it('stores invalid Content-Transfer-Encoding values verbatim', () => {
      const result = parseHeaders(['Content-Transfer-Encoding: definitely-not-valid; ']);
      assert.equal(result['content-transfer-encoding'].type, 'definitely-not-valid');
    });

    it('parses multiple allowed headers on one part', () => {
      const result = parseHeaders([
        'Content-Disposition: form-data; name="doc"',
        'Content-Type: application/pdf; ',
        'Content-Transfer-Encoding: base64; '
      ]);
      assert.equal(result['content-disposition'].type, 'form-data');
      assert.equal(result['content-type'].type, 'application/pdf');
      assert.equal(result['content-transfer-encoding'].type, 'base64');
    });
  });

  describe('case-insensitive normalization', () => {
    it('normalizes header names to lowercase', () => {
      const result = parseHeaders(['CONTENT-DISPOSITION: form-data; name="f"']);
      assert.ok(result['content-disposition']);
      assert.equal(result['CONTENT-DISPOSITION'], undefined);
    });

    it('normalizes mixed-case header names', () => {
      const result = parseHeaders(['Content-TYPE: text/html; ']);
      assert.ok(result['content-type']);
    });
  });

  describe('directive parsing', () => {
    it('parses quoted directive values', () => {
      const result = parseHeaders(['Content-Disposition: form-data; name="field"']);
      assert.equal(result['content-disposition'].parameters.name, 'field');
    });

    it('parses unquoted directive values', () => {
      const result = parseHeaders(['Content-Disposition: form-data; name=field']);
      assert.equal(result['content-disposition'].parameters.name, 'field');
    });

    it('parses multiple directives', () => {
      const result = parseHeaders([
        'Content-Disposition: form-data; name="file"; filename="test.txt"'
      ]);
      const params = result['content-disposition'].parameters;
      assert.equal(params.name, 'file');
      assert.equal(params.filename, 'test.txt');
    });

    it('produces empty parameters for a header with no directives', () => {
      const result = parseHeaders(['Content-Type: text/plain; ']);
      assert.deepEqual(result['content-type'].parameters, Object.create(null));
    });

    it('handles header type with trailing whitespace before semicolon', () => {
      const result = parseHeaders(['Content-Disposition: form-data; name="x"']);
      assert.equal(result['content-disposition'].type, 'form-data');
    });
  });

  describe('RFC 7578 filtering', () => {
    it('silently drops non-allowed headers', () => {
      const result = parseHeaders(['X-Custom-Header: value; ']);
      assert.equal(result['x-custom-header'], undefined);
    });

    it('retains only the three allowed headers', () => {
      const result = parseHeaders([
        'Content-Disposition: form-data; name="f"',
        'Content-Type: text/plain; ',
        'Content-Transfer-Encoding: 7bit; ',
        'X-Extra: ignored; ',
        'Authorization: Bearer token; '
      ]);
      assert.ok(result['content-disposition']);
      assert.ok(result['content-type']);
      assert.ok(result['content-transfer-encoding']);
      assert.equal(result['x-extra'], undefined);
      assert.equal(result['authorization'], undefined);
    });
  });

  describe('null-prototype verification', () => {
    it('returns an object with null prototype', () => {
      const result = parseHeaders([]);
      assert.equal(Object.getPrototypeOf(result), null);
    });

    it('returns an object with null prototype when custom headers are provided', () => {
      const result = parseHeaders([], {'content-type': {type: 'text/html'}});
      assert.equal(Object.getPrototypeOf(result), null);
    });

    it('creates parameters objects with null prototype', () => {
      const result = parseHeaders(['Content-Disposition: form-data; name="f"']);
      assert.equal(Object.getPrototypeOf(result['content-disposition'].parameters), null);
    });
  });

  describe('Buffer input', () => {
    it('skips an empty Buffer line', () => {
      const result = parseHeaders([Buffer.alloc(0)]);
      assert.deepEqual(result['content-type'], {type: 'text/plain'});
    });

    it('handles Buffer header lines via toString()', () => {
      const buf = Buffer.from('Content-Disposition: form-data; name="buf"');
      const result = parseHeaders([buf]);
      assert.equal(result['content-disposition'].parameters.name, 'buf');
    });

    it('handles mixed Buffer and string header lines', () => {
      const result = parseHeaders([
        Buffer.from('Content-Disposition: form-data; name="mixed"'),
        'Content-Type: text/plain; '
      ]);
      assert.equal(result['content-disposition'].parameters.name, 'mixed');
      assert.equal(result['content-type'].type, 'text/plain');
    });
  });

  describe('malformed input', () => {
    it('skips malformed Content-Disposition lines (missing colon)', () => {
      const result = parseHeaders(['Content-Disposition form-data; name="bad"']);
      assert.deepEqual(result['content-type'], {type: 'text/plain'});
      assert.equal(result['content-disposition'], undefined);
    });

    it('skips lines with no colon', () => {
      const result = parseHeaders(['not-a-valid-header']);
      assert.equal(Object.getPrototypeOf(result), null);
      assert.ok(result['content-type']);
    });

    it('skips empty string lines', () => {
      const result = parseHeaders(['']);
      assert.ok(result['content-type']);
    });

    it('skips lines with only whitespace', () => {
      const result = parseHeaders(['   ']);
      assert.ok(result['content-type']);
    });

    it('preserves valid headers alongside malformed lines', () => {
      const result = parseHeaders([
        'garbage-no-colon',
        'Content-Disposition: form-data; name="ok"',
        ''
      ]);
      assert.equal(result['content-disposition'].parameters.name, 'ok');
    });
  });

  describe('duplicate headers', () => {
    it('uses last-wins when the same allowed header appears twice', () => {
      const result = parseHeaders([
        'Content-Type: text/html; ',
        'Content-Type: application/json; '
      ]);
      assert.equal(result['content-type'].type, 'application/json');
    });
  });

  describe('Content-Type override', () => {
    it('replaces default text/plain when explicit Content-Type is parsed', () => {
      const result = parseHeaders(['Content-Type: image/png; ']);
      assert.equal(result['content-type'].type, 'image/png');
    });

    it('retains default text/plain when no Content-Type header is present', () => {
      const result = parseHeaders(['Content-Disposition: form-data; name="f"']);
      assert.deepEqual(result['content-type'], {type: 'text/plain'});
    });
  });
});
