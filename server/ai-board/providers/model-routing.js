import fs from 'node:fs';

const ROLES = new Set(['gate1', 'gate25', 'gate3_light', 'gate3_heavy', 'gate4_review', 'classifier', 'embed', 'calibration', 'eval_judge']);
const PROVIDERS = new Set(['ollama', 'vllm', 'api']);
const CAPABILITIES = new Set(['json', 'logprobs', 'embedding']);
const RETRYABLE_HTTP = new Set([500, 502, 503, 504]);
const cooldowns = new Map();
const catalogPath = new URL('../model-routing.json', import.meta.url);
const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const fail = (message) => { throw new Error(`model-routing: ${message}`); };
const uniqueStrings = (value, allowed) => Array.isArray(value) && value.every((item) => typeof item === 'string' && (!allowed || allowed.has(item))) && new Set(value).size === value.length;

/** Validate policy without exposing connection details in errors. */
export function validateCatalog(catalog) {
  if (!object(catalog) || catalog.version !== 1) fail('unsupported catalog version');
  if (typeof catalog.enabled !== 'boolean' || typeof catalog.api_enabled !== 'boolean') fail('enabled flags must be booleans');
  if (!Number.isFinite(catalog.endpoint_cooldown_s) || catalog.endpoint_cooldown_s < 0) fail('invalid endpoint cooldown');
  if (!object(catalog.roles) || !object(catalog.candidates)) fail('roles and candidates must be objects');
  for (const [id, candidate] of Object.entries(catalog.candidates)) {
    if (!id || !object(candidate) || !PROVIDERS.has(candidate.provider)) fail('invalid candidate provider');
    if (typeof candidate.model !== 'string' || !candidate.model.trim() || typeof candidate.enabled !== 'boolean') fail('invalid candidate model or enabled flag');
    if (!uniqueStrings(candidate.approved_roles, ROLES) || !uniqueStrings(candidate.capabilities, CAPABILITIES)) fail('invalid candidate roles or capabilities');
    for (const field of ['embedding_space', 'calibration_id']) {
      if (candidate[field] !== undefined && (typeof candidate[field] !== 'string' || !candidate[field].trim())) fail(`invalid candidate ${field}`);
    }
  }
  for (const [role, ids] of Object.entries(catalog.roles)) {
    if (!ROLES.has(role) || !uniqueStrings(ids)) fail('invalid role or duplicate candidate in role');
    if (ids.some((id) => !Object.hasOwn(catalog.candidates, id))) fail('role references unknown candidate');
  }
  for (const field of ['embedding_space', 'classifier_calibration_id']) {
    if (catalog[field] !== undefined && (typeof catalog[field] !== 'string' || !catalog[field].trim())) fail(`invalid ${field}`);
  }
  return catalog;
}

export function loadCatalog(path = catalogPath) {
  let catalog;
  try { catalog = JSON.parse(fs.readFileSync(path, 'utf8')); }
  catch { fail('cannot read valid catalog JSON'); }
  return validateCatalog(catalog);
}

function enabled(settings) {
  return String(settings.AI_BOARD_MODEL_ROUTING || '').toLowerCase() === 'true';
}

function endpoint(provider, settings) {
  if (provider === 'api') return null; // No API adapter is implemented yet.
  const prefix = provider === 'vllm' ? 'VLLM' : 'OLLAMA';
  const url = String(settings[`${prefix}_URL`] || '').trim().replace(/\/+$/, '');
  if (!url) return null;
  let parsed;
  try { parsed = new URL(url); } catch { fail('invalid provider endpoint'); }
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash) fail('invalid provider endpoint');
  return { url, secret: settings[`${prefix}_SECKEY`] };
}

/** Reviewed order only: telemetry never silently promotes an unapproved candidate. */
export function resolveCandidates(role, { catalog, env: settings = process['env'], now = Date.now() } = {}) {
  validateCatalog(catalog);
  if (!ROLES.has(role)) fail('unknown role');
  const selected = [];
  for (const id of catalog.roles[role] || []) {
    const candidate = catalog.candidates[id];
    if (!candidate.enabled || !candidate.approved_roles.includes(role)) continue;
    if (candidate.provider === 'vllm' && role === 'embed') continue; // vLLM classifier is allowed only via the logprobs + calibration_id lock below.
    if (role === 'classifier' && (!candidate.capabilities.includes('logprobs') || candidate.calibration_id !== (catalog.classifier_calibration_id || 'qwen35-4b-v1'))) continue;
    if (role === 'embed' && (!candidate.capabilities.includes('embedding') || candidate.embedding_space !== (catalog.embedding_space || 'bge-m3-v1'))) continue;
    const connection = endpoint(candidate.provider, settings);
    if (!connection || (cooldowns.get(`${candidate.provider}:${connection.url}`) || 0) > now) continue;
    const model = candidate.provider === 'vllm' && role === 'gate3_heavy' ? settings.GATE3_MODEL_HEAVY || candidate.model : candidate.model;
    selected.push({ ...candidate, model, id, connection });
  }
  return selected;
}

function infrastructureError(error) {
  return error?.name === 'TimeoutError' || error?.name === 'AbortError' || error instanceof TypeError || ['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'EAI_AGAIN'].includes(error?.code || error?.cause?.code);
}

const vllmChatUrl = (base) => `${base}${base.endsWith('/v1') ? '' : '/v1'}/chat/completions`;
/** Ollama /api/generate classifier payload -> OpenAI-style chat request (one token, top-20 logprobs, no thinking). */
const vllmChatBody = (payload, model) => ({
  model, messages: [{ role: 'user', content: payload.prompt }], stream: false, max_tokens: 1,
  temperature: payload.options?.temperature ?? 0, logprobs: true, top_logprobs: payload.top_logprobs ?? 20,
  chat_template_kwargs: { enable_thinking: false },
});
const vllmLogprobs = (body) => ({ logprobs: Array.isArray(body.choices?.[0]?.logprobs?.content) ? body.choices[0].logprobs.content : null });

/** Invalid responses and non-transient HTTP errors never fail over. */
export async function routedClassifyRequest(payload, { env: settings = process['env'], fetchImpl = fetch, timeoutMs = 10_000, catalog } = {}) {
  if (!enabled(settings)) return null;
  catalog = catalog || loadCatalog();
  const candidates = resolveCandidates('classifier', { catalog, env: settings });
  let infrastructureFailures = 0;
  for (const candidate of candidates) {
    const { connection, model, provider, id } = candidate;
    const cooldownKey = `${provider}:${connection.url}`;
    if ((cooldowns.get(cooldownKey) || 0) > Date.now()) continue;
    const vllm = provider === 'vllm';
    const headers = { 'Content-Type': 'application/json' };
    if (connection.secret) {
      headers['x-ollama-seckey'] = connection.secret; // the /vllm gateway only accepts this header
      if (vllm) headers.Authorization = `Bearer ${connection.secret}`; // bare vLLM only accepts Bearer
    }
    let response;
    try {
      response = await fetchImpl(vllm ? vllmChatUrl(connection.url) : `${connection.url}/api/generate`, {
        method: 'POST', headers, redirect: 'error', signal: AbortSignal.timeout(timeoutMs),
        body: JSON.stringify(vllm ? vllmChatBody(payload, model) : { ...payload, model, stream: false }),
      });
    } catch (error) {
      if (!infrastructureError(error)) fail('classifier transport failed');
      cooldowns.set(cooldownKey, Date.now() + catalog.endpoint_cooldown_s * 1000);
      infrastructureFailures++;
      continue;
    }
    if (!response.ok) {
      if (!RETRYABLE_HTTP.has(response.status)) fail(`classifier HTTP ${response.status}`);
      cooldowns.set(cooldownKey, Date.now() + catalog.endpoint_cooldown_s * 1000);
      infrastructureFailures++;
      continue;
    }
    let body;
    try { body = await response.json(); } catch { fail('invalid classifier JSON response'); }
    if (vllm && object(body)) body = vllmLogprobs(body); // same shape as Ollama: logprobs[0] = {token, logprob, top_logprobs}
    if (!object(body) || !Array.isArray(body.logprobs) || !body.logprobs.length) fail('classifier response has no logprobs');
    return { body, model, route: { candidate: id, provider, role: 'classifier', reason: infrastructureFailures ? 'infrastructure_failover' : 'reviewed_order' } };
  }
  fail(infrastructureFailures ? 'classifier infrastructure candidates exhausted' : 'no eligible classifier candidate');
}
// Provider boundary: candidate eligibility and model HTTP transport, never permission grants.
