import { recordSkillFlag } from '../security/skill-review.js';

export const CLAIM_LOCK = 45046;
export const ORIGIN = 'skill-edit';

// Repository for skill aggregates; SQL and transactions live here, business rules in services/skills.js.
export function createSkillRepository(db) {
  const one = (sql, args) => db.get(sql, args);
  const many = (sql, args) => db.all(sql, args);
  const exec = (sql, args) => db.run(sql, args);
  const lock = () => db.lockRow;

  return {
    tx: fn => db.tx(fn),
    recordFlag: args => recordSkillFlag(db, args),

    advisoryLock: () => one('SELECT pg_advisory_xact_lock(?)', [CLAIM_LOCK]),
    adminSession: (userId, token, now) => one(`SELECT u.role FROM users u JOIN sessions s ON s.user_id=u.id
      WHERE u.id=? AND s.token=? AND s.expires_at>? FOR SHARE OF u,s`, [userId, token, now]),
    hasActiveTicketLease: now => one('SELECT id FROM ai_tickets WHERE lease_owner IS NOT NULL AND lease_expires_at>? LIMIT 1', [now]),

    skillRow: id => one('SELECT * FROM ai_skills WHERE id=?', [id]),
    lockSkill: id => one(`SELECT id FROM ai_skills WHERE id=?${lock()}`, [id]),
    skillIdByName: name => one('SELECT id FROM ai_skills WHERE name=?', [name]),
    lockSkillByName: name => one(`SELECT * FROM ai_skills WHERE name=?${lock()}`, [name]),
    insertSkillIfAbsent: ({ name, taskTypes, actorId, now }) => exec(`INSERT INTO ai_skills(name,task_types_json,created_by,updated_by,created_at,updated_at)
      VALUES(?,?,?,?,?,?) ON CONFLICT(name) DO NOTHING`, [name, JSON.stringify(taskTypes), actorId, actorId, now, now]),
    touchSkill: (id, actorId, now) => exec('UPDATE ai_skills SET updated_by=?,updated_at=? WHERE id=?', [actorId, now, id]),
    activateSkill: (id, versionId, taskTypes, actorId, now) => exec(
      "UPDATE ai_skills SET status='approved',active_version_id=?,task_types_json=?,updated_by=?,updated_at=? WHERE id=?",
      [versionId, JSON.stringify(taskTypes), actorId, now, id]),
    disableSkill: (id, actorId, now) => exec("UPDATE ai_skills SET status='disabled',updated_by=?,updated_at=? WHERE id=?", [actorId, now, id]),
    approvedSkills: () => many(`SELECT s.*,v.approved_at,COALESCE(v.rewritten_text,v.original_text) AS text,v.task_types_json AS types FROM ai_skills s
      JOIN ai_skill_versions v ON v.id=s.active_version_id WHERE s.status='approved' ORDER BY s.id`),
    activeRows: (taskType, role) => many(`SELECT s.name,v.* FROM ai_skills s JOIN ai_skill_versions v ON v.id=s.active_version_id AND v.skill_id=s.id
      WHERE s.status='approved' AND v.approved_by IS NOT NULL AND (
        (?='gate4_review' AND jsonb_exists(s.task_types_json::jsonb,'review')) OR
        (?<>'gate4_review' AND NOT jsonb_exists(s.task_types_json::jsonb,'review') AND
          (jsonb_exists(s.task_types_json::jsonb,?) OR jsonb_exists(s.task_types_json::jsonb,'all'))))
      ORDER BY CASE WHEN jsonb_exists(s.task_types_json::jsonb,?) THEN 0 ELSE 1 END,s.name,s.id LIMIT 1`, [role, role, taskType, taskType]),
    listRows: () => many(`SELECT s.*,v.version,v.hash,v.token_count FROM ai_skills s LEFT JOIN ai_skill_versions v
      ON v.id=COALESCE(s.active_version_id,(SELECT MAX(id) FROM ai_skill_versions WHERE skill_id=s.id)) ORDER BY s.name LIMIT 200`),
    usageSpans: () => many(`SELECT s.run_id,s.span_id,s.events_json,r.outcome,t.source_request_id FROM ai_spans s
      JOIN ai_runs r ON r.id=s.run_id JOIN ai_tickets t ON t.id=r.ticket_id ORDER BY s.start_ms DESC LIMIT 2000`),

    versionRows: id => many('SELECT * FROM ai_skill_versions WHERE skill_id=? ORDER BY version DESC LIMIT 200', [id]),
    rewriteJobsOf: id => many('SELECT r.* FROM ai_skill_rewrites r JOIN ai_skill_versions v ON v.id=r.version_id WHERE v.skill_id=?', [id]),
    rewriteResultIds: id => many("SELECT parent_version_id AS src, MAX(id) AS id FROM ai_skill_versions WHERE skill_id=? AND origin='rewrite' GROUP BY parent_version_id", [id]),
    versionOf: (id, versionId, { locked = false } = {}) => one(`SELECT * FROM ai_skill_versions WHERE id=? AND skill_id=?${locked ? lock() : ''}`, [versionId, id]),
    versionById: id => one('SELECT * FROM ai_skill_versions WHERE id=?', [id]),
    versionWithSkill: id => one('SELECT v.*,s.name,s.task_types_json AS skill_types,s.active_version_id FROM ai_skill_versions v JOIN ai_skills s ON s.id=v.skill_id WHERE v.id=?', [id]),
    versionWithSkillName: id => one('SELECT v.*,s.name FROM ai_skill_versions v JOIN ai_skills s ON s.id=v.skill_id WHERE v.id=?', [id]),
    nextVersion: skillId => one('SELECT COALESCE(MAX(version),0)+1 AS n FROM ai_skill_versions WHERE skill_id=?', [skillId]),
    insertVersion: row => db.insert(`INSERT INTO ai_skill_versions(skill_id,version,task_types_json,original_text,hash,token_count,lint_json,parent_version_id,created_by,created_at,eval_json,proposal_id,proposal_source,proposal_reason)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [row.skillId, row.version, JSON.stringify(row.taskTypes), row.text, row.hash, row.tokenCount, JSON.stringify(row.lint),
      row.parentId, row.actorId, row.now, row.evaluation, row.proposalId, row.source, row.reason]),
    markApproved: (versionId, actorId, now) => exec('UPDATE ai_skill_versions SET approved_by=COALESCE(approved_by,?),approved_at=COALESCE(approved_at,?) WHERE id=?', [actorId, now, versionId]),
    markRejected: (versionId, actorId, now) => exec('UPDATE ai_skill_versions SET rejected_by=COALESCE(rejected_by,?),rejected_at=COALESCE(rejected_at,?) WHERE id=?', [actorId, now, versionId]),
    markOrigin: (versionId, origin) => exec('UPDATE ai_skill_versions SET origin=? WHERE id=?', [origin, versionId]),
    clearRewrite: versionId => exec('UPDATE ai_skill_versions SET rewritten_text=NULL,rewritten_hash=NULL,rewrite_lint_json=NULL WHERE id=?', [versionId]),
    parentTexts: () => many('SELECT id,COALESCE(rewritten_text,original_text) AS text FROM ai_skill_versions WHERE id IN (SELECT parent_version_id FROM ai_skill_versions WHERE proposal_id IS NOT NULL)'),

    rewriteJob: id => one('SELECT * FROM ai_skill_rewrites WHERE id=?', [id]),
    rewriteJobLocked: id => one(`SELECT * FROM ai_skill_rewrites WHERE id=?${lock()}`, [id]),
    rewriteStatusOf: versionId => one('SELECT status FROM ai_skill_rewrites WHERE version_id=?', [versionId]),
    rewriteByVersion: versionId => one(`SELECT * FROM ai_skill_rewrites WHERE version_id=?${lock()}`, [versionId]),
    rewriteIdStatusByVersion: versionId => one(`SELECT id,status FROM ai_skill_rewrites WHERE version_id=?${lock()}`, [versionId]),
    failQueuedRewrite: (jobId, now) => exec("UPDATE ai_skill_rewrites SET status='failed',error='rejected',finished_at=? WHERE id=?", [now, jobId]),
    insertRewriteRequest: (versionId, adminId, now) => exec('INSERT INTO ai_skill_rewrite_requests(version_id,admin_id,created_at) VALUES(?,?,?)', [versionId, adminId, now]),
    insertRewriteJob: (versionId, actorId, now, instructions) => exec('INSERT INTO ai_skill_rewrites(version_id,confirmed_by,confirmed_at,instructions,attempts) VALUES(?,?,?,?,0)', [versionId, actorId, now, instructions]),
    requeueRewrite: (jobId, { actorId, now, instructions, history }) => exec(`UPDATE ai_skill_rewrites SET status='queued',confirmed_by=?,confirmed_at=?,instructions=?,claim_token=NULL,claimed_at=NULL,
      finished_at=NULL,model=NULL,raw_response=NULL,error=NULL,usage_json=NULL,attempts=COALESCE(attempts,0)+1,history_json=? WHERE id=?`,
      [actorId, now, instructions, history, jobId]),
    rewriteRequestTimes: (column, value, since) => many(`SELECT created_at FROM ai_skill_rewrite_requests WHERE ${column}=? AND created_at>? ORDER BY created_at`, [value, since]),
    staleRewriteFail: (now, cutoff) => exec("UPDATE ai_skill_rewrites SET status='failed',error='worker_lost',finished_at=? WHERE status='running' AND claimed_at<?", [now, cutoff]),
    hasRunningRewrite: () => one("SELECT id FROM ai_skill_rewrites WHERE status='running' LIMIT 1"),
    hasPendingRewrite: () => one("SELECT id FROM ai_skill_rewrites WHERE status IN ('queued','running') LIMIT 1"),
    nextQueuedRewrite: () => one("SELECT * FROM ai_skill_rewrites WHERE status='queued' ORDER BY id LIMIT 1 FOR UPDATE SKIP LOCKED"),
    markRewriteRunning: (jobId, token, now) => exec("UPDATE ai_skill_rewrites SET status='running',claim_token=?,claimed_at=? WHERE id=?", [token, now, jobId]),
    runningRewriteClaim: id => one('SELECT id,status,claim_token FROM ai_skill_rewrites WHERE id=?', [id]),
    finishRewrite: (jobId, { status, error, now, model, raw, usage }) => exec(
      'UPDATE ai_skill_rewrites SET status=?,error=?,finished_at=?,model=?,raw_response=?,usage_json=? WHERE id=?',
      [status, error, now, model, raw, usage, jobId]),

    insertProposal: row => db.insert(`INSERT INTO skill_proposals(origin,gate_reached,outcome,request_ids,template_key,budget_json,created_at,updated_at)
      VALUES(?,?,?,?,?,?,?,?)`, [ORIGIN, 0, row.outcome, row.requestIds, row.templateKey, row.budget, row.now, row.now]),
    proposalRows: () => many(`SELECT p.id,p.outcome,p.request_ids,p.created_at,v.id AS version_id,v.version,v.parent_version_id,v.lint_json,v.eval_json,
        v.original_text,v.proposal_source,v.proposal_reason,s.id AS skill_id,s.name
      FROM skill_proposals p JOIN ai_skill_versions v ON v.proposal_id=p.id JOIN ai_skills s ON s.id=v.skill_id
      WHERE p.origin=? ORDER BY p.id DESC LIMIT 100`, [ORIGIN]),
    lockProposal: id => one(`SELECT * FROM skill_proposals WHERE id=? AND origin=?${lock()}`, [id, ORIGIN]),
    updateProposal: (id, outcome, budget, now) => exec('UPDATE skill_proposals SET outcome=?,budget_json=?,updated_at=? WHERE id=?', [outcome, budget, now, id]),
    acceptProposal: (id, now) => exec("UPDATE skill_proposals SET outcome='accepted',updated_at=? WHERE id=?", [now, id]),
    rejectProposal: (id, now) => exec("UPDATE skill_proposals SET outcome='rejected',updated_at=? WHERE id=?", [now, id]),
    staleRetroFail: (now, cutoff) => exec("UPDATE skill_proposals SET outcome='failed',updated_at=? WHERE origin=? AND outcome='retro_running' AND updated_at<?", [now, ORIGIN, cutoff]),
    hasPendingProposal: templateKey => one("SELECT id FROM skill_proposals WHERE origin=? AND template_key=? AND outcome='pending' LIMIT 1", [ORIGIN, templateKey]),
    hasRetroRunning: () => one("SELECT id FROM skill_proposals WHERE origin=? AND outcome='retro_running' LIMIT 1", [ORIGIN]),
    lastProposalMark: templateKey => one('SELECT MAX(created_at) AS at FROM skill_proposals WHERE origin=? AND template_key=?', [ORIGIN, templateKey]),
    skillRunsSince: (since, name) => many(`SELECT DISTINCT r.id AS run_id,r.outcome,r.failure_reason,t.source_request_id AS request_id FROM ai_spans sp
      JOIN ai_runs r ON r.id=sp.run_id JOIN ai_tickets t ON t.id=r.ticket_id
      WHERE r.created_at>=? AND sp.events_json LIKE ? ORDER BY r.id DESC LIMIT 50`, [since, `%"tizia.skill.name":"${name}"%`]),
    runErrorSpans: runId => many("SELECT DISTINCT name FROM ai_spans WHERE run_id=? AND status='error' ORDER BY name LIMIT 5", [runId]),
  };
}
