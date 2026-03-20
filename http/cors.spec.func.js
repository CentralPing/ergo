import {describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {setupServer, fetch} from '../test/helpers.js';
import createCors from './cors.js';

describe('[Contract] http/cors', () => {
  let baseUrl, close;

  const corsMw = createCors({
    origins: ['https://allowed.example.com'],
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Authorization', 'Content-Type']
  });

  before(async () => {
    ({baseUrl, close} = await setupServer((req, res) => {
      // Apply CORS headers manually for this test
      if (req.headers.origin) {
        try {
          const headers = corsMw(req);
          if (headers) {
            for (const [name, value] of headers) {
              res.setHeader(name, value);
            }
          }
        } catch (err) {
          res.statusCode = err.statusCode ?? 403;
          res.end(JSON.stringify({error: err.message}));
          return;
        }
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ok: true}));
    }));
  });

  after(() => close());

  it('adds Access-Control-Allow-Origin for allowed origin', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {origin: 'https://allowed.example.com'}
    });
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('access-control-allow-origin'), 'should set ACAO header');
  });

  it('rejects denied origin with 403', async () => {
    const res = await fetch(`${baseUrl}/`, {
      headers: {origin: 'https://evil.example.com'}
    });
    assert.equal(res.status, 403);
  });

  it('non-CORS request (no Origin) proceeds normally', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    assert.ok(!res.headers.get('access-control-allow-origin'), 'should not set ACAO for non-CORS');
  });
});
