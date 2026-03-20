window.BENCHMARK_DATA = {
  "lastUpdate": 1774028923073,
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
      }
    ]
  }
}