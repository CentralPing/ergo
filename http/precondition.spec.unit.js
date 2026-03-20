import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createPrecondition from './precondition.js';

describe('[Module] http/precondition', () => {
  it('passes when If-Match header is present', () => {
    const precondition = createPrecondition();
    const result = precondition({method: 'PUT', headers: {'if-match': '"etag123"'}});
    assert.equal(result, undefined);
  });

  it('passes when If-Unmodified-Since header is present', () => {
    const precondition = createPrecondition();
    const result = precondition({
      method: 'PATCH',
      headers: {'if-unmodified-since': 'Wed, 21 Oct 2015 07:28:00 GMT'}
    });
    assert.equal(result, undefined);
  });

  it('passes when both conditional headers are present', () => {
    const precondition = createPrecondition();
    const result = precondition({
      method: 'PUT',
      headers: {
        'if-match': '"etag123"',
        'if-unmodified-since': 'Wed, 21 Oct 2015 07:28:00 GMT'
      }
    });
    assert.equal(result, undefined);
  });

  it('throws 428 when neither conditional header is present', () => {
    const precondition = createPrecondition();
    assert.throws(
      () => precondition({method: 'PUT', headers: {}}),
      err => {
        assert.equal(err.status, 428);
        assert.equal(err.title, 'Precondition Required');
        assert.equal(err.type, 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428');
        return true;
      }
    );
  });

  it('RFC 9457 body shape on thrown error', () => {
    const precondition = createPrecondition();
    try {
      precondition({method: 'PUT', headers: {}});
      assert.fail('expected throw');
    } catch (err) {
      const json = JSON.parse(JSON.stringify(err));
      assert.equal(json.status, 428);
      assert.equal(json.title, 'Precondition Required');
      assert.ok(json.type);
      assert.ok(json.detail);
    }
  });

  it('enforces unconditionally when methods option is omitted', () => {
    const precondition = createPrecondition();
    assert.throws(
      () => precondition({method: 'GET', headers: {}}),
      err => err.status === 428
    );
    assert.throws(
      () => precondition({method: 'DELETE', headers: {}}),
      err => err.status === 428
    );
  });

  it('only enforces on specified methods (array form)', () => {
    const precondition = createPrecondition({methods: ['PUT', 'PATCH']});

    assert.throws(
      () => precondition({method: 'PUT', headers: {}}),
      err => err.status === 428
    );
    assert.throws(
      () => precondition({method: 'PATCH', headers: {}}),
      err => err.status === 428
    );

    const result = precondition({method: 'GET', headers: {}});
    assert.equal(result, undefined);
  });

  it('only enforces on specified methods (Set form)', () => {
    const precondition = createPrecondition({methods: new Set(['DELETE'])});

    assert.throws(
      () => precondition({method: 'DELETE', headers: {}}),
      err => err.status === 428
    );

    const result = precondition({method: 'PUT', headers: {}});
    assert.equal(result, undefined);
  });

  it('skips non-matching methods when methods option is provided', () => {
    const precondition = createPrecondition({methods: ['PUT']});
    const result = precondition({method: 'POST', headers: {}});
    assert.equal(result, undefined);
  });
});
