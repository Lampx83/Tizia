// ============================================================
// AI Board — duyệt thay đổi cơ sở dữ liệu trước khi lên dev
// ============================================================
// Candidate có thay đổi DB dừng ở awaiting_db_approval: admin xem SQL, kết quả chạy thử trên
// Postgres sandbox và file liên quan; duyệt thì worker đẩy nhánh + mở PR, từ chối thì dừng kèm lý do.
// Hợp đồng API: docs/local/lf315-db-approval-api.md.
// ============================================================
import { asyncRoutes } from '../../ai-board/async-routes.js';
import { WorkerContractError } from '../../ai-board/repositories/store-contract.js';

const guarded = (handler) => async (req, res) => {
  try { await handler(req, res); } catch (error) {
    if (error instanceof WorkerContractError) return res.status(error.status).json({ error: error.code, message: error.message });
    throw error;
  }
};

/** Admin routes; mounted from attachAiBoardRequestRoutes so both the web and the split board server serve them. */
export function attachAiBoardDbApproval(router, { store, requireAuth, requireAdmin, requireStrictCsrf }) {
  const route = asyncRoutes(router);
  const status = (req) => (req.query.status === 'all' ? 'all' : 'pending');
  route.get('/api/admin/ai-board/db-approvals', requireAuth, requireAdmin, guarded(async (req, res) => {
    res.json({ items: await store.listDbApprovals({ status: status(req) }) });
  }));
  route.get('/api/admin/ai-board/requests/:id/db-approvals', requireAuth, requireAdmin, guarded(async (req, res) => {
    res.json({ items: await store.listDbApprovals({ requestId: Number(req.params.id), status: status(req) }) });
  }));
  const decide = (decision) => guarded(async (req, res) => {
    res.json(await store.decideDbApproval(Number(req.params.id), req.params.itemId, {
      decision, reason: req.body?.reason, headSha: req.body?.head_sha, adminUserId: req.user.id,
    }));
  });
  route.post('/api/admin/ai-board/requests/:id/db-approvals/:itemId/approve', requireAuth, requireAdmin, requireStrictCsrf, decide('approved'));
  route.post('/api/admin/ai-board/requests/:id/db-approvals/:itemId/reject', requireAuth, requireAdmin, requireStrictCsrf, decide('rejected'));
}

/** Worker route: result of pushing an approved candidate; closes the publish lease. */
export function attachDbApprovalWorkerRoutes(route, { store, authenticate, handle }) {
  route.post('/api/ai-board/worker/tickets/:id/db-publish', authenticate, handle(async (req, res) => {
    res.json(await store.finishDbPublish(req.params.id, {
      workerId: String(req.body?.worker_id || ''), leaseToken: String(req.body?.lease_token || ''),
      runId: req.body?.run_id, ok: req.body?.ok === true, detail: req.body?.detail,
    }));
  }));
}
