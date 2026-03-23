/**
 * Benchmark server: Koa 3
 *
 * Routes:
 *   GET  /ping                   scenario 1: baseline
 *   GET  /users/:id              scenario 2: parameterized + query parse
 *   GET  /auth/users/:id         scenario 3: Bearer auth
 *   POST /users                  scenario 4: JSON body parse
 *   POST /auth/users             scenario 5: auth + body + schema validation
 *   POST /stack/auth/users       scenario 7: production stack
 *   GET  /cached/users/:id       scenario 8: conditional GET (ETag / 304)
 *   POST /rate-limited/users     scenario 9: rate-limited flood
 *
 * Body parser scoped to POST routes only (GET routes should not pay parsing overhead).
 * AJV validation on scenarios 5 and 7 for parity with ergo's JSON Schema validation.
 */

import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import koaCors from '@koa/cors';
import koaCompress from 'koa-compress';
import Ajv from 'ajv';
import generateETag from 'etag';

const PORT = Number(process.env.PORT) || 3000;
const BEARER_TOKEN = 'YmVuY2gtc2VjcmV0LXRva2Vu';

const ajv = new Ajv();
const validateUser = ajv.compile({
  type: 'object',
  properties: {
    name: {type: 'string', minLength: 1},
    email: {type: 'string', minLength: 1}
  },
  required: ['name', 'email'],
  additionalProperties: true
});

const app = new Koa();
const router = new Router();

const jsonParser = bodyParser({enableTypes: ['json']});

function extractBearer(authHeader) {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

// Scenario 1
router.get('/ping', ctx => {
  ctx.body = {ok: true};
});

// Scenario 2
router.get('/users/:id', ctx => {
  ctx.body = {id: ctx.params.id, query: ctx.query};
});

// Scenario 3
router.get('/auth/users/:id', ctx => {
  const token = extractBearer(ctx.headers['authorization']);
  if (token !== BEARER_TOKEN) {
    ctx.status = 401;
    ctx.body = {error: 'Unauthorized'};
    return;
  }
  ctx.body = {id: ctx.params.id};
});

// Scenario 4
router.post('/users', jsonParser, ctx => {
  ctx.status = 201;
  ctx.body = {id: 'u_bench', ...ctx.request.body};
});

// Scenario 5
router.post('/auth/users', jsonParser, ctx => {
  const token = extractBearer(ctx.headers['authorization']);
  if (token !== BEARER_TOKEN) {
    ctx.status = 401;
    ctx.body = {error: 'Unauthorized'};
    return;
  }
  if (!validateUser(ctx.request.body)) {
    ctx.status = 422;
    ctx.body = {error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`};
    return;
  }
  ctx.status = 201;
  ctx.body = {id: 'u_bench', ...ctx.request.body};
});

// Scenario 9: Rate-limited POST -- inline sliding window limiter before body parsing.
const rlHits = new Map();
function koaRateLimit(ctx) {
  const key = ctx.ip;
  const now = Date.now();
  const windowMs = 10000;
  const max = 50;
  let timestamps = rlHits.get(key) || [];
  timestamps = timestamps.filter(t => now - t < windowMs);
  if (timestamps.length >= max) {
    ctx.set('Retry-After', String(Math.ceil(windowMs / 1000)));
    ctx.status = 429;
    ctx.body = {error: 'Too Many Requests'};
    return true;
  }
  timestamps.push(now);
  rlHits.set(key, timestamps);
  return false;
}

router.post('/rate-limited/users', (ctx, next) => {
  if (koaRateLimit(ctx)) return;
  return next();
}, jsonParser, ctx => {
  const token = extractBearer(ctx.headers['authorization']);
  if (token !== BEARER_TOKEN) {
    ctx.status = 401;
    ctx.body = {error: 'Unauthorized'};
    return;
  }
  if (!validateUser(ctx.request.body)) {
    ctx.status = 422;
    ctx.body = {error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`};
    return;
  }
  ctx.status = 201;
  ctx.body = {id: 'u_bench', ...ctx.request.body};
});

// Scenario 8: Conditional GET -- manual ETag generation and If-None-Match check.
router.get('/cached/users/:id', ctx => {
  const body = JSON.stringify({
    id: ctx.params.id,
    name: 'Cached User',
    email: 'cached@example.com'
  });
  const tag = generateETag(body);
  ctx.set('ETag', tag);

  if (ctx.headers['if-none-match'] === tag) {
    ctx.status = 304;
    return;
  }
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = body;
});

// Scenario 7: Production Stack
const corsHandler = koaCors({
  origin: '*',
  allowMethods: 'POST',
  allowHeaders: 'Authorization, Content-Type'
});
const compressHandler = koaCompress({threshold: 0});

router.post('/stack/auth/users', corsHandler, compressHandler, jsonParser, ctx => {
  ctx.req.setTimeout(30000);

  const accept = ctx.headers['accept'] || '';
  if (!accept.includes('application/json') && !accept.includes('*/*') && accept !== '*') {
    ctx.status = 406;
    ctx.body = {error: 'Not Acceptable'};
    return;
  }

  const token = extractBearer(ctx.headers['authorization']);
  if (token !== BEARER_TOKEN) {
    ctx.status = 401;
    ctx.body = {error: 'Unauthorized'};
    return;
  }

  if (!validateUser(ctx.request.body)) {
    ctx.status = 422;
    ctx.body = {error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`};
    return;
  }

  ctx.status = 201;
  ctx.body = {id: 'u_bench', ...ctx.request.body};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`koa bench server listening on :${PORT}`);
});
