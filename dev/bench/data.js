window.BENCHMARK_DATA = {
  "lastUpdate": 1780093040852,
  "repoUrl": "https://github.com/CentralPing/ergo",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "distinct": true,
          "id": "630f399dfc3b34de36a06f6f84175560d0c63f03",
          "message": "ci: switch release workflow to trusted publishing (OIDC)",
          "timestamp": "2026-03-20T04:54:37-04:00",
          "tree_id": "9b1e4132e2483ed0e4d9065be24a38c51823a10b",
          "url": "https://github.com/CentralPing/ergo/commit/630f399dfc3b34de36a06f6f84175560d0c63f03"
        },
        "date": 1774000614937,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "distinct": true,
          "id": "3af5a5b5b07149c7aea859e8c27e013bf8b70b48",
          "message": "ci: add provenance flag, codecov token, and fix repository URL for trusted publishing",
          "timestamp": "2026-03-20T06:37:27-04:00",
          "tree_id": "41137ebe7c259ff6c1311c5688ad37a54e239203",
          "url": "https://github.com/CentralPing/ergo/commit/3af5a5b5b07149c7aea859e8c27e013bf8b70b48"
        },
        "date": 1774003771579,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "distinct": true,
          "id": "c56fe2f3e8258b3ec8258ca6a3c18b7f8e79ff52",
          "message": "docs: add logo assets and wordmark to README",
          "timestamp": "2026-03-20T07:23:59-04:00",
          "tree_id": "be5dba9938b27ebec4d7d79271bcfcb099c40747",
          "url": "https://github.com/CentralPing/ergo/commit/c56fe2f3e8258b3ec8258ca6a3c18b7f8e79ff52"
        },
        "date": 1774005867594,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "distinct": true,
          "id": "ed7c130e545851ece7cb872597ae2f85fa079584",
          "message": "ci: use Node.js 24 in release workflow for npm trusted publishing\n\nnpm trusted publishing requires npm CLI v11.5.1+. Node.js 22 ships\nwith npm v10 which causes a misleading E404 during publish.\nNode.js 24 ships with npm v11 natively.",
          "timestamp": "2026-03-20T08:52:42-04:00",
          "tree_id": "cb80e99ba30437ed3812af059291d43b3e405ee5",
          "url": "https://github.com/CentralPing/ergo/commit/ed7c130e545851ece7cb872597ae2f85fa079584"
        },
        "date": 1774011195050,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.011,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "e5cc16c75ccf98911c9e6ec7a25d6a815362bdb6",
          "message": "fix: security hardening, DRY refactors, and quality improvements",
          "timestamp": "2026-03-20T12:53:04Z",
          "url": "https://github.com/CentralPing/ergo/pull/6/commits/e5cc16c75ccf98911c9e6ec7a25d6a815362bdb6"
        },
        "date": 1774028922425,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.011,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "086656370ff2e84297369f4d3517bdf098f14765",
          "message": "fix: security hardening, DRY refactors, and quality improvements (#6)\n\nSecurity (HIGH):\n- Guard subpropRegExp.exec null return in query parser (DoS prevention)\n- Add escaping/validation in Link header formatter (injection prevention)\n- Sanitize WWW-Authenticate quoted-string attributes in authorization\n- Enforce RFC 6265 cookie-octet grammar in Set-Cookie builder\n\nSecurity (MEDIUM):\n- Change utils/get invoke default to false (prevent unintended execution)\n- Cap raw query string length before split (memory exhaustion prevention)\n\nDRY:\n- Extract shared appendVary utility (send.js, compress.js)\n- Extract shared sanitizeQuotedString utility (authorization.js, link.js)\n- Extract shared attachInstance utility for RFC 9457 instance injection\n\nQuality:\n- Introduce DEFAULT_LIMIT constant in body parser, reference in JSDoc\n- Interpolate dynamic values into meter.js error messages\n- Include max variable in cookie parser error message\n- Remove stale TODO in body.js\n- Relax fragile 50ms timing assertion in prefer tests\n- Remove hardcoded line numbers from test names\n- Add sync comment for dual export map in main.js\n\nTests:\n- Add body contract tests for chunked, 411, brotli\n- Strengthen send.js stream tests (payload + error path)\n- Add compressor error path test\n- Add authorization attribute sanitization tests\n- Add Link header injection tests\n- Add cookie grammar enforcement tests\n- Add query parser robustness tests\n\nDependencies:\n- Bump undici minimum to ^7.24.5\n\nMade-with: Cursor",
          "timestamp": "2026-03-20T13:59:53-04:00",
          "tree_id": "c08c17d8e83668462ec4c9fec91377d726a10e6c",
          "url": "https://github.com/CentralPing/ergo/commit/086656370ff2e84297369f4d3517bdf098f14765"
        },
        "date": 1774029612876,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.018,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "distinct": true,
          "id": "22440e22470c79b5e03d3d48d421d4b63f5e3293",
          "message": "fix: security hardening, DRY refactors, and quality improvements (#6)\n\nSecurity (HIGH):\n- Guard subpropRegExp.exec null return in query parser (DoS prevention)\n- Add escaping/validation in Link header formatter (injection prevention)\n- Sanitize WWW-Authenticate quoted-string attributes in authorization\n- Enforce RFC 6265 cookie-octet grammar in Set-Cookie builder\n\nSecurity (MEDIUM):\n- Change utils/get invoke default to false (prevent unintended execution)\n- Cap raw query string length before split (memory exhaustion prevention)\n\nDRY:\n- Extract shared appendVary utility (send.js, compress.js)\n- Extract shared sanitizeQuotedString utility (authorization.js, link.js)\n- Extract shared attachInstance utility for RFC 9457 instance injection\n\nQuality:\n- Introduce DEFAULT_LIMIT constant in body parser, reference in JSDoc\n- Interpolate dynamic values into meter.js error messages\n- Include max variable in cookie parser error message\n- Remove stale TODO in body.js\n- Relax fragile 50ms timing assertion in prefer tests\n- Remove hardcoded line numbers from test names\n- Add sync comment for dual export map in main.js\n\nTests:\n- Add body contract tests for chunked, 411, brotli\n- Strengthen send.js stream tests (payload + error path)\n- Add compressor error path test\n- Add authorization attribute sanitization tests\n- Add Link header injection tests\n- Add cookie grammar enforcement tests\n- Add query parser robustness tests\n\nDependencies:\n- Bump undici minimum to ^7.24.5",
          "timestamp": "2026-03-20T14:11:39-04:00",
          "tree_id": "c08c17d8e83668462ec4c9fec91377d726a10e6c",
          "url": "https://github.com/CentralPing/ergo/commit/22440e22470c79b5e03d3d48d421d4b63f5e3293"
        },
        "date": 1774030329775,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "jason.cust@gmail.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "distinct": true,
          "id": "8300eac9589729968561400e7014799ce1ce40a1",
          "message": "fix: security hardening, DRY refactors, and quality improvements (#6)\n\nSecurity (HIGH):\n- Guard subpropRegExp.exec null return in query parser (DoS prevention)\n- Add escaping/validation in Link header formatter (injection prevention)\n- Sanitize WWW-Authenticate quoted-string attributes in authorization\n- Enforce RFC 6265 cookie-octet grammar in Set-Cookie builder\n\nSecurity (MEDIUM):\n- Change utils/get invoke default to false (prevent unintended execution)\n- Cap raw query string length before split (memory exhaustion prevention)\n\nDRY:\n- Extract shared appendVary utility (send.js, compress.js)\n- Extract shared sanitizeQuotedString utility (authorization.js, link.js)\n- Extract shared attachInstance utility for RFC 9457 instance injection\n\nQuality:\n- Introduce DEFAULT_LIMIT constant in body parser, reference in JSDoc\n- Interpolate dynamic values into meter.js error messages\n- Include max variable in cookie parser error message\n- Remove stale TODO in body.js\n- Relax fragile 50ms timing assertion in prefer tests\n- Remove hardcoded line numbers from test names\n- Add sync comment for dual export map in main.js\n\nTests:\n- Add body contract tests for chunked, 411, brotli\n- Strengthen send.js stream tests (payload + error path)\n- Add compressor error path test\n- Add authorization attribute sanitization tests\n- Add Link header injection tests\n- Add cookie grammar enforcement tests\n- Add query parser robustness tests\n\nDependencies:\n- Bump undici minimum to ^7.24.5",
          "timestamp": "2026-03-20T14:18:12-04:00",
          "tree_id": "c08c17d8e83668462ec4c9fec91377d726a10e6c",
          "url": "https://github.com/CentralPing/ergo/commit/8300eac9589729968561400e7014799ce1ce40a1"
        },
        "date": 1774030734246,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.011,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "a2c39e3e30254399ac8f8eed9d0b575a14c0fcb9",
          "message": "build(deps): Bump github/codeql-action from 4.33.0 to 4.34.1",
          "timestamp": "2026-03-20T18:18:41Z",
          "url": "https://github.com/CentralPing/ergo/pull/7/commits/a2c39e3e30254399ac8f8eed9d0b575a14c0fcb9"
        },
        "date": 1774042549898,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bb5380416bad848dd74a1722b977ad7fd6c5d93f",
          "message": "build(deps): Bump github/codeql-action from 4.33.0 to 4.34.1 (#7)\n\nBumps [github/codeql-action](https://github.com/github/codeql-action) from 4.33.0 to 4.34.1.\n- [Release notes](https://github.com/github/codeql-action/releases)\n- [Changelog](https://github.com/github/codeql-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/github/codeql-action/compare/b1bff81932f5cdfc8695c7752dcee935dcd061c8...38697555549f1db7851b81482ff19f1fa5c4fedc)\n\n---\nupdated-dependencies:\n- dependency-name: github/codeql-action\n  dependency-version: 4.34.1\n  dependency-type: direct:production\n  update-type: version-update:semver-minor\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-03-22T18:15:57-04:00",
          "tree_id": "8a3d9cb2525a47e937e02650867e0b66af012635",
          "url": "https://github.com/CentralPing/ergo/commit/bb5380416bad848dd74a1722b977ad7fd6c5d93f"
        },
        "date": 1774217775981,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "1a13afafeabc018db65a82acbce31c4c04fa3dec",
          "message": "feat: pipeline v2 — two-accumulator return-value model",
          "timestamp": "2026-03-22T22:16:02Z",
          "url": "https://github.com/CentralPing/ergo/pull/8/commits/1a13afafeabc018db65a82acbce31c4c04fa3dec"
        },
        "date": 1774218788842,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "5d6f3c785ab8c66541290d3479e28e7165e987e0",
          "message": "feat: pipeline v2 — two-accumulator return-value model",
          "timestamp": "2026-03-22T22:16:02Z",
          "url": "https://github.com/CentralPing/ergo/pull/8/commits/5d6f3c785ab8c66541290d3479e28e7165e987e0"
        },
        "date": 1774222166357,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "98ef428a9ab84afb7d47b3cb3cf5d350c7ca5cff",
          "message": "feat: pipeline v2 — two-accumulator return-value model",
          "timestamp": "2026-03-22T22:16:02Z",
          "url": "https://github.com/CentralPing/ergo/pull/8/commits/98ef428a9ab84afb7d47b3cb3cf5d350c7ca5cff"
        },
        "date": 1774223497932,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "350bc37b1f46bb66e908fc046c8f49648d103d15",
          "message": "feat: pipeline v2 — two-accumulator return-value model (#8)\n\n* feat: pipeline v2 — two-accumulator return-value model\n\nReplace the throw-based single-accumulator pipeline with a return-value\ntwo-accumulator model (domainAcc + responseAcc). Middleware now returns\n{value?, response?} instead of throwing httpErrors for expected outcomes.\n\nCore changes:\n- compose.js: add breakWhen predicate to serial(), export accumulator()\n- compose-with.js: two-accumulator flow with [fn, setPath] tuples,\n  {value, response} extraction, mergeResponse(), pipeline break on\n  responseAcc.statusCode\n- send.js: refactored to post-pipeline handler accepting\n  (req, res, responseAcc, domainAcc), RFC 9457 Problem Details formatting,\n  removed headerKeys option, prefer boolean flag\n- handler.js: thin wrapper creating both accumulators per request,\n  simplified catch block, single send() call\n\nMiddleware updates:\n- All rejecting middleware (accepts, authorization, cors, rate-limit,\n  precondition, csrf, validate, json-api-query) return {response: {...}}\n  instead of throwing\n- timeout.js: sets responseAcc.statusCode/detail via closure, calls\n  req.destroy() without error arg\n- Trivial middleware (url, prefer, cookie, logger, security-headers,\n  cache-control, body) return domain values naturally\n- Eliminated rest.pop() pattern — middleware reads full domainAcc\n\nBenchmarked: 9-33% throughput improvement, up to 55% p99 latency\nreduction vs v1, with ergo winning 4/9 scenarios against node-http,\nexpress, fastify, hono, and koa.\n\n* fix: prettier formatting, v2 tuple format in ci-bench and JSDoc example\n\n* fix: purge v1 remnants from JSDoc, functional tests, and CSRF handler\n\n- Update JSDoc across 16 http/ middleware files: replace [fn, [], 'path']\n  tuples with [fn, 'path'], remove send() from compose examples, wrap bare\n  {statusCode, body} returns in {response: {...}}, replace @throws with\n  @returns for HTTP status outcomes\n- Fix csrf.spec.func.js: pass domain accumulator {cookies} instead of raw\n  jar to csrf.issue/verify (was causing server handler crash and test hang)\n- Fix from-connect.spec.func.js: remove createSend() from compose pipelines\n  and createHandler args, wrap returns in {response: {...}}\n- Update lib/from-connect.js JSDoc example for v2 model\n\n* add coverage tests for body error paths and compose-with concurrent merge\n\nCover previously-untested error paths in body.js: malformed Content-Type,\ninvalid Content-Length, missing Content-Length without chunked encoding,\nmalformed JSON, Content-Length mismatch, and non-HTTP error rethrow.\nAdd Object.assign path test for compose-with.all() with plain functions.",
          "timestamp": "2026-03-22T19:53:23-04:00",
          "tree_id": "bfdf4ea557764ff1b15fc4115db584e4cd393ff5",
          "url": "https://github.com/CentralPing/ergo/commit/350bc37b1f46bb66e908fc046c8f49648d103d15"
        },
        "date": 1774223619941,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "81f15e478fa00475d4bc033fd91a69171ae9f999",
          "message": "docs: add benchmark suite for reproducibility",
          "timestamp": "2026-03-22T23:53:29Z",
          "url": "https://github.com/CentralPing/ergo/pull/9/commits/81f15e478fa00475d4bc033fd91a69171ae9f999"
        },
        "date": 1774224501517,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "77676d7bb2e7350e0ff5fc15730b9447a6527552",
          "message": "docs: add benchmark suite for reproducibility",
          "timestamp": "2026-03-22T23:53:29Z",
          "url": "https://github.com/CentralPing/ergo/pull/9/commits/77676d7bb2e7350e0ff5fc15730b9447a6527552"
        },
        "date": 1774224621968,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "4d99112024a7552c9f921a8aa17b581d52a3f072",
          "message": "docs: add benchmark suite for reproducibility",
          "timestamp": "2026-03-22T23:53:29Z",
          "url": "https://github.com/CentralPing/ergo/pull/9/commits/4d99112024a7552c9f921a8aa17b581d52a3f072"
        },
        "date": 1774224756958,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f24776b9a89c98d646c1184d27a6b22a140c6c8d",
          "message": "docs: add benchmark suite for reproducibility (#9)\n\n* docs: add benchmark suite for reproducibility\n\nCommit the full Docker/k6 benchmark suite (scenarios, server\nimplementations, orchestrator, and report generator) so the methodology\nis auditable and reproducible. Result JSON files remain gitignored\nas they are environment-specific point-in-time snapshots.\n\n- Un-ignore benchmarks/{README,run.sh,scenarios/,servers/}\n- Add generate-report.js (9 scenarios, CoV noise analysis, rankings)\n- Remove old benchmarks/report/ directory (superseded)\n- Update benchmarks/README.md with scenarios 08-09 and new paths\n\n* style: fix Prettier formatting in benchmark server files\n\n* ci: exclude benchmarks/ from CodeQL scanning\n\nBenchmark servers are synthetic test harnesses that run in isolated\nDocker containers, never deployed. Spreading request body into JSON\nresponses and permissive CORS are intentional for fair framework\ncomparison — \"fixing\" them would add overhead that biases results.",
          "timestamp": "2026-03-22T20:13:40-04:00",
          "tree_id": "7a20b5f267d0b9bcf88658ea1154ee9e5e02256b",
          "url": "https://github.com/CentralPing/ergo/commit/f24776b9a89c98d646c1184d27a6b22a140c6c8d"
        },
        "date": 1774224834379,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "b803ee6c55d083a3dd4ee55f967dbd843f86d5cc",
          "message": "fix: security hardening pass 3 — compliance and defense in depth",
          "timestamp": "2026-03-23T00:13:44Z",
          "url": "https://github.com/CentralPing/ergo/pull/10/commits/b803ee6c55d083a3dd4ee55f967dbd843f86d5cc"
        },
        "date": 1774267467194,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "b724411d24f1fa304b06793ec6cf24c75b06fe47",
          "message": "fix: security hardening pass 3 — compliance and defense in depth",
          "timestamp": "2026-03-23T00:13:44Z",
          "url": "https://github.com/CentralPing/ergo/pull/10/commits/b724411d24f1fa304b06793ec6cf24c75b06fe47"
        },
        "date": 1774268814640,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "f74ab918e0d8ee3b42d18d30c201bba8313ff938",
          "message": "fix: security hardening pass 3 — compliance and defense in depth",
          "timestamp": "2026-03-23T00:13:44Z",
          "url": "https://github.com/CentralPing/ergo/pull/10/commits/f74ab918e0d8ee3b42d18d30c201bba8313ff938"
        },
        "date": 1774269740526,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f60e6fd20153419166a50ac58d86cfe24aebac36",
          "message": "fix: security hardening pass 3 — compliance and defense in depth (#10)\n\n* fix: security hardening pass 3 — compliance and defense in depth\n\nRemediate 4 High, 7 Medium, and 2 Low severity findings from the\nsecurity audit targeting SOC 2, GDPR, ISO 27001, and FedRAMP readiness.\n\nPhase 1 — Compliance Blockers:\n- H1: Redact internal error messages from 500 responses (handler.js)\n- H2: Guard missing UUID cookie in CSRF verify (csrf.js)\n- H3: Prevent extra keys from overriding core RFC 9457 fields (http-errors.js)\n\nPhase 2 — Security Hardening:\n- M1: Add sensitive header redaction to structured logger (logger.js)\n- M2: Add key cleanup and maxKeys eviction to MemoryStore (rate-limit.js)\n- M3: Expand CTL character stripping in sanitizeQuotedString (RFC 7230)\n- M4: Lock CSRF cookie security attributes against override (csrf.js)\n- M5: Catch invalid charset in body parser (body.js)\n- M11: Wrap send() in error boundary in handler (handler.js)\n- M12: Document Content-Length + Transfer-Encoding coexistence (body.js)\n- H4+M6: Fix multipart boundary check and add maxParts limit (multiparse.js)\n\nPhase 3 — Defense in Depth:\n- L8: Guard zero-length regex matches in execAll (exec-all.js)\n- L9: Validate sameSite attribute in cookie toHeader (cookie.js)\n\n19 files changed (2 new spec files), ~30 new or updated tests.\nAll 757 tests pass. Coverage: 99.55% stmts, 95.5% branches.\n\n* ci: add CodeRabbit configuration for automated PR reviews\n\n* test: cover compressed-body charset validation in readReqStream\n\n* fix: address CodeRabbit review findings\n\nActionable:\n- exec-all: yield before zero-length handling to prevent EOF match\n  drop; make lastIndex advance Unicode-aware for surrogate pairs\n- exec-all spec: replace vacuous assertion with explicit captures\n\nNitpicks:\n- multiparse spec: add maxParts boundary tests (0 and exact match)\n- http-errors spec: assert name field in toJSON protection test\n- logger spec: add immutability assertions for header redaction\n- rate-limit spec: rename test for clarity; use node:test timer mock\n- rate-limit: add FIFO eviction comment; document silent eviction",
          "timestamp": "2026-03-23T08:46:29-04:00",
          "tree_id": "07e52456b25b7a9be8006b5e9c47acdc5c615fcb",
          "url": "https://github.com/CentralPing/ergo/commit/f60e6fd20153419166a50ac58d86cfe24aebac36"
        },
        "date": 1774270009484,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "a33881ac30b87c8af7c4563256c659446ce502f5",
          "message": "docs: add security compliance messaging to README",
          "timestamp": "2026-03-23T12:46:34Z",
          "url": "https://github.com/CentralPing/ergo/pull/11/commits/a33881ac30b87c8af7c4563256c659446ce502f5"
        },
        "date": 1774290943246,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "distinct": true,
          "id": "7f95178705f8cf736498daec2fb5f16d36243b12",
          "message": "ci: enable CodeRabbit auto-approval workflow",
          "timestamp": "2026-03-23T15:14:21-04:00",
          "tree_id": "f925612b5dbac7b903c40bf242a4d7c8adb66bed",
          "url": "https://github.com/CentralPing/ergo/commit/7f95178705f8cf736498daec2fb5f16d36243b12"
        },
        "date": 1774293276861,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.011,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "be852184e09f044673fecd822cb049b1dae5b8e1",
          "message": "docs: add security compliance messaging to README",
          "timestamp": "2026-03-23T19:14:25Z",
          "url": "https://github.com/CentralPing/ergo/pull/11/commits/be852184e09f044673fecd822cb049b1dae5b8e1"
        },
        "date": 1774293464359,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "1f7954b38622148b6682fc43aca9ecda7c56b4fb",
          "message": "ci: add version payload to website dispatch",
          "timestamp": "2026-03-23T19:14:25Z",
          "url": "https://github.com/CentralPing/ergo/pull/13/commits/1f7954b38622148b6682fc43aca9ecda7c56b4fb"
        },
        "date": 1774363917929,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.011,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "77166c5a0b2625163b43162951ef4e502b9f9f51",
          "message": "ci: add version payload to website dispatch (#13)\n\nBoth ci.yml and release.yml now send {package, version} in the\nrepository_dispatch client-payload to centralping.github.io.\n\n- ci.yml: version \"dev\" on push to main\n- release.yml: version from release tag name, dispatched after\n  successful npm publish",
          "timestamp": "2026-03-24T10:57:38-04:00",
          "tree_id": "d9265cebd0f863cfde9593fecdae0dbf19d93d8b",
          "url": "https://github.com/CentralPing/ergo/commit/77166c5a0b2625163b43162951ef4e502b9f9f51"
        },
        "date": 1774364280346,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "758713ce5ba29fc67407427dd9f0a2611c938d76",
          "message": "docs: add security compliance messaging to README",
          "timestamp": "2026-03-23T19:14:25Z",
          "url": "https://github.com/CentralPing/ergo/pull/11/commits/758713ce5ba29fc67407427dd9f0a2611c938d76"
        },
        "date": 1774364328662,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "9e2b78b86dba81e467b184eb72b6d0608c6a635f",
          "message": "docs: add security compliance messaging to README",
          "timestamp": "2026-03-24T14:58:18Z",
          "url": "https://github.com/CentralPing/ergo/pull/11/commits/9e2b78b86dba81e467b184eb72b6d0608c6a635f"
        },
        "date": 1774367736398,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.008,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.011,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5a82219fb71c2309cd83728fb81b6d4f6a43f0ca",
          "message": "docs: add security compliance messaging to README (#11)\n\n* docs: add security compliance messaging to README\n\nAdd \"Secure by default\" bullet to Why ergo section highlighting\nconservative security header defaults, null-prototype objects, and\nbounded input parsing. Expand \"Defense in depth\" bullet. Add OWASP API\nSecurity Top 10 and REST Security Cheat Sheet rows to the Standards\nCompliance table. Add security-related npm keywords.\n\n* docs: soften OWASP wording to avoid implying certification\n\nUse \"Aligned with\" qualifier in Standards Compliance table for OWASP\nentries to make clear these are design alignments, not formal\ncompliance claims.",
          "timestamp": "2026-03-24T11:57:47-04:00",
          "tree_id": "95e71dde7d1062819defdd1baa98535c925ae0ee",
          "url": "https://github.com/CentralPing/ergo/commit/5a82219fb71c2309cd83728fb81b6d4f6a43f0ca"
        },
        "date": 1774367883742,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "efb9098d30439703818ddb81c94c9ef3bccb8bcc",
          "message": "ci: enable CodeRabbit auto-approval on resolved PRs",
          "timestamp": "2026-03-24T15:57:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/14/commits/efb9098d30439703818ddb81c94c9ef3bccb8bcc"
        },
        "date": 1774374667883,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "69c59aa773dfc55d866cf0ef5b0bd6eb46820a1d",
          "message": "ci: enable CodeRabbit auto-approval on resolved PRs",
          "timestamp": "2026-03-24T15:57:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/15/commits/69c59aa773dfc55d866cf0ef5b0bd6eb46820a1d"
        },
        "date": 1774436872728,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "275dd61e0472642d80ec978ca3b9ce7ad7315ae2",
          "message": "ci: enhance CodeRabbit config with assertive profile and path instructions",
          "timestamp": "2026-03-24T15:57:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/16/commits/275dd61e0472642d80ec978ca3b9ce7ad7315ae2"
        },
        "date": 1774442542450,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "66f7ce389f1945f921711a76c7bcb8a67835fd31",
          "message": "ci: enhance CodeRabbit config with assertive profile and path instructions",
          "timestamp": "2026-03-24T15:57:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/16/commits/66f7ce389f1945f921711a76c7bcb8a67835fd31"
        },
        "date": 1774445041618,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "a1c845351f7604265f0c479af21416b620c22c93",
          "message": "ci: enhance CodeRabbit config with assertive profile and path instructions",
          "timestamp": "2026-03-24T15:57:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/16/commits/a1c845351f7604265f0c479af21416b620c22c93"
        },
        "date": 1774448480003,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "fdc94ec86e4dcb99e9e9f3c78f3b11d7c7c5da54",
          "message": "ci: enhance CodeRabbit config with assertive profile and path instructions",
          "timestamp": "2026-03-24T15:57:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/16/commits/fdc94ec86e4dcb99e9e9f3c78f3b11d7c7c5da54"
        },
        "date": 1774451038044,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d90f74dae8d4e77466f084171d430fd23123765e",
          "message": "ci: enhance CodeRabbit config with assertive profile and path instructions (#16)\n\n* ci: enhance CodeRabbit config with assertive profile and path instructions\n\n- Switch profile from chill to assertive for security-critical reviews\n- Add tone_instructions focused on RFC compliance and Fast Fail contract\n- Add path_instructions for lib/ (shared primitives), http/ (middleware),\n  and utils/ (low-level utilities)\n- Enable sequence_diagrams, review_details, related_issues/PRs,\n  effort estimation\n- Add linked_repositories for ergo-router and json-api-query\n- Add knowledge_base with auto-scoped learnings\n\n* ci: generalize http path instruction to contract language\n\nReplace internal symbol reference (responseAcc.statusCode) with\ncontract-focused guidance per CodeRabbit review feedback.\n\n* ci: trigger CodeRabbit re-review",
          "timestamp": "2026-03-25T11:34:35-04:00",
          "tree_id": "f208fbc20453f46c46aa765af61ef8c918efa943",
          "url": "https://github.com/CentralPing/ergo/commit/d90f74dae8d4e77466f084171d430fd23123765e"
        },
        "date": 1774452895752,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "8934655f54b685bf728f62da86a00214e199a24f",
          "message": "build(deps): Bump codecov/codecov-action from 5.5.3 to 6.0.0",
          "timestamp": "2026-03-25T15:37:45Z",
          "url": "https://github.com/CentralPing/ergo/pull/17/commits/8934655f54b685bf728f62da86a00214e199a24f"
        },
        "date": 1774647364101,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.027,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "9f5dab876fa707ca8ade20d00d199dc76beb7019",
          "message": "build(deps): Bump github/codeql-action from 4.34.1 to 4.35.1",
          "timestamp": "2026-03-25T15:37:45Z",
          "url": "https://github.com/CentralPing/ergo/pull/18/commits/9f5dab876fa707ca8ade20d00d199dc76beb7019"
        },
        "date": 1774647385956,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1b44605f1b34a481688dd10368c5c5468f7cd6f6",
          "message": "build(deps): Bump codecov/codecov-action from 5.5.3 to 6.0.0 (#17)\n\nBumps [codecov/codecov-action](https://github.com/codecov/codecov-action) from 5.5.3 to 6.0.0.\n- [Release notes](https://github.com/codecov/codecov-action/releases)\n- [Changelog](https://github.com/codecov/codecov-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/codecov/codecov-action/compare/1af58845a975a7985b0beb0cbe6fbbb71a41dbad...57e3a136b779b570ffcdbf80b3bdc90e7fab3de2)\n\n---\nupdated-dependencies:\n- dependency-name: codecov/codecov-action\n  dependency-version: 6.0.0\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-03-29T12:06:39-04:00",
          "tree_id": "3ba5ea1877c3ba35dc5a7a7f26a2c9e99ec64ec9",
          "url": "https://github.com/CentralPing/ergo/commit/1b44605f1b34a481688dd10368c5c5468f7cd6f6"
        },
        "date": 1774800419657,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.018,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.009,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.011,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "465184dadddd6816221ec9a5b554abd91e1a41e9",
          "message": "build(deps): Bump github/codeql-action from 4.34.1 to 4.35.1",
          "timestamp": "2026-03-29T16:06:43Z",
          "url": "https://github.com/CentralPing/ergo/pull/18/commits/465184dadddd6816221ec9a5b554abd91e1a41e9"
        },
        "date": 1774800455258,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5b7ada9f217f7e055a911c1604bdc7d1098a3669",
          "message": "build(deps): Bump github/codeql-action from 4.34.1 to 4.35.1 (#18)\n\nBumps [github/codeql-action](https://github.com/github/codeql-action) from 4.34.1 to 4.35.1.\n- [Release notes](https://github.com/github/codeql-action/releases)\n- [Changelog](https://github.com/github/codeql-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/github/codeql-action/compare/38697555549f1db7851b81482ff19f1fa5c4fedc...c10b8064de6f491fea524254123dbe5e09572f13)\n\n---\nupdated-dependencies:\n- dependency-name: github/codeql-action\n  dependency-version: 4.35.1\n  dependency-type: direct:production\n  update-type: version-update:semver-minor\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Jason Cust <JasonCust@users.noreply.github.com>",
          "timestamp": "2026-03-29T12:08:40-04:00",
          "tree_id": "6bffe6f0a2784bc57b2fb54f44e1ff800a8a317f",
          "url": "https://github.com/CentralPing/ergo/commit/5b7ada9f217f7e055a911c1604bdc7d1098a3669"
        },
        "date": 1774800538003,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "a69dcf22fdc2b1fb71f0ad557301f2cb070a8328",
          "message": "build(deps): Bump benchmark-action/github-action-benchmark from 1.21.0 to 1.22.0",
          "timestamp": "2026-03-29T16:08:43Z",
          "url": "https://github.com/CentralPing/ergo/pull/19/commits/a69dcf22fdc2b1fb71f0ad557301f2cb070a8328"
        },
        "date": 1775252137872,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "39cdeb29d7c950df06166e65ecb9a41242089856",
          "message": "build(deps-dev): Bump undici from 7.24.7 to 8.0.1 in the dev-dependencies group",
          "timestamp": "2026-03-29T16:08:43Z",
          "url": "https://github.com/CentralPing/ergo/pull/20/commits/39cdeb29d7c950df06166e65ecb9a41242089856"
        },
        "date": 1775252162774,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.018,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "83cec1cfeaa75dce4a891d3365e6b6160ee37fd5",
          "message": "build(deps): Bump benchmark-action/github-action-benchmark (#19)\n\nBumps [benchmark-action/github-action-benchmark](https://github.com/benchmark-action/github-action-benchmark) from 1.21.0 to 1.22.0.\n- [Release notes](https://github.com/benchmark-action/github-action-benchmark/releases)\n- [Changelog](https://github.com/benchmark-action/github-action-benchmark/blob/master/CHANGELOG.md)\n- [Commits](https://github.com/benchmark-action/github-action-benchmark/compare/a7bc2366eda11037936ea57d811a43b3418d3073...a60cea5bc7b49e15c1f58f411161f99e0df48372)\n\n---\nupdated-dependencies:\n- dependency-name: benchmark-action/github-action-benchmark\n  dependency-version: 1.22.0\n  dependency-type: direct:production\n  update-type: version-update:semver-minor\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-04-06T11:15:09-04:00",
          "tree_id": "6d74c83365cc5a81845705c92e00dbebc7c18f3b",
          "url": "https://github.com/CentralPing/ergo/commit/83cec1cfeaa75dce4a891d3365e6b6160ee37fd5"
        },
        "date": 1775488526191,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "95e4cafb0f47e213534a0a2682761499411e8661",
          "message": "build(deps-dev): Bump undici from 7.24.7 to 8.0.1 in the dev-dependencies group",
          "timestamp": "2026-03-29T16:08:43Z",
          "url": "https://github.com/CentralPing/ergo/pull/20/commits/95e4cafb0f47e213534a0a2682761499411e8661"
        },
        "date": 1775488555024,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c00c9656379b544ec8886796f5608f6ca5b88033",
          "message": "build(deps-dev): Bump undici in the dev-dependencies group (#20)\n\nBumps the dev-dependencies group with 1 update: [undici](https://github.com/nodejs/undici).\n\n\nUpdates `undici` from 7.24.7 to 8.0.1\n- [Release notes](https://github.com/nodejs/undici/releases)\n- [Commits](https://github.com/nodejs/undici/compare/v7.24.7...v8.0.1)\n\n---\nupdated-dependencies:\n- dependency-name: undici\n  dependency-version: 8.0.1\n  dependency-type: direct:development\n  update-type: version-update:semver-major\n  dependency-group: dev-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Jason Cust <JasonCust@users.noreply.github.com>",
          "timestamp": "2026-04-06T11:16:47-04:00",
          "tree_id": "9ef6c1319dbbedb0ff695bee06f75993044b15dc",
          "url": "https://github.com/CentralPing/ergo/commit/c00c9656379b544ec8886796f5608f6ca5b88033"
        },
        "date": 1775488624569,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.017,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "95978330f6345d7737d3d884693d6f244946a2de",
          "message": "build(deps): Bump github/codeql-action from 4.35.1 to 4.35.2",
          "timestamp": "2026-04-06T15:16:56Z",
          "url": "https://github.com/CentralPing/ergo/pull/21/commits/95978330f6345d7737d3d884693d6f244946a2de"
        },
        "date": 1776461794970,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "e8e5da54a30ac5a9dbf09f489568c60bb3a0fa30",
          "message": "build(deps): Bump actions/setup-node from 6.3.0 to 6.4.0",
          "timestamp": "2026-04-06T15:16:56Z",
          "url": "https://github.com/CentralPing/ergo/pull/22/commits/e8e5da54a30ac5a9dbf09f489568c60bb3a0fa30"
        },
        "date": 1777066570380,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "59cb93f2374caa334f3f6e2a95d7039c3575f0c5",
          "message": "build(deps): Bump actions/setup-node from 6.3.0 to 6.4.0 (#22)\n\nBumps [actions/setup-node](https://github.com/actions/setup-node) from 6.3.0 to 6.4.0.\n- [Release notes](https://github.com/actions/setup-node/releases)\n- [Commits](https://github.com/actions/setup-node/compare/53b83947a5a98c8d113130e565377fae1a50d02f...48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e)\n\n---\nupdated-dependencies:\n- dependency-name: actions/setup-node\n  dependency-version: 6.4.0\n  dependency-type: direct:production\n  update-type: version-update:semver-minor\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-04-28T08:43:44-04:00",
          "tree_id": "b2b9572f4c9714a3155bf871f5d862acdfa04df0",
          "url": "https://github.com/CentralPing/ergo/commit/59cb93f2374caa334f3f6e2a95d7039c3575f0c5"
        },
        "date": 1777380242302,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.008,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "1e211bc7961315efd29f6b0ff42fc4933180d676",
          "message": "build(deps): Bump github/codeql-action from 4.35.1 to 4.35.2",
          "timestamp": "2026-04-28T12:43:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/21/commits/1e211bc7961315efd29f6b0ff42fc4933180d676"
        },
        "date": 1777380292779,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "73f04231593e334059aed270e8f710d550e1e8c3",
          "message": "build(deps): Bump github/codeql-action from 4.35.1 to 4.35.2 (#21)\n\nBumps [github/codeql-action](https://github.com/github/codeql-action) from 4.35.1 to 4.35.2.\n- [Release notes](https://github.com/github/codeql-action/releases)\n- [Changelog](https://github.com/github/codeql-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/github/codeql-action/compare/c10b8064de6f491fea524254123dbe5e09572f13...95e58e9a2cdfd71adc6e0353d5c52f41a045d225)\n\n---\nupdated-dependencies:\n- dependency-name: github/codeql-action\n  dependency-version: 4.35.2\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Jason Cust <JasonCust@users.noreply.github.com>",
          "timestamp": "2026-04-28T12:45:37Z",
          "tree_id": "6dfe4524dbcc415c98e053aa9d517aaa51591be9",
          "url": "https://github.com/CentralPing/ergo/commit/73f04231593e334059aed270e8f710d550e1e8c3"
        },
        "date": 1777380354637,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "8e1da773ce67c02969fe9a831abfa7029fd56230",
          "message": "build(deps): Bump github/codeql-action from 4.35.2 to 4.35.3",
          "timestamp": "2026-04-28T12:45:43Z",
          "url": "https://github.com/CentralPing/ergo/pull/23/commits/8e1da773ce67c02969fe9a831abfa7029fd56230"
        },
        "date": 1777683974777,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.029,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.009,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6f0281184f47d320e9b450182fcb8181f90dae9a",
          "message": "build(deps): Bump github/codeql-action from 4.35.2 to 4.35.3 (#23)\n\nBumps [github/codeql-action](https://github.com/github/codeql-action) from 4.35.2 to 4.35.3.\n- [Release notes](https://github.com/github/codeql-action/releases)\n- [Changelog](https://github.com/github/codeql-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/github/codeql-action/compare/95e58e9a2cdfd71adc6e0353d5c52f41a045d225...e46ed2cbd01164d986452f91f178727624ae40d7)\n\n---\nupdated-dependencies:\n- dependency-name: github/codeql-action\n  dependency-version: 4.35.3\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-05-02T12:17:25-04:00",
          "tree_id": "34c29a884e8a86e80de7b96e7b88084692cffc4f",
          "url": "https://github.com/CentralPing/ergo/commit/6f0281184f47d320e9b450182fcb8181f90dae9a"
        },
        "date": 1777738660082,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "9163afa117a3a51a0f6aa626f77fd900820cc7a6",
          "message": "build(deps): Bump benchmark-action/github-action-benchmark from 1.22.0 to 1.22.1",
          "timestamp": "2026-05-02T16:17:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/24/commits/9163afa117a3a51a0f6aa626f77fd900820cc7a6"
        },
        "date": 1778276194495,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.016,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.004,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.007,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "fe6d6ff43545900eb22a1fc46f1f82b47f4e821b",
          "message": "build(deps): Bump github/codeql-action from 4.35.3 to 4.35.4",
          "timestamp": "2026-05-02T16:17:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/25/commits/fe6d6ff43545900eb22a1fc46f1f82b47f4e821b"
        },
        "date": 1778276213307,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.016,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.004,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.006,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "45a213c727d1b9d6c839069f9dc34afe015b099b",
          "message": "build(deps-dev): Bump lint-staged from 16.4.0 to 17.0.3 in the dev-dependencies group",
          "timestamp": "2026-05-02T16:17:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/26/commits/45a213c727d1b9d6c839069f9dc34afe015b099b"
        },
        "date": 1778276213926,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "e662b13990347f20a0742749f3c86e4f52ec8d71",
          "message": "build(deps): Bump github/codeql-action from 4.35.3 to 4.35.5",
          "timestamp": "2026-05-02T16:17:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/27/commits/e662b13990347f20a0742749f3c86e4f52ec8d71"
        },
        "date": 1778881016759,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "affaf458181fd26fda1f9f32e9a8ee96b25f153c",
          "message": "build(deps): Bump content-type from 1.0.5 to 2.0.0 in the production-dependencies group",
          "timestamp": "2026-05-02T16:17:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/28/commits/affaf458181fd26fda1f9f32e9a8ee96b25f153c"
        },
        "date": 1778881020725,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "0616c5ad59da03c38c03086f180366da4a0d492e",
          "message": "build(deps-dev): Bump lint-staged from 16.4.0 to 17.0.3 in the dev-dependencies group",
          "timestamp": "2026-05-20T16:41:09Z",
          "url": "https://github.com/CentralPing/ergo/pull/26/commits/0616c5ad59da03c38c03086f180366da4a0d492e"
        },
        "date": 1779295308045,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a2bb54fb9f2c3a117736164e38c5c308d1bc462d",
          "message": "build(deps): Bump benchmark-action/github-action-benchmark (#24)\n\nBumps [benchmark-action/github-action-benchmark](https://github.com/benchmark-action/github-action-benchmark) from 1.22.0 to 1.22.1.\n- [Release notes](https://github.com/benchmark-action/github-action-benchmark/releases)\n- [Changelog](https://github.com/benchmark-action/github-action-benchmark/blob/master/CHANGELOG.md)\n- [Commits](https://github.com/benchmark-action/github-action-benchmark/compare/a60cea5bc7b49e15c1f58f411161f99e0df48372...52576c92bccf6ac60c8223ec7eb2565637cae9ba)\n\n---\nupdated-dependencies:\n- dependency-name: benchmark-action/github-action-benchmark\n  dependency-version: 1.22.1\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-05-20T12:41:03-04:00",
          "tree_id": "bc56d84f11610c934521dbc805be2077042ee74a",
          "url": "https://github.com/CentralPing/ergo/commit/a2bb54fb9f2c3a117736164e38c5c308d1bc462d"
        },
        "date": 1779295316217,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5c3410461c02949ae9a37584f0b73d0eb29f1b36",
          "message": "build(deps-dev): Bump lint-staged in the dev-dependencies group (#26)\n\nBumps the dev-dependencies group with 1 update: [lint-staged](https://github.com/lint-staged/lint-staged).\n\n\nUpdates `lint-staged` from 16.4.0 to 17.0.3\n- [Release notes](https://github.com/lint-staged/lint-staged/releases)\n- [Changelog](https://github.com/lint-staged/lint-staged/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/lint-staged/lint-staged/compare/v16.4.0...v17.0.3)\n\n---\nupdated-dependencies:\n- dependency-name: lint-staged\n  dependency-version: 17.0.3\n  dependency-type: direct:development\n  update-type: version-update:semver-major\n  dependency-group: dev-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-05-20T16:42:35Z",
          "tree_id": "ebe145f5232aa14ca933317ed0546b34e60fec9c",
          "url": "https://github.com/CentralPing/ergo/commit/5c3410461c02949ae9a37584f0b73d0eb29f1b36"
        },
        "date": 1779295390560,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "f861402bb785951e1c813dd747aedf5a0907e333",
          "message": "build(deps): Bump github/codeql-action from 4.35.3 to 4.35.5",
          "timestamp": "2026-05-20T16:41:09Z",
          "url": "https://github.com/CentralPing/ergo/pull/27/commits/f861402bb785951e1c813dd747aedf5a0907e333"
        },
        "date": 1779295403258,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.016,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.004,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.006,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "70b74fadebdaf9c132dbdc07699b26baab5a9cb7",
          "message": "build(deps): Bump content-type from 1.0.5 to 2.0.0 in the production-dependencies group across 1 directory",
          "timestamp": "2026-05-20T16:42:41Z",
          "url": "https://github.com/CentralPing/ergo/pull/28/commits/70b74fadebdaf9c132dbdc07699b26baab5a9cb7"
        },
        "date": 1779295522856,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.018,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.014,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "eee71efa903af3f1ff5c011696318ec143c99e74",
          "message": "chore: migrate to @centralping/ergo namespace",
          "timestamp": "2026-05-20T16:42:41Z",
          "url": "https://github.com/CentralPing/ergo/pull/29/commits/eee71efa903af3f1ff5c011696318ec143c99e74"
        },
        "date": 1779297857270,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "dc1721cc5ce21733fe398819594f4480bcf0caca",
          "message": "chore: migrate to @centralping/ergo namespace (#29)\n\n- Rename package from 'ergo' to '@centralping/ergo'\n- Add publishConfig with public access\n- Commit package-lock.json (enables npm ci, improves OpenSSF score)\n- Update CI workflows to use npm ci\n- Update benchmark server dependencies and imports\n- Update repository dispatch payloads",
          "timestamp": "2026-05-20T13:35:59-04:00",
          "tree_id": "fd015e16436a1b9a7764a44413344260ea067819",
          "url": "https://github.com/CentralPing/ergo/commit/dc1721cc5ce21733fe398819594f4480bcf0caca"
        },
        "date": 1779298589223,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "fba7d137246430a7f34759f9caf8fd01da0510fe",
          "message": "build(deps): Bump the production-dependencies group across 1 directory with 2 updates",
          "timestamp": "2026-05-20T17:36:05Z",
          "url": "https://github.com/CentralPing/ergo/pull/30/commits/fba7d137246430a7f34759f9caf8fd01da0510fe"
        },
        "date": 1779298722347,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "859d842ea910bc5dee3662da0af9f13c6b916513",
          "message": "build(deps): Bump github/codeql-action from 4.35.3 to 4.35.5",
          "timestamp": "2026-05-20T17:36:05Z",
          "url": "https://github.com/CentralPing/ergo/pull/27/commits/859d842ea910bc5dee3662da0af9f13c6b916513"
        },
        "date": 1779298772299,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.011,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bdd175e9b049bb2ad905bf3703342df74a707482",
          "message": "build(deps): Bump github/codeql-action from 4.35.3 to 4.35.5 (#27)\n\nBumps [github/codeql-action](https://github.com/github/codeql-action) from 4.35.3 to 4.35.5.\n- [Release notes](https://github.com/github/codeql-action/releases)\n- [Changelog](https://github.com/github/codeql-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/github/codeql-action/compare/e46ed2cbd01164d986452f91f178727624ae40d7...9e0d7b8d25671d64c341c19c0152d693099fb5ba)\n\n---\nupdated-dependencies:\n- dependency-name: github/codeql-action\n  dependency-version: 4.35.5\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-05-20T17:40:19Z",
          "tree_id": "9c9626d2077162f609b298517fddb1acd1be124a",
          "url": "https://github.com/CentralPing/ergo/commit/bdd175e9b049bb2ad905bf3703342df74a707482"
        },
        "date": 1779298837989,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "873f33fd171581374d408f0081f2c74e06ebf157",
          "message": "build(deps): Bump the production-dependencies group across 1 directory with 2 updates",
          "timestamp": "2026-05-20T17:40:25Z",
          "url": "https://github.com/CentralPing/ergo/pull/30/commits/873f33fd171581374d408f0081f2c74e06ebf157"
        },
        "date": 1779298851510,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "31ba5db4efe727b440b6acff9141c17051bdc02f",
          "message": "docs: update README with @centralping/ergo namespace",
          "timestamp": "2026-05-20T17:40:25Z",
          "url": "https://github.com/CentralPing/ergo/pull/31/commits/31ba5db4efe727b440b6acff9141c17051bdc02f"
        },
        "date": 1779299210145,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.018,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "19f6538d104049f568a535bd3dc589c0674302b7",
          "message": "build(deps): Bump the production-dependencies group across 1 directory with 2 updates (#30)\n\nBumps the production-dependencies group with 2 updates in the / directory: [ajv](https://github.com/ajv-validator/ajv) and [content-type](https://github.com/jshttp/content-type).\n\n\nUpdates `ajv` from 8.18.0 to 8.20.0\n- [Release notes](https://github.com/ajv-validator/ajv/releases)\n- [Commits](https://github.com/ajv-validator/ajv/compare/v8.18.0...v8.20.0)\n\nUpdates `content-type` from 1.0.5 to 2.0.0\n- [Release notes](https://github.com/jshttp/content-type/releases)\n- [Changelog](https://github.com/jshttp/content-type/blob/master/HISTORY.md)\n- [Commits](https://github.com/jshttp/content-type/compare/v1.0.5...v2.0.0)\n\n---\nupdated-dependencies:\n- dependency-name: ajv\n  dependency-version: 8.20.0\n  dependency-type: direct:production\n  update-type: version-update:semver-minor\n  dependency-group: production-dependencies\n- dependency-name: content-type\n  dependency-version: 2.0.0\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n  dependency-group: production-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Jason Cust <JasonCust@users.noreply.github.com>",
          "timestamp": "2026-05-20T13:47:13-04:00",
          "tree_id": "3cce7101eb836c3b76b7ce0283e836b9eeab3b98",
          "url": "https://github.com/CentralPing/ergo/commit/19f6538d104049f568a535bd3dc589c0674302b7"
        },
        "date": 1779299292938,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "4c98dcc2f182e47b13a3ca0c775955808c4346c9",
          "message": "docs: update README with @centralping/ergo namespace",
          "timestamp": "2026-05-20T17:47:18Z",
          "url": "https://github.com/CentralPing/ergo/pull/31/commits/4c98dcc2f182e47b13a3ca0c775955808c4346c9"
        },
        "date": 1779299308065,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "678e3ca0f3907b9a7612f35dc70a9494d297daa0",
          "message": "docs: update README with @centralping/ergo namespace (#31)",
          "timestamp": "2026-05-20T13:47:33-04:00",
          "tree_id": "3ca57a6a95506c99a6dcd34b827b8bfbb102d40e",
          "url": "https://github.com/CentralPing/ergo/commit/678e3ca0f3907b9a7612f35dc70a9494d297daa0"
        },
        "date": 1779299326678,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "75ef6f6a21f95e6e32c1dd5ee93783a7d3d0e723",
          "message": "docs: namespace audit — fix JSDoc imports, README Quick Start, stale links (#34)",
          "timestamp": "2026-05-20T18:30:59Z",
          "url": "https://github.com/CentralPing/ergo/pull/35/commits/75ef6f6a21f95e6e32c1dd5ee93783a7d3d0e723"
        },
        "date": 1779310482141,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "ff06347618149ef7c9201bf695f4a683bac43a63",
          "message": "docs: namespace audit — fix JSDoc imports, README Quick Start, stale links (#34)",
          "timestamp": "2026-05-20T18:30:59Z",
          "url": "https://github.com/CentralPing/ergo/pull/35/commits/ff06347618149ef7c9201bf695f4a683bac43a63"
        },
        "date": 1779335169475,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.01,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.011,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4a74df45e7456079a00f9fa6a828906c17f84ae2",
          "message": "docs: namespace audit — fix JSDoc imports, README Quick Start, stale links (#34) (#35)\n\nBulk-update all 63 JSDoc @example imports from bare 'ergo' to '@centralping/ergo'.\nFix @module tag in http/main.js. Drop per-module @version tags (kept at entry point only).\n\nFix README Quick Start for v2 compose API:\n- [fn, setPath] tuples (not 3-element)\n- v2 return shape {response: {...}}\n- handler(pipeline) without send() arg\n- Remove unused send import\n\nFix broken doc links (/api/ergo/ -> /packages/ergo/).\nUpdate DECISIONS.md for scoped npm identity and resolved publishing status.\nRegenerate package-lock.json to sync version 0.1.0-beta.1.",
          "timestamp": "2026-05-21T03:48:33Z",
          "tree_id": "73fc76e7bdb287edf1fc92f761a7e821d421ec3e",
          "url": "https://github.com/CentralPing/ergo/commit/4a74df45e7456079a00f9fa6a828906c17f84ae2"
        },
        "date": 1779335328265,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.008,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "9b4bc8e174f97b892f9ab89494d0beac9152d189",
          "message": "docs: fix package.json homepage and README URLs for npm rendering (#36)",
          "timestamp": "2026-05-21T03:48:38Z",
          "url": "https://github.com/CentralPing/ergo/pull/38/commits/9b4bc8e174f97b892f9ab89494d0beac9152d189"
        },
        "date": 1779384917433,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.018,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6a935934171e6967d70a1b0e4ef18ff40eb331f9",
          "message": "docs: fix package.json homepage and README URLs for npm rendering (#36) (#38)\n\n- Update homepage to point to documentation site instead of GitHub repo\n- Convert README logo images to absolute raw.githubusercontent.com URLs\n  so they render correctly on npm (relative paths only work on GitHub)\n- Convert LICENSE badge to absolute GitHub URL",
          "timestamp": "2026-05-21T20:54:06-04:00",
          "tree_id": "66a4e9c44580617463ad1d4f942a52679b05f7dc",
          "url": "https://github.com/CentralPing/ergo/commit/6a935934171e6967d70a1b0e4ef18ff40eb331f9"
        },
        "date": 1779411262132,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "77b7add25cb195c84820116642bc51fb7e904252",
          "message": "docs: enrich API overview JSDoc for TypeDoc landing page (#37)",
          "timestamp": "2026-05-22T00:54:11Z",
          "url": "https://github.com/CentralPing/ergo/pull/39/commits/77b7add25cb195c84820116642bc51fb7e904252"
        },
        "date": 1779413024639,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.03,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "64a13a485fd4526da00946fb36d92860e8e70b93",
          "message": "build(deps): Bump codecov/codecov-action from 6.0.0 to 6.0.1",
          "timestamp": "2026-05-22T00:54:11Z",
          "url": "https://github.com/CentralPing/ergo/pull/44/commits/64a13a485fd4526da00946fb36d92860e8e70b93"
        },
        "date": 1779485800040,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "4c83e411d4653744389c7ebdc506f33f1cc72854",
          "message": "build(deps-dev): Bump the dev-dependencies group with 3 updates",
          "timestamp": "2026-05-22T00:54:11Z",
          "url": "https://github.com/CentralPing/ergo/pull/46/commits/4c83e411d4653744389c7ebdc506f33f1cc72854"
        },
        "date": 1779485823446,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "41b985bf47978cc00586dacdfe3a23e178cea3c5",
          "message": "build(deps): Bump github/codeql-action from 4.35.5 to 4.36.0",
          "timestamp": "2026-05-22T00:54:11Z",
          "url": "https://github.com/CentralPing/ergo/pull/45/commits/41b985bf47978cc00586dacdfe3a23e178cea3c5"
        },
        "date": 1779485825887,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.017,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.007,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6cf01959385f9e7d257aa40e6812bc68fac0802e",
          "message": "docs: enrich API overview JSDoc for TypeDoc landing page (#37) (#39)",
          "timestamp": "2026-05-23T14:33:43-04:00",
          "tree_id": "037b40c10195e69f056dba11636000b783ed191e",
          "url": "https://github.com/CentralPing/ergo/commit/6cf01959385f9e7d257aa40e6812bc68fac0802e"
        },
        "date": 1779561235921,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "7bdc21949425f5d1f7a9a1357d7077603111e407",
          "message": "build(deps): Bump codecov/codecov-action from 6.0.0 to 6.0.1",
          "timestamp": "2026-05-23T18:33:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/44/commits/7bdc21949425f5d1f7a9a1357d7077603111e407"
        },
        "date": 1779561249262,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.009,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.012,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "62b93c6714cdfd2bf9ed539fddce8abeb1976bc0",
          "message": "build(deps): Bump codecov/codecov-action from 6.0.0 to 6.0.1 (#44)\n\nBumps [codecov/codecov-action](https://github.com/codecov/codecov-action) from 6.0.0 to 6.0.1.\n- [Release notes](https://github.com/codecov/codecov-action/releases)\n- [Changelog](https://github.com/codecov/codecov-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/codecov/codecov-action/compare/57e3a136b779b570ffcdbf80b3bdc90e7fab3de2...e79a6962e0d4c0c17b229090214935d2e33f8354)\n\n---\nupdated-dependencies:\n- dependency-name: codecov/codecov-action\n  dependency-version: 6.0.1\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Jason Cust <JasonCust@users.noreply.github.com>",
          "timestamp": "2026-05-23T18:34:53Z",
          "tree_id": "55a16702e3116c3852bc172fa1829c2eb5e9610d",
          "url": "https://github.com/CentralPing/ergo/commit/62b93c6714cdfd2bf9ed539fddce8abeb1976bc0"
        },
        "date": 1779561307989,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "37d44a3d6edcf0c3fd567d851616bf85835f337e",
          "message": "build(deps): Bump github/codeql-action from 4.35.5 to 4.36.0",
          "timestamp": "2026-05-23T18:34:57Z",
          "url": "https://github.com/CentralPing/ergo/pull/45/commits/37d44a3d6edcf0c3fd567d851616bf85835f337e"
        },
        "date": 1779561384758,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "00e68b79780ca8201467f9221cf2023841aa3526",
          "message": "build(deps): Bump github/codeql-action from 4.35.5 to 4.36.0 (#45)\n\nBumps [github/codeql-action](https://github.com/github/codeql-action) from 4.35.5 to 4.36.0.\n- [Release notes](https://github.com/github/codeql-action/releases)\n- [Changelog](https://github.com/github/codeql-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/github/codeql-action/compare/9e0d7b8d25671d64c341c19c0152d693099fb5ba...7211b7c8077ea37d8641b6271f6a365a22a5fbfa)\n\n---\nupdated-dependencies:\n- dependency-name: github/codeql-action\n  dependency-version: 4.36.0\n  dependency-type: direct:production\n  update-type: version-update:semver-minor\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Jason Cust <JasonCust@users.noreply.github.com>",
          "timestamp": "2026-05-23T18:37:12Z",
          "tree_id": "cb63d7cfa2d99c0005c2350f8c5a44118961747c",
          "url": "https://github.com/CentralPing/ergo/commit/00e68b79780ca8201467f9221cf2023841aa3526"
        },
        "date": 1779561443353,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "3fa8d4e135623a52659a2a639dba8862d339f2ab",
          "message": "build(deps-dev): Bump the dev-dependencies group with 3 updates",
          "timestamp": "2026-05-23T18:37:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/46/commits/3fa8d4e135623a52659a2a639dba8862d339f2ab"
        },
        "date": 1779562369029,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8cefd3dfb5d5d17966e7825d02e9dd4a9bef3770",
          "message": "build(deps-dev): Bump the dev-dependencies group with 3 updates (#46)\n\nBumps the dev-dependencies group with 3 updates: [eslint](https://github.com/eslint/eslint), [globals](https://github.com/sindresorhus/globals) and [prettier](https://github.com/prettier/prettier).\n\n\nUpdates `eslint` from 10.0.3 to 10.4.0\n- [Release notes](https://github.com/eslint/eslint/releases)\n- [Commits](https://github.com/eslint/eslint/compare/v10.0.3...v10.4.0)\n\nUpdates `globals` from 17.4.0 to 17.6.0\n- [Release notes](https://github.com/sindresorhus/globals/releases)\n- [Commits](https://github.com/sindresorhus/globals/compare/v17.4.0...v17.6.0)\n\nUpdates `prettier` from 3.8.1 to 3.8.3\n- [Release notes](https://github.com/prettier/prettier/releases)\n- [Changelog](https://github.com/prettier/prettier/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/prettier/prettier/compare/3.8.1...3.8.3)\n\n---\nupdated-dependencies:\n- dependency-name: eslint\n  dependency-version: 10.4.0\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: dev-dependencies\n- dependency-name: globals\n  dependency-version: 17.6.0\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: dev-dependencies\n- dependency-name: prettier\n  dependency-version: 3.8.3\n  dependency-type: direct:development\n  update-type: version-update:semver-patch\n  dependency-group: dev-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-05-23T18:53:34Z",
          "tree_id": "cbdab56d6f0d3a864d78698e959390a368e7c232",
          "url": "https://github.com/CentralPing/ergo/commit/8cefd3dfb5d5d17966e7825d02e9dd4a9bef3770"
        },
        "date": 1779640356946,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.013,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "6d20bdefe5bcf1d3d332a2925f837301cf9d41cd",
          "message": "fix: update fast-uri to 3.1.2 (CVE remediation) (#43)",
          "timestamp": "2026-05-23T18:53:39Z",
          "url": "https://github.com/CentralPing/ergo/pull/47/commits/6d20bdefe5bcf1d3d332a2925f837301cf9d41cd"
        },
        "date": 1779819100803,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "611c0e805796b73a8bff968aeb5e832a5b7d7e73",
          "message": "fix: prevent cookie jar DoS via reserved property name collision (#42)",
          "timestamp": "2026-05-23T18:53:39Z",
          "url": "https://github.com/CentralPing/ergo/pull/48/commits/611c0e805796b73a8bff968aeb5e832a5b7d7e73"
        },
        "date": 1779819254417,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "83ee0023b2e0efba12f675f9ee5f3eeee98a66f5",
          "message": "fix: update fast-uri to 3.1.2 (CVE remediation) (#43) (#47)",
          "timestamp": "2026-05-26T14:16:51-04:00",
          "tree_id": "1d9c21c8de5cc66fa9fe63a669cc9f6105220364",
          "url": "https://github.com/CentralPing/ergo/commit/83ee0023b2e0efba12f675f9ee5f3eeee98a66f5"
        },
        "date": 1779819427437,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "47270d32963e0b8ca9eb8766275e629a9759ff64",
          "message": "fix: prevent cookie jar DoS via reserved property name collision (#42)",
          "timestamp": "2026-05-23T18:53:39Z",
          "url": "https://github.com/CentralPing/ergo/pull/48/commits/47270d32963e0b8ca9eb8766275e629a9759ff64"
        },
        "date": 1779819436490,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ebe0b15d292aa5cac26185e5867613cef6649128",
          "message": "fix: prevent cookie jar DoS via reserved property name collision (#42) (#48)",
          "timestamp": "2026-05-26T22:45:04Z",
          "tree_id": "fc30dcc1466f69a0584bf7e0bd97620d430ac9ce",
          "url": "https://github.com/CentralPing/ergo/commit/ebe0b15d292aa5cac26185e5867613cef6649128"
        },
        "date": 1779835518555,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "302f17359436e96b042236810b4fc7491dfc72d9",
          "message": "chore: bump version to 0.1.0-beta.2",
          "timestamp": "2026-05-26T22:45:09Z",
          "url": "https://github.com/CentralPing/ergo/pull/49/commits/302f17359436e96b042236810b4fc7491dfc72d9"
        },
        "date": 1779885534377,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6c2049cd24eac09f124d27d934bde67c29295aae",
          "message": "chore: bump version to 0.1.0-beta.2 (#49)\n\nIncludes security fixes since beta.1:\n- prevent cookie jar DoS via reserved property name collision\n- update fast-uri to 3.1.2 (CVE remediation)",
          "timestamp": "2026-05-27T12:56:28Z",
          "tree_id": "defe396cdee2f87fcbaa97e18120a95aaef7a965",
          "url": "https://github.com/CentralPing/ergo/commit/6c2049cd24eac09f124d27d934bde67c29295aae"
        },
        "date": 1779886611941,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "f22f18b238d8355300ee50041b04100245d6b753",
          "message": "feat: add cursor-based pagination link helpers (#50)",
          "timestamp": "2026-05-27T12:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/51/commits/f22f18b238d8355300ee50041b04100245d6b753"
        },
        "date": 1779900110674,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "e787819b00fee759a14ea0ae702f72101f7a53a9",
          "message": "feat: add Idempotency-Key header middleware (#53)",
          "timestamp": "2026-05-27T12:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/54/commits/e787819b00fee759a14ea0ae702f72101f7a53a9"
        },
        "date": 1779900502971,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "29db84a42c73cb7698e1036a1bb8bb94f815f4ab",
          "message": "feat: add cursor-based pagination link helpers (#50)",
          "timestamp": "2026-05-27T12:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/51/commits/29db84a42c73cb7698e1036a1bb8bb94f815f4ab"
        },
        "date": 1779905237204,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "126f19f02545793826414e7bc31b0fcf12f67243",
          "message": "feat: add cursor-based pagination link helpers (#50) (#51)",
          "timestamp": "2026-05-27T21:28:00Z",
          "tree_id": "930364f08ccdcfb46e4043c84886573a1fa10746",
          "url": "https://github.com/CentralPing/ergo/commit/126f19f02545793826414e7bc31b0fcf12f67243"
        },
        "date": 1779917293155,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "b82ed02fca925be910d948d6a4ae4bab493d01dc",
          "message": "feat: add Idempotency-Key header middleware (#53)",
          "timestamp": "2026-05-27T21:28:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/54/commits/b82ed02fca925be910d948d6a4ae4bab493d01dc"
        },
        "date": 1779917312088,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "b4a5498047a3877443ffe2773ba7f915ebf87ab7",
          "message": "feat: add Idempotency-Key header middleware (#53)",
          "timestamp": "2026-05-27T21:28:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/54/commits/b4a5498047a3877443ffe2773ba7f915ebf87ab7"
        },
        "date": 1779917917337,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "09956f805e92eb44c6ceee63eea4036e8876ad04",
          "message": "feat: add Idempotency-Key header middleware (#53)",
          "timestamp": "2026-05-27T21:28:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/54/commits/09956f805e92eb44c6ceee63eea4036e8876ad04"
        },
        "date": 1779982656119,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "800cb291796782f4a0c66b1ad7d9d8038e3652b2",
          "message": "feat: add Idempotency-Key header middleware (#53) (#54)",
          "timestamp": "2026-05-28T15:38:18Z",
          "tree_id": "853ea586ce70be1e21e8245b9b200c81d511ab71",
          "url": "https://github.com/CentralPing/ergo/commit/800cb291796782f4a0c66b1ad7d9d8038e3652b2"
        },
        "date": 1779982719282,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "cc759fd4af3853705bd7361d2b41337f7035f947",
          "message": "chore: bump version to 0.1.0-beta.3 (#62)",
          "timestamp": "2026-05-28T15:38:25Z",
          "url": "https://github.com/CentralPing/ergo/pull/63/commits/cc759fd4af3853705bd7361d2b41337f7035f947"
        },
        "date": 1780086345022,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9ac95220f3ecc4124132fe7b5090680580cc9b70",
          "message": "chore: bump version to 0.1.0-beta.3 (#62) (#63)\n\nIncludes features since beta.2:\n- cursor-based pagination link helpers (#51)\n- Idempotency-Key header middleware (#54)",
          "timestamp": "2026-05-29T16:27:54-04:00",
          "tree_id": "61943b8057a987214d6e235052ff9e222375bee4",
          "url": "https://github.com/CentralPing/ergo/commit/9ac95220f3ecc4124132fe7b5090680580cc9b70"
        },
        "date": 1780086488489,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.008,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "b64edade1a9ce2918721382a0bf4565ec807fc6e",
          "message": "feat: add ajv-formats for JSON Schema format keyword support (#58)",
          "timestamp": "2026-05-29T20:28:01Z",
          "url": "https://github.com/CentralPing/ergo/pull/64/commits/b64edade1a9ce2918721382a0bf4565ec807fc6e"
        },
        "date": 1780088473244,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.017,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "965761a567ea5a5e9243ac3843dfecabcef06a32",
          "message": "fix: enforce Fast Fail pipeline contract for accepts, body, and validate (#55, #56, #57)",
          "timestamp": "2026-05-29T20:28:01Z",
          "url": "https://github.com/CentralPing/ergo/pull/65/commits/965761a567ea5a5e9243ac3843dfecabcef06a32"
        },
        "date": 1780088552510,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "60ef0d35ff1621209553dbc58cc6d7847e014dfa",
          "message": "fix: enforce Fast Fail pipeline contract for accepts, body, and validate (#55, #56, #57)",
          "timestamp": "2026-05-29T20:28:01Z",
          "url": "https://github.com/CentralPing/ergo/pull/65/commits/60ef0d35ff1621209553dbc58cc6d7847e014dfa"
        },
        "date": 1780089252836,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "d5df463375dde618f25aaa66cf82acd893e54350",
          "message": "feat: add ajv-formats for JSON Schema format keyword support (#58)",
          "timestamp": "2026-05-29T20:28:01Z",
          "url": "https://github.com/CentralPing/ergo/pull/64/commits/d5df463375dde618f25aaa66cf82acd893e54350"
        },
        "date": 1780089272031,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f72510aa025f7dae595a394f24960dc0f8f06d8f",
          "message": "feat: add ajv-formats for JSON Schema format keyword support (#58) (#64)\n\n* feat: add ajv-formats for JSON Schema format keyword support (#58)\n\n* test: add boundary test for object format config (#58)",
          "timestamp": "2026-05-29T17:27:08-04:00",
          "tree_id": "db0302b6da809e095f59766d53b5c907dcd85537",
          "url": "https://github.com/CentralPing/ergo/commit/f72510aa025f7dae595a394f24960dc0f8f06d8f"
        },
        "date": 1780090046076,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "67ae89bcf309b6b51cb7f9edcb3c0b26d1d65d95",
          "message": "fix: enforce Fast Fail pipeline contract for accepts, body, and validate (#55, #56, #57)",
          "timestamp": "2026-05-29T21:27:14Z",
          "url": "https://github.com/CentralPing/ergo/pull/65/commits/67ae89bcf309b6b51cb7f9edcb3c0b26d1d65d95"
        },
        "date": 1780090202249,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "JasonCust@users.noreply.github.com",
            "name": "Jason Cust",
            "username": "JasonCust"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a023905de685270002920dd68ede05a2a21663f8",
          "message": "fix: enforce Fast Fail pipeline contract for accepts, body, and validate (#55, #56, #57) (#65)\n\n* fix: enforce Fast Fail pipeline contract for accepts, body, and validate (#55, #56, #57)\n\n- accepts(): change throwIfFail default from false to true (406 on mismatch)\n- body(): add application/merge-patch+json and application/json-patch+json to default types\n- validate(): resolve params from acc.route.params (ergo-router) with acc.params fallback\n\n* refactor: remove redundant throwIfFail in contract test",
          "timestamp": "2026-05-29T17:38:17-04:00",
          "tree_id": "fc2b83612664d4e5e4ab238055ae70674be846d1",
          "url": "https://github.com/CentralPing/ergo/commit/a023905de685270002920dd68ede05a2a21663f8"
        },
        "date": 1780090713991,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.009,
            "unit": "us/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "bdcd826563bdd01e8849991a0bef51f089d7d139",
          "message": "docs: fix CI dispatch payload format and README license link (#61, #66)",
          "timestamp": "2026-05-29T21:38:22Z",
          "url": "https://github.com/CentralPing/ergo/pull/67/commits/bdcd826563bdd01e8849991a0bef51f089d7d139"
        },
        "date": 1780093040535,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.005,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.01,
            "unit": "us/op"
          }
        ]
      }
    ]
  }
}