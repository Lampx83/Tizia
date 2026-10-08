import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,unlinkSync} from 'node:fs';
import {createHash,randomBytes} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {createPgDb} from '../server/ai-board/db/index.js';
const pg=createPgDb({url:process.argv[2]}),base=process.argv[3]||'http://127.0.0.1:8041',checks=[];
const mark=x=>checks.push(x),digest=()=>createHash('sha256').update(readFileSync('/app/server/skills-mapping.json')).digest('hex');
const actors={},now=Date.now();
try{
 const mapping=JSON.parse(readFileSync('/app/server/skills-mapping.json','utf8'));
 assert.equal(Object.entries(mapping).length,84);assert.ok(Object.values(mapping).every(x=>Array.isArray(x)&&x.length));mark('Startup retains complete84space mapping');
 const catalog=await(await fetch(base+'/api/skills/catalog')).json();assert.equal(catalog.skills.length,207);assert.equal(new Set(catalog.skills.map(x=>x.domain)).size,6);mark('HTTP catalog exposes207skills in six approved domains');
 if(process.argv[4]!=='catalog-only'){
 for(const [name,enrolled] of [['learner','primary'],['unenrolled',null]]){
  const id=await pg.insert('INSERT INTO users(username,display_name,password_hash,role,grade,enrolled_domain,created_at) VALUES(?,?,?,?,?,?,?)',[`catalog_${name}_${randomBytes(5).toString('hex')}`,name,'synthetic-unusable-hash','pupil',3,enrolled,now]);
  const token=randomBytes(32).toString('hex');await pg.run('INSERT INTO sessions(token,user_id,created_at,expires_at) VALUES(?,?,?,?)',[token,id,now,now+3600000]);actors[name]={id,token};
 }
 const bootstrap=await fetch(base+'/api/csrf',{headers:{Cookie:`tizia_sid=${actors.learner.token}`}});const cookie=bootstrap.headers.getSetCookie().find(x=>x.startsWith('tizia_csrf=')).split(';')[0];const csrf=decodeURIComponent(cookie.slice('tizia_csrf='.length));
 async function call(actor,path,body,status=200){const r=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{Cookie:cookie+(actor?`; tizia_sid=${actors[actor].token}`:''),'Content-Type':'application/json','X-CSRF-Token':csrf},...(body===undefined?{}:{body:JSON.stringify(body)})});const value=await r.json();assert.equal(r.status,status);return value;}
 const space='admin',grant={domain:'primary',space_id:space,score:90,source_type:'lesson'};
 await call(null,'/api/skills/grant',grant,401);await call('unenrolled','/api/skills/grant',grant,403);await call('learner','/api/skills/grant',{...grant,domain:'it'},403);mark('Actual serving rejects unauthenticated/unenrolled/crossdomain grant');
 const before=await call('learner',`/api/skills/space?domain=primary&space_id=${space}`);assert.ok(before.skills.length>0);assert.ok(before.skills.every(x=>!x.earned));
 assert.equal((await call('learner','/api/skills/grant',{...grant,score:69})).granted_count,0);
 assert.equal((await call('learner','/api/skills/grant',grant)).granted_count,before.skills.length);assert.equal((await call('learner','/api/skills/grant',grant)).granted_count,0);
 const after=await call('learner',`/api/skills/space?domain=primary&space_id=${space}`);assert.ok(after.skills.every(x=>x.earned));mark('Real catalog mapping enables thresholded/idempotent persisted space grant');
 const me=await call('learner','/api/skills/me');assert.ok(me.summary.earned>0);await call('unenrolled',`/api/skills/child/${actors.learner.id}`,undefined,403);mark('Earned tree updates and unrelated user cannot read child tree');
 }
 const comp=(await pg.get('SELECT id FROM competencies ORDER BY id LIMIT 1')).id;
 const sentinel=await pg.insert('INSERT INTO skills(code,name,competency_id,domain,description,created_at) VALUES(?,?,?,?,?,?)',[`primary__sentinel_${randomBytes(5).toString('hex')}`,'Synthetic preserved sentinel',comp,'primary','synthetic-only',now]);
 const original=await pg.get('SELECT * FROM skills WHERE id=?',[sentinel]);
 const overrides=JSON.parse(readFileSync('/app/server/skills-overrides.json','utf8'));
 const [code,compCode]=Object.entries(overrides).find(([code])=>!code.startsWith('_')&&catalog.skills.some(x=>x.code===code));
 const intended=(await pg.get('SELECT id FROM competencies WHERE code=?',[compCode])).id;
 const wrong=(await pg.get('SELECT id FROM competencies WHERE id<>? ORDER BY id LIMIT 1',[intended])).id;
 await pg.run('UPDATE skills SET competency_id=? WHERE code=?',[wrong,code]);
 const run=dry=>execFileSync(process.execPath,['--input-type=module','-e',"await import('/app/scripts/migrate-skills-catalog.js');const {db}=await import('/app/server/db.js');await db.close();",...(dry?['--','--dry']:[])],{timeout:15000,encoding:'utf8'});
 const pinned=digest();run(true);assert.equal(digest(),pinned);assert.equal((await pg.get('SELECT competency_id FROM skills WHERE code=?',[code])).competency_id,wrong);mark('Dry run leaves mapping and existing DB rows untouched');
 run(false);assert.deepEqual(await pg.get('SELECT * FROM skills WHERE id=?',[sentinel]),original);assert.equal((await pg.get('SELECT competency_id FROM skills WHERE code=?',[code])).competency_id,intended);mark('Explicit existing override behavior retained; nonoverride sentinel row unchanged');
 run(false);assert.equal(digest(),pinned);assert.equal((await pg.get('SELECT COUNT(*) AS n FROM skills')).n,208);mark('Repeated migration idempotent apart from alreadyapproved override update');
 const file='/app/scripts/catalog-invalid-fixture.mjs';const source=readFileSync('/app/scripts/migrate-skills-catalog.js','utf8').replace("import { SPACE_SETS_ITEMS } from '../public/js/scenarios/_data/space-sets.js';","const SPACE_SETS_ITEMS = []; // trusted input fixture only");writeFileSync(file,source);
 try{assert.throws(()=>execFileSync(process.execPath,[file],{timeout:15000,stdio:'pipe'}));}finally{unlinkSync(file);}
 assert.equal(digest(),pinned);assert.deepEqual(await pg.get('SELECT * FROM skills WHERE id=?',[sentinel]),original);mark('Missing source domain fails before mapping replacement/catalog writes');
 const missing=readFileSync('/app/scripts/migrate-skills-catalog.js','utf8').replace('SELECT code, id FROM competencies', `SELECT code, id FROM competencies WHERE code <> 'NL_TU_CHU'`);writeFileSync(file,missing);
 try{assert.throws(()=>execFileSync(process.execPath,[file],{timeout:15000,stdio:'pipe'}));}finally{unlinkSync(file);}
 assert.equal(digest(),pinned);assert.deepEqual(await pg.get('SELECT * FROM skills WHERE id=?',[sentinel]),original);assert.equal((await pg.get('SELECT COUNT(*) AS n FROM skills')).n,208);mark('Any unmapped competency fails before partial catalog writes');
 console.log(JSON.stringify({passed:checks.length,checks,realHttp:true,realPostgres:true,scriptOverlayOnly:true,modelCalls:0,syntheticDatabaseOnly:true,mappingSha256:pinned}));
}finally{await pg.close();}
