/**
 * @fileoverview Layer 1 boundary tests for lib/body/writer, lib/body/multiparse,
 * and lib/body/multipart/headers.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {pipeline, Readable} from 'node:stream';
import {promisify} from 'node:util';
import createWriter from './writer.js';
import multiparse from './multiparse.js';
import parseHeaders from './multipart/headers.js';

const pipelineAsync = promisify(pipeline);

// ---------------------------------------------------------------------------
// lib/body/writer
// ---------------------------------------------------------------------------
describe('[Boundary] lib/body/writer', () => {
  it('accumulates all incoming chunks into a single Buffer', async () => {
    const w = createWriter();
    await pipelineAsync(Readable.from([Buffer.from('hello '), Buffer.from('world')]), w);
    assert.equal(w.data.toString(), 'hello world');
  });

  it('accepts string chunks and converts them to Buffer', async () => {
    const w = createWriter();
    await pipelineAsync(Readable.from(['abc', 'def']), w);
    assert.equal(w.data.toString(), 'abcdef');
  });

  it('returns an empty Buffer for an empty stream', async () => {
    const w = createWriter();
    await pipelineAsync(Readable.from([]), w);
    assert.equal(w.data.length, 0);
  });

  it('data getter returns the consolidated Buffer after stream ends', async () => {
    const w = createWriter();
    await pipelineAsync(Readable.from([Buffer.from('x')]), w);
    assert.ok(Buffer.isBuffer(w.data));
  });
});

// ---------------------------------------------------------------------------
// lib/body/multipart/headers
// ---------------------------------------------------------------------------
describe('[Boundary] lib/body/multipart/headers', () => {
  it('parses a Content-Disposition header with name parameter', () => {
    const result = parseHeaders(['Content-Disposition: form-data; name="field1"']);
    assert.ok(result['content-disposition']);
    assert.equal(result['content-disposition'].type.trim(), 'form-data');
    assert.equal(result['content-disposition'].parameters.name, 'field1');
  });

  it('parses a Content-Disposition header with name and filename', () => {
    const result = parseHeaders([
      'Content-Disposition: form-data; name="file"; filename="upload.txt"'
    ]);
    assert.equal(result['content-disposition'].parameters.name, 'file');
    assert.equal(result['content-disposition'].parameters.filename, 'upload.txt');
  });

  it('parses a Content-Type header', () => {
    const result = parseHeaders([
      'Content-Disposition: form-data; name="pic"',
      'Content-Type: image/png; '
    ]);
    assert.ok(result['content-type']);
  });

  it('ignores headers not in the allowed list', () => {
    const result = parseHeaders(['X-Custom-Header: value; ']);
    assert.equal(result['x-custom-header'], undefined);
  });

  it('returns the default headers object when no lines are passed', () => {
    const result = parseHeaders([]);
    assert.ok(result['content-type']);
  });

  it('skips lines that do not match the header regex', () => {
    const result = parseHeaders(['not-a-valid-header']);
    // Should not throw; just returns default headers
    assert.ok(result);
  });
});

// ---------------------------------------------------------------------------
// lib/body/multiparse
// ---------------------------------------------------------------------------
describe('[Boundary] lib/body/multiparse', () => {
  /**
   * Build a multipart/form-data body buffer from parts.
   * @param {string} boundary - Multipart boundary string
   * @param {Array<{name: string, value: string, filename?: string, contentType?: string}>} parts - Form parts to encode
   * @returns {import('node:buffer').Buffer} - Multipart/form-data body buffer
   */
  function buildMultipart(boundary, parts) {
    const lines = [];
    for (const part of parts) {
      lines.push(`--${boundary}`);
      if (part.filename) {
        lines.push(
          `Content-Disposition: form-data; name="${part.name}"; filename="${part.filename}"`
        );
        lines.push(`Content-Type: ${part.contentType ?? 'application/octet-stream'}`);
      } else {
        lines.push(`Content-Disposition: form-data; name="${part.name}"`);
      }
      lines.push('');
      lines.push(part.value);
    }
    lines.push(`--${boundary}--`);
    return Buffer.from(lines.join('\r\n'));
  }

  it('parses a simple text field from multipart body', () => {
    const boundary = 'TestBoundary123';
    const body = buildMultipart(boundary, [{name: 'username', value: 'alice'}]);
    const parts = multiparse(body, boundary);
    assert.equal(parts.length, 1);
    assert.equal(parts[0].name, 'username');
    assert.equal(parts[0].body.toString(), 'alice');
  });

  it('parses multiple fields', () => {
    const boundary = 'B0undary';
    const body = buildMultipart(boundary, [
      {name: 'first', value: 'foo'},
      {name: 'second', value: 'bar'}
    ]);
    const parts = multiparse(body, boundary);
    assert.equal(parts.length, 2);
    assert.equal(parts[0].name, 'first');
    assert.equal(parts[1].name, 'second');
  });

  it('parses a file upload field with filename', () => {
    const boundary = 'FileBoundary';
    const body = buildMultipart(boundary, [
      {name: 'upload', value: 'file-content', filename: 'test.txt', contentType: 'text/plain'}
    ]);
    const parts = multiparse(body, boundary);
    assert.equal(parts.length, 1);
    assert.equal(parts[0].name, 'upload');
    assert.equal(parts[0].filename, 'test.txt');
    assert.equal(parts[0].body.toString(), 'file-content');
  });

  it('returns an empty array for an empty body', () => {
    const parts = multiparse(Buffer.from(''), 'boundary');
    assert.equal(parts.length, 0);
  });

  it('returns headers object on each part', () => {
    const boundary = 'HDR';
    const body = buildMultipart(boundary, [{name: 'field', value: 'value'}]);
    const parts = multiparse(body, boundary);
    assert.ok(parts[0].headers);
    assert.ok(parts[0].headers['content-disposition']);
  });

  it('accepts a string body (converts to Buffer internally)', () => {
    const boundary = 'StrBoundary';
    const body = buildMultipart(boundary, [{name: 'f', value: 'v'}]);
    const parts = multiparse(body.toString(), boundary);
    assert.ok(parts.length >= 1);
  });
});
