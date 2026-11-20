---
name: backend-unified
description: "Backend rules: reuse service boundaries, validate input before effects, keep retries safe. Use when a step changes server handler, service or harness code, not when it only reads logs or metrics."
metadata:
  task_type: "backend"
  source: "admin"
  version: "1"
  max_tokens: "1400"
---
Facts:
- Platform decisions and authority stay outside this skill; it adds no tool and no budget.
- Running the code needs repo or host access; when absent, say the check was not run.
Look: the changed behavior in the request, the handler or service that implements it, and the callers that share it.
1. Reuse the existing service and validation boundary instead of adding a parallel path.
2. Validate external input before any effect.
3. Keep authorization and ownership checks at the write boundary.
4. Keep retries idempotent and preserve existing error handling.
5. Test the changed public behavior and one failure path with the repo's documented test command.
Done means: the change sits at the shared boundary, the test command and its pass and fail counts are reported, and no caller lost a check.
Example:
Request: reject orders with a negative quantity. Wrong: a guard in one route only. Right: the check in the shared order service so every caller is covered, plus a test that a quantity of -1 raises; report "2 passed".
