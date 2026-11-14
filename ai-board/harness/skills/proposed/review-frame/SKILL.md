---
name: review-frame
description: "Independent review of a candidate against the request, changed files and test evidence for correctness, authority and data-loss defects. Use when a gate 4 reviewer checks a candidate before verdict."
metadata:
  task_type: "review"
  source: "admin"
  version: "1"
  max_tokens: "1400"
---
Trigger: a gate 4 reviewer checks a candidate before verdict.
Procedure:
1. Compare the request, the changed files and the test evidence.
2. Find concrete correctness, authority and data-loss defects in the diff.
3. Check each success claim against observed evidence; mark unverified claims as unverified.
4. Tie each finding to one file and one observable behavior.
5. Check authorization, untrusted input handling and sensitive data access.
6. Keep unresolved failures in the report; drop speculative findings.
Guardrails: platform decisions and authority stay outside this skill. This review changes no verdict rule and adds no tool.
Output contract: only the requested review shape, JSON with verdict and findings (severity, issue).
Checks: re-run the test command named in the evidence when available; otherwise state that it was not run.
Pitfalls: wrong: flagging style or a missing test as a defect. Right: flag only what the diff shows.
Pitfalls: wrong: accepting "tests pass" without a recorded result. Right: check the recorded result.
Not capturable: inspecting the diff needs repo access; when absent, report that instead of guessing.
