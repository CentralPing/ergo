/**
 * Scenario 9: Rate-Limited Flood (Fast Fail)
 *
 * POST /rate-limited/users -- full pipeline behind a rate limiter.
 *
 * The rate limit is 50 requests per 10-second window. With 50 VUs sending
 * continuously, the vast majority of requests are rejected with 429.
 *
 * This scenario tests the Fast Fail principle: rejected requests should be
 * cheap because the rate limiter runs before body parsing, auth, and
 * validation. Ergo enforces this by placing rateLimit in Stage 1
 * (Negotiation), before any I/O-heavy middleware.
 *
 * Key metrics: average latency of 429 responses and overall throughput
 * under flood conditions.
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
    http_req_duration: ['p(99)<1000'],
  },
};

export default function () {
  const res = http.post(`${BASE_URL}/rate-limited/users`, PAYLOAD, {headers: HEADERS});
  check(res, {
    'status 201 or 429': r => r.status === 201 || r.status === 429,
    'valid response': r =>
      r.status === 429 || safeJson(r, 'id') === 'u_bench',
  });
}

export const handleSummary = createHandleSummary('09-rate-limit-flood');
