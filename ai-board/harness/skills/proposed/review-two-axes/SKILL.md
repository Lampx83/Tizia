---
name: review-two-axes
description: Review on two axes: repo standards and request fit
task_type: review
source: admin
version: 1
max_tokens: 1500
---
1. Standards axis: check added lines against repo rules stated in the request or diff (comment style, docs location, naming, file scope). Cite the rule.
2. Request axis: check the diff against the original request and its acceptance criteria. Name each unmet criterion and the file where it should be met.
3. Each finding names one file and one observable behavior of the diff. Prefix the issue with "standards:" or "request:".
4. Report only what the diff shows. A missing test or a guess is not a finding.
5. Severity high only when an acceptance criterion or authority rule is broken. Style, naming and comments are low.
6. Keep the default-review checks for correctness, authority and data loss; this skill adds to them.
7. Return only JSON {"verdict", "findings": [{"severity", "issue"}]}.
