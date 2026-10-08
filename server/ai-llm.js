// App-side LLM transport: vLLM (OpenAI chat API) when VLLM_URL is set, else Ollama. One place for URL, headers, model.
import fs from 'node:fs';

const CATALOG = new URL('./ai-board/model-routing.json', import.meta.url);

/** Provider for app calls (tutor, clarify chat, spec summary): AI_BOARD_APP_LLM=ollama|vllm, default vllm when VLLM_URL exists. */
export function appLlm(env = process['env']) {
  const vllmUrl = String(env.VLLM_URL || '').trim().replace(/\/+$/, '');
  const ollamaUrl = String(env.OLLAMA_URL || '').trim().replace(/\/+$/, '');
  const wanted = String(env.AI_BOARD_APP_LLM || '').toLowerCase();
  const vllm = wanted === 'vllm' || (wanted !== 'ollama' && vllmUrl);
  if (vllm && vllmUrl) return { provider: 'vllm', url: vllmUrl, secret: env.VLLM_SECKEY || '', model: vllmModel(env) };
  return { provider: 'ollama', url: ollamaUrl, secret: env.OLLAMA_SECKEY || '', model: '' };
}

/** vLLM model name: VLLM_MODEL, else the catalog's vLLM candidate. */
export function vllmModel(env = process['env']) {
  if (env.VLLM_MODEL) return String(env.VLLM_MODEL).trim();
  try {
    const catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
    return Object.values(catalog.candidates).find((c) => c.provider === 'vllm' && c.enabled)?.model || '';
  } catch { return ''; }
}

/** The gateway only understands x-ollama-seckey; bare vLLM wants Bearer. Both go to the same vLLM host only. */
export function vllmHeaders(secret) {
  return { 'Content-Type': 'application/json', ...(secret ? { 'x-ollama-seckey': secret, Authorization: `Bearer ${secret}` } : {}) };
}

export const vllmChatUrl = (url) => (/\/v1$/.test(url) ? `${url}/chat/completions` : `${url}/v1/chat/completions`);

/** OpenAI-style chat body; thinking off so short answers are not spent on reasoning tokens. */
export function vllmBody({ model, messages, temperature, maxTokens, json = false, stream = false }) {
  return {
    model, messages, temperature, max_tokens: maxTokens, stream,
    chat_template_kwargs: { enable_thinking: false },
    ...(json ? { response_format: { type: 'json_object' } } : {}),
  };
}

export const vllmText = (data) => String(data?.choices?.[0]?.message?.content ?? '').trim();

/** Parse an SSE chunk buffer; returns {tokens, rest, done}. Lines are `data: {json}` or `data: [DONE]`. */
export function parseSse(buffer) {
  const tokens = [];
  let done = false;
  const lines = buffer.split('\n');
  const rest = lines.pop();
  for (const raw of lines) {
    const line = raw.trim();
    if (!line.startsWith('data:')) continue;
    const payload = line.slice(5).trim();
    if (payload === '[DONE]') { done = true; continue; }
    const piece = JSON.parse(payload).choices?.[0]?.delta?.content;
    if (piece) tokens.push(piece);
  }
  return { tokens, rest, done };
}
