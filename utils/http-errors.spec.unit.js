import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import httpErrors from './http-errors.js';

describe('[Boundary] utils/http-errors', () => {
  it('creates an Error instance with the given status code', () => {
    const err = httpErrors(404);
    assert.ok(err instanceof Error);
    assert.equal(err.statusCode, 404);
    assert.equal(err.status, 404);
  });

  it('sets name from STATUS_CODES with spaces removed', () => {
    const err = httpErrors(404);
    assert.equal(err.name, 'NotFound');

    const err2 = httpErrors(422);
    assert.equal(err2.name, 'UnprocessableEntity');
  });

  it('sets default message and detail from STATUS_CODES', () => {
    const err = httpErrors(404);
    assert.equal(err.message, 'Not Found');
    assert.equal(err.detail, 'Not Found');
  });

  it('sets RFC 9457 type to MDN docs link', () => {
    const err = httpErrors(404);
    assert.ok(err.type.includes('404'));
    assert.ok(err.type.startsWith('https://'));
  });

  it('sets RFC 9457 title to STATUS_CODES text', () => {
    const err = httpErrors(404);
    assert.equal(err.title, 'Not Found');

    const err2 = httpErrors(422);
    assert.equal(err2.title, 'Unprocessable Entity');
  });

  it('allows overriding detail via message (backward compat)', () => {
    const err = httpErrors(422, {message: 'Custom validation error'});
    assert.equal(err.message, 'Custom validation error');
    assert.equal(err.detail, 'Custom validation error');
  });

  it('allows overriding detail directly', () => {
    const err = httpErrors(422, {detail: 'Custom validation error'});
    assert.equal(err.message, 'Custom validation error');
    assert.equal(err.detail, 'Custom validation error');
  });

  it('spreads extra properties onto the error', () => {
    const err = httpErrors(422, {details: [{field: 'name', message: 'required'}]});
    assert.ok(Array.isArray(err.details));
    assert.equal(err.details[0].field, 'name');
  });

  it('toJSON produces RFC 9457 Problem Details format', () => {
    const err = httpErrors(422, {detail: 'Invalid email', details: [{field: 'email'}]});
    const json = JSON.parse(JSON.stringify(err));

    assert.equal(json.type, err.type);
    assert.equal(json.title, 'Unprocessable Entity');
    assert.equal(json.status, 422);
    assert.equal(json.detail, 'Invalid email');
    assert.ok(Array.isArray(json.details));
    assert.equal(json.statusCode, undefined, 'toJSON should not include internal statusCode');
    assert.equal(json.headers, undefined, 'toJSON should not include headers');
    assert.equal(json.originalError, undefined, 'toJSON should not include originalError');
  });

  it('defaults to 500 when no statusCode given', () => {
    const err = httpErrors();
    assert.equal(err.statusCode, 500);
    assert.equal(err.name, 'InternalServerError');
  });

  it('handles unknown status codes using 500 fallback for name/message', () => {
    const err = httpErrors(999);
    assert.equal(err.statusCode, 999);
    assert.equal(err.name, 'InternalServerError');
  });

  describe('instance', () => {
    it('includes instance on the error object when provided', () => {
      const err = httpErrors(404, {instance: 'urn:uuid:abc-123'});
      assert.equal(err.instance, 'urn:uuid:abc-123');
    });

    it('includes instance in toJSON output when set', () => {
      const err = httpErrors(404, {instance: 'urn:uuid:abc-123'});
      const json = JSON.parse(JSON.stringify(err));
      assert.equal(json.instance, 'urn:uuid:abc-123');
    });

    it('omits instance from toJSON output when not set', () => {
      const err = httpErrors(404);
      const json = JSON.parse(JSON.stringify(err));
      assert.equal(json.instance, undefined);
    });

    it('allows instance to be set after creation (for handler auto-populate)', () => {
      const err = httpErrors(500);
      assert.equal(err.instance, undefined);
      err.instance = 'urn:uuid:late-set';
      const json = JSON.parse(JSON.stringify(err));
      assert.equal(json.instance, 'urn:uuid:late-set');
    });
  });

  describe('retryAfter', () => {
    it('appends Retry-After header when retryAfter is a number', () => {
      const err = httpErrors(429, {retryAfter: 60});
      const retryHeader = err.headers.find(([h]) => h === 'Retry-After');
      assert.ok(retryHeader, 'should include Retry-After header');
      assert.equal(retryHeader[1], '60');
    });

    it('appends Retry-After header when retryAfter is a date string', () => {
      const date = 'Wed, 21 Oct 2025 07:28:00 GMT';
      const err = httpErrors(503, {retryAfter: date});
      const retryHeader = err.headers.find(([h]) => h === 'Retry-After');
      assert.ok(retryHeader);
      assert.equal(retryHeader[1], date);
    });

    it('merges retryAfter header with existing headers', () => {
      const err = httpErrors(429, {
        retryAfter: 120,
        headers: [['X-Custom', 'value']]
      });
      assert.equal(err.headers.length, 2);
      assert.deepEqual(err.headers[0], ['X-Custom', 'value']);
      assert.deepEqual(err.headers[1], ['Retry-After', '120']);
    });

    it('includes retryAfter in toJSON output', () => {
      const err = httpErrors(429, {retryAfter: 60});
      const json = JSON.parse(JSON.stringify(err));
      assert.equal(json.retryAfter, 60);
      assert.equal(json.status, 429);
    });

    it('does not add Retry-After header when retryAfter is not provided', () => {
      const err = httpErrors(429);
      assert.equal(err.headers, undefined);
    });
  });

  describe('extra key safety', () => {
    it('extra keys cannot override core RFC 9457 fields in toJSON', () => {
      const err = httpErrors(422, {status: 200, title: 'Hijacked', name: 'Fake'});
      const json = JSON.parse(JSON.stringify(err));
      assert.equal(json.status, 422);
      assert.equal(json.title, 'Unprocessable Entity');
    });

    it('extra keys cannot override core properties on the error object', () => {
      const err = httpErrors(500, {status: 200, statusCode: 418, name: 'Fake'});
      assert.equal(err.status, 500);
      assert.equal(err.statusCode, 500);
      assert.equal(err.name, 'InternalServerError');
    });

    it('toJSON reads extension values from this, not the closure', () => {
      const err = httpErrors(429, {retryAfter: 60});
      err.retryAfter = 120;
      const json = JSON.parse(JSON.stringify(err));
      assert.equal(json.retryAfter, 120);
    });
  });
});
