/**
 * Scenario 5: Full Fast Fail pipeline
 *
 * POST /auth/users -- exercises the complete Ergo four-stage pipeline:
 *   Stage 2 (Authorization): Bearer token verification
 *   Stage 3a (Validation):   JSON body parsing
 *   Stage 3b (Validation):   JSON Schema validation (name + email required)
 *   Stage 4 (Execution):     Return created resource
 *
 * This scenario best demonstrates Ergo's value: a bad token or invalid body
 * short-circuits before any downstream work begins.
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
  const res = http.post(`${BASE_URL}/auth/users`, PAYLOAD, {headers: HEADERS});
  check(res, {
    'status 201': r => r.status === 201,
    'has id': r => safeJson(r, 'id') === 'u_bench',
  });
}

export const handleSummary = createHandleSummary('05-full-pipeline');
