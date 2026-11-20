"""run_in_sandbox cho tool-loop: argv theo allow-list, một microVM mỗi lần gọi. Tắt trừ khi AI_BOARD_SANDBOX_TOOL=1."""
from __future__ import annotations

import hashlib
import io
import json
import re
from dataclasses import asdict
import tarfile
import tempfile
import time
from pathlib import Path, PurePosixPath

from repositories import code_index
import path_policy
from repositories import server_hsm
from runtime import limits, meter, tool_manifest
from settings import get_settings
from verification.sandbox import SandboxError, SandboxSession, package

NAME = "run_in_sandbox"
SCHEMA = {"type": "object", "properties": {"argv": {"type": "array", "items": {"type": "string"}}}, "required": ["argv"]}
DESCRIPTION = ("Chạy argv trong sandbox, chỉ mẫu allow-list: node --test test/<file>, node --check <file>, npm test, npm run check:content, node scripts/<file>. "
               "Không shell, không mạng. Output bị cắt; bản đầy đủ lưu thành artifact.")
WORKTREE_DESCRIPTION = DESCRIPTION[:-len("Output bị cắt; bản đầy đủ lưu thành artifact.")] + (
    "Worktree trong VM là bản chính: file đổi ở đó là thứ được nộp; diff cuối lấy từ git trong VM và bị kiểm phạm vi + path cấm. "
    "Output bị cắt; bản đầy đủ lưu thành artifact.")
VM_DIR = "checkout"
_GIT = ("git", "-c", "safe.directory=*", "-c", "core.fileMode=false", "-C", VM_DIR)
NON_RETRYABLE = {"lease_lost", "wall_clock_s", "cleanup_unconfirmed", "not_configured"}
OUTPUT_CAP = 4000  # redacted stdout+stderr kept per receipt; the trace note clips again to its own cap
SOURCE_SUFFIXES = (".js", ".mjs", ".cjs")
_SCRIPT_NAME = re.compile(r"scripts/[A-Za-z0-9_.-]+")


class Refused(ValueError):
    """argv ngoài allow-list hoặc path không hợp lệ: chặn trước khi có VM."""


class CleanupUnconfirmed(RuntimeError):
    """VM teardown not confirmed: stop the subtask as blocked, same as Gate 5."""


class RunnerBusy(RuntimeError):
    """Runner still busy after retries: worker requeues the ticket, no retry spent."""
    failure_class = "busy"


def enabled(env=None) -> bool:
    return limits.sandbox_tool(env)["enabled"]


def offered(task_type, gate: int = 3, env=None) -> bool:
    """Tool offered in gate `gate` loop for this task type; flag must be on, unknown type is not offered."""
    cfg = limits.sandbox_tool(env)
    return cfg["enabled"] and gate in cfg["task_types"].get(task_type, [])


def tier_armed(tier: str, env=None) -> bool:
    """True when `tier` is listed in AI_BOARD_SANDBOX_REPO_SCRIPTS_TIERS."""
    return tier in {t.strip() for t in get_settings(env).sandbox_repo_scripts_tiers.split(",") if t.strip()}


def _spec(cfg: dict, worktree: bool = False) -> tool_manifest.ToolSpec:
    return tool_manifest.ToolSpec(NAME, WORKTREE_DESCRIPTION if worktree else DESCRIPTION, SCHEMA, "read", 2000, cfg["output_chars"], cfg["wall_clock_s"])


def worktree_on(env=None) -> bool:
    """Worktree-in-VM mode: its flag and the subtask VM flag both on."""
    settings = get_settings(env)
    return settings.sandbox_vm_worktree and settings.sandbox_subtask_vm


def specs(env=None) -> dict[str, tool_manifest.ToolSpec]:
    """Spec tool bổ sung cho tool-loop; rỗng khi flag tắt. Không nằm trong tool_manifest.json nên hash manifest không đổi."""
    cfg = limits.sandbox_tool(env)
    return {NAME: _spec(cfg, worktree_on(env))} if cfg["enabled"] else {}


def _hash(spec: tool_manifest.ToolSpec) -> str:
    return hashlib.sha256(json.dumps(asdict(spec), sort_keys=True, default=str).encode()).hexdigest()


def spec_hash() -> str:
    """Băm spec bổ sung (bất kể flag) để root ghim khi chốt manifest."""
    return _hash(_spec(limits.sandbox_tool()))


def worktree_spec_hash() -> str:
    """Băm spec khi worktree-in-VM bật."""
    return _hash(_spec(limits.sandbox_tool(), True))


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
    if pattern == "<script>":
        return _script_file(token)
    return pattern == token


def _repo_file(token: str, prefix: str = "") -> bool:
    if path_policy.normalize(token) != token or not token.startswith(prefix) or not token.endswith(SOURCE_SUFFIXES):
        return False
    return not path_policy.denied(token, "exec")


def _script_file(token: str) -> bool:
    """scripts/<file>.js|mjs|cjs trực tiếp dưới scripts/, ngoài script_deny và deny_paths."""
    if not _SCRIPT_NAME.fullmatch(token) or not _repo_file(token):
        return False
    return not re.search(limits.sandbox_tool()["script_deny"], token, re.I)


def _stage(source, sha: str, drafts: dict[str, str], root: Path) -> None:
    """Base tree tại sha + bản nháp đè lên; chỉ file thường, không đường dẫn tuyệt đối hay `..`."""
    with tarfile.open(fileobj=io.BytesIO(code_index.git(source, "archive", "--format=tar", sha)), mode="r:") as archive:
        for member in archive.getmembers():
            if not member.isfile() or PurePosixPath(member.name).is_absolute() or ".." in PurePosixPath(member.name).parts:
                continue
            target = root / member.name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(archive.extractfile(member).read())
    _write(drafts, root)


def _overlay(files: dict[str, str]) -> bytes:
    """tar.gz chỉ gồm `files` dưới checkout/, để upload đè lên worktree VM mà không đụng file khác."""
    buffer = io.BytesIO()
    with tarfile.open(fileobj=buffer, mode="w:gz") as archive:
        dirs = {VM_DIR} | {"/".join((VM_DIR, *parts[:i])) for parts in (PurePosixPath(rel).parts for rel in files) for i in range(1, len(parts))}
        for name in sorted(dirs):
            info = tarfile.TarInfo(name)
            info.type, info.mode, info.mtime = tarfile.DIRTYPE, 0o755, 0
            archive.addfile(info)
        for rel, text in files.items():
            data = text.encode("utf-8")
            info = tarfile.TarInfo(f"{VM_DIR}/{rel}")
            info.size, info.mode, info.mtime = len(data), 0o644, 0
            archive.addfile(info, io.BytesIO(data))
    return buffer.getvalue()


def _write(drafts: dict[str, str], root: Path) -> None:
    for rel, text in drafts.items():
        target = root / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(text, encoding="utf-8")


class Runner:
    """Gọi run_in_sandbox: stage một lần, mỗi attempt một VM; ghi receipt cho từng lần exec."""

    def __init__(self, source, sha: str, *, client=None, lease_ok=None, trace=None, env=None, receipts=None, budget=None,
                 tier: str | None = None, kept: bool | None = None, worktree: bool | None = None):
        self.kept = get_settings(env).sandbox_subtask_vm if kept is None else kept
        self.worktree = self.kept and (get_settings(env).sandbox_vm_worktree if worktree is None else worktree)
        self._session = self._tmp = self._uploaded = self._tree = None
        self._vm_state: dict[str, str] = {}
        self._opened = 0.0
        self.source, self.sha, self.client, self.trace, self.budget = source, sha, client, trace, budget
        self.lease_ok = lease_ok or authority_ok
        self.cfg = limits.sandbox_tool(env, tier=tier)
        self.receipts: list[dict] = [] if receipts is None else receipts

    def __call__(self, argv, drafts: dict[str, str], call_id: str | None = None) -> str:
        check_argv(argv, self.cfg["allowed_argv"])
        if self.kept:
            return self._call_kept(argv, drafts, call_id)
        deadline = time.monotonic() + self.cfg["wall_clock_s"]
        with tempfile.TemporaryDirectory(prefix="ai-sandbox-stage-") as stage:
            _stage(self.source, self.sha, drafts, Path(stage))
            for attempt in range(self.cfg["max_retries"] + 1):
                started = time.monotonic()
                receipt = {"run_id": None, "tool_call_id": call_id, "argv": list(argv), "attempt": attempt, "rc": None, "error": None}
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
                if retry and self.budget is not None and not self.budget.spend("tool_calls"):
                    retry = False
                if not retry:
                    if error.status == 429:
                        raise RunnerBusy(f"sandbox runner busy (run {session.run_id})")
                    return json.dumps({"rc": None, "error": error.code, "phase": error.phase}, ensure_ascii=False)
        raise AssertionError("unreachable")

    def _call_kept(self, argv, drafts: dict[str, str], call_id: str | None) -> str:
        for attempt in range(self.cfg["max_retries"] + 1):
            started = time.monotonic()
            receipt = {"run_id": None, "tool_call_id": call_id, "argv": list(argv), "attempt": attempt, "rc": None, "error": None}
            outcome, error = None, None
            try:
                session = self._open(drafts)
                receipt["run_id"] = session.run_id
                outcome = session.exec(argv, self.cfg["exec_timeout_s"])
            except SandboxError as caught:
                error = caught
            if outcome is not None:
                return self._observe(receipt, outcome, started)
            receipt["run_id"] = receipt["run_id"] or getattr(self._session, "run_id", None)
            try:
                self._drop()
            except CleanupUnconfirmed:
                receipt["error"] = "cleanup_unconfirmed"
                self._record(receipt, started)
                raise
            receipt["error"] = error.code
            retry = attempt < self.cfg["max_retries"] and error.code not in NON_RETRYABLE \
                and (error.status in (0, 429) or error.status >= 500)
            self._record(receipt, started)
            if retry and self.budget is not None and not self.budget.spend("tool_calls"):
                retry = False
            if not retry:
                if error.status == 429:
                    raise RunnerBusy("sandbox runner busy")
                return json.dumps({"rc": None, "error": error.code, "phase": error.phase}, ensure_ascii=False)
        raise AssertionError("unreachable")

    def _open(self, drafts: dict[str, str]) -> SandboxSession:
        """Live subtask VM: created on first use, later calls upload only edited drafts."""
        if self._session is not None:
            if self.worktree:
                self._push(drafts)
            elif drafts != self._uploaded:
                _write(drafts, Path(self._tmp.name))
                self._sync(self._session)
                self._uploaded = dict(drafts)
            return self._session
        self._tmp = tempfile.TemporaryDirectory(prefix="ai-sandbox-stage-")
        _stage(self.source, self.sha, {} if self.worktree else drafts, Path(self._tmp.name))
        left = getattr(self.budget, "remaining_s", None)
        self._opened = time.monotonic()
        session = SandboxSession(self._tmp.name, client=self.client, lease_ok=self.lease_ok,
                                 deadline=self._opened + (left() if left else self.cfg["wall_clock_s"]))
        self._session = session
        session.__enter__()
        if self.worktree:
            self._git("init", "-q")
            self._git("add", "-A")
            self._tree, self._vm_state = self._git("write-tree").strip(), {}
            self._push(drafts)
        else:
            self._uploaded = dict(drafts)
        return session

    def _vm(self, *argv: str) -> dict:
        out = self._session.exec(list(argv), self.cfg["exec_timeout_s"])
        if out["timed_out"] or out["truncated"]:
            raise SandboxError("worktree_exec", "exec")
        return out

    def _git(self, *args: str) -> str:
        out = self._vm(*_GIT, *args)
        if out["rc"] != 0:
            raise SandboxError("worktree_git", "exec")
        return out["stdout"]

    def _base_text(self, rel: str) -> str:
        try:
            return (Path(self._tmp.name) / rel).read_bytes().decode("utf-8")
        except (OSError, UnicodeDecodeError):
            return ""

    def _push(self, drafts: dict[str, str]) -> None:
        """Upload drafts the VM does not hold yet; files the VM already has (shell edits included) are left alone."""
        todo = {rel: text for rel, text in drafts.items() if text != self._vm_state.get(rel, self._base_text(rel))}
        if not todo:
            return
        session = self._session
        if session.lease.revoked or not self.lease_ok():
            raise SandboxError("lease_lost", "lease")
        session.client.upload(session.run_id, _overlay(todo), deadline=session.deadline)
        self._vm_state.update(todo)

    def changes(self, drafts: dict[str, str], ensure: bool = False):
        """(changed {path: text}, rejected [(path, kind)]) of the VM worktree against its base tree, read from git there; None when no VM and not ensure."""
        if self._session is None and not ensure:
            return None
        self._open(drafts)
        self._git("add", "-A")
        raw = self._git("diff", "--cached", "--numstat", "-z", "--no-renames", self._tree)
        changed, rejected = {}, []
        for number, entry in enumerate(e for e in raw.split("\0") if e):
            added, _, path = entry.split("\t", 2)
            if path_policy.normalize(path) != path:
                rejected.append((path, "path"))
            elif number >= path_policy.OUT_OF_PLAN_CAP:
                rejected.append((path, "extra"))
            elif added == "-":
                rejected.append((path, "binary"))
            elif (shown := self._vm(*_GIT, "show", f":{path}"))["rc"] != 0:
                rejected.append((path, "deleted"))
            else:
                changed[path] = shown["stdout"]
        self._vm_state = dict(changed)
        return changed, rejected

    def _sync(self, session: SandboxSession) -> None:
        if session.lease.revoked or not self.lease_ok():
            raise SandboxError("lease_lost", "lease")
        session.client.upload(session.run_id, package(session.checkout, {}, {}), deadline=session.deadline)

    def _drop(self) -> None:
        """Destroy the subtask VM and its staging; CleanupUnconfirmed when teardown is not confirmed."""
        session, tmp, self._session, self._tmp, self._uploaded = self._session, self._tmp, None, None, None
        self._tree, self._vm_state = None, {}
        if session is None:
            return
        pending = session.cleanup_pending
        if session.lease is not None and not pending:
            try:
                session.__exit__(None, None, None)
            except SandboxError:
                pass
            pending = session.cleanup_pending
        if tmp is not None:
            tmp.cleanup()
        if hasattr(self.trace, "add_gpu_s"):
            self.trace.add_gpu_s(max(0.0, time.monotonic() - self._opened))
        if pending:
            raise CleanupUnconfirmed(f"sandbox destroy: cleanup_unconfirmed (run {session.run_id})")

    def close(self) -> None:
        """End of subtask: destroy the VM; idempotent."""
        self._drop()

    def _observe(self, receipt: dict, outcome: dict, started: float) -> str:
        limit = self.cfg["output_chars"]
        stdout, stderr = meter.redact(outcome["stdout"]), meter.redact(outcome["stderr"])
        receipt["rc"], receipt["timed_out"] = outcome["rc"], outcome["timed_out"]
        receipt["output"] = f"--- stdout ---\n{stdout}\n--- stderr ---\n{stderr}"[:OUTPUT_CAP]
        self._record(receipt, started)
        truncated = outcome["truncated"] or len(stdout) > limit or len(stderr) > limit
        return json.dumps({"rc": outcome["rc"], "stdout": stdout[:limit], "stderr": stderr[:limit], "truncated": truncated,
                           "timed_out": outcome["timed_out"]},
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
                "tizia.sandbox.run_id": receipt["run_id"] or "", "tizia.tool_call_id": receipt["tool_call_id"] or "", "tizia.sandbox.argv": " ".join(receipt["argv"])[:200],
                "tizia.sandbox.rc": receipt["rc"] if receipt["rc"] is not None else -1, "tizia.sandbox.attempt": receipt["attempt"],
                "tizia.sandbox.error": receipt["error"] or "", "tizia.sandbox.timed_out": bool(receipt.get("timed_out")),
            }, start_ms=now - receipt["duration_ms"], end_ms=now, status="error" if receipt["error"] else "ok")
