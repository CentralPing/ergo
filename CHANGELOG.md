# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed

- **BREAKING**: `validate()` now returns a 500 response when a body schema is configured but
  `acc.body` is absent, indicating `body()` was not placed before `validate()` in the pipeline.
  A one-time `process.emitWarning` diagnostic is emitted with code `ERGO_VALIDATE_NO_BODY`.
  Previously, body validation was silently skipped, allowing invalid request data to reach
  the execute handler unchecked. Correctly ordered pipelines are unaffected. (#93)
- **BREAKING**: `idempotency()` now distinguishes missing from malformed `Idempotency-Key`
  headers. A malformed header (present but not a valid RFC 8941 sf-string) always returns
  `400` with format guidance, regardless of the `required` option. Previously, a malformed
  header with `required: false` silently passed through as if the header were absent. (#90)
- **BREAKING (types only)**: All middleware factory `.d.ts` declarations now emit inferred
  function signatures instead of `Function`. `compose()`/`composeWith()` return
  `(...args) => Promise<object>` instead of `Function`. `csrf()` and `logger()` emit
  full object types instead of `object`. No runtime behavior changes. (#75)

### Added

- TypeScript usage example alongside the JavaScript Quick Start in `README.md`. (#74)

## [0.1.0-beta.4] - 2026-05-29

### Added

- JSON Schema `format` keyword support via `ajv-formats`. Standard formats (`email`, `uri`,
  `date-time`, `uuid`, etc.) are validated by default. Opt out with `formats: false` or select
  specific formats with an array (e.g. `formats: ['email', 'uri']`). (#58)

### Fixed

- **BREAKING**: `accepts()` now defaults `throwIfFail` to `true`, enforcing 406 responses for unsatisfied content negotiation per the Fast Fail pipeline contract. Set `throwIfFail: false` to restore the previous informational-only behavior. (#55)
- `body()` default types now include `application/merge-patch+json` (RFC 7386) and `application/json-patch+json` (RFC 6902), resolving 415 rejections for valid PATCH content types that ergo-router's `strictPatch` allows. (#56)
- `validate()` params validation now checks `acc.route.params` (ergo-router convention) with fallback to `acc.params` (standalone), fixing silent no-op validation when used with ergo-router. (#57)

## [0.1.0-beta.1] - 2026-05-20

### Changed

- **BREAKING**: Renamed package from `ergo` to `@centralping/ergo`.
- Updated `content-type` dependency to v2.0.0 (string-only parse API).
- Added TypeScript declaration files (`.d.ts`) generated from JSDoc.
- Added `CHANGELOG.md` to published npm tarball.
- Updated release workflow to support pre-release dist-tags.

## [0.1.0] - 2026-03-20

### Added

- Initial development release as `ergo` (unscoped, never published to npm).
- Composable Fast Fail middleware pipeline with four-stage architecture (Negotiation, Authorization, Validation, Execution).
- RFC-compliant middleware: content negotiation, authorization (Basic/Bearer), body parsing (JSON/multipart/URL-encoded), cookie handling, CORS, CSRF protection, rate limiting, security headers, cache control, conditional requests, compression, and more.
- Structured error responses via RFC 9457 Problem Details.
- Prefer header support (RFC 7240).
- Web Linking support (RFC 8288).
- Pure ESM with Node.js >= 22.
