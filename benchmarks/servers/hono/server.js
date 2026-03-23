/**
 * Benchmark server: Hono 4 (on Node.js via @hono/node-server)
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
 */

import {Hono} from 'hono';
import {compress} from 'hono/compress';
import {cors} from 'hono/cors';
import {serve} from '@hono/node-server';
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

function extractBearer(authHeader) {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

const app = new Hono();

// Scenario 1
app.get('/ping', c => c.json({ok: true}));

// Scenario 2
app.get('/users/:id', c => {
  return c.json({id: c.req.param('id'), query: c.req.query()});
});

// Scenario 3
app.get('/auth/users/:id', c => {
  const token = extractBearer(c.req.header('authorization'));
  if (token !== BEARER_TOKEN) {
    return c.json({error: 'Unauthorized'}, 401);
  }
  return c.json({id: c.req.param('id')});
});

// Scenario 4
app.post('/users', async c => {
  const body = await c.req.json();
  return c.json({id: 'u_bench', ...body}, 201);
});

// Scenario 5
app.post('/auth/users', async c => {
  const token = extractBearer(c.req.header('authorization'));
  if (token !== BEARER_TOKEN) {
    return c.json({error: 'Unauthorized'}, 401);
  }
  const body = await c.req.json();
  if (!validateUser(body)) {
    return c.json({error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`}, 422);
  }
  return c.json({id: 'u_bench', ...body}, 201);
});

// Scenario 9: Rate-limited POST -- inline sliding window limiter before body parsing.
const rlHits = new Map();
app.post('/rate-limited/users', async c => {
  const key = c.env.incoming?.socket?.remoteAddress || '0.0.0.0';
  const now = Date.now();
  const windowMs = 10000;
  const max = 50;
  let timestamps = rlHits.get(key) || [];
  timestamps = timestamps.filter(t => now - t < windowMs);
  if (timestamps.length >= max) {
    c.header('Retry-After', String(Math.ceil(windowMs / 1000)));
    return c.json({error: 'Too Many Requests'}, 429);
  }
  timestamps.push(now);
  rlHits.set(key, timestamps);

  const token = extractBearer(c.req.header('authorization'));
  if (token !== BEARER_TOKEN) {
    return c.json({error: 'Unauthorized'}, 401);
  }
  const body = await c.req.json();
  if (!validateUser(body)) {
    return c.json({error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`}, 422);
  }
  return c.json({id: 'u_bench', ...body}, 201);
});

// Scenario 8: Conditional GET -- manual ETag generation and If-None-Match check.
app.get('/cached/users/:id', c => {
  const body = JSON.stringify({
    id: c.req.param('id'),
    name: 'Cached User',
    email: 'cached@example.com'
  });
  const tag = generateETag(body);
  c.header('ETag', tag);

  const ifNoneMatch = c.req.header('if-none-match');
  if (ifNoneMatch && ifNoneMatch === tag) {
    return c.body(null, 304);
  }
  return c.body(body, 200, {'Content-Type': 'application/json; charset=utf-8'});
});

// Scenario 7: Production Stack (scoped CORS + compress + timeout + accepts + auth + validate)
const stack = new Hono();

stack.use(async (c, next) => {
  c.env.incoming.setTimeout(30000);
  await next();
});

stack.use(cors({
  origin: '*',
  allowMethods: ['POST'],
  allowHeaders: ['Authorization', 'Content-Type']
}));

stack.use(compress({threshold: 0}));

stack.post('/auth/users', async c => {
  const accept = c.req.header('accept') || '';
  if (!accept.includes('application/json') && !accept.includes('*/*') && accept !== '*') {
    return c.json({error: 'Not Acceptable'}, 406);
  }

  const token = extractBearer(c.req.header('authorization'));
  if (token !== BEARER_TOKEN) {
    return c.json({error: 'Unauthorized'}, 401);
  }

  const body = await c.req.json();
  if (!validateUser(body)) {
    return c.json({error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`}, 422);
  }

  return c.json({id: 'u_bench', ...body}, 201);
});

app.route('/stack', stack);

serve({fetch: app.fetch, port: PORT}, () => {
  console.log(`hono bench server listening on :${PORT}`);
});
