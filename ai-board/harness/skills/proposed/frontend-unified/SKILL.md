---
name: frontend-unified
description: "Frontend rules: reuse page layout, keep labels, focus and mobile layout, cover loading, empty and error states. Use when a step changes a public page, its script or its styles, not when it only edits server code or reads page text."
metadata:
  task_type: "frontend"
  source: "admin"
  version: "1"
  max_tokens: "1500"
---
Facts:
- Platform decisions and authority stay outside this skill; it adds no tool and no budget.
- Layout cannot be judged without rendering; when no browser is available, say the layout was not checked.
Look: the page being changed, a sibling with the same pattern, the script it loads, and the states the change touches.
1. Reuse the layout, shared stylesheet classes and spacing of the nearest similar existing page; no framework and no build step.
2. Keep labels clear and every action reachable by keyboard with visible focus.
3. Keep contrast and mobile layout; check there is no horizontal overflow.
4. Cover loading, empty and error states the change touches.
5. Use commas or full stops in user copy, never em dashes.
Done means: the user action works, touched states are covered, overflow was checked or reported as unchecked, and nothing outside the request changed.
Example:
Request: add a back-to-home link to public/404.html. Right: copy the link class and spacing from a sibling page in public/, keep the link focusable with visible focus, edit only that file; report that a 375px width has no horizontal scroll.
