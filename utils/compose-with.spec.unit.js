import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import composeWith, {createResponseAcc, mergeResponse} from './compose-with.js';
import {accumulator} from './compose.js';

describe('[Boundary] utils/compose-with', () => {
  describe('tuple format [fn, setPath]', () => {
    it('stores value at setPath on the domain accumulator', async () => {
      const pipeline = composeWith([() => ({value: 'hello'}), 'greeting']);
      const result = await pipeline();
      assert.equal(result.greeting, 'hello');
    });

    it('handles nested setPath with dot notation', async () => {
      const pipeline = composeWith([() => ({value: {x: 1}}), 'deep.nested']);
      const result = await pipeline();
      assert.deepEqual(result.deep.nested, {x: 1});
    });

    it('passes full domain accumulator to tuple fn', async () => {
      let received;
      const pipeline = composeWith(
        [() => ({value: {user: 'alice'}}), 'auth'],
        [
          (_req, acc) => {
            received = acc;
            return {value: 'ok'};
          },
          'check'
        ]
      );
      await pipeline('req');
      assert.deepEqual(received.auth, {user: 'alice'});
    });
  });

  describe('plain function (no tuple)', () => {
    it('Object.assigns value to domain accumulator', async () => {
      const pipeline = composeWith(() => ({value: {a: 1, b: 2}}));
      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
    });

    it('receives full domain accumulator as last arg', async () => {
      let received;
      const pipeline = composeWith(
        [() => ({value: 42}), 'x'],
        (_req, acc) => {
          received = acc;
          return undefined;
        }
      );
      await pipeline('req');
      assert.equal(received.x, 42);
    });
  });

  describe('{value, response} extraction', () => {
    it('merges response into response accumulator', async () => {
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith(
        [() => ({response: {headers: [['X-Foo', 'bar']]}}), 'ignored']
      );
      await pipeline(responseAcc, domainAcc);
      assert.deepEqual(responseAcc.headers, [['X-Foo', 'bar']]);
    });

    it('handles both value and response in one return', async () => {
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith([
        () => ({value: {data: 42}, response: {headers: [['X-Count', '1']]}}),
        'result'
      ]);
      await pipeline(responseAcc, domainAcc);
      assert.equal(domainAcc.result.data, 42);
      assert.deepEqual(responseAcc.headers, [['X-Count', '1']]);
    });

    it('handles response-only return (no value)', async () => {
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith([
        () => ({response: {statusCode: 429, detail: 'Too Many Requests'}}),
        'rateLimit'
      ]);
      await pipeline(responseAcc, domainAcc);
      assert.equal(domainAcc.rateLimit, undefined);
      assert.equal(responseAcc.statusCode, 429);
      assert.equal(responseAcc.detail, 'Too Many Requests');
    });

    it('treats plain object returns as {value: ret} (backward compat)', async () => {
      const pipeline = composeWith([() => ({type: 'json'}), 'accepts']);
      const result = await pipeline();
      assert.deepEqual(result.accepts, {type: 'json'});
    });

    it('treats array returns as {value: ret}', async () => {
      const pipeline = composeWith([() => [1, 2, 3], 'items']);
      const result = await pipeline();
      assert.deepEqual(result.items, [1, 2, 3]);
    });

    it('treats primitive returns as {value: ret}', async () => {
      const pipeline = composeWith([() => 42, 'count']);
      const result = await pipeline();
      assert.equal(result.count, 42);
    });
  });

  describe('undefined / null skip', () => {
    it('skips merge for undefined returns', async () => {
      const pipeline = composeWith(
        [() => ({value: 'first'}), 'a'],
        [() => undefined, 'b'],
        [() => ({value: 'third'}), 'c']
      );
      const result = await pipeline();
      assert.equal(result.a, 'first');
      assert.equal(result.b, undefined);
      assert.equal(result.c, 'third');
    });

    it('skips merge for null returns', async () => {
      const pipeline = composeWith(
        [() => ({value: 'first'}), 'a'],
        [() => null, 'b'],
        [() => ({value: 'third'}), 'c']
      );
      const result = await pipeline();
      assert.equal(result.a, 'first');
      assert.equal(result.b, undefined);
      assert.equal(result.c, 'third');
    });
  });

  describe('breakWhen (statusCode)', () => {
    it('breaks serial loop when response statusCode is set', async () => {
      const calls = [];
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith(
        [
          () => {
            calls.push('a');
            return {value: 1};
          },
          'a'
        ],
        [
          () => {
            calls.push('b');
            return {response: {statusCode: 403}};
          },
          'b'
        ],
        [
          () => {
            calls.push('c');
            return {value: 3};
          },
          'c'
        ]
      );
      await pipeline(responseAcc, domainAcc);
      assert.deepEqual(calls, ['a', 'b']);
      assert.equal(responseAcc.statusCode, 403);
      assert.equal(domainAcc.c, undefined);
    });

    it('does not break when no statusCode is set', async () => {
      const calls = [];
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith(
        [
          () => {
            calls.push('a');
            return {response: {headers: [['X-A', '1']]}};
          },
          'a'
        ],
        [
          () => {
            calls.push('b');
            return {response: {headers: [['X-B', '2']]}};
          },
          'b'
        ]
      );
      await pipeline(responseAcc, domainAcc);
      assert.deepEqual(calls, ['a', 'b']);
      assert.equal(responseAcc.headers.length, 2);
    });
  });

  describe('mergeResponse', () => {
    it('appends headers across multiple calls', () => {
      const acc = createResponseAcc();
      mergeResponse(acc, {headers: [['X-A', '1']]});
      mergeResponse(acc, {headers: [['X-B', '2']]});
      assert.deepEqual(acc.headers, [
        ['X-A', '1'],
        ['X-B', '2']
      ]);
    });

    it('last-writer-wins for scalar properties', () => {
      const acc = createResponseAcc();
      mergeResponse(acc, {statusCode: 200});
      mergeResponse(acc, {statusCode: 403});
      assert.equal(acc.statusCode, 403);
    });

    it('handles mixed headers and scalars', () => {
      const acc = createResponseAcc();
      mergeResponse(acc, {statusCode: 429, detail: 'Rate limited', headers: [['Retry-After', '60']]});
      assert.equal(acc.statusCode, 429);
      assert.equal(acc.detail, 'Rate limited');
      assert.deepEqual(acc.headers, [['Retry-After', '60']]);
    });
  });

  describe('createResponseAcc', () => {
    it('creates a null-prototype object', () => {
      const acc = createResponseAcc();
      assert.equal(Object.getPrototypeOf(acc), null);
    });

    it('has non-enumerable isResponseAcc flag', () => {
      const acc = createResponseAcc();
      assert.equal(acc.isResponseAcc, true);
      assert.ok(!Object.keys(acc).includes('isResponseAcc'));
    });
  });

  describe('accumulator handling', () => {
    it('reuses existing domain accumulator from last argument', async () => {
      const existing = accumulator();
      existing.pre = 'existing';
      const pipeline = composeWith([() => ({value: 'new'}), 'added']);

      const result = await pipeline(existing);
      assert.equal(result.pre, 'existing');
      assert.equal(result.added, 'new');
    });

    it('reuses existing response accumulator from arguments', async () => {
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith([
        () => ({response: {statusCode: 200, body: 'ok'}}),
        'result'
      ]);

      await pipeline(responseAcc, domainAcc);
      assert.equal(responseAcc.statusCode, 200);
      assert.equal(responseAcc.body, 'ok');
    });

    it('creates fresh accumulators when none provided', async () => {
      const pipeline = composeWith([() => ({value: 42}), 'x']);
      const result = await pipeline();
      assert.equal(result.x, 42);
      assert.equal(result.isAccumulator, true);
    });
  });

  describe('sync fast-path', () => {
    it('sync middleware returns without await overhead', async () => {
      const pipeline = composeWith(
        [() => ({value: 'fast'}), 'sync'],
        [async () => ({value: 'slow'}), 'async'],
        [() => ({value: 'also-fast'}), 'sync2']
      );
      const result = await pipeline();
      assert.equal(result.sync, 'fast');
      assert.equal(result.async, 'slow');
      assert.equal(result.sync2, 'also-fast');
    });
  });

  describe('extra args pass-through', () => {
    it('passes request args to each function', async () => {
      const received = [];
      const pipeline = composeWith([
        (req, res) => {
          received.push(req, res);
          return {value: 'ok'};
        },
        'result'
      ]);
      await pipeline('req', 'res');
      assert.deepEqual(received, ['req', 'res']);
    });
  });

  describe('.all() concurrent composition', () => {
    it('runs functions concurrently and merges results', async () => {
      const pipeline = composeWith.all(
        [async () => ({value: 'a'}), 'x'],
        [async () => ({value: 'b'}), 'y'],
        [async () => ({value: 'c'}), 'z']
      );
      const result = await pipeline();
      assert.equal(result.x, 'a');
      assert.equal(result.y, 'b');
      assert.equal(result.z, 'c');
    });

    it('merges response contributions from concurrent middleware', async () => {
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith.all(
        [() => ({response: {headers: [['X-A', '1']]}}), 'a'],
        [() => ({response: {headers: [['X-B', '2']]}}), 'b']
      );
      await pipeline(responseAcc, domainAcc);
      assert.equal(responseAcc.headers.length, 2);
    });

    it('handles mixed sync and async concurrent functions', async () => {
      const pipeline = composeWith.all(
        [() => ({value: 1}), 'sync'],
        [async () => ({value: 2}), 'async']
      );
      const result = await pipeline();
      assert.equal(result.sync, 1);
      assert.equal(result.async, 2);
    });
  });
});
