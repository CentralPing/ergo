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

  it('returns 428 response when neither conditional header is present', () => {
    const precondition = createPrecondition();
    const result = precondition({method: 'PUT', headers: {}});
    assert.equal(result.response.statusCode, 428);
  });

  it('returns only statusCode in response object on failure', () => {
    const precondition = createPrecondition();
    const result = precondition({method: 'PUT', headers: {}});
    assert.deepEqual(result, {response: {statusCode: 428}});
  });

  it('enforces unconditionally when methods option is omitted', () => {
    const precondition = createPrecondition();
    assert.equal(precondition({method: 'GET', headers: {}}).response.statusCode, 428);
    assert.equal(precondition({method: 'DELETE', headers: {}}).response.statusCode, 428);
  });

  it('only enforces on specified methods (array form)', () => {
    const precondition = createPrecondition({methods: ['PUT', 'PATCH']});

    assert.equal(precondition({method: 'PUT', headers: {}}).response.statusCode, 428);
    assert.equal(precondition({method: 'PATCH', headers: {}}).response.statusCode, 428);

    const result = precondition({method: 'GET', headers: {}});
    assert.equal(result, undefined);
  });

  it('only enforces on specified methods (Set form)', () => {
    const precondition = createPrecondition({methods: new Set(['DELETE'])});

    assert.equal(precondition({method: 'DELETE', headers: {}}).response.statusCode, 428);

    const result = precondition({method: 'PUT', headers: {}});
    assert.equal(result, undefined);
  });

  it('skips non-matching methods when methods option is provided', () => {
    const precondition = createPrecondition({methods: ['PUT']});
    const result = precondition({method: 'POST', headers: {}});
    assert.equal(result, undefined);
  });
});
