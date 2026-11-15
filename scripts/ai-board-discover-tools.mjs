// Sync server manifest validator facts from the harness registry. `--check` exits 1 on drift.
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const harness = new URL('ai-board/harness/', root);
const OUT = new URL('server/ai-board/repositories/tool-manifest-schema.json', root);
const check = process.argv.includes('--check');

const manifest = JSON.parse(readFileSync(new URL('runtime/tool_manifest.json', harness), 'utf8'));
const py = spawnSync(process.env.PYTHON || 'python', ['-m', 'runtime.tool_manifest', '--dump'], { cwd: harness, encoding: 'utf8' });
const dump = py.status === 0 ? JSON.parse(py.stdout) : null;
const current = (() => { try { return JSON.parse(readFileSync(OUT, 'utf8')); } catch { return null; } })();

if (!dump) {
  // ponytail: without python only manifest names are compared; CI with python covers IMPLEMENTED.
  if (!check) { console.error(`python dump failed:\n${py.stderr || py.error}`); process.exit(2); }
  console.warn('python unavailable: checking manifest names only');
  const missing = manifest.tools.map((t) => t.name).filter((n) => !current?.tools.includes(n));
  if (missing.length) { console.error(`server schema lacks: ${missing.join(', ')}; run npm run ai-board:discover-tools`); process.exit(1); }
  process.exit(0);
}

const next = { effects: dump.effects, fields: dump.fields, optional: dump.optional, tools: dump.implemented };
const text = `${JSON.stringify(next, null, 2)}\n`;
if (check) {
  if (readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') !== text) {
    console.error('server tool-manifest-schema.json differs from harness; run npm run ai-board:discover-tools');
    process.exit(1);
  }
} else {
  writeFileSync(OUT, text);
  console.log(`wrote ${OUT.pathname}: ${next.tools.length} tools`);
}
