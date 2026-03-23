# Ergo Benchmark Suite

A Docker-based, publishable benchmark comparing `ergo` against raw
Node.js `http`, Express, Fastify, Hono, and Koa across nine scenarios that map
directly to Ergo's four-stage Fast Fail pipeline.

## Methodology

### Isolation

Each server runs in its own Docker container, **one at a time** (sequential, never
concurrent), to eliminate inter-container CPU contention.

| Resource   | Server container        | k6 container            |
| ---------- | ----------------------- | ----------------------- |
| CPUs       | `--cpuset-cpus="0"`     | `--cpuset-cpus="1"`     |
| Memory     | `--memory=512m`         | `--memory=1g`           |
| Network    | Docker bridge (`bench`) | Docker bridge (`bench`) |
| Node.js    | `node:22-alpine`        | --                      |
| `NODE_ENV` | `production`            | --                      |

All servers listen on port `3000` and implement identical request/response logic --
the only variable is the framework.

### Load Profile

k6 staged virtual users per scenario:

```
Warmup  (30s): 0 → 50 VUs    -- JIT warm, connection pools established
Sustain (60s): 50 VUs         -- measurement window
Ramp-down (10s): 50 → 0 VUs
```

Three trial runs per scenario × framework combination. The report generator computes
per-scenario statistics (mean, standard deviation, coefficient of variation) across
trials and ranks frameworks by average throughput.

### Scenarios

| #   | Route                                                | Description                                         | Ergo Stages        |
| --- | ---------------------------------------------------- | --------------------------------------------------- | ------------------ |
| 1   | `GET /ping`                                          | Baseline -- routing overhead only                   | Routing            |
| 2   | `GET /users/:id?fields=name`                         | Parameterized route + query parsing                 | Stage 1 (query)    |
| 3   | `GET /auth/users/:id` + Bearer token                 | Authenticated request                               | Stage 2 (auth)     |
| 4   | `POST /users` + JSON body                            | Body parsing                                        | Stage 3 (body)     |
| 5   | `POST /auth/users` + auth + JSON body + validation   | Full Fast Fail pipeline                             | All 4 stages       |
| 6   | `POST /auth/users` + auth (step-VU 10→500)           | Concurrency ramp -- saturation discovery            | All 4 stages       |
| 7   | `POST /stack/auth/users` + CORS + accepts + gzip     | Production stack (timeout+CORS+accepts+auth+body+validate+compress) | All stages + middleware |
| 8   | `GET /cached/users/:id` + `If-None-Match`            | Conditional GET -- ETag generation and 304 short-circuit            | Stage 4 (send)     |
| 9   | `POST /rate-limited/users` + flood                   | Rate-limit flood -- 429 rejection throughput under sustained load   | Stage 1 (rate limit) |

Scenarios 3-5 exercise the exact value proposition of Ergo's Fast Fail design:
authentication and validation failures short-circuit before any downstream work begins.
Scenario 7 adds four additional middleware layers (timeout, CORS, content negotiation, compression)
to measure a realistic production stack -- the delta from Scenario 5 isolates middleware overhead.
Scenario 8 measures how efficiently frameworks skip serialization via ETag conditionals.
Scenario 9 tests the Fast Fail principle under flood: rejected requests should be cheap
because the rate limiter runs before body parsing, auth, and validation.

### Frameworks

- **node-http** -- raw `node:http` module; the performance ceiling with no framework overhead
- **express@5** -- the ubiquitous reference point (v5, latest stable)
- **fastify@5** -- the established Node.js performance leader, with response schemas for `fast-json-stringify`
- **hono@4** -- modern Web Standards framework via `@hono/node-server`; the fastest-growing Node.js framework
- **koa@3** -- middleware-pipeline architecture, a meaningful structural peer (v3, latest stable)
- **ergo** -- `ergo` + `ergo-router` (full stack, local source)

### Validation Parity

All frameworks use [AJV](https://ajv.js.org/) JSON Schema validation for request body
validation (scenarios 5 and 7). Fastify uses its built-in AJV integration; all others
compile schemas at startup. This ensures validation overhead is consistent across the suite.

## Reproducing Results

### Prerequisites

- Docker Desktop (or Docker Engine) with multi-core CPU pinning support
- 2+ CPU cores available (core 0 for server, core 1 for k6)
- ~4 GB free RAM

### Run

```bash
cd benchmarks
chmod +x run.sh
./run.sh
```

Results are written to `results/` as JSON files. After all runs complete:

```bash
node generate-report.js
```

This produces `results/report.md` with per-scenario tables, overall rankings, noise
analysis, and ergo highlights.

### Environment

When publishing results, record and include:

```
OS:          $(uname -srm)
CPU:         (model name from /proc/cpuinfo or sysctl)
Cores:       (physical core count)
RAM:         (total)
Docker:      $(docker --version)
Node.js:     22.x (pinned in images)
k6:          grafana/k6:latest (tag pinned in run.sh)
Date:        $(date)
```

## Results

> Run `./run.sh && node generate-report.js` to populate this section.

See `results/report.md` after running the suite. Curated results are published at
https://centralping.github.io/benchmarks/.
