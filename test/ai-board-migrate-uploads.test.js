import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { migrateUploads } from '../scripts/ai-board-migrate-uploads.mjs';

const SCRIPT = path.resolve('scripts/ai-board-migrate-uploads.mjs');
const root = mkdtempSync(path.join(tmpdir(), 'tizia-migrate-uploads-'));
let seq = 0;

function fixture() {
  const id = seq++;
  const webData = path.join(root, `web-${id}`);
  const src = path.join(webData, 'uploads', 'requests');
  const dst = path.join(root, `board-${id}`, 'requests');
  mkdirSync(path.join(src, '2026-10-01'), { recursive: true });
  mkdirSync(path.join(src, '2026-10-02'), { recursive: true });
  writeFileSync(path.join(src, '2026-10-01', 'a.png'), Buffer.from('png-a'));
  writeFileSync(path.join(src, '2026-10-02', 'b.pdf'), Buffer.from('%PDF-b-longer-body'));
  return { webData, src, dst };
}

const digestTree = (dir) => readdirSync(dir, { recursive: true, withFileTypes: true })
  .filter((e) => e.isFile())
  .map((e) => {
    const file = path.join(e.parentPath ?? e.path, e.name);
    return [path.relative(dir, file), createHash('sha256').update(readFileSync(file)).digest('hex')];
  })
  .sort();

test('dry-run reports pending files and creates nothing in the destination', async () => {
  const f = fixture();
  const out = await migrateUploads({ from: f.src, to: f.dst, apply: false });
  assert.equal(out.scanned, 2);
  assert.equal(out.pending, 2);
  assert.equal(out.copied, 0);
  assert.equal(fs.existsSync(f.dst), false, 'dry-run must not create the destination');
});

test('--apply copies every file with identical bytes and leaves the source untouched', async () => {
  const f = fixture();
  const before = digestTree(f.src);
  const out = await migrateUploads({ from: f.src, to: f.dst, apply: true });
  assert.equal(out.copied, 2);
  assert.equal(out.pending, 0);
  assert.equal(readFileSync(path.join(f.dst, '2026-10-01', 'a.png'), 'utf8'), 'png-a');
  assert.deepEqual(digestTree(f.src), before, 'source must be unchanged');
});

test('rerun after apply is a no-op: everything skipped as identical', async () => {
  const f = fixture();
  await migrateUploads({ from: f.src, to: f.dst, apply: true });
  const again = await migrateUploads({ from: f.src, to: f.dst, apply: true });
  assert.equal(again.copied, 0);
  assert.equal(again.skipped, 2);
  assert.equal(again.conflicts.length, 0);
});

test('a destination file with same size but different content is a conflict and is not overwritten', async () => {
  const f = fixture();
  mkdirSync(path.join(f.dst, '2026-10-01'), { recursive: true });
  writeFileSync(path.join(f.dst, '2026-10-01', 'a.png'), Buffer.from('png-X'));
  const out = await migrateUploads({ from: f.src, to: f.dst, apply: true });
  assert.deepEqual(out.conflicts, [path.join('2026-10-01', 'a.png')]);
  assert.equal(readFileSync(path.join(f.dst, '2026-10-01', 'a.png'), 'utf8'), 'png-X');
  assert.equal(out.copied, 1);
});

test('source and destination that overlap are refused', async () => {
  const f = fixture();
  await assert.rejects(migrateUploads({ from: f.src, to: f.src, apply: true }), /overlap|same/i);
  await assert.rejects(migrateUploads({ from: f.src, to: path.join(f.src, 'nested'), apply: true }), /overlap|same/i);
});

test('missing source directory rejects with a clear message', async () => {
  await assert.rejects(migrateUploads({ from: path.join(root, 'nope'), to: path.join(root, 'nope-dst'), apply: true }),
    /source not found/);
});

test('CLI without --apply copies nothing; with --apply copies; exit 0', () => {
  const f = fixture();
  const args = ['--from', f.webData, '--to', f.dst];
  const dry = spawnSync(process.execPath, [SCRIPT, ...args], { encoding: 'utf8' });
  assert.equal(dry.status, 0, dry.stderr);
  assert.match(dry.stdout, /dry-run/);
  assert.equal(fs.existsSync(f.dst), false);
  const applied = spawnSync(process.execPath, [SCRIPT, ...args, '--apply'], { encoding: 'utf8' });
  assert.equal(applied.status, 0, applied.stderr);
  assert.match(applied.stdout, /copied=2/);
  assert.equal(readdirSync(path.join(f.dst, '2026-10-02')).length, 1);
});

test('CLI without --from fails with usage and exit 1', () => {
  const r = spawnSync(process.execPath, [SCRIPT], { encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /--from/);
});

test.after(() => { rmSync(root, { recursive: true, force: true }); });
