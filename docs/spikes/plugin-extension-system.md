# Spike: Plugin/Extension System for Modular Feature Composition

> **Issue:** [CentralPing/ergo#136](https://github.com/CentralPing/ergo/issues/136)
> **Date:** 2026-06-10
> **Status:** Spike complete — ready for implementation planning
> **Scope:** Design evaluation only. No source code changes.

## Problem Statement

ergo-router users have no way to bundle related middleware, configuration
defaults, and lifecycle hooks into a single reusable unit. Composition requires
manual coordination across three independent mechanisms:

| Mechanism | What It Covers | What It Lacks |
| --- | --- | --- |
| `router.use(...fns)` | Global middleware prepend | Config defaults, lifecycle hooks |
| Presets (`presets.jsonApi`, etc.) | `transport` + `defaults` bundles | Middleware, lifecycle hooks |
| `graceful({onStartup, onShutdown})` | Server lifecycle hooks | Router awareness, multi-hook support |

Third-party integrations (OTEL, Sentry, Datadog) and internal patterns
(auth + audit + error tracking) require teams to manually wire all three APIs for
each integration. This is error-prone, non-shareable, and has no standard
discovery mechanism.

## Root Cause

The three extension mechanisms evolved independently as orthogonal concerns with
no unifying composition layer. The absence of a single registration interface
that accepts all three concerns simultaneously forces consumers into ad-hoc
manual coordination.

---

## 1. Plugin Contract Shape Evaluation

### Option A: Declarative Object (Frozen Data)

```js
const sentryPlugin = Object.freeze({
  name: 'sentry',
  version: '1.0.0',
  defaults: {
    /* route config defaults spread into createRouter defaults */
  },
  transport: {
    /* transport config merged into router transport */
  },
  middleware: [
    /* {fn, setPath} tuples or bare functions, prepended like router.use() */
  ],
  onStartup: async ({log}) => { Sentry.init({...}); },
  onShutdown: async ({log, signal}) => { await Sentry.close(2000); },
  onResponse: (req, res, responseInfo, domainAcc) => {
    Sentry.addBreadcrumb({...});
  },
  onError: (err, req, domainAcc) => { Sentry.captureException(err); }
});
```

**Alignment with existing patterns:**

- Presets are frozen objects with `transport` + `defaults` — a plugin is a
  superset: frozen objects with `transport` + `defaults` + `middleware` +
  lifecycle hooks.
- `pipeline-builder.js` already resolves config via `resolve(routeValue,
  defaultValue)` — plugin defaults merge naturally into this resolution chain.
- `auto-wrap.js` already supports `onResponse` at both router and route levels —
  plugin hooks follow the same dual-level pattern.

**Pros:**

| Criterion | Assessment |
| --- | --- |
| Composability | Excellent. Spread semantics (`{...pluginA, ...pluginB}`) follow JS conventions. Consumers can inspect and override any property. |
| Inspectability | Excellent. `JSON.stringify(plugin)` shows the full configuration. No hidden state. |
| Type safety | Good. TypeScript interface describes the contract shape statically. No runtime API to type. |
| Testing ease | Excellent. Assert against the object shape directly. No mocking of registration callbacks. |
| Ecosystem familiarity | Moderate. Less common than Fastify's function approach, but aligns with ergo's declarative philosophy (presets, route config objects). |

**Cons:**

- Cannot perform dynamic setup that depends on router state (e.g., reading
  another plugin's registered middleware). Limited to static declarations.
- Deep freeze means consumers must use spread to override — same trade-off as
  presets, already documented and accepted.

### Option B: Registration Function (Imperative)

```js
function sentryPlugin(router, options) {
  router.use(sentryMiddleware(options));
  router.defaults({...});
  router.onStartup(async ({log}) => { Sentry.init(options); });
  router.onShutdown(async ({log}) => { await Sentry.close(2000); });
}
sentryPlugin.meta = {name: 'sentry', version: '1.0.0'};
```

**Alignment with existing patterns:**

- Does NOT align. ergo-router has no `router.defaults()` or
  `router.onStartup()` methods. These would need to be added, expanding the
  router API surface.
- `router.use()` exists but only handles middleware — the registration function
  would need additional router methods for each concern.
- Presets are data, not functions. Mixing imperative plugin registration with
  declarative presets creates two competing extension models.

**Pros:**

| Criterion | Assessment |
| --- | --- |
| Composability | Good. Functions can compose other functions. |
| Inspectability | Poor. Plugin state is hidden inside the function closure. Cannot serialize or diff. |
| Type safety | Moderate. Requires typing the router extension API (`router.defaults()`, `router.onStartup()`, etc.) — more API surface to maintain. |
| Testing ease | Moderate. Requires a router mock or spy to verify registration calls. |
| Ecosystem familiarity | High. Fastify, Express, and Hapi all use registration functions. |

**Cons:**

- Requires new router methods (`router.defaults()`, `router.onStartup()`,
  `router.onShutdown()`, `router.onResponse()`, `router.onError()`),
  expanding the API surface significantly.
- Side effects during registration make the setup order-dependent and harder to
  reason about.
- Cannot inspect the plugin's contributions after registration without
  router-level introspection APIs.
- Creates an imperative escape hatch that conflicts with ergo-router's
  declarative philosophy.

### Option C: Hybrid (Data Object + Optional Setup Function)

```js
const sentryPlugin = {
  name: 'sentry',
  defaults: {/* ... */},
  middleware: [/* ... */],
  onStartup: async ({log}) => { /* ... */ },
  setup(router, options) {
    // Optional: imperative access for advanced cases
  }
};
```

**Assessment:** Adds complexity without solving a problem that Option A doesn't
already handle. The `setup` function reintroduces the imperative escape hatch.
If a plugin genuinely needs router state, it can use `router.use()` in
combination with the plugin object — the plugin system doesn't need to
formalize every possible pattern.

### Evaluation Matrix

| Criterion | Option A (Object) | Option B (Function) | Option C (Hybrid) |
| --- | --- | --- | --- |
| Aligns with presets pattern | Yes | No | Partially |
| Aligns with route config pattern | Yes | No | Partially |
| Inspectable | Yes | No | Partially |
| Type-safe contract | Yes (interface) | Moderate (method types) | Moderate |
| Testable without router mock | Yes | No | Partially |
| Composable | Yes (spread) | Yes (call) | Yes |
| Requires new router API surface | No | Yes (5+ methods) | Minimal |
| Handles dynamic setup | No | Yes | Yes |

### Recommendation: Option A (Declarative Object)

Option A aligns with ergo-router's established patterns (presets are frozen
objects, route configs are declarative objects, pipeline-builder resolves
statically). It requires no new router methods, is fully inspectable, and
supports the same spread-override semantics already documented for presets.

Dynamic setup (Option B's strength) is a speculative need — none of the
concrete use cases from the issue (Sentry, OTEL, auth bundles) require runtime
router state access during registration.

---

## 2. Ordering Semantics

### Current Pipeline Architecture

`pipeline-builder.js` assembles middleware into four sequential stages:

```
Stage 1: Negotiation
  tracing → logger → rateLimit → accepts → precondition → cookie →
  url → paginate → jsonApiQuery → prefer → securityHeaders → cacheControl

Stage 2: Authorization
  csrf → authorization

Stage 3: Validation
  body → idempotency → validate → [use entries]

Stage 4: Execution
  timeout → compress → execute
```

`router.use()` middleware is prepended to the *entire* pipeline by `auto-wrap.js`
(line 82: `const steps = [...appMiddleware, ...pipeline]`).

### Candidate Injection Points

**Option 2A: Prepend-only (current `router.use()` behavior)**

Plugin middleware always runs before Stage 1. Simple, predictable, but
inflexible — a plugin cannot inject middleware between stages.

```
[plugin middleware] → Stage 1 → Stage 2 → Stage 3 → Stage 4
```

**Pros:** Zero pipeline-builder changes. Consumers already understand the
`router.use()` prepend model.

**Cons:** Cannot inject middleware between authorization and validation, or
between validation and execution. Limits plugin expressiveness.

**Option 2B: Stage-specific injection**

Plugin declares which stage(s) its middleware targets:

```js
{
  middleware: [
    {fn: tracingFn, setPath: 'trace', stage: 'negotiation'},
    {fn: auditFn, setPath: 'audit', stage: 'execution'}
  ]
}
```

**Pros:** Maximum flexibility. Plugins can participate in any pipeline stage.

**Cons:** Significant complexity. Requires pipeline-builder to accept
stage-tagged middleware from an external source. Stage names become part of
the public API surface. Over-engineered for current use cases.

**Option 2C: Dual-slot (prepend + `use` key)**

Plugin middleware has two injection points matching existing mechanisms:

- `middleware` array → prepended like `router.use()` (before Stage 1)
- Plugin-contributed `use` entries → inserted at the `use` slot (after Stage 3,
  before Stage 4)

```
[plugin middleware] → Stage 1 → Stage 2 → Stage 3 → [plugin use] → Stage 4
```

**Pros:** Aligns with existing `router.use()` and `use` config key patterns.
No new pipeline-builder concepts.

**Cons:** Only two slots (pre-pipeline and post-validation). May not cover
every conceivable use case, but covers the practical ones (OTEL tracing
at entry, audit logging before execution).

**Option 2D: Prepend with explicit ordering hints**

Plugin middleware always prepends, but plugins declare relative ordering:

```js
{
  name: 'sentry',
  after: ['otel'],  // run after the 'otel' plugin's middleware
  middleware: [sentryMiddleware]
}
```

**Pros:** Simple model with explicit ordering when needed.

**Cons:** Adds dependency-resolution complexity (topological sort). Over-
engineered for current scale.

### Use Case Analysis

| Use Case | Where Middleware Needs to Run | Best Fit |
| --- | --- | --- |
| OTEL tracing | Before everything (create root span) | Prepend (2A/2C) |
| Sentry error capture | After pipeline (observe errors) | `onError` hook, not middleware |
| Auth bundle (auth + audit + CSRF) | Stages 1-2 (negotiation + auth) | Defaults, not middleware |
| Request logging enrichment | Before Stage 1 | Prepend (2A/2C) |
| Response decoration | After Stage 3, before execution | `use` slot (2C) |

### Recommendation: Option 2C (Dual-Slot)

The practical use cases fall into two categories: "run before everything"
(tracing, logging enrichment) and "run after validation, before execution"
(audit, response decoration). These map exactly to the existing
`router.use()` prepend and `use` config key slots.

The dual-slot model requires no new pipeline-builder concepts — it extends
the existing `appMiddleware` and `use` mechanisms to accept plugin-contributed
entries alongside manual entries.

**Implementation note:** Plugin `middleware` entries are prepended after any
manually-registered `router.use()` middleware but before the pipeline stages.
Plugin `use` entries are prepended before any route-level `use` entries but
after defaults-level `use` entries. This gives plugins lower precedence than
explicit manual wiring, which is the correct default.

---

## 3. Conflict Resolution Strategy

### Scenario

Two plugins set conflicting defaults for the same key:

```js
const pluginA = {name: 'a', defaults: {accepts: {types: ['application/json']}}};
const pluginB = {name: 'b', defaults: {accepts: {types: ['text/html']}}};
```

### Current Behavior (Presets)

Presets use shallow spread: `{...presets.jsonApi, defaults: {...}}`. The
consumer has full control over resolution — later spreads overwrite earlier
ones. This is standard JS semantics with no framework magic.

### Candidate Strategies

**Option 3A: Last-registered wins (spread semantics)**

Plugins are registered in order. Later plugin defaults overwrite earlier ones.
The router-level `defaults` option always wins (highest precedence).

```
Resolution: route config > router defaults > last plugin > ... > first plugin
```

**Pros:** Matches presets' existing spread semantics. No new concepts.
Predictable — registration order determines precedence.

**Cons:** Silent override. If two plugins set conflicting `accepts.types`,
the last one wins with no warning.

**Option 3B: Conflict detection + `process.emitWarning`**

Detect when two plugins set the same defaults key and emit a warning:

```
ErgoWarning [ERGO_ROUTER_PLUGIN_CONFLICT]:
  Plugins 'a' and 'b' both set defaults.accepts.
  Plugin 'b' (registered later) takes precedence.
  To resolve, set defaults.accepts explicitly in createRouter().
```

**Pros:** Follows `validate-options.js` warning pattern. Non-breaking DX
affordance. Warning can be promoted to a hard error via `--throw-deprecation`.

**Cons:** Adds detection logic at registration time. Shallow comparison only —
deep structural conflict detection is impractical and unnecessary.

**Option 3C: Deep merge with array concatenation**

Instead of overwriting, merge defaults recursively:

```js
// pluginA.defaults.accepts.types = ['application/json']
// pluginB.defaults.accepts.types = ['text/html']
// merged: {accepts: {types: ['application/json', 'text/html']}}
```

**Pros:** No data loss from concurrent plugins.

**Cons:** Incorrect semantics. `accepts.types` is a whitelist — merging
produces "accept both", which may not be the consumer's intent. Deep merge is
semantically ambiguous for most config shapes (what does merging two
`timeout` objects mean?). Creates magic behavior that diverges from standard
JS spread semantics.

**Option 3D: Explicit priority/order parameter**

Each plugin declares a numeric priority:

```js
{name: 'a', priority: 10, defaults: {...}}
{name: 'b', priority: 20, defaults: {...}}
```

**Pros:** Explicit, deterministic ordering.

**Cons:** Priority numbers are a maintenance burden. Consumers must coordinate
priority values across plugins from different authors. Over-engineered for
the conflict frequency expected.

### Recommendation: Option 3B (Conflict Detection + Warning)

Option 3B combines the simplicity of last-registered-wins (Option 3A) with
the developer experience of conflict detection. The warning follows the
established `validate-options.js` and `ERGO_VALIDATE_UNKNOWN_KEY` patterns:

- `process.emitWarning` with `{type: 'ErgoWarning', code:
  'ERGO_ROUTER_PLUGIN_CONFLICT'}`
- Emitted once per unique conflict (deduplication via module-level Set)
- Non-breaking — the plugin still works, the consumer is informed

The resolution hierarchy is:

```
route config > router defaults > last plugin > ... > first plugin
```

Router-level `defaults` always takes precedence over all plugin defaults. This
matches the existing `resolve(routeValue, defaultValue)` pattern in
`pipeline-builder.js` — the consumer's explicit configuration always wins.

---

## 4. Lifecycle Hook Composition

### Current State

`graceful()` in `lib/lifecycle.js` accepts single `onStartup` and `onShutdown`
callbacks (lines 43-46). There is no multi-hook support — if two plugins
both need startup hooks, the consumer must manually compose them.

`auto-wrap.js` supports dual-level `onResponse` hooks (router-level and
per-route), each with independent `try/catch` error isolation (lines 110-120
in the ergo-router source, per DECISIONS.md).

### Design: Multi-Hook Accumulation

Plugins register hooks at registration time. The router accumulates them into
arrays. `graceful()` and `auto-wrap.js` iterate these arrays with independent
error isolation per hook.

**Registration-time accumulation:**

```js
// Inside createRouter() or router.register()
const pluginHooks = {
  onStartup: [],   // async ({log}) => void
  onShutdown: [],  // async ({log, signal}) => void
  onResponse: [],  // (req, res, responseInfo, domainAcc) => void
  onError: []      // (err, req, domainAcc) => void
};

for (const plugin of plugins) {
  if (plugin.onStartup) pluginHooks.onStartup.push(plugin.onStartup);
  if (plugin.onShutdown) pluginHooks.onShutdown.push(plugin.onShutdown);
  if (plugin.onResponse) pluginHooks.onResponse.push(plugin.onResponse);
  if (plugin.onError) pluginHooks.onError.push(plugin.onError);
}
```

**Invocation-time iteration with error isolation:**

```js
// In graceful() — startup hooks
for (const hook of pluginHooks.onStartup) {
  await hook({log});
  // No try/catch — startup failure should prevent server start
}

// In graceful() — shutdown hooks
for (const hook of pluginHooks.onShutdown) {
  try {
    await hook({log, signal});
  } catch (err) {
    log.error(`Plugin shutdown error: ${err?.message ?? err}`);
  }
}

// In auto-wrap — onResponse hooks (following existing dual-level pattern)
for (const hook of pluginHooks.onResponse) {
  try {
    await hook(req, res, responseInfo, domainAcc);
  } catch {
    // Silently swallowed — observation-only, cannot affect response
  }
}
```

### Hook Invocation Order

| Hook | Order | Error Isolation | Rationale |
| --- | --- | --- | --- |
| `onStartup` | Registration order | No isolation — first failure aborts startup | A broken plugin should prevent the server from starting. Matches current `graceful()` behavior where `onStartup` rejection prevents `server.listen()`. |
| `onShutdown` | Registration order (reversed) | Independent `try/catch` per hook | Matches current `graceful()` pattern (lines 83-88). Reversed order follows LIFO convention — last plugin to start is first to stop. |
| `onResponse` | Registration order, then router-level | Independent `try/catch` per hook | Follows existing dual-level pattern in `auto-wrap.js`. Plugin hooks fire before router-level `onResponse` — plugins observe first, then the application's own hook. |
| `onError` | Registration order | Independent `try/catch` per hook | Error observation is best-effort. One plugin's error handler failure must not prevent another from observing the error. |

### Sequence Diagram: 3-Plugin Scenario

```
Server Start:
  graceful() onStartup
    → pluginA.onStartup({log})     ✓
    → pluginB.onStartup({log})     ✓
    → pluginC.onStartup({log})     ✓
    → user onStartup({log})        ✓  (from graceful options)
  server.listen()

Request Processing:
  auto-wrap pipeline
    [pluginA.middleware, pluginB.middleware, pluginC.middleware]
    → Stage 1 (Negotiation)
    → Stage 2 (Authorization)
    → Stage 3 (Validation)
    → [pluginA.use, pluginB.use, pluginC.use]
    → Stage 4 (Execution)
  send()
  onResponse hooks:
    → pluginA.onResponse(...)     try/catch isolated
    → pluginB.onResponse(...)     try/catch isolated
    → pluginC.onResponse(...)     try/catch isolated
    → route-level onResponse      try/catch isolated (existing)
    → router-level onResponse     try/catch isolated (existing)

Server Shutdown (SIGTERM):
  graceful() onShutdown
    → pluginC.onShutdown({log, signal})  try/catch isolated (LIFO)
    → pluginB.onShutdown({log, signal})  try/catch isolated
    → pluginA.onShutdown({log, signal})  try/catch isolated
    → user onShutdown({log, signal})     try/catch isolated (from graceful options)
  server.close()
```

### Graceful Integration Strategy

`graceful()` is currently decoupled from the router — it accepts any
`(req, res) => void` handler. This decoupling is intentional (see
ergo-router DECISIONS.md: "Works with any `http.Server` handler, not just
ergo-router. Preserves composability.").

**Recommended approach:** The router exposes accumulated plugin hooks via a
method or property. `graceful()` remains unchanged. The consumer threads the
hooks through:

```js
const router = createRouter({
  plugins: [sentryPlugin, otelPlugin],
  // ...
});

const {server} = await graceful(router.handle(), {
  port: 3000,
  onStartup: async ({log}) => {
    // Plugin hooks fire first (in registration order)
    await router.runStartupHooks({log});
    // Then the consumer's own startup logic
    await connectToDatabase();
  },
  onShutdown: async ({log, signal}) => {
    // Consumer's own shutdown logic first
    await disconnectDatabase();
    // Plugin hooks fire last (in reverse registration order)
    await router.runShutdownHooks({log, signal});
  }
});
```

**Alternative considered:** Making `graceful()` plugin-aware (accepting a
`plugins` option). Rejected because it couples the lifecycle utility to the
plugin system, violating the standalone design principle. The consumer
explicitly composes startup/shutdown behavior — this is more transparent than
hidden hook injection.

---

## 5. Consolidated Recommendation

### Chosen Design

| Dimension | Choice | Rationale |
| --- | --- | --- |
| Contract shape | Declarative frozen object (Option A) | Aligns with presets and route config patterns; inspectable, type-safe, testable |
| Ordering | Dual-slot: prepend + `use` key (Option 2C) | Maps to existing `router.use()` and `use` config key mechanisms |
| Conflict resolution | Detection + warning (Option 3B) | Follows `validate-options.js` pattern; non-breaking DX affordance |
| Lifecycle hooks | Registration-time accumulation with per-hook error isolation | Follows `onResponse` dual-level pattern; `graceful()` stays decoupled |

### Plugin Interface (TypeScript)

```ts
interface ErgoPlugin {
  /** Unique plugin identifier. Used for conflict warnings and deduplication. */
  name: string;

  /** Optional semver version for dependency tracking and debugging. */
  version?: string;

  /**
   * Route-level defaults merged into createRouter's `defaults` option.
   * Resolution: route config > router defaults > last plugin > first plugin.
   * Conflicts emit ERGO_ROUTER_PLUGIN_CONFLICT warnings.
   */
  defaults?: Record<string, unknown>;

  /**
   * Transport config merged into createRouter's `transport` option.
   * Same resolution and conflict semantics as `defaults`.
   */
  transport?: Record<string, unknown>;

  /**
   * Middleware prepended to every route pipeline, after router.use()
   * middleware but before Stage 1. Accepts {fn, setPath} tuples or
   * bare functions, same format as pipeline-builder entries.
   */
  middleware?: Array<Function | {fn: Function; setPath: string}>;

  /**
   * Middleware inserted at the `use` slot (after Stage 3, before Stage 4).
   * Concatenated with defaults-level and route-level `use` entries.
   */
  use?: Array<Function | {fn: Function; setPath: string}>;

  /**
   * Called before server.listen(). Failure aborts startup.
   * Invoked in registration order.
   */
  onStartup?: (ctx: {log: Logger}) => void | Promise<void>;

  /**
   * Called during graceful shutdown, after server.close().
   * Invoked in reverse registration order (LIFO).
   * Errors are caught and logged — shutdown continues.
   */
  onShutdown?: (ctx: {log: Logger; signal: string}) => void | Promise<void>;

  /**
   * Called after send() completes on every request.
   * Observation-only — cannot affect the response.
   * Invoked in registration order, before route/router-level onResponse.
   */
  onResponse?: (
    req: IncomingMessage,
    res: ServerResponse,
    responseInfo: ResponseInfo,
    domainAcc: object
  ) => void | Promise<void>;

  /**
   * Called when the pipeline catches an unexpected error.
   * Observation-only — cannot affect error handling.
   * Invoked in registration order.
   */
  onError?: (err: Error, req: IncomingMessage, domainAcc: object) => void;
}
```

### Registration API

```js
import createRouter, {graceful} from '@centralping/ergo-router';

const router = createRouter({
  plugins: [otelPlugin, sentryPlugin],
  defaults: {accepts: {types: ['application/json']}},
  transport: {requestId: {}, security: {}}
});

// Plugin middleware is prepended after router.use() entries
// Plugin defaults are merged with conflict detection
// Plugin lifecycle hooks are accumulated for consumer access
```

### Relationship to Presets

Presets and plugins are complementary, not competing:

| Concern | Preset | Plugin |
| --- | --- | --- |
| **What it bundles** | `transport` + `defaults` (config only) | `transport` + `defaults` + `middleware` + lifecycle hooks |
| **How it's applied** | Spread by consumer: `{...presets.jsonApi}` | Registered via `plugins` array in `createRouter()` |
| **When it runs** | Factory time only (static config) | Factory time (config) + request time (middleware/hooks) |
| **Use case** | "I want JSON API defaults" | "I want Sentry integration with error capture and lifecycle" |
| **Composability** | Spread override: `{...preset, defaults: {...}}` | Array ordering: `plugins: [a, b]` |

A plugin can internally use a preset as its config foundation. Presets remain
the right choice for config-only bundles that don't need middleware or hooks.

### Migration Path

No breaking changes to existing APIs:

1. `router.use()` continues to work — plugin `middleware` entries are prepended
   *after* `router.use()` entries
2. Presets continue to work — they are spread into `createRouter()` alongside
   `plugins`
3. `graceful()` remains unchanged — consumers explicitly call plugin
   startup/shutdown hooks

### Implementation Scope Estimate

| Component | Files | Complexity | Breaking? |
| --- | --- | --- | --- |
| Plugin contract validation (`lib/validate-plugin.js`) | 1 new + tests | Low | No |
| Router integration (`lib/router.js`) | 1 modified | Medium | No |
| Pipeline middleware injection (`lib/auto-wrap.js`) | 1 modified | Medium | No |
| Lifecycle hook accumulation (new export) | 1 new + tests | Low | No |
| Conflict detection (`lib/plugin-defaults.js`) | 1 new + tests | Low | No |
| `onResponse`/`onError` hook arrays in auto-wrap | 1 modified | Medium | No |
| Type declarations (`types-override/`) | 2-3 modified | Low | No |
| Functional tests | 1 new | Medium | No |
| DECISIONS.md + CHANGELOG.md | 2 modified | Low | No |
| **Total** | ~10 files | Medium overall | No breaking changes |

### Follow-Up Issues to Create

1. **Implement plugin registration in `createRouter()`** — accept `plugins`
   array option, validate contracts, accumulate hooks, merge defaults with
   conflict detection
2. **Implement plugin middleware injection in `auto-wrap.js`** — prepend plugin
   middleware after `appMiddleware`, inject plugin `use` entries at the `use`
   slot
3. **Implement lifecycle hook exposure** — `router.runStartupHooks()` and
   `router.runShutdownHooks()` methods for `graceful()` integration
4. **Implement `onResponse`/`onError` plugin hooks in `auto-wrap.js`** — extend
   the existing dual-level hook pattern
5. **Document plugin system** — DECISIONS.md section, CHANGELOG entry, website
   guide page

---

## Appendix: Prior Art Comparison

| Framework | Contract | Registration | Ordering | Encapsulation |
| --- | --- | --- | --- | --- |
| **Fastify** | `function(instance, opts, done)` | `register(fn, opts)` | DAG with `after`/`ready` | Encapsulated context tree |
| **Hapi** | `{name, version, register}` | `server.register(plugin)` | Registration order | Shared server state |
| **Express** | `function(req, res, next)` | `app.use(fn)` | Registration order | None (middleware stack) |
| **ergo (proposed)** | `{name, defaults, middleware, hooks}` | `createRouter({plugins: [...]})` | Registration order + dual-slot | None (flat, inspectable) |

ergo's proposed design is closest to Hapi's declarative contract but simpler —
no `register` function, no server state mutation, no encapsulated context. The
flat data object approach is unique among the compared frameworks and aligns
with ergo's philosophy of inspectable, composable building blocks.
