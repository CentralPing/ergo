import type { ResponseAccumulator } from '../ergo.js';

export { default as accepts } from './accepts.js';
export { default as authorization } from './authorization.js';
export { default as body } from './body.js';
export { default as cacheControl } from './cache-control.js';
export { default as compress } from './compress.js';
export { default as cookie } from './cookie.js';
export { default as cors } from './cors.js';
export { default as csrf } from './csrf.js';
export { default as handler } from './handler.js';
export { default as idempotency } from './idempotency.js';
export { default as jsonApiQuery } from './json-api-query.js';
export { default as logger } from './logger.js';
export { default as precondition } from './precondition.js';
export { default as prefer } from './prefer.js';
export { default as rateLimit } from './rate-limit.js';
export { default as securityHeaders } from './security-headers.js';
export { default as send } from './send.js';
export { default as timeout } from './timeout.js';
export { default as tracing } from './tracing.js';
export { default as url } from './url.js';
export { default as validate } from './validate.js';

export { default as compose, createResponseAcc, mergeResponse } from '../utils/compose-with.js';

export declare function httpErrors(statusCode: number, detail?: string, extra?: Record<string, unknown>): Error & {
  statusCode: number;
  status: number;
  type: string;
  title: string;
  detail?: string;
  instance?: string;
  toJSON(): Record<string, unknown>;
};

export declare function fromConnect(middleware: (req: any, res: any, next: (err?: any) => void) => void): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => Promise<undefined>;

export declare function paginate(options?: PaginateOptions): (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, domainAcc: Record<string, unknown>) => { value: PaginateResult };

export interface PaginateOptions {
  strategy?: 'offset' | 'cursor';
  defaultPage?: number;
  defaultPerPage?: number;
  maxPerPage?: number;
  defaultLimit?: number;
  maxLimit?: number;
}

export type PaginateResult =
  | { strategy: 'offset'; page: number; perPage: number; offset: number; limit: number }
  | { strategy: 'cursor'; cursor: string | undefined; limit: number };

declare const _default: {
  compose: typeof import('../utils/compose-with.js').default;
  handler: typeof import('./handler.js').default;
  accepts: typeof import('./accepts.js').default;
  authorization: typeof import('./authorization.js').default;
  body: typeof import('./body.js').default;
  cacheControl: typeof import('./cache-control.js').default;
  compress: typeof import('./compress.js').default;
  cookie: typeof import('./cookie.js').default;
  cors: typeof import('./cors.js').default;
  csrf: typeof import('./csrf.js').default;
  fromConnect: typeof fromConnect;
  httpErrors: typeof httpErrors;
  idempotency: typeof import('./idempotency.js').default;
  paginate: typeof paginate;
  jsonApiQuery: typeof import('./json-api-query.js').default;
  logger: typeof import('./logger.js').default;
  prefer: typeof import('./prefer.js').default;
  precondition: typeof import('./precondition.js').default;
  rateLimit: typeof import('./rate-limit.js').default;
  securityHeaders: typeof import('./security-headers.js').default;
  tracing: typeof import('./tracing.js').default;
  url: typeof import('./url.js').default;
  send: typeof import('./send.js').default;
  timeout: typeof import('./timeout.js').default;
  validate: typeof import('./validate.js').default;
  createResponseAcc: typeof import('../utils/compose-with.js').createResponseAcc;
  mergeResponse: typeof import('../utils/compose-with.js').mergeResponse;
};

export default _default;
