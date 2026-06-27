import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {redactHeaders, DEFAULT_REDACTED_HEADERS} from './redact-headers.js';

describe('[Boundary] lib/redact-headers', () => {
  it('exports DEFAULT_REDACTED_HEADERS with the expected header names', () => {
    assert.ok(DEFAULT_REDACTED_HEADERS instanceof Set);
    assert.equal(DEFAULT_REDACTED_HEADERS.size, 4);
    assert.ok(DEFAULT_REDACTED_HEADERS.has('authorization'));
    assert.ok(DEFAULT_REDACTED_HEADERS.has('proxy-authorization'));
    assert.ok(DEFAULT_REDACTED_HEADERS.has('cookie'));
    assert.ok(DEFAULT_REDACTED_HEADERS.has('set-cookie'));
  });

  it('redacts matching headers using the default set', () => {
    const headers = {
      'content-type': 'application/json',
      authorization: 'Bearer secret-token',
      cookie: 'session=abc123',
      'x-custom': 'safe'
    };
    const result = redactHeaders(headers, DEFAULT_REDACTED_HEADERS);
    assert.equal(result['content-type'], 'application/json');
    assert.equal(result.authorization, '[REDACTED]');
    assert.equal(result.cookie, '[REDACTED]');
    assert.equal(result['x-custom'], 'safe');
  });

  it('redacts matching headers using a custom set', () => {
    const headers = {'x-api-key': 'secret', 'content-type': 'text/plain'};
    const customSet = new Set(['x-api-key']);
    const result = redactHeaders(headers, customSet);
    assert.equal(result['x-api-key'], '[REDACTED]');
    assert.equal(result['content-type'], 'text/plain');
  });

  it('returns headers unchanged when redactSet is empty', () => {
    const headers = {authorization: 'Bearer token'};
    const result = redactHeaders(headers, new Set());
    assert.equal(result, headers);
  });

  it('returns headers unchanged when redactSet is undefined', () => {
    const headers = {authorization: 'Bearer token'};
    const result = redactHeaders(headers, undefined);
    assert.equal(result, headers);
  });

  it('returns headers unchanged when redactSet is null', () => {
    const headers = {authorization: 'Bearer token'};
    const result = redactHeaders(headers, null);
    assert.equal(result, headers);
  });

  it('returns a null-prototype copy when no headers match the redact set', () => {
    const headers = {'content-type': 'application/json', 'x-custom': 'value'};
    const result = redactHeaders(headers, DEFAULT_REDACTED_HEADERS);
    assert.notEqual(result, headers);
    assert.equal(result['content-type'], 'application/json');
    assert.equal(result['x-custom'], 'value');
    assert.equal(Object.keys(result).length, 2);
    assert.equal(Object.getPrototypeOf(result), null);
  });

  it('redacts all headers when all match the set', () => {
    const headers = {
      authorization: 'Basic abc',
      'proxy-authorization': 'Bearer xyz',
      cookie: 'sid=123',
      'set-cookie': 'sid=456; HttpOnly'
    };
    const result = redactHeaders(headers, DEFAULT_REDACTED_HEADERS);
    assert.equal(result.authorization, '[REDACTED]');
    assert.equal(result['proxy-authorization'], '[REDACTED]');
    assert.equal(result.cookie, '[REDACTED]');
    assert.equal(result['set-cookie'], '[REDACTED]');
  });

  it('does not mutate the original headers object', () => {
    const headers = {authorization: 'Bearer token', 'content-type': 'text/html'};
    const original = {...headers};
    redactHeaders(headers, DEFAULT_REDACTED_HEADERS);
    assert.deepEqual(headers, original);
  });

  it('handles an empty headers object', () => {
    const result = redactHeaders({}, DEFAULT_REDACTED_HEADERS);
    assert.equal(Object.keys(result).length, 0);
    assert.equal(Object.getPrototypeOf(result), null);
  });

  it('matching is case-sensitive (Node.js res.getHeaders() lowercases names)', () => {
    const headers = {Authorization: 'Bearer token', authorization: 'Bearer token2'};
    const result = redactHeaders(headers, DEFAULT_REDACTED_HEADERS);
    assert.equal(result.Authorization, 'Bearer token');
    assert.equal(result.authorization, '[REDACTED]');
  });
});
