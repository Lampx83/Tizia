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
    base_url: str = "http://127.0.0.1:11434"
    gate1_model: str = "gemma4:26b"
    gate3_model: str = "qwen3-coder:30b"
    embed_model: str = "bge-m3"
    timeout_s: float = 300.0

    @classmethod
    def from_env(cls, env: dict | None = None) -> "OllamaClient":
        env = os.environ if env is None else env
        return cls(
            base_url=env.get("OLLAMA_URL") or "http://127.0.0.1:11434",
            gate1_model=env.get("GATE1_MODEL") or "gemma4:26b",
            gate3_model=env.get("GATE3_MODEL") or "qwen3-coder:30b",
            embed_model=env.get("EMBED_MODEL") or "bge-m3",
        )

    def generate(self, model: str, prompt: str, **options) -> dict:
        """POST /api/generate. Trả nguyên body JSON.

        Kèm prompt_eval_count/prompt_eval_duration trong body — người gọi log lại
        để biết prefix-cache có trúng không (spec kỷ luật cache, quy tắc 5).
        """
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": False,
            "options": {"num_ctx": NUM_CTX, **options},
        }
        return self._post("/api/generate", payload)

    def embed(self, text: str) -> dict:
        return self._post("/api/embeddings", {"model": self.embed_model, "prompt": text})

    def _post(self, path: str, payload: dict) -> dict:
        req = urllib.request.Request(
            self.base_url.rstrip("/") + path,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        seckey = os.environ.get("OLLAMA_SECKEY")
        if seckey:
            req.add_header("Authorization", f"Bearer {seckey}")
        with urllib.request.urlopen(req, timeout=self.timeout_s) as resp:
            return json.loads(resp.read().decode("utf-8"))
