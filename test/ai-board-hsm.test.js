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
import fs from 'node:fs';
import { canonicalHash } from '../server/ai-board/repositories/tool-manifests.js';
import { VENV_PYTHON } from './support/harness-python.js';

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
    const input={run_id:f.run,contract_hash:(await f.post('snapshot',{})).body.hsm_contract.hash,action:'write_candidate'};
    const first=await f.post('hsm/authority',input);
    assert.equal(first.status,200);assert.equal(first.body.authorized,true);
    await f.db.run("UPDATE users SET enrolled_domain='other' WHERE id=1");
    const revoked=await f.post('hsm/authority',input);
    assert.equal(revoked.status,403);
    assert.equal((await f.trace()).hsm.states.length,0);
  } finally {await f.close();}
});

test('live action guard authorizes run_in_sandbox like other gate 3 actions without a tool manifest',async()=>{
  const f=await fixture();
  try {
    await f.db.run('UPDATE ai_plans SET capability_policy_hash=? WHERE root_ticket_id=?',[CAPABILITY_CATALOG.hash,f.id]);
    const input={run_id:f.run,contract_hash:(await f.post('snapshot',{})).body.hsm_contract.hash,action:'run_in_sandbox'};
    const granted=await f.post('hsm/authority',input);
    assert.equal(granted.status,200);assert.equal(granted.body.authorized,true);
    await f.db.run("UPDATE ai_runs SET outcome='ready_for_pr' WHERE id=?",[f.run]);
    assert.equal((await f.post('hsm/authority',input)).status,409);
  } finally {await f.close();}
});

test('Gate4 and the action guard accept a reverify run like plan and execute runs, and still refuse an unknown trigger',async()=>{
  const f=await fixture();
  try {
    await f.db.run('UPDATE ai_plans SET capability_policy_hash=? WHERE root_ticket_id=?',[CAPABILITY_CATALOG.hash,f.id]);
    const hash=(await f.post('snapshot',{})).body.hsm_contract.hash;
    const action={run_id:f.run,contract_hash:hash,action:'model'};
    const begin={run_id:f.run,contract_hash:hash,attempt:0,event:'BEGIN',expected_version:0,idempotency_key:'reverify-begin'};
    await f.db.run("UPDATE ai_runs SET trigger='reverify' WHERE id=?",[f.run]);
    assert.equal((await f.post('hsm/authority',action)).status,200);
    assert.equal((await f.post('hsm',begin)).status,200);
    await f.db.run("UPDATE ai_runs SET trigger='shadow_precheck' WHERE id=?",[f.run]);
    assert.equal((await f.post('hsm/authority',action)).status,409);
    assert.equal((await f.post('hsm',{...begin,attempt:1,idempotency_key:'reverify-begin-2'})).status,409);
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
    assert.equal((await f.post('hsm/authority',input)).status,409); // revoke releases the live lease, so the old lease is stale
  } finally {await f.close();}
});
test('revoking an approved folder releases the live lease so the worker stops at its next heartbeat',async()=>{
  const f=await fixture();
  try {
    const now=Date.now();
    const folder=await f.db.insert("INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,approved_at,created_at,updated_at,last_activity_at) VALUES ('revoke-stop-folder','Revoke folder',1,'pharmacy','active',?,?,?,?)",[now,now,now,now]);
    await f.db.run('UPDATE requests SET folder_id=? WHERE id=(SELECT source_request_id FROM ai_tickets WHERE id=?)',[folder,f.id]);
    assert.equal((await f.post('heartbeat',{})).status,200);
    const revoked=await f.store.revokeFolder(folder);
    assert.equal(revoked.stopped,1);
    assert.equal((await f.post('heartbeat',{})).status,409);
    const root=await f.db.get('SELECT status,phase,lease_owner,lease_token,internal_reason FROM ai_tickets WHERE id=?',[f.id]);
    assert.deepEqual({...root},{status:'waiting_authorization',phase:'ticketized',lease_owner:null,lease_token:null,internal_reason:'folder_not_approved'});
    assert.equal((await f.db.get("SELECT COUNT(*) n FROM ai_events WHERE ticket_id=? AND event_type='folder_revoked'",[f.id])).n,1);
    assert.equal((await f.store.revokeFolder(folder)).stopped,0);
  } finally {await f.close();}
});
test('revoke also stops a worker that runs the approved plan under its planning lease (status stays planned)',async()=>{
  const f=await fixture();
  try {
    const now=Date.now();
    const folder=await f.db.insert("INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,approved_at,created_at,updated_at,last_activity_at) VALUES ('revoke-planned-folder','Revoke planned',1,'pharmacy','active',?,?,?,?)",[now,now,now,now]);
    await f.db.run('UPDATE requests SET folder_id=? WHERE id=(SELECT source_request_id FROM ai_tickets WHERE id=?)',[folder,f.id]);
    await f.db.run("UPDATE ai_tickets SET status='planned',phase='ticketized' WHERE id=?",[f.id]);
    assert.equal((await f.post('heartbeat',{})).status,200);
    assert.equal((await f.store.revokeFolder(folder)).stopped,1);
    assert.equal((await f.post('heartbeat',{})).status,409);
    assert.equal((await f.db.get('SELECT status FROM ai_tickets WHERE id=?',[f.id])).status,'waiting_authorization');
  } finally {await f.close();}
});
test('revoke holds a not-yet-started planned root that has no lease',async()=>{
  const f=await fixture();
  try {
    const now=Date.now();
    const folder=await f.db.insert("INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,approved_at,created_at,updated_at,last_activity_at) VALUES ('revoke-idle-folder','Revoke idle',1,'pharmacy','active',?,?,?,?)",[now,now,now,now]);
    await f.db.run('UPDATE requests SET folder_id=? WHERE id=(SELECT source_request_id FROM ai_tickets WHERE id=?)',[folder,f.id]);
    await f.db.run("UPDATE ai_tickets SET status='planned',phase='ticketized',lease_owner=NULL,lease_token=NULL,lease_expires_at=NULL WHERE id=?",[f.id]);
    assert.equal((await f.store.revokeFolder(folder)).stopped,1);
    assert.equal((await f.db.get('SELECT status FROM ai_tickets WHERE id=?',[f.id])).status,'waiting_authorization');
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
  const auth=(req,res,next)=>{if(req.headers['x-test-admin']!=='yes')return res.status(403).json({error:'forbidden'});req.user={id:1};next();};
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
    const python=process['env'].TEST_PYTHON || VENV_PYTHON;
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

const probe=async(f,phase)=>{
  const python=process['env'].TEST_PYTHON || VENV_PYTHON;
  const child=await promisify(execFile)(python,[path.resolve('test/support/checkpoint-failover-probe.py'),f.base,KEY,String(f.id),phase],{cwd:process.cwd(),timeout:60000,maxBuffer:1000000});
  return JSON.parse(child.stdout.trim().split('\n').at(-1));
};

test('checkpoint API is lease-fenced, scope-bound and detects a corrupted stored result',async()=>{
  const f=await fixture();
  try {
    const scope=`ticket-${f.id}:p`,id='a'.repeat(32);
    const call=(op,body,lease={})=>f.post(`checkpoint/${op}`,{proposal_id:'77',child:0,...body,...lease});
    assert.deepEqual((await call('load',{})).body,{pins:null,ledger:null,steps:[]});
    assert.equal((await call('pins',{pins:{a:1},run_scope:'ticket-999:x'})).body.error,'scope_mismatch');
    assert.equal((await call('pins',{pins:{a:1},run_scope:scope})).status,200);
    assert.equal((await call('intent',{step:0,tool:'edit_file',args:{x:1},identity:id})).status,200);
    assert.equal((await call('intent',{step:0,tool:'edit_file',args:{x:1},identity:id})).body.error,'step_conflict');
    assert.equal((await call('intent',{step:1,tool:'finish',args:{},identity:'bad'})).body.error,'invalid_identity');
    assert.equal((await call('done',{step:0,tool:'edit_file',args:{x:1},identity:id,observation:'ok',kind:'ok'})).status,200);
    assert.equal((await call('load',{})).body.steps[0].digest_ok,true);
    await f.db.run("UPDATE tool_step SET observation='tampered' WHERE proposal_id=77");
    assert.equal((await call('load',{})).body.steps[0].digest_ok,false);
    await f.db.run("UPDATE tool_run SET run_scope='ticket-999:x' WHERE proposal_id=77");
    assert.equal((await call('load',{})).body.error,'scope_mismatch');
    await f.db.run("UPDATE tool_run SET run_scope=? WHERE proposal_id=77",[scope]);
    await call('intent',{step:1,tool:'edit_file',args:{y:2},identity:'b'.repeat(32)});
    await call('purge',{proposal_ids:['77']});
    assert.equal((await call('load',{})).body.steps.length,2,'open intent is never purged');
    await call('mark',{step:1,status:'void'});
    await call('purge',{proposal_ids:['77']});
    assert.deepEqual((await call('load',{})).body,{pins:null,ledger:null,steps:[]});
    assert.equal((await call('load',{},{lease_token:'wrong'})).body.error,'stale_lease');
  } finally {await f.close();}
});

test('worker A crashes mid-loop; worker B with a new lease resumes from the server checkpoint without double writes',async()=>{
  const f=await fixture();
  try {
    assert.deepEqual(await probe(f,'a'),{crashed:true});
    await f.db.run("UPDATE ai_tickets SET lease_owner='worker-b',lease_token='lease-b' WHERE id=?",[f.id]);
    const b=await probe(f,'b');
    assert.deepEqual([b.status,b.steps,b.edits,b.model_calls,b.prompts],['proposed',['edit_file','write_test','finish'],1,4,2]);
    assert.deepEqual(await probe(f,'stale'),{rejected:409,error:'stale_lease'});
  } finally {await f.close();}
});

test('a lease lost mid-execution is rescued by an active worker as the same plan, not replanned',async()=>{
  const f=await fixture();
  try {
    await f.db.run("UPDATE ai_tickets SET status='planned',phase='ticketized',lease_expires_at=1 WHERE id=?",[f.id]);
    const shadow=await f.store.claimNext({workerId:'worker-s',mode:'shadow',intent:'plan'});
    assert.equal(shadow?.trigger==='execute',false,'a shadow worker never continues an approved plan');
    await f.db.run("UPDATE ai_tickets SET status='planned',phase='ticketized',lease_owner='worker-a',lease_token='lease-a',lease_expires_at=1 WHERE id=?",[f.id]);
    const claim=await f.store.claimNext({workerId:'worker-b',mode:'active',intent:'plan'});
    assert.equal(claim.id,f.id);assert.equal(claim.trigger,'execute');assert.equal(claim.phase,'executing');
    const row=await f.db.get('SELECT plan_hash,lease_owner FROM ai_tickets WHERE id=?',[f.id]);
    assert.equal(row.lease_owner,'worker-b');assert.equal(row.plan_hash,'plan-a');
  } finally {await f.close();}
});

const PINS={candidate:'c'.repeat(32),plan:'plan-a',base:'abc',harness:'h1',prompt:'p1',tool:'t1',model:'m1',oracle:'o1'};
test('a gate proof is reused only while every pin matches, and the verifier explains each refusal',async()=>{
  const f=await fixture();
  try {
    const call=(op,body,lease={})=>f.post(`gate-proof/${op}`,{gate:4,pins:PINS,...body,...lease});
    const passed={gate:4,blocked:false,issues:[],_state:{ui_changed:true}};
    assert.deepEqual((await call('check',{})).body,{reuse:false,reason:'no_proof',drift:[]});
    assert.equal((await call('record',{result:{gate:4,blocked:true}})).body.error,'proof_requires_pass');
    assert.equal((await call('record',{gate:5,result:passed})).body.error,'gate_not_reusable');
    assert.equal((await call('record',{pins:{...PINS,model:''},result:passed})).body.error,'invalid_gate_proof');
    assert.equal((await call('record',{run_id:f.run,result:passed})).status,200);
    const hit=(await call('check',{})).body;
    assert.deepEqual([hit.reuse,hit.result.gate,hit.result._state.ui_changed,hit.proof_run_id],[true,4,true,f.run]);
    for (const key of Object.keys(PINS)) {
      const miss=(await call('check',{pins:{...PINS,[key]:key==='candidate'?'d'.repeat(32):'changed'}})).body;
      assert.deepEqual([miss.reuse,miss.reason,miss.drift],[false,'pin_drift',[key]],key);
    }
    await f.db.run("UPDATE ai_gate_proofs SET result_json='{\"gate\":4,\"blocked\":false,\"issues\":[\"forged\"]}' WHERE ticket_id=?",[f.id]);
    assert.equal((await call('check',{})).body.reason,'proof_corrupt');
    assert.equal((await call('check',{},{lease_token:'old'})).body.error,'stale_lease');
    const events=await f.db.all("SELECT event_type FROM ai_events WHERE ticket_id=? AND event_type LIKE 'gate_proof_%' ORDER BY id",[f.id]);
    assert.equal(events.filter(e=>e.event_type==='gate_proof_reused').length,1);
    assert.equal(events.filter(e=>e.event_type==='gate_proof_invalidated').length,Object.keys(PINS).length+1);
  } finally {await f.close();}
});

test('reset forgets a stale child steps and re-pins it but keeps the ledger',async()=>{
  const f=await fixture();
  try {
    const scope=`ticket-${f.id}:p`,id='a'.repeat(32);
    const call=(op,body)=>f.post(`checkpoint/${op}`,{proposal_id:'88',child:2,...body});
    await call('pins',{pins:{file:'old'},run_scope:scope});
    await call('ledger',{snapshot:{model_calls:4}});
    await call('intent',{step:0,tool:'edit_file',args:{x:1},identity:id});
    await call('done',{step:0,tool:'edit_file',args:{x:1},identity:id,observation:'ok',kind:'ok'});
    assert.equal((await call('reset',{pins:{file:'new'}})).status,200);
    const after=(await call('load',{})).body;
    assert.deepEqual([after.pins,after.ledger,after.steps],[{file:'new'},{model_calls:4},[]]);
    assert.equal((await f.post('checkpoint/reset',{proposal_id:'88',child:2,pins:{},lease_token:'old'})).body.error,'stale_lease');
  } finally {await f.close();}
});

test('purge by run scope also clears scopes another worker process created for the same run',async()=>{
  const f=await fixture();
  try {
    const scope=`ticket-${f.id}:p`;
    const pins=(id)=>f.post('checkpoint/pins',{proposal_id:id,child:0,pins:{a:1},run_scope:scope});
    await pins('91');await pins('92');
    await f.post('checkpoint/purge',{proposal_ids:['91'],run_scope:scope});
    const left=await f.db.all("SELECT 1 FROM tool_run WHERE run_scope=?",[scope]);
    assert.equal(left.length,0);
    assert.equal((await f.post('checkpoint/purge',{run_scope:'ticket-999:p'})).status,200,'a foreign scope is ignored, not an error');
  } finally {await f.close();}
});

test('the request trace carries the execution graph from the shared contract',async()=>{
  const f=await fixture();
  try {
    const {graph}=await f.trace();
    const contract=JSON.parse(fs.readFileSync(new URL('../server/ai-board/contract.json',import.meta.url),'utf8')).execution_graph;
    assert.deepEqual(graph.nodes,contract.nodes);assert.deepEqual(graph.edges,contract.edges);
    assert.match(graph.hash,/^[0-9a-f]{64}$/);assert.equal(graph.names['3'],'Sinh code');
  } finally {await f.close();}
});

const MANIFEST=JSON.parse(fs.readFileSync(new URL('../ai-board/harness/runtime/tool_manifest.json',import.meta.url),'utf8'));
const MANIFEST_HASH=canonicalHash(MANIFEST);
const adminDecide=(f,hash,action,admin=true)=>fetch(`${f.base}/api/admin/ai-board/tool-manifests/${hash}/${action}`,{method:'POST',headers:admin?{'x-test-admin':'yes'}:{}}).then(async r=>({status:r.status,body:await r.json()}));
const adminList=async f=>(await fetch(`${f.base}/api/admin/ai-board/tool-manifests`,{headers:{'x-test-admin':'yes'}})).json();

test('server hash of the real tool manifest equals the harness hash',async t=>{
  const python=VENV_PYTHON;
  if (!fs.existsSync(python)) return t.skip('harness venv missing');
  const {stdout}=await promisify(execFile)(python,['-c','import sys;sys.path.insert(0,".");from runtime import tool_loop;print(tool_loop.MANIFEST.hash)'],{cwd:path.resolve('ai-board/harness')});
  assert.equal(stdout.trim(),MANIFEST_HASH);
});

test('loop tools run only under an admin-approved manifest and revoke bites on the next action',async()=>{
  const f=await fixture();
  try {
    await f.db.run('UPDATE ai_plans SET capability_policy_hash=? WHERE root_ticket_id=?',[CAPABILITY_CATALOG.hash,f.id]);
    const base={run_id:f.run,contract_hash:(await f.post('snapshot',{})).body.hsm_contract.hash};
    const tool=(manifest)=>f.post('hsm/authority',{...base,action:'edit_file',...(manifest===undefined?{}:{tool_manifest:manifest})});
    assert.equal((await tool()).body.error,'tool_manifest_required');
    assert.equal((await tool(MANIFEST_HASH)).body.error,'tool_manifest_unknown');
    assert.equal((await f.post('hsm/authority',{...base,action:'model'})).status,200,'non-loop actions are unaffected');
    const reported=await f.post('tool-manifest',{manifest:MANIFEST});
    assert.deepEqual(reported.body,{manifest_hash:MANIFEST_HASH,status:'pending'});
    assert.equal((await f.post('tool-manifest',{manifest:MANIFEST})).body.status,'pending','re-report is a no-op');
    assert.equal((await tool(MANIFEST_HASH)).body.error,'tool_manifest_not_approved');
    assert.equal((await f.post('hsm/authority',{...base,action:'run_check',tool_manifest:MANIFEST_HASH})).body.error,'tool_manifest_not_approved');
    assert.equal((await f.post('hsm/authority',{...base,action:'model',tool_manifest:MANIFEST_HASH})).body.error,'tool_manifest_not_approved');
    assert.equal((await adminDecide(f,MANIFEST_HASH,'approve',false)).status,403);
    assert.equal((await adminDecide(f,MANIFEST_HASH,'revoke')).body.error,'tool_manifest_not_approved','pending cannot be revoked');
    const approved=await adminDecide(f,MANIFEST_HASH,'approve');
    assert.equal(approved.status,200);assert.equal(approved.body.status,'approved');
    assert.deepEqual(approved.body.tools.map(x=>x.name),MANIFEST.tools.map(x=>x.name));
    assert.equal((await tool(MANIFEST_HASH)).status,200);
    assert.equal((await f.post('hsm/authority',{...base,action:'run_check',tool_manifest:MANIFEST_HASH})).status,200);
    assert.equal((await f.post('hsm/authority',{...base,action:'model',tool_manifest:MANIFEST_HASH})).status,200);
    assert.equal((await adminDecide(f,MANIFEST_HASH,'revoke')).body.status,'revoked');
    assert.equal((await f.post('hsm/authority',{...base,action:'run_check',tool_manifest:MANIFEST_HASH})).body.error,'tool_manifest_not_approved');
    assert.equal((await tool(MANIFEST_HASH)).body.error,'tool_manifest_not_approved');
    assert.equal((await adminDecide(f,MANIFEST_HASH,'approve')).body.error,'tool_manifest_revoked');
    assert.equal((await adminDecide(f,'f'.repeat(64),'approve')).status,404);
    assert.equal((await adminDecide(f,'zz','approve')).status,400);
    const audit=(await f.db.all('SELECT action,actor FROM ai_tool_manifest_audit ORDER BY id')).map(x=>x.action);
    assert.deepEqual(audit,['reported','approved','revoked']);
  } finally {await f.close();}
});

test('changing a manifest creates a new pending version that needs its own approval',async()=>{
  const f=await fixture();
  try {
    await f.db.run('UPDATE ai_plans SET capability_policy_hash=? WHERE root_ticket_id=?',[CAPABILITY_CATALOG.hash,f.id]);
    const base={run_id:f.run,contract_hash:(await f.post('snapshot',{})).body.hsm_contract.hash};
    await f.post('tool-manifest',{manifest:MANIFEST});assert.equal((await adminDecide(f,MANIFEST_HASH,'approve')).status,200);
    const changed=structuredClone(MANIFEST);changed.tools[0].max_output_chars+=1;
    const next=await f.post('tool-manifest',{manifest:changed});
    assert.equal(next.body.status,'pending');assert.notEqual(next.body.manifest_hash,MANIFEST_HASH);
    assert.equal((await f.post('hsm/authority',{...base,action:'tree',tool_manifest:next.body.manifest_hash})).body.error,'tool_manifest_not_approved');
    assert.equal((await f.post('hsm/authority',{...base,action:'tree',tool_manifest:MANIFEST_HASH})).status,200);
    const listed=(await adminList(f)).manifests;
    assert.deepEqual(listed.map(x=>x.status).sort(),['approved','pending']);
    assert.ok(!JSON.stringify(listed).includes('"parameters"'),'list carries caps, not schemas');
  } finally {await f.close();}
});

test('malformed manifests and stale leases cannot register a version',async()=>{
  const f=await fixture();
  try {
    const bad=[{},{version:1,tools:[]},{...structuredClone(MANIFEST),extra:1},
      (m=>{m.tools[0].name='shell';return m;})(structuredClone(MANIFEST)),
      (m=>{m.tools[0].effect='network';return m;})(structuredClone(MANIFEST)),
      (m=>{m.tools[0].max_seconds=0;return m;})(structuredClone(MANIFEST)),
      (m=>{m.tools.push(structuredClone(m.tools[0]));return m;})(structuredClone(MANIFEST))];
    for (const manifest of bad) assert.equal((await f.post('tool-manifest',{manifest})).status,400,JSON.stringify(manifest).slice(0,60));
    assert.equal((await f.post('tool-manifest',{manifest:MANIFEST,lease_token:'old'})).status,409);
    assert.equal((await f.db.all('SELECT 1 FROM ai_tool_manifests')).length,0);
  } finally {await f.close();}
});

const seedPlanTraces=async f=>{
    const plan={domain:'pharmacy',goal:'Syntax fixture',capabilities:['public.ui'],allowed_scope:['public/pharmacy/demo.js'],
      steps:[{order:1,title:'Syntax fixture',capability:'public.ui',allowed_scope:['public/pharmacy/demo.js'],tests:['node --check'],acceptance:['valid syntax'],risk:'low'}]};
    await f.db.run("UPDATE ai_plans SET plan_json=?,capability_policy_hash=? WHERE root_ticket_id=?",[JSON.stringify(plan),CAPABILITY_CATALOG.hash,f.id]);
    await f.db.run("UPDATE ai_runs SET plan_hash='plan-a',plan_revision=1 WHERE id=?",[f.run]);
    for(const gate of [1,2,2.5]) await f.db.insert("INSERT INTO ai_gate_traces(run_id,gate,status,created_at) VALUES (?,?,'passed',?)",[f.run,gate,Date.now()]);
};

test('busy release puts the ticket back in the queue after a not-before delay without a verdict or blocked run',async()=>{
  const f=await fixture();
  try {
    await seedPlanTraces(f);
    const before=Date.now();
    const released=await f.post('release',{outcome:'busy',internal_detail:'sandbox runner busy',idempotency_key:'busy-release-0001'});
    assert.equal(released.status,200);
    const row=await f.db.get('SELECT status,phase,lease_owner,lease_expires_at FROM ai_tickets WHERE id=?',[f.id]);
    assert.equal(row.status,'queued');assert.equal(row.phase,'authorized');assert.equal(row.lease_owner,null);
    assert.ok(Number(row.lease_expires_at)>=before+60000);
    assert.equal((await f.db.get('SELECT outcome FROM ai_runs WHERE id=?',[f.run])).outcome,null);
    const claim=async(worker)=>(await fetch(`${f.base}/api/ai-board/worker/claim`,{method:'POST',headers:{'content-type':'application/json','x-ai-worker-key':KEY},body:JSON.stringify({worker_id:worker,version:'t',mode:'active',intent:'plan'})})).json();
    assert.equal((await claim('worker-b')).ticket,null);
    await f.db.run('UPDATE ai_tickets SET lease_expires_at=? WHERE id=?',[Date.now()-1,f.id]);
    assert.ok((await claim('worker-a')).ticket);  // requeued root returns to its previous live worker
  } finally {await f.close();}
});

const relock=(f,phase='executing')=>f.db.run("UPDATE ai_tickets SET status='running',phase=?,lease_owner='worker-a',lease_token='lease-a',lease_expires_at=? WHERE id=?",[phase,Date.now()+3600000,f.id]);

test('busy releases are bounded: past the limit the root waits for an admin instead of requeueing',async()=>{
  const f=await fixture();
  try {
    await seedPlanTraces(f);
    for(let i=0;i<5;i++){
      assert.equal((await f.post('release',{outcome:'busy',idempotency_key:`busy-bound-${i}-0001`})).body.ticket.status,'queued');
      await relock(f);
    }
    const sixth=await f.post('release',{outcome:'busy',idempotency_key:'busy-bound-5-0001'});
    assert.equal(sixth.body.ticket.status,'waiting_admin');assert.equal(sixth.body.ticket.phase,'transient_blocked');
    const row=await f.db.get('SELECT lease_expires_at FROM ai_tickets WHERE id=?',[f.id]);
    assert.equal(row.lease_expires_at,null);
  } finally {await f.close();}
});

test('busy release during a reverify run goes back to the reverify queue, not the execute queue',async()=>{
  const f=await fixture();
  try {
    await seedPlanTraces(f);
    await f.db.run("UPDATE ai_runs SET trigger='reverify' WHERE id=?",[f.run]);
    await relock(f,'ticketized');
    const released=await f.post('release',{outcome:'busy',idempotency_key:'busy-reverify-0001'});
    assert.equal(released.body.ticket.status,'queued');assert.equal(released.body.ticket.phase,'reverify');
  } finally {await f.close();}
});

test('two real Python HttpWorkers racing for one authorized ticket: exactly one claims it',async()=>{
  const f=await fixture();
  try {
    await seedPlanTraces(f);
    await f.db.run("UPDATE ai_tickets SET status='queued',phase='authorized',plan_revision=1,lease_owner=NULL,lease_token=NULL,lease_expires_at=NULL WHERE id=?",[f.id]);
    const python=process['env'].TEST_PYTHON || VENV_PYTHON;
    const run=(worker)=>promisify(execFile)(python,[path.resolve('test/support/hsm-worker-probe.py'),f.base,KEY,worker],{cwd:process.cwd(),timeout:60000,maxBuffer:1000000})
      .then(child=>JSON.parse(child.stdout.trim().split('\n').at(-1)));
    const outs=await Promise.all([run('worker-race-1'),run('worker-race-2')]);
    assert.equal(outs.reduce((sum,out)=>sum+out.gate4_calls,0),1);
    assert.equal(outs.filter(out=>out.worker.status==='idle').length,1);
    const ticket=await f.db.get('SELECT status,lease_owner FROM ai_tickets WHERE id=?',[f.id]);
    assert.notEqual(ticket.status,'queued');
  } finally {await f.close();}
});
