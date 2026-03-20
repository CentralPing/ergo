/**
 * @fileoverview Layer 1 boundary tests for utils/streams (meter, tee) and barrel index.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {pipeline, Readable, Writable} from 'node:stream';
import {promisify} from 'node:util';
import createMeter from './meter.js';
import createTee from './tee.js';
import * as barrelIndex from './index.js';

const pipelineAsync = promisify(pipeline);

// ---------------------------------------------------------------------------
// Barrel index
// ---------------------------------------------------------------------------
describe('[Boundary] utils/streams/index barrel', () => {
  it('exports meter', () => assert.equal(typeof barrelIndex.meter, 'function'));
  it('exports tee', () => assert.equal(typeof barrelIndex.tee, 'function'));
});

// ---------------------------------------------------------------------------
// Helper: collect all data from a Writable into a Buffer
// ---------------------------------------------------------------------------
function collectWritable() {
  const chunks = [];
  const w = new Writable({
    write(chunk, enc, cb) {
      chunks.push(chunk);
      cb();
    }
  });
  w.getData = () => Buffer.concat(chunks);
  return w;
}

// ---------------------------------------------------------------------------
// utils/streams/meter
// ---------------------------------------------------------------------------
describe('[Boundary] utils/streams/meter', () => {
  it('passes data through unchanged', async () => {
    const m = createMeter();
    const sink = collectWritable();
    const input = Buffer.from('hello world');
    await pipelineAsync(Readable.from([input]), m, sink);
    assert.equal(sink.getData().toString(), 'hello world');
  });

  it('counts bytes read', async () => {
    const m = createMeter();
    const sink = collectWritable();
    await pipelineAsync(Readable.from([Buffer.from('hello')]), m, sink);
    assert.equal(m.bytesRead, 5);
  });

  it('accumulates bytes across multiple chunks', async () => {
    const m = createMeter();
    const sink = collectWritable();
    await pipelineAsync(Readable.from([Buffer.from('abc'), Buffer.from('defgh')]), m, sink);
    assert.equal(m.bytesRead, 8);
  });

  it('emits an error when byte count exceeds limit', async () => {
    const m = createMeter({limit: 3});
    const sink = collectWritable();
    let err;
    try {
      await pipelineAsync(Readable.from([Buffer.from('hello')]), m, sink);
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should emit an error when limit exceeded');
    // The plain-object error may be wrapped by stream.pipeline; check truthy shape
    const errObj = err?.type ? err : (err?.cause ?? err);
    assert.equal(errObj?.type ?? err?.type, 'TooLarge');
  });

  it('emits InvalidLength when bytes exceed expected', async () => {
    const m = createMeter({expected: 2});
    const sink = collectWritable();
    let err;
    try {
      await pipelineAsync(Readable.from([Buffer.from('hello')]), m, sink);
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    const errObj = err?.type ? err : (err?.cause ?? err);
    assert.equal(errObj?.type, 'InvalidLength');
  });

  it('emits InvalidLength in final() when received bytes do not match expected', async () => {
    const m = createMeter({expected: 10});
    const sink = collectWritable();
    let err;
    try {
      await pipelineAsync(Readable.from([Buffer.from('hi')]), m, sink);
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    const errObj = err?.type ? err : (err?.cause ?? err);
    assert.equal(errObj?.type, 'InvalidLength');
  });

  it('does not error when bytes exactly match expected', async () => {
    const m = createMeter({expected: 5});
    const sink = collectWritable();
    await pipelineAsync(Readable.from([Buffer.from('hello')]), m, sink);
    assert.equal(m.bytesRead, 5);
  });
});

// ---------------------------------------------------------------------------
// utils/streams/tee
// ---------------------------------------------------------------------------
describe('[Boundary] utils/streams/tee', () => {
  it('passes data through unchanged when no generator is provided', async () => {
    const t = createTee();
    const sink = collectWritable();
    await pipelineAsync(Readable.from([Buffer.from('pass through')]), t, sink);
    assert.equal(sink.getData().toString(), 'pass through');
  });

  it('calls the generator with each chunk', async () => {
    const received = [];
    function* observer() {
      while (true) {
        const chunk = yield;
        if (chunk === undefined) break;
        received.push(chunk.toString());
      }
    }

    const gen = observer();
    gen.next(); // prime

    const t = createTee(gen);
    const sink = collectWritable();
    await pipelineAsync(Readable.from([Buffer.from('chunk1'), Buffer.from('chunk2')]), t, sink);

    assert.deepEqual(received, ['chunk1', 'chunk2']);
    assert.equal(sink.getData().toString(), 'chunk1chunk2');
  });

  it('still passes data even when the generator throws', async () => {
    function* errorGen() {
      yield;
      throw new Error('generator error');
    }
    const gen = errorGen();
    gen.next();

    const t = createTee(gen);
    const sink = collectWritable();
    let err;
    try {
      await pipelineAsync(Readable.from([Buffer.from('data')]), t, sink);
    } catch (e) {
      err = e;
    }
    // The tee captures the error and forwards it as a stream error
    assert.ok(err, 'stream should propagate the generator error');
  });

  it('calls generator.return() in the final() callback', async () => {
    let returnCalled = false;
    function* trackReturn() {
      try {
        while (true) yield;
      } finally {
        returnCalled = true;
      }
    }
    const gen = trackReturn();
    gen.next();

    const t = createTee(gen);
    const sink = collectWritable();
    await pipelineAsync(Readable.from([Buffer.from('x')]), t, sink);
    assert.ok(returnCalled);
  });
});
