import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import parse from './query.js';
import {MAX_ARRAY_INDEX} from '../utils/set.js';

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

    it('ignores polluted Object.prototype.maxPairs (own-property options only)', () => {
      Object.defineProperty(Object.prototype, 'maxPairs', {
        configurable: true,
        enumerable: false,
        value: 10000
      });
      try {
        const pairs = Array.from({length: 300}, (_, i) => `k${i}=v${i}`).join('&');
        // Pass `{}` so inherited prototype keys would bind under plain destructuring.
        const result = parse(pairs, {});
        assert.equal(Object.keys(result).length, 256);
      } finally {
        delete Object.prototype.maxPairs;
      }
    });

    it('ignores polluted Object.prototype.split', () => {
      Object.defineProperty(Object.prototype, 'split', {
        configurable: true,
        enumerable: false,
        value: false
      });
      try {
        const result = parse('sort=name,age', {});
        assert.deepEqual(result.sort, ['name', 'age']);
      } finally {
        delete Object.prototype.split;
      }
    });

    it('ignores polluted Object.prototype.maxLength', () => {
      Object.defineProperty(Object.prototype, 'maxLength', {
        configurable: true,
        enumerable: false,
        value: 1
      });
      try {
        const result = parse('k=abcdefgh', {});
        assert.equal(result.k, 'abcdefgh');
      } finally {
        delete Object.prototype.maxLength;
      }
    });
  });

  it('returns null-prototype objects for empty query', () => {
    const result = parse('');
    assert.equal(Object.getPrototypeOf(result), null);
  });

  describe('maxLength', () => {
    it('truncates query strings exceeding maxLength', () => {
      const result = parse('a=1&b=2', {maxLength: 3});
      assert.equal(result.a, '1');
      assert.equal(result.b, undefined);
    });

    it('defaults maxLength to 8192', () => {
      const bigQuery = 'k=' + 'x'.repeat(9000);
      const result = parse(bigQuery);
      assert.ok(result.k.length < 9000);
    });

    it('accepts custom maxLength', () => {
      const qs = Array.from({length: 50}, (_, i) => `k${i}=v`).join('&');
      const result = parse(qs, {maxLength: 20});
      assert.ok(Object.keys(result).length < 50);
    });
  });

  describe('malformed bracket keys', () => {
    it('skips keys with unclosed bracket (foo[)', () => {
      const result = parse('foo[=bar&ok=1');
      assert.equal(result.ok, '1');
      assert.equal(result['foo['], undefined);
    });

    it('handles stray closing bracket (]bar)', () => {
      const result = parse(']bar=val');
      assert.equal(result[']bar'], 'val');
    });

    it('skips bare =value (empty key does not match bracket regex)', () => {
      const result = parse('=value&ok=1');
      assert.equal(result[''], undefined);
      assert.equal(result.ok, '1');
    });

    it('skips conflicting nested key after scalar (first-wins): a=42&a[b]=99 (#354)', () => {
      const result = parse('a=42&a[b]=99&ok[x]=1');
      assert.equal(result.a, '42');
      assert.equal(result.a?.b, undefined);
      assert.equal(result.ok.x, '1');
    });

    it('preserves nest under integer-like key when nest precedes scalar (first-wins): 1[a]=x&1=y (#384)', () => {
      const result = parse('1[a]=x&1=y&ok=1');
      assert.deepEqual(result['1'], Object.assign(Object.create(null), {a: 'x'}));
      assert.equal(result.ok, '1');
    });

    it('preserves scalar under integer-like key when scalar precedes nest (first-wins): 1=y&1[a]=x (#384)', () => {
      const result = parse('1=y&1[a]=x&ok=1');
      assert.equal(result['1'], 'y');
      assert.equal(result.ok, '1');
    });

    it('preserves first path alias win: a.b=1&a[b]=2 (#385)', () => {
      const result = parse('a.b=1&a[b]=2&ok=1');
      assert.deepEqual(result.a, Object.assign(Object.create(null), {b: '1'}));
      assert.equal(result.ok, '1');
    });

    it('preserves first path alias win: a[b]=1&a.b=2 (#385)', () => {
      const result = parse('a[b]=1&a.b=2&ok=1');
      assert.deepEqual(result.a, Object.assign(Object.create(null), {b: '1'}));
      assert.equal(result.ok, '1');
    });

    it('preserves empty-bracket array slot against later index write (first-wins): a[]=1&a[0]=2 (#385)', () => {
      const result = parse('a[]=1&a[0]=2&ok=1');
      assert.deepEqual(result.a, ['1']);
      assert.equal(result.ok, '1');
    });

    it('preserves indexed array against later empty-bracket write (first-wins): a[0]=1&a[]=2 (#385)', () => {
      const result = parse('a[0]=1&a[]=2&ok=1');
      assert.deepEqual(result.a, ['1']);
      assert.equal(result.ok, '1');
    });

    it('skips scalar overwrite after nested (first-wins): a[b]=99&a=42 (#379)', () => {
      const result = parse('a[b]=99&a=42&ok=1');
      assert.deepEqual(result.a, Object.assign(Object.create(null), {b: '99'}));
      assert.notEqual(result.a, '42');
      assert.equal(result.ok, '1');
    });

    it('skips empty-bracket overwrite after nested (first-wins): a[b]=1&a[]=2 (#379)', () => {
      const result = parse('a[b]=1&a[]=2&ok=1');
      assert.deepEqual(result.a, Object.assign(Object.create(null), {b: '1'}));
      assert.equal(Array.isArray(result.a), false);
      assert.equal(result.ok, '1');
    });

    it('skips empty-bracket overwrite after scalar (first-wins): a=42&a[]=2 (#381)', () => {
      const result = parse('a=42&a[]=2&ok=1');
      assert.equal(result.a, '42');
      assert.equal(Array.isArray(result.a), false);
      assert.equal(result.ok, '1');
    });

    it('skips scalar overwrite of nested dotted path (first-wins): a.b[c]=2&a.b=1 (#380)', () => {
      const result = parse('a.b[c]=2&a.b=1&ok=1');
      assert.deepEqual(
        result.a,
        Object.assign(Object.create(null), {
          b: Object.assign(Object.create(null), {c: '2'})
        })
      );
      assert.equal(result.ok, '1');
    });

    it('skips shorter nested overwrite (first-wins): x[a.b]=1&x[a]=2 (#380)', () => {
      const result = parse('x[a.b]=1&x[a]=2&ok=1');
      assert.deepEqual(
        result.x,
        Object.assign(Object.create(null), {
          a: Object.assign(Object.create(null), {b: '1'})
        })
      );
      assert.equal(result.ok, '1');
    });

    it('skips nesting non-index under empty-bracket array (first-wins): a[]=2&a[b]=1 (#380)', () => {
      const result = parse('a[]=2&a[b]=1&ok=1');
      assert.deepEqual(result.a, ['2']);
      assert.equal(Object.hasOwn(result.a, 'b'), false);
      assert.equal(JSON.stringify({a: result.a}), '{"a":["2"]}');
      assert.equal(result.ok, '1');
    });

    it('skips index under plain object (shape first-wins): a[b]=y&a[0]=x (#382)', () => {
      const result = parse('a[b]=y&a[0]=x&ok=1');
      assert.deepEqual(result.a, Object.assign(Object.create(null), {b: 'y'}));
      assert.equal(Object.hasOwn(result.a, '0'), false);
      assert.equal(result.ok, '1');
    });

    it('allows subsequent numeric indices under an Array: role[0]=user&role[1]=admin (#381)', () => {
      const result = parse('role[0]=user&role[1]=admin&ok=1');
      assert.deepEqual(result.role, ['user', 'admin']);
      assert.equal(result.ok, '1');
    });

    it('allows index after empty-bracket Array: a[]=1&a[1]=2 (#381)', () => {
      const result = parse('a[]=1&a[1]=2&ok=1');
      assert.deepEqual(result.a, ['1', '2']);
      assert.equal(result.ok, '1');
    });

    it('still deepens sibling nested keys under the same parent: a[b]=1&a[c]=2', () => {
      const result = parse('a[b]=1&a[c]=2');
      assert.equal(result.a.b, '1');
      assert.equal(result.a.c, '2');
    });

    it('creates object chain for empty path segments, not arrays: fields[a..b]=x (#353)', () => {
      const result = parse('fields[a..b]=x');
      assert.equal(Array.isArray(result.fields?.a), false);
      assert.equal(Object.getPrototypeOf(result.fields.a), null);
      assert.equal(result.fields.a[''].b, 'x');
    });

    it('skips oversized digit indices at MAX_ARRAY_INDEX + 1', () => {
      const over = String(MAX_ARRAY_INDEX + 1);
      const result = parse(`a[${over}]=x&ok=1`);
      assert.equal(result.a, undefined);
      assert.equal(result.ok, '1');
    });

    it('skips mid-range oversized digit indices', () => {
      const over = String(MAX_ARRAY_INDEX + 100);
      const result = parse(`a[${over}]=x&ok=1`);
      assert.equal(result.a, undefined);
      assert.equal(result.ok, '1');
    });

    it('skips huge digit indices that would sparse-DoS', () => {
      const result = parse('a[4294967294]=x&ok=1');
      assert.equal(result.a, undefined);
      assert.equal(result.ok, '1');
    });

    it('keeps oversized digit keys as top-level query names (bound is Array-only)', () => {
      const over = String(MAX_ARRAY_INDEX + 100);
      const result = parse(`${over}=top&ok=1`);
      assert.equal(result[over], 'top');
      assert.equal(result.ok, '1');
    });
  });
});
