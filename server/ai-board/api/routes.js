import { createHash, timingSafeEqual } from 'node:crypto';
import express from 'express';
import { ADMIN_REQUEST_STATUSES, assertConfirmed, LEASE_MS, LIMITS, PlanGuardrailError, RequestValidationError, WorkerContractError } from '../repositories/store-contract.js';
import { SHOTS_BODY_LIMIT, SHOTS_TYPE } from '../services/drafts.js';
import * as asyncAux from '../services/aux-service.js';
import { asyncRoutes } from './async-routes.js';
import { checkIntake, readOnlyVerificationText } from '../security/intake-guard.js';
import { classifyRequest as classifyWithModel } from '../security/classifier.js';
import { clarifyFromPhase, resolveClarify } from '../services/clarity-rules.js';
import { activeChats } from '../services/chat-activity.js';
import { guardModelText, MAX_QUESTIONS } from '../../contexts/ai-board-intake/clarify.js';

// Không cấu hình model phân loại → không gọi gì (không phân loại).
const defaultClassifyRequest = (title, detail) => (
  (process['env'].OLLAMA_URL || process['env'].VLLM_URL) && process['env'].AI_BOARD_CLASSIFIER_MODEL
    ? classifyWithModel(title, detail) : Promise.resolve(null));

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
  needsProfile = () => false, // (user) → true while the onboarding is unanswered (admin never)
  onClarify = null, // ({requestId, domain, title, student}) when a new request waits for clarification (bell)
  aux = asyncAux, // helper modules (aux-async.js)
}) {
  const route = asyncRoutes(router);
  route.post('/api/requests', requireAuth, requireEnrolled, async (req, res, next) => {
    const body = req.body || {};
    // Yêu cầu board tự sửa chỉ hệ thống tạo (POST /api/ai-board/worker/self-requests), không bao giờ từ FAB.
    if (body.type === 'self') return res.status(400).json({ error: 'invalid_request', message: 'Loại yêu cầu không hợp lệ.' });
    // Onboarding / làm rõ chỉ bật cho client có giao diện cho chúng (FAB public/ gửi header này). Client cũ
    // (FAB React web-next trên prod) vẫn gửi như trước: không 428, không kẹt ở phase clarifying.
    const features = new Set(String(req.get('X-AI-Board-Features') || '').split(',').map((f) => f.trim()));
    if (features.has('onboarding') && await needsProfile(req.user)) {
      return res.status(428).json({ error: 'profile_required', message: 'Trả lời 3 câu giới thiệu trước khi gửi yêu cầu.' });
    }
    const ownerDomain = req.user.role === 'admin'
      ? String(body.domain || '').trim()
      : req.user.enrolled_domain;
    const intake = checkIntake(body.title, body.detail);
    if (intake.block) {
      try { await aux.recordIntakeRejection(db, req.user.id, intake); } catch (error) { return next(error); }
      return res.status(422).json({ error: 'request_rejected', message: intake.message });
    }
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
    // Làm rõ = luật cứng HOẶC model clarity 'active'; ghi lại nguồn để so sánh luật vs model.
    const decision = resolveClarify({
      title: body.title, detail: body.detail, classified, enabled: features.has('clarify'),
      isFeature: body.type === 'feature' && !body.folder_id, // chức năng mới: luôn hỏi 3 câu, không áp luật "quá rộng"
    });
    let clarify = { needed: decision.needed, mode: decision.mode };
    const { rules } = decision;
    const trace = classified || rules.needed ? { ...classified, rules, clarify: { ...clarify, source: decision.source } } : null;
    try {
      const result = await store.createRequestWithRoot({
        ownerUserId: req.user.id,
        ownerDomain,
        ownerDisplayName: req.user.display_name || req.user.username,
        idempotencyKey: req.get('Idempotency-Key'),
        type: body.type,
        title: body.title,
        detail: body.detail,
        attachments: body.attachments,
        folderId: body.folder_id ? Number(body.folder_id) : null,
        clarifying: clarify.needed,
      });
      if (result.created) {
        await aux.recordIntakeFlags(db, result.root_ticket_id, [...intake.labels, ...modelLabels]);
        await aux.recordClassification(db, result.root_ticket_id, trace);
        if (clarify.needed && onClarify) {
          try {
            await onClarify({ requestId: result.request_id, domain: ownerDomain, title: String(body.title || '').trim(),
              student: req.user.display_name || req.user.username });
          } catch (error) {
            console.warn('[ai-board] clarify notification failed:', error.message);
          }
        }
      } else {
        // Gửi lại cùng Idempotency-Key: trả đúng trạng thái đã tạo lần đầu, không theo lần phân loại này.
        const phase = (await store.queryGet('SELECT phase FROM ai_tickets WHERE id=?', [result.root_ticket_id]))?.phase;
        clarify = clarifyFromPhase(phase);
      }
      res.json({ ok: true, ...result, id: result.request_id, createdAt: Date.now(), clarify });
      if (result.created && onCreated) {
        try {
          await onCreated({
            requestId: result.request_id,
            domain: ownerDomain,
            title: String(body.title || '').trim(),
            student: req.user.display_name || req.user.username,
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
    const items = [];
    for (const item of await store.listRequestsForOwner(req.user.id, domain, req.query.limit)) {
      items.push({ ...item, retry: await aux.retryState(store.db, item.root_ticket_id, item.phase) });
    }
    const stats = {};
    for (const item of items) stats[item.status] = (stats[item.status] || 0) + 1;
    res.json({ items, stats });
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

  route.get('/api/admin/ai-board/requests/:requestId/trace', requireAuth, requireAdmin, async (req, res) => {
    const trace = await store.getRequestTrace(req.params.requestId);
    if (!trace) return res.status(404).json({ error: 'ticket_not_found' });
    res.json(trace);
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

  // ── Vòng tự cải thiện ban đêm: công tắc + bảng các đêm, chỉ admin ──
  route.get('/api/admin/ai-board/self-improve', requireAuth, requireAdmin, async (_req, res) => {
    res.json(await aux.listNights(store.db));
  });
  route.post('/api/admin/ai-board/self-improve/switch', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await aux.setSelfImproveEnabled(store.db, req.body?.enabled, req.user.id)); } catch (error) { folderError(res, error); }
  });

  // ── Tự chạy lại yêu cầu bị chặn do lỗi hạ tầng thoáng qua (mọi loại yêu cầu, không riêng self) ──
  route.get('/api/admin/ai-board/transient-retry', requireAuth, requireAdmin, async (_req, res) => {
    res.json({ ...(await aux.transientRetryState(store.db)), blocked: await aux.listTransientBlocked(store.db) });
  });
  route.post('/api/admin/ai-board/transient-retry/switch', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await aux.setTransientRetryEnabled(store.db, req.body?.enabled, req.user.id)); } catch (error) { folderError(res, error); }
  });
  route.post('/api/admin/ai-board/tickets/:id/retry-transient', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await aux.retryTransientTicket(store.db, req.params.id)); } catch (error) { folderError(res, error); }
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
  route.post('/api/admin/ai-board/requests/:id/rerun-gate', requireAuth, requireAdmin, requireStrictCsrf, async (req, res) => {
    try { res.json(await store.rerunGate(req.params.id, req.body?.gate, req.user.id)); }
    catch (error) { folderError(res, error); }
  });
}

function digest(value) {
  return createHash('sha256').update(String(value), 'utf8').digest();
}

export function attachAiBoardWorkerRoutes(router, {
  store,
  env = process.env,
  leaseMs = LEASE_MS,
  uploadsDir = null, // thư mục /uploads/requests (ảnh bản nháp); thiếu → route ảnh trả 503
  shotBackend = undefined, // backend lưu ảnh (shot-storage.js); mặc định local trong uploadsDir
  onVerdict = null, // ({request_id, title, domain, student, kind}) sau mỗi verdict: chuông cho người gửi
  onSelfWin = null, // ({night, request_id}) biến thể tự cải thiện thắng eval: chuông cho admin
  onClarify = null, // ({requestId, title, domain, student}) khi Gate 2.5 cần người gửi làm rõ
  aux = asyncAux, // PostgreSQL helpers, as in attachAiBoardRequestRoutes
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
        return res.status(error.status).json({ error: error.code, message: error.message });
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
    res.json(await store.getLeasedSnapshot(req.params.id, lease.workerId, lease.leaseToken));
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

  route.post('/api/ai-board/worker/tickets/:id/resume-plan', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json(await store.resumeAuthorizedPlan(req.params.id, { ...lease, runId: req.body?.run_id }));
  }));

  route.post('/api/ai-board/worker/tickets/:id/rollback', authenticate, handle(async (req, res) => {
    const lease = leaseInput(req.body);
    res.json(await store.submitRollback(req.params.id, {
      ...lease, runId: req.body?.run_id, outcome: req.body?.outcome, revert: req.body?.revert, detail: req.body?.detail,
    }));
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
    const won = await aux.recordSelfVerdict(store.db, req.params.id, verdict);
    res.json({ verdict });
    if (won && onSelfWin) {
      try { await onSelfWin(won); } catch (error) { console.warn('[ai-board] self win notification failed:', error.message); }
    }
    if (notice && onVerdict) {
      try { await onVerdict(notice); } catch (error) { console.warn('[ai-board] verdict notification failed:', error.message); }
    }
  }));

  // Task eval đã gắn nhãn: server chia học / kiểm tra theo thời gian, worker không tự chia.
  route.post('/api/ai-board/worker/eval-tasks', authenticate, handle(async (_req, res) => {
    res.json(await aux.evalTaskSplit(store.db));
  }));

  // Board tự sửa: yêu cầu self, chủ là người dùng hệ thống ai-board; file ngoài vùng → 422.
  route.post('/api/ai-board/worker/self-requests', authenticate, handle(async (req, res) => {
    try {
      res.json({ ok: true, ...await store.createSelfRequest({ title: req.body?.title, detail: req.body?.detail,
        targetFile: req.body?.target_file, idempotencyKey: req.body?.idempotency_key }) });
    } catch (error) {
      if (error instanceof RequestValidationError) return res.status(400).json({ error: 'invalid_request', message: error.message });
      throw error;
    }
  }));

  // Vòng đêm: worker hỏi được chạy không (tạo dòng đêm), rồi ghi từng bước vào dòng đó.
  route.post('/api/ai-board/worker/self-improve/night', authenticate, handle(async (req, res) => {
    res.json(await aux.startNight(store.db, req.body?.night));
  }));
  route.post('/api/ai-board/worker/self-improve/night/report', authenticate, handle(async (req, res) => {
    res.json({ night: await aux.reportNight(store.db, req.body) });
  }));

  // Bộ đánh giá đóng băng: self PR đã merge còn cần đo, đo cùng bộ task đóng băng hiện
  // có; ghi lại đúng 1 lần điểm đo được (idempotent theo pr_number).
  route.post('/api/ai-board/worker/self-improve/frozen-benchmark/pending', authenticate, handle(async (_req, res) => {
    res.json(await aux.pendingFrozenMeasurements(store.db));
  }));
  route.post('/api/ai-board/worker/self-improve/frozen-benchmark/report', authenticate, handle(async (req, res) => {
    res.json({ score: await aux.recordFrozenMeasurement(store.db, req.body) });
  }));

  // Theo dõi production sau merge + tự revert: self PR đã merge, cửa sổ sau đã trôi
  // qua, chưa kết luận → worker gọi check đúng PR đó; server tự đọc closed_at/sha, tính tỉ lệ, ghi kết luận,
  // tự tạo đúng 1 yêu cầu self revert nếu tụt quá ngưỡng (không tự merge).
  route.post('/api/ai-board/worker/self-improve/post-merge-watch/pending', authenticate, handle(async (_req, res) => {
    res.json({ pending: await aux.pendingPostMergeWatch(store.db) });
  }));
  route.post('/api/ai-board/worker/self-improve/post-merge-watch/check', authenticate, handle(async (req, res) => {
    res.json({ watch: await aux.checkPostMergeWatch(store.db, req.body?.pr_number, store.createSelfRequest) });
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
