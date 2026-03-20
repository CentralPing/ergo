/**
 * @fileoverview Boundary tests for lib/from-connect adapter.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {createMockReq, createMockRes} from '../test/helpers.js';
import compose from '../utils/compose-with.js';
import fromConnect from './from-connect.js';

describe('[Boundary] lib/from-connect', () => {
  it('resolves when middleware calls next() synchronously', async () => {
    const mw = (req, res, next) => next();
    const wrapped = fromConnect(mw);
    const result = await wrapped(createMockReq(), createMockRes());
    assert.equal(result, undefined, 'should resolve with undefined');
  });

  it('rejects when middleware calls next(err)', async () => {
    const mw = (req, res, next) => next(new Error('middleware error'));
    const wrapped = fromConnect(mw);
    await assert.rejects(() => wrapped(createMockReq(), createMockRes()), {
      message: 'middleware error'
    });
  });

  it('resolves via finish listener when middleware ends response without calling next', async () => {
    const mw = (req, res) => {
      res.statusCode = 403;
      res.end('Forbidden');
    };
    const wrapped = fromConnect(mw);
    const res = createMockRes();
    const result = await wrapped(createMockReq(), res);
    assert.equal(result, undefined);
    assert.equal(res.statusCode, 403);
    assert.equal(res._body, 'Forbidden');
  });

  it('resolves when middleware calls next() asynchronously', async () => {
    const mw = (req, res, next) => setTimeout(() => next(), 10);
    const wrapped = fromConnect(mw);
    const result = await wrapped(createMockReq(), createMockRes());
    assert.equal(result, undefined);
  });

  it('ignores duplicate next() calls (settled guard)', async () => {
    let callCount = 0;
    const mw = (req, res, next) => {
      next();
      next();
      next();
    };
    const wrapped = fromConnect(mw);
    const pipeline = compose(wrapped, () => {
      callCount++;
    });
    await pipeline(createMockReq(), createMockRes());
    assert.equal(callCount, 1, 'pipeline should only continue once');
  });

  it('ignores next() called after response has already ended', async () => {
    let nextFn;
    const mw = (req, res, next) => {
      nextFn = next;
      res.end('done');
    };
    const wrapped = fromConnect(mw);
    const res = createMockRes();
    await wrapped(createMockReq(), res);
    nextFn();
    assert.equal(res._body, 'done');
  });

  it('returns undefined so accumulator is unaffected', async () => {
    const mw = (req, res, next) => {
      res.setHeader('x-connect', 'yes');
      next();
    };
    const wrapped = fromConnect(mw);
    const pipeline = compose(wrapped, (req, res, acc) => {
      assert.equal(acc.size, 0, 'accumulator should have no keys from fromConnect');
      return {check: true};
    });
    const result = await pipeline(createMockReq(), createMockRes());
    assert.equal(result.check, true);
  });

  it('works inside compose() -- pipeline continues after adapter resolves', async () => {
    const order = [];
    const connectMw = (req, res, next) => {
      order.push('connect');
      res.setHeader('x-from-connect', 'value');
      next();
    };
    const ergoMw = () => {
      order.push('ergo');
      return {ran: true};
    };

    const pipeline = compose(fromConnect(connectMw), ergoMw);
    const res = createMockRes();
    const result = await pipeline(createMockReq(), res);

    assert.deepEqual(order, ['connect', 'ergo']);
    assert.equal(result.ran, true);
    assert.equal(res.getHeader('x-from-connect'), 'value');
  });

  it('preserves response headers set by Connect middleware', async () => {
    const mw = (req, res, next) => {
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      next();
    };
    const wrapped = fromConnect(mw);
    const res = createMockRes();
    await wrapped(createMockReq(), res);
    assert.equal(res.getHeader('x-frame-options'), 'DENY');
    assert.equal(res.getHeader('x-content-type-options'), 'nosniff');
  });
});
