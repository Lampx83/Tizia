---
name: default-test
description: "Behavioral verification rules: reproduce the failure first, derive expected results from the request, include a failure case, report actual results. Use when a step writes or runs tests for changed behavior."
metadata:
  task_type: "test"
  source: "default"
  version: "1"
  max_tokens: "1500"
---
1. Reproduce the failure before fixing it, then test the changed public behavior.
2. Derive expected results from the request, independently of implementation.
3. Include one relevant failure or retry case.
4. Keep fixtures isolated and deterministic.
5. Run the relevant check and report its actual result.
