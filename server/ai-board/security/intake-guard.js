// Guardrail nhận yêu cầu Góp ý — thuần tất định, KHÔNG gọi LLM trong đường request.
// Từ điển dùng chung với ai-board/harness/gates/guard.py + intake_guard.py (guard-lexicon.json):
// nhãn intake reject/critical (chửi thề, tình dục, miệt thị, prompt injection) → 422, không tạo yêu cầu;
// nhãn còn lại (chính trị/chủ quyền, quyền hạn, gian lận…) → nhận, ghi event + tag để admin thấy.
// Worker tự chạy lại cùng từ điển (intake_guard.py) nên định tuyến human_review không phụ thuộc cờ này.
import fs from 'node:fs';

const LEXICON = JSON.parse(fs.readFileSync(new URL('../guard-lexicon.json', import.meta.url), 'utf8'));
const BLOCKING = new Set(['reject', 'critical']);

/** Chữ thường, bỏ dấu tiếng Việt (đ→d) — giống guard.fold bên Python. */
const fold = (text) => text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd');

// Only remove an explicitly observational surface mention; other privileged terms stay visible to the guard.
export function readOnlyVerificationText(text) {
  const rule = LEXICON.readonly_admin_verification;
  return String(text).split(/(?<=[.!?;])\s+|\n/u).map((clause) => {
    const observation = clause.replace(/chỉ đọc (?=trang (?:quản trị|admin))/giu, 'chỉ quan sát ');
    const words = fold(observation);
    if (!new RegExp(rule.observe, 'u').test(words) || new RegExp(`\\b(?:${rule.mutate})\\b`, 'u').test(words.replace(/\btheo doi\b/g, ''))) return clause;
    return observation.replace(/trang (quản trị|quan tri|admin)|admin-request\.html|\badmin\b/giu, 'giao diện chỉ đọc');
  }).join('\n');
}

// Term ASCII so trên bản bỏ dấu, term có dấu so trên bản NFC — xem _doc trong guard-lexicon.json.
const TOPICS = Object.entries(LEXICON.labels).map(([label, spec]) => ({
  label,
  verdict: spec.intake,
  patterns: spec.terms.map((term) => ({
    re: new RegExp(`(?<![\\p{L}\\p{N}_])(?:${term.replaceAll(' ', '\\s+')})(?![\\p{L}\\p{N}_])`, 'u'),
    ascii: /^[\x00-\x7f]*$/.test(term),
  })),
}));

/** Nhãn trúng + có chặn không. message lịch sự, không nhắc lại nội dung, không lộ luật nào trúng. */
export function checkIntake(title, detail) {
  const text = readOnlyVerificationText(`${title ?? ''}\n${detail ?? ''}`);
  const exact = text.normalize('NFC').toLowerCase();
  const folded = fold(text);
  const hits = TOPICS.filter(({ patterns }) => patterns.some(({ re, ascii }) => re.test(ascii ? folded : exact)));
  const block = hits.some(({ verdict }) => BLOCKING.has(verdict));
  return { block, labels: hits.map(({ label }) => label), message: block
    ? LEXICON.public_messages[hits.some((h) => h.label === 'prompt_injection') ? 'prompt_injection' : 'reject'] : null };
}

export function recordIntakeRejection(db, userId, intake) {
  if (!db) return;
  const now = Date.now();
  db.prepare(`INSERT INTO ai_alerts(severity, category, public_message, internal_detail, created_at, updated_at)
    VALUES ('high', 'intake_rejected', ?, ?, ?, ?)`).run(intake.message,
      JSON.stringify({ gate: 'intake', user_id: Number(userId), labels: intake.labels,
        reason: 'deterministic request-content rule matched before model/code generation' }), now, now);
}

/** Ghi cờ human_review cho yêu cầu vừa tạo: 1 ai_events + tag guard:*. Không có db/nhãn → bỏ qua. Không bao giờ throw. */
export function recordIntakeFlags(db, rootTicketId, labels) {
  if (!db || !rootTicketId || !labels?.length) return;
  try {
    const now = Date.now();
    db.transaction(() => {
      db.prepare(`
        INSERT OR IGNORE INTO ai_events (
          ticket_id, event_type, actor_type, actor_id, transition,
          public_message, internal_detail, idempotency_key, created_at
        ) VALUES (?, 'intake_flagged', 'system', 'intake-guard', NULL, NULL, ?, ?, ?)
      `).run(rootTicketId, `intake_guard: ${labels.join(', ')} → human_review`, `intake-guard:${rootTicketId}`, now);
      const tag = db.prepare('INSERT OR IGNORE INTO ai_ticket_tags(ticket_id, tag) VALUES (?, ?)');
      for (const name of ['guard:human_review', ...labels.map((label) => `guard:${label}`)]) tag.run(rootTicketId, name);
    })();
  } catch (error) {
    console.warn('[ai-board] intake flag failed:', error.message);
  }
}
