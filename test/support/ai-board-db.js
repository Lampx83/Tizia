// Backends for dual-backend AI board tests. SQLite always; PostgreSQL only when TEST_PG_URL is set (throwaway container).
// Each fixture gets its own schema (search_path via connection options), so test files can run in parallel.
import { randomBytes } from 'node:crypto';
import Database from 'better-sqlite3';
import pg from 'pg';
import { applyMigrations, applyPgBaseSchema, createPgDb, createSqliteDb } from '../../server/ai-board/db/index.js';

const SQLITE_BASE = `
  CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, display_name TEXT, role TEXT, enrolled_domain TEXT);
  CREATE TABLE requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT, domain TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'other',
    title TEXT NOT NULL, detail TEXT, student TEXT NOT NULL DEFAULT 'Ẩn danh',
    status TEXT NOT NULL DEFAULT 'pending', votes INTEGER NOT NULL DEFAULT 1,
    admin_note TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, attachments TEXT
  );
  CREATE TABLE request_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER NOT NULL, role TEXT NOT NULL,
    author_name TEXT, body TEXT NOT NULL, attachments TEXT, created_at INTEGER NOT NULL
  );`;

export const PG_URL = process.env.TEST_PG_URL || '';

/** [{ name, open(migrate = true) -> Promise<db with .dispose()> }] */
export const backends = [
  {
    name: 'sqlite',
    async open(migrate = true) {
      const raw = new Database(':memory:');
      raw.pragma('foreign_keys = ON');
      raw.exec(SQLITE_BASE);
      const d = createSqliteDb(raw);
      if (migrate) await applyMigrations(d);
      return Object.assign(d, { dispose: () => d.close() });
    },
  },
  ...(PG_URL ? [{
    name: 'postgres',
    async open(migrate = true) {
      const schema = `t_${randomBytes(6).toString('hex')}`;
      const admin = new pg.Client({ connectionString: PG_URL });
      await admin.connect();
      await admin.query(`CREATE SCHEMA ${schema}`);
      const url = new URL(PG_URL);
      url.searchParams.set('options', `-c search_path=${schema}`);
      const d = createPgDb({ url: url.toString(), max: 4 });
      if (migrate) {
        await applyPgBaseSchema(d);
        await applyMigrations(d);
      }
      return Object.assign(d, {
        async dispose() {
          await d.close();
          await admin.query(`DROP SCHEMA ${schema} CASCADE`);
          await admin.end();
        },
      });
    },
  }] : []),
];
