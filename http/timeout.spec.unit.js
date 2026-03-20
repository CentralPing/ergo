import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {setTimeout as delay} from 'node:timers/promises';
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
    assert.doesNotThrow(() => timeout(mockReq(), mockRes()));
  });

  it('destroys request with 408 error when timeout fires', async () => {
    const timeout = createTimeout({ms: 1});

    let destroyedWith;
    const req = mockReq({
      destroy(err) {
        destroyedWith = err;
        this.destroyed = true;
      }
    });

    timeout(req, mockRes());
    await delay(50);

    assert.ok(destroyedWith, 'should have called req.destroy');
    assert.equal(destroyedWith.statusCode, 408);
  });

  it('uses custom statusCode when provided', async () => {
    const timeout = createTimeout({ms: 1, statusCode: 504});
    let destroyedWith;
    const req = mockReq({
      destroy(err) {
        destroyedWith = err;
        this.destroyed = true;
      }
    });
    timeout(req, mockRes());
    await delay(50);
    assert.ok(destroyedWith);
    assert.equal(destroyedWith.statusCode, 504);
  });

  it('does not destroy already-destroyed requests', async () => {
    const timeout = createTimeout({ms: 1});
    let destroyCalled = false;
    const req = mockReq({
      destroyed: true,
      destroy() {
        destroyCalled = true;
      }
    });
    timeout(req, mockRes());
    await delay(50);
    assert.equal(destroyCalled, false, 'should not call destroy on already-destroyed req');
  });

  it('cancels the timer when res emits close', async () => {
    const timeout = createTimeout({ms: 50});
    let destroyCalled = false;
    const req = mockReq({
      destroy() {
        destroyCalled = true;
      }
    });
    const res = mockRes();

    timeout(req, res);

    // Simulate response completing before the 50ms deadline
    res.emit('close');

    // Wait past the original deadline
    await delay(100);

    assert.equal(destroyCalled, false, 'timer should have been cancelled by res close');
  });
});
