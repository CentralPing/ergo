import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import pick from './pick.js';

const np = props => Object.assign(Object.create(null), props);

describe('[Boundary] utils/pick', () => {
  it('picks top-level properties', () => {
    const result = pick({a: 1, b: 2, c: 3}, 'a', 'c');
    assert.deepEqual(result, np({a: 1, c: 3}));
  });

  it('picks nested properties using dot notation', () => {
    const result = pick({a: {b: {c: 42}}}, 'a.b.c');
    assert.equal(result.a.b.c, 42);
  });

  it('picks an array of paths passed as one argument (common usage)', () => {
    // pick(obj, ['path1', 'path2']) is equivalent to pick(obj, 'path1', 'path2')
    // due to paths.flat() in the implementation
    const obj = {hostname: 'host1', arch: 'x64', platform: 'darwin', extra: 'ignored'};
    const result = pick(obj, ['hostname', 'arch']);
    assert.equal(result.hostname, 'host1');
    assert.equal(result.arch, 'x64');
    assert.ok(!('extra' in result));
  });

  it('returns empty object when no paths given', () => {
    assert.deepEqual(pick({a: 1}), np({}));
  });

  it('returns undefined for missing paths', () => {
    const result = pick({a: 1}, 'b');
    assert.equal(result.b, undefined);
  });

  it('handles multiple rest args', () => {
    const result = pick({x: 1, y: 2, z: 3}, 'x', 'z');
    assert.deepEqual(result, np({x: 1, z: 3}));
  });

  it('renames a property using a [readPath, setPath] tuple', () => {
    // To pass a rename tuple, wrap it in an outer array so flat() preserves the inner array
    const result = pick({user: {name: 'Alice'}}, [['user.name', 'name']]);
    assert.equal(result.name, 'Alice');
    assert.ok(!('user' in result), 'should not include original nested path');
  });
});
