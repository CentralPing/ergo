import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import multiparse from './multiparse.js';

function buildMultipart(parts, boundary) {
  const chunks = [];
  for (const {name, filename, contentType, body} of parts) {
    chunks.push(`--${boundary}\r\n`);
    let disposition = `Content-Disposition: form-data; name="${name}"`;
    if (filename) disposition += `; filename="${filename}"`;
    chunks.push(disposition + '\r\n');
    if (contentType) chunks.push(`Content-Type: ${contentType}\r\n`);
    chunks.push('\r\n');
    chunks.push(body);
    chunks.push('\r\n');
  }
  chunks.push(`--${boundary}--\r\n`);
  return Buffer.from(chunks.join(''));
}

describe('[Module] lib/body/multiparse', () => {
  const boundary = '----TestBoundary';

  it('parses a single text field', () => {
    const raw = buildMultipart([{name: 'field1', body: 'value1'}], boundary);
    const parts = multiparse(raw, boundary);
    assert.equal(parts.length, 1);
    assert.equal(parts[0].name, 'field1');
    assert.equal(parts[0].body.toString(), 'value1');
  });

  it('parses multiple fields', () => {
    const raw = buildMultipart(
      [
        {name: 'a', body: 'alpha'},
        {name: 'b', body: 'beta'}
      ],
      boundary
    );
    const parts = multiparse(raw, boundary);
    assert.equal(parts.length, 2);
    assert.equal(parts[0].name, 'a');
    assert.equal(parts[1].name, 'b');
  });

  it('handles file upload with filename', () => {
    const raw = buildMultipart(
      [{name: 'file', filename: 'upload.txt', contentType: 'text/plain', body: 'file-content'}],
      boundary
    );
    const parts = multiparse(raw, boundary);
    assert.equal(parts.length, 1);
    assert.equal(parts[0].filename, 'upload.txt');
    assert.equal(parts[0].body.toString(), 'file-content');
  });

  it('skips preamble and closing boundary', () => {
    const raw = Buffer.from(
      `preamble text\r\n--${boundary}\r\nContent-Disposition: form-data; name="x"\r\n\r\nval\r\n--${boundary}--\r\n`
    );
    const parts = multiparse(raw, boundary);
    assert.equal(parts.length, 1);
    assert.equal(parts[0].name, 'x');
  });

  it('skips malformed parts without header separator', () => {
    const raw = Buffer.from(
      `--${boundary}\r\nno-separator-here\r\n--${boundary}\r\nContent-Disposition: form-data; name="ok"\r\n\r\ngood\r\n--${boundary}--\r\n`
    );
    const parts = multiparse(raw, boundary);
    assert.equal(parts.length, 1);
    assert.equal(parts[0].name, 'ok');
  });

  it('enforces maxParts limit', () => {
    const fields = Array.from({length: 10}, (_, i) => ({name: `f${i}`, body: `v${i}`}));
    const raw = buildMultipart(fields, boundary);
    const parts = multiparse(raw, boundary, {maxParts: 3});
    assert.equal(parts.length, 3);
  });

  it('handles empty body gracefully', () => {
    const raw = Buffer.from(`--${boundary}--\r\n`);
    const parts = multiparse(raw, boundary);
    assert.equal(parts.length, 0);
  });

  it('uses byte-level check for closing boundary (not toString)', () => {
    const largePadding = Buffer.alloc(1024 * 1024, 0x41);
    const raw = Buffer.concat([
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from(`Content-Disposition: form-data; name="f"\r\n\r\nval\r\n`),
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from('--'),
      largePadding,
      Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);
    const parts = multiparse(raw, boundary);
    assert.equal(parts.length, 1);
  });
});
