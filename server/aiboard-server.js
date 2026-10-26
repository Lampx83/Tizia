// aiboard-server: AI Board authority/state on its own PostgreSQL (ADR 0019). No web db, cookies or sessions.
import express from 'express';
import { pathToFileURL } from 'node:url';

import { applyMigrations, createPgDb } from './ai-board/db/index.js';
import { createAiBoardServices } from './ai-board/services/composition.js';
import { HEADERS, requireInternalUser } from './ai-board/internal-auth.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from './ai-board/routes.js';
import { attachAiBoardIntake } from './contexts/ai-board-intake/index.js';

export { HEADERS };

/** Build the board-only app. `dbHandle` lets tests pass an isolated PostgreSQL; production uses AI_BOARD_DATABASE_URL. */
export async function createAiBoardServer({ env = process['env'], dbHandle = null, classifyRequest, generate, logger = console } = {}) {
  const secret = String(env.AI_BOARD_INTERNAL_SECRET || '');
  if (!secret) throw new Error('AI_BOARD_INTERNAL_SECRET is required');
  const handle = dbHandle ?? createPgDb({ url: String(env.AI_BOARD_DATABASE_URL || '') });
  if (!handle?.d || handle.dialect !== 'postgres') throw new Error('aiboard-server needs a PostgreSQL handle');
  await applyMigrations(handle.d);
  const services = createAiBoardServices({ appDb: handle });

  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '2mb' }));
  app.get('/health', (_req, res) => res.json({ ok: true, service: 'aiboard-server' }));

  // Web signs user/role/domain/time; board trusts only that signature (or the worker key on worker routes).
  const requireAuth = requireInternalUser(secret);
  const requireAdmin = (req, res, next) => (req.user?.role === 'admin'
    ? next() : res.status(403).json({ error: 'forbidden' }));
  const pass = (_req, _res, next) => next();

  attachAiBoardIntake(app, { db: handle.d, store: services.store, requireAuth, requireStrictCsrf: pass,
    quotaGate: pass, generate });
  attachAiBoardRequestRoutes(app, { store: services.store, aux: services.aux, db: handle.d,
    requireAuth, requireEnrolled: pass, requireAdmin, requireStrictCsrf: pass, classifyRequest });
  attachAiBoardWorkerRoutes(app, { store: services.store, aux: services.aux, env });

  app.use((error, _req, res, _next) => {
    logger.warn?.(`[aiboard-server] ${error?.message || error}`);
    if (res.headersSent) return res.end();
    res.status(Number(error?.status) || 500).json({ error: 'internal_error' });
  });
  return { app, services, handle, close: async () => { await handle.close?.(); } };
}

/** Start standalone: node server/aiboard-server.js (AI_BOARD_DATABASE_URL + AI_BOARD_INTERNAL_SECRET). */
async function main() {
  const port = Number(process.env.PORT) || 8081;
  const { app, close } = await createAiBoardServer();
  const server = app.listen(port, '0.0.0.0', () => console.log(`[aiboard-server] listening on ${port}`));
  const stop = async () => { server.close(); await close(); process.exit(0); };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error('[aiboard-server] failed:', error.message); process.exit(1); });
}
