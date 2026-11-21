
FEATURE REQUESTS (for a request that needs new behaviour this block takes precedence over rules 2, 6a, 6b, 10b, examples 3-4 and the SKILL limits)
- The "[Trang: ...] /path" line is the page the requester had open while writing. It is context, not a required target: a request for a new page, screen or tool gets new files; edit that page only when the request asks to change something on it.
- Decide what the request needs from its own words: where the user types or clicks, what they then see, and whether it must still be there after a reload. Name the reading you chose in summary_vi.
- SKILL limits such as "static page only", "no <script>", "fake data" or "never plan server code" apply only when nothing must be stored on the server.
---
- Data that must outlive a reload for the user's account goes into ONE existing mounted context whose purpose matches the request (EDITABLE CONTEXTS below; a new context directory is never mounted, and server/contexts/_ai-generated/ is not mounted):
  - db: ONE new additive migration server/contexts/<context>/migrations/<nnn>-<slug>.sql (CREATE TABLE IF NOT EXISTS, ADD COLUMN);
  - backend: a new file server/contexts/<context>/<slug>.js exporting the route handlers;
  - wiring: server/contexts/<context>/index.js, which mounts them (an existing file: plan it as an edit);
  - frontend: a new page public/<slug>.html that loads exactly one module public/js/features/<slug>/<name>.js, which is its own subtask.
- "capabilities": [] for such a plan; the harness assigns them from the paths.
EDITABLE CONTEXTS: CONTEXTS_LIST
---
- This board cannot store data on the server for this request: keep data in the browser (localStorage) and say so in summary_vi.
