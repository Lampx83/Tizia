// SQL cho tool_run/tool_step và graph_checkpoint/graph_write; logic lease/scope nằm ở services/tool-checkpoint.js.
export function createToolCheckpointRepository(db) {
  const many = (sql, args) => db.all(sql, args);
  const one = (sql, args) => db.get(sql, args);
  const exec = (sql, args) => db.run(sql, args);

  return {
    tx: fn => db.tx(fn),

    graphPlanHash: thread => one('SELECT plan_hash FROM graph_checkpoint WHERE thread_id=? LIMIT 1', [thread]),
    run: (proposalId, child) => one('SELECT * FROM tool_run WHERE proposal_id=? AND child=?', [proposalId, child]),
    steps: (proposalId, child) => many(`SELECT step, identity, tool, args_json, status, kind, observation, observation_digest
      FROM tool_step WHERE proposal_id=? AND child=? ORDER BY step`, [proposalId, child]),
    insertRun: ({ proposalId, child, pins, now, scope }) => exec(`INSERT INTO tool_run(proposal_id, child, pins_json, updated_at, run_scope) VALUES (?, ?, ?, ?, ?)
      ON CONFLICT DO NOTHING`, [proposalId, child, pins, now, scope]),
    setLedger: ({ proposalId, child, ledger, now }) => exec('UPDATE tool_run SET ledger_json=?, updated_at=? WHERE proposal_id=? AND child=?',
      [ledger, now, proposalId, child]),
    insertIntent: ({ proposalId, child, step, identity, tool, args, now }) => exec(`INSERT INTO tool_step(proposal_id, child, step, identity, tool, args_json, status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'intent', ?)`, [proposalId, child, step, identity, tool, args, now]),
    upsertDone: r => exec(`INSERT INTO tool_step(proposal_id, child, step, identity, tool, args_json, status, kind, observation, observation_digest, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'done', ?, ?, ?, ?)
      ON CONFLICT (proposal_id, child, step) DO UPDATE SET status='done', kind=EXCLUDED.kind, observation=EXCLUDED.observation,
        observation_digest=EXCLUDED.observation_digest, updated_at=EXCLUDED.updated_at`,
      [r.proposalId, r.child, r.step, r.identity, r.tool, r.args, r.kind, r.observation, r.digest, r.now]),
    setStepStatus: ({ proposalId, child, step, status, now }) => exec('UPDATE tool_step SET status=?, updated_at=? WHERE proposal_id=? AND child=? AND step=?',
      [status, now, proposalId, child, step]),
    deleteSteps: (proposalId, child) => exec('DELETE FROM tool_step WHERE proposal_id=? AND child=?', [proposalId, child]),
    resetPins: ({ proposalId, child, pins, now }) => exec('UPDATE tool_run SET pins_json=?, updated_at=? WHERE proposal_id=? AND child=?',
      [pins, now, proposalId, child]),
    deleteStep: (proposalId, child, step) => exec('DELETE FROM tool_step WHERE proposal_id=? AND child=? AND step=?', [proposalId, child, step]),
    reconcileStep: ({ proposalId, child, step, status, by, reason, evidence, now, allowed }) => exec(`UPDATE tool_step SET status=?, resolved_by=?, resolution_reason=?, resolution_evidence=?, resolved_at=?, updated_at=?
      WHERE proposal_id=? AND child=? AND step=? AND status IN (${allowed.map(() => '?').join(',')})`,
      [status, by, reason, evidence, now, now, proposalId, child, step, ...allowed]),
    runScopeIds: scope => many('SELECT DISTINCT CAST(proposal_id AS TEXT) AS id FROM tool_run WHERE run_scope=?', [scope]),
    ownedByScope: (id, like) => one('SELECT 1 AS n FROM tool_run WHERE proposal_id=? AND run_scope LIKE ? LIMIT 1', [id, like]),
    openStepInScope: (id, like) => one(`SELECT 1 AS n FROM tool_step s JOIN tool_run r ON r.proposal_id=s.proposal_id AND r.child=s.child
      WHERE s.proposal_id=? AND r.run_scope LIKE ? AND s.status IN ('intent','unknown','compensate') LIMIT 1`, [id, like]),
    deleteAllSteps: id => exec('DELETE FROM tool_step WHERE proposal_id=?', [id]),
    deleteAllRuns: id => exec('DELETE FROM tool_run WHERE proposal_id=?', [id]),

    graphLatest: (thread, ns) => one('SELECT * FROM graph_checkpoint WHERE thread_id=? AND checkpoint_ns=? ORDER BY checkpoint_id DESC LIMIT 1', [thread, ns]),
    graphAt: (thread, ns, id) => one('SELECT * FROM graph_checkpoint WHERE thread_id=? AND checkpoint_ns=? AND checkpoint_id=?', [thread, ns, id]),
    graphWrites: (thread, ns, id) => many(`SELECT task_id, idx, channel, type, value FROM graph_write
      WHERE thread_id=? AND checkpoint_ns=? AND checkpoint_id=? ORDER BY task_id, idx`, [thread, ns, id]),
    graphBefore: (thread, ns, before, limit) => many(`SELECT * FROM graph_checkpoint WHERE thread_id=? AND checkpoint_ns=? AND checkpoint_id < ? ORDER BY checkpoint_id DESC LIMIT ?`,
      [thread, ns, before, limit]),
    graphRecent: (thread, ns, limit) => many(`SELECT * FROM graph_checkpoint WHERE thread_id=? AND checkpoint_ns=? ORDER BY checkpoint_id DESC LIMIT ?`, [thread, ns, limit]),
    upsertGraph: r => exec(`INSERT INTO graph_checkpoint(thread_id, checkpoint_ns, checkpoint_id, parent_id, type, checkpoint, metadata, plan_hash, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT (thread_id, checkpoint_ns, checkpoint_id) DO UPDATE SET checkpoint=EXCLUDED.checkpoint, metadata=EXCLUDED.metadata,
        updated_at=EXCLUDED.updated_at`,
      [r.thread, r.ns, r.id, r.parentId, r.type, r.checkpoint, r.metadata, r.pin, r.now]),
    purgeGraphWrites: (thread, ns) => exec('DELETE FROM graph_write WHERE thread_id=? AND checkpoint_ns=?', [thread, ns]),
    purgeGraphCheckpoints: (thread, ns) => exec('DELETE FROM graph_checkpoint WHERE thread_id=? AND checkpoint_ns=?', [thread, ns]),
    upsertGraphWrite: r => exec(`INSERT INTO graph_write(thread_id, checkpoint_ns, checkpoint_id, task_id, idx, channel, type, value)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT (thread_id, checkpoint_ns, checkpoint_id, task_id, idx) DO UPDATE SET channel=EXCLUDED.channel, type=EXCLUDED.type, value=EXCLUDED.value`,
      [r.thread, r.ns, r.id, r.task, r.idx, r.channel, r.type, r.value]),
  };
}
