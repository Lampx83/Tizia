#!/usr/bin/env node
// Read-only export of AI Board admin skills to a JSON bundle. Usage: node scripts/ai-board-skills-export.mjs --out <file.json>
// Connection: AI_BOARD_DATABASE_URL (never printed).
import fs from 'node:fs';
import pg from 'pg';
import { exportSkillBundle } from '../server/ai-board/services/skills-bundle.js';

const flag = process.argv.indexOf('--out');
const out = flag > 0 ? process.argv[flag + 1] : null;
if (!out) {
  console.error('Usage: node scripts/ai-board-skills-export.mjs --out <file.json>');
  process.exit(2);
}
const url = process.env.AI_BOARD_DATABASE_URL;
if (!url) {
  console.error('AI_BOARD_DATABASE_URL is required');
  process.exit(2);
}

const client = new pg.Client({ connectionString: url });
try {
  await client.connect();
  await client.query('BEGIN READ ONLY');
  const bundle = await exportSkillBundle(async sql => (await client.query(sql)).rows);
  await client.query('COMMIT');
  fs.writeFileSync(out, `${JSON.stringify(bundle, null, 2)}\n`, { mode: 0o600 });
  const versions = bundle.skills.reduce((n, s) => n + s.versions.length, 0);
  console.log(`Exported ${bundle.skills.length} skills, ${versions} versions -> ${out}`);
} catch (error) {
  await client.query('ROLLBACK').catch(() => {});
  console.error(`Export failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
