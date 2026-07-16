/**
 * @fileoverview Layer 1 boundary tests for utils/set.js.
 */
import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import set, {MAX_ARRAY_INDEX, PATH_TRAVERSE_ERROR_CODE, trySet} from './set.js';

/**
 * Run `fn` then restore `target[key]` to its pre-call own-property state so a
 * failed mutation probe cannot leak pollution onto shared builtins.
 * For Arrays (including `Array.prototype`), also restore `length` — deleting an
 * index does not shrink length, so a write-through would otherwise leave a
 * bumped length that bleeds into later tests.
 * @param {object} target - Object that may receive a probe write
 * @param {PropertyKey} key - Property key under probe
 * @param {() => *} fn - Probe body
 * @returns {*} - Return value of `fn`
 */
function withRestoredOwnProperty(target, key, fn) {
  const hadOwn = Object.hasOwn(target, key);
  const prior = hadOwn ? Object.getOwnPropertyDescriptor(target, key) : undefined;
  const priorLength = Array.isArray(target) ? target.length : undefined;
  try {
    return fn();
  } finally {
    if (hadOwn) {
      Object.defineProperty(target, key, prior);
    } else {
      Reflect.deleteProperty(target, key);
    }
    if (priorLength !== undefined && target.length !== priorLength) {
      target.length = priorLength;
    }
  }
}

describe('[Boundary] utils/set', () => {
  it('sets a top-level property', () => {
    const obj = {};
    set(obj, 'a', 42);
    assert.equal(obj.a, 42);
  });

  it('sets a deeply nested property, creating intermediate objects', () => {
    const obj = {};
    set(obj, 'a.b.c', 99);
    assert.equal(obj.a.b.c, 99);
  });

  it('reuses an existing intermediate object when property already exists', () => {
    const inner = {existing: true};
    const obj = {a: inner};
    set(obj, 'a.b', 'new');
    // a should still be the same object reference
    assert.equal(obj.a, inner, 'should reuse the existing intermediate object');
    assert.equal(obj.a.b, 'new');
    assert.equal(obj.a.existing, true, 'should preserve existing properties');
  });

  it('creates an array when the next path segment is a numeric string', () => {
    const obj = {};
    set(obj, 'tags.0', 'first');
    assert.ok(Array.isArray(obj.tags), 'tags should be an Array');
    assert.equal(obj.tags[0], 'first');
  });

  it('creates a plain object when the next path segment is non-numeric', () => {
    const obj = {};
    set(obj, 'meta.title', 'hello');
    assert.ok(!Array.isArray(obj.meta), 'meta should be a plain object');
    assert.equal(obj.meta.title, 'hello');
  });

  it('returns the value that was set', () => {
    const obj = {};
    const result = set(obj, 'x', 'val');
    assert.equal(result, 'val');
  });

  it('creates null-prototype intermediate objects', () => {
    const nullRoot = Object.create(null);
    set(nullRoot, 'a.b', 42);
    assert.equal(Object.getPrototypeOf(nullRoot.a), null);

    // Ordinary `{}` root is the common public path — intermediates must still
    // be null-proto (not Object.create(Object.getPrototypeOf(root))).
    const ordinary = {};
    set(ordinary, 'a.b', 42);
    assert.equal(Object.getPrototypeOf(ordinary.a), null);
    assert.equal(ordinary.a.b, 42);
  });

  describe('forbidden path segments (#383)', () => {
    for (const segment of ['__proto__', 'prototype', 'constructor']) {
      it(`throws PATH_TRAVERSE for forbidden segment ${segment}`, () => {
        const obj = Object.create(null);
        assert.throws(
          () => set(obj, `safe.${segment}.x`, 1),
          err =>
            err instanceof TypeError &&
            err.code === PATH_TRAVERSE_ERROR_CODE &&
            err.message.includes(`'${segment}' is a forbidden path segment`)
        );
        // Failed forbidden paths must leave the target untouched (no partial intermediates).
        assert.equal(Object.hasOwn(obj, 'safe'), false);
      });

      it(`trySet returns false for forbidden segment ${segment}`, () => {
        const obj = Object.create(null);
        assert.equal(trySet(obj, `safe.${segment}`, 1), false);
        assert.equal(Object.hasOwn(obj, 'safe'), false);
      });
    }

    it('blocks writing through function.prototype onto builtins', () => {
      withRestoredOwnProperty(Object.prototype, 'gotcha', () => {
        const obj = {c: Object};
        assert.throws(
          () => set(obj, 'c.prototype.gotcha', true),
          err => err instanceof TypeError && err.code === PATH_TRAVERSE_ERROR_CODE
        );
        assert.equal(Object.prototype.gotcha, undefined);
      });
    });

    describe('unsafe intermediates (#386, #387)', () => {
      const cases = [
        ['Object.prototype', Object.prototype, 'isAdmin'],
        ['Array.prototype', Array.prototype, 'pwn'],
        ['Function.prototype', Function.prototype, 'pwn'],
        ['RegExp.prototype', RegExp.prototype, 'pwn'],
        ['Object constructor', Object, 'pwn'],
        ['RegExp constructor', RegExp, 'pwn'],
        ['Math singleton', Math, 'pwn'],
        ['Intl namespace', Intl, 'pwn'],
        ['WebAssembly namespace', WebAssembly, 'pwn'],
        ['console', console, 'pwn'],
        ['Proxy constructor', Proxy, 'pwn']
      ];

      for (const [label, intermediate, leaf] of cases) {
        it(`throws for ${label} intermediate`, () => {
          withRestoredOwnProperty(intermediate, leaf, () => {
            const obj = {a: intermediate};
            assert.throws(
              () => set(obj, `a.${leaf}`, true),
              err =>
                err instanceof TypeError &&
                err.code === PATH_TRAVERSE_ERROR_CODE &&
                err.message.includes('shared builtin')
            );
            assert.equal(Object.hasOwn(intermediate, leaf), false);
          });
        });

        it(`trySet returns false for ${label} intermediate`, () => {
          withRestoredOwnProperty(intermediate, leaf, () => {
            const obj = {a: intermediate};
            assert.equal(trySet(obj, `a.${leaf}`, true), false);
            assert.equal(Object.hasOwn(intermediate, leaf), false);
          });
        });
      }

      it('throws for Proxy wrapping globalThis (write-through)', () => {
        withRestoredOwnProperty(globalThis, 'pwn', () => {
          const wrapped = new Proxy(globalThis, {});
          const obj = {a: wrapped};
          assert.throws(
            () => set(obj, 'a.pwn', true),
            err =>
              err instanceof TypeError &&
              err.code === PATH_TRAVERSE_ERROR_CODE &&
              err.message.includes('shared builtin')
          );
          assert.equal(Object.hasOwn(globalThis, 'pwn'), false);
        });
      });

      it('trySet returns false for Proxy wrapping globalThis', () => {
        withRestoredOwnProperty(globalThis, 'pwn', () => {
          const wrapped = new Proxy(globalThis, {});
          assert.equal(trySet({a: wrapped}, 'a.pwn', true), false);
          assert.equal(Object.hasOwn(globalThis, 'pwn'), false);
        });
      });

      it('rejects Proxy(Array.prototype) before Array shortcut (no write-through)', () => {
        const priorLength = Array.prototype.length;
        withRestoredOwnProperty(Array.prototype, '0', () => {
          const wrapped = new Proxy(Array.prototype, {});
          assert.equal(trySet({a: wrapped}, 'a.0', 'PWN'), false);
          assert.equal(Object.hasOwn(Array.prototype, '0'), false);
          assert.equal(Array.prototype[0], undefined);
          // Length must not stay bumped if a write-through had occurred.
          assert.equal(Array.prototype.length, priorLength);
        });
        assert.equal(Array.prototype.length, priorLength);
      });

      it('withRestoredOwnProperty restores Array.prototype length after index write-through', () => {
        const priorLength = Array.prototype.length;
        withRestoredOwnProperty(Array.prototype, '0', () => {
          Object.defineProperty(Array.prototype, '0', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: 'PWN'
          });
          assert.ok(Array.prototype.length >= 1, 'index write bumps Array length');
        });
        assert.equal(Object.hasOwn(Array.prototype, '0'), false);
        assert.equal(Array.prototype.length, priorLength);
      });

      it('rejects Proxy(Object.prototype) before null-proto shortcut (no write-through)', () => {
        withRestoredOwnProperty(Object.prototype, 'pollute', () => {
          const wrapped = new Proxy(Object.prototype, {});
          assert.equal(trySet({a: wrapped}, 'a.pollute', 'x'), false);
          assert.equal(Object.hasOwn(Object.prototype, 'pollute'), false);
        });
      });

      it('throws when root is a shared builtin', () => {
        withRestoredOwnProperty(Math, 'q', () => {
          assert.throws(
            () => set(Math, 'q', 1),
            err =>
              err instanceof TypeError &&
              err.code === PATH_TRAVERSE_ERROR_CODE &&
              err.message.includes('root is a shared builtin')
          );
          assert.equal(Object.hasOwn(Math, 'q'), false);
        });
      });

      it('trySet returns false when root is a shared builtin', () => {
        withRestoredOwnProperty(Math, 'q', () => {
          assert.equal(trySet(Math, 'q', 1), false);
          assert.equal(Object.hasOwn(Math, 'q'), false);
        });
      });

      it('throws branded error when root is null or a primitive', () => {
        for (const [root, kind] of [
          [null, 'null'],
          [undefined, 'undefined'],
          [1, 'number'],
          ['x', 'string'],
          [true, 'boolean']
        ]) {
          assert.throws(
            () => set(root, 'a', 1),
            err =>
              err instanceof TypeError &&
              err.code === PATH_TRAVERSE_ERROR_CODE &&
              err.message.includes(`root is ${kind}, not an object`)
          );
          assert.equal(trySet(root, 'a', 1), false);
        }
      });

      it('throws branded error when path is not a string', () => {
        assert.throws(
          () => set({}, 1, 1),
          err =>
            err instanceof TypeError &&
            err.code === PATH_TRAVERSE_ERROR_CODE &&
            err.message.includes('path must be a string')
        );
        assert.equal(trySet({}, 1, 1), false);
      });

      it('rejects nested host objects reachable from globalThis (#388)', () => {
        assert.ok(
          globalThis.process?.stdout || globalThis.crypto?.subtle,
          'expected process.stdout or crypto.subtle for nested-host oracle'
        );
        if (globalThis.crypto?.subtle) {
          withRestoredOwnProperty(crypto.subtle, 'x', () => {
            assert.equal(trySet({a: crypto.subtle}, 'a.x', 1), false);
            assert.equal(Object.hasOwn(crypto.subtle, 'x'), false);
          });
        }
        if (globalThis.process?.stdout) {
          withRestoredOwnProperty(process.stdout, 'x', () => {
            assert.equal(trySet({a: process.stdout}, 'a.x', 1), false);
            assert.equal(Object.hasOwn(process.stdout, 'x'), false);
          });
        }
      });

      const itIfProcessEvents = process._events ? it : it.skip;
      itIfProcessEvents(
        'rejects null-proto host objects before null-proto shortcut (process._events)',
        () => {
          withRestoredOwnProperty(process._events, '__p', () => {
            assert.equal(Object.getPrototypeOf(process._events), null);
            assert.equal(trySet({e: process._events}, 'e.__p', 1), false);
            assert.equal(Object.hasOwn(process._events, '__p'), false);
          });
        }
      );

      it('rejects namespaced prototype accessor methods (#390)', () => {
        const formatDesc = Object.getOwnPropertyDescriptor(Intl.NumberFormat.prototype, 'format');
        assert.ok(formatDesc?.get, 'expected Intl.NumberFormat.prototype.format getter');
        withRestoredOwnProperty(formatDesc.get, 'x', () => {
          assert.equal(trySet({a: formatDesc.get}, 'a.x', 1), false);
          assert.equal(Object.hasOwn(formatDesc.get, 'x'), false);
        });
      });

      it('allows per-instance bound intrinsic methods (caller contract; #390 residual)', () => {
        // Bound methods are fresh function objects created after module load —
        // not identity-equal to snapshotted `.prototype` descriptor functions.
        const boundFormat = new Intl.NumberFormat().format;
        withRestoredOwnProperty(boundFormat, 'x', () => {
          assert.equal(trySet({a: boundFormat}, 'a.x', 1), true);
          assert.equal(boundFormat.x, 1);
        });
      });

      it('rejects shared intrinsic methods from host graph (#389)', () => {
        withRestoredOwnProperty(Array.prototype.push, 'x', () => {
          assert.equal(trySet({a: Array.prototype.push}, 'a.x', 1), false);
          assert.equal(Object.hasOwn(Array.prototype.push, 'x'), false);
        });
        withRestoredOwnProperty(Object.prototype.toString, 'x', () => {
          assert.equal(trySet({a: Object.prototype.toString}, 'a.x', 1), false);
          assert.equal(Object.hasOwn(Object.prototype.toString, 'x'), false);
        });
        if (globalThis.crypto?.subtle?.encrypt) {
          withRestoredOwnProperty(crypto.subtle.encrypt, 'x', () => {
            assert.equal(trySet({a: crypto.subtle.encrypt}, 'a.x', 1), false);
            assert.equal(Object.hasOwn(crypto.subtle.encrypt, 'x'), false);
          });
        }
      });

      it('allows ordinary function intermediates (handler.timeout)', () => {
        const handler = () => {};
        const obj = {handler};
        assert.equal(set(obj, 'handler.timeout', 500), 500);
        assert.equal(handler.timeout, 500);
      });

      it('allows user class instances as intermediates', () => {
        class Box {
          constructor() {
            this.n = 0;
          }
        }
        const box = new Box();
        const obj = {box};
        assert.equal(set(obj, 'box.n', 7), 7);
        assert.equal(box.n, 7);
      });
    });

    it('rejects assigning Array length (sparse-array DoS)', () => {
      const obj = {a: []};
      assert.throws(
        () => set(obj, 'a.length', 5),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("assigning 'length'")
      );
      assert.equal(obj.a.length, 0);
    });

    it('trySet returns false for Array length assignment', () => {
      const obj = {a: []};
      assert.equal(trySet(obj, 'a.length', 5), false);
      assert.equal(obj.a.length, 0);
    });

    it('rejects assigning TypedArray length (exotic-length shadowing)', () => {
      const u8 = new Uint8Array(4);
      const obj = {a: u8};
      assert.throws(
        () => set(obj, 'a.length', 1e6),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("assigning 'length'")
      );
      assert.equal(u8.length, 4);
      assert.equal(Object.hasOwn(u8, 'length'), false);
    });

    it('rejects creating TypedArray length as an intermediate (non-own length)', () => {
      const u8 = new Uint8Array(4);
      const obj = {a: u8};
      assert.equal(trySet(obj, 'a.length.x', 1), false);
      assert.throws(
        () => set(obj, 'a.length.x', 1),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("assigning 'length'")
      );
      assert.equal(u8.length, 4);
      assert.equal(Object.hasOwn(u8, 'length'), false);
    });

    it('rejects assigning DataView length', () => {
      const view = new DataView(new ArrayBuffer(8));
      assert.throws(
        () => set({a: view}, 'a.length', 1e6),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("assigning 'length'")
      );
      // DataView has no exotic `length`; a wrongful own write leaves byteLength
      // unchanged — assert length absence, not byteLength.
      assert.equal(view.length, undefined);
      assert.equal(Object.hasOwn(view, 'length'), false);
    });

    it('rejects creating DataView length as an intermediate', () => {
      const view = new DataView(new ArrayBuffer(8));
      assert.equal(trySet({a: view}, 'a.length.x', 1), false);
      assert.equal(Object.hasOwn(view, 'length'), false);
    });

    it('rejects creating Buffer length as an intermediate', () => {
      const buf = Buffer.alloc(4);
      assert.equal(trySet({a: buf}, 'a.length.x', 1), false);
      assert.equal(buf.length, 4);
      assert.equal(Object.hasOwn(buf, 'length'), false);
    });

    it('rejects assigning arguments length', () => {
      const args = (function () {
        return arguments;
      })(1, 2);
      // `arguments.length` is already an own data property; the guard must still
      // refuse reassignment that would expand the indexed exotic.
      assert.equal(Object.hasOwn(args, 'length'), true);
      assert.throws(
        () => set({a: args}, 'a.length', 1e6),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("assigning 'length'")
      );
      assert.equal(args.length, 2);
    });

    it('rejects arguments length even when @@toStringTag is spoofed', () => {
      const args = (function () {
        return arguments;
      })(1, 2);
      Object.defineProperty(args, Symbol.toStringTag, {value: 'Object'});
      assert.equal(Object.prototype.toString.call(args), '[object Object]');
      assert.throws(
        () => set({a: args}, 'a.length', 1e6),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("assigning 'length'")
      );
      assert.equal(args.length, 2);
    });

    it('allows ordinary own-property length on plain objects', () => {
      const obj = Object.create(null);
      assert.equal(set(obj, 'meta.length', 3), 3);
      assert.equal(obj.meta.length, 3);
    });

    it(`rejects digit indices above MAX_ARRAY_INDEX (${MAX_ARRAY_INDEX})`, () => {
      const obj = Object.create(null);
      const over = String(MAX_ARRAY_INDEX + 1);
      assert.throws(
        () => set(obj, `a.${over}`, 'x'),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes('exceeds maximum')
      );
      assert.equal(Object.hasOwn(obj, 'a'), false);
    });

    it(`trySet returns false for MAX_ARRAY_INDEX + 1 (${MAX_ARRAY_INDEX + 1})`, () => {
      const obj = Object.create(null);
      const over = String(MAX_ARRAY_INDEX + 1);
      assert.equal(trySet(obj, `a.${over}`, 'x'), false);
      assert.equal(Object.hasOwn(obj, 'a'), false);
    });

    it(`trySet returns false for mid-range digit indices (${MAX_ARRAY_INDEX + 100})`, () => {
      const obj = Object.create(null);
      const over = String(MAX_ARRAY_INDEX + 100);
      assert.equal(trySet(obj, `a.${over}`, 'x'), false);
      assert.equal(Object.hasOwn(obj, 'a'), false);
    });

    it('trySet returns false for huge digit indices (query sparse-DoS)', () => {
      const obj = Object.create(null);
      assert.equal(trySet(obj, 'a.4294967294', 'x'), false);
      assert.equal(Object.hasOwn(obj, 'a'), false);
    });

    it(`allows leading-zero digit indices within MAX_ARRAY_INDEX (00001 not rejected)`, () => {
      const obj = Object.create(null);
      assert.equal(set(obj, 'a.00001', 'ok'), 'ok');
      assert.ok(Array.isArray(obj.a));
      assert.equal(obj.a['00001'], 'ok');
    });

    it(`allows digit indices at MAX_ARRAY_INDEX (${MAX_ARRAY_INDEX})`, () => {
      const obj = Object.create(null);
      assert.equal(set(obj, `a.${MAX_ARRAY_INDEX}`, 'ok'), 'ok');
      assert.ok(Array.isArray(obj.a));
      assert.equal(obj.a[MAX_ARRAY_INDEX], 'ok');
    });

    it('allows oversized digit keys on plain objects (bound is Array-only)', () => {
      const over = String(MAX_ARRAY_INDEX + 100);
      const obj = Object.create(null);
      assert.equal(set(obj, over, 'top'), 'top');
      assert.equal(obj[over], 'top');
      assert.equal(Array.isArray(obj), false);

      const nest = Object.create(null);
      nest.meta = Object.create(null);
      assert.equal(set(nest, `meta.${over}`, 'nested'), 'nested');
      assert.equal(nest.meta[over], 'nested');
      assert.equal(Array.isArray(nest.meta), false);
    });

    it('defines missing intermediates as own data properties (ignores inherited setters)', () => {
      const traps = [];
      const proto = Object.create(null);
      Object.defineProperty(proto, 'child', {
        configurable: true,
        enumerable: true,
        set(v) {
          traps.push(v);
        },
        get() {
          return undefined;
        }
      });
      const obj = Object.create(proto);
      assert.equal(set(obj, 'child.leaf', 1), 1);
      assert.equal(traps.length, 0);
      assert.ok(Object.hasOwn(obj, 'child'));
      assert.equal(obj.child.leaf, 1);
    });

    it('snapshots accessor results so stateful getters cannot bypass Array index bounds', () => {
      const over = String(MAX_ARRAY_INDEX + 100);

      let plainReads = 0;
      const held = Object.create(null);
      const root = Object.create(null);
      Object.defineProperty(root, 'a', {
        configurable: true,
        enumerable: true,
        get() {
          plainReads += 1;
          return plainReads === 1 ? held : [];
        }
      });
      assert.equal(set(root, `a.${over}`, 'ok'), 'ok');
      assert.equal(plainReads, 1);
      assert.equal(held[over], 'ok');

      let arrReads = 0;
      const arrRoot = Object.create(null);
      Object.defineProperty(arrRoot, 'c', {
        configurable: true,
        enumerable: true,
        get() {
          arrReads += 1;
          return [];
        }
      });
      assert.equal(trySet(arrRoot, `c.${over}`, 'x'), false);
      assert.equal(arrReads, 1);
    });

    it('invokes own leaf setters instead of overwriting with defineProperty', () => {
      const seen = [];
      const obj = Object.create(null);
      Object.defineProperty(obj, 'x', {
        configurable: true,
        enumerable: true,
        get() {
          return seen.at(-1);
        },
        set(v) {
          seen.push(v);
        }
      });
      assert.equal(set(obj, 'x', 7), 7);
      assert.deepEqual(seen, [7]);
      const desc = Object.getOwnPropertyDescriptor(obj, 'x');
      assert.equal(typeof desc.set, 'function');
    });

    it('does not invoke own constructor getters during prototype checks', () => {
      let hits = 0;
      const weird = Object.create(null);
      Object.defineProperty(weird, 'constructor', {
        configurable: true,
        enumerable: true,
        get() {
          hits += 1;
          return function C() {};
        }
      });
      assert.equal(set({a: weird}, 'a.k', 1), 1);
      assert.equal(hits, 0);
      assert.equal(weird.k, 1);
    });

    it('rejects own data Proxy constructor without invoking prototype get trap', () => {
      let trapHits = 0;
      const proxyCtor = new Proxy(function C() {}, {
        get(target, prop, receiver) {
          if (prop === 'prototype') {
            trapHits += 1;
            throw new TypeError('prototype trap');
          }
          return Reflect.get(target, prop, receiver);
        }
      });
      const weird = Object.create(null);
      Object.defineProperty(weird, 'constructor', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: proxyCtor
      });
      assert.throws(
        () => set({a: weird}, 'a.k', 1),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes('prototype trap') === false
      );
      assert.equal(trapHits, 0);
      assert.equal(Object.hasOwn(weird, 'k'), false);
      assert.equal(trySet({a: weird}, 'a.k', 1), false);
      assert.equal(trapHits, 0);
      assert.equal(Object.hasOwn(weird, 'k'), false);
    });
  });

  describe('strict array-index detection (#353)', () => {
    for (const segment of ['', '-1', 'Infinity', '0x1', '1e2']) {
      it(`does not create an Array for coerced-but-non-index segment ${JSON.stringify(segment)}`, () => {
        const obj = Object.create(null);
        set(obj, `x.${segment}.y`, 1);
        assert.equal(
          Array.isArray(obj.x),
          false,
          `expected object for segment ${JSON.stringify(segment)}`
        );
        assert.equal(Object.getPrototypeOf(obj.x), null);
        assert.equal(obj.x[segment].y, 1);
      });
    }

    it('creates an Array for digit-only index segments', () => {
      const obj = Object.create(null);
      set(obj, 'items.42', 'v');
      assert.ok(Array.isArray(obj.items));
      assert.equal(obj.items[42], 'v');
    });

    it('creates an Array for leading-zero digit segments (/^\\d+$/ accepts 01)', () => {
      const obj = Object.create(null);
      set(obj, 'items.01', 'v');
      assert.ok(Array.isArray(obj.items), 'leading-zero segments create Arrays');
      assert.equal(obj.items['01'], 'v');
      assert.equal(Object.hasOwn(obj.items, '01'), true);
      // Not an ES ArrayIndexName — index 1 is not set by this write
      assert.equal(obj.items[1], undefined);
    });
  });

  describe('path-conflict type guard (#354)', () => {
    it('throws descriptive TypeError with PATH_TRAVERSE_ERROR_CODE for primitive intermediate', () => {
      const obj = {a: 42};
      assert.throws(
        () => set(obj, 'a.b', 1),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("Cannot traverse path 'a.b'") &&
          err.message.includes("'a' is number")
      );
      assert.equal(obj.a, 42);
    });

    it('throws for null intermediate', () => {
      const obj = {a: null};
      assert.throws(
        () => set(obj, 'a.b', 1),
        err =>
          err instanceof TypeError &&
          err.code === PATH_TRAVERSE_ERROR_CODE &&
          err.message.includes("'a' is null")
      );
      assert.equal(obj.a, null);
    });

    it('reuses an existing array intermediate', () => {
      const arr = ['keep'];
      const obj = {tags: arr};
      set(obj, 'tags.1', 'next');
      assert.equal(obj.tags, arr);
      assert.equal(obj.tags[1], 'next');
    });

    it('reuses an existing function intermediate', () => {
      const handler = () => {};
      const obj = {handler};
      set(obj, 'handler.timeout', 500);
      assert.equal(obj.handler, handler);
      assert.equal(obj.handler.timeout, 500);
    });
  });

  describe('trySet', () => {
    it('returns true when the value is set', () => {
      const obj = Object.create(null);
      assert.equal(trySet(obj, 'a.b', 1), true);
      assert.equal(obj.a.b, 1);
    });

    it('returns false on path-conflict TypeError without mutating past the conflict', () => {
      const obj = {a: 42};
      assert.equal(trySet(obj, 'a.b', 1), false);
      assert.equal(obj.a, 42);
    });

    it('rethrows unexpected TypeErrors (not path-conflict)', () => {
      const obj = Object.preventExtensions(Object.create(null));
      assert.throws(() => trySet(obj, 'a.b', 1), TypeError);
    });

    it('rethrows TypeErrors that spoof PATH_TRAVERSE_ERROR_CODE (identity brand)', () => {
      const obj = Object.create(null);
      Object.defineProperty(obj, 'a', {
        enumerable: true,
        configurable: true,
        get() {
          const err = new TypeError('spoofed path conflict');
          err.code = PATH_TRAVERSE_ERROR_CODE;
          throw err;
        }
      });
      assert.throws(
        () => trySet(obj, 'a.b', 1),
        err =>
          err instanceof TypeError &&
          err.message === 'spoofed path conflict' &&
          err.code === PATH_TRAVERSE_ERROR_CODE
      );
    });
  });
});
