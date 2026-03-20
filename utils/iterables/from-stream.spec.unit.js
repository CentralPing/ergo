/**
 * @fileoverview Layer 1 boundary tests for utils/iterables/from-stream.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import fromStream from './from-stream.js';

describe('[Boundary] utils/iterables/from-stream', () => {
  it('returns the same stream object (identity function)', () => {
    const readable = Readable.from(['a', 'b']);
    assert.equal(fromStream(readable), readable);
  });

  it('the returned stream is async-iterable', async () => {
    const readable = Readable.from(['hello', ' ', 'world']);
    const chunks = [];
    for await (const chunk of fromStream(readable)) {
      chunks.push(chunk.toString());
    }
    assert.deepEqual(chunks, ['hello', ' ', 'world']);
  });

  it('works with a push-mode Readable stream', async () => {
    const readable = new Readable({read() {}});
    setImmediate(() => {
      readable.push('chunk1');
      readable.push('chunk2');
      readable.push(null);
    });
    const chunks = [];
    for await (const chunk of fromStream(readable)) {
      chunks.push(chunk.toString());
    }
    assert.deepEqual(chunks.join(''), 'chunk1chunk2');
  });
});
