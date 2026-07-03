# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed

- **`IdempotencyStore` eviction is now status-aware with generation token validation.**
  (#225)
  `set()` now prunes expired entries before checking capacity, preferentially evicts
  `complete` entries over `processing` entries, and returns a generation token (string).
  `complete(key, response, generation)` accepts the generation token and returns
  `boolean` (`true` on success, `false` when the entry is absent, evicted, or the
  generation token mismatches). Passing `undefined` or `null` as `response` returns
  `false` without mutating the entry. When all entries are `processing` and a new entry
  must be stored, the oldest `processing` entry is evicted and a one-time
  `process.emitWarning` is emitted with `{type: 'ErgoWarning',
  code: 'ERGO_IDEMPOTENCY_PROCESSING_EVICTED'}`. Custom store implementations must
  update `set()` to return a `string` and `complete()` to accept a third `generation`
  parameter and return `boolean`.

- **Prefer header parser enforces RFC 7240 token/quoted-string grammar.** (#219)
  Replaced the loose regex with a character-by-character scanner that enforces
  RFC 9110 §5.6.2 `token` and §5.6.4 `quoted-string` grammars. Preference names
  now accept the full `tchar` set (digits, `!`, `#`, etc. at any position). Quoted
  values handle backslash escapes (`quoted-pair`) and reject bare control characters.
  Commas inside quoted values no longer break parsing. Malformed preferences are
  silently skipped (graceful degradation). Non-breaking: valid RFC 7240 inputs
  produce identical output; previously-accepted invalid inputs may now be skipped.

- **`formatLinkHeader` href validation replaced with RFC 3986 URI-reference character
  allowlist.** (#207)
  Previously rejected only CR, LF, NUL, and `>` via a four-character denylist. Now
  validates against the full RFC 3986 §2 URI-reference character repertoire — only
  unreserved, reserved, and well-formed percent-encoded triplets (`%XX`) are accepted.
  Bare `%` signs and malformed sequences like `%GG` or `%2` are rejected. Callers
  passing href values with spaces, `<`, `{`, `}`, `\`, `^`, `` ` ``, or `|` will now
  receive a `TypeError`. Callers producing IRIs must percent-encode non-ASCII
  characters before calling `formatLinkHeader`.

### Added

- **`keyGenerator` option on `idempotency()` for store key scoping.** (#227)
  Transforms the parsed `Idempotency-Key` header value into a scoped store key via
  `(parsedKey, req, domainAcc) => string`. Enables multi-tenant isolation by binding
  keys to auth principal, route, or HTTP method — per IETF
  draft-ietf-httpapi-idempotency-key-header-07 §5 composite key recommendation.
  Defaults to identity (unscoped), preserving existing behavior. Follows the
  `rateLimit()` `keyGenerator` pattern.

- **`redactHeaders` option on `handler()` for onResponse hook header redaction.** (#181)
  Controls which response headers are replaced with `'[REDACTED]'` in the
  `responseInfo` snapshot passed to `onResponse` hooks. Defaults to
  `authorization`, `proxy-authorization`, `cookie`, `set-cookie` — the same
  set used by `logger()`. Pass an empty `Set` to disable redaction.

- **`lib/redact-headers.js` shared redaction primitive.** (#181)
  Exports `DEFAULT_REDACTED_HEADERS` and `redactHeaders(headers, redactSet)`.
  Extracted from `http/logger.js`'s private implementation. Available via deep
  import `@centralping/ergo/lib/redact-headers`.

- **Factory-time warning for CORS wildcard + credentials misconfiguration.** (#177)
  `cors({origins: '*', allowCredentials: true})` now emits a one-time
  `process.emitWarning` with `{type: 'ErgoWarning', code: 'ERGO_CORS_WILDCARD_CREDENTIALS'}`.
  Behavior is unchanged — origin reflection still works. The warning surfaces the
  OWASP-documented misconfiguration footgun at startup.

- **`MemoryStore.reset()` method for test isolation.** (#165)
  Clears all tracked keys, restoring the store to its initial state. Enables
  integration tests that share a single store instance to reset rate-limit
  counters between test cases without reconstructing the middleware or router.

### Fixed

- **`MemoryStore` constructor validates `maxKeys` and `now` parameters.** (#230)
  `maxKeys` must be a positive integer; `now` must be a function. Invalid values
  that previously caused silent misconfiguration (e.g. `maxKeys: null` coercing to
  `0` in the eviction guard, making the store behave as a single-entry cache) now
  throw `TypeError` at construction time. Default construction is unaffected.

- **`IdempotencyStore` defensive coding improvements.** (#226)
  Three hardening fixes for the public `IdempotencyStore` primitive: (1) constructor
  validates `maxKeys` (positive integer) and `ttlMs` (positive finite number), throwing
  `TypeError` for invalid types that previously caused silent misconfiguration;
  (2) `get()` returns a frozen deep clone instead of the live internal entry, preventing
  callers from corrupting store state via mutation of any nested field; (3) `complete()`
  deep-clones the response object via `structuredClone`, preventing post-call mutation of
  the original (including nested objects) from affecting stored replay data. Existing valid
  usage is unaffected — only previously-invalid constructor arguments now throw.

- **Cookie attribute validation uses per-attribute RFC grammars.** (#218)
  `domain` validates against RFC 1034/1123 subdomain grammar (alphanumeric labels
  with hyphens, dot-separated, optional leading dot). `path` validates against
  RFC 6265 §4.1.2.4 `path-value` (any CHAR except CTLs or semicolons). `sameSite`
  validates against the RFC 6265bis `{Strict, Lax, None}` enum (case-insensitive).
  Previously all three attributes incorrectly used the `cookie-octet` grammar
  intended only for cookie values. Domain now rejects injection characters (`!`,
  `#`, `$`, `*`) that are invalid in DNS names. Path now accepts spaces and commas
  that are valid per RFC 6265. SameSite now rejects arbitrary strings that do not
  match the enum.

- **`validateLocation` uses RFC 3986 URI-reference character allowlist.** (#217)
  Replaces the three-character denylist (`CONTROL_STRIP_RE`) that only stripped tab,
  CR, and LF. Now rejects all characters not permitted in a URI-reference — NUL, C0
  controls, DEL, non-ASCII, bare percent signs, and malformed percent-encoding are
  caught. Follows the same allowlist pattern applied in `formatLinkHeader` (#207),
  `sanitizeQuotedString` (#208), and cookie-octet validation (#206).

- **`parseIdempotencyKey` uses RFC 8941 sf-string allowlist instead of permissive denylist.**
  (#220)
  Replaced the `SF_STRING_RE` regex (permissive negated character class `[^"\\]`) with a
  positive allowlist derived from RFC 8941 §3.3.3's `unescaped` (`%x20-21 / %x23-5B /
  %x5D-7E`) and `escaped` (`"\" ( DQUOTE / "\" )`) productions. CTL characters
  (`\x00`–`\x1F`, `\x7F`), non-ASCII bytes (`\x80`+), and HTAB (`\x09`) in the inner
  string are now correctly rejected. The denylist escape check is eliminated — the regex
  itself rejects invalid escape sequences at the match stage. Previously-accepted malformed
  keys will now produce 400 responses (only invalid inputs are affected; all valid RFC 8941
  sf-strings continue to parse correctly).

- **Parsed JSON bodies use null-prototype objects at all nesting levels.** (#214)
  `acc.body.parsed` now returns objects created via `Object.create(null)` at every
  depth, aligning with the null-prototype policy enforced by query, cookie, and
  Prefer parsers. Applies to both the identity-encoded fast path and the
  compressed-body lazy getter path.

- **JSDoc bare `{Buffer}` replaced with `{import('node:buffer').Buffer}`.** (#213)
  Two annotations in `lib/idempotency.js` (1) and `http/body.spec.unit.js` (1) used bare
  `Buffer` without the `import('node:...')` form required by JSDoc conventions.

- **`sanitizeQuotedString` uses qdtext allowlist instead of CTL denylist.** (#208)
  Replaced the control-character denylist regex with a positive allowlist derived
  from the RFC 7230 §3.2.6 `qdtext` and `quoted-pair` productions. Behavior is
  preserved for the previous CTL cases (NUL–BS, LF–US, DEL), and the sanitizer
  now also strips characters outside the quoted-string latin1 allowlist.
  Defense-in-depth improvement: any character not explicitly allowed is now
  stripped rather than relying on enumerating forbidden characters.

- **Cookie value validation uses RFC 6265 cookie-octet allowlist.** (#206)
  Replaces the denylist regex (`COOKIE_VALUE_UNSAFE_RE`) with an anchored allowlist
  (`COOKIE_VALUE_RE`) matching RFC 6265 §4.1.1 `cookie-octet` grammar. Now correctly
  rejects non-ASCII bytes (`\x80-\xFF`) that the denylist missed. Aligns with the
  allowlist patterns already used by `assertSafeName` (`TOKEN_RE`) and the parser
  (`valueRFC6265`).

- **Location header rejects dangerous URI schemes.** (#188)
  `send()` validates `responseAcc.location` against `javascript:`, `data:`, and
  `vbscript:` schemes before setting the Location header. Throws `TypeError` for
  blocked schemes, providing defense-in-depth against CWE-601 XSS via open redirect.

- **JSDoc bare `{Array}` annotations replaced with `{*[]}` shorthand.** (#187)
  Five annotations in `lib/paginate.js` (4) and `utils/flat-array.js` (1) used
  imprecise `{Array}` without type parameters. Replaced with the `{*[]}` shorthand
  for consistency with the codebase's parameterized `{Array<T>}` convention.

- **Logger `error()` callback now redacts sensitive error details by default.** (#183)
  When `redactErrors` is `true` (default), the error callback logs generic HTTP status
  text instead of `err.message`, and suppresses `err.stack` and `err.originalError`.
  Prevents sensitive error details (database connection strings, file paths, token
  validation messages) from leaking into structured log output. Mirrors `handler()`'s
  `redactErrors` behavior for HTTP response bodies, applied to the log output boundary.

- **`ajv-formats` default mode changed from full to fast (ReDoS mitigation).** (#182)
  The default format validation mode now uses simplified regexes that are safe for
  untrusted input. Full-mode regexes for `date`, `time`, `date-time`, `duration`,
  `uri`, `uri-reference`, `email`, and `idn-email` are vulnerable to ReDoS with
  crafted payloads. Selective format arrays (e.g. `formats: ['email']`) continue
  to use full-mode regexes — `ajv-formats` does not support per-format mode
  selection. Opt in to full mode via `{mode: 'full'}` when strict RFC compliance
  is required and input sources are trusted.

- **Logger preserves empty-string request IDs (nullish coalescing).** (#186)
  `http/logger.js` request-ID resolution chain now uses `??` instead of `||`.
  An upstream proxy sending `x-request-id: ""` is treated as a present value
  rather than falling through to UUID generation.

- **Validation error `path` uses RFC 6901 empty string for root-level errors.** (#186)
  `lib/validate.js` `formatError` no longer maps AJV's empty-string
  `instancePath` to `'/'`. Per RFC 6901, the empty string is the correct
  JSON Pointer representation of the root document. Consumers matching
  `details[].path === '/'` for root-level errors should update to `=== ''`.

- **`buildResponseInfo` now redacts sensitive response headers.** (#181)
  Previously, `buildResponseInfo` passed `res.getHeaders()` directly into the
  response info snapshot without redaction. The `onResponse` hook could leak
  `set-cookie`, `authorization`, `proxy-authorization`, and `cookie` headers
  even when `http/logger.js` correctly redacted them. The function now accepts
  an optional `redactSet` parameter, and `handler()` forwards its
  `redactHeaders` option (defaulting to the same 4-header set as the logger).

- **`handler()` send catch block now emits errors for observability.** (#179)
  The `send()` catch block previously used a bare `catch` without capturing the
  error, silently swallowing serialization failures. The error is now emitted on
  `res` via the guarded `listenerCount('error') > 0` pattern (enabling
  `http/logger.js` error callbacks) and recorded on the OTEL span via
  `span.recordException()` for distributed tracing visibility. Matches the
  pipeline catch block's established observability convention.
  Additionally, `responseAcc.statusCode` is now set to `500` in the send catch
  so the OTEL span finalization reads the correct status instead of the
  pipeline's stale value.

- **Pagination `prev` link clamped to last page when `page` exceeds total.** (#180)
  `paginationLinks` now generates `prev` pointing to `lastPage` instead of
  `page - 1` when the requested page is beyond the last page, preventing
  clients from navigating through a chain of non-existent pages.

- **Logger `redact()` uses null-prototype object.** (#178)
  The `redact()` helper in `http/logger.js` now uses `Object.create(null)` instead
  of `{}` for the header copy, aligning with the null-prototype policy for
  user-input-derived objects.

- **`BodyResult.parsed` type narrowed from optional to required.** (#174)
  The `parsed` field was incorrectly declared as `parsed?: T` despite the
  `body()` middleware guaranteeing its presence on every success path (both
  the fast JSON path and the lazy-getter path). Consumers no longer need
  non-null assertions or optional chaining to access `acc.body.parsed`.

### Documentation

- **README: elevate benchmark discoverability.** (#166)
  Adds a "Benchmarked" bullet to the "Why ergo?" section, surfacing the published
  benchmarks page link within the first screenful of the README.

## [0.6.1] - 2026-06-17

### Documentation

- **JSDoc `@example` blocks updated to 0.6.0 bare compose API.** (#161)
  Replaced explicit `{fn, setPath}` wrappers with bare function calls for built-in
  middleware in orchestration examples across `http/main.js`, `http/index.js`,
  `http/handler.js`, and `http/validate.js`. Corrected `@fileoverview` compose
  reference in `http/main.js` (stale tuple pattern from pre-v0.4.0).

- **README Quick Start updated to 0.6.0 bare compose API.** (#160)
  Replaced explicit `{fn, setPath}` wrappers with bare function calls for built-in
  middleware in both JS and TS examples. Added a note explaining that `{fn, setPath}`
  config objects remain available for custom middleware. Expanded the middleware overview
  table with 4 missing entries: `handler`, `tracing`, `paginate`, `idempotency`.

## [0.6.0] - 2026-06-13

### Added

- **Intrinsic `setPath` on built-in middleware factory return values.** (#153)
  Domain-producing middleware factories (`url`, `logger`, `body`, `accepts`, `cookie`,
  `authorization`, `tracing`, `prefer`, `paginate`, `idempotency`) now attach a
  non-enumerable `setPath` property to their returned middleware function. `normalizeOp`
  in `compose-with.js` reads this property, allowing bare functions to be composed without
  explicit `{fn, setPath}` wrappers:

  ```js
  // Before: compose({fn: url(), setPath: 'url'}, {fn: body(), setPath: 'body'})
  // After:  compose(url(), body())
  ```

  The explicit `{fn, setPath}` form remains fully supported for custom middleware.
  TypeScript declarations updated with `& {readonly setPath: '...'}` intersection types
  and `MiddlewareOp<K, F>` union type in compose-with overloads.

### Fixed

- **JSDoc `@example` blocks in `handler`, `tracing`, and `index` now include the
  `import http from 'node:http'` line.** (#155)

## [0.5.0] - 2026-06-11

### Added

- **`now` clock option on `MemoryStore` constructor.** (#150)
  Accepts an optional clock function (`() => number`) for deterministic time control.
  Default is `Date.now` — no behavior change for existing consumers. Enables portable
  test patterns without Node-specific mock timers.

- **`responseSchema` option for `send()` and `handler()`.** (#137)
  Schema-based response body projection that strips undeclared properties before JSON
  serialization. Accepts a map of status code (or range key like `'2xx'`, `'default'`) to
  JSON Schema objects. Projectors are compiled at factory time for zero per-request schema
  parsing overhead. Only applies to Object bodies with `statusCode < 400`. Resolution
  order: exact match → range → default. New shared primitive `lib/response-schema.js`
  available via deep import `@centralping/ergo/lib/response-schema`.
- **Multi-runtime CI: Deno 2.x and Bun 1.x test jobs.** (#138)
  CI now runs the full test suite on Deno and Bun alongside Node.js 22/24.
  Both runtimes pass all contract tests (100%) and nearly all unit tests
  (Deno 96.7%, Bun 99.4%) via their Node.js compatibility layers. Jobs use
  `continue-on-error` as informational checks. README documents runtime support
  status and known gaps.

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

- **Multi-runtime CI: Deno 2.x and Bun 1.x test jobs.** (#138)
  CI now runs the full test suite on Deno and Bun alongside Node.js 22/24.
  Both runtimes pass all contract tests (100%) and nearly all unit tests
  (Deno 96.7%, Bun 99.4%) via their Node.js compatibility layers. Jobs use
  `continue-on-error` as informational checks. README documents runtime support
  status and known gaps.

### Documentation

- **Naming discoverability audit: `send`, `accepts`, `compose` — keep decision.** (#139)
  Evaluated all three names against ecosystem conventions, alternative candidates, and
  affected surface area. Conclusion: names are accurate, alternatives are equally or more
  ambiguous, and the perceived confusion stems from architectural differences with
  Express/Fastify/Koa — not naming errors.

### Fixed

- **Test suite portability for Deno and Bun.** (#150)
  Replaced Node-specific test infrastructure (`@opentelemetry/sdk-trace-node`,
  `mock.method()`, `mock.timers`) with portable patterns in three test files:
  `http/tracing.spec.unit.js` (mock tracer via `{tracer}` factory option),
  `http/validate.spec.unit.js` (direct `process.emitWarning` assignment),
  `lib/rate-limit.spec.unit.js` (injectable clock). No production behavior changes
  except the `now` parameter.

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
