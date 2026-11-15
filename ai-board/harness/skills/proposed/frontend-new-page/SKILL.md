---
name: frontend-new-page
description: "Layout and copy rules for a new standalone static page: one primary action, readable contrast and type, 375px fit, focus. Use when the experiment variant is on and a step creates a new public page."
metadata:
  match: ""
  files: ""
  types: ""
  tools: ""
  tools3: ""
  follow_css: "false"
  budget: "1200"
  budget3: "1600"
  priority: "6"
---
## gate 1
1. Reuse the fonts and spacing values already used by the public pages. Do not add a new visual system.
2. One primary action per view. It is the most prominent element; secondary actions stay quieter.
3. Body text contrast at least 4.5:1; large text and control borders at least 3:1.
4. Body text 16px or larger; line length under about 75 characters.
5. Plan the page for a 375px-wide screen. No fixed width wider than the viewport.
6. Any loading, empty or error text tells the user what to do next.
## gate 3
1. Every link or button keeps a visible focus state and is reachable by keyboard. Never remove focus outlines without a replacement.
2. UI copy: short, plain, no em dashes, no filler.
