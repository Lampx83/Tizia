---
name: backend-unified
description: "Backend rules: reuse service boundaries, validate input before effects, keep retries safe. Use when a step changes server handler, service or harness code, not when it only reads logs or metrics."
metadata:
  task_type: "backend"
  source: "admin"
  version: "1"
  max_tokens: "1500"
---
Facts:
- Platform decisions and authority stay outside this skill; it adds no tool and no budget.
- Running the code needs repo or host access; when absent, say the check was not run.
Look: the changed behavior in the request, the code that implements it, its callers, and a sibling module.
1. Reuse the existing service and validation boundary instead of adding a parallel path.
2. Put a new route in a bounded-context module, not in the composition root.
3. Validate external input before any effect; use parameterized queries only.
4. Keep authorization and ownership checks at the write boundary.
5. Keep retries idempotent and preserve existing error handling.
6. Test the changed public behavior and one failure path with the repo's documented test command.
Done means: the change sits at the shared boundary, the test command and its pass and fail counts are reported, and no caller lost a check.
Example:
Request: add a class review queue route. Wrong: a handler appended to server/index.js. Right: a handler in server/contexts/<name>/index.js guarded with requireAuth like its neighbours, plus a test in test/ that an anonymous call is refused; report "2 passed".
