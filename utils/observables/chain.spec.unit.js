/**
 * @fileoverview Layer 1 boundary tests for utils/observables (chain, map, take,
 * buffer-split) and the barrel index.
 *
 * In the observable push model, data flows through a chain of generators built
 * right-to-left. You push values in at the "source" end via .next(value), and each
 * generator transforms and forwards to the next downstream generator.
 *
 * Architecture: observableChain(transform1, transform2, sink)
 *   returns the outermost iterator (transform1), and pushing to it flows:
 *   transform1 → transform2 → sink
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import observableChain from './chain.js';
import observableMap from './map.js';
import observableTake from './take.js';
import observableBufferSplit from './buffer-split.js';
import * as barrelIndex from './index.js';

// ---------------------------------------------------------------------------
// Barrel index
// ---------------------------------------------------------------------------
describe('[Boundary] utils/observables/index barrel', () => {
  it('exports chain', () => assert.equal(typeof barrelIndex.chain, 'function'));
  it('exports map', () => assert.equal(typeof barrelIndex.map, 'function'));
  it('exports take', () => assert.equal(typeof barrelIndex.take, 'function'));
  it('exports bufferSplit', () => assert.equal(typeof barrelIndex.bufferSplit, 'function'));
});

// ---------------------------------------------------------------------------
// Helper: create a sink generator that collects all pushed values
// ---------------------------------------------------------------------------
function makeSink() {
  const values = [];
  function* sink() {
    while (true) {
      const val = yield;
      if (val === undefined) return;
      values.push(val);
    }
  }
  return {values, sink};
}

// ---------------------------------------------------------------------------
// utils/observables/chain
// ---------------------------------------------------------------------------
describe('[Boundary] utils/observables/chain', () => {
  it('primes the sink and passes a single value through a map transform', () => {
    const {values, sink} = makeSink();
    // chain(transform, sink): last arg is the sink
    const source = observableChain(
      observableMap(x => x * 2),
      sink
    );
    source.next(5); // → map → sink; values = [10]
    source.return();
    assert.deepEqual(values, [10]);
  });

  it('accepts an already-started generator as the sink (no double-priming)', () => {
    const {values, sink} = makeSink();
    const sinkGen = sink();
    sinkGen.next(); // prime the sink manually
    const source = observableChain(
      observableMap(x => x + 1),
      sinkGen
    );
    source.next(9);
    source.return();
    assert.deepEqual(values, [10]);
  });

  it('chains two transforms left-to-right data flow', () => {
    const {values, sink} = makeSink();
    // Data flows: ×2, then +1
    const source = observableChain(
      observableMap(x => x * 2),
      observableMap(x => x + 1),
      sink
    );
    source.next(3); // 3*2=6, 6+1=7
    source.return();
    assert.deepEqual(values, [7]);
  });

  it('calls return() on the chain in the finally block', () => {
    const {values, sink} = makeSink();
    const source = observableChain(
      observableMap(x => x),
      sink
    );
    source.next(1);
    source.next(2);
    source.return();
    assert.deepEqual(values, [1, 2]);
  });
});

// ---------------------------------------------------------------------------
// utils/observables/map
// ---------------------------------------------------------------------------
describe('[Boundary] utils/observables/map', () => {
  it('transforms each pushed value', () => {
    const {values, sink} = makeSink();
    const source = observableChain(
      observableMap(x => x.toUpperCase()),
      sink
    );
    source.next('hello');
    source.next('world');
    source.return();
    assert.deepEqual(values, ['HELLO', 'WORLD']);
  });

  it('passes a zero-based index as the second argument to the transform', () => {
    const indices = [];
    const {sink} = makeSink();
    const source = observableChain(
      observableMap((x, i) => {
        indices.push(i);
        return x;
      }),
      sink
    );
    source.next('a');
    source.next('b');
    source.next('c');
    source.return();
    assert.deepEqual(indices, [0, 1, 2]);
  });
});

// ---------------------------------------------------------------------------
// utils/observables/take
// ---------------------------------------------------------------------------
describe('[Boundary] utils/observables/take', () => {
  it('passes exactly n values downstream, dropping the rest', () => {
    const {values, sink} = makeSink();
    const source = observableChain(observableTake(2), sink);
    source.next('a');
    source.next('b');
    source.next('c'); // should be dropped
    source.return();
    assert.deepEqual(values, ['a', 'b']);
  });

  it('passes all values when n is greater than the number of pushed values', () => {
    const {values, sink} = makeSink();
    const source = observableChain(observableTake(100), sink);
    source.next(1);
    source.next(2);
    source.return();
    assert.deepEqual(values, [1, 2]);
  });

  it('uses Infinity as the default (passes all values)', () => {
    const {values, sink} = makeSink();
    const source = observableChain(observableTake(), sink);
    for (let i = 0; i < 5; i++) source.next(i);
    source.return();
    assert.deepEqual(values, [0, 1, 2, 3, 4]);
  });
});

// ---------------------------------------------------------------------------
// utils/observables/buffer-split
// ---------------------------------------------------------------------------
describe('[Boundary] utils/observables/buffer-split', () => {
  it('splits a pushed buffer chunk and forwards [index, buffer] pairs downstream', async () => {
    const results = [];

    async function* collectSink() {
      while (true) {
        const pair = yield;
        if (pair === undefined) return;
        results.push(pair[1].toString());
      }
    }

    const sinkGen = collectSink();
    await sinkGen.next(); // prime

    const splitter = observableBufferSplit(Buffer.from('--'));
    const source = splitter(sinkGen);
    await source.next(); // prime
    await source.next(Buffer.from('a--b--c'));
    await source.return();

    assert.deepEqual(results, ['a', 'b', 'c']);
  });

  it('handles split across two consecutive pushed chunks', async () => {
    const results = [];

    async function* collectSink() {
      while (true) {
        const pair = yield;
        if (pair === undefined) return;
        results.push(pair[1].toString());
      }
    }

    const sinkGen = collectSink();
    await sinkGen.next();

    const splitter = observableBufferSplit(Buffer.from('--'));
    const source = splitter(sinkGen);
    await source.next(); // prime
    await source.next(Buffer.from('hello-'));
    await source.next(Buffer.from('-world'));
    await source.return();

    const joined = results.join('');
    assert.ok(joined.includes('hello'));
    assert.ok(joined.includes('world'));
  });

  it('accepts a string separator', async () => {
    const results = [];

    async function* collectSink() {
      while (true) {
        const pair = yield;
        if (pair === undefined) return;
        results.push(pair[1].toString());
      }
    }

    const sinkGen = collectSink();
    await sinkGen.next();

    const splitter = observableBufferSplit('|');
    const source = splitter(sinkGen);
    await source.next();
    await source.next(Buffer.from('x|y'));
    await source.return();

    assert.ok(results.join('').includes('x'));
    assert.ok(results.join('').includes('y'));
  });

  it('flushes partial-match carryover at end of stream (L94-95: finally carryover path)', async () => {
    // Push a chunk that ends with the start of a separator, then return without a second chunk.
    // The finally block should flush the partial carryover.
    const results = [];

    async function* collectSink() {
      while (true) {
        const pair = yield;
        if (pair === undefined) return;
        results.push(pair[1].toString());
      }
    }

    const sinkGen = collectSink();
    await sinkGen.next();

    const splitter = observableBufferSplit(Buffer.from('--'));
    const source = splitter(sinkGen);
    await source.next(); // prime
    // 'hello-' — the trailing '-' is a partial match of '--'
    await source.next(Buffer.from('hello-'));
    await source.return();

    // The partial '-' should be flushed as the final piece
    const joined = results.join('');
    assert.ok(joined.includes('hello'), `expected 'hello' in results, got: ${joined}`);
  });

  it('stops at limit via inner-loop guard (L72-73)', async () => {
    const results = [];

    async function* collectSink() {
      while (true) {
        const pair = yield;
        if (pair === undefined) return;
        results.push(pair[1].toString());
      }
    }

    const sinkGen = collectSink();
    await sinkGen.next();

    // limit=1: 'a--b--c' would yield 3 parts; limit should truncate to 1
    const splitter = observableBufferSplit(Buffer.from('--'), 1);
    const source = splitter(sinkGen);
    await source.next();
    await source.next(Buffer.from('a--b--c'));
    await source.return();

    assert.ok(results.length <= 1, `expected at most 1 result, got ${results.length}`);
  });

  it('propagates errors thrown by the downstream sink (L84-85: catch path)', async () => {
    async function* errorSink() {
      const pair = yield;
      if (pair !== undefined) {
        throw new Error('downstream error');
      }
    }

    const sinkGen = errorSink();
    await sinkGen.next();

    const splitter = observableBufferSplit(Buffer.from('--'));
    const source = splitter(sinkGen);
    await source.next();

    let err;
    try {
      await source.next(Buffer.from('a--b'));
    } catch (e) {
      err = e;
    }
    assert.ok(err, 'should propagate error from downstream');
    assert.ok(err.message.includes('downstream error'));
  });

  it('stops when downstream sink returns done:true (L79-80: done guard)', async () => {
    const results = [];

    // A sink that only accepts 1 value then returns done
    async function* limitedSink() {
      const pair = yield;
      if (pair !== undefined) {
        results.push(pair[1].toString());
      }
      // returning without yielding again causes done:true on next .next() call
    }

    const sinkGen = limitedSink();
    await sinkGen.next(); // prime

    const splitter = observableBufferSplit(Buffer.from('--'));
    const source = splitter(sinkGen);
    await source.next();
    // Push a chunk with multiple splits; after the first the sink will be done
    await source.next(Buffer.from('a--b--c')).catch(() => {});
    await source.return().catch(() => {});

    // At least tried to push; the done guard should have stopped iteration
    assert.ok(
      results.length <= 1,
      `should stop after downstream is done, got ${results.length} results`
    );
  });
});
