import { createHash } from 'node:crypto';
import { WorkerContractError, IDEMPOTENCY_KEY } from '../repositories/store-contract.js';
import { CONTRACT, CONTRACT_HASH, diagram, statePath, publicContract } from './contract.js';
import { CAPABILITY_CATALOG } from '../security/policy.js';

const fail=(code,status=409)=>{throw new WorkerContractError(code,status,code);};
const view=row=>({...row,path:statePath(row.state),result:JSON.parse(row.result_json || 'null'),result_json:undefined});
export function createHsmStore(store) {
  const db=store.db;
  async function currentScope(t,root) {
    const request=await t.get('SELECT * FROM requests WHERE id=? FOR SHARE',[root.source_request_id]);
    const owner=await t.get('SELECT role,enrolled_domain FROM users WHERE id=? FOR SHARE',[request.owner_user_id]);
    if (!owner || request.owner_state!=='verified' || (owner.role!=='admin' && owner.enrolled_domain!==request.owner_domain)
      || ['cancelled','rejected'].includes(request.status)) fail('scope_denied',403);
    if (request.folder_id) {
      const folder=await t.get('SELECT * FROM ai_feature_folders WHERE id=? FOR SHARE',[request.folder_id]);
      if (!folder || folder.state==='archived' || !folder.approved_at || folder.owner_user_id!==request.owner_user_id || folder.domain!==request.owner_domain) fail('scope_denied',403);
    }
  }
  async function transition(ticketId,input) {
    const attempt=Number(input.attempt),runId=Number(input.run_id),version=Number(input.expected_version);
    if (!Number.isSafeInteger(attempt) || attempt<0 || attempt>10 || !Number.isSafeInteger(runId) || runId<1
      || !Number.isSafeInteger(version) || version<0 || !IDEMPOTENCY_KEY.test(String(input.idempotency_key || ''))
      || !CONTRACT.transitions.some(edge=>edge.event===input.event)) fail('hsm_invalid_event',400);
    const result=input.event==='BEGIN'?null:input.result;
    if (result && (result.gate!==4 || typeof result.blocked!=='boolean' || result.blocked!==(input.event==='BLOCKED'))) fail('hsm_invalid_result',400);
    if (input.event!=='BEGIN' && !result) fail('hsm_invalid_result',400);
    const resultJson=result?JSON.stringify({gate:4,blocked:result.blocked,reason:String(result.reason || '').slice(0,1000),
      issues:(Array.isArray(result.issues)?result.issues:[]).slice(0,20).map(x=>String(x).slice(0,300))}):null;
    const inputHash=createHash('sha256').update(JSON.stringify([attempt,input.event,version,input.contract_hash,resultJson])).digest('hex');
    const answer=await db.tx(async t=>{
      const root=await t.get('SELECT * FROM ai_tickets WHERE id=?'+t.lockRow,[Number(ticketId)]);
      if (!root) fail('ticket_not_found',404);
      // The root lock is shared with cancellation, lease replacement and plan authorization.
      await store.assertLease(ticketId,input.worker_id,input.lease_token);
      const run=await t.get('SELECT * FROM ai_runs WHERE id=? AND ticket_id=?',[runId,root.id]);
      if (!run || run.worker_id!==input.worker_id) fail('hsm_run_mismatch');
      await currentScope(t,root);
      const prior=await t.get('SELECT * FROM ai_hsm_events WHERE run_id=? AND identity=? ORDER BY id LIMIT 1',[runId,input.idempotency_key]);
      let reason=null;
      if (prior && prior.input_hash!==inputHash) reason='hsm_identity_conflict';
      const row=await t.get('SELECT * FROM ai_hsm_states WHERE run_id=? AND attempt=?',[runId,attempt]);
      const current=row?.state || CONTRACT.initial;
      const edge=CONTRACT.transitions.find(x=>x.from===current && x.event===input.event);
      const plan=await t.get("SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND status='valid' ORDER BY revision DESC LIMIT 1",[root.id,root.plan_hash]);
      const authorized=plan && (plan.tier==='surface' || await t.get('SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?',[root.id,plan.plan_hash,plan.revision]));
      reason ||= input.contract_hash!==CONTRACT_HASH || (row && row.contract_hash!==CONTRACT_HASH)?'hsm_contract_mismatch':null;
      reason ||= run.plan_hash!==root.plan_hash || Number(run.plan_revision)!==Number(root.plan_revision)?'hsm_run_plan_mismatch':null;
      const latestRun=await t.get('SELECT id FROM ai_runs WHERE ticket_id=? ORDER BY id DESC LIMIT 1',[root.id]);
      reason ||= run.outcome!==null || !['plan','execute'].includes(run.trigger) || latestRun.id!==run.id?'hsm_run_inactive':null;
      reason ||= !authorized || plan.tier==='core' || root.lease_mode!=='active'
        || !((root.status==='planned' && root.phase==='ticketized' && run.plan_hash===root.plan_hash) || (root.status==='running' && root.phase==='executing'))?'hsm_plan_not_executing':null;
      reason ||= row && row.plan_hash!==root.plan_hash?'hsm_plan_changed':null;
      if (prior && !reason) return {...JSON.parse(prior.response_json),execute:false,duplicate:true};
      reason ||= version!==(row?.version || 0)?'hsm_stale_version':null;
      reason ||= !edge?'hsm_illegal_transition':null;
      if (input.event==='BEGIN') {
        const remaining=Number(root.budget_limit)-Number(root.cumulative_budget);
        reason ||= !Number.isFinite(remaining) || remaining<=0?'hsm_budget_exhausted':null;
      }
      if (!reason) {
        await t.run(`INSERT INTO ai_hsm_states(run_id,ticket_id,attempt,contract_hash,state,version,plan_hash,result_json,updated_at)
          VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(run_id,attempt) DO UPDATE SET state=excluded.state,version=excluded.version,result_json=excluded.result_json,updated_at=excluded.updated_at`,
          [runId,root.id,attempt,CONTRACT_HASH,edge.to,version+1,root.plan_hash,resultJson,Date.now()]);
      }
      const state=reason?(row?view(row):null):view(await t.get('SELECT * FROM ai_hsm_states WHERE run_id=? AND attempt=?',[runId,attempt]));
      const response=reason?{error:reason}:{state,execute:edge.action==='static_check',duplicate:false};
      await t.run(`INSERT INTO ai_hsm_events(ticket_id,run_id,attempt,worker_id,event,identity,input_hash,accepted,reason,response_json,created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(run_id,identity,input_hash) DO NOTHING`,
        [root.id,runId,attempt,input.worker_id,input.event,input.idempotency_key,inputHash,reason?0:1,reason,JSON.stringify(response),Date.now()]);
      return response;
    });
    // Reject after commit so the invalid transition remains observable in the audit.
    if (answer.error) fail(answer.error);
    return answer;
  }
  async function read(ticketId,runId=null) {
    const filter=runId?' AND run_id=?':'',params=runId?[Number(ticketId),Number(runId)]:[Number(ticketId)];
    return {states:(await db.all('SELECT * FROM ai_hsm_states WHERE ticket_id=?'+filter+' ORDER BY run_id,attempt',params)).map(view),
      events:await db.all('SELECT id,run_id,attempt,worker_id,event,accepted,reason,created_at FROM ai_hsm_events WHERE ticket_id=?'+filter+' ORDER BY id',params),
      contract_hash:CONTRACT_HASH,contract:publicContract(),diagram:diagram()};
  }
  async function readLeased(ticketId,input) {
    return db.tx(async t=>{
      const root=await t.get('SELECT * FROM ai_tickets WHERE id=?'+t.lockRow,[Number(ticketId)]);
      if (!root) fail('ticket_not_found',404);
      await store.assertLease(ticketId,input.worker_id,input.lease_token);
      await currentScope(t,root);
      return read(ticketId,input.run_id);
    });
  }
  async function authorizeAction(ticketId,input) {
    const runId=Number(input.run_id);
    if (!Number.isSafeInteger(runId) || runId<1 || !/^[a-z][a-z0-9_]{0,40}$/.test(String(input.action || ''))) fail('action_guard_invalid',400);
    return db.tx(async t=>{
      const root=await t.get('SELECT * FROM ai_tickets WHERE id=?'+t.lockRow,[Number(ticketId)]);
      if (!root) fail('ticket_not_found',404);
      await store.assertLease(ticketId,input.worker_id,input.lease_token);
      await currentScope(t,root);
      const run=await t.get('SELECT * FROM ai_runs WHERE id=? AND ticket_id=?',[runId,root.id]);
      const latest=await t.get('SELECT id FROM ai_runs WHERE ticket_id=? ORDER BY id DESC LIMIT 1',[root.id]);
      if (!run || run.worker_id!==input.worker_id || run.outcome!==null || !['plan','execute'].includes(run.trigger) || latest?.id!==run.id) fail('action_run_inactive');
      if (input.contract_hash!==CONTRACT_HASH || run.plan_hash!==root.plan_hash || Number(run.plan_revision)!==Number(root.plan_revision)) fail('action_plan_changed');
      const plan=await t.get("SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND revision=? AND status='valid'",[root.id,root.plan_hash,root.plan_revision]);
      if (!plan || plan.tier==='core' || plan.capability_policy_hash!==CAPABILITY_CATALOG.hash || root.lease_mode!=='active'
          || !((root.status==='planned' && root.phase==='ticketized') || (root.status==='running' && root.phase==='executing'))
          || (plan.tier!=='surface' && !await t.get('SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?',[root.id,plan.plan_hash,plan.revision]))) fail('action_not_authorized');
      const remaining=Number(root.budget_limit)-Number(root.cumulative_budget);
      if (!Number.isFinite(remaining) || remaining<=0) fail('action_budget_exhausted');
      // A current authority check is not a workflow transition or an effect receipt.
      // Mutating services still fence their own writes atomically.
      return {authorized:true,run_id:run.id,plan_hash:plan.plan_hash,plan_revision:plan.revision,parent_remaining:remaining};
    });
  }
  return {transition,read,readLeased,authorizeAction};
}
