// PostgreSQL fixture: one isolated schema per fixture, disposed idempotently.
// TEST_PG_URL points at a throwaway PostgreSQL; no SQLite test backend exists.
import { after } from 'node:test';
import fs from 'node:fs';
import { randomBytes } from 'node:crypto';
import pg from 'pg';
import { createAppDb } from '../../server/db-core.js';
import { applyMigrations } from '../../server/ai-board/db/index.js';

export const PG_URL = process.env.TEST_PG_URL || '';

const BASE_SQL = fs.readFileSync(new URL('./ai-board-base.sql', import.meta.url), 'utf8');
const opened = [];

/** New schema (search_path via connection options), base tables, board migrations. Returns the app db handle (`.d` = contract). */
export async function createBoardSchema({ migrate = true } = {}) {
  if (!PG_URL) throw new Error('TEST_PG_URL is required: the test suite runs on a throwaway PostgreSQL');
  const schema = `t_${randomBytes(6).toString('hex')}`;
  const admin = new pg.Client({ connectionString: PG_URL });
  await admin.connect();
  await admin.query(`CREATE SCHEMA ${schema}`);
  const url = new URL(PG_URL);
  url.searchParams.set('options', `-c search_path=${schema}`);
  const db = createAppDb({ url: url.toString() });
  if (migrate) {
    await db.d.exec(BASE_SQL);
    await applyMigrations(db.d);
  }
  db.url = url.toString();
  const closePool = db.close.bind(db);
  let disposed = false;
  db.dispose = async () => { if (disposed) return; disposed = true; await closePool(); await admin.query(`DROP SCHEMA ${schema} CASCADE`); await admin.end(); };
  db.close = db.dispose;
  opened.push(db);
  return db;
}

after(async () => { for (const db of opened.splice(0)) await db.dispose(); });

/**
 * Empty board database. `users`: rows [id, username, display_name, role, enrolled_domain].
 * A caller may close its handle without affecting later fixtures.
 */
export async function openBoard({ users = [], fresh = false, migrate = true } = {}) {
  const db = await createBoardSchema({ migrate });
  for (const [id, username, displayName, role, domain] of users) {
    await db.d.run('INSERT INTO users(id, username, display_name, role, enrolled_domain) VALUES (?, ?, ?, ?, ?)', [id, username, displayName, role, domain ?? null]);
  }
  return db;
}

export const backends = [{ name: 'postgres', async open() { const app = await createBoardSchema(); app.d.dispose = () => app.dispose(); return app.d; } }];
