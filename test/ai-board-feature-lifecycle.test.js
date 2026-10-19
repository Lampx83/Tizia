import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import {openBoard} from './support/ai-board-db.js';
import {createAsyncAiBoardStore} from '../server/ai-board/store-async.js';
import {attachAiBoardRequestRoutes,attachAiBoardWorkerRoutes} from '../server/ai-board/api/routes.js';
import {attachScopedCrudRoutes} from '../server/ai-board/api/scoped-crud.js';
import {attachAiBoardReleases} from '../server/contexts/ai-board-releases/index.js';
import {csrf, requireStrictCsrf} from '../server/contexts/security/index.js';
import {setReleaseStatus} from '../server/ai-board/releases-async.js';
import {createFeatureLifecycle} from '../server/ai-board/services/feature-lifecycle.js';

async function fixture() {
 const db=await openBoard({users:[[1,'owner','Owner','student','it'],[2,'other','Other','student','it'],[9,'admin','Admin','admin',null]]});
 await db.d.exec(`CREATE TABLE sessions(token TEXT PRIMARY KEY,user_id BIGINT NOT NULL REFERENCES users(id),
  created_at BIGINT NOT NULL,expires_at BIGINT NOT NULL)`);
 const store=createAsyncAiBoardStore(db.d), users={};
 for(const id of [1,2,9]) {
  const token=`fixture-lifecycle-session-${id}`;
  await db.d.run('INSERT INTO sessions(token,user_id,created_at,expires_at) VALUES(?,?,?,?)',[token,id,Date.now(),Date.now()+3600000]);
  users[id]={id,role:id===9?'admin':'student',enrolled_domain:'it',token};
 }
 const feature=await store.createRequestWithRoot({ownerUserId:1,ownerDomain:'it',ownerDisplayName:'Owner',
  idempotencyKey:'lifecycle-request-one',type:'feature',title:'Sổ ghi chú lập trình',detail:'Sổ ghi chú cá nhân.'});
 await store.approveFolder(feature.folder_id,9);
 const slug=(await db.d.get('SELECT slug FROM ai_feature_folders WHERE id=?',[feature.folder_id])).slug;
 await setReleaseStatus(db.d,slug,'school',9);
 const app=express();app.use(express.json());
 app.use((req,_res,next)=>{req.user=users[req.headers['x-user']]||null;next();});app.use(csrf);
 const requireAuth=(req,res,next)=>req.user?next():res.status(401).json({error:'authentication_required'});
 const requireAdmin=(req,res,next)=>req.user?.role==='admin'?next():res.status(403).json({error:'admin_required'});
 const pass=(_req,_res,next)=>next();
 app.get('/csrf',(req,res)=>res.json({token:req.csrfToken}));
 attachAiBoardRequestRoutes(app,{store,requireAuth,requireAdmin,requireEnrolled:pass,requireStrictCsrf,classifyRequest:async()=>null});
 const workerKey='fixture-lifecycle-worker-key-only';
 attachAiBoardWorkerRoutes(app,{store,env:{AI_BOARD_WORKER_KEY:workerKey},leaseMs:120000});
 attachScopedCrudRoutes(app,{db:db.d,requireAuth,requireStrictCsrf,sessionToken:req=>req.user.token});
 attachAiBoardReleases(app,{db:db.d,requireAuth,requireAdmin,requireStrictCsrf});
 app.use((_req,res)=>res.send('SERVED VERSION'));
 const server=http.createServer(app);await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=`http://127.0.0.1:${server.address().port}`;
 const csrfToken=(await(await fetch(base+'/csrf')).json()).token;
 async function call(user,method,path,body,headers={}) {
  const response=await fetch(base+path,{method,headers:{'content-type':'application/json','x-user':String(user),
   cookie:`tizia_csrf=${csrfToken}`,'x-csrf-token':csrfToken,...headers},body:body===undefined?undefined:JSON.stringify(body)});
  const text=await response.text();return {status:response.status,data:text.startsWith('{')||text.startsWith('[')?JSON.parse(text):text};
 }
 const worker=(path,body)=>call(0,'POST','/api/ai-board/worker'+path,body,{'x-ai-worker-key':workerKey});
 return {db,store,feature,slug,call,worker,close:()=>new Promise(resolve=>server.close(resolve))};
}

test('archive keeps the served version and existing records while denying new resources and foreign actors',async()=>{
 const f=await fixture();
 try {
  const base=`/api/ai-board/features/${f.feature.folder_id}/resources`;
  const resource=await f.call(9,'POST',base,{name:'notes',fields:['text']});assert.equal(resource.status,200);
  const record=await f.call(1,'POST',`${base}/${resource.data.id}/records`,{data:{text:'Keep this note'}});assert.equal(record.status,200);
  const archive=`/api/ai-board/folders/${f.feature.folder_id}/archive`;
  assert.equal((await f.call(2,'POST',archive,{})).status,404);
  assert.equal((await f.call(1,'POST',archive,{})).status,200);
  assert.equal((await f.call(2,'GET',`/${f.slug}.html`)).data,'SERVED VERSION');
  const kept=await f.call(1,'GET',`${base}/${resource.data.id}/records/${record.data.id}`);
  assert.equal(kept.status,200);assert.equal(kept.data.data.text,'Keep this note');
  assert.equal((await f.call(9,'POST',base,{name:'new_resource',fields:['text']})).status,404);
  assert.equal((await f.call(9,'POST',`${base}/${resource.data.id}/schema/expand`,
   {expected_fields:['text'],add_fields:['extra']})).status,404);
 } finally {await f.close();}
});

test('archive revokes an active improvement lease and prevents a new improvement claim',async()=>{
 const f=await fixture();
 try {
  const claimed=await f.worker('/claim',{worker_id:'lifecycle-worker',mode:'active',intent:'plan'});
  assert.equal(claimed.status,200);assert.ok(claimed.data.ticket);
  const ticket=claimed.data.ticket,lease={worker_id:'lifecycle-worker',lease_token:ticket.lease_token};
  assert.equal((await f.worker(`/tickets/${ticket.id}/heartbeat`,lease)).status,200);
  assert.equal((await f.call(1,'POST',`/api/ai-board/folders/${f.feature.folder_id}/archive`,{})).status,200);
  const stale=await f.worker(`/tickets/${ticket.id}/heartbeat`,lease);
  assert.equal(stale.status,409);assert.equal(stale.data.error,'stale_lease');
  const next=await f.worker('/claim',{worker_id:'next-worker',mode:'active',intent:'plan'});
  assert.equal(next.data.ticket,null);
 } finally {await f.close();}
});

async function planned(f, protectedPlan=false) {
 const ticket=await f.store.claimNext({workerId:'lifecycle-worker',mode:'active',intent:'plan'});
 const lease={workerId:'lifecycle-worker',leaseToken:ticket.lease_token};
 const run=await f.store.createRun(ticket.id,{...lease,trigger:'plan',idempotencyKey:'lifecycle-run-one'});
 const step={order:1,title:'Sửa trang',description:'Fixture',allowed_scope:protectedPlan?['server/contexts/content/index.js']:['public/notes.html'],
  acceptance:['Trang hoạt động'],tests:['node --test'],capability:protectedPlan?'content.write':'public.ui',risk:protectedPlan?'medium':'low',non_goals:['Không sửa auth']};
 const plan=await f.store.submitPlan(ticket.id,{...lease,runId:run.id,budgetUsed:1,idempotencyKey:'lifecycle-plan-one',
  plan:{domain:'it',goal:'Sửa trang',allowed_scope:step.allowed_scope,acceptance:step.acceptance,tests:step.tests,
   capabilities:[step.capability],risk:step.risk,non_goals:step.non_goals,steps:[step]}});
 return {ticket,lease,run,plan};
}

async function waitForLock(db, relation) {
 const deadline=Date.now()+5000;
 while(Date.now()<deadline) {
  const row=await db.get(`SELECT 1 AS waiting FROM pg_stat_activity WHERE datname=current_database()
   AND pid<>pg_backend_pid() AND wait_event_type='Lock' AND query LIKE ? LIMIT 1`,['%'+relation+'%']);
  if(row)return true;
  await new Promise(resolve=>setTimeout(resolve,10));
 }
 return false;
}

test('an old protected plan cannot resurrect archived improvement work',async()=>{
 const f=await fixture();
 try {
  const p=await planned(f,true);
  await f.store.archiveFolder(f.feature.folder_id,1);
  await assert.rejects(()=>f.store.authorizePlan(p.ticket.id,p.plan.plan_hash,9),e=>e.code==='folder_archived'||e.code==='request_closed');
  assert.equal(await f.store.claimNext({workerId:'later-worker',mode:'active',intent:'plan'}),null);
  assert.equal((await f.db.d.get('SELECT status FROM ai_tickets WHERE id=?',[p.ticket.id])).status,'cancelled');
 } finally {await f.close();}
});

test('archive serializes with a verdict already inside its lease transaction',async()=>{
 const f=await fixture();
 let resume;
 try {
  const p=await planned(f);
  let reached;
  const paused=new Promise(resolve=>{reached=resolve;});
  const barrier=new Promise(resolve=>{resume=resolve;});
  const guarded={...f.db.d,get:async(sql,args)=>{
   const row=await f.db.d.get(sql,args);
   if(sql.includes("kind = 'root'") && sql.includes('SELECT *')) {reached();await barrier;}
   return row;
  }};
  const store=createAsyncAiBoardStore(guarded);
  const verdict=store.submitPrePrVerdict(p.ticket.id,{...p.lease,runId:p.run.id,idempotencyKey:'lifecycle-verdict-one',
   verdict:{outcome:'blocked',gate_reached:4,reason:'Fixture permission violation',budget_used:1,failure_class:'critical',
    repairs:[{gate:4,reason:'Fixture repair'}],candidate:null,
    gates:[{gate:3,blocked:false,reason:null},{gate:4,blocked:true,reason:'Fixture permission violation',issues:[]}]}});
  await paused;
  const archive=f.store.archiveFolder(f.feature.folder_id,1);
  // Observe a real PostgreSQL lock wait, rather than relying on task scheduling or a sleep.
  const waiting=await waitForLock(f.db.d,'ai_feature_folders');
  resume();
  await Promise.all([verdict,archive]);
  assert.equal(waiting,true,'archive must wait for the in-flight verdict transaction');
  const root=await f.db.d.get('SELECT status,lease_token FROM ai_tickets WHERE id=?',[p.ticket.id]);
  assert.equal(root.status,'cancelled');assert.equal(root.lease_token,null);
  assert.equal((await f.db.d.get('SELECT state,branch FROM ai_feature_folders WHERE id=?',[f.feature.folder_id])).state,'archived');
 } finally {resume?.();await f.close();}
});

test('only an admin with confirmed incident evidence can isolate one feature and explicitly restore it',async()=>{
 const f=await fixture();
 try {
  const resourcePath=`/api/ai-board/features/${f.feature.folder_id}/resources`;
  const resource=(await f.call(9,'POST',resourcePath,{name:'notes',fields:['text']})).data;
  const record=(await f.call(1,'POST',`${resourcePath}/${resource.id}/records`,{data:{text:'Preserved'}})).data;
  const claimed=await f.store.claimNext({workerId:'incident-worker',mode:'active',intent:'plan'});
  const other=await f.store.createRequestWithRoot({ownerUserId:2,ownerDomain:'it',ownerDisplayName:'Other',
   idempotencyKey:'lifecycle-other-feature',type:'feature',title:'Trang khác',detail:'Fixture'});
  await f.store.approveFolder(other.folder_id,9);
  const otherSlug=(await f.db.d.get('SELECT slug FROM ai_feature_folders WHERE id=?',[other.folder_id])).slug;
  const base=`/api/admin/ai-board/folders/${f.feature.folder_id}/lifecycle`;
  const incident={kind:'permission_breach',evidence:'fixture://incident/permission-observation',confirmed:true};
  assert.equal((await f.call(1,'POST',base+'/isolate',incident)).status,403);
  assert.equal((await f.call(9,'POST',base+'/isolate',incident,{'x-csrf-token':'invalid'})).status,403);
  assert.equal((await f.call(9,'POST',base+'/isolate',{...incident,kind:'request_rejected'})).status,400);
  assert.equal((await f.call(9,'POST',base+'/isolate',{...incident,confirmed:false})).status,400);
  assert.equal((await f.call(9,'POST',base+'/isolate',incident)).status,200);
  await assert.rejects(()=>f.store.heartbeat(claimed.id,'incident-worker',claimed.lease_token),e=>e.code==='stale_lease');
  assert.equal((await f.store.claimNext({workerId:'unaffected-worker',mode:'active',intent:'plan'})).id,other.root_ticket_id);
  assert.equal((await f.call(1,'GET',`/${f.slug}.html`)).status,403);
  assert.equal((await f.call(1,'GET',`${resourcePath}/${resource.id}/records/${record.id}`)).status,404);
  assert.equal((await f.call(2,'GET',`/${otherSlug}.html`)).data,'SERVED VERSION');
  assert.equal((await f.call(9,'POST',`/api/admin/ai-board/folders/${f.feature.folder_id}/approve`,{})).status,409);
  assert.equal((await f.call(9,'POST',`/api/admin/ai-board/releases/${f.slug}`,{status:'school'})).status,409);
  assert.equal((await f.call(1,'GET',base)).status,403);
  const state=await f.call(9,'GET',base);assert.equal(state.status,200);
  assert.equal(state.data.incident.kind,'permission_breach');
  const restore={incident_id:state.data.incident.id,release_event_id:state.data.release_event_id,
   feature_updated_at:state.data.feature.updated_at,evidence:'fixture://incident/remediation-verified',confirmed:true};
  assert.equal((await f.call(9,'POST',base+'/restore',{...restore,release_event_id:0})).status,409);
  assert.equal((await f.call(9,'POST',base+'/restore',restore)).status,200);
  assert.equal((await f.call(1,'GET',`/${f.slug}.html`)).data,'SERVED VERSION');
  assert.equal((await f.call(1,'GET',`${resourcePath}/${resource.id}/records/${record.id}`)).data.data.text,'Preserved');
  assert.equal((await f.call(9,'POST',base+'/restore',restore)).status,409);
  const after=(await f.call(9,'GET',base)).data;
  assert.equal(after.incident,null);assert.ok(after.history.length>=3);
  await f.db.d.run("UPDATE users SET role='student' WHERE id=9");
  assert.equal((await f.call(9,'GET',base)).status,403,'current DB role overrides a stale request role');
 } finally {await f.close();}
});

test('a publish waiting behind isolation cannot reopen the release after the incident commits',async()=>{
 const f=await fixture();let resume;
 try {
  let reached;
  const paused=new Promise(resolve=>{reached=resolve;});
  const barrier=new Promise(resolve=>{resume=resolve;});
  const db={...f.db.d,get:async(sql,args)=>{
   const row=await f.db.d.get(sql,args);
   if(sql.startsWith('SELECT * FROM ai_feature_releases WHERE folder_id=')) {reached();await barrier;}
   return row;
  }};
  const isolated=createFeatureLifecycle({...f.store,db}).isolate(f.feature.folder_id,9,
   {kind:'mandatory_health_failure',evidence:'fixture://mandatory-health/failed',confirmed:true});
  await paused;
  const publish=setReleaseStatus(f.db.d,f.slug,'school',9);
  // Attach the rejection handler before releasing the blocked publisher.
  const denied=assert.rejects(()=>publish,e=>e.code==='feature_isolated');
  const waiting=await waitForLock(f.db.d,'ai_feature_releases');
  resume();await isolated;await denied;
  assert.equal(waiting,true,'publisher must actually wait behind the isolation lock');
  assert.equal((await f.db.d.get('SELECT status FROM ai_feature_releases WHERE slug=?',[f.slug])).status,'off');
 } finally {resume?.();await f.close();}
});

test('an ordinary rejected request never isolates its served feature',async()=>{
 const f=await fixture();
 try {
  await f.store.rejectRequest(f.feature.request_id,'Yêu cầu thông thường không phù hợp.',9);
  assert.equal((await f.db.d.get('SELECT COUNT(*) AS n FROM ai_feature_incidents')).n,0);
  assert.equal((await f.call(2,'GET',`/${f.slug}.html`)).data,'SERVED VERSION');
 } finally {await f.close();}
});
