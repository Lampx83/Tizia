---
name: merge-unified
description: "Resolve an in-progress merge or rebase conflict by keeping both sides' intent, then check no conflict markers remain. Use when a merge or rebase hits a conflict or the working tree has unmerged files, not when branches only need listing."
metadata:
  task_type: "merge"
  source: "admin"
  version: "1"
  max_tokens: "1500"
---
Facts:
- Platform decisions and authority stay outside this skill; it adds no tool and no budget.
- Push, abort and target-branch changes are not part of this step.
Look: the unmerged files, the history of both branches, and the commit message behind each conflicting change.
1. Read the merge or rebase state before editing anything.
2. Find the intent of each side from its commit message before choosing.
3. Resolve each hunk keeping both intents; when they contradict, pick by the goal of the merge and record the trade-off.
4. Run the deterministic conflict-marker check on each resolved file and the repo automatic checks, and fix what the merge broke.
5. Stage everything and commit; for a rebase, continue through every commit.
Done means: no conflict marker remains, checks ran with their results reported, the merge is committed, and anything not verifiable is stated.
Example:
Request: resolve the conflict in server/index.js after merging main. One side added a route mount, the other reordered the mounts. Keep both mounts in the new order, then run python ai-board/harness/services/conflict_markers.py server/index.js (prints no line when clean) and npm test; report both results.
