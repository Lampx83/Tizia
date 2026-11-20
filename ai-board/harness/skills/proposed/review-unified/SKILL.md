---
name: review-unified
description: "Review of a candidate for correctness, authority and data-loss defects; returns pass or concerns findings. Use when a gate 4 reviewer or a blind diff reviewer reads a candidate before verdict, not when a call must edit files or rewrite the candidate."
metadata:
  task_type: "review"
  source: "admin"
  version: "1"
  max_tokens: "1500"
---
Facts:
- Platform decisions and authority stay outside this skill; it adds no tool and no budget.
- A success claim without evidence counts as unverified.
Look: the diff, and the request, changed files and test evidence when the call provides them; with only a diff, judge the diff alone.
1. Compare what the request asked, when it is given, with what the changed code does.
2. Verify each success claim against the evidence given, and mark unproven claims.
3. Name concrete correctness, authority or data-loss defects, each tied to a file and an observable behavior.
4. Check authorization, untrusted input and sensitive data on every changed path.
5. Return the requested review shape, pass or concerns, and keep unresolved failures open.
Done means: every finding has a file and a behavior, every claim is marked verified or unverified, and the verdict follows from the findings.
Example:
Diff: a handler in server/contexts/srs/index.js reads a deck id from the request and queries it without an ownership check. Finding: high, server/contexts/srs/index.js, any signed-in user can read another user's deck. Verdict: concerns.
