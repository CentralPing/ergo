/**
 * Scenario 8: Conditional GET (ETag / 304 Not Modified)
 *
 * GET /cached/users/:id -- exercises ETag generation and conditional response.
 *
 * The setup phase fetches the resource once to capture the ETag. All subsequent
 * VU iterations send If-None-Match with that ETag, expecting 304 responses.
 * This measures the framework's ability to short-circuit serialization and
 * compression when the resource hasn't changed.
 *
 * Ergo handles this natively in send() -- ETag generation and If-None-Match
 * evaluation are built-in with zero configuration. Other frameworks require
 * plugins or manual implementation.
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

export function setup() {
  const res = http.get(`${BASE_URL}/cached/users/u_123`);
  const etag = res.headers['Etag'] || res.headers['etag'] || res.headers['ETag'];
  if (!etag) {
    throw new Error(`Setup failed: no ETag header in response (status=${res.status})`);
  }
  return {etag};
}

export default function (data) {
  const res = http.get(`${BASE_URL}/cached/users/u_123`, {
    headers: {'If-None-Match': data.etag},
  });
  check(res, {
    'status 304': r => r.status === 304,
    'no body': r => r.body === '' || r.body == null,
  });
}

export const handleSummary = createHandleSummary('08-conditional-get');
