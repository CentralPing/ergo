/**
 * Scenario 1: Baseline GET
 *
 * GET /ping -- routing overhead only, no middleware.
 * This is the performance floor for each framework.
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
  const res = http.get(`${BASE_URL}/ping`);
  check(res, {
    'status 200': r => r.status === 200,
    'body ok': r => safeJson(r, 'ok') === true,
  });
}

export const handleSummary = createHandleSummary('01-baseline-get');
