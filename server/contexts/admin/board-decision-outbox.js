// Durable retry for human decisions that the board rejected/missed after the web applied the status (split stack).
// One row per idempotency key; the board dedups on (request_id, key), so replays never double-write.
const DDL = `CREATE TABLE IF NOT EXISTS board_decision_outbox (
  idempotency_key TEXT PRIMARY KEY,
  request_id BIGINT NOT NULL,
  actor TEXT NOT NULL,
  payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at BIGINT NOT NULL,
  last_error TEXT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
)`;
const DUE_INDEX = 'CREATE INDEX IF NOT EXISTS idx_board_decision_outbox_due ON board_decision_outbox(status, next_attempt_at)';

/** send(actor, requestId, payload) → {status}; rejects when the board is unreachable. */
export function createDecisionOutbox({ db, send, now = Date.now, maxAttempts = 8, baseDelayMs = 30_000, maxDelayMs = 3_600_000, log = console }) {
  let ready = null;
  const ensure = () => (ready ??= db.d.exec(DDL).then(() => db.d.exec(DUE_INDEX)).catch((e) => { ready = null; throw e; }));
  const delay = (attempts) => Math.min(baseDelayMs * 2 ** Math.max(attempts - 1, 0), maxDelayMs);
  let draining = null;

  async function enqueue({ key, requestId, actor, payload, error }) {
    await ensure();
    const t = now();
    await db.d.run(`INSERT INTO board_decision_outbox(idempotency_key, request_id, actor, payload, attempts, next_attempt_at, last_error, created_at, updated_at)
      VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?) ON CONFLICT (idempotency_key) DO NOTHING`,
    [key, requestId, JSON.stringify(actor), JSON.stringify(payload), t + delay(1), String(error || '').slice(0, 300), t, t]);
  }

  async function runDrain() {
    await ensure();
    const due = await db.d.all(`SELECT * FROM board_decision_outbox WHERE status='pending' AND next_attempt_at <= ? ORDER BY created_at LIMIT 50`, [now()]);
    const out = { sent: 0, retried: 0, dead: 0 };
    for (const row of due) {
      let failure = null;
      try {
        const res = await send(JSON.parse(row.actor), Number(row.request_id), { ...JSON.parse(row.payload), idempotency_key: row.idempotency_key });
        if (res.status !== 200) failure = `board status ${res.status}`;
      } catch (e) { failure = e?.message || String(e); }
      const t = now();
      if (!failure) {
        await db.d.run(`UPDATE board_decision_outbox SET status='done', attempts=attempts+1, last_error=NULL, updated_at=? WHERE idempotency_key=?`, [t, row.idempotency_key]);
        out.sent++;
      } else if (Number(row.attempts) + 1 >= maxAttempts) {
        await db.d.run(`UPDATE board_decision_outbox SET status='dead', attempts=attempts+1, last_error=?, updated_at=? WHERE idempotency_key=?`, [failure.slice(0, 300), t, row.idempotency_key]);
        log.error?.(`[admin/decision-outbox] GAVE UP request=${row.request_id} key=${row.idempotency_key} after ${maxAttempts} attempts: ${failure}`);
        out.dead++;
      } else {
        await db.d.run(`UPDATE board_decision_outbox SET attempts=attempts+1, next_attempt_at=?, last_error=?, updated_at=? WHERE idempotency_key=?`,
          [t + delay(Number(row.attempts) + 1), failure.slice(0, 300), t, row.idempotency_key]);
        out.retried++;
      }
    }
    return out;
  }

  /** Send every due row; concurrent calls share one pass. */
  const drain = () => (draining ??= runDrain().finally(() => { draining = null; }));

  function start(intervalMs = 60_000) {
    const timer = setInterval(() => { drain().catch((e) => log.warn?.('[admin/decision-outbox] drain failed:', e?.message || e)); }, intervalMs);
    timer.unref?.();
    return timer;
  }

  return { enqueue, drain, start };
}
