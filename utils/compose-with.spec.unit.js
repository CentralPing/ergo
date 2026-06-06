import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import composeWith, {createResponseAcc, mergeResponse} from './compose-with.js';
import {accumulator} from './compose.js';

describe('[Boundary] utils/compose-with', () => {
  describe('config object format {fn, setPath}', () => {
    it('stores value at setPath on the domain accumulator', async () => {
      const pipeline = composeWith({fn: () => ({value: 'hello'}), setPath: 'greeting'});
      const result = await pipeline();
      assert.equal(result.greeting, 'hello');
    });

    it('handles nested setPath with dot notation', async () => {
      const pipeline = composeWith({fn: () => ({value: {x: 1}}), setPath: 'deep.nested'});
      const result = await pipeline();
      assert.deepEqual(result.deep.nested, {x: 1});
    });

    it('passes full domain accumulator to config object fn', async () => {
      let received;
      const pipeline = composeWith(
        {fn: () => ({value: {user: 'alice'}}), setPath: 'auth'},
        {
          fn: (_req, acc) => {
            received = acc;
            return {value: 'ok'};
          },
          setPath: 'check'
        }
      );
      await pipeline('req');
      assert.deepEqual(received.auth, {user: 'alice'});
    });
  });

  describe('plain function (no config object)', () => {
    it('Object.assigns value to domain accumulator', async () => {
      const pipeline = composeWith(() => ({value: {a: 1, b: 2}}));
      const result = await pipeline();
      assert.equal(result.a, 1);
      assert.equal(result.b, 2);
    });

    it('receives full domain accumulator as last arg', async () => {
      let received;
      const pipeline = composeWith({fn: () => ({value: 42}), setPath: 'x'}, (_req, acc) => {
        received = acc;
        return undefined;
      });
      await pipeline('req');
      assert.equal(received.x, 42);
    });
  });

  describe('{value, response} extraction', () => {
    it('merges response into response accumulator', async () => {
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith({
        fn: () => ({response: {headers: [['X-Foo', 'bar']]}}),
        setPath: 'ignored'
      });
      await pipeline(responseAcc, domainAcc);
      assert.deepEqual(responseAcc.headers, [['X-Foo', 'bar']]);
    });

    it('handles both value and response in one return', async () => {
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith({
        fn: () => ({value: {data: 42}, response: {headers: [['X-Count', '1']]}}),
        setPath: 'result'
      });
      await pipeline(responseAcc, domainAcc);
      assert.equal(domainAcc.result.data, 42);
      assert.deepEqual(responseAcc.headers, [['X-Count', '1']]);
    });

    it('handles response-only return (no value)', async () => {
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith({
        fn: () => ({response: {statusCode: 429, detail: 'Too Many Requests'}}),
        setPath: 'rateLimit'
      });
      await pipeline(responseAcc, domainAcc);
      assert.equal(domainAcc.rateLimit, undefined);
      assert.equal(responseAcc.statusCode, 429);
      assert.equal(responseAcc.detail, 'Too Many Requests');
    });

    it('treats plain object returns as {value: ret} (backward compat)', async () => {
      const pipeline = composeWith({fn: () => ({type: 'json'}), setPath: 'accepts'});
      const result = await pipeline();
      assert.deepEqual(result.accepts, {type: 'json'});
    });

    it('treats array returns as {value: ret}', async () => {
      const pipeline = composeWith({fn: () => [1, 2, 3], setPath: 'items'});
      const result = await pipeline();
      assert.deepEqual(result.items, [1, 2, 3]);
    });

    it('treats primitive returns as {value: ret}', async () => {
      const pipeline = composeWith({fn: () => 42, setPath: 'count'});
      const result = await pipeline();
      assert.equal(result.count, 42);
    });
  });

  describe('undefined / null skip', () => {
    it('skips merge for undefined returns', async () => {
      const pipeline = composeWith(
        {fn: () => ({value: 'first'}), setPath: 'a'},
        {fn: () => undefined, setPath: 'b'},
        {fn: () => ({value: 'third'}), setPath: 'c'}
      );
      const result = await pipeline();
      assert.equal(result.a, 'first');
      assert.equal(result.b, undefined);
      assert.equal(result.c, 'third');
    });

    it('skips merge for null returns', async () => {
      const pipeline = composeWith(
        {fn: () => ({value: 'first'}), setPath: 'a'},
        {fn: () => null, setPath: 'b'},
        {fn: () => ({value: 'third'}), setPath: 'c'}
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
        {
          fn: () => {
            calls.push('a');
            return {value: 1};
          },
          setPath: 'a'
        },
        {
          fn: () => {
            calls.push('b');
            return {response: {statusCode: 403}};
          },
          setPath: 'b'
        },
        {
          fn: () => {
            calls.push('c');
            return {value: 3};
          },
          setPath: 'c'
        }
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
        {
          fn: () => {
            calls.push('a');
            return {response: {headers: [['X-A', '1']]}};
          },
          setPath: 'a'
        },
        {
          fn: () => {
            calls.push('b');
            return {response: {headers: [['X-B', '2']]}};
          },
          setPath: 'b'
        }
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
      mergeResponse(acc, {
        statusCode: 429,
        detail: 'Rate limited',
        headers: [['Retry-After', '60']]
      });
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
      const pipeline = composeWith({fn: () => ({value: 'new'}), setPath: 'added'});

      const result = await pipeline(existing);
      assert.equal(result.pre, 'existing');
      assert.equal(result.added, 'new');
    });

    it('reuses existing response accumulator from arguments', async () => {
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith({
        fn: () => ({response: {statusCode: 200, body: 'ok'}}),
        setPath: 'result'
      });

      await pipeline(responseAcc, domainAcc);
      assert.equal(responseAcc.statusCode, 200);
      assert.equal(responseAcc.body, 'ok');
    });

    it('creates fresh accumulators when none provided', async () => {
      const pipeline = composeWith({fn: () => ({value: 42}), setPath: 'x'});
      const result = await pipeline();
      assert.equal(result.x, 42);
      assert.equal(result.isAccumulator, true);
    });
  });

  describe('sync fast-path', () => {
    it('sync middleware returns without await overhead', async () => {
      const pipeline = composeWith(
        {fn: () => ({value: 'fast'}), setPath: 'sync'},
        {fn: async () => ({value: 'slow'}), setPath: 'async'},
        {fn: () => ({value: 'also-fast'}), setPath: 'sync2'}
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
      const pipeline = composeWith({
        fn: (req, res) => {
          received.push(req, res);
          return {value: 'ok'};
        },
        setPath: 'result'
      });
      await pipeline('req', 'res');
      assert.deepEqual(received, ['req', 'res']);
    });
  });

  describe('.all() concurrent composition', () => {
    it('runs functions concurrently and merges results', async () => {
      const pipeline = composeWith.all(
        {fn: async () => ({value: 'a'}), setPath: 'x'},
        {fn: async () => ({value: 'b'}), setPath: 'y'},
        {fn: async () => ({value: 'c'}), setPath: 'z'}
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
        {fn: () => ({response: {headers: [['X-A', '1']]}}), setPath: 'a'},
        {fn: () => ({response: {headers: [['X-B', '2']]}}), setPath: 'b'}
      );
      await pipeline(responseAcc, domainAcc);
      assert.equal(responseAcc.headers.length, 2);
    });

    it('handles mixed sync and async concurrent functions', async () => {
      const pipeline = composeWith.all(
        {fn: () => ({value: 1}), setPath: 'sync'},
        {fn: async () => ({value: 2}), setPath: 'async'}
      );
      const result = await pipeline();
      assert.equal(result.sync, 1);
      assert.equal(result.async, 2);
    });

    it('merges plain object returns from plain functions via Object.assign', async () => {
      const pipeline = composeWith.all(() => ({merged: true, x: 1}), {
        fn: () => ({value: 'tupled'}),
        setPath: 'y'
      });
      const result = await pipeline();
      assert.equal(result.merged, true);
      assert.equal(result.x, 1);
      assert.equal(result.y, 'tupled');
    });

    it('records steps in _trace when enabled (concurrent)', async () => {
      const responseAcc = createResponseAcc();
      responseAcc._trace = {steps: [], breakAt: undefined};
      const domainAcc = accumulator();
      const pipeline = composeWith.all(
        {fn: () => ({value: 'a'}), setPath: 'first'},
        {fn: () => ({value: 'b'}), setPath: 'second'}
      );
      await pipeline(responseAcc, domainAcc);
      assert.deepEqual(responseAcc._trace.steps, ['first', 'second']);
      assert.equal(responseAcc._trace.breakAt, undefined);
    });

    it('records steps for null-returning middleware in concurrent trace', async () => {
      const responseAcc = createResponseAcc();
      responseAcc._trace = {steps: [], breakAt: undefined};
      const domainAcc = accumulator();
      const pipeline = composeWith.all(
        {fn: () => ({value: 'a'}), setPath: 'first'},
        {fn: () => null, setPath: 'noop'},
        {fn: () => ({value: 'c'}), setPath: 'third'}
      );
      await pipeline(responseAcc, domainAcc);
      assert.deepEqual(responseAcc._trace.steps, ['first', 'noop', 'third']);
    });
  });

  describe('pipeline tracing (_trace)', () => {
    it('records step labels in declaration order', async () => {
      const responseAcc = createResponseAcc();
      responseAcc._trace = {steps: [], breakAt: undefined};
      const domainAcc = accumulator();
      const pipeline = composeWith(
        {fn: () => ({value: 'x'}), setPath: 'alpha'},
        {fn: () => ({value: 'y'}), setPath: 'beta'},
        {fn: () => ({value: 'z'}), setPath: 'gamma'}
      );
      await pipeline(responseAcc, domainAcc);
      assert.deepEqual(responseAcc._trace.steps, ['alpha', 'beta', 'gamma']);
      assert.equal(responseAcc._trace.breakAt, undefined);
    });

    it('sets breakAt to the label of the breaking step', async () => {
      const responseAcc = createResponseAcc();
      responseAcc._trace = {steps: [], breakAt: undefined};
      const domainAcc = accumulator();
      const pipeline = composeWith(
        {fn: () => ({value: 'ok'}), setPath: 'logger'},
        {fn: () => ({response: {statusCode: 403, detail: 'Forbidden'}}), setPath: 'auth'},
        {fn: () => ({value: 'never'}), setPath: 'body'}
      );
      await pipeline(responseAcc, domainAcc);
      assert.deepEqual(responseAcc._trace.steps, ['logger', 'auth']);
      assert.equal(responseAcc._trace.breakAt, 'auth');
    });

    it('uses fn.name when setPath is undefined', async () => {
      const responseAcc = createResponseAcc();
      responseAcc._trace = {steps: [], breakAt: undefined};
      const domainAcc = accumulator();
      function myMiddleware() {
        return {value: 42};
      }
      const pipeline = composeWith(myMiddleware);
      await pipeline(responseAcc, domainAcc);
      assert.deepEqual(responseAcc._trace.steps, ['myMiddleware']);
    });

    it('uses (anonymous) for unnamed functions without setPath', async () => {
      const responseAcc = createResponseAcc();
      responseAcc._trace = {steps: [], breakAt: undefined};
      const domainAcc = accumulator();
      const pipeline = composeWith(Object.defineProperty(() => ({value: 1}), 'name', {value: ''}));
      await pipeline(responseAcc, domainAcc);
      assert.deepEqual(responseAcc._trace.steps, ['(anonymous)']);
    });

    it('does not add _trace properties when tracing is off', async () => {
      const responseAcc = createResponseAcc();
      const domainAcc = accumulator();
      const pipeline = composeWith(
        {fn: () => ({value: 'x'}), setPath: 'alpha'},
        {fn: () => ({value: 'y'}), setPath: 'beta'}
      );
      await pipeline(responseAcc, domainAcc);
      assert.equal(responseAcc._trace, undefined);
    });
  });
});
