/**
 * @fileoverview HTTP middleware factory for security response headers.
 *
 * Returns pre-computed header tuples for common security headers recommended for
 * REST APIs. Each header is individually configurable or disableable (pass `false`).
 * Header tuples are built at factory time for zero per-request overhead.
 *
 * Delegates tuple construction to `lib/security-headers.js` (the shared primitive),
 * which validates option values at construction time.
 *
 * @module http/security-headers
 * @since 0.1.0
 * @requires ../lib/security-headers.js
 *
 * @example
 * import {compose, securityHeaders} from '@centralping/ergo';
 *
 * // Use defaults
 * const pipeline = compose(
 *   securityHeaders(),
 *   // ...
 * );
 *
 * // Customize or disable individual headers
 * const pipeline = compose(
 *   securityHeaders({
 *     xFrameOptions: 'SAMEORIGIN',
 *     permissionsPolicy: 'camera=(), microphone=()',
 *     xXssProtection: false  // disable
 *   }),
 * );
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6797 RFC 6797 - HTTP Strict Transport Security}
 * @see {@link https://www.w3.org/TR/CSP3/ W3C Content Security Policy Level 3}
 */
import buildSecurityHeaderTuples from '../lib/security-headers.js';
import {validateOptions} from '../lib/validate-options.js';

/** @type {Set<string>} */
const VALID_OPTIONS = new Set([
  'contentSecurityPolicy',
  'strictTransportSecurity',
  'xContentTypeOptions',
  'xFrameOptions',
  'referrerPolicy',
  'xXssProtection',
  'permissionsPolicy'
]);

/**
 * Creates a security headers middleware that returns pre-computed header tuples.
 *
 * Pass `false` for any header to omit it entirely. Pass a string to override
 * the default value. Invalid values throw `TypeError` at construction time.
 *
 * @param {object} [options] - Security header configuration
 * @param {string|false} [options.contentSecurityPolicy="default-src 'none'"] - Content-Security-Policy header
 * @param {string|object|false} [options.strictTransportSecurity=false] - Strict-Transport-Security header.
 *   String directive or `{maxAge, includeSubDomains, preload}` object.
 *   Defaults to `false` because this middleware has no request context to verify the connection
 *   is HTTPS, and HSTS MUST only be sent over secure transport (RFC 6797 §7.2). Enable explicitly
 *   when the app is known to be behind HTTPS, or use ergo-router's transport layer which performs
 *   the HTTPS check automatically.
 * @param {'nosniff'|true|false} [options.xContentTypeOptions='nosniff'] - X-Content-Type-Options header.
 *   `true` is treated as `'nosniff'`.
 * @param {'DENY'|'SAMEORIGIN'|false} [options.xFrameOptions='DENY'] - X-Frame-Options header
 * @param {string|false} [options.referrerPolicy='no-referrer'] - Referrer-Policy header (W3C token)
 * @param {'0'|'1'|'1; mode=block'|false} [options.xXssProtection='0'] - X-XSS-Protection header
 * @param {string|false} [options.permissionsPolicy] - Permissions-Policy header (omitted by default)
 * @returns {function(): {response: {headers: Array<[string, string]>}}} - Middleware returning pre-computed headers
 * @throws {TypeError} When an option value fails construction-time validation in `buildSecurityHeaderTuples`
 */
export default (options = {}) => {
  validateOptions(options, VALID_OPTIONS, 'securityHeaders');
  const headerTuples = buildSecurityHeaderTuples(options);
  const response = {response: {headers: headerTuples}};
  return function securityHeadersMiddleware() {
    return response;
  };
};
