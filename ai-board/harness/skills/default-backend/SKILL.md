---
name: default-backend
description: "Backend rules: reuse service and validation boundaries, check input and authorization before effects, keep retries idempotent. Use when a step changes server or harness behavior."
metadata:
  task_type: "backend"
  source: "default"
  version: "1"
  max_tokens: "1500"
---
1. Reuse the existing service and validation boundary.
2. Validate external input before effects.
3. Keep authorization and ownership checks at the write boundary.
4. Preserve error handling and idempotency across retries.
5. Test the changed public behavior, including its failure path.
