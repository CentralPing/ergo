import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import createSecurityHeaders from './security-headers.js';

describe('[Module] http/security-headers', () => {
  it('returns {response: {headers}} with default security headers (HSTS off)', () => {
    const securityHeaders = createSecurityHeaders();
    const result = securityHeaders();
    assert.ok(result.response, 'should have a response property');
    const headers = Object.fromEntries(result.response.headers);

    assert.equal(headers['Content-Security-Policy'], "default-src 'none'");
    assert.equal(headers['X-Content-Type-Options'], 'nosniff');
    assert.equal(headers['X-Frame-Options'], 'DENY');
    assert.equal(headers['Referrer-Policy'], 'no-referrer');
    assert.equal(headers['X-XSS-Protection'], '0');
    assert.equal(headers['Strict-Transport-Security'], undefined);
  });

  it('does not include Permissions-Policy by default', () => {
    const securityHeaders = createSecurityHeaders();
    const {response: {headers}} = securityHeaders();
    const names = headers.map(([h]) => h);
    assert.ok(!names.includes('Permissions-Policy'));
  });

  it('includes Permissions-Policy when provided', () => {
    const securityHeaders = createSecurityHeaders({
      permissionsPolicy: 'camera=(), microphone=()'
    });
    const headers = Object.fromEntries(securityHeaders().response.headers);
    assert.equal(headers['Permissions-Policy'], 'camera=(), microphone=()');
  });

  it('allows overriding individual headers', () => {
    const securityHeaders = createSecurityHeaders({
      xFrameOptions: 'SAMEORIGIN',
      contentSecurityPolicy: "default-src 'self'"
    });
    const headers = Object.fromEntries(securityHeaders().response.headers);
    assert.equal(headers['X-Frame-Options'], 'SAMEORIGIN');
    assert.equal(headers['Content-Security-Policy'], "default-src 'self'");
  });

  it('disables a header when set to false', () => {
    const securityHeaders = createSecurityHeaders({
      xXssProtection: false,
      xFrameOptions: false
    });
    const names = securityHeaders().response.headers.map(([h]) => h);
    assert.ok(!names.includes('X-XSS-Protection'));
    assert.ok(!names.includes('X-Frame-Options'));
  });

  it('returns the same reference on every call (pre-computed)', () => {
    const securityHeaders = createSecurityHeaders();
    assert.equal(securityHeaders(), securityHeaders());
  });

  it('returns 5 headers with defaults (HSTS off, no Permissions-Policy)', () => {
    const securityHeaders = createSecurityHeaders();
    assert.equal(securityHeaders().response.headers.length, 5);
  });

  it('returns 7 headers when HSTS and Permissions-Policy are included', () => {
    const securityHeaders = createSecurityHeaders({
      strictTransportSecurity: 'max-age=31536000; includeSubDomains',
      permissionsPolicy: 'geolocation=()'
    });
    assert.equal(securityHeaders().response.headers.length, 7);
  });

  it('includes HSTS when explicitly enabled', () => {
    const securityHeaders = createSecurityHeaders({
      strictTransportSecurity: 'max-age=31536000; includeSubDomains'
    });
    const headers = Object.fromEntries(securityHeaders().response.headers);
    assert.equal(headers['Strict-Transport-Security'], 'max-age=31536000; includeSubDomains');
  });

  it('can disable all headers', () => {
    const securityHeaders = createSecurityHeaders({
      contentSecurityPolicy: false,
      strictTransportSecurity: false,
      xContentTypeOptions: false,
      xFrameOptions: false,
      referrerPolicy: false,
      xXssProtection: false
    });
    assert.equal(securityHeaders().response.headers.length, 0);
  });
});
