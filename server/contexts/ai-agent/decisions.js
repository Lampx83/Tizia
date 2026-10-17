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

import { db, setRequestStatus, createNotification } from '../../db.js';

// Schema (audit trail ai_decisions) giờ do server/schema.sql sở hữu.

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
  await setRequestStatus(requestId, 'pending', note);
  try {
    await createNotification({
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

export async function getDecisionsForRequest(requestId) {
  return await decisionsForRequestStmt.all(Number(requestId));
}
export async function getRecentDecisions(limit = 50) {
  return await recentDecisionsStmt.all({ limit });
}
