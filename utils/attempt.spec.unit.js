import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import attempt from './attempt.js';

describe('[Boundary] utils/attempt', () => {
  it('returns the result of fn when it succeeds', async () => {
    const safe = attempt(
      async () => 'ok',
      async () => 'fail'
    );
    assert.equal(await safe(), 'ok');
  });

  it('calls fail with original args plus the error when fn throws', async () => {
    const err = new Error('boom');
    let received;

    const safe = attempt(
      async () => {
        throw err;
      },
      async (...args) => {
        received = args;
        return 'caught';
      }
    );

    const result = await safe('req', 'res');
    assert.equal(result, 'caught');
    assert.deepEqual(received, ['req', 'res', err]);
  });

  it('propagates the error from fail if fail also throws', async () => {
    const safe = attempt(
      async () => {
        throw new Error('primary');
      },
      async () => {
        throw new Error('secondary');
      }
    );
    await assert.rejects(() => safe(), {message: 'secondary'});
  });
});
