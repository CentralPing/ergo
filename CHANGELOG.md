# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **OpenTelemetry tracing integration.** `@opentelemetry/api` as a regular dependency with
  pipeline-level distributed tracing. New `tracing()` middleware factory starts an
  `ergo.pipeline` span per request, ends it after `send()`, and propagates W3C trace context.
  Logger automatically includes `traceId` and `spanId` when the tracing middleware is active.
  Per-stage child spans available via `perStage: true` option. Zero overhead when the tracing
  middleware is not included in the pipeline. (#89)

- **Pipeline debug tracing.** Pass `{debug: true}` as the second argument to `handler()` to
  enable pipeline tracing. When enabled, `responseAcc._trace` is initialized with
  `{steps: [], breakAt: undefined}`. The `compose-with` serial and concurrent runners record
  each middleware label in `steps` and set `breakAt` to the label that triggered a pipeline
  break. On error responses (>= 400), `_trace` appears as an RFC 9457 extension member. (#86)

### Fixed

- `formatLinkHeader()` now rejects href values containing CR, LF, or NUL characters with a
  `TypeError`, preventing `ERR_INVALID_CHAR` crashes when malformed hrefs reach
  `res.setHeader()`. (#103)
- **`instance` field on all error paths.** The RFC 9457 `instance` field
  (`urn:uuid:{requestId}`) is now populated from the `x-request-id` response header on all
  error paths — pipeline breaks (return-value), caught errors, and `endWithProblem` (412).
  Previously, `instance` was only populated in the `catch` block, missing the v2 return-value
  error model entirely. (#95)
- `validate()` now emits a one-time `process.emitWarning` diagnostic with code
  `ERGO_VALIDATE_UNKNOWN_KEY` when the schema map contains unrecognized keys (e.g.
  `validate({schemas: {body: ...}})` instead of `validate({body: ...})`). Previously,
  unrecognized keys were silently ignored and validation became a no-op. (#84)
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
- `.d.ts` declarations now compile with `skipLibCheck: false`. Middleware parameter types
  for `cookie()`, `cors()`, `url()`, and `lib/cors` are specific instead of `{}`. (#83)

### Added

- **compose() accumulator type inference.** `compose()` now infers the domain accumulator
  type from `[fn, setPath]` tuples. For pipelines with 1–12 tuples, TypeScript infers which
  keys exist on the accumulator and their types. Accessing a key from middleware not in the
  pipeline is a compile-time error. Pipelines with >12 tuples or only plain functions fall
  back to `Promise<object>`. `compose.all()` has the same overloaded inference. (#87)
- **Middleware result type exports.** New consumer-facing type interfaces for middleware
  accumulator values: `UrlResult`, `BodyResult`, `CookieJar`, `LogEntry`, `AcceptsResult`,
  `PreferResult`, `RateLimitResult`, `ResponseAccumulator`, and `MiddlewareTuple`. Import
  from `@centralping/ergo/types`. (#87)
- **Hand-written type override system.** `types-override/` directory holds hand-written
  `.d.ts` files that replace auto-generated declarations after `tsc` runs. Used for
  `compose-with.d.ts` where JSDoc cannot express the required variadic generic types. (#87)
- CI type-checking gate validates generated `.d.ts` files with `skipLibCheck: false` and
  `strict: true` via `npm run check-types`. Prevents shipping broken type declarations. (#83)
- TypeScript usage example alongside the JavaScript Quick Start in `README.md`. (#74)
- **Pagination helpers.** New `paginate` namespace export with `parseOffsetParams`,
  `parseCursorParams`, `offsetResponse`, and `cursorResponse`. Parses query parameters with
  bounded defaults, generates RFC 8288 Link headers and `X-Total-Count`, and returns
  pipeline-compatible response objects. Available via `import {paginate} from '@centralping/ergo'`
  or `import {parseOffsetParams} from '@centralping/ergo/lib/paginate'`. (#85)

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
