import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createAccepts from './accepts.js';

describe('[Module] http/accepts', () => {
  it('returns negotiation result for matching Accept header', () => {
    const accepts = createAccepts({types: ['application/json', 'text/html']});
    const result = accepts({headers: {accept: 'text/html'}});
    assert.equal(result.type, 'text/html');
  });

  it('returns undefined type when no type matches', () => {
    const accepts = createAccepts({types: ['application/json']});
    const result = accepts({headers: {accept: 'text/plain'}});
    assert.equal(result.type, undefined);
  });

  it('throws 406 when throwIfFail is true and type is undefined', () => {
    const accepts = createAccepts({types: ['application/json'], throwIfFail: true});
    let err;
    try {
      accepts({headers: {accept: 'text/plain'}});
    } catch (e) {
      err = e;
    }
    assert.ok(err);
    assert.equal(err.statusCode, 406);
  });

  it('does not throw when all headers can be satisfied', () => {
    const accepts = createAccepts({
      types: ['application/json'],
      throwIfFail: true
    });
    assert.doesNotThrow(() => accepts({headers: {accept: 'application/json'}}));
  });

  it('works with no Accept headers (no-header request)', () => {
    const accepts = createAccepts({types: ['application/json']});
    const result = accepts({headers: {}});
    assert.equal(typeof result.type, 'string');
  });
});
