"""Đo mỗi lần gọi model + quy ra đơn vị budget theo nhà cung cấp.

Cả hai nhà cung cấp đều trace thời gian + token. Ràng buộc tối ưu khác nhau:
ollama (GPU tự host, dùng chung) = 1 đơn vị / giây GPU; api (thuê, chưa dùng) =
1 đơn vị / 1K token. Token của ollama vẫn ghi để có baseline nếu sau chuyển api.
"""
from __future__ import annotations

import json
import math
import re
import secrets
import threading
import time
from collections import deque
from pathlib import Path

from runtime import limits
from clock import fmt, now_ms

PROVIDERS = ("ollama", "vllm", "api")
TRACE_CAP = 8192  # ký tự mỗi phần prompt/output gửi server; JSONL cục bộ giữ đủ
POST_BYTES = 56_000  # dưới express.json limit 64kb, chừa chỗ lease/run_id
# Phần giải thích kèm mỗi lần gọi (AI biết gì / tool nào chạy / sửa gì / đánh giá ra sao): tổng ≲ 14 KB mỗi record.
MAX_NOTES, NOTE_SUMMARY_CAP, NOTE_DATA_CAP, EDIT_CAP, EVAL_CAP = 30, 500, 1500, 4000, 800
_MEMORY = limits.contract()["limits"]["memory"]
ROTATE_BYTES = _MEMORY["traces_mb"] * 1024 * 1024
ROTATE_KEEP = _MEMORY["traces_keep"]  # file hiện tại + (KEEP-1) bản cũ
# Trần mỗi worker, đọc từ server/ai-board/contract.json (limits); vượt thì ngừng nhận ticket mới,
# không phạt ticket đang chạy. Phải lớn hơn 1 lượt lớn nhất để task lớn không bị bỏ đói.
HOURLY_GPU_S = limits.contract()["limits"]["gpu_s_per_worker_hour"]["value"]

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
    if provider in {"ollama", "vllm"}:
        ms = metrics.get("gpu_ms")
        return max(1, math.ceil((ms if ms is not None else metrics["wall_ms"]) / 1000))
    return max(1, math.ceil(((metrics.get("tokens_in") or 0) + (metrics.get("tokens_out") or 0)) / 1000))


def redact(text: str) -> str:
    return _SECRET.sub("[đã che]", text or "")


def _clip(value, cap: int) -> str:
    """Text (hoặc JSON của giá trị) đã che secret, cắt ở `cap` ký tự."""
    text = value if isinstance(value, str) else json.dumps(value, ensure_ascii=False, default=str)
    return redact(text)[:cap]


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
        self._notes: list[dict] = []
        self._seq = 0
        self._gpu = deque()  # (monotonic s, giây GPU) trong 1 giờ gần nhất
        self.post_spans = None
        self.trace_id = None
        self.spans: list[dict] = []  # span đã đóng, chờ gửi
        self._open: list[dict] = []  # span đang mở; cuối = cha của span kế
        # Fan-out cổng 3: mỗi subtask chạy 1 thread; note/last-call phải riêng từng thread, còn
        # đệm gửi server thì dùng chung dưới 1 khoá.
        self._lock = threading.RLock()
        self._local = threading.local()

    def begin(self, run_id, post, post_spans=None) -> None:
        """Gắn run mới; xả đệm của run cũ nếu còn. Mở span `invoke_agent ai-board` của run."""
        self.end_run()
        self.flush()
        with self._lock:
            self.run_id, self.post, self.attempt, self._seq = run_id, post, 0, 0
        self._local.notes, self._local.last = [], None
        self.post_spans, self.trace_id, self._open = post_spans, secrets.token_hex(16), []
        self.open_span("invoke_agent ai-board", {"gen_ai.operation.name": "invoke_agent", "gen_ai.agent.name": "ai-board",
                                                 "gen_ai.conversation.id": str(run_id)})

    def _pending_notes(self) -> list[dict]:
        notes = getattr(self._local, "notes", None)
        if notes is None:
            notes = self._local.notes = []
        return notes

    def open_span(self, name: str, attributes: dict | None = None, *, kind: str = "internal", start_ms: int | None = None) -> dict:
        """Mở span con của span đang mở cuối (hoặc gốc). Prompt/completion không bao giờ vào attributes."""
        with self._lock:
            span = {"trace_id": self.trace_id or secrets.token_hex(16), "span_id": secrets.token_hex(8),
                    "parent_span_id": self._open[-1]["span_id"] if self._open else None, "name": name[:120], "kind": kind,
                    "start_ms": start_ms if start_ms is not None else int(time.time() * 1000), "end_ms": None,
                    "status": "unset", "attributes": dict(attributes or {}), "events": []}
            self.trace_id = span["trace_id"]
            self._open.append(span)
            return span

    def close_span(self, span: dict, status: str = "ok", attributes: dict | None = None, *, end_ms: int | None = None) -> dict:
        span["attributes"].update(attributes or {})
        span.update(status=status, end_ms=max(end_ms if end_ms is not None else int(time.time() * 1000), span["start_ms"]))
        with self._lock:
            if span in self._open:
                self._open.remove(span)
            self.spans.append(span)
        return span

    def add_span(self, name: str, attributes: dict, *, start_ms: int, end_ms: int, status: str = "ok", kind: str = "internal") -> dict:
        """Span đã xong (chat, execute_tool): mở và đóng ngay dưới span đang mở."""
        return self.close_span(self.open_span(name, attributes, kind=kind, start_ms=start_ms), status, end_ms=end_ms)

    def end_run(self, outcome: str | None = None) -> None:
        """Đóng mọi span còn mở (gốc cuối cùng); outcome lỗi → status error."""
        status = "error" if outcome and ("fail" in outcome or "error" in outcome) else "ok"
        with self._lock:
            while self._open:
                span = self._open[-1]
                self.close_span(span, status if span is self._open[0] else "unset",
                                {"tizia.outcome": outcome} if outcome and span is self._open[0] else None)

    def record(self, *, gate: float, model: str, prompt: str, prompt_name: str | None, prompt_hash: str | None,
               static_prefix: str, output: str, metrics: dict, budget_units: int, result: str,
               error: str | None = None, child: int | None = None, iteration: int = 0,
               provider: str | None = None, request: dict | None = None) -> dict:
        notes = self._pending_notes()
        with self._lock:
            if self.pending and (self.pending[-1]["gate"] != gate or len(self.pending) >= 20):
                self.flush()  # 1 lô mỗi cổng; đầy lô thì xả trước khi thêm, để record cuối còn nhận được phần đánh giá
            self._seq += 1
            seq = self._seq
        variable = prompt[len(static_prefix):] if static_prefix and prompt.startswith(static_prefix) else prompt
        variable, output = redact(variable), redact(output)
        rec = {
            "call_id": f"run{self.run_id}:g{gate}:c{child}:a{self.attempt}:i{iteration}:s{seq}",
            "gate": gate, "child": child, "attempt": self.attempt, "iteration": iteration,
            "provider": provider or self.provider, "model": model, "prompt_name": prompt_name, "prompt_hash": prompt_hash,
            "prompt_len": len(prompt), "output_len": len(output), "metrics": metrics,
            "budget_units": budget_units, "result": result, "error": (error or None) and error[:300],
            "at": int(time.time() * 1000),
            "notes": notes, "edits": None, "evaluation": [],
        }
        self._local.notes = []
        self._chat_span(rec, metrics, request or {})
        self._write({**rec, "prompt_var": variable, "output": output})
        (pv, pt), (out, ot) = _cap(variable), _cap(output)
        entry = {**rec, "prompt_var": pv, "output": out, "truncated": {"prompt": pt, "output": ot}}
        with self._lock:
            self.pending.append(entry)
        self._local.last = entry  # attach_last/mark_last của thread này gắn vào lần gọi của chính nó
        now = time.monotonic()
        self._gpu.append((now, (metrics.get("gpu_ms") or 0) / 1000))
        return rec

    def _chat_span(self, rec: dict, metrics: dict, request: dict) -> None:
        end = rec["at"]
        done = metrics.get("done_reason")
        attrs = {"gen_ai.operation.name": "chat", "gen_ai.provider.name": rec["provider"], "gen_ai.request.model": rec["model"],
                 "gen_ai.usage.input_tokens": metrics.get("tokens_in"), "gen_ai.usage.output_tokens": metrics.get("tokens_out"),
                 "gen_ai.response.finish_reasons": [done] if done else [], "tizia.gate": rec["gate"], "tizia.child": rec["child"],
                 "tizia.iteration": rec["iteration"], "tizia.call_id": rec["call_id"], "tizia.result": rec["result"],
                 "tizia.thinking": request.get("thinking"), "tizia.reasoning_chars": request.get("reasoning_chars"), "tizia.prompt_name": rec["prompt_name"],
                 "tizia.role": request.get("role"), "tizia.prompt_roles": request.get("prompt_roles")}
        if request.get("skills"):
            attrs["tizia.skills.selected"] = [s["name"] for s in request["skills"]]
            attrs["tizia.skills.dropped"] = [f"{d['name']}: {d['reason']}" for d in request["skill_selection"]["dropped"]]
        if request.get("temperature") is not None:
            attrs["gen_ai.request.temperature"] = request["temperature"]
        if request.get("max_tokens") is not None:
            attrs["gen_ai.request.max_tokens"] = request["max_tokens"]
        span = self.add_span(f"chat {rec['model']}", attrs, kind="client", start_ms=end - int(metrics.get("wall_ms") or 0), end_ms=end,
                             status="ok" if rec["result"] == "ok" else "error")
        for skill in request.get('skills') or []:
            span['events'].append({'name': 'tizia.skill.used', 'time_ms': end,
                                   'attributes': {f'tizia.skill.{k}': v for k, v in skill.items()}})

    def note(self, kind: str, name: str, summary: str = "", data=None) -> None:
        """Ghi 1 điều AI biết ("knows") hoặc 1 tool harness đã chạy cho AI ("tool"); đính vào lần gọi model KẾ TIẾP
        của cùng thread."""
        notes = self._pending_notes()
        if len(notes) < MAX_NOTES:
            notes.append({"kind": kind, "name": _clip(name, 80), "summary": _clip(summary, NOTE_SUMMARY_CAP),
                          "data": None if data is None else _clip(data, NOTE_DATA_CAP)})

    def attach_last(self, section: str, value: dict) -> None:
        """Đính kết quả vào lần gọi VỪA XONG của thread này: "edits" (AI sửa gì) ghi đè; "evaluation" nối thêm từng phép."""
        last = getattr(self._local, "last", None)
        if last is None:
            return
        if section == "edits":
            last["edits"] = {"parsed": _clip(value.get("parsed", ""), EDIT_CAP), "diff": _clip(value.get("diff", ""), EDIT_CAP),
                             "applied": value.get("applied") is True}
        elif section == "evaluation":
            last["evaluation"].append({"check": _clip(value.get("check", ""), 60), "ok": value.get("ok") is True,
                                       "detail": _clip(value.get("detail", ""), EVAL_CAP)})
        else:
            raise ValueError(f"section lạ: {section}")
        self._write({"call_id": last["call_id"], section: last[section]})

    def mark_last(self, result: str, error: str | None = None) -> None:
        """Cổng biết kết quả sau khi parse (vd retry vì search không khớp) — sửa record chưa gửi."""
        last = getattr(self._local, "last", None)
        if last is not None:
            last.update(result=result, error=(error or None) and error[:300])
            self._write({"call_id": last["call_id"], "result": result, "error": last["error"]})

    def flush(self) -> None:
        self._flush_spans()
        with self._lock:
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
                print(f"[trace {fmt(now_ms())}] gửi {len(chunk)} record lỗi: {str(error)[:200]}")

    def _flush_spans(self) -> None:
        with self._lock:
            if not self.spans:
                return
            spans, self.spans = self.spans, []
        if not self.post_spans:
            return
        for i in range(0, len(spans), 50):
            try:
                self.post_spans(spans[i:i + 50])
            except Exception as error:  # noqa: BLE001 — trace best-effort
                print(f"[trace {fmt(now_ms())}] gửi {len(spans[i:i + 50])} span lỗi: {str(error)[:200]}")

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
            print(f"[trace {fmt(now_ms())}] ghi JSONL lỗi: {error}")
