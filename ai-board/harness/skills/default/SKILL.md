---
name: default
match:
tools: tree, repomap, lessons
tools3: grep, outline, lessons
budget: 2200
budget3: 5000
priority: 9
---
## gate 1
1. Prefer changing one existing page in public/ over creating anything new.
2. A feature that really needs server data (a table, a query, anything on server/db.js): target ONE existing protected/core file (e.g. server/db.js); the harness asks the admin for elevation before the plan runs.
2b. A plugin file server/contexts/_ai-generated/<domain>/<skill>/index.js is surface: ctx.surface only, never import server/db.js — it fits a feature with no database access. At most one public/ page.
3. Only choose files listed in REPO DATA, or the allowed new paths above.
## gate 3
1. Existing file: minimal search/replace edits copied exactly from the excerpt.
2. New file: complete, small, following the repo facts.
3. Test: node:test file in test/ that checks the change.
