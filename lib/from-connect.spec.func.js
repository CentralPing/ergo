/**
 * @fileoverview Contract tests for lib/from-connect adapter.
 * Verifies the full fromConnect -> compose -> handler -> send -> HTTP path.
 */
import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {setupServer, fetch} from '../test/helpers.js';
import compose from '../utils/compose-with.js';
import createHandler from '../http/handler.js';
import fromConnect from './from-connect.js';

describe('[Contract] lib/from-connect', () => {
  let baseUrl, close;

  const connectMiddleware = (req, res, next) => {
    res.setHeader('X-Connect-Header', 'present');
    next();
  };

  const pipeline = compose(fromConnect(connectMiddleware), () => ({response: {body: {ok: true}}}));

  const handler = createHandler(pipeline);

  before(async () => {
    ({baseUrl, close} = await setupServer(handler));
  });

  after(() => close());

  it('Connect middleware header is visible in the final HTTP response', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('x-connect-header'), 'present');
    const body = await res.json();
    assert.deepEqual(body, {ok: true});
  });

  it('Connect middleware that ends response directly results in empty response', async () => {
    const shortCircuitMw = (req, res) => {
      res.writeHead(403, {'content-type': 'text/plain'});
      res.end('Forbidden');
    };

    const shortCircuitPipeline = compose(fromConnect(shortCircuitMw), () => ({
      response: {body: {should: 'not reach'}}
    }));

    const shortCircuitHandler = createHandler(shortCircuitPipeline);
    const {baseUrl: scUrl, close: scClose} = await setupServer(shortCircuitHandler);

    try {
      const res = await fetch(`${scUrl}/`);
      assert.equal(res.status, 403);
      const text = await res.text();
      assert.equal(text, 'Forbidden');
    } finally {
      scClose();
    }
  });

  it('Connect middleware error is caught by handler error path', async () => {
    const errorMw = (req, res, next) => {
      next(new Error('connect failure'));
    };

    const errorPipeline = compose(fromConnect(errorMw), () => ({
      response: {body: {should: 'not reach'}}
    }));

    const errorHandler = createHandler(errorPipeline);
    const {baseUrl: errUrl, close: errClose} = await setupServer(errorHandler);

    try {
      const res = await fetch(`${errUrl}/`);
      assert.equal(res.status, 500);
      const body = await res.json();
      assert.equal(body.status, 500);
    } finally {
      errClose();
    }
  });
});
