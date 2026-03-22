import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {setupServer, fetch} from '../test/helpers.js';
import compose from '../utils/compose-with.js';
import createHandler from './handler.js';

describe('[Contract] http/send', () => {
  let baseUrl, close;

  const lastModified = new Date('2025-06-01T00:00:00Z');

  const pipeline = compose(req => {
    const url = new URL(req.url, 'http://localhost');
    const scenario = url.searchParams.get('scenario') ?? 'json';

    switch (scenario) {
      case 'json':
        return {response: {body: {message: 'hello', value: 42}}};
      case '204':
        return {response: {statusCode: 204}};
      case 'string':
        return {response: {body: 'plain text'}};
      case 'html':
        return {response: {body: '<h1>Hello</h1>'}};
      case '201':
        return {response: {statusCode: 201, body: {id: 99}}};
      case '201-location':
        return {response: {statusCode: 201, body: {id: 42}, location: '/items/42'}};
      case 'last-modified':
        return {response: {body: {data: 'versioned'}, lastModified}};
      default:
        return {response: {body: {scenario}}};
    }
  });

  before(async () => {
    ({baseUrl, close} = await setupServer(createHandler(pipeline)));
  });

  after(() => close());

  it('sends JSON response with correct status and Content-Type', async () => {
    const res = await fetch(`${baseUrl}/?scenario=json`);
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('content-type').includes('application/json'));
    const body = await res.json();
    assert.equal(body.message, 'hello');
    assert.equal(body.value, 42);
  });

  it('sends 204 with no body', async () => {
    const res = await fetch(`${baseUrl}/?scenario=204`);
    assert.equal(res.status, 204);
    const text = await res.text();
    assert.equal(text, '');
  });

  it('sends string body as text/plain', async () => {
    const res = await fetch(`${baseUrl}/?scenario=string`);
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('content-type').includes('text/plain'));
    const text = await res.text();
    assert.equal(text, 'plain text');
  });

  it('detects HTML content type', async () => {
    const res = await fetch(`${baseUrl}/?scenario=html`);
    assert.ok(res.headers.get('content-type').includes('text/html'));
  });

  it('sets Content-Length header', async () => {
    const res = await fetch(`${baseUrl}/?scenario=json`);
    assert.ok(res.headers.get('content-length') > 0);
  });

  it('generates ETag for 2xx responses', async () => {
    const res = await fetch(`${baseUrl}/?scenario=json`);
    assert.ok(res.headers.get('etag'), 'should set ETag');
  });

  it('returns 304 when If-None-Match matches', async () => {
    const res1 = await fetch(`${baseUrl}/?scenario=json`);
    const etag = res1.headers.get('etag');
    assert.ok(etag);

    const res2 = await fetch(`${baseUrl}/?scenario=json`, {
      headers: {'if-none-match': etag}
    });
    assert.equal(res2.status, 304);
    const text = await res2.text();
    assert.equal(text, '');
  });

  it('returns 412 on If-Match mismatch for PUT', async () => {
    const res = await fetch(`${baseUrl}/?scenario=json`, {
      method: 'PUT',
      headers: {'if-match': '"wrong-etag"', 'content-type': 'application/json'},
      body: '{}'
    });
    assert.equal(res.status, 412);
  });

  it('sets Last-Modified header when lastModified is provided', async () => {
    const res = await fetch(`${baseUrl}/?scenario=last-modified`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('last-modified'), lastModified.toUTCString());
  });

  it('returns 304 for If-Modified-Since when resource is not modified', async () => {
    const res = await fetch(`${baseUrl}/?scenario=last-modified`, {
      headers: {'if-modified-since': new Date('2099-01-01T00:00:00Z').toUTCString()}
    });
    assert.equal(res.status, 304);
    const text = await res.text();
    assert.equal(text, '');
  });

  it('returns 200 for If-Modified-Since when resource is newer', async () => {
    const res = await fetch(`${baseUrl}/?scenario=last-modified`, {
      headers: {'if-modified-since': new Date('2020-01-01T00:00:00Z').toUTCString()}
    });
    assert.equal(res.status, 200);
  });

  it('sets Location header on 201 Created response', async () => {
    const res = await fetch(`${baseUrl}/?scenario=201-location`, {method: 'POST'});
    assert.equal(res.status, 201);
    assert.equal(res.headers.get('location'), '/items/42');
    const body = await res.json();
    assert.equal(body.id, 42);
  });

  it('returns 412 for If-Unmodified-Since when resource is newer (PUT)', async () => {
    const res = await fetch(`${baseUrl}/?scenario=last-modified`, {
      method: 'PUT',
      headers: {
        'if-unmodified-since': new Date('2020-01-01T00:00:00Z').toUTCString(),
        'content-type': 'application/json'
      },
      body: '{}'
    });
    assert.equal(res.status, 412);
  });

  describe('envelope option', () => {
    let envUrl, envClose;

    const envPipeline = compose(
      (req, res) => {
        res.setHeader('x-request-id', 'env-trace-id');
      },
      req => {
        const url = new URL(req.url, 'http://localhost');
        const scenario = url.searchParams.get('scenario') ?? 'json';

        switch (scenario) {
          case 'array':
            return {response: {body: [{id: 1}, {id: 2}, {id: 3}]}};
          case 'error':
            return {response: {statusCode: 400, detail: 'bad'}};
          case 'string':
            return {response: {body: 'text'}};
          default:
            return {response: {body: {message: 'ok'}}};
        }
      }
    );

    before(async () => {
      ({baseUrl: envUrl, close: envClose} = await setupServer(
        createHandler(envPipeline, {envelope: true})
      ));
    });

    after(() => envClose());

    it('wraps 2xx JSON response in built-in envelope', async () => {
      const res = await fetch(`${envUrl}/?scenario=json`);
      assert.equal(res.status, 200);
      const body = await res.json();
      assert.equal(body.id, 'env-trace-id');
      assert.equal(body.status, 200);
      assert.deepEqual(body.data, {message: 'ok'});
    });

    it('includes count for array responses', async () => {
      const res = await fetch(`${envUrl}/?scenario=array`);
      const body = await res.json();
      assert.equal(body.count, 3);
      assert.equal(body.data.length, 3);
    });

    it('does not envelope non-2xx responses', async () => {
      const res = await fetch(`${envUrl}/?scenario=error`);
      assert.equal(res.status, 400);
      const body = await res.json();
      assert.equal(body.data, undefined, 'should not have envelope wrapper');
    });

    it('does not envelope string bodies', async () => {
      const res = await fetch(`${envUrl}/?scenario=string`);
      assert.equal(res.status, 200);
      const text = await res.text();
      assert.equal(text, 'text');
    });
  });
});
