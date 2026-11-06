import { createHash, timingSafeEqual } from 'node:crypto';
import express from 'express';
import { ADMIN_REQUEST_STATUSES, assertConfirmed, LEASE_MS, LIMITS, PlanGuardrailError, RequestValidationError, WorkerContractError } from '../repositories/store-contract.js';
import { SHOTS_BODY_LIMIT, SHOTS_TYPE } from '../services/drafts.js';
import * as asyncAux from '../services/aux-service.js';
import { asyncRoutes } from './async-routes.js';
import { checkIntake, publicMessage, readOnlyVerificationText } from '../security/intake-guard.js';
import { checkLanguage } from '../language-guard.js';
import { checkGibberish } from '../gibberish.js';
import { classifyRequest as classifyWithModel } from '../security/classifier.js';
import { clarifyFromPhase, resolveClarify } from '../services/clarity-rules.js';
import { activeChats } from '../services/chat-activity.js';
import { guardModelText, MAX_QUESTIONS } from '../../contexts/ai-board-intake/clarify.js';
import { attachAppealRoutes } from './appeals.js';
import { attachRolloutRoutes } from './rollout.js';
import { createSpanService } from '../services/spans.js';
import { EDITABLE_PHASES, editRequestAndReplan } from '../services/requester-edit.js';
import { attachWorkerLessonRoutes, attachLessonReviewRoutes } from './lessons.js';
import { createHsmStore } from '../hsm/store.js';
import { createToolCheckpointService } from '../services/tool-checkpoint.js';
import { createGateProofService } from '../services/gate-proofs.js';
import { createToolManifestStore } from '../repositories/tool-manifests.js';
import { publicContract } from '../hsm/contract.js';
import { createFeatureLifecycle } from '../services/feature-lifecycle.js';
import { createRootAllowanceService } from '../services/root-allowance.js';
import { createTraceReadModel } from '../services/trace-read-model.js';
import { attachSkillRoutes, attachWorkerSkillRoutes } from './skills.js';
import { requesterProgress } from '../services/requester-progress.js';
import { classifierConfigured, environment, getSettings } from '../settings.js';
import { assessElevationRisk, applyRiskFloor } from '../services/elevation-risk.js';

// Không cấu hình model phân loại → không gọi gì (không phân loại).
const defaultClassifyRequest = (title, detail) => (
  classifierConfigured() ? classifyWithModel(title, detail) : Promise.resolve(null));

export function attachAiBoardRequestRoutes(router, {
  store,
  requireAuth,
  requireEnrolled,
  requireAdmin,
  requireStrictCsrf,
  onCreated = null,
  onCancelled = null,
  db = null, // chỉ để intake-guard ghi cờ; thiếu thì vẫn chặn 422 bình thường
  classifyRequest = defaultClassifyRequest, // (title, detail) → {model, clarity, danger} | null
  // (text) → danger verdict | null for admin skill text; undefined = the real logprob classifier, fail-open.
  classifySkillText,
  needsProfile = () => false, // (user) → true while the onboarding is unanswered (admin never)
  onClarify = null, // ({requestId, domain, title, student}) when a new request waits for clarification (bell)
  aux = asyncAux, // helper modules (aux-async.js)
  assessElevation = assessElevationRisk, // (context) → risk; test seam cho model giả
}) {
  const route = asyncRoutes(router);
  if(store.db) attachLessonReviewRoutes(router,{db:store.db,requireAuth,requireStrictCsrf});
  if(store.db) attachSkillRoutes(router,{store,requireAuth,requireAdmin,requireStrictCsrf,classifySkillText});
  if(store.db) attachAppealRoutes(router,{store,requireAuth,requireAdmin,requireStrictCsrf});
  if(store.db) attachRolloutRoutes(router,{store,requireAuth,requireAdmin,requireStrictCsrf});
  route.get('/api/ai-board/capabilities', requireAuth, (req, res) => {
    res.json({ multimodal: getSettings().multimodal });
  });
  route.post('/api/requests', requireAuth, requireEnrolled, async (req, res, next) => {
    const body = req.body || {};
    // Yêu cầu board tự sửa chỉ hệ thống tạo (POST /api/ai-board/worker/self-requests), không bao giờ từ FAB.
    if (body.type === 'self') return res.status(400).json({ error: 'invalid_request', message: 'Loại yêu cầu không hợp lệ.' });
    // Một client gửi sai bảng mã (Latin-1) biến chữ Việt thành U+FFFD; từ chối sớm thay vì lưu bản hỏng.
    if ([body.title, body.detail].some((part) => typeof part === 'string' && part.includes('\uFFFD'))) {
      return res.status(422).json({ error: 'invalid_encoding', message: 'Nội dung phải là UTF-8 hợp lệ; hãy gửi lại bằng UTF-8.' });
    }
    // Onboarding / làm rõ chỉ bật cho client có giao diện cho chúng (FAB public/ gửi header này). Client cũ
    // (FAB React web-next trên prod) vẫn gửi như trước: không 428, không kẹt ở phase clarifying.
    const features = new Set(String(req.get('X-AI-Board-Features') || '').split(',').map((f) => f.trim()));
    if (features.has('onboarding') && await needsProfile(req.user)) {
      return res.status(428).json({ error: 'profile_required', message: 'Trả lời 3 câu giới thiệu trước khi gửi yêu cầu.' });
    }
    const ownerDomain = req.user.role === 'admin'
      ? String(body.domain || '').trim()
      : req.user.enrolled_domain;
    // LF/99: chế độ xử lý do người gửi chọn ('now' = worker vLLM, 'queue' = xếp hàng Claude Code).
    // Giá trị khác (kể client hack) → 400; không gán im lặng.
    let executionMode = null;
    if (body.execution_mode != null) {
      if (!['now', 'queue'].includes(body.execution_mode)) {
        return res.status(400).json({ error: 'invalid_request', message: 'execution_mode chỉ nhận "now" hoặc "queue".' });
      }
      executionMode = body.execution_mode;
    }
    const language = checkLanguage(body.title, body.detail);
    if (language.block) return res.status(422).json({ error: 'unsupported_language', message: language.message });
    const intake = checkIntake(body.title, body.detail);
    if (intake.block) {
      try { await aux.recordIntakeRejection(db, req.user.id, intake); } catch (error) { return next(error); }
      return res.status(422).json({ error: 'request_rejected', message: intake.message });
    }
    const gibberish = checkGibberish(body.title) || checkGibberish(body.detail);
    if (gibberish) return res.status(422).json({ error: 'request_unclear', message: gibberish });
    // Mỗi người tối đa N yêu cầu đang chờ (contract.json limits): 1 người không lấp hàng đợi cả trường.
    const pendingCap = LIMITS.pending_roots_per_user.value;
    if (req.user.role !== 'admin' && await store.countPendingRoots(req.user.id, req.get('Idempotency-Key')) >= pendingCap) {
      return res.status(429).json({ error: 'too_many_pending',
        message: `Bạn đang có ${pendingCap} yêu cầu chờ Ban xử lý. Đợi một yêu cầu xong rồi gửi tiếp nhé!` });
    }
    // Luật cứng đã qua. Model chỉ thêm human_review / đòi làm rõ; lỗi model = hành vi cũ.
    const classified = await classifyRequest(readOnlyVerificationText(body.title || ''), readOnlyVerificationText(body.detail || '')).catch((error) => {
      console.warn('[ai-board] classifier unavailable:', error.message);
      return null;
    });
    // Kết quả model ở mode 'shadow' chỉ ghi log, không hành động.
    const danger = classified?.danger?.shadow ? null : classified?.danger;
    const modelLabels = (danger?.labels || []).map((key) => `model_${key}`);
    if (danger?.reject) {
      const rejection = { message: publicMessage('reject'), labels: modelLabels, reason: 'classifier score above reject_min before code generation' };
      try { await aux.recordIntakeRejection(db, req.user.id, rejection); } catch (error) { return next(error); }
      return res.status(422).json({ error: 'request_rejected', message: rejection.message });
    }
    // Làm rõ = luật cứng HOẶC model clarity 'active'; ghi lại nguồn để so sánh luật vs model.
    const decision = resolveClarify({
      title: body.title, detail: body.detail, classified, enabled: features.has('clarify'),
      isFeature: body.type === 'feature' && !body.folder_id, // chức năng mới: luôn hỏi 3 câu, không áp luật "quá rộng"
    });
    // Cloud (xếp hàng): luôn nhận và lưu để người xử lý đọc, không grilling.
    let clarify = executionMode === 'queue' ? { needed: false, mode: null } : { needed: decision.needed, mode: decision.mode };
    const { rules } = decision;
    const trace = classified || rules.needed ? { ...classified, rules, clarify: { ...clarify, source: decision.source } } : null;
    // Trần toàn cục mọi phương án: chặn spam trước khi ghi DB/đưa cho Claude.
    const windowStart = Date.now() - 60_000;
    let recentRequests = 0;
    try {
      recentRequests = Number((await store.queryGet('SELECT COUNT(*) AS n FROM requests WHERE created_at >= ?', [windowStart]))?.n || 0);
    } catch { /* đếm lỗi: không chặn người dùng, để store báo lỗi thật khi ghi */ }
    if (recentRequests >= LIMITS.global_rate.requests_per_minute) {
      return res.status(429).json({ error: 'rate_limited',
        message: 'Hệ thống đang nhận nhiều yêu cầu cùng lúc. Bạn thử lại sau khoảng một phút nhé.' });
    }
    try {
      const result = await store.createRequestWithRoot({
        ownerUserId: req.user.id,
        ownerDomain,
        ownerDisplayName: req.user.displayName || req.user.display_name || req.user.username,
        idempotencyKey: req.get('Idempotency-Key'),
        type: body.type,
        title: body.title,
        detail: body.detail,
        attachments: body.attachments,
        folderId: body.folder_id ? Number(body.folder_id) : null,
        clarifying: clarify.needed,
        executionMode,
      });
      if (result.created) {
        // Intake flags / classification gắn với root ticket; request 'queue' (không root) bỏ qua.
        if (result.root_ticket_id) {
          await aux.recordIntakeFlags(db, result.root_ticket_id, [...intake.labels, ...modelLabels]);
          await aux.recordClassification(db, result.root_ticket_id, trace);
        }
        if (body.type === 'feature' && !body.folder_id && !clarify.needed) {
          try { await store.setRequestFeature(result.request_id, String(body.title || '')); }
          catch (error) { console.warn('[ai-board] feature group failed:', error.message); }
        }
        if (clarify.needed && onClarify) {
          try {
            await onClarify({ requestId: result.request_id, domain: ownerDomain, title: String(body.title || '').trim(),
              student: req.user.displayName || req.user.display_name || req.user.username });
          } catch (error) {
            console.warn('[ai-board] clarify notification failed:', error.message);
          }
        }
      } else {
        // Gửi lại cùng Idempotency-Key: trả đúng trạng thái đã tạo lần đầu, không theo lần phân loại này.
        // Request 'queue' không có root (LF/99) → không có phase để suy ra clarify.
        clarify = result.root_ticket_id
          ? clarifyFromPhase((await store.queryGet('SELECT phase FROM ai_tickets WHERE id=?', [result.root_ticket_id]))?.phase)
          : { needed: false };
      }
      res.json({ ok: true, ...result, id: result.request_id, createdAt: Date.now(), clarify });
      if (result.created && onCreated) {
        try {
          await onCreated({
            requestId: result.request_id,
            domain: ownerDomain,
            title: String(body.title || '').trim(),
            student: req.user.displayName || req.user.display_name || req.user.username,
            executionMode: result.execution_mode ?? executionMode ?? null,
            clarifyNeeded: clarify.needed,
          });
        } catch (error) {
          console.warn('[ai-board] request acknowledgement failed:', error.message);
        }
      }
    } catch (error) {
      if (error instanceof RequestValidationError) {
        return res.status(400).json({ error: 'invalid_request', message: error.message });
      }
      next(error); // async handler: Express 4 does not catch a throw here
    }
  });

  route.get('/api/requests', requireAuth, async (req, res) => {
    const domain = String(req.query.domain || req.user.enrolled_domain || '').trim();
    if (!domain) return res.status(400).json({ error: 'domain required' });
    const isAdmin = req.user.role === 'admin';
    const items = [];
    for (const item of await store.listRequestsForOwner(req.user.id, domain, req.query.limit)) {
      items.push({ ...item, retry: await aux.retryState(store.db, item.root_ticket_id, item.phase),
        can_continue: isAdmin && item.phase === 'partial',
        can_edit: !isAdmin && EDITABLE_PHASES.has(item.phase) });
    }
    const stats = {};
    for (const item of items) stats[item.status] = (stats[item.status] || 0) + 1;
    res.json({ items, stats });
  });

  route.get('/api/requests/:id/progress', requireAuth, async (req, res) => {
    const progress = await requesterProgress(store, req.params.id, req.user.id, req.user.role === 'admin');
    if (!progress) return res.status(404).json({ error: 'request_not_found' });
    res.json(progress);
  });

  route.post('/api/requests/:id/cancel', requireAuth, requireStrictCsrf, async (req, res) => {
    try {
      const cancelled=await store.cancelRequest(req.params.id, { ownerUserId:req.user.id });
      let previewCleanup;
      if(onCancelled){try{previewCleanup=await onCancelled(Number(req.params.id),req.user);}catch{previewCleanup={confirmed:false};}}
      res.json({...cancelled,...(previewCleanup?{preview_cleanup:previewCleanup}:{})});
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });

  // "Thử cách khác": lượt hỏng của chính mình → lập plan mới; hỏng 2 lượt liền thì chờ admin.
  route.post('/api/requests/:id/retry', requireAuth, requireStrictCsrf, async (req, res) => {
    const pendingCap = LIMITS.pending_roots_per_user.value;
    if (req.user.role !== 'admin' && await store.countPendingRoots(req.user.id) >= pendingCap) {
      return res.status(429).json({ error: 'too_many_pending',
        message: `Bạn đang có ${pendingCap} yêu cầu chờ Ban xử lý. Đợi một yêu cầu xong rồi thử lại nhé!` });
    }
    try {
      const result = await aux.retryRequest(store, req.params.id, req.user.id);
      await aux.recordRequestMiss(store.db, req.params.id, 'retry');
      res.json(result);
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });

  // "Tiếp tục" (LF/107): yêu cầu dừng giữa plan nhưng đã xong một phần — chạy nốt từ checkpoint,
  // không mở plan mới và không tính là lượt hỏng. CHỈ ADMIN: người gửi muốn thay đổi thì sửa yêu cầu.
  route.post('/api/requests/:id/continue', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try {
      res.json(await aux.continuePartialRequest(store.db, req.params.id, null));
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });

  // Người gửi dừng rồi sửa lại yêu cầu và gửi tiếp: chỉ khi không ai đang chạy (không có lease sống).
  route.post('/api/requests/:id/edit', requireAuth, requireStrictCsrf, async (req, res) => {
    const title = String(req.body?.title || '').trim();
    const detail = String(req.body?.detail || '').trim();
    if (title.length < 4 || title.length > 200) {
      return res.status(422).json({ error: 'invalid_title', message: 'Tiêu đề cần từ 4 đến 200 ký tự.' });
    }
    const language = checkLanguage(detail || title);
    if (language.block) return res.status(422).json({ error: 'unsupported_language', message: language.message });
    const intake = checkIntake(title, detail);
    if (intake.block) return res.status(422).json({ error: 'request_rejected', message: intake.message });
    const gibberish = checkGibberish(detail || title);
    if (gibberish) return res.status(422).json({ error: 'request_unclear', message: gibberish });
    try {
      res.json(await editRequestAndReplan(store.db, req.params.id, {
        ownerUserId: req.user.id, title, detail, authorName: req.user.display_name || req.user.displayName,
      }));
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });

  route.post('/api/requests/:id/status', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    const status = String(req.body?.status || '');
    // Hủy = đóng root, không mở lại được: bắt gõ đúng số yêu cầu như hoàn tác.
    if (status === 'rejected') {
      try { assertConfirmed(req.params.id, req.body?.confirm); } catch (error) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
    }
    const ok = ADMIN_REQUEST_STATUSES.has(status)
      && await (status === 'rejected' ? store.rejectRequest : store.noteRequest)(req.params.id, req.body?.note, req.user.id);
    if (!ok) return res.status(400).json({ error: 'invalid_status_or_request' });
    res.json({ ok: true });
  });

  // ── Folder chức năng ──
  const folderError = (res, error) => {
    if (error instanceof WorkerContractError) return res.status(error.status).json({ error: error.code, message: error.message });
    throw error;
  };
  const lifecycle = createFeatureLifecycle(store);
  route.get('/api/admin/ai-board/folders/:id/lifecycle', requireAuth, requireAdmin, async (req, res) => {
    try { res.json(await lifecycle.state(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  for (const action of ['isolate', 'restore']) {
    route.post(`/api/admin/ai-board/folders/:id/lifecycle/${action}`, requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
      try { res.json(await lifecycle[action](req.params.id, req.user.id, req.body)); } catch (error) { folderError(res, error); }
    });
  }
  route.get('/api/ai-board/folders', requireAuth, async (req, res) => {
    const domain = String(req.query.domain || req.user.enrolled_domain || '').trim();
    if (!domain) return res.status(400).json({ error: 'domain required' });
    res.json(await store.listFolders(req.user.id, domain));
  });
  route.post('/api/ai-board/folders/:id/vote', requireAuth, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.voteFolder(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  route.delete('/api/ai-board/folders/:id/vote', requireAuth, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.unvoteFolder(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  route.post('/api/ai-board/folders/:id/archive', requireAuth, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.archiveFolder(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  route.post('/api/ai-board/folders/:id/reopen', requireAuth, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.reopenFolder(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  route.post('/api/ai-board/folders/:id/done', requireAuth, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.markFolderDone(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  route.post('/api/admin/ai-board/folders/:id/released', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.markFolderReleased(req.params.id)); } catch (error) { folderError(res, error); }
  });
  route.get('/api/admin/ai-board/folders', requireAuth, requireAdmin, async (req, res) => {
    res.json({ folders: await store.listAdminFolders(req.query.limit) });
  });
  route.post('/api/admin/ai-board/folders/:id/approve', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.approveFolder(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  route.post('/api/admin/ai-board/folders/:id/revoke', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.revokeFolder(req.params.id)); } catch (error) { folderError(res, error); }
  });

  route.get('/api/admin/ai-board/queue', requireAuth, requireAdmin, async (req, res) => {
    res.json({ tickets: await store.listAdminQueue(req.query.limit), workers: await store.listWorkers(),
      intake_rejections: await store.queryAll(`SELECT id, created_at, public_message, internal_detail FROM ai_alerts
        WHERE category='intake_rejected' ORDER BY id DESC LIMIT 50`) });
  });

  // One source of truth for the admin suggestion list: the board DB, not the web DB.
  route.get('/api/admin/ai-board/requests', requireAuth, requireAdmin, async (req, res) => {
    res.json({ requests: await store.listAdminRequests(Number(req.query.limit) || 10), total: await store.countAdminRequests() });
  });

  route.get('/api/admin/ai-board/requests/:requestId/thread', requireAuth, requireAdmin, async (req, res) => {
    const row = await store.queryGet(`SELECT id, domain, type, title, status, student, detail, attachments, created_at, updated_at
      FROM requests WHERE id=?`, [Number(req.params.requestId)]);
    if (!row) return res.status(404).json({ error: 'not_found' });
    const messages = await store.queryAll(`SELECT id, role, author_name, body, attachments, created_at
      FROM request_messages WHERE request_id=? ORDER BY created_at, id`, [row.id]);
    const first = { id: 0, request_id: row.id, role: 'student', author_name: row.student,
      body: row.detail || row.title, attachments: row.attachments, created_at: row.created_at };
    res.json({ request: { ...row, votes: 0 }, messages: [first, ...messages] });
  });

  // Admin answers a clarification on the board DB, then the root is queued for a fresh plan.
  route.post('/api/admin/ai-board/requests/:id/clarify', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    const text = String(req.body?.answer || '').trim().slice(0, 4000);
    if (text.length < 3) return res.status(422).json({ error: 'answer_rejected' });
    const answered = await store.answerClarification(req.params.id, text);
    if (!answered) return res.status(404).json({ error: 'request_not_found' });
    res.json(answered);
  });

  const traceModel = createTraceReadModel(store);
  route.get('/api/admin/ai-board/requests/:requestId/decisions', requireAuth, requireAdmin, async (_req, res) => {
    res.json({ decisions: [] });
  });

  route.get('/api/admin/ai-board/requests/:requestId/trace', requireAuth, requireAdmin, async (req, res) => {
    const out = await traceModel.read(req.params.requestId, req.get('If-None-Match'));
    if (!out) return res.status(404).json({ error: 'ticket_not_found' });
    res.set('Cache-Control', 'private, no-cache');
    if (out.etag) res.set('ETag', out.etag);
    if (out.notModified) return res.status(304).end();
    res.json(out.trace);
  });

  route.post('/api/admin/ai-board/tickets/:id/extend-budget', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try {
      res.json(await store.extendBudget(req.params.id, {
        amount: req.body?.amount, reason: req.body?.reason, adminUserId: req.user.id,
      }));
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });

  route.post('/api/admin/ai-board/requests/:requestId/rollback', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try {
      const result = await store.requestRollback(req.params.requestId, { adminUserId: req.user.id, confirm: req.body?.confirm });
      await aux.recordRequestMiss(store.db, req.params.requestId, 'undo');
      res.json(result);
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });

  // ── Task eval từ lần hỏng ──
  route.get('/api/admin/ai-board/eval-tasks', requireAuth, requireAdmin, async (req, res) => {
    try { res.json(await aux.listEvalTasks(store.db, req.query.status || undefined)); } catch (error) { folderError(res, error); }
  });
  route.post('/api/admin/ai-board/eval-tasks/:id/label', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json({ task: await aux.labelEvalTask(store.db, req.params.id, req.body || {}) }); } catch (error) { folderError(res, error); }
  });
  route.delete('/api/admin/ai-board/eval-tasks/:id', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await aux.deleteEvalTask(store.db, req.params.id)); } catch (error) { folderError(res, error); }
  });


  // ── Phiên bản manifest tool của tool-loop: admin duyệt hoặc thu hồi theo băm ──
  const toolManifests = createToolManifestStore(store.db);
  route.get('/api/admin/ai-board/tool-manifests', requireAuth, requireAdmin, async (_req, res) => {
    res.json({ manifests: await toolManifests.list() });
  });
  route.post('/api/admin/ai-board/tool-manifests/:hash/:action', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await toolManifests.decide(req.params.hash, req.params.action, req.user.id)); } catch (error) { folderError(res, error); }
  });

  // ── Tự chạy lại yêu cầu bị chặn do lỗi hạ tầng thoáng qua (mọi loại yêu cầu, không riêng self) ──
  route.get('/api/admin/ai-board/transient-retry', requireAuth, requireAdmin, async (_req, res) => {
    res.json({ ...(await aux.transientRetryState(store.db)), blocked: await aux.listTransientBlocked(store.db) });
  });
  route.post('/api/admin/ai-board/transient-retry/switch', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await aux.setTransientRetryEnabled(store.db, req.body?.enabled, req.user.id)); } catch (error) { folderError(res, error); }
  });
  route.post('/api/admin/ai-board/tickets/:id/retry-transient', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try {
      const result = await aux.retryTransientTicket(store.db, req.params.id);
      await store.recordAdminAction({ ticketId: req.params.id }, req.user.id, 'retry_transient');
      res.json(result);
    } catch (error) { folderError(res, error); }
  });

  // ── Đối chiếu bước ghi chưa rõ của tool-loop (unknown write): người vận hành chốt, có lý do + evidence + audit ──
  route.get('/api/admin/ai-board/tickets/:id/unknown-writes', requireAuth, requireAdmin, async (req, res) => {
    try { res.json(await aux.listUnknownWrites(store.db, req.params.id)); } catch (error) { folderError(res, error); }
  });
  route.post('/api/admin/ai-board/tickets/:id/unknown-writes/:identity/reconcile', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try {
      res.json(await aux.reconcileWrite(store.db, {
        ticketId: req.params.id, identity: req.params.identity, decision: req.body?.decision, reason: req.body?.reason,
        evidence: req.body?.evidence, resume: req.body?.resume === true, user: req.user,
      }));
    } catch (error) { folderError(res, error); }
  });

  route.post('/api/admin/ai-board/tickets/:id/authorize-plan', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try {
      res.json(await store.authorizePlan(req.params.id, req.body?.plan_hash, req.user.id));
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });
  route.post('/api/admin/ai-board/tickets/:id/data-steps/:childId/acknowledge', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try {
      res.json(await store.acknowledgeDataStep(req.params.id, req.params.childId, req.user.id));
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });
  route.post('/api/admin/ai-board/requests/:id/rerun-gate', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.rerunGate(req.params.id, req.body?.gate, req.user.id)); }
    catch (error) { folderError(res, error); }
  });
  // Ngữ cảnh duyệt elevation: nội dung yêu cầu, scope + plan steps, cờ tất định và đánh giá rủi ro
  // (một lần gọi model cho mỗi plan_hash+scope, có cache). Chỉ đọc; không tự duyệt gì.
  route.get('/api/admin/ai-board/requests/:id/elevation-context', requireAuth, requireAdmin, async (req, res) => {
    try {
      const context = store.elevationContext ? await store.elevationContext(req.params.id) : null;
      if (!context) return res.status(404).json({ error: 'request_not_found' });
      let risk = null;
      if (context.elevation.state === 'requested') {
        try {
          risk = applyRiskFloor(await assessElevation({ db: store.db, context }), context.flags);
        } catch {
          risk = applyRiskFloor({ level: 'unknown', reasons: ['Không đánh giá được rủi ro; cần người xem.'],
            recommendation: 'review', questions: [], source: 'unknown', cached: false }, context.flags);
        }
      }
      res.json({ ok: true, context: { ...context, risk } });
    } catch (error) { folderError(res, error); }
  });
  // Ngữ cảnh cho cả lô (không gọi model): danh sách nhỏ để tab yêu cầu biết trước cờ, chi tiết vẫn theo từng yêu cầu.
  route.get('/api/admin/ai-board/elevation-context', requireAuth, requireAdmin, async (req, res) => {
    try {
      const ids = [...new Set(String(req.query.ids || '').split(',').map(Number)
        .filter((id) => Number.isInteger(id) && id > 0))].slice(0, 20);
      const contexts = {};
      for (const id of ids) {
        const context = store.elevationContext ? await store.elevationContext(id) : null;
        if (context) contexts[id] = context;
      }
      res.json({ ok: true, contexts });
    } catch (error) { folderError(res, error); }
  });
  // Quyền nâng mức của AI Board: duyệt/từ chối từng yêu cầu hoặc cả lô. Duyệt thì vé về hàng đợi lập lại kế hoạch.
  const elevationReply = ({ approved = 0, rejected = 0, state = null }) => ({
    ok: true, approved, rejected, ...(state ? { state } : {}),
  });
  route.post('/api/admin/ai-board/requests/:id/elevate', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try {
      const result = await store.decideElevation(req.params.id, {
        decision: req.body?.decision, reason: req.body?.reason, adminUserId: req.user.id,
      });
      res.json({ ...elevationReply({ approved: result.approved ? 1 : 0, rejected: result.rejected ? 1 : 0, state: result.state }), scope: result.scope });
    } catch (error) { folderError(res, error); }
  });
  route.post('/api/admin/ai-board/requests/:id/elevate-batch', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try {
      res.json(elevationReply(await store.decideElevationAll(req.body?.ids, {
        decision: req.body?.decision, reason: req.body?.reason, adminUserId: req.user.id,
      })));
    } catch (error) { folderError(res, error); }
  });
  // Graph node → gate that restarts it. Gate 2 and earlier re-plan; gate 3 and later redo execution.
  const NODE_GATE = { gate_1: 1, gate_2: 2, gate_2_5: 2.5, gate_3: 3, gate_4: 4, gate_5: 5, gate_5_5: 5.5 };
  route.post('/api/admin/ai-board/requests/:requestId/nodes/:node/rerun', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    const gate = NODE_GATE[req.params.node];
    if (gate == null) return res.status(400).json({ error: 'invalid_node', message: 'This node cannot run again.' });
    try {
      // The store checks the saved checkpoint: a node with one is re-run from there, anything else is refused.
      const result = await store.rerunGate(req.params.requestId, gate, req.user.id, req.params.node);
      res.json({ ...result, node: req.params.node,
        note: result.resumed_from
          ? `Runs again from the saved checkpoint at ${result.resumed_from}.`
          : 'No checkpoint for this step: the stage runs again from step 3.' });
    } catch (error) { folderError(res, error); }
  });
}

function digest(value) {
  return createHash('sha256').update(String(value), 'utf8').digest();
}

export function attachAiBoardWorkerRoutes(router, {
  store,
  env = environment(),
  leaseMs = LEASE_MS,
  uploadsDir = null, // thư mục /uploads/requests (ảnh bản nháp); thiếu → route ảnh trả 503
  shotBackend = undefined, // backend lưu ảnh (shot-storage.js); mặc định local trong uploadsDir
  onVerdict = null, // ({request_id, title, domain, student, kind}) sau mỗi verdict: chuông cho người gửi
  onClarify = null, // ({requestId, title, domain, student}) khi Gate 2.5 cần người gửi làm rõ
  aux = asyncAux, // PostgreSQL helpers, as in attachAiBoardRequestRoutes
  classifySkillText, // undefined = real danger classifier for worker-reported skill text (fail-open)
  lessonOptions,
}) {
  const route = asyncRoutes(router);
  const key = String(env.AI_BOARD_WORKER_KEY || '').trim();
  if (key.length < 24) return false;
  const expected = digest(key);
  const authenticate = (req, res, next) => {
    const sent = req.headers['x-ai-worker-key'];
    if (typeof sent !== 'string' || !sent) return res.status(401).json({ error: 'unauthorized' });
    if (!timingSafeEqual(digest(sent), expected)) return res.status(403).json({ error: 'forbidden' });
    next();
  };
  const handle = (fn) => async (req, res, next) => {
    try {
      await fn(req, res);
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message, ...(error.reason && { reason: error.reason }) });
      }
      if (error instanceof PlanGuardrailError) {
        return res.status(422).json({
          error: error.code,
          message: error.publicMessage,
          detail: error.internalReason,
        });
      }
      next(error);
    }
  };
  const leaseInput = (body = {}) => ({
    workerId: String(body.worker_id || ''),
    leaseToken: String(body.lease_token || ''),
  });
  attachWorkerLessonRoutes(route, { store, authenticate, handle, lessonOptions });
  const hsm = createHsmStore(store);
  route.post('/api/ai-board/worker/tickets/:id/hsm', authenticate, handle(async (req,res) => {
    res.json(await hsm.transition(req.params.id,req.body || {}));
  }));
  route.post('/api/ai-board/worker/tickets/:id/hsm/state', authenticate, handle(async (req,res) => {
    res.json(await hsm.readLeased(req.params.id,req.body || {}));
  }));
  route.post('/api/ai-board/worker/tickets/:id/tool-manifest', authenticate, handle(async (req,res) => {
    res.json(await hsm.reportToolManifest(req.params.id,req.body || {}));
  }));
  const gateProofs = createGateProofService(store);
  route.post('/api/ai-board/worker/tickets/:id/gate-proof/:op', authenticate, handle(async (req,res) => {
    res.json(await gateProofs.apply(req.params.id, req.params.op, req.body || {}));
  }));
  const spanService = createSpanService(store);
  attachWorkerSkillRoutes(route,{store,authenticate,handle,classifySkillText});
  route.post('/api/ai-board/worker/tickets/:id/spans', authenticate, handle(async (req,res) => {
    res.json(await spanService.record(req.params.id, req.body || {}));
  }));
  const toolCheckpoint = createToolCheckpointService(store);
  const rootAllowance = createRootAllowanceService(store);
  route.post('/api/ai-board/worker/tickets/:id/allowance/:op', authenticate, handle(async (req, res) => {
    res.json(await rootAllowance.apply(req.params.id, req.params.op, req.body || {}));
  }));
  route.post('/api/ai-board/worker/tickets/:id/checkpoint/:op', authenticate, handle(async (req,res) => {
    res.json(await toolCheckpoint.apply(req.params.id, req.params.op, req.body || {}));
  }));
  route.post('/api/ai-board/worker/tickets/:id/hsm/authority', authenticate, handle(async (req,res) => {
    res.json(await hsm.authorizeAction(req.params.id,req.body || {}));
  }));

  route.post('/api/ai-board/worker/claim', authenticate, handle(async (req, res) => {
    const ticket = await store.claimNext({
      workerId: req.body?.worker_id,
      version: req.body?.version,
      mode: req.body?.mode,
      intent: req.body?.intent || 'precheck',
      leaseMs,
      yieldNew: activeChats() > 0, // người đang chat làm rõ: GPU cho họ trước
    });
    res.json({ ticket, ...(!ticket && activeChats() > 0 ? { reason: 'yield_to_chat' } : {}) });
  }));

  route.post('/api/ai-board/worker/tickets/:id/snapshot', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json({ ...await store.getLeasedSnapshot(req.params.id, lease.workerId, lease.leaseToken), lessons_schema_version: 1,
      hsm_contract:publicContract(), root_allowance_protocol: 1 });
  }));

  // Model preflight failed: the worker holds no lease, so this only records why queued work waits and when it retries.
  route.post('/api/ai-board/worker/gpu-state', authenticate, handle(async (req, res) => {
    const body = req.body || {};
    res.json(await store.recordGpuState(String(body.worker_id || '').trim(), {
      model: body.model ? String(body.model).slice(0, 120) : null,
      error: body.error ? String(body.error).slice(0, 300) : null,
      retryAt: body.retry_at == null ? null : Number(body.retry_at),
      version: body.version || 'unknown', mode: body.mode || 'active',
    }));
  }));

  route.post('/api/ai-board/worker/tickets/:id/heartbeat', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json({ ok: true, ...await store.heartbeat(req.params.id, lease.workerId, lease.leaseToken, { leaseMs }) });
  }));

  route.post('/api/ai-board/worker/tickets/:id/runs', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    const run = await store.createRun(req.params.id, {
      ...lease,
      trigger: req.body?.trigger,
      idempotencyKey: req.body?.idempotency_key,
    });
    res.json({ run });
  }));

  route.post('/api/ai-board/worker/tickets/:id/events', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    const event = await store.recordWorkerEvent(req.params.id, {
      ...lease,
      runId: req.body?.run_id,
      eventType: req.body?.event_type,
      publicMessage: req.body?.public_message,
      internalDetail: req.body?.internal_detail,
      gate: req.body?.gate,
      attempt: req.body?.attempt,
      idempotencyKey: req.body?.idempotency_key,
    });
    res.json({ event });
  }));

  route.post('/api/ai-board/worker/tickets/:id/clarifications', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    const guarded = guardModelText(req.body?.question, 'question', 'ask');
    const result = await store.requestWorkerClarification(req.params.id, {
      ...lease, runId: req.body?.run_id, question: guarded.text,
      escalateReason: guarded.replaced ? `unsafe_model_question:${guarded.reason}` : '',
      maxQuestions: MAX_QUESTIONS, idempotencyKey: req.body?.idempotency_key,
    });
    res.json(result);
    if (result.status === 'clarifying' && !result.duplicate && onClarify) {
      try { await onClarify(result); } catch (error) { console.warn('[ai-board] clarification notification failed:', error.message); }
    }
  }));

  route.post('/api/ai-board/worker/tickets/:id/traces', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json(await store.recordModelCalls(req.params.id, { ...lease, runId: req.body?.run_id, calls: req.body?.calls }));
  }));

  route.post('/api/ai-board/worker/tickets/:id/plan', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    const result = await store.submitPlan(req.params.id, {
      ...lease,
      runId: req.body?.run_id,
      plan: req.body?.plan,
      budgetUsed: req.body?.budget_used,
      idempotencyKey: req.body?.idempotency_key,
    });
    res.json(result);
  }));

  // Kế hoạch xin quyền chạm mức trên 'surface' (protected/core) cho chính lượt này; quản trị viên quyết ở tab yêu cầu.
  route.post('/api/ai-board/worker/tickets/:id/elevation', authenticate, handle(async (req, res) => {
    const root = await store.queryGet('SELECT source_request_id FROM ai_tickets WHERE id=? AND parent_id IS NULL',
      [Number(req.params.id)]);
    if (!root) return res.status(404).json({ error: 'request_not_found' });
    res.json(await store.requestElevation(root.source_request_id, {
      paths: req.body?.paths ?? req.body?.scope ?? req.body?.required, levels: req.body?.levels, reason: req.body?.reason,
      plan_hash: req.body?.plan_hash, plan_revision: req.body?.plan_revision, plan: req.body?.plan,
      actorId: req.body?.worker_id,
    }));
  }));

  route.post('/api/ai-board/worker/tickets/:id/resume-plan', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json(await store.resumeAuthorizedPlan(req.params.id, { ...lease, runId: req.body?.run_id }));
  }));

  route.post('/api/ai-board/worker/tickets/:id/journal', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json(await store.recordAttemptJournal(req.params.id, {
      ...lease, runId: req.body?.run_id, node: req.body?.node, outcome: req.body?.outcome,
      state: req.body?.state, ledger: req.body?.ledger,
    }));
  }));

  route.post('/api/ai-board/worker/tickets/:id/rollback', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json(await store.submitRollback(req.params.id, {
      ...lease, runId: req.body?.run_id, outcome: req.body?.outcome, revert: req.body?.revert, detail: req.body?.detail,
    }));
  }));

  route.post('/api/ai-board/worker/tickets/:id/reverify/start', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json(await store.startReverify(req.params.id, { ...lease, runId: req.body?.run_id, tip: req.body?.tip }));
  }));

  route.post('/api/ai-board/worker/tickets/:id/reverify/conflict', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json(await store.submitReverifyConflict(req.params.id, { ...lease, runId: req.body?.run_id, tip: req.body?.tip, files: req.body?.files, detail: req.body?.detail }));
  }));

  route.post('/api/ai-board/worker/base', authenticate, handle(async (req, res) => {
    res.json(await store.recordBaseObservation({ ref: req.body?.ref, sha: req.body?.sha }));
  }));

  route.post('/api/ai-board/worker/tickets/:id/verdict', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    const verdict = await store.submitPrePrVerdict(req.params.id, {
      ...lease,
      runId: req.body?.run_id,
      verdict: req.body?.verdict,
      idempotencyKey: req.body?.idempotency_key,
    });
    const notice = await aux.afterVerdict(store.db, req.params.id, verdict);
    if (verdict.outcome === 'blocked') await aux.recordMiss(store.db, req.body.run_id, 'verdict_blocked');
    res.json({ verdict });
    if (notice && onVerdict) {
      try { await onVerdict(notice); } catch (error) { console.warn('[ai-board] verdict notification failed:', error.message); }
    }
  }));

  // Task eval đã gắn nhãn: server chia học / kiểm tra theo thời gian, worker không tự chia.
  route.post('/api/ai-board/worker/eval-tasks', authenticate, handle(async (_req, res) => {
    res.json(await aux.evalTaskSplit(store.db));
  }));

  // Board tự sửa đã tắt: luôn 403 self_request_disabled.
  route.post('/api/ai-board/worker/self-requests', authenticate, handle(async (req, res) => {
    try {
      res.json({ ok: true, ...await store.createSelfRequest({ title: req.body?.title, detail: req.body?.detail,
        targetFile: req.body?.target_file, idempotencyKey: req.body?.idempotency_key }) });
    } catch (error) {
      if (error instanceof WorkerContractError) return res.status(error.status).json({ error: error.code, message: error.message });
      if (error instanceof RequestValidationError) return res.status(400).json({ error: 'invalid_request', message: error.message });
      throw error;
    }
  }));


  // Trạng thái PR: worker hỏi GitHub các PR này rồi báo PR đã đóng; không webhook.
  route.post('/api/ai-board/worker/pull-requests/open', authenticate, handle(async (_req, res) => {
    res.json({ pull_requests: await aux.openPullRequests(store.db) });
  }));
  route.post('/api/ai-board/worker/pull-requests/state', authenticate, handle(async (req, res) => {
    res.json({ pull_request: await aux.reportPullRequest(store.db, req.body) });
  }));

  // Ảnh bản nháp: auth trước rồi mới parse body lớn; content-type riêng để express.json chung bỏ qua.
  route.post('/api/ai-board/worker/tickets/:id/screenshots', authenticate,
    express.json({ type: SHOTS_TYPE, limit: SHOTS_BODY_LIMIT }), async (req, res, next) => {
      if (!uploadsDir) return res.status(503).json({ error: 'uploads_unavailable' });
      if (!req.is(SHOTS_TYPE)) return res.status(415).json({ error: 'unsupported_media_type' });
      try {
        const lease = leaseInput(req.body);
        res.json(await aux.saveDraftScreenshots(store, req.params.id, {
          ...lease, runId: req.body?.run_id, images: req.body?.images, uploadsDir, backend: shotBackend,
        }));
      } catch (error) {
        if (error instanceof WorkerContractError) return res.status(error.status).json({ error: error.code, message: error.message });
        next(error);
      }
    });

  route.post('/api/ai-board/worker/tickets/:id/pull-request', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json({ pull_request: await store.recordPullRequest(req.params.id, {
      ...lease, runId: req.body?.run_id, pullRequest: req.body?.pull_request, idempotencyKey: req.body?.idempotency_key,
      changedFiles: req.body?.changed_files,
    }) });
  }));

  route.post('/api/ai-board/worker/tickets/:id/release', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    const ticket = await store.releaseLease(req.params.id, {
      ...lease,
      outcome: req.body?.outcome,
      internalDetail: req.body?.internal_detail,
      idempotencyKey: req.body?.idempotency_key,
    });
    res.json({ ok: true, ticket });
  }));
  return true;
}
