// One-off SQLite -> PostgreSQL copy of the whole app (synthetic data only). Needs TEST_PG_URL; the SQLite source side
// needs better-sqlite3 (skipped when it is not installed: it is no longer an app dependency).
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import pg from 'pg';
import { createPgDb, toPgDdl } from '../server/ai-board/db/index.js';
import { copySqliteToPostgres } from '../server/scripts/copy-sqlite-to-postgres.mjs';

const PG_URL = process.env.TEST_PG_URL || '';
let Database = null;
try { ({ default: Database } = await import('better-sqlite3')); } catch { /* optional */ }

const HASH = 'scrypt$N=16384$SYNTHETIC-SALT$SYNTHETIC-HASH-VALUE-0123456789';
const DDL = `
  CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL, password_hash TEXT NOT NULL, created_at INTEGER NOT NULL);
  CREATE TABLE sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id), expires_at INTEGER NOT NULL);
  CREATE TABLE attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER REFERENCES users(id), score REAL, blob BLOB, created_at INTEGER NOT NULL);
  CREATE TABLE skills (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);`;

async function fixture({ extraTarget = '' } = {}) {
  const schema = `c_${randomBytes(6).toString('hex')}`;
  const admin = new pg.Client({ connectionString: PG_URL });
  await admin.connect();
  await admin.query(`CREATE SCHEMA ${schema}`);
  const url = new URL(PG_URL);
  url.searchParams.set('options', `-c search_path=${schema}`);
  const target = createPgDb({ url: url.toString(), max: 2 });
  await target.exec(toPgDdl(DDL).replace('BLOB', 'BYTEA') + extraTarget);
  const sqlite = new Database(':memory:');
  sqlite.exec(DDL);
  sqlite.exec(`
    INSERT INTO users (id, username, display_name, password_hash, created_at) VALUES (7, 'lan', 'Lan', '${HASH}', 1800000000000), (9, 'minh', 'Minh', 'x', 1800000000001);
    INSERT INTO sessions VALUES ('tok-1', 7, 1900000000000), ('tok-2', 9, 1900000000001);
    INSERT INTO attempts (id, user_id, score, blob, created_at) VALUES (3, 7, 1.5, x'00ff10', 1800000000002), (4, NULL, NULL, NULL, 1800000000003);
    INSERT INTO skills (id, name) VALUES (1, 'a'), (2, 'b'), (3, 'c');`);
  return { sqlite, target, async dispose() { sqlite.close(); await target.close(); await admin.query(`DROP SCHEMA ${schema} CASCADE`); await admin.end(); } };
}

const opts = { skip: !PG_URL || !Database };

test('copy: dry run counts only; full copy keeps rows, ids, blobs, sequences; hashes copied but never logged', opts, async () => {
  const f = await fixture();
  const lines = [];
  try {
    const dry = await copySqliteToPostgres({ sqlite: f.sqlite, pg: f.target, dryRun: true, log: (l) => lines.push(l) });
    assert.deepEqual(dry.counts, { attempts: 2, sessions: 2, skills: 3, users: 2 });
    assert.equal((await f.target.get('SELECT COUNT(*) AS n FROM users')).n, 0);

    const done = await copySqliteToPostgres({ sqlite: f.sqlite, pg: f.target, log: (l) => lines.push(l) });
    assert.deepEqual(done.counts, dry.counts);
    assert.deepEqual((await f.target.all('SELECT id, username, created_at FROM users ORDER BY id')), [
      { id: 7, username: 'lan', created_at: 1800000000000 }, { id: 9, username: 'minh', created_at: 1800000000001 }]);
    assert.equal((await f.target.get('SELECT password_hash FROM users WHERE id = 7')).password_hash, HASH);
    assert.equal((await f.target.get('SELECT user_id FROM sessions WHERE token = ?', ['tok-2'])).user_id, 9);
    const a = await f.target.get('SELECT blob, score FROM attempts WHERE id = 3');
    assert.equal(Buffer.from(a.blob).toString('hex'), '00ff10');
    assert.equal(a.score, 1.5);
    assert.equal(await f.target.insert(`INSERT INTO users(username, display_name, password_hash, created_at) VALUES ('new', 'N', 'h', 1)`), 10);
    assert.equal(await f.target.insert('INSERT INTO attempts(created_at) VALUES (1)'), 5);
    assert.ok(lines.length >= 4);
    for (const l of lines) assert.ok(!l.includes('SYNTHETIC') && !l.includes('lan'), `log line leaks a value: ${l}`);
  } finally { await f.dispose(); }
});

test('copy: refuses non-empty target without --replace; --replace overwrites seeded rows only', opts, async () => {
  const f = await fixture();
  try {
    await f.target.run(`INSERT INTO skills(id, name) VALUES (1, 'seeded')`);
    await assert.rejects(copySqliteToPostgres({ sqlite: f.sqlite, pg: f.target }), /skills/);
    assert.equal((await f.target.get('SELECT COUNT(*) AS n FROM users')).n, 0, 'refusal wrote nothing');
    const r = await copySqliteToPostgres({ sqlite: f.sqlite, pg: f.target, replace: true });
    assert.deepEqual(r.replacing, ['skills']);
    assert.deepEqual((await f.target.all('SELECT name FROM skills ORDER BY id')).map((x) => x.name), ['a', 'b', 'c']);
  } finally { await f.dispose(); }
});

test('copy: a source table without a target table is refused unless --skip-missing', opts, async () => {
  const f = await fixture();
  try {
    f.sqlite.exec(`CREATE TABLE legacy_only (id INTEGER PRIMARY KEY, v TEXT); INSERT INTO legacy_only VALUES (1, 'x')`);
    await assert.rejects(copySqliteToPostgres({ sqlite: f.sqlite, pg: f.target }), /legacy_only/);
    const r = await copySqliteToPostgres({ sqlite: f.sqlite, pg: f.target, skipMissing: true });
    assert.deepEqual(r.skipped, ['legacy_only']);
  } finally { await f.dispose(); }
});

test('copy: a failing insert rolls everything back and the error carries no row values', opts, async () => {
  const f = await fixture({ extraTarget: 'ALTER TABLE users ADD CONSTRAINT short_hash CHECK (length(password_hash) < 5);' });
  try {
    await assert.rejects(copySqliteToPostgres({ sqlite: f.sqlite, pg: f.target }), (e) => {
      assert.match(e.message, /^users: 23514 \(short_hash\)$/);
      assert.ok(!e.message.includes('SYNTHETIC'));
      return true;
    });
    assert.equal((await f.target.get('SELECT COUNT(*) AS n FROM skills')).n, 0, 'all-or-nothing');
  } finally { await f.dispose(); }
});
