/**
 * Scenario 4: JSON POST with body parsing
 *
 * POST /users -- exercises reading + parsing a JSON request body.
 * Ergo stage exercised: Stage 3 (Validation -- body middleware).
 */

import http from 'k6/http';
import {check} from 'k6';
import {createHandleSummary, safeJson} from './_helpers.js';

const BASE_URL = __ENV.BASE_URL || 'http://bench-server:3000';

const HEADERS = {'Content-Type': 'application/json'};

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
  const res = http.post(`${BASE_URL}/users`, PAYLOAD, {headers: HEADERS});
  check(res, {
    'status 201': r => r.status === 201,
    'has id': r => safeJson(r, 'id') === 'u_bench',
  });
}

export const handleSummary = createHandleSummary('04-json-post');
