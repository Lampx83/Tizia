import http from 'node:http';
import express from 'express';
import {openBoard} from './ai-board-db.js';
import {createAsyncAiBoardStore} from '../../server/ai-board/store-async.js';
import {attachScopedCrudRoutes} from '../../server/ai-board/api/scoped-crud.js';
import {csrf,requireStrictCsrf} from '../../server/contexts/security/index.js';

export async function openScopedHttp() {
 const db=await openBoard({users:[[1,'owner','Owner','student','it'],[2,'other','Other','student','it'],[9,'admin','Admin','admin',null]]});
 await db.d.exec('CREATE TABLE sessions(token TEXT PRIMARY KEY,user_id BIGINT NOT NULL REFERENCES users(id),created_at BIGINT NOT NULL,expires_at BIGINT NOT NULL)');
 for(const id of [1,2,9])await db.d.run('INSERT INTO sessions VALUES(?,?,?,?)',[`fixture-crud-${id}`,id,Date.now(),Date.now()+3600000]);
 const store=createAsyncAiBoardStore(db.d),features=[];
 for(const n of [1,2]) {
  const f=await store.createRequestWithRoot({ownerUserId:1,ownerDomain:'it',ownerDisplayName:'Owner',idempotencyKey:`data-cap-feature-${n}`,type:'feature',title:`Ghi chú ${n}`,detail:'Fixture'});
  await store.approveFolder(f.folder_id,9);features.push(f.folder_id);
 }
 let server,base,token,app,crud;
 async function start() {
  app=express();app.use(express.json());
  app.use((req,_res,next)=>{const id=Number(req.headers['x-user']);req.user=[1,2,9].includes(id)?{id,token:`fixture-crud-${id}`}:null;next();});app.use(csrf);
  app.get('/csrf',(req,res)=>res.json({token:req.csrfToken}));
  crud=attachScopedCrudRoutes(app,{db:db.d,requireAuth:(req,res,next)=>req.user?next():res.sendStatus(401),requireStrictCsrf,sessionToken:req=>req.user.token});
  app.use((error,_req,res,_next)=>res.status(500).json({error:'fixture_unhandled_error',code:error.code}));
  server=http.createServer(app);await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  base=`http://127.0.0.1:${server.address().port}`;token=(await(await fetch(base+'/csrf')).json()).token;
 }
 await start();
 async function call(user,method,path,body,signal) {
  const r=await fetch(base+'/api/ai-board/features/'+path,{method,headers:{'content-type':'application/json','x-user':String(user),
   cookie:`tizia_csrf=${token}`,'x-csrf-token':token},body:body===undefined?undefined:JSON.stringify(body),signal});
  return {status:r.status,data:await r.json(),retryAfter:r.headers.get('retry-after')};
 }
 const resources=[];
 for(const id of features) {
  const r=await call(9,'POST',`${id}/resources`,{name:'notes',fields:['text']});
  if(r.status!==200)throw Error('Fixture provisioning failed: '+JSON.stringify(r));resources.push(r.data.id);
 }
 return {db,features,resources,call,get app(){return app;},get crud(){return crud;},restart:async()=>{await new Promise(resolve=>server.close(resolve));await start();},
  close:async()=>{await new Promise(resolve=>server.close(resolve));await db.dispose();}};
}
