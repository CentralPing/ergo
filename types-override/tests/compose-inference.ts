/**
 * Type-only validation for compose() accumulator inference.
 *
 * This file is compiled by tsconfig.check-types.json (noEmit: true) and
 * never executed at runtime. It validates that the overloaded composeWith
 * signatures correctly infer accumulator key types from {fn, setPath} ops.
 */

import type {
  UrlResult, BodyResult, LogEntry, CookieJar, AcceptsResult, PreferResult,
  TracingResult, IdempotencyResult, AuthorizationResult,
  AcceptsOptions, BodyOptions, TracingOptions, CookieOptions,
} from '../ergo.js';
import compose, { createResponseAcc, mergeResponse } from '../utils/compose-with.js';

// ---------------------------------------------------------------------------
// Stub factories — simulate the shape of real middleware for type testing.
// These return types match what tsc infers from the actual JS source.
// ---------------------------------------------------------------------------

declare function urlFactory(): () => UrlResult;
declare function bodyFactory(): () => Promise<BodyResult>;
declare function loggerFactory(): () => LogEntry;
declare function cookieFactory(): () => CookieJar;
declare function acceptsFactory(): () => AcceptsResult;
declare function preferFactory(): () => PreferResult;
declare function tracingFactory(): () => { value: TracingResult };

// ---------------------------------------------------------------------------
// Positive: compose with typed ops infers accumulator keys
// ---------------------------------------------------------------------------

const twoOp = compose(
  { fn: urlFactory(), setPath: 'url' } as const,
  { fn: bodyFactory(), setPath: 'body' } as const,
);

async function testTwoOp() {
  const acc = await twoOp();

  const u: UrlResult = acc.url;
  const b: BodyResult = acc.body;

  void u;
  void b;
}

const fiveOp = compose(
  { fn: loggerFactory(), setPath: 'log' } as const,
  { fn: acceptsFactory(), setPath: 'accepts' } as const,
  { fn: cookieFactory(), setPath: 'cookies' } as const,
  { fn: urlFactory(), setPath: 'url' } as const,
  { fn: bodyFactory(), setPath: 'body' } as const,
);

async function testFiveOp() {
  const acc = await fiveOp();

  const l: LogEntry = acc.log;
  const a: AcceptsResult = acc.accepts;
  const c: CookieJar = acc.cookies;
  const u: UrlResult = acc.url;
  const b: BodyResult = acc.body;

  void l;
  void a;
  void c;
  void u;
  void b;
}

// ---------------------------------------------------------------------------
// Positive: ops + trailing plain function (execute handler pattern)
// ---------------------------------------------------------------------------

const withHandler = compose(
  { fn: urlFactory(), setPath: 'url' } as const,
  { fn: bodyFactory(), setPath: 'body' } as const,
  (_req: any, _res: any, acc: { url: UrlResult; body: BodyResult }) => ({
    response: { body: acc.body.parsed, statusCode: 200 },
  }),
);

async function testWithHandler() {
  const acc = await withHandler();
  const u: UrlResult = acc.url;
  void u;
}

// ---------------------------------------------------------------------------
// Positive: compose.all infers the same way
// ---------------------------------------------------------------------------

const concurrent = compose.all(
  { fn: urlFactory(), setPath: 'url' } as const,
  { fn: cookieFactory(), setPath: 'cookies' } as const,
);

async function testConcurrent() {
  const acc = await concurrent();
  const u: UrlResult = acc.url;
  const c: CookieJar = acc.cookies;
  void u;
  void c;
}

// ---------------------------------------------------------------------------
// Positive: compose.all with 7 ops exercises the overload ceiling
// ---------------------------------------------------------------------------

const concurrentSeven = compose.all(
  { fn: loggerFactory(), setPath: 'log' } as const,
  { fn: acceptsFactory(), setPath: 'accepts' } as const,
  { fn: cookieFactory(), setPath: 'cookies' } as const,
  { fn: urlFactory(), setPath: 'url' } as const,
  { fn: bodyFactory(), setPath: 'body' } as const,
  { fn: preferFactory(), setPath: 'prefer' } as const,
  { fn: tracingFactory(), setPath: 'trace' } as const,
);

async function testConcurrentSeven() {
  const acc = await concurrentSeven();

  const l: LogEntry = acc.log;
  const a: AcceptsResult = acc.accepts;
  const c: CookieJar = acc.cookies;
  const u: UrlResult = acc.url;
  const b: BodyResult = acc.body;
  const p: PreferResult = acc.prefer;
  const t: TracingResult = acc.trace;

  void l;
  void a;
  void c;
  void u;
  void b;
  void p;
  void t;
}

// ---------------------------------------------------------------------------
// Positive: ExtractValue unwraps {value, response} envelopes
// ---------------------------------------------------------------------------

declare function envelopeMiddleware(): () => { value: string; response: { statusCode: number } };

const envelopePipeline = compose(
  { fn: envelopeMiddleware(), setPath: 'data' } as const,
);

async function testEnvelopeUnwrap() {
  const acc = await envelopePipeline();
  const d: string = acc.data;
  void d;
}

// ---------------------------------------------------------------------------
// Positive: createResponseAcc and mergeResponse still work
// ---------------------------------------------------------------------------

function testResponseAcc() {
  const responseAcc = createResponseAcc();
  mergeResponse(responseAcc, { statusCode: 200 });
}

// ---------------------------------------------------------------------------
// Negative: accessing a key not in the pipeline is a type error
// ---------------------------------------------------------------------------

async function testNegative() {
  const acc = await twoOp();

  // @ts-expect-error — 'cookies' is not a key of {url: UrlResult} & {body: BodyResult}
  const _bad = acc.cookies;
}

// ---------------------------------------------------------------------------
// Positive: fallback (>12 ops or plain functions only) returns object
// ---------------------------------------------------------------------------

const fallback = compose(
  (_req: any) => ({ ok: true }),
);

async function testFallback() {
  const acc = await fallback();
  void acc;
}

// ---------------------------------------------------------------------------
// Positive: options interfaces are assignable from correct option shapes
// ---------------------------------------------------------------------------

function testOptionsInterfaces() {
  const ao: AcceptsOptions = { throwIfFail: true, types: ['application/json'] };
  const bo: BodyOptions = { limit: 1024, charset: 'utf-8' };
  const to: TracingOptions = { perStage: true, serviceName: 'my-app' };
  const co: CookieOptions = { max: 100, loose: false };
  void ao;
  void bo;
  void to;
  void co;
}

// ---------------------------------------------------------------------------
// Positive: result interfaces reflect actual runtime shapes
// ---------------------------------------------------------------------------

function testResultShapes() {
  const prefer: PreferResult = { return: 'minimal', 'respond-async': true };
  const auth: AuthorizationResult = { user: { id: 1 } };
  const idempNew: IdempotencyResult = { key: 'k', fingerprint: 'f', complete: () => true, discard: () => {} };
  const idempReplay: IdempotencyResult = { replayed: true };
  const idempSkip: IdempotencyResult = {};
  void prefer;
  void auth;
  void idempNew;
  void idempReplay;
  void idempSkip;
}

// Suppress unused-variable warnings
void testTwoOp;
void testFiveOp;
void testWithHandler;
void testConcurrent;
void testConcurrentSeven;
void testEnvelopeUnwrap;
void testResponseAcc;
void testNegative;
void testFallback;
void testOptionsInterfaces;
void testResultShapes;
