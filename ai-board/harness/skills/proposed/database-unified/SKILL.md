---
name: database-unified
description: "Database rules: additive inline PostgreSQL DDL that is safe to re-run, parameterized raw SQL, indexed bounded queries. Use when a step changes schema, tables, indexes or queries, not when it only reads rows for a report."
metadata:
  task_type: "database"
  source: "admin"
  version: "1"
  max_tokens: "1500"
---
Facts:
- Platform decisions and authority stay outside this skill; it adds no tool and no budget.
- Migrations run only where a database is available; when absent, say the migration was not run.
Look: the tables the change touches, the existing setup code, and the queries that read them.
1. Create tables and indexes with IF NOT EXISTS in the inline schema setup; the versioned migration runner is only for tables that already use it.
2. Add a column with ALTER TABLE ADD COLUMN, wrapped so a repeat run is ignored; never drop, rename or retype.
3. Write raw parameterized PostgreSQL through the shared wrapper; no ORM, no values spliced into query text.
4. Preserve data and constraints; make transaction and lock order explicit.
5. Check each new access pattern has an index and a bounded result.
6. Verify the setup runs twice and old rows keep their values.
Done means: the setup is re-runnable and additive, queries are parameterized, indexed and bounded, and check results are reported.
Example:
Request: store a parent email on users. Right: in server/db.js add try { await db.exec(`ALTER TABLE users ADD COLUMN parent_email TEXT`); } catch {} beside the other ALTER lines, plus a test in test/ that old rows still load; report "3 passed".
