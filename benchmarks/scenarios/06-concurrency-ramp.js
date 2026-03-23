/**
 * Scenario 6: Concurrency Ramp (Step-VU)
 *
 * POST /auth/users -- full Fast Fail pipeline (auth + body + validation).
 *
 * Steps virtual users through five tiers to measure latency degradation
 * under increasing concurrency and identify the saturation point:
 *
 *   Tier 1 (30s):  10 VUs  -- light load baseline
 *   Tier 2 (30s):  50 VUs  -- matches existing scenario load
 *   Tier 3 (30s): 100 VUs  -- moderate concurrency
 *   Tier 4 (30s): 200 VUs  -- high concurrency
 *   Tier 5 (30s): 500 VUs  -- saturation test
 *
 * The aggregate summary reflects behavior across all tiers, with p99/p95
 * naturally dominated by the highest-load tier.
 *
 * The endpoint is identical to scenario 5 so results are directly comparable.
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
    {duration: '10s', target: 10},
    {duration: '30s', target: 10},
    {duration: '10s', target: 50},
    {duration: '30s', target: 50},
    {duration: '10s', target: 100},
    {duration: '30s', target: 100},
    {duration: '10s', target: 200},
    {duration: '30s', target: 200},
    {duration: '10s', target: 500},
    {duration: '30s', target: 500},
    {duration: '10s', target: 0},
  ],
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(50)', 'p(95)', 'p(99)'],
  thresholds: {
    checks: ['rate>0.95'],
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(99)<5000'],
  },
};

export default function () {
  const res = http.post(`${BASE_URL}/auth/users`, PAYLOAD, {headers: HEADERS});
  check(res, {
    'status 201': r => r.status === 201,
    'has id': r => safeJson(r, 'id') === 'u_bench',
  });
}

export const handleSummary = createHandleSummary('06-concurrency-ramp');
