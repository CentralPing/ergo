import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import compose from './compose.js';

describe('[Boundary] utils/compose', () => {
  it('runs functions sequentially and accumulates results', async () => {
    const pipeline = compose(
      async () => ({a: 1}),
      async () => ({b: 2}),
      async () => ({c: 3})
    );

    const result = await pipeline();
    assert.equal(result.a, 1);
    assert.equal(result.b, 2);
    assert.equal(result.c, 3);
  });

  it('passes accumulated results to subsequent functions', async () => {
    const pipeline = compose(
      async () => ({x: 10}),
      async (_acc, acc) => ({y: acc.x * 2})
    );

    const result = await pipeline('unused_arg');
    assert.equal(result.x, 10);
    assert.equal(result.y, 20);
  });

  it('later results overwrite earlier ones for the same key', async () => {
    const pipeline = compose(
      async () => ({value: 'first'}),
      async () => ({value: 'second'})
    );

    const result = await pipeline();
    assert.equal(result.value, 'second');
  });

  it('returns an object with isAccumulator:true', async () => {
    const pipeline = compose(async () => ({x: 1}));
    const result = await pipeline();
    assert.equal(result.isAccumulator, true);
  });

  it('result.size reflects number of accumulated keys', async () => {
    const pipeline = compose(
      async () => ({a: 1}),
      async () => ({b: 2})
    );
    const result = await pipeline();
    assert.equal(result.size, 2);
  });

  describe('sync fast-path', () => {
    it('accumulates results from sync-only functions', async () => {
      const pipeline = compose(
        () => ({a: 1}),
        () => ({b: 2}),
        () => ({c: 3})
      );

      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
      assert.equal(result.c, 3);
    });

    it('handles mixed sync and async functions', async () => {
      const pipeline = compose(
        () => ({a: 1}),
        async () => ({b: 2}),
        () => ({c: 3})
      );

      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
      assert.equal(result.c, 3);
    });

    it('passes the live accumulator to sync functions', async () => {
      let received;
      const pipeline = compose(
        () => ({x: 42}),
        (_arg, acc) => {
          received = acc;
          return {y: acc.x + 1};
        }
      );

      const result = await pipeline('arg');
      assert.equal(received.x, 42);
      assert.equal(result.y, 43);
    });

    it('handles undefined returns from sync functions', async () => {
      const pipeline = compose(
        () => ({a: 1}),
        () => undefined,
        () => ({b: 2})
      );

      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
    });
  });

  describe('.all() concurrent composition', () => {
    it('runs functions concurrently and merges results', async () => {
      const pipeline = compose.all(
        async () => ({a: 1}),
        async () => ({b: 2}),
        async () => ({c: 3})
      );

      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
      assert.equal(result.c, 3);
    });

    it('all functions receive the same initial accumulator state', async () => {
      const initial = {shared: 'data'};
      const received = [];

      const pipeline = compose(
        async () => initial,
        compose.all(
          async (_req, acc) => {
            received.push(acc.shared);
            return {};
          },
          async (_req, acc) => {
            received.push(acc.shared);
            return {};
          }
        )
      );

      await pipeline('req');
      assert.ok(received.every(v => v === 'data'));
    });

    it('merges results from all-sync functions without Promise.all', async () => {
      const pipeline = compose.all(
        () => ({a: 1}),
        () => ({b: 2}),
        () => ({c: 3})
      );

      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
      assert.equal(result.c, 3);
    });

    it('handles a mix of sync and async concurrent functions', async () => {
      const pipeline = compose.all(
        () => ({a: 1}),
        async () => ({b: 2}),
        () => ({c: 3})
      );

      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
      assert.equal(result.c, 3);
    });
  });

  it('passes extra args to each function', async () => {
    const received = [];
    const pipeline = compose(async (req, res) => {
      received.push(req, res);
      return {};
    });
    await pipeline('req', 'res');
    assert.deepEqual(received, ['req', 'res']);
  });

  it('reuses existing accumulator from last argument', async () => {
    const pipeline = compose(async () => ({b: 2}));
    const existingPipeline = compose(async () => ({a: 1}));
    const existing = await existingPipeline();

    const result = await pipeline(existing);
    assert.equal(result.a, 1);
    assert.equal(result.b, 2);
  });

  describe('.withOptions() breakWhen predicate', () => {
    it('stops serial iteration when breakWhen returns true', async () => {
      const calls = [];
      const pipeline = compose.withOptions(
        {breakWhen: () => calls.length >= 2},
        () => {
          calls.push('a');
          return {a: 1};
        },
        () => {
          calls.push('b');
          return {b: 2};
        },
        () => {
          calls.push('c');
          return {c: 3};
        }
      );

      const result = await pipeline();
      assert.deepEqual(calls, ['a', 'b']);
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
      assert.equal(result.c, undefined);
    });

    it('runs all functions when breakWhen never returns true', async () => {
      const pipeline = compose.withOptions(
        {breakWhen: () => false},
        () => ({a: 1}),
        () => ({b: 2})
      );

      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
    });

    it('receives the accumulator as the predicate argument', async () => {
      const pipeline = compose.withOptions(
        {breakWhen: acc => acc.stop === true},
        () => ({a: 1}),
        () => ({stop: true, b: 2}),
        () => ({c: 3})
      );

      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
      assert.equal(result.c, undefined);
    });

    it('checks breakWhen after merging (merged value is visible)', async () => {
      const pipeline = compose.withOptions(
        {breakWhen: acc => acc.count >= 2},
        () => ({count: 1}),
        () => ({count: 2}),
        () => ({count: 3})
      );

      const result = await pipeline();
      assert.equal(result.count, 2);
    });

    it('works with async functions', async () => {
      const pipeline = compose.withOptions(
        {breakWhen: acc => acc.done},
        async () => ({done: true, a: 1}),
        async () => ({b: 2})
      );

      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, undefined);
    });

    it('works with no breakWhen option (runs all)', async () => {
      const pipeline = compose.withOptions(
        {},
        () => ({a: 1}),
        () => ({b: 2})
      );

      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
    });
  });
});
