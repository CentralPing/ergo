import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createCors from './cors.js';

describe('[Module] http/cors', () => {
  it('returns undefined for non-CORS request (no Origin header)', () => {
    const cors = createCors({origins: 'https://a.com'});
    const result = cors({headers: {}, method: 'GET'});
    assert.equal(result, undefined);
  });

  it('returns response headers for a simple CORS request', () => {
    const cors = createCors();
    const result = cors({
      headers: {origin: 'https://a.com'},
      method: 'GET'
    });
    assert.ok(result?.response?.headers);
    assert.ok(Array.isArray(result.response.headers));
    const acao = result.response.headers.find(([k]) => k === 'Access-Control-Allow-Origin');
    assert.ok(acao, 'should include ACAO header');
  });

  it('returns 403 response when origin is denied', () => {
    const cors = createCors({origins: 'https://allowed.com'});
    const result = cors({headers: {origin: 'https://evil.com'}, method: 'GET'});
    assert.deepEqual(result, {response: {statusCode: 403}});
  });

  it('includes Access-Control-Allow-Methods on preflight', () => {
    const cors = createCors({allowMethods: ['GET', 'POST']});
    const result = cors({
      headers: {
        origin: 'https://a.com',
        'access-control-request-method': 'POST'
      },
      method: 'OPTIONS'
    });
    const acam = result.response.headers.find(([k]) => k === 'Access-Control-Allow-Methods');
    assert.ok(acam, 'should include ACAM header');
  });

  it('passes requestHeaders from Access-Control-Request-Headers to lib/cors', () => {
    const cors = createCors({allowHeaders: ['Authorization', 'Content-Type']});
    const result = cors({
      headers: {
        origin: 'https://a.com',
        'access-control-request-method': 'POST',
        'access-control-request-headers': 'Authorization, Content-Type'
      },
      method: 'OPTIONS'
    });
    const acah = result.response.headers.find(([k]) => k === 'Access-Control-Allow-Headers');
    assert.ok(acah, 'should include ACAH header');
  });
});
