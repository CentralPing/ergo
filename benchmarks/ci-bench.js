/**
 * @fileoverview Lightweight CI benchmark for regression detection.
 *
 * Exercises the ergo compose pipeline directly (no Docker, no k6, no HTTP).
 * Measures per-operation latency for typical middleware stacks. Outputs JSON
 * compatible with github-action-benchmark's customSmallerIsBetter format.
 *
 * Usage: node benchmarks/ci-bench.js
 */

import {compose, createResponseAcc, authorization, cors, accepts} from '../http/index.js';
import {accumulator} from '../utils/compose.js';
import {IncomingMessage, ServerResponse} from 'node:http';
import {Socket} from 'node:net';

const ITERATIONS = 10_000;
const WARMUP = 500;

function createMockReq(method = 'GET', url = '/', headers = {}) {
  const socket = new Socket();
  const req = new IncomingMessage(socket);
  req.method = method;
  req.url = url;
  req.headers = {host: 'localhost', accept: 'application/json', ...headers};
  return req;
}

function createMockRes() {
  const socket = new Socket();
  const res = new ServerResponse(new IncomingMessage(socket));
  res.setHeader = () => res;
  res.writeHead = () => res;
  res.end = () => {};
  return res;
}

async function bench(name, fn) {
  for (let i = 0; i < WARMUP; i++) await fn();

  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) await fn();
  const elapsed = performance.now() - start;

  return {
    name,
    unit: 'us/op',
    value: Math.round((elapsed / ITERATIONS) * 1000) / 1000
  };
}

async function run() {
  const results = [];

  const negotiation = compose(
    [cors(), 'cors'],
    [accepts({types: ['application/json']}), 'accepts']
  );

  results.push(
    await bench('compose: negotiation (cors + accepts)', async () => {
      const req = createMockReq('GET', '/test', {
        origin: 'https://example.com',
        accept: 'application/json'
      });
      const res = createMockRes();
      await negotiation(req, res, createResponseAcc(), accumulator());
    })
  );

  const authPipeline = compose([
    authorization({
      strategies: [
        {
          type: 'bearer',
          authorizer: (_, token) =>
            token === 'test' ? {authorized: true, info: {uid: 1}} : {authorized: false}
        }
      ]
    }),
    'auth'
  ]);

  results.push(
    await bench('compose: authorization (bearer)', async () => {
      const req = createMockReq('GET', '/test', {
        authorization: 'Bearer test'
      });
      const res = createMockRes();
      await authPipeline(req, res, createResponseAcc(), accumulator());
    })
  );

  const fullPipeline = compose(
    [cors(), 'cors'],
    [accepts({types: ['application/json']}), 'accepts'],
    [
      authorization({
        strategies: [
          {
            type: 'bearer',
            authorizer: (_, token) =>
              token === 'test' ? {authorized: true, info: {uid: 1}} : {authorized: false}
          }
        ]
      }),
      'auth'
    ],
    () => ({response: {body: {ok: true}}})
  );

  results.push(
    await bench('compose: full pipeline (negotiate + auth + execute)', async () => {
      const req = createMockReq('GET', '/test', {
        origin: 'https://example.com',
        accept: 'application/json',
        authorization: 'Bearer test'
      });
      const res = createMockRes();
      await fullPipeline(req, res, createResponseAcc(), accumulator());
    })
  );

  console.log(JSON.stringify(results, null, 2));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
