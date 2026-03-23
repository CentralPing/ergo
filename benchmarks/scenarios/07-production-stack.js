/**
 * Scenario 7: Production Stack
 *
 * POST /stack/auth/users -- full Fast Fail pipeline with production middleware:
 *   Stage 0 (Setup):         Request timeout (30s deadline)
 *   Stage 1 (Negotiation):   CORS validation + content negotiation (parallel in ergo)
 *   Stage 2 (Authorization): Bearer token verification
 *   Stage 3 (Validation):    JSON body parsing + JSON Schema validation
 *   Stage 4 (Response):      Response compression (gzip) + send
 *
 * Compares the overhead of a realistic middleware stack across all frameworks.
 * The delta between Scenario 5 and Scenario 7 isolates the cost of CORS,
 * content negotiation, timeout, and compression.
 *
 * The token is a raw opaque string per RFC 6750 -- Bearer tokens are opaque
 * and servers compare them as-is without decoding.
 */

import http from 'k6/http';
import {check} from 'k6';
import {createHandleSummary, safeJson} from './_helpers.js';

const BASE_URL = __ENV.BASE_URL || 'http://bench-server:3000';

const TOKEN = 'YmVuY2gtc2VjcmV0LXRva2Vu';

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
  Origin: 'https://bench.example.com',
  Accept: 'application/json',
  'Accept-Encoding': 'gzip',
};

const PAYLOAD = JSON.stringify({
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'user',
});

export const options = {
  stages: [
    {duration: '30s', target: 50},
    {duration: '60s', target: 50},
    {duration: '10s', target: 0},
  ],
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(50)', 'p(95)', 'p(99)'],
  thresholds: {
    checks: ['rate>0.99'],
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(99)<1000'],
  },
};

export default function () {
  const res = http.post(`${BASE_URL}/stack/auth/users`, PAYLOAD, {headers: HEADERS});
  check(res, {
    'status 201': r => r.status === 201,
    'has id': r => safeJson(r, 'id') === 'u_bench',
    'has CORS header': r => r.headers['Access-Control-Allow-Origin'] != null,
    'is compressed': r => r.headers['Content-Encoding'] === 'gzip',
  });
}

export const handleSummary = createHandleSummary('07-production-stack');
