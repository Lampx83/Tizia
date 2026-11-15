---
name: frontend-css-style
description: "Colour, font and spacing rules for one CSS change on a public page: contrast, fonts, 375px screens, focus. Use when the experiment variant is on and a step restyles an existing page element."
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
1. Keep the page's colours except the one the request names. Text needs contrast at least 4.5:1 on its background; large text and control borders at least 3:1.
2. Keep the page's font families. Body text stays 16px or larger; line length under about 75 characters.
3. Reuse the spacing values already in the stylesheet. Keep related items closer together than unrelated ones.
4. Plan the change for a 375px-wide screen too. No fixed width wider than the viewport.
## gate 3
1. Change only the declarations the subtask names. Never add `outline: none` without a visible focus style in its place.
2. If a colour pair changes, the new pair meets the contrast in gate 1 rule 1.
3. Keep the changed selector's interactive elements reachable and keep their focus state visible.
