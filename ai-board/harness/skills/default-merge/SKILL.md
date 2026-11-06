---
name: default-merge
description: Resolve an in-progress git merge or rebase conflict
task_type: merge
source: default
version: 3
max_tokens: 1200
---
1. Check the merge/rebase state: conflicted files, and the commit history of both branches.
2. Find the original intent of each change in the commit message, PR, or related ticket before editing.
3. Resolve each conflict hunk, keeping both sides' intent where possible. If they contradict, choose by the goal of the merge and record the trade-off. Do not invent new behaviour.
4. Run the deterministic check before committing, with no model call: `python ai-board/harness/services/conflict_markers.py <file>` prints no line (no <<<<<<<, =======, >>>>>>> left); re-run the automatic checks (typecheck, test, format) and fix any part of the merge that broke them.
5. Finish: stage everything and commit; for a rebase, continue through every commit.
6. Do not use --abort, do not push, and do not change the target branch. State clearly what you could not verify yourself (for example, write access to the base branch).
