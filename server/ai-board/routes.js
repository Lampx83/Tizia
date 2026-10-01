import { createHash, timingSafeEqual } from 'node:crypto';
import express from 'express';
import { ADMIN_REQUEST_STATUSES, assertConfirmed, LEASE_MS, LIMITS, PlanGuardrailError, RequestValidationError, WorkerContractError } from './store.js';
import { afterVerdict, retryRequest, retryState, saveDraftScreenshots, SHOTS_BODY_LIMIT, SHOTS_TYPE } from './drafts.js';
import { checkIntake, readOnlyVerificationText, recordIntakeFlags, recordIntakeRejection } from './intake-guard.js';
import { classifyRequest as classifyWithModel, recordClassification } from './classifier.js';
import { clarifyFromPhase, resolveClarify } from './clarity-rules.js';
import { activeChats } from './chat-activity.js';
import { deleteEvalTask, evalTaskSplit, labelEvalTask, listEvalTasks, openPullRequests, recordMiss, recordRequestMiss,
  reportPullRequest } from './eval-tasks.js';
import { listNights, recordSelfVerdict, reportNight, setSelfImproveEnabled, startNight } from './self-improve.js';
import { pendingFrozenMeasurements, recordFrozenMeasurement } from './frozen-benchmark.js';
import { checkPostMergeWatch, pendingPostMergeWatch } from './post-merge-watch.js';
import { listTransientBlocked, retryTransientTicket, setTransientRetryEnabled, transientRetryState } from './transient-retry.js';
import { guardModelText, MAX_QUESTIONS } from '../contexts/ai-board-intake/clarify.js';

// Không cấu hình model phân loại → không gọi gì (hành vi trước ticket 04).
const defaultClassifyRequest = (title, detail) => (
  process.env.OLLAMA_URL && process.env.AI_BOARD_CLASSIFIER_MODEL
    ? classifyWithModel(title, detail) : Promise.resolve(null));

export function attachAiBoardRequestRoutes(router, {
  store,
  requireAuth,
  requireEnrolled,
  requireAdmin,
  requireStrictCsrf,
  onCreated = null,
  db = null, // chỉ để intake-guard ghi cờ; thiếu thì vẫn chặn 422 bình thường
  classifyRequest = defaultClassifyRequest, // (title, detail) → {model, clarity, danger} | null
  needsProfile = () => false, // (user) → true while the onboarding is unanswered (admin never)
  onClarify = null, // ({requestId, domain, title, student}) when a new request waits for clarification (bell)
}) {
  router.post('/api/requests', requireAuth, requireEnrolled, async (req, res, next) => {
    const body = req.body || {};
    // Yêu cầu board tự sửa chỉ hệ thống tạo (POST /api/ai-board/worker/self-requests), không bao giờ từ FAB.
    if (body.type === 'self') return res.status(400).json({ error: 'invalid_request', message: 'Loại yêu cầu không hợp lệ.' });
    // Onboarding / làm rõ chỉ bật cho client có giao diện cho chúng (FAB public/ gửi header này). Client cũ
    // (FAB React web-next trên prod) vẫn gửi như trước: không 428, không kẹt ở phase clarifying.
    const features = new Set(String(req.get('X-AI-Board-Features') || '').split(',').map((f) => f.trim()));
    if (features.has('onboarding') && needsProfile(req.user)) {
      return res.status(428).json({ error: 'profile_required', message: 'Trả lời 3 câu giới thiệu trước khi gửi yêu cầu.' });
    }
    const ownerDomain = req.user.role === 'admin'
      ? String(body.domain || '').trim()
      : req.user.enrolled_domain;
    const intake = checkIntake(body.title, body.detail);
    if (intake.block) {
      try { recordIntakeRejection(db, req.user.id, intake); } catch (error) { return next(error); }
      return res.status(422).json({ error: 'request_rejected', message: intake.message });
    }
    // Mỗi người tối đa N yêu cầu đang chờ (contract.json limits): 1 người không lấp hàng đợi cả trường.
    const pendingCap = LIMITS.pending_roots_per_user.value;
    if (req.user.role !== 'admin' && store.countPendingRoots(req.user.id, req.get('Idempotency-Key')) >= pendingCap) {
      return res.status(429).json({ error: 'too_many_pending',
        message: `Bạn đang có ${pendingCap} yêu cầu chờ Ban xử lý. Đợi một yêu cầu xong rồi gửi tiếp nhé!` });
    }
    // Luật cứng đã qua. Model chỉ thêm human_review / đòi làm rõ; lỗi model = hành vi cũ.
    const classified = await classifyRequest(readOnlyVerificationText(body.title || ''), readOnlyVerificationText(body.detail || '')).catch((error) => {
      console.warn('[ai-board] classifier unavailable:', error.message);
      return null;
    });
    // Ticket 08: kết quả model ở mode 'shadow' chỉ ghi log, không hành động.
    const danger = classified?.danger?.shadow ? null : classified?.danger;
    const modelLabels = (danger?.labels || []).map((key) => `model_${key}`);
    // Làm rõ = luật cứng HOẶC model clarity 'active'; ghi lại nguồn để ticket 01 so sánh.
    const decision = resolveClarify({
      title: body.title, detail: body.detail, classified, enabled: features.has('clarify'),
      isFeature: body.type === 'feature' && !body.folder_id, // chức năng mới: luôn hỏi 3 câu, không áp luật "quá rộng"
    });
    let clarify = { needed: decision.needed, mode: decision.mode };
    const { rules } = decision;
    const trace = classified || rules.needed ? { ...classified, rules, clarify: { ...clarify, source: decision.source } } : null;
    try {
      const result = store.createRequestWithRoot({
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
        recordIntakeFlags(db, result.root_ticket_id, [...intake.labels, ...modelLabels]);
        recordClassification(db, result.root_ticket_id, trace);
        if (clarify.needed && onClarify) {
          try {
            onClarify({ requestId: result.request_id, domain: ownerDomain, title: String(body.title || '').trim(),
              student: req.user.display_name || req.user.username });
          } catch (error) {
            console.warn('[ai-board] clarify notification failed:', error.message);
          }
        }
      } else {
        // Gửi lại cùng Idempotency-Key: trả đúng trạng thái đã tạo lần đầu, không theo lần phân loại này.
        const phase = store.db.prepare('SELECT phase FROM ai_tickets WHERE id=?').get(result.root_ticket_id)?.phase;
        clarify = clarifyFromPhase(phase);
      }
      res.json({ ok: true, ...result, id: result.request_id, createdAt: Date.now(), clarify });
      if (result.created && onCreated) {
        try {
          onCreated({
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

  router.get('/api/requests', requireAuth, (req, res) => {
    const domain = String(req.query.domain || req.user.enrolled_domain || '').trim();
    if (!domain) return res.status(400).json({ error: 'domain required' });
    const items = store.listRequestsForOwner(req.user.id, domain, req.query.limit)
      .map((item) => ({ ...item, retry: retryState(store.db, item.root_ticket_id, item.phase) }));
    const stats = {};
    for (const item of items) stats[item.status] = (stats[item.status] || 0) + 1;
    res.json({ items, stats });
  });

  router.post('/api/requests/:id/cancel', requireAuth, requireStrictCsrf, (req, res) => {
    try {
      res.json(store.cancelRequest(req.params.id, { ownerUserId: req.user.id }));
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });

  // "Thử cách khác" (ticket 09): lượt hỏng của chính mình → lập plan mới; hỏng 2 lượt liền thì chờ admin.
  router.post('/api/requests/:id/retry', requireAuth, requireStrictCsrf, (req, res) => {
    const pendingCap = LIMITS.pending_roots_per_user.value;
    if (req.user.role !== 'admin' && store.countPendingRoots(req.user.id) >= pendingCap) {
      return res.status(429).json({ error: 'too_many_pending',
        message: `Bạn đang có ${pendingCap} yêu cầu chờ Ban xử lý. Đợi một yêu cầu xong rồi thử lại nhé!` });
    }
    try {
      const result = retryRequest(store, req.params.id, req.user.id);
      recordRequestMiss(store.db, req.params.id, 'retry');
      res.json(result);
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });

  router.post('/api/requests/:id/status', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    const status = String(req.body?.status || '');
    // Hủy = đóng root, không mở lại được: bắt gõ đúng số yêu cầu như hoàn tác.
    if (status === 'rejected') {
      try { assertConfirmed(req.params.id, req.body?.confirm); } catch (error) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
    }
    const ok = ADMIN_REQUEST_STATUSES.has(status)
      && (status === 'rejected' ? store.rejectRequest : store.noteRequest)(req.params.id, req.body?.note, req.user.id);
    if (!ok) return res.status(400).json({ error: 'invalid_status_or_request' });
    res.json({ ok: true });
  });

  // ── Folder chức năng (feature-folders ticket 04) ──
  const folderError = (res, error) => {
    if (error instanceof WorkerContractError) return res.status(error.status).json({ error: error.code, message: error.message });
    throw error;
  };
  router.get('/api/ai-board/folders', requireAuth, (req, res) => {
    const domain = String(req.query.domain || req.user.enrolled_domain || '').trim();
    if (!domain) return res.status(400).json({ error: 'domain required' });
    res.json(store.listFolders(req.user.id, domain));
  });
  router.post('/api/ai-board/folders/:id/vote', requireAuth, requireStrictCsrf, (req, res) => {
    try { res.json(store.voteFolder(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  router.delete('/api/ai-board/folders/:id/vote', requireAuth, requireStrictCsrf, (req, res) => {
    try { res.json(store.unvoteFolder(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  router.post('/api/ai-board/folders/:id/archive', requireAuth, requireStrictCsrf, (req, res) => {
    try { res.json(store.archiveFolder(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  router.post('/api/ai-board/folders/:id/reopen', requireAuth, requireStrictCsrf, (req, res) => {
    try { res.json(store.reopenFolder(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  router.post('/api/ai-board/folders/:id/done', requireAuth, requireStrictCsrf, (req, res) => {
    try { res.json(store.markFolderDone(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  router.post('/api/admin/ai-board/folders/:id/released', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try { res.json(store.markFolderReleased(req.params.id)); } catch (error) { folderError(res, error); }
  });
  router.get('/api/admin/ai-board/folders', requireAuth, requireAdmin, (req, res) => {
    res.json({ folders: store.listAdminFolders(req.query.limit) });
  });
  router.post('/api/admin/ai-board/folders/:id/approve', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try { res.json(store.approveFolder(req.params.id, req.user.id)); } catch (error) { folderError(res, error); }
  });
  router.post('/api/admin/ai-board/folders/:id/revoke', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try { res.json(store.revokeFolder(req.params.id)); } catch (error) { folderError(res, error); }
  });

  router.get('/api/admin/ai-board/queue', requireAuth, requireAdmin, (req, res) => {
    res.json({ tickets: store.listAdminQueue(req.query.limit), workers: store.listWorkers(),
      intake_rejections: store.db.prepare(`SELECT id, created_at, public_message, internal_detail FROM ai_alerts
        WHERE category='intake_rejected' ORDER BY id DESC LIMIT 50`).all() });
  });

  router.get('/api/admin/ai-board/requests/:requestId/trace', requireAuth, requireAdmin, (req, res) => {
    const trace = store.getRequestTrace(req.params.requestId);
    if (!trace) return res.status(404).json({ error: 'ticket_not_found' });
    res.json(trace);
  });

  router.post('/api/admin/ai-board/tickets/:id/extend-budget', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try {
      res.json(store.extendBudget(req.params.id, {
        amount: req.body?.amount, reason: req.body?.reason, adminUserId: req.user.id,
      }));
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });

  router.post('/api/admin/ai-board/requests/:requestId/rollback', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try {
      const result = store.requestRollback(req.params.requestId, { adminUserId: req.user.id, confirm: req.body?.confirm });
      recordRequestMiss(store.db, req.params.requestId, 'undo');
      res.json(result);
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });

  // ── Task eval từ lần hỏng (self-improve ticket 02) ──
  router.get('/api/admin/ai-board/eval-tasks', requireAuth, requireAdmin, (req, res) => {
    try { res.json(listEvalTasks(store.db, req.query.status || undefined)); } catch (error) { folderError(res, error); }
  });
  router.post('/api/admin/ai-board/eval-tasks/:id/label', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try { res.json({ task: labelEvalTask(store.db, req.params.id, req.body || {}) }); } catch (error) { folderError(res, error); }
  });
  router.delete('/api/admin/ai-board/eval-tasks/:id', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try { res.json(deleteEvalTask(store.db, req.params.id)); } catch (error) { folderError(res, error); }
  });

  // ── Vòng tự cải thiện ban đêm (self-improve ticket 07): công tắc + bảng các đêm, chỉ admin ──
  router.get('/api/admin/ai-board/self-improve', requireAuth, requireAdmin, (_req, res) => {
    res.json(listNights(store.db));
  });
  router.post('/api/admin/ai-board/self-improve/switch', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try { res.json(setSelfImproveEnabled(store.db, req.body?.enabled, req.user.id)); } catch (error) { folderError(res, error); }
  });

  // ── Tự chạy lại yêu cầu bị chặn do lỗi hạ tầng thoáng qua (mọi loại yêu cầu, không riêng self) ──
  router.get('/api/admin/ai-board/transient-retry', requireAuth, requireAdmin, (_req, res) => {
    res.json({ ...transientRetryState(store.db), blocked: listTransientBlocked(store.db) });
  });
  router.post('/api/admin/ai-board/transient-retry/switch', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try { res.json(setTransientRetryEnabled(store.db, req.body?.enabled, req.user.id)); } catch (error) { folderError(res, error); }
  });
  router.post('/api/admin/ai-board/tickets/:id/retry-transient', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try { res.json(retryTransientTicket(store.db, req.params.id)); } catch (error) { folderError(res, error); }
  });

  router.post('/api/admin/ai-board/tickets/:id/authorize-plan', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try {
      res.json(store.authorizePlan(req.params.id, req.body?.plan_hash, req.user.id));
    } catch (error) {
      if (error instanceof WorkerContractError) {
        return res.status(error.status).json({ error: error.code, message: error.message });
      }
      throw error;
    }
  });
  router.post('/api/admin/ai-board/requests/:id/replan', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    try { res.json(store.clarifyAndReplan(req.params.id, req.body?.spec, req.user.id)); }
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
  onVerdict = null, // ({request_id, title, domain, student, kind}) sau mỗi verdict: chuông cho người gửi
  onSelfWin = null, // ({night, request_id}) biến thể tự cải thiện thắng eval: chuông cho admin
  onClarify = null, // ({requestId, title, domain, student}) khi Gate 2.5 cần người gửi làm rõ
}) {
  const key = String(env.AI_BOARD_WORKER_KEY || '').trim();
  if (key.length < 24) return false;
  const expected = digest(key);
  const authenticate = (req, res, next) => {
    const sent = req.headers['x-ai-worker-key'];
    if (typeof sent !== 'string' || !sent) return res.status(401).json({ error: 'unauthorized' });
    if (!timingSafeEqual(digest(sent), expected)) return res.status(403).json({ error: 'forbidden' });
    next();
  };
  const handle = (fn) => (req, res) => {
    try {
      fn(req, res);
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
      throw error;
    }
  };
  const leaseInput = (body = {}) => ({
    workerId: String(body.worker_id || ''),
    leaseToken: String(body.lease_token || ''),
  });

  router.post('/api/ai-board/worker/claim', authenticate, handle((req, res) => {
    const ticket = store.claimNext({
      workerId: req.body?.worker_id,
      version: req.body?.version,
      mode: req.body?.mode,
      intent: req.body?.intent || 'precheck',
      leaseMs,
      yieldNew: activeChats() > 0, // người đang chat làm rõ: GPU cho họ trước
    });
    res.json({ ticket, ...(!ticket && activeChats() > 0 ? { reason: 'yield_to_chat' } : {}) });
  }));

  router.post('/api/ai-board/worker/tickets/:id/snapshot', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    res.json(store.getLeasedSnapshot(req.params.id, lease.workerId, lease.leaseToken));
  }));

  router.post('/api/ai-board/worker/tickets/:id/heartbeat', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    res.json({ ok: true, ...store.heartbeat(req.params.id, lease.workerId, lease.leaseToken, { leaseMs }) });
  }));

  router.post('/api/ai-board/worker/tickets/:id/runs', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    const run = store.createRun(req.params.id, {
      ...lease,
      trigger: req.body?.trigger,
      idempotencyKey: req.body?.idempotency_key,
    });
    res.json({ run });
  }));

  router.post('/api/ai-board/worker/tickets/:id/events', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    const event = store.recordWorkerEvent(req.params.id, {
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

  router.post('/api/ai-board/worker/tickets/:id/clarifications', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    const guarded = guardModelText(req.body?.question, 'question', 'ask');
    const result = store.requestWorkerClarification(req.params.id, {
      ...lease, runId: req.body?.run_id, question: guarded.text,
      escalateReason: guarded.replaced ? `unsafe_model_question:${guarded.reason}` : '',
      maxQuestions: MAX_QUESTIONS, idempotencyKey: req.body?.idempotency_key,
    });
    res.json(result);
    if (result.status === 'clarifying' && !result.duplicate && onClarify) {
      try { onClarify(result); } catch (error) { console.warn('[ai-board] clarification notification failed:', error.message); }
    }
  }));

  router.post('/api/ai-board/worker/tickets/:id/traces', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    res.json(store.recordModelCalls(req.params.id, { ...lease, runId: req.body?.run_id, calls: req.body?.calls }));
  }));

  router.post('/api/ai-board/worker/tickets/:id/plan', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    const result = store.submitPlan(req.params.id, {
      ...lease,
      runId: req.body?.run_id,
      plan: req.body?.plan,
      budgetUsed: req.body?.budget_used,
      idempotencyKey: req.body?.idempotency_key,
    });
    res.json(result);
  }));

  router.post('/api/ai-board/worker/tickets/:id/resume-plan', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    res.json(store.resumeAuthorizedPlan(req.params.id, { ...lease, runId: req.body?.run_id }));
  }));

  router.post('/api/ai-board/worker/tickets/:id/rollback', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    res.json(store.submitRollback(req.params.id, {
      ...lease, runId: req.body?.run_id, outcome: req.body?.outcome, revert: req.body?.revert, detail: req.body?.detail,
    }));
  }));

  router.post('/api/ai-board/worker/tickets/:id/verdict', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    const verdict = store.submitPrePrVerdict(req.params.id, {
      ...lease,
      runId: req.body?.run_id,
      verdict: req.body?.verdict,
      idempotencyKey: req.body?.idempotency_key,
    });
    const notice = afterVerdict(store.db, req.params.id, verdict);
    if (verdict.outcome === 'blocked') recordMiss(store.db, req.body.run_id, 'verdict_blocked');
    const won = recordSelfVerdict(store.db, req.params.id, verdict);
    res.json({ verdict });
    if (won && onSelfWin) {
      try { onSelfWin(won); } catch (error) { console.warn('[ai-board] self win notification failed:', error.message); }
    }
    if (notice && onVerdict) {
      try { onVerdict(notice); } catch (error) { console.warn('[ai-board] verdict notification failed:', error.message); }
    }
  }));

  // Task eval đã gắn nhãn (self-improve ticket 02): server chia học / kiểm tra theo thời gian, worker không tự chia.
  router.post('/api/ai-board/worker/eval-tasks', authenticate, handle((_req, res) => {
    res.json(evalTaskSplit(store.db));
  }));

  // Board tự sửa (self-improve ticket 04): yêu cầu self, chủ là người dùng hệ thống ai-board; file ngoài vùng → 422.
  router.post('/api/ai-board/worker/self-requests', authenticate, handle((req, res) => {
    try {
      res.json({ ok: true, ...store.createSelfRequest({ title: req.body?.title, detail: req.body?.detail,
        targetFile: req.body?.target_file, idempotencyKey: req.body?.idempotency_key }) });
    } catch (error) {
      if (error instanceof RequestValidationError) return res.status(400).json({ error: 'invalid_request', message: error.message });
      throw error;
    }
  }));

  // Vòng đêm (self-improve ticket 07): worker hỏi được chạy không (tạo dòng đêm), rồi ghi từng bước vào dòng đó.
  router.post('/api/ai-board/worker/self-improve/night', authenticate, handle((req, res) => {
    res.json(startNight(store.db, req.body?.night));
  }));
  router.post('/api/ai-board/worker/self-improve/night/report', authenticate, handle((req, res) => {
    res.json({ night: reportNight(store.db, req.body) });
  }));

  // Bộ đánh giá đóng băng (self-improve ticket 08): self PR đã merge còn cần đo, đo cùng bộ task đóng băng hiện
  // có; ghi lại đúng 1 lần điểm đo được (idempotent theo pr_number).
  router.post('/api/ai-board/worker/self-improve/frozen-benchmark/pending', authenticate, handle((_req, res) => {
    res.json(pendingFrozenMeasurements(store.db));
  }));
  router.post('/api/ai-board/worker/self-improve/frozen-benchmark/report', authenticate, handle((req, res) => {
    res.json({ score: recordFrozenMeasurement(store.db, req.body) });
  }));

  // Theo dõi production sau merge + tự revert (self-improve ticket 09): self PR đã merge, cửa sổ sau đã trôi
  // qua, chưa kết luận → worker gọi check đúng PR đó; server tự đọc closed_at/sha, tính tỉ lệ, ghi kết luận,
  // tự tạo đúng 1 yêu cầu self revert nếu tụt quá ngưỡng (không tự merge).
  router.post('/api/ai-board/worker/self-improve/post-merge-watch/pending', authenticate, handle((_req, res) => {
    res.json({ pending: pendingPostMergeWatch(store.db) });
  }));
  router.post('/api/ai-board/worker/self-improve/post-merge-watch/check', authenticate, handle((req, res) => {
    res.json({ watch: checkPostMergeWatch(store.db, req.body?.pr_number, store.createSelfRequest) });
  }));

  // Trạng thái PR (self-improve ticket 03): worker hỏi GitHub các PR này rồi báo PR đã đóng; không webhook.
  router.post('/api/ai-board/worker/pull-requests/open', authenticate, handle((_req, res) => {
    res.json({ pull_requests: openPullRequests(store.db) });
  }));
  router.post('/api/ai-board/worker/pull-requests/state', authenticate, handle((req, res) => {
    res.json({ pull_request: reportPullRequest(store.db, req.body) });
  }));

  // Ảnh bản nháp (ticket 09): auth trước rồi mới parse body lớn; content-type riêng để express.json chung bỏ qua.
  router.post('/api/ai-board/worker/tickets/:id/screenshots', authenticate,
    express.json({ type: SHOTS_TYPE, limit: SHOTS_BODY_LIMIT }), async (req, res, next) => {
      if (!uploadsDir) return res.status(503).json({ error: 'uploads_unavailable' });
      if (!req.is(SHOTS_TYPE)) return res.status(415).json({ error: 'unsupported_media_type' });
      try {
        const lease = leaseInput(req.body);
        res.json(await saveDraftScreenshots(store, req.params.id, {
          ...lease, runId: req.body?.run_id, images: req.body?.images, uploadsDir,
        }));
      } catch (error) {
        if (error instanceof WorkerContractError) return res.status(error.status).json({ error: error.code, message: error.message });
        next(error);
      }
    });

  router.post('/api/ai-board/worker/tickets/:id/pull-request', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    res.json({ pull_request: store.recordPullRequest(req.params.id, {
      ...lease, runId: req.body?.run_id, pullRequest: req.body?.pull_request, idempotencyKey: req.body?.idempotency_key,
    }) });
  }));

  router.post('/api/ai-board/worker/tickets/:id/release', authenticate, handle((req, res) => {
    const lease = leaseInput(req.body);
    const ticket = store.releaseLease(req.params.id, {
      ...lease,
      outcome: req.body?.outcome,
      internalDetail: req.body?.internal_detail,
      idempotencyKey: req.body?.idempotency_key,
    });
    res.json({ ok: true, ticket });
  }));
  return true;
}
