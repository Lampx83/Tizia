// ============================================================
// /api/ai-board/inbox — hộp thư Ban điều hành AI, ĐỌC-CHỈ
// ============================================================
// VÌ SAO CÓ FILE NÀY
// Ban điều hành AI (routine Claude Opus) chạy trong môi trường agent/CI, KHÔNG
// có volume production nên không chạy được server/scripts/sync-inbox.mjs (script
// đó đọc thẳng data/tizia.db). Mọi route hộp thư hiện có đều đòi cookie session:
//   GET /api/requests        → 401 (và chỉ trả yêu cầu của CHÍNH tài khoản đó)
//   GET /api/admin/requests  → 401 + requireAdmin
// Hệ quả: các phiên hàng ngày từ 2026-07 tới nay không đọc được yêu cầu thật của
// sinh viên (xem public/CHANGELOG-eduverse.md, phiên 45/58/62). Route này là
// đường đọc còn thiếu.
//
// BẢO MẬT
//  • TẮT MẶC ĐỊNH. Không set AI_BOARD_KEY → route không được mount, path trả 404
//    như mọi path không tồn tại (không lộ là có tính năng này).
//  • Auth bằng header `x-ai-board-key`, KHÔNG dùng cookie → không phải bề mặt
//    CSRF, và không mượn được quyền của người đang đăng nhập.
//  • So khớp key bằng timingSafeEqual trên digest SHA-256 (độ dài cố định) để
//    không rò rỉ thông tin qua thời gian so sánh.
//  • Key ngắn (<24 ký tự) bị từ chối ngay lúc khởi động — key yếu còn tệ hơn
//    không có key, vì tạo cảm giác an toàn giả.
//  • ĐỌC-CHỈ tuyệt đối: chỉ SELECT. Không có route ghi nào trong file này. Đổi
//    trạng thái / phản hồi HS vẫn đi qua admin (cookie + requireAdmin) hoặc
//    scripts/admin-reply.js chạy trên máy có DB.
//
// DỮ LIỆU TRẢ VỀ chứa tên hiển thị của HS/SV và nội dung yêu cầu của họ — coi
// key này nhạy cảm ngang mật khẩu admin. Chỉ đặt qua biến môi trường, không
// commit vào repo.
//
// DÙNG:
//   curl -H "x-ai-board-key: $AI_BOARD_KEY" https://tizia.vn/api/ai-board/inbox
//   node scripts/fetch-inbox.mjs          # ghi thẳng vào ai-board/inbox.json
// ============================================================

import crypto from 'node:crypto';
import { listBoardInbox } from '../../db.js';

const MIN_KEY_LEN = 24;

/** Digest SHA-256 → luôn 32 byte, cho phép timingSafeEqual với input dài tuỳ ý. */
function digest(s) {
  return crypto.createHash('sha256').update(String(s), 'utf8').digest();
}

/** Đọc key từ env; trả null nếu chưa bật hoặc key quá yếu (kèm cảnh báo log). */
export function readBoardKey(env = process.env) {
  const raw = String(env.AI_BOARD_KEY || '').trim();
  if (!raw) return null;
  if (raw.length < MIN_KEY_LEN) {
    console.warn(
      `[ai-board] ⚠ AI_BOARD_KEY chỉ dài ${raw.length} ký tự (tối thiểu ${MIN_KEY_LEN}) — ` +
      'route /api/ai-board/inbox KHÔNG được bật. Sinh key mạnh: openssl rand -hex 32'
    );
    return null;
  }
  return raw;
}

export function attachAiBoardInbox(r, { env = process.env } = {}) {
  const key = readBoardKey(env);
  if (!key) return false; // chưa bật → không mount route nào cả

  const expected = digest(key);

  r.get('/api/ai-board/inbox', (req, res) => {
    const sent = req.headers['x-ai-board-key'];
    // Header vắng / lặp (mảng) → chặn trước khi đụng tới so khớp.
    if (typeof sent !== 'string' || !sent) {
      return res.status(401).json({ error: 'unauthorized', message: 'Thiếu header x-ai-board-key.' });
    }
    if (!crypto.timingSafeEqual(digest(sent), expected)) {
      return res.status(403).json({ error: 'forbidden', message: 'Key không hợp lệ.' });
    }

    const items = listBoardInbox(req.query.limit);
    const stats = { pending: 0, reviewing: 0 };
    const by_domain = {};
    for (const it of items) {
      stats[it.status] = (stats[it.status] || 0) + 1;
      by_domain[it.domain] = (by_domain[it.domain] || 0) + 1;
    }
    // no-store: hộp thư đổi theo từng phút, cache trung gian trả bản cũ sẽ khiến
    // phiên hàng ngày bỏ sót yêu cầu mới.
    res.set('Cache-Control', 'no-store');
    res.json({ ok: true, generated_at: new Date().toISOString(), count: items.length, stats, by_domain, items });
  });

  console.log('[ai-board] ✅ /api/ai-board/inbox đã bật (auth: header x-ai-board-key)');
  return true;
}

export const plugin = {
  name: 'ai-board-inbox',
  mount(router) {
    attachAiBoardInbox(router);
  },
};
