---
name: implement-one-slice
description: "Implement one given slice only, check each acceptance criterion as met or not met, then stop. Use when the experiment variant is on and gate 3 implements one planned slice."
metadata:
  max_tokens: "1500"
  budget: "2200"
  budget3: "5000"
  priority: "99"
---
## gate 3
1. Change only the slice you were given. Do not edit other files or start the next subtask.
2. Before you propose, check each acceptance criterion against your change. For each one, state met or not met, with a short reason.
3. A criterion not met: fix it once inside this slice. If it still fails, report it as not met. Never hide it.
4. Keep the existing text, markup and interfaces that the slice does not name. Keep Vietnamese text with its diacritics.
5. The test reads the changed file with fs and checks the behaviour of the criteria. Report the result you observed.
