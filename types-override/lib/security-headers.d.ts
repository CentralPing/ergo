/**
 * @fileoverview Type declarations for `lib/security-headers` named exports.
 */

export declare const DEFAULT_HSTS_MAX_AGE_SECONDS: number;

declare function buildSecurityHeaderTuples(options?: {
  contentSecurityPolicy?: string | false;
  strictTransportSecurity?:
    | string
    | false
    | {
        maxAge: number;
        includeSubDomains?: boolean;
        preload?: boolean;
      };
  xContentTypeOptions?: 'nosniff' | true | false;
  xFrameOptions?: 'DENY' | 'SAMEORIGIN' | false;
  referrerPolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'same-origin'
    | 'origin'
    | 'strict-origin'
    | 'origin-when-cross-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
    | false;
  xXssProtection?: '0' | '1' | '1; mode=block' | false;
  permissionsPolicy?: string | false;
}): [string, string][];

export default buildSecurityHeaderTuples;
