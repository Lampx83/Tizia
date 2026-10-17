// Candidate rollout: a verified candidate is served locally only inside the envelope or after an admin approval bound to its exact base/head/scope/audience.
// A private preview grant never counts as approval; every decision is an appended row in ai_candidate_approvals.
import { asyncRoutes } from './async-routes.js';
import { getRelease, setReleaseStatus } from '../services/releases.js';

const AUDIENCES = ['owner_only', 'school'];
const SENSITIVE = [/^server\//, /^scripts\//, /^public\/js\/engine\//, /(^|\/)(auth|login|session|password|payment|billing|wallet|admin)/i,
  /^Dockerfile/, /^docker-compose/, /^\.github\//, /\.sql$/, /^package(-lock)?\.json$/];

const parse = (text) => { try { return JSON.parse(text); } catch { return null; } };

/** Pure envelope decision: `envelope` serves without review, `review` needs an admin approval, `blocked` can never be served. */
export function decide({ verdict, tier, audience, disagreement, observedBase = null }) {
  const candidate = verdict?.candidate;
  const gates = Array.isArray(verdict?.gates) ? verdict.gates : [];
  const files = (candidate?.commits || []).flatMap((commit) => commit.files || []);
  const reasons = [];
  if (!candidate?.head_sha || !candidate?.base_sha || !files.length) return { mode: 'blocked', reasons: ['no_candidate'], files };
  if (observedBase && observedBase !== candidate.base_sha) return { mode: 'blocked', reasons: ['base_changed'], files };
  const hardOk = gates.length > 0 && gates.every((g) => g.blocked === false) && gates.some((g) => g.gate === 4);
  const gate5 = gates.find((g) => g.gate === 5);
  const oracleOk = !!gate5 && gate5.smoke_passed === true && gate5.http_observed === true;
  if (!hardOk) reasons.push('hard_permissions_not_proven');
  if (!oracleOk) reasons.push('functional_oracle_not_proven');
  if (hardOk === false || oracleOk === false) return { mode: 'blocked', reasons, files };
  if (verdict.outcome !== 'ready_for_pr') reasons.push('verdict_needs_review');
  if (tier !== 'surface') reasons.push('tier_not_surface');
  if (audience !== 'owner_only') reasons.push('audience_expands');
  if (disagreement) reasons.push('validator_disagreement');
  const touched = files.filter((f) => SENSITIVE.some((rule) => rule.test(f)));
  if (touched.length) reasons.push(`sensitive_scope:${touched.slice(0, 3).join(',')}`);
  return { mode: reasons.length ? 'review' : 'envelope', reasons, files };
}

export function attachRolloutRoutes(router, { store, requireAuth, requireAdmin, requireStrictCsrf }) {
  const route = asyncRoutes(router), db = store.db;

  async function load(ticketId) {
    const ticket = await db.get("SELECT id, tier, source_request_id FROM ai_tickets WHERE id=? AND kind='root'", [ticketId]);
    if (!ticket) return null;
    const run = await db.get(`SELECT id, evidence_json FROM ai_runs WHERE ticket_id=? AND evidence_json LIKE '%"candidate"%' ORDER BY id DESC LIMIT 1`, [ticket.id]);
    const verdict = parse(run?.evidence_json)?.verdict ?? null;
    const folder = await db.get(`SELECT f.slug FROM requests r JOIN ai_feature_folders f ON f.id=r.folder_id WHERE r.id=?`, [ticket.source_request_id]);
    const release = folder ? await getRelease(db, folder.slug) : null;
    const disagreement = !!await db.get(`SELECT 1 FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id
      WHERE r.ticket_id=? AND g.gate=2.5 AND g.internal_reason LIKE 'validator_disagreement%' LIMIT 1`, [ticket.id]);
    const rows = await db.all('SELECT * FROM ai_candidate_approvals WHERE ticket_id=? ORDER BY id', [ticket.id]);
    const base = await store.latestBase();
    return { ticket, run, verdict, release, disagreement, rows, base };
  }

  const matches = (row, run, c) => row.run_id === run.id && row.base_sha === c.base_sha && row.head_sha === c.head_sha;
  const view = (s, audience = 'owner_only') => {
    const envelope = decide({ verdict: s.verdict, tier: s.ticket.tier, audience, disagreement: s.disagreement, observedBase: s.base?.sha });
    const c = s.verdict?.candidate;
    const current = c && s.run ? s.rows.filter((r) => matches(r, s.run, c)) : [];
    return {
      ticket_id: s.ticket.id, run_id: s.run?.id ?? null, candidate: c ? { base_sha: c.base_sha, head_sha: c.head_sha, branch: c.branch, files: envelope.files } : null,
      envelope, base: s.base ? { observed: s.base.sha, observed_at: s.base.observed_at, changed: !!c && s.base.sha !== c.base_sha } : null,
      release: s.release ? { slug: s.release.slug, status: s.release.status } : null,
      approvals: current.map((r) => ({ id: r.id, decision: r.decision, audience: r.audience, basis: r.basis, actor_user_id: r.actor_user_id, created_at: r.created_at, note: r.note })),
      stale_decisions: s.rows.length - current.length,
    };
  };
  const append = (s, decision, basis, audience, actor, reasons, note) => db.insert(
    `INSERT INTO ai_candidate_approvals(ticket_id, run_id, base_sha, head_sha, scope_json, audience, decision, basis, reasons_json, actor_user_id, note, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [s.ticket.id, s.run.id, s.verdict.candidate.base_sha, s.verdict.candidate.head_sha, JSON.stringify(decide({ verdict: s.verdict, tier: s.ticket.tier, audience, disagreement: s.disagreement, observedBase: s.base?.sha }).files),
      audience, decision, basis, JSON.stringify(reasons), actor, note ?? null, Date.now()]);
  const guard = async (req, res) => {
    const s = await load(Number(req.params.id));
    if (!s) { res.status(404).json({ error: 'ticket_not_found' }); return null; }
    if (!s.run || !s.verdict?.candidate) { res.status(409).json({ error: 'no_candidate' }); return null; }
    const head = req.body?.head_sha;
    if (head !== undefined && head !== s.verdict.candidate.head_sha) { res.status(409).json({ error: 'stale_candidate', head_sha: s.verdict.candidate.head_sha }); return null; }
    return s;
  };
  const audienceOf = (req) => (AUDIENCES.includes(req.body?.audience) ? req.body.audience : 'owner_only');

  route.get('/api/admin/ai-board/tickets/:id/rollout', requireAuth, requireAdmin, async (req, res) => {
    const s = await load(Number(req.params.id));
    if (!s) return res.status(404).json({ error: 'ticket_not_found' });
    res.json(view(s, AUDIENCES.includes(req.query.audience) ? req.query.audience : 'owner_only'));
  });

  route.post('/api/admin/ai-board/tickets/:id/rollout/approve', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    const s = await guard(req, res); if (!s) return;
    const audience = audienceOf(req);
    const d = decide({ verdict: s.verdict, tier: s.ticket.tier, audience, disagreement: s.disagreement, observedBase: s.base?.sha });
    if (d.mode === 'blocked') return res.status(409).json({ error: 'not_approvable', reasons: d.reasons });
    await append(s, 'approved', 'admin', audience, req.user.id, d.reasons, req.body?.note);
    res.json(view(await load(s.ticket.id), audience));
  });

  route.post('/api/admin/ai-board/tickets/:id/rollout/reject', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    const s = await guard(req, res); if (!s) return;
    await db.tx(async () => {
      await append(s, 'rejected', 'admin', audienceOf(req), req.user.id, ['rejected'], req.body?.note);
      if (s.release && s.release.status !== 'off') await setReleaseStatus(db, s.release.slug, 'off', req.user.id);
    });
    res.json(view(await load(s.ticket.id)));
  });

  route.post('/api/admin/ai-board/tickets/:id/rollout/serve', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    const s = await guard(req, res); if (!s) return;
    if (!s.release) return res.status(409).json({ error: 'no_release' });
    const audience = audienceOf(req);
    const d = decide({ verdict: s.verdict, tier: s.ticket.tier, audience, disagreement: s.disagreement, observedBase: s.base?.sha });
    if (d.mode === 'blocked') return res.status(409).json({ error: 'not_servable', reasons: d.reasons });
    const c = s.verdict.candidate;
    const mine = s.rows.filter((r) => matches(r, s.run, c));
    const last = mine.at(-1);
    const approved = mine.some((r) => r.decision === 'approved' && r.audience === audience)
      && !(last && ['rejected', 'withdrawn'].includes(last.decision));
    if (d.mode === 'review' && !approved) return res.status(403).json({ error: 'review_required', reasons: d.reasons });
    if (last?.decision === 'rejected') return res.status(403).json({ error: 'rejected_candidate' });
    await db.tx(async () => {
      await setReleaseStatus(db, s.release.slug, audience, req.user.id);
      await append(s, 'served', d.mode === 'envelope' ? 'envelope' : 'admin', audience, req.user.id, d.reasons, req.body?.note);
    });
    res.json(view(await load(s.ticket.id), audience));
  });

  route.post('/api/admin/ai-board/tickets/:id/rollout/reverify', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.requestReverify(Number(req.params.id), { adminUserId: req.user.id })); } catch (error) {
      if (error?.status && error?.code) return res.status(error.status).json({ error: error.code, message: error.message });
      throw error;
    }
  });

  route.post('/api/admin/ai-board/tickets/:id/rollout/withdraw', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    const s = await guard(req, res); if (!s) return;
    if (!s.release) return res.status(409).json({ error: 'no_release' });
    await db.tx(async () => {
      await setReleaseStatus(db, s.release.slug, 'owner_only', req.user.id);
      await append(s, 'withdrawn', 'admin', 'owner_only', req.user.id, ['withdrawn'], req.body?.note);
    });
    res.json(view(await load(s.ticket.id)));
  });
}
