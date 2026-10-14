// DB_BOOT_MODE=existing-schema against a disposable PostgreSQL holding the 87-table mock of production (needs Docker for the statement log).
//   EXISTING_BOOT_PG_URL=postgres://postgres:pw@127.0.0.1:55439/postgres   superuser URL of a throwaway server started with -c log_statement=mod -c "log_line_prefix=%m|%d|%u|"
//   EXISTING_BOOT_PG_CONTAINER=<its container name>
//   MOCK_PROD_DIR=<dir with 01-mock-schema.sql, 02-mock-seed.sql, 03-digest.sql>
//   node test/db-existing-boot.e2e.mjs
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { analyzeMigrations, schemaSnapshot, unexpectedChanges, AI_BOARD_BOOT_TABLES } from '../server/ai-board/db/additive.js';

const need = (k) => { const v = process['env'][k]; if (!v) throw new Error(`${k} required`); return v; };
const ADMIN_URL = need('EXISTING_BOOT_PG_URL');
const CONTAINER = need('EXISTING_BOOT_PG_CONTAINER');
const MOCK = need('MOCK_PROD_DIR');
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const APP_ROLE = 'ebt_app_rw';
const analysis = analyzeMigrations();
const dbUrl = (db, user = null) => { const u = new URL(ADMIN_URL); u.pathname = `/${db}`; if (user) { u.username = user; u.password = 'pw'; } return u.toString(); };
const sql = (f) => fs.readFileSync(path.join(MOCK, f), 'utf8');

const admin = new pg.Client({ connectionString: ADMIN_URL });
await admin.connect();
const made = [];
const tmpDirs = [];
const clients = [];

async function mockDb(label) {
  const name = `ebt_${label}_${randomBytes(3).toString('hex')}`;
  await admin.query(`CREATE DATABASE ${name}`);
  made.push(name);
  const c = new pg.Client({ connectionString: dbUrl(name) });
  await c.connect();
  clients.push(c);
  await c.query(sql('01-mock-schema.sql'));
  await c.query(sql('02-mock-seed.sql'));
  await grantApp(c, name);
  return { name, c };
}

async function grantApp(c, name) {
  await admin.query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${APP_ROLE}') THEN CREATE ROLE ${APP_ROLE} LOGIN PASSWORD 'pw'; END IF; END $$`);
  await admin.query(`GRANT CONNECT ON DATABASE ${name} TO ${APP_ROLE}`);
  await c.query(`GRANT USAGE ON SCHEMA public TO ${APP_ROLE}; GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ${APP_ROLE};
    GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ${APP_ROLE}`);
}

const digest = async (c) => Object.fromEntries((await c.query(sql('03-digest.sql'))).rows.map((r) => [r.t, `${r.n}|${r.md5}`]));
const stable = (snap) => JSON.stringify([[...snap.tables].map(([t, i]) => [t, [...i].sort()]).sort(), snap.procs]);

function pgLog(dbName) {
  const r = spawnSync('docker', ['logs', CONTAINER], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  return `${r.stdout}\n${r.stderr}`.split(/\n(?=\d{4}-\d\d-\d\d \d\d:\d\d:\d\d\.\d+ )/).filter((e) => e.includes(`|${dbName}|`));
}

/** Runs `node server/index.js`; resolves at the end-of-boot marker (killed before it listens) or when the process exits. */
function boot(url, vars = {}) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ebt-data-'));
  tmpDirs.push(dataDir);
  const childEnv = { ...process['env'], DATABASE_URL: url, PORT: String(20000 + Math.floor(Math.random() * 20000)), DATA_DIR: dataDir, ...vars };
  return new Promise((resolve) => {
    const p = spawn(process.execPath, ['server/index.js'], { cwd: ROOT, env: childEnv });
    let out = '';
    let doneSeen = false;
    const finish = (code) => { clearTimeout(timer); resolve({ code, out, doneSeen }); };
    const onData = (d) => {
      out += d;
      if (!doneSeen && out.includes('existing-schema boot done')) { doneSeen = true; p.kill(); }
    };
    p.stdout.on('data', onData); p.stderr.on('data', onData);
    p.on('exit', (code) => finish(code));
    const timer = setTimeout(() => { p.kill(); }, 120_000);
  });
}

const dmlOn = (names) => new RegExp(`\\b(?:INSERT\\s+INTO|UPDATE|DELETE\\s+FROM|TRUNCATE(?:\\s+TABLE)?|ALTER\\s+TABLE(?:\\s+ONLY)?|DROP\\s+TABLE|CREATE\\s+(?:UNIQUE\\s+)?INDEX\\s+(?:IF\\s+NOT\\s+EXISTS\\s+)?\\w+\\s+ON)\\s+(?:public\\.)?"?(?:${names.join('|')})\\b`, 'i');
const results = [];
const step = async (name, fn) => { await fn(); results.push(name); console.log(`ok   ${name}`); };

try {
  const mock = await mockDb('first');
  const original = Object.keys(await digest(mock.c));
  assert.equal(original.length, 87, 'digest covers the 87 ERD tables');
  const d0 = await digest(mock.c);
  const s0 = await schemaSnapshot(mock.c);
  assert.equal(s0.tables.size, 87);

  await step('existing-schema boot on fresh prod mock: AI Board additive + gate_trace/skill_proposals, nothing else', async () => {
    const log0 = pgLog(mock.name).length;
    const r = await boot(dbUrl(mock.name), { DB_BOOT_MODE: 'existing-schema' });
    assert.ok(r.doneSeen, `boot did not finish:\n${r.out.slice(-3000)}`);
    const d1 = await digest(mock.c);
    assert.deepEqual(d1, d0, '87 original tables: row digests changed');
    const s1 = await schemaSnapshot(mock.c);
    assert.deepEqual(unexpectedChanges(s0, s1, analysis, { createdSchemaMigrations: true, allowNew: AI_BOARD_BOOT_TABLES }), []);
    assert.equal(s1.tables.size, 87 + analysis.newTables.length + 1 + AI_BOARD_BOOT_TABLES.length);
    const [{ n }] = (await mock.c.query(`SELECT count(*)::int AS n FROM schema_migrations WHERE scope = 'ai-board'`)).rows;
    assert.equal(n, analysis.versions.length);
    const logs = pgLog(mock.name).slice(log0);
    const viol = logs.filter((e) => dmlOn(original.filter((t) => t !== 'requests')).test(e));
    assert.deepEqual(viol.map((e) => e.slice(0, 160)), [], 'statements on original tables other than requests');
    console.log('     ', r.out.match(/existing-schema boot done.*/)?.[0]?.slice(0, 400));
    await grantApp(mock.c, mock.name);
  });

  await step('restart as non-owner app role: zero DDL/DML in the statement log, catalog and rows identical', async () => {
    const s1 = await schemaSnapshot(mock.c);
    const d1 = await digest(mock.c);
    const log0 = pgLog(mock.name).length;
    const r = await boot(dbUrl(mock.name, APP_ROLE), { DB_BOOT_MODE: 'existing-schema' });
    assert.ok(r.doneSeen, `boot did not finish:\n${r.out.slice(-3000)}`);
    const logs = pgLog(mock.name).slice(log0);
    const ddlOrOriginal = logs.filter((e) => /\b(CREATE|ALTER|DROP)\s+\w+/i.test(e) || dmlOn(original).test(e) || /\bERROR:/.test(e));
    assert.deepEqual(ddlOrOriginal.map((e) => e.slice(0, 200)), [], 'DDL, errors or writes to original tables during boot');
    assert.deepEqual(await digest(mock.c), d1);
    assert.equal(stable(await schemaSnapshot(mock.c)), stable(s1));
  });

  await step('missing table and column: boot stops, message names them, nothing created', async () => {
    const m = await mockDb('missing');
    await m.c.query('DROP TABLE user_wallets; ALTER TABLE users DROP COLUMN grade');
    const before = stable(await schemaSnapshot(m.c));
    const r = await boot(dbUrl(m.name), { DB_BOOT_MODE: 'existing-schema' });
    assert.notEqual(r.code, 0);
    assert.ok(!r.doneSeen);
    assert.match(r.out, /missing table user_wallets/);
    assert.match(r.out, /table users lacks column\(s\): grade/);
    assert.equal(stable(await schemaSnapshot(m.c)), before);
    await m.c.end();
  });

  await step('unknown DB_BOOT_MODE refuses to boot and creates nothing', async () => {
    const m = await mockDb('typo');
    const before = stable(await schemaSnapshot(m.c));
    const r = await boot(dbUrl(m.name), { DB_BOOT_MODE: 'existing' });
    assert.notEqual(r.code, 0);
    assert.match(r.out, /DB_BOOT_MODE="existing" is not valid/);
    assert.equal(stable(await schemaSnapshot(m.c)), before);
    await m.c.end();
  });

  await step('legacy mode (unset and explicit) still creates, alters, indexes and seeds', async () => {
    for (const mode of [undefined, 'legacy']) {
      const name = `ebt_legacy_${randomBytes(3).toString('hex')}`;
      await admin.query(`CREATE DATABASE ${name}`); made.push(name);
      const vars = { DATABASE_URL: dbUrl(name), DATA_DIR: fs.mkdtempSync(path.join(os.tmpdir(), 'ebt-data-')) };
      tmpDirs.push(vars.DATA_DIR);
      if (mode) vars.DB_BOOT_MODE = mode;
      const childEnv = { ...process['env'], ...vars };
      if (!mode) delete childEnv.DB_BOOT_MODE;
      const r = spawnSync(process.execPath, ['--input-type=module', '-e', "await import('./server/db.js'); process.exit(0)"], { cwd: ROOT, env: childEnv, encoding: 'utf8', timeout: 120_000 });
      assert.equal(r.status, 0, r.stderr);
      const c = new pg.Client({ connectionString: dbUrl(name) });
      await c.connect();
      clients.push(c);
      const one = async (q) => (await c.query(q)).rows[0].n;
      assert.ok(await one(`SELECT count(*)::int AS n FROM information_schema.tables WHERE table_schema = 'public'`) > 30);
      assert.equal(await one(`SELECT count(*)::int AS n FROM pg_indexes WHERE indexname = 'ux_users_username_ci'`), 1);
      assert.equal(await one(`SELECT count(*)::int AS n FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'enrolled_domain'`), 1);
      assert.equal(await one('SELECT count(*)::int AS n FROM competencies'), 15);
      assert.equal(await one(`SELECT count(*)::int AS n FROM schema_migrations WHERE scope = 'ai-board'`), analysis.versions.length);
      assert.equal(await one(`SELECT count(*)::int AS n FROM information_schema.tables WHERE table_name IN ('gate_trace', 'skill_proposals')`), 2);
      await c.end();
    }
  });
  console.log(`\n${results.length} scenarios passed`);
} finally {
  await mockCleanup();
}

async function mockCleanup() {
  for (const c of clients) await c.end().catch(() => {});
  for (const d of tmpDirs) fs.rmSync(d, { recursive: true, force: true });
  await new Promise((r) => setTimeout(r, 300));
  for (const n of made) await admin.query(`DROP DATABASE IF EXISTS ${n} WITH (FORCE)`).catch((e) => console.warn('cleanup', n, e.message));
  await admin.query(`DROP ROLE IF EXISTS ${APP_ROLE}`).catch(() => {});
  await admin.end();
}
