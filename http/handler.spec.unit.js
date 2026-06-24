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

  it('uses generic detail for 500 errors (does not leak err.message)', async () => {
    const pipeline = async () => {
      throw new Error('secret internal detail');
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.detail, 'Internal Server Error');
    assert.equal(body.status, 500);
    assert.ok(!res._body.includes('secret internal detail'), 'err.message must not leak');
  });

  it('emits error event on response when pipeline throws', async () => {
    const err = new Error('test error');
    const pipeline = async () => {
      throw err;
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    const errors = [];
    res.on('error', e => errors.push(e));
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

  it('populates instance on pipeline break (return-value, no throw)', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 422;
      responseAcc.detail = 'Validation failed';
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    res.setHeader('x-request-id', 'break-id-456');
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.instance, 'urn:uuid:break-id-456');
    assert.equal(body.status, 422);
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

  it('includes _trace in error body when debug is true', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 403;
      responseAcc.detail = 'Forbidden';
    };
    const handler = createHandler(pipeline, {debug: true});
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.status, 403);
    assert.ok(body._trace, '_trace should be present');
    assert.ok(Array.isArray(body._trace.steps), 'steps should be an array');
  });

  it('does not include _trace in error body when debug is false', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 403;
      responseAcc.detail = 'Forbidden';
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body._trace, undefined);
  });

  it('does not include _trace on 2xx responses', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 200;
      responseAcc.body = {ok: true};
    };
    const handler = createHandler(pipeline, {debug: true});
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body._trace, undefined);
    assert.equal(body.ok, true);
  });

  it('safely ends response when send() throws', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 200;
      responseAcc.body = {ok: true};
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    let setHeaderCalls = 0;
    const origSetHeader = res.setHeader.bind(res);
    res.setHeader = (name, value) => {
      setHeaderCalls++;
      if (setHeaderCalls > 2) throw new Error('simulated setHeader failure');
      origSetHeader(name, value);
    };
    await handler(createMockReq(), res);
    assert.equal(res.statusCode, 500);
    assert.ok(res.writableEnded, 'response should still end');
  });

  it('emits error event and records OTEL exception when send() throws', async () => {
    const sendErr = new Error('simulated send failure');
    const recorded = [];
    const mockSpan = {
      recordException: e => recorded.push(e),
      setAttribute() {},
      setStatus() {},
      end() {}
    };
    const pipeline = async (req, res, responseAcc, domainAcc) => {
      domainAcc.trace = {span: mockSpan};
      responseAcc.statusCode = 200;
      responseAcc.body = {ok: true};
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    let setHeaderCalls = 0;
    const origSetHeader = res.setHeader.bind(res);
    res.setHeader = (name, value) => {
      setHeaderCalls++;
      if (setHeaderCalls > 2) throw sendErr;
      origSetHeader(name, value);
    };
    const errors = [];
    res.on('error', e => errors.push(e));
    await handler(createMockReq(), res);
    assert.equal(errors.length, 1, 'should emit exactly one error');
    assert.equal(errors[0], sendErr);
    assert.equal(recorded.length, 1, 'should record exception on span');
    assert.equal(recorded[0], sendErr);
    assert.equal(res.statusCode, 500);
    assert.ok(res.writableEnded);
  });

  it('passes err.message through when redactErrors is false', async () => {
    const pipeline = async () => {
      throw new Error('database connection failed');
    };
    const handler = createHandler(pipeline, {redactErrors: false});
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.detail, 'database connection failed');
    assert.equal(body.status, 500);
  });

  it('does not include stack traces when redactErrors is false', async () => {
    const pipeline = async () => {
      throw new Error('something broke');
    };
    const handler = createHandler(pipeline, {redactErrors: false});
    const res = createMockRes();
    await handler(createMockReq(), res);
    assert.ok(!res._body.includes('at '), 'stack trace must not appear in response');
    assert.ok(!res._body.includes('handler.spec'), 'test file path must not appear');
  });

  it('preserves middleware-set detail when redactErrors is false', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 504;
      responseAcc.detail = 'Upstream gateway timed out';
      throw new Error('socket hang up');
    };
    const handler = createHandler(pipeline, {redactErrors: false});
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.status, 504);
    assert.equal(body.detail, 'Upstream gateway timed out');
  });

  it('falls back to status text when err.message is empty and redactErrors is false', async () => {
    const pipeline = async () => {
      throw new Error('');
    };
    const handler = createHandler(pipeline, {redactErrors: false});
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.detail, 'Internal Server Error');
  });

  it('uses generic status text for 4xx even when redactErrors is false', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 403;
      throw new Error('internal permission check detail');
    };
    const handler = createHandler(pipeline, {redactErrors: false});
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.status, 403);
    assert.equal(body.detail, 'Forbidden');
    assert.ok(!res._body.includes('internal permission check detail'));
  });

  it('redacts err.message when redactErrors is explicitly true', async () => {
    const pipeline = async () => {
      throw new Error('secret internal detail');
    };
    const handler = createHandler(pipeline, {redactErrors: true});
    const res = createMockRes();
    await handler(createMockReq(), res);
    const body = JSON.parse(res._body);
    assert.equal(body.detail, 'Internal Server Error');
    assert.ok(!res._body.includes('secret internal detail'));
  });

  it('does not set timing header when timing is false (default)', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 200;
      responseAcc.body = {ok: true};
    };
    const handler = createHandler(pipeline);
    const res = createMockRes();
    await handler(createMockReq(), res);
    assert.equal(res.getHeader('x-response-time'), undefined);
  });

  it('sets x-response-time header when timing is true', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 200;
      responseAcc.body = {ok: true};
    };
    const handler = createHandler(pipeline, {timing: true});
    const res = createMockRes();
    await handler(createMockReq(), res);
    const value = res.getHeader('x-response-time');
    assert.ok(value !== undefined, 'timing header should be set');
    assert.ok(!Number.isNaN(Number(value)), 'should be numeric');
    assert.ok(Number(value) >= 0, 'should be non-negative');
  });

  it('uses custom header name from timing option', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 200;
      responseAcc.body = {ok: true};
    };
    const handler = createHandler(pipeline, {timing: {header: 'server-timing'}});
    const res = createMockRes();
    await handler(createMockReq(), res);
    assert.ok(res.getHeader('server-timing') !== undefined);
    assert.equal(res.getHeader('x-response-time'), undefined);
  });

  it('uses custom precision from timing option', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 200;
      responseAcc.body = {ok: true};
    };
    const handler = createHandler(pipeline, {timing: {precision: 0}});
    const res = createMockRes();
    await handler(createMockReq(), res);
    const value = res.getHeader('x-response-time');
    assert.ok(value !== undefined);
    assert.ok(!value.includes('.'), 'precision 0 should have no decimal');
  });

  it('sets timing header on error responses', async () => {
    const pipeline = async () => {
      throw new Error('fail');
    };
    const handler = createHandler(pipeline, {timing: true});
    const res = createMockRes();
    await handler(createMockReq(), res);
    assert.equal(res.statusCode, 500);
    const value = res.getHeader('x-response-time');
    assert.ok(value !== undefined, 'timing header should be set on errors');
    assert.ok(Number(value) >= 0);
  });

  it('sets timing header on pipeline break responses', async () => {
    const pipeline = async (req, res, responseAcc) => {
      responseAcc.statusCode = 429;
      responseAcc.detail = 'Rate limited';
    };
    const handler = createHandler(pipeline, {timing: true});
    const res = createMockRes();
    await handler(createMockReq(), res);
    assert.equal(res.statusCode, 429);
    const value = res.getHeader('x-response-time');
    assert.ok(value !== undefined, 'timing header should be set on pipeline breaks');
  });

  describe('onResponse hook', () => {
    it('is called after send with correct responseInfo shape', async () => {
      let hookArgs;
      const pipeline = async (req, res, responseAcc) => {
        responseAcc.statusCode = 200;
        responseAcc.body = {result: 'ok'};
      };
      const handler = createHandler(pipeline, {
        onResponse(req, res, responseInfo, domainAcc) {
          hookArgs = {req, res, responseInfo, domainAcc};
        }
      });
      const req = createMockReq({method: 'POST', url: '/test'});
      const res = createMockRes();
      await handler(req, res);
      assert.ok(hookArgs, 'hook should have been called');
      assert.equal(hookArgs.req, req);
      assert.equal(hookArgs.res, res);
      assert.equal(hookArgs.responseInfo.statusCode, 200);
      assert.equal(hookArgs.responseInfo.method, 'POST');
      assert.equal(hookArgs.responseInfo.url, '/test');
      assert.equal(typeof hookArgs.responseInfo.headers, 'object');
      assert.equal(typeof hookArgs.responseInfo.duration, 'number');
      assert.ok(hookArgs.responseInfo.duration >= 0);
      assert.ok(hookArgs.domainAcc.isAccumulator);
    });

    it('receives domainAcc with pipeline-accumulated values', async () => {
      let receivedAcc;
      const pipeline = async (req, res, responseAcc, domainAcc) => {
        domainAcc.custom = 'value';
        responseAcc.statusCode = 200;
        responseAcc.body = 'ok';
      };
      const handler = createHandler(pipeline, {
        onResponse(req, res, responseInfo, domainAcc) {
          receivedAcc = domainAcc;
        }
      });
      await handler(createMockReq(), createMockRes());
      assert.equal(receivedAcc.custom, 'value');
    });

    it('errors are swallowed and do not propagate', async () => {
      const pipeline = async (req, res, responseAcc) => {
        responseAcc.statusCode = 200;
        responseAcc.body = {ok: true};
      };
      const handler = createHandler(pipeline, {
        onResponse() {
          throw new Error('hook failure');
        }
      });
      const res = createMockRes();
      await handler(createMockReq(), res);
      assert.equal(res.statusCode, 200);
      assert.ok(res.writableEnded);
    });

    it('async hooks are awaited', async () => {
      let hookCompleted = false;
      const pipeline = async (req, res, responseAcc) => {
        responseAcc.statusCode = 200;
        responseAcc.body = 'ok';
      };
      const handler = createHandler(pipeline, {
        async onResponse() {
          await new Promise(resolve => setTimeout(resolve, 10));
          hookCompleted = true;
        }
      });
      await handler(createMockReq(), createMockRes());
      assert.equal(hookCompleted, true, 'async hook should complete before handler returns');
    });

    it('is not called when onResponse option is absent', async () => {
      let called = false;
      const pipeline = async (req, res, responseAcc) => {
        responseAcc.statusCode = 200;
        responseAcc.body = 'ok';
      };
      const handler = createHandler(pipeline);
      await handler(createMockReq(), createMockRes());
      assert.equal(called, false);
    });

    it('responseInfo.duration is a positive number', async () => {
      let duration;
      const pipeline = async (req, res, responseAcc) => {
        await new Promise(resolve => setTimeout(resolve, 5));
        responseAcc.statusCode = 200;
        responseAcc.body = 'ok';
      };
      const handler = createHandler(pipeline, {
        onResponse(req, res, responseInfo) {
          duration = responseInfo.duration;
        }
      });
      await handler(createMockReq(), createMockRes());
      assert.ok(duration > 0, `duration should be positive, got ${duration}`);
    });

    it('responseInfo.bodySize is correct for JSON responses', async () => {
      let bodySize;
      const pipeline = async (req, res, responseAcc) => {
        responseAcc.statusCode = 200;
        responseAcc.body = {data: 'test'};
      };
      const handler = createHandler(pipeline, {
        onResponse(req, res, responseInfo) {
          bodySize = responseInfo.bodySize;
        }
      });
      const res = createMockRes();
      await handler(createMockReq(), res);
      assert.equal(typeof bodySize, 'number');
      assert.ok(bodySize > 0);
    });

    it('responseInfo.bodySize is undefined when content-length is absent', async () => {
      let bodySize;
      const pipeline = async (req, res, responseAcc) => {
        responseAcc.statusCode = 204;
      };
      const handler = createHandler(pipeline, {
        onResponse(req, res, responseInfo) {
          bodySize = responseInfo.bodySize;
        }
      });
      await handler(createMockReq(), createMockRes());
      assert.equal(bodySize, undefined);
    });

    it('fires after send on error responses', async () => {
      let hookInfo;
      const pipeline = async () => {
        throw new Error('unexpected');
      };
      const handler = createHandler(pipeline, {
        onResponse(req, res, responseInfo) {
          hookInfo = responseInfo;
        }
      });
      await handler(createMockReq(), createMockRes());
      assert.ok(hookInfo, 'hook should fire on error path');
      assert.equal(hookInfo.statusCode, 500);
    });

    it('async hook errors are swallowed', async () => {
      const pipeline = async (req, res, responseAcc) => {
        responseAcc.statusCode = 200;
        responseAcc.body = 'ok';
      };
      const handler = createHandler(pipeline, {
        async onResponse() {
          throw new Error('async hook failure');
        }
      });
      const res = createMockRes();
      await handler(createMockReq(), res);
      assert.equal(res.statusCode, 200);
      assert.ok(res.writableEnded);
    });
  });
});
