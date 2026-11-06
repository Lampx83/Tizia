// AI Board: read-only worker view for the remote A/B driver. Admin only, no free SQL, secrets redacted.
const SECRET_LIKE = /(key|token|secret|password|bearer|authorization)/i;
const MAX_TEXT = 300;

/** Free text for the driver: cut to MAX_TEXT, blank when it looks like it carries a credential. */
export function safeText(value) {
  if (value == null) return null;
  const text = String(value);
  if (SECRET_LIKE.test(text)) return '[redacted]';
  return text.slice(0, MAX_TEXT);
}

/** Worker row → public fields only. flags stay null until the worker reports them (not wired yet). */
export function publicWorker(row) {
  if (!row) return null;
  return {
    worker_id: safeText(row.worker_id),
    version: safeText(row.version),
    mode: safeText(row.mode),
    status: safeText(row.status),
    current_ticket_id: row.current_ticket_id == null ? null : Number(row.current_ticket_id),
    last_seen_at: row.last_seen_at == null ? null : Number(row.last_seen_at),
    gpu_retry_at: row.gpu_retry_at == null ? null : Number(row.gpu_retry_at),
    gpu_busy_model: safeText(row.gpu_busy_model),
    gpu_error: safeText(row.gpu_error),
    flags: null,
  };
}

/** Mount GET /api/admin/ai-board/driver/worker (newest worker row). */
export function attachAiBoardDriverApi(app, { db, requireAuth, requireAdmin }) {
  app.get('/api/admin/ai-board/driver/worker', requireAuth, requireAdmin, async (_req, res, next) => {
    try {
      const row = await db.get(`SELECT worker_id, version, mode, status, current_ticket_id, last_seen_at,
          gpu_busy_model, gpu_retry_at, gpu_error
        FROM ai_workers ORDER BY last_seen_at DESC, worker_id LIMIT 1`);
      res.json(publicWorker(row));
    } catch (error) {
      next(error);
    }
  });
}
