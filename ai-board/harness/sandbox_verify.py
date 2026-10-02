"""Gate 5 in a fresh Microsandbox microVM via the runner API. Runner failure = sanitized transient block, never host fallback."""
from __future__ import annotations

import io
import json
import os
import random
import shutil
import tarfile
import tempfile
import threading
import time
import urllib.error
import urllib.request
import uuid
from pathlib import Path
from typing import Callable

from gates import verify

PROTOCOL = "1"
CREATE_TIMEOUT_S = 600.0  # first boot after a cache wipe imports a multi-GB guest image
SKIP_DIRS = {".git", "node_modules", "__pycache__", ".venv", ".pytest_cache", ".cache", ".scratch"}
GUEST_STATE = "state.json"
# What gates.verify.run / functional read from `state` inside the guest; nothing else of the worker's state is uploaded.
GUEST_STATE_KEYS = ("skill_id", "diffs", "full_diff", "request_title", "request_detail", "base_sha")
GUEST_OUT = "out"
MANIFEST = [{"name": "result", "path": f"{GUEST_OUT}/result.json"}, {"name": "shots", "path": f"{GUEST_OUT}/shots.tgz"}]
GUEST_ENTRY = ("mkdir -p /workspace/out && chmod 777 /workspace/out && cd /opt/ai-board/ai-board/harness && "
               'exec runuser -u gate -- env "PATH=$PATH" "PLAYWRIGHT_BROWSERS_PATH=$PLAYWRIGHT_BROWSERS_PATH" HOME=/home/gate '
               "python -m gates.gate5_guest /workspace/state.json /workspace/checkout /workspace/out")
RENEW_EVERY_S = 30.0
BACKOFF_S = (1, 2, 4, 8)
LEASE_S = 120.0
CALL_ATTEMPTS = 3
_sleep = time.sleep


def _retry(call: Callable[[], dict], retry_on: Callable[[SandboxError], bool]) -> dict:
    """Run call, repeating up to CALL_ATTEMPTS times (exponential backoff + jitter) while retry_on says the error is transient."""
    delay = iter(BACKOFF_S)
    for attempt in range(CALL_ATTEMPTS):
        try:
            return call()
        except SandboxError as error:
            if attempt == CALL_ATTEMPTS - 1 or not retry_on(error):
                raise
            _sleep(next(delay) + random.uniform(0, 0.25))
    raise AssertionError("unreachable")


class SandboxError(Exception):
    """Runner failure: stable code + phase only."""

    def __init__(self, code: str, phase: str, status: int = 0):
        super().__init__(f"{phase}: {code}")
        self.code, self.phase, self.status = code, phase, status


class RunnerClient:
    """Private runner API client (bearer token file, protocol header)."""

    def __init__(self, base_url: str, token: str, *, timeout: float = 60.0):
        self.base_url, self.token, self.timeout = base_url.rstrip("/"), token, timeout

    @classmethod
    def from_env(cls, env=None) -> "RunnerClient | None":
        env = os.environ if env is None else env
        url = env.get("AI_BOARD_SANDBOX_URL")
        if not url:
            return None
        return cls(url, Path(env.get("AI_BOARD_SANDBOX_TOKEN_FILE", "/run/secrets/sandbox-runner-token")).read_text().strip())

    def _call(self, method: str, path: str, phase: str, body: bytes | None = None, *, content_type: str = "application/json",
              timeout: float | None = None) -> tuple[bytes, dict]:
        request = urllib.request.Request(self.base_url + path, data=body, method=method, headers={
            "authorization": f"Bearer {self.token}", "x-sandbox-protocol": PROTOCOL, "content-type": content_type})
        try:
            with urllib.request.urlopen(request, timeout=timeout or self.timeout) as response:
                return response.read(), dict(response.headers)
        except urllib.error.HTTPError as error:
            try:
                detail = json.loads(error.read().decode("utf-8"))
            except (ValueError, UnicodeDecodeError):
                detail = {}
            raise SandboxError(str(detail.get("error") or "runner_error"), str(detail.get("phase") or phase), error.code) from None
        except (urllib.error.URLError, TimeoutError, OSError):
            raise SandboxError("runner_unreachable", phase) from None

    def _json(self, method: str, path: str, phase: str, payload: dict | None = None, **kwargs) -> dict:
        raw, _ = self._call(method, path, phase, None if payload is None else json.dumps(payload).encode("utf-8"), **kwargs)
        return json.loads(raw or b"{}")

    def create(self, run_id: str, manifest: list[dict]) -> dict:
        return self._json("POST", "/v1/runs", "provision", {"run_id": run_id, "manifest": manifest}, timeout=CREATE_TIMEOUT_S)

    def upload(self, run_id: str, archive: bytes) -> dict:
        raw, _ = self._call("PUT", f"/v1/runs/{run_id}/workspace", "upload", archive, content_type="application/gzip", timeout=300)
        return json.loads(raw)

    def exec(self, run_id: str, argv: list[str], *, timeout: float) -> dict:
        return self._json("POST", f"/v1/runs/{run_id}/exec", "exec", {"argv": argv}, timeout=timeout)

    def download(self, run_id: str, name: str) -> bytes:
        return self._call("GET", f"/v1/runs/{run_id}/artifacts/{name}", "download", timeout=120)[0]

    def renew(self, run_id: str) -> dict:
        return self._json("POST", f"/v1/runs/{run_id}/renew", "renew")

    def destroy(self, run_id: str) -> dict:
        return self._json("DELETE", f"/v1/runs/{run_id}", "destroy")


def _normalise(file: Path):
    """Stable tar mode/owner/mtime (Docker COPY cache key depends on them). Executable = shebang."""
    with file.open("rb") as handle:
        mode = 0o755 if handle.read(2) == b"#!" else 0o644

    def apply(info: tarfile.TarInfo) -> tarfile.TarInfo:
        info.mode, info.uid, info.gid, info.uname, info.gname, info.mtime = mode, 0, 0, "", "", 0
        return info

    return apply


def package(checkout: Path, state: dict, base_pages: dict[str, bytes]) -> bytes:
    """tar.gz of filtered checkout + state + base pages. Credential env files, .git, caches never leave the worker."""
    buffer = io.BytesIO()
    with tarfile.open(fileobj=buffer, mode="w:gz") as archive:
        def add_bytes(name: str, data: bytes) -> None:
            info = tarfile.TarInfo(name)
            info.size, info.mode = len(data), 0o644
            archive.addfile(info, io.BytesIO(data))

        files = []
        for file in sorted(checkout.rglob("*")):
            parts = file.relative_to(checkout).parts
            if any(part in SKIP_DIRS for part in parts) or any(part == ".env" or part.startswith(".env.") for part in parts):
                continue
            if file.is_symlink():
                raise ValueError(f"checkout contains a symlink: {'/'.join(parts)}")
            if file.is_file():
                files.append((file, parts))
        # explicit directory entries, so extraction time never leaks into directory metadata
        dirs = sorted({"/".join(("checkout", *parts[:i])) for _, parts in files for i in range(len(parts))})
        for name in dirs:
            info = tarfile.TarInfo(name)
            info.type, info.mode, info.mtime = tarfile.DIRTYPE, 0o755, 0
            archive.addfile(info)
        for file, parts in files:
            archive.add(file, arcname="checkout/" + "/".join(parts), recursive=False, filter=_normalise(file))
        guest_state = {key: state[key] for key in GUEST_STATE_KEYS if key in state}
        add_bytes(GUEST_STATE, json.dumps(guest_state, ensure_ascii=False, default=lambda _value: None).encode("utf-8"))
        for page, blob in base_pages.items():
            add_bytes("base/" + page.lstrip("/"), blob)
    return buffer.getvalue()


def _base_pages(state: dict, checkout: Path) -> dict[str, bytes]:
    """Base versions of changed public pages, read worker-side (.git stays here)."""
    import code_index

    base_sha = state.get("base_sha")
    pages: dict[str, bytes] = {}
    for page in verify._public_paths(state.get("diffs") or []):
        if base_sha:
            try:
                pages[page] = code_index.git(checkout, "show", f"{base_sha}:public{page}")
            except OSError:
                continue
    return pages


class _Lease:
    """Renews runner lease while the ticket lease holds; destroys the VM when it does not."""

    def __init__(self, client, run_id: str, lease_ok: Callable[[], bool], *, clock=time.monotonic, sleep=time.sleep):
        self.client, self.run_id, self.lease_ok, self.clock, self.sleep = client, run_id, lease_ok, clock, sleep
        self.stop, self.revoked = threading.Event(), False
        self.thread = threading.Thread(target=self._loop, name="sandbox-lease", daemon=True)

    def _loop(self) -> None:
        last_ok = self.clock()
        while not self.stop.wait(RENEW_EVERY_S):
            if not self.lease_ok():
                self._revoke()
                return
            delay = iter(BACKOFF_S)
            while True:
                try:
                    self.client.renew(self.run_id)
                    last_ok = self.clock()
                    break
                except SandboxError as error:
                    transient = error.status in (0, 429) or error.status >= 500
                    wait = next(delay, BACKOFF_S[-1]) + random.uniform(0, 0.25)
                    if not transient or self.clock() + wait >= last_ok + LEASE_S or self.stop.is_set():
                        if not transient:
                            self.revoked = True
                        return  # runner lease expiry cleans up; never recreate a VM silently
                    self.sleep(wait)

    def _revoke(self) -> None:
        self.revoked = True
        try:
            self.client.destroy(self.run_id)
        except SandboxError:
            pass  # runner marks itself unhealthy when it cannot confirm teardown

    def __enter__(self):
        self.thread.start()
        return self

    def __exit__(self, *_exc) -> None:
        self.stop.set()
        self.thread.join(timeout=5)


def _blocked(reason: str, kind: str = "transient") -> dict:
    return {"gate": 5, "blocked": True, "reason": reason, "evidence": None, "failure_class": kind}


def run(state: dict, deps=None, budget=None, *, client: RunnerClient | None = None, checkout_dir: str | Path | None = None,
        lease_ok: Callable[[], bool] | None = None, exec_timeout: float = 1200.0) -> dict:
    """gates.verify.run contract, executed in a fresh microVM."""
    client = client or RunnerClient.from_env()
    if client is None:
        return _blocked("sandbox runner chưa được cấu hình (AI_BOARD_SANDBOX_URL)")
    checkout = checkout_dir if checkout_dir is not None else state.get("full_checkout")
    if not checkout:
        return _blocked("thiếu full_checkout cho Docker verify")
    checkout = Path(checkout)
    should_stop = state.get("should_stop")
    if lease_ok is None:
        lease_ok = (lambda: not should_stop()) if should_stop else (lambda: True)

    try:
        archive = package(checkout, state, _base_pages(state, checkout))
    except ValueError as error:
        return _blocked(str(error), "ordinary")

    run_id = f"g5-{uuid.uuid4().hex[:24]}"  # one id per Gate 5 invocation; a retry is a new invocation
    try:
        # same run_id: the runner answers a repeated create for a live run with that run's view, so a lost reply is safe
        # to repeat. 429 (busy) = a previous VM is still tearing down. A 5xx burns the id (run 'failed'), so it is not retried.
        created = _retry(lambda: client.create(run_id, MANIFEST), lambda error: error.status in (0, 429))
        lease = _Lease(client, run_id, lease_ok)

        def live() -> None:
            if lease.revoked:
                raise SandboxError("lease_revoked", "lease")

        with lease:
            live()
            client.upload(run_id, archive)
            live()
            client.exec(run_id, ["guest-boot.sh"], timeout=180)
            live()
            outcome = client.exec(run_id, ["sh", "-c", GUEST_ENTRY], timeout=exec_timeout + 30)
            live()
            if outcome.get("code") != 0 or outcome.get("timed_out") or outcome.get("truncated"):
                return _blocked("sandbox gate 5 không hoàn tất (exit/timeout/output)")
            result = json.loads(client.download(run_id, "result"))
            shots_archive = client.download(run_id, "shots")
            live()  # revoked after the guest finished: the verdict is stale
        result = _localise_screenshots(result, shots_archive)
        evidence = result.get("evidence")
        if isinstance(evidence, dict):
            evidence["sandbox"] = {"run_id": run_id, "policy_hash": created.get("policy_hash")}
            state["evidence"] = evidence
        return result
    except SandboxError as error:
        return _blocked(f"sandbox {error.phase}: {error.code}")
    except (ValueError, KeyError, TypeError, AttributeError, OSError, tarfile.TarError):
        return _blocked("sandbox trả kết quả không hợp lệ")
    finally:
        try:
            _retry(lambda: client.destroy(run_id), lambda error: error.status == 0 or error.status >= 500)
        except SandboxError:
            pass  # runner expires the lease and keeps itself unhealthy if teardown stays unconfirmed


MAX_SHOT_BYTES, MAX_SHOTS = 10 * 1024 * 1024, 40


def _localise_screenshots(result: dict, shots_archive: bytes) -> dict:
    """Unpack guest screenshots (untrusted: flat regular files, bounded) to a local temp dir; point evidence at them."""
    if not isinstance(result, dict):
        raise ValueError("guest result is not an object")
    evidence = result.get("evidence")
    if not isinstance(evidence, dict) or not (evidence.get("screenshots") or evidence.get("screenshot")):
        return result
    target = Path(tempfile.mkdtemp(prefix="ai-verify-shots-"))
    try:
        with tarfile.open(fileobj=io.BytesIO(shots_archive), mode="r:gz") as archive:
            members = archive.getmembers()
            if len(members) > MAX_SHOTS:
                raise ValueError("too many screenshots")
            for member in members:
                if not member.isfile() or "/" in member.name or member.name.startswith(".") or member.size > MAX_SHOT_BYTES:
                    raise ValueError("unsafe screenshot archive")
                (target / member.name).write_bytes(archive.extractfile(member).read())
        for shot in evidence.get("screenshots") or []:
            shot["path"] = str(target / Path(shot["path"]).name)
        if evidence.get("screenshot"):
            evidence["screenshot"] = str(target / Path(evidence["screenshot"]).name)
    except BaseException:
        shutil.rmtree(target, ignore_errors=True)
        raise
    return result
