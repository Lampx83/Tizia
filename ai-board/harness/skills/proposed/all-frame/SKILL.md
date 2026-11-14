---
name: all-frame
description: "Shared execution rules: reuse existing code, make the smallest change, verify and report observed results. Use when a plan step has task type all or no narrower default skill applies."
metadata:
  task_type: "all"
  source: "admin"
  version: "1"
  max_tokens: "1400"
---
Trigger: a plan step has task type all or no narrower default skill applies.
Procedure:
1. Search existing code and reuse its helpers and patterns before adding code.
2. Make the smallest change; keep unrelated behavior and interfaces unchanged.
3. Run the check the step names and record the observed result.
4. Keep failures and unknown evidence visible in the report.
5. When producing a plan, label each step backend, frontend, database, review, test or all.
Guardrails: platform decisions and authority stay outside this skill. This skill adds no tool and no budget.
Output contract: changed files, the check run, and the observed result for each step.
Checks: the check the step names; report its exit status and output summary.
Pitfalls: wrong: adding a new helper beside an existing one. Right: reuse the existing helper.
Pitfalls: wrong: "should work" without a run. Right: state the observed result.
Not capturable: running checks needs repo or host access; mark such steps unverified.
