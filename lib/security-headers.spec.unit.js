import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import buildSecurityHeaderTuples from './security-headers.js';

describe('[Boundary] lib/security-headers', () => {
  describe('defaults', () => {
    it('returns expected default tuples', () => {
      const tuples = buildSecurityHeaderTuples();
      const headers = Object.fromEntries(tuples);

      assert.equal(headers['Content-Security-Policy'], "default-src 'none'");
      assert.equal(headers['X-Content-Type-Options'], 'nosniff');
      assert.equal(headers['X-Frame-Options'], 'DENY');
      assert.equal(headers['Referrer-Policy'], 'no-referrer');
      assert.equal(headers['X-XSS-Protection'], '0');
      assert.equal(headers['Strict-Transport-Security'], undefined);
      assert.equal(headers['Permissions-Policy'], undefined);
    });
  });

  describe('strictTransportSecurity', () => {
    it('accepts a string directive', () => {
      const tuples = buildSecurityHeaderTuples({
        strictTransportSecurity: 'max-age=3600'
      });
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['Strict-Transport-Security'], 'max-age=3600');
    });

    it('builds directive from object config', () => {
      const tuples = buildSecurityHeaderTuples({
        strictTransportSecurity: {maxAge: 31536000, includeSubDomains: true, preload: false}
      });
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['Strict-Transport-Security'], 'max-age=31536000; includeSubDomains');
    });

    it('includes preload when configured', () => {
      const tuples = buildSecurityHeaderTuples({
        strictTransportSecurity: {maxAge: 31536000, preload: true}
      });
      const headers = Object.fromEntries(tuples);
      assert.ok(headers['Strict-Transport-Security'].includes('preload'));
    });

    it('omits includeSubDomains when set to false', () => {
      const tuples = buildSecurityHeaderTuples({
        strictTransportSecurity: {maxAge: 3600, includeSubDomains: false}
      });
      const headers = Object.fromEntries(tuples);
      assert.ok(!headers['Strict-Transport-Security'].includes('includeSubDomains'));
    });

    it('disables HSTS when set to false', () => {
      const tuples = buildSecurityHeaderTuples({strictTransportSecurity: false});
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['Strict-Transport-Security'], undefined);
    });
  });

  describe('xContentTypeOptions', () => {
    it('treats true as "nosniff"', () => {
      const tuples = buildSecurityHeaderTuples({xContentTypeOptions: true});
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['X-Content-Type-Options'], 'nosniff');
    });

    it('can be disabled', () => {
      const tuples = buildSecurityHeaderTuples({xContentTypeOptions: false});
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['X-Content-Type-Options'], undefined);
    });
  });

  describe('individual header overrides', () => {
    it('accepts custom xFrameOptions', () => {
      const tuples = buildSecurityHeaderTuples({xFrameOptions: 'SAMEORIGIN'});
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['X-Frame-Options'], 'SAMEORIGIN');
    });

    it('accepts custom referrerPolicy', () => {
      const tuples = buildSecurityHeaderTuples({referrerPolicy: 'strict-origin'});
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['Referrer-Policy'], 'strict-origin');
    });

    it('accepts permissionsPolicy', () => {
      const tuples = buildSecurityHeaderTuples({permissionsPolicy: 'camera=()'});
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['Permissions-Policy'], 'camera=()');
    });

    it('can disable all headers', () => {
      const tuples = buildSecurityHeaderTuples({
        contentSecurityPolicy: false,
        strictTransportSecurity: false,
        xContentTypeOptions: false,
        xFrameOptions: false,
        referrerPolicy: false,
        xXssProtection: false
      });
      assert.equal(tuples.length, 0);
    });
  });
});
