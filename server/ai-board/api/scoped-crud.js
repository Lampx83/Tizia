import { createScopedCrud, ScopedCrudError } from '../repositories/scoped-crud.js';

// Reuse serving authentication/CSRF. The session token is never accepted from a JSON body.
export function attachScopedCrudRoutes(router, { db, requireAuth, requireStrictCsrf, sessionToken }) {
  if (typeof sessionToken !== 'function') throw new Error('A trusted serving-session resolver is required');
  const store = createScopedCrud(db);
  const base = '/api/ai-board/features/:featureId/resources';
  const wrap = (fn) => async (req, res, next) => {
    try {
      const identity = { id: req.user.id, sessionToken: sessionToken(req) };
      const { _csrf, ...body } = req.body || {};
      res.json(await fn(identity, req.params, body, req.query));
    } catch (error) {
      if (error instanceof ScopedCrudError) return res.status(error.status).json({ error: error.code });
      if (error.code === '23505') return res.status(409).json({ error: 'already_exists' });
      if (error.code === '23503') return res.status(400).json({ error: 'invalid_identity' });
      next(error);
    }
  };
  const post = (suffix, fn) => router.post(base + suffix, requireAuth, requireStrictCsrf, wrap(fn));
  const get = (suffix, fn) => router.get(base + suffix, requireAuth, wrap(fn));
  post('', (a, p, b) => store.provision(a, p.featureId, b));
  get('/:resourceId/schema', (a, p) => store.schema(a, p.featureId, p.resourceId));
  post('/:resourceId/schema/expand', (a, p, b) => store.expandSchema(a, p.featureId, p.resourceId, b));
  post('/:resourceId/grants', (a, p, b) => store.grant(a, p.featureId, p.resourceId, b));
  post('/:resourceId/records', (a, p, b) => store.create(a, p.featureId, p.resourceId, b));
  get('/:resourceId/records', (a, p, b, q) => store.list(a, p.featureId, p.resourceId, q.owner_user_id));
  get('/:resourceId/records/:recordId', (a, p) => store.read(a, p.featureId, p.resourceId, p.recordId));
  get('/:resourceId/records/:recordId/history', (a, p) => store.history(a, p.featureId, p.resourceId, p.recordId));
  get('/:resourceId/technical-trace', (a, p) => store.technicalTrace(a, p.featureId, p.resourceId));
  post('/:resourceId/records/:recordId/rollback', (a, p, b) => store.rollback(a, p.featureId, p.resourceId, p.recordId, b));
  for (const [path, kind] of [['update', 'updated'], ['delete', 'deleted'], ['owner', 'owner_changed']]) {
    post(`/:resourceId/records/:recordId/${path}`, (a, p, b) => store.mutate(a, p.featureId, p.resourceId, p.recordId, b, kind));
  }
  // Logical expiry is enforced on every read; platform sweeps reclaim dormant payloads.
  const sweep = () => store.prune().catch((error) => console.error('[scoped-crud] retention sweep failed', error));
  sweep();
  setInterval(sweep, 3600000).unref();
  return store;
}
