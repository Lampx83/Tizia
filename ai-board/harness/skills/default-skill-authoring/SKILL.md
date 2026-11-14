---
name: default-skill-authoring
description: "Write or rewrite an advisory skill in seven parts under the token cap, preserving the uploaded intent. Use when an admin skill is uploaded, extracted or rewritten for a small local model."
metadata:
  task_type: "all"
  source: "default"
  version: "3"
  max_tokens: "1500"
---
Preserve the uploaded intent. Use seven parts, one language, under the token cap; no rule count limit.
Trigger: when it applies.
Procedure: numbered, checkable steps; keep source commands.
Guardrails: invariants; keep platform decisions and authority outside guidance.
Output contract: result shape.
Checks: commands proving the work; never invent.
Pitfalls: failures, wrong vs right example.
Not capturable: needs host or repo access.
Drop duplicates. Return frontmatter and body only.
