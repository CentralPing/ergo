/**
 * Benchmark server: ergo + ergo-router (Pipeline v2)
 *
 * Uses ergo-router's declarative route config API with route-scoped CORS.
 * The pipeline builder assembles the four-stage Fast Fail pipeline from
 * config keys; auto-wrap creates both accumulators, runs the pipeline,
 * and calls send() with responseAcc + domainAcc.
 *
 * Execute functions return {response: {statusCode?, body}} per the v2
 * two-accumulator convention — response properties feed responseAcc,
 * domain values feed domainAcc.
 *
 *   GET  /ping                   scenario 1: routing only
 *   GET  /users/:id              scenario 2: Stage 1 -- url parsing
 *   GET  /auth/users/:id         scenario 3: Stage 2 -- authorization
 *   POST /users                  scenario 4: Stage 3 -- body parsing
 *   POST /auth/users             scenario 5: All stages
 *   POST /stack/auth/users       scenario 7: Production stack (CORS + accepts
 *                                            + timeout + compress + all stages)
 *   GET  /cached/users/:id       scenario 8: Conditional GET (ETag / 304)
 *   POST /rate-limited/users     scenario 9: Rate-limited flood
 *
 * Authorization uses the Bearer strategy. The token is sent as the raw opaque
 * string 'YmVuY2gtc2VjcmV0LXRva2Vu' (base64 representation of 'bench-secret-token').
 * Per RFC 6750, Bearer tokens are opaque -- ergo passes the raw token string to the
 * authorizer without decoding.
 */

import createRouter from 'ergo-router';

const PORT = Number(process.env.PORT) || 3000;

const bearerStrategy = [
  {
    type: 'bearer',
    attributes: {realm: 'Benchmark'},
    authorizer: async (attributes, token) => {
      if (token === 'YmVuY2gtc2VjcmV0LXRva2Vu') {
        return {authorized: true, info: {userId: 'u_bench'}};
      }
      return {
        authorized: false,
        info: {type: 'invalid_token', desc: 'Invalid token'}
      };
    }
  }
];

const createUserSchema = {
  type: 'object',
  properties: {
    name: {type: 'string', minLength: 1},
    email: {type: 'string', minLength: 1}
  },
  required: ['name', 'email'],
  additionalProperties: true
};

const router = createRouter({
  transport: {
    cors: false,
    requestId: false,
    security: false
  }
});

// Scenario 1: baseline GET -- routing overhead only
router.get('/ping', {
  execute: () => ({response: {body: {ok: true}}})
});

// Scenario 2: parameterized GET with url parsing (auto-included for GET)
router.get('/users/:id', {
  execute: (req, res, acc) => ({
    response: {body: {id: acc.route.params.id, query: acc.url.query}}
  })
});

// Scenario 3: authenticated GET
router.get('/auth/users/:id', {
  auth: {strategies: bearerStrategy},
  execute: (req, res, acc) => ({
    response: {body: {id: acc.route.params.id}}
  })
});

// Scenario 4: JSON POST with body parsing (body auto-included for POST)
router.post('/users', {
  execute: (req, res, acc) => ({
    response: {statusCode: 201, body: {id: 'u_bench', ...acc.body.parsed}}
  })
});

// Scenario 5: Full Fast Fail pipeline
router.post('/auth/users', {
  auth: {strategies: bearerStrategy},
  validate: {body: createUserSchema},
  execute: (req, res, acc) => ({
    response: {statusCode: 201, body: {id: 'u_bench', ...acc.body.parsed}}
  })
});

// Scenario 9: Rate-limited POST -- rateLimit runs in Stage 1 (Negotiation),
// before body parsing, auth, or validation. Rejected requests never read the body.
router.post('/rate-limited/users', {
  rateLimit: {max: 50, windowMs: 10000},
  auth: {strategies: bearerStrategy},
  validate: {body: createUserSchema},
  execute: (req, res, acc) => ({
    response: {statusCode: 201, body: {id: 'u_bench', ...acc.body.parsed}}
  })
});

// Scenario 8: Conditional GET -- ergo's send() generates ETags and handles
// If-None-Match → 304 automatically.
router.get('/cached/users/:id', {
  execute: (req, res, acc) => ({
    response: {body: {id: acc.route.params.id, name: 'Cached User', email: 'cached@example.com'}}
  })
});

// Scenario 7: Production Stack -- CORS scoped to this route only via route config.
router.post('/stack/auth/users', {
  cors: {origin: '*', allowedHeaders: ['Authorization', 'Content-Type']},
  accepts: {types: ['application/json'], throwIfFail: true},
  timeout: {ms: 30000},
  compress: {threshold: 0},
  auth: {strategies: bearerStrategy},
  validate: {body: createUserSchema},
  execute: (req, res, acc) => ({
    response: {statusCode: 201, body: {id: 'u_bench', ...acc.body.parsed}}
  })
});

router.listen(PORT, () => {
  console.log(`ergo bench server listening on :${PORT}`);
});
