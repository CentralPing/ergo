import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import buildSecurityHeaderTuples, {DEFAULT_HSTS_MAX_AGE_SECONDS} from './security-headers.js';

describe('[Boundary] lib/security-headers', () => {
  describe('DEFAULT_HSTS_MAX_AGE_SECONDS', () => {
    it('exports one year in seconds', () => {
      assert.equal(DEFAULT_HSTS_MAX_AGE_SECONDS, 31_536_000);
    });
  });

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

    it('builds directive from object config using DEFAULT_HSTS_MAX_AGE_SECONDS', () => {
      const tuples = buildSecurityHeaderTuples({
        strictTransportSecurity: {
          maxAge: DEFAULT_HSTS_MAX_AGE_SECONDS,
          includeSubDomains: true,
          preload: false
        }
      });
      const headers = Object.fromEntries(tuples);
      assert.equal(
        headers['Strict-Transport-Security'],
        `max-age=${DEFAULT_HSTS_MAX_AGE_SECONDS}; includeSubDomains`
      );
    });

    it('includes preload when configured', () => {
      const tuples = buildSecurityHeaderTuples({
        strictTransportSecurity: {maxAge: DEFAULT_HSTS_MAX_AGE_SECONDS, preload: true}
      });
      const headers = Object.fromEntries(tuples);
      assert.equal(
        headers['Strict-Transport-Security'],
        `max-age=${DEFAULT_HSTS_MAX_AGE_SECONDS}; includeSubDomains; preload`
      );
    });

    it('omits includeSubDomains when set to false', () => {
      const tuples = buildSecurityHeaderTuples({
        strictTransportSecurity: {maxAge: 3600, includeSubDomains: false}
      });
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['Strict-Transport-Security'], 'max-age=3600');
    });

    it('emits max-age=0 when maxAge is zero', () => {
      const tuples = buildSecurityHeaderTuples({
        strictTransportSecurity: {maxAge: 0, includeSubDomains: false}
      });
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['Strict-Transport-Security'], 'max-age=0');
    });

    it('defaults includeSubDomains to true when omitted from object form', () => {
      const tuples = buildSecurityHeaderTuples({
        strictTransportSecurity: {maxAge: 3600}
      });
      const headers = Object.fromEntries(tuples);
      assert.equal(headers['Strict-Transport-Security'], 'max-age=3600; includeSubDomains');
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

  describe('construction-time TypeError validation', () => {
    it('rejects invalid xFrameOptions values', () => {
      for (const xFrameOptions of [
        'INVALID',
        'deny',
        'ALLOW-FROM https://example.com',
        1,
        null,
        ''
      ]) {
        assert.throws(() => buildSecurityHeaderTuples({xFrameOptions}), {
          name: 'TypeError',
          message: /"xFrameOptions"/
        });
      }
    });

    it('rejects invalid referrerPolicy values', () => {
      for (const referrerPolicy of ['none', 'no-referrer ', '', null, 0]) {
        assert.throws(() => buildSecurityHeaderTuples({referrerPolicy}), {
          name: 'TypeError',
          message: /"referrerPolicy"/
        });
      }
    });

    it('rejects invalid xContentTypeOptions values', () => {
      for (const xContentTypeOptions of ['yes', 'NOSNIFF', '', null, 0]) {
        assert.throws(() => buildSecurityHeaderTuples({xContentTypeOptions}), {
          name: 'TypeError',
          message: /"xContentTypeOptions"/
        });
      }
    });

    it('rejects invalid xXssProtection values', () => {
      for (const xXssProtection of ['on', '1;mode=block', 0, null, '']) {
        assert.throws(() => buildSecurityHeaderTuples({xXssProtection}), {
          name: 'TypeError',
          message: /"xXssProtection"/
        });
      }
    });

    it('rejects empty, whitespace, CTL, and non-string structural headers', () => {
      for (const contentSecurityPolicy of [
        '',
        '   ',
        'default-src\x00none',
        'default-src\x7Fnone',
        42,
        null
      ]) {
        assert.throws(() => buildSecurityHeaderTuples({contentSecurityPolicy}), {
          name: 'TypeError',
          message: /"contentSecurityPolicy"/
        });
      }
      for (const permissionsPolicy of ['', '   ', 'camera=\x1F()', 'camera=\x7F()', null, 1]) {
        assert.throws(() => buildSecurityHeaderTuples({permissionsPolicy}), {
          name: 'TypeError',
          message: /"permissionsPolicy"/
        });
      }
      for (const strictTransportSecurity of [
        '',
        '   ',
        'max-age=\x00',
        'max-age=\x7F',
        null,
        1,
        []
      ]) {
        assert.throws(() => buildSecurityHeaderTuples({strictTransportSecurity}), {
          name: 'TypeError',
          message: /"strictTransportSecurity"/
        });
      }
    });

    it('rejects invalid HSTS object forms', () => {
      assert.throws(() => buildSecurityHeaderTuples({strictTransportSecurity: {}}), {
        name: 'TypeError',
        message: /"strictTransportSecurity.maxAge"/
      });
      assert.throws(() => buildSecurityHeaderTuples({strictTransportSecurity: {maxAge: -1}}), {
        name: 'TypeError',
        message: /"strictTransportSecurity.maxAge"/
      });
      assert.throws(() => buildSecurityHeaderTuples({strictTransportSecurity: {maxAge: 1.5}}), {
        name: 'TypeError',
        message: /"strictTransportSecurity.maxAge"/
      });
      assert.throws(
        () =>
          buildSecurityHeaderTuples({
            strictTransportSecurity: {maxAge: 3600, includeSubDomains: 'yes'}
          }),
        {name: 'TypeError', message: /"strictTransportSecurity.includeSubDomains"/}
      );
      assert.throws(
        () =>
          buildSecurityHeaderTuples({
            strictTransportSecurity: {maxAge: 3600, preload: 'yes'}
          }),
        {name: 'TypeError', message: /"strictTransportSecurity.preload"/}
      );
    });

    it('accepts valid xXssProtection enum values', () => {
      for (const xXssProtection of ['0', '1', '1; mode=block']) {
        const headers = Object.fromEntries(buildSecurityHeaderTuples({xXssProtection}));
        assert.equal(headers['X-XSS-Protection'], xXssProtection);
      }
    });
  });
});
