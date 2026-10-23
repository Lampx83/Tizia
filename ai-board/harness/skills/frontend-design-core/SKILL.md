---
name: frontend-design-core
match:
files:
types:
tools: outline, lessons
tools3: grep, outline, lessons
follow_css: false
budget: 1200
budget3: 1600
priority: 6
---
## gate 1
1. Read the page's existing layout, components and spacing first. Reuse them, do not add a new visual system.
2. One primary action per view. Make it the most prominent element; secondary actions stay quieter.
3. Group related items closer together than unrelated ones. Use the spacing values already in the stylesheet.
4. Body text contrast at least 4.5:1, large text and control borders at least 3:1. Keep the page's colours.
5. Keep the page's font families. Body text 16px or larger, line length under about 75 characters.
6. Touched blocks need loading, empty and error text that tells the user what to do next.
7. Plan the change for a 375px-wide screen too. No fixed widths wider than the viewport.
## gate 3
1. Change only the declarations the subtask names. Keep focus outlines; never add `outline: none` without a replacement.
2. Every interactive element touched keeps a visible focus state and is reachable by keyboard.
3. UI copy: short, plain, no em dashes, no filler. Keep the existing wording of factual text.
