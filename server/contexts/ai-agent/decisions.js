// ============================================================
// AI Agent — Ghi nhận góp ý + audit trail cho "Ban điều hành AI"
// ============================================================
// KIẾN TRÚC (đổi 2026-06-21): Ban điều hành AI KHÔNG còn dùng Ollama on-prem.
// Lý do: qwen2.5:14b không đủ mạnh để xét duyệt góp ý đáng tin. Việc RA QUYẾT
// ĐỊNH (approve/reject/defer/priority) giờ do CLAUDE OPUS xử lý bằng Routine
// trên Claude Desktop (ngoài repo) — server KHÔNG tự quyết nữa.
//
// Module này còn 2 vai trò nhẹ:
//   1. acknowledgeNewRequest() — khi HS gửi góp ý, server CHỈ tự GHI NHẬN
//      (giữ status 'pending') + báo chuông "đã ghi nhận". Không gọi LLM.
//   2. Đọc audit trail (ai_decisions) cho dashboard. Bảng được giữ nguyên để
//      Routine ghi lại quyết định của mình + dashboard hiển thị.
// ============================================================

import { db, createNotification } from '../../db.js';
import { aiBoardServices } from '../../ai-board/runtime.js';

// ── Schema (audit trail) — Routine ghi quyết định vào đây, dashboard đọc ra ──
db.exec(`
  CREATE TABLE IF NOT EXISTS ai_decisions (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id     INTEGER NOT NULL,
    decided_by     TEXT    NOT NULL,          -- 'ai' | 'rule' | 'human'
    model          TEXT,
    action         TEXT    NOT NULL,          -- approve | reject | defer | priority
    status_applied TEXT,                       -- status request đã set
    reason         TEXT,                        -- lý do nội bộ (cho admin)
    public_note    TEXT,                        -- phản hồi hiển thị cho SV
    priority_score INTEGER,                     -- 0..100
    confidence     REAL,                        -- 0..1
    input_snapshot TEXT,                        -- JSON ảnh chụp đầu vào
    raw_output     TEXT,                        -- raw LLM (audit/debug)
    created_at     INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_ai_decisions_request ON ai_decisions(request_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_ai_decisions_time    ON ai_decisions(created_at DESC);
`);

const decisionsForRequestStmt = db.prepare(`
  SELECT id, decided_by, model, action, status_applied, reason, public_note,
         priority_score, confidence, created_at
  FROM ai_decisions WHERE request_id = ? ORDER BY created_at DESC
`);
const recentDecisionsStmt = db.prepare(`
  SELECT id, request_id, decided_by, model, action, status_applied, reason,
         public_note, priority_score, confidence, created_at
  FROM ai_decisions ORDER BY created_at DESC LIMIT @limit
`);

/**
 * Khi HS gửi góp ý MỚI: server CHỈ tự GHI NHẬN, KHÔNG tự quyết. Giữ status
 * 'pending' để Ban điều hành AI (Routine Claude Opus) xét duyệt sau, đồng thời
 * báo chuông cho HS biết đã nhận. createNotification tự bỏ qua guest/'Ẩn danh'.
 *
 * @returns {{status:'pending', acknowledged:true}}
 */
export async function acknowledgeNewRequest({ requestId, domain, title, student = null }) {
  const note = 'Cảm ơn góp ý của bạn! Ban điều hành đã ghi nhận và sẽ xem xét sớm.';
  // Giữ 'pending' + lưu note tạm hiển thị cho HS (admin_note). listRequests sắp
  // theo votes/created_at nên updated_at đổi không ảnh hưởng thứ tự.
  await aiBoardServices(db).requests.setRequestStatus(requestId, 'pending', note);
  try {
    createNotification({
      user_display_name: student,
      request_id: requestId,
      kind: 'reply',
      title: 'Ban điều hành đã ghi nhận góp ý của bạn',
      body: `「${String(title || '').slice(0, 80)}」 — ${note}`,
      url: `/space.html?domain=${encodeURIComponent(domain || '')}#requests`,
    });
  } catch (e) { console.warn('[ai-agent] notify failed:', e?.message || e); }
  return { status: 'pending', acknowledged: true };
}

export function getDecisionsForRequest(requestId) {
  return decisionsForRequestStmt.all(Number(requestId));
}
export function getRecentDecisions(limit = 50) {
  return recentDecisionsStmt.all({ limit });
}
