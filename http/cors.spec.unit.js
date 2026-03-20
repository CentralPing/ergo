import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createCors from './cors.js';

describe('[Module] http/cors', () => {
  it('returns undefined for non-CORS request (no Origin header)', () => {
    const cors = createCors({origins: 'https://a.com'});
    const result = cors({headers: {}, method: 'GET'});
    assert.equal(result, undefined);
  });

  it('returns header pairs for a simple CORS request', () => {
    const cors = createCors();
    const result = cors({
      headers: {origin: 'https://a.com'},
      method: 'GET'
    });
    assert.ok(Array.isArray(result));
    const acao = result.find(([k]) => k === 'Access-Control-Allow-Origin');
    assert.ok(acao, 'should include ACAO header');
  });

  it('throws 403 when origin is denied', () => {
    const cors = createCors({origins: 'https://allowed.com'});
    let err;
    try {
      cors({headers: {origin: 'https://evil.com'}, method: 'GET'});
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 403);
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
    const acam = result.find(([k]) => k === 'Access-Control-Allow-Methods');
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
    const acah = result.find(([k]) => k === 'Access-Control-Allow-Headers');
    assert.ok(acah, 'should include ACAH header');
  });
});
