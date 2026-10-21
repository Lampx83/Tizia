---
name: default-database
description: Database and migration changes
task_type: database
source: default
version: 1
max_tokens: 1500
---
1. Use additive PostgreSQL migrations; expand before contracting a schema.
2. Preserve existing data and ownership constraints.
3. Make transaction and lock order explicit.
4. Check indexes and bounded queries for new access patterns.
5. Verify migration, retry and rollback behavior with fixture data.
