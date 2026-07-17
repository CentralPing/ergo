window.BENCHMARK_DATA = {
  "lastUpdate": 1784310618437,
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
          "id": "0823555ec71df7f9daf09c0e37d5830446ef4d03",
          "message": "build(deps-dev): Bump eslint from 10.4.0 to 10.4.1 in the dev-dependencies group",
          "timestamp": "2026-05-29T21:38:22Z",
          "url": "https://github.com/CentralPing/ergo/pull/68/commits/0823555ec71df7f9daf09c0e37d5830446ef4d03"
        },
        "date": 1780097559861,
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
          "id": "793f168263c66df5ee06e4c1838d5c86976a7183",
          "message": "build(deps-dev): Bump eslint in the dev-dependencies group (#68)\n\nBumps the dev-dependencies group with 1 update: [eslint](https://github.com/eslint/eslint).\n\n\nUpdates `eslint` from 10.4.0 to 10.4.1\n- [Release notes](https://github.com/eslint/eslint/releases)\n- [Commits](https://github.com/eslint/eslint/compare/v10.4.0...v10.4.1)\n\n---\nupdated-dependencies:\n- dependency-name: eslint\n  dependency-version: 10.4.1\n  dependency-type: direct:development\n  update-type: version-update:semver-patch\n  dependency-group: dev-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-05-29T19:34:08-04:00",
          "tree_id": "e49ccefacc4d81a7eb1221f1692a7a31da3a7a47",
          "url": "https://github.com/CentralPing/ergo/commit/793f168263c66df5ee06e4c1838d5c86976a7183"
        },
        "date": 1780097660309,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "701ce2ae3348912e86732671b2a7bd5cf96ba0d1",
          "message": "docs: fix CI dispatch payload format and README license link (#61, #66)",
          "timestamp": "2026-05-29T23:34:13Z",
          "url": "https://github.com/CentralPing/ergo/pull/67/commits/701ce2ae3348912e86732671b2a7bd5cf96ba0d1"
        },
        "date": 1780097687244,
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
          "id": "f3cbc994ce926d05ef65c2a1b871ee1b08f3ad0e",
          "message": "docs: fix CI dispatch payload format and README license link (#61, #66) (#67)\n\n- Change dispatch package name from \"@centralping/ergo\" to \"ergo\" in\n  ci.yml and release.yml to match deploy.yml's expected short-name format\n- Replace relative LICENSE link in README footer with absolute URL for\n  npm rendering",
          "timestamp": "2026-05-29T23:37:16Z",
          "tree_id": "9420e6bce236ece62323430efd00fb8852c62f7f",
          "url": "https://github.com/CentralPing/ergo/commit/f3cbc994ce926d05ef65c2a1b871ee1b08f3ad0e"
        },
        "date": 1780097847952,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "918aeaa92bfd4d436a9a3b7dc03162269fe135dd",
          "message": "fix: use npm ci in benchmark workflow (#77)",
          "timestamp": "2026-05-29T23:42:14Z",
          "url": "https://github.com/CentralPing/ergo/pull/78/commits/918aeaa92bfd4d436a9a3b7dc03162269fe135dd"
        },
        "date": 1780120653222,
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
          "id": "7e1aa18bbf4e02ba0c796512843ddf5e174cb4fc",
          "message": "fix: use npm ci in benchmark workflow (#77) (#78)",
          "timestamp": "2026-05-30T21:46:44Z",
          "tree_id": "a1b92f7ac422125c663bc9c8aab94f61ba3585ca",
          "url": "https://github.com/CentralPing/ergo/commit/7e1aa18bbf4e02ba0c796512843ddf5e174cb4fc"
        },
        "date": 1780177616208,
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
          "id": "2904887e7c2330e5d55ebbbea62196a93b9b14a4",
          "message": "docs: add TypeScript Quick Start example to README (#74)",
          "timestamp": "2026-05-30T21:46:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/76/commits/2904887e7c2330e5d55ebbbea62196a93b9b14a4"
        },
        "date": 1780179883841,
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
          "id": "d36279674fa69903e3eb0a69c91b2dab96112e5e",
          "message": "docs: add TypeScript Quick Start example to README (#74) (#76)",
          "timestamp": "2026-05-31T01:30:44Z",
          "tree_id": "c15f26b260c3508af83fda82cf87698dbf994db3",
          "url": "https://github.com/CentralPing/ergo/commit/d36279674fa69903e3eb0a69c91b2dab96112e5e"
        },
        "date": 1780191056458,
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
          "id": "2657b22b08f19ec95c06c47524ca7007dd20984c",
          "message": "feat: improve .d.ts type quality for middleware factories and compose utilities (#75)",
          "timestamp": "2026-05-31T01:30:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/79/commits/2657b22b08f19ec95c06c47524ca7007dd20984c"
        },
        "date": 1780192560947,
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
          "id": "1b4c9ebcaf8e204399325d53b2fa812a03093f44",
          "message": "feat: improve .d.ts type quality for middleware factories and compose utilities (#75)",
          "timestamp": "2026-05-31T01:30:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/79/commits/1b4c9ebcaf8e204399325d53b2fa812a03093f44"
        },
        "date": 1780193173720,
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
          "id": "0dbce638bcfc55f9665c51ded2f006529143a26f",
          "message": "feat: improve .d.ts type quality for middleware factories and compose utilities (#75) (#79)\n\nRemove @returns {function} and @returns {object} JSDoc annotations that\nsuppressed TypeScript's declaration emitter inference. All middleware\nfactories now emit fully typed function signatures instead of opaque\nFunction/object. Compose utilities return (...args) => Promise<object>\ninstead of Function.\n\n28 source files changed (JSDoc-only, zero runtime behavior changes).",
          "timestamp": "2026-05-31T02:06:52Z",
          "tree_id": "4cf648b5d1d11743ce9815a93b77426fb8dfb60f",
          "url": "https://github.com/CentralPing/ergo/commit/0dbce638bcfc55f9665c51ded2f006529143a26f"
        },
        "date": 1780193224835,
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
          "id": "e1c17e2b2513d95186b2c84c4b146b42c100e94c",
          "message": "chore: bump version to 0.1.0",
          "timestamp": "2026-05-31T02:06:57Z",
          "url": "https://github.com/CentralPing/ergo/pull/80/commits/e1c17e2b2513d95186b2c84c4b146b42c100e94c"
        },
        "date": 1780194585348,
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
          "id": "22af6b6b58de30b2daac3b0ae878db335d714416",
          "message": "chore: bump version to 0.1.0 (#80)",
          "timestamp": "2026-05-30T22:31:10-04:00",
          "tree_id": "02c4b9d5eb984225e02cceb56ef6d600feb156e3",
          "url": "https://github.com/CentralPing/ergo/commit/22af6b6b58de30b2daac3b0ae878db335d714416"
        },
        "date": 1780194681047,
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
          "id": "b5e86ac6af821a8bd899ff64babe4ad19f141f49",
          "message": "fix: distinguish missing from malformed Idempotency-Key header (#81)",
          "timestamp": "2026-05-31T02:31:14Z",
          "url": "https://github.com/CentralPing/ergo/pull/96/commits/b5e86ac6af821a8bd899ff64babe4ad19f141f49"
        },
        "date": 1780318147019,
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
          "id": "8d5a3f9c74ad77955850a19c8b90636e9c4130bc",
          "message": "fix: distinguish missing from malformed Idempotency-Key header (#81)",
          "timestamp": "2026-05-31T02:31:14Z",
          "url": "https://github.com/CentralPing/ergo/pull/96/commits/8d5a3f9c74ad77955850a19c8b90636e9c4130bc"
        },
        "date": 1780319256235,
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
          "id": "016fc8b827fee64de93d3ee7c99051c5dcb17b49",
          "message": "fix: distinguish missing from malformed Idempotency-Key header (#81) (#96)\n\n* fix: distinguish missing from malformed Idempotency-Key header (#81)\n\nSeparate error handling for absent vs. malformed Idempotency-Key headers\nin http/idempotency.js. A malformed header (present but not valid RFC 8941\nsf-string) now always returns 400 with format guidance, regardless of the\n`required` option. Previously, malformed headers with `required: false`\nsilently passed through.\n\nCloses #90\n\n* test: add whitespace-only header edge case (#81)",
          "timestamp": "2026-06-01T15:48:46Z",
          "tree_id": "b7721384a63c27f01772f62d18b4a512eca192a3",
          "url": "https://github.com/CentralPing/ergo/commit/016fc8b827fee64de93d3ee7c99051c5dcb17b49"
        },
        "date": 1780328944939,
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
          "id": "1e277ddc6b290af8f8e6d8892e09bb0f09da4f43",
          "message": "fix: detect missing body data in validate() and fail explicitly (#93)",
          "timestamp": "2026-06-01T16:11:57Z",
          "url": "https://github.com/CentralPing/ergo/pull/97/commits/1e277ddc6b290af8f8e6d8892e09bb0f09da4f43"
        },
        "date": 1780352760758,
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
          "id": "9264d24c05718600ed5cc294d51ce41e89927ec2",
          "message": "fix: detect missing body data in validate() and fail explicitly (#93) (#97)",
          "timestamp": "2026-06-02T01:01:50Z",
          "tree_id": "5ba91a34c1f42d2806f17bffbd5dd3386d0b9115",
          "url": "https://github.com/CentralPing/ergo/commit/9264d24c05718600ed5cc294d51ce41e89927ec2"
        },
        "date": 1780362125176,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "a76355c010da80c74b863c9b6991f44c575f2358",
          "message": "fix: .d.ts declarations compile with skipLibCheck: false (#83)",
          "timestamp": "2026-06-02T01:01:55Z",
          "url": "https://github.com/CentralPing/ergo/pull/98/commits/a76355c010da80c74b863c9b6991f44c575f2358"
        },
        "date": 1780419284255,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "1e6c7aa75bce455c0f2814a036396e51368a5683",
          "message": "fix: .d.ts declarations compile with skipLibCheck: false (#83)",
          "timestamp": "2026-06-02T01:01:55Z",
          "url": "https://github.com/CentralPing/ergo/pull/98/commits/1e6c7aa75bce455c0f2814a036396e51368a5683"
        },
        "date": 1780420123607,
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
          "id": "1c30a09a878bd1a6649b29f0f7e7ced947e0cbfc",
          "message": "fix: .d.ts declarations compile with skipLibCheck: false (#83) (#98)\n\n* fix: .d.ts declarations compile with skipLibCheck: false (#83)\n\nAdd JSDoc @param types to inner middleware functions where tsc infers {}\nfrom = {} destructured defaults. Add CI type-checking gate that validates\ngenerated declarations with skipLibCheck: false and strict: true.\n\n* fix: extract inline JSDoc to named const for readability (#83)",
          "timestamp": "2026-06-02T13:40:39-04:00",
          "tree_id": "465b8f98552ee7ee9d58a1ed50b29bb3959b4ba0",
          "url": "https://github.com/CentralPing/ergo/commit/1c30a09a878bd1a6649b29f0f7e7ced947e0cbfc"
        },
        "date": 1780422054904,
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
          "id": "04a030670e0bdfb4c19d82e2814bbdae60820dff",
          "message": "feat: compose() accumulator type inference from [fn, key] tuples (#87)",
          "timestamp": "2026-06-02T17:40:45Z",
          "url": "https://github.com/CentralPing/ergo/pull/99/commits/04a030670e0bdfb4c19d82e2814bbdae60820dff"
        },
        "date": 1780432557150,
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
          "id": "a51121c45a9efa5e404c6f4c68cc52e4a241c571",
          "message": "feat: compose() accumulator type inference from [fn, key] tuples (#87)",
          "timestamp": "2026-06-02T17:40:45Z",
          "url": "https://github.com/CentralPing/ergo/pull/99/commits/a51121c45a9efa5e404c6f4c68cc52e4a241c571"
        },
        "date": 1780433480958,
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
          "id": "36818fc3643ef9d317345888757e594127d842b7",
          "message": "feat: compose() accumulator type inference from [fn, key] tuples (#87) (#99)\n\nHand-written overloaded composeWith() signatures (1–12 tuples) that infer\nthe domain accumulator type from [fn, setPath] tuple arguments. Accessing\nan accumulator key from middleware not in the pipeline is now a compile-time\nerror. Includes consumer-facing result type interfaces (UrlResult, BodyResult,\nLogEntry, etc.) and a type-only test validated by npm run check-types.",
          "timestamp": "2026-06-03T01:02:42Z",
          "tree_id": "3c79fa7a21694a203ca50211bce39236e06ec3f8",
          "url": "https://github.com/CentralPing/ergo/commit/36818fc3643ef9d317345888757e594127d842b7"
        },
        "date": 1780448573665,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "721f4f991dd1cf8ba4aa8573e4abdd86d2373b61",
          "message": "fix: warn on unrecognized validate() schema keys (#84)",
          "timestamp": "2026-06-03T01:02:47Z",
          "url": "https://github.com/CentralPing/ergo/pull/100/commits/721f4f991dd1cf8ba4aa8573e4abdd86d2373b61"
        },
        "date": 1780455610463,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
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
          "id": "0f1caf2acdbd2b8001235fa17361401df2299203",
          "message": "feat: add pagination helpers with RFC 8288 Link header generation (#85)",
          "timestamp": "2026-06-03T01:02:47Z",
          "url": "https://github.com/CentralPing/ergo/pull/101/commits/0f1caf2acdbd2b8001235fa17361401df2299203"
        },
        "date": 1780455642239,
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
          "id": "a3b0969f13791eb1a210c6132d466a629cb1226e",
          "message": "feat: instance field on all error paths and pipeline debug tracing (#86)",
          "timestamp": "2026-06-03T01:02:47Z",
          "url": "https://github.com/CentralPing/ergo/pull/102/commits/a3b0969f13791eb1a210c6132d466a629cb1226e"
        },
        "date": 1780456075156,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.012,
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
          "id": "42788593c2dcd2b6be19508d1888696e5a8afa43",
          "message": "fix: warn on unrecognized validate() schema keys (#84)",
          "timestamp": "2026-06-03T01:02:47Z",
          "url": "https://github.com/CentralPing/ergo/pull/100/commits/42788593c2dcd2b6be19508d1888696e5a8afa43"
        },
        "date": 1780495194892,
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
          "id": "2c1d1266248909749b36fd9a741a80c6a4af8924",
          "message": "feat: instance field on all error paths and pipeline debug tracing (#86)",
          "timestamp": "2026-06-03T01:02:47Z",
          "url": "https://github.com/CentralPing/ergo/pull/102/commits/2c1d1266248909749b36fd9a741a80c6a4af8924"
        },
        "date": 1780496666208,
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
          "id": "4354b1a60c246c810962d38a9f8e3a07dcd2ca45",
          "message": "fix: warn on unrecognized validate() schema keys (#84) (#100)\n\n* fix: warn on unrecognized validate() schema keys (#84)\n\n* fix: per-key-set dedup for ERGO_VALIDATE_UNKNOWN_KEY (#84)",
          "timestamp": "2026-06-03T16:23:48Z",
          "tree_id": "0c6a92c2df136246bb979e73fa6e029de5e2f2c3",
          "url": "https://github.com/CentralPing/ergo/commit/4354b1a60c246c810962d38a9f8e3a07dcd2ca45"
        },
        "date": 1780503846622,
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
          "id": "a84c22a110f1004232255c1714436031b40b255c",
          "message": "feat: add pagination helpers with RFC 8288 Link header generation (#85)",
          "timestamp": "2026-06-03T16:26:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/101/commits/a84c22a110f1004232255c1714436031b40b255c"
        },
        "date": 1780504668504,
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
          "id": "962f02ab3ed44081fea0daf049b970660802f309",
          "message": "feat: add pagination helpers with RFC 8288 Link header generation (#85) (#101)",
          "timestamp": "2026-06-03T17:27:54Z",
          "tree_id": "71d7bca2996b3344ce48117227974c0a67bf5e4e",
          "url": "https://github.com/CentralPing/ergo/commit/962f02ab3ed44081fea0daf049b970660802f309"
        },
        "date": 1780507690502,
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
          "id": "1c2bfcbc4862bf6b60c93a73ee4a4d89b6b0059d",
          "message": "feat: instance field on all error paths and pipeline debug tracing (#86)",
          "timestamp": "2026-06-03T17:28:01Z",
          "url": "https://github.com/CentralPing/ergo/pull/102/commits/1c2bfcbc4862bf6b60c93a73ee4a4d89b6b0059d"
        },
        "date": 1780508876925,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.015,
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
          "id": "5739705a3c2e98bf691c1fd4e8b301ce365554e8",
          "message": "feat: instance field on all error paths and pipeline debug tracing (#86) (#102)\n\n* feat: instance field on all error paths and pipeline debug tracing (#86)\n\nPopulate the RFC 9457 `instance` field (`urn:uuid:{requestId}`) from\nthe `x-request-id` response header on all error paths — pipeline breaks\n(return-value model), caught errors, and internal `endWithProblem` (412).\nPreviously, `instance` was only populated in catch blocks, missing the\nv2 return-value error model entirely.\n\nAdd opt-in pipeline debug tracing via `{debug: true}` option on\n`handler()`. When enabled, `responseAcc._trace` records middleware\nexecution labels and the breaking step. On error responses (>= 400),\n`_trace` appears as an RFC 9457 extension member.\n\nCloses #86\nCloses #95\n\n* fix: address review findings (#86)",
          "timestamp": "2026-06-03T17:48:45Z",
          "tree_id": "db23e17e9b0d1ad098be894ce5153438a450b8f7",
          "url": "https://github.com/CentralPing/ergo/commit/5739705a3c2e98bf691c1fd4e8b301ce365554e8"
        },
        "date": 1780508944210,
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
          "id": "7ca4964679d46072c6a448cdc7026151a85e72be",
          "message": "fix: harden formatLinkHeader href against CR/LF/NUL injection (#103)",
          "timestamp": "2026-06-03T17:48:50Z",
          "url": "https://github.com/CentralPing/ergo/pull/104/commits/7ca4964679d46072c6a448cdc7026151a85e72be"
        },
        "date": 1780509950894,
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
          "id": "ed54d9b710e1d46b7eb82950128a1065bb67e0be",
          "message": "feat: add OpenTelemetry tracing integration (#89)",
          "timestamp": "2026-06-03T17:48:50Z",
          "url": "https://github.com/CentralPing/ergo/pull/105/commits/ed54d9b710e1d46b7eb82950128a1065bb67e0be"
        },
        "date": 1780510533804,
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
          "id": "88e225552802dc6fed39c36cc4ae69cc9cabc8d0",
          "message": "fix: harden formatLinkHeader href against CR/LF/NUL injection (#103) (#104)",
          "timestamp": "2026-06-03T14:34:06-04:00",
          "tree_id": "9e199ff547e2ab53fa5870b0e2403493a7b0eec4",
          "url": "https://github.com/CentralPing/ergo/commit/88e225552802dc6fed39c36cc4ae69cc9cabc8d0"
        },
        "date": 1780511666883,
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
          "id": "887dccbd4069da5ece1dc29143caf5b1d66a535f",
          "message": "feat: add OpenTelemetry tracing integration (#89)",
          "timestamp": "2026-06-03T18:34:12Z",
          "url": "https://github.com/CentralPing/ergo/pull/105/commits/887dccbd4069da5ece1dc29143caf5b1d66a535f"
        },
        "date": 1780511689027,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "e4a4885dfc507a8877b02b726256d5942359ca10",
          "message": "feat: add OpenTelemetry tracing integration (#89)",
          "timestamp": "2026-06-03T18:34:12Z",
          "url": "https://github.com/CentralPing/ergo/pull/105/commits/e4a4885dfc507a8877b02b726256d5942359ca10"
        },
        "date": 1780512127779,
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
          "id": "18bab42100997ef36921602be14001f252d3b226",
          "message": "feat: add OpenTelemetry tracing integration (#89)",
          "timestamp": "2026-06-03T18:34:12Z",
          "url": "https://github.com/CentralPing/ergo/pull/105/commits/18bab42100997ef36921602be14001f252d3b226"
        },
        "date": 1780513400085,
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
          "id": "4a7f04716867b6f01755136aedef0206e0b9d21f",
          "message": "feat: add OpenTelemetry tracing integration (#89) (#105)\n\n* feat: add OpenTelemetry tracing integration (#89)\n\nAdd optional @opentelemetry/api peer dependency with pipeline-level\ndistributed tracing. New tracing() middleware factory starts an\nergo.pipeline span per request, ends it after send(), and propagates\nW3C trace context. Logger includes traceId/spanId when active.\nPer-stage child spans available via perStage option. Zero overhead\nwhen tracing middleware is not in the pipeline.\n\n* fix: move @opentelemetry/api to regular dependencies (#89)\n\n* fix: correct OTEL context propagation for response injection and child spans (#89)\n\n* test: extract headerGetter for full function coverage in lib/tracing (#89)",
          "timestamp": "2026-06-03T15:06:35-04:00",
          "tree_id": "2236ee08eaa855ce55e26c3e38837d137154decd",
          "url": "https://github.com/CentralPing/ergo/commit/4a7f04716867b6f01755136aedef0206e0b9d21f"
        },
        "date": 1780513613712,
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
            "value": 0.012,
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
          "id": "136be925ba35862a8aef295210523fbc1383525f",
          "message": "chore: bump version to 0.2.0",
          "timestamp": "2026-06-03T19:06:47Z",
          "url": "https://github.com/CentralPing/ergo/pull/107/commits/136be925ba35862a8aef295210523fbc1383525f"
        },
        "date": 1780593445885,
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
          "id": "bf277b45711c9dc270c785ff9966bb8f35278dca",
          "message": "chore: bump version to 0.2.0 (#107)",
          "timestamp": "2026-06-04T13:19:04-04:00",
          "tree_id": "85b81acc14ed5c0cd4028121cef54b36e5a04e2c",
          "url": "https://github.com/CentralPing/ergo/commit/bf277b45711c9dc270c785ff9966bb8f35278dca"
        },
        "date": 1780593560188,
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
          "id": "98c95e7adb9f83c53691bc10f60e12d9e940a75b",
          "message": "feat: add typed middleware options and result interfaces (#108)",
          "timestamp": "2026-06-04T17:19:10Z",
          "url": "https://github.com/CentralPing/ergo/pull/111/commits/98c95e7adb9f83c53691bc10f60e12d9e940a75b"
        },
        "date": 1780611072588,
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
            "value": 0.012,
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
          "id": "c05c3fec97be26057a3abfbf8cd6ba228965b610",
          "message": "feat: add typed middleware options and result interfaces (#108)",
          "timestamp": "2026-06-04T17:19:10Z",
          "url": "https://github.com/CentralPing/ergo/pull/111/commits/c05c3fec97be26057a3abfbf8cd6ba228965b610"
        },
        "date": 1780614719379,
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
          "id": "0634299af046513845eecaaa5f267fcc4a45d164",
          "message": "feat: add typed middleware options and result interfaces (#108)",
          "timestamp": "2026-06-04T17:19:10Z",
          "url": "https://github.com/CentralPing/ergo/pull/111/commits/0634299af046513845eecaaa5f267fcc4a45d164"
        },
        "date": 1780616306347,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
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
          "id": "c9a1e12a4fd3a37f220b011597e4ab8d3fee5e33",
          "message": "feat: add typed middleware options and result interfaces (#108) (#111)\n\nHand-written .d.ts overrides for all 21 middleware factory functions\nwith named options interfaces, precise inner function signatures, and\ntyped return values. Fixes PreferResult and removes inaccurate\nRateLimitResult. Adds AuthorizationResult, TracingResult, and\nIdempotencyResult interfaces. Includes AjvFormatName string literal\nunion tracking ajv-formats 3.x.",
          "timestamp": "2026-06-04T23:41:28Z",
          "tree_id": "f64d4eefd32fba69e23ca53d10eadaafbd847328",
          "url": "https://github.com/CentralPing/ergo/commit/c9a1e12a4fd3a37f220b011597e4ab8d3fee5e33"
        },
        "date": 1780616500899,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "1fff7bb587a6c5780f870cbe1aca4c8d278c499f",
          "message": "feat: add redactErrors option to handler (#109)",
          "timestamp": "2026-06-04T23:41:33Z",
          "url": "https://github.com/CentralPing/ergo/pull/112/commits/1fff7bb587a6c5780f870cbe1aca4c8d278c499f"
        },
        "date": 1780627632325,
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
          "id": "4bac0d81236290d123b21d08ebcd7fe13d6897d7",
          "message": "feat: add redactErrors option to handler (#109)",
          "timestamp": "2026-06-04T23:41:33Z",
          "url": "https://github.com/CentralPing/ergo/pull/112/commits/4bac0d81236290d123b21d08ebcd7fe13d6897d7"
        },
        "date": 1780631209728,
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
          "id": "86bfcec515c9da91646e47182f467ed5115393b7",
          "message": "feat: add redactErrors option to handler (#109) (#112)",
          "timestamp": "2026-06-05T03:53:24Z",
          "tree_id": "c025447eb8335e37ac16a47acc030b0a083d1778",
          "url": "https://github.com/CentralPing/ergo/commit/86bfcec515c9da91646e47182f467ed5115393b7"
        },
        "date": 1780631617666,
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
          "id": "617daa045833a290a76daf4111d6134347acbd2c",
          "message": "feat: add pluggable errorFormatter option to send() (#110)",
          "timestamp": "2026-06-05T03:53:29Z",
          "url": "https://github.com/CentralPing/ergo/pull/113/commits/617daa045833a290a76daf4111d6134347acbd2c"
        },
        "date": 1780644544567,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
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
          "id": "a8eb95a61431c3033416e25e4d9a830fff485071",
          "message": "feat: declarative pagination middleware factory and send() integration (#114)",
          "timestamp": "2026-06-05T03:53:29Z",
          "url": "https://github.com/CentralPing/ergo/pull/115/commits/a8eb95a61431c3033416e25e4d9a830fff485071"
        },
        "date": 1780645408661,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
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
          "id": "e6caa953ef8c592748e3bbf72b6a13daf1b16a2b",
          "message": "feat: add pluggable errorFormatter option to send() (#110)",
          "timestamp": "2026-06-05T03:53:29Z",
          "url": "https://github.com/CentralPing/ergo/pull/113/commits/e6caa953ef8c592748e3bbf72b6a13daf1b16a2b"
        },
        "date": 1780666750071,
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
          "id": "85be571d123268d63bec7451221a9fa344be9dac",
          "message": "feat: declarative pagination middleware factory and send() integration (#114)",
          "timestamp": "2026-06-05T03:53:29Z",
          "url": "https://github.com/CentralPing/ergo/pull/115/commits/85be571d123268d63bec7451221a9fa344be9dac"
        },
        "date": 1780666828502,
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
          "id": "a880472384f881a681007f24575827713347b85c",
          "message": "feat: add pluggable errorFormatter option to send() (#110) (#113)\n\n* feat: add pluggable errorFormatter option to send() (#110)\n\n* fix: address review findings (#110)\n\n- Type `ctx.requestId` as `string | undefined` in envelope and\n  errorFormatter callback signatures (CodeRabbit)\n- Align optional chaining on `res.getHeader?.()` in the main error\n  and envelope paths for consistency with endWithProblem\n- Add errorFormatter test for the If-Unmodified-Since → 412 path",
          "timestamp": "2026-06-05T09:45:33-04:00",
          "tree_id": "31d6fabf8a08616b61b30dc43af47edaec32cc01",
          "url": "https://github.com/CentralPing/ergo/commit/a880472384f881a681007f24575827713347b85c"
        },
        "date": 1780667147599,
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
          "id": "2417d029cefa2c22622f471449735b77fa0f4ac5",
          "message": "feat: declarative pagination middleware factory and send() integration (#114)",
          "timestamp": "2026-06-05T13:45:38Z",
          "url": "https://github.com/CentralPing/ergo/pull/115/commits/2417d029cefa2c22622f471449735b77fa0f4ac5"
        },
        "date": 1780667513652,
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
          "id": "4a14511d5da1d5d2377f0909545d715a3f986cdf",
          "message": "feat: declarative pagination middleware factory and send() integration (#114) (#115)\n\n* feat: add declarative pagination middleware factory and send() integration (#114)\n\n- Create http/paginate.js factory wrapping lib/paginate.js utilities\n- Add paginate option to send() for RFC 8288 Link header generation\n- Emit X-Total-Count header for offset pagination responses\n- Add 'paginate' to SEND_RESERVED to prevent RFC 9457 leakage\n- Change main barrel paginate export from namespace to factory\n- Bump version to 0.3.0\n\n* fix: address review findings for pagination PR\n\n- Add 8 unit tests for send.js pagination integration (codecov/patch)\n- Remove @returns {function} from paginate factory (type inference)\n- Add paginate?: boolean to SendOptions interface\n- Remove PaginateOptions/PaginateResult from default export object type\n- Add CHANGELOG.md entry for 0.3.0\n- Fix stale @requires in http/main.js",
          "timestamp": "2026-06-05T13:52:59Z",
          "tree_id": "15eea5d10ea733b789d99268c3ca3470c1f60e82",
          "url": "https://github.com/CentralPing/ergo/commit/4a14511d5da1d5d2377f0909545d715a3f986cdf"
        },
        "date": 1780667596716,
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
          "id": "122554ab0aa2445a4173b7b3c00a9f8a13b60bb7",
          "message": "chore: consolidate CHANGELOG for 0.3.0 release",
          "timestamp": "2026-06-05T13:53:04Z",
          "url": "https://github.com/CentralPing/ergo/pull/116/commits/122554ab0aa2445a4173b7b3c00a9f8a13b60bb7"
        },
        "date": 1780668134251,
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
          "id": "e2c050f1e764450381910361f141b4ba554ff364",
          "message": "chore: consolidate CHANGELOG for 0.3.0 release (#116)\n\nMove #108, #109, #110 entries from duplicate [0.2.0] section into\n[0.3.0] — these features were committed after the v0.2.0 tag.\nAdd empty [Unreleased] section for future work.",
          "timestamp": "2026-06-05T10:15:45-04:00",
          "tree_id": "01b36b34e935da912c546bc89da69534db924eaf",
          "url": "https://github.com/CentralPing/ergo/commit/e2c050f1e764450381910361f141b4ba554ff364"
        },
        "date": 1780668960863,
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
            "value": 0.012,
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
          "id": "b601d620749e4dbcf50dab0ccb8cb478644dc2dd",
          "message": "build(deps): Bump actions/checkout from 6.0.2 to 6.0.3",
          "timestamp": "2026-06-05T14:15:57Z",
          "url": "https://github.com/CentralPing/ergo/pull/119/commits/b601d620749e4dbcf50dab0ccb8cb478644dc2dd"
        },
        "date": 1780695224740,
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
          "id": "2c6edaf3be81209862e7b05306814a90b8240e0f",
          "message": "build(deps): Bump github/codeql-action from 4.36.0 to 4.36.2",
          "timestamp": "2026-06-05T14:15:57Z",
          "url": "https://github.com/CentralPing/ergo/pull/120/commits/2c6edaf3be81209862e7b05306814a90b8240e0f"
        },
        "date": 1780695235459,
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
          "id": "a2d3d46ee0f26b7e8505705636c76ac6744a8c7e",
          "message": "build(deps-dev): Bump lint-staged from 17.0.5 to 17.0.7 in the dev-dependencies group",
          "timestamp": "2026-06-05T14:15:57Z",
          "url": "https://github.com/CentralPing/ergo/pull/121/commits/a2d3d46ee0f26b7e8505705636c76ac6744a8c7e"
        },
        "date": 1780695238180,
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
          "id": "ce5b65250d434645fdea6db4e58fde90467a0f89",
          "message": "chore: enhance CodeRabbit config to CentralPipes parity",
          "timestamp": "2026-06-05T14:15:57Z",
          "url": "https://github.com/CentralPing/ergo/pull/122/commits/ce5b65250d434645fdea6db4e58fde90467a0f89"
        },
        "date": 1780697880596,
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
          "id": "c3132b044b6ded1acdcd3bbbfefc4416cd59dedd",
          "message": "chore: enhance CodeRabbit config to CentralPipes parity (#122)",
          "timestamp": "2026-06-05T20:07:16-04:00",
          "tree_id": "ea0662da673427e706436286104da9151cba8461",
          "url": "https://github.com/CentralPing/ergo/commit/c3132b044b6ded1acdcd3bbbfefc4416cd59dedd"
        },
        "date": 1780704451933,
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
          "id": "dd8a46b59611a259ad7cb97382e2bc4171c366ba",
          "message": "build(deps): Bump actions/checkout from 6.0.2 to 6.0.3",
          "timestamp": "2026-06-06T00:07:20Z",
          "url": "https://github.com/CentralPing/ergo/pull/119/commits/dd8a46b59611a259ad7cb97382e2bc4171c366ba"
        },
        "date": 1780704470607,
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
          "id": "295ba6659dea59126fd1486afd589ee9c03ceae1",
          "message": "build(deps): Bump github/codeql-action from 4.36.0 to 4.36.2",
          "timestamp": "2026-06-06T00:07:20Z",
          "url": "https://github.com/CentralPing/ergo/pull/120/commits/295ba6659dea59126fd1486afd589ee9c03ceae1"
        },
        "date": 1780704487838,
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
          "id": "fa67811466bebc7b56dda796f2001405cef83bbd",
          "message": "build(deps-dev): Bump lint-staged from 17.0.5 to 17.0.7 in the dev-dependencies group",
          "timestamp": "2026-06-06T00:07:20Z",
          "url": "https://github.com/CentralPing/ergo/pull/121/commits/fa67811466bebc7b56dda796f2001405cef83bbd"
        },
        "date": 1780704501826,
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
          "id": "4a693862c17f90b71efe49205dad2fa560f3999f",
          "message": "build(deps): Bump actions/checkout from 6.0.2 to 6.0.3 (#119)\n\nBumps [actions/checkout](https://github.com/actions/checkout) from 6.0.2 to 6.0.3.\n- [Release notes](https://github.com/actions/checkout/releases)\n- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/actions/checkout/compare/de0fac2e4500dabe0009e67214ff5f5447ce83dd...df4cb1c069e1874edd31b4311f1884172cec0e10)\n\n---\nupdated-dependencies:\n- dependency-name: actions/checkout\n  dependency-version: 6.0.3\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-06-06T00:08:40Z",
          "tree_id": "ac0b63d7f716818ffb5580fa65fe9394b62dc761",
          "url": "https://github.com/CentralPing/ergo/commit/4a693862c17f90b71efe49205dad2fa560f3999f"
        },
        "date": 1780704531919,
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
          "id": "fd53b9072f2f74e15e5bfedf20d5e796b36a2c70",
          "message": "build(deps-dev): Bump lint-staged from 17.0.5 to 17.0.7 in the dev-dependencies group",
          "timestamp": "2026-06-06T00:08:45Z",
          "url": "https://github.com/CentralPing/ergo/pull/121/commits/fd53b9072f2f74e15e5bfedf20d5e796b36a2c70"
        },
        "date": 1780704625100,
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
          "id": "d190b5f4656a782735401a147c7be5696bb41247",
          "message": "build(deps-dev): Bump lint-staged in the dev-dependencies group (#121)\n\nBumps the dev-dependencies group with 1 update: [lint-staged](https://github.com/lint-staged/lint-staged).\n\n\nUpdates `lint-staged` from 17.0.5 to 17.0.7\n- [Release notes](https://github.com/lint-staged/lint-staged/releases)\n- [Changelog](https://github.com/lint-staged/lint-staged/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/lint-staged/lint-staged/compare/v17.0.5...v17.0.7)\n\n---\nupdated-dependencies:\n- dependency-name: lint-staged\n  dependency-version: 17.0.7\n  dependency-type: direct:development\n  update-type: version-update:semver-patch\n  dependency-group: dev-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Jason Cust <JasonCust@users.noreply.github.com>",
          "timestamp": "2026-06-06T00:11:14Z",
          "tree_id": "a90a20c8b44b3149d68d276ebc3a80842f3e583d",
          "url": "https://github.com/CentralPing/ergo/commit/d190b5f4656a782735401a147c7be5696bb41247"
        },
        "date": 1780704688465,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "5afe95b7349b372389158a1eecbe22f359d2a263",
          "message": "build(deps): Bump github/codeql-action from 4.36.0 to 4.36.2",
          "timestamp": "2026-06-06T00:11:19Z",
          "url": "https://github.com/CentralPing/ergo/pull/120/commits/5afe95b7349b372389158a1eecbe22f359d2a263"
        },
        "date": 1780761353870,
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
          "id": "ebc4532b1a5f8c57110071f1a344395b710e7f12",
          "message": "build(deps): Bump github/codeql-action from 4.36.0 to 4.36.2 (#120)\n\nBumps [github/codeql-action](https://github.com/github/codeql-action) from 4.36.0 to 4.36.2.\n- [Release notes](https://github.com/github/codeql-action/releases)\n- [Changelog](https://github.com/github/codeql-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/github/codeql-action/compare/7211b7c8077ea37d8641b6271f6a365a22a5fbfa...8aad20d150bbac5944a9f9d289da16a4b0d87c1e)\n\n---\nupdated-dependencies:\n- dependency-name: github/codeql-action\n  dependency-version: 4.36.2\n  dependency-type: direct:production\n  update-type: version-update:semver-patch\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-06-06T15:56:42Z",
          "tree_id": "afd368dcc1b5c6e8fde74baf5a2945ac52a6ce43",
          "url": "https://github.com/CentralPing/ergo/commit/ebc4532b1a5f8c57110071f1a344395b710e7f12"
        },
        "date": 1780761420009,
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
          "id": "e60e41c9f08c67c632828eab279b39df49c69f87",
          "message": "docs: add missing paginate option to handler JSDoc and HandlerOptions (#118)",
          "timestamp": "2026-06-06T15:56:47Z",
          "url": "https://github.com/CentralPing/ergo/pull/123/commits/e60e41c9f08c67c632828eab279b39df49c69f87"
        },
        "date": 1780762478994,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "b88d19b59e08090a170cd66d5e71910bcba72cb9",
          "message": "feat: replace [fn, setPath] tuples with {fn, setPath} config objects (#117)",
          "timestamp": "2026-06-06T15:56:47Z",
          "url": "https://github.com/CentralPing/ergo/pull/124/commits/b88d19b59e08090a170cd66d5e71910bcba72cb9"
        },
        "date": 1780765273616,
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
          "id": "593825c3ee6b8e85b6c34cf59ab049e4f88b86d4",
          "message": "docs: add missing paginate option to handler JSDoc and HandlerOptions (#118) (#123)",
          "timestamp": "2026-06-06T13:10:02-04:00",
          "tree_id": "3d37219d3310b07be10e782e7ae81d9b17dc24a5",
          "url": "https://github.com/CentralPing/ergo/commit/593825c3ee6b8e85b6c34cf59ab049e4f88b86d4"
        },
        "date": 1780765814139,
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
          "id": "818fa384b67ade42e977ae6cc471ba63f1bb6d57",
          "message": "feat: replace [fn, setPath] tuples with {fn, setPath} config objects (#117)",
          "timestamp": "2026-06-06T17:10:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/124/commits/818fa384b67ade42e977ae6cc471ba63f1bb6d57"
        },
        "date": 1780771615321,
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
          "id": "3b97782122a6d620fcd5eb8870a1ac3b72ad0de4",
          "message": "feat: replace [fn, setPath] tuples with {fn, setPath} config objects (#117) (#124)\n\nBREAKING CHANGE: compose-with middleware dispatch now uses typeof instead\nof Array.isArray. Domain-producing middleware uses {fn, setPath} config\nobjects; response-only middleware are plain functions. All 20 middleware\ninner functions named for trace labeling. MiddlewareTuple type renamed\nto MiddlewareOp.",
          "timestamp": "2026-06-06T18:53:14Z",
          "tree_id": "2bb1f5fc0e2164da13088e8d67232e867bd8e654",
          "url": "https://github.com/CentralPing/ergo/commit/3b97782122a6d620fcd5eb8870a1ac3b72ad0de4"
        },
        "date": 1780772006758,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "baddb93714144e5a678eee9472d992d48b195224",
          "message": "chore: bump version to 0.4.0 and finalize CHANGELOG",
          "timestamp": "2026-06-06T18:53:19Z",
          "url": "https://github.com/CentralPing/ergo/pull/125/commits/baddb93714144e5a678eee9472d992d48b195224"
        },
        "date": 1780778464422,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.015,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.004,
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
          "id": "972c169630390b206c7a120e580e18b4776ebb78",
          "message": "chore: bump version to 0.4.0 and finalize CHANGELOG (#125)",
          "timestamp": "2026-06-06T16:44:51-04:00",
          "tree_id": "d3b88ebbe3f15f4b5ef393bffe2af83369292918",
          "url": "https://github.com/CentralPing/ergo/commit/972c169630390b206c7a120e580e18b4776ebb78"
        },
        "date": 1780778705748,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "2d3d27516a765ff560a14249062655bad6bba6c4",
          "message": "feat: add timing option to handler() for X-Response-Time header (#127)",
          "timestamp": "2026-06-06T20:44:55Z",
          "url": "https://github.com/CentralPing/ergo/pull/129/commits/2d3d27516a765ff560a14249062655bad6bba6c4"
        },
        "date": 1780790882981,
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
          "id": "21b6e1738689d38c5e99ca1d373494a6ffe8715c",
          "message": "feat: add timing option to handler() for X-Response-Time header (#127)",
          "timestamp": "2026-06-06T20:44:55Z",
          "url": "https://github.com/CentralPing/ergo/pull/129/commits/21b6e1738689d38c5e99ca1d373494a6ffe8715c"
        },
        "date": 1780792866093,
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
          "id": "3c66f1145c776ca3538b1314f12eeb12854e7500",
          "message": "feat: add timing option to handler() for X-Response-Time header (#127) (#129)\n\n* feat: add timing option to handler() for X-Response-Time header (#127)\n\nIntroduces a `timing` option on `handler()` that injects an\n`X-Response-Time` header measuring the full request lifecycle. The\nshared primitive `lib/response-time.js` patches `res.writeHead` with a\nsingle-fire guard for defense-in-depth.\n\n- `timing: true` uses defaults (x-response-time, 3 decimal places)\n- `timing: {header, precision}` for custom configuration\n- Zero overhead when disabled (default)\n\nIncludes boundary, module, and contract tests (15 new tests).\nergo-router follow-up tracked in CentralPing/ergo-router#93.\n\n* fix: align mock writeHead with ServerResponse headersSent semantics (#127)",
          "timestamp": "2026-06-06T20:54:51-04:00",
          "tree_id": "caacd2055ff3b4113a7b21e40686065ac6d1e5bb",
          "url": "https://github.com/CentralPing/ergo/commit/3c66f1145c776ca3538b1314f12eeb12854e7500"
        },
        "date": 1780793702529,
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
          "id": "6d151bee5a5bc9a7be82f1106c08c7142afd3dfb",
          "message": "feat: add factory-time option key validation with Levenshtein suggestions (#126)",
          "timestamp": "2026-06-07T00:54:55Z",
          "url": "https://github.com/CentralPing/ergo/pull/130/commits/6d151bee5a5bc9a7be82f1106c08c7142afd3dfb"
        },
        "date": 1780794420957,
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
          "id": "379d93f7324175b5741cd08f895c045d27c41532",
          "message": "feat: add factory-time option key validation with Levenshtein suggestions (#126)",
          "timestamp": "2026-06-07T00:54:55Z",
          "url": "https://github.com/CentralPing/ergo/pull/130/commits/379d93f7324175b5741cd08f895c045d27c41532"
        },
        "date": 1780794555508,
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
          "id": "228715d1e321d9c590faf53c6889b73256c86cf2",
          "message": "feat: add factory-time option key validation with Levenshtein suggestions (#126)",
          "timestamp": "2026-06-07T00:54:55Z",
          "url": "https://github.com/CentralPing/ergo/pull/130/commits/228715d1e321d9c590faf53c6889b73256c86cf2"
        },
        "date": 1780797791143,
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
          "id": "55383ce59fb6552e4722a1fb187871023684f770",
          "message": "feat: add factory-time option key validation with Levenshtein suggestions (#126) (#130)\n\n* feat: add factory-time option key validation with Levenshtein suggestions (#126)\n\nAll 18 middleware factories now validate incoming option keys at factory\ninvocation time via a shared lib/validate-options.js utility. Unknown keys\nemit a deduplicated process.emitWarning with {type: 'ErgoWarning'} and a\n\"did you mean?\" suggestion when the Levenshtein edit distance is within\nthreshold. handler() validates the union of its own keys and send() keys.\n\n* fix: mark validateOptions options param as required for valid .d.ts\n\n* fix: filter forwarded options to prevent double-warning (#126)",
          "timestamp": "2026-06-06T22:04:13-04:00",
          "tree_id": "55f73698b59368b2233603bfa84371c9101b626a",
          "url": "https://github.com/CentralPing/ergo/commit/55383ce59fb6552e4722a1fb187871023684f770"
        },
        "date": 1780797870109,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
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
          "id": "128d9cfc408ee35b51507e31e365b18851825313",
          "message": "docs: update README TS example and remove type inference caveat (#131)",
          "timestamp": "2026-06-07T02:04:17Z",
          "url": "https://github.com/CentralPing/ergo/pull/132/commits/128d9cfc408ee35b51507e31e365b18851825313"
        },
        "date": 1780803332886,
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
            "value": 0.013,
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
          "id": "c592309914cc9515eb310ad4d6132d93955ca070",
          "message": "docs: update README TS example and remove type inference caveat (#131) (#132)",
          "timestamp": "2026-06-07T00:02:45-04:00",
          "tree_id": "53200a276d8b75257d8d8f34cf550becfcfd2926",
          "url": "https://github.com/CentralPing/ergo/commit/c592309914cc9515eb310ad4d6132d93955ca070"
        },
        "date": 1780804979428,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "5ad1e622fe26235c31672a98d762659192713ee1",
          "message": "chore: bump version to 0.4.1 and finalize CHANGELOG",
          "timestamp": "2026-06-07T04:02:50Z",
          "url": "https://github.com/CentralPing/ergo/pull/133/commits/5ad1e622fe26235c31672a98d762659192713ee1"
        },
        "date": 1780811041638,
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
          "id": "68b33d7f5f6bb455332ebb200a88ce530442d251",
          "message": "chore: bump version to 0.4.1 and finalize CHANGELOG (#133)",
          "timestamp": "2026-06-07T01:45:09-04:00",
          "tree_id": "c782a16f5e0fea6102a6eec173795ea5d714c3e3",
          "url": "https://github.com/CentralPing/ergo/commit/68b33d7f5f6bb455332ebb200a88ce530442d251"
        },
        "date": 1780811122986,
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
          "id": "4e4f368e8cb337c3b88fe754576b415ab117393a",
          "message": "fix: declare @types/node as optional peer dependency (#134)",
          "timestamp": "2026-06-07T05:45:13Z",
          "url": "https://github.com/CentralPing/ergo/pull/142/commits/4e4f368e8cb337c3b88fe754576b415ab117393a"
        },
        "date": 1781017881289,
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
            "value": 0.017,
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
          "id": "7cdb210456a305b19f2a96ceab61f090377da297",
          "message": "fix: declare @types/node as optional peer dependency (#134) (#142)",
          "timestamp": "2026-06-09T15:53:36-04:00",
          "tree_id": "dd5e95f46bf55a1b543e51edae20bfc1c5d5bf4a",
          "url": "https://github.com/CentralPing/ergo/commit/7cdb210456a305b19f2a96ceab61f090377da297"
        },
        "date": 1781034833443,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.027,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.017,
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
          "id": "5e9227a8c64c1ec2c3d864a6c8c914e64094f023",
          "message": "feat: add validate() shorthand for body-only schemas (#135)",
          "timestamp": "2026-06-09T19:53:42Z",
          "url": "https://github.com/CentralPing/ergo/pull/143/commits/5e9227a8c64c1ec2c3d864a6c8c914e64094f023"
        },
        "date": 1781038282162,
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
          "id": "6c39a31ae8333443346fda324c9ff5906353926a",
          "message": "feat: add validate() shorthand for body-only schemas (#135)",
          "timestamp": "2026-06-09T19:53:42Z",
          "url": "https://github.com/CentralPing/ergo/pull/143/commits/6c39a31ae8333443346fda324c9ff5906353926a"
        },
        "date": 1781041786070,
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
          "id": "4ffc041aa521a9ab97e42f9cfbb5d089cfbcd7ba",
          "message": "feat: add validate() shorthand for body-only schemas (#135) (#143)\n\n* feat: add validate() shorthand for body-only schemas (#135)\n\n* fix: strengthen shorthand precedence test (#135)",
          "timestamp": "2026-06-09T19:49:33-04:00",
          "tree_id": "30c8986a92fa6441ff8f6c5d8c9147e48614cc59",
          "url": "https://github.com/CentralPing/ergo/commit/4ffc041aa521a9ab97e42f9cfbb5d089cfbcd7ba"
        },
        "date": 1781048986446,
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
          "id": "7b64ab5d4b16a1012c5349fa9c9f9da465fe7d35",
          "message": "docs: document naming discoverability audit decision (#139)",
          "timestamp": "2026-06-09T23:49:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/144/commits/7b64ab5d4b16a1012c5349fa9c9f9da465fe7d35"
        },
        "date": 1781051447747,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "b0a86f673f960e160da0445711e5aa02b0e66146",
          "message": "docs: document naming discoverability audit decision (#139)",
          "timestamp": "2026-06-09T23:49:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/144/commits/b0a86f673f960e160da0445711e5aa02b0e66146"
        },
        "date": 1781054624323,
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
          "id": "cb2dbd358f547fd8f5b3f22f5e498289cd86043f",
          "message": "docs: document naming discoverability audit decision (#139) (#144)\n\n* docs: document naming discoverability audit decision (#139)\n\n* fix: remove broken DECISIONS.md reference from CHANGELOG (#139)",
          "timestamp": "2026-06-10T01:01:31-04:00",
          "tree_id": "c2ec43f38e9793d896bcf4db5fbf555347530233",
          "url": "https://github.com/CentralPing/ergo/commit/cb2dbd358f547fd8f5b3f22f5e498289cd86043f"
        },
        "date": 1781067703547,
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
          "id": "239cabc01e876270f6dec4081fe06fa54cffffe0",
          "message": "feat: add onResponse post-send lifecycle hook (#140)",
          "timestamp": "2026-06-10T05:02:01Z",
          "url": "https://github.com/CentralPing/ergo/pull/145/commits/239cabc01e876270f6dec4081fe06fa54cffffe0"
        },
        "date": 1781070622879,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
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
          "id": "998eaa01b0d4498d853ed9b4897b402d26eb7113",
          "message": "feat: add onResponse post-send lifecycle hook (#140) (#145)",
          "timestamp": "2026-06-10T10:06:40-04:00",
          "tree_id": "cbbe7581c8857df8c6f365b43d306fdfd5cd0561",
          "url": "https://github.com/CentralPing/ergo/commit/998eaa01b0d4498d853ed9b4897b402d26eb7113"
        },
        "date": 1781100418312,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "58fb1909506dd8ee1d044247adb8c748b07019e2",
          "message": "feat: add responseSchema option for schema-based response projection (#137)",
          "timestamp": "2026-06-10T14:08:28Z",
          "url": "https://github.com/CentralPing/ergo/pull/146/commits/58fb1909506dd8ee1d044247adb8c748b07019e2"
        },
        "date": 1781107953062,
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
          "id": "03e9acd9542ee7c4e4dc64be280142fbad80c3e4",
          "message": "feat: add responseSchema option for schema-based response projection (#137)",
          "timestamp": "2026-06-10T14:08:28Z",
          "url": "https://github.com/CentralPing/ergo/pull/146/commits/03e9acd9542ee7c4e4dc64be280142fbad80c3e4"
        },
        "date": 1781112976541,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
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
          "id": "4f988bebac0e46dec24be3bb72eb26167bfc086a",
          "message": "spike: evaluate plugin/extension system design (#136)",
          "timestamp": "2026-06-10T14:08:28Z",
          "url": "https://github.com/CentralPing/ergo/pull/147/commits/4f988bebac0e46dec24be3bb72eb26167bfc086a"
        },
        "date": 1781113246056,
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
          "id": "e1beb24e5405e2234666cda55be2e9ead6bdafbe",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138)",
          "timestamp": "2026-06-10T14:08:28Z",
          "url": "https://github.com/CentralPing/ergo/pull/148/commits/e1beb24e5405e2234666cda55be2e9ead6bdafbe"
        },
        "date": 1781113477089,
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
          "id": "6ec992bd17d449b13b9dcb771c7f5a7d311d564e",
          "message": "feat: add responseSchema option for schema-based response projection (#137) (#146)\n\n* feat: add responseSchema option for schema-based response projection (#137)\n\n* fix: expand handler responseSchema JSDoc to match send() detail level (#137)",
          "timestamp": "2026-06-10T14:13:16-04:00",
          "tree_id": "995683b1e3c92f90aa9d9ba1caae2097de0fcb35",
          "url": "https://github.com/CentralPing/ergo/commit/6ec992bd17d449b13b9dcb771c7f5a7d311d564e"
        },
        "date": 1781115211591,
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
          "id": "058e456b4a5bebfc82f8923172a752899a3f076b",
          "message": "spike: evaluate plugin/extension system design (#136)",
          "timestamp": "2026-06-10T18:13:22Z",
          "url": "https://github.com/CentralPing/ergo/pull/147/commits/058e456b4a5bebfc82f8923172a752899a3f076b"
        },
        "date": 1781115233192,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
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
          "id": "5cf1ef9f3b4af0a029eb342860b333967b957eea",
          "message": "spike: evaluate plugin/extension system design (#136)",
          "timestamp": "2026-06-10T18:13:22Z",
          "url": "https://github.com/CentralPing/ergo/pull/147/commits/5cf1ef9f3b4af0a029eb342860b333967b957eea"
        },
        "date": 1781120911190,
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
          "id": "448891cd4cfc27db0a2e83be3179d8c23ea88e3a",
          "message": "spike: evaluate plugin/extension system design (#136) (#147)\n\n* spike: evaluate plugin/extension system design (#136)\n\n* fix: address review findings (#136)",
          "timestamp": "2026-06-10T16:15:05-04:00",
          "tree_id": "7a82eeabb194fbd8a96788ee8607893de47fafab",
          "url": "https://github.com/CentralPing/ergo/commit/448891cd4cfc27db0a2e83be3179d8c23ea88e3a"
        },
        "date": 1781122523580,
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
          "id": "f2df8b6c4f351f0a157badf6541f96e308883bf0",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138)",
          "timestamp": "2026-06-10T20:15:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/148/commits/f2df8b6c4f351f0a157badf6541f96e308883bf0"
        },
        "date": 1781122667399,
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
          "id": "ca48b45b77e26553a8fcfe33043d3911afd4b82e",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138)",
          "timestamp": "2026-06-10T20:15:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/148/commits/ca48b45b77e26553a8fcfe33043d3911afd4b82e"
        },
        "date": 1781126411097,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.03,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "21a9f154750e1e2bf289af3024e4869d9982563d",
          "message": "fix: portable test suite for multi-runtime CI (#150)",
          "timestamp": "2026-06-10T20:15:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/151/commits/21a9f154750e1e2bf289af3024e4869d9982563d"
        },
        "date": 1781129561179,
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
          "id": "a02be4dad90ce83b9c027a70860a4d10cc420a0c",
          "message": "fix: portable test suite for multi-runtime CI (#150)",
          "timestamp": "2026-06-10T20:15:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/151/commits/a02be4dad90ce83b9c027a70860a4d10cc420a0c"
        },
        "date": 1781162458811,
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
          "id": "f123e6f71a640b767da154d1ba7159188ed184a6",
          "message": "fix: portable test suite for multi-runtime CI (#150) (#151)\n\n* fix: portable test suite for multi-runtime CI (#150)\n\nReplace Node-specific test infrastructure with portable patterns:\n- http/tracing.spec.unit.js: mock tracer via {tracer} factory option\n- http/validate.spec.unit.js: direct process.emitWarning assignment\n- lib/rate-limit.spec.unit.js: injectable clock via new now option\n\n* fix: strengthen parent context assertion scope (#150)",
          "timestamp": "2026-06-11T10:04:20-04:00",
          "tree_id": "f22159a93d9eb0a4eaaef0c794cc0756357f7d9a",
          "url": "https://github.com/CentralPing/ergo/commit/f123e6f71a640b767da154d1ba7159188ed184a6"
        },
        "date": 1781186679267,
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
          "id": "ef51cf596a46d3ae10bc9caf0a2ebab83c072b22",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138)",
          "timestamp": "2026-06-11T14:06:08Z",
          "url": "https://github.com/CentralPing/ergo/pull/148/commits/ef51cf596a46d3ae10bc9caf0a2ebab83c072b22"
        },
        "date": 1781195349241,
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
          "id": "a86e5cc879b315e9a58906c03d06e7c09b7b7baa",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138)",
          "timestamp": "2026-06-11T14:06:08Z",
          "url": "https://github.com/CentralPing/ergo/pull/148/commits/a86e5cc879b315e9a58906c03d06e7c09b7b7baa"
        },
        "date": 1781196070827,
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
          "id": "f352af6c84f9bf9b1028eb967f3144ff206b271a",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138)",
          "timestamp": "2026-06-11T14:06:08Z",
          "url": "https://github.com/CentralPing/ergo/pull/148/commits/f352af6c84f9bf9b1028eb967f3144ff206b271a"
        },
        "date": 1781196292506,
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
            "value": 0.012,
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
          "id": "9aae30d2e35d6e44b5a7ea82c3c63e19570db4cf",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138)",
          "timestamp": "2026-06-11T14:06:08Z",
          "url": "https://github.com/CentralPing/ergo/pull/148/commits/9aae30d2e35d6e44b5a7ea82c3c63e19570db4cf"
        },
        "date": 1781196390737,
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
          "id": "1b28a6a6b2c528b77bcde589e42ef5e6d3d73b4f",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138)",
          "timestamp": "2026-06-11T14:06:08Z",
          "url": "https://github.com/CentralPing/ergo/pull/148/commits/1b28a6a6b2c528b77bcde589e42ef5e6d3d73b4f"
        },
        "date": 1781196659198,
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
          "id": "53695bd45efb09793d04b3390e8202bba4ffbcca",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138)",
          "timestamp": "2026-06-11T14:06:08Z",
          "url": "https://github.com/CentralPing/ergo/pull/148/commits/53695bd45efb09793d04b3390e8202bba4ffbcca"
        },
        "date": 1781200520337,
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
          "id": "4716b867731c744345cc1238032c017db024effb",
          "message": "chore: bump version to 0.5.0 and finalize CHANGELOG",
          "timestamp": "2026-06-11T14:06:08Z",
          "url": "https://github.com/CentralPing/ergo/pull/152/commits/4716b867731c744345cc1238032c017db024effb"
        },
        "date": 1781200742922,
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
          "id": "9f2522543bee4df83af216a498d5cf973c2d83c5",
          "message": "chore: bump version to 0.5.0 and finalize CHANGELOG (#152)",
          "timestamp": "2026-06-11T14:00:14-04:00",
          "tree_id": "9f7de1c5b7efbb68e46d5669c08fd29bc7c86cc3",
          "url": "https://github.com/CentralPing/ergo/commit/9f2522543bee4df83af216a498d5cf973c2d83c5"
        },
        "date": 1781200836564,
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
          "id": "24ede6367cb38f5a5768e33638eafc0d1ef9462a",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138)",
          "timestamp": "2026-06-11T18:00:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/148/commits/24ede6367cb38f5a5768e33638eafc0d1ef9462a"
        },
        "date": 1781201468677,
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
          "id": "975d8639fad1945839fe7e0380901454320677b8",
          "message": "spike: add multi-runtime CI and document Deno/Bun compatibility (#138) (#148)\n\n* spike: add multi-runtime CI and document Deno/Bun compatibility (#138)\n\nAdd Deno 2.x and Bun 1.x test jobs to CI alongside Node.js 22/24.\nBoth runtimes pass all contract tests and nearly all unit tests via\ntheir Node.js compatibility layers. Jobs use continue-on-error as\ninformational checks. README documents runtime support status,\nknown gaps, and the architectural boundary analysis.\n\n* fix: address review findings (#138)\n\n* fix: portable OTEL tracing tests for Deno/Bun (#150)\n\nReplace @opentelemetry/sdk-trace-node (Node-specific) with portable\nalternatives:\n\n- http/tracing.spec.unit.js: mock tracer injected via {tracer} option\n- lib/tracing.spec.unit.js: SDK-free tests using only @opentelemetry/api\n\nNo production code changes. Test coverage preserved.\n\n* fix: strengthen injectContext tests with propagator assertion (#150)",
          "timestamp": "2026-06-11T14:41:10-04:00",
          "tree_id": "2f3ca0bebf8c93bae490d81664245eefbb5f7173",
          "url": "https://github.com/CentralPing/ergo/commit/975d8639fad1945839fe7e0380901454320677b8"
        },
        "date": 1781203287708,
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
          "id": "49d441d1fa8d5da7fb08b162d7fccfd772497941",
          "message": "feat: internalize canonical setPath on built-in middleware factories (#153)",
          "timestamp": "2026-06-11T18:41:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/154/commits/49d441d1fa8d5da7fb08b162d7fccfd772497941"
        },
        "date": 1781221390528,
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
          "id": "2afe5e6d1694501109765697b620738e8eac1445",
          "message": "feat: internalize canonical setPath on built-in middleware factories (#153)",
          "timestamp": "2026-06-11T18:41:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/154/commits/2afe5e6d1694501109765697b620738e8eac1445"
        },
        "date": 1781224254217,
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
          "id": "4b29e11ca8d967eea9e29c5aac7879549449cf9b",
          "message": "feat: internalize canonical setPath on built-in middleware factories (#153)",
          "timestamp": "2026-06-11T18:41:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/154/commits/4b29e11ca8d967eea9e29c5aac7879549449cf9b"
        },
        "date": 1781227002564,
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
          "id": "9360796d47bd32db9874b01c46f9c9a788394083",
          "message": "feat: internalize canonical setPath on built-in middleware factories (#153) (#154)\n\n* feat: internalize canonical setPath on built-in middleware factories (#153)\n\nDomain-producing middleware factories now attach a non-enumerable `setPath`\nproperty to their returned function via `Object.defineProperty`. `normalizeOp`\nreads this intrinsic path, allowing bare functions to be composed without\nexplicit `{fn, setPath}` wrappers.\n\nAffected factories: url, logger, body, accepts, cookie, authorization,\ntracing, prefer, paginate, idempotency. The explicit `{fn, setPath}` form\nremains fully supported for custom middleware.\n\nTypeScript declarations updated with `MiddlewareOp<K, F>` union type and\n`& {readonly setPath: '...'}` intersection types on factory return signatures.\n\n* fix: restore CHANGELOG continuation indentation and align .d.ts req optionality with runtime (#153)\n\n* fix: guard normalizeOp intrinsic setPath with Object.hasOwn (#153)\n\n* fix: ExtractValue returns undefined for response-only middleware (#153)",
          "timestamp": "2026-06-11T21:29:43-04:00",
          "tree_id": "cc0024d467bf8101daaf6d1d3e9b90a19384d619",
          "url": "https://github.com/CentralPing/ergo/commit/9360796d47bd32db9874b01c46f9c9a788394083"
        },
        "date": 1781227799792,
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
          "id": "5d99a2424bf5df4b6bcffa970f5c2a34cd9f2682",
          "message": "build(deps): Bump codecov/codecov-action from 6.0.1 to 7.0.0",
          "timestamp": "2026-06-12T01:29:48Z",
          "url": "https://github.com/CentralPing/ergo/pull/156/commits/5d99a2424bf5df4b6bcffa970f5c2a34cd9f2682"
        },
        "date": 1781300020018,
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
          "id": "565f4aa3ebd9f62ac8449cd9a7c76eab3712c986",
          "message": "build(deps-dev): Bump the dev-dependencies group with 5 updates",
          "timestamp": "2026-06-12T01:29:48Z",
          "url": "https://github.com/CentralPing/ergo/pull/157/commits/565f4aa3ebd9f62ac8449cd9a7c76eab3712c986"
        },
        "date": 1781300060010,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "13e468ff909535c5fb684fa8910240085f2d645f",
          "message": "fix: add missing node:http import to JSDoc @example blocks (#155)",
          "timestamp": "2026-06-12T01:29:48Z",
          "url": "https://github.com/CentralPing/ergo/pull/158/commits/13e468ff909535c5fb684fa8910240085f2d645f"
        },
        "date": 1781317512039,
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
          "id": "2b9cda9221acca1c98eb838bbd89690c9b780e6b",
          "message": "build(deps): Bump codecov/codecov-action from 6.0.1 to 7.0.0 (#156)\n\nBumps [codecov/codecov-action](https://github.com/codecov/codecov-action) from 6.0.1 to 7.0.0.\n- [Release notes](https://github.com/codecov/codecov-action/releases)\n- [Changelog](https://github.com/codecov/codecov-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/codecov/codecov-action/compare/e79a6962e0d4c0c17b229090214935d2e33f8354...fb8b3582c8e4def4969c97caa2f19720cb33a72f)\n\n---\nupdated-dependencies:\n- dependency-name: codecov/codecov-action\n  dependency-version: 7.0.0\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-06-13T00:26:30-04:00",
          "tree_id": "f6b24480510ebf5417be1cf464dd6d8c9937e057",
          "url": "https://github.com/CentralPing/ergo/commit/2b9cda9221acca1c98eb838bbd89690c9b780e6b"
        },
        "date": 1781324805431,
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
          "id": "78e335e1d732ce7ecc602c2d69cae5efe1950dca",
          "message": "build(deps-dev): Bump the dev-dependencies group with 5 updates",
          "timestamp": "2026-06-13T04:26:34Z",
          "url": "https://github.com/CentralPing/ergo/pull/157/commits/78e335e1d732ce7ecc602c2d69cae5efe1950dca"
        },
        "date": 1781324864018,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.033,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
          "id": "b7924fec2398029bae238226c977af0e777bd816",
          "message": "build(deps-dev): Bump the dev-dependencies group with 5 updates (#157)\n\nBumps the dev-dependencies group with 5 updates:\n\n| Package | From | To |\n| --- | --- | --- |\n| [@opentelemetry/sdk-trace-node](https://github.com/open-telemetry/opentelemetry-js) | `2.7.1` | `2.8.0` |\n| [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/node) | `25.9.1` | `25.9.3` |\n| [eslint](https://github.com/eslint/eslint) | `10.4.1` | `10.5.0` |\n| [prettier](https://github.com/prettier/prettier) | `3.8.3` | `3.8.4` |\n| [undici](https://github.com/nodejs/undici) | `8.3.0` | `8.4.1` |\n\n\nUpdates `@opentelemetry/sdk-trace-node` from 2.7.1 to 2.8.0\n- [Release notes](https://github.com/open-telemetry/opentelemetry-js/releases)\n- [Changelog](https://github.com/open-telemetry/opentelemetry-js/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/open-telemetry/opentelemetry-js/compare/v2.7.1...v2.8.0)\n\nUpdates `@types/node` from 25.9.1 to 25.9.3\n- [Release notes](https://github.com/DefinitelyTyped/DefinitelyTyped/releases)\n- [Commits](https://github.com/DefinitelyTyped/DefinitelyTyped/commits/HEAD/types/node)\n\nUpdates `eslint` from 10.4.1 to 10.5.0\n- [Release notes](https://github.com/eslint/eslint/releases)\n- [Commits](https://github.com/eslint/eslint/compare/v10.4.1...v10.5.0)\n\nUpdates `prettier` from 3.8.3 to 3.8.4\n- [Release notes](https://github.com/prettier/prettier/releases)\n- [Changelog](https://github.com/prettier/prettier/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/prettier/prettier/compare/3.8.3...3.8.4)\n\nUpdates `undici` from 8.3.0 to 8.4.1\n- [Release notes](https://github.com/nodejs/undici/releases)\n- [Commits](https://github.com/nodejs/undici/compare/v8.3.0...v8.4.1)\n\n---\nupdated-dependencies:\n- dependency-name: \"@opentelemetry/sdk-trace-node\"\n  dependency-version: 2.8.0\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: dev-dependencies\n- dependency-name: \"@types/node\"\n  dependency-version: 25.9.3\n  dependency-type: direct:development\n  update-type: version-update:semver-patch\n  dependency-group: dev-dependencies\n- dependency-name: eslint\n  dependency-version: 10.5.0\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: dev-dependencies\n- dependency-name: prettier\n  dependency-version: 3.8.4\n  dependency-type: direct:development\n  update-type: version-update:semver-patch\n  dependency-group: dev-dependencies\n- dependency-name: undici\n  dependency-version: 8.4.1\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: dev-dependencies\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-06-13T04:28:42Z",
          "tree_id": "7f83edcc27709a3b2ba3aad30a0c3ae94161e3c1",
          "url": "https://github.com/CentralPing/ergo/commit/b7924fec2398029bae238226c977af0e777bd816"
        },
        "date": 1781324937023,
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
          "id": "531e6df92d21ec9df3710929cb73f4af68a115cd",
          "message": "fix: add missing node:http import to JSDoc @example blocks (#155)",
          "timestamp": "2026-06-13T04:28:46Z",
          "url": "https://github.com/CentralPing/ergo/pull/158/commits/531e6df92d21ec9df3710929cb73f4af68a115cd"
        },
        "date": 1781326651565,
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
          "id": "a460a8da69050da3fd95d30f80ea132ec27865ed",
          "message": "fix: add missing node:http import to JSDoc @example blocks (#155) (#158)",
          "timestamp": "2026-06-13T07:06:26-04:00",
          "tree_id": "05534d4096705ff8a467b2e7e93921ac4e3f1523",
          "url": "https://github.com/CentralPing/ergo/commit/a460a8da69050da3fd95d30f80ea132ec27865ed"
        },
        "date": 1781348802752,
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
          "id": "616a64ba0a2e72e90a70b94433415cf14188cb1b",
          "message": "chore: finalize CHANGELOG and bump version for 0.6.0 release",
          "timestamp": "2026-06-13T11:06:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/159/commits/616a64ba0a2e72e90a70b94433415cf14188cb1b"
        },
        "date": 1781361846946,
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
            "value": 0.012,
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
          "id": "b8f1ac549f65a19b17346121e74f001d80278740",
          "message": "chore: finalize CHANGELOG and bump version for 0.6.0 release (#159)",
          "timestamp": "2026-06-13T10:46:46-04:00",
          "tree_id": "13d5c8e07cab0f2dc59fe2e21469b90eb10b58a3",
          "url": "https://github.com/CentralPing/ergo/commit/b8f1ac549f65a19b17346121e74f001d80278740"
        },
        "date": 1781362019678,
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
          "id": "abab413cd6cd06bd7770d467c9809cb8753e3915",
          "message": "docs: update README Quick Start to 0.6.0 bare compose API (#160)",
          "timestamp": "2026-06-13T14:46:51Z",
          "url": "https://github.com/CentralPing/ergo/pull/162/commits/abab413cd6cd06bd7770d467c9809cb8753e3915"
        },
        "date": 1781546208759,
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
          "id": "88596a2b7100c833b7dce91d3b7dab45e3085394",
          "message": "docs: update README Quick Start to 0.6.0 bare compose API (#160) (#162)",
          "timestamp": "2026-06-15T18:08:39-04:00",
          "tree_id": "a25a4133502baa5b2ac0cbdba6715ea4d2d80751",
          "url": "https://github.com/CentralPing/ergo/commit/88596a2b7100c833b7dce91d3b7dab45e3085394"
        },
        "date": 1781561337792,
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
          "id": "9148066c9480b9a074b94480198c880288aedca2",
          "message": "docs: update JSDoc @example blocks to bare compose API (#161)",
          "timestamp": "2026-06-15T22:08:45Z",
          "url": "https://github.com/CentralPing/ergo/pull/163/commits/9148066c9480b9a074b94480198c880288aedca2"
        },
        "date": 1781658446986,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
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
          "id": "91a0f3a5c5c4393e5ec481b969a056df9c36b439",
          "message": "docs: update JSDoc @example blocks to bare compose API (#161) (#163)",
          "timestamp": "2026-06-16T23:56:32-04:00",
          "tree_id": "7fc2471bca30cb03fc1d1c9af5099768d52d0575",
          "url": "https://github.com/CentralPing/ergo/commit/91a0f3a5c5c4393e5ec481b969a056df9c36b439"
        },
        "date": 1781668604443,
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
          "id": "8e67dd408fa82e0e1827906662468fab19a2a006",
          "message": "chore: finalize CHANGELOG and bump version for 0.6.1 release",
          "timestamp": "2026-06-17T03:56:36Z",
          "url": "https://github.com/CentralPing/ergo/pull/164/commits/8e67dd408fa82e0e1827906662468fab19a2a006"
        },
        "date": 1781705403467,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.027,
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
          "id": "7b754a297b9f0bf6147b61304afe7049f2c5aafc",
          "message": "chore: finalize CHANGELOG and bump version for 0.6.1 release (#164)",
          "timestamp": "2026-06-17T10:11:09-04:00",
          "tree_id": "08fc186f479a0b00fe9e2ef1745a0df3cf76b79a",
          "url": "https://github.com/CentralPing/ergo/commit/7b754a297b9f0bf6147b61304afe7049f2c5aafc"
        },
        "date": 1781705486527,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.015,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.004,
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
          "id": "b09c93137ce45d24d82802a5ec0bb65c0a8f1191",
          "message": "feat: add MemoryStore.reset() for test isolation (#165)",
          "timestamp": "2026-06-17T14:15:35Z",
          "url": "https://github.com/CentralPing/ergo/pull/167/commits/b09c93137ce45d24d82802a5ec0bb65c0a8f1191"
        },
        "date": 1781717091030,
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
          "id": "b9076c031a5e0ab866b7d0d3b19ea3136836f4fe",
          "message": "feat: add MemoryStore.reset() for test isolation (#165) (#167)",
          "timestamp": "2026-06-17T17:30:54-04:00",
          "tree_id": "87ea629b046750781cc4da4047cac0e24c344df3",
          "url": "https://github.com/CentralPing/ergo/commit/b9076c031a5e0ab866b7d0d3b19ea3136836f4fe"
        },
        "date": 1781731870126,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "0648486370f9aee6dd2ce6f5e4367401e3c96d19",
          "message": "chore: update dependabot grouping and add auto-merge for patches",
          "timestamp": "2026-06-17T21:31:00Z",
          "url": "https://github.com/CentralPing/ergo/pull/168/commits/0648486370f9aee6dd2ce6f5e4367401e3c96d19"
        },
        "date": 1781790673943,
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
            "value": 0.02,
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
          "id": "2747f8d2b700ca72335c5e1cae9b0d0c453f1d28",
          "message": "chore: update dependabot grouping and add auto-merge for patches (#168)\n\nReplaces dependency-type-only grouping with granular semver-level\ngroups: all patches (auto-merged), then dev/prod x minor/major\n(manual review). Adds workflow to auto-approve and auto-merge\npatch PRs after CI passes.\n\nAligns with ergo-fetch, ergo-router, and json-api-query configuration.",
          "timestamp": "2026-06-18T09:55:45-04:00",
          "tree_id": "803a1c6dd5c266065af0ae83c36b329ab63225c4",
          "url": "https://github.com/CentralPing/ergo/commit/2747f8d2b700ca72335c5e1cae9b0d0c453f1d28"
        },
        "date": 1781790962395,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.01,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.02,
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
          "id": "1427869029144a5097811b8f11059f219b05adec",
          "message": "build(deps): Bump dependabot/fetch-metadata from 2 to 3",
          "timestamp": "2026-06-18T13:56:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/169/commits/1427869029144a5097811b8f11059f219b05adec"
        },
        "date": 1781791007644,
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
          "id": "30f1d66b9ef7ac2e00ed472ca28c57fca063e5f2",
          "message": "build(deps): Bump actions/checkout from 6.0.3 to 7.0.0",
          "timestamp": "2026-06-18T13:56:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/170/commits/30f1d66b9ef7ac2e00ed472ca28c57fca063e5f2"
        },
        "date": 1781791018898,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.033,
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
          "id": "6a9a04d9f61ded6a412f4cb632ed10ca7abea5a4",
          "message": "build(deps-dev): Bump undici from 8.4.1 to 8.5.0 in the dev-minor group",
          "timestamp": "2026-06-18T13:56:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/171/commits/6a9a04d9f61ded6a412f4cb632ed10ca7abea5a4"
        },
        "date": 1781791032071,
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
          "id": "2c7420b15735d2a4c27819c3a1cdf7a00bccec31",
          "message": "chore: align coderabbit config with official schema",
          "timestamp": "2026-06-18T13:56:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/172/commits/2c7420b15735d2a4c27819c3a1cdf7a00bccec31"
        },
        "date": 1781808479776,
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
          "id": "7eb06dfee45bfc1b2f5d31633fa4d93cfa0f5737",
          "message": "chore: align coderabbit config with official schema",
          "timestamp": "2026-06-18T13:56:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/172/commits/7eb06dfee45bfc1b2f5d31633fa4d93cfa0f5737"
        },
        "date": 1781813048732,
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
            "value": 0.012,
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
          "id": "72d849a1209da9547745cfac9d253cd179c696e4",
          "message": "chore: align coderabbit config with official schema",
          "timestamp": "2026-06-18T13:56:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/172/commits/72d849a1209da9547745cfac9d253cd179c696e4"
        },
        "date": 1781813893250,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
          "id": "5a0b49bcb173443d04a45136dd310ed4d005cd93",
          "message": "chore: align coderabbit config with official schema",
          "timestamp": "2026-06-18T13:56:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/172/commits/5a0b49bcb173443d04a45136dd310ed4d005cd93"
        },
        "date": 1781815263095,
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
            "value": 0.012,
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
          "id": "39e807936b632ac1ab56b09ad031f48d005b8991",
          "message": "chore: align coderabbit config with official schema",
          "timestamp": "2026-06-18T13:56:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/172/commits/39e807936b632ac1ab56b09ad031f48d005b8991"
        },
        "date": 1781817826483,
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
          "id": "61c8b5eeb947a3938fca78b6ac8b44fe1e5453f4",
          "message": "chore: align coderabbit config with official schema (#172)\n\n* chore: align coderabbit config with official schema\n\nFix invalid keys silently ignored by CodeRabbit:\n- prompt_for_ai_agents → enable_prompt_for_ai_agents\n- fortune → in_progress_fortune (added explicitly)\n- Tool keys: osv-scanner→osvScanner, dotenv-lint→dotenvLint,\n  prisma-lint→prismaLint, smarty-lint→smartyLint,\n  ember-template-lint→emberTemplateLint, fortitude→fortitudeLint\n- Enable osvScanner (was disabled under wrong key name)\n\nBehavioral changes:\n- auto_incremental_review: false (prefer manual full reviews)\n- Zero Tech Debt check upgraded to error mode with indirect wording\n- Trim linked_repositories to 1 (Pro plan limit per repo)\n- Add issue_enrichment section\n\n* chore: harden dependabot config per official docs audit\n\n- Add `commit-message` with conventional commit prefixes\n- Add `cooldown` to reduce noise from rapid-fire releases\n- Add github-actions minor+patch grouping for alignment\n- Increase open-pull-requests-limit to 10\n\n* fix: resolve dependabot validation failure\n\nRemove unsupported semver-specific cooldown keys for github-actions.\nThe github-actions ecosystem uses tag-based versioning, not strict\nsemver, so semver-major-days and semver-minor-days are not supported.\n\n* fix: split github-actions grouping to enable patch auto-merge\n\nSplit actions-minor-patch into separate actions-patches and\nactions-minors groups. Mixed groups report the highest update type\nin metadata, preventing the patch-only auto-merge gate from firing.\n\n* fix: use explicit markers in Zero Tech Debt pre-merge check\n\nReplace indirect wording (\"standard incomplete-task, needs-fix,\nworkaround, and attention-needed markers\") with explicit marker\nnames (TODO, FIXME, HACK, XXX) for deterministic enforcement.\nAdd config file exemption clause to prevent self-matching.",
          "timestamp": "2026-06-18T18:01:44-04:00",
          "tree_id": "fe71f97f9b6bdabe42f2b70712f78e739c45e416",
          "url": "https://github.com/CentralPing/ergo/commit/61c8b5eeb947a3938fca78b6ac8b44fe1e5453f4"
        },
        "date": 1781820115944,
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
          "id": "ab83ab987582bfb270e2b8c1bd7941bfe863d563",
          "message": "build(deps): Bump dependabot/fetch-metadata from 2 to 3",
          "timestamp": "2026-06-18T22:01:56Z",
          "url": "https://github.com/CentralPing/ergo/pull/169/commits/ab83ab987582bfb270e2b8c1bd7941bfe863d563"
        },
        "date": 1781820145938,
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
          "id": "b3a2cdfb7119f577643fccc94cb28957b7cc8d95",
          "message": "build(deps): Bump dependabot/fetch-metadata from 2 to 3 (#169)\n\nBumps [dependabot/fetch-metadata](https://github.com/dependabot/fetch-metadata) from 2 to 3.\n- [Release notes](https://github.com/dependabot/fetch-metadata/releases)\n- [Commits](https://github.com/dependabot/fetch-metadata/compare/v2...v3)\n\n---\nupdated-dependencies:\n- dependency-name: dependabot/fetch-metadata\n  dependency-version: '3'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-06-18T22:03:09Z",
          "tree_id": "36c39afdb8e05760fcd05723b5a58f79860e1a0f",
          "url": "https://github.com/CentralPing/ergo/commit/b3a2cdfb7119f577643fccc94cb28957b7cc8d95"
        },
        "date": 1781820207274,
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
          "id": "b3476d56edf656fba02e92134e9f635a404d66c0",
          "message": "build(deps): Bump actions/checkout from 6.0.3 to 7.0.0",
          "timestamp": "2026-06-18T22:03:14Z",
          "url": "https://github.com/CentralPing/ergo/pull/170/commits/b3476d56edf656fba02e92134e9f635a404d66c0"
        },
        "date": 1781820229819,
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
          "id": "15ed845536b1d69f9aa9db5923376e20cb7ce15c",
          "message": "build(deps): Bump actions/checkout from 6.0.3 to 7.0.0 (#170)\n\nBumps [actions/checkout](https://github.com/actions/checkout) from 6.0.3 to 7.0.0.\n- [Release notes](https://github.com/actions/checkout/releases)\n- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/actions/checkout/compare/df4cb1c069e1874edd31b4311f1884172cec0e10...9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0)\n\n---\nupdated-dependencies:\n- dependency-name: actions/checkout\n  dependency-version: 7.0.0\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-06-18T22:04:37Z",
          "tree_id": "fab86ca46edcf968cd1f7c147c80c6abc16f8ba2",
          "url": "https://github.com/CentralPing/ergo/commit/15ed845536b1d69f9aa9db5923376e20cb7ce15c"
        },
        "date": 1781820292573,
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
          "id": "ec513f7757a60df48a1b1504e4a021345e077679",
          "message": "feat: add generic type parameter to BodyResult interface",
          "timestamp": "2026-06-18T22:04:43Z",
          "url": "https://github.com/CentralPing/ergo/pull/173/commits/ec513f7757a60df48a1b1504e4a021345e077679"
        },
        "date": 1781990587749,
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
          "id": "ee451707b7c1f1c7d1d0de106bd53112b7d06ab9",
          "message": "feat: add generic type parameter to BodyResult interface (#173)\n\nBodyResult<T = unknown> allows downstream consumers (ergo-router's\ndefinePost/definePut/definePatch helpers) to narrow acc.body.parsed\nfrom unknown to a user-specified type. The default preserves backward\ncompatibility — bare BodyResult resolves to BodyResult<unknown>.\n\nRef: CentralPing/ergo-router#133",
          "timestamp": "2026-06-20T17:28:58-04:00",
          "tree_id": "a41c639b8b56c5de507ea3df2fa6c089d027e4a6",
          "url": "https://github.com/CentralPing/ergo/commit/ee451707b7c1f1c7d1d0de106bd53112b7d06ab9"
        },
        "date": 1781990952760,
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
          "id": "8b87d29a4ed392de09c8d2200852caa1ebc176ab",
          "message": "fix: tighten BodyResult.parsed from optional to required (#174)",
          "timestamp": "2026-06-20T21:29:03Z",
          "url": "https://github.com/CentralPing/ergo/pull/175/commits/8b87d29a4ed392de09c8d2200852caa1ebc176ab"
        },
        "date": 1782227540467,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "970f0fb3fe18232d64fb22f6607806fe330dc549",
          "message": "docs: elevate benchmark discoverability in README (#166)",
          "timestamp": "2026-06-20T21:29:03Z",
          "url": "https://github.com/CentralPing/ergo/pull/176/commits/970f0fb3fe18232d64fb22f6607806fe330dc549"
        },
        "date": 1782227623107,
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
          "id": "8a4c92a158f3c94e23ac09db647a8a9a85780a8d",
          "message": "fix: tighten BodyResult.parsed from optional to required (#174) (#175)\n\nThe `parsed` field was incorrectly declared as `parsed?: T` despite the\nbody() middleware guaranteeing its presence on every success path. This\nremoves the unnecessary `?` so TypeScript consumers no longer need\nnon-null assertions or optional chaining to access `acc.body.parsed`.",
          "timestamp": "2026-06-23T11:28:30-04:00",
          "tree_id": "df96bc80b3165a67b7fc0ab6043663feb71d4e2b",
          "url": "https://github.com/CentralPing/ergo/commit/8a4c92a158f3c94e23ac09db647a8a9a85780a8d"
        },
        "date": 1782228533840,
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
          "id": "9739b7f84218773ed8b7659bc1c4cba69b060a03",
          "message": "docs: elevate benchmark discoverability in README (#166)",
          "timestamp": "2026-06-23T15:28:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/176/commits/9739b7f84218773ed8b7659bc1c4cba69b060a03"
        },
        "date": 1782232977963,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.027,
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
          "id": "c20f2c1f2328cb46cb1a61e3559d86ddabd72a80",
          "message": "docs: elevate benchmark discoverability in README (#166) (#176)\n\nAdd a \"Benchmarked\" bullet to the \"Why ergo?\" section linking to the\npublished benchmarks page. This surfaces performance positioning in\nthe first screenful of the README, addressing the discoverability gap\nidentified in #166 where an external evaluator could not find ergo's\npublished benchmarks.",
          "timestamp": "2026-06-23T16:43:45Z",
          "tree_id": "d074f968be60248736c1532ea97b1d4eb53cd9e6",
          "url": "https://github.com/CentralPing/ergo/commit/c20f2c1f2328cb46cb1a61e3559d86ddabd72a80"
        },
        "date": 1782233045603,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.009,
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
          "id": "602cecc904e8c3372665854b70ec4c4e60027f5c",
          "message": "fix: clamp pagination prev link to lastPage when page exceeds total (#180)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/190/commits/602cecc904e8c3372665854b70ec4c4e60027f5c"
        },
        "date": 1782321827616,
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
          "id": "94864a996c9692d73df55c18613c1382fee1f8b1",
          "message": "fix: logger redact() uses null-prototype object (#178)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/191/commits/94864a996c9692d73df55c18613c1382fee1f8b1"
        },
        "date": 1782321883276,
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
          "id": "a76485d313025d9e71664fa1f911e83f4b4ac0a0",
          "message": "feat: add factory-time warning for CORS wildcard + credentials (#177)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/192/commits/a76485d313025d9e71664fa1f911e83f4b4ac0a0"
        },
        "date": 1782322059072,
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
          "id": "e2caf8e6d53d3d3e7a24de8f1a27f891e9397000",
          "message": "fix: emit error and record OTEL exception in send() catch block (#179)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/193/commits/e2caf8e6d53d3d3e7a24de8f1a27f891e9397000"
        },
        "date": 1782322063800,
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
          "id": "8a4d66f92abc81243ed52ba558c2e0d7cb1ca68c",
          "message": "fix: redact sensitive headers in onResponse hook responseInfo (#181)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/194/commits/8a4d66f92abc81243ed52ba558c2e0d7cb1ca68c"
        },
        "date": 1782322109771,
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
          "id": "dfbb3a2efc00e3cdbe5b3d56a21ad9ac0a3845a3",
          "message": "fix: emit error and record OTEL exception in send() catch block (#179)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/193/commits/dfbb3a2efc00e3cdbe5b3d56a21ad9ac0a3845a3"
        },
        "date": 1782323256028,
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
          "id": "f79e86a8eac2b3e6055c8ac6c8987d332673881e",
          "message": "fix: emit error and record OTEL exception in send() catch block (#179)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/193/commits/f79e86a8eac2b3e6055c8ac6c8987d332673881e"
        },
        "date": 1782323512410,
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
            "value": 0.012,
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
          "id": "1d85e27ffc98d80e732e9c173c0645fa71dbdac1",
          "message": "test: add co-located boundary tests for multipart header parser (#185)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/195/commits/1d85e27ffc98d80e732e9c173c0645fa71dbdac1"
        },
        "date": 1782324155051,
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
          "id": "56a1b6f5970cf4a87300c785fe385e662e50b173",
          "message": "fix: enforce nullish coalescing convention (#186)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/196/commits/56a1b6f5970cf4a87300c785fe385e662e50b173"
        },
        "date": 1782324192879,
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
          "id": "9a601144e20f2083ed3bfc6621355783b36ec750",
          "message": "fix: default ajv-formats to fast mode for ReDoS mitigation (#182)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/197/commits/9a601144e20f2083ed3bfc6621355783b36ec750"
        },
        "date": 1782324218063,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "0ce34bf878fefef6ef6cf3622c4c085be5af7672",
          "message": "fix: redact sensitive error details in logger error callback (#183)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/198/commits/0ce34bf878fefef6ef6cf3622c4c085be5af7672"
        },
        "date": 1782324267535,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "0e5b767513f42066b8d363c45b3509531d144e47",
          "message": "test: add module-layer unit tests for body and compress (#184)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/199/commits/0e5b767513f42066b8d363c45b3509531d144e47"
        },
        "date": 1782324515311,
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
          "id": "1f790a98644c8ac4683540dfbfa44719b5aa4d4e",
          "message": "style: replace bare {Array} JSDoc types with {\\*[]} shorthand (#187)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/200/commits/1f790a98644c8ac4683540dfbfa44719b5aa4d4e"
        },
        "date": 1782326472461,
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
          "id": "dea38d20a59f5ad92567d67ffb8f32a92298bb49",
          "message": "test: add boundary tests for attach-instance and vary (#189)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/202/commits/dea38d20a59f5ad92567d67ffb8f32a92298bb49"
        },
        "date": 1782326593141,
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
          "id": "2d48ec39a73128901a852a2ab20ba6ff541528b8",
          "message": "fix: validate Location header against dangerous URI schemes (#188)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/203/commits/2d48ec39a73128901a852a2ab20ba6ff541528b8"
        },
        "date": 1782326745534,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.012,
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
          "id": "eecaf42a94c8f3383b19e31834a99d87629b2b4f",
          "message": "fix: emit error and record OTEL exception in send() catch block (#179)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/193/commits/eecaf42a94c8f3383b19e31834a99d87629b2b4f"
        },
        "date": 1782327030096,
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
          "id": "57ec077a1e3e8aca9ebdc94782e7777f9bacb677",
          "message": "fix: bump undici devDependency to ^8.5.0 for security patches (#201)",
          "timestamp": "2026-06-23T16:43:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/204/commits/57ec077a1e3e8aca9ebdc94782e7777f9bacb677"
        },
        "date": 1782327413297,
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
          "id": "5d7f33490d0fccef9f7204b0ab7c9578430c5503",
          "message": "fix: bump undici devDependency to ^8.5.0 for security patches (#201) (#204)\n\nResolves 7 high-severity npm audit advisories (GHSA-vmh5-mc38-953g,\nGHSA-38rv-x7px-6hhq, GHSA-p88m-4jfj-68fv, GHSA-vxpw-j846-p89q,\nGHSA-35p6-xmwp-9g52, GHSA-g8m3-5g58-fq7m, GHSA-pr7r-676h-xcf6)\naffecting undici 8.0.0–8.4.1. DevDependency only — no consumer impact.",
          "timestamp": "2026-06-24T15:09:53-04:00",
          "tree_id": "d53012e29fdc120961b99f81e4df755ea435c3db",
          "url": "https://github.com/CentralPing/ergo/commit/5d7f33490d0fccef9f7204b0ab7c9578430c5503"
        },
        "date": 1782328212346,
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
          "id": "4d1205a16992a8041dda9f8232af64e0153ff560",
          "message": "chore: use squash merge in dependabot auto-merge workflow",
          "timestamp": "2026-06-24T19:09:59Z",
          "url": "https://github.com/CentralPing/ergo/pull/205/commits/4d1205a16992a8041dda9f8232af64e0153ff560"
        },
        "date": 1782388869168,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
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
          "id": "69eaa7b15b8d0ff11362fb20ef4d5ab52d22b3e2",
          "message": "chore: use squash merge in dependabot auto-merge workflow (#205)",
          "timestamp": "2026-06-25T14:07:46-04:00",
          "tree_id": "ab810b9408b0673c493f25797ae07db76d99e9bd",
          "url": "https://github.com/CentralPing/ergo/commit/69eaa7b15b8d0ff11362fb20ef4d5ab52d22b3e2"
        },
        "date": 1782410882616,
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
          "id": "8d3f244703b5277296b0788d0748818dcb1f4d3a",
          "message": "fix: clamp pagination prev link to lastPage when page exceeds total (#180)",
          "timestamp": "2026-06-25T18:14:58Z",
          "url": "https://github.com/CentralPing/ergo/pull/190/commits/8d3f244703b5277296b0788d0748818dcb1f4d3a"
        },
        "date": 1782417132027,
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
          "id": "3ce29e67a37254d221563503d70d8923a107183d",
          "message": "fix: clamp pagination prev link to lastPage when page exceeds total (#180) (#190)",
          "timestamp": "2026-06-25T19:53:01Z",
          "tree_id": "51f0c46f84cd4e9a8f34d1f3c785bf7e9cfa34b0",
          "url": "https://github.com/CentralPing/ergo/commit/3ce29e67a37254d221563503d70d8923a107183d"
        },
        "date": 1782417197209,
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
          "id": "038c27bd0483348667576193e9d30f5717d3c27e",
          "message": "fix: logger redact() uses null-prototype object (#178)",
          "timestamp": "2026-06-25T19:53:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/191/commits/038c27bd0483348667576193e9d30f5717d3c27e"
        },
        "date": 1782427335075,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.016,
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
          "id": "1f5274994ec2202cb6a1f38ddb2e60bf63e28d7c",
          "message": "fix: logger redact() uses null-prototype object (#178) (#191)\n\n* fix: logger redact() uses null-prototype object (#178)\n\nThe redact() helper in http/logger.js used a plain {} literal to\naccumulate header copies from user-controlled req.headers. This violated\nthe null-prototype policy (DECISIONS.md Section 1). Replace with\nObject.create(null) and add regression tests.\n\n* fix: ensure null-prototype copy in all redact() paths (#178)\n\nRemove the early-return guard that bypassed Object.create(null) when\nredactSet was empty. The function now always produces a null-prototype\ncopy of the headers object, regardless of whether redaction is active.\nThis completes the null-prototype policy enforcement for all code paths\nthrough redact().",
          "timestamp": "2026-06-25T19:56:18-04:00",
          "tree_id": "7e949a2ad8f535a034bb565d4938d385fccaa28c",
          "url": "https://github.com/CentralPing/ergo/commit/1f5274994ec2202cb6a1f38ddb2e60bf63e28d7c"
        },
        "date": 1782431789589,
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
            "value": 0.012,
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
          "id": "f2fee397446b82113afede56fb3441636fa20d5a",
          "message": "feat: add factory-time warning for CORS wildcard + credentials (#177)",
          "timestamp": "2026-06-25T23:56:22Z",
          "url": "https://github.com/CentralPing/ergo/pull/192/commits/f2fee397446b82113afede56fb3441636fa20d5a"
        },
        "date": 1782433154043,
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
          "id": "c58ecbbefb9f207387b27d2f6fb88aeb5aff8571",
          "message": "feat: add factory-time warning for CORS wildcard + credentials (#177)",
          "timestamp": "2026-06-25T23:56:22Z",
          "url": "https://github.com/CentralPing/ergo/pull/192/commits/c58ecbbefb9f207387b27d2f6fb88aeb5aff8571"
        },
        "date": 1782454282756,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
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
          "id": "4cdfcade9e042baf3aaae508cac7f1503caedc41",
          "message": "feat: add factory-time warning for CORS wildcard + credentials (#177) (#192)\n\n* feat: add factory-time warning for CORS wildcard + credentials (#177)\n\nEmit ERGO_CORS_WILDCARD_CREDENTIALS process.emitWarning when\ncors() is configured with origins: '*' and allowCredentials: true.\nThe warning fires once per process (deduplicated via module-level Set)\nand does not change runtime behavior — origin reflection still works.\nSurfaces the OWASP-documented misconfiguration footgun at startup.\n\n* fix: combine emission + dedup warning tests into single self-contained case (#177)\n\nEliminates order-dependency between separate test cases by verifying both\nemission and deduplication within one test — calls createCors twice and\nasserts exactly one warning. Follows the http/validate.spec.unit.js sibling\npattern for module-level state testing.",
          "timestamp": "2026-06-26T06:12:14Z",
          "tree_id": "14f7839fb8eb4a9cd4081c1e6145983336c80421",
          "url": "https://github.com/CentralPing/ergo/commit/4cdfcade9e042baf3aaae508cac7f1503caedc41"
        },
        "date": 1782454347683,
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
          "id": "0f820fd07ed8ca96a794ad47e07f184e7990a1c6",
          "message": "fix: replace cookie value denylist with RFC 6265 cookie-octet allowlist (#206)",
          "timestamp": "2026-06-26T06:12:19Z",
          "url": "https://github.com/CentralPing/ergo/pull/209/commits/0f820fd07ed8ca96a794ad47e07f184e7990a1c6"
        },
        "date": 1782513142476,
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
          "id": "ea470ff0e5b9c4c9bc1ece644788d77114017ca6",
          "message": "fix: replace Link href denylist with RFC 3986 URI-reference allowlist (#207)",
          "timestamp": "2026-06-26T06:12:19Z",
          "url": "https://github.com/CentralPing/ergo/pull/210/commits/ea470ff0e5b9c4c9bc1ece644788d77114017ca6"
        },
        "date": 1782513169812,
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
          "id": "b852ec99736a15395b8f0637dc3abcc695786d02",
          "message": "fix: replace sanitizeQuotedString denylist with qdtext allowlist (#208)",
          "timestamp": "2026-06-26T06:12:19Z",
          "url": "https://github.com/CentralPing/ergo/pull/211/commits/b852ec99736a15395b8f0637dc3abcc695786d02"
        },
        "date": 1782513975611,
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
          "id": "8bd170ff16f4fec6801dbcbde231b7af8cd89c81",
          "message": "fix: emit error and record OTEL exception in send() catch block (#179)",
          "timestamp": "2026-06-26T06:12:19Z",
          "url": "https://github.com/CentralPing/ergo/pull/193/commits/8bd170ff16f4fec6801dbcbde231b7af8cd89c81"
        },
        "date": 1782517533548,
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
          "id": "666b180354270d3a86bbf0f87782828ae6591042",
          "message": "fix: emit error and record OTEL exception in send() catch block (#179) (#193)\n\n* fix: emit error and record OTEL exception in send() catch block (#179)\n\nThe send() catch block in handler.js used a bare `catch` that silently\nswallowed errors when send() threw, creating an observability blind spot.\nThe error is now captured, emitted on `res` via the guarded\n`listenerCount('error') > 0` pattern (enabling logger error callbacks),\nand recorded on the OTEL span via `span.recordException()` for\ndistributed tracing visibility — matching the pipeline catch block's\nestablished convention.\n\n* test: cover OTEL span.recordException path in send() catch block\n\nAdds a test that verifies span.recordException(err) is called when\nsend() throws and an OTEL span is present on domainAcc.trace. Resolves\ncodecov/patch coverage gap for the new observability lines.\n\n* refactor: consolidate redundant OTEL span test into error emission test\n\nThe separate \"records exception on OTEL span when send() throws\" test\nduplicated the send-failure setup from the error emission test without\nadding meaningful coverage — span.recordException is already exercised\nthrough the error emission path. Removing the redundant test eliminates\n29 lines of duplicated setup.\n\n* test: add OTEL span mock to send() error emission test\n\nAdds a mock span with recordException to the existing send-error test\nso both error emission and OTEL exception recording are covered in a\nsingle test. Resolves codecov/patch coverage gap for handler.js L151-154.\n\n* fix: sync responseAcc.statusCode with forced 500 in send catch (#179)\n\nWhen send() throws, the handler forces res.statusCode = 500 but left\nresponseAcc.statusCode at whatever the pipeline set (e.g. 200). The span\nfinalization reads responseAcc.statusCode ?? res.statusCode, so the OTEL\nspan recorded the wrong status. Set responseAcc.statusCode = 500 to keep\nthe span truthful.\n\n* docs: mention responseAcc.statusCode sync in CHANGELOG entry (#179)",
          "timestamp": "2026-06-26T21:10:50-04:00",
          "tree_id": "f1992c0c4683b9041c19c6d8fb2885601deee1cf",
          "url": "https://github.com/CentralPing/ergo/commit/666b180354270d3a86bbf0f87782828ae6591042"
        },
        "date": 1782522661631,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.009,
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
          "id": "3f1543bf0a93d9ac68e96f79966f1ff6ed72b18f",
          "message": "fix: redact sensitive headers in onResponse hook responseInfo (#181)",
          "timestamp": "2026-06-27T01:10:54Z",
          "url": "https://github.com/CentralPing/ergo/pull/194/commits/3f1543bf0a93d9ac68e96f79966f1ff6ed72b18f"
        },
        "date": 1782523096945,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
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
          "id": "d75bf4cdfd0570b17d2b3c2faacd4d48cfecaa50",
          "message": "fix: redact sensitive headers in onResponse hook responseInfo (#181)",
          "timestamp": "2026-06-27T01:10:54Z",
          "url": "https://github.com/CentralPing/ergo/pull/194/commits/d75bf4cdfd0570b17d2b3c2faacd4d48cfecaa50"
        },
        "date": 1782527050264,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.031,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.015,
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
          "id": "f6d23f603085361f51746961f87541ec76f26b28",
          "message": "fix: redact sensitive headers in onResponse hook responseInfo (#181)",
          "timestamp": "2026-06-27T01:10:54Z",
          "url": "https://github.com/CentralPing/ergo/pull/194/commits/f6d23f603085361f51746961f87541ec76f26b28"
        },
        "date": 1782612336131,
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
          "id": "775cd030fee177080ea488c936ffae42642601a7",
          "message": "fix: redact sensitive headers in onResponse hook responseInfo (#181) (#194)\n\n* fix: redact sensitive headers in onResponse hook responseInfo (#181)\n\nbuildResponseInfo passed res.getHeaders() directly into the response info\nsnapshot without redaction. The onResponse hook could leak set-cookie,\nauthorization, proxy-authorization, and cookie headers even when\nhttp/logger.js correctly redacted them.\n\nExtract lib/redact-headers.js shared primitive from logger's private\nredact() function. Add optional redactSet parameter to buildResponseInfo.\nAdd redactHeaders option to handler() (defaults to DEFAULT_REDACTED_HEADERS).\nRefactor logger.js to consume the shared primitive.\n\nCross-repo: ergo-router#158 tracks forwarding redactSet in auto-wrap.js\nand router.js.\n\n* fix: case-insensitive header name matching in redactHeaders\n\nHTTP header names are case-insensitive per RFC 9110. Normalize both\nthe redactSet entries and header keys to lowercase before comparison\nso that custom sets like Set(['Set-Cookie']) match the lowercase keys\nreturned by Node.js res.getHeaders() and req.headers.\n\nAddresses CodeRabbit review finding on PR #194.\n\n* fix: snapshot DEFAULT_REDACTED_HEADERS at factory time (#181)\n\nClone the exported mutable Set at factory construction in both\nhandler() and logger() so post-construction mutations to the\nmodule-level default cannot silently alter redaction behavior\nfor existing instances.\n\nCloses #212",
          "timestamp": "2026-06-28T12:42:29-04:00",
          "tree_id": "4832df1d535b9adb2f579c95ce37c3d8185734bf",
          "url": "https://github.com/CentralPing/ergo/commit/775cd030fee177080ea488c936ffae42642601a7"
        },
        "date": 1782664963606,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.03,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
          "id": "4ed83f34f2b9d26a1c0d857e17ae424695a5caaf",
          "message": "test: add co-located boundary tests for multipart header parser (#185)",
          "timestamp": "2026-06-28T16:42:33Z",
          "url": "https://github.com/CentralPing/ergo/pull/195/commits/4ed83f34f2b9d26a1c0d857e17ae424695a5caaf"
        },
        "date": 1782672292631,
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
            "value": 0.012,
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
          "id": "23fd9c431dc9e0851004db2a9d40a474be9eab97",
          "message": "test: add co-located boundary tests for multipart header parser (#185)",
          "timestamp": "2026-06-28T16:42:33Z",
          "url": "https://github.com/CentralPing/ergo/pull/195/commits/23fd9c431dc9e0851004db2a9d40a474be9eab97"
        },
        "date": 1782672931447,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.031,
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
          "id": "b4e5518d43f34844e63562fd28b329b5de6da3b0",
          "message": "test: add co-located boundary tests for multipart header parser (#185) (#195)\n\n* test: add co-located boundary tests for multipart header parser (#185)\n\nCreate dedicated `lib/body/multipart/headers.spec.unit.js` with 30 tests\ncovering 10 concern areas: default behavior, valid header parsing,\ncase-insensitive normalization, directive parsing, RFC 7578 filtering,\nnull-prototype verification, Buffer input, malformed input, duplicate\nheaders, and Content-Type override.\n\nRemove the 6 bundled header tests from `lib/body/writer.spec.unit.js`\nand update its @fileoverview JSDoc to reflect the change.\n\n* test: add empty Buffer, malformed Content-Disposition, and invalid Content-Transfer-Encoding boundary cases (#185)",
          "timestamp": "2026-06-28T18:56:18Z",
          "tree_id": "04756350dd68750cf61d3fb5dd10f500361bec73",
          "url": "https://github.com/CentralPing/ergo/commit/b4e5518d43f34844e63562fd28b329b5de6da3b0"
        },
        "date": 1782672990217,
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
            "value": 0.012,
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
          "id": "a38c2b7fac4ff4e15a0f939c03075f0ab22968e7",
          "message": "fix: enforce nullish coalescing convention (#186)",
          "timestamp": "2026-06-28T18:56:23Z",
          "url": "https://github.com/CentralPing/ergo/pull/196/commits/a38c2b7fac4ff4e15a0f939c03075f0ab22968e7"
        },
        "date": 1782678450168,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
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
          "id": "282077d0d86c768863dd00c1828c31f8b9ed9b8a",
          "message": "fix: enforce nullish coalescing convention (#186) (#196)\n\n* fix: enforce nullish coalescing convention (#186)\n\nReplace || with ?? in logger request-ID resolution where the intent is\n\"default when missing.\" Remove the RFC 6901-incorrect || '/' fallback\nin lib/validate.js — AJV's empty-string instancePath is the correct\nJSON Pointer for the root document. Document intentional || usage in\nhttp/url.js where \"default when falsy\" is the correct semantic.\n\n* docs: add CHANGELOG entries for nullish coalescing fixes (#186)\n\nDocument both user-facing behavioral changes:\n- Logger empty-string request-ID preservation\n- Validation error path uses RFC 6901 empty string for root",
          "timestamp": "2026-06-28T17:28:42-04:00",
          "tree_id": "967b7ff8d2db7e179ba177b7bfe167482ac459eb",
          "url": "https://github.com/CentralPing/ergo/commit/282077d0d86c768863dd00c1828c31f8b9ed9b8a"
        },
        "date": 1782682138847,
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
          "id": "1c221df0b9bd0a5b7a1c2636df54ae0767475996",
          "message": "fix: default ajv-formats to fast mode for ReDoS mitigation (#182)",
          "timestamp": "2026-06-28T21:28:46Z",
          "url": "https://github.com/CentralPing/ergo/pull/197/commits/1c221df0b9bd0a5b7a1c2636df54ae0767475996"
        },
        "date": 1782685060731,
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
          "id": "a944babcd72a7b62a115367dc44884b6427b65c0",
          "message": "fix: default ajv-formats to fast mode for ReDoS mitigation (#182)",
          "timestamp": "2026-06-28T21:28:46Z",
          "url": "https://github.com/CentralPing/ergo/pull/197/commits/a944babcd72a7b62a115367dc44884b6427b65c0"
        },
        "date": 1782686533056,
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
            "value": 0.012,
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
          "id": "d168b750e5480cdb90682d7c2875be69f446b3fc",
          "message": "fix: default ajv-formats to fast mode for ReDoS mitigation (#182) (#197)\n\n* fix: default ajv-formats to fast mode for ReDoS mitigation (#182)\n\nThe default format validation mode now uses simplified regexes that are\nsafe for untrusted input. Full-mode regexes for date, time, date-time,\nduration, uri, uri-reference, email, and idn-email are vulnerable to\nReDoS with crafted payloads. Opt in to full mode via {mode: 'full'}\nwhen strict RFC compliance is required and input sources are trusted.\n\n* fix: note selective-format array ReDoS caveat in CHANGELOG (#182)\n\najv-formats does not support per-format mode selection for array configs\nso formats: ['email'] continues to use full-mode regexes.\n\n* test: add regression test for formats: true branch (#182)",
          "timestamp": "2026-06-28T19:42:32-04:00",
          "tree_id": "743ba5accd87de464cba681716d6a755c8528c6b",
          "url": "https://github.com/CentralPing/ergo/commit/d168b750e5480cdb90682d7c2875be69f446b3fc"
        },
        "date": 1782690167921,
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
          "id": "778277adc7e0ccb23edd51548f9d75818fc444d3",
          "message": "fix: redact sensitive error details in logger error callback (#183)",
          "timestamp": "2026-06-28T23:42:36Z",
          "url": "https://github.com/CentralPing/ergo/pull/198/commits/778277adc7e0ccb23edd51548f9d75818fc444d3"
        },
        "date": 1782695560442,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
          "id": "90015bb829d804aca75dba10bf0b5752582e8d4c",
          "message": "fix: redact sensitive error details in logger error callback (#183) (#198)\n\n* fix: redact sensitive error details in logger error callback (#183)\n\nLogger error() callback now applies redactErrors option (default: true)\nto prevent err.message, err.stack, and err.originalError from leaking\nsensitive information into structured log output. Uses STATUS_CODES\nlookup consistent with handler.js HTTP response redaction.\n\n* test: add err.status fallback coverage for logger error redaction (#183)\n\nVerifies the nullish coalescing fallback (err.statusCode ?? err.status)\nby testing with an error that has only .status set (no .statusCode).",
          "timestamp": "2026-06-28T22:04:42-04:00",
          "tree_id": "c7e303672ecf4f804033548b9a162d3a0b38c48b",
          "url": "https://github.com/CentralPing/ergo/commit/90015bb829d804aca75dba10bf0b5752582e8d4c"
        },
        "date": 1782698699438,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
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
          "id": "db93fbbd2efda3e2f5073805c3b9724abab4d686",
          "message": "test: add module-layer unit tests for body and compress (#184)",
          "timestamp": "2026-06-29T02:04:46Z",
          "url": "https://github.com/CentralPing/ergo/pull/199/commits/db93fbbd2efda3e2f5073805c3b9724abab4d686"
        },
        "date": 1782703391442,
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
          "id": "20592a1518735c2efcefbbbea5d3bc72d97dfbc0",
          "message": "test: add module-layer unit tests for body and compress (#184)",
          "timestamp": "2026-06-29T02:04:46Z",
          "url": "https://github.com/CentralPing/ergo/pull/199/commits/20592a1518735c2efcefbbbea5d3bc72d97dfbc0"
        },
        "date": 1782729013845,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.021,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.004,
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
          "id": "ddb5b068eace1a1aeb35b1c426db88015bf258c3",
          "message": "test: add module-layer unit tests for body and compress (#184)",
          "timestamp": "2026-06-29T02:04:46Z",
          "url": "https://github.com/CentralPing/ergo/pull/199/commits/ddb5b068eace1a1aeb35b1c426db88015bf258c3"
        },
        "date": 1782732860495,
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
          "id": "af6a30e3693f8efd6ed3ba6954f410847070a3b3",
          "message": "test: add module-layer unit tests for body and compress (#184)",
          "timestamp": "2026-06-29T02:04:46Z",
          "url": "https://github.com/CentralPing/ergo/pull/199/commits/af6a30e3693f8efd6ed3ba6954f410847070a3b3"
        },
        "date": 1782736725403,
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
          "id": "4b4b6df470d52a4f79db1bf825eef246df3fb2b3",
          "message": "test: add module-layer unit tests for body and compress (#184) (#199)\n\n* test: add module-layer unit tests for body and compress (#184)\n\nAdd missing Layer 2 unit tests for the two http/ middleware that only\nhad contract tests. body.spec.unit.js covers factory defaults, fast\npath, type filtering, charset handling, Content-Length validation,\ndecompression limits, lazy getter, compressed body paths, and error\nrethrow. compress.spec.unit.js covers encoding negotiation, compressor\nselection, threshold behavior, status/content-type skipping, res\npatching, Vary header, Content-Length removal, and stream error handling.\n\n* fix: address CodeRabbit review findings (#184)\n\n- Normalize req.headers to null-prototype object in makeReq() test stub\n- Fix streaming overflow test to use chunked encoding (exercises read-time limit)\n- Clear timeout in onFinish() helper to prevent lingering timers\n- Rewrite compressor error test to exercise the error handler via write-after-end\n\n* fix: use null-prototype headers in compress test fixtures (#184)\n\nAdd makeHeaders() helper and replace all inline header object literals\nwith null-prototype equivalents, consistent with body.spec.unit.js and\nthe DECISIONS.md null-prototype policy for user-input-derived data.\n\n* fix: use null-prototype headers in inline body test req stub (#184)",
          "timestamp": "2026-06-29T12:39:33Z",
          "tree_id": "65387cf35b393d32098204d3b739ad9df4ccddf5",
          "url": "https://github.com/CentralPing/ergo/commit/4b4b6df470d52a4f79db1bf825eef246df3fb2b3"
        },
        "date": 1782736791144,
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
          "id": "dddf562411b456240f1db0d14e41d8ad35b722a3",
          "message": "fix: replace bare {Array} JSDoc types with {*[]} shorthand (#187)",
          "timestamp": "2026-06-29T12:39:38Z",
          "url": "https://github.com/CentralPing/ergo/pull/200/commits/dddf562411b456240f1db0d14e41d8ad35b722a3"
        },
        "date": 1782744419273,
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
          "id": "70aa59702e9a00d94f9a495dadeb539bf2c1b3a8",
          "message": "style: replace bare {Array} JSDoc types with {*[]} shorthand (#187) (#200)\n\nFive annotations in lib/paginate.js (4) and utils/flat-array.js (1)\nused imprecise {Array} without type parameters. Replace with the {*[]}\nshorthand for consistency with the codebase's parameterized {Array<T>}\nconvention and the DECISIONS.md lowercase-primitives policy.",
          "timestamp": "2026-06-29T10:52:15-04:00",
          "tree_id": "936cda25dfc9462be314c3cade6711b7ba0ee3f8",
          "url": "https://github.com/CentralPing/ergo/commit/70aa59702e9a00d94f9a495dadeb539bf2c1b3a8"
        },
        "date": 1782744748442,
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
          "id": "d64abb86a15a891dd2db01bbaf57ba27c80d0b3b",
          "message": "test: add boundary tests for attach-instance and vary (#189)",
          "timestamp": "2026-06-29T14:53:14Z",
          "url": "https://github.com/CentralPing/ergo/pull/202/commits/d64abb86a15a891dd2db01bbaf57ba27c80d0b3b"
        },
        "date": 1782747811999,
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
          "id": "5be2d95e3bd154fd9d21d2c925017e36b2f4a5cf",
          "message": "test: add boundary tests for attach-instance and vary (#189)",
          "timestamp": "2026-06-29T14:53:14Z",
          "url": "https://github.com/CentralPing/ergo/pull/202/commits/5be2d95e3bd154fd9d21d2c925017e36b2f4a5cf"
        },
        "date": 1782752239205,
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
            "value": 0.013,
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
          "id": "cac41457ac80538cd2133e52a1f572384ee1be1e",
          "message": "test: add boundary tests for attach-instance and vary (#189) (#202)\n\n* test: add boundary tests for attach-instance and vary shared primitives (#189)\n\nAdd dedicated Layer 1 (Boundary) test files for lib/attach-instance.js and\nlib/vary.js to close the coverage gap identified in #189. Both shared\nprimitives were previously tested only indirectly through their consumers\n(handler.js and send.js respectively).\n\n- attach-instance: header present/absent, preserve existing, optional chaining, urn:uuid format\n- vary: single token, append, case-insensitive dedup, wildcard, multi-token, no-op\n\n* fix: short-circuit appendVary when Vary is wildcard * (#189)\n\nAdd wildcard short-circuit to lib/vary.js — when existing Vary header\ncontains *, no tokens are appended (RFC 9110 §12.5.5). Add boundary\ntest for the Vary: * + non-wildcard token case.\n\nAddresses CodeRabbit review finding on PR #202.",
          "timestamp": "2026-06-29T16:58:03Z",
          "tree_id": "e1e394b265fbd2a9786ac1996be4fab4583568cc",
          "url": "https://github.com/CentralPing/ergo/commit/cac41457ac80538cd2133e52a1f572384ee1be1e"
        },
        "date": 1782752296719,
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
          "id": "e3d3082ac08ba235a51032b84449f525772751e9",
          "message": "fix: validate Location header against dangerous URI schemes (#188)",
          "timestamp": "2026-06-29T16:58:09Z",
          "url": "https://github.com/CentralPing/ergo/pull/203/commits/e3d3082ac08ba235a51032b84449f525772751e9"
        },
        "date": 1782760527767,
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
          "id": "1d2ba17b55550797c620fef4c45273c5f2480314",
          "message": "fix: validate Location header against dangerous URI schemes (#188) (#203)\n\n* fix: validate Location header against dangerous URI schemes (#188)\n\nAdd lib/validate-location.js shared primitive that rejects javascript:,\ndata:, and vbscript: URI schemes in Location header values. Integrates\ninto send() before res.setHeader('Location', ...) to provide\ndefense-in-depth against CWE-601 XSS via open redirect.\n\n- Case-insensitive scheme matching per RFC 3986\n- Leading whitespace tolerance to prevent bypass\n- TypeError throw (consistent with formatLinkHeader pattern)\n- Three-layer test coverage (boundary, module, contract)\n\n* fix: normalize embedded control characters before scheme detection (#188)\n\nBrowsers strip ASCII tab, CR, and LF before URL scheme parsing (WHATWG\nURL §4.4), so inputs like java<TAB>script: bypass RFC 3986 scheme\nmatching but still resolve to javascript: on the client. Normalize\nthese characters out before extracting the scheme candidate.",
          "timestamp": "2026-06-29T19:16:17Z",
          "tree_id": "ad516966de6d3ae2840735267456c689956f7d58",
          "url": "https://github.com/CentralPing/ergo/commit/1d2ba17b55550797c620fef4c45273c5f2480314"
        },
        "date": 1782760591894,
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
            "value": 0.012,
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
          "id": "362bc1d13d3a4f9b40f8b9cd803add610959f0e0",
          "message": "fix: replace cookie value denylist with RFC 6265 cookie-octet allowlist (#206)",
          "timestamp": "2026-06-29T19:16:23Z",
          "url": "https://github.com/CentralPing/ergo/pull/209/commits/362bc1d13d3a4f9b40f8b9cd803add610959f0e0"
        },
        "date": 1782767880299,
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
            "value": 0.013,
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
          "id": "8855950634425139a5697161d0a3b98ad62083e1",
          "message": "fix: replace cookie value denylist with RFC 6265 cookie-octet allowlist (#206) (#209)\n\nSwitch assertSafeValue from a denylist regex (COOKIE_VALUE_UNSAFE_RE) to\nan anchored allowlist regex (COOKIE_VALUE_RE) matching RFC 6265 §4.1.1\ncookie-octet grammar. The denylist missed non-ASCII bytes (\\x80-\\xFF);\nthe allowlist rejects everything not explicitly permitted, closing the\nspec compliance gap. Aligns with the allowlist patterns already used by\nassertSafeName (TOKEN_RE) and the parser (valueRFC6265).",
          "timestamp": "2026-06-29T17:56:47-04:00",
          "tree_id": "5058ed66ad12c974370fef78d622159d7701ba67",
          "url": "https://github.com/CentralPing/ergo/commit/8855950634425139a5697161d0a3b98ad62083e1"
        },
        "date": 1782770223117,
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
          "id": "67adb26316666e5dbaf9a6c9f68a78929a140295",
          "message": "fix: replace sanitizeQuotedString denylist with qdtext allowlist (#208)",
          "timestamp": "2026-06-29T21:56:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/211/commits/67adb26316666e5dbaf9a6c9f68a78929a140295"
        },
        "date": 1782770357544,
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
          "id": "6158c31177e57d4eb4d68a527912af9b4913c292",
          "message": "fix: replace bare Buffer with import('node:buffer').Buffer in JSDoc (#213)",
          "timestamp": "2026-06-29T21:56:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/215/commits/6158c31177e57d4eb4d68a527912af9b4913c292"
        },
        "date": 1782770718730,
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
          "id": "48d5f83ce83fcd633d12b79124bd19d9bcd73dca",
          "message": "fix: wrap JSON.parse output with null-prototype conversion (#214)",
          "timestamp": "2026-06-29T21:56:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/216/commits/48d5f83ce83fcd633d12b79124bd19d9bcd73dca"
        },
        "date": 1782770847310,
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
          "id": "17ea9414a09d1bafec8ab9cc1e8b884c2d4821d9",
          "message": "fix: replace Link href denylist with RFC 3986 URI-reference allowlist (#207)",
          "timestamp": "2026-06-29T21:56:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/210/commits/17ea9414a09d1bafec8ab9cc1e8b884c2d4821d9"
        },
        "date": 1782777960623,
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
          "id": "1545e64aa59276948c7d025d7e0083a4b62d9006",
          "message": "fix: replace Link href denylist with RFC 3986 URI-reference allowlist (#207)",
          "timestamp": "2026-06-29T21:56:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/210/commits/1545e64aa59276948c7d025d7e0083a4b62d9006"
        },
        "date": 1782779811781,
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
            "value": 0.015,
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
          "id": "9088bb6536885667a368c7e45a9b099eac00ef57",
          "message": "fix: replace Link href denylist with RFC 3986 URI-reference allowlist (#207)",
          "timestamp": "2026-06-29T21:56:52Z",
          "url": "https://github.com/CentralPing/ergo/pull/210/commits/9088bb6536885667a368c7e45a9b099eac00ef57"
        },
        "date": 1782782802944,
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
          "id": "1344f0c061486194e6389ccc75f7f53feb332539",
          "message": "fix: replace Link href denylist with RFC 3986 URI-reference allowlist (#207) (#210)\n\n* fix: replace Link href denylist with RFC 3986 URI-reference allowlist (#207)\n\nReplace the four-character denylist (/[\\r\\n\\0>]/) in formatLinkHeader\nwith a positive character-set allowlist derived from RFC 3986 §2. Only\nunreserved, reserved, and percent-encoding characters are now accepted,\nrejecting all characters not permitted in a URI-reference by construction.\n\n* fix: require valid pct-encoded triplets in URI_REF_CHARS_RE (#207)\n\nTighten the href allowlist regex to require % followed by exactly two\nhex digits, rejecting bare percent signs and malformed sequences like\n%GG or %2. Addresses CodeRabbit review finding.\n\n* fix: separate empty-string rejection from URI-reference character validation (#207)\n\nEmpty href now throws a distinct error message (\"Link href must be a\nnon-empty URI-reference\") instead of the misleading \"contains characters\nnot permitted\" message. Updated JSDoc @throws and test expectation.",
          "timestamp": "2026-06-30T01:27:38Z",
          "tree_id": "15e9b50219cb1004dd1bf2fef800f7e3cdb37532",
          "url": "https://github.com/CentralPing/ergo/commit/1344f0c061486194e6389ccc75f7f53feb332539"
        },
        "date": 1782782868725,
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
          "id": "1798a241c411817cd7c62e8d2348f144f8b2b164",
          "message": "fix: replace sanitizeQuotedString denylist with qdtext allowlist (#208)",
          "timestamp": "2026-06-30T01:27:43Z",
          "url": "https://github.com/CentralPing/ergo/pull/211/commits/1798a241c411817cd7c62e8d2348f144f8b2b164"
        },
        "date": 1782790885379,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.011,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.003,
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
          "id": "938089c35d3470c8bc9837adcb0a6de9dfc9f1dc",
          "message": "fix: replace sanitizeQuotedString denylist with qdtext allowlist (#208)",
          "timestamp": "2026-06-30T01:27:43Z",
          "url": "https://github.com/CentralPing/ergo/pull/211/commits/938089c35d3470c8bc9837adcb0a6de9dfc9f1dc"
        },
        "date": 1782792636324,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "1b74d044b0a03727bc43d9b3e0096b3f54aaf196",
          "message": "fix: replace sanitizeQuotedString denylist with qdtext allowlist (#208)",
          "timestamp": "2026-06-30T01:27:43Z",
          "url": "https://github.com/CentralPing/ergo/pull/211/commits/1b74d044b0a03727bc43d9b3e0096b3f54aaf196"
        },
        "date": 1782827090345,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.031,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "4d473a008da3718aeb9fac1278160cd8cb4e6d4a",
          "message": "fix: replace sanitizeQuotedString denylist with qdtext allowlist (#208)",
          "timestamp": "2026-06-30T01:27:43Z",
          "url": "https://github.com/CentralPing/ergo/pull/211/commits/4d473a008da3718aeb9fac1278160cd8cb4e6d4a"
        },
        "date": 1782830510415,
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
          "id": "ef6a36b83c3f978763ae4c950fb4b6139326ecac",
          "message": "fix: replace sanitizeQuotedString denylist with qdtext allowlist (#208) (#211)\n\n* fix: replace sanitizeQuotedString denylist with qdtext allowlist (#208)\n\nReplace the control-character denylist regex with a positive allowlist\nderived from RFC 7230 §3.2.6 qdtext and quoted-pair productions.\nBehavioral equivalence maintained — strips the same character set.\n\n* fix: remove Set-Cookie from sanitizeQuotedString JSDoc contract (#208)\n\nThe function is used for WWW-Authenticate and Link header\nquoted-string parameters, not cookie values. Cookie values\nhave separate validation via assertSafeValue/assertSafeName.\n\n* fix: restrict sanitizeQuotedString allowlist to latin1 obs-text (#208)\n\nRFC 7230 §3.2.6 defines obs-text as %x80-FF (latin1 bytes).\nThe previous range \\u0080-\\uffff included code points above\nU+00FF that node:http rejects with ERR_INVALID_CHAR at\nsetHeader() time. Narrow to \\x80-\\xff for spec conformance\nand Node.js header API compatibility.\n\n* docs: correct CHANGELOG to reflect latin1 stripping behavior change (#208)\n\nThe obs-text fix (938089c) narrowed the allowlist to latin1,\nwhich now strips characters >U+00FF that the old denylist\npreserved. Update the changelog entry to accurately describe\nthis as a behavior change rather than claiming equivalence.",
          "timestamp": "2026-06-30T14:42:38Z",
          "tree_id": "fc559f6687732a31138a7e07c310aaaa26b37819",
          "url": "https://github.com/CentralPing/ergo/commit/ef6a36b83c3f978763ae4c950fb4b6139326ecac"
        },
        "date": 1782830573608,
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
            "value": 0.012,
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
          "id": "def4fb75f381ccb4daaadde3e917d5763db91d98",
          "message": "fix: replace parseIdempotencyKey denylist with RFC 8941 sf-string allowlist (#220)",
          "timestamp": "2026-06-30T14:42:59Z",
          "url": "https://github.com/CentralPing/ergo/pull/221/commits/def4fb75f381ccb4daaadde3e917d5763db91d98"
        },
        "date": 1782831651150,
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
          "id": "72a3b757b9f822149f3f4fc3eeddf735b5a1f523",
          "message": "fix: replace validateLocation denylist with RFC 3986 URI-reference allowlist (#217)",
          "timestamp": "2026-06-30T14:42:59Z",
          "url": "https://github.com/CentralPing/ergo/pull/222/commits/72a3b757b9f822149f3f4fc3eeddf735b5a1f523"
        },
        "date": 1782831795433,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "9e641319da4c344fd75d275fe7800f95038beb76",
          "message": "fix: cookie attribute validation uses per-attribute RFC grammars (#218)",
          "timestamp": "2026-06-30T14:42:59Z",
          "url": "https://github.com/CentralPing/ergo/pull/223/commits/9e641319da4c344fd75d275fe7800f95038beb76"
        },
        "date": 1782831925448,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.012,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.003,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.005,
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
          "id": "d89832bc3cee6f743acf5dc4e43bd6499e424aaa",
          "message": "feat: enforce RFC 7240 token/quoted-string grammar in Prefer header parser (#219)",
          "timestamp": "2026-06-30T14:42:59Z",
          "url": "https://github.com/CentralPing/ergo/pull/224/commits/d89832bc3cee6f743acf5dc4e43bd6499e424aaa"
        },
        "date": 1782832048855,
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
          "id": "4cd9fd40d35802aa1023d9a0f8ab42056c85a269",
          "message": "feat: enforce RFC 7240 token/quoted-string grammar in Prefer header parser (#219)",
          "timestamp": "2026-06-30T14:42:59Z",
          "url": "https://github.com/CentralPing/ergo/pull/224/commits/4cd9fd40d35802aa1023d9a0f8ab42056c85a269"
        },
        "date": 1782832497948,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.027,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.008,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "d8e36bf0f7a09df12d42a0b8d0f63e559c304fab",
          "message": "fix: replace bare Buffer with import('node:buffer').Buffer in JSDoc (#213)",
          "timestamp": "2026-06-30T14:42:59Z",
          "url": "https://github.com/CentralPing/ergo/pull/215/commits/d8e36bf0f7a09df12d42a0b8d0f63e559c304fab"
        },
        "date": 1782852048051,
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
            "value": 0.014,
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
          "id": "7edab0785896b732412a6feebee8c178d0593605",
          "message": "fix: replace bare Buffer with import('node:buffer').Buffer in JSDoc (#213) (#215)\n\n* fix: replace bare Buffer with import('node:buffer').Buffer in JSDoc (#213)\n\nTwo JSDoc @param annotations used bare {Buffer} instead of the\nrequired {import('node:buffer').Buffer} form per DECISIONS.md\nCritical Constraints. Also normalizes pipe spacing to match\ncodebase convention (no spaces around |).\n\nAffected files:\n- http/body.spec.unit.js:25 — makeReq helper\n- lib/idempotency.js:132 — generateFingerprint\n\n* docs: add CHANGELOG entry for JSDoc bare Buffer fix (#213)",
          "timestamp": "2026-06-30T16:44:25-04:00",
          "tree_id": "91833e7076b00d7ebc703734423ac1fb9ffda1a7",
          "url": "https://github.com/CentralPing/ergo/commit/7edab0785896b732412a6feebee8c178d0593605"
        },
        "date": 1782852278388,
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
          "id": "321eb1d3a5c1f9406c6a1111351b7f37e0abb0f8",
          "message": "fix: wrap JSON.parse output with null-prototype conversion (#214)",
          "timestamp": "2026-06-30T20:44:29Z",
          "url": "https://github.com/CentralPing/ergo/pull/216/commits/321eb1d3a5c1f9406c6a1111351b7f37e0abb0f8"
        },
        "date": 1782853460371,
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
          "id": "928350bbea97d96d4c51c871d577ea8a2211dc93",
          "message": "fix: wrap JSON.parse output with null-prototype conversion (#214) (#216)\n\nApply deep recursive toNullPrototype() to all JSON.parse() output in\nhttp/body.js, covering both the identity-encoded fast path and the\ncompressed-body lazy getter (Proxy fallback). Aligns parsed body\nobjects with the null-prototype policy enforced by query, cookie, and\nPrefer parsers.",
          "timestamp": "2026-06-30T17:51:43-04:00",
          "tree_id": "80e44494fd921267f2e1542d9bffa43ad28a76f7",
          "url": "https://github.com/CentralPing/ergo/commit/928350bbea97d96d4c51c871d577ea8a2211dc93"
        },
        "date": 1782856316221,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
          "id": "3017607058cfbbe216e9dff56c82cfbb38c15371",
          "message": "fix: replace parseIdempotencyKey denylist with RFC 8941 sf-string allowlist (#220)",
          "timestamp": "2026-06-30T21:51:47Z",
          "url": "https://github.com/CentralPing/ergo/pull/221/commits/3017607058cfbbe216e9dff56c82cfbb38c15371"
        },
        "date": 1782857625511,
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
          "id": "4c5a344bf03f7251b497d051f001c495c03a6d36",
          "message": "fix: replace parseIdempotencyKey denylist with RFC 8941 sf-string allowlist (#220) (#221)\n\nReplace the permissive SF_STRING_RE regex (negated character class [^\"\\\\])\nwith a positive allowlist derived from RFC 8941 §3.3.3's unescaped and\nescaped productions. Eliminates the denylist escape check — the regex\nitself now rejects invalid escape sequences at the match stage.\n\nCTL characters, DEL, non-ASCII bytes, and HTAB in the inner string are\nnow correctly rejected. Only valid RFC 8941 sf-string values are accepted.",
          "timestamp": "2026-06-30T19:29:14-04:00",
          "tree_id": "25a6fd495ab1fbcb334739a040483d65df779653",
          "url": "https://github.com/CentralPing/ergo/commit/4c5a344bf03f7251b497d051f001c495c03a6d36"
        },
        "date": 1782862167817,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.029,
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
          "id": "a774ff8714085e14425e4941919cd9c91fe732a5",
          "message": "fix: replace validateLocation denylist with RFC 3986 URI-reference allowlist (#217)",
          "timestamp": "2026-06-30T23:29:19Z",
          "url": "https://github.com/CentralPing/ergo/pull/222/commits/a774ff8714085e14425e4941919cd9c91fe732a5"
        },
        "date": 1782863147478,
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
          "id": "a374fde569a9e528aff7f780b064e13a26b558ca",
          "message": "fix: replace validateLocation denylist with RFC 3986 URI-reference allowlist (#217)",
          "timestamp": "2026-06-30T23:29:19Z",
          "url": "https://github.com/CentralPing/ergo/pull/222/commits/a374fde569a9e528aff7f780b064e13a26b558ca"
        },
        "date": 1782864178030,
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
          "id": "296c53b78d872eea7e3c83bab42feee535e776a3",
          "message": "fix: replace validateLocation denylist with RFC 3986 URI-reference allowlist (#217) (#222)\n\n* fix: replace validateLocation denylist with RFC 3986 URI-reference allowlist (#217)\n\nReplace the three-character CONTROL_STRIP_RE denylist with a URI_REF_CHARS_RE\nallowlist derived from RFC 3986 §2. Now rejects all characters not permitted\nin a URI-reference — NUL, C0 controls, DEL, non-ASCII, bare percent signs,\nand malformed percent-encoding. Follows the same pattern applied in\nformatLinkHeader (#207), sanitizeQuotedString (#208), and cookie-octet\nvalidation (#206). This is the last remaining denylist in the codebase.\n\n* test: assert no Location header set on validation throw (#217)\n\nAdd side-effect assertion to all four location-throws tests verifying\nres._headers['location'] is absent after validateLocation rejects.\nCatches regressions that reverse the validate-then-setHeader order.",
          "timestamp": "2026-06-30T20:48:37-04:00",
          "tree_id": "7f18e579a273b4b69c90e49f8ccc6705d708744b",
          "url": "https://github.com/CentralPing/ergo/commit/296c53b78d872eea7e3c83bab42feee535e776a3"
        },
        "date": 1782866931882,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
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
          "id": "985791a8227b01c0754743686552cce98493a9cb",
          "message": "fix: cookie attribute validation uses per-attribute RFC grammars (#218)",
          "timestamp": "2026-07-01T00:48:42Z",
          "url": "https://github.com/CentralPing/ergo/pull/223/commits/985791a8227b01c0754743686552cce98493a9cb"
        },
        "date": 1782874623365,
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
          "id": "017692980fab173c54c209eddb4cf1cb3d9a4c2f",
          "message": "fix: cookie attribute validation uses per-attribute RFC grammars (#218) (#223)\n\n* fix: cookie attribute validation uses per-attribute RFC grammars (#218)\n\nDomain validates against RFC 1034/1123 subdomain grammar, path validates\nagainst RFC 6265 §4.1.2.4 path-value, and SameSite validates against the\nRFC 6265bis {Strict, Lax, None} enum. Previously all three incorrectly\nused the cookie-octet grammar intended only for cookie values.\n\n* fix: coerce cookie fields to primitives before validation (#218)\n\nBoxed strings and objects with custom toString() bypass the typeof-based\nassertSafe* guards but still interpolate into the Set-Cookie header via\ntemplate literals. Coerce name, value, domain, path, and sameSite to\nprimitive strings via String() in toHeader() before validation, consistent\nwith the sibling pattern in sanitize-quoted-string.js, link.js, and\nresponse-schema.js. Adds 8 regression tests for boxed/object inputs.",
          "timestamp": "2026-06-30T23:46:25-04:00",
          "tree_id": "2105621458cd6f0a08031ca15c3287e217ce3f47",
          "url": "https://github.com/CentralPing/ergo/commit/017692980fab173c54c209eddb4cf1cb3d9a4c2f"
        },
        "date": 1782877599919,
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
          "id": "62b99cf7165d53252b7fbae3ee898f742c67759e",
          "message": "feat: enforce RFC 7240 token/quoted-string grammar in Prefer header parser (#219)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/224/commits/62b99cf7165d53252b7fbae3ee898f742c67759e"
        },
        "date": 1782907758019,
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
          "id": "0e45549b386aff927af73e96c7b426f97014a6d6",
          "message": "feat: enforce RFC 7240 token/quoted-string grammar in Prefer header parser (#219)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/224/commits/0e45549b386aff927af73e96c7b426f97014a6d6"
        },
        "date": 1782907846602,
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
            "value": 0.012,
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
          "id": "1385b428a96271f2d5e260b081cd3fc958606420",
          "message": "feat: enforce RFC 7240 token/quoted-string grammar in Prefer header parser (#219)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/224/commits/1385b428a96271f2d5e260b081cd3fc958606420"
        },
        "date": 1782909594355,
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
          "id": "2c64973897f157b243033342cc43cd806bb913d9",
          "message": "test: strengthen IdempotencyStore assertion specificity (#228)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/229/commits/2c64973897f157b243033342cc43cd806bb913d9"
        },
        "date": 1782910467698,
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
          "id": "938113904980f20b2aa40dcc8f196d439187cdd8",
          "message": "fix: IdempotencyStore defensive coding improvements (#226)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/231/commits/938113904980f20b2aa40dcc8f196d439187cdd8"
        },
        "date": 1782910744730,
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
            "value": 0.012,
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
          "id": "ad358973d3f5a36c078e147f3e5f3fad9160c299",
          "message": "feat: add keyGenerator option to idempotency middleware (#227)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/232/commits/ad358973d3f5a36c078e147f3e5f3fad9160c299"
        },
        "date": 1782910782736,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
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
          "id": "05d3acc34fec59a38ab19f5a2c1cc2c2baeb5fe8",
          "message": "fix: IdempotencyStore eviction correctness with generation token validation (#225)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/233/commits/05d3acc34fec59a38ab19f5a2c1cc2c2baeb5fe8"
        },
        "date": 1782911142139,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.022,
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
          "id": "f305906df68907eee5c560f806be10c3c30a9b73",
          "message": "feat: enforce RFC 7240 token/quoted-string grammar in Prefer header parser (#219)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/224/commits/f305906df68907eee5c560f806be10c3c30a9b73"
        },
        "date": 1782911159041,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.019,
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
          "id": "b26af6d7eb40e9c4ae7a61dce1cd372e3abd4805",
          "message": "fix: IdempotencyStore eviction correctness with generation token validation (#225)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/233/commits/b26af6d7eb40e9c4ae7a61dce1cd372e3abd4805"
        },
        "date": 1782911447543,
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
          "id": "336552c70d3afa5343683c71fbaf6c55573df7e3",
          "message": "fix: IdempotencyStore eviction correctness with generation token validation (#225)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/233/commits/336552c70d3afa5343683c71fbaf6c55573df7e3"
        },
        "date": 1782911719150,
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
            "value": 0.016,
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
          "id": "d44e20f9cb608b644199405f19601e8810c6aee4",
          "message": "fix: validate MemoryStore constructor parameters (#230)",
          "timestamp": "2026-07-01T03:46:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/234/commits/d44e20f9cb608b644199405f19601e8810c6aee4"
        },
        "date": 1782912505789,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.012,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.003,
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
          "id": "bcde7ca1600a3ced9bcb635c7788fb7cba3f8e49",
          "message": "feat: enforce RFC 7240 token/quoted-string grammar in Prefer header parser (#219) (#224)\n\n* feat: enforce RFC 7240 token/quoted-string grammar in Prefer header parser (#219)\n\nReplace the loose regex in lib/prefer.js with a character-by-character\nscanner that enforces RFC 9110 §5.6.2 token and §5.6.4 quoted-string\ngrammars. Preference names now accept the full tchar set, quoted values\nhandle backslash escapes and reject bare CTLs, and commas inside quoted\nvalues no longer break parsing. Malformed preferences are silently\nskipped (graceful degradation).\n\n* fix: address review findings (#219)\n\n- Restrict obs-text to Latin-1 bytes (%x80-FF) in quoted-string parser\n- Reject preferences with trailing junk after value (terminator check)\n- Update test: malformed unquoted tokens skip instead of truncate\n- Add tests for trailing-junk-after-quoted-value and non-Latin-1 rejection\n\n* fix: use skipToNextComma for malformed quoted value recovery (#219)\n\nPrevents spurious orphan keys when non-comma text follows a rejected\nquoted value's closing DQUOTE before the next comma separator.\n\n* fix: recover from unterminated quotes in skipToNextComma (#219)\n\nTrack the first comma inside an unterminated quoted-string scan so\nrecovery falls back to the next list delimiter instead of consuming\nall remaining preferences.",
          "timestamp": "2026-07-01T12:37:42-04:00",
          "tree_id": "3a30049485c7d41926b23b0f1c7c2bf260572003",
          "url": "https://github.com/CentralPing/ergo/commit/bcde7ca1600a3ced9bcb635c7788fb7cba3f8e49"
        },
        "date": 1782923879369,
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
          "id": "929e92ca2dfaf2f1084748e45225eadf26752c81",
          "message": "fix: normalize Prefer header names and values to lowercase (#235)",
          "timestamp": "2026-07-01T16:37:50Z",
          "url": "https://github.com/CentralPing/ergo/pull/236/commits/929e92ca2dfaf2f1084748e45225eadf26752c81"
        },
        "date": 1782925349329,
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
          "id": "4247f8209d2b21b52131986af2690035e1f7f7ba",
          "message": "test: add IdempotencyStore cross-concern boundary test (TTL x eviction) (#237)",
          "timestamp": "2026-07-01T16:37:50Z",
          "url": "https://github.com/CentralPing/ergo/pull/238/commits/4247f8209d2b21b52131986af2690035e1f7f7ba"
        },
        "date": 1782936562592,
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
          "id": "3e2f35534ff1b20cc56f78ec100edc6c5be7bf07",
          "message": "test: strengthen IdempotencyStore assertion specificity (#228)",
          "timestamp": "2026-07-01T16:37:50Z",
          "url": "https://github.com/CentralPing/ergo/pull/229/commits/3e2f35534ff1b20cc56f78ec100edc6c5be7bf07"
        },
        "date": 1782941455449,
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
          "id": "a64b5f93506b68e5469cf536dedb892d76e1944f",
          "message": "test: strengthen IdempotencyStore assertion specificity (#228) (#229)\n\nAdd pre-condition assertions, specific field checks, lazy-prune\nverification, field survival proofs, and deterministic hash assertion\nto eliminate vacuous test passes.",
          "timestamp": "2026-07-01T21:31:44Z",
          "tree_id": "53c38aba0191b023275b6e4f8f19c44863c9a727",
          "url": "https://github.com/CentralPing/ergo/commit/a64b5f93506b68e5469cf536dedb892d76e1944f"
        },
        "date": 1782941521236,
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
          "id": "4dd0ff99f7473eb07a23fd904640c61706dce68b",
          "message": "fix: IdempotencyStore defensive coding improvements (#226)",
          "timestamp": "2026-07-01T21:31:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/231/commits/4dd0ff99f7473eb07a23fd904640c61706dce68b"
        },
        "date": 1782944733224,
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
          "id": "48691d6ded76e70209a7653678d190fd54bd0e7c",
          "message": "fix: IdempotencyStore defensive coding improvements (#226)",
          "timestamp": "2026-07-01T21:31:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/231/commits/48691d6ded76e70209a7653678d190fd54bd0e7c"
        },
        "date": 1782944797221,
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
          "id": "18c09e683dd0d3e1929927c23577a4f755a5958a",
          "message": "fix: IdempotencyStore defensive coding improvements (#226)",
          "timestamp": "2026-07-01T21:31:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/231/commits/18c09e683dd0d3e1929927c23577a4f755a5958a"
        },
        "date": 1782966597636,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "a16db55e13fe8694e6743206eac85a7d14106cf7",
          "message": "fix: IdempotencyStore defensive coding improvements (#226)",
          "timestamp": "2026-07-01T21:31:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/231/commits/a16db55e13fe8694e6743206eac85a7d14106cf7"
        },
        "date": 1782998459387,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
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
          "id": "952e72eefef622d6003632e7ef12d049cab028d3",
          "message": "fix: IdempotencyStore defensive coding improvements (#226)",
          "timestamp": "2026-07-01T21:31:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/231/commits/952e72eefef622d6003632e7ef12d049cab028d3"
        },
        "date": 1783014343933,
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
            "value": 0.012,
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
          "id": "81d37b5bf0c1fc2a9b567a678e1e2ec8c76ced78",
          "message": "fix: IdempotencyStore defensive coding improvements (#226)",
          "timestamp": "2026-07-01T21:31:49Z",
          "url": "https://github.com/CentralPing/ergo/pull/231/commits/81d37b5bf0c1fc2a9b567a678e1e2ec8c76ced78"
        },
        "date": 1783016733053,
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
          "id": "8bdb200317607e3ac9c097610da89377968f1591",
          "message": "fix: IdempotencyStore defensive coding improvements (#226) (#231)\n\n* fix: IdempotencyStore defensive coding improvements (#226)\n\nConstructor validates maxKeys (positive integer) and ttlMs (positive\nfinite number) with TypeError. get() returns a frozen shallow copy\ninstead of the live internal entry. complete() stores a shallow copy\nof the response object. Non-breaking: existing valid usage unaffected.\n\n* fix: freeze response snapshot in get() to prevent store corruption\n\nObject.freeze(snapshot) only protected the top-level wrapper — the\nresponse reference was still mutable through the returned snapshot.\nShallow-copy and freeze the response (including headers array) on\neach get() call, matching the copy-on-write pattern in complete().\n\nAdds regression test verifying response mutation isolation.\n\n* fix: atomic status+response assignment in complete()\n\nCompute the cloned response before mutating entry.status so a\nTypeError from null/undefined response does not leave the entry\nin a corrupted 'complete' state with no replay payload.\n\nAdds regression test verifying entry state is preserved on throw.\n\n* fix: deep-clone header tuples to prevent tuple-level mutation leaks\n\n[...headers] only copies the outer array — individual tuples remain\nshared references. Use .map(header => [...header]) in both get() and\ncomplete() to ensure tuple-level mutations by callers or consumers\ncannot affect stored state.\n\nAdds regression tests for tuple-element mutation on both paths.\n\n* fix: deep-clone full response via structuredClone for complete isolation\n\nReplace manual spread+header-map with structuredClone in both get() and\ncomplete() — nested objects (response.body, etc.) are now fully isolated\nfrom store state, not just headers. Adds explicit TypeError guard in\ncomplete() for nullish responses. Updates JSDoc and CHANGELOG to reflect\ndeep-clone guarantee.\n\n* docs: fix JSDoc return type for get() and add @throws to complete()\n\n- get() @returns: response field is object|undefined (undefined when\n  entry is still processing)\n- complete() @throws: document the new TypeError guard for nullish\n  response inputs",
          "timestamp": "2026-07-02T15:26:26-04:00",
          "tree_id": "4fd5e107135a9352475baf59be05ad8e1289933b",
          "url": "https://github.com/CentralPing/ergo/commit/8bdb200317607e3ac9c097610da89377968f1591"
        },
        "date": 1783020399056,
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
          "id": "2ca9c78cdf17c11200e792530fd36c607724cd9f",
          "message": "feat: add keyGenerator option to idempotency middleware (#227)",
          "timestamp": "2026-07-02T19:26:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/232/commits/2ca9c78cdf17c11200e792530fd36c607724cd9f"
        },
        "date": 1783028653967,
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
          "id": "f4ce58b4346ca3a76ba989e7b965440b8c345fad",
          "message": "feat: add keyGenerator option to idempotency middleware (#227)",
          "timestamp": "2026-07-02T19:26:30Z",
          "url": "https://github.com/CentralPing/ergo/pull/232/commits/f4ce58b4346ca3a76ba989e7b965440b8c345fad"
        },
        "date": 1783028727357,
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
          "id": "91c3c87d78c70e09172b650bba5087a85f884146",
          "message": "feat: add keyGenerator option to idempotency middleware (#227) (#232)\n\n* feat: add keyGenerator option to idempotency middleware (#227)\n\nAdd consumer-provided key scoping to the idempotency middleware via a\nkeyGenerator option, following the established rate-limit keyGenerator\npattern. Enables multi-tenant isolation by binding store keys to auth\nprincipal, route, or HTTP method per IETF draft §5 composite key\nrecommendation. Defaults to identity (unscoped), preserving existing\nbehavior.\n\n* docs: add collision-free warning to keyGenerator JSDoc (#227)",
          "timestamp": "2026-07-02T18:53:22-04:00",
          "tree_id": "2d7e402f422bd670287f840299d462f2e5f17c64",
          "url": "https://github.com/CentralPing/ergo/commit/91c3c87d78c70e09172b650bba5087a85f884146"
        },
        "date": 1783032814661,
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
          "id": "b34d111d838a868b5fcecf3649ff5331d2bde5b0",
          "message": "fix: IdempotencyStore eviction correctness with generation token validation (#225)",
          "timestamp": "2026-07-02T22:53:27Z",
          "url": "https://github.com/CentralPing/ergo/pull/233/commits/b34d111d838a868b5fcecf3649ff5331d2bde5b0"
        },
        "date": 1783036815652,
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
          "id": "16b93431129acb51469254ff55b9dfad58e81172",
          "message": "fix: IdempotencyStore eviction correctness with generation token validation (#225)",
          "timestamp": "2026-07-02T22:53:27Z",
          "url": "https://github.com/CentralPing/ergo/pull/233/commits/16b93431129acb51469254ff55b9dfad58e81172"
        },
        "date": 1783037751349,
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
          "id": "8c0ae7aa20b7c8a86a7a78609e5b2f17e50a9045",
          "message": "fix: IdempotencyStore eviction correctness with generation token validation (#225)",
          "timestamp": "2026-07-02T22:53:27Z",
          "url": "https://github.com/CentralPing/ergo/pull/233/commits/8c0ae7aa20b7c8a86a7a78609e5b2f17e50a9045"
        },
        "date": 1783051495902,
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
          "id": "cf1e1803f48d3c9d946ef83933a3b2cbfe72c971",
          "message": "fix: IdempotencyStore eviction correctness with generation token validation (#225) (#233)\n\n* fix: IdempotencyStore eviction correctness with generation token validation (#225)\n\nset() now prunes expired entries before capacity check, preferentially\nevicts complete entries over processing entries, and returns a generation\ntoken. complete() validates the token and returns boolean. Missing\nresponse arguments are rejected. Processing entry eviction emits a\none-time ErgoWarning diagnostic.\n\nCloses #225\n\n* perf: early break in TTL prune loop (#225)\n\nMap insertion order guarantees ascending expiresAt (constant ttlMs),\nso once an unexpired entry is found all subsequent entries are also\nunexpired. Stops O(n) full-scan on every set() call.\n\n* test: strengthen eviction test to prove status over age (#225)\n\nCompletes b for status=complete instead of a (the oldest), so FIFO\nwould evict a while status-aware eviction evicts b. The test now\ndistinguishes the two strategies.\n\n* fix: prevent spurious eviction and ordering invariant break on key re-set (#225)\n\nMap.set() on an existing key does not move it to end of iteration order,\nwhich breaks the prune loop's ascending-expiresAt early-break invariant.\nDelete-before-insert ensures correct ordering and prevents the capacity\ncheck from triggering when the map isn't actually growing.",
          "timestamp": "2026-07-03T08:16:29-04:00",
          "tree_id": "0b571f8a35cde1466dec08419dd976b2a7ca7f60",
          "url": "https://github.com/CentralPing/ergo/commit/cf1e1803f48d3c9d946ef83933a3b2cbfe72c971"
        },
        "date": 1783081001588,
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
          "id": "89f7dbc435a4ff791af1773fd03c12f6abfdd868",
          "message": "perf: O(1) eviction-candidate lookup via side index (#239)",
          "timestamp": "2026-07-03T12:16:34Z",
          "url": "https://github.com/CentralPing/ergo/pull/240/commits/89f7dbc435a4ff791af1773fd03c12f6abfdd868"
        },
        "date": 1783084522194,
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
          "id": "9bd4d404357470d991856137c2dcd43845fe74a7",
          "message": "fix: validate MemoryStore constructor parameters (#230)",
          "timestamp": "2026-07-03T12:16:34Z",
          "url": "https://github.com/CentralPing/ergo/pull/234/commits/9bd4d404357470d991856137c2dcd43845fe74a7"
        },
        "date": 1783084735894,
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
          "id": "f2d09fe72c33c85b6a214291bd96fe301bac1b17",
          "message": "fix: validate MemoryStore constructor parameters (#230) (#234)\n\nmaxKeys must be a positive integer; now must be a function. Invalid\nvalues that previously caused silent misconfiguration now throw\nTypeError at construction time.",
          "timestamp": "2026-07-03T09:32:03-04:00",
          "tree_id": "544d915f88319e624641111e46a2ae82d6980900",
          "url": "https://github.com/CentralPing/ergo/commit/f2d09fe72c33c85b6a214291bd96fe301bac1b17"
        },
        "date": 1783085538920,
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
            "value": 0.012,
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
          "id": "09467bd6f0560c56d2ce266d295f1957ba594c6f",
          "message": "fix: normalize Prefer header names and values to lowercase (#235)",
          "timestamp": "2026-07-03T13:32:08Z",
          "url": "https://github.com/CentralPing/ergo/pull/236/commits/09467bd6f0560c56d2ce266d295f1957ba594c6f"
        },
        "date": 1783089221982,
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
          "id": "bb3e633a9828ff2deb9029b3f0c867e76fa7769f",
          "message": "fix: normalize Prefer header names and values to lowercase (#235) (#236)\n\nPreference names lowercased per RFC 7240 §2 (case-insensitive comparison).\nPreference values lowercased as Postel's Law leniency for interoperability.\nA client sending `Prefer: Return=Minimal` now produces `{return: 'minimal'}`.",
          "timestamp": "2026-07-03T10:43:08-04:00",
          "tree_id": "284dc42d8f2b5bbeefb839eeb8e845269a34f42e",
          "url": "https://github.com/CentralPing/ergo/commit/bb3e633a9828ff2deb9029b3f0c867e76fa7769f"
        },
        "date": 1783089801202,
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
          "id": "8a3184abe066358edd5fc4a8fb7afa10dfa4b2c7",
          "message": "test: add IdempotencyStore cross-concern boundary test (TTL x eviction) (#237)",
          "timestamp": "2026-07-03T14:43:13Z",
          "url": "https://github.com/CentralPing/ergo/pull/238/commits/8a3184abe066358edd5fc4a8fb7afa10dfa4b2c7"
        },
        "date": 1783104185737,
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
          "id": "3abb56560dee8789616b50522b163798581369fa",
          "message": "test: add IdempotencyStore cross-concern boundary test (TTL x eviction) (#237) (#238)\n\nAdd a boundary test exercising the interaction between TTL expiry and\nmaxKeys eviction in IdempotencyStore. The test verifies that expired\nentries accessed via get() free capacity for subsequent set() calls,\nclosing a defense-in-depth test coverage gap identified during PR #229\nreview.\n\nCloses #237",
          "timestamp": "2026-07-03T18:44:01Z",
          "tree_id": "2b1c76b9a36c8e28b34447b1619fb894dadf22f2",
          "url": "https://github.com/CentralPing/ergo/commit/3abb56560dee8789616b50522b163798581369fa"
        },
        "date": 1783104253575,
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
            "value": 0.012,
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
          "id": "76ed5b41b553745edd76d49f67cf2eef49511d3a",
          "message": "perf: O(1) eviction-candidate lookup via side index (#239)",
          "timestamp": "2026-07-03T18:44:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/240/commits/76ed5b41b553745edd76d49f67cf2eef49511d3a"
        },
        "date": 1783105229377,
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
            "value": 0.012,
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
          "id": "4f74e7866cbbaccd23ad3d017cae5adf55bca7a2",
          "message": "perf: O(1) eviction-candidate lookup via side index (#239)",
          "timestamp": "2026-07-03T18:44:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/240/commits/4f74e7866cbbaccd23ad3d017cae5adf55bca7a2"
        },
        "date": 1783106264044,
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
          "id": "490810cc29cfb12daa9e9425c4c221e86899b549",
          "message": "chore(deps-dev): Bump the all-patches group with 2 updates",
          "timestamp": "2026-07-03T18:44:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/242/commits/490810cc29cfb12daa9e9425c4c221e86899b549"
        },
        "date": 1783114437219,
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
          "id": "7ae75b53548a128987c9f67abfa2eff275a44e4b",
          "message": "chore(deps-dev): Bump the dev-minor group with 2 updates",
          "timestamp": "2026-07-03T18:44:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/243/commits/7ae75b53548a128987c9f67abfa2eff275a44e4b"
        },
        "date": 1783114453464,
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
          "id": "4a546e3ce5217dec11b9879f0336fc4f108bac9d",
          "message": "chore(deps-dev): Bump @types/node from 25.9.3 to 26.0.0 in the dev-major group",
          "timestamp": "2026-07-03T18:44:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/244/commits/4a546e3ce5217dec11b9879f0336fc4f108bac9d"
        },
        "date": 1783114463164,
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
          "id": "c325f84e24e5c3c02973af78dd11fb7b6cc43801",
          "message": "perf: O(1) eviction-candidate lookup via side index (#239) (#240)\n\n* perf: O(1) eviction-candidate lookup via side index (#239)\n\nAdd _completeKeys Set as a secondary index to IdempotencyStore tracking\nkeys with complete status. Eviction in set() now uses\n_completeKeys.values().next().value instead of linear-scanning the\nentire _entries Map for the first non-processing entry.\n\nAll mutation paths maintain the side index: get() lazy expiry, set()\nTTL prune, set() delete-before-insert, set() eviction, complete()\nstatus transition, and delete(). Invariant tests verify side-index\nconsistency across all paths.\n\nInternal optimization — no public API changes; custom store\nimplementations are unaffected.\n\n* test: add multi-complete-key eviction order test (#239)\n\nVerifies that eviction selects the first-completed entry (Set\ninsertion order) when multiple complete entries exist, proving\nthe side-index mechanism rather than incidental single-entry\nbehavior.",
          "timestamp": "2026-07-03T19:23:29-04:00",
          "tree_id": "6d10edeeacf39fab6ba12681117dd01595119666",
          "url": "https://github.com/CentralPing/ergo/commit/c325f84e24e5c3c02973af78dd11fb7b6cc43801"
        },
        "date": 1783121025745,
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
          "id": "ed7130fecbc5a63e923f9681f3e21a80dd6f7af8",
          "message": "chore(deps-dev): Bump the dev-minor group with 2 updates",
          "timestamp": "2026-07-03T23:23:34Z",
          "url": "https://github.com/CentralPing/ergo/pull/243/commits/ed7130fecbc5a63e923f9681f3e21a80dd6f7af8"
        },
        "date": 1783121409696,
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
          "id": "0433e3122792f2e6a6f7d4642701d30cc32c3026",
          "message": "chore(deps-dev): Bump the dev-minor group with 2 updates (#243)\n\nBumps the dev-minor group with 2 updates: [eslint](https://github.com/eslint/eslint) and [globals](https://github.com/sindresorhus/globals).\n\n\nUpdates `eslint` from 10.5.0 to 10.6.0\n- [Release notes](https://github.com/eslint/eslint/releases)\n- [Commits](https://github.com/eslint/eslint/compare/v10.5.0...v10.6.0)\n\nUpdates `globals` from 17.6.0 to 17.7.0\n- [Release notes](https://github.com/sindresorhus/globals/releases)\n- [Commits](https://github.com/sindresorhus/globals/compare/v17.6.0...v17.7.0)\n\n---\nupdated-dependencies:\n- dependency-name: eslint\n  dependency-version: 10.6.0\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: dev-minor\n- dependency-name: globals\n  dependency-version: 17.7.0\n  dependency-type: direct:development\n  update-type: version-update:semver-minor\n  dependency-group: dev-minor\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-07-03T23:30:57Z",
          "tree_id": "600188b8bccfc2a4587411896708f9ee601dad19",
          "url": "https://github.com/CentralPing/ergo/commit/0433e3122792f2e6a6f7d4642701d30cc32c3026"
        },
        "date": 1783121468497,
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
          "id": "b16ef90a2793188c3f751d689fea01ff80986aa0",
          "message": "chore(deps-dev): Bump @types/node from 25.9.3 to 26.0.0 in the dev-major group",
          "timestamp": "2026-07-03T23:31:01Z",
          "url": "https://github.com/CentralPing/ergo/pull/244/commits/b16ef90a2793188c3f751d689fea01ff80986aa0"
        },
        "date": 1783121558127,
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
          "id": "18c198c0536c4f88d546dc11c57cc7e238622854",
          "message": "chore(deps-dev): Bump the all-patches group across 1 directory with 2 updates",
          "timestamp": "2026-07-03T23:31:01Z",
          "url": "https://github.com/CentralPing/ergo/pull/242/commits/18c198c0536c4f88d546dc11c57cc7e238622854"
        },
        "date": 1783121616914,
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
          "id": "059110f730c8d03c1a0661850509efd110b6ef79",
          "message": "chore(deps-dev): Bump @types/node in the dev-major group (#244)\n\nBumps the dev-major group with 1 update: [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/node).\n\n\nUpdates `@types/node` from 25.9.3 to 26.0.0\n- [Release notes](https://github.com/DefinitelyTyped/DefinitelyTyped/releases)\n- [Commits](https://github.com/DefinitelyTyped/DefinitelyTyped/commits/HEAD/types/node)\n\n---\nupdated-dependencies:\n- dependency-name: \"@types/node\"\n  dependency-version: 26.0.0\n  dependency-type: direct:development\n  update-type: version-update:semver-major\n  dependency-group: dev-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-07-03T23:33:29Z",
          "tree_id": "d413d4395abf2a3ee274c1b655b56b0b530bf444",
          "url": "https://github.com/CentralPing/ergo/commit/059110f730c8d03c1a0661850509efd110b6ef79"
        },
        "date": 1783121622321,
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
          "id": "0fd92356858ade35ece797c83ff6ae121484b5d4",
          "message": "chore(deps-dev): Bump the all-patches group across 1 directory with 2 updates",
          "timestamp": "2026-07-03T23:33:33Z",
          "url": "https://github.com/CentralPing/ergo/pull/242/commits/0fd92356858ade35ece797c83ff6ae121484b5d4"
        },
        "date": 1783121703918,
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
          "id": "18abeba62efee9944f6e0c5911241a836a32abeb",
          "message": "chore(deps-dev): Bump the all-patches group across 1 directory with 3 updates",
          "timestamp": "2026-07-03T23:33:33Z",
          "url": "https://github.com/CentralPing/ergo/pull/245/commits/18abeba62efee9944f6e0c5911241a836a32abeb"
        },
        "date": 1783121753057,
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
          "id": "3efab0aee568c108a70906dd72e3a1407f927fcd",
          "message": "chore: bump version to 0.7.0 and finalize CHANGELOG",
          "timestamp": "2026-07-03T23:36:50Z",
          "url": "https://github.com/CentralPing/ergo/pull/246/commits/3efab0aee568c108a70906dd72e3a1407f927fcd"
        },
        "date": 1783224592913,
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
          "id": "035203205e5073917471dd275c75b8392f91e513",
          "message": "chore: bump version to 0.7.0 and finalize CHANGELOG (#246)",
          "timestamp": "2026-07-05T00:11:33-04:00",
          "tree_id": "e33f646cd7e28248428f61befc4d634c20c826db",
          "url": "https://github.com/CentralPing/ergo/commit/035203205e5073917471dd275c75b8392f91e513"
        },
        "date": 1783224708977,
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
          "id": "089863c17269f4f3e58cd7a94f93f8944a0af82d",
          "message": "fix: use null-prototype object in createDispatcher() (#254)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/357/commits/089863c17269f4f3e58cd7a94f93f8944a0af82d"
        },
        "date": 1783265236673,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.03,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "911f6e76e00e8b16bc635344784beb3386bbd9bb",
          "message": "fix: logger error handler calls cleanup() to prevent double-logging (#312)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/358/commits/911f6e76e00e8b16bc635344784beb3386bbd9bb"
        },
        "date": 1783265298926,
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
          "id": "b274b8b49d9f423ae6e4a403201a95fb45179956",
          "message": "fix: correct Vary token typo in CORS preflight responses (#259)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/359/commits/b274b8b49d9f423ae6e4a403201a95fb45179956"
        },
        "date": 1783265306223,
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
          "id": "4c51f8a495aee5a9512742d24176124cb9c99152",
          "message": "refactor: remove dead utils/observables module (#333)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/360/commits/4c51f8a495aee5a9512742d24176124cb9c99152"
        },
        "date": 1783265310909,
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
          "id": "69332c3c8d83bd256cc8264b40e4e32173a3e667",
          "message": "fix: wrap authorization success return in protocol-form {value} (#288)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/361/commits/69332c3c8d83bd256cc8264b40e4e32173a3e667"
        },
        "date": 1783265372528,
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
          "id": "259bf3d1598a5172a63faadacf1b033cdb9493b6",
          "message": "fix: body middleware eagerly parses all content types within error boundary (#323)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/362/commits/259bf3d1598a5172a63faadacf1b033cdb9493b6"
        },
        "date": 1783265380253,
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
          "id": "0898dcb91ef3b77fd3136aafb23dcd3efe6083d6",
          "message": "fix: csrf encoding forwarding and factory-time secret validation (#308)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/363/commits/0898dcb91ef3b77fd3136aafb23dcd3efe6083d6"
        },
        "date": 1783265385160,
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
          "id": "dfa8b49ec9bfc0a8fe1ff4c4d7f4e7da1cf52f1b",
          "message": "fix: add validateOptions() call to validate() factory (#320)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/364/commits/dfa8b49ec9bfc0a8fe1ff4c4d7f4e7da1cf52f1b"
        },
        "date": 1783265399911,
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
          "id": "7b6a8ffa4eacb3eaacb0580b209167c225816827",
          "message": "fix: recognize RFC 6838 structured syntax suffixes in compression (#307)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/365/commits/7b6a8ffa4eacb3eaacb0580b209167c225816827"
        },
        "date": 1783265443697,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.014,
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
          "id": "89fba282fa2b0e8bb23000c9596caa75402b3262",
          "message": "fix: replace deprecated OTEL HTTP semantic convention attributes (#324)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/366/commits/89fba282fa2b0e8bb23000c9596caa75402b3262"
        },
        "date": 1783265473897,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "5b54a05aac204df9b34f7bd450d9dc423df7d6b8",
          "message": "fix: use null-prototype object in createDispatcher() (#254)",
          "timestamp": "2026-07-05T04:11:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/357/commits/5b54a05aac204df9b34f7bd450d9dc423df7d6b8"
        },
        "date": 1783267259385,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
          "id": "48a9c3dc0a20b1da3126fdf6001ef66cd3049f73",
          "message": "fix: recognize RFC 6838 structured syntax suffixes in compression (#307) (#365)\n\nCOMPRESSIBLE_RE now matches application/*+json and application/*+xml\ncontent types per RFC 6838 Section 4.2.8. Previously only exact\napplication/json and application/xml subtypes triggered compression,\ncausing responses with types like application/problem+json (ergo's\nerror format) and application/vnd.api+json (JSON:API) to bypass\ncompression entirely. Word boundaries (\\b) prevent false matches\non types like application/jsonp.",
          "timestamp": "2026-07-05T16:12:56-04:00",
          "tree_id": "5fcb5ea1182b10405d36bd0744b03ca761be15f0",
          "url": "https://github.com/CentralPing/ergo/commit/48a9c3dc0a20b1da3126fdf6001ef66cd3049f73"
        },
        "date": 1783282387921,
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
          "id": "dfedd9fc752ab607396fcb4b78b92038ada2dd83",
          "message": "fix: use null-prototype object in createDispatcher() (#254)",
          "timestamp": "2026-07-05T20:13:00Z",
          "url": "https://github.com/CentralPing/ergo/pull/357/commits/dfedd9fc752ab607396fcb4b78b92038ada2dd83"
        },
        "date": 1783527777624,
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
          "id": "f179c25ecf3112bdef056b31b7a10b710df8c40a",
          "message": "fix: use null-prototype object in createDispatcher() (#254)",
          "timestamp": "2026-07-05T20:13:00Z",
          "url": "https://github.com/CentralPing/ergo/pull/357/commits/f179c25ecf3112bdef056b31b7a10b710df8c40a"
        },
        "date": 1783528333566,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "3934e5fe909baaad56cb4127c7884641726c14e0",
          "message": "refactor: re-export wire primitives from @centralping/ergo-wire (#369)",
          "timestamp": "2026-07-05T20:13:00Z",
          "url": "https://github.com/CentralPing/ergo/pull/370/commits/3934e5fe909baaad56cb4127c7884641726c14e0"
        },
        "date": 1783533172237,
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
          "id": "9b25dc63f2b893cdd6a03e67f29ee0fc5cd5270d",
          "message": "refactor: re-export wire primitives from @centralping/ergo-wire (#369)",
          "timestamp": "2026-07-05T20:13:00Z",
          "url": "https://github.com/CentralPing/ergo/pull/370/commits/9b25dc63f2b893cdd6a03e67f29ee0fc5cd5270d"
        },
        "date": 1783534201673,
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
          "id": "c3cc419b455bb3a9506543b83f6c254e3a39852a",
          "message": "refactor: re-export wire primitives from @centralping/ergo-wire (#369)",
          "timestamp": "2026-07-05T20:13:00Z",
          "url": "https://github.com/CentralPing/ergo/pull/370/commits/c3cc419b455bb3a9506543b83f6c254e3a39852a"
        },
        "date": 1783564953263,
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
          "id": "1a5f470f4360099fd1160b5d4107a4a51bbdeb89",
          "message": "refactor: re-export wire primitives from @centralping/ergo-wire (#369) (#370)\n\n* refactor: re-export wire primitives from @centralping/ergo-wire\n\nKeep server-only IdempotencyStore and pagination response helpers in ergo\nwhile delegating parse/format to ergo-wire for symmetric client alignment.\n\n* fix(ci): skip Deno type-check for github npm dependency\n\nDeno 2.2+ cannot type-check @centralping/ergo-wire while it is installed\nfrom github: in package.json. Runtime resolution works via node_modules\nafter npm ci; add deno.json (nodeModulesDir: manual) and --no-check.\n\n* fix: address review findings for ergo-wire shims (#369)\n\nAdd CHANGELOG entry for @centralping/ergo-wire delegation and restore\ncomprehensive CTL stripping tests on the sanitize-quoted-string re-export.",
          "timestamp": "2026-07-08T22:50:51-04:00",
          "tree_id": "b1d2dda526d1b08ca4a75047263d1fb8cc2068e2",
          "url": "https://github.com/CentralPing/ergo/commit/1a5f470f4360099fd1160b5d4107a4a51bbdeb89"
        },
        "date": 1783565463758,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.023,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.009,
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
          "id": "1825139c71665d637a6956f225785f379e4eaf5b",
          "message": "fix: use null-prototype object in createDispatcher() (#254)",
          "timestamp": "2026-07-09T02:50:55Z",
          "url": "https://github.com/CentralPing/ergo/pull/357/commits/1825139c71665d637a6956f225785f379e4eaf5b"
        },
        "date": 1783622387137,
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
            "value": 0.014,
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
          "id": "aaca59a0f9f6295738d4f31bef498752a5458a6c",
          "message": "fix: use null-prototype object in createDispatcher() (#254) (#357)\n\n* fix: use null-prototype object in createDispatcher() (#254)\n\nReplace plain {} reduce accumulator with Object.create(null) to prevent\nprototype poisoning via crafted Authorization headers. Crafted scheme\nnames matching Object.prototype properties (Constructor, ToString,\n__proto__) bypassed the strategy-not-found guard and crashed with\nTypeError — a denial-of-service vector.\n\nAligns with the project-wide null-prototype policy already enforced in\nall other user-input-keyed parsers (query, cookies, prefer, multipart).\n\n* test: remove vacuous ToString prototype pollution test (#254)\n\nThe ToString test was not exercising prototype pollution — after\ntoLowerCase(), 'tostring' does not exist on Object.prototype (JS is\ncase-sensitive). The Constructor and __proto__ tests are the meaningful\nvectors that prove the null-prototype fix.\n\n* docs: remove inaccurate ToString from changelog examples (#254)\n\nAfter toLowerCase(), 'ToString' becomes 'tostring' which does not match\nObject.prototype.toString (case-sensitive). Only Constructor and __proto__\nare meaningful prototype collision vectors for this fix.",
          "timestamp": "2026-07-09T15:06:42-04:00",
          "tree_id": "e17f6eca67802cc964a69ed4002b479fde03677c",
          "url": "https://github.com/CentralPing/ergo/commit/aaca59a0f9f6295738d4f31bef498752a5458a6c"
        },
        "date": 1783624016709,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.027,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "d014bd24f26d644b8b58c2b2f5d3dea7f0219458",
          "message": "chore: ignore deno.lock local artifact",
          "timestamp": "2026-07-09T19:07:22Z",
          "url": "https://github.com/CentralPing/ergo/pull/371/commits/d014bd24f26d644b8b58c2b2f5d3dea7f0219458"
        },
        "date": 1783626811044,
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
            "value": 0.012,
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
          "id": "0db6e961b3d652788ba9dd83d7a5698dce3dea62",
          "message": "chore: ignore deno.lock local artifact (#371)\n\nnpm/package-lock.json is the authoritative dependency lock; deno.json\nuses nodeModulesDir manual so Deno consumes node_modules after npm ci.",
          "timestamp": "2026-07-09T15:57:43-04:00",
          "tree_id": "5eac39226e86ac087e5a6ca144d3e9a313160acb",
          "url": "https://github.com/CentralPing/ergo/commit/0db6e961b3d652788ba9dd83d7a5698dce3dea62"
        },
        "date": 1783627080740,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "c2ac09aa5ca45735310673dd6b41d146520556ed",
          "message": "fix: logger error handler calls cleanup() to prevent double-logging (#312)",
          "timestamp": "2026-07-09T19:57:47Z",
          "url": "https://github.com/CentralPing/ergo/pull/358/commits/c2ac09aa5ca45735310673dd6b41d146520556ed"
        },
        "date": 1783655255822,
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
          "id": "40d949fac2fb2bcc2a7ef6320bd7a0d444433364",
          "message": "fix: logger error handler calls cleanup() to prevent double-logging (#312) (#358)\n\nThe error event handler now deregisters sibling listeners (finish, close)\nbefore logging, ensuring exactly one structured log entry per request\nlifecycle outcome. Previously, a response stream error followed by the\ninevitable close event would produce a spurious \"aborted\" log entry.\n\nAll three terminal event handlers (finish, abort via close, error) now\nfollow the same pattern: cleanup first, then log.",
          "timestamp": "2026-07-10T00:03:15-04:00",
          "tree_id": "bb75b274e1a19f3405e59194e079734dd9592f3f",
          "url": "https://github.com/CentralPing/ergo/commit/40d949fac2fb2bcc2a7ef6320bd7a0d444433364"
        },
        "date": 1783656212564,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.008,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "ad7f7c898daa2e63c1ee542fa5b65ad40e954cd1",
          "message": "fix: correct Vary token typo in CORS preflight responses (#259)",
          "timestamp": "2026-07-10T04:03:20Z",
          "url": "https://github.com/CentralPing/ergo/pull/359/commits/ad7f7c898daa2e63c1ee542fa5b65ad40e954cd1"
        },
        "date": 1783659543433,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.025,
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
          "id": "7362007e32e2c55ee091f128a3dd0b5423338e5e",
          "message": "fix: correct Vary token typo in CORS preflight responses (#259) (#359)\n\nThe preflightHeaders array emitted 'Access-Control-Request-Methods'\n(plural) as a Vary token — a non-existent HTTP header. This prevented\ncorrect cache-key variance for preflight method negotiation. The spec\nheader name is 'Access-Control-Request-Method' (singular) per Fetch\nStandard §3.2.2 and W3C CORS REC §6.2.\n\nAlso adds boundary tests for preflight Vary tokens and aligns\npackage-lock.json version with package.json.",
          "timestamp": "2026-07-10T05:00:01Z",
          "tree_id": "2cd48f5f806f7443f3d5d020fbe5dc53e9913dc3",
          "url": "https://github.com/CentralPing/ergo/commit/7362007e32e2c55ee091f128a3dd0b5423338e5e"
        },
        "date": 1783659615893,
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
          "id": "5c44f9b564bb6384a6e5c2f3499636a19093a304",
          "message": "refactor: remove dead utils/observables module (#333)",
          "timestamp": "2026-07-10T05:00:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/360/commits/5c44f9b564bb6384a6e5c2f3499636a19093a304"
        },
        "date": 1783693208508,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
          "id": "4a196f18fc48fe4685b29ae2102ea336564ec209",
          "message": "refactor: remove dead utils/observables module (#333) (#360)\n\nDelete the push-based generator coroutine module (5 source files, 1 test\nfile) and its ./utils/observables package.json export. The module had zero\nconsumers — internal, cross-package, or external — and carried a protocol\nincompatibility between chain.js and buffer-split.js (#334) as well as\nmisleading \"Observable\" terminology (#336).\n\nCloses #333\nCloses #334\nCloses #336",
          "timestamp": "2026-07-10T14:21:01Z",
          "tree_id": "5515587462f5a6cd65020fea5db91d7a6cc65222",
          "url": "https://github.com/CentralPing/ergo/commit/4a196f18fc48fe4685b29ae2102ea336564ec209"
        },
        "date": 1783693278194,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.029,
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
          "id": "83e7735de68038683e5888fa9b3e6f86c4bb5b44",
          "message": "fix: wrap authorization success return in protocol-form {value} (#288)",
          "timestamp": "2026-07-10T14:22:37Z",
          "url": "https://github.com/CentralPing/ergo/pull/361/commits/83e7735de68038683e5888fa9b3e6f86c4bb5b44"
        },
        "date": 1783697223160,
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
          "id": "e96f6b433f7a36a66457559915e148a4461daa32",
          "message": "fix: wrap authorization success return in protocol-form {value} (#288) (#361)\n\nAuthorization middleware returned opaque user `info` directly, causing\nextractReturn() to misinterpret user data containing `value` or\n`response` keys as compose protocol objects. Wrap as `{value: info}`\nconsistent with paginate, tracing, and idempotency middleware.",
          "timestamp": "2026-07-10T15:27:49Z",
          "tree_id": "56694d1c69425a8e59650732f242fa54a4eee9a2",
          "url": "https://github.com/CentralPing/ergo/commit/e96f6b433f7a36a66457559915e148a4461daa32"
        },
        "date": 1783697283805,
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
          "id": "4e914afea5741d5f6b2b99642af8ed0ce09c3d3f",
          "message": "chore: bump ergo-wire to v0.1.0-beta.2",
          "timestamp": "2026-07-10T15:30:15Z",
          "url": "https://github.com/CentralPing/ergo/pull/372/commits/4e914afea5741d5f6b2b99642af8ed0ce09c3d3f"
        },
        "date": 1783699195119,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.027,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
          "id": "d206687a1ef278389da735967031c3f20f0e68c7",
          "message": "chore: bump ergo-wire to v0.1.0-beta.2 (#372)\n\nAdopts ergo-wire 0.1.0-beta.2 which adds serializeCursorParams and\nhardens fingerprint() to reject unsupported body types. ergo's lib\nshims re-export the updated wire primitives unchanged.",
          "timestamp": "2026-07-10T12:27:54-04:00",
          "tree_id": "93b35c383fb5b3acf4b175d8b8de17a648767900",
          "url": "https://github.com/CentralPing/ergo/commit/d206687a1ef278389da735967031c3f20f0e68c7"
        },
        "date": 1783700894479,
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
          "id": "3fe33ab52154ad38e531487f19a6e9a2640567e1",
          "message": "ci(deps): Bump the actions-patches group with 4 updates",
          "timestamp": "2026-07-10T16:29:56Z",
          "url": "https://github.com/CentralPing/ergo/pull/373/commits/3fe33ab52154ad38e531487f19a6e9a2640567e1"
        },
        "date": 1783719480044,
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
          "id": "68166aca1f3083542243edd5787cd01a9f7756d6",
          "message": "fix: body middleware eagerly parses all content types within error boundary (#323)",
          "timestamp": "2026-07-10T21:39:06Z",
          "url": "https://github.com/CentralPing/ergo/pull/362/commits/68166aca1f3083542243edd5787cd01a9f7756d6"
        },
        "date": 1783729167869,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.014,
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
          "id": "2648fbe50974c38a947ccd54348a570788cf3f72",
          "message": "fix: body middleware eagerly parses all content types within error boundary (#323) (#362)\n\nCompressed JSON, form-urlencoded, and multipart bodies previously used a\nself-replacing lazy getter on `result.parsed` that deferred parse\nexecution outside the body middleware's try/catch scope. Malformed\ncompressed JSON propagated to handler.js's catch-all, producing 500\ninstead of the correct 400.\n\nAll paths now parse eagerly via `parsers[type](raw, boundary)` within\nthe middleware — eliminating the error scope mismatch and aligning\nbehavior with the identity-encoded JSON fast path.",
          "timestamp": "2026-07-11T00:20:17Z",
          "tree_id": "ddf74db1b05e66be0a437b05de6cae58f3532782",
          "url": "https://github.com/CentralPing/ergo/commit/2648fbe50974c38a947ccd54348a570788cf3f72"
        },
        "date": 1783729230158,
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
          "id": "15972b04e8c739a1aeb71273ba360855b271d22c",
          "message": "fix: csrf encoding forwarding and factory-time secret validation (#308)",
          "timestamp": "2026-07-11T00:20:21Z",
          "url": "https://github.com/CentralPing/ergo/pull/363/commits/15972b04e8c739a1aeb71273ba360855b271d22c"
        },
        "date": 1783735177470,
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
          "id": "901f620e3c3ed2f4ea8e4e389a32295df4a090f2",
          "message": "fix: csrf encoding forwarding and factory-time secret validation (#308) (#363)\n\nForward the `encoding` factory option to `verify()` so non-default\nencodings (e.g. 'hex') no longer cause unconditional CSRF verification\nfailure. Add factory-time TypeError validation for the required `secret`\nparameter so configuration errors fail at startup instead of at the\nfirst request.\n\nCloses #308\nCloses #313",
          "timestamp": "2026-07-11T02:00:31Z",
          "tree_id": "46345d77e7dca4430b510055ecdf6f72b9b7bb33",
          "url": "https://github.com/CentralPing/ergo/commit/901f620e3c3ed2f4ea8e4e389a32295df4a090f2"
        },
        "date": 1783735247689,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.01,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "1a43b8f9a787fe7dce6a65301bea9ed0a27cc976",
          "message": "fix: add validateOptions() call to validate() factory (#320)",
          "timestamp": "2026-07-11T02:00:36Z",
          "url": "https://github.com/CentralPing/ergo/pull/364/commits/1a43b8f9a787fe7dce6a65301bea9ed0a27cc976"
        },
        "date": 1783737656660,
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
          "id": "b7a7a2ea9e2f6c2c1d9061189a264a0ca23f8f1a",
          "message": "fix: add validateOptions() call to validate() factory (#320) (#364)\n\nThe validate() middleware factory was the sole factory (of 19) that did\nnot call validateOptions() on its options parameter. Typos like\n{format: ['email']} silently produced misconfigured AJV instances.\n\n- Import validateOptions and add VALID_OPTIONS Set (formats, allErrors,\n  coerceTypes, ajv) matching the 4 keys consumed by lib/validate.js\n- Add validateOptions() call at top of factory body\n- Add @param JSDoc for allErrors, coerceTypes, and ajv options\n- Add 4 test cases: unknown key warning with suggestion, valid keys no\n  warning, empty/omitted options no warning, deduplication\n- Tighten ValidateOptions TypeScript interface: explicit fields, remove\n  index signature\n- Update CHANGELOG.md with [Unreleased] entry",
          "timestamp": "2026-07-10T22:53:11-04:00",
          "tree_id": "cf6b5a4e6a7e156508acf669804f3f3b64234bb9",
          "url": "https://github.com/CentralPing/ergo/commit/b7a7a2ea9e2f6c2c1d9061189a264a0ca23f8f1a"
        },
        "date": 1783738404725,
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
          "id": "d7f3e4500ee858d4d399b5fdfc39b062f502c7dd",
          "message": "fix: replace deprecated OTEL HTTP semantic convention attributes (#324)",
          "timestamp": "2026-07-11T02:53:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/366/commits/d7f3e4500ee858d4d399b5fdfc39b062f502c7dd"
        },
        "date": 1783738594803,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.017,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.004,
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
          "id": "9a246758cf55e5d7ec945933253cb6442e9cbd57",
          "message": "fix: replace deprecated OTEL HTTP semantic convention attributes (#324)",
          "timestamp": "2026-07-11T02:53:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/366/commits/9a246758cf55e5d7ec945933253cb6442e9cbd57"
        },
        "date": 1783789106892,
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
          "id": "422ee88e5333283aad6750d1eeeed4036c115233",
          "message": "fix: replace deprecated OTEL HTTP semantic convention attributes (#324)",
          "timestamp": "2026-07-11T02:53:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/366/commits/422ee88e5333283aad6750d1eeeed4036c115233"
        },
        "date": 1783795781983,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.029,
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
          "id": "8a7156a64fc5fa531b82119a126a1239f2c3496f",
          "message": "fix: replace deprecated OTEL HTTP semantic convention attributes (#324)",
          "timestamp": "2026-07-11T02:53:16Z",
          "url": "https://github.com/CentralPing/ergo/pull/366/commits/8a7156a64fc5fa531b82119a126a1239f2c3496f"
        },
        "date": 1783798033504,
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
          "id": "99d340d1d70c7015967c0e386b59ff930f62dacd",
          "message": "fix: replace deprecated OTEL HTTP semantic convention attributes (#324) (#366)\n\n* fix: replace deprecated OTEL HTTP semantic convention attributes (#324)\n\nReplace pre-v1.20 experimental attribute names with the stable conventions\ndeclared in November 2023:\n\n- http.method → http.request.method\n- http.url → url.path + url.query (conditional)\n- http.status_code → http.response.status_code\n\nAdd lib/otel-attributes.js with named constants to avoid a runtime\ndependency on @opentelemetry/semantic-conventions (11.3 MB for 4 strings).\nSplit req.url into path and query components using the established\nindexOf('?') + slice pattern from http/url.js.\n\nCloses #324\n\n* fix: remove superfluous trailing arguments in tracing tests (#324)\n\n* fix: use key-absence assertion for omitted url.query attribute (#324)\n\n* fix: assert deprecated OTEL attribute keys are absent (#324)",
          "timestamp": "2026-07-12T10:59:22-04:00",
          "tree_id": "d372559726c18603c6a476ec5ca710494c36e59d",
          "url": "https://github.com/CentralPing/ergo/commit/99d340d1d70c7015967c0e386b59ff930f62dacd"
        },
        "date": 1783868378090,
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
            "value": 0.012,
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
          "id": "0fac139c339698684be90ebd8f463e68e081e767",
          "message": "chore: bump version to 0.8.0 and finalize CHANGELOG",
          "timestamp": "2026-07-12T14:59:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/375/commits/0fac139c339698684be90ebd8f463e68e081e767"
        },
        "date": 1783947268436,
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
          "id": "228174ce267421d01ca00e143780f210fe7a603f",
          "message": "chore: bump version to 0.8.0 and finalize CHANGELOG (#375)",
          "timestamp": "2026-07-13T08:55:58-04:00",
          "tree_id": "5b088e54cb7601e405de9aa04798a91d162f9c7c",
          "url": "https://github.com/CentralPing/ergo/commit/228174ce267421d01ca00e143780f210fe7a603f"
        },
        "date": 1783947381132,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.012,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "121039d6f45556e1deb0787407ec0a823c269dc7",
          "message": "chore: sync package-lock.json version to 0.8.0",
          "timestamp": "2026-07-13T12:56:03Z",
          "url": "https://github.com/CentralPing/ergo/pull/377/commits/121039d6f45556e1deb0787407ec0a823c269dc7"
        },
        "date": 1784062531958,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
            "unit": "us/op"
          },
          {
            "name": "compose: full pipeline (negotiate + auth + execute)",
            "value": 0.018,
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
          "id": "4b608f073cc97ffc4fd99a73abbfc6a9b85851ec",
          "message": "chore: sync package-lock.json version to 0.8.0 (#377)\n\nThe 0.8.0 release (#375) updated package.json but left the lockfile\nroot version at 0.7.0. Align both fields so npm install does not dirty\nthe working tree.",
          "timestamp": "2026-07-14T16:56:35-04:00",
          "tree_id": "8c2842d37e0e32f1650bbadb56d1c482a401914a",
          "url": "https://github.com/CentralPing/ergo/commit/4b608f073cc97ffc4fd99a73abbfc6a9b85851ec"
        },
        "date": 1784062611095,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.024,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.01,
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
          "id": "1bf67f69b367b9dfb43e030321cb793ac8b0ede3",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/1bf67f69b367b9dfb43e030321cb793ac8b0ede3"
        },
        "date": 1784065242054,
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
          "id": "1980dffa6cc06c7710fefae1f8e15af0402b1e58",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/1980dffa6cc06c7710fefae1f8e15af0402b1e58"
        },
        "date": 1784065679424,
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
          "id": "05570f2e773eea9eaa5f50483e3c6965a03a92f6",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/05570f2e773eea9eaa5f50483e3c6965a03a92f6"
        },
        "date": 1784065808960,
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
          "id": "146a8e54f40dcc47b46ca97f1ec9f389c3eb13b2",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/146a8e54f40dcc47b46ca97f1ec9f389c3eb13b2"
        },
        "date": 1784067799357,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.026,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "5f36b6026e524f0f82b03799458e7355d0f64ef8",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/5f36b6026e524f0f82b03799458e7355d0f64ef8"
        },
        "date": 1784087803059,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
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
          "id": "3c3f974c64840791500a9f18cfc113fca561afa5",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/3c3f974c64840791500a9f18cfc113fca561afa5"
        },
        "date": 1784089355539,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.029,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
          "id": "f9886d443a22aadd7f403f6f3e8ba53ac10993a6",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/f9886d443a22aadd7f403f6f3e8ba53ac10993a6"
        },
        "date": 1784122884889,
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
          "id": "33626fb577f2891133480796631a0a6c30383d3d",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/33626fb577f2891133480796631a0a6c30383d3d"
        },
        "date": 1784123446797,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.02,
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
          "id": "8bb54873b756e80efa3e7249f32fb2f876112ab6",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/8bb54873b756e80efa3e7249f32fb2f876112ab6"
        },
        "date": 1784123651199,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "3b09b87186a49856e7454913704123e4b835b0b3",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/3b09b87186a49856e7454913704123e4b835b0b3"
        },
        "date": 1784128979751,
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
          "id": "0cd622c2fb6705bcad66c9a66b5adb62cbd52778",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/0cd622c2fb6705bcad66c9a66b5adb62cbd52778"
        },
        "date": 1784130003117,
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
            "value": 0.012,
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
          "id": "bb72701c79225fca7817423ef43fcc4198ab9036",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/bb72701c79225fca7817423ef43fcc4198ab9036"
        },
        "date": 1784131037349,
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
          "id": "8c54c216dbe179f27468c3db6e2bc09f1204431e",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/8c54c216dbe179f27468c3db6e2bc09f1204431e"
        },
        "date": 1784133621098,
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
          "id": "ecb227aaf7296422bb60642bc1a17d530f5a39c0",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/ecb227aaf7296422bb60642bc1a17d530f5a39c0"
        },
        "date": 1784135112717,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "e05a7bab8e811c5b80acc8b07b391ebcaa5a3f81",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/e05a7bab8e811c5b80acc8b07b391ebcaa5a3f81"
        },
        "date": 1784136665754,
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
          "id": "49bd46c287348f2b188d9135677b14a2c205e956",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/49bd46c287348f2b188d9135677b14a2c205e956"
        },
        "date": 1784144842696,
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
          "id": "063dbc4ec4b4411987409c342fcfc4784a33a22b",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/063dbc4ec4b4411987409c342fcfc4784a33a22b"
        },
        "date": 1784145085466,
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
          "id": "942ff95da535078876e7fca75721d0bd54769899",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/942ff95da535078876e7fca75721d0bd54769899"
        },
        "date": 1784146721038,
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
            "value": 0.016,
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
          "id": "abba3886e872dc6d6e6093cc3ad4fda219e254e2",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/abba3886e872dc6d6e6093cc3ad4fda219e254e2"
        },
        "date": 1784152872549,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.027,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "d6568ec785ac0c6b2e8cb2638da48445f70d20c0",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/d6568ec785ac0c6b2e8cb2638da48445f70d20c0"
        },
        "date": 1784156073986,
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
            "value": 0.012,
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
          "id": "a03b45b0f11ab51f6d7a1d423b56a435cb5e7d69",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/a03b45b0f11ab51f6d7a1d423b56a435cb5e7d69"
        },
        "date": 1784219703117,
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
          "id": "d60ae867bcda79083d048e9d8172a8669430295d",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/d60ae867bcda79083d048e9d8172a8669430295d"
        },
        "date": 1784220731800,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "e75fd8790e081d57122abbab8c65df57bfaa35ec",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/e75fd8790e081d57122abbab8c65df57bfaa35ec"
        },
        "date": 1784225549572,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "88f53ef016c4f73fb93da832a2ec667bcdb15b78",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/88f53ef016c4f73fb93da832a2ec667bcdb15b78"
        },
        "date": 1784229865019,
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
          "id": "d7e05e43c2c1813d3837778f191696643b8b8db1",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/d7e05e43c2c1813d3837778f191696643b8b8db1"
        },
        "date": 1784231904294,
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
          "id": "a3e41823e6ef4869b9675b69ce348ced6b1f8a37",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/a3e41823e6ef4869b9675b69ce348ced6b1f8a37"
        },
        "date": 1784233408046,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.014,
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
          "id": "ac521f5b5b9a7c0a01cb1163a1e814bae78370dc",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/ac521f5b5b9a7c0a01cb1163a1e814bae78370dc"
        },
        "date": 1784233544298,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.027,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "469cb647f8f1cb7fa6ccd2628bfc85b44cbfa965",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/469cb647f8f1cb7fa6ccd2628bfc85b44cbfa965"
        },
        "date": 1784236320425,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.029,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.01,
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
          "id": "ace542c7fced26750f731e7978e364b1c5d43176",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/ace542c7fced26750f731e7978e364b1c5d43176"
        },
        "date": 1784236791109,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.012,
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
          "id": "6032f6cfcbcada8e8c93fbf522c181bf9b09571c",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/6032f6cfcbcada8e8c93fbf522c181bf9b09571c"
        },
        "date": 1784237400549,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.006,
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
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "committer": {
            "name": "CentralPing",
            "username": "CentralPing"
          },
          "id": "4ebd79734a3e9cf77fa5c03643030a3cb7967531",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353)",
          "timestamp": "2026-07-14T20:56:40Z",
          "url": "https://github.com/CentralPing/ergo/pull/378/commits/4ebd79734a3e9cf77fa5c03643030a3cb7967531"
        },
        "date": 1784239109035,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "compose: negotiation (cors + accepts)",
            "value": 0.028,
            "unit": "us/op"
          },
          {
            "name": "compose: authorization (bearer)",
            "value": 0.007,
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
          "id": "d90088071b39e77a7e02a64a101627b422352919",
          "message": "fix: harden utils/set path semantics and query conflict skip (#353) (#378)\n\n* fix: harden utils/set path semantics and query conflict skip (#353)\n\nStrict digit-only array-index detection, descriptive path-conflict TypeErrors\nwith ERGO_SET_PATH_TRAVERSE, trySet for first-wins query skips, clarity refactor\npreserving return value.\n\nCloses #353\nCloses #354\nCloses #355\n\n* fix: allow function intermediates in utils/set path traversal\n\nFunctions are objects in JS; reject only null and non-object primitives so\nassignments like handler.timeout remain valid. Addresses CodeRabbit review.\n\n* docs: clarify set path-conflict throw covers null and primitives\n\n* fix: address review findings for set/query first-wins (#353)\n\nMake query path-conflict first-wins bidirectional (#379), strengthen\nconflict/test oracles, and document function intermediates in set JSDoc.\n\n* fix: complete path-prefix query first-wins (#380)\n\nSkip container overwrite at any dotted path and nesting under empty-bracket\narrays; strengthen conflict test oracles.\n\n* fix: allow numeric indices under query Arrays (#381)\n\nSkip only non-index nests under Arrays; keep scalar↔[] first-wins and\nstrengthen conflict test oracles.\n\n* fix: harden set forbidden segments and query shape lock (#383)\n\nReject __proto__/prototype/constructor path segments in utils/set while\nkeeping function own-props (handler.timeout). Extend query first-wins with\nsymmetric object→index skip (#382) and document /^\\\\d+$/ leading-zero Arrays.\n\n* fix: reject forbidden set path segments before mutation (#383)\n\nValidate __proto__/prototype/constructor on the full path before creating\nintermediates so trySet/query skips leave the target untouched.\n\n* refactor: share isArrayIndexSegment between set and query\n\nExport a single helper from utils/set so query shape first-wins cannot drift\nfrom array-intermediate creation (CodeRabbit).\n\n* test: drop vacuous pollution asserts from forbidden-segment cases\n\nThose asserts cannot fail when the denylist is removed on a null-prototype\nroot; builtin mutation remains covered by the Object.prototype.gotcha case.\n\n* fix: preserve query pair source order for first-wins (#384)\n\nAccumulate decoded pairs in a Map so integer-like keys are not reordered\nby Object.entries before the first-wins second pass.\n\n* fix: complete path-alias first-wins and set builtin guards (#385)\n\nSkip any occupied destination path so a.b/a[b] aliases keep the first wire\nform. Reject shared-builtin intermediates and Array length assignment in set.\n\n* fix: structurally reject unsafe set path intermediates (#386)\n\nReplace the incomplete FORBIDDEN_INTERMEDIATES denylist with prototype-\nobject, intrinsic-constructor, and singleton checks so RegExp.prototype\nand peers cannot be mutated via path reuse.\n\n* fix: reject host-namespace and Proxy path containers (#387)\n\nReplace the incomplete INTRINSIC_SINGLETONS denylist with globalThis own-\nbinding identity (module-load snapshot) plus util.types.isProxy, and guard\nthe path root the same way as intermediates.\n\n* fix: Proxy-first unsafe check, nested hosts, index bound\n\nReject Proxies before Array/null-proto shortcuts so prototype\nwrite-through is impossible; expand globalThis host snapshot for\nnested values (#388); reject digit indices above MAX_ARRAY_INDEX\nas sparse-DoS bound pending #280.\n\n* fix: host check before null-proto; deepen host graph (#389)\n\nConsult GLOBAL_THIS_HOST_VALUES before the null-proto shortcut so\nprocess._events cannot write through, expand the module-load host\ngraph to depth 3 for intrinsic methods, and pin MAX_ARRAY_INDEX+1\noracles in set/query tests.\n\n* fix: absorb rejected promises from host graph getters\n\nHost accessors can return rejected Promises when read off-target during\nthe module-load walk; settle them so import does not emit unhandledRejection.\n\n* fix(set): bound check, #390 prototype accessors, portable oracles\n\nCompare array-index bounds by numeric value so leading-zero in-range\nsegments are accepted; enroll constructor prototype descriptor functions\nfor namespaced intrinsics; skip process._events oracle on Bun; add\nmid-range sparse-DoS test oracles.\n\n* docs(set): document bound-instance caller contract (#390 residual)\n\nClarify that per-instance bound intrinsic methods remain valid\nintermediates; add regression oracle; note Bun WeakSet gap requiring\nHOST_PROTOTYPE_FUNCTIONS strong Set.\n\n* fix(set): Array-only index bound; own-property intermediates\n\nApply MAX_ARRAY_INDEX only when digit segments index Arrays so\nplain-object/top-level digit keys remain valid; define created\nintermediates and leaves as own data properties.\n\n* fix(set): snapshot path plan; preserve own-leaf assignment\n\nPlan path once so Array-index bounds and mutation share accessor\nsnapshots; assign existing own leaves via [[Set]]; read constructor\nvia own descriptor to avoid getter side effects.\n\n* fix(set): brand path-traverse errors for trySet (#353)\n\ntrySet absorbs only library-minted conflicts via WeakSet identity; add\nexpandHostSeed JSDoc; restore shared builtins after mutation probes.\n\n* test(set): restore Array length after mutation probes (#353)\n\nwithRestoredOwnProperty now reverts Array.length so a write-through on\nArray.prototype cannot leave a bumped length for later tests.\n\n* test(set): assert Array length restore after mutation probes (#353)\n\nStrengthen the Proxy(Array.prototype) oracle and add a deliberate\nwrite-through case so length restore cannot regress silently.\n\n* fix(set): avoid Proxy traps when reading .prototype (#353)\n\nInspect own data prototype descriptors (and treat Proxy constructors as\nunsafe) so path checks and host enrollment never invoke get traps.\n\n* fix: address non-blocking review findings (#392, #393)\n\nOwn-property query options via null-proto assign; forbid exotic length\nassignment on TypedArray/DataView/arguments; strengthen Proxy ctor oracle.\n\n* test(set): fix arguments length oracle (own property)\n\narguments.length is already own; assert length unchanged after reject.\n\n* fix(set): brand-check Arguments for exotic length forbid (#353)\n\nUse types.isArgumentsObject instead of spoofable toString; strengthen\nDataView/arguments oracles and pollution tests with provided {}.\n\n* fix(set): brand null/primitive roots and harden DataView length oracle (#353)\n\nAlign call-boundary errors with the trySet contract and drop the vacuous\nDataView byteLength post-check.\n\n* docs(set): define same-realm host-graph contract (#395)\n\nDocument the identity-based security boundary so callers do not treat foreign-realm host objects as protected containers.\n\n* fix(set): reject exotic length as intermediate path segment (#353)\n\nTypedArray/Buffer/DataView expose non-own length, so planPath must forbid\ncreating a length container before the leaf guard. Also strengthen\nnull-proto and reverse empty-bracket first-wins regressions.",
          "timestamp": "2026-07-16T23:13:48-04:00",
          "tree_id": "8bfd4d4ca37713ac829e15a6721d059862ec5378",
          "url": "https://github.com/CentralPing/ergo/commit/d90088071b39e77a7e02a64a101627b422352919"
        },
        "date": 1784258042844,
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
          "id": "8591ee733520183a14521ab89b9a9c91be43a7df",
          "message": "fix: remove drifted default export and duplicate @module (#297)",
          "timestamp": "2026-07-17T03:13:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/397/commits/8591ee733520183a14521ab89b9a9c91be43a7df"
        },
        "date": 1784303885783,
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
          "id": "5ef0564447c0be0ff9398580364e3db3bad2b8a1",
          "message": "fix: remove drifted default export and duplicate @module (#297)",
          "timestamp": "2026-07-17T03:13:53Z",
          "url": "https://github.com/CentralPing/ergo/pull/397/commits/5ef0564447c0be0ff9398580364e3db3bad2b8a1"
        },
        "date": 1784304276266,
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
          "id": "2cc7b26cefbabf931658392dce0edd687253cd82",
          "message": "fix: remove drifted default export and duplicate @module (#297) (#397)\n\n* fix: remove drifted default export and duplicate @module (#297)\n\nDrop the manually synced default export object from http/main.js (already\nunreachable via the package entry) and assign @module http/main so only\nhttp/index.js claims @centralping/ergo. Sync types-override and lock the\nnamed-only surface in tests.\n\nCloses #297\nCloses #299\n\n* test: assert exact 27-name barrel export surface (#297)\n\nStrengthen the package entry and http/main namespace contract with a sorted\nkey set (including fromConnect and tracing) so named-export drift is caught.",
          "timestamp": "2026-07-17T13:13:53-04:00",
          "tree_id": "a50469d28d9f8e6fcbcf6dd102f28b1bd6b94afa",
          "url": "https://github.com/CentralPing/ergo/commit/2cc7b26cefbabf931658392dce0edd687253cd82"
        },
        "date": 1784308463462,
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
          "id": "db1cdc50a448b1da7421d516680fe0b93a2eb44f",
          "message": "fix: replace CSRF TypeError default-parameter sentinels with typeof validation (#269)",
          "timestamp": "2026-07-17T17:14:04Z",
          "url": "https://github.com/CentralPing/ergo/pull/398/commits/db1cdc50a448b1da7421d516680fe0b93a2eb44f"
        },
        "date": 1784310616821,
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
      }
    ]
  }
}