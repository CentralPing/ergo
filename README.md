<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/CentralPing/ergo/main/assets/logo-wordmark-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/CentralPing/ergo/main/assets/logo-wordmark-light.svg">
    <img alt="ergo" src="https://raw.githubusercontent.com/CentralPing/ergo/main/assets/logo-wordmark-light.svg" width="240">
  </picture>
</p>

[![CI](https://github.com/CentralPing/ergo/actions/workflows/ci.yml/badge.svg)](https://github.com/CentralPing/ergo/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/CentralPing/ergo/branch/main/graph/badge.svg)](https://codecov.io/gh/CentralPing/ergo)
[![npm version](https://img.shields.io/npm/v/@centralping/ergo.svg)](https://www.npmjs.com/package/@centralping/ergo)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/CentralPing/ergo/badge)](https://scorecard.dev/viewer/?uri=github.com/CentralPing/ergo)
[![Node.js >=22](https://img.shields.io/badge/node-%3E%3D22-brightgreen)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/CentralPing/ergo/blob/main/LICENSE)

A **Fast Fail** REST API toolkit for Node.js. _ergo_ (error or go) provides composable, stream-native middleware organized around the principle that a server should fail as early as possible -- before doing any expensive work -- through four ordered stages: **Negotiation, Authorization, Validation, and Execution**. Every behavior is backed by an IETF RFC or industry standard, not invented conventions.

## Why ergo?

- **Fail Fast by design** -- Errors are caught at the earliest possible stage. You never parse a request body for an unauthenticated user, and you never execute business logic on invalid input. This principle produces more robust software with fewer defects ([Shore, "Fail Fast", IEEE Software 2004](https://www.martinfowler.com/ieeeSoftware/failFast.pdf)) and is a core reliability pillar in the [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_mitigate_interaction_failure_limit_retries.html).
- **RESTful-first via RFCs** -- Every middleware implements a specific RFC or standard. Content negotiation follows [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110), error responses use [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457), cookies follow [RFC 6265](https://www.rfc-editor.org/rfc/rfc6265). No proprietary patterns.
- **Defense in depth** -- Input validation happens [as early as possible in the data flow](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) per OWASP, and access control is enforced [at each API endpoint](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html) before business logic. Authorization runs before body parsing, so unauthenticated requests never trigger expensive I/O.
- **Secure by default** -- Security headers ship with conservative defaults (`Content-Security-Policy: default-src 'none'`, `X-Frame-Options: DENY`). All user-input objects use [null prototypes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#object_with_null_prototype) to prevent prototype pollution. Input parsing is bounded out of the box (query length, pair count, body size, decompressed size). The pipeline's design maps directly to the [OWASP API Security Top 10](https://owasp.org/API-Security/) and [REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html).
- **Zero-overhead composition** -- Synchronous middleware avoids microtask overhead entirely. Independent middleware within a stage run concurrently. The pipeline is a single function call with no framework runtime.
- **Benchmarked** -- Performance is measured, not claimed. ergo is tested against Fastify, Express, Hono, and Koa across [9 scenarios](https://centralping.github.io/benchmarks/) in Docker-isolated, CPU-pinned environments with statistical rigor (3 trials per combination, coefficient of variation analysis).

## The Fast Fail Design

Every API request passes through exactly four stages, in order:

```
Request
  |
  +- Stage 1: Negotiation      Parse and inspect the request.
  |    logger() -> [ cors() | accepts() | cookie() | url() ]
  |
  +- Stage 2: Authorization    Authenticate user, verify request integrity.
  |    [ authorization() | csrf() ]
  |
  +- Stage 3: Validation       Parse and validate the request body.
  |    body() . validate()
  |
  +- Stage 4: Execution        Run the handler and send the response.
       timeout() . compress() . [your route logic] . send()
```

Stages run serially. If any middleware throws, the pipeline stops immediately and the error handler runs. Independent middleware within a stage are parallelizable (shown with `|`).

## Installation

```bash
npm install @centralping/ergo
```

Requires **Node.js >= 22**. Also works on [Deno](https://deno.com/) 2.x and [Bun](https://bun.sh/) 1.x via their Node.js compatibility layers (see [Runtime Support](#runtime-support)).

## Quick Start

```js
import {createServer} from 'node:http';
import {compose, handler, logger, cors, authorization, body} from '@centralping/ergo';

const pipeline = compose(
  logger(),
  cors(),
  authorization({strategies: [{type: 'Bearer', authorizer: (_, token) =>
    token === 'my-token' ? {authorized: true, info: {uid: 1}} : {}
  }]}),
  body(),
  (req, res, acc) => ({response: {body: {user: acc.auth, data: acc.body.parsed}}})
);

createServer(handler(pipeline)).listen(3000);
```

<details>
<summary>TypeScript</summary>

```ts
import {createServer} from 'node:http';
import {compose, handler, logger, cors, authorization, body} from '@centralping/ergo';

const pipeline = compose(
  logger(),
  cors(),
  authorization({strategies: [{
    type: 'Bearer' as const,
    authorizer: (_: Record<string, string>, token: string) =>
      token === 'my-token' ? {authorized: true, info: {uid: 1}} : {authorized: false}
  }]}),
  body(),
  (req, res, acc: {auth: {uid: number}; body: {parsed: unknown}}) =>
    ({response: {body: {user: acc.auth, data: acc.body.parsed}}})
);

createServer(handler(pipeline)).listen(3000);
```

> **Note:** The `acc` annotation on the execute handler is needed because standalone
> `compose()` cannot fully infer accumulator types when response-only middleware (like
> `cors()`) is interleaved with domain-producing middleware. For declarative routing with
> fully inferred accumulator types — no annotations needed — see
> [`@centralping/ergo-router`](https://github.com/CentralPing/ergo-router)'s `defineGet`
> and `definePost` helpers.

</details>

Built-in middleware carries its own accumulator path — compose it as a bare function call. `{fn, setPath}` config objects remain available for custom middleware that needs to declare an accumulator key.

## Middleware Overview

| Middleware | Description | Standard |
|---|---|---|
| `logger()` | Request ID + structured request/response logging | -- |
| `tracing()` | OpenTelemetry distributed tracing with W3C Trace Context propagation | [W3C Trace Context](https://www.w3.org/TR/trace-context/) |
| `cors()` | CORS preflight and simple request handling | [Fetch Standard](https://fetch.spec.whatwg.org/#http-cors-protocol) |
| `accepts()` | Content negotiation (type, encoding, language) | [RFC 9110 &sect;12.5](https://www.rfc-editor.org/rfc/rfc9110#section-12.5) |
| `cookie()` | Cookie parsing with Set-Cookie builder | [RFC 6265](https://www.rfc-editor.org/rfc/rfc6265) |
| `url()` | URL and query string parsing | -- |
| `paginate()` | Offset and cursor pagination with RFC 8288 Link headers | [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) |
| `authorization()` | Bearer / Basic auth with pluggable strategies | [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750), [RFC 7617](https://www.rfc-editor.org/rfc/rfc7617) |
| `csrf()` | Double-submit cookie CSRF protection | [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) |
| `body()` | JSON, multipart/form-data, URL-encoded parsing | [RFC 7578](https://www.rfc-editor.org/rfc/rfc7578) |
| `validate()` | JSON Schema validation via AJV | -- |
| `idempotency()` | Idempotency-Key header for safe request retries | [draft-ietf-httpapi-idempotency-key-header](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/) |
| `timeout()` | Request timeout with automatic 408/504 | -- |
| `compress()` | Content-Encoding negotiation (gzip, deflate, br) | [RFC 9110 &sect;12.5.3](https://www.rfc-editor.org/rfc/rfc9110#section-12.5.3) |
| `handler()` | Pipeline executor with error normalization and response dispatch | -- |
| `send()` | Response serialization, ETag, conditional requests, Problem Details errors | [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110), [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) |
| `prefer()` | Prefer header parsing and response | [RFC 7240](https://www.rfc-editor.org/rfc/rfc7240) |
| `precondition()` | 428 Precondition Required enforcement | [RFC 6585 &sect;3](https://www.rfc-editor.org/rfc/rfc6585#section-3) |
| `rateLimit()` | Sliding-window rate limiting with 429 responses | [RFC 6585 &sect;4](https://www.rfc-editor.org/rfc/rfc6585#section-4) |
| `securityHeaders()` | HSTS, CSP, X-Content-Type-Options, etc. | [RFC 6797](https://www.rfc-editor.org/rfc/rfc6797) |
| `cacheControl()` | Cache-Control header management | [RFC 9111](https://www.rfc-editor.org/rfc/rfc9111) |
| `jsonApiQuery()` | JSON:API query parameter validation | [JSON:API](https://jsonapi.org/) |

See the [full API reference](https://centralping.github.io/packages/ergo/) for detailed options and examples.

## Standards Compliance

| RFC / Standard | Description | ergo Feature |
|---|---|---|
| [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110) | HTTP Semantics | `send()` conditional requests, ETag, content negotiation |
| [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) | Problem Details for HTTP APIs | `send()` error responses, `httpErrors` utility |
| [RFC 9111](https://www.rfc-editor.org/rfc/rfc9111) | HTTP Caching | `cacheControl()` |
| [RFC 9205](https://www.rfc-editor.org/rfc/rfc9205) | Building Protocols with HTTP (BCP 56) | Overall API design philosophy |
| [RFC 7240](https://www.rfc-editor.org/rfc/rfc7240) | Prefer Header for HTTP | `prefer()` |
| [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) | Web Linking | `lib/link.js` pagination helpers |
| [RFC 6585](https://www.rfc-editor.org/rfc/rfc6585) | Additional HTTP Status Codes (428, 429) | `precondition()`, `rateLimit()` |
| [RFC 6265](https://www.rfc-editor.org/rfc/rfc6265) | HTTP State Management (Cookies) | `cookie()` |
| [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750) | Bearer Token Usage | `authorization()` |
| [RFC 7617](https://www.rfc-editor.org/rfc/rfc7617) | Basic HTTP Authentication | `authorization()` |
| [RFC 7578](https://www.rfc-editor.org/rfc/rfc7578) | multipart/form-data | `body()` |
| [RFC 6797](https://www.rfc-editor.org/rfc/rfc6797) | HTTP Strict Transport Security | `securityHeaders()` |
| [OWASP API Security Top 10](https://owasp.org/API-Security/) | Aligned with top API security risks | Pipeline stage ordering, `rateLimit()`, `securityHeaders()`, input bounding |
| [OWASP REST Security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html) | Aligned with REST security best practices | Auth enforcement, input validation, security headers, error redaction |

## Documentation

- [Getting Started](https://centralping.github.io/getting-started/)
- [API Reference](https://centralping.github.io/packages/ergo/)
- [Fast Fail Pipeline](https://centralping.github.io/concepts/fast-fail/)
- [Benchmarks](https://centralping.github.io/benchmarks/)

## Runtime Support

ergo is designed for Node.js and uses `node:http`, `node:stream`, `node:zlib`, and `node:crypto` at its boundaries. However, both **Deno 2.x** and **Bun 1.x** provide extensive Node.js compatibility layers that allow ergo to run without modification.

| Runtime | Version | Unit Tests | Contract Tests | Status |
|---------|---------|-----------|---------------|--------|
| **Node.js** | 22, 24 | 100% | 100% | Primary target |
| **Deno** | 2.x | 96.7% | 100% | Compatible via `node:*` compat |
| **Bun** | 1.x | 99.4% | 100% | Compatible via `node:*` compat |

**Known gaps on alternative runtimes:**

- **OpenTelemetry SDK** (Deno): `@opentelemetry/sdk-trace-node` unit tests fail because the SDK is Node.js-specific. The tracing _middleware_ works correctly (contract tests pass); only SDK-internal unit test assertions are affected.
- **`process.emitWarning`** (Bun): The `http/validate` middleware's developer-experience warnings emit correctly at runtime, but Bun's `process.on('warning')` listener support differs from Node.js, causing 5 unit test assertions to fail.
- **Timer precision** (both): One `MemoryStore` timing test in `lib/rate-limit` has microsecond-level sensitivity that can fail across all runtimes under load.

ergo's pipeline core (`compose`, `compose-with`, all `utils/iterables`, `utils/observables`) has zero `node:*` imports and is fully portable. The coupling to Node.js APIs concentrates in 6 boundary files: `handler.js`, `send.js`, `body.js`, `compress.js`, `logger.js`, and `timeout.js`.

CI runs the full test suite on Deno and Bun alongside Node.js. These jobs use `continue-on-error` and are informational rather than required checks.

## Development

```bash
npm install
npm test            # lint + format check + tests with coverage
npm run test:watch  # watch mode
npm run lint        # ESLint
npm run format      # Prettier
```

## License

[MIT](https://github.com/CentralPing/ergo/blob/main/LICENSE) &copy; 2019-present Jason Cust
