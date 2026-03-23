/**
 * Benchmark server: raw node:http
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
 * AJV validation on scenarios 5 and 7 for parity with framework-based servers.
 * Async gzip (not gzipSync) for fair comparison with streaming compression middleware.
 */

import http from 'node:http';
import zlib from 'node:zlib';
import {promisify} from 'node:util';
import Ajv from 'ajv';
import generateETag from 'etag';

const gzip = promisify(zlib.gzip);

const PORT = Number(process.env.PORT) || 3000;
const BEARER_TOKEN = 'YmVuY2gtc2VjcmV0LXRva2Vu';
const rlHits = new Map();

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

function parseQuery(url) {
  const idx = url.indexOf('?');
  if (idx === -1) return {};
  return Object.fromEntries(new URLSearchParams(url.slice(idx + 1)));
}

function extractBearer(authHeader) {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  });
  res.end(payload);
}

async function route(req, res) {
  const method = req.method;
  const rawUrl = req.url;
  const idx = rawUrl.indexOf('?');
  const path = idx === -1 ? rawUrl : rawUrl.slice(0, idx);

  try {
    // Scenario 1: baseline
    if (method === 'GET' && path === '/ping') {
      return json(res, 200, {ok: true});
    }

    // Scenario 2: parameterized GET + query parse
    const userGetMatch = method === 'GET' && path.match(/^\/users\/([^/]+)$/);
    if (userGetMatch) {
      const query = parseQuery(rawUrl);
      return json(res, 200, {id: userGetMatch[1], query});
    }

    // Scenario 3: authenticated GET
    const authGetMatch = method === 'GET' && path.match(/^\/auth\/users\/([^/]+)$/);
    if (authGetMatch) {
      const token = extractBearer(req.headers['authorization']);
      if (token !== BEARER_TOKEN) {
        return json(res, 401, {error: 'Unauthorized'});
      }
      return json(res, 200, {id: authGetMatch[1]});
    }

    // Scenario 9: Rate-limited POST -- inline sliding window limiter before body parsing
    if (method === 'POST' && path === '/rate-limited/users') {
      const key = req.socket.remoteAddress || '0.0.0.0';
      const now = Date.now();
      const windowMs = 10000;
      const max = 50;
      let timestamps = rlHits.get(key) || [];
      timestamps = timestamps.filter(t => now - t < windowMs);
      if (timestamps.length >= max) {
        res.setHeader('Retry-After', String(Math.ceil(windowMs / 1000)));
        return json(res, 429, {error: 'Too Many Requests'});
      }
      timestamps.push(now);
      rlHits.set(key, timestamps);

      const token = extractBearer(req.headers['authorization']);
      if (token !== BEARER_TOKEN) {
        return json(res, 401, {error: 'Unauthorized'});
      }
      const rawBody = await readBody(req);
      let body;
      try {
        body = JSON.parse(rawBody);
      } catch {
        return json(res, 400, {error: 'Invalid JSON'});
      }
      if (!validateUser(body)) {
        return json(res, 422, {error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`});
      }
      return json(res, 201, {id: 'u_bench', ...body});
    }

    // Scenario 8: Conditional GET with ETag
    const cachedGetMatch = method === 'GET' && path.match(/^\/cached\/users\/([^/]+)$/);
    if (cachedGetMatch) {
      const payload = JSON.stringify({
        id: cachedGetMatch[1],
        name: 'Cached User',
        email: 'cached@example.com'
      });
      const tag = generateETag(payload);
      const ifNoneMatch = req.headers['if-none-match'];
      if (ifNoneMatch && ifNoneMatch === tag) {
        res.writeHead(304, {ETag: tag});
        return res.end();
      }
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
        ETag: tag
      });
      return res.end(payload);
    }

    // Scenario 4: JSON body POST
    if (method === 'POST' && path === '/users') {
      const rawBody = await readBody(req);
      let body;
      try {
        body = JSON.parse(rawBody);
      } catch {
        return json(res, 400, {error: 'Invalid JSON'});
      }
      return json(res, 201, {id: 'u_bench', ...body});
    }

    // Scenario 5: full pipeline POST (auth + body + validation)
    if (method === 'POST' && path === '/auth/users') {
      const token = extractBearer(req.headers['authorization']);
      if (token !== BEARER_TOKEN) {
        return json(res, 401, {error: 'Unauthorized'});
      }
      const rawBody = await readBody(req);
      let body;
      try {
        body = JSON.parse(rawBody);
      } catch {
        return json(res, 400, {error: 'Invalid JSON'});
      }
      if (!validateUser(body)) {
        return json(res, 422, {
          error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`
        });
      }
      return json(res, 201, {id: 'u_bench', ...body});
    }

    // Scenario 7: Production Stack (timeout + cors + accepts + auth + body + validate + compress)
    if (method === 'POST' && path === '/stack/auth/users') {
      req.setTimeout(30000, () => {
        if (!req.destroyed) req.destroy();
      });

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

      const accept = req.headers['accept'] || '';
      if (!accept.includes('application/json') && !accept.includes('*/*') && accept !== '*') {
        return json(res, 406, {error: 'Not Acceptable'});
      }

      const token = extractBearer(req.headers['authorization']);
      if (token !== BEARER_TOKEN) {
        return json(res, 401, {error: 'Unauthorized'});
      }

      const rawBody = await readBody(req);
      let parsedBody;
      try {
        parsedBody = JSON.parse(rawBody);
      } catch {
        return json(res, 400, {error: 'Invalid JSON'});
      }
      if (!validateUser(parsedBody)) {
        return json(res, 422, {
          error: `Validation failed: ${ajv.errorsText(validateUser.errors)}`
        });
      }

      const responseBody = {id: 'u_bench', ...parsedBody};
      const payload = JSON.stringify(responseBody);
      const acceptEncoding = req.headers['accept-encoding'] || '';
      if (acceptEncoding.includes('gzip')) {
        const compressed = await gzip(Buffer.from(payload));
        res.writeHead(201, {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Encoding': 'gzip',
          'Content-Length': compressed.length,
          Vary: 'Accept-Encoding'
        });
        return res.end(compressed);
      }
      return json(res, 201, responseBody);
    }

    return json(res, 404, {error: 'Not Found'});
  } catch {
    return json(res, 500, {error: 'Internal Server Error'});
  }
}

const server = http.createServer((req, res) => {
  route(req, res).catch(() => {
    try {
      json(res, 500, {error: 'Internal Server Error'});
    } catch {
      res.end();
    }
  });
});

server.listen(PORT, () => {
  console.log(`node-http bench server listening on :${PORT}`);
});
