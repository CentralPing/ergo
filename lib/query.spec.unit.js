import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import parse from './query.js';

const np = props => Object.assign(Object.create(null), props);

describe('[Boundary] lib/query', () => {
  it('returns empty object for null/undefined/empty input', () => {
    assert.deepEqual(parse(null), np({}));
    assert.deepEqual(parse(undefined), np({}));
    assert.deepEqual(parse(''), np({}));
  });

  it('parses a simple key=value pair', () => {
    assert.deepEqual(parse('foo=bar'), np({foo: 'bar'}));
  });

  it('parses multiple pairs', () => {
    assert.deepEqual(parse('a=1&b=2'), np({a: '1', b: '2'}));
  });

  it('decodes percent-encoded characters', () => {
    const result = parse('key=hello%20world');
    assert.equal(result.key, 'hello world');
  });

  it('decodes + as space', () => {
    const result = parse('q=hello+world');
    assert.equal(result.q, 'hello world');
  });

  it('handles bracket notation as nested object', () => {
    const result = parse('fields%5Barticles%5D=title');
    assert.equal(result.fields.articles, 'title');
    assert.equal(Object.getPrototypeOf(result), null);
  });

  it('accumulates repeated keys into an array', () => {
    const result = parse('tag=a&tag=b&tag=c');
    assert.deepEqual(result.tag, ['a', 'b', 'c']);
  });

  it('splits comma-separated values by default', () => {
    const result = parse('sort=name,age,-created');
    assert.deepEqual(result.sort, ['name', 'age', '-created']);
  });

  it('does not split comma-separated values when split:false', () => {
    const result = parse('sort=name,age', {split: false});
    assert.equal(result.sort, 'name,age');
  });

  it('handles key with no value', () => {
    const result = parse('flag=');
    assert.equal(result.flag, '');
  });

  it('handles malformed percent sequences safely (no throw)', () => {
    assert.doesNotThrow(() => parse('q=%E0%A4%A'));
  });

  it('parses JSON:API fields parameter (nested brackets, comma-separated)', () => {
    const qs = 'fields%5Barticles%5D=title%2Cbody&fields%5Bpeople%5D=name';
    const result = parse(qs);
    assert.deepEqual(result.fields.articles, ['title', 'body']);
    // single value — not split because 'name' has no comma
    assert.equal(result.fields.people, 'name');
  });

  it('parses a simple string include value', () => {
    const result = parse('include=author');
    assert.equal(result.include, 'author');
  });

  it('handles empty bracket notation (array accumulator): a[]=1&a[]=2', () => {
    const result = parse('a%5B%5D=1&a%5B%5D=2');
    // a[] should become an array
    assert.ok(Array.isArray(result.a), `expected array, got ${JSON.stringify(result.a)}`);
    assert.ok(result.a.includes('1') && result.a.includes('2'));
  });

  it('handles a single empty-bracket value as an array: items[]=only', () => {
    const result = parse('items%5B%5D=only');
    assert.ok(Array.isArray(result.items));
    assert.equal(result.items[0], 'only');
  });

  it('skips empty pairs in the query string', () => {
    const result = parse('a=1&&b=2');
    assert.equal(result.a, '1');
    assert.equal(result.b, '2');
  });

  it('handles a key with no equals sign (value defaults to empty string)', () => {
    const result = parse('standalone');
    assert.equal(result.standalone, '');
  });

  describe('maxPairs', () => {
    it('parses at most maxPairs pairs (default 256)', () => {
      const pairs = Array.from({length: 300}, (_, i) => `k${i}=v${i}`).join('&');
      const result = parse(pairs);
      assert.equal(Object.keys(result).length, 256);
    });

    it('respects a custom maxPairs option', () => {
      const pairs = Array.from({length: 10}, (_, i) => `k${i}=v${i}`).join('&');
      const result = parse(pairs, {maxPairs: 5});
      assert.equal(Object.keys(result).length, 5);
    });
  });

  it('returns null-prototype objects for empty query', () => {
    const result = parse('');
    assert.equal(Object.getPrototypeOf(result), null);
  });
});
