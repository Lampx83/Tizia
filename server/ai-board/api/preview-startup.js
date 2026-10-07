import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { env as environment } from 'node:process';
import express from 'express';
import { createHash, timingSafeEqual } from 'node:crypto';
import { createPreviewRepository } from '../repositories/previews.js';
import { createPreviews, PreviewError } from '../services/previews.js';
import { createPreviewRuntime } from '../services/preview-runtime.js';
import { attachPreviewRoutes, previewGateway } from './previews.js';

export async function startPrivatePreviews(router, { db, requireAuth, requireStrictCsrf, dataDir, env = environment }) {
  if (env.AI_BOARD_PRIVATE_PREVIEW_ENABLED !== 'true') return null;
  const origin = new URL(env.AI_BOARD_PREVIEW_ORIGIN);
  const port = Number(origin.port || 80);
  const bindHost = env.AI_BOARD_PREVIEW_BIND_HOST || '127.0.0.1';
  if (!['127.0.0.1', '0.0.0.0'].includes(bindHost)) throw new TypeError('invalid local preview bind host');
  if (origin.protocol !== 'http:' || !Number.isInteger(port) || port < 1024 || port > 65535) throw new TypeError('local preview requires HTTP port 1024..65535');
  const key = String(env.AI_BOARD_WORKER_KEY || '');
  if (key.length < 24) throw new TypeError('preview requires configured worker authentication');
  const token = (await fs.readFile(env.AI_BOARD_SANDBOX_TOKEN_FILE, 'utf8')).trim();
  if (token.length < 24) throw new TypeError('preview requires private runner credential');
  const repository = await createPreviewRepository(db);
  const runtime = createPreviewRuntime({ url: env.AI_BOARD_SANDBOX_URL, token, archiveDir: path.join(env.DATA_DIR ? path.resolve(env.DATA_DIR) : dataDir, 'private-preview-candidates') });
  const previews = createPreviews({ repository, runtime, servingOrigin: env.AI_BOARD_SERVING_ORIGIN, previewOrigin: origin.href });
  const server = http.createServer({ requestTimeout: 20_000, headersTimeout: 10_000, maxHeaderSize: 16 * 1024 }, previewGateway(previews));
  server.setTimeout(30_000); server.keepAliveTimeout = 5_000; server.maxConnections = 32;
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(port, bindHost, resolve); });
  attachPreviewRoutes(router, { previews, requireAuth, requireStrictCsrf });
  const digest = (value) => createHash('sha256').update(value).digest();
  const expected = digest(key);
  router.post('/api/ai-board/worker/requests/:id/runs/:runId/preview/candidate', (req, res, next) => {
    const sent = req.get('X-AI-Worker-Key');
    if (!sent || !timingSafeEqual(digest(sent), expected)) return res.status(401).json({ error: 'unauthorized' });
    next();
  }, express.raw({ type: 'application/gzip', limit: '64mb' }), async (req, res, next) => {
    try {
      const binding = await repository.binding(Number(req.params.id), Number(req.params.runId));
      if (!binding || !req.get('X-AI-Worker-Id') || binding.worker_id !== req.get('X-AI-Worker-Id')) throw new PreviewError(404, 'preview_not_found');
      const result = await previews.publish({ requestId: Number(req.params.id), runId: Number(req.params.runId),
        candidateSha: req.get('X-Candidate-Sha'), archive: req.body });
      res.json({ id: result.id, state: result.state });
    } catch (error) {
      if (error instanceof PreviewError) return res.status(error.status).json({ error: error.code });
      next(error);
    }
  });
  return { previews, server };
}
