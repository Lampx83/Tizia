// Replace em dashes in scenario content by context, one reviewed batch at a time.
// node scripts/emdash-batch.mjs scan [dir]                      counts per file, remaining total
// node scripts/emdash-batch.mjs propose <dir> --files N          sample before/after, no write
// node scripts/emdash-batch.mjs apply <dir> --files N            write the N files with fewest occurrences
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DASH = '\u2014';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const QUOTE = /['"`]/;

/** Replace every em dash: number ranges become en dashes, bullets become hyphens, paired asides become commas, a short lead-in becomes a colon. */
export function replaceDashes(text) {
  return text.split('\n').map(line => {
    if (!line.includes(DASH)) return line;
    return line
      .replace(/(\d)\s*\u2014\s*(\d)/g, '$1\u2013$2')
      .replace(/(^|['"`>])\u2014\s+(?=\S)/g, '$1- ')
      .replace(/\s\u2014\s([^\u2014'"`]+?)\s\u2014\s/g, ', $1, ')
      .replace(/(^|['"`])([^\s\u2014'"`:;,.!?]+(?:\s+[^\s\u2014'"`:;,.!?]+){0,3})\s\u2014\s(?![^\u2014'"`]*:)/g, '$1$2: ')
      .replace(/([,:][^\u2014'"`.!?;]*)\s\u2014\s/g, '$1; ')
      .replace(/\s*\u2014\s*/g, ', ')
      .replace(/,\s*,/g, ',').replace(/ +,/g, ',');
  }).join('\n');
}

function files(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...files(full));
    else if (/\.(js|mjs|json|html)$/.test(entry.name)) out.push(full);
  }
  return out;
}
const count = file => (fs.readFileSync(file, 'utf8').match(new RegExp(DASH, 'g')) || []).length;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [mode = 'scan', target = 'public/js/scenarios'] = process.argv.slice(2);
  const limit = Number(process.argv[process.argv.indexOf('--files') + 1]) || 3;
  const dir = path.resolve(ROOT, target);
  const rows = files(dir).map(file => ({ file, n: count(file) })).filter(r => r.n);
  const remaining = rows.reduce((sum, r) => sum + r.n, 0);
  if (mode === 'scan') {
    for (const r of rows.sort((a, b) => a.n - b.n).slice(0, 20)) console.log(r.n, path.relative(ROOT, r.file));
    console.log('remaining', remaining, 'files', rows.length);
  } else {
    const batch = rows.sort((a, b) => a.n - b.n).slice(0, limit);
    let replaced = 0;
    for (const { file, n } of batch) {
      const before = fs.readFileSync(file, 'utf8'), after = replaceDashes(before);
      replaced += n;
      const lines = before.split('\n'), changed = lines.map((line, i) => [line, after.split('\n')[i]]).filter(([a, b]) => a !== b);
      console.log(`${path.relative(ROOT, file)}: ${n} dashes`);
      for (const [a, b] of changed.filter((_, i) => i % Math.max(1, Math.floor(changed.length / 8)) === 0).slice(0, 8)) console.log(`  - ${a.trim().slice(0, 140)}\n  + ${b.trim().slice(0, 140)}`);
      if (mode === 'apply') fs.writeFileSync(file, after);
    }
    console.log(mode === 'apply' ? 'applied' : 'dry run', 'replaced', replaced, 'remaining', remaining - (mode === 'apply' ? replaced : 0));
  }
}
