// Async PostgreSQL contract (pool, ambient transactions, savepoints) shared by the app db handle and the AI board.
// SQL is written once with `?` placeholders and portable syntax (ON CONFLICT DO NOTHING, COALESCE, CAST); the few
// dialect gaps go through `d.jsonNum` / `d.lockRow` / `d.lockQueue(alias)`. `t` inside tx() has the same methods as `d`.
// Board schema migrations (server/ai-board/migrations, PostgreSQL overrides in ./pg) run from db.js at boot.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(HERE, '..', 'migrations');
export const MIGRATION_LOCK = 7_000_101; // pg_advisory_xact_lock key: two app instances must not migrate at once

import { toPgDdl } from '../../db-pg-core.js';
export { toPgPlaceholders, createPgDb } from '../../db-pg-core.js';
export { toPgDdl };

/** Migration files in apply order. */
export function listMigrationVersions(migrationsDir = MIGRATIONS_DIR) {
  return fs.readdirSync(migrationsDir).filter((n) => /^\d+.*\.sql$/.test(n)).sort();
}

/** SQL text exactly as applyMigrations executes it (PostgreSQL override or converted DDL). */
export function loadMigrationSql(version, { postgres = true, dir = MIGRATIONS_DIR } = {}) {
  const sql = fs.readFileSync(path.join(dir, version), 'utf8');
  if (!postgres) return sql;
  const override = path.join(HERE, 'pg', version);
  return fs.existsSync(override) ? fs.readFileSync(override, 'utf8') : toPgDdl(sql);
}

/** Base board tables (users/requests/request_messages) that the web boot creates; migrations only ALTER them. */
export async function ensureBoardBaseSchema(d) {
  await d.exec(fs.readFileSync(path.join(HERE, 'base-schema.sql'), 'utf8'));
}

/** Ordered, re-runnable: each file runs once in its own transaction with its schema_migrations row. */
export async function applyMigrations(d, migrationsDir = MIGRATIONS_DIR) {
  const pgSql = d.dialect === 'postgres';
  await d.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
    scope TEXT NOT NULL, version TEXT NOT NULL, applied_at ${pgSql ? 'BIGINT' : 'INTEGER'} NOT NULL,
    PRIMARY KEY(scope, version))`);
  for (const version of listMigrationVersions(migrationsDir)) {
    await d.tx(async (t) => {
      if (pgSql) await t.get('SELECT pg_advisory_xact_lock(?)', [MIGRATION_LOCK]);
      if (await t.get('SELECT 1 AS ok FROM schema_migrations WHERE scope = ? AND version = ?', ['ai-board', version])) return;
      await t.exec(loadMigrationSql(version, { postgres: pgSql, dir: migrationsDir }));
      await t.run('INSERT INTO schema_migrations(scope, version, applied_at) VALUES (?, ?, ?)', ['ai-board', version, Date.now()]);
    });
  }
}
