/**
 * @fileoverview Ergo Fast Fail REST API toolkit - main module export.
 *
 * Provides composable middleware for the four-stage Fast Fail request processing pipeline:
 * 1. Negotiation     - Parse/inspect request headers and URL (logger, cors, accepts, cookie, url)
 * 2. Authorization   - Authenticate user and verify request integrity (authorization, csrf)
 * 3. Validation      - Parse and validate request body (body, jsonApiQuery, validate)
 * 4. Execution       - Run the route handler and send the response (handler, send)
 *
 * Middleware is composed via the two-accumulator pattern using `compose`:
 *   compose([fn, setPath], ...)
 *
 * Each middleware factory returns `{value?, response?}`. Domain values are
 * accumulated under named keys in `domainAcc`; response properties merge
 * into `responseAcc`. `send()` is called post-pipeline by `handler()`.
 *
 * @module ergo
 * @version 0.1.0
 * @since 0.1.0
 * @requires ./handler.js
 * @requires ./accepts.js
 * @requires ./authorization.js
 * @requires ./body.js
 * @requires ./cache-control.js
 * @requires ./compress.js
 * @requires ./cookie.js
 * @requires ./cors.js
 * @requires ./csrf.js
 * @requires ./json-api-query.js
 * @requires ./logger.js
 * @requires ./prefer.js
 * @requires ./precondition.js
 * @requires ./rate-limit.js
 * @requires ./url.js
 * @requires ./security-headers.js
 * @requires ./send.js
 * @requires ./timeout.js
 * @requires ./validate.js
 * @requires ../utils/compose-with.js
 * @requires ../utils/http-errors.js
 * @requires ../lib/from-connect.js
 *
 * @example
 * import {compose, handler, logger, cors, authorization, accepts,
 *         cookie, url, body} from 'ergo';
 *
 * const pipeline = compose(
 *   // Stage 1: Negotiation
 *   [logger(), 'log'],
 *   [cors(), 'cors'],
 *   [accepts({types: ['application/json']}), 'accepts'],
 *   [cookie(), 'cookies'],
 *   [url(), 'url'],
 *   // Stage 2: Authorization
 *   [authorization({strategies: [...]}), 'auth'],
 *   // Stage 3: Validation
 *   [body(), 'body'],
 *   // Stage 4: Execution
 *   (req, res, acc) => ({response: {body: acc.body.parsed}}),
 * );
 *
 * export default handler(pipeline);
 */

import compose, {createResponseAcc, mergeResponse} from '../utils/compose-with.js';
import handler from './handler.js';
import accepts from './accepts.js';
import authorization from './authorization.js';
import body from './body.js';
import cacheControl from './cache-control.js';
import compress from './compress.js';
import cookie from './cookie.js';
import cors from './cors.js';
import csrf from './csrf.js';
import jsonApiQuery from './json-api-query.js';
import logger from './logger.js';
import url from './url.js';
import prefer from './prefer.js';
import precondition from './precondition.js';
import rateLimit from './rate-limit.js';
import securityHeaders from './security-headers.js';
import send from './send.js';
import timeout from './timeout.js';
import validate from './validate.js';
import httpErrors from '../utils/http-errors.js';
import fromConnect from '../lib/from-connect.js';

export {
  compose,
  createResponseAcc,
  mergeResponse,
  handler,
  accepts,
  authorization,
  body,
  cacheControl,
  compress,
  cookie,
  cors,
  csrf,
  fromConnect,
  httpErrors,
  jsonApiQuery,
  logger,
  prefer,
  precondition,
  rateLimit,
  securityHeaders,
  url,
  send,
  timeout,
  validate
};

// Default export mirrors the named exports above — keep both in sync.
/** @type {object} */
export default {
  compose,
  handler,
  accepts,
  authorization,
  body,
  cacheControl,
  compress,
  cookie,
  cors,
  csrf,
  fromConnect,
  httpErrors,
  jsonApiQuery,
  logger,
  prefer,
  precondition,
  rateLimit,
  securityHeaders,
  url,
  send,
  timeout,
  validate
};
