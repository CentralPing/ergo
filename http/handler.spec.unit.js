import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import createHandler from './handler.js';

function makeMockRes(overrides = {}) {
  const res = new EventEmitter();
  const headers = {};
  const errors = [];
  res.on('error', e => errors.push(e));
  res._errors = errors;
  res.setHeader = (name, value) => {
    headers[name.toLowerCase()] = value;
  };
  res.getHeader = name => headers[name.toLowerCase()];
  Object.assign(res, overrides);
  return res;
}

describe('[Module] http/handler', () => {
  it('returns the result of tryFn when it succeeds', async () => {
    const tryFn = async () => 'ok';
    const catchFn = async () => 'caught';
    const handler = createHandler(tryFn, catchFn);
    const result = await handler('req', makeMockRes());
    assert.equal(result, 'ok');
  });

  it('calls catchFn when tryFn throws', async () => {
    let caught;
    const tryFn = async () => {
      throw new Error('boom');
    };
    const catchFn = async (_req, _res, acc) => {
      caught = acc;
      return 'error-handled';
    };
    const handler = createHandler(tryFn, catchFn);
    const res = makeMockRes();
    await handler('req', res);
    assert.ok(caught, 'catchFn should have been called');
  });

  it('emits error event on response when tryFn throws', async () => {
    const err = new Error('test error');
    err.statusCode = 422;
    const tryFn = async () => {
      throw err;
    };
    const catchFn = async () => {};
    const handler = createHandler(tryFn, catchFn);
    const res = makeMockRes();
    await handler('req', res);
    assert.ok(res._errors.length > 0, 'should emit error on res');
    assert.equal(res._errors[0], err);
  });

  it('assigns default 500 statusCode to errors without one', async () => {
    let receivedAcc;
    const tryFn = async () => {
      throw new Error('oops');
    };
    const catchFn = async (_req, _res, acc) => {
      receivedAcc = acc;
    };
    const handler = createHandler(tryFn, catchFn);
    await handler('req', makeMockRes());
    assert.equal(receivedAcc.statusCode, 500);
  });

  it('auto-populates err.instance from x-request-id response header', async () => {
    let receivedErr;
    const tryFn = async () => {
      throw new Error('fail');
    };
    const catchFn = async (_req, _res, err) => {
      receivedErr = err;
    };
    const handler = createHandler(tryFn, catchFn);
    const res = makeMockRes();
    res.setHeader('x-request-id', 'abc-123');
    await handler('req', res);
    assert.equal(receivedErr.instance, 'urn:uuid:abc-123');
  });

  it('does not overwrite existing err.instance', async () => {
    let receivedErr;
    const err = new Error('fail');
    err.instance = 'urn:uuid:original';
    const tryFn = async () => {
      throw err;
    };
    const catchFn = async (_req, _res, e) => {
      receivedErr = e;
    };
    const handler = createHandler(tryFn, catchFn);
    const res = makeMockRes();
    res.setHeader('x-request-id', 'overwrite-attempt');
    await handler('req', res);
    assert.equal(receivedErr.instance, 'urn:uuid:original');
  });

  it('does not set instance when no x-request-id header exists', async () => {
    let receivedErr;
    const tryFn = async () => {
      throw new Error('fail');
    };
    const catchFn = async (_req, _res, err) => {
      receivedErr = err;
    };
    const handler = createHandler(tryFn, catchFn);
    await handler('req', makeMockRes());
    assert.equal(receivedErr.instance, undefined);
  });
});
