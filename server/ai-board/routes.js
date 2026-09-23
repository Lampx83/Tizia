import { createHash, timingSafeEqual } from 'node:crypto';
import { PlanGuardrailError, WorkerContractError } from './store.js';

export function attachAiBoardRequestRoutes(router, {
  store,
  requireAuth,
  requireEnrolled,
  requireAdmin,
  requireStrictCsrf,
  onCreated = null,
}) {
  router.post('/api/requests', requireAuth, requireEnrolled, (req, res) => {
    const body = req.body || {};
    const ownerDomain = req.user.role === 'admin'
      ? String(body.domain || '').trim()
      : req.user.enrolled_domain;
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
      });
      res.json({ ok: true, ...result, id: result.request_id, createdAt: Date.now() });
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
      res.status(400).json({ error: 'invalid_request', message: error.message });
    }
  });

  router.get('/api/requests', requireAuth, (req, res) => {
    const domain = String(req.query.domain || req.user.enrolled_domain || '').trim();
    if (!domain) return res.status(400).json({ error: 'domain required' });
    const items = store.listRequestsForOwner(req.user.id, domain, req.query.limit);
    const stats = {};
    for (const item of items) stats[item.status] = (stats[item.status] || 0) + 1;
    res.json({ items, stats });
  });

  router.post('/api/requests/:id/status', requireAuth, requireAdmin, requireStrictCsrf, (req, res) => {
    const status = String(req.body?.status || '');
    const ok = store.setRequestStatus(req.params.id, status, req.body?.note, req.user.id);
    if (!ok) return res.status(400).json({ error: 'invalid_status_or_request' });
    res.json({ ok: true });
  });

  router.get('/api/admin/ai-board/queue', requireAuth, requireAdmin, (req, res) => {
    res.json({ tickets: store.listAdminQueue(req.query.limit), workers: store.listWorkers() });
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
}

function digest(value) {
  return createHash('sha256').update(String(value), 'utf8').digest();
}

export function attachAiBoardWorkerRoutes(router, {
  store,
  env = process.env,
  leaseMs = 120_000,
}) {
  const key = String(env.AI_BOARD_WORKER_KEY || env.AI_BOARD_KEY || '').trim();
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
    });
    res.json({ ticket });
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
      idempotencyKey: req.body?.idempotency_key,
    });
    res.json({ event });
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
