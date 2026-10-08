// PostgreSQL-compatible SQL; no preview data or cookie lives in the serving request payload.
export async function createPreviewRepository(db) {
  const get = (sql, ...args) => db.get ? db.get(sql, args) : db.prepare(sql).get(...args);
  const run = (sql, ...args) => db.run ? db.run(sql, args) : db.prepare(sql).run(...args);
  const all = (sql, ...args) => db.all ? db.all(sql, args) : db.prepare(sql).all(...args);
  await run(`CREATE TABLE IF NOT EXISTS ai_private_previews (
    id TEXT PRIMARY KEY, request_id BIGINT NOT NULL REFERENCES requests(id),
    run_id BIGINT NOT NULL REFERENCES ai_runs(id), candidate_sha TEXT NOT NULL,
    archive_sha TEXT NOT NULL, runtime_id TEXT NOT NULL UNIQUE,
    state TEXT NOT NULL, expires_at BIGINT NOT NULL, oracle_scope TEXT NOT NULL, test_session_json TEXT NOT NULL DEFAULT '{}',
    startup_sha TEXT, runner_policy_hash TEXT,
    UNIQUE(request_id, run_id, candidate_sha))`);
  await run(`CREATE TABLE IF NOT EXISTS ai_preview_grants (
    token_hash TEXT PRIMARY KEY, preview_id TEXT NOT NULL REFERENCES ai_private_previews(id),
    session_token TEXT NOT NULL REFERENCES sessions(token) ON DELETE CASCADE,
    kind TEXT NOT NULL, expires_at BIGINT NOT NULL, cookies_json TEXT NOT NULL DEFAULT '{}')`);
  const binding = (requestId, runId) => get(`SELECT q.id AS request_id, q.owner_user_id, q.status,
    r.id AS run_id, r.evidence_json, r.worker_id, root.status AS root_status, root.phase AS root_phase FROM ai_runs r
    JOIN ai_tickets t ON t.id=r.ticket_id JOIN requests q ON q.id=t.source_request_id
    LEFT JOIN ai_tickets root ON root.source_request_id=q.id AND root.kind='root' AND root.parent_id IS NULL
    WHERE q.id=? AND r.id=?`, requestId, runId);
  return {
    binding,
    request: (id) => get('SELECT id,owner_user_id,status FROM requests WHERE id=?', id),
    latest: (id) => get('SELECT * FROM ai_private_previews WHERE request_id=? ORDER BY expires_at DESC LIMIT 1', id),
    activeForRequest: (id) => all("SELECT * FROM ai_private_previews WHERE request_id=? AND state IN ('creating','ready','cleanup_unconfirmed')", id),
    get: (id) => get('SELECT * FROM ai_private_previews WHERE id=?', id),
    forRun: (requestId, runId) => get('SELECT * FROM ai_private_previews WHERE request_id=? AND run_id=?', requestId, runId),
    async insert(p) {
      await run(`INSERT INTO ai_private_previews
        (id,request_id,run_id,candidate_sha,archive_sha,runtime_id,state,expires_at,oracle_scope)
        VALUES (?,?,?,?,?,?,?,?,?)`, p.id, p.request_id, p.run_id, p.candidate_sha, p.archive_sha,
      p.runtime_id, p.state, p.expires_at, p.oracle_scope);
    },
    state: (id, state) => run('UPDATE ai_private_previews SET state=? WHERE id=?', state, id),
    session: (id, session) => run('UPDATE ai_private_previews SET test_session_json=? WHERE id=?', JSON.stringify(session), id),
    provenance: (id, startupSha, policyHash) => run('UPDATE ai_private_previews SET startup_sha=?,runner_policy_hash=? WHERE id=?', startupSha, policyHash, id),
    async grant(g) {
      await run(`INSERT INTO ai_preview_grants (token_hash,preview_id,session_token,kind,expires_at,cookies_json)
        VALUES (?,?,?,?,?,?)`, g.token_hash, g.preview_id, g.session_token, g.kind, g.expires_at, g.cookies_json || '{}');
    },
    grantByHash: (hash, now) => get(`SELECT g.*, s.user_id, u.role FROM ai_preview_grants g
      JOIN sessions s ON s.token=g.session_token JOIN users u ON u.id=s.user_id
      WHERE g.token_hash=? AND g.expires_at>? AND s.expires_at>?`, hash, now, now),
    // RETURNING makes consuming the one-time ticket atomic under concurrent HTTP requests.
    consume: (hash, now) => get(`DELETE FROM ai_preview_grants
      WHERE token_hash=? AND kind='boot' AND expires_at>? RETURNING *`, hash, now),
    cookies: (hash, jar) => run('UPDATE ai_preview_grants SET cookies_json=? WHERE token_hash=?', JSON.stringify(jar), hash),
    revoke: (id) => run('DELETE FROM ai_preview_grants WHERE preview_id=?', id),
  };
}
