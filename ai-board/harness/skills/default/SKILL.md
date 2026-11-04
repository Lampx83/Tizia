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
2. A request that needs server data (a table, a migration, a query, anything on server/db.js) and asks for no UI: target ONE existing protected/core file (prefer a module that already imports db and mounts routes, e.g. server/contexts/content/index.js; server/db.js for the data layer itself). Modify it USING ITS EXISTING IMPORTS — reuse the db handle and helpers already there, never add an import of server/db.js or of any admin/ module. Declare content.write for server/contexts/content/, otherwise core.server. No _ai-generated file, no db/backend split; the harness asks the admin for elevation before the plan runs (core when the file already imports db.js or another context).
2b. A plugin file server/contexts/_ai-generated/<domain>/<skill>/index.js is surface: ctx.surface only, never import server/db.js — it fits a feature with no database access. At most one public/ page.
3. Only choose files listed in REPO DATA, or the allowed new paths above. verify/acceptance names only a path that exists at base or appears in the request; never invent a test path — use curl/psql against the API instead.
## gate 3
1. Existing file: minimal search/replace edits copied exactly from the excerpt.
2. New file: complete, small, following the repo facts.
3. Test: node:test file in test/ that checks the change.
