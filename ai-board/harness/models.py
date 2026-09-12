"""Client Ollama. Ticket 04 chưa gọi model thật — cổng còn là stub — nhưng
client phải tồn tại và thay được bằng fake trong test."""
from __future__ import annotations

import json
import os
import urllib.request
from dataclasses import dataclass

# num_ctx khai tường minh (spec: 1 model nóng, ctx là giới hạn cứng).
NUM_CTX = 16384


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
    embed_model: str = ""
    timeout_s: float = 300.0
    # Đọc 1 lần lúc dựng client. KHÔNG đọc lại os.environ trong _post: test bơm
    # env giả mà vẫn moi key thật ra rồi gửi tới base_url giả là rò credential.
    seckey: str | None = None

    @classmethod
    def from_env(cls, env: dict | None = None) -> "OllamaClient":
        env = os.environ if env is None else env
        return cls(
            base_url=(env.get("OLLAMA_URL") or "").rstrip("/"),
            gate1_model=env.get("GATE1_MODEL") or "",
            gate3_model=env.get("GATE3_MODEL") or "",
            embed_model=env.get("EMBED_MODEL") or "",
            seckey=env.get("OLLAMA_SECKEY") or None,
        )

    def generate(self, model: str, prompt: str, *, format: str | None = None, **options) -> dict:
        """POST /api/generate. Trả nguyên body JSON.

        `format="json"` là field cấp 1 của Ollama (ép output JSON hợp lệ), không
        nằm trong `options`. Kèm prompt_eval_count/prompt_eval_duration trong
        body — người gọi log lại để biết prefix-cache có trúng không (spec kỷ
        luật cache, quy tắc 5).
        """
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": False,
            "options": {"num_ctx": NUM_CTX, **options},
        }
        if format:
            payload["format"] = format
        return self._post("/api/generate", payload)

    def embed(self, text: str) -> dict:
        return self._post("/api/embeddings", {"model": self.embed_model, "prompt": text})

    def _post(self, path: str, payload: dict) -> dict:
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
            req.add_header("x-ollama-seckey", self.seckey)
        with urllib.request.urlopen(req, timeout=self.timeout_s) as resp:
            return json.loads(resp.read().decode("utf-8"))
