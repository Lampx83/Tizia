// Operator CLI: additive-only AI Board migration for an existing production PostgreSQL.
//   plan                       offline: new-table set, allowlisted touches, FK targets (no DB)
//   preflight                  read-only checks (BEGIN READ ONLY ... ROLLBACK); exit 1 on any FAIL
//   apply [--grant-to ROLE] [--commit]     one transaction; rolls back unless --commit
//   rollback [--commit] [--allow-data-loss] [--drop-schema-migrations]   same, drops exactly the new objects
// DATABASE_URL selects the target. Extra: --migrations-dir DIR, --lock-timeout 5s, --statement-timeout 120s.
import pg from 'pg';
import { analyzeMigrations, applyAdditive, preflight, rollbackAdditive } from '../ai-board/db/additive.js';

const [cmd, ...rest] = process.argv.slice(2);
const flag = (n) => rest.includes(`--${n}`);
const opt = (n) => { const i = rest.indexOf(`--${n}`); return i >= 0 ? rest[i + 1] : undefined; };
const dir = opt('migrations-dir');
const common = { dir, lockTimeout: opt('lock-timeout') ?? '5s', statementTimeout: opt('statement-timeout') ?? '120s', commit: flag('commit') };

const analysis = analyzeMigrations({ dir });
if (cmd === 'plan') {
  const { files, ...summary } = analysis;
  console.log(JSON.stringify({ ...summary, statementsPerFile: Object.fromEntries(files.map((f) => [f.version, f.statements.length])) }, null, 2));
  process.exit(analysis.violations.length ? 1 : 0);
}
if (!['preflight', 'apply', 'rollback'].includes(cmd)) { console.error('usage: plan | preflight | apply | rollback'); process.exit(2); }
if (!process.env.DATABASE_URL) { console.error('DATABASE_URL required'); process.exit(2); }

const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
let code = 0;
try {
  if (cmd === 'preflight') {
    if (analysis.violations.length) { console.error(analysis.violations.join('\n')); process.exit(1); }
    await c.query('BEGIN READ ONLY');
    const r = await preflight(c, analysis);
    await c.query('ROLLBACK');
    for (const p of r.problems) console.log(`${p.level.padEnd(4)} ${p.check}: ${p.detail}`);
    console.log(r.ok ? `PREFLIGHT OK (state=${r.state})` : 'PREFLIGHT FAILED');
    code = r.ok ? 0 : 1;
  } else if (cmd === 'apply') {
    const r = await applyAdditive(c, { ...common, grantTo: opt('grant-to') });
    console.log(JSON.stringify(r));
    if (!r.committed && r.state !== 'applied') console.log('dry run: rolled back. Re-run with --commit to keep.');
  } else {
    const r = await rollbackAdditive(c, { ...common, allowDataLoss: flag('allow-data-loss'), dropSchemaMigrations: flag('drop-schema-migrations') });
    console.log(JSON.stringify(r));
    if (!r.committed) console.log('dry run: rolled back. Re-run with --commit to keep.');
  }
} catch (e) {
  console.error(`${cmd} failed: ${e.message}`);
  for (const p of e.problems ?? []) console.error(typeof p === 'string' ? `  ${p}` : `  ${p.level} ${p.check}: ${p.detail}`);
  code = 1;
} finally {
  await c.end();
}
process.exit(code);
