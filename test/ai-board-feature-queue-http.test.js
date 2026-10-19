import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import {openBoard} from './support/ai-board-db.js';
import {createAsyncAiBoardStore} from '../server/ai-board/store-async.js';
import {attachAiBoardRequestRoutes,attachAiBoardWorkerRoutes} from '../server/ai-board/api/routes.js';
import {queueLine} from '../public/js/suggestion-fab.js';

test('concurrent workers serialize feature revisions and requester sees why a follow-up waits',async()=>{
 const db=await openBoard({users:[[1,'an','An','student','it'],[2,'binh','Bình','student','it']]});
 const store=createAsyncAiBoardStore(db.d);
 const request=(id,key,extra={})=>store.createRequestWithRoot({ownerUserId:id,ownerDomain:'it',ownerDisplayName:String(id),
  idempotencyKey:key,title:'Chức năng ghi chú '+key,detail:'Fixture',...extra});
 const first=await request(1,'queue-feature-first',{type:'feature'});
 const follow=await request(1,'queue-feature-follow',{folderId:first.folder_id});
 const other=await request(2,'queue-independent');
 const app=express();app.use(express.json());
 app.use((req,_res,next)=>{req.user={id:1,role:'student',enrolled_domain:'it'};next();});
 const pass=(_req,_res,next)=>next(),deny=(_req,res)=>res.sendStatus(403);
 attachAiBoardRequestRoutes(app,{store,requireAuth:pass,requireEnrolled:pass,requireAdmin:deny,requireStrictCsrf:pass,classifyRequest:async()=>null});
 const workerKey='fixture-feature-queue-worker-key';
 attachAiBoardWorkerRoutes(app,{store,env:{AI_BOARD_WORKER_KEY:workerKey},leaseMs:120000});
 const server=http.createServer(app);await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=`http://127.0.0.1:${server.address().port}`;
 const claim=async worker=>{
  const response=await fetch(base+'/api/ai-board/worker/claim',{method:'POST',headers:{'content-type':'application/json','x-ai-worker-key':workerKey},
   body:JSON.stringify({worker_id:worker,mode:'active',intent:'plan'})});
  assert.equal(response.status,200);return (await response.json()).ticket;
 };
 try {
  const claims=await Promise.all([claim('queue-one'),claim('queue-two'),claim('queue-three')]);
  assert.deepEqual(claims.filter(Boolean).map(t=>t.id).sort((a,b)=>a-b),[first.root_ticket_id,other.root_ticket_id].sort((a,b)=>a-b));
  const response=await fetch(base+'/api/requests?domain=it');assert.equal(response.status,200);
  const item=(await response.json()).items.find(item=>item.id===follow.request_id);
  assert.equal(item.queue.reason,'feature_predecessor');assert.equal(item.queue.eta_s,null);
  assert.match(queueLine(item.queue),/Đang chờ yêu cầu trước của chức năng này hoàn tất/);
  await db.d.run('UPDATE ai_tickets SET lease_expires_at=1 WHERE id=?',[first.root_ticket_id]);
  assert.equal((await claim('queue-rescue')).id,first.root_ticket_id,'expired work resumes before its follow-up');
  await store.cancelRequest(first.request_id,{ownerUserId:1});
  assert.equal((await claim('queue-next-revision')).id,follow.root_ticket_id);
 } finally {await new Promise(resolve=>server.close(resolve));}
});
