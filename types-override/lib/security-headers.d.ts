/**
 * @fileoverview Type declarations for `lib/security-headers` named exports.
 */

import type { SecurityHeadersOptions } from '../ergo.js';

export declare const DEFAULT_HSTS_MAX_AGE_SECONDS: number;

declare function buildSecurityHeaderTuples(
  options?: SecurityHeadersOptions
): [string, string][];

export default buildSecurityHeaderTuples;
