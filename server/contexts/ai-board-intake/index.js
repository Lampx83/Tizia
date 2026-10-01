// ============================================================
// AI Board intake — phía người gửi yêu cầu
// ============================================================
// Onboarding 3 câu (vai trò, lĩnh vực am hiểu, mức kỹ thuật): trả lời 1 lần
// trước yêu cầu đầu tiên, admin miễn. Lưu bảng ai_board_profile (migration
// 005); worker nhận qua snapshot để chọn giọng văn khi làm rõ yêu cầu.
// ============================================================

// Cùng từ vựng users.role: pupil = học sinh, student = sinh viên.
import { checkIntake } from '../../ai-board/intake-guard.js';
import { classify, decideClarity, taskMode } from '../../ai-board/classifier.js';
import { answersClear, repeatedQuestion } from '../../ai-board/clarity-rules.js';
import { beginChat } from '../../ai-board/chat-activity.js';
import { RequestValidationError, WorkerContractError } from '../../ai-board/store.js';
import { resolveAIModel } from '../../ai-model-router.js';
import {
  DAILY_TURNS, FEATURE_QUESTIONS, MAX_QUESTIONS, checkAnswer, conversationText, nextStep, ollamaStreamer, plainSpec, questionPrompt, withUserWords,
  specPrompt, streamGuarded,
} from './clarify.js';

export const ROLES = ['pupil', 'student', 'teacher', 'parent', 'other'];
export const TECH_LEVELS = ['none', 'some', 'fluent'];
const DOMAIN_ID = /^[a-z0-9-]{2,40}$/;
const MAX_DOMAINS = 20;

export function createProfileStore(db) {
  const read = db.prepare('SELECT role, domain_expertise, tech_level, answered_at FROM ai_board_profile WHERE user_id=?');
  const write = db.prepare(`
    INSERT INTO ai_board_profile(user_id, role, domain_expertise, tech_level, answered_at) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET role=excluded.role, domain_expertise=excluded.domain_expertise,
      tech_level=excluded.tech_level, answered_at=excluded.answered_at
  `);

  function get(userId) {
    const row = read.get(Number(userId));
    return row ? { ...row, domain_expertise: JSON.parse(row.domain_expertise) } : null;
  }

  /** Profile đã chuẩn hoá; throw TypeError khi câu trả lời ngoài tập chip. */
  function save(userId, answers = {}) {
    const domains = Array.isArray(answers.domain_expertise) ? [...new Set(answers.domain_expertise.map(String))] : [];
    if (!ROLES.includes(answers.role) || !TECH_LEVELS.includes(answers.tech_level)
      || !domains.length || domains.length > MAX_DOMAINS || !domains.every((d) => DOMAIN_ID.test(d))) {
      throw new TypeError('invalid onboarding answers');
    }
    write.run(Number(userId), answers.role, JSON.stringify(domains), answers.tech_level, Date.now());
    return get(userId);
  }

  const needed = (user) => !!user && user.role !== 'admin' && !get(user.id);
  return { get, save, needed };
}

export function attachAiBoardIntake(router, {
  db, requireAuth, requireStrictCsrf,
  store = null, // ai-board store: clarification needs it; absent = profile routes only
  quotaGate = (_req, _res, next) => next(), // aiQuotaGate('ai_board_grill') in the app
  recordUsage = () => {}, // recordAiCall(req, {...}) in the app
  generate = ollamaStreamer(),
  classifyClarity = defaultClarity,
  models = { question: chatModel('ai_board_grill'), spec: chatModel('ai_board_spec') },
}) {
  const profiles = createProfileStore(db);

  router.get('/api/ai-board/profile', requireAuth, (req, res) => {
    res.json({ needed: profiles.needed(req.user), profile: profiles.get(req.user.id) });
  });

  router.post('/api/ai-board/profile', requireAuth, requireStrictCsrf, (req, res) => {
    try {
      res.json({ ok: true, profile: profiles.save(req.user.id, req.body) });
    } catch (error) {
      if (error instanceof TypeError) return res.status(400).json({ error: 'invalid_profile' });
      throw error;
    }
  });
  if (store) attachClarify(router, { db, store, profiles, requireAuth, requireStrictCsrf, quotaGate, recordUsage,
    generate, classifyClarity, models });
  return profiles;
}

// Chat làm rõ dùng model nhỏ nạp sẵn (model của classifier) thay cho model mặc định chung, để không tranh
// GPU với 14B của worker. Biến TIZIA_MODEL_<ROUTE> riêng vẫn thắng.
export const chatModel = (endpoint, env = process.env) => resolveAIModel(endpoint,
  { ...env, TIZIA_MODEL_DEFAULT: env.AI_BOARD_CLASSIFIER_MODEL || env.TIZIA_MODEL_DEFAULT });

/** onClarify cho routes: chuông báo "Ban điều hành cần trao đổi", bấm vào mở FAB đúng yêu cầu. */
export function clarifyNotifier(createNotification) {
  return ({ requestId, domain, title, student }) => createNotification({
    user_display_name: student, request_id: requestId, kind: 'reply',
    title: '🏛️ Ban điều hành cần trao đổi thêm', body: `Về yêu cầu «${String(title).slice(0, 120)}» — bấm để trả lời.`,
    url: `/school.html?domain=${encodeURIComponent(domain)}#sgf-clarify-${Number(requestId)}`,
  });
}

const maxQuestions = (mode) => (mode === 'feature' ? FEATURE_QUESTIONS : MAX_QUESTIONS);

// Clarity mode lúc gửi (ask | split | feature) từ event phân loại (luật + model); thiếu thì hỏi thường.
function initialMode(db, rootId) {
  const row = db.prepare(`SELECT internal_detail FROM ai_events WHERE ticket_id=? AND event_type='request_classified'`).get(rootId);
  try {
    const detail = JSON.parse(row?.internal_detail || '{}');
    return detail.clarify?.mode || detail.clarity?.mode || 'ask';
  } catch { return 'ask'; }
}

// Model clarity chỉ quyết định dừng sớm khi ở mode 'active'; shadow/off không tốn GPU cho mỗi lượt.
const defaultClarity = async (text) => {
  if (!process.env.OLLAMA_URL || !process.env.AI_BOARD_CLASSIFIER_MODEL || taskMode('clarity') !== 'active') return null;
  const { probs } = await classify('clarity', text);
  return decideClarity(probs);
};

function sendError(res, error) {
  if (error instanceof WorkerContractError) return res.status(error.status).json({ error: error.code, message: error.message });
  if (error instanceof RequestValidationError) return res.status(400).json({ error: 'invalid_request', message: error.message });
  throw error;
}

function attachClarify(router, { db, store, profiles, requireAuth, requireStrictCsrf, quotaGate, recordUsage,
  generate, classifyClarity, models }) {
  // Yêu cầu đang chờ người gửi làm rõ: FAB nhấp nháy + banner.
  router.get('/api/ai-board/clarifications', requireAuth, (req, res) => {
    res.json({ items: store.listPendingClarifications(req.user.id) });
  });

  // Lịch sử làm rõ của 1 yêu cầu (mở lại panel / đổi máy).
  router.get('/api/ai-board/requests/:id/clarify', requireAuth, (req, res) => {
    try {
      const { request, turns, asked } = store.getClarification(req.params.id, req.user.id);
      res.json({ request: { id: request.id, title: request.title }, turns, asked,
        max: Math.max(maxQuestions(initialMode(db, request.root_id)), asked) });
    } catch (error) { sendError(res, error); }
  });

  // 1 lượt: (câu trả lời) → câu hỏi kế tiếp hoặc bản tóm tắt, stream NDJSON.
  router.post('/api/ai-board/requests/:id/clarify', requireAuth, requireStrictCsrf, quotaGate, async (req, res, next) => {
    let state;
    try {
      state = store.getClarification(req.params.id, req.user.id);
    } catch (error) { return sendError(res, error); }
    const { request } = state;
    const hasAnswer = req.body?.answer !== undefined;
    if (hasAnswer) {
      const problem = checkAnswer(req.body.answer);
      if (problem) return res.status(422).json({ error: 'answer_rejected', message: problem });
    }
    if (store.countClarifyTurns(req.user.id, Date.now() - 24 * 3600_000) >= DAILY_TURNS) {
      return res.status(429).json({ error: 'clarify_limit',
        message: 'Hôm nay Ban đã trao đổi nhiều với bạn rồi. Bạn quay lại vào ngày mai để làm rõ tiếp nhé!' });
    }
    // Phiên chat đang chờ token: worker tạm không nhận ticket mới.
    const endChat = beginChat();
    res.on('close', endChat);
    try {
      if (hasAnswer) store.addClarifyTurn(request.id, { kind: 'answer', text: String(req.body.answer).trim(), author: request.student });
      const { turns, asked } = store.getClarification(request.id, req.user.id);
      const last = turns.at(-1);
      res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
      // no-transform: compression() skips it, so each line reaches the browser as it is written.
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('X-Accel-Buffering', 'no');
      const send = (event) => res.write(`${JSON.stringify(event)}\n`);
      const startMode = initialMode(db, request.root_id);
      const max = Math.max(maxQuestions(startMode), asked);
      if (!hasAnswer && last && last.kind !== 'answer') {
        // Mở lại panel: gửi lại lượt đang chờ, không gọi model.
        send({ t: 'done', kind: last.kind, text: last.text, asked, max, complete: true });
        return res.end();
      }
      const feature = startMode === 'feature';
      const rulesClear = !feature && answersClear(turns.filter((t) => t.kind === 'answer').map((t) => t.text));
      const clarity = hasAnswer && !rulesClear && !feature
        ? await classifyClarity(conversationText(request, turns)).catch(() => null) : null;
      const step = asked === 0 ? { kind: 'question', mode: startMode } : nextStep({ asked, clarity, rulesClear, mode: startMode });
      const mode = step.mode || startMode;
      if (step.kind === 'handoff') {
        const handoff = store.handoffClarification(request.id, req.user.id, 'clarification_round_limit');
        send({ t: 'done', kind: 'handoff', text: handoff.public_note, asked, max, complete: false });
        return res.end();
      }
      const profile = profiles.get(req.user.id);
      const isQuestion = step.kind === 'question';
      const prompt = isQuestion
        ? questionPrompt({ request, turns, techLevel: profile?.tech_level, mode, turn: asked + 1 })
        : specPrompt({ request, turns, mode });
      const model = isQuestion ? models.question : models.spec;
      const deltas = [];
      const out = await streamGuarded({ generate, model, prompt, kind: step.kind, mode,
        send: isQuestion ? (event) => deltas.push(event) : send,
        fallback: isQuestion ? null : plainSpec(request, turns) });
      if (isQuestion && repeatedQuestion(out.text, turns.filter((t) => t.kind === 'question').map((t) => t.text))) {
        const handoff = store.handoffClarification(request.id, req.user.id, 'repeated_answered_question');
        send({ t: 'done', kind: 'handoff', text: handoff.public_note, asked, max, complete: false });
        return res.end();
      }
      if (out.replaced) console.warn(`[ai-board] clarify output replaced (${out.reason}) for request ${request.id}`);
      try {
        store.addClarifyTurn(request.id, { kind: step.kind, text: out.text });
      } catch (error) {
        if (error.code !== 'clarification_limit') throw error;
        const handoff = store.handoffClarification(request.id, req.user.id, 'clarification_limit');
        send({ t: 'done', kind: 'handoff', text: handoff.public_note, asked: MAX_QUESTIONS, max, complete: false });
        return res.end();
      }
      if (isQuestion && !out.replaced) deltas.forEach(send);
      recordUsage(req, { provider: 'ollama', model, status: out.replaced ? 'error' : 'ok' });
      send({ t: 'done', kind: step.kind, text: out.text, asked: asked + (isQuestion ? 1 : 0), max,
        complete: isQuestion ? null : step.complete });
      res.end();
    } catch (error) {
      if (res.headersSent) { res.end(); return; }
      next(error);
    } finally {
      endChat();
    }
  });

  // Người gửi xác nhận (có thể đã sửa) bản tóm tắt → vào hàng đợi worker.
  router.post('/api/ai-board/requests/:id/clarify/confirm', requireAuth, requireStrictCsrf, (req, res) => {
    const spec = String(req.body?.spec ?? '');
    const intake = checkIntake('', spec);
    if (intake.block) return res.status(422).json({ error: 'request_rejected', message: intake.message });
    try {
      // A summary exists only after a clarity decision; exhausting the cap hands off instead.
      const { request, turns, asked } = store.getClarification(req.params.id, req.user.id);
      const full = spec.trim().length >= 10 ? withUserWords(spec, request, turns) : spec; // ngắn quá: store báo 400
      res.json(store.confirmClarification(req.params.id, req.user.id, { spec: full, complete: true }));
    } catch (error) { sendError(res, error); }
  });
}
