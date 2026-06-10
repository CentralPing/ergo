# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **`responseSchema` option for `send()` and `handler()`.** (#137)
  Schema-based response body projection that strips undeclared properties before JSON
  serialization. Accepts a map of status code (or range key like `'2xx'`, `'default'`) to
  JSON Schema objects. Projectors are compiled at factory time for zero per-request schema
  parsing overhead. Only applies to Object bodies with `statusCode < 400`. Resolution
  order: exact match → range → default. New shared primitive `lib/response-schema.js`
  available via deep import `@centralping/ergo/lib/response-schema`.

- **`onResponse` post-send lifecycle hook for `handler()`.** (#140)
  Observation callback fired after `send()` completes. Receives `(req, res, responseInfo,
  domainAcc)` where `responseInfo` is a snapshot of `{statusCode, headers, method, url,
  bodySize, duration}`. Hook errors are swallowed — cannot affect the response. Async hooks
  are awaited. OTEL span duration includes hook execution time.

- **`lib/response-info.js` shared primitive.** (#140)
  Pure function `buildResponseInfo(req, res, startTime)` for constructing response info
  snapshots. Consumed by `http/handler.js` and `ergo-router/lib/auto-wrap.js`. Exported
  via `@centralping/ergo/lib/response-info`.

- **`validate()` shorthand form for body-only schemas.** (#135)
  Pass a raw JSON Schema object directly to `validate()` instead of wrapping it in
  `{body: schema}`. The shorthand is detected when the first argument contains JSON Schema
  keywords (e.g. `type`, `properties`, `required`) and none of the targeted keys (`body`,
  `query`, `params`). The targeted form is unchanged and takes precedence when any targeted
  key is present. Objects that match neither form still emit `ERGO_VALIDATE_UNKNOWN_KEY`
  warnings.

### Documentation

- **Naming discoverability audit: `send`, `accepts`, `compose` — keep decision.** (#139)
  Evaluated all three names against ecosystem conventions, alternative candidates, and
  affected surface area. Conclusion: names are accurate, alternatives are equally or more
  ambiguous, and the perceived confusion stems from architectural differences with
  Express/Fastify/Koa — not naming errors.

### Fixed

- **Declared `@types/node` as optional peer dependency for TypeScript consumers.** (#134)
  TypeScript consumers compiling with `skipLibCheck: false` received errors from ergo's
  `.d.ts` files because `import('node:http')` type references require `@types/node`. The
  package is now declared as an optional peer dependency (`>= 22`, matching `engines.node`),
  following the ecosystem standard used by Express, Fastify, and Koa. JavaScript-only
  consumers are unaffected — npm prints an informational warning but does not fail.

## [0.4.1] - 2026-06-07

### Added

- **Factory-time option key validation with Levenshtein suggestions.** (#126)
  All 18 middleware factories now validate incoming option keys at factory invocation
  time via a shared `lib/validate-options.js` utility. Unknown keys emit a deduplicated
  `process.emitWarning` with `{type: 'ErgoWarning'}` and a "did you mean?" suggestion
  when the Levenshtein edit distance is within threshold. `handler()` validates the union
  of its own keys and `send()` keys; `send()` validates independently.
- **`timing` option on `handler()` for `X-Response-Time` header.** (#127)
  Pass `timing: true` for defaults or `timing: {header?, precision?}` for custom
  configuration. Measures the full request lifecycle (pipeline + error handling + send)
  via a `res.writeHead` interception. Zero overhead when disabled (default). Shared
  primitive `lib/response-time.js` available for deep import by `@centralping/ergo-router`.

### Changed

- **README TypeScript Quick Start updated to reflect shipped type infrastructure.** (#131)
  Removed the forward-looking caveat about future type inference improvements — all
  prerequisite features have shipped (compose overloads #87, typed middleware #108,
  ergo-router accumulator inference ergo-router#91). Simplified the TS example by removing
  the `AuthResult` interface and explicit `IncomingMessage`/`ServerResponse` imports.
  Replaced the caveat with a factual note explaining when `acc` annotations are needed
  (standalone `compose()` with interleaved bare functions) and directing users to
  `@centralping/ergo-router`'s `defineGet`/`definePost` helpers for annotation-free
  inference.

## [0.4.0] - 2026-06-06

### Changed

- **BREAKING: Middleware composition uses config objects instead of tuples.** (#117)
  Domain-producing middleware now uses `{fn, setPath}` config objects instead of
  `[fn, setPath]` tuples. Response-only middleware (cors, securityHeaders, cacheControl,
  rateLimit, precondition, validate, jsonApiQuery) are plain functions — no wrapper needed.
  - `normalizeOp()` now discriminates via `typeof op === 'function'` (was `Array.isArray`)
  - `MiddlewareTuple` type renamed to `MiddlewareOp` with `{fn, setPath}` shape
  - All 20 middleware inner functions are now named (`fn.name` provides trace labels)
  - Migration: `[myFn(), 'key']` → `{fn: myFn(), setPath: 'key'}`

### Fixed

- **handler.js** JSDoc and `HandlerOptions` type now document the `paginate` option forwarded to `send()`. (#118)

## [0.3.0] - 2026-06-05

### Added

- **`http/paginate.js` declarative pagination middleware factory.** Wraps `lib/paginate.js`
  utilities into a pipeline-compatible middleware supporting offset and cursor strategies.
  Placed in Stage 1 (Negotiation) after `url`. Reads parsed query from `domainAcc.url.query`
  and stores structured pagination parameters at `acc.paginate`. (#114)
- **`send()` `paginate` option.** When `true`, reads `domainAcc.paginate` and
  `responseAcc.paginate` to auto-generate RFC 8288 Link headers (`first`, `prev`, `next`,
  `last`) and `X-Total-Count` for offset pagination responses. Supports both offset and
  cursor strategies. (#114)
- `'paginate'` added to `SEND_RESERVED` to prevent pagination metadata from leaking as
  RFC 9457 extension members. (#114)
- **`errorFormatter` option for `send()` and `handler()`.** Pluggable error body formatter
  for `statusCode >= 400` responses. When provided, receives the RFC 9457 Problem Details
  object (plain object) and `{requestId, statusCode, method}` context. The return value
  becomes the response body, serialized as `application/json` instead of
  `application/problem+json`. Applies to both the main error path and 412 conditional
  responses (`endWithProblem`). Teams with existing error contracts can adopt ergo without
  changing their client-facing error format. (#110)
- **`redactErrors` option for `handler()`.** Controls whether caught 5xx exception messages
  appear in the RFC 9457 response `detail` field. Defaults to `true` (secure — generic
  status text only). Set to `false` during development to surface `err.message` in error
  responses without exposing stack traces. (#109)
- **Typed middleware options and results.** All 21 middleware factory functions now have
  hand-written `.d.ts` overrides in `types-override/http/` with named options interfaces
  (`AcceptsOptions`, `BodyOptions`, `CorsOptions`, `ValidateOptions`, etc.) and precise
  return types. Consumers get autocomplete and type-checking for factory parameters and
  pipeline accumulator values without `as any` casts. Import options/result types from
  `@centralping/ergo/types`. (#108)
- New result type interfaces: `AuthorizationResult`, `TracingResult`, `IdempotencyResult`.
  (#108)
- New utility types: `AjvFormatName` (26-member string literal union tracking ajv-formats
  3.x), `AuthorizationStrategy`, `ValidateSchemas`, `CookieJar` (now includes jar methods).
  (#108)
- `types-override/http/main.d.ts` override provides typed re-exports for all middleware,
  `httpErrors`, `fromConnect`, and `paginate` namespace. (#108)

### Changed

- **Breaking:** `paginate` export from `@centralping/ergo` changed from `lib/paginate.js`
  utility namespace (`{parseOffsetParams, parseCursorParams, offsetResponse, cursorResponse}`)
  to `http/paginate.js` factory function. Consumers using `paginate.parseOffsetParams()` must
  switch to deep import: `import {parseOffsetParams} from '@centralping/ergo/lib/paginate'`.
  (#114)

### Fixed

- **`envelope` callback type signature corrected.** Changed from
  `(body: unknown, statusCode: number) => unknown` to
  `(body: unknown, ctx: {requestId: string; statusCode: number; method: string}) => unknown`
  to match the actual implementation which passes a context object, not a bare status code.
  Affects `SendOptions` and `HandlerOptions`. (#110)
- **`PreferResult` now matches runtime.** Corrected from `{[k: string]: {value?: string}}`
  to `{[k: string]: string | true}` — the runtime returns flat preference values, not
  wrapped objects. (#108)
- **`CookieJar` now includes jar methods.** Added `set()`, `get()`, `clear()`, `toHeader()`,
  `size`, and `isJar` to match the actual cookie jar API. Previously typed as a bare index
  signature. (#108)
- **`LogEntry` now includes trace correlation fields.** Added optional `traceId` and `spanId`
  properties populated when the tracing middleware is active. (#108)

### Removed

- **`RateLimitResult` removed.** The rate-limit middleware only returns
  `{response: {headers}}` — it never stores a domain accumulator value. The interface
  described a shape that did not exist at runtime. (#108)

---

## [0.2.0] - 2026-06-04

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
- **Pagination helpers.** New `paginate` namespace export with `parseOffsetParams`,
  `parseCursorParams`, `offsetResponse`, and `cursorResponse`. Parses query parameters with
  bounded defaults, generates RFC 8288 Link headers and `X-Total-Count`, and returns
  pipeline-compatible response objects. Available via `import {paginate} from '@centralping/ergo'`
  or `import {parseOffsetParams} from '@centralping/ergo/lib/paginate'`. (#85)
- CI type-checking gate validates generated `.d.ts` files with `skipLibCheck: false` and
  `strict: true` via `npm run check-types`. Prevents shipping broken type declarations. (#83)
- TypeScript usage example alongside the JavaScript Quick Start in `README.md`. (#74)

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
