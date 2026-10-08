import test from 'node:test';
import assert from 'node:assert/strict';
import { appLlm, vllmBody, vllmChatUrl, vllmHeaders, vllmText, parseSse } from '../server/ai-llm.js';
import { ollamaStreamer } from '../server/contexts/ai-board-intake/clarify.js';

test('provider: vLLM by default when VLLM_URL exists, Ollama when forced or absent', () => {
  const both = { VLLM_URL: 'http://v.test/vllm/', VLLM_SECKEY: 'k', VLLM_MODEL: 'm1', OLLAMA_URL: 'http://o.test' };
  assert.deepEqual(appLlm(both), { provider: 'vllm', url: 'http://v.test/vllm', secret: 'k', model: 'm1' });
  assert.equal(appLlm({ ...both, AI_BOARD_APP_LLM: 'ollama' }).provider, 'ollama');
  assert.equal(appLlm({ OLLAMA_URL: 'http://o.test' }).provider, 'ollama');
  assert.equal(appLlm({ VLLM_URL: 'http://v.test' }).model, 'qwen3.5-35b-a3b-int4'); // catalog default
});

test('request shape: /v1 url handling, both auth headers, thinking off, json mode', () => {
  assert.equal(vllmChatUrl('http://v.test/vllm'), 'http://v.test/vllm/v1/chat/completions');
  assert.equal(vllmChatUrl('http://v.test/v1'), 'http://v.test/v1/chat/completions');
  const h = vllmHeaders('secret');
  assert.equal(h['x-ollama-seckey'], 'secret');
  assert.equal(h.Authorization, 'Bearer secret');
  assert.deepEqual(Object.keys(vllmHeaders('')), ['Content-Type']);
  const body = vllmBody({ model: 'm', messages: [], temperature: 0.1, maxTokens: 9, json: true });
  assert.equal(body.max_tokens, 9);
  assert.equal(body.chat_template_kwargs.enable_thinking, false);
  assert.deepEqual(body.response_format, { type: 'json_object' });
  assert.equal(vllmText({ choices: [{ message: { content: ' hi ' } }] }), 'hi');
});

test('SSE parser keeps partial lines and stops on [DONE]', () => {
  const a = parseSse('data: {"choices":[{"delta":{"content":"Xin"}}]}\ndata: {"choices":[{"del');
  assert.deepEqual(a.tokens, ['Xin']);
  const b = parseSse(`${a.rest}ta":{"content":" chào"}}]}\n\ndata: [DONE]\n`);
  assert.deepEqual(b.tokens, [' chào']);
  assert.equal(b.done, true);
});

test('clarify streamer uses vLLM when VLLM_URL is set and honours abort from onToken', async () => {
  const calls = [];
  const sse = ['data: {"choices":[{"delta":{"content":"A"}}]}\n', 'data: {"choices":[{"delta":{"content":"B"}}]}\n', 'data: [DONE]\n'];
  const fetchImpl = async (url, init) => {
    calls.push({ url, headers: init.headers, body: JSON.parse(init.body), redirect: init.redirect });
    return { ok: true, body: (async function* () { for (const l of sse) yield new TextEncoder().encode(l); })() };
  };
  const stream = ollamaStreamer({ env: { VLLM_URL: 'http://v.test/vllm', VLLM_SECKEY: 'k', VLLM_MODEL: 'mm', OLLAMA_URL: 'http://o.test' }, fetchImpl });
  const got = [];
  const text = await stream({ model: 'ignored-ollama-name', prompt: 'p', kind: 'question', onToken: (t) => { got.push(t); } });
  assert.equal(text, 'AB');
  assert.equal(calls[0].url, 'http://v.test/vllm/v1/chat/completions');
  assert.equal(calls[0].body.model, 'mm');
  assert.equal(calls[0].body.stream, true);
  assert.equal(calls[0].redirect, 'error');
  assert.equal(calls[0].headers['x-ollama-seckey'], 'k');
  const stopped = await stream({ model: 'x', prompt: 'p', kind: 'question', onToken: () => false });
  assert.equal(stopped, 'A');
});
