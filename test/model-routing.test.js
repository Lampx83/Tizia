import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCatalog, resolveCandidates, routedClassifyRequest } from '../server/ai-board/model-routing.js';

function fixture() {
  return {
    version: 1, enabled: false, api_enabled: false, endpoint_cooldown_s: 60,
    classifier_calibration_id: 'qwen35-4b-v1', embedding_space: 'bge-m3-v1',
    roles: { classifier: ['primary', 'backup'], embed: ['embedding'] },
    candidates: {
      primary: { provider: 'ollama', model: 'qwen3.5:4b', enabled: true, approved_roles: ['classifier'], capabilities: ['logprobs'], calibration_id: 'qwen35-4b-v1' },
      backup: { provider: 'fallback_ollama', model: 'qwen3.5:4b-copy', enabled: true, approved_roles: ['classifier'], capabilities: ['logprobs'], calibration_id: 'qwen35-4b-v1' },
      embedding: { provider: 'ollama', model: 'bge-m3', enabled: true, approved_roles: ['embed'], capabilities: ['embedding'], embedding_space: 'bge-m3-v1' },
    },
  };
}
let serial = 0;
function environment() {
  serial++;
  return { AI_BOARD_MODEL_ROUTING: 'true', OLLAMA_URL: `http://primary-${serial}.test`, OLLAMA_SECKEY: 'test-secret', FALLBACK_OLLAMA_URL: `http://backup-${serial}.test`, FALLBACK_OLLAMA_SECKEY: 'backup-secret' };
}
const goodBody = { logprobs: [{ token: 'A', logprob: -0.2 }] };
const ok = () => ({ ok: true, json: async () => goodBody });

test('vLLM is eligible for classifier only with logprobs and a matching calibration_id; never for embed', () => {
  const catalog = fixture();
  catalog.candidates.heavy = { provider: 'vllm', model: 'default-heavy', enabled: true,
    approved_roles: ['gate3_heavy', 'classifier'], capabilities: ['json', 'logprobs'], calibration_id: 'qwen35-4b-v1' };
  catalog.roles.gate3_heavy = ['heavy'];
  catalog.roles.classifier.unshift('heavy');
  const env = Object.assign(environment(), { VLLM_URL: 'http://local-vllm.test/v1', VLLM_SECKEY: 'vllm-fixture',
    GATE3_MODEL_HEAVY: 'qwen3.5-35b-a3b-int4', AI_BOARD_API_ENABLED: 'false' });
  const [heavy] = resolveCandidates('gate3_heavy', { catalog, env });
  assert.equal(heavy.model, 'qwen3.5-35b-a3b-int4');
  assert.equal(heavy.connection.secret, 'vllm-fixture');
  assert.deepEqual(resolveCandidates('classifier', { catalog, env }).map((c) => c.id), ['heavy', 'primary', 'backup']);
  catalog.candidates.heavy.calibration_id = 'qwen35-35b-a3b-int4-unfitted';
  assert.deepEqual(resolveCandidates('classifier', { catalog, env }).map((c) => c.id), ['primary', 'backup']);
  catalog.candidates.heavy.calibration_id = 'qwen35-4b-v1'; catalog.candidates.heavy.capabilities = ['json'];
  assert.deepEqual(resolveCandidates('classifier', { catalog, env }).map((c) => c.id), ['primary', 'backup']);
  catalog.candidates.heavy.capabilities = ['json', 'logprobs', 'embedding']; catalog.candidates.heavy.approved_roles = ['embed'];
  catalog.candidates.heavy.embedding_space = 'bge-m3-v1'; catalog.roles.embed.unshift('heavy');
  assert.deepEqual(resolveCandidates('embed', { catalog, env }).map((c) => c.id), ['embedding']);
  assert.deepEqual(resolveCandidates('gate3_heavy', { catalog, env: environment() }), []);
});

test('vLLM classifier call: OpenAI chat logprobs request, both auth headers, Ollama-shaped result', async () => {
  const catalog = fixture();
  catalog.candidates.vl = { provider: 'vllm', model: 'qwen3.5-35b-a3b-int4', enabled: true, approved_roles: ['classifier'],
    capabilities: ['json', 'logprobs'], calibration_id: 'qwen35-4b-v1' };
  catalog.roles.classifier.unshift('vl');
  for (const base of ['http://vllm.test', 'http://vllm.test/v1']) {
    const env = Object.assign(environment(), { VLLM_URL: base, VLLM_SECKEY: 'vllm-secret' });
    const top = [{ token: 'A', logprob: -0.1 }, { token: 'B', logprob: -2.5 }];
    const result = await routedClassifyRequest({ prompt: 'classify', options: { temperature: 0 }, top_logprobs: 20 }, { env, catalog, fetchImpl: async (url, request) => {
      assert.equal(url, 'http://vllm.test/v1/chat/completions');
      assert.equal(request.headers['x-ollama-seckey'], 'vllm-secret');
      assert.equal(request.headers.Authorization, 'Bearer vllm-secret');
      assert.equal(request.redirect, 'error');
      assert.deepEqual(JSON.parse(request.body), { model: 'qwen3.5-35b-a3b-int4', messages: [{ role: 'user', content: 'classify' }], stream: false,
        max_tokens: 1, temperature: 0, logprobs: true, top_logprobs: 20, chat_template_kwargs: { enable_thinking: false } });
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'A' }, logprobs: { content: [{ token: 'A', logprob: -0.1, top_logprobs: top }] } }] }) };
    } });
    assert.equal(result.route.provider, 'vllm');
    assert.deepEqual(result.body.logprobs, [{ token: 'A', logprob: -0.1, top_logprobs: top }]);
    assert.equal(JSON.stringify(result).includes('vllm-secret'), false);
  }
  const env = Object.assign(environment(), { VLLM_URL: 'http://vllm.test', VLLM_SECKEY: 'vllm-secret' });
  await assert.rejects(routedClassifyRequest({ prompt: 'x' }, { env, catalog, fetchImpl: async () => ({ ok: true, json: async () => ({ choices: [{ message: { content: 'A' } }] }) }) }), /no logprobs/);
});

test('disabled routing returns legacy sentinel without reading catalog or calling fetch', async () => {
  for (const env of [{}, { AI_BOARD_MODEL_ROUTING: 'false' }]) {
    assert.equal(await routedClassifyRequest({}, { env, fetchImpl: () => assert.fail() }), null);
  }
});

test('catalog rejects duplicate references, unknown candidates and invalid capabilities', () => {
  for (const change of [
    (c) => c.roles.classifier.push('primary'),
    (c) => c.roles.classifier.push('unknown'),
    (c) => c.candidates.primary.capabilities.push('unverified'),
  ]) {
    const catalog = fixture(); change(catalog);
    assert.throws(() => validateCatalog(catalog), /model-routing/);
  }
});

test('eligibility preserves reviewed order and locks calibration and vector space', () => {
  const catalog = fixture(); const env = environment();
  assert.deepEqual(resolveCandidates('classifier', { catalog, env }).map((c) => c.id), ['primary', 'backup']);
  catalog.candidates.primary.calibration_id = 'other';
  assert.deepEqual(resolveCandidates('classifier', { catalog, env }).map((c) => c.id), ['backup']);
  catalog.candidates.embedding.embedding_space = 'qwen3';
  assert.deepEqual(resolveCandidates('embed', { catalog, env }), []);
  catalog.candidates.backup.approved_roles = [];
  assert.deepEqual(resolveCandidates('classifier', { catalog, env }), []);
});

test('API remains ineligible even if enabled until an adapter exists', () => {
  const catalog = fixture(); catalog.api_enabled = true; catalog.candidates.primary.provider = 'api';
  assert.deepEqual(resolveCandidates('classifier', { catalog, env: environment() }).map((c) => c.id), ['backup']);
});

test('successful classifier uses selected model and matching endpoint credentials', async () => {
  const env = environment();
  const result = await routedClassifyRequest({ prompt: 'classify', model: 'wrong' }, { env, catalog: fixture(), fetchImpl: async (url, request) => {
    assert.equal(url, `${env.OLLAMA_URL}/api/generate`);
    assert.equal(request.headers['x-ollama-seckey'], 'test-secret');
    assert.equal(JSON.parse(request.body).model, 'qwen3.5:4b');
    return ok();
  } });
  assert.equal(result.route.reason, 'reviewed_order');
  assert.equal(result.route.candidate, 'primary');
  assert.equal(JSON.stringify(result).includes('test-secret'), false);
});

test('transient HTTP failure switches endpoint and cooldown persists across calls', async () => {
  const env = environment(); const catalog = fixture(); const seen = [];
  const fetchImpl = async (url, request) => {
    seen.push(url);
    if (url.startsWith(env.OLLAMA_URL)) return { ok: false, status: 503 };
    assert.equal(request.headers['x-ollama-seckey'], 'backup-secret');
    return ok();
  };
  const first = await routedClassifyRequest({}, { env, catalog, fetchImpl });
  assert.equal(first.route.reason, 'infrastructure_failover');
  await routedClassifyRequest({}, { env, catalog, fetchImpl });
  assert.equal(seen.filter((url) => url.startsWith(env.OLLAMA_URL)).length, 1);
  assert.equal(seen.length, 3);
});

test('network and timeout failures permit fallback', async () => {
  for (const error of [new TypeError('private endpoint text'), Object.assign(new Error(), { name: 'TimeoutError' })]) {
    const env = environment(); let calls = 0;
    const result = await routedClassifyRequest({}, { env, catalog: fixture(), fetchImpl: async () => { if (++calls === 1) throw error; return ok(); } });
    assert.equal(result.route.candidate, 'backup');
    assert.equal(calls, 2);
  }
});

test('HTTP 4xx, nontransient HTTP and malformed responses never try another candidate', async () => {
  for (const response of [{ ok: false, status: 401 }, { ok: false, status: 501 }, { ok: true, json: async () => { throw new Error('secret'); } }, { ok: true, json: async () => ({}) }]) {
    let calls = 0;
    await assert.rejects(routedClassifyRequest({}, { env: environment(), catalog: fixture(), fetchImpl: async () => { calls++; return response; } }), /model-routing/);
    assert.equal(calls, 1);
  }
});

test('configuration errors do not expose endpoint credentials', () => {
  const env = environment(); env.OLLAMA_URL = 'http://user:secret@test.invalid';
  assert.throws(() => resolveCandidates('classifier', { catalog: fixture(), env }), (error) => !error.message.includes('secret') && /invalid provider endpoint/.test(error.message));
});
