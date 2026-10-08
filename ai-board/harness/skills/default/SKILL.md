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
2. A feature that needs server data: one plugin file server/contexts/_ai-generated/<domain>/<skill>/index.js (capabilities from ALLOWED CAPABILITIES) plus at most one public/ page.
3. Only choose files listed in REPO DATA, or the allowed new paths above.
## gate 3
1. Existing file: minimal search/replace edits copied exactly from the excerpt.
2. New file: complete, small, following the repo facts.
3. Test: node:test file in test/ that checks the change.
