/**
 * @fileoverview HTTP middleware factory for cookie parsing.
 *
 * Parses the `Cookie` request header into a cookie jar using the RFC 6265 compliant
 * `lib/cookie` module.
 *
 * The jar uses dual storage: incoming cookies from the header are available as own
 * properties (`acc.cookies.session`), while outgoing cookies created via `set()` are
 * stored in an internal Map and serialized by `toHeader()` into `Set-Cookie` headers.
 *
 * Cookie values are available on the accumulator for CSRF verification, session handling,
 * and other cookie-based workflows.
 *
 * @module http/cookie
 * @since 0.1.0
 * @requires ../lib/cookie/index.js
 *
 * @example
 * import {compose, cookie} from '@centralping/ergo';
 *
 * const pipeline = compose(
 *   cookie(),
 *   // acc.cookies.session => 'abc123' (incoming cookie, own property)
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6265 RFC 6265 - HTTP State Management Mechanism}
 */
import {parse, jar} from '../lib/cookie/index.js';
import {validateOptions} from '../lib/validate-options.js';

/** @type {Set<string>} */
const VALID_OPTIONS = new Set(['decoder', 'loose', 'collection', 'max']);

/**
 * Creates a cookie parsing middleware.
 *
 * @param {object} [options] - Options forwarded to the RFC 6265 cookie parser
 * @param {function} [options.decoder] - Transform applied to each `[name, value]` pair
 * @param {boolean} [options.loose=false] - Use RFC 2109 (lenient) instead of RFC 6265 (strict) parsing
 * @param {boolean} [options.collection=true] - Aggregate duplicate cookie names into arrays
 * @param {number} [options.max=50] - Maximum number of cookies
 */
export default options => {
  validateOptions(options, VALID_OPTIONS, 'cookie');
  /** @param {{ headers?: { cookie?: string } }} [req] - Incoming HTTP request */
  const inner = function cookieMiddleware({headers: {cookie} = {}} = {}) {
    return jar(parse(cookie, options));
  };

  Object.defineProperty(inner, 'setPath', {value: 'cookies'});
  return inner;
};
