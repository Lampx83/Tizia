import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createBoardSchema } from './support/ai-board-db.js';
const execute = promisify(execFile);
const script = fileURLToPath(new URL('../scripts/reset-requests.cjs', import.meta.url));
const baseSql = fs.readFileSync(new URL('./support/ai-board-base.sql', import.meta.url), 'utf8');
async function snapshot(d) {
  const tables = await d.all(`SELECT table_name AS name FROM information_schema.tables WHERE table_schema=current_schema() AND table_type='BASE TABLE' ORDER BY table_name`);
  const out = {};
  for (const { name } of tables) out[name] = (await d.all(`SELECT * FROM "${name}"`)).sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  return out;
}
for (const modern of [false,true]) test(`PostgreSQL reset (${modern ? 'board' : 'legacy'} schema): dry-run, preserve, repeat, rollback`, async () => {
  const app = await createBoardSchema({ migrate:modern });
  const d = app.d;
  const run = (...args) => execute(process.execPath,[script,app.url,...args]);
  try {
    if (!modern) await d.exec(baseSql);
    await d.exec(`CREATE TABLE user_wallets(user_id BIGINT REFERENCES users(id), coins BIGINT);
      CREATE TABLE curriculum(id BIGINT PRIMARY KEY,title TEXT);
      CREATE TABLE notifications(id BIGINT PRIMARY KEY,request_id BIGINT,title TEXT);
      CREATE TABLE skill_proposals(id BIGINT PRIMARY KEY,request_id BIGINT);
      CREATE TABLE gate_trace(id BIGINT PRIMARY KEY,skill_proposal_id BIGINT);
      INSERT INTO users(id,username,display_name) VALUES(1,'reset-fixture','Fixture');
      INSERT INTO user_wallets VALUES(1,100); INSERT INTO curriculum VALUES(1,'Keep');
      INSERT INTO requests(id,domain,title,created_at,updated_at) VALUES(7,'it','Delete',1,1);
      INSERT INTO request_messages(request_id,role,body,created_at) VALUES(7,'student','Delete',1);
      INSERT INTO notifications VALUES(1,7,'Delete'),(2,NULL,'Keep');
      INSERT INTO skill_proposals VALUES(1,7); INSERT INTO gate_trace VALUES(1,1);`);
    if (modern) await d.exec(`INSERT INTO ai_board_profile VALUES(1,'student','[]','beginner',1);
      INSERT INTO ai_self_improve_state VALUES(1,1,1,1,1,1);
      INSERT INTO ai_transient_retry_state VALUES(1,0,1,1);
      INSERT INTO ai_tickets(id,source_request_id,kind,title,status,phase,created_at,updated_at) VALUES(1,7,'root','Root','queued','intake',1,1);
      INSERT INTO ai_runs(id,ticket_id,attempt,trigger,idempotency_key,created_at,updated_at) VALUES(1,1,1,'test','test',1,1);
      INSERT INTO ai_plans(root_ticket_id,revision,plan_hash,capability_policy_hash,plan_json,status,tier,created_at) VALUES(1,1,'hash','hash','{}','valid','small',1);
      INSERT INTO ai_authorizations VALUES(1,'hash',1,1,1);`);
    const before = await snapshot(d);
    assert.match((await run()).stdout,/Dry run/); assert.deepEqual(await snapshot(d),before);
    await run('--yes'); const after = await snapshot(d);
    for (const t of ['users','user_wallets','curriculum','schema_migrations','ai_board_profile','ai_transient_retry_state']) if (before[t]) assert.deepEqual(after[t],before[t],t);
    for (const [t,rows] of Object.entries(after)) if ((t.startsWith('ai_') && !['ai_board_profile','ai_self_improve_state','ai_transient_retry_state'].includes(t)) || ['requests','request_messages','skill_proposals','gate_trace'].includes(t)) assert.deepEqual(rows,[],t);
    assert.deepEqual(after.notifications,[{id:2,request_id:null,title:'Keep'}]);
    if (modern) assert.deepEqual(after.ai_self_improve_state,before.ai_self_improve_state.map(r => ({...r,frozen_at:null})));
    assert.equal(await d.insert(`INSERT INTO requests(domain,title,created_at,updated_at) VALUES('it','New',2,2)`),1);
    await run('--yes');
    await d.exec(`INSERT INTO requests(id,domain,title,created_at,updated_at) VALUES(7,'it','Keep on failure',3,3); CREATE TABLE protected_link(request_id BIGINT REFERENCES requests(id)); INSERT INTO protected_link VALUES(7);`);
    const protectedState = await snapshot(d); await assert.rejects(run('--yes'),e => /reset rolled back/.test(e.stderr)); assert.deepEqual(await snapshot(d),protectedState);
  } finally { await app.dispose(); }
});
test('reset refuses to run without a PostgreSQL target',async () => {
  await assert.rejects(execute(process.execPath,[script], { env: {} }),e => /DATABASE_URL/.test(e.stderr));
});
