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
 * @version 0.1.0
 * @since 0.1.0
 * @requires ../lib/cookie/index.js
 *
 * @example
 * import {compose, cookie} from 'ergo';
 *
 * const pipeline = compose(
 *   [cookie(), 'cookies'],
 *   // acc.cookies.session => 'abc123' (incoming cookie, own property)
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6265 RFC 6265 - HTTP State Management Mechanism}
 */
import {parse, jar} from '../lib/cookie/index.js';

/**
 * Creates a cookie parsing middleware.
 *
 * @param {object} [options] - Options forwarded to the RFC 6265 cookie parser
 * @returns {function} - Ergo middleware `({headers}) => CookieJar`
 */
export default options =>
  ({headers: {cookie} = {}} = {}) =>
    jar(parse(cookie, options));
