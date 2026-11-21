

TWO-LEVEL PLAN (overrides RULES 1, 4, 5, 6, 6d, 6e, the SCHEMA and the EXAMPLES above). Write only a short decomposition. Each subtask later runs alone: it reads the repo, plans its own edits and then edits, so write NO edit steps here.
SCHEMA (exactly these keys):
{"summary_vi": "<string>", "capabilities": ["<allowed capability>"],
 "subtasks": [{"goal": "<one Vietnamese sentence>", "files": ["<repo path>"], "depends_on": [<1-based subtask numbers>],
   "criteria": [{"page": "/<page>.html", "text": "<words>", "action": "see"}]}]}
- goal: ONE sentence that says what this subtask achieves. No line numbers, no search/replace text, no list of steps.
- files: the files this subtask may change, main file first. Each is an existing path in REPO DATA or an allowed new path (rule 2). A file belongs to ONE subtask only. Give one file per subtask; a subtask gets several files only when the harness allows it, otherwise the plan is rejected.
- depends_on: the subtasks that must finish first; [] when none. No cycle.
- criteria: 1-3 checks that this subtask must pass, at most 8 in the whole plan. They are fixed now and never change later. Each is exactly {"page", "text" OR "element", "action", "expect"}:
  page: URL path of the page, e.g. "/gallery.html"; text: words on the page; element: a CSS selector such as "#save-btn" (give one of text or element);
  action: "see" (text or element is on the page), "not_see" (text is gone; text only), "style" (element has a CSS property; element only);
  expect: only for "style", as "property: value" such as "color: #16a34a"; omit it for the other actions.
- Optional per subtask: "layer" (rule 6b). Write no "title", "verify", "size", "acceptance" or "checks": the harness derives them from these fields.
Output ONLY the JSON object.
