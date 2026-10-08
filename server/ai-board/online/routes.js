import { ScopedCrudError } from '../repositories/scoped-crud.js';
import { BrokerError } from './adapter.js';
import { SchemaError, validateUiSchema } from './schema.js';

/** Online feature routes. Same session + strict CSRF seam as scoped CRUD; the session token never comes from the body. */
export function attachOnlineRoutes(router, { requireAuth, requireAdmin, requireStrictCsrf, sessionToken, broker, registry, backend, adapterNames = [],
  releaseAllowed = async () => true }) {
  if (typeof sessionToken !== 'function') throw new Error('A trusted serving-session resolver is required');
  const base = '/api/ai-board/features/:featureId/online';
  const guard = (fn) => async (req, res, next) => {
    try {
      res.json(await fn({ id: req.user.id, sessionToken: sessionToken(req) }, req));
    } catch (error) {
      if (error instanceof ScopedCrudError || error instanceof BrokerError) return res.status(error.status).json({ error: error.code });
      if (error instanceof SchemaError) return res.status(422).json({ error: error.code });
      next(error);
    }
  };
  const body = (req) => { const { _csrf, ...rest } = req.body || {}; return rest; };
  router.post(`${base}/invoke`, requireAuth, requireStrictCsrf, guard((identity, req) => broker.invoke(identity, req.params.featureId, body(req))));
  router.post(`${base}/backend`, requireAuth, requireStrictCsrf, guard((identity, req) => backend.run(identity, req.params.featureId, body(req))));
  // Schema is re-validated at serve time; record data is still fetched through scoped CRUD, which checks grants per call.
  router.get(`${base}/ui`, requireAuth, guard(async (identity, req) => {
    if (!await releaseAllowed(identity, req.params.featureId)) throw new BrokerError('feature_unavailable', 404);
    const raw = await registry.ui(req.params.featureId);
    if (!raw) throw new BrokerError('ui_not_found', 404);
    return validateUiSchema(raw, { approvedOperations: await broker.approvedOperations(req.params.featureId) });
  }));
  // Admin registration of approved operations + declarative UI + isolated backend script. Nothing registered = everything denied.
  router.post('/api/admin/ai-board/features/:featureId/online', requireAuth, requireAdmin, requireStrictCsrf,
    guard((identity, req) => registry.register(req.params.featureId, identity.id, body(req), { adapterNames })));
}
