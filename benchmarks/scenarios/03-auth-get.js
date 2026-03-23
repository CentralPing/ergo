/**
 * Scenario 3: Authenticated GET
 *
 * GET /auth/users/:id -- exercises Bearer token authentication.
 * Ergo stage exercised: Stage 2 (Authorization).
 *
 * The token is a raw opaque string per RFC 6750 -- Bearer tokens are opaque
 * and servers compare them as-is without decoding.
 */

import http from 'k6/http';
import {check} from 'k6';
import {createHandleSummary, safeJson} from './_helpers.js';

const BASE_URL = __ENV.BASE_URL || 'http://bench-server:3000';

const TOKEN = 'YmVuY2gtc2VjcmV0LXRva2Vu';

const HEADERS = {Authorization: `Bearer ${TOKEN}`};

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
  const res = http.get(`${BASE_URL}/auth/users/u_123`, {headers: HEADERS});
  check(res, {
    'status 200': r => r.status === 200,
    'has id': r => safeJson(r, 'id') === 'u_123',
  });
}

export const handleSummary = createHandleSummary('03-auth-get');
