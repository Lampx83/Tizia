---
name: default-all
description: "Shared execution rules: reuse existing code, make the smallest change, verify and report observed results. Use when a plan step has task type all or no narrower default skill applies."
metadata:
  task_type: "all"
  source: "default"
  version: "1"
  max_tokens: "1500"
---
1. Search existing code and reuse its patterns before adding code.
2. Make the smallest change, preserving unrelated behavior and interfaces.
3. Verify the changed behavior and report observed results.
4. Keep failures and unknown evidence visible.
5. When producing a plan, label each step task_type as backend, frontend, database, review, test or all.
