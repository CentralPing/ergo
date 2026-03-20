/**
 * @fileoverview Cookie jar factory for managing per-request cookie state.
 *
 * Creates a cookie jar with dual-storage semantics for per-request cookie management.
 *
 * **Incoming cookies** (from the `Cookie` header) are parsed as raw `name: value` strings
 * and stored as own properties via `Object.assign()`. Per RFC 6265 §5.4, the browser sends
 * only `name=value` pairs — no directives. Access them directly: `jar.session`.
 *
 * **Outgoing cookies** (created via `set()`) are full cookie objects with directives,
 * stored in an internal `Map`. Only these are serialized by `toHeader()` into `Set-Cookie`
 * headers. A server should not echo all received cookies back — only cookies it explicitly
 * creates or modifies should produce `Set-Cookie` headers.
 *
 * Methods:
 * - `get(name)` — returns an outgoing cookie object from the Map, or an iterator over all
 * - `set(name, value, opts)` — creates and stores an outgoing cookie (delegates to `lib/cookie/cookie`)
 * - `clear(name?)` — deletes one outgoing cookie by name, or clears all
 * - `toHeader()` — serializes outgoing cookies to `Set-Cookie` header strings
 *
 * @module lib/cookie/jar
 * @version 0.1.0
 * @since 0.1.0
 * @requires ./cookie.js
 * @requires ../../utils/iterables/index.js
 *
 * @example
 * import jar from 'ergo/lib/cookie/jar';
 * import parse from 'ergo/lib/cookie/parse';
 *
 * const cookies = jar(parse('session=abc123; lang=en'));
 * cookies.session;     // => 'abc123' (incoming, own property)
 * cookies.lang;        // => 'en'     (incoming, own property)
 * cookies.get('session'); // => undefined (not in the outgoing Map)
 * cookies.set('theme', 'dark', {maxAge: 86400});
 * cookies.get('theme');   // => cookie object (outgoing, in the Map)
 * cookies.toHeader();     // => ['theme=dark; Max-Age=86400'] (outgoing only)
 */
export default jar;

import cookie from './cookie.js';
import {chain, map} from '../../utils/iterables/index.js';

const clay = Object.create(
  {},
  {
    set: {
      value(n, ...args) {
        return this.jar.set(n, cookie(n, ...args));
      }
    },
    get: {
      value(n) {
        if (n) {
          return this.jar.get(n);
        }

        return this.jar.values();
      }
    },
    clear: {
      value(n) {
        if (n) {
          return this.jar.delete(n);
        } else {
          return this.jar.clear();
        }
      }
    },
    toHeader: {
      value() {
        return [
          ...chain(
            this.get(),
            map(c => c.toHeader())
          )
        ];
      }
    },
    size: {
      get() {
        return this.jar.size;
      }
    },
    isJar: {
      value: true
    }
  }
);

/**
 * Creates a cookie jar pre-populated from a parsed cookie object.
 *
 * @param {object} [cookies={}] - Initial cookie values (from `parse()`)
 * @returns {object} - Cookie jar with `get`, `set`, `clear`, `toHeader`, `size` members
 */
function jar(cookies = {}) {
  return Object.assign(
    Object.create(clay, {
      jar: {
        value: new Map()
      }
    }),
    cookies
  );
}
