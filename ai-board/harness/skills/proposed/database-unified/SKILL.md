---
name: database-unified
description: "Database rules: additive migrations, explicit transaction and lock order, indexed bounded queries. Use when a step changes schema, migrations or queries, not when it only reads rows for a report."
metadata:
  task_type: "database"
  source: "admin"
  version: "1"
  max_tokens: "1400"
---
Facts:
- Platform decisions and authority stay outside this skill; it adds no tool and no budget.
- Migrations run only where a database is available; when absent, say the migration was not run.
Look: the tables and constraints the change touches, existing migrations for naming and order, and the queries that read them.
1. Make migrations additive: expand first, contract in a later step.
2. Preserve existing data, ownership and unique constraints.
3. Make transaction boundaries and lock order explicit.
4. Check each new access pattern has an index and a bounded result.
5. Verify migration, retry and rollback with fixture data.
Done means: the migration applies twice without error, old rows survive, new queries are indexed and bounded, and the check commands with their counts are reported.
Example:
Request: add a due date to tasks. Right: a nullable column with a default in a new migration, an index on it for the list query with a limit, and a fixture test that old rows keep their values; report "3 passed".
