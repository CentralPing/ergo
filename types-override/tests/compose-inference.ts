/**
 * Type-only validation for compose() accumulator inference.
 *
 * This file is compiled by tsconfig.check-types.json (noEmit: true) and
 * never executed at runtime. It validates that the overloaded composeWith
 * signatures correctly infer accumulator key types from [fn, key] tuples.
 */

import type { UrlResult, BodyResult, LogEntry, CookieJar, AcceptsResult, PreferResult, RateLimitResult } from '../ergo.js';
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
declare function rateLimitFactory(): () => RateLimitResult;

// ---------------------------------------------------------------------------
// Positive: compose with typed tuples infers accumulator keys
// ---------------------------------------------------------------------------

const twoTuple = compose(
  [urlFactory(), 'url'] as const,
  [bodyFactory(), 'body'] as const,
);

async function testTwoTuple() {
  const acc = await twoTuple();

  const u: UrlResult = acc.url;
  const b: BodyResult = acc.body;

  void u;
  void b;
}

const fiveTuple = compose(
  [loggerFactory(), 'log'] as const,
  [acceptsFactory(), 'accepts'] as const,
  [cookieFactory(), 'cookies'] as const,
  [urlFactory(), 'url'] as const,
  [bodyFactory(), 'body'] as const,
);

async function testFiveTuple() {
  const acc = await fiveTuple();

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
// Positive: tuples + trailing plain function (execute handler pattern)
// ---------------------------------------------------------------------------

const withHandler = compose(
  [urlFactory(), 'url'] as const,
  [bodyFactory(), 'body'] as const,
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
  [urlFactory(), 'url'] as const,
  [cookieFactory(), 'cookies'] as const,
);

async function testConcurrent() {
  const acc = await concurrent();
  const u: UrlResult = acc.url;
  const c: CookieJar = acc.cookies;
  void u;
  void c;
}

// ---------------------------------------------------------------------------
// Positive: compose.all with 7 tuples exercises the overload ceiling
// ---------------------------------------------------------------------------

const concurrentSeven = compose.all(
  [loggerFactory(), 'log'] as const,
  [acceptsFactory(), 'accepts'] as const,
  [cookieFactory(), 'cookies'] as const,
  [urlFactory(), 'url'] as const,
  [bodyFactory(), 'body'] as const,
  [preferFactory(), 'prefer'] as const,
  [rateLimitFactory(), 'rateLimit'] as const,
);

async function testConcurrentSeven() {
  const acc = await concurrentSeven();

  const l: LogEntry = acc.log;
  const a: AcceptsResult = acc.accepts;
  const c: CookieJar = acc.cookies;
  const u: UrlResult = acc.url;
  const b: BodyResult = acc.body;
  const p: PreferResult = acc.prefer;
  const r: RateLimitResult = acc.rateLimit;

  void l;
  void a;
  void c;
  void u;
  void b;
  void p;
  void r;
}

// ---------------------------------------------------------------------------
// Positive: ExtractValue unwraps {value, response} envelopes
// ---------------------------------------------------------------------------

declare function envelopeMiddleware(): () => { value: string; response: { statusCode: number } };

const envelopePipeline = compose(
  [envelopeMiddleware(), 'data'] as const,
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
  const acc = await twoTuple();

  // @ts-expect-error — 'cookies' is not a key of {url: UrlResult} & {body: BodyResult}
  const _bad = acc.cookies;
}

// ---------------------------------------------------------------------------
// Positive: fallback (>12 tuples or plain functions only) returns object
// ---------------------------------------------------------------------------

const fallback = compose(
  (_req: any) => ({ ok: true }),
);

async function testFallback() {
  const acc = await fallback();
  void acc;
}

// Suppress unused-variable warnings
void testTwoTuple;
void testFiveTuple;
void testWithHandler;
void testConcurrent;
void testConcurrentSeven;
void testEnvelopeUnwrap;
void testResponseAcc;
void testNegative;
void testFallback;
