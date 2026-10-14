import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { analyzeMigrations, assertAdditive, splitStatements, unexpectedChanges, EXPECTED_NEW_TABLES, AI_BOARD_BOOT_TABLES } from '../server/ai-board/db/additive.js';

test('real migrations are additive-only and yield the expected set', () => {
  const a = assertAdditive(analyzeMigrations());
  assert.equal(a.newTables.length, EXPECTED_NEW_TABLES);
  assert.deepEqual(a.externalRefs, ['requests.id', 'users.id']);
  for (const prod of ['users', 'requests', 'ai_decisions', 'ai_prompt_log', 'ai_token_usage', 'ai_lesson_content']) assert.ok(!a.newTables.includes(prod));
});

test('splitter ignores comments, quotes and dollar bodies', () => {
  const s = splitStatements("-- x; y\nCREATE TABLE ai_a (id INT); /* ; */ INSERT INTO ai_a VALUES ('a;b');\nCREATE FUNCTION f() RETURNS int AS $$ BEGIN UPDATE other SET a=1; END $$ LANGUAGE plpgsql;");
  assert.equal(s.length, 3);
  assert.match(s[2].body, /UPDATE other/);
  assert.ok(!s[2].masked.includes('UPDATE'));
});

function withExtra(file, sql) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'additive-'));
  const src = path.join(import.meta.dirname, '..', 'server', 'ai-board', 'migrations');
  for (const f of fs.readdirSync(src)) fs.copyFileSync(path.join(src, f), path.join(dir, f));
  fs.writeFileSync(path.join(dir, file), sql);
  return dir;
}

test('statements outside the AI Board set are refused', () => {
  for (const sql of [
    'UPDATE classes SET name = name;',
    'ALTER TABLE users ADD COLUMN x TEXT;',
    'ALTER TABLE requests ADD COLUMN surprise TEXT;',
    'DROP TABLE requests;',
    'CREATE INDEX idx_x ON users(id);',
    'INSERT INTO requests(id) VALUES (1);',
    'CREATE TABLE ai_decisions (id INT);',
    'CREATE TABLE ai_extra (u BIGINT REFERENCES classes(id));',
  ]) {
    const a = analyzeMigrations({ dir: withExtra('099-bad.sql', sql) });
    assert.ok(a.violations.some((v) => v.startsWith('099-bad.sql')), sql);
  }
});

test('prod-facts SQL lists every new table and index', () => {
  const a = analyzeMigrations();
  const sql = fs.readFileSync(path.join(import.meta.dirname, '..', 'server', 'scripts', 'ai-board-additive-prod-facts.sql'), 'utf8');
  for (const n of [...a.newTables, ...a.indexes, ...AI_BOARD_BOOT_TABLES]) assert.ok(sql.includes(`'${n}'`), n);
});

test('boot-created AI Board tables stay outside the migration set', () => {
  const a = analyzeMigrations();
  for (const t of AI_BOARD_BOOT_TABLES) assert.ok(!a.newTables.includes(t), t);
});

test('unexpectedChanges flags a touched existing table', () => {
  const a = analyzeMigrations();
  const snap = (extra = []) => ({ tables: new Map([['users', ['col:id:bigint:true::a', ...extra]]]), procs: [] });
  const bad = unexpectedChanges(snap(), snap(['col:evil:text:false::']), a);
  assert.ok(bad.some((b) => b.includes('users: gained')));
});
