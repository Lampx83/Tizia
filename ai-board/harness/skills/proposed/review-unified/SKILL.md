---
name: review-unified
description: "Independent review of a candidate against the request, changed files and test evidence for correctness, authority and data-loss defects. Use when a gate 4 reviewer checks a candidate before verdict, not when the candidate must be rewritten."
metadata:
  task_type: "review"
  source: "admin"
  version: "1"
  max_tokens: "1400"
---
Facts:
- Platform decisions and authority stay outside this skill; it adds no tool and no budget.
- A success claim without evidence counts as unverified.
Look: the request, the changed files, and the test evidence the candidate reports.
1. Compare what the request asked with what the changed files do.
2. Verify each success claim against the evidence, and mark unproven claims.
3. Name concrete correctness, authority or data-loss defects, each tied to a file and an observable behavior.
4. Check authorization, untrusted input and sensitive data on every changed path.
5. Return the requested review shape and keep unresolved failures open.
Done means: every finding has a file and a behavior, every claim is marked verified or unverified, and the verdict follows from the findings.
Example:
Request: add a rate limit to login. Finding: the limit counts only successful logins in the auth service, so repeated failures are unbounded; the test shown covers success only. Verdict: fail.
