import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import composeWith from './compose-with.js';

describe('[Boundary] utils/compose-with', () => {
  it('passes [] getPaths as full accumulator', async () => {
    let received;
    const pipeline = composeWith(
      async () => ({x: 1}),
      [
        async (_req, acc) => {
          received = acc;
          return {};
        },
        [],
        'out'
      ]
    );
    await pipeline('req');
    assert.equal(received.x, 1);
  });

  it('extracts specific accumulator keys with getPaths array', async () => {
    let received;
    const pipeline = composeWith(
      async () => ({auth: {user: 'alice'}, body: {data: 42}}),
      [
        async (_req, subset) => {
          received = subset;
          return {};
        },
        ['auth'],
        'result'
      ]
    );
    await pipeline('req');
    assert.ok('auth' in received);
    assert.ok(!('body' in received));
  });

  it('stores result under setPath', async () => {
    const pipeline = composeWith([async () => 'value', [], 'myKey']);
    const result = await pipeline();
    assert.equal(result.myKey, 'value');
  });

  it('extracts a single string path (not array)', async () => {
    let received;
    const pipeline = composeWith(
      async () => ({nested: {value: 99}}),
      [
        async (_req, val) => {
          received = val;
          return {};
        },
        'nested.value',
        'out'
      ]
    );
    await pipeline('req');
    assert.equal(received, 99);
  });

  it('plain function receives full accumulator as last arg', async () => {
    let received;
    const pipeline = composeWith(
      async () => ({a: 1, b: 2}),
      async (_req, acc) => {
        received = acc;
        return {};
      }
    );
    await pipeline('req');
    assert.equal(received.a, 1);
    assert.equal(received.b, 2);
  });

  describe('sync-capable tuple wrappers', () => {
    it('sync middleware returns plain value through tuple wrapper', async () => {
      const pipeline = composeWith([() => 'sync-value', [], 'myKey']);
      const result = await pipeline();
      assert.equal(result.myKey, 'sync-value');
    });

    it('async middleware returns Promise through tuple wrapper', async () => {
      const pipeline = composeWith([async () => 'async-value', [], 'myKey']);
      const result = await pipeline();
      assert.equal(result.myKey, 'async-value');
    });

    it('sync tuple without setPath returns value directly', async () => {
      const pipeline = composeWith([() => ({k: 'v'})]);
      const result = await pipeline();
      assert.equal(result.k, 'v');
    });

    it('mixed sync and async tuples accumulate correctly', async () => {
      const pipeline = composeWith(
        [() => 'fast', [], 'sync'],
        [async () => 'slow', [], 'async'],
        [() => 'also-fast', [], 'sync2']
      );
      const result = await pipeline();
      assert.equal(result.sync, 'fast');
      assert.equal(result.async, 'slow');
      assert.equal(result.sync2, 'also-fast');
    });
  });
});
