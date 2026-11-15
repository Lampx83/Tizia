---
name: frontend-html-section
description: "Layout rules for a new static block on a public page: reuse layout, one primary action, grouping, 375px fit, states, focus. Use when the experiment variant is on and a step adds a block to an existing page."
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
1. Reuse the page's existing layout classes, components and spacing. Do not add a new visual system.
2. One primary action per view. A new block adds at most one primary action; secondary actions stay quieter.
3. Place the block next to the content it relates to. Related items sit closer than unrelated ones.
4. Plan the block for a 375px-wide screen. No fixed width wider than the viewport.
5. If the block shows data loaded later, give it loading, empty and error text that tells the user what to do next.
## gate 3
1. Insert the block only. Keep every existing line and declaration unchanged.
2. A new link or button keeps a visible focus state and is reachable by keyboard.
3. New text keeps contrast at least 4.5:1 on its background; large text and control borders at least 3:1.
4. UI copy: short, plain, no em dashes, no filler.
