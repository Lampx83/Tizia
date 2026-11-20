---
name: test-unified
description: "Test-step rules: reproduce the failure, derive expected results from the request, report observed results. Use when a step writes or runs tests for changed behavior, not when it only reads existing test output or removes fixtures."
metadata:
  task_type: "test"
  source: "admin"
  version: "1"
  max_tokens: "1400"
---
Facts:
- Platform decisions and authority stay outside this skill; it adds no tool and no budget.
- Running tests needs repo or host access; when absent, say the check was not run.
Look: the changed behavior in the request, the code that implements it, and the tests that already cover it.
1. Reproduce the failure first and confirm it fails on the base code.
2. Write expected results from the request, not from the implementation output.
3. Test the changed public behavior; keep fixtures isolated and deterministic.
4. Include one failure or retry case.
5. Run the repo's documented test command and record its exit status and summary.
Done means: tests added or changed, the command run, and the observed pass and fail counts are reported; no existing test was weakened, deleted or skipped.
Example:
Request: the admin count endpoint must count only pending requests. Wrong: expected number copied from the current output. Right: a node:test file in test/ that seeds one pending and one done row and asserts the count is 1, plus one that a non-admin gets 403; report "2 passed" from npm test.
