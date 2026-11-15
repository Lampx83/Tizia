// Human decision audit on the board DB: admin writes (signed identity) and the one trail read by admin/owner.
const ACTIONS = new Set(['approve', 'reject', 'defer', 'priority']);
const COLUMNS = 'id, request_id, decided_by, model, action, status_applied, reason, public_note, priority_score, confidence, created_at';

export function attachHumanDecisions(router, { db, requireAuth, requireAdmin }) {
  const forRequest = (id) => db.all(`SELECT ${COLUMNS} FROM ai_decisions WHERE request_id=? ORDER BY created_at DESC, id DESC`, [id]);

  router.post('/api/admin/ai-board/requests/:requestId/decisions', requireAuth, requireAdmin, async (req, res) => {
    const requestId = Number(req.params.requestId);
    const { action, status, reason, public_note: note } = req.body || {};
    if (!Number.isInteger(requestId) || requestId <= 0 || !ACTIONS.has(action)) return res.status(400).json({ error: 'invalid_decision' });
    if (!await db.get('SELECT 1 AS ok FROM requests WHERE id=?', [requestId])) return res.status(404).json({ error: 'request_not_found' });
    const key = String(req.get('idempotency-key') || req.body?.idempotency_key || '').trim().slice(0, 120) || null;
    const row = await db.get(`INSERT INTO ai_decisions(request_id, decided_by, action, status_applied, reason, public_note, priority_score, confidence, created_at, actor_user_id, idempotency_key)
      VALUES (?, 'human', ?, ?, ?, ?, 100, 1.0, ?, ?, ?)
      ON CONFLICT (request_id, idempotency_key) WHERE idempotency_key IS NOT NULL DO NOTHING RETURNING id`,
    [requestId, action, status ? String(status).slice(0, 20) : null, String(reason || '').slice(0, 300),
      String(note || '').slice(0, 500), Date.now(), req.user.id, key]);
    if (row) return res.json({ ok: true, id: Number(row.id), duplicate: false });
    const prior = await db.get('SELECT id FROM ai_decisions WHERE request_id=? AND idempotency_key=?', [requestId, key]);
    res.json({ ok: true, id: Number(prior.id), duplicate: true });
  });

  router.get('/api/admin/ai-board/requests/:requestId/decisions', requireAuth, requireAdmin, async (req, res) => {
    res.json({ decisions: await forRequest(Number(req.params.requestId)) });
  });

  router.get(['/api/admin/ai-board/decisions', '/api/ai-decisions'], requireAuth, requireAdmin, async (req, res) => {
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 500);
    const decisions = await db.all(`SELECT ${COLUMNS} FROM ai_decisions ORDER BY created_at DESC, id DESC LIMIT ?`, [limit]);
    res.json({ decisions, total: Number((await db.get('SELECT COUNT(*) AS n FROM ai_decisions')).n) });
  });

  router.get('/api/requests/:id/decisions', requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    const owner = await db.get('SELECT owner_user_id FROM requests WHERE id=?', [id]);
    if (!owner) return res.status(404).json({ error: 'not_found' });
    if (req.user.role !== 'admin' && Number(owner.owner_user_id) !== req.user.id) return res.status(403).json({ error: 'forbidden' });
    res.json({ decisions: await forRequest(id) });
  });
}
