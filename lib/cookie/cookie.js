/**
 * @fileoverview Cookie construction factory (RFC 6265 compliant).
 *
 * Creates typed cookie objects with a `toHeader()` method that serializes the cookie
 * to a `Set-Cookie` header string per RFC 6265.
 *
 * Default directives enforce secure cookie practices: `Secure: true`, `HttpOnly: true`,
 * `Path: /`. Cookies without a `value` (or where `value` is undefined) are set to expire
 * immediately by defaulting `maxAge` to 0.
 *
 * @module lib/cookie/cookie
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import bake from 'ergo/lib/cookie/cookie';
 *
 * const c = bake('session', 'abc123', {maxAge: 3600, sameSite: 'Lax'});
 * c.toHeader(); // 'session=abc123; Path=/; Max-Age=3600; SameSite=Lax; Secure; HttpOnly'
 *
 * // Expire a cookie by omitting value
 * bake('session').toHeader(); // 'session=; Path=/; Max-Age=0; Expires=...; Secure; HttpOnly'
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6265 RFC 6265 - HTTP State Management Mechanism}
 */
export default bake;

const dough = Object.create(
  {},
  {
    toHeader: {
      value() {
        return toHeader(this);
      }
    },
    isCookie: {
      value: true
    }
  }
);

/**
 * A cookie factory function.
 * @param {string} name - The name of the cookie.
 * @param {string} [value] - The value of the cookie. If undefined
 *  as well as expires and maxAge are undefined, then the cookie will be set to expire.
 * @param {object} [directives] - See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies|Cookies} for more information about directives.
 * @param {string} [directives.domain] - The domain of the cookie. Defaults to
 *  the host portion of the current document location. If a domain is specified,
 *  subdomains are always included.
 * @param {string} [directives.path='/'] - The absolute path of the cookie. Defaults
 *  to the current path of the current document location.
 * @param {boolean} [directives.secure=true] - Indicates whether the cookie is
 *  transmitted over secure protocols such as HTTPS.
 * @param {boolean} [directives.httpOnly=true] - Indicates whether the cookie is
 *  accessible via client JavaScript (e.g. document.cookie, Request, XMLHttpRequest, etc.).
 * @param {'lax'|'strict'|'none'} [directives.sameSite] - Indicates if a cookie shouldn't be sent
 *  with cross-site requests. See {@link https://www.owasp.org/index.php/SameSite|SameSite} for more information.
 * @param {number} [directives.maxAge] - The maximum age of a cookie in seconds.
 * @param {(Date|string|number)} [directives.expires] - The GMT timestamp of the cookie
 *  expiration.
 * @returns {object} - A cookie object with name, value, directives, and toHeader().
 */
function bake(
  name,
  value,
  {domain, path = '/', maxAge, expires, sameSite, secure = true, httpOnly = true} = {}
) {
  // RFC 6265bis §5.4.7: SameSite=None requires the Secure attribute
  const effectiveSecure =
    sameSite !== undefined && String(sameSite).toLowerCase() === 'none' ? true : secure;

  return Object.assign(Object.create(dough), {
    name,
    value,
    domain,
    path,
    maxAge,
    expires,
    sameSite,
    secure: effectiveSecure,
    httpOnly
  });
}

/**
 * Creates a new cookie header.
 * @param {object} cookie - The cookie object.
 * @param {string} [cookie.name] - The name of the cookie.
 * @param {string} [cookie.value] - The value of the cookie. If undefined
 *  and expires/maxAge are undefined, the cookie will be set to expire.
 * @param {string} [cookie.domain] - The domain of the cookie. Defaults to
 *  the host portion of the current document location. If a domain is specified,
 *  subdomains are always included.
 * @param {string} [cookie.path] - The absolute path of the cookie. Defaults
 *  to the current path of the current document location.
 * @param {boolean} [cookie.secure] - Indicates whether the cookie is
 *  transmitted over secure protocols such as HTTPS.
 * @param {string} [cookie.sameSite] - Indicates if a cookie shouldn't be sent
 *  with cross-site requests. See {@link https://www.owasp.org/index.php/SameSite|SameSite} for more information.
 * @param {boolean} [cookie.httpOnly] - Indicates whether the cookie is inaccessible
 *  to client-side JavaScript (e.g. `document.cookie`). See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies|HttpOnly} for more information.
 * @param {number} [cookie.maxAge] - The maximum age of a cookie in seconds.
 * @param {(Date|string|number)} [cookie.expires] - The GMT timestamp of the cookie
 *  expiration.
 * @returns {string} - A serialized Set-Cookie header string.
 */
// RFC 6265 §4.1.1: cookie-octet = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
// Reject anything outside cookie-octet: SP, ", comma, semicolon, backslash, CTLs, DEL
// eslint-disable-next-line no-control-regex -- intentional: reject CTLs per RFC 6265 cookie-octet
const COOKIE_VALUE_UNSAFE_RE = /[\x00-\x20",;\\\x7f]/;
// RFC 7230 §3.2.6: token = 1*tchar (no CTLs, SP, or delimiters)
const TOKEN_RE = /^[!#$%&'*+\-.^_`|~\w]+$/;

/**
 * Rejects cookie values containing characters outside RFC 6265 cookie-octet.
 * @param {*} val - Field value to check
 * @param {string} field - Field name for the error message
 * @throws {TypeError} If the value contains forbidden characters
 */
function assertSafeValue(val, field) {
  if (typeof val === 'string' && COOKIE_VALUE_UNSAFE_RE.test(val)) {
    throw new TypeError(`Cookie ${field} contains forbidden characters`);
  }
}

/**
 * Rejects cookie names that are not valid HTTP tokens per RFC 7230.
 * @param {*} val - Name to check
 * @throws {TypeError} If the name is not a valid token
 */
function assertSafeName(val) {
  if (typeof val === 'string' && !TOKEN_RE.test(val)) {
    throw new TypeError('Cookie name contains forbidden characters');
  }
}

function toHeader({
  name,
  value,
  domain,
  path,
  secure,
  sameSite,
  httpOnly,
  maxAge = value === undefined ? 0 : undefined,
  expires = value === undefined ? Date.now() + maxAge : undefined
} = {}) {
  assertSafeName(name);
  assertSafeValue(value, 'value');
  assertSafeValue(domain, 'domain');
  assertSafeValue(path, 'path');

  let header = `${name === undefined ? '' : name}=${value === undefined ? '' : value}`;

  /*
   * RFC 6265 uses OWS (optional whitespace) after semicolons; a space is
   * conventional and maximizes compatibility with existing parsers.
   * https://www.rfc-editor.org/rfc/rfc6265
   */
  if (domain !== undefined) {
    header += `; Domain=${domain}`;
  }

  if (path !== undefined) {
    header += `; Path=${path}`;
  }

  if (maxAge !== undefined) {
    header += `; Max-Age=${maxAge}`;
  }

  if (expires !== undefined) {
    header += `; Expires=${new Date(expires).toUTCString()}`;
  }

  if (sameSite !== undefined) {
    header += `; SameSite=${sameSite}`;
  }

  if (secure) {
    header += '; Secure';
  }

  if (httpOnly) {
    header += '; HttpOnly';
  }

  return header;
}
