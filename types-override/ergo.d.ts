/**
 * Consumer-facing type interfaces for ergo middleware result types.
 *
 * These interfaces describe the success-path `value` that each middleware
 * stores on the domain accumulator via `[fn, setPath]` tuples. On the
 * error path, middleware returns `{response: {statusCode}}` with no
 * `value`, so the accumulator key is not assigned and the pipeline breaks
 * after merging the response. Only the success shape is typed here.
 */

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

/** Result stored at `acc.cookies` by `[cookie(), 'cookies']`. */
export interface CookieJar {
  [name: string]: string;
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
}

/** Result stored at `acc.accepts` by `[accepts(), 'accepts']`. */
export interface AcceptsResult {
  type: string | false;
  language: string | false;
  charset: string | false;
  encoding: string | false;
}

/** Result stored at `acc.prefer` by `[prefer(), 'prefer']`. */
export interface PreferResult {
  [preference: string]: { value?: string };
}

/** Result stored at `acc.rateLimit` by `[rateLimit(), 'rateLimit']`. */
export interface RateLimitResult {
  count: number;
  remaining: number;
  reset: number;
  limited: boolean;
  retryAfter?: number;
}

/**
 * Middleware tuple: `[fn, key]` where `fn` returns `Value` and
 * `key` is the string literal under which it is stored on the accumulator.
 */
export type MiddlewareTuple<Value, Key extends string> = readonly [
  (...args: any[]) => Value | Promise<Value> | { value?: Value; response?: any } | Promise<{ value?: Value; response?: any }>,
  Key,
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
