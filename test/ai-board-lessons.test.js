import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';
import { attachLessonReviewRoutes } from '../server/ai-board/api/lessons.js';

const KEY = 'fixture-memory-worker-key-32-characters';
async function fixture() {
  const sourceRoot=await fs.mkdtemp(path.join(os.tmpdir(),'tizia-lessons-'));
  await fs.mkdir(path.join(sourceRoot,'public/pharmacy'),{recursive:true});
  await fs.writeFile(path.join(sourceRoot,'public/pharmacy/demo.html'),'Fixture version one.');
  const appDb = await openBoard({ users: [[1,'lan','Lan','student','pharmacy'],[2,'minh','Minh','student','pharmacy'],[9,'admin','Admin','admin',null]] });
  const db = appDb.d;
  await db.exec('CREATE TABLE sessions(token TEXT PRIMARY KEY,user_id BIGINT REFERENCES users(id),expires_at BIGINT NOT NULL)');
  for(const uid of [1,2,9]) await db.run('INSERT INTO sessions(token,user_id,expires_at) VALUES (?,?,?)',[`session-${uid}`,uid,Date.now()+86400000]);
  const store = createAsyncAiBoardStore(db);
  const request = await store.createRequestWithRoot({ ownerUserId:1,ownerDomain:'pharmacy',ownerDisplayName:'Lan',idempotencyKey:'memory-request-001',title:'Bộ thẻ thuốc',detail:'Fixture' });
  const id = request.root_ticket_id;
  await db.run("UPDATE ai_tickets SET status='running',phase='executing',lease_owner='worker-a',lease_token='lease-a',lease_expires_at=?,plan_hash='plan-a' WHERE id=?", [Date.now()+3600000,id]);
  const run = await db.insert("INSERT INTO ai_runs(ticket_id,attempt,trigger,worker_id,idempotency_key,outcome,evidence_json,created_at,updated_at) VALUES (?,1,'execute','worker-a','memory-run-001','ready_for_pr','{}',?,?)",[id,Date.now(),Date.now()]);
  await db.insert("INSERT INTO ai_plans(root_ticket_id,revision,plan_hash,plan_json,status,tier,capability_policy_hash,created_at) VALUES (?,1,'plan-a',?,'valid','surface','fixture',?)",[id,JSON.stringify({allowed_scope:['public/pharmacy/demo.html']}),Date.now()]);
  await db.insert("INSERT INTO ai_gate_traces(run_id,gate,status,evidence_json,created_at) VALUES (?,4,'passed','{\"gate\":4,\"blocked\":false}',?)",[run,Date.now()]);
  const app = express(); app.use(express.json());
  attachAiBoardWorkerRoutes(app,{store,env:{AI_BOARD_WORKER_KEY:KEY},lessonOptions:{sourceRoot}});
  const requireAuth=(req,res,next)=>{const uid=Number(req.headers['x-test-user']);if(![1,2,9].includes(uid))return res.status(401).json({error:'unauthorized'});req.user={id:uid,token:`session-${uid}`};next();};
  attachLessonReviewRoutes(app,{db,requireAuth,requireStrictCsrf:(_q,_s,n)=>n(),lessonOptions:{sourceRoot}});
  app.use((error,_req,res,_next)=>res.status(500).json({error:error.message}));
  const server=app.listen(0,'127.0.0.1'); await new Promise(resolve=>server.once('listening',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  const post=async(path,body,user)=> { const response=await fetch(base+path,{method:'POST',headers:{'content-type':'application/json','x-ai-worker-key':KEY,...(user?{'x-test-user':String(user)}:{})},body:JSON.stringify(body)}); return {status:response.status,body:await response.json()}; };
  return {db,appDb,store,app,server,id,run,post,sourceRoot,base,close:async()=>{ await new Promise(resolve=>server.close(resolve)); await appDb.dispose(); assert.equal(path.dirname(sourceRoot),path.resolve(os.tmpdir())); await fs.rm(sourceRoot,{recursive:true,force:true}); }};
}
test('worker records durable evidence and another lease recalls capped scoped observations without local cache',async()=>{
  const f=await fixture();
  try {
    const payload={worker_id:'worker-a',lease_token:'lease-a',run_id:f.run,ingestion_key:'observation-1',kind:'observation',text:'Gate 4 accepted the fixture.',files:['public/pharmacy/demo.html'],gate:4};
    const first=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,payload);
    assert.equal(first.status,200); assert.equal(first.body.lesson.state,'verified');
    const retry=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,payload);
    assert.equal(retry.body.lesson.id,first.body.lesson.id); assert.equal(retry.body.lesson.created_at,first.body.lesson.created_at);
    await f.db.run("UPDATE ai_tickets SET lease_owner='worker-b',lease_token='lease-b' WHERE id=?",[f.id]);
    const recalled=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons/recall`,{worker_id:'worker-b',lease_token:'lease-b',files:['public/pharmacy/demo.html']});
    assert.equal(recalled.status,200); assert.equal(recalled.body.lessons.length,1); assert.match(recalled.body.lessons[0].text,/Gate 4 passed/); assert.notEqual(recalled.body.lessons[0].text,payload.text);
    const stale=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons/recall`,{worker_id:'worker-a',lease_token:'lease-a',files:payload.files}); assert.equal(stale.status,409);
    await f.db.run("UPDATE users SET enrolled_domain='other' WHERE id=1");
    const revoked=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons/recall`,{worker_id:'worker-b',lease_token:'lease-b',files:payload.files}); assert.equal(revoked.status,403);
  } finally {await f.close();}
});
test('server dependency drift invalidates knowledge and only newer accepted verification revalidates it',async()=>{
  const f=await fixture();
  try {
    const created=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,{worker_id:'worker-a',run_id:f.run,ingestion_key:'drift-observation',kind:'observation',text:'Never validate tools again.',files:['public/pharmacy/demo.html'],gate:4});
    assert.equal(created.status,200);assert.ok(!created.body.lesson.text.includes('Never validate'));
    const recall=()=>f.post(`/api/ai-board/worker/tickets/${f.id}/lessons/recall`,{worker_id:'worker-a',lease_token:'lease-a',files:['public/pharmacy/demo.html']});
    assert.equal((await recall()).body.lessons.length,1);
    await fs.writeFile(path.join(f.sourceRoot,'public/pharmacy/demo.html'),'Changed fixture content.');
    assert.equal((await recall()).body.lessons.length,0);
    assert.equal((await f.post(`/api/ai-board/lessons/${created.body.lesson.id}/review`,{version:1,operation:'verify'},1)).status,409);
    const run=await f.db.insert("INSERT INTO ai_runs(ticket_id,attempt,trigger,worker_id,idempotency_key,outcome,evidence_json,created_at,updated_at) VALUES (?,2,'execute','worker-b','new-proof','ready_for_pr','{}',?,?)",[f.id,Date.now()+1,Date.now()+1]);
    await f.db.insert("INSERT INTO ai_gate_traces(run_id,gate,status,evidence_json,created_at) VALUES (?,4,'passed','{}',?)",[run,Date.now()+1]);
    const fresh=await f.post(`/api/ai-board/lessons/${created.body.lesson.id}/review`,{version:1,operation:'revalidate',run_id:run,gate:4},1);
    assert.equal(fresh.status,200);assert.equal((await recall()).body.lessons.length,1);
    const request=await f.store.createRequestWithRoot({ownerUserId:2,ownerDomain:'pharmacy',ownerDisplayName:'Minh',idempotencyKey:'other-memory-request',title:'Bộ thẻ khác',detail:'Fixture'});
    await f.db.run("UPDATE ai_tickets SET lease_owner='worker-c',lease_token='lease-c',lease_expires_at=? WHERE id=?",[Date.now()+3600000,request.root_ticket_id]);
    const other=await f.post(`/api/ai-board/worker/tickets/${request.root_ticket_id}/lessons/recall`,{worker_id:'worker-c',lease_token:'lease-c',files:['public/pharmacy/demo.html']});
    assert.equal(other.status,200);assert.equal(other.body.lessons.length,0);
  } finally {await f.close();}
});
test('proposed knowledge requires scoped review, real evidence and current version before repository promotion',async()=>{
  const f=await fixture();
  try {
    const created=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,{worker_id:'worker-a',run_id:f.run,ingestion_key:'proposal-1',kind:'proposed',text:'Use the tested deterministic fixture.',files:['public/pharmacy/demo.html'],gate:4});
    assert.equal(created.status,200); const l=created.body.lesson;
    const recall=()=>f.post(`/api/ai-board/worker/tickets/${f.id}/lessons/recall`,{worker_id:'worker-a',lease_token:'lease-a',files:['public/pharmacy/demo.html']});
    assert.equal((await recall()).body.lessons.length,0);
    assert.equal((await f.post(`/api/ai-board/lessons/${l.id}/review`,{version:1,operation:'verify'},2)).status,403);
    assert.equal((await f.post(`/api/ai-board/lessons/${l.id}/review`,{version:1,operation:'verify'},1)).status,200);
    assert.equal((await recall()).body.lessons.length,1);
    assert.equal((await f.post(`/api/ai-board/lessons/${l.id}/review`,{version:1,operation:'promote'},9)).status,409);
    assert.equal((await f.post(`/api/ai-board/lessons/${l.id}/review`,{version:2,operation:'promote'},1)).status,403);
    assert.equal((await f.post(`/api/ai-board/lessons/${l.id}/review`,{version:2,operation:'promote'},9)).status,200);
    const corrected=await f.post(`/api/ai-board/lessons/${l.id}/review`,{version:3,operation:'correct',text:'Corrected proposal needs verification.'},1);
    assert.equal(corrected.status,200); assert.equal(corrected.body.lesson.state,'proposed'); assert.equal(corrected.body.lesson.visibility,'private');
    assert.equal((await recall()).body.lessons.length,0);
    await f.db.run("DELETE FROM sessions WHERE user_id=1");
    assert.equal((await f.post(`/api/ai-board/lessons/${l.id}/review`,{version:4,operation:'reject'},1)).status,401);
  } finally {await f.close();}
});
test('curated still requires revalidation and terminal retention clocks purge payload and metadata separately',async t=>{
  let clock=Date.now(); t.mock.method(Date,'now',()=>clock);
  const f=await fixture();
  try {
    const record=async(kind,ingestion)=>f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,{worker_id:'worker-a',run_id:f.run,ingestion_key:ingestion,kind,text:'Unverified model claim.',files:['public/pharmacy/demo.html'],gate:4});
    const observation=(await record('observation','retention-observation')).body.lesson;
    const proposal=(await record('proposed','retention-proposal')).body.lesson;
    const curated=await f.post(`/api/ai-board/lessons/${observation.id}/review`,{version:1,operation:'curate'},9); assert.equal(curated.status,200);
    clock+=30*86400000;
    await f.db.run('UPDATE sessions SET expires_at=?',[clock+86400000]);
    const expired=await f.post(`/api/ai-board/lessons/${proposal.id}/review`,{version:1,operation:'verify'},1); assert.equal(expired.status,409);
    clock+=60*86400000;
    await f.db.run('UPDATE sessions SET expires_at=?',[clock+86400000]);
    await f.db.run('UPDATE ai_tickets SET lease_expires_at=?',[clock+86400000]);
    const recall=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons/recall`,{worker_id:'worker-a',lease_token:'lease-a',files:['public/pharmacy/demo.html']}); assert.equal(recall.body.lessons.length,0);
    const blind=await f.post(`/api/ai-board/lessons/${observation.id}/review`,{version:2,operation:'revalidate',run_id:f.run,gate:4},1); assert.equal(blind.status,409);
    const recycled=await f.post(`/api/ai-board/lessons/${observation.id}/review`,{version:2,operation:'verify'},1); assert.equal(recycled.status,409); assert.equal(recycled.body.error,'revalidation_required');
    // Refresh the fixture's serving authorization/lease independently of memory validity.
    await f.db.run('UPDATE sessions SET expires_at=?',[clock+86400000]);
    await f.db.run('UPDATE ai_tickets SET lease_expires_at=?',[clock+86400000]);
    const ended=await f.post(`/api/ai-board/lessons/${observation.id}/review`,{version:2,operation:'delete'},1); assert.equal(ended.status,200);
    clock+=30*86400000;
    await f.db.run('UPDATE sessions SET expires_at=?',[clock+86400000]);
    const read=await f.post('/api/ai-board/lessons/maintenance',{},9); assert.equal(read.status,200);
    const payload=await f.db.get('SELECT payload_json FROM ai_lessons WHERE id=?',[observation.id]); assert.equal(payload,undefined);
    assert.ok(await f.db.get('SELECT id FROM ai_lesson_audit WHERE lesson_id=?',[observation.id]));
    clock+=60*86400000;
    await f.db.run('UPDATE sessions SET expires_at=?',[clock+86400000]);
    await f.post('/api/ai-board/lessons/maintenance',{},9);
    assert.equal(await f.db.get('SELECT id FROM ai_lessons WHERE id=?',[observation.id]),undefined);
    assert.equal(await f.db.get('SELECT id FROM ai_lesson_audit WHERE lesson_id=?',[observation.id]),undefined);
    assert.equal((await f.db.get('SELECT COUNT(*) AS n FROM ai_gate_traces')).n,1);
  } finally {await f.close();}
});
test('legacy import maps server authority, quarantines unknown provenance, retries and rolls back only untouched imported versions',async()=>{
  const f=await fixture();
  try {
    const entries=[{entry_key:'known',ticket:f.id,gate:4,reason:'Legacy lesson to review.',files:['public/pharmacy/demo.html']},
      {entry_key:'unknown',ticket_id:99999,text:'Unmapped legacy claim.',files:[]}];
    const imported=await f.post('/api/ai-board/lessons/import',{batch_key:'legacy-batch-1',entries},1); assert.equal(imported.status,200);
    assert.equal(imported.body.entries[0].disposition,'legacy'); assert.equal(imported.body.entries[1].disposition,'quarantine');
    const lessonId=imported.body.entries[0].lesson_id;
    const retry=await f.post('/api/ai-board/lessons/import',{batch_key:'legacy-batch-1',entries},1);assert.equal(retry.body.entries[0].lesson_id,lessonId);
    const verified=await f.post(`/api/ai-board/lessons/${lessonId}/review`,{version:1,operation:'verify'},1);assert.equal(verified.status,200);
    const second=await f.post('/api/ai-board/lessons/import',{batch_key:'legacy-batch-1',entries:[{...entries[0],entry_key:'untouched'}]},1);assert.equal(second.status,200);
    assert.equal((await f.post('/api/ai-board/lessons/import/legacy-batch-1/rollback',{},2)).body.rolled_back,0);
    const rollback=await f.post('/api/ai-board/lessons/import/legacy-batch-1/rollback',{},1);assert.equal(rollback.status,200);assert.equal(rollback.body.rolled_back,1);assert.equal(rollback.body.preserved,1);
    assert.equal((await f.db.get('SELECT state FROM ai_lessons WHERE id=?',[lessonId])).state,'verified');
    assert.equal((await f.db.get('SELECT state FROM ai_lessons WHERE id=?',[second.body.entries[0].lesson_id])).state,'deleted');
    const recall=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons/recall`,{worker_id:'worker-a',lease_token:'lease-a',files:['public/pharmacy/demo.html']});assert.equal(recall.body.lessons.length,1);
    const scopeAttack=await f.post('/api/ai-board/lessons/import',{batch_key:'other-owner',entries:[entries[0]]},2);assert.equal(scopeAttack.status,403);
    const original=await f.db.get('SELECT updated_at FROM ai_runs WHERE id=?',[f.run]);
    const ambiguousRun=await f.db.insert("INSERT INTO ai_runs(ticket_id,attempt,trigger,worker_id,idempotency_key,outcome,evidence_json,created_at,updated_at) VALUES (?,2,'execute','worker-a','ambiguous-source','ready_for_pr','{}',?,?)",[f.id,original.updated_at,original.updated_at]);
    await f.db.insert("INSERT INTO ai_gate_traces(run_id,gate,status,evidence_json,created_at) VALUES (?,4,'passed','{}',?)",[ambiguousRun,original.updated_at]);
    const ambiguous=await f.post('/api/ai-board/lessons/import',{batch_key:'ambiguous-batch',entries:[entries[0]]},1);
    assert.equal(ambiguous.status,200);assert.equal(ambiguous.body.entries[0].disposition,'quarantine');
  } finally {await f.close();}
});
test('actual Python RemoteLessons and WorkerClient record over HTTP and rebuild recall from PostgreSQL on a different worker',async()=>{
  const f=await fixture();
  try {
    const python=process['env'].PYTHON || path.resolve('ai-board/harness/.venv/Scripts/python.exe');
    const script=`import sys,json
from pathlib import Path
root=Path.cwd()
for p in [root/'ai-board',root/'ai-board/harness',root/'ai-board/harness/repositories']: sys.path.insert(0,str(p))
from worker import WorkerClient
from harness.repositories.server_memory import RemoteLessons
config=json.loads(sys.argv[1])
client=WorkerClient(config['base'],config['key'])
memory=RemoteLessons(client,ticket_id=config['id'],run_id=config['run'],worker_id=config['worker'],lease_token=config['lease'],files=['public/pharmacy/demo.html'])
if config['mode']=='record':
 memory.record([{'reason':'A proposed rule needs review.','files':['public/pharmacy/demo.html'],'gate':4}])
 memory.flush({'gates':[{'gate':4,'blocked':False}]})
 assert not memory.pending
else:
 recalled=memory.recall('public/pharmacy/demo.html',['fixture'])
 assert len(recalled)==1,recalled
 assert 'Gate 4 passed' in recalled[0],recalled
 assert 'proposed rule' not in recalled[0],recalled
print('joined-python-memory-pass')`;
    const run=async config=>promisify(execFile)(python,['-c',script,JSON.stringify({base:f.base,key:KEY,id:f.id,run:f.run,...config})],{cwd:path.resolve('.'),timeout:30000});
    assert.match((await run({mode:'record',worker:'worker-a',lease:'lease-a'})).stdout,/joined-python-memory-pass/);
    await f.db.run("UPDATE ai_tickets SET lease_owner='worker-b',lease_token='lease-b' WHERE id=?",[f.id]);
    assert.match((await run({mode:'recall',worker:'worker-b',lease:'lease-b'})).stdout,/joined-python-memory-pass/);
    await f.db.run('DELETE FROM ai_gate_traces');
    const recalled=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons/recall`,{worker_id:'worker-b',lease_token:'lease-b',files:['public/pharmacy/demo.html']});
    assert.equal(recalled.body.lessons.length,0);
    assert.equal((await f.db.get('SELECT COUNT(*) AS n FROM ai_lessons')).n,0);
    assert.equal((await f.db.get('SELECT COUNT(*) AS n FROM ai_runs')).n,1);
  } finally {await f.close();}
});
test('terminal payload GC leaves opaque bounded retry receipts and cannot resurrect rejected records or rolled-back imports',async t=>{
  let clock=Date.now();t.mock.method(Date,'now',()=>clock);
  const f=await fixture();
  try {
    const body={worker_id:'worker-a',run_id:f.run,ingestion_key:'retired-ingestion',kind:'observation',files:['public/pharmacy/demo.html'],gate:4};
    const l=(await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,body)).body.lesson;
    assert.equal((await f.post(`/api/ai-board/lessons/${l.id}/review`,{version:1,operation:'reject'},1)).status,200);
    const importBody={batch_key:'retired-batch',entries:[{entry_key:'retired-entry',ticket:f.id,gate:4,reason:'Legacy draft.',files:['public/pharmacy/demo.html']}]};
    assert.equal((await f.post('/api/ai-board/lessons/import',importBody,1)).status,200);
    assert.equal((await f.post('/api/ai-board/lessons/import/retired-batch/rollback',{},1)).body.rolled_back,1);
    await f.db.run("INSERT INTO ai_release_receipts(ticket_id,idempotency_key,worker_id,status,phase,created_at) VALUES (?,'unresolved-receipt','worker-a','unresolved','paused',?)",[f.id,clock]);
    clock+=30*86400000;
    await f.db.run('UPDATE sessions SET expires_at=?',[clock+86400000]);
    assert.equal((await f.post('/api/ai-board/lessons/maintenance',{},9)).status,200);
    assert.equal((await f.db.get('SELECT COUNT(*) AS n FROM ai_lessons')).n,0);
    const recordRetry=await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,body);assert.equal(recordRetry.status,409);assert.equal(recordRetry.body.error,'ingestion_retired');
    const importRetry=await f.post('/api/ai-board/lessons/import',importBody,1);assert.equal(importRetry.status,409);assert.equal(importRetry.body.error,'ingestion_retired');
    for(const row of await f.db.all('SELECT * FROM ai_lesson_tombstones')){assert.deepEqual(Object.getOwnPropertyNames(row).sort(),['expires_at','identity_hash']);assert.match(row.identity_hash,/^[0-9a-f]{64}$/);}
    assert.equal((await f.db.get("SELECT status FROM ai_release_receipts WHERE idempotency_key='unresolved-receipt'")).status,'unresolved');
    clock+=60*86400000;await f.db.run('UPDATE sessions SET expires_at=?',[clock+86400000]);
    await f.post('/api/ai-board/lessons/maintenance',{},9);
    assert.equal((await f.db.get('SELECT COUNT(*) AS n FROM ai_lesson_tombstones')).n,0);
    assert.equal((await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,body)).body.error,'source_expired');
    assert.equal((await f.post('/api/ai-board/lessons/import',importBody,1)).body.error,'source_expired');
  } finally {await f.close();}
});
test('repository knowledge respects tenant and folder scope while concurrent reciprocal recalls avoid deadlock',async()=>{
  const f=await fixture();
  try {
    const stamp=Date.now(),makeFolder=(name)=>f.db.insert("INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,created_at,updated_at,last_activity_at) VALUES (?,?,1,'pharmacy','draft',?,?,?)",[name,name,stamp,stamp,stamp]);
    const folderA=await makeFolder('memory-a'),folderB=await makeFolder('memory-b');
    await f.db.run('UPDATE requests SET folder_id=? WHERE id=(SELECT source_request_id FROM ai_tickets WHERE id=?)',[folderA,f.id]);
    const first=(await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,{worker_id:'worker-a',run_id:f.run,ingestion_key:'folder-observation',kind:'observation',files:['public/pharmacy/demo.html'],gate:4})).body.lesson;
    const request=await f.store.createRequestWithRoot({ownerUserId:1,ownerDomain:'pharmacy',ownerDisplayName:'Lan',idempotencyKey:'second-folder-request',folderId:folderB,title:'Bộ thẻ khác',detail:'Fixture'});
    const other=request.root_ticket_id;
    await f.db.run("UPDATE ai_tickets SET lease_owner='worker-b',lease_token='lease-b',lease_expires_at=?,plan_hash='plan-b' WHERE id=?",[stamp+3600000,other]);
    const run=await f.db.insert("INSERT INTO ai_runs(ticket_id,attempt,trigger,worker_id,idempotency_key,outcome,evidence_json,created_at,updated_at) VALUES (?,1,'execute','worker-b','parallel-run','ready_for_pr','{}',?,?)",[other,stamp,stamp]);
    await f.db.insert("INSERT INTO ai_gate_traces(run_id,gate,status,evidence_json,created_at) VALUES (?,4,'passed','{}',?)",[run,stamp]);
    await f.db.insert("INSERT INTO ai_plans(root_ticket_id,revision,plan_hash,plan_json,status,tier,capability_policy_hash,created_at) VALUES (?,1,'plan-b',?,'valid','surface','fixture',?)",[other,JSON.stringify({allowed_scope:['public/pharmacy/demo.html']}),stamp]);
    const recallB=()=>f.post(`/api/ai-board/worker/tickets/${other}/lessons/recall`,{worker_id:'worker-b',lease_token:'lease-b',files:['public/pharmacy/demo.html']});
    assert.equal((await recallB()).body.lessons.length,0);
    const second=(await f.post(`/api/ai-board/worker/tickets/${other}/lessons`,{worker_id:'worker-b',run_id:run,ingestion_key:'second-observation',kind:'observation',files:['public/pharmacy/demo.html'],gate:4})).body.lesson;
    for(const l of [first,second])assert.equal((await f.post(`/api/ai-board/lessons/${l.id}/review`,{version:1,operation:'promote'},9)).status,200);
    const recallA=()=>f.post(`/api/ai-board/worker/tickets/${f.id}/lessons/recall`,{worker_id:'worker-a',lease_token:'lease-a',files:['public/pharmacy/demo.html']});
    const parallel=await Promise.all(Array.from({length:8},(_,i)=>i%2?recallA():recallB()));
    for(const response of parallel){assert.equal(response.status,200);assert.equal(response.body.lessons.length,2);}
    await f.db.run("UPDATE users SET enrolled_domain='other' WHERE id=2");
    const otherDomain=await f.store.createRequestWithRoot({ownerUserId:2,ownerDomain:'other',ownerDisplayName:'Minh',idempotencyKey:'other-tenant-memory',title:'Thẻ trường khác',detail:'Fixture'});
    await f.db.run("UPDATE ai_tickets SET lease_owner='worker-c',lease_token='lease-c',lease_expires_at=? WHERE id=?",[stamp+3600000,otherDomain.root_ticket_id]);
    const tenant=await f.post(`/api/ai-board/worker/tickets/${otherDomain.root_ticket_id}/lessons/recall`,{worker_id:'worker-c',lease_token:'lease-c',files:['public/pharmacy/demo.html']});assert.equal(tenant.status,200);assert.equal(tenant.body.lessons.length,0);
    await f.db.run('UPDATE requests SET folder_id=? WHERE id=?',[folderA,request.request_id]);
    const sameFolder=await Promise.all(Array.from({length:12},(_,i)=>i%2?recallB():f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,{worker_id:'worker-a',run_id:f.run,ingestion_key:`same-folder-record-${i}`,kind:'observation',files:['public/pharmacy/demo.html'],gate:4})));
    for(const response of sameFolder)assert.equal(response.status,200);
  } finally {await f.close();}
});
test('correction cannot turn an expired source proof into fresh verification but an explicitly new accepted run can',async t=>{
  let clock=Date.now();t.mock.method(Date,'now',()=>clock);
  const f=await fixture();
  try {
    const lesson=(await f.post(`/api/ai-board/worker/tickets/${f.id}/lessons`,{worker_id:'worker-a',run_id:f.run,ingestion_key:'correct-old-proof',kind:'observation',files:['public/pharmacy/demo.html'],gate:4})).body.lesson;
    clock+=90*86400000;await f.db.run('UPDATE sessions SET expires_at=?',[clock+86400000]);
    const corrected=await f.post(`/api/ai-board/lessons/${lesson.id}/review`,{version:1,operation:'correct',text:'Correction still needs fresh evidence.'},1);assert.equal(corrected.status,200);
    const stale=await f.post(`/api/ai-board/lessons/${lesson.id}/review`,{version:2,operation:'verify'},1);assert.equal(stale.status,409);assert.equal(stale.body.error,'source_expired');
    const run=await f.db.insert("INSERT INTO ai_runs(ticket_id,attempt,trigger,worker_id,idempotency_key,outcome,evidence_json,created_at,updated_at) VALUES (?,2,'execute','worker-b','correct-new-proof','ready_for_pr','{}',?,?)",[f.id,clock,clock]);
    await f.db.insert("INSERT INTO ai_gate_traces(run_id,gate,status,evidence_json,created_at) VALUES (?,5,'passed','{}',?)",[run,clock]);
    const fresh=await f.post(`/api/ai-board/lessons/${lesson.id}/review`,{version:2,operation:'verify',run_id:run,gate:5},1);assert.equal(fresh.status,200);assert.equal(fresh.body.lesson.state,'verified');assert.equal(fresh.body.lesson.created_at,lesson.created_at);assert.equal(fresh.body.lesson.gate,5);
  } finally {await f.close();}
});
