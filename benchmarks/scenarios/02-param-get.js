/**
 * Scenario 2: Parameterized GET with query parsing
 *
 * GET /users/:id?fields=name,email -- exercises route params + query string parsing.
 * Ergo stage exercised: Stage 1 (Negotiation -- url/query middleware).
 */

import http from 'k6/http';
import {check} from 'k6';
import {createHandleSummary, safeJson} from './_helpers.js';

const BASE_URL = __ENV.BASE_URL || 'http://bench-server:3000';

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
  const res = http.get(`${BASE_URL}/users/u_123?fields=name%2Cemail&page=1`);
  check(res, {
    'status 200': r => r.status === 200,
    'has id': r => safeJson(r, 'id') === 'u_123',
  });
}

export const handleSummary = createHandleSummary('02-param-get');
