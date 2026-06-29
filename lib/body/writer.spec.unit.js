/**
 * @fileoverview Layer 1 boundary tests for lib/body/writer and lib/body/multiparse.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {pipeline, Readable} from 'node:stream';
import {promisify} from 'node:util';
import createWriter from './writer.js';
import multiparse from './multiparse.js';

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
