import test from 'node:test';
import assert from 'node:assert/strict';
import {createBroker} from '../server/ai-board/online/broker.js';
import {attachOnlineRoutes} from '../server/ai-board/online/routes.js';
import {requireStrictCsrf} from '../server/contexts/security/index.js';
import {openScopedHttp} from './support/scoped-crud-http.js';

test('feature row cap includes retained deleted records and leaves other features available',async()=>{
 const f=await openScopedHttp();
 try {
  const [feature,other]=f.features,[resource,otherResource]=f.resources;
  await f.db.d.run(`INSERT INTO ai_feature_records(resource_id,owner_user_id,created_by,payload_json,deleted,updated_at)
   SELECT ?,1,1,'{}',CASE WHEN n%2=0 THEN 1 ELSE 0 END,? FROM generate_series(1,1000) n`,[resource,Date.now()]);
  const denied=await f.call(1,'POST',`${feature}/resources/${resource}/records`,{data:{text:'Over cap'}});
  assert.equal(denied.status,429);assert.equal(denied.data.error,'feature_row_limit');
  assert.equal((await f.call(1,'POST',`${other}/resources/${otherResource}/records`,{data:{text:'Independent'}})).status,200);
  assert.equal((await f.call(1,'GET',`${feature}/resources/${resource}/records`)).data.length,100,'existing bounded reads remain available');
 } finally {await f.close();}
});

test('blocked feature queries reach their deadline without blocking another feature or leaking SQL details',async()=>{
 const f=await openScopedHttp();let resume,lock;
 try {
  const [feature,other]=f.features,[resource,otherResource]=f.resources;
  let reached;const paused=new Promise(resolve=>{reached=resolve;}),barrier=new Promise(resolve=>{resume=resolve;});
  lock=f.db.d.tx(async t=>{await t.get('SELECT id FROM ai_feature_folders WHERE id=? FOR UPDATE',[feature]);reached();await barrier;});
  await paused;
  const start=performance.now();
  const denied=await f.call(1,'GET',`${feature}/resources/${resource}/schema`,undefined,AbortSignal.timeout(3000));
  assert.equal(denied.status,504);assert.deepEqual(denied.data,{error:'query_deadline_exceeded'});
  assert.ok(performance.now()-start<2500);
  assert.equal((await f.call(1,'GET',`${other}/resources/${otherResource}/schema`)).status,200);
  resume();await lock;
  assert.equal((await f.call(1,'GET',`${feature}/resources/${resource}/schema`)).status,200);
 } finally {resume?.();await lock;await f.close();}
});

test('actor-feature rate cap survives a new server instance and does not consume another actor or feature budget',async t=>{
 let now=Date.now();t.mock.method(Date,'now',()=>now);
 const f=await openScopedHttp();
 try {
  const [feature,other]=f.features,[resource,otherResource]=f.resources,path=`${feature}/resources/${resource}`;
  assert.equal((await f.call(9,'POST',path+'/grants',{user_id:2,owner_user_id:2,permission:'write'})).status,200);
  for(let n=0;n<120;n++)assert.equal((await f.call(1,'GET',path+'/schema')).status,200);
  await f.restart();
  const denied=await f.call(1,'GET',path+'/schema');
  assert.equal(denied.status,429);assert.equal(denied.data.error,'resource_rate_limit');
  assert.ok(Number(denied.retryAfter)>0 && Number(denied.retryAfter)<=60);
  assert.equal((await f.call(2,'GET',path+'/schema')).status,200);
  assert.equal((await f.call(1,'GET',`${other}/resources/${otherResource}/schema`)).status,200);
  now+=60000;
  assert.equal((await f.call(1,'GET',path+'/schema')).status,200,'a new window restores rate allowance');
 } finally {await f.close();}
});

test('a failed data mutation still consumes rate allowance',async t=>{
 const now=Date.now();t.mock.method(Date,'now',()=>now);
 const f=await openScopedHttp();
 try {
  const feature=f.features[0],resource=f.resources[0],base=`${feature}/resources/${resource}`;
  const row=await f.call(1,'POST',base+'/records',{data:{text:'Keep'}});assert.equal(row.status,200);
  await f.db.d.run('UPDATE ai_resource_rate SET requests_count=119 WHERE feature_id=? AND actor_id=1',[feature]);
  assert.equal((await f.call(1,'POST',`${base}/records/${row.data.id}/update`,{revision:999,data:{text:'Stale'}})).status,409);
  assert.equal((await f.call(1,'GET',base+'/schema')).status,429);
 } finally {await f.close();}
});

test('concurrent last-slot creates cannot exceed the feature row cap',async()=>{
 const f=await openScopedHttp();
 try {
  const feature=f.features[0],resource=f.resources[0];
  await f.db.d.run(`INSERT INTO ai_feature_records(resource_id,owner_user_id,created_by,payload_json,updated_at)
   SELECT ?,1,1,'{}',? FROM generate_series(1,999) n`,[resource,Date.now()]);
  const replies=await Promise.all([1,2].map(n=>f.call(1,'POST',`${feature}/resources/${resource}/records`,{data:{text:`Last slot ${n}`}})));
  assert.deepEqual(replies.map(r=>r.status).sort(),[200,429]);
 } finally {await f.close();}
});

test('retained revision payloads count toward feature storage and a rejected write leaves data unchanged',async()=>{
 const f=await openScopedHttp();
 try {
  const [feature,other]=f.features,[resource,otherResource]=f.resources;
  const path=`${feature}/resources/${resource}/records`;
  const created=await f.call(1,'POST',path,{data:{text:'Keep this value'}});assert.equal(created.status,200);
  await f.db.d.run(`INSERT INTO ai_record_revisions(record_id,revision,actor_user_id,owner_user_id,operation,payload_json,deleted,created_at)
   SELECT ?,n,1,1,'updated',json_build_object('text',repeat('x',16300))::text,0,? FROM generate_series(2,1030) n`,[created.data.id,Date.now()]);
  await f.db.d.run('UPDATE ai_feature_records SET revision=1030 WHERE id=?',[created.data.id]);
  const denied=await f.call(1,'POST',`${path}/${created.data.id}/update`,{revision:1030,data:{text:'Must roll back'}});
  assert.equal(denied.status,413);assert.equal(denied.data.error,'feature_storage_limit');
  const read=await f.call(1,'GET',`${path}/${created.data.id}`);
  assert.equal(read.data.revision,1030);assert.equal(read.data.data.text,'Keep this value');
  assert.equal((await f.call(1,'POST',`${other}/resources/${otherResource}/records`,{data:{text:'Independent'}})).status,200);
 } finally {await f.close();}
});

test('full storage still permits permission revocation and one audited delete, without repeat-delete growth',async()=>{
 const f=await openScopedHttp();
 try {
  const feature=f.features[0],resource=f.resources[0],base=`${feature}/resources/${resource}`;
  const row=await f.call(1,'POST',base+'/records',{data:{text:'Keep until explicit delete'}});assert.equal(row.status,200);
  assert.equal((await f.call(1,'POST',base+'/grants',{user_id:2,owner_user_id:1,permission:'read'})).status,200);
  assert.equal((await f.call(2,'GET',`${base}/records/${row.data.id}`)).status,200);
  await f.db.d.run(`INSERT INTO ai_record_revisions(record_id,revision,actor_user_id,owner_user_id,operation,payload_json,deleted,created_at)
   SELECT ?,n,1,1,'updated',json_build_object('text',repeat('x',16300))::text,0,? FROM generate_series(2,1030) n`,[row.data.id,Date.now()]);
  await f.db.d.run('UPDATE ai_feature_records SET revision=1030 WHERE id=?',[row.data.id]);
  const revoked=await f.call(1,'POST',base+'/grants',{user_id:2,owner_user_id:1,permission:'none'});
  assert.equal(revoked.status,200);assert.equal((await f.call(2,'GET',`${base}/records/${row.data.id}`)).status,403);
  const deleted=await f.call(1,'POST',`${base}/records/${row.data.id}/delete`,{revision:1030});
  assert.equal(deleted.status,200);assert.equal(deleted.data.deleted,true);
  const again=await f.call(1,'POST',`${base}/records/${row.data.id}/delete`,{revision:deleted.data.revision});
  assert.equal(again.status,200);assert.equal(again.data.revision,deleted.data.revision);
  const trace=await f.call(9,'GET',base+'/technical-trace');assert.equal(trace.status,200);
  assert.equal(trace.data.filter(r=>r.operation==='grant_revoked').length,1);
  assert.equal(trace.data.filter(r=>r.operation==='deleted').length,1);
 } finally {await f.close();}
});

test('expired tombstones are reclaimed by the serving retention sweep so a full feature can accept new records',async()=>{
 const f=await openScopedHttp();
 try {
  const feature=f.features[0],resource=f.resources[0],base=`${feature}/resources/${resource}/records`;
  await f.db.d.run(`INSERT INTO ai_feature_records(resource_id,owner_user_id,created_by,payload_json,deleted,updated_at)
   SELECT ?,1,1,'{}',1,? FROM generate_series(1,1000)`,[resource,Date.now()-91*86400000]);
  const old=await f.db.d.get('SELECT MIN(id) AS id FROM ai_feature_records WHERE resource_id=?',[resource]);
  await f.restart();
  let status;
  for(const deadline=Date.now()+3000;Date.now()<deadline;) {
   status=(await f.call(1,'GET',`${base}/${old.id}`)).status;
   if(status===404)break;
   await new Promise(resolve=>setTimeout(resolve,20));
  }
  assert.equal(status,404);
  assert.equal((await f.call(1,'POST',base,{data:{text:'New retained record'}})).status,200);
 } finally {await f.close();}
});


test('online invocation consumes one rate slot and still withholds results after real grant revocation',async t=>{
 const now=Date.now();t.mock.method(Date,'now',()=>now);
 const f=await openScopedHttp();
 try {
  const feature=f.features[0],resource=f.resources[0],base=`${feature}/resources/${resource}`;
  const row=await f.call(1,'POST',base+'/records',{data:{text:'Send once'}});assert.equal(row.status,200);
  let sends=0,revoke=false;
  const broker=createBroker({crud:f.crud,manifest:{[feature]:{send_note:{adapter:'fixture',resource_id:resource,fields:['text'],response_fields:['status']}}},
   adapters:{fixture:{send:async()=>{sends++;if(revoke)assert.equal((await f.call(1,'POST',base+'/grants',{user_id:2,owner_user_id:1,permission:'none'})).status,200);return {status:'sent'};}}}});
  attachOnlineRoutes(f.app,{broker,requireAuth:(_req,_res,next)=>next(),requireAdmin:(_req,_res,next)=>next(),requireStrictCsrf,sessionToken:req=>req.user.token});
  await f.db.d.run('UPDATE ai_resource_rate SET requests_count=119 WHERE feature_id=? AND actor_id=1',[feature]);
  const invoke=()=>f.call(1,'POST',`${feature}/online/invoke`,{operation:'send_note',record_id:row.data.id});
  const sent=await invoke();assert.equal(sent.status,200);assert.deepEqual(sent.data,{result:{status:'sent'}});assert.equal(sends,1);
  assert.equal((await f.db.d.get('SELECT requests_count FROM ai_resource_rate WHERE feature_id=? AND actor_id=1',[feature])).requests_count,120);
  assert.equal((await invoke()).status,429);assert.equal(sends,1,'over-limit requests stop before external side effects');
  await f.db.d.run('UPDATE ai_resource_rate SET requests_count=0 WHERE feature_id=?',[feature]);
  assert.equal((await f.call(1,'POST',base+'/grants',{user_id:2,owner_user_id:1,permission:'read'})).status,200);
  revoke=true;
  const denied=await f.call(2,'POST',`${feature}/online/invoke`,{operation:'send_note',record_id:row.data.id});
  assert.equal(denied.status,403);assert.deepEqual(denied.data,{error:'scope_denied'});assert.equal(sends,2);
 } finally {await f.close();}
});
