import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createPreviews } from '../server/ai-board/services/previews.js';
import { previewGateway } from '../server/ai-board/api/previews.js';
import { createPreviewRuntime } from '../server/ai-board/services/preview-runtime.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

test('trusted startup compiles separately from its import-path preamble', async (t) => {
  const directory=await fs.mkdtemp(path.join(os.tmpdir(),'preview-startup-'));
  let startup;
  const runtime=createPreviewRuntime({url:'http://runner.invalid',token:'synthetic',archiveDir:directory,
    fetchImpl:async(url,options)=>{
      const body=options.headers['Content-Type']==='application/json'&&options.body?JSON.parse(options.body):{};
      let value={policy_hash:'fixture'};
      if(String(url).endsWith('/exec')) {
        if(body.argv[0]==='python3')startup=body.argv[2];
        value={code:0,stdout:JSON.stringify({state:'ready',test_session:{token:'a'.repeat(64)}})};
      }
      return {ok:true,json:async()=>value};
    }});
  try {
    await runtime.create({id:'fixture',runtime_id:'fixture'},Buffer.from('fixture'));
    const python=process.platform==='win32'?path.resolve('ai-board/harness/.venv/Scripts/python.exe'):'python3';
    const checked=spawnSync(python,['-c',"import ast,sys; tree=ast.parse(sys.stdin.read()); source=tree.body[2].value.args[0].args[0].value; compile(source,'preview_guest.py','exec')"],{input:startup,encoding:'utf8'});
    if(checked.error?.code==='ENOENT')return t.skip('python3 not installed');
    assert.equal(checked.status,0,checked.stderr);
  } finally {await fs.rm(directory,{recursive:true,force:true});}
});

function fixture() {
  const previews = new Map(), grants = new Map(); let time = Date.now();
  const sessions = new Map([['owner', { user_id: 1, role: 'student' }], ['admin', { user_id: 9, role: 'admin' }]]);
  const binding = { request_id: 1, owner_user_id: 1, status: 'pending', run_id: 2,
    evidence_json: JSON.stringify({ verdict: { outcome: 'ready_for_pr', candidate: { head_sha: 'a'.repeat(40) },
      gates: [{ gate: 5, runner: 'docker', smoke_passed: true, http_observed: true, functional: { passed: true } }] } }) };
  const repository = {
    request: async (id) => id === 1 ? { id:1, owner_user_id:binding.owner_user_id, status:binding.status } : null,
    latest: async (id) => [...previews.values()].find((p) => p.request_id === id),
    activeForRequest: async (id) => [...previews.values()].filter((p) => p.request_id===id && ['creating','ready','cleanup_unconfirmed'].includes(p.state)),
    binding: async (r, run) => r === 1 && run === 2 ? binding : null,
    get: async (id) => previews.get(id), forRun: async (r, run) => [...previews.values()].find((p) => p.request_id === r && p.run_id === run),
    insert: async (p) => previews.set(p.id, p), state: async (id, state) => { previews.get(id).state = state; },
    grant: async (g) => grants.set(g.token_hash, g),
    grantByHash: async (h, now) => { const g = grants.get(h); return g && g.expires_at > now && sessions.has(g.session_token) ? { ...g, ...sessions.get(g.session_token) } : null; },
    consume: async (h, now) => { const g = grants.get(h); if (!g || g.kind !== 'boot' || g.expires_at <= now) return null; grants.delete(h); return g; },
    cookies: async (h, jar) => { grants.get(h).cookies_json = JSON.stringify(jar); },
    revoke: async (id) => { for (const [h, g] of grants) if (g.preview_id === id) grants.delete(h); },
  };
  const calls = []; let inFlight = 0, maxInFlight = 0;
  const runtime = {
    create: async () => {}, destroy: async () => ({state:'destroyed'}),
    status: async () => ({ state: 'ready', expires_at: time + 900_000, lease_expires_at: time + 120_000 }),
    http: async (_id, request) => {
      calls.push(request); maxInFlight = Math.max(maxInFlight, ++inFlight);
      await new Promise((resolve) => setTimeout(resolve, 5)); inFlight -= 1;
      return { status: 200, headers: [['content-type', 'text/html'], ['set-cookie', 'tizia_sid=synthetic; Domain=serving.invalid; Path=/'],
        ['set-cookie', 'preview_access=attacker; Domain=serving.invalid']], body: Buffer.from('<h1>candidate</h1>').toString('base64') };
    },
  };
  const service = createPreviews({ repository, runtime, servingOrigin: 'http://127.0.0.1:8041', previewOrigin: 'http://preview.localhost:8999', now: () => time });
  return { service, repository, runtime, binding, sessions, calls, time: (value) => { time = value; }, max: () => maxInFlight };
}
const owner = { id: 1, role: 'student', token: 'owner' };
test('boot lands on the exact verified changed HTML page, never a caller path or traversal',async()=>{
  for(const [file,wanted] of [['public/404.html','/404.html'],['public/../../host.html','/'],['public//evil.html','/']]) {
    const f=fixture();const evidence=JSON.parse(f.binding.evidence_json);evidence.verdict.candidate.commits=[{files:[file]}];
    f.binding.evidence_json=JSON.stringify(evidence);
    const {grant}=await open(f);assert.equal(grant.entry_path,wanted);
  }
});
test('interrupted provisioning reflects confirmed VM failure or uncertain cleanup, never infers candidate readiness',async()=>{
  const f=fixture();const {p}=await open(f);await f.repository.state(p.id,'creating');
  assert.equal((await f.service.metadata(1,2,owner)).state,'creating');
  f.runtime.status=async()=>({state:'destroyed'});assert.equal((await f.service.metadata(1,2,owner)).state,'failed');
  f.runtime.status=async()=>({state:'indeterminate'});assert.equal((await f.service.metadata(1,2,owner)).state,'cleanup_unconfirmed');
});
async function open(f, user = owner) {
  const p = await f.service.publish({ requestId: 1, runId: 2, candidateSha: 'a'.repeat(40), archive: Buffer.from('fixture-archive') });
  const ticket = new URL((await f.service.ticket(1, 2, user, 'http://127.0.0.1:8041')).url);
  const grant = await f.service.boot(p.id, ticket.searchParams.get('ticket'));
  return { p, ticket, grant };
}

test('owner/admin tickets are bound to exact request/run and serving origin; one-time boot is atomic', async () => {
  const f = fixture(); const { p, ticket } = await open(f);
  await assert.rejects(f.service.ticket(1, 2, { id: 2, role: 'student', token: 'owner' }, 'http://127.0.0.1:8041'), { status: 404 });
  await assert.rejects(f.service.ticket(1, 3, owner, 'http://127.0.0.1:8041'), { status: 404 });
  await assert.rejects(f.service.ticket(1, 2, owner, f.service.originFor(p.id)), { status: 403 });
  await assert.rejects(f.service.boot(p.id, ticket.searchParams.get('ticket')), { status: 404 });
  assert.equal((await f.service.metadata(1, 2, { id: 9, role: 'admin' })).oracle_scope, 'functional');
  const next = new URL((await f.service.ticket(1, 2, owner, 'http://127.0.0.1:8041')).url);
  const boots = await Promise.allSettled([f.service.boot(p.id, next.searchParams.get('ticket')), f.service.boot(p.id, next.searchParams.get('ticket'))]);
  assert.equal(boots.filter((b) => b.status === 'fulfilled').length, 1);
});

test('admin/root rejection immediately denies content; owner cancellation revokes before confirmed VM cleanup', async () => {
  const f=fixture();const {p,grant}=await open(f);
  const request={method:'GET',path:'/',headers:{}};
  f.binding.root_phase='admin_rejected';
  assert.equal((await f.service.metadata(1,2,owner)).state,'access_revoked');
  await assert.rejects(f.service.http(p.id,grant.token,request),{status:404});
  f.binding.root_phase='awaiting_pr';f.binding.status='rejected';
  await assert.rejects(f.service.http(p.id,grant.token,request),{status:404});
  f.binding.status='pending';
  assert.deepEqual(await f.service.cancelRequest(1,owner),{confirmed:true});
  assert.equal((await f.service.metadata(1,2,owner)).state,'closed');
  await assert.rejects(f.service.http(p.id,grant.token,request),{status:404});
});

test('indeterminate cleanup is persisted as unconfirmed and in-flight response rechecks revoked serving authority', async () => {
  const f=fixture();const {p,grant}=await open(f);
  let release, entered;
  const started=new Promise((resolve)=>{entered=resolve;});
  f.runtime.http=async()=>{entered();return new Promise((resolve)=>{release=resolve;});};
  const pending=f.service.http(p.id,grant.token,{method:'GET',path:'/',headers:{}});
  await started;f.sessions.delete('owner');
  release({status:200,headers:[],body:Buffer.from('revoked body must not escape').toString('base64')});
  await assert.rejects(pending,{status:404});
  f.runtime.destroy=async()=>({state:'indeterminate'});
  assert.deepEqual(await f.service.cancelRequest(1,owner),{confirmed:false});
  assert.equal((await f.repository.get(p.id)).state,'cleanup_unconfirmed');
});

test('rightful owner can read creating/failed/expired metadata while direct content stays denied', async () => {
  const f = fixture(); const { p } = await open(f);
  await f.repository.state(p.id,'creating');
  assert.equal((await f.service.latest(1,owner)).state,'creating');
  await assert.rejects(f.service.ticket(1,2,owner,'http://127.0.0.1:8041'),{status:410});
  await f.repository.state(p.id,'cleanup_unconfirmed');
  assert.equal((await f.service.latest(1,owner)).state,'cleanup_unconfirmed');
  await assert.rejects(f.service.latest(1,{id:2,role:'student'}),{status:404});
  await f.repository.state(p.id,'ready'); f.time(p.expires_at+1);
  assert.equal((await f.service.latest(1,owner)).state,'expired');
});

test('oracle-unavailable artifact has smoke-only label and never upgrades blocked verdict or a failed known oracle', async () => {
  const verdict = {outcome:'blocked',failure_class:'plan',candidate:null,gates:[{gate:4,blocked:false},
    {gate:5,blocked:true,runner:'docker',smoke_passed:true,http_observed:true,
      functional:{probe_id:null,passed:false,reason:'No trusted behavioral oracle for this request'}}]};
  const f=fixture(); f.binding.evidence_json=JSON.stringify({verdict});
  const p=await f.service.publish({requestId:1,runId:2,candidateSha:'a'.repeat(40),archive:Buffer.from('private artifact')});
  assert.equal(p.oracle_scope,'smoke_only');
  assert.deepEqual(JSON.parse(f.binding.evidence_json).verdict,verdict);
  for (const mode of ['known_oracle_failed','scope_failed','critical']) {
    const next=fixture();const denied=structuredClone(verdict);
    if (mode==='known_oracle_failed') denied.gates[1].functional.probe_id='known-probe';
    if (mode==='scope_failed') denied.gates[0].blocked=true;
    if (mode==='critical') denied.failure_class='critical';
    next.binding.evidence_json=JSON.stringify({verdict:denied});
    await assert.rejects(next.service.publish({requestId:1,runId:2,candidateSha:'a'.repeat(40),archive:Buffer.from('private artifact')}),{status:409});
  }
});

test('candidate cookies remain server-side per grant; parallel assets run sequentially and serving cookies never enter VM', async () => {
  const f = fixture(); const { p, grant } = await open(f);
  const request = { method: 'GET', path: '/', headers: { cookie: 'tizia_sid=REAL-SERVING; preview_access=REAL-GRANT' } };
  const replies = await Promise.all(Array.from({ length: 8 }, () => f.service.http(p.id, grant.token, request)));
  assert.equal(f.max(), 1);
  assert.equal(f.calls[0].headers.cookie, '');
  assert.match(f.calls[1].headers.cookie, /tizia_sid=synthetic/);
  assert.ok(f.calls.every((c) => !c.headers.cookie.includes('REAL-')));
  assert.ok(replies.every((r) => r.headers.every(([name]) => name !== 'set-cookie')));
  f.sessions.delete('owner');
  await assert.rejects(f.service.http(p.id, grant.token, request), { status: 404 });
});

test('reload of service preserves grants but ownership change, cancellation and expiry fail closed', async () => {
  const f = fixture(); const { p, grant } = await open(f);
  const restarted = createPreviews({ repository: f.repository, runtime: f.runtime, servingOrigin: 'http://127.0.0.1:8041', previewOrigin: 'http://preview.localhost:8999' });
  assert.equal((await restarted.http(p.id, grant.token, { method: 'GET', path: '/', headers: {} })).status, 200);
  f.binding.owner_user_id = 2;
  await assert.rejects(restarted.http(p.id, grant.token, { method: 'GET', path: '/', headers: {} }), { status: 404 });
  f.binding.owner_user_id = 1; f.binding.status = 'cancelled';
  await assert.rejects(restarted.http(p.id, grant.token, { method: 'GET', path: '/', headers: {} }), { status: 404 });
  f.binding.status = 'pending'; f.time(p.expires_at + 1);
  await assert.rejects(f.service.http(p.id, grant.token, { method: 'GET', path: '/', headers: {} }), { status: 404 });
});

test('actual HTTP gateway validates Host, Origin and boot refresh; does not expose candidate cookies', async () => {
  const f = fixture(); const { p, grant } = await open(f);
  const server = http.createServer(previewGateway(f.service));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const host = new URL(f.service.originFor(p.id)).host;
  const headers = { Host: host, Cookie: `preview_access=${grant.token}; tizia_sid=SERVING` };
  const call = (path, extra = {}, method = 'GET') => new Promise((resolve, reject) => {
    const req = http.request(base + path, { method, headers: { ...headers, ...extra } }, (res) => {
      const chunks = []; res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, text: Buffer.concat(chunks).toString() }));
    }); req.on('error', reject); req.end();
  });
  try {
    const ok = await call('/'); assert.equal(ok.status, 200);
    assert.equal(ok.text, '<h1>candidate</h1>'); assert.equal(ok.headers['set-cookie'], undefined);
    assert.equal((await call('/', { Host: host + '.attacker.invalid' })).status, 404);
    assert.equal((await call('/api/write', {}, 'POST')).status, 403);
    assert.equal((await call('/__preview_boot?ticket=' + 'a'.repeat(48), { 'Sec-Fetch-Site': 'same-origin' })).status, 403);
    assert.match(ok.headers['content-security-policy'], /connect-src 'self'/);
  } finally { await new Promise((resolve) => server.close(resolve)); }
});
