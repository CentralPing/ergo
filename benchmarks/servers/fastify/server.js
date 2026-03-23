/**
 * Benchmark server: Fastify 5
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
 * Logger disabled to match production profile (no I/O overhead in logging).
 * Request body schemas enable AJV validation for parity with ergo.
 * Response schemas intentionally omitted so all frameworks use JSON.stringify.
 */

import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyCompress from '@fastify/compress';
import fastifyEtag from '@fastify/etag';
import fastifyRateLimit from '@fastify/rate-limit';

const PORT = Number(process.env.PORT) || 3000;
const BEARER_TOKEN = 'YmVuY2gtc2VjcmV0LXRva2Vu';

const app = Fastify({logger: false});

function extractBearer(authHeader) {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

const userBodySchema = {
  type: 'object',
  properties: {
    name: {type: 'string', minLength: 1},
    email: {type: 'string', minLength: 1}
  },
  required: ['name', 'email'],
  additionalProperties: true
};

// Scenario 1
app.get('/ping', async () => ({ok: true}));

// Scenario 2
app.get('/users/:id', async req => ({id: req.params.id, query: req.query}));

// Scenario 3
app.get('/auth/users/:id', async (req, reply) => {
  const token = extractBearer(req.headers['authorization']);
  if (token !== BEARER_TOKEN) {
    return reply.status(401).send({error: 'Unauthorized'});
  }
  return {id: req.params.id};
});

// Scenario 4
app.post('/users', async (req, reply) => reply.status(201).send({id: 'u_bench', ...req.body}));

// Scenario 5
app.post('/auth/users', {
  schema: {body: userBodySchema}
}, async (req, reply) => {
  const token = extractBearer(req.headers['authorization']);
  if (token !== BEARER_TOKEN) {
    return reply.status(401).send({error: 'Unauthorized'});
  }
  return reply.status(201).send({id: 'u_bench', ...req.body});
});

// Scenario 9: Rate-limited POST -- @fastify/rate-limit runs in onRequest (before body parsing)
app.register(async function rateLimitPlugin(instance) {
  await instance.register(fastifyRateLimit, {max: 50, timeWindow: 10000});

  instance.post('/rate-limited/users', {
    schema: {body: userBodySchema}
  }, async (req, reply) => {
    const token = extractBearer(req.headers['authorization']);
    if (token !== BEARER_TOKEN) {
      return reply.status(401).send({error: 'Unauthorized'});
    }
    return reply.status(201).send({id: 'u_bench', ...req.body});
  });
});

// Scenario 8: Conditional GET -- @fastify/etag generates ETags and handles
// If-None-Match → 304 via the revalidate option.
app.register(fastifyEtag);

app.get('/cached/users/:id', async req => ({
  id: req.params.id,
  name: 'Cached User',
  email: 'cached@example.com'
}));

// Scenario 7: Production Stack (encapsulated plugin for scoped CORS + compress)
app.register(async function stackPlugin(instance) {
  await instance.register(fastifyCors, {
    origin: '*',
    methods: ['POST'],
    allowedHeaders: ['Authorization', 'Content-Type']
  });
  await instance.register(fastifyCompress, {global: true, threshold: 0});

  instance.addHook('onRequest', async req => {
    req.raw.setTimeout(30000);
  });

  instance.addHook('preHandler', async (req, reply) => {
    const accept = req.headers['accept'] || '';
    if (!accept.includes('application/json') && !accept.includes('*/*') && accept !== '*') {
      return reply.status(406).send({error: 'Not Acceptable'});
    }
  });

  instance.post('/stack/auth/users', {
    schema: {body: userBodySchema}
  }, async (req, reply) => {
    const token = extractBearer(req.headers['authorization']);
    if (token !== BEARER_TOKEN) {
      return reply.status(401).send({error: 'Unauthorized'});
    }
    return reply.status(201).send({id: 'u_bench', ...req.body});
  });
});

app.listen({port: PORT, host: '0.0.0.0'}).then(() => {
  console.log(`fastify bench server listening on :${PORT}`);
});
