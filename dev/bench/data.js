window.BENCHMARK_DATA = {
  "lastUpdate": 1774270010032,
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
      }
    ]
  }
}