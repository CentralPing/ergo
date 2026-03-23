/**
 * Benchmark server: Express 5
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

import express from 'express';
import corsMiddleware from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import Ajv from 'ajv';

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

const app = express();
const jsonParser = express.json();

function extractBearer(authHeader) {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

// Scenario 1
app.get('/ping', (req, res) => {
  res.json({ok: true});
});

// Scenario 2
app.get('/users/:id', (req, res) => {
  res.json({id: req.params.id, query: req.query});
});

// Scenario 3
app.get('/auth/users/:id', (req, res) => {
  const token = extractBearer(req.headers['authorization']);
  if (token !== BEARER_TOKEN) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  return res.json({id: req.params.id});
});

// Scenario 4
app.post('/users', jsonParser, (req, res) => {
  res.status(201).json({id: 'u_bench', ...req.body});
});

// Scenario 5
app.post('/auth/users', jsonParser, (req, res) => {
  const token = extractBearer(req.headers['authorization']);
  if (token !== BEARER_TOKEN) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  if (!validateUser(req.body)) {
    return res.status(422).json({
      error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`
    });
  }
  return res.status(201).json({id: 'u_bench', ...req.body});
});

// Scenario 9: Rate-limited POST -- rate limiter applied before body parser
const rateLimiter = rateLimit({windowMs: 10000, limit: 50, standardHeaders: true, legacyHeaders: false});
app.post('/rate-limited/users', rateLimiter, jsonParser, (req, res) => {
  const token = extractBearer(req.headers['authorization']);
  if (token !== BEARER_TOKEN) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  if (!validateUser(req.body)) {
    return res.status(422).json({error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`});
  }
  return res.status(201).json({id: 'u_bench', ...req.body});
});

// Scenario 8: Conditional GET -- Express generates ETags via res.json() by default
// and returns 304 automatically when If-None-Match matches.
app.get('/cached/users/:id', (req, res) => {
  res.json({id: req.params.id, name: 'Cached User', email: 'cached@example.com'});
});

// Scenario 7: Production Stack
const stackCors = corsMiddleware({
  origin: '*',
  methods: ['POST'],
  allowedHeaders: ['Authorization', 'Content-Type']
});

app.post(
  '/stack/auth/users',
  (req, res, next) => {
    req.setTimeout(30000);
    next();
  },
  stackCors,
  jsonParser,
  (req, res, next) => {
    const accept = req.headers['accept'] || '';
    if (!accept.includes('application/json') && !accept.includes('*/*') && accept !== '*') {
      return res.status(406).json({error: 'Not Acceptable'});
    }
    next();
  },
  (req, res, next) => {
    const token = extractBearer(req.headers['authorization']);
    if (token !== BEARER_TOKEN) {
      return res.status(401).json({error: 'Unauthorized'});
    }
    next();
  },
  (req, res, next) => {
    if (!validateUser(req.body)) {
      return res.status(422).json({
        error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`
      });
    }
    next();
  },
  compression({threshold: 0}),
  (req, res) => {
    res.status(201).json({id: 'u_bench', ...req.body});
  }
);

app.listen(PORT, () => {
  console.log(`express bench server listening on :${PORT}`);
});
