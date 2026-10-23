"""run_in_sandbox cho tool-loop: argv theo allow-list, một microVM mỗi lần gọi. Tắt trừ khi AI_BOARD_SANDBOX_TOOL=1."""
from __future__ import annotations

import hashlib
import io
import json
from dataclasses import asdict
import tarfile
import tempfile
import time
from pathlib import Path, PurePosixPath

import code_index
import path_policy
from repositories import server_hsm
from runtime import limits, meter, tool_manifest
from verification.sandbox import SandboxError, SandboxSession

NAME = "run_in_sandbox"
SCHEMA = {"type": "object", "properties": {"argv": {"type": "array", "items": {"type": "string"}}}, "required": ["argv"]}
DESCRIPTION = ("Chạy argv trong sandbox, chỉ mẫu allow-list: node --test test/<file>, node --check <file>. "
               "Không shell, không mạng. Output bị cắt; bản đầy đủ lưu thành artifact.")
NON_RETRYABLE = {"lease_lost", "wall_clock_s", "cleanup_unconfirmed", "not_configured"}
OUTPUT_CAP = 4000  # redacted stdout+stderr kept per receipt; the trace note clips again to its own cap
SOURCE_SUFFIXES = (".js", ".mjs", ".cjs")


class Refused(ValueError):
    """argv ngoài allow-list hoặc path không hợp lệ: chặn trước khi có VM."""


class CleanupUnconfirmed(RuntimeError):
    """VM teardown not confirmed: stop the subtask as blocked, same as Gate 5."""


def enabled(env=None) -> bool:
    return limits.sandbox_tool(env)["enabled"]


def offered(task_type, gate: int = 3, env=None) -> bool:
    """Tool offered in gate `gate` loop for this task type; flag must be on, unknown type is not offered."""
    cfg = limits.sandbox_tool(env)
    return cfg["enabled"] and gate in cfg["task_types"].get(task_type, [])


def _spec(cfg: dict) -> tool_manifest.ToolSpec:
    return tool_manifest.ToolSpec(NAME, DESCRIPTION, SCHEMA, "read", 2000, cfg["output_chars"], cfg["wall_clock_s"])


def specs(env=None) -> dict[str, tool_manifest.ToolSpec]:
    """Spec tool bổ sung cho tool-loop; rỗng khi flag tắt. Không nằm trong tool_manifest.json nên hash manifest không đổi."""
    cfg = limits.sandbox_tool(env)
    return {NAME: _spec(cfg)} if cfg["enabled"] else {}


def spec_hash() -> str:
    """Băm spec bổ sung (bất kể flag) để root ghim khi chốt manifest."""
    return hashlib.sha256(json.dumps(asdict(_spec(limits.sandbox_tool())), sort_keys=True, default=str).encode()).hexdigest()


def authority_ok() -> bool:
    """Vé còn hiệu lực theo HSM; False khi backend thu quyền. Không có backend thì không chặn."""
    try:
        server_hsm.authorize_action(NAME)
    except server_hsm.AuthorityError:
        return False
    return True


def check_argv(argv, allowed) -> None:
    """Raise Refused nếu argv không khớp mẫu nào trong allowed (<test>: test/*.js, <file>: file js hợp lệ)."""
    if not isinstance(argv, list) or not argv or not all(isinstance(token, str) for token in argv):
        raise Refused("argv phải là mảng chuỗi không rỗng")
    for pattern in allowed:
        if len(pattern) == len(argv) and all(_token_ok(p, token) for p, token in zip(pattern, argv)):
            return
    raise Refused(f"lệnh ngoài allow-list: {argv[:2]!r}")


def _token_ok(pattern: str, token: str) -> bool:
    if pattern == "<test>":
        return _repo_file(token, "test/")
    if pattern == "<file>":
        return _repo_file(token)
    return pattern == token


def _repo_file(token: str, prefix: str = "") -> bool:
    if path_policy.normalize(token) != token or not token.startswith(prefix) or not token.endswith(SOURCE_SUFFIXES):
        return False
    return not path_policy.denied(token, "exec")


def _stage(source, sha: str, drafts: dict[str, str], root: Path) -> None:
    """Base tree tại sha + bản nháp đè lên; chỉ file thường, không đường dẫn tuyệt đối hay `..`."""
    with tarfile.open(fileobj=io.BytesIO(code_index.git(source, "archive", "--format=tar", sha)), mode="r:") as archive:
        for member in archive.getmembers():
            if not member.isfile() or PurePosixPath(member.name).is_absolute() or ".." in PurePosixPath(member.name).parts:
                continue
            target = root / member.name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(archive.extractfile(member).read())
    for rel, text in drafts.items():
        target = root / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(text, encoding="utf-8")


class Runner:
    """Gọi run_in_sandbox: stage một lần, mỗi attempt một VM; ghi receipt cho từng lần exec."""

    def __init__(self, source, sha: str, *, client=None, lease_ok=None, trace=None, env=None, receipts=None):
        self.source, self.sha, self.client, self.trace = source, sha, client, trace
        self.lease_ok = lease_ok or authority_ok
        self.cfg = limits.sandbox_tool(env)
        self.receipts: list[dict] = [] if receipts is None else receipts

    def __call__(self, argv, drafts: dict[str, str]) -> str:
        check_argv(argv, self.cfg["allowed_argv"])
        deadline = time.monotonic() + self.cfg["wall_clock_s"]
        with tempfile.TemporaryDirectory(prefix="ai-sandbox-stage-") as stage:
            _stage(self.source, self.sha, drafts, Path(stage))
            for attempt in range(self.cfg["max_retries"] + 1):
                started = time.monotonic()
                receipt = {"run_id": None, "argv": list(argv), "attempt": attempt, "rc": None, "error": None}
                session = SandboxSession(stage, client=self.client, lease_ok=self.lease_ok, deadline=deadline)
                receipt["run_id"] = session.run_id
                outcome, error = None, None
                try:
                    with session:
                        outcome = session.exec(argv, self.cfg["exec_timeout_s"])
                except SandboxError as caught:
                    error = caught
                if session.cleanup_pending:
                    receipt["error"] = "cleanup_unconfirmed"
                    if outcome is not None:
                        self._observe(receipt, outcome, started)
                    else:
                        self._record(receipt, started)
                    raise CleanupUnconfirmed(f"sandbox destroy: cleanup_unconfirmed (run {session.run_id})")
                if outcome is not None:
                    return self._observe(receipt, outcome, started)
                receipt["error"] = error.code
                retry = attempt < self.cfg["max_retries"] and error.code not in NON_RETRYABLE and time.monotonic() < deadline \
                    and (error.status in (0, 429) or error.status >= 500)
                self._record(receipt, started)
                if not retry:
                    return json.dumps({"rc": None, "error": error.code, "phase": error.phase}, ensure_ascii=False)
        raise AssertionError("unreachable")

    def _observe(self, receipt: dict, outcome: dict, started: float) -> str:
        limit = self.cfg["output_chars"]
        stdout, stderr = meter.redact(outcome["stdout"]), meter.redact(outcome["stderr"])
        receipt["rc"] = outcome["rc"]
        receipt["output"] = f"--- stdout ---\n{stdout}\n--- stderr ---\n{stderr}"[:OUTPUT_CAP]
        self._record(receipt, started)
        truncated = outcome["truncated"] or len(stdout) > limit or len(stderr) > limit
        return json.dumps({"rc": outcome["rc"], "stdout": stdout[:limit], "stderr": stderr[:limit], "truncated": truncated},
                          ensure_ascii=False)

    def _record(self, receipt: dict, started: float) -> None:
        receipt["duration_ms"] = int((time.monotonic() - started) * 1000)
        self.receipts.append(receipt)
        if hasattr(self.trace, "note"):
            self.trace.note("tool", "run_in_sandbox", f"{' '.join(receipt['argv'])} rc={receipt['rc']} attempt={receipt['attempt']}"
                            f"{' error=' + receipt['error'] if receipt['error'] else ''}", receipt.get("output"))
        if hasattr(self.trace, "add_span"):
            now = int(time.time() * 1000)
            self.trace.add_span("sandbox_exec", {
                "tizia.sandbox.run_id": receipt["run_id"] or "", "tizia.sandbox.argv": " ".join(receipt["argv"])[:200],
                "tizia.sandbox.rc": receipt["rc"] if receipt["rc"] is not None else -1, "tizia.sandbox.attempt": receipt["attempt"],
                "tizia.sandbox.error": receipt["error"] or "",
            }, start_ms=now - receipt["duration_ms"], end_ms=now, status="error" if receipt["error"] else "ok")
