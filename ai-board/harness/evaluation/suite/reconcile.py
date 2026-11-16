"""Reconcile one cleanup_pending trial: confirm owned remote runs destroyed, keep it as infra, clear intent. Raise ReconcileError otherwise."""
from __future__ import annotations

import hashlib
import json
import os
import re
import tempfile
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from verification.sandbox import SandboxError

RUN_ID = re.compile(r"(?:loop|g5)-[a-f0-9]{24}")
CONFIRMED = {"destroyed", "expired", "failed"}
AUDIT = "reconcile-audit.jsonl"


class ReconcileError(ValueError):
    pass


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def vllm_inflight(env=None) -> dict:
    """Scrape vLLM /metrics -> {running, waiting}. Raise ReconcileError when unconfigured, unreachable or gauges absent."""
    env = os.environ if env is None else env
    base = (env.get("VLLM_URL") or "").strip().rstrip("/")
    if not base:
        raise ReconcileError("VLLM_URL chưa cấu hình; không xác nhận được model server idle")
    base = base.removesuffix("/v1")
    request = urllib.request.Request(base + "/metrics")
    if key := env.get("VLLM_SECKEY"):
        request.add_header("Authorization", "Bearer " + key)
        request.add_header("x-ollama-seckey", key)
    try:
        with urllib.request.build_opener(_NoRedirect()).open(request, timeout=15) as response:
            text = response.read(8_000_000).decode("utf-8", "replace")
    except (OSError, ValueError) as error:
        raise ReconcileError(f"model server không truy cập được: {type(error).__name__}") from error
    gauges = {}
    for line in text.splitlines():
        name = line.split("{", 1)[0].split(" ", 1)[0]
        if name in ("vllm:num_requests_running", "vllm:num_requests_waiting"):
            try:
                gauges[name] = gauges.get(name, 0.0) + float(line.rsplit(" ", 1)[1])
            except (IndexError, ValueError) as error:
                raise ReconcileError("metrics model server sai định dạng") from error
    if len(gauges) != 2:
        raise ReconcileError("metrics thiếu vllm:num_requests_running/waiting; không xác nhận được idle")
    return {"running": gauges["vllm:num_requests_running"], "waiting": gauges["vllm:num_requests_waiting"]}


def _lines(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def _append(path: Path, row: dict) -> None:
    with path.open("a", encoding="utf-8") as out:
        out.write(json.dumps(row, ensure_ascii=False) + "\n")
        out.flush()
        os.fsync(out.fileno())


def _journal_ids(journal: Path) -> list[str]:
    temp = Path(tempfile.gettempdir()).resolve()
    if journal.name != "runs" or not journal.parent.name.startswith("ai-board-owned-") or journal.parent.parent.resolve() != temp:
        raise ReconcileError("journal phải là runs trong ai-board-owned-* ở thư mục temp")
    if not journal.is_file() or journal.stat().st_size > 8192:
        raise ReconcileError(f"journal không đọc được hoặc quá lớn: {journal}")
    try:
        ids = journal.read_bytes().decode("ascii").splitlines()
    except UnicodeDecodeError as error:
        raise ReconcileError("journal sai định dạng") from error
    if not ids:
        raise ReconcileError("journal rỗng: không có run id để xác nhận")
    if any(not RUN_ID.fullmatch(run_id) for run_id in ids):
        raise ReconcileError("journal sai định dạng")
    return list(dict.fromkeys(ids))


def reconcile(run_dir: Path, *, by: str, reason: str, journal: Path | None = None, client=None, probe=vllm_inflight) -> dict:
    """Destroy-confirm journal run ids (or, without journal, require model server idle), then mark the single pending trial infra and drop its intent. Idempotent refusal when nothing pending."""
    if not by.strip() or not reason.strip():
        raise ReconcileError("thiếu --by hoặc --reason")
    if journal is not None and client is None:
        raise ReconcileError("sandbox-runner chưa cấu hình (AI_BOARD_SANDBOX_URL / token); không xác nhận được remote idle")
    results, intent_path = run_dir / "results.jsonl", run_dir / "trial-intent.json"
    latest = {(r["id"], r["mode"], r["repeat"]): r for r in _lines(results)}
    pending = [r for r in latest.values() if r.get("cleanup_pending")]
    if not pending:
        raise ReconcileError("không có trial cleanup_pending: không có gì để reconcile")
    if len(pending) != 1:
        raise ReconcileError(f"{len(pending)} trial cleanup_pending: chỉ reconcile từng trial một")
    row = pending[0]
    key = {"id": row["id"], "mode": row["mode"], "repeat": row["repeat"]}
    if intent_path.exists() and json.loads(intent_path.read_text(encoding="utf-8")) != key:
        raise ReconcileError("trial-intent.json không khớp trial cleanup_pending")
    states, extra = {}, {}
    if journal is None:
        if (row.get("capture") or {}).get("sandbox_cleanup_pending"):
            raise ReconcileError("trial còn sandbox cleanup: cần --journal")
        # ponytail: vLLM gauges are server-wide; no per-run attribution, so any in-flight request refuses.
        snap = probe()
        if snap["running"] or snap["waiting"]:
            raise ReconcileError(f"model server còn request đang chạy {snap}: chưa xác nhận idle")
        extra = {"mode": "model_idle", "model_inflight": snap}
    run_ids = _journal_ids(journal) if journal is not None else []
    deadline = time.monotonic() + 60
    for run_id in run_ids:
        try:
            state = client.destroy(run_id, deadline=deadline).get("state")
        except (SandboxError, ValueError) as error:
            raise ReconcileError(f"không xác nhận được huỷ {run_id}: {error}") from error
        if state not in CONFIRMED:
            raise ReconcileError(f"{run_id} trạng thái {state!r}: chưa xác nhận idle")
        states[run_id] = state
    stamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
    _append(run_dir / AUDIT, {"at": stamp, "by": by.strip(), "reason": reason.strip(), "run_dir": str(run_dir), "trial": key, **extra,
                              **({"journal_sha256": hashlib.sha256(journal.read_bytes()).hexdigest()[:16]} if journal else {}), "run_ids": states})
    _append(results, {**row, "cleanup_pending": False, "infra_error": True,
                      "reconciled": {"at": stamp, "by": by.strip(), "reason": reason.strip()}})
    intent_path.unlink(missing_ok=True)
    return {"trial": key, "run_ids": states, "trials": len(latest), "infra": sum(bool(r.get("infra_error")) for r in latest.values())}
