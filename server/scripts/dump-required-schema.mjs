// Regenerates server/db-required-schema.json from a database booted in legacy mode with the current code:
//   DATABASE_URL=<scratch db after `node server/index.js` booted once> node server/scripts/dump-required-schema.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { aiBoardOwnedTables } from '../db-existing-schema.js';
import { REQUESTS_ALLOW } from '../ai-board/db/additive.js';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL required');
const out = fileURLToPath(new URL('../db-required-schema.json', import.meta.url));
const client = new pg.Client({ connectionString: url });
await client.connect();
const { rows } = await client.query(`SELECT table_name AS t, column_name AS c FROM information_schema.columns
  WHERE table_schema = current_schema() ORDER BY table_name, ordinal_position`);
await client.end();
const skip = aiBoardOwnedTables();
const tables = {};
for (const { t, c } of rows) {
  if (skip.has(t) || (t === 'requests' && REQUESTS_ALLOW.columns.includes(c))) continue;
  (tables[t] ??= []).push(c);
}
const sorted = Object.fromEntries(Object.entries(tables).sort(([a], [b]) => (a < b ? -1 : 1)));
fs.writeFileSync(out, `${JSON.stringify({ tables: sorted }, null, 1)}\n`);
console.log(`${Object.keys(sorted).length} tables, ${Object.values(sorted).reduce((n, c) => n + c.length, 0)} columns -> ${out}`);
