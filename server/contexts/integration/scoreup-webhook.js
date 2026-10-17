// ============================================================
// ScoreUp webhook receiver (chiều IN: ScoreUp → Tizia)
// ============================================================
// ScoreUp v1.4.0 POST các event question.*/subject.*/chapter.created/bulk.completed
// về URL Tizia đăng ký. Tizia dùng để invalidate cache adapter ScoreUp ngay khi
// tác giả sửa câu (xem server/integrations/scoreup.js — invalidateCacheByPrefix).
//
// Bảo mật:
//   - Verify HMAC-SHA256(secret, raw_body_bytes) qua header X-ScoreUp-Signature.
//     KHÔNG JSON.parse trước khi verify — phải ký đúng bytes gốc.
//   - Dedup theo event_id (UUID v4) trong bảng scoreup_webhook_events_seen.
//
// Trả 2xx trong mọi trường hợp ScoreUp gọi đúng:
//   - HMAC sai → 2xx body {ok:false, reason:'bad_signature'} để ScoreUp KHÔNG
//     tính fail (theo policy v1.4.0). Như vậy admin Tizia sẽ thấy log lỗi nhưng
//     webhook không bị auto-disable do receiver cấu hình sai.
//   - Dedup hit → 2xx body {ok:true, deduped:true}.
//
// Mount: server/index.js (TRƯỚC express.json), thêm '/api/webhooks/' vào
// PUBLIC_PATH_PREFIXES của auth gate.
// ============================================================

import express from 'express';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { markScoreUpEventSeen } from '../../db.js';
import { invalidateCacheByPrefix } from '../../integrations/scoreup.js';

const WEBHOOK_SECRET = process.env.SCOREUP_WEBHOOK_SECRET || '';

function verifySignature(rawBody, headerVal) {
  if (!WEBHOOK_SECRET || !headerVal) return false;
  // Format: "sha256=<hex>"
  const m = /^sha256=([0-9a-f]+)$/i.exec(String(headerVal).trim());
  if (!m) return false;
  const expected = createHmac('sha256', WEBHOOK_SECRET).update(rawBody).digest('hex');
  const a = Buffer.from(m[1], 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return false;
  try { return timingSafeEqual(a, b); } catch { return false; }
}

function invalidateFor(event, data) {
  switch (event) {
    case 'question.created':
    case 'question.updated':
    case 'question.deleted': {
      // Invalidate list endpoints + chi tiết câu
      invalidateCacheByPrefix('/questions');
      if (data?.id) invalidateCacheByPrefix(`/questions/${data.id}`);
      break;
    }
    case 'subject.created':
    case 'subject.updated': {
      invalidateCacheByPrefix('/subjects');
      if (data?.id) invalidateCacheByPrefix(`/subjects/${data.id}`);
      break;
    }
    case 'chapter.created': {
      if (data?.subject_id) invalidateCacheByPrefix(`/subjects/${data.subject_id}`);
      invalidateCacheByPrefix('/questions');
      break;
    }
    case 'bulk.completed': {
      const subjectIds = Array.isArray(data?.subject_ids) ? data.subject_ids : [];
      for (const sid of subjectIds) {
        invalidateCacheByPrefix(`/subjects/${sid}`);
      }
      invalidateCacheByPrefix('/questions');
      break;
    }
    default:
      // Event lạ — không invalidate gì, vẫn 2xx để ScoreUp không retry.
      break;
  }
}

/**
 * Mount handler `POST /api/webhooks/scoreup` lên router/app.
 *
 * Cần được mount với express.raw() làm body parser CHO RIÊNG route này (tránh
 * express.json chạy trước → khi đó body đã thành object, không còn raw bytes
 * để HMAC verify đúng).
 *
 * Ví dụ:
 *   import { attachScoreUpWebhook } from './contexts/integration/scoreup-webhook.js';
 *   attachScoreUpWebhook(app); // mount lên app TRƯỚC express.json
 */
export function attachScoreUpWebhook(app) {
  if (!WEBHOOK_SECRET) {
    console.warn('[scoreup-webhook] SCOREUP_WEBHOOK_SECRET not set — receiver sẽ reject mọi delivery.');
  }
  app.post(
    '/api/webhooks/scoreup',
    express.raw({ type: 'application/json', limit: '256kb' }),
    async (req, res) => {
      const raw = req.body; // Buffer
      const sig = req.get('X-ScoreUp-Signature');
      if (!verifySignature(raw, sig)) {
        // 2xx để ScoreUp không tính fail (chính sách v1.4.0). Log để admin xử lý.
        console.warn('[scoreup-webhook] bad_signature from', req.ip);
        return res.status(200).json({ ok: false, reason: 'bad_signature' });
      }

      let parsed;
      try { parsed = JSON.parse(raw.toString('utf8')); }
      catch {
        console.warn('[scoreup-webhook] bad_json');
        return res.status(200).json({ ok: false, reason: 'bad_json' });
      }

      const { event, event_id, occurred_at, data } = parsed || {};
      if (!event || !event_id) {
        return res.status(200).json({ ok: false, reason: 'missing_fields' });
      }

      // Dedup theo event_id
      const seen = await markScoreUpEventSeen(event_id, event, Number(new Date(occurred_at || 0)) || null);
      if (seen) {
        return res.status(200).json({ ok: true, deduped: true });
      }

      try {
        invalidateFor(event, data);
      } catch (e) {
        // Không throw — vẫn ack để ScoreUp không retry liên tục vì lỗi cục bộ.
        console.error('[scoreup-webhook] invalidate error:', e.message);
      }

      return res.status(200).json({ ok: true, event, event_id });
    },
  );
  console.log('[scoreup-webhook] mounted: POST /api/webhooks/scoreup');
}
