import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {createMockReq, createMockRes} from '../test/helpers.js';
import createHandler from './handler.js';

describe('[Module] http/handler', () => {
  it('creates both accumulators and passes them to the pipeline', async () => {
    let receivedArgs;
    // handler calls pipeline(req, res, responseAcc, domainAcc) to match
    // compose-with's pop order (domainAcc last = popped first)
    const pipeline = async (req, res, responseAcc, domainAcc) => {
      receivedArgs = {req, res, domainAcc, responseAcc};
    };
    const handler = createHandler(pipeline);
    const req = createMockReq();
    const res = createMockRes();
    await handler(req, res);
    assert.ok(receivedArgs.domainAcc.isAccumulator);
    assert.ok(receivedArgs.responseAcc.isResponseAcc);
  });

  it('calls send() after successful pipeline execution', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 200;
      responseAcc.body = {result: 'ok'};
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    await handler(createMockReq(), res);
    assert.ok(res.writableEnded, 'send should have ended the response');
    assert.equal(res.statusCode, 200);
  });

  it('sets 500 on responseAcc when pipeline throws without a statusCode', async () => {
    const pipeline = async () => {
      throw new Error('unexpected');
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    await handler(createMockReq(), res);
    assert.equal(res.statusCode, 500);
    assert.ok(res.writableEnded);
  });

  it('preserves existing responseAcc.statusCode when pipeline throws', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 408;
      responseAcc.detail = 'Request timed out';
      throw new Error('destroyed');
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    await handler(createMockReq(), res);
    assert.equal(res.statusCode, 408);
  });

  it('populates responseAcc.detail from error message for 500 errors', async () => {
    const pipeline = async () => {
      throw new Error('something broke');
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.detail, 'something broke');
    assert.equal(body.status, 500);
  });

  it('emits error event on response when pipeline throws', async () => {
    const err = new Error('test error');
    const pipeline = async () => {
      throw err;
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    const errors = [];
    res.on('error', (e) => errors.push(e));
    await handler(createMockReq(), res);
    assert.ok(errors.length > 0, 'should emit error on res');
    assert.equal(errors[0], err);
  });

  it('does not emit error when response has no error listeners', async () => {
    const pipeline = async () => {
      throw new Error('fail');
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    res.removeAllListeners('error');
    let threw = false;
    try {
      await handler(createMockReq(), res);
    } catch {
      threw = true;
    }
    assert.equal(threw, false, 'should not throw when no error listeners');
  });

  it('auto-populates responseAcc.instance from x-request-id header', async () => {
    const pipeline = async () => {
      throw new Error('fail');
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    res.setHeader('x-request-id', 'abc-123');
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.instance, 'urn:uuid:abc-123');
  });

  it('does not set instance when no x-request-id header exists', async () => {
    const pipeline = async () => {
      throw new Error('fail');
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.instance, undefined);
  });

  it('forwards sendOptions to send()', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 200;
      responseAcc.body = {a: 1};
    };
    const handler = createHandler(pipeline, {prettify: true});
    const res = createMockRes();
    await handler(createMockReq(), res);
    assert.ok(res._body.includes('\n'), 'prettified JSON should contain newlines');
  });

  it('creates fresh accumulators per request (no cross-request leakage)', async () => {
    const accumulators = [];
    const pipeline = async (req, res, responseAcc, domainAcc) => {
      accumulators.push({domainAcc, responseAcc});
      responseAcc.statusCode = 200;
      responseAcc.body = 'ok';
    };
    const handler = createHandler(pipeline);
    await handler(createMockReq(), createMockRes());
    await handler(createMockReq(), createMockRes());
    assert.notEqual(accumulators[0].domainAcc, accumulators[1].domainAcc);
    assert.notEqual(accumulators[0].responseAcc, accumulators[1].responseAcc);
  });

  it('does not overwrite pipeline-set detail when error is caught', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 429;
      responseAcc.detail = 'Rate limit exceeded';
      responseAcc.retryAfter = 60;
      throw new Error('pipeline aborted');
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.status, 429);
    assert.equal(body.detail, 'Rate limit exceeded');
  });
});
