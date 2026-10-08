// Everything outside the AI board that reads or writes the shared `requests` / `request_messages` tables, behind the
// async db contract. Same semantics and SQL as db.js (voteRequest, getRequestById, addRequestMessage, ...) and the admin context.
const VALID_REQ_STATUS = new Set(['pending', 'reviewing', 'done', 'rejected']);
const VALID_MSG_ROLES = new Set(['student', 'ai', 'admin', 'system']);

function safeParseAtts(s) {
  if (!s) return [];
  try { const a = JSON.parse(s); return Array.isArray(a) ? a : []; } catch { return []; }
}
function normAttachments(attachments) {
  if (!Array.isArray(attachments) || !attachments.length) return null;
  const safe = attachments.slice(0, 10).map((a) => ({
    url: String(a?.url || '').slice(0, 500),
    name: String(a?.name || '').slice(0, 200),
    mime: String(a?.mime || '').slice(0, 100),
    size: Number(a?.size) || 0,
    kind: a?.kind === 'screenshot' ? 'screenshot' : 'file',
  })).filter((a) => a.url);
  return safe.length ? JSON.stringify(safe) : null;
}

export function createRequestsPort(d) {
  async function getRequestById(id) {
    const row = await d.get(`
      SELECT id, domain, type, title, detail, student, status, votes, admin_note, created_at, updated_at,
             attachments, owner_user_id, owner_domain, owner_state
      FROM requests WHERE id = ?
    `, [Number(id)]);
    if (!row) return null;
    return { ...row, attachments: safeParseAtts(row.attachments) };
  }

  async function listRequestMessages(requestId) {
    const rows = await d.all(`
      SELECT id, request_id, role, author_name, body, attachments, created_at
      FROM request_messages WHERE request_id = ? ORDER BY created_at ASC, id ASC
    `, [Number(requestId)]);
    return rows.map((r) => ({ ...r, attachments: safeParseAtts(r.attachments) }));
  }

  return {
    getRequestById,
    listRequestMessages,

    async voteRequest(id) {
      return (await d.run('UPDATE requests SET votes = votes + 1, updated_at = ? WHERE id = ?', [Date.now(), Number(id)])).changes > 0;
    },

    async setRequestStatus(id, status, note) {
      if (!VALID_REQ_STATUS.has(status)) return false;
      return (await d.run('UPDATE requests SET status = ?, admin_note = ?, updated_at = ? WHERE id = ?',
        [status, note ? String(note).slice(0, 500) : null, Date.now(), Number(id)])).changes > 0;
    },

    async addRequestMessage({ request_id: requestId, role, author_name: authorName = null, body, attachments = null }) {
      if (!VALID_MSG_ROLES.has(role)) role = 'system';
      const t = Date.now();
      const id = await d.insert(`
        INSERT INTO request_messages (request_id, role, author_name, body, attachments, created_at) VALUES (?, ?, ?, ?, ?, ?)
      `, [Number(requestId), role, authorName ? String(authorName).slice(0, 60) : null, String(body || '').slice(0, 10000),
        normAttachments(attachments), t]);
      await d.run('UPDATE requests SET updated_at = ? WHERE id = ?', [t, Number(requestId)]);
      return { id, created_at: t };
    },

    async reopenRequestIfClosed(id) {
      return (await d.run(`UPDATE requests SET status = 'reviewing', updated_at = ? WHERE id = ? AND status IN ('done', 'rejected')`,
        [Date.now(), Number(id)])).changes > 0;
    },

    /** Pending / reviewing requests of every school with their thread (read-only inbox for the daily AI board session). */
    async listBoardInbox(limit = 200) {
      const cap = Math.min(Math.max(Number(limit) || 200, 1), 500);
      const rows = await d.all(`
        SELECT id, domain, type, title, detail, student, status, votes, admin_note, created_at, updated_at, attachments
        FROM requests WHERE status IN ('pending', 'reviewing') ORDER BY votes DESC, created_at DESC LIMIT ?
      `, [cap]);
      const out = [];
      for (const r of rows) {
        out.push({
          id: `req-${r.id}`, db_id: r.id, from: r.student, domain: r.domain, type: r.type, subject: r.title, body: r.detail || '',
          status: r.status, votes: r.votes, admin_note: r.admin_note || null, attachments: safeParseAtts(r.attachments),
          thread: (await listRequestMessages(r.id)).map((m) => ({
            role: m.role, author: m.author_name || null, body: m.body, at: new Date(m.created_at).toISOString(),
          })),
          created_at: new Date(r.created_at).toISOString(), updated_at: new Date(r.updated_at).toISOString(),
        });
      }
      return out;
    },

    // ── admin context ──
    async adminListRequests(limit) {
      return d.all(`SELECT r.id, r.domain, r.type, r.title, r.detail, r.status, r.votes, r.student, r.admin_note,
          r.created_at, r.updated_at, u.role AS requester_role
        FROM requests r LEFT JOIN users u ON u.id = r.owner_user_id
        ORDER BY r.created_at DESC LIMIT ?`, [limit]);
    },
    async getRequestForReply(id) {
      return d.get('SELECT id, student, title, domain, status FROM requests WHERE id = ?', [id]);
    },
    async requestCounts() {
      const row = await d.get(`SELECT (SELECT COUNT(*) FROM requests) AS requests,
        (SELECT COUNT(*) FROM requests WHERE status='pending') AS requests_pending`);
      return { requests: row.requests, requests_pending: row.requests_pending };
    },
    async requestsCreatedBetween(from, to = null) {
      const row = to == null
        ? await d.get('SELECT COUNT(*) AS c FROM requests WHERE created_at >= ?', [from])
        : await d.get('SELECT COUNT(*) AS c FROM requests WHERE created_at >= ? AND created_at < ?', [from, to]);
      return row?.c || 0;
    },
    async recentRequests(limit) {
      return d.all('SELECT id, student, title, status, domain, created_at AS t FROM requests ORDER BY created_at DESC LIMIT ?', [limit]);
    },
    /** Admin deleted a user: their feature folders go to the deleting admin (history and drafts are kept). */
    async reassignFolderOwner(fromUserId, toUserId) {
      await d.run('UPDATE ai_feature_folders SET owner_user_id = ? WHERE owner_user_id = ?', [toUserId, fromUserId]);
    },
    /** 'not_found' | 'has_board_history' | 'deleted': a request with AI board tickets keeps its history. */
    async deleteRequestUnlessBoardHistory(id) {
      if (!await d.get('SELECT id FROM requests WHERE id = ?', [id])) return 'not_found';
      if (await d.get('SELECT 1 AS ok FROM ai_tickets WHERE source_request_id = ? LIMIT 1', [id])) return 'has_board_history';
      await d.run('DELETE FROM requests WHERE id = ?', [id]);
      return 'deleted';
    },
  };
}
