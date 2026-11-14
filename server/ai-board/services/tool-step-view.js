// Admin view of native/text tool steps: args and observations capped and redacted, never raw.
const MAX_ARG_CHARS = 160;
const MAX_OBSERVATION_CHARS = 300;
const MAX_ARGS = 8;
const MAX_ROWS = 500;
const SECRET_KEY = /token|secret|passw|api[_-]?key|authorization|cookie|credential|private[_-]?key/i;
const SECRET_TEXT = [/sk-[A-Za-z0-9_-]{12,}/g, /gh[pousr]_[A-Za-z0-9]{20,}/g, /Bearer\s+[A-Za-z0-9._~+/=-]{8,}/gi,
  /((?:password|passwd|secret|token|api[_-]?key)\s*[=:]\s*)\S+/gi];

const clip = (text, max) => (text.length > max ? `${text.slice(0, max)}…` : text);
export function redactText(value, max) {
  let text = String(value ?? '');
  for (const pattern of SECRET_TEXT) text = text.replace(pattern, (match, head) => (typeof head === 'string' ? `${head}[đã che]` : '[đã che]'));
  return clip(text, max);
}

function parseArgs(text) {
  try {
    const value = JSON.parse(String(text || '{}'));
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

// Key-level secrets dropped; values capped to MAX_ARG_CHARS; at most MAX_ARGS keys per object.
export function argSummary(args = {}, depth = 0) {
  return Object.fromEntries(Object.entries(args).slice(0, MAX_ARGS).map(([key, value]) => {
    if (SECRET_KEY.test(key)) return [key, '[đã che]'];
    if (value == null || typeof value === 'number' || typeof value === 'boolean') return [key, value];
    if (typeof value === 'object' && !Array.isArray(value) && depth < 2) return [key, argSummary(value, depth + 1)];
    const text = typeof value === 'string' ? value : JSON.stringify(value);
    return [key, redactText(text, MAX_ARG_CHARS)];
  }));
}

export function projectToolStep(row = {}) {
  return {
    proposal_id: String(row.proposal_id ?? ''), child: Number(row.child ?? 0), step: Number(row.step),
    call_id: row.call_id || null, tool: String(row.tool || ''), status: String(row.status || ''),
    kind: row.kind || null, args: argSummary(parseArgs(row.args_json)),
    observation: row.observation == null ? null : redactText(row.observation, MAX_OBSERVATION_CHARS),
    updated_at: Number(row.updated_at) || null,
  };
}

/** Tool steps of one root ticket, projected for the admin trace. `forRoot(id)` → rows. */
export function createToolStepView(store) {
  return {
    async forRoot(rootId) {
      const rows = await store.db.all(`SELECT CAST(s.proposal_id AS TEXT) AS proposal_id, s.child, s.step, s.call_id, s.tool, s.args_json,
          s.status, s.kind, s.observation, s.updated_at
        FROM tool_step s JOIN tool_run r ON r.proposal_id = s.proposal_id AND r.child = s.child
        WHERE r.run_scope LIKE ? ORDER BY s.updated_at, s.step LIMIT ${MAX_ROWS}`, [`ticket-${Number(rootId)}:%`]);
      return rows.map(projectToolStep);
    },
  };
}
