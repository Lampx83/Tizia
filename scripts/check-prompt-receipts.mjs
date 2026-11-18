// Fails when a prompt/skill file differs from its lock hash without a passing eval receipt for the on-disk hash.
// Usage: node scripts/check-prompt-receipts.mjs <receipts.json>   (export of GET .../prompt-labels, or a bare array)
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HARNESS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'ai-board', 'harness');
const sha = (file) => createHash('sha256').update(readFileSync(file, 'utf8').replace(/\r\n/g, '\n')).digest('hex');
const json = (file) => JSON.parse(readFileSync(file, 'utf8'));

/** Names whose disk hash differs from the lock and lacks a passed receipt for that exact hash. */
export function findUnreceipted(receipts, harness = HARNESS) {
  const list = Array.isArray(receipts) ? receipts : receipts?.eval_receipts ?? [];
  const ok = new Set(list.filter((r) => r.passed).map((r) => `${r.name}@${r.prompt_hash}`));
  const targets = [
    [path.join(harness, 'prompts', 'prompts.lock.json'), (n) => [n, path.join(harness, 'prompts', n)]],
    [path.join(harness, 'skills', 'skills.lock.json'), (n) => [`skills/${n}`, path.join(harness, 'skills', n, 'SKILL.md')]],
  ];
  const bad = [];
  for (const [lockFile, locate] of targets) {
    const lock = json(lockFile);
    for (const key of Object.keys(lock)) {
      const [name, file] = locate(key);
      const have = sha(file);
      if (have !== lock[key] && !ok.has(`${name}@${have}`)) bad.push({ name, hash: have });
    }
  }
  return bad;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const bad = findUnreceipted(json(process.argv[2]));
  for (const b of bad) console.error(`no passing eval receipt: ${b.name} ${b.hash}`);
  process.exit(bad.length ? 1 : 0);
}
