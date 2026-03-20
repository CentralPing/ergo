window.BENCHMARK_DATA = {
  "lastUpdate": 1774003772433,
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
      }
    ]
  }
}