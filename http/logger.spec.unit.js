import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import createLogger from './logger.js';

function makeReq(overrides = {}) {
  return Object.assign(
    new EventEmitter(),
    {
      method: 'GET',
      url: '/',
      httpVersion: '1.1',
      headers: {},
      socket: {}
    },
    overrides
  );
}

function makeRes() {
  const res = new EventEmitter();
  const headers = {};
  res.setHeader = (k, v) => {
    headers[k.toLowerCase()] = v;
  };
  res.getHeader = k => headers[k.toLowerCase()];
  res.getHeaders = () => ({...headers});
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.writableFinished = false;
  res._headers = headers;
  return res;
}

describe('[Module] http/logger', () => {
  it('sets x-request-id response header', () => {
    const logger = createLogger({log: () => {}, error: () => {}});
    const req = makeReq();
    const res = makeRes();
    logger(req, res);
    assert.ok(res._headers['x-request-id'], 'should set x-request-id');
  });

  it('reads request ID from response header when pre-set (transport path)', () => {
    const logger = createLogger({log: () => {}, error: () => {}});
    const req = makeReq();
    const res = makeRes();
    res.setHeader('x-request-id', 'transport-id');
    const info = logger(req, res);
    assert.equal(res._headers['x-request-id'], 'transport-id');
    assert.equal(info.requestId, 'transport-id');
  });

  it('prefers response header over request header when both present', () => {
    const logger = createLogger({log: () => {}, error: () => {}});
    const req = makeReq({headers: {'x-request-id': 'proxy-id'}});
    const res = makeRes();
    res.setHeader('x-request-id', 'transport-id');
    const info = logger(req, res);
    assert.equal(info.requestId, 'transport-id');
    assert.equal(res._headers['x-request-id'], 'transport-id');
  });

  it('falls back to request header when response header is absent (proxy path)', () => {
    const logger = createLogger({log: () => {}, error: () => {}});
    const req = makeReq({headers: {'x-request-id': 'proxy-id'}});
    const res = makeRes();
    logger(req, res);
    assert.equal(res._headers['x-request-id'], 'proxy-id');
  });

  it('uses custom headerRequestIdName', () => {
    const logger = createLogger({
      log: () => {},
      error: () => {},
      headerRequestIdName: 'x-trace-id'
    });
    const req = makeReq();
    const res = makeRes();
    logger(req, res);
    assert.ok(res._headers['x-trace-id'], 'should set custom header name');
  });

  it('returns flattened info shape to pipeline accumulator', () => {
    const logger = createLogger({log: () => {}, error: () => {}});
    const req = makeReq({
      method: 'POST',
      url: '/users',
      httpVersion: '1.1',
      headers: {'content-type': 'application/json'},
      socket: {encrypted: true, remoteAddress: '10.0.0.1', remotePort: 54321}
    });
    const res = makeRes();
    const info = logger(req, res);

    assert.ok(info.requestId, 'should include requestId');
    assert.equal(typeof info.timestamp, 'number', 'should include numeric timestamp');
    assert.equal(info.method, 'POST', 'should promote method to top level');
    assert.equal(info.url, '/users', 'should promote url to top level');
    assert.equal(info.httpVersion, '1.1', 'should promote httpVersion to top level');

    assert.ok(info.host, 'should include host object');
    assert.equal(typeof info.host.hostname, 'string', 'host.hostname should be a string');
    assert.equal(typeof info.host.arch, 'string', 'host.arch should be a string');
    assert.equal(typeof info.host.platform, 'string', 'host.platform should be a string');
    assert.equal(typeof info.host.pid, 'number', 'host.pid should be a number');

    assert.ok(info.request, 'should include request object');
    assert.deepEqual(info.request.headers, {'content-type': 'application/json'});
    assert.equal(info.request.encrypted, true);
    assert.equal(info.request.remoteAddress, '10.0.0.1');
    assert.equal(info.request.remotePort, 54321);
  });

  it('does not include statusCode or duration in accumulator return', () => {
    const logger = createLogger({log: () => {}, error: () => {}});
    const req = makeReq();
    const res = makeRes();
    const info = logger(req, res);
    assert.equal(info.statusCode, undefined, 'statusCode not available until finish');
    assert.equal(info.duration, undefined, 'duration not available until finish');
    assert.equal(info.response, undefined, 'response not available until finish');
  });

  it('does not include os or process metric fields', () => {
    const logger = createLogger({log: () => {}, error: () => {}});
    const req = makeReq();
    const res = makeRes();
    const info = logger(req, res);
    assert.equal(info.os, undefined, 'should not include os metrics');
    assert.equal(info.process, undefined, 'should not include process metrics');
  });

  it('calls log function once on response finish with full shape', () => {
    const logged = [];
    const logger = createLogger({
      log: (...args) => logged.push(args),
      error: () => {}
    });
    const req = makeReq();
    const res = makeRes();
    logger(req, res);
    assert.equal(logged.length, 0, 'should not log before finish');
    res.emit('finish');
    assert.equal(logged.length, 1, 'should log once on finish');

    const entry = logged[0][0];
    assert.ok(entry.requestId, 'log entry should include requestId');
    assert.equal(typeof entry.duration, 'number', 'log entry should include duration');
    assert.equal(entry.statusCode, 200, 'log entry should include statusCode');
    assert.ok(entry.response, 'log entry should include response');
    assert.equal(typeof entry.response.headers, 'object', 'response should include headers');
    assert.equal(entry.response.statusMessage, 'OK', 'response should include statusMessage');
  });

  it('records inprogressTime on aborted connection (close before finish)', () => {
    const logged = [];
    const logger = createLogger({
      log: (...args) => logged.push(args),
      error: () => {}
    });
    const req = makeReq();
    const res = makeRes();
    logger(req, res);
    res.emit('close');
    const entry = logged[0][0];
    assert.equal(typeof entry.inprogressTime, 'number', 'should record inprogressTime');
    assert.equal(entry.duration, undefined, 'should not have duration on abort');
  });

  it('calls error function on response error', () => {
    const errors = [];
    const logger = createLogger({
      log: () => {},
      error: (...args) => errors.push(args)
    });
    const req = makeReq();
    const res = makeRes();
    logger(req, res);
    res.emit('error', new Error('write error'));
    assert.ok(errors.length > 0);
    const errEntry = errors[0][0];
    assert.ok(errEntry.requestId, 'error entry should include requestId');
    assert.equal(typeof errEntry.timestamp, 'number', 'error entry should include timestamp');
    assert.equal(errEntry.name, 'Error');
    assert.equal(errEntry.message, 'write error');
  });

  it('uses custom uuid function', () => {
    const logger = createLogger({log: () => {}, error: () => {}, uuid: () => 'fixed-uuid'});
    const req = makeReq();
    const res = makeRes();
    logger(req, res);
    assert.equal(res._headers['x-request-id'], 'fixed-uuid');
  });

  it('reads client IP from configured header', () => {
    const logger = createLogger({log: () => {}, error: () => {}});
    const req = makeReq({headers: {'x-real-ip': '192.168.1.100'}});
    const res = makeRes();
    const info = logger(req, res);
    assert.equal(info.ip, '192.168.1.100');
  });

  it('uses custom headerRequestIpName', () => {
    const logger = createLogger({
      log: () => {},
      error: () => {},
      headerRequestIpName: 'x-forwarded-for'
    });
    const req = makeReq({headers: {'x-forwarded-for': '10.0.0.5'}});
    const res = makeRes();
    const info = logger(req, res);
    assert.equal(info.ip, '10.0.0.5');
  });

  it('host object is frozen and shared across requests', () => {
    const logger = createLogger({log: () => {}, error: () => {}});
    const info1 = logger(makeReq(), makeRes());
    const info2 = logger(makeReq(), makeRes());
    assert.equal(info1.host, info2.host, 'host should be the same reference');
    assert.ok(Object.isFrozen(info1.host), 'host should be frozen');
  });

  it('redacts sensitive request headers by default', () => {
    const logger = createLogger({log: () => {}, error: () => {}});
    const req = makeReq({
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer secret-token',
        cookie: 'session=abc123',
        'proxy-authorization': 'Basic creds'
      }
    });
    const res = makeRes();
    const info = logger(req, res);
    assert.equal(info.request.headers['content-type'], 'application/json');
    assert.equal(info.request.headers.authorization, '[REDACTED]');
    assert.equal(info.request.headers.cookie, '[REDACTED]');
    assert.equal(info.request.headers['proxy-authorization'], '[REDACTED]');
    assert.equal(req.headers.authorization, 'Bearer secret-token', 'original not mutated');
    assert.equal(req.headers.cookie, 'session=abc123', 'original not mutated');
    assert.equal(req.headers['proxy-authorization'], 'Basic creds', 'original not mutated');
  });

  it('redacts sensitive response headers on finish', () => {
    const logged = [];
    const logger = createLogger({log: (...args) => logged.push(args), error: () => {}});
    const req = makeReq();
    const res = makeRes();
    res.setHeader('set-cookie', 'session=abc; HttpOnly');
    res.setHeader('x-custom', 'visible');
    logger(req, res);
    res.emit('finish');
    const entry = logged[0][0];
    assert.equal(entry.response.headers['set-cookie'], '[REDACTED]');
    assert.equal(entry.response.headers['x-custom'], 'visible');
    assert.equal(res.getHeader('set-cookie'), 'session=abc; HttpOnly', 'original not mutated');
    assert.equal(res.getHeader('x-custom'), 'visible', 'original not mutated');
  });

  it('allows custom redactHeaders set', () => {
    const logger = createLogger({
      log: () => {},
      error: () => {},
      redactHeaders: new Set(['x-api-key'])
    });
    const req = makeReq({
      headers: {authorization: 'Bearer token', 'x-api-key': 'secret'}
    });
    const res = makeRes();
    const info = logger(req, res);
    assert.equal(info.request.headers.authorization, 'Bearer token', 'not in custom set');
    assert.equal(info.request.headers['x-api-key'], '[REDACTED]');
  });

  it('allows disabling redaction with empty set', () => {
    const logger = createLogger({
      log: () => {},
      error: () => {},
      redactHeaders: new Set()
    });
    const req = makeReq({headers: {authorization: 'Bearer token'}});
    const res = makeRes();
    const info = logger(req, res);
    assert.equal(info.request.headers.authorization, 'Bearer token');
  });
});
