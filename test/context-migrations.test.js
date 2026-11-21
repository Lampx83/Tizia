// A context's approved migrations run at load, in name order, and stay safe to run on every boot.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { runContextMigrations } from '../server/context-migrations.js';
import { openBoard } from './support/ai-board-db.js';

test('runs every migrations/*.sql once per boot, idempotently, and skips a missing dir', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ctx-mig-'));
  fs.writeFileSync(path.join(dir, '001-ghi-chu.sql'), 'CREATE TABLE IF NOT EXISTS ghi_chu_nhanh (id SERIAL PRIMARY KEY, noi_dung TEXT NOT NULL);');
  fs.writeFileSync(path.join(dir, '002-tao-luc.sql'), 'ALTER TABLE ghi_chu_nhanh ADD COLUMN IF NOT EXISTS tao_luc BIGINT;');
  fs.writeFileSync(path.join(dir, 'README.md'), 'not sql');
  const db = await openBoard();
  try {
    const url = pathToFileURL(dir);
    assert.deepEqual(await runContextMigrations(db.d, url), ['001-ghi-chu.sql', '002-tao-luc.sql']);
    assert.deepEqual(await runContextMigrations(db.d, url), ['001-ghi-chu.sql', '002-tao-luc.sql'], 'second boot is a no-op');
    await db.d.run('INSERT INTO ghi_chu_nhanh(noi_dung, tao_luc) VALUES (?, ?)', ['x', 1]);
    assert.equal((await db.d.get('SELECT COUNT(*) AS n FROM ghi_chu_nhanh')).n, 1);
    assert.deepEqual(await runContextMigrations(db.d, pathToFileURL(path.join(dir, 'missing'))), []);
  } finally {
    db.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
