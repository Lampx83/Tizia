// Appeal of a guard flag: the original request, its flags and its verdict are never edited; the outcome and any corrected text live in ai_request_appeals.
import { asyncRoutes } from './async-routes.js';
import { checkIntake } from '../security/intake-guard.js';
import { checkLanguage } from '../language-guard.js';
import { LIMITS } from '../repositories/store-contract.js';
import { createAppealRepository } from '../repositories/appeals.js';

const text = (value, min, max) => {
  const s = String(value ?? '').trim();
  return s.length >= min && s.length <= max ? s : null;
};

function describe(tag) {
  const label = tag.slice('guard:'.length);
  if (label === 'human_review') return null;
  return label.startsWith('model_')
    ? { label, source: 'model', note: 'Bộ phân loại gắn tín hiệu tham khảo; không phải kết luận về ý định của bạn.' }
    : { label, source: 'lexicon', note: 'Câu chữ khớp từ điển chủ đề; hệ thống không kết luận về ý định của bạn.' };
}

export function attachAppealRoutes(router, { store, requireAuth, requireAdmin, requireStrictCsrf }) {
  const route = asyncRoutes(router), repo = createAppealRepository(store.db);
  const owned = async (req) => {
    const request = await repo.request(Number(req.params.id));
    if (!request || (req.user.role !== 'admin' && request.owner_user_id !== req.user.id)) return null;
    return request;
  };
  const flagsOf = async (ticketId) => (await repo.flagTags(ticketId))
    .map((r) => r.tag).filter((tag) => tag.startsWith('guard:'));
  const view = (a) => ({ id: a.id, request_id: a.request_id, status: a.status, version: a.version, reason: a.reason,
    proposed_title: a.proposed_title, proposed_detail: a.proposed_detail, flags: JSON.parse(a.flags_json),
    adjudication_reason: a.adjudication_reason, revision_request_id: a.revision_request_id, created_at: a.created_at, decided_at: a.decided_at });

  route.get('/api/requests/:id/flags', requireAuth, async (req, res) => {
    const request = await owned(req);
    if (!request) return res.status(404).json({ error: 'request_not_found' });
    const ticket = await repo.rootTicket(request.id);
    const tags = ticket ? await flagsOf(ticket.id) : [];
    const appeals = await repo.appealsOf(request.id);
    res.json({ request: { id: request.id, title: request.title, status: request.status },
      flagged: tags.includes('guard:human_review'), flags: tags.map(describe).filter(Boolean), appeals: appeals.map(view) });
  });

  route.post('/api/requests/:id/appeal', requireAuth, requireStrictCsrf, async (req, res) => {
    const request = await owned(req);
    if (!request || request.owner_user_id !== req.user.id) return res.status(404).json({ error: 'request_not_found' });
    const reason = text(req.body?.reason, 10, 1000);
    if (!reason) return res.status(400).json({ error: 'invalid_reason', message: 'Nêu lý do trong 10 đến 1000 ký tự.' });
    const proposed = req.body?.proposed_title || req.body?.proposed_detail
      ? { title: text(req.body.proposed_title, 4, 200), detail: text(req.body.proposed_detail, 0, 4000) ?? '' } : null;
    if (proposed && !proposed.title) return res.status(400).json({ error: 'invalid_revision' });
    const ticket = await repo.rootTicket(request.id);
    const tags = ticket ? await flagsOf(ticket.id) : [];
    if (!tags.includes('guard:human_review')) return res.status(409).json({ error: 'not_flagged', message: 'Yêu cầu này không bị gắn cờ.' });
    try {
      const id = await repo.tx(async () => {
        const appealId = await repo.insertAppeal({ requestId: request.id, ticketId: ticket.id, ownerUserId: req.user.id, reason,
          proposedTitle: proposed?.title ?? null, proposedDetail: proposed?.detail ?? null, flagsJson: JSON.stringify(tags.map(describe).filter(Boolean)) });
        await repo.event(ticket.id, 'appeal_filed', { type: 'user', id: req.user.id }, { appeal_id: appealId }, `appeal-filed:${appealId}`);
        return appealId;
      });
      res.json({ ok: true, appeal: view(await repo.appealRow(id)) });
    } catch (error) {
      if (error.code === '23505') return res.status(409).json({ error: 'appeal_pending', message: 'Đã có kháng nghị đang chờ xử lý.' });
      throw error;
    }
  });

  route.get('/api/admin/ai-board/appeals', requireAuth, requireAdmin, async (req, res) => {
    const status = ['pending', 'corrected', 'upheld'].includes(req.query.status) ? req.query.status : 'pending';
    const rows = await repo.listByStatus(status);
    res.json({ appeals: rows.map((a) => ({ ...view(a), request_title: a.request_title, request_detail: a.request_detail, owner_user_id: a.owner_user_id })) });
  });

  route.post('/api/admin/ai-board/appeals/:id/adjudicate', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    const body = req.body || {};
    const reason = text(body.reason, 10, 1000);
    if (!['upheld', 'corrected'].includes(body.decision) || !reason) return res.status(400).json({ error: 'invalid_adjudication' });
    const appeal = await repo.appealRow(Number(req.params.id));
    if (!appeal) return res.status(404).json({ error: 'appeal_not_found' });
    if (Number(body.version) !== appeal.version) return res.status(409).json({ error: 'version_conflict' });
    if (appeal.status !== 'pending') return res.status(409).json({ error: 'appeal_decided' });
    let revisionId = null;
    if (body.decision === 'corrected') {
      const title = text(body.corrected_title ?? appeal.proposed_title, 4, 200);
      const detail = text(body.corrected_detail ?? appeal.proposed_detail ?? '', 0, 4000);
      if (!title || detail === null) return res.status(400).json({ error: 'corrected_text_required' });
      if (checkLanguage(title, detail).block || checkIntake(title, detail).block) return res.status(422).json({ error: 'corrected_text_blocked' });
      const original = await repo.requestFull(appeal.request_id);
      if (await store.countPendingRoots(appeal.owner_user_id, `appeal-${appeal.id}`) >= LIMITS.pending_roots_per_user.value) {
        return res.status(429).json({ error: 'owner_quota_full', message: 'Người gửi đã đủ số yêu cầu chờ; kháng nghị không tăng hạn mức.' });
      }
      const created = await store.createRequestWithRoot({ ownerUserId: appeal.owner_user_id, ownerDomain: original.owner_domain || original.domain,
        ownerDisplayName: original.student, idempotencyKey: `appeal-${appeal.id}`, type: original.type, title, detail,
        attachments: [], folderId: original.folder_id, clarifying: false });
      revisionId = created.request_id;
    }
    const done = await repo.decide({ decision: body.decision, adjudicatorId: req.user.id, reason, revisionId, id: appeal.id, version: appeal.version });
    if (!done.changes) return res.status(409).json({ error: 'version_conflict' });
    await repo.event(appeal.ticket_id, 'appeal_adjudicated', { type: 'admin', id: req.user.id }, { appeal_id: appeal.id, decision: body.decision, revision_request_id: revisionId }, `appeal-decided:${appeal.id}`);
    res.json({ ok: true, appeal: view(await repo.appealRow(appeal.id)) });
  });
}
