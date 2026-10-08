"""Shared Ollama/vLLM transport; workflow callers select an explicit model role."""
from __future__ import annotations

import json
import math
import os
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, replace
from providers.routing import ModelRouter

# Gateway dùng chung thỉnh thoảng trả 5xx (đổi model, thiếu VRAM): thử lại 3 lần, nghỉ 3 s rồi 8 s. Lỗi 4xx và timeout không thử lại.
RETRY_STATUS = (500, 502, 503, 504)
RETRY_PAUSES_S = (3.0, 8.0)
_sleep = time.sleep


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

# num_ctx khai tường minh (spec: 1 model nóng, ctx là giới hạn cứng). 8K: prompt ≤ ~4.5K + output ≤ 3K
# token vừa đủ; bớt ~1.5 GiB KV so với 16K trên GPU dùng chung đã sát trần 75% (42,500 MiB).
NUM_CTX = 8192


@dataclass
class OllamaClient:
    # KHÔNG hardcode default endpoint/model ở đây — trước có default cho 1 Ollama
    # local trần, nhưng thật ra Tizia (server/ai.js) gọi qua 1 reverse-proxy nội
    # bộ có sẵn, không phải Ollama trần. Một default sai hình dạng còn tệ hơn
    # không có default: âm thầm gọi nhầm chỗ, không lỗi rõ để phát hiện. Nguồn sự
    # thật duy nhất là `.env` — rỗng thì generate()/embed() raise rõ ràng.
    base_url: str = ""
    gate1_model: str = ""
    gate3_model: str = ""
    # Subtask "small" (1 file, theo mẫu) đi model nhẹ hơn — cùng lý do
    # "không hardcode default" ở trên, .env là nguồn thật duy nhất.
    gate3_model_light: str = ""
    embed_model: str = ""
    classifier_model: str = ""  # logprob classifier (classifier.py), shared with server/ai-board/classifier.js
    timeout_s: float = 300.0
    # Đọc 1 lần lúc dựng client. KHÔNG đọc lại os.environ trong _post: test bơm
    # env giả mà vẫn moi key thật ra rồi gửi tới base_url giả là rò credential.
    seckey: str | None = None
    routing: object | None = None
    embedding_candidate: str | None = None
    protocol: str = 'ollama'
    vllm_url: str = ''
    vllm_seckey: str | None = None
    deadline: float | None = None

    def remaining_s(self):
        if self.deadline is None:
            return self.timeout_s
        remaining = self.deadline - time.monotonic()
        if remaining <= 0:
            raise TimeoutError('Model request deadline exceeded')
        return min(self.timeout_s, remaining)

    @classmethod
    def from_env(cls, env: dict | None = None) -> "OllamaClient":
        env = os.environ if env is None else env
        return cls(
            base_url=(env.get("OLLAMA_URL") or "").rstrip("/"),
            gate1_model=env.get("GATE1_MODEL") or "",
            gate3_model=env.get("GATE3_MODEL_HEAVY") or "",
            gate3_model_light=env.get("GATE3_MODEL_LIGHT") or "",
            embed_model=env.get("EMBED_MODEL") or "",
            classifier_model=env.get("AI_BOARD_CLASSIFIER_MODEL") or "",
            seckey=env.get("OLLAMA_SECKEY") or None,
            routing=ModelRouter.from_env(env),
            vllm_url=(env.get('VLLM_URL') or '').strip().rstrip('/'),
            vllm_seckey=env.get('VLLM_SECKEY') or None,
        )

    def generate(self, model: str, prompt: str, *, format: str | dict | None = None, extra: dict | None = None,
                 _single_attempt: bool = False,
                 **options) -> dict:
        """POST /api/generate. Trả nguyên body JSON.

        `format="json"` là field cấp 1 của Ollama (ép output JSON hợp lệ), không
        nằm trong `options`. Kèm prompt_eval_count/prompt_eval_duration trong
        body — người gọi log lại để biết prefix-cache có trúng không (spec kỷ
        luật cache, quy tắc 5).
        """
        if self.vllm_url and model == self.gate3_model:
            # Legacy env routing must not send the heavy vLLM model to Ollama.
            return replace(self, base_url=ModelRouter.validate_endpoint(self.vllm_url), seckey=self.vllm_seckey,
                           protocol='vllm', vllm_url='').generate(model, prompt, format=format,
                           extra=extra, _single_attempt=_single_attempt, **options)
        if self.protocol == 'vllm':
            ModelRouter.validate_endpoint(self.base_url)
            payload = {'model': model, 'messages': [{'role': 'user', 'content': prompt}], 'stream': False}
            for source, target in [('num_predict', 'max_tokens'), ('temperature', 'temperature'),
                                   ('top_p', 'top_p'), ('seed', 'seed'), ('stop', 'stop')]:
                if source in options:
                    payload[target] = options[source]
            if format:
                payload['response_format'] = ({'type': 'json_schema', 'json_schema':
                    {'name': 'ai_board', 'schema': format}} if isinstance(format, dict)
                    else {'type': 'json_object'})
            if extra and 'thinking' in extra:  # explicit per-role choice; absent = server default (legacy callers)
                payload['chat_template_kwargs'] = {'enable_thinking': bool(extra['thinking'])}
            logprobs = bool(extra and extra.get('logprobs'))
            if logprobs:  # classifier: one token + top-N logprobs, thinking off (Ollama `think: false`)
                payload.update(logprobs=True, top_logprobs=extra.get('top_logprobs', 20),
                               chat_template_kwargs={'enable_thinking': False})
            body = self._post('/chat/completions' if self.base_url.endswith('/v1') else '/v1/chat/completions',
                              payload, retry=False)  # Deps owns retries and charges each HTTP attempt.
            try:
                choice = body['choices'][0]
                content = choice['message']['content']
                if not isinstance(content, str):
                    raise ValueError()
                usage = body.get('usage') or {}
                for field in ('prompt_tokens', 'completion_tokens'):
                    if field in usage and (type(usage[field]) is not int or usage[field] < 0):
                        raise ValueError()
            except (KeyError, IndexError, TypeError, ValueError):
                raise ValueError('Invalid vLLM chat response') from None
            if logprobs:  # same shape as Ollama: logprobs[0] = {token, logprob, top_logprobs}
                entries = ((choice.get('logprobs') or {}).get('content'))
                if not isinstance(entries, list) or not entries:
                    raise ValueError('vLLM response has no logprobs')
                body = {**body, 'logprobs': entries}
            reasoning = choice['message'].get('reasoning') or choice['message'].get('reasoning_content') or ''
            return {**body, 'response': content, 'done_reason': choice.get('finish_reason'), '_reasoning_chars': len(reasoning),
                    'prompt_eval_count': usage.get('prompt_tokens'), 'eval_count': usage.get('completion_tokens'),
                    '_provider': 'vllm'}
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": False,
            "options": {"num_ctx": NUM_CTX, **options},
        }
        if format:
            payload["format"] = format
        payload.update(extra or {})  # top-level fields: think, logprobs, top_logprobs
        return self._post("/api/generate", payload, retry=False) if _single_attempt else self._post("/api/generate", payload)

    def generate_for(self, role: str, model: str, prompt: str, **options) -> dict:
        """Legacy calls keep provider selection tied to the gate role, not a shared tag."""
        if self.vllm_url and role == 'gate3_heavy':
            return replace(self, base_url=ModelRouter.validate_endpoint(self.vllm_url),
                           seckey=self.vllm_seckey, protocol='vllm', vllm_url='').generate(model, prompt, **options)
        return replace(self, vllm_url='').generate(model, prompt, **options)

    def embed(self, text: str) -> dict:
        if self.routing:
            # Keep a successful candidate pinned; alternates require the same reviewed vector space.
            candidates = self.routing.candidates('embed')
            if self.embedding_candidate:
                candidates.sort(key=lambda item: item['id'] != self.embedding_candidate)
            failed = False
            for candidate in candidates:
                if candidate['id'] not in {item['id'] for item in self.routing.candidates('embed')}:
                    continue
                try:
                    result = self.routing.client(candidate, self)._post('/api/embeddings',
                        {'model': candidate['model'], 'prompt': text}, retry=False)
                except Exception as error:
                    transient = (error.code in RETRY_STATUS if isinstance(error, urllib.error.HTTPError)
                                 else isinstance(error, (TimeoutError, urllib.error.URLError, ConnectionError)))
                    if not transient:
                        raise RuntimeError('Routed embedding response failed') from None
                    self.routing.failed(candidate)
                    failed = True
                    continue
                vector = result.get('embedding') if isinstance(result, dict) else None
                if (not isinstance(vector, list) or not vector
                        or not all(isinstance(value, (int, float)) and not isinstance(value, bool)
                                   and math.isfinite(value) for value in vector)):
                    raise RuntimeError('Invalid routed embedding response')
                pinned = self.embedding_candidate == candidate['id']
                self.embedding_candidate = candidate['id']
                result['_route'] = self.routing.evidence('embed', candidate,
                    'infrastructure_failover' if failed else 'pinned_candidate' if pinned else 'reviewed_priority')
                result['_model'] = candidate['model']
                return result
            raise RuntimeError('No compatible embedding candidate available')
        return self._post("/api/embeddings", {"model": self.embed_model, "prompt": text})

    def digest(self, model: str) -> str | None:
        """Digest model trên gateway Ollama (GET /api/tags). None nếu không thấy hoặc gateway vLLM (không có digest)."""
        if self.protocol == 'vllm':
            return None
        req = urllib.request.Request(self.base_url + "/api/tags", headers={"x-ollama-seckey": self.seckey} if self.seckey else {})
        with urllib.request.urlopen(req, timeout=30) as resp:
            tags = json.loads(resp.read().decode("utf-8")).get("models", [])
        return next((m.get("digest") for m in tags if model in (m.get("name"), m.get("model"))), None)

    def _post(self, path: str, payload: dict, *, retry=True) -> dict:
        if not self.base_url:
            raise RuntimeError("OLLAMA_URL chưa set trong .env — xem AI Board Harness section")
        req = urllib.request.Request(
            self.base_url + path,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        if self.seckey:
            # Cùng tên header server/ai.js dùng để gọi cùng reverse-proxy nội bộ
            # (KHÔNG phải "Authorization: Bearer" — gateway đó không hiểu header đó).
            if self.protocol == 'vllm':
                # Gateway ở /vllm chỉ nhận x-ollama-seckey (Bearer trả 401); vLLM trần nhận Bearer: gửi cả hai tới đúng host vLLM.
                req.add_header('Authorization', f'Bearer {self.seckey}')
            req.add_header('x-ollama-seckey', self.seckey)
        for pause in ((*RETRY_PAUSES_S, None) if retry else (None,)):
            timeout = self.remaining_s()
            try:
                send = urllib.request.build_opener(_NoRedirect()).open if self.protocol == 'vllm' else urllib.request.urlopen
                with send(req, timeout=timeout) as resp:
                    return json.loads(resp.read().decode("utf-8"))
            except urllib.error.HTTPError as error:
                if error.code not in RETRY_STATUS or pause is None:
                    raise
            except urllib.error.URLError as error:  # connection refused/reset; a read timeout is TimeoutError, not retried
                if isinstance(error.reason, TimeoutError) or pause is None:
                    raise
            if self.deadline is not None and pause >= self.remaining_s():
                raise TimeoutError('Model request deadline exceeded') from None
            _sleep(pause)
