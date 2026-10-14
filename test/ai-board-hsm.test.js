import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { attachAiBoardWorkerRoutes, attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';
import { CAPABILITY_CATALOG } from '../server/ai-board/security/policy.js';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { renderHsm } from '../public/js/ai-board-hsm.js';

const KEY='hsm-disposable-fixture-worker-key-32';
test('Gate4 records a granted action receipt at the budget limit but refuses another action',async()=>{
  const f=await fixture();
  try {
    const input={run_id:f.run,contract_hash:(await f.post('snapshot',{})).body.hsm_contract.hash,attempt:0,event:'BEGIN',expected_version:0,idempotency_key:'budget-receipt-begin'};
    assert.equal((await f.post('hsm',input)).status,200);
    await f.db.run('UPDATE ai_tickets SET cumulative_budget=budget_limit WHERE id=?',[f.id]);
    assert.equal((await f.post('hsm',{...input,event:'PASSED',expected_version:1,idempotency_key:'budget-receipt-pass',result:{gate:4,blocked:false}})).status,200);
    assert.equal((await f.post('hsm',{...input,attempt:1,idempotency_key:'budget-receipt-next'})).status,409);
  } finally {await f.close();}
});
test('live action guard rechecks owner scope without advancing the Gate4 state',async()=>{
  const f=await fixture();
  try {
    await f.db.run('UPDATE ai_plans SET capability_policy_hash=? WHERE root_ticket_id=?',[CAPABILITY_CATALOG.hash,f.id]);
    const input={run_id:f.run,contract_hash:(await f.post('snapshot',{})).body.hsm_contract.hash,action:'edit_file'};
    const first=await f.post('hsm/authority',input);
    assert.equal(first.status,200);assert.equal(first.body.authorized,true);
    await f.db.run("UPDATE users SET enrolled_domain='other' WHERE id=1");
    const revoked=await f.post('hsm/authority',input);
    assert.equal(revoked.status,403);
    assert.equal((await f.trace()).hsm.states.length,0);
  } finally {await f.close();}
});

test('live action guard refuses stale plans, exhausted parent budgets and old leases',async()=>{
  const f=await fixture();
  try {
    await f.db.run('UPDATE ai_plans SET capability_policy_hash=? WHERE root_ticket_id=?',[CAPABILITY_CATALOG.hash,f.id]);
    const input={run_id:f.run,contract_hash:(await f.post('snapshot',{})).body.hsm_contract.hash,action:'model'};
    assert.equal((await f.post('hsm/authority',input)).status,200);
    await f.db.run("UPDATE ai_runs SET plan_hash='old-plan' WHERE id=?",[f.run]);
    assert.equal((await f.post('hsm/authority',input)).status,409);
    await f.db.run("UPDATE ai_runs SET plan_hash='plan-a' WHERE id=?",[f.run]);
    await f.db.run('UPDATE ai_tickets SET cumulative_budget=budget_limit WHERE id=?',[f.id]);
    assert.equal((await f.post('hsm/authority',input)).status,409);
    assert.equal((await f.post('hsm',{...input,attempt:0,event:'BEGIN',expected_version:0,idempotency_key:'live-guard-budget-begin'})).status,409);
    await f.db.run("UPDATE ai_tickets SET cumulative_budget=0,lease_token='new-lease',lease_owner='worker-b' WHERE id=?",[f.id]);
    assert.equal((await f.post('hsm/authority',input)).status,409);
  } finally {await f.close();}
});

test('live action guard stops an approved folder immediately after its approval is revoked',async()=>{
  const f=await fixture();
  try {
    const now=Date.now();
    const folder=await f.db.insert("INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,approved_at,created_at,updated_at,last_activity_at) VALUES ('live-guard-folder','Guard folder',1,'pharmacy','active',?,?,?,?)",[now,now,now,now]);
    await f.db.run('UPDATE requests SET folder_id=? WHERE id=(SELECT source_request_id FROM ai_tickets WHERE id=?)',[folder,f.id]);
    await f.db.run('UPDATE ai_plans SET capability_policy_hash=? WHERE root_ticket_id=?',[CAPABILITY_CATALOG.hash,f.id]);
    const input={run_id:f.run,contract_hash:(await f.post('snapshot',{})).body.hsm_contract.hash,action:'write_candidate'};
    assert.equal((await f.post('hsm/authority',input)).status,200);
    await f.store.revokeFolder(folder);
    assert.equal((await f.post('hsm/authority',input)).status,403);
  } finally {await f.close();}
});
async function fixture() {
  const appDb=await openBoard({users:[[1,'lan','Lan','student','pharmacy']]});
  const db=appDb.d,store=createAsyncAiBoardStore(db);
  const request=await store.createRequestWithRoot({ownerUserId:1,ownerDomain:'pharmacy',ownerDisplayName:'Lan',idempotencyKey:'hsm-fixture-request',title:'Fixture gate',detail:'Fixture gate 4'});
  const id=request.root_ticket_id,now=Date.now();
  await db.run("UPDATE ai_tickets SET status='running',phase='executing',lease_mode='active',lease_owner='worker-a',lease_token='lease-a',lease_expires_at=?,plan_hash='plan-a',plan_revision=1 WHERE id=?",[now+3600000,id]);
  const run=await db.insert("INSERT INTO ai_runs(ticket_id,attempt,trigger,worker_id,idempotency_key,outcome,plan_hash,plan_revision,created_at,updated_at) VALUES (?,1,'execute','worker-a','hsm-run',NULL,'plan-a',1,?,?)",[id,now,now]);
  await db.insert("INSERT INTO ai_plans(root_ticket_id,revision,plan_hash,plan_json,status,tier,capability_policy_hash,created_at) VALUES (?,1,'plan-a','{}','valid','surface',?,?)",[id,CAPABILITY_CATALOG.hash,now]);
  const app=express();app.use(express.json());attachAiBoardWorkerRoutes(app,{store,env:{AI_BOARD_WORKER_KEY:KEY}});
  const auth=(req,res,next)=>req.headers['x-test-admin']==='yes'?next():res.status(403).json({error:'forbidden'});
  attachAiBoardRequestRoutes(app,{store,requireAuth:auth,requireAdmin:auth,requireEnrolled:auth,requireStrictCsrf:auth});
  const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  const post=async(suffix,body)=>{const res=await fetch(`${base}/api/ai-board/worker/tickets/${id}/${suffix}`,{method:'POST',headers:{'content-type':'application/json','x-ai-worker-key':KEY},body:JSON.stringify({worker_id:'worker-a',lease_token:'lease-a',...body})});return {status:res.status,body:await res.json()};};
  const trace=async()=>{const res=await fetch(`${base}/api/admin/ai-board/requests/${request.request_id}/trace`,{headers:{'x-test-admin':'yes'}});assert.equal(res.status,200);return res.json();};
  return {db,store,id,run,base,post,trace,close:async()=>{await new Promise(resolve=>server.close(resolve));await appDb.dispose();}};
}

test('Gate4 and live actions share current plan eligibility and preserve rejection audits',async()=>{
  for (const sql of [
    "UPDATE ai_plans SET revision=2 WHERE root_ticket_id=?",
    "UPDATE ai_plans SET capability_policy_hash='stale-policy' WHERE root_ticket_id=?",
    "UPDATE ai_plans SET tier='core' WHERE root_ticket_id=?",
    "UPDATE ai_plans SET tier='protected' WHERE root_ticket_id=?",
    "UPDATE ai_tickets SET lease_mode='observe' WHERE id=?",
    "UPDATE ai_tickets SET phase='ticketized' WHERE id=?",
  ]) {
    const f=await fixture();
    try {
      const input={run_id:f.run,contract_hash:(await f.post('snapshot',{})).body.hsm_contract.hash,action:'model'};
      await f.db.run(sql,[f.id]);
      const action=await f.post('hsm/authority',input);
      assert.equal(action.status,409,sql);assert.equal(action.body.error,'action_not_authorized',sql);
      const transition=await f.post('hsm',{...input,attempt:0,event:'BEGIN',expected_version:0,idempotency_key:'eligibility-begin'});
      assert.equal(transition.status,409,sql);assert.equal(transition.body.error,'hsm_plan_not_executing',sql);
      const trace=await f.trace();
      assert.equal(trace.hsm.states.length,0,sql);
      assert.deepEqual(trace.hsm.events.map(e=>e.reason),['hsm_plan_not_executing'],sql);
    } finally {await f.close();}
  }
});

test('Gate4 contract grants one action, persists actual state and audits illegal/conflicting events',async()=>{
  const f=await fixture();
  try {
    const snapshot=await f.post('snapshot',{});
    const hash=snapshot.body.hsm_contract.hash;
    const event={run_id:f.run,attempt:0,contract_hash:hash,event:'BEGIN',expected_version:0,idempotency_key:'hsm-begin-000'};
    const begun=await f.post('hsm',event);
    assert.equal(begun.status,200);assert.equal(begun.body.execute,true);
    assert.deepEqual(begun.body.state.path,['EXECUTION','Gate4','Running']);
    const duplicate=await f.post('hsm',event);assert.equal(duplicate.status,200);assert.equal(duplicate.body.execute,false);
    const conflict=await f.post('hsm',{...event,event:'PASSED',result:{gate:4,blocked:false}});assert.equal(conflict.status,409);assert.equal(conflict.body.error,'hsm_identity_conflict');
    const invalid=await f.post('hsm',{...event,event:'BEGIN',idempotency_key:'hsm-other-begin',expected_version:1});assert.equal(invalid.status,409);assert.equal(invalid.body.error,'hsm_illegal_transition');
    const passed={...event,event:'PASSED',expected_version:1,idempotency_key:'hsm-passed-000',result:{gate:4,blocked:false,issues:[]}};
    assert.deepEqual((await f.post('hsm',passed)).body.state.path,['EXECUTION','Gate4','Passed']);
    assert.equal((await f.post('hsm',passed)).body.duplicate,true);
    const state=await f.post('hsm/state',{run_id:f.run});
    assert.equal(state.body.states[0].version,2);
    assert.equal(state.body.events.filter(e=>e.accepted).length,2);
    assert.ok(state.body.events.some(e=>e.reason==='hsm_illegal_transition'));
    assert.match(state.body.diagram,/Running --> Passed : PASSED/);
    const trace=await f.trace();
    assert.deepEqual(trace.hsm.states[0].path,['EXECUTION','Gate4','Passed']);
    assert.match(renderHsm(trace.hsm),/EXECUTION → Gate4 → Passed/);
    assert.match(renderHsm(trace.hsm),/fill="#17683d"/);
    await f.db.run("UPDATE users SET enrolled_domain='other' WHERE id=1");
    assert.equal((await f.post('hsm',{...event,attempt:1,idempotency_key:'hsm-revoked'})).status,403);
    assert.equal((await f.post('hsm/state',{run_id:f.run})).status,403);
  } finally {await f.close();}
});

test('old-plan and terminal runs cannot begin Gate4 with a current worker lease',async()=>{
  const f=await fixture();
  try {
    const contract=(await f.post('snapshot',{})).body.hsm_contract;
    const event={run_id:f.run,attempt:0,contract_hash:contract.hash,event:'BEGIN',expected_version:0,idempotency_key:'hsm-stale-plan'};
    await f.db.run("UPDATE ai_runs SET plan_hash='old-plan' WHERE id=?",[f.run]);
    assert.equal((await f.post('hsm',event)).status,409);
    await f.db.run("UPDATE ai_runs SET plan_hash='plan-a',outcome='blocked' WHERE id=?",[f.run]);
    assert.equal((await f.post('hsm',{...event,idempotency_key:'hsm-terminal-run'})).status,409);
    const trace=await f.trace();
    assert.equal(trace.hsm.states.length,0);
    assert.deepEqual(trace.hsm.events.map(e=>e.reason),['hsm_run_plan_mismatch','hsm_run_inactive']);
  } finally {await f.close();}
});

test('actual Python HttpWorker completes deterministic Gate4 through real HTTP and PostgreSQL',async()=>{
  const f=await fixture();
  try {
    const plan={domain:'pharmacy',goal:'Syntax fixture',capabilities:['public.ui'],allowed_scope:['public/pharmacy/demo.js'],
      steps:[{order:1,title:'Syntax fixture',capability:'public.ui',allowed_scope:['public/pharmacy/demo.js'],tests:['node --check'],acceptance:['valid syntax'],risk:'low'}]};
    await f.db.run("UPDATE ai_plans SET plan_json=?,capability_policy_hash=? WHERE root_ticket_id=?",[JSON.stringify(plan),CAPABILITY_CATALOG.hash,f.id]);
    await f.db.run("UPDATE ai_runs SET plan_hash='plan-a',plan_revision=1 WHERE id=?",[f.run]);
    for(const gate of [1,2,2.5]) await f.db.insert("INSERT INTO ai_gate_traces(run_id,gate,status,created_at) VALUES (?,?,'passed',?)",[f.run,gate,Date.now()]);
    await f.db.run("UPDATE ai_tickets SET status='queued',phase='authorized',plan_revision=1,lease_owner=NULL,lease_token=NULL,lease_expires_at=NULL WHERE id=?",[f.id]);
    const python=process['env'].TEST_PYTHON || path.resolve('ai-board/harness/.venv/Scripts/python.exe');
    const child=await promisify(execFile)(python,[path.resolve('test/support/hsm-worker-probe.py'),f.base,KEY],{cwd:process.cwd(),timeout:60000,maxBuffer:1000000});
    const out=JSON.parse(child.stdout.trim().split('\n').at(-1));
    assert.equal(out.gate4_calls,1);assert.equal(out.worker.pre_pr_verdict.gates.find(g=>g.gate===4).blocked,false);
    const trace=await f.trace();
    const runId=out.worker.run_id;
    const snapshot=trace.hsm.states.find(s=>s.run_id===runId);
    assert.equal(snapshot.state,'Passed');assert.equal(snapshot.version,2);
    assert.equal(trace.runs.find(r=>r.id===runId).gates.find(g=>g.gate===4).status,'passed');
  } finally {await f.close();}
});
