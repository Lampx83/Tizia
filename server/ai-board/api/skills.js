import { createSkillService } from '../services/skills.js';
import { createSkillRepository } from '../repositories/skills.js';
import { WorkerContractError } from '../repositories/store-contract.js';
import { asyncRoutes } from './async-routes.js';

export function attachSkillRoutes(router, { store, requireAuth, requireAdmin, requireStrictCsrf, classifySkillText }) {
  const route = asyncRoutes(router), skills = createSkillService(createSkillRepository(store.db), { reviewText: classifySkillText });
  const actor = req => ({ id:req.user.id, role:req.user.role, sessionToken:req.user.token });
  const handle = fn => async (req,res,next) => {
    try { res.json(await fn(req)); }
    catch (error) { if (error instanceof WorkerContractError) res.status(error.status).json({ error:error.code, message:error.message, ...(error.retry_after_s ? { retry_after_s:error.retry_after_s, scope:error.scope } : {}) }); else next(error); }
  };
  route.get('/api/admin/ai-board/skills', requireAuth, requireAdmin, handle(() => skills.list()));
  route.post('/api/admin/ai-board/skills/count-tokens', requireAuth, requireAdmin, requireStrictCsrf, handle(req => skills.countTokens(req.body?.text)));
  route.get('/api/admin/ai-board/skills/proposals', requireAuth, requireAdmin, handle(() => skills.proposals()));
  route.get('/api/admin/ai-board/skills/:id', requireAuth, requireAdmin, handle(req => skills.read(req.params.id)));
  route.post('/api/admin/ai-board/skills', requireAuth, requireAdmin, requireStrictCsrf, handle(req => skills.upload(actor(req),req.body || {})));
  for (const action of ['approve','disable']) route.post(`/api/admin/ai-board/skills/:id/${action}`, requireAuth, requireAdmin, requireStrictCsrf,
    handle(req => skills[action](actor(req),req.params.id,req.body || {})));
  route.post('/api/admin/ai-board/skills/:id/rollback', requireAuth, requireAdmin, requireStrictCsrf, handle(req => skills.rollback(actor(req),req.params.id,req.body || {})));
  for (const [action,method] of [['rewrite','requestRewrite'],['reject','reject'],['edit','edit']]) route.post(`/api/admin/ai-board/skills/:id/versions/:versionId/${action}`,
    requireAuth, requireAdmin, requireStrictCsrf, handle(req => skills[method](actor(req),req.params.id,req.params.versionId,req.body || {})));
}

export function attachWorkerSkillRoutes(route, { store, authenticate, handle, classifySkillText }) {
  const skills = createSkillService(createSkillRepository(store.db), { reviewText: classifySkillText });
  route.post('/api/ai-board/worker/tickets/:id/skills', authenticate, handle(async (req,res) => {
    await store.assertLease(req.params.id,req.body?.worker_id,req.body?.lease_token);
    res.json({ skills: await skills.active(req.body?.task_type,req.body?.role) });
  }));
  route.post('/api/ai-board/worker/skill-rewrite/claim', authenticate, handle(async (req,res) => {
    res.json(await skills.claimRewrite(req.body?.worker_id));
  }));
  route.post('/api/ai-board/worker/skill-rewrite/report', authenticate, handle(async (req,res) => {
    res.json(await skills.reportRewrite(req.body || {}));
  }));
  route.post('/api/ai-board/worker/skill-proposals', authenticate, handle(async (req,res) => {
    res.json(await skills.createProposal(req.body || {}));
  }));
  route.post('/api/ai-board/worker/skill-retro/claim', authenticate, handle(async (req,res) => {
    res.json(await skills.claimRetro(req.body?.worker_id));
  }));
  route.post('/api/ai-board/worker/skill-retro/report', authenticate, handle(async (req,res) => {
    res.json(await skills.reportRetro(req.body || {}));
  }));
}
