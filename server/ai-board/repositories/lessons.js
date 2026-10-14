import { createHash } from 'node:crypto';
import { WorkerContractError } from './store-contract.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const DAY = 86400000;
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const parse = value => { try { return JSON.parse(value || '{}'); } catch { return {}; } };
const fail = (code, status = 400) => { throw new WorkerContractError(code, status, code); };
const id = value => { const n = Number(value); if (!Number.isSafeInteger(n) || n < 1) fail('invalid_id'); return n; };
const text = value => { if (typeof value !== 'string' || !value.trim() || value.length > 300) fail('invalid_lesson_text'); return value.trim(); };
const key = value => { if (typeof value !== 'string' || !/^[a-zA-Z0-9._:-]{1,120}$/.test(value)) fail('invalid_ingestion_key'); return value; };
function files(value = []) {
  if (!Array.isArray(value) || value.length > 20 || value.some(p => typeof p !== 'string' || p.length > 240 || !p || p.startsWith('/') || p.includes('\\') || p.split('/').some(s => s === '..' || s === '.') || p.includes(':'))) fail('invalid_lesson_files');
  return [...new Set(value)].sort();
}
const view = row => ({ id: row.id, state: row.state, kind: row.kind, version: row.version, visibility: row.visibility,
  created_at: row.created_at, review_due_at: row.review_due_at, ended_at: row.ended_at,
  ticket_id: row.ticket_id, run_id: row.run_id, evidence_trace_id: row.evidence_trace_id, ...parse(row.payload_json) });

export function createLessonsStore(db, { now = Date.now, sourceRoot = process.cwd() } = {}) {
  async function dependencies(paths) {
    const root=await fs.realpath(sourceRoot),result={};
    for(const name of paths) {
      const target=path.resolve(root,name);
      if(!target.startsWith(root+path.sep)) fail('invalid_lesson_files');
      // Missing files are explicit pins; an existing ancestor must still resolve inside the serving repository.
      let ancestor=target;
      while(true) {
        try {const real=await fs.realpath(ancestor);if(real!==root && !real.startsWith(root+path.sep)) fail('dependency_unavailable',409);break;}
        catch(error){if(error.code!=='ENOENT') throw error;const parent=path.dirname(ancestor);if(parent===ancestor) throw error;ancestor=parent;}
      }
      try {const stat=await fs.lstat(target);if(!stat.isFile() || stat.isSymbolicLink()) fail('dependency_unavailable',409);
        result[name]=createHash('sha256').update(await fs.readFile(target)).digest('hex');}
      catch(error){if(error.code==='ENOENT')result[name]=null;else throw error;}
    }
    return result;
  }
  async function scopedFiles(t,ns,paths) {
    const plan=await t.get('SELECT plan_json FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? ORDER BY revision DESC LIMIT 1',[ns.ticket.id,ns.ticket.plan_hash]);
    const allowed=parse(plan?.plan_json).allowed_scope || [];
    if(paths.some(p=>!allowed.includes(p))) fail('files_outside_plan',403);
    return dependencies(paths);
  }
  async function namespace(t, ticketId, write=false) {
    // Share the request's revoke/cancel authority; namespace is never accepted from lesson text.
    const ticket = await t.get(`SELECT * FROM ai_tickets WHERE id=? AND kind='root'${write?t.lockRow:' FOR SHARE'}`, [id(ticketId)]);
    if (!ticket) fail('ticket_not_found', 404);
    const r = await t.get('SELECT * FROM requests WHERE id=? FOR SHARE', [ticket.source_request_id]);
    const u = await t.get('SELECT id,role,enrolled_domain FROM users WHERE id=? FOR SHARE', [r.owner_user_id]);
    if (!u || r.owner_state !== 'verified' || (u.role !== 'admin' && u.enrolled_domain !== r.owner_domain)
      || ['cancelled','rejected'].includes(r.status) || ['requester_cancelled','admin_rejected'].includes(ticket.phase)) fail('scope_denied', 403);
    if (r.folder_id) {
      const f = await t.get('SELECT * FROM ai_feature_folders WHERE id=? FOR SHARE', [r.folder_id]);
      if (!f || f.owner_user_id !== r.owner_user_id || f.domain !== r.owner_domain || f.state === 'archived') fail('scope_denied',403);
    }
    return { ticket, owner: r.owner_user_id, domain: r.owner_domain, folder: r.folder_id };
  }
  function lease(ns, input) {
    const r = ns.ticket;
    if (!input.worker_id || r.lease_owner !== input.worker_id || !input.lease_token || r.lease_token !== input.lease_token || r.lease_expires_at <= now()) fail('stale_lease',409);
  }
  async function source(t, ns, input) {
    const run = await t.get(`SELECT * FROM ai_runs WHERE id=? AND ticket_id=?${t.lockRow}`, [id(input.run_id),ns.ticket.id]);
    if (!run || run.worker_id !== input.worker_id) fail('invalid_run',403);
    if(run.updated_at<=now()-90*DAY) fail('source_expired',409);
    if (!run.outcome) lease(ns,input);
    return run;
  }
  async function trace(t, runId, gate) {
    return t.get("SELECT * FROM ai_gate_traces WHERE run_id=? AND gate=? AND status IN ('passed','blocked') ORDER BY id DESC LIMIT 1 FOR SHARE",[runId,Number(gate)]);
  }
  async function proof(t, row) {
    const ns = await namespace(t,row.ticket_id);
    if (ns.owner !== row.owner_user_id || ns.domain !== row.domain || ns.folder !== row.folder_id) return 'scope_changed';
    if (row.source_expires_at && row.source_expires_at <= now()) return 'source_expired';
    const run = await t.get('SELECT * FROM ai_runs WHERE id=? AND ticket_id=? FOR SHARE',[row.run_id,row.ticket_id]);
    const g = await t.get('SELECT * FROM ai_gate_traces WHERE id=? AND run_id=? FOR SHARE',[row.evidence_trace_id,row.run_id]);
    if (!run || !g || g.status !== 'passed' || !run.outcome || digest([g.status,g.evidence_json,g.public_reason,run.evidence_json]) !== row.evidence_hash) return 'evidence_changed';
    if(run.updated_at<=now()-90*DAY)return 'source_expired';
    if ((ns.ticket.plan_hash || null) !== row.plan_hash) return 'dependency_changed';
    try { if(digest(await dependencies(parse(row.payload_json).files || []))!==digest(parse(row.dependencies_json))) return 'dependency_changed'; }
    catch {return 'dependency_unavailable';}
    return null;
  }
  async function audit(t,row,operation,actorId=null) {
    await t.insert('INSERT INTO ai_lesson_audit(lesson_id,version,operation,actor_user_id,created_at) VALUES (?,?,?,?,?)',[row.id,row.version,operation,actorId,now()]);
  }
  async function eligibility(t,row) {
    if (!['verified','curated'].includes(row.state)) return row.state;
    if (!row.review_due_at || row.review_due_at <= now()) return 'revalidation_due';
    try { return await proof(t,row); } catch (error) { if (error instanceof WorkerContractError) return error.code; throw error; }
  }
  async function actor(t,identity) {
    const a=await t.get(`SELECT u.id,u.role,u.enrolled_domain FROM users u JOIN sessions s ON s.user_id=u.id
      WHERE u.id=? AND s.token=? AND s.expires_at>? FOR SHARE OF u,s`,[id(identity.id),String(identity.sessionToken || ''),now()]);
    if(!a) fail('authentication_required',401);
    return a;
  }
  async function authorized(t,a,lessonId) {
    // Lock source authority before lesson rows, consistently with worker ingestion.
    const locator=await t.get('SELECT ticket_id FROM ai_lessons WHERE id=?',[id(lessonId)]);
    if(!locator) fail('lesson_not_found',404);
    const ns=await namespace(t,locator.ticket_id);
    if(a.role!=='admin' && (a.id!==ns.owner || a.enrolled_domain!==ns.domain)) fail('scope_denied',403);
    const row=await t.get(`SELECT * FROM ai_lessons WHERE id=?${t.lockRow}`,[id(lessonId)]);
    if(!row)fail('lesson_not_found',404);
    if(['proposed','legacy'].includes(row.state) && row.review_due_at<=now()) {
      await t.run("UPDATE ai_lessons SET state='expired',ended_at=review_due_at,version=version+1 WHERE id=?",[row.id]);
      row.state='expired';row.ended_at=row.review_due_at;row.version++;
    }
    return row;
  }
  async function tombstone(t,identity,expires) {
    if(expires>now()) await t.run('INSERT INTO ai_lesson_tombstones(identity_hash,expires_at) VALUES (?,?) ON CONFLICT(identity_hash) DO NOTHING',[digest(identity),expires]);
  }
  async function rejectRetired(t,identity) {
    if(await t.get('SELECT identity_hash FROM ai_lesson_tombstones WHERE identity_hash=? AND expires_at>?',[digest(identity),now()]))fail('ingestion_retired',409);
  }
  async function retire(t,row,ended) {
    const run=await t.get('SELECT updated_at FROM ai_runs WHERE id=?',[row.run_id]);
    await tombstone(t,['record',row.ticket_id,row.ingestion_key],Math.min(ended+90*DAY,(run?.updated_at || ended)+90*DAY));
    const manifests=await t.all('SELECT * FROM ai_lesson_imports WHERE lesson_id=?',[row.id]);
    for(const m of manifests)await tombstone(t,['import',m.actor_user_id,m.batch_key,m.entry_key],(m.ended_at || ended)+90*DAY);
  }
  return {
    async importLegacy(identity,input) {
      await this.prune();
      const batch=key(input.batch_key);
      if(!Array.isArray(input.entries) || input.entries.length>100 || !input.entries.length) fail('invalid_import_entries');
      return db.tx(async t=>{
        const a=await actor(t,identity),out=[];
        await t.get('SELECT pg_advisory_xact_lock(?)',[parseInt(digest([a.id,batch]).slice(0,12),16)]);
        for(const entry of input.entries) {
          const entryKey=key(entry.entry_key),body=text(entry.text || entry.reason),paths=files(entry.files),sourceTicket=entry.ticket_id || entry.ticket,
            fingerprint=digest([sourceTicket,entry.run_id,entry.gate,body,paths]);
          await rejectRetired(t,['import',a.id,batch,entryKey]);
          const existing=await t.get('SELECT * FROM ai_lesson_imports WHERE actor_user_id=? AND batch_key=? AND entry_key=?',[a.id,batch,entryKey]);
          if(existing) {if(existing.input_hash!==fingerprint)fail('idempotency_conflict',409);if(existing.ended_at && existing.disposition==='legacy')fail('ingestion_retired',409);out.push({entry_key:entryKey,lesson_id:existing.lesson_id,disposition:existing.disposition});continue;}
          let ns=null;
          const ticket=await t.get('SELECT id FROM ai_tickets WHERE id=?',[Number(sourceTicket)||0]);
          if(ticket) {ns=await namespace(t,ticket.id);if(a.role!=='admin' && (a.id!==ns.owner || a.enrolled_domain!==ns.domain))fail('scope_denied',403);}
          let run=ns && entry.run_id?await t.get('SELECT * FROM ai_runs WHERE id=? AND ticket_id=?',[Number(entry.run_id)||0,ns.ticket.id]):null;
          if(ns && !entry.run_id) {
            const candidates=await t.all(`SELECT DISTINCT r.* FROM ai_runs r JOIN ai_gate_traces g ON g.run_id=r.id
              WHERE r.ticket_id=? AND r.outcome IS NOT NULL AND g.gate=? AND g.status IN ('passed','blocked') ORDER BY r.updated_at DESC,r.id DESC LIMIT 2`,[ns.ticket.id,Number(entry.gate)]);
            if(candidates.length===1 || (candidates.length===2 && candidates[0].updated_at>candidates[1].updated_at)) run=candidates[0];
          }
          const g=run?.outcome?await trace(t,run.id,entry.gate):null;
          if(run && run.updated_at<=now()-90*DAY)fail('source_expired',409);
          let lessonId=null,disposition='quarantine';
          if(ns && run && g) {
            const deps=await scopedFiles(t,ns,paths),stamp=now();
            lessonId=await t.insert(`INSERT INTO ai_lessons(ticket_id,run_id,owner_user_id,domain,folder_id,ingestion_key,input_hash,kind,state,payload_json,
              evidence_trace_id,evidence_hash,plan_hash,dependencies_json,created_at,review_due_at,import_batch) VALUES (?,?,?,?,?,?,?,'legacy','legacy',?,?,?,?,?,?,?,?)`,
            [ns.ticket.id,run.id,ns.owner,ns.domain,ns.folder,'legacy:'+digest([a.id,batch,entryKey]),fingerprint,JSON.stringify({text:body,files:paths,gate:Number(entry.gate),legacy_source:{entry_identity:digest([batch,entryKey]),run_inferred:!entry.run_id}}),
              g.id,digest([g.status,g.evidence_json,g.public_reason,run.evidence_json]),ns.ticket.plan_hash,JSON.stringify(deps),stamp,stamp+30*DAY,batch]);
            const row=await t.get('SELECT * FROM ai_lessons WHERE id=?',[lessonId]);await audit(t,row,'legacy_import',a.id);disposition='legacy';
          }
          // Quarantine retains only the mapping receipt. Original payload stays with the authorized importer.
          await t.insert(`INSERT INTO ai_lesson_imports(batch_key,entry_key,input_hash,actor_user_id,lesson_id,disposition,created_at,ended_at) VALUES (?,?,?,?,?,?,?,?)`,
            [batch,entryKey,fingerprint,a.id,lessonId,disposition,now(),disposition==='quarantine'?now():null]);
          out.push({entry_key:entryKey,lesson_id:lessonId,disposition});
        }
        return {entries:out};
      });
    },
    async rollbackImport(identity,batchKey) {
      return db.tx(async t=>{
        const a=await actor(t,identity),batch=key(batchKey);
        await t.get('SELECT pg_advisory_xact_lock(?)',[parseInt(digest([a.id,batch]).slice(0,12),16)]);
        const manifests=await t.all('SELECT * FROM ai_lesson_imports WHERE actor_user_id=? AND batch_key=? ORDER BY id',[a.id,batch]);
        let rolled_back=0,preserved=0;
        for(const m of manifests) {
          if(m.ended_at || !m.lesson_id)continue;
          const row=await authorized(t,a,m.lesson_id);
          if(row.version===1 && row.state==='legacy' && row.import_batch===batch) {
            await t.run("UPDATE ai_lessons SET state='deleted',ended_at=?,version=version+1 WHERE id=?",[now(),row.id]);
            await audit(t,{...row,version:2},'import_rollback',a.id);rolled_back++;
          } else preserved++;
          await t.run('UPDATE ai_lesson_imports SET ended_at=? WHERE id=?',[now(),m.id]);
        }
        return {rolled_back,preserved};
      });
    },
    async read(identity,lessonId) {
      await this.prune();
      return db.tx(async t=>{const a=await actor(t,identity),row=await authorized(t,a,lessonId);
        return {...view(row),eligibility_reason:await eligibility(t,row)};});
    },
    async history(identity,lessonId) {
      await this.prune();
      return db.tx(async t=>{const a=await actor(t,identity);await authorized(t,a,lessonId);
        return t.all('SELECT version,operation,actor_user_id,created_at FROM ai_lesson_audit WHERE lesson_id=? ORDER BY id',[id(lessonId)]);});
    },
    async list(identity) {
      await this.prune();
      return db.tx(async t=>{
        const a=await actor(t,identity);
        const rows=await t.all(`SELECT id FROM ai_lessons WHERE (?='admin' OR owner_user_id=?) ORDER BY created_at DESC LIMIT 100`,[a.role,a.id]);
        const out=[];
        for(const r of rows) { try { const row=await authorized(t,a,r.id);out.push({...view(row),eligibility_reason:await eligibility(t,row)}); }
          catch(error) {if(!(error instanceof WorkerContractError) || error.status!==403) throw error;} }
        return out;
      });
    },
    async review(identity,lessonId,input) {
      await this.prune();
      return db.tx(async t=>{
        const a=await actor(t,identity),row=await authorized(t,a,lessonId);
        if(Number(input.version)!==row.version) fail('stale_version',409);
        if(row.ended_at) fail('lesson_ended',409);
        const operation=String(input.operation || '');
        if(!['verify','promote','correct','reject','delete','curate','revalidate'].includes(operation)) fail('invalid_review_operation');
        if(['promote','curate'].includes(operation) && a.role!=='admin') fail('admin_required',403);
        if(operation==='verify' && !['proposed','legacy'].includes(row.state))fail('revalidation_required',409);
        if(operation==='revalidate' && !['verified','curated'].includes(row.state))fail('verification_required',409);
        if(operation==='revalidate' || (operation==='verify' && input.run_id)) {
          const ns=await namespace(t,row.ticket_id);
          const run=await t.get('SELECT * FROM ai_runs WHERE id=? AND ticket_id=?',[id(input.run_id),row.ticket_id]);
          const g=run ? await trace(t,run.id,input.gate):null;
          if(!run?.outcome || !g || g.status!=='passed' || run.id===row.run_id || run.updated_at<=Math.max(row.verified_at || 0,row.created_at)) fail('new_verification_required',409);
          row.run_id=run.id;row.evidence_trace_id=g.id;row.evidence_hash=digest([g.status,g.evidence_json,g.public_reason,run.evidence_json]);
          row.plan_hash=ns.ticket.plan_hash;row.dependencies_json=JSON.stringify(await scopedFiles(t,ns,parse(row.payload_json).files || []));
          row.payload_json=JSON.stringify({...parse(row.payload_json),gate:g.gate});
          if(row.kind==='observation')row.payload_json=JSON.stringify({...parse(row.payload_json),text:`Ticket ${row.ticket_id}, run ${run.id}: Gate ${g.gate} passed. ${String(g.public_reason || '').slice(0,180)}`});
        }
        if(['verify','promote','curate','revalidate'].includes(operation)) {
          const reason=await proof(t,row); if(reason) fail(reason,409);
          if(['promote','curate'].includes(operation) && !['verified','curated'].includes(row.state)) fail('verification_required',409);
          if(['promote','curate'].includes(operation) && await eligibility(t,row)) fail('revalidation_required',409);
        }
        let state=row.state, visibility=row.visibility,payload=row.payload_json,ended=null,verified=row.verified_at,due=row.review_due_at;
        if(operation==='verify' || operation==='revalidate') {state=state==='curated'?'curated':'verified';verified=now();due=now()+90*DAY;}
        if(operation==='promote') visibility='repository';
        if(operation==='curate') state='curated';
        if(operation==='correct') {state='proposed';visibility='private';payload=JSON.stringify({...parse(payload),text:text(input.text)});verified=null;due=now()+30*DAY;}
        if(operation==='reject' || operation==='delete') {state=operation==='reject'?'rejected':'deleted';visibility='private';ended=now();}
        await t.run(`UPDATE ai_lessons SET state=?,visibility=?,payload_json=?,version=version+1,ended_at=?,verified_at=?,review_due_at=?,
          run_id=?,evidence_trace_id=?,evidence_hash=?,plan_hash=?,dependencies_json=? WHERE id=?`,
          [state,visibility,payload,ended,verified,due,row.run_id,row.evidence_trace_id,row.evidence_hash,row.plan_hash,row.dependencies_json,row.id]);
        const updated=await t.get('SELECT * FROM ai_lessons WHERE id=?',[row.id]); await audit(t,updated,operation,a.id);
        return {...view(updated),eligibility_reason:await eligibility(t,updated)};
      });
    },
    async record(ticketId,input) {
      await this.prune();
      return db.tx(async t => {
        const ns = await namespace(t,ticketId,true);
        const run = await source(t,ns,input);
        if (!['observation','proposed'].includes(input.kind)) fail('invalid_lesson_kind');
        const paths=files(input.files), ingestion=key(input.ingestion_key);
        await rejectRetired(t,['record',ns.ticket.id,ingestion]);
        const submitted = input.kind === 'proposed' ? text(input.text) : null;
        const fingerprint=digest([run.id,input.kind,Number(input.gate)||null,submitted,paths]);
        const existing=await t.get('SELECT * FROM ai_lessons WHERE ticket_id=? AND ingestion_key=?',[ns.ticket.id,ingestion]);
        if(existing) { if(existing.input_hash!==fingerprint) fail('idempotency_conflict',409); return view(existing); }
        const g=await trace(t,run.id,input.gate);
        if(input.kind==='observation' && (!run.outcome || !g || g.status!=='passed')) fail('verified_evidence_required',409);
        const body=input.kind==='observation' ? `Ticket ${ns.ticket.id}, run ${run.id}: Gate ${g.gate} passed. ${String(g.public_reason || '').slice(0,180)}` : submitted;
        const state=input.kind==='observation' ? 'verified' : 'proposed';
        const stamp=now(),deps=await scopedFiles(t,ns,paths);
        const lessonId=await t.insert(`INSERT INTO ai_lessons(ticket_id,run_id,owner_user_id,domain,folder_id,ingestion_key,input_hash,kind,state,payload_json,
          evidence_trace_id,evidence_hash,plan_hash,dependencies_json,created_at,verified_at,review_due_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [ns.ticket.id,run.id,ns.owner,ns.domain,ns.folder,ingestion,fingerprint,input.kind,state,JSON.stringify({text:body,files:paths,gate:Number(input.gate)||null}),
          g?.id || null,g ? digest([g.status,g.evidence_json,g.public_reason,run.evidence_json]):null,ns.ticket.plan_hash || null,JSON.stringify(deps),stamp,state==='verified'?stamp:null,stamp+(state==='verified'?90:30)*DAY]);
        const row=await t.get('SELECT * FROM ai_lessons WHERE id=?',[lessonId]); await audit(t,row,'record'); return view(row);
      });
    },
    async recall(ticketId,input) {
      await this.prune();
      return db.tx(async t=> {
        const ns=await namespace(t,ticketId); lease(ns,input);
        const paths=files(input.files), words=String(input['keyword'] || '').toLowerCase().slice(0,300).split(/\W+/).filter(w=>w.length>3);
        const rows=await t.all(`SELECT * FROM ai_lessons WHERE domain=? AND repository='Tizia' AND state IN ('verified','curated')
          AND ((owner_user_id=? AND folder_id IS NOT DISTINCT FROM ?) OR visibility='repository') ORDER BY created_at DESC LIMIT 500 FOR SHARE`,[ns.domain,ns.owner,ns.folder]);
        const eligible=[];
        for(const row of rows) {
          if(await eligibility(t,row)) continue;
          const v=view(row), score=v.files.some(p=>paths.includes(p))?2:words.some(w=>v.text.toLowerCase().includes(w))?1:0;
          if(score) eligible.push({v,score});
        }
        return eligible.sort((a,b)=>b.score-a.score).slice(0,3).map(r=>r.v);
      });
    },
    async prune() {
      return db.tx(async t=>{
        await t.run('DELETE FROM ai_lesson_tombstones WHERE expires_at<=?',[now()]);
        const withdrawn=await t.all(`SELECT l.* FROM ai_lessons l LEFT JOIN ai_tickets q ON q.id=l.ticket_id
          LEFT JOIN requests r ON r.id=q.source_request_id LEFT JOIN users u ON u.id=r.owner_user_id
          LEFT JOIN ai_feature_folders f ON f.id=r.folder_id LEFT JOIN ai_runs v ON v.id=l.run_id
          LEFT JOIN ai_gate_traces g ON g.id=l.evidence_trace_id
          WHERE q.id IS NULL OR r.id IS NULL OR u.id IS NULL OR v.id IS NULL
            OR (l.evidence_trace_id IS NOT NULL AND g.id IS NULL) OR l.source_expires_at<=?
            OR r.owner_state<>'verified' OR r.owner_user_id IS DISTINCT FROM l.owner_user_id
            OR r.owner_domain IS DISTINCT FROM l.domain OR r.folder_id IS DISTINCT FROM l.folder_id
            OR (u.role<>'admin' AND u.enrolled_domain IS DISTINCT FROM l.domain)
            OR r.status IN ('cancelled','rejected') OR q.phase IN ('requester_cancelled','admin_rejected')
            OR (r.folder_id IS NOT NULL AND (f.id IS NULL OR f.state='archived' OR f.owner_user_id<>l.owner_user_id OR f.domain<>l.domain))
          ORDER BY l.id FOR UPDATE OF l`,[now()]);
        for(const row of withdrawn) {
          await retire(t,row,row.ended_at || now());
          await t.run('UPDATE ai_lesson_audit SET actor_user_id=NULL,ended_at=COALESCE(ended_at,?) WHERE lesson_id=?',[now(),row.id]);
          await t.run('DELETE FROM ai_lesson_imports WHERE lesson_id=?',[row.id]);
          await t.run('DELETE FROM ai_lessons WHERE id=?',[row.id]);
        }
        await t.run("UPDATE ai_lessons SET state='expired',ended_at=review_due_at,version=version+1 WHERE state IN ('proposed','legacy') AND review_due_at<=?",[now()]);
        // Expiry and audit share ended_at; a later payload sweep never restarts the metadata clock.
        await t.run(`UPDATE ai_lesson_audit SET ended_at=l.ended_at FROM ai_lessons l
          WHERE ai_lesson_audit.lesson_id=l.id AND l.ended_at IS NOT NULL`);
        await t.run(`UPDATE ai_lesson_imports SET ended_at=l.ended_at FROM ai_lessons l
          WHERE ai_lesson_imports.lesson_id=l.id AND l.ended_at IS NOT NULL AND ai_lesson_imports.ended_at IS NULL`);
        // Removing the authority row also removes owner/source identity; audit keeps no reconstructable payload.
        for(const row of await t.all('SELECT * FROM ai_lessons WHERE ended_at<=? ORDER BY id FOR UPDATE',[now()-30*DAY]))await retire(t,row,row.ended_at);
        for(const m of await t.all('SELECT * FROM ai_lesson_imports WHERE ended_at<=?',[now()-30*DAY]))await tombstone(t,['import',m.actor_user_id,m.batch_key,m.entry_key],m.ended_at+90*DAY);
        await t.run('DELETE FROM ai_lessons WHERE ended_at<=?',[now()-30*DAY]);
        await t.run('UPDATE ai_lesson_audit SET actor_user_id=NULL WHERE ended_at<=?',[now()-30*DAY]);
        await t.run('DELETE FROM ai_lesson_audit WHERE ended_at<=?',[now()-90*DAY]);
        await t.run('DELETE FROM ai_lesson_imports WHERE ended_at<=?',[now()-30*DAY]);
        return {ok:true};
      });
    },
    async maintenance(identity) {return db.tx(async t=>{const a=await actor(t,identity);if(a.role!=='admin')fail('admin_required',403);return this.prune();});},
  };
}
