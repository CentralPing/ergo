import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createCors from './cors.js';

describe('[Boundary] lib/cors', () => {
  describe('wildcard + credentials warning', () => {
    it('emits ERGO_CORS_WILDCARD_CREDENTIALS once and deduplicates subsequent calls', () => {
      const warnings = [];
      const orig = process.emitWarning;
      process.emitWarning = (msg, opts) => warnings.push({msg, opts});
      try {
        createCors({origins: '*', allowCredentials: true});
        createCors({origins: '*', allowCredentials: true});
      } finally {
        process.emitWarning = orig;
      }
      assert.equal(warnings.length, 1);
      assert.equal(warnings[0].opts.type, 'ErgoWarning');
      assert.equal(warnings[0].opts.code, 'ERGO_CORS_WILDCARD_CREDENTIALS');
      assert.ok(warnings[0].msg.includes('allowCredentials: true'));
      assert.ok(warnings[0].msg.includes('explicit origin allowlist'));
    });

    it('does not emit when allowCredentials is false (default)', () => {
      const warnings = [];
      const orig = process.emitWarning;
      process.emitWarning = (msg, opts) => warnings.push({msg, opts});
      try {
        createCors({origins: '*', allowCredentials: false});
      } finally {
        process.emitWarning = orig;
      }
      assert.equal(warnings.length, 0);
    });

    it('does not emit when origins is not wildcard', () => {
      const warnings = [];
      const orig = process.emitWarning;
      process.emitWarning = (msg, opts) => warnings.push({msg, opts});
      try {
        createCors({origins: 'https://app.example.com', allowCredentials: true});
      } finally {
        process.emitWarning = orig;
      }
      assert.equal(warnings.length, 0);
    });

    it('does not emit when no options provided', () => {
      const warnings = [];
      const orig = process.emitWarning;
      process.emitWarning = (msg, opts) => warnings.push({msg, opts});
      try {
        createCors();
      } finally {
        process.emitWarning = orig;
      }
      assert.equal(warnings.length, 0);
    });

    it('behavior unchanged — validator still reflects origin when warning emitted', () => {
      const validator = createCors({origins: '*', allowCredentials: true});
      const {allowed, info} = validator({origin: 'https://evil.example.com', method: 'GET'});
      assert.equal(allowed, true);
      const acao = info.headers.find(h => h.h === 'Access-Control-Allow-Origin');
      assert.equal(acao.v, 'https://evil.example.com');
    });
  });

  describe('wildcard origin', () => {
    it('allows any origin by default', () => {
      const validator = createCors();
      const {allowed, info} = validator({origin: 'https://any.example.com', method: 'GET'});
      assert.equal(allowed, true);
      const acao = info.headers.find(h => h.h === 'Access-Control-Allow-Origin');
      assert.equal(acao.v, '*');
    });

    it('reflects origin when credentials are enabled with wildcard', () => {
      const validator = createCors({allowCredentials: true});
      const {allowed, info} = validator({origin: 'https://app.example.com', method: 'GET'});
      assert.equal(allowed, true);
      const acao = info.headers.find(h => h.h === 'Access-Control-Allow-Origin');
      assert.equal(acao.v, 'https://app.example.com');
    });
  });

  describe('string origin', () => {
    it('allows exact match', () => {
      const validator = createCors({origins: 'https://app.example.com'});
      const {allowed} = validator({origin: 'https://app.example.com', method: 'GET'});
      assert.equal(allowed, true);
    });

    it('denies non-matching origin', () => {
      const validator = createCors({origins: 'https://app.example.com'});
      const {allowed} = validator({origin: 'https://evil.example.com', method: 'GET'});
      assert.equal(allowed, false);
    });
  });

  describe('regex origin', () => {
    it('allows origin matching the pattern', () => {
      const validator = createCors({origins: /\.example\.com$/});
      const {allowed} = validator({origin: 'https://app.example.com', method: 'GET'});
      assert.equal(allowed, true);
    });

    it('denies origin not matching the pattern', () => {
      const validator = createCors({origins: /\.example\.com$/});
      const {allowed} = validator({origin: 'https://evil.test', method: 'GET'});
      assert.equal(allowed, false);
    });
  });

  describe('array origin', () => {
    it('allows origins in the list', () => {
      const validator = createCors({origins: ['https://a.com', 'https://b.com']});
      assert.equal(validator({origin: 'https://a.com', method: 'GET'}).allowed, true);
      assert.equal(validator({origin: 'https://b.com', method: 'GET'}).allowed, true);
    });

    it('denies origin not in the list', () => {
      const validator = createCors({origins: ['https://a.com']});
      assert.equal(validator({origin: 'https://c.com', method: 'GET'}).allowed, false);
    });
  });

  describe('function origin validator', () => {
    it('calls validator function and allows when it returns truthy', () => {
      const validator = createCors({origins: origin => origin.endsWith('.example.com')});
      assert.equal(validator({origin: 'https://sub.example.com', method: 'GET'}).allowed, true);
    });

    it('denies when validator function returns falsy', () => {
      const validator = createCors({origins: () => false});
      assert.equal(validator({origin: 'https://any.com', method: 'GET'}).allowed, false);
    });
  });

  describe('method validation', () => {
    it('denies a method not in allowMethods', () => {
      const validator = createCors({allowMethods: ['GET', 'POST']});
      const {allowed} = validator({origin: 'https://a.com', method: 'DELETE'});
      assert.equal(allowed, false);
    });

    it('allows a method in allowMethods', () => {
      const validator = createCors({allowMethods: ['GET', 'POST', 'DELETE']});
      assert.equal(validator({origin: 'https://a.com', method: 'DELETE'}).allowed, true);
    });
  });

  describe('preflight request', () => {
    it('includes Access-Control-Allow-Methods on preflight', () => {
      const validator = createCors({allowMethods: ['GET', 'POST']});
      const {allowed, info} = validator({
        origin: 'https://a.com',
        method: 'OPTIONS',
        requestMethod: 'POST'
      });
      assert.equal(allowed, true);
      const acam = info.headers.find(h => h.h === 'Access-Control-Allow-Methods');
      assert.ok(acam, 'should include Access-Control-Allow-Methods');
    });

    it('denies preflight for disallowed requestMethod', () => {
      const validator = createCors({allowMethods: ['GET']});
      const {allowed} = validator({
        origin: 'https://a.com',
        method: 'OPTIONS',
        requestMethod: 'DELETE'
      });
      assert.equal(allowed, false);
    });

    it('includes Access-Control-Allow-Headers when requestHeaders provided', () => {
      const validator = createCors({allowHeaders: ['Content-Type', 'Authorization']});
      const {info} = validator({
        origin: 'https://a.com',
        method: 'OPTIONS',
        requestMethod: 'POST',
        requestHeaders: ['Content-Type', 'Authorization']
      });
      const acah = info.headers.find(h => h.h === 'Access-Control-Allow-Headers');
      assert.ok(acah, 'should include Access-Control-Allow-Headers');
      assert.ok(acah.v.includes('Content-Type'));
    });

    it('includes maxAge on preflight when configured', () => {
      const validator = createCors({maxAge: 600});
      const {info} = validator({
        origin: 'https://a.com',
        method: 'OPTIONS',
        requestMethod: 'GET'
      });
      const ma = info.headers.find(h => h.h === 'Access-Control-Max-Age');
      assert.equal(ma.v, 600);
    });
  });

  describe('credentials', () => {
    it('includes Access-Control-Allow-Credentials when allowCredentials is true', () => {
      const validator = createCors({allowCredentials: true, origins: 'https://a.com'});
      const {info} = validator({origin: 'https://a.com', method: 'GET'});
      const acac = info.headers.find(h => h.h === 'Access-Control-Allow-Credentials');
      assert.equal(acac.v, true);
    });
  });

  describe('Vary header', () => {
    it('includes Vary: Origin when origin is not a simple string', () => {
      const validator = createCors({origins: ['https://a.com', 'https://b.com']});
      const {info} = validator({origin: 'https://a.com', method: 'GET'});
      const vary = info.headers.find(h => h.h === 'Vary');
      assert.ok(vary, 'should include Vary header');
      assert.equal(vary.v, 'Origin');
    });

    it('preflight includes Vary: Access-Control-Request-Method (singular)', () => {
      const validator = createCors();
      const {info} = validator({
        origin: 'https://a.com',
        method: 'OPTIONS',
        requestMethod: 'POST'
      });
      const vary = info.headers.filter(h => h.h === 'Vary');
      const methodVary = vary.find(h => h.v === 'Access-Control-Request-Method');
      assert.ok(methodVary, 'should include Vary: Access-Control-Request-Method');
      const pluralVary = vary.find(h => h.v === 'Access-Control-Request-Methods');
      assert.equal(pluralVary, undefined, 'must not use plural Access-Control-Request-Methods');
    });

    it('preflight includes Vary: Access-Control-Request-Headers when allowHeaders is non-string', () => {
      const validator = createCors({allowHeaders: ['Content-Type', 'Authorization']});
      const {info} = validator({
        origin: 'https://a.com',
        method: 'OPTIONS',
        requestMethod: 'POST',
        requestHeaders: ['Content-Type']
      });
      const vary = info.headers.filter(h => h.h === 'Vary');
      const headersVary = vary.find(h => h.v === 'Access-Control-Request-Headers');
      assert.ok(headersVary, 'should include Vary: Access-Control-Request-Headers');
    });

    it('non-preflight response does not include preflight Vary tokens', () => {
      const validator = createCors();
      const {info} = validator({origin: 'https://a.com', method: 'GET'});
      const vary = info.headers.filter(h => h.h === 'Vary');
      const methodVary = vary.find(h => h.v === 'Access-Control-Request-Method');
      assert.equal(
        methodVary,
        undefined,
        'non-preflight must not include Access-Control-Request-Method Vary'
      );
      const headersVary = vary.find(h => h.v === 'Access-Control-Request-Headers');
      assert.equal(
        headersVary,
        undefined,
        'non-preflight must not include Access-Control-Request-Headers Vary'
      );
    });
  });

  describe('exposeHeaders', () => {
    it('includes Access-Control-Expose-Headers when configured', () => {
      const validator = createCors({exposeHeaders: ['X-Request-Id', 'X-Total-Count']});
      const {info} = validator({origin: 'https://a.com', method: 'GET'});
      const aceh = info.headers.find(h => h.h === 'Access-Control-Expose-Headers');
      assert.ok(aceh);
    });
  });
});
