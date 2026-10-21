---
name: default-review
description: Independent review of a candidate
task_type: review
source: default
version: 1
max_tokens: 1500
---
1. Compare the request, changed files and test evidence.
2. Identify concrete correctness, authority or data-loss defects.
3. Verify success claims against evidence.
4. Keep findings tied to a file and observable behavior.
5. Return the requested review shape and retain unresolved failures.
6. Check authorization, untrusted input and sensitive data access.
