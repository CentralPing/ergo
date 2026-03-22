import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {setTimeout as delay} from 'node:timers/promises';
import {setupServer, fetch} from '../test/helpers.js';
import createLogger from './logger.js';
import compose from '../utils/compose-with.js';
import createHandler from './handler.js';

describe('[Contract] http/logger', () => {
  let baseUrl, close;
  let logEntries = [];

  const pipeline = compose(
    [
      createLogger({
        log: entry => logEntries.push(entry),
        error: () => {}
      }),
      'log'
    ],
    () => ({response: {body: {ok: true}}})
  );

  const handler = createHandler(pipeline);

  before(async () => {
    ({baseUrl, close} = await setupServer(handler));
  });

  after(() => close());

  it('sets X-Request-Id response header', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.ok(res.headers.get('x-request-id'), 'should set x-request-id header');
  });

  it('preserves X-Request-Id from request when present (standalone proxy fallback)', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {'x-request-id': 'my-trace-id'}
    });
    assert.equal(res.headers.get('x-request-id'), 'my-trace-id');
  });

  it('reads request ID set by transport (response header pre-set)', async () => {
    const transportPipeline = compose(
      (req, res) => {
        res.setHeader('x-request-id', 'transport-uuid');
      },
      [
        createLogger({
          log: entry => logEntries.push(entry),
          error: () => {}
        }),
        'log'
      ],
      () => ({response: {body: {ok: true}}})
    );

    const transportHandler = createHandler(transportPipeline);
    const {baseUrl: tUrl, close: tClose} = await setupServer(transportHandler);

    try {
      const res = await fetch(`${tUrl}/`);
      assert.equal(
        res.headers.get('x-request-id'),
        'transport-uuid',
        'should preserve the transport-set request ID'
      );
    } finally {
      tClose();
    }
  });

  it('logs a complete entry with flattened shape on response finish', async () => {
    logEntries = [];
    await fetch(`${baseUrl}/test-path`);
    await delay(10);
    assert.ok(logEntries.length > 0, 'should have logged at least one entry');
    const entry = logEntries[0];

    assert.ok(entry.requestId, 'log entry should include requestId');
    assert.equal(typeof entry.timestamp, 'number', 'should include numeric timestamp');
    assert.equal(entry.method, 'GET', 'should include method at top level');
    assert.ok(entry.url.includes('/test-path'), 'should include url at top level');
    assert.ok(entry.httpVersion, 'should include httpVersion');
    assert.equal(typeof entry.duration, 'number', 'should include duration');
    assert.equal(entry.statusCode, 200, 'should include statusCode');

    assert.ok(entry.host, 'should include host');
    assert.equal(typeof entry.host.hostname, 'string');
    assert.equal(typeof entry.host.pid, 'number');

    assert.ok(entry.request, 'should include request');
    assert.equal(typeof entry.request.headers, 'object');

    assert.ok(entry.response, 'should include response');
    assert.equal(typeof entry.response.headers, 'object');
  });

  it('does not include per-request OS or process metrics', async () => {
    logEntries = [];
    await fetch(`${baseUrl}/`);
    await delay(10);
    const entry = logEntries[0];
    assert.equal(entry.os, undefined, 'should not include os metrics');
    assert.equal(entry.process, undefined, 'should not include process metrics');
  });
});
