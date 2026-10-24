/* PORTAL AGENTS — cài "Agent" kiểu AI Portal (assistant) lên Tizia.
 *
 * MỤC TIÊU: Agent viết cho AI Portal (expose GET /metadata + POST /ask) cài được lên Tizia,
 * Tizia đóng vai identity provider + chat-proxy (giống orchestrator/assistants của AI Portal,
 * nhưng gọi TRỰC TIẾP 1 agent theo alias — chưa có tầng router LLM đa-agent).
 *
 * Đăng ký: user nhập alias + base_url (giống Admin → Agents của AI Portal). Tizia fetch
 * /metadata để lấy name/description/models, lưu vào bảng portal_agents (per-owner).
 * Admin publish → mọi user thấy & chat được.
 *
 * Chat: POST /api/agents/<alias>/ask → proxyAgentAsk stream SSE về browser, bơm danh tính
 * qua body.user + header X-User-* (xem agent-proxy.js). KHÔNG chạy code agent in-process.
 */
import {
  upsertPortalAgent,
  listPortalAgentsByOwner,
  listPortalAgentsPublic,
  getPortalAgentById,
  findInstalledAgentByAlias,
  deletePortalAgent,
  setPortalAgentPublic,
} from '../../db.js';
import { ALIAS_RE, isSafeProxyTarget } from '../portal-apps/embed.js';
import {
  normalizeBase,
  fetchAgentMetadata,
  clearAgentMetadataCache,
  proxyAgentAsk,
} from './agent-proxy.js';

function decorateAgent(a, { own = false } = {}) {
  let cfg = {};
  try { cfg = a.config_json ? JSON.parse(a.config_json) : {}; } catch {}
  return {
    id: a.id,
    alias: a.alias,
    name: a.name,
    icon: a.icon || 'Bot',
    description: a.description || '',
    baseUrl: a.base_url,
    isPublic: !!a.is_public,
    isActive: a.is_active == null ? true : !!a.is_active,
    routingHint: cfg.routing_hint || null,
    samplePrompts: Array.isArray(cfg.sample_prompts) ? cfg.sample_prompts : [],
    supportedModels: Array.isArray(cfg.supported_models) ? cfg.supported_models : [],
    ownerId: a.owner_id,
    ownerName: a.owner_display_name || a.owner_username || null,
    own,
    updatedAt: a.updated_at,
  };
}

/**
 * @param {import('express').Router} r
 * @param {{ requireAuth: import('express').RequestHandler,
 *           requireAdmin: import('express').RequestHandler,
 *           resolveAgent?: (userId:any, alias:string) => Promise<any> }} mw
 *   resolveAgent: chỉ để test (inject registry giả). Mặc định = findInstalledAgentByAlias.
 */
export function attachPortalAgents(r, { requireAuth, requireAdmin, resolveAgent } = {}) {
  const resolve = resolveAgent || findInstalledAgentByAlias;

  // ── LIST: own + public ──
  r.get('/api/agents', requireAuth, async (req, res) => {
    const ownerId = req.user.id;
    const own = await listPortalAgentsByOwner(ownerId);
    const pub = await listPortalAgentsPublic();
    const ownAliases = new Set(own.map((a) => a.alias));
    res.json({
      own: own.map((a) => decorateAgent(a, { own: true })),
      public: pub
        .filter((a) => a.owner_id !== ownerId && !ownAliases.has(a.alias))
        .map((a) => decorateAgent(a)),
    });
  });

  // ── REGISTER: alias + base_url (fetch /metadata để xác thực + điền name/desc) ──
  r.post('/api/agents/register', requireAuth, async (req, res) => {
    const b = req.body || {};
    const alias = String(b.alias || '').trim().toLowerCase();
    const baseUrl = normalizeBase(b.baseUrl || b.base_url || '');
    if (!ALIAS_RE.test(alias)) return res.status(400).json({ error: 'bad_alias', message: 'alias cần [a-z0-9-], 2-41 ký tự, bắt đầu bằng chữ.' });
    if (!/^https?:\/\//i.test(baseUrl)) return res.status(400).json({ error: 'bad_base_url', message: 'base_url phải là http(s)://…' });
    if (!isSafeProxyTarget(baseUrl)) return res.status(400).json({ error: 'unsafe_target', message: 'base_url trỏ vào địa chỉ nội bộ — bị chặn.' });

    // Fetch /metadata để xác nhận agent sống + lấy tên/mô tả/models.
    const meta = await fetchAgentMetadata(baseUrl);
    if (!meta && b.requireMetadata !== false) {
      return res.status(502).json({ error: 'metadata_unreachable', message: `Không đọc được ${baseUrl}/metadata (agent phải đang chạy và trả AgentMetadata hợp lệ).` });
    }
    const name = String(b.name || meta?.name || alias).slice(0, 120);
    const description = String(b.description || meta?.description || '').slice(0, 500) || null;
    const icon = b.icon ? String(b.icon).slice(0, 60) : 'Bot';
    const configJson = JSON.stringify({
      routing_hint: b.routingHint ? String(b.routingHint).slice(0, 300) : undefined,
      sample_prompts: meta?.sample_prompts || [],
      supported_models: meta?.supported_models || [],
    });

    const row = await upsertPortalAgent({ ownerId: req.user.id, alias, name, icon, baseUrl, description, configJson });
    res.json({ ok: true, agent: decorateAgent(row, { own: true }) });
  });

  // ── METADATA: proxy + cache tới <base>/metadata ──
  r.get('/api/agents/:alias/metadata', requireAuth, async (req, res) => {
    const alias = String(req.params.alias || '').trim().toLowerCase();
    if (!ALIAS_RE.test(alias)) return res.status(400).json({ error: 'bad_alias' });
    const agent = await resolve(req.user.id, alias);
    if (!agent) return res.status(404).json({ error: 'agent_not_found' });
    const meta = await fetchAgentMetadata(agent.base_url);
    if (!meta) return res.status(502).json({ error: 'metadata_unreachable' });
    res.json({ ok: true, alias, metadata: meta });
  });

  // ── CHAT: POST /api/agents/<alias>/ask → stream SSE (bơm danh tính từ session) ──
  r.post('/api/agents/:alias/ask', requireAuth, async (req, res) => {
    const alias = String(req.params.alias || '').trim().toLowerCase();
    if (!ALIAS_RE.test(alias)) return res.status(400).json({ error: 'bad_alias' });
    const agent = await resolve(req.user.id, alias);
    if (!agent) return res.status(404).json({ error: 'agent_not_found', message: `Chưa cài agent: ${alias}` });

    const u = req.user;
    const identity = {
      id: u.id,
      email: u.email || '',
      name: u.display_name || u.username || '',
      user: u.username || String(u.id), // AI Portal contract: user nằm trong body
    };
    const b = req.body || {};
    const payload = {
      session_id: String(b.session_id || `tizia-${u.id}-${alias}`),
      model_id: String(b.model_id || b.model || ''),
      prompt: String(b.prompt || ''),
      context: (b.context && typeof b.context === 'object') ? b.context : {},
    };
    if (!payload.prompt.trim()) return res.status(400).json({ error: 'empty_prompt' });

    await proxyAgentAsk({ baseUrl: agent.base_url, payload, res, identity });
  });

  // ── DELETE (owner hoặc admin) ──
  r.delete('/api/agents/:id', requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    const row = await getPortalAgentById(id);
    if (!row) return res.status(404).json({ error: 'not_found' });
    const isOwner = row.owner_id === req.user.id;
    if (!isOwner && req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
    try { clearAgentMetadataCache(row.base_url); } catch {}
    await deletePortalAgent(id);
    res.json({ ok: true });
  });

  // ── PUBLISH / UNPUBLISH (admin) ──
  r.post('/api/agents/:id/publish', requireAuth, requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const row = await getPortalAgentById(id);
    if (!row) return res.status(404).json({ error: 'not_found' });
    const isPublic = req.body?.public !== false;
    await setPortalAgentPublic(id, isPublic);
    res.json({ ok: true, isPublic });
  });
}
