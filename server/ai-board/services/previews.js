import { createHash, randomBytes } from 'node:crypto';

const hash = (value) => createHash('sha256').update(value).digest('hex');
const opaque = () => randomBytes(24).toString('hex');
const SHA = /^[a-f0-9]{40}$/;
export class PreviewError extends Error {
  constructor(status, code) { super(code); Object.assign(this, { status, code }); }
}
const deny = () => { throw new PreviewError(404, 'preview_not_found'); };
const closed = (binding) => ['cancelled','rejected'].includes(binding.status) || binding.root_status === 'cancelled'
  || ['admin_rejected','requester_cancelled'].includes(binding.root_phase);
const cleanupConfirmed = (state) => ['destroyed','expired','failed'].includes(state);
function entryPath(binding, sha) {
  let candidate;
  try { candidate=JSON.parse(binding.evidence_json).verdict?.candidate; } catch { return '/'; }
  if(candidate?.head_sha!==sha)return '/';
  const files=(candidate.commits||[]).flatMap(commit=>Array.isArray(commit.files)?commit.files:[]);
  const file=files.find(value=>typeof value==='string'&&/^public\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.html$/.test(value));
  return file?file.slice(6):'/';
}

/** provisioning is trusted worker code; candidate input never chooses a host, DSN or runner command. */
export function createPreviews({ repository, runtime, servingOrigin, previewOrigin, now = Date.now }) {
  const queues = new Map();
  const serving = new URL(servingOrigin).origin;
  const template = new URL(previewOrigin);
  if (!template.hostname.startsWith('preview.') || template.pathname !== '/' || template.search || template.hash
      || template.username || template.password || !['http:', 'https:'].includes(template.protocol)) {
    throw new TypeError('preview origin must be http(s)://preview.<dedicated-domain>[:port]');
  }
  // ponytail: local Docker only; public hosting needs a reviewed public-suffix-aware domain policy.
  // A different subdomain is not enough: candidate JS could plant parent-domain serving cookies.
  if (!['127.0.0.1', '[::1]'].includes(new URL(serving).hostname) || template.hostname !== 'preview.localhost') {
    throw new TypeError('preview currently requires serving on a loopback IP and preview.localhost');
  }
  const originFor = (id) => {
    if (!/^[a-f0-9]{48}$/.test(id)) deny();
    const url = new URL(template);
    url.hostname = `p${id}.${template.hostname.slice(8)}`;
    return url.origin;
  };
  async function authorized(p, user, active = true) {
    if (!p || !user) deny();
    const binding = await repository.binding(p.request_id, p.run_id);
    if (!binding || (user.role !== 'admin' && Number(binding.owner_user_id) !== Number(user.id))) deny();
    if (active && closed(binding)) deny();
    if (active && (p.expires_at <= now() || p.state !== 'ready')) throw new PreviewError(410, 'preview_expired');
    return binding;
  }
  async function runtimeState(p) {
    if (p.expires_at <= now()) return 'expired';
    if (!['ready','creating'].includes(p.state)) return p.state;
    try {
      const status = await runtime.status(p.runtime_id);
      if (['indeterminate','destroying'].includes(status.state)) return 'cleanup_unconfirmed';
      if (p.state==='creating') {
        if (['destroyed','expired','failed'].includes(status.state)) return 'failed';
        return ['creating','ready'].includes(status.state) && status.expires_at>now() && status.lease_expires_at>now() ? 'creating':'expired';
      }
      return status.state === 'ready' && status.expires_at > now() && status.lease_expires_at > now() ? 'ready' : 'expired';
    } catch { return 'unavailable'; }
  }
  return {
    servingOrigin: serving, originFor,
    async cancelRequest(requestId, user) {
      const request = await repository.request(requestId);
      if (!request || !user || user.role !== 'admin' && Number(request.owner_user_id) !== Number(user.id)) deny();
      let confirmed = true;
      for (const p of await repository.activeForRequest(requestId)) {
        await repository.revoke(p.id); // access revocation precedes asynchronous VM cleanup
        await repository.state(p.id, 'closing');
        let cleaned = false;
        try { cleaned = cleanupConfirmed((await runtime.destroy(p.runtime_id))?.state); } catch { /* keep uncertainty */ }
        await repository.state(p.id, cleaned ? 'closed' : 'cleanup_unconfirmed');
        confirmed &&= cleaned;
      }
      return { confirmed };
    },
    async latest(requestId, user) {
      const request = await repository.request(requestId);
      if (!request || !user || user.role !== 'admin' && Number(request.owner_user_id) !== Number(user.id)) deny();
      const p = await repository.latest(requestId);
      if (!p) return null;
      const binding = await authorized(p, user, false);
      return { id: p.id, run_id: p.run_id, state: closed(binding) && p.state !== 'closed' && p.state !== 'cleanup_unconfirmed' ? 'access_revoked' : await runtimeState(p), expires_at: p.expires_at, oracle_scope: p.oracle_scope,
        message: p.oracle_scope === 'smoke_only' ? 'Chỉ kiểm tra chạy cơ bản; chưa đủ để phát hành chức năng.' : 'Đã kiểm chứng chức năng theo phạm vi oracle của lượt này.' };
    },
    async publish({ requestId, runId, candidateSha, archive }) {
      if (!SHA.test(candidateSha) || !Buffer.isBuffer(archive) || !archive.length || archive.length > 64 * 1024 * 1024) {
        throw new PreviewError(400, 'invalid_preview_candidate');
      }
      const binding = await repository.binding(requestId, runId);
      if (!binding || closed(binding)) deny();
      let verdict;
      try { verdict = JSON.parse(binding.evidence_json).verdict; } catch { deny(); }
      const gate5 = verdict?.gates?.find((gate) => gate.gate === 5);
      const gate4 = verdict?.gates?.find((gate) => gate.gate === 4);
      const oracleUnavailable = verdict?.outcome === 'blocked' && verdict.failure_class === 'plan'
        && !verdict.candidate && gate4?.blocked === false && !gate5?.functional?.probe_id
        && gate5?.blocked === true && gate5?.functional?.passed === false
        && gate5?.functional?.reason === 'No trusted behavioral oracle for this request';
      if ((!oracleUnavailable && verdict?.candidate?.head_sha !== candidateSha) || gate5?.smoke_passed !== true
          || gate5.http_observed !== true || !['docker', 'microvm'].includes(gate5.runner)) {
        throw new PreviewError(409, 'preview_candidate_not_verified');
      }
      const archiveSha = hash(archive);
      const existing = await repository.forRun(requestId, runId);
      if (existing) {
        if (existing.candidate_sha !== candidateSha || existing.archive_sha !== archiveSha) throw new PreviewError(409, 'preview_candidate_changed');
        return existing;
      }
      const id = opaque();
      const p = { id, request_id: requestId, run_id: runId, candidate_sha: candidateSha, archive_sha: archiveSha,
        runtime_id: `preview-${id}`, state: 'creating', expires_at: now() + 15 * 60_000,
        oracle_scope: ['ready_for_pr', 'needs_review'].includes(verdict.outcome) && gate5.functional?.passed === true ? 'functional' : 'smoke_only' };
      await repository.insert(p); // durable before provisioning, so uncertain create is reconcilable
      try {
        const created = await runtime.create(p, archive);
        if (created?.test_session) await repository.session(id, created.test_session);
        if (created?.startup_sha) await repository.provenance(id, created.startup_sha, created.runner_policy_hash);
        await repository.state(id, 'ready');
        return { ...p, state: 'ready' };
      } catch {
        let cleaned = false;
        try { cleaned = cleanupConfirmed((await runtime.destroy(p.runtime_id))?.state); } catch { /* persisted uncertainty */ }
        await repository.state(id, cleaned ? 'failed' : 'cleanup_unconfirmed');
        throw new PreviewError(503, 'preview_unavailable');
      }
    },
    async metadata(requestId, runId, user) {
      const p = await repository.forRun(requestId, runId);
      const binding = await authorized(p, user, false);
      return { id: p.id, state: closed(binding) && p.state !== 'closed' && p.state !== 'cleanup_unconfirmed' ? 'access_revoked' : await runtimeState(p), candidate_sha: p.candidate_sha, expires_at: p.expires_at, oracle_scope: p.oracle_scope,
        message: p.oracle_scope === 'smoke_only' ? 'Chỉ kiểm tra chạy cơ bản; chưa đủ để phát hành chức năng.' : 'Đã kiểm chứng chức năng theo phạm vi oracle của lượt này.' };
    },
    async ticket(requestId, runId, user, origin) {
      if (origin !== serving) throw new PreviewError(403, 'invalid_origin');
      const p = await repository.forRun(requestId, runId);
      await authorized(p, user);
      if (await runtimeState(p) !== 'ready') throw new PreviewError(410, 'preview_expired');
      if (!user.token) deny();
      const token = opaque();
      await repository.grant({ token_hash: hash(token), preview_id: p.id, session_token: user.token, kind: 'boot', expires_at: now() + 30_000 });
      return { url: `${originFor(p.id)}/__preview_boot?ticket=${token}` };
    },
    async boot(id, ticket) {
      if (!/^[a-f0-9]{48}$/.test(ticket || '')) deny();
      const g = await repository.grantByHash(hash(ticket), now());
      if (!g || g.kind !== 'boot' || g.preview_id !== id) deny();
      const p = await repository.get(id);
      const binding=await authorized(p, { id: g.user_id, role: g.role });
      if (!(await repository.consume(hash(ticket), now()))) deny();
      const token = opaque();
      const session = JSON.parse(p.test_session_json || '{}');
      const cookies = session.token ? { tizia_sid: { value: session.token, expires: p.expires_at } } : {};
      await repository.grant({ token_hash: hash(token), preview_id: id, session_token: g.session_token, kind: 'access', expires_at: p.expires_at, cookies_json: JSON.stringify(cookies) });
      return { token, expires_at: p.expires_at, entry_path:entryPath(binding,p.candidate_sha) };
    },
    async http(id, token, request) {
      let queue = queues.get(id);
      if (!queue) { queue = { tail: Promise.resolve(), count: 0 }; queues.set(id, queue); }
      if (queue.count >= 32) throw new PreviewError(429, 'preview_busy');
      queue.count += 1;
      const task = queue.tail.then(() => send(id, token, request));
      queue.tail = task.catch(() => {});
      try { return await task; } finally { if (--queue.count === 0) queues.delete(id); }
    },
  };
  async function send(id, token, request) {
      if (!/^[a-f0-9]{48}$/.test(token || '')) deny();
      const g = await repository.grantByHash(hash(token), now());
      if (!g || g.kind !== 'access' || g.preview_id !== id) deny();
      const p = await repository.get(id);
      await authorized(p, { id: g.user_id, role: g.role });
      const status = await runtime.status(p.runtime_id);
      if (status.state !== 'ready' || status.expires_at <= now() || status.lease_expires_at <= now()) {
        await repository.state(id, 'expired');
        await repository.revoke(id);
        throw new PreviewError(410, 'preview_expired');
      }
      let jar;
      try { jar = Object.assign(Object.create(null), JSON.parse(g.cookies_json || '{}')); } catch { deny(); }
      const headers = { ...request.headers };
      // Only cookies created by this candidate for this grant. Serving/broker cookies never cross the VM boundary.
      headers.cookie = Object.entries(jar).filter(([, c]) => c.expires > now()).map(([name, c]) => `${name}=${c.value}`).join('; ');
      const result = await runtime.http(p.runtime_id, { ...request, headers });
      // Revocation/owner/role may change while a guest RPC is in flight. Never release its body on stale authority.
      const freshGrant = await repository.grantByHash(hash(token), now());
      if (!freshGrant || freshGrant.kind !== 'access' || freshGrant.preview_id !== id) deny();
      await authorized(await repository.get(id), { id: freshGrant.user_id, role: freshGrant.role });
      for (const [name, value] of result.headers) {
        if (name !== 'set-cookie') continue;
        const [pair, ...attributes] = value.split(';');
        const match = /^([!#$%&'*+.^_`|~0-9A-Za-z-]{1,128})=([^;\r\n]{0,4096})$/.exec(pair.trim());
        if (!match) continue;
        let expires = p.expires_at;
        for (const attr of attributes) {
          const [key, val] = attr.trim().split('=');
          if (key.toLowerCase() === 'max-age' && /^-?\d+$/.test(val)) expires = Math.min(expires, now() + Number(val) * 1000);
        }
        jar[match[1]] = { value: match[2], expires };
      }
      if (Object.entries(jar).length > 64) throw new PreviewError(502, 'preview_cookie_limit');
      await repository.cookies(hash(token), jar);
      return { ...result, headers: result.headers.filter(([name]) => name !== 'set-cookie') };
  }
}
