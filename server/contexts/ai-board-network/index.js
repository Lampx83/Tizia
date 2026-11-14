// ============================================================
// AI Board — hàng đợi yêu cầu mạng (admin duyệt)
// ============================================================
// Run cần gói npm / URL ngoài thì dừng ở waiting_admin; admin liệt kê, duyệt, từ chối từng mục.
// Duyệt hết mục chờ → run về hàng đợi, resume từ checkpoint. Giao diện thẻ nằm ở ticket khác.
// ============================================================
import { asyncRoutes } from '../../ai-board/async-routes.js';
import { WorkerContractError } from '../../ai-board/repositories/store-contract.js';
import { createNetworkRequestRepository } from '../../ai-board/repositories/network-requests.js';
import { decide, listForRequest, pendingCounts } from '../../ai-board/services/network-requests.js';

export function attachAiBoardNetwork(router, { db, requireAuth, requireAdmin, requireStrictCsrf, repo = createNetworkRequestRepository(db) }) {
  const route = asyncRoutes(router);
  const guarded = (handler) => async (req, res) => {
    try { await handler(req, res); } catch (error) {
      if (error instanceof WorkerContractError) return res.status(error.status).json({ error: error.code, message: error.message });
      throw error;
    }
  };
  const id = (req) => Number(req.params.id);
  const decideRoute = (decision) => guarded(async (req, res) => {
    if (!Number.isSafeInteger(id(req)) || id(req) < 1) throw new WorkerContractError('invalid id', 400, 'invalid_id');
    res.json(await decide(repo, id(req), { decision, reason: decision === 'rejected' ? req.body?.reason : null, adminId: req.user.id }));
  });

  route.get('/api/admin/ai-board/network-requests/pending-count', requireAuth, requireAdmin, guarded(async (_req, res) => {
    const counts = await pendingCounts(repo);
    res.json({ counts, total: Object.values(counts).reduce((sum, n) => sum + n, 0) });
  }));
  route.get('/api/admin/ai-board/requests/:id/network-requests', requireAuth, requireAdmin, guarded(async (req, res) => {
    const status = ['pending', 'approved', 'rejected'].includes(req.query.status) ? req.query.status : null;
    res.json({ items: await listForRequest(repo, id(req), status) });
  }));
  route.post('/api/admin/ai-board/network-requests/:id/approve', requireAuth, requireAdmin, requireStrictCsrf, decideRoute('approved'));
  route.post('/api/admin/ai-board/network-requests/:id/reject', requireAuth, requireAdmin, requireStrictCsrf, decideRoute('rejected'));
}
