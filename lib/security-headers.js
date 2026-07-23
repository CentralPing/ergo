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
 * Invalid option values throw `TypeError` at construction time so misconfigured
 * security headers fail closed rather than emitting values browsers ignore.
 *
 * @module lib/security-headers
 * @since 0.1.0
 *
 * @example
 * import buildSecurityHeaderTuples, {
 *   DEFAULT_HSTS_MAX_AGE_SECONDS
 * } from '@centralping/ergo/lib/security-headers';
 *
 * const tuples = buildSecurityHeaderTuples({
 *   xFrameOptions: 'SAMEORIGIN',
 *   strictTransportSecurity: {
 *     maxAge: DEFAULT_HSTS_MAX_AGE_SECONDS,
 *     includeSubDomains: true
 *   }
 * });
 * // [['Content-Security-Policy', "default-src 'none'"], ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains'], ...]
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6797 RFC 6797 - HTTP Strict Transport Security}
 * @see {@link https://www.w3.org/TR/CSP3/ W3C Content Security Policy Level 3}
 */

/** Default HSTS max-age in seconds (one year). @type {number} */
export const DEFAULT_HSTS_MAX_AGE_SECONDS = 31_536_000;

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

/** @type {ReadonlySet<'DENY' | 'SAMEORIGIN'>} */
const X_FRAME_OPTIONS = Object.freeze(new Set(['DENY', 'SAMEORIGIN']));

/** @type {ReadonlySet<string>} */
const REFERRER_POLICIES = Object.freeze(
  new Set([
    'no-referrer',
    'no-referrer-when-downgrade',
    'same-origin',
    'origin',
    'strict-origin',
    'origin-when-cross-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url'
  ])
);

/** @type {ReadonlySet<'0' | '1' | '1; mode=block'>} */
const X_XSS_PROTECTION = Object.freeze(new Set(['0', '1', '1; mode=block']));

/** CTL characters disallowed in free-form header directive strings (%x00-1F, %x7F). */
function hasCtl(value) {
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code <= 0x1f || code === 0x7f) {
      return true;
    }
  }
  return false;
}

/**
 * Whether a configured header value should be emitted.
 * Three-state contract: string/object/true override, `false` disable, `undefined` default.
 * @param {*} value - Option value after defaults applied
 * @returns {boolean}
 */
function isEnabled(value) {
  return value !== false && value;
}

/**
 * Reject empty or CTL-bearing free-form directive strings.
 * @param {string} name - Option name for the error message
 * @param {*} value - Candidate string value
 */
function assertStructuralHeaderString(name, value) {
  if (typeof value !== 'string' || value.trim() === '' || hasCtl(value)) {
    throw new TypeError(
      `buildSecurityHeaderTuples(): "${name}" option must be a non-empty string without control characters`
    );
  }
}

/**
 * Validate and normalize HSTS object form.
 * @param {object} opts - HSTS options
 * @returns {string} - HSTS directive string
 */
function buildHstsDirective({
  maxAge = DEFAULT_HSTS_MAX_AGE_SECONDS,
  includeSubDomains = true,
  preload = false
} = {}) {
  let value = `max-age=${maxAge}`;
  if (includeSubDomains !== false) {
    value += '; includeSubDomains';
  }
  if (preload) {
    value += '; preload';
  }
  return value;
}

/**
 * Validate a configured HSTS value (string or object).
 * @param {*} value - HSTS option value
 * @returns {string} - Normalized directive string
 */
function validateAndBuildHsts(value) {
  if (typeof value === 'string') {
    assertStructuralHeaderString('strictTransportSecurity', value);
    return value;
  }

  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(
      'buildSecurityHeaderTuples(): "strictTransportSecurity" option must be a string, plain object, or false'
    );
  }

  const {maxAge, includeSubDomains, preload} = value;
  if (!Number.isInteger(maxAge) || maxAge < 0) {
    throw new TypeError(
      'buildSecurityHeaderTuples(): "strictTransportSecurity.maxAge" option must be a non-negative integer'
    );
  }
  if (includeSubDomains !== undefined && typeof includeSubDomains !== 'boolean') {
    throw new TypeError(
      'buildSecurityHeaderTuples(): "strictTransportSecurity.includeSubDomains" option must be a boolean'
    );
  }
  if (preload !== undefined && typeof preload !== 'boolean') {
    throw new TypeError(
      'buildSecurityHeaderTuples(): "strictTransportSecurity.preload" option must be a boolean'
    );
  }

  return buildHstsDirective(value);
}

/**
 * Validate option values that are present (not `false` / `undefined`).
 * @param {object} options - Destructured options after defaults
 */
function validateSecurityHeaderOptions({
  contentSecurityPolicy,
  xContentTypeOptions,
  xFrameOptions,
  referrerPolicy,
  xXssProtection,
  permissionsPolicy
}) {
  if (contentSecurityPolicy !== false && contentSecurityPolicy !== undefined) {
    assertStructuralHeaderString('contentSecurityPolicy', contentSecurityPolicy);
  }

  if (xContentTypeOptions !== false && xContentTypeOptions !== undefined) {
    if (xContentTypeOptions !== true && xContentTypeOptions !== 'nosniff') {
      throw new TypeError(
        'buildSecurityHeaderTuples(): "xContentTypeOptions" option must be true, "nosniff", or false'
      );
    }
  }

  if (xFrameOptions !== false && xFrameOptions !== undefined) {
    if (typeof xFrameOptions !== 'string' || !X_FRAME_OPTIONS.has(xFrameOptions)) {
      throw new TypeError(
        'buildSecurityHeaderTuples(): "xFrameOptions" option must be "DENY", "SAMEORIGIN", or false'
      );
    }
  }

  if (referrerPolicy !== false && referrerPolicy !== undefined) {
    if (typeof referrerPolicy !== 'string' || !REFERRER_POLICIES.has(referrerPolicy)) {
      throw new TypeError(
        'buildSecurityHeaderTuples(): "referrerPolicy" option must be a W3C referrer policy token or false'
      );
    }
  }

  if (xXssProtection !== false && xXssProtection !== undefined) {
    if (typeof xXssProtection !== 'string' || !X_XSS_PROTECTION.has(xXssProtection)) {
      throw new TypeError(
        'buildSecurityHeaderTuples(): "xXssProtection" option must be "0", "1", "1; mode=block", or false'
      );
    }
  }

  if (permissionsPolicy !== false && permissionsPolicy !== undefined) {
    assertStructuralHeaderString('permissionsPolicy', permissionsPolicy);
  }
}

/**
 * Build an array of security header tuples from a configuration object.
 *
 * @param {object} [options] - Security header configuration
 * @param {string|false} [options.contentSecurityPolicy="default-src 'none'"] - Content-Security-Policy
 * @param {string|object|false} [options.strictTransportSecurity=false] - HSTS directive string or
 *   `{maxAge, includeSubDomains, preload}` object. Defaults to `false`.
 *   Object form requires an explicit non-negative integer `maxAge`
 *   (see {@link DEFAULT_HSTS_MAX_AGE_SECONDS} for the recommended one-year value).
 * @param {'nosniff'|true|false} [options.xContentTypeOptions='nosniff'] - X-Content-Type-Options.
 *   `true` is treated as `'nosniff'`.
 * @param {'DENY'|'SAMEORIGIN'|false} [options.xFrameOptions='DENY'] - X-Frame-Options
 * @param {string|false} [options.referrerPolicy='no-referrer'] - Referrer-Policy
 * @param {'0'|'1'|'1; mode=block'|false} [options.xXssProtection='0'] - X-XSS-Protection
 * @param {string|false} [options.permissionsPolicy] - Permissions-Policy (omitted by default)
 * @returns {Array<[string, string]>} - Header tuples suitable for `res.setHeader()` or accumulator storage
 * @throws {TypeError} When an enabled option has an invalid value
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
  validateSecurityHeaderOptions({
    contentSecurityPolicy,
    xContentTypeOptions,
    xFrameOptions,
    referrerPolicy,
    xXssProtection,
    permissionsPolicy
  });

  /** @type {string|undefined} */
  let hstsDirective;
  if (strictTransportSecurity !== false && strictTransportSecurity !== undefined) {
    hstsDirective = validateAndBuildHsts(strictTransportSecurity);
  }

  const tuples = [];

  if (isEnabled(contentSecurityPolicy)) {
    tuples.push(['Content-Security-Policy', contentSecurityPolicy]);
  }

  if (isEnabled(strictTransportSecurity)) {
    tuples.push(['Strict-Transport-Security', hstsDirective]);
  }

  if (isEnabled(xContentTypeOptions)) {
    tuples.push([
      'X-Content-Type-Options',
      xContentTypeOptions === true ? 'nosniff' : xContentTypeOptions
    ]);
  }

  if (isEnabled(xFrameOptions)) {
    tuples.push(['X-Frame-Options', xFrameOptions]);
  }

  if (isEnabled(referrerPolicy)) {
    tuples.push(['Referrer-Policy', referrerPolicy]);
  }

  if (isEnabled(xXssProtection)) {
    tuples.push(['X-XSS-Protection', xXssProtection]);
  }

  if (isEnabled(permissionsPolicy)) {
    tuples.push(['Permissions-Policy', permissionsPolicy]);
  }

  return tuples;
}
