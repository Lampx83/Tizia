---
name: test-frame
description: "Test-step rules: reproduce the failure, derive expected results from the request, include one failure case, report observed results. Use when a step writes or runs tests for changed behavior."
metadata:
  task_type: "test"
  source: "admin"
  version: "1"
  max_tokens: "1400"
---
Trigger: a step writes or runs tests for changed behavior.
Procedure:
1. Reproduce the failure first and confirm it fails on the base code.
2. Write expected results from the request, not from the implementation output.
3. Test the changed public behavior; keep fixtures isolated and deterministic.
4. Include one failure or retry case.
5. Run the repo's documented test command and record its exit status and summary.
Guardrails: platform decisions and authority stay outside this skill. Never weaken, delete or skip an existing test to get a pass.
Output contract: tests added or changed, the command run, and actual pass and fail counts.
Checks: the command the repo documents, for ai-board harness `python -m pytest <file>`; report the observed result only.
Pitfalls: wrong: copying the implementation's output as the expected value. Right: writing the expected value from the request.
Pitfalls: wrong: reporting "tests pass" without a run. Right: quoting the observed summary line.
Not capturable: running tests needs repo or host access; when absent, say the check was not run.
