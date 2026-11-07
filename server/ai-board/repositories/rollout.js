import { getRelease, setReleaseStatus } from '../services/releases.js';

// SQL cho vòng phát hành ứng viên: ticket, lượt chạy, cổng validator, feature folder, và ai_candidate_approvals (append-only).
export function createRolloutRepository(db) {
  const one = (sql, args) => db.get(sql, args);
  const many = (sql, args) => db.all(sql, args);

  return {
    tx: fn => db.tx(fn),
    rootTicket: id => one("SELECT id, tier, source_request_id FROM ai_tickets WHERE id=? AND kind='root'", [id]),
    candidateRun: ticketId => one(`SELECT id, evidence_json FROM ai_runs WHERE ticket_id=? AND evidence_json LIKE '%"candidate"%' ORDER BY id DESC LIMIT 1`, [ticketId]),
    folderSlug: requestId => one('SELECT f.slug FROM requests r JOIN ai_feature_folders f ON f.id=r.folder_id WHERE r.id=?', [requestId]),
    getRelease: slug => getRelease(db, slug),
    setReleaseStatus: (slug, status, actorId) => setReleaseStatus(db, slug, status, actorId),
    hasDisagreement: ticketId => one(`SELECT 1 FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id
      WHERE r.ticket_id=? AND g.gate=2.5 AND g.internal_reason LIKE 'validator_disagreement%' LIMIT 1`, [ticketId]),
    approvals: ticketId => many('SELECT * FROM ai_candidate_approvals WHERE ticket_id=? ORDER BY id', [ticketId]),
    appendApproval: r => db.insert(
      `INSERT INTO ai_candidate_approvals(ticket_id, run_id, base_sha, head_sha, scope_json, audience, decision, basis, reasons_json, actor_user_id, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [r.ticketId, r.runId, r.baseSha, r.headSha, r.scopeJson, r.audience, r.decision, r.basis, r.reasonsJson, r.actorId, r.note ?? null, r.now]),
  };
}
