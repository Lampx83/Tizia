// SQL cho ai_eval_tasks / ai_pull_requests; quy tắc chọn task và retire nằm ở services/eval-tasks.js.
const RUN = `
  SELECT r.id, r.ticket_id, r.plan_hash, r.evidence_json, q.id AS request_id, q.type, q.title, q.detail, q.clarified_spec
  FROM ai_runs r JOIN ai_tickets t ON t.id = r.ticket_id JOIN requests q ON q.id = t.source_request_id WHERE r.id=?`;
const PASSING = "('ready_for_pr', 'needs_review')";

export function createEvalTaskRepository(db) {
  const many = (sql, args) => db.all(sql, args);
  const one = (sql, args) => db.get(sql, args);
  const exec = (sql, args) => db.run(sql, args);
  const prNumber = () => db.jsonNum('r.evidence_json', 'pull_request.number');

  return {
    tx: fn => db.tx(fn),

    runRow: id => one(RUN, [Number(id)]),
    planJson: (ticketId, planHash) => one('SELECT plan_json FROM ai_plans WHERE root_ticket_id=? AND plan_hash=?', [ticketId, planHash]),
    latestRequestRun: (requestId, undo) => one(`
      SELECT r.id FROM ai_runs r JOIN ai_tickets t ON t.id = r.ticket_id AND t.parent_id IS NULL
      WHERE t.source_request_id=? AND r.outcome ${undo ? `IN ${PASSING}` : "= 'blocked'"}
      ORDER BY r.id DESC LIMIT 1
    `, [Number(requestId)]),
    insertTask: r => exec(`
      INSERT INTO ai_eval_tasks(source, trigger, request_id, run_id, request_text, clarified_spec, base_sha,
        gate, failure_class, skill, expected_files, status, created_at, labelled_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT DO NOTHING
    `, [r.source, r.trigger, r.requestId, r.runId, r.requestText, r.clarifiedSpec, r.baseSha, r.gate, r.failureClass, r.skill,
      r.expectedFiles, r.status, r.now, r.labelledAt]),

    retireOlderThan: (cutoff, now) => exec(`UPDATE ai_eval_tasks SET status='retired', retired_at=? WHERE status != 'retired' AND created_at < ?`, [now, cutoff]),
    liveTasksWithFiles: () => many(`SELECT id, expected_files FROM ai_eval_tasks WHERE status != 'retired'`),
    retireTask: (id, now) => exec(`UPDATE ai_eval_tasks SET status='retired', retired_at=? WHERE id=?`, [now, id]),

    frozenAt: async () => (await one('SELECT frozen_at FROM ai_self_improve_state WHERE id=1'))?.frozen_at,
    freezeLabelledBefore: deadline => exec(`UPDATE ai_eval_tasks SET frozen=1 WHERE frozen=0 AND labelled_at IS NOT NULL AND labelled_at <= ?`, [deadline]),
    frozenLabelled: () => many(`SELECT * FROM ai_eval_tasks WHERE status='labelled' AND frozen=1 ORDER BY created_at, id`),
    statusCounts: () => many(`SELECT status, COUNT(*) AS n FROM ai_eval_tasks WHERE deleted_at IS NULL GROUP BY status`),
    tasksByStatus: status => many(`SELECT * FROM ai_eval_tasks WHERE status=? AND deleted_at IS NULL ORDER BY created_at, id`, [status]),
    labelledTrainable: () => many(`SELECT * FROM ai_eval_tasks WHERE status='labelled' AND frozen=0 ORDER BY created_at, id`),

    liveStatus: id => one('SELECT status FROM ai_eval_tasks WHERE id=? AND deleted_at IS NULL', [Number(id)]),
    labelTask: ({ id, files, mustContain, mustNotContain, now }) => exec(`UPDATE ai_eval_tasks SET expected_files=?, must_contain=?, must_not_contain=?, status='labelled', labelled_at=?
      WHERE id=?`, [files, mustContain, mustNotContain, now, Number(id)]),
    taskRow: id => one('SELECT * FROM ai_eval_tasks WHERE id=?', [Number(id)]),
    eraseTask: (id, now) => exec(`
      UPDATE ai_eval_tasks SET request_text='', clarified_spec=NULL, expected_files='[]', must_contain=NULL,
        must_not_contain=NULL, status='retired', retired_at=COALESCE(retired_at, ?), deleted_at=?
      WHERE id=? AND deleted_at IS NULL
    `, [now, now, Number(id)]),

    openPullRequests: () => {
      const num = prNumber();
      return many(`
        SELECT DISTINCT ${num} AS number, ${db.jsonText('r.evidence_json', 'pull_request.url')} AS url,
          ${db.jsonText('r.evidence_json', 'pull_request.branch')} AS branch
        FROM ai_runs r WHERE ${num} IS NOT NULL AND ${num} NOT IN (SELECT number FROM ai_pull_requests)
        ORDER BY number
      `);
    },
    runsForPr: number => many(`SELECT r.id FROM ai_runs r WHERE ${prNumber()} = ? ORDER BY r.id`, [number]),
    insertPr: r => exec(`INSERT INTO ai_pull_requests(number, state, closed_at, files, reported_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT DO NOTHING`,
      [r.number, r.state, r.closed, r.files, r.now]),
    prRow: number => one('SELECT * FROM ai_pull_requests WHERE number=?', [number]),
  };
}
