import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {setTimeout as delay} from 'node:timers/promises';
import {createResponseAcc} from '../utils/compose-with.js';
import createTimeout from './timeout.js';

function mockReq(overrides = {}) {
  return Object.assign(new EventEmitter(), {destroyed: false, destroy() {}}, overrides);
}

function mockRes() {
  return new EventEmitter();
}

describe('[Module] http/timeout', () => {
  it('returns without error for default options', () => {
    const timeout = createTimeout();
    const responseAcc = createResponseAcc();
    assert.doesNotThrow(() => timeout(mockReq(), mockRes(), {}, responseAcc));
  });

  it('sets responseAcc.statusCode to 408 and destroys request when timeout fires', async () => {
    const timeout = createTimeout({ms: 1});
    const responseAcc = createResponseAcc();

    let destroyed = false;
    const req = mockReq({
      destroy() {
        destroyed = true;
        this.destroyed = true;
      }
    });

    timeout(req, mockRes(), {}, responseAcc);
    await delay(50);

    assert.ok(destroyed, 'should have called req.destroy');
    assert.equal(responseAcc.statusCode, 408);
    assert.equal(responseAcc.detail, 'Request timed out after 1ms');
  });

  it('calls req.destroy without an error argument', async () => {
    const timeout = createTimeout({ms: 1});
    const responseAcc = createResponseAcc();

    const destroyArgs = [];
    const req = mockReq({
      destroy(...args) {
        destroyArgs.push(...args);
        this.destroyed = true;
      }
    });

    timeout(req, mockRes(), {}, responseAcc);
    await delay(50);

    assert.equal(destroyArgs.length, 0, 'destroy should be called with no arguments');
  });

  it('uses custom statusCode when provided', async () => {
    const timeout = createTimeout({ms: 1, statusCode: 504});
    const responseAcc = createResponseAcc();

    let destroyed = false;
    const req = mockReq({
      destroy() {
        destroyed = true;
        this.destroyed = true;
      }
    });

    timeout(req, mockRes(), {}, responseAcc);
    await delay(50);

    assert.ok(destroyed);
    assert.equal(responseAcc.statusCode, 504);
    assert.equal(responseAcc.detail, 'Request timed out after 1ms');
  });

  it('does not destroy already-destroyed requests', async () => {
    const timeout = createTimeout({ms: 1});
    const responseAcc = createResponseAcc();

    let destroyCalled = false;
    const req = mockReq({
      destroyed: true,
      destroy() {
        destroyCalled = true;
      }
    });

    timeout(req, mockRes(), {}, responseAcc);
    await delay(50);

    assert.equal(destroyCalled, false, 'should not call destroy on already-destroyed req');
    assert.equal(responseAcc.statusCode, undefined, 'should not set statusCode');
  });

  it('cancels the timer when res emits close', async () => {
    const timeout = createTimeout({ms: 50});
    const responseAcc = createResponseAcc();

    let destroyCalled = false;
    const req = mockReq({
      destroy() {
        destroyCalled = true;
      }
    });
    const res = mockRes();

    timeout(req, res, {}, responseAcc);

    res.emit('close');

    await delay(100);

    assert.equal(destroyCalled, false, 'timer should have been cancelled by res close');
    assert.equal(responseAcc.statusCode, undefined, 'should not set statusCode after cancel');
  });

  it('defaults ms to 30000', () => {
    const timeout = createTimeout();
    const responseAcc = createResponseAcc();
    const req = mockReq();
    const res = mockRes();

    timeout(req, res, {}, responseAcc);

    assert.equal(responseAcc.statusCode, undefined, 'should not fire immediately');
    res.emit('close');
  });
});
