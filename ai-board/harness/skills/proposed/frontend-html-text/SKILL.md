---
name: frontend-html-text
description: "Copy rules for replacing visible wording on a public page: short plain UI text, kept facts, focus and 375px fit. Use when the experiment variant is on and a step changes visible text in an existing page."
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
1. Keep the page's layout, fonts and colours. Only the words change.
2. New UI copy stays short and plain: no em dashes, no filler. A label or button names its action in few words.
3. If the touched block shows loading, empty or error text, that text tells the user what to do next.
4. Plan the new text for a 375px-wide screen too. Long labels must wrap or shorten; no horizontal scroll.
## gate 3
1. Change only the words the subtask names. Keep tags, attributes, ids and classes.
2. Keep the existing wording of factual text; replace only what the request asks.
3. A link or button whose text changes keeps its visible focus state and stays reachable by keyboard.
4. UI copy: no em dashes, no filler.
