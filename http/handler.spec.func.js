import {describe, it, after} from 'node:test';
import assert from 'node:assert/strict';
import {setupServer, fetch} from '../test/helpers.js';
import {compose, handler} from './main.js';

describe('[Contract] http/handler timing', () => {
  it('includes x-response-time header in a real HTTP response', async () => {
    const pipeline = compose(() => ({response: {body: {ok: true}, statusCode: 200}}));
    const {baseUrl, close} = await setupServer(handler(pipeline, {timing: true}));
    after(close);

    const res = await fetch(baseUrl);
    assert.equal(res.status, 200);

    const timing = res.headers.get('x-response-time');
    assert.ok(timing !== null, 'x-response-time header should be present');
    const num = Number(timing);
    assert.ok(Number.isFinite(num), 'should be a finite number');
    assert.ok(num >= 0, 'should be non-negative');
    assert.ok(num < 5000, 'should be a reasonable value (< 5s)');
  });

  it('does not include x-response-time when timing is disabled', async () => {
    const pipeline = compose(() => ({response: {body: {ok: true}, statusCode: 200}}));
    const {baseUrl, close} = await setupServer(handler(pipeline));
    after(close);

    const res = await fetch(baseUrl);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('x-response-time'), null);
  });

  it('uses a custom header name in a real HTTP response', async () => {
    const pipeline = compose(() => ({response: {body: {ok: true}, statusCode: 200}}));
    const {baseUrl, close} = await setupServer(
      handler(pipeline, {timing: {header: 'x-custom-timing'}})
    );
    after(close);

    const res = await fetch(baseUrl);
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('x-custom-timing') !== null);
    assert.equal(res.headers.get('x-response-time'), null);
  });

  it('includes timing header on error responses', async () => {
    const pipeline = compose(async () => {
      throw new Error('boom');
    });
    const {baseUrl, close} = await setupServer(handler(pipeline, {timing: true}));
    after(close);

    const res = await fetch(baseUrl);
    assert.equal(res.status, 500);

    const timing = res.headers.get('x-response-time');
    assert.ok(timing !== null, 'x-response-time should be present on errors');
    assert.ok(Number(timing) >= 0);
  });
});
