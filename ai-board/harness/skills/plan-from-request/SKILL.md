---
name: plan-from-request
description: Plan from request as goal, acceptance criteria and scope, grounded in repo evidence
max_tokens: 1500
budget: 2200
budget3: 5000
priority: 99
---
## gate 1
1. Write the goal in one sentence, taken from the request. Do not add work the request does not ask for.
2. List acceptance criteria. Each one must be checkable by one fact: a file contains a given string, a rule has a given property.
3. List out-of-scope items: other files, pages or features the request does not touch.
4. Every file name and quoted string in the plan must appear in REPO DATA or in an excerpt given to you. If it does not, drop it. Never invent a path or a string.
5. Choose one first slice of size "small": one file, one subtask, enough to meet one acceptance criterion. Leave the rest for later.
