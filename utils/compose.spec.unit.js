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
});
