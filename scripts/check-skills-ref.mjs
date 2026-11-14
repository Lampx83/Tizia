/**
 * check-skills-ref.mjs — Chạy `skills-ref validate` trên từng thư mục skill nếu máy có cài; không có thì bỏ qua (exit 0).
 *
 * Chạy:  node scripts/check-skills-ref.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BIN = 'skills-ref';
const DIRS = ['ai-board/harness/skills', 'ai-board/harness/skills/proposed'];

export function skillFolders(root = ROOT) {
  return DIRS.flatMap(dir => {
    const abs = path.join(root, dir);
    if (!fs.existsSync(abs)) return [];
    return fs.readdirSync(abs, { withFileTypes: true })
      .filter(e => e.isDirectory() && fs.existsSync(path.join(abs, e.name, 'SKILL.md')))
      .map(e => path.join(abs, e.name));
  });
}

export function run(root = ROOT) {
  const finder = process.platform === 'win32' ? 'where' : 'which';
  if (spawnSync(finder, [BIN], { encoding: 'utf8' }).status !== 0) {
    console.log(`skip: ${BIN} not installed, skills-ref validate not run`);
    return 0;
  }
  let failed = 0;
  for (const folder of skillFolders(root)) {
    const res = spawnSync(BIN, ['validate', folder], { encoding: 'utf8', shell: process.platform === 'win32' });
    if (res.status !== 0) {
      failed++;
      console.error(`${path.relative(root, folder)}: ${(res.stdout + res.stderr).trim()}`);
    }
  }
  console.log(failed ? `${failed} skill(s) failed skills-ref validate` : 'skills-ref validate: ok');
  return failed ? 1 : 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = run();
}
