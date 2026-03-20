/**
 * @fileoverview Shared security header tuple builder.
 *
 * Builds an array of `[header-name, header-value]` tuples from a configuration
 * object. Used by both ergo's pipeline middleware (`http/security-headers.js`)
 * and ergo-router's transport layer. Each header can be overridden (string),
 * disabled (`false`), or left at its default.
 *
 * `strictTransportSecurity` accepts either a directive string (e.g.
 * `'max-age=31536000; includeSubDomains'`) or a structured object
 * `{maxAge, includeSubDomains, preload}` for programmatic construction.
 *
 * @module lib/security-headers
 * @version 0.1.0
 * @since 0.1.0
 *
 * @example
 * import buildSecurityHeaderTuples from 'ergo/lib/security-headers';
 *
 * const tuples = buildSecurityHeaderTuples({
 *   xFrameOptions: 'SAMEORIGIN',
 *   strictTransportSecurity: {maxAge: 31536000, includeSubDomains: true}
 * });
 * // [['Content-Security-Policy', "default-src 'none'"], ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains'], ...]
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6797 RFC 6797 - HTTP Strict Transport Security}
 * @see {@link https://www.w3.org/TR/CSP3/ W3C Content Security Policy Level 3}
 */

/**
 * Default security header values for a REST API.
 * @type {object}
 */
const DEFAULTS = {
  contentSecurityPolicy: "default-src 'none'",
  strictTransportSecurity: false,
  xContentTypeOptions: 'nosniff',
  xFrameOptions: 'DENY',
  referrerPolicy: 'no-referrer',
  xXssProtection: '0',
  permissionsPolicy: undefined
};

/**
 * Build an array of security header tuples from a configuration object.
 *
 * @param {object} [options] - Security header configuration
 * @param {string|false} [options.contentSecurityPolicy="default-src 'none'"] - Content-Security-Policy
 * @param {string|object|false} [options.strictTransportSecurity=false] - HSTS directive string or
 *   `{maxAge, includeSubDomains, preload}` object. Defaults to `false`.
 * @param {string|boolean|false} [options.xContentTypeOptions='nosniff'] - X-Content-Type-Options.
 *   `true` is treated as `'nosniff'`.
 * @param {string|false} [options.xFrameOptions='DENY'] - X-Frame-Options
 * @param {string|false} [options.referrerPolicy='no-referrer'] - Referrer-Policy
 * @param {string|false} [options.xXssProtection='0'] - X-XSS-Protection
 * @param {string} [options.permissionsPolicy] - Permissions-Policy (omitted by default)
 * @returns {Array<[string, string]>} - Header tuples suitable for `res.setHeader()` or accumulator storage
 */
export default function buildSecurityHeaderTuples({
  contentSecurityPolicy = DEFAULTS.contentSecurityPolicy,
  strictTransportSecurity = DEFAULTS.strictTransportSecurity,
  xContentTypeOptions = DEFAULTS.xContentTypeOptions,
  xFrameOptions = DEFAULTS.xFrameOptions,
  referrerPolicy = DEFAULTS.referrerPolicy,
  xXssProtection = DEFAULTS.xXssProtection,
  permissionsPolicy = DEFAULTS.permissionsPolicy
} = {}) {
  const tuples = [];

  if (contentSecurityPolicy !== false && contentSecurityPolicy) {
    tuples.push(['Content-Security-Policy', contentSecurityPolicy]);
  }

  if (strictTransportSecurity !== false && strictTransportSecurity) {
    const value =
      typeof strictTransportSecurity === 'object'
        ? buildHstsDirective(strictTransportSecurity)
        : strictTransportSecurity;
    tuples.push(['Strict-Transport-Security', value]);
  }

  if (xContentTypeOptions !== false && xContentTypeOptions) {
    tuples.push([
      'X-Content-Type-Options',
      xContentTypeOptions === true ? 'nosniff' : xContentTypeOptions
    ]);
  }

  if (xFrameOptions !== false && xFrameOptions) {
    tuples.push(['X-Frame-Options', xFrameOptions]);
  }

  if (referrerPolicy !== false && referrerPolicy) {
    tuples.push(['Referrer-Policy', referrerPolicy]);
  }

  if (xXssProtection !== false && xXssProtection !== undefined) {
    tuples.push(['X-XSS-Protection', String(xXssProtection)]);
  }

  if (permissionsPolicy) {
    tuples.push(['Permissions-Policy', permissionsPolicy]);
  }

  return tuples;
}

/**
 * Build an HSTS directive string from a structured options object.
 * @param {object} opts - HSTS options
 * @param {number} [opts.maxAge=31536000] - max-age in seconds
 * @param {boolean} [opts.includeSubDomains=true] - include includeSubDomains directive
 * @param {boolean} [opts.preload=false] - include preload directive
 * @returns {string} - HSTS directive string
 */
function buildHstsDirective({maxAge = 31536000, includeSubDomains = true, preload = false} = {}) {
  let value = `max-age=${maxAge}`;
  if (includeSubDomains !== false) {
    value += '; includeSubDomains';
  }
  if (preload) {
    value += '; preload';
  }
  return value;
}
