// ============================================================
// Codelab webhook receiver (chiều IN: Codelab → Tizia)
// ============================================================
// Codelab fire event 'submission.completed' (xem modules/webhooks/webhook-sender
// trong neu-oj-backend) khi 1 submission Tizia gửi chấm xong:
//   {
//     event: "submission.completed",
//     submissionId: "<uuid>",
//     externalUserRef: "tizia:user:42",
//     problemSlug: "two-sum",
//     status: "accepted" | "wrong_answer" | "runtime_error" | "time_limit" |
//             "compile_error" | "system_error",
//     score: 100, passedCases: 10, totalCases: 10, languageId: 71,
//     completedAt: "ISO string"
//   }
//
// Bảo mật:
//   - Header `X-Codelab-Signature: t=<unix_seconds>,v1=<hex_hmac>` ký SHA-256
//     payload `${t}.${raw_body_bytes}` bằng webhookSecret. KHÔNG JSON.parse
//     trước khi verify — phải ký bytes gốc.
//   - Replay protection: từ chối nếu `|now - t|` > 5 phút.
//   - Dedup: bảng codelab_submissions PK (submission_id, status).
//
// Side-effects khi dedup pass + status='accepted' lần đầu của (user, problem):
//   - Cộng XP +20, coin +5 vào user_wallets (monotonic an toàn).
//   - Tăng quizzesPassed +1 (tận dụng counter sẵn — Codelab cũng tính là "vượt").
//
// Trả 2xx kể cả khi signature sai (giống chính sách scoreup) để Codelab không
// auto-disable webhook do config sai bên Tizia.
// ============================================================

import express from 'express';
import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  recordCodelabSubmission,
  hasAcceptedCodelabProblem,
  getUserWallet,
  upsertUserWallet,
} from '../../db.js';
import { invalidateCacheByPrefix } from '../../integrations/codelab.js';
import { trackEngagementProgress } from '../engagement/index.js';
import { addLeagueWeekXp } from '../engagement/league.js';

const WEBHOOK_SECRET = process.env.CODELAB_WEBHOOK_SECRET || '';
const MAX_SKEW_SECONDS = 5 * 60;

// XP/coin thưởng khi HS pass 1 bài Codelab LẦN ĐẦU. Đặt ở đây để dễ chỉnh,
// không phụ thuộc khoá luận thiết kế kinh tế chung của Tizia.
const REWARD_XP_PER_PROBLEM = 20;
const REWARD_COIN_PER_PROBLEM = 5;

function verifySignature(rawBody, headerVal) {
  if (!WEBHOOK_SECRET || !headerVal) return { ok: false, reason: 'no_secret_or_header' };
  // Format: "t=<unix>,v1=<hex>"
  const m = /^t=(\d+),v1=([0-9a-f]+)$/i.exec(String(headerVal).trim());
  if (!m) return { ok: false, reason: 'bad_format' };
  const t = Number(m[1]);
  const v1 = m[2].toLowerCase();
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - t) > MAX_SKEW_SECONDS) return { ok: false, reason: 'replay_window' };
  // Codelab ký `${ts}.${body_utf8}`.
  const signed = `${t}.${rawBody.toString('utf8')}`;
  const expected = createHmac('sha256', WEBHOOK_SECRET).update(signed).digest('hex');
  const a = Buffer.from(v1, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return { ok: false, reason: 'len_mismatch' };
  try {
    return { ok: timingSafeEqual(a, b), reason: 'sig_mismatch' };
  } catch { return { ok: false, reason: 'verify_throw' }; }
}

async function applyRewards(userId, problemSlug, currentSubmissionId) {
  // Chỉ thưởng khi HS chưa từng accepted bài này — exclude row vừa insert
  // (recordCodelabSubmission ở caller insert trước, nếu không exclude thì check
  // sẽ thấy chính row mới và luôn return true → không bao giờ thưởng).
  if (await hasAcceptedCodelabProblem(userId, problemSlug, currentSubmissionId)) {
    return { granted: false, reason: 'already_solved' };
  }
  const cur = (await getUserWallet(userId)) || {};
  await upsertUserWallet(userId, {
    xp:           (cur.xp || 0) + REWARD_XP_PER_PROBLEM,
    coins:        (cur.coins || 0) + REWARD_COIN_PER_PROBLEM,
    // quizzesPassed dùng chung counter "vượt qua" — Codelab pass cũng đáng kể.
    quizzesPassed: (cur.quizzesPassed || 0) + 1,
  }, { monotonic: true });
  return { granted: true, xp: REWARD_XP_PER_PROBLEM, coin: REWARD_COIN_PER_PROBLEM };
}

/**
 * Mount POST /api/webhooks/codelab. PHẢI gọi trước express.json (cần raw bytes
 * để HMAC verify). Auth gate đã whitelist '/api/webhooks/' cho ScoreUp — Codelab
 * dùng chung prefix nên không cần đụng vào gate.
 */
export function attachCodelabWebhook(app) {
  if (!WEBHOOK_SECRET) {
    console.warn('[codelab-webhook] CODELAB_WEBHOOK_SECRET not set — receiver sẽ reject mọi delivery.');
  }
  app.post(
    '/api/webhooks/codelab',
    express.raw({ type: 'application/json', limit: '256kb' }),
    async (req, res) => {
      const raw = req.body;
      const sig = req.get('X-Codelab-Signature');
      const verify = verifySignature(raw, sig);
      if (!verify.ok) {
        console.warn(`[codelab-webhook] bad_signature (${verify.reason}) from ${req.ip}`);
        return res.status(200).json({ ok: false, reason: verify.reason });
      }

      let parsed;
      try { parsed = JSON.parse(raw.toString('utf8')); }
      catch {
        console.warn('[codelab-webhook] bad_json');
        return res.status(200).json({ ok: false, reason: 'bad_json' });
      }

      const {
        event, submissionId, externalUserRef, problemSlug, status,
        score, passedCases, totalCases, languageId, completedAt,
      } = parsed || {};

      if (event !== 'submission.completed' || !submissionId || !status) {
        return res.status(200).json({ ok: false, reason: 'missing_fields_or_unknown_event' });
      }

      const completedMs = completedAt ? Number(new Date(completedAt)) : Date.now();

      // Dedup + persist.
      const { firstSeen, userId } = await recordCodelabSubmission({
        submissionId, status, problemSlug, externalUserRef,
        score, passedCases, totalCases, languageId, completedAt: completedMs,
      });

      if (!firstSeen) {
        return res.status(200).json({ ok: true, deduped: true });
      }

      // Side effects (chỉ chạy lần đầu).
      let reward = null;
      try {
        if (status === 'accepted' && userId && problemSlug) {
          reward = await applyRewards(userId, problemSlug, submissionId);
          // Engagement: quest "code" tăng tiến độ khi accepted (kể cả không
          // first-solve — HS làm lại bài khó vẫn được công 1 lượt nộp ăn điểm).
          try { await trackEngagementProgress(userId, 'code', 1); } catch {}
          // League: cộng XP tuần (= reward XP nếu first-solve, hoặc fixed 5 nếu re-submit).
          try { await addLeagueWeekXp(userId, reward?.granted ? reward.xp : 5); } catch {}
        }
        // Nếu cần invalidate cache list submission của user (sau này Tizia có
        // endpoint cache theo userId), gọi tại đây:
        invalidateCacheByPrefix(`/submissions?externalUserRef=${encodeURIComponent(externalUserRef || '')}`);
      } catch (e) {
        // Không throw — đã persist + ack thành công, để Codelab không retry vì
        // lỗi cục bộ phía Tizia.
        console.error('[codelab-webhook] side-effect error:', e.message);
      }

      return res.status(200).json({ ok: true, submissionId, status, reward });
    },
  );
  console.log('[codelab-webhook] mounted: POST /api/webhooks/codelab');
}
