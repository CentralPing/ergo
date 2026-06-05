/**
 * Consumer-facing type interfaces for ergo middleware.
 *
 * Exports three categories of named interfaces:
 *
 * 1. **Options interfaces** — typed parameters for each middleware factory
 *    function (e.g., `AcceptsOptions`, `BodyOptions`). These replace the
 *    generic `object` that tsc emits from JSDoc `@param {object}`.
 *
 * 2. **Result interfaces** — typed success-path `value` shapes stored on the
 *    domain accumulator via `[fn, setPath]` tuples. On the error path,
 *    middleware returns `{response: {statusCode}}` with no `value`, so the
 *    accumulator key is not assigned and the pipeline breaks.
 *
 * 3. **Utility types** — `MiddlewareTuple`, `ResponseAccumulator`,
 *    `AjvFormatName`, `AuthorizationStrategy`.
 */

// ---------------------------------------------------------------------------
// AJV format name union (tracks ajv-formats 3.x)
// ---------------------------------------------------------------------------

/** String literal union of format keywords supported by ajv-formats 3.x. */
export type AjvFormatName =
  | 'date'
  | 'time'
  | 'date-time'
  | 'iso-time'
  | 'iso-date-time'
  | 'duration'
  | 'uri'
  | 'uri-reference'
  | 'uri-template'
  | 'url'
  | 'email'
  | 'hostname'
  | 'ipv4'
  | 'ipv6'
  | 'regex'
  | 'uuid'
  | 'json-pointer'
  | 'json-pointer-uri-fragment'
  | 'relative-json-pointer'
  | 'byte'
  | 'int32'
  | 'int64'
  | 'float'
  | 'double'
  | 'password'
  | 'binary';

// ---------------------------------------------------------------------------
// Authorization strategy
// ---------------------------------------------------------------------------

/** A single authentication strategy definition for the authorization middleware. */
export interface AuthorizationStrategy {
  type: string;
  attributes?: Record<string, string>;
  authorizer: (...args: any[]) => unknown;
}

// ---------------------------------------------------------------------------
// Options interfaces
// ---------------------------------------------------------------------------

/** Options for `accepts()` — content negotiation middleware. */
export interface AcceptsOptions {
  throwIfFail?: boolean;
  types?: string[];
  languages?: string[];
  charsets?: string[];
  encodings?: string[];
}

/** Options for `authorization()` — authentication middleware. */
export interface AuthorizationOptions {
  strategies?: AuthorizationStrategy[];
}

/** Options for `body()` — request body parsing middleware. */
export interface BodyOptions {
  limit?: number;
  decompressedLimit?: number;
  types?: string[];
  charset?: string;
}

/** Options for `cacheControl()` — Cache-Control header middleware. */
export interface CacheControlOptions {
  directives?: string;
  public?: boolean;
  private?: boolean;
  noCache?: boolean;
  noStore?: boolean;
  noTransform?: boolean;
  mustRevalidate?: boolean;
  proxyRevalidate?: boolean;
  immutable?: boolean;
  maxAge?: number;
  sMaxAge?: number;
  staleWhileRevalidate?: number;
  staleIfError?: number;
}

/** Options for `compress()` — response compression middleware. */
export interface CompressOptions {
  threshold?: number;
  encodings?: string[];
}

/** Options for `cookie()` — cookie parsing middleware. */
export interface CookieOptions {
  decoder?: (value: string) => string;
  loose?: boolean;
  collection?: boolean;
  max?: number;
}

/** Options for `cors()` — CORS header injection middleware. */
export interface CorsOptions {
  origins?: string | string[] | RegExp | ((origin: string) => boolean);
  allowMethods?: string[];
  allowHeaders?: string | string[] | RegExp | ((header: string) => boolean);
  exposeHeaders?: string | string[];
  allowCredentials?: boolean;
  maxAge?: number;
}

/** Options for `csrf()` — CSRF token issue/verify middleware. */
export interface CsrfOptions {
  cookieTokenName?: string;
  headerTokenName?: string;
  cookieUuidName?: string;
  secret: string;
  encoding?: string;
  cookieOptions?: Record<string, unknown>;
}

/** Options for `handler()` — pipeline executor. */
export interface HandlerOptions {
  debug?: boolean;
  redactErrors?: boolean;
  prettify?: boolean;
  vary?: string[];
  etag?: boolean;
  prefer?: boolean;
  envelope?:
    | boolean
    | ((
        body: unknown,
        ctx: {requestId: string | undefined; statusCode: number; method: string}
      ) => unknown);
  errorFormatter?: (
    problemDetails: Record<string, unknown>,
    ctx: {requestId: string | undefined; statusCode: number; method: string}
  ) => unknown;
}

/** Options for `idempotency()` — idempotency-key middleware. */
export interface IdempotencyOptions {
  store?: {
    get(key: string): unknown;
    set(key: string, fingerprint: string): void;
    complete(key: string, response: unknown): void;
    delete(key: string): void;
  };
  ttlMs?: number;
  required?: boolean;
  methods?: Set<string> | string[];
}

/** Options for `paginate()` — pagination parameter parsing middleware. */
export interface PaginateOptions {
  strategy?: 'offset' | 'cursor';
  defaultPage?: number;
  defaultPerPage?: number;
  maxPerPage?: number;
  defaultLimit?: number;
  maxLimit?: number;
}

/** Result stored at `acc.paginate` by the pagination middleware. */
export type PaginateResult =
  | { strategy: 'offset'; page: number; perPage: number; offset: number; limit: number }
  | { strategy: 'cursor'; cursor: string | undefined; limit: number };

/** Options for `logger()` — structured request logging middleware. */
export interface LoggerOptions {
  log?: (...args: any[]) => void;
  error?: (...args: any[]) => void;
  uuid?: () => string;
  headerRequestIdName?: string;
  headerRequestIpName?: string;
  redactHeaders?: Set<string>;
}

/** Options for `precondition()` — conditional request enforcement. */
export interface PreconditionOptions {
  methods?: string[] | Set<string>;
}

/** Options for `rateLimit()` — rate limiting middleware. */
export interface RateLimitOptions {
  max?: number;
  windowMs?: number;
  store?: {hit(key: string, windowMs: number): {count: number; resetMs: number}};
  keyGenerator?: (req: import('node:http').IncomingMessage) => string;
}

/** Options for `securityHeaders()` — security response headers middleware. */
export interface SecurityHeadersOptions {
  contentSecurityPolicy?: string | false;
  strictTransportSecurity?:
    | string
    | false
    | {
        maxAge: number;
        includeSubDomains?: boolean;
        preload?: boolean;
      };
  xContentTypeOptions?: string | false;
  xFrameOptions?: string | false;
  referrerPolicy?: string | false;
  xXssProtection?: string | false;
  permissionsPolicy?: string | false;
}

/** Options for `send()` — response serialization middleware. */
export interface SendOptions {
  prettify?: boolean;
  vary?: string[];
  etag?: boolean;
  prefer?: boolean;
  envelope?:
    | boolean
    | ((
        body: unknown,
        ctx: {requestId: string | undefined; statusCode: number; method: string}
      ) => unknown);
  errorFormatter?: (
    problemDetails: Record<string, unknown>,
    ctx: {requestId: string | undefined; statusCode: number; method: string}
  ) => unknown;
}

/** Options for `timeout()` — request timeout middleware. */
export interface TimeoutOptions {
  ms?: number;
  statusCode?: number;
}

/** Options for `tracing()` — OpenTelemetry pipeline tracing middleware. */
export interface TracingOptions {
  serviceName?: string;
  version?: string;
  tracer?: import('@opentelemetry/api').Tracer;
  attributes?: Record<string, string | number | boolean>;
  perStage?: boolean;
}

/** Options for `validate()` — AJV JSON Schema validation middleware. */
export interface ValidateOptions {
  formats?: boolean | AjvFormatName[] | Record<string, unknown>;
  [key: string]: unknown;
}

/** JSON Schema objects for `validate()` first parameter. */
export interface ValidateSchemas {
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Result interfaces
// ---------------------------------------------------------------------------

/** Result stored at `acc.url` by `[url(), 'url']`. */
export interface UrlResult {
  query: Record<string, string | string[]>;
  pathname: string | undefined;
  search: string | undefined;
}

/** Result stored at `acc.body` by `[body(), 'body']`. */
export interface BodyResult {
  type: string;
  charset: string;
  encoding: string;
  length: number | undefined;
  received: number;
  boundary: string | undefined;
  raw: string;
  parsed?: unknown;
}

/**
 * Result stored at `acc.cookies` by `[cookie(), 'cookies']`.
 *
 * Incoming cookies are available as own properties. Outgoing cookies are
 * managed via `set()`, `get()`, `clear()`, and serialized by `toHeader()`.
 */
export interface CookieJar {
  set(name: string, value: string, options?: Record<string, unknown>): void;
  get(name: string): unknown;
  clear(name: string): void;
  toHeader(): string[];
  readonly size: number;
  readonly isJar: true;
  [name: string]: unknown;
}

/** Result stored at `acc.log` by `[logger(), 'log']`. */
export interface LogEntry {
  requestId: string;
  timestamp: number;
  ip: string;
  method: string;
  url: string;
  httpVersion: string;
  host: Readonly<{
    hostname: string;
    arch: string;
    platform: string;
    pid: number;
  }>;
  request: {
    headers: Record<string, string | string[] | undefined>;
    encrypted: boolean;
    remoteAddress: string;
    remotePort: number;
  };
  traceId?: string;
  spanId?: string;
}

/** Result stored at `acc.accepts` by `[accepts(), 'accepts']`. */
export interface AcceptsResult {
  type: string | false;
  language: string | false;
  charset: string | false;
  encoding: string | false;
}

/**
 * Result stored at `acc.prefer` by `[prefer(), 'prefer']`.
 *
 * Flat map of preference name to value string or `true` for bare tokens.
 * Example: `{ return: 'minimal', 'respond-async': true }`.
 */
export interface PreferResult {
  [preference: string]: string | true;
}

/**
 * Result stored at `acc.auth` by `[authorization(), 'auth']`.
 *
 * The shape is opaque — determined by the user-provided authorizer function.
 */
export type AuthorizationResult = Record<string, unknown>;

/**
 * Result stored at `acc.trace` by `[tracing(), 'trace']`.
 *
 * `tracer` and `activeContext` are only populated when `perStage: true`.
 */
export interface TracingResult {
  span: import('@opentelemetry/api').Span;
  tracer?: import('@opentelemetry/api').Tracer;
  activeContext?: import('@opentelemetry/api').Context;
  parentContext: import('@opentelemetry/api').Context;
  traceId: string;
  spanId: string;
}

/** Result stored at `acc.idempotency` by `[idempotency(), 'idempotency']`. */
export type IdempotencyResult =
  | Record<string, never>
  | {key: string; fingerprint: string; complete: (response: unknown) => void; discard: () => void}
  | {replayed: true};

// ---------------------------------------------------------------------------
// Utility types
// ---------------------------------------------------------------------------

/**
 * Middleware tuple: `[fn, key]` where `fn` returns `Value` and
 * `key` is the string literal under which it is stored on the accumulator.
 */
export type MiddlewareTuple<Value, Key extends string> = readonly [
  (
    ...args: any[]
  ) =>
    | Value
    | Promise<Value>
    | {value?: Value; response?: any}
    | Promise<{value?: Value; response?: any}>,
  Key
];

/** The response accumulator shape. */
export interface ResponseAccumulator {
  statusCode?: number;
  headers?: [string, string][];
  body?: unknown;
  detail?: string;
  retryAfter?: number;
  instance?: string;
  location?: string;
  lastModified?: Date;
  type?: string;
  [key: string]: unknown;
}
