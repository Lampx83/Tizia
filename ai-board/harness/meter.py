"""Đo mỗi lần gọi model + quy ra đơn vị budget theo nhà cung cấp.

Cả hai nhà cung cấp đều trace thời gian + token. Ràng buộc tối ưu khác nhau:
ollama (GPU tự host, dùng chung) = 1 đơn vị / giây GPU; api (thuê, chưa dùng) =
1 đơn vị / 1K token. Token của ollama vẫn ghi để có baseline nếu sau chuyển api.
"""
from __future__ import annotations

import json
import math
import re
import time
from collections import deque
from pathlib import Path

PROVIDERS = ("ollama", "api")
TRACE_CAP = 8192  # ký tự mỗi phần prompt/output gửi server; JSONL cục bộ giữ đủ
POST_BYTES = 56_000  # dưới express.json limit 64kb, chừa chỗ lease/run_id
ROTATE_BYTES = 20 * 1024 * 1024
ROTATE_KEEP = 3
HOURLY_GPU_S = 900  # trần mỗi worker; vượt thì ngừng nhận ticket mới, không phạt ticket đang chạy

# Cùng họ mẫu với gates/guard.py _SECRET — che trước khi ghi/gửi trace.
_SECRET = re.compile(
    r"-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----"
    r"|\bAKIA[0-9A-Z]{16}\b|\bsk-[A-Za-z0-9_-]{20,}|\bgh[pousr]_[A-Za-z0-9]{30,}|\bxox[abprs]-[A-Za-z0-9-]{10,}"
    r"|(?i:(?:api[_-]?key|secret|seckey|token|password|passwd)\w*\s*[:=]\s*['\"][^'\"\s]{8,}['\"])"
)


def _ms(ns) -> int | None:
    return None if ns is None else int(ns) // 1_000_000


def measure(provider: str, body: dict, wall_ms: int) -> dict:
    """Body thô của provider → metrics chung. Thiếu số nào để None, không đoán."""
    if provider == "ollama":
        tokens_in, tokens_out = body.get("prompt_eval_count"), body.get("eval_count")
        load, prompt_eval, evaluate = (_ms(body.get(k)) for k in ("load_duration", "prompt_eval_duration", "eval_duration"))
        total = _ms(body.get("total_duration"))
        parts = [p for p in (load, prompt_eval, evaluate) if p is not None]
        gpu = sum(parts) if parts else None
        tok_s = round(tokens_out / (evaluate / 1000), 1) if tokens_out and evaluate else None
        queue = max(wall_ms - total, 0) if total is not None else None
        done = body.get("done_reason")
    else:
        usage = body.get("usage") or {}
        tokens_in = usage.get("prompt_tokens", usage.get("input_tokens"))
        tokens_out = usage.get("completion_tokens", usage.get("output_tokens"))
        gpu = load = prompt_eval = evaluate = queue = None
        tok_s = round(tokens_out / (wall_ms / 1000), 1) if tokens_out and wall_ms else None
        done = body.get("stop_reason") or ((body.get("choices") or [{}])[0].get("finish_reason"))
    return {"wall_ms": int(wall_ms), "tokens_in": tokens_in, "tokens_out": tokens_out, "tok_s": tok_s,
            "done_reason": done, "gpu_ms": gpu, "load_ms": load, "prompt_eval_ms": prompt_eval,
            "eval_ms": evaluate, "queue_ms": queue}


def units(provider: str, metrics: dict) -> int:
    """Đơn vị budget của 1 lần gọi, tối thiểu 1. ollama: giây GPU (thiếu số thì lấy wall); api: 1K token."""
    if provider == "ollama":
        ms = metrics.get("gpu_ms")
        return max(1, math.ceil((ms if ms is not None else metrics["wall_ms"]) / 1000))
    return max(1, math.ceil(((metrics.get("tokens_in") or 0) + (metrics.get("tokens_out") or 0)) / 1000))


def redact(text: str) -> str:
    return _SECRET.sub("[đã che]", text or "")


def _cap(text: str) -> tuple[str, bool]:
    return (text[:TRACE_CAP], True) if len(text) > TRACE_CAP else (text, False)


class Tracer:
    """Gom record mỗi lần gọi model: ghi JSONL cục bộ (đủ, đã che secret, xoay vòng) và
    đệm bản cắt 8 KB để worker gửi server theo lô. `post(calls)` do worker gắn mỗi run;
    lỗi gửi không bao giờ làm hỏng cổng đang chạy."""

    def __init__(self, path: str | Path | None = None, *, provider: str = "ollama"):
        self.path = Path(path) if path else None
        self.provider = provider
        self.post = None
        self.run_id = None
        self.attempt = 0
        self.pending: list[dict] = []
        self._seq = 0
        self._gpu = deque()  # (monotonic s, giây GPU) trong 1 giờ gần nhất

    def begin(self, run_id, post) -> None:
        """Gắn run mới; xả đệm của run cũ nếu còn."""
        self.flush()
        self.run_id, self.post, self.attempt, self._seq = run_id, post, 0, 0

    def record(self, *, gate: float, model: str, prompt: str, prompt_name: str | None, prompt_hash: str | None,
               static_prefix: str, output: str, metrics: dict, budget_units: int, result: str,
               error: str | None = None, child: int | None = None, iteration: int = 0) -> dict:
        if self.pending and self.pending[-1]["gate"] != gate:
            self.flush()  # 1 lô mỗi cổng
        self._seq += 1
        variable = prompt[len(static_prefix):] if static_prefix and prompt.startswith(static_prefix) else prompt
        variable, output = redact(variable), redact(output)
        rec = {
            "call_id": f"run{self.run_id}:g{gate}:c{child}:a{self.attempt}:i{iteration}:s{self._seq}",
            "gate": gate, "child": child, "attempt": self.attempt, "iteration": iteration,
            "provider": self.provider, "model": model, "prompt_name": prompt_name, "prompt_hash": prompt_hash,
            "prompt_len": len(prompt), "output_len": len(output), "metrics": metrics,
            "budget_units": budget_units, "result": result, "error": (error or None) and error[:300],
            "at": int(time.time() * 1000),
        }
        self._write({**rec, "prompt_var": variable, "output": output})
        (pv, pt), (out, ot) = _cap(variable), _cap(output)
        self.pending.append({**rec, "prompt_var": pv, "output": out, "truncated": {"prompt": pt, "output": ot}})
        now = time.monotonic()
        self._gpu.append((now, (metrics.get("gpu_ms") or 0) / 1000))
        if len(self.pending) >= 20:
            self.flush()
        return rec

    def mark_last(self, result: str, error: str | None = None) -> None:
        """Cổng biết kết quả sau khi parse (vd retry vì search không khớp) — sửa record chưa gửi."""
        if self.pending:
            last = self.pending[-1]
            last.update(result=result, error=(error or None) and error[:300])
            self._write({"call_id": last["call_id"], "result": result, "error": last["error"]})

    def flush(self) -> None:
        if not self.pending or not self.post:
            self.pending.clear()
            return
        calls, self.pending = self.pending, []
        # Server giới hạn body 64 KB: chia lô theo byte UTF-8 (1 record ≤ ~50 KB với 2 × 8192 ký tự).
        chunks, size = [[]], 0
        for call in calls:
            n = len(json.dumps(call, ensure_ascii=False).encode("utf-8"))
            if chunks[-1] and size + n > POST_BYTES:
                chunks.append([])
                size = 0
            chunks[-1].append(call)
            size += n
        for chunk in chunks:
            try:
                self.post(chunk)
            except Exception as error:  # noqa: BLE001 — trace best-effort
                print(f"[trace] gửi {len(chunk)} record lỗi: {str(error)[:200]}")

    def over_hourly_cap(self, cap: float = HOURLY_GPU_S) -> bool:
        return self.gpu_s_last_hour() >= cap

    def gpu_s_last_hour(self) -> float:
        cutoff = time.monotonic() - 3600
        while self._gpu and self._gpu[0][0] < cutoff:
            self._gpu.popleft()
        return sum(s for _, s in self._gpu)

    def _write(self, rec: dict) -> None:
        if not self.path:
            return
        try:
            self.path.parent.mkdir(parents=True, exist_ok=True)
            if self.path.exists() and self.path.stat().st_size > ROTATE_BYTES:
                for i in range(ROTATE_KEEP - 2, 0, -1):  # giữ file hiện tại + .1 … .(KEEP-1)
                    older = self.path.with_name(f"{self.path.name}.{i}")
                    if older.exists():
                        older.replace(self.path.with_name(f"{self.path.name}.{i + 1}"))
                self.path.replace(self.path.with_name(f"{self.path.name}.1"))
            with self.path.open("a", encoding="utf-8") as f:
                f.write(json.dumps(rec, ensure_ascii=False) + "\n")
        except OSError as error:
            print(f"[trace] ghi JSONL lỗi: {error}")
