import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import parse from './parse.js';

const np = props => Object.assign(Object.create(null), props);

describe('[Boundary] lib/cookie/parse', () => {
  it('returns empty object for empty string', () => {
    assert.deepEqual(parse(''), np({}));
  });

  it('parses a single cookie', () => {
    assert.deepEqual(parse('session=abc123'), np({session: 'abc123'}));
  });

  it('parses multiple cookies', () => {
    assert.deepEqual(parse('a=1; b=2; c=3'), np({a: '1', b: '2', c: '3'}));
  });

  it('aggregates duplicate names into array when collection:true (default)', () => {
    const result = parse('tag=a; tag=b; tag=c');
    assert.deepEqual(result.tag, ['a', 'b', 'c']);
  });

  it('keeps last value for duplicate names when collection:false', () => {
    const result = parse('tag=a; tag=b', {collection: false});
    assert.equal(result.tag, 'b');
  });

  it('applies a custom decoder', () => {
    const result = parse('name=hello', {
      decoder: ([name, value]) => [name, value.toUpperCase()]
    });
    assert.equal(result.name, 'HELLO');
  });

  it('throws when cookie count exceeds max (uses i > max semantics)', () => {
    // max: 1 means throw when processing a cookie at index > 1 (i.e., 3rd cookie, i=2)
    assert.throws(() => parse('a=1; b=2; c=3', {max: 1}));
  });
});
