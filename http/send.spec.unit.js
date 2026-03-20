import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import createSend from './send.js';
import {createMockReq, createMockRes} from '../test/helpers.js';

describe('[Module] http/send', () => {
  const send = createSend();

  it('serializes object body as JSON', () => {
    const req = createMockReq({method: 'GET'});
    const res = createMockRes();
    send(req, res, {statusCode: 200, body: {hello: 'world'}});
    assert.ok(res._body.includes('"hello"'));
    assert.equal(res._headers['content-type'], 'application/json; charset=utf-8');
  });

  it('sets statusCode on the response', () => {
    const req = createMockReq();
    const res = createMockRes();
    send(req, res, {statusCode: 201, body: {id: 1}});
    assert.equal(res.statusCode, 201);
  });

  it('sets Content-Length header', () => {
    const req = createMockReq();
    const res = createMockRes();
    send(req, res, {statusCode: 200, body: {x: 1}});
    assert.ok(res._headers['content-length'] > 0);
  });

  it('sends string body as text/plain', () => {
    const req = createMockReq();
    const res = createMockRes();
    send(req, res, {statusCode: 200, body: 'hello world'});
    assert.equal(res._headers['content-type'], 'text/plain; charset=utf-8');
    assert.equal(res._body, 'hello world');
  });

  it('detects HTML string and sets text/html content type', () => {
    const req = createMockReq();
    const res = createMockRes();
    send(req, res, {statusCode: 200, body: '<h1>Hello</h1>'});
    assert.equal(res._headers['content-type'], 'text/html; charset=utf-8');
  });

  it('sends empty response for 204', () => {
    const req = createMockReq();
    const res = createMockRes();
    send(req, res, {statusCode: 204});
    assert.equal(res._body, null);
    assert.ok(!res._headers['content-type']);
  });

  it('sends empty response for 304', () => {
    const req = createMockReq();
    const res = createMockRes();
    send(req, res, {statusCode: 304});
    assert.equal(res._body, null);
  });

  it('generates ETag for 2xx responses', () => {
    const req = createMockReq();
    const res = createMockRes();
    send(req, res, {statusCode: 200, body: {x: 1}});
    assert.ok(res._headers['etag'], 'should set ETag');
  });

  it('returns 304 when If-None-Match matches the ETag', () => {
    const req1 = createMockReq();
    const res1 = createMockRes();
    send(req1, res1, {statusCode: 200, body: {data: 'test'}});
    const etag = res1._headers['etag'];

    const req2 = createMockReq({headers: {'if-none-match': etag}});
    const res2 = createMockRes();
    send(req2, res2, {statusCode: 200, body: {data: 'test'}});
    assert.equal(res2.statusCode, 304);
    assert.equal(res2._body, null);
  });

  it('returns 304 when If-None-Match is wildcard *', () => {
    const req = createMockReq({headers: {'if-none-match': '*'}});
    const res = createMockRes();
    send(req, res, {statusCode: 200, body: {data: 'any'}});
    assert.equal(res.statusCode, 304);
  });

  it('returns 412 when If-Match does not match for PUT', () => {
    const req = createMockReq({method: 'PUT', headers: {'if-match': '"wrong-etag"'}});
    const res = createMockRes();
    send(req, res, {statusCode: 200, body: {data: 'test'}});
    assert.equal(res.statusCode, 412);
    assert.ok(
      res._headers['content-type'].includes('application/problem+json'),
      'error response should use application/problem+json'
    );
    const body = JSON.parse(res._body);
    assert.equal(body.status, 412);
    assert.equal(body.title, 'Precondition Failed');
    assert.ok(typeof body.type === 'string' && body.type.startsWith('https://'));
    assert.ok(typeof body.detail === 'string');
  });

  it('does NOT return 412 when If-Match matches for PUT', () => {
    const req1 = createMockReq({method: 'GET'});
    const res1 = createMockRes();
    send(req1, res1, {statusCode: 200, body: {data: 'test'}});
    const etag = res1._headers['etag'];

    const req2 = createMockReq({method: 'PUT', headers: {'if-match': etag}});
    const res2 = createMockRes();
    send(req2, res2, {statusCode: 200, body: {data: 'test'}});
    assert.equal(res2.statusCode, 200, 'should not 412 when If-Match matches');
  });

  it('sets custom headers from the headers array', () => {
    const req = createMockReq();
    const res = createMockRes();
    send(req, res, {
      statusCode: 200,
      body: {x: 1},
      headers: [['X-Custom-Header', 'custom-value']]
    });
    assert.equal(res._headers['x-custom-header'], 'custom-value');
  });

  it('clears a header when header tuple value is undefined', () => {
    const req = createMockReq();
    const res = createMockRes();
    res.setHeader('X-To-Remove', 'present');
    send(req, res, {
      statusCode: 200,
      body: 'ok',
      headers: [['X-To-Remove', undefined]]
    });
    assert.ok(!res.getHeader('X-To-Remove'), 'header should be cleared');
  });

  it('does not send body when res.writableEnded is true', () => {
    const req = createMockReq();
    const res = createMockRes();
    res.writableEnded = true;
    res.writable = false;
    let endCalled = false;
    res.end = () => {
      endCalled = true;
    };
    send(req, res, {statusCode: 200, body: {x: 1}});
    assert.equal(endCalled, false, 'should not call end when finished');
  });

  it('sets application/octet-stream for Uint8Array (non-Buffer) body', () => {
    const req = createMockReq();
    const res = createMockRes();
    const arr = new Uint8Array([1, 2, 3]);
    send(req, res, {statusCode: 200, body: arr});
    assert.equal(res._headers['content-type'], 'application/octet-stream');
  });

  it('pipes a Readable stream body to the response with correct payload', async () => {
    const req = createMockReq();
    const res = createMockRes();
    const chunks = [];
    const done = new Promise(resolve => {
      res.write = chunk => {
        chunks.push(chunk);
        return true;
      };
      res.end = () => resolve();
    });
    const readable = Readable.from(['hello', ' ', 'world']);
    send(req, res, {statusCode: 200, body: readable});
    await done;
    const payload = chunks.map(c => (typeof c === 'string' ? c : c.toString())).join('');
    assert.equal(payload, 'hello world');
  });

  it('emits error on response when stream pipeline fails', async () => {
    const req = createMockReq();
    const res = createMockRes();
    const errorReceived = new Promise(resolve => {
      res.on('error', err => resolve(err));
    });
    const failStream = new Readable({
      read() {
        this.destroy(new Error('stream failure'));
      }
    });
    send(req, res, {statusCode: 200, body: failStream});
    const err = await errorReceived;
    assert.ok(err, 'error should have been emitted on res');
    assert.equal(err.message, 'stream failure');
  });

  describe('Last-Modified / date-based conditionals', () => {
    const pastDate = new Date('2025-01-01T00:00:00Z');
    const futureDate = new Date('2099-01-01T00:00:00Z');

    it('sets Last-Modified header when lastModified is provided', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {x: 1}, lastModified: pastDate});
      assert.equal(res._headers['last-modified'], pastDate.toUTCString());
    });

    it('accepts lastModified as a date string', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {x: 1}, lastModified: '2025-01-01T00:00:00Z'});
      assert.equal(res._headers['last-modified'], pastDate.toUTCString());
    });

    it('does not set Last-Modified for non-2xx responses', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 404, body: 'not found', lastModified: pastDate});
      assert.equal(res._headers['last-modified'], undefined);
    });

    it('ignores invalid lastModified dates', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {x: 1}, lastModified: 'not-a-date'});
      assert.equal(res._headers['last-modified'], undefined);
    });

    it('returns 304 when If-Modified-Since >= Last-Modified', () => {
      const req = createMockReq({
        headers: {'if-modified-since': futureDate.toUTCString()}
      });
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {x: 1}, lastModified: pastDate});
      assert.equal(res.statusCode, 304);
      assert.equal(res._body, null);
    });

    it('does not return 304 when resource is newer than If-Modified-Since', () => {
      const req = createMockReq({
        headers: {'if-modified-since': pastDate.toUTCString()}
      });
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {x: 1}, lastModified: futureDate});
      assert.equal(res.statusCode, 200);
    });

    it('skips If-Modified-Since when If-None-Match is present (RFC 9110 §13.1.3)', () => {
      const req = createMockReq({
        headers: {
          'if-none-match': '"no-match"',
          'if-modified-since': futureDate.toUTCString()
        }
      });
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {x: 1}, lastModified: pastDate});
      assert.equal(res.statusCode, 200, 'should not 304 since If-None-Match takes precedence');
    });

    it('returns 412 when If-Unmodified-Since < Last-Modified for PUT', () => {
      const req = createMockReq({
        method: 'PUT',
        headers: {'if-unmodified-since': pastDate.toUTCString()}
      });
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {x: 1}, lastModified: futureDate});
      assert.equal(res.statusCode, 412);
      const body = JSON.parse(res._body);
      assert.equal(body.status, 412);
    });

    it('does not return 412 when resource is not modified since If-Unmodified-Since', () => {
      const req = createMockReq({
        method: 'PUT',
        headers: {'if-unmodified-since': futureDate.toUTCString()}
      });
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {x: 1}, lastModified: pastDate});
      assert.equal(res.statusCode, 200);
    });

    it('skips If-Unmodified-Since when If-Match is present (RFC 9110 §13.1.4)', () => {
      const req1 = createMockReq({method: 'GET'});
      const res1 = createMockRes();
      send(req1, res1, {statusCode: 200, body: {x: 1}});
      const etag = res1._headers['etag'];

      const req = createMockReq({
        method: 'PUT',
        headers: {
          'if-match': etag,
          'if-unmodified-since': pastDate.toUTCString()
        }
      });
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {x: 1}, lastModified: futureDate});
      assert.equal(res.statusCode, 200, 'should not 412 since If-Match takes precedence');
    });

    it('handles invalid If-Modified-Since date by treating as modified', () => {
      const req = createMockReq({
        headers: {'if-modified-since': 'not-a-date'}
      });
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {x: 1}, lastModified: pastDate});
      assert.equal(res.statusCode, 200);
    });
  });

  describe('headerKeys option', () => {
    it('collects header tuples from named accumulator keys', () => {
      const sendWithKeys = createSend({headerKeys: ['cors', 'security']});
      const req = createMockReq();
      const res = createMockRes();
      sendWithKeys(req, res, {
        statusCode: 200,
        body: {ok: true},
        cors: [['Access-Control-Allow-Origin', '*']],
        security: [['X-Frame-Options', 'DENY']]
      });
      assert.equal(res._headers['access-control-allow-origin'], '*');
      assert.equal(res._headers['x-frame-options'], 'DENY');
    });

    it('explicit headers take precedence over headerKeys (applied last)', () => {
      const sendWithKeys = createSend({headerKeys: ['cache']});
      const req = createMockReq();
      const res = createMockRes();
      sendWithKeys(req, res, {
        statusCode: 200,
        body: {ok: true},
        cache: [['Cache-Control', 'no-store']],
        headers: [['Cache-Control', 'public, max-age=3600']]
      });
      assert.equal(res._headers['cache-control'], 'public, max-age=3600');
    });

    it('skips missing or non-array accumulator keys gracefully', () => {
      const sendWithKeys = createSend({headerKeys: ['cors', 'missing', 'notArray']});
      const req = createMockReq();
      const res = createMockRes();
      sendWithKeys(req, res, {
        statusCode: 200,
        body: {ok: true},
        cors: [['Access-Control-Allow-Origin', '*']],
        notArray: 'not-an-array'
      });
      assert.equal(res._headers['access-control-allow-origin'], '*');
    });

    it('defaults to empty headerKeys (no auto-collection)', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {
        statusCode: 200,
        body: {ok: true},
        cors: [['Access-Control-Allow-Origin', '*']]
      });
      assert.equal(res._headers['access-control-allow-origin'], undefined);
    });
  });

  describe('location header', () => {
    it('sets Location header when location is provided with 201 status', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 201, body: {id: 1}, location: '/items/1'});
      assert.equal(res._headers['location'], '/items/1');
    });

    it('sets Location header for 3xx redirect responses', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 301, body: 'Moved', location: 'https://example.com/new'});
      assert.equal(res._headers['location'], 'https://example.com/new');
    });

    it('sets Location header for 200 responses', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 200, body: {ok: true}, location: '/resource/42'});
      assert.equal(res._headers['location'], '/resource/42');
    });

    it('does not set Location for 4xx responses', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 404, body: 'not found', location: '/items/1'});
      assert.equal(res._headers['location'], undefined);
    });

    it('does not set Location for 5xx responses', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 500, body: 'error', location: '/items/1'});
      assert.equal(res._headers['location'], undefined);
    });

    it('does not set Location when location is not provided', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 201, body: {id: 1}});
      assert.equal(res._headers['location'], undefined);
    });

    it('does not set Location when location is falsy', () => {
      const req = createMockReq();
      const res = createMockRes();
      send(req, res, {statusCode: 201, body: {id: 1}, location: ''});
      assert.equal(res._headers['location'], undefined);
    });
  });

  describe('envelope option', () => {
    it('wraps 2xx Object body with built-in envelope when envelope=true', () => {
      const sendEnvelope = createSend({envelope: true, etag: false});
      const req = createMockReq();
      const res = createMockRes();
      res.setHeader('x-request-id', 'req-123');
      sendEnvelope(req, res, {statusCode: 200, body: {hello: 'world'}});
      const body = JSON.parse(res._body);
      assert.equal(body.id, 'req-123');
      assert.equal(body.status, 200);
      assert.deepEqual(body.data, {hello: 'world'});
      assert.equal(body.count, undefined, 'count should not be set for non-array data');
    });

    it('includes count when data is an array', () => {
      const sendEnvelope = createSend({envelope: true, etag: false});
      const req = createMockReq();
      const res = createMockRes();
      res.setHeader('x-request-id', 'req-456');
      sendEnvelope(req, res, {statusCode: 200, body: [{id: 1}, {id: 2}]});
      const body = JSON.parse(res._body);
      assert.equal(body.count, 2);
      assert.deepEqual(body.data, [{id: 1}, {id: 2}]);
    });

    it('uses custom envelope function', () => {
      const customEnvelope = (data, {requestId, statusCode, method}) => ({
        meta: {requestId, statusCode, method},
        result: data
      });
      const sendEnvelope = createSend({envelope: customEnvelope, etag: false});
      const req = createMockReq({method: 'POST'});
      const res = createMockRes();
      res.setHeader('x-request-id', 'custom-id');
      sendEnvelope(req, res, {statusCode: 201, body: {id: 42}});
      const body = JSON.parse(res._body);
      assert.deepEqual(body.meta, {requestId: 'custom-id', statusCode: 201, method: 'POST'});
      assert.deepEqual(body.result, {id: 42});
    });

    it('does not envelope non-2xx responses', () => {
      const sendEnvelope = createSend({envelope: true, etag: false});
      const req = createMockReq();
      const res = createMockRes();
      sendEnvelope(req, res, {statusCode: 400, body: {error: 'bad request'}});
      const body = JSON.parse(res._body);
      assert.equal(body.data, undefined, 'should not envelope error responses');
      assert.deepEqual(body, {error: 'bad request'});
    });

    it('does not envelope string bodies', () => {
      const sendEnvelope = createSend({envelope: true, etag: false});
      const req = createMockReq();
      const res = createMockRes();
      sendEnvelope(req, res, {statusCode: 200, body: 'plain text'});
      assert.equal(res._body, 'plain text');
    });

    it('does not envelope Error instances', () => {
      const sendEnvelope = createSend({envelope: true, etag: false});
      const req = createMockReq();
      const res = createMockRes();
      const err = new Error('test error');
      sendEnvelope(req, res, {statusCode: 200, body: err});
      const body = JSON.parse(res._body);
      assert.equal(body.data, undefined, 'should not wrap Error');
    });

    it('does not envelope when envelope=false (default)', () => {
      const req = createMockReq();
      const res = createMockRes();
      res.setHeader('x-request-id', 'req-789');
      send(req, res, {statusCode: 200, body: {hello: 'world'}});
      const body = JSON.parse(res._body);
      assert.equal(body.hello, 'world');
      assert.equal(body.data, undefined, 'should not have envelope wrapper');
    });

    it('does not envelope 3xx redirects', () => {
      const sendEnvelope = createSend({envelope: true, etag: false});
      const req = createMockReq();
      const res = createMockRes();
      sendEnvelope(req, res, {statusCode: 301, body: 'Moved', location: '/new'});
      assert.equal(res._body, 'Moved');
    });
  });

  describe('appendVary deduplication', () => {
    it('appends Vary value without duplication', () => {
      const sendWithVary = createSend({vary: ['Accept-Encoding']});
      const req = createMockReq();
      const res = createMockRes();
      // Pre-set a Vary header so appendVary runs the dedup branch
      res.setHeader('Vary', 'Accept');
      sendWithVary(req, res, {statusCode: 200, body: 'ok'});
      const vary = res.getHeader('Vary') ?? '';
      assert.ok(vary.toLowerCase().includes('accept-encoding'), 'should append Accept-Encoding');
      const aeCount = vary
        .split(',')
        .filter(p => p.trim().toLowerCase() === 'accept-encoding').length;
      assert.equal(aeCount, 1, 'no duplicates');
    });

    it('does not duplicate an already-present Vary value', () => {
      const sendWithVary = createSend({vary: ['Accept']});
      const req = createMockReq();
      const res = createMockRes();
      res.setHeader('Vary', 'Accept');
      sendWithVary(req, res, {statusCode: 200, body: 'ok'});
      const vary = res.getHeader('Vary') ?? '';
      const count = vary.split(',').filter(p => p.trim().toLowerCase() === 'accept').length;
      assert.equal(count, 1, 'should not duplicate existing Vary entry');
    });
  });

  describe('preferKey (RFC 7240)', () => {
    const sendWithPrefer = createSend({preferKey: 'prefer', etag: false});

    it('return=minimal converts 200 to 204 No Content', () => {
      const req = createMockReq();
      const res = createMockRes();
      sendWithPrefer(req, res, {statusCode: 200, body: {id: 1}, prefer: {return: 'minimal'}});
      assert.equal(res.statusCode, 204);
      assert.equal(res._headers['preference-applied'], 'return=minimal');
      assert.equal(res._headers['content-type'], undefined);
      assert.equal(res._headers['content-length'], undefined);
    });

    it('return=minimal on 201 keeps 201 but strips body', () => {
      const req = createMockReq();
      const res = createMockRes();
      sendWithPrefer(req, res, {
        statusCode: 201,
        body: {id: 1, name: 'item'},
        location: '/items/1',
        prefer: {return: 'minimal'}
      });
      assert.equal(res.statusCode, 201);
      assert.equal(res._headers['preference-applied'], 'return=minimal');
      assert.equal(res._headers['location'], '/items/1');
      assert.equal(res._headers['content-type'], undefined);
    });

    it('return=representation sets Preference-Applied and keeps body', () => {
      const req = createMockReq();
      const res = createMockRes();
      sendWithPrefer(req, res, {
        statusCode: 200,
        body: {id: 1},
        prefer: {return: 'representation'}
      });
      assert.equal(res.statusCode, 200);
      assert.equal(res._headers['preference-applied'], 'return=representation');
      assert.ok(res._body.includes('"id"'));
    });

    it('no Prefer header does not set Preference-Applied', () => {
      const req = createMockReq();
      const res = createMockRes();
      sendWithPrefer(req, res, {statusCode: 200, body: {id: 1}, prefer: {}});
      assert.equal(res._headers['preference-applied'], undefined);
      assert.ok(res._body.includes('"id"'));
    });

    it('does not apply return=minimal to non-2xx responses', () => {
      const req = createMockReq();
      const res = createMockRes();
      sendWithPrefer(req, res, {
        statusCode: 400,
        body: {error: 'bad'},
        prefer: {return: 'minimal'}
      });
      assert.equal(res.statusCode, 400);
      assert.equal(res._headers['preference-applied'], undefined);
      assert.ok(res._body.includes('"error"'));
    });

    it('adds Vary: Prefer to the response', () => {
      const req = createMockReq();
      const res = createMockRes();
      sendWithPrefer(req, res, {statusCode: 200, body: 'ok', prefer: {}});
      const vary = res.getHeader('Vary') ?? '';
      assert.ok(vary.includes('Prefer'), 'Vary should include Prefer');
    });

    it('does not add Vary: Prefer when preferKey is not set', () => {
      const sendNoPref = createSend({etag: false});
      const req = createMockReq();
      const res = createMockRes();
      sendNoPref(req, res, {statusCode: 200, body: 'ok'});
      const vary = res.getHeader('Vary') ?? '';
      assert.ok(!vary.includes('Prefer'), 'Vary should not include Prefer');
    });
  });
});
