"""Gate 5 in a fresh Microsandbox microVM via the runner API. Runner failure = sanitized transient block, never host fallback."""
from __future__ import annotations

import io
import json
import os
import random
import re
import contextvars
import fnmatch
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
from runtime import limits

PROTOCOL = "1"
_CLIENT = limits.sandbox_client()
# First boot after a cache wipe imports a multi-GB guest image.
CREATE_TIMEOUT_S = float(_CLIENT["create_timeout_s"])
SKIP_DIRS = {".git", "node_modules", "__pycache__", ".venv", ".pytest_cache", ".cache", ".scratch"}
GUEST_STATE = "state.json"
# What gates.verify.run / functional read from `state` inside the guest; nothing else of the worker's state is uploaded.
GUEST_STATE_KEYS = ("skill_id", "diffs", "full_diff", "request_title", "request_detail", "base_sha", "acceptance")
GUEST_OUT = "out"
MANIFEST = [{"name": "result", "path": f"{GUEST_OUT}/result.json"}, {"name": "shots", "path": f"{GUEST_OUT}/shots.tgz"}]
GUEST_ENTRY = ("mkdir -p /workspace/out && chmod 777 /workspace/out && cd /opt/ai-board/ai-board/harness && "
               'exec runuser -u gate -- env "PATH=$PATH" "PLAYWRIGHT_BROWSERS_PATH=$PLAYWRIGHT_BROWSERS_PATH" HOME=/home/gate '
               "python -m gates.gate5_guest /workspace/state.json /workspace/checkout /workspace/out")
PEAK_FILE = f"/workspace/{GUEST_OUT}/peak.json"
# RUSAGE_CHILDREN = largest waited-for descendant of this wrapper, i.e. the guest gate tree; the runner returns exit codes only.
PEAK_PROBE = ("import json,resource,subprocess,sys;rc=subprocess.call(sys.argv[2:]);"
              "json.dump({'peak_kib': resource.getrusage(resource.RUSAGE_CHILDREN).ru_maxrss, 'rc': rc}, open(sys.argv[1], 'w'));"
              "sys.exit(rc)")
RENEW_EVERY_S = float(_CLIENT["renew_every_s"])
BACKOFF_S = _CLIENT["backoff_s"]
LEASE_S = float(_CLIENT["lease_s"])
CALL_ATTEMPTS = _CLIENT["call_attempts"]
UPLOAD_TIMEOUT_S = float(_CLIENT["upload_timeout_s"])
ARTIFACT_TIMEOUT_S = float(_CLIENT["artifact_timeout_s"])
_sleep = time.sleep


def _remaining(deadline: float | None, cap: float) -> float:
    if deadline is None:
        return cap
    remaining = deadline - time.monotonic()
    if remaining <= 0:
        raise SandboxError("wall_clock_s", "budget")
    return min(cap, remaining)


def _retry(call: Callable[[], dict], retry_on: Callable[[SandboxError], bool], *, deadline=None) -> dict:
    """Run call, repeating up to CALL_ATTEMPTS times (exponential backoff + jitter) while retry_on says the error is transient."""
    delay = iter(BACKOFF_S)
    for attempt in range(CALL_ATTEMPTS):
        _remaining(deadline, 1)
        try:
            return call()
        except SandboxError as error:
            if attempt == CALL_ATTEMPTS - 1 or not retry_on(error):
                raise
            wait = next(delay) + random.uniform(0, 0.25)
            remaining = _remaining(deadline, wait)
            _sleep(remaining)
            if deadline is not None and remaining < wait:
                raise SandboxError("wall_clock_s", "budget")
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
              timeout: float | None = None, deadline: float | None = None) -> tuple[bytes, dict]:
        request = urllib.request.Request(self.base_url + path, data=body, method=method, headers={
            "authorization": f"Bearer {self.token}", "x-sandbox-protocol": PROTOCOL, "content-type": content_type})
        try:
            with urllib.request.urlopen(request, timeout=_remaining(deadline, timeout or self.timeout)) as response:
                if deadline is None:
                    return response.read(), dict(response.headers)
                chunks = []
                while True:
                    remaining = _remaining(deadline, timeout or self.timeout)
                    # urllib's HTTPResponse buffer owns the socket; shorten every read,
                    # including a body stall after slow headers. DNS remains cooperative.
                    sock = getattr(getattr(response.fp, "raw", None), "_sock", None)
                    if sock is not None:
                        sock.settimeout(remaining)
                    chunk = response.read1(65536)
                    if not chunk:
                        return b"".join(chunks), dict(response.headers)
                    chunks.append(chunk)
        except urllib.error.HTTPError as error:
            try:
                # Parent cleanup needs only failure status; never drain a trickling error body.
                detail = {} if deadline is not None and phase == 'destroy' else json.loads(error.read().decode("utf-8"))
            except (ValueError, UnicodeDecodeError):
                detail = {}
            finally:
                error.close()
            raise SandboxError(str(detail.get("error") or "runner_error"), str(detail.get("phase") or phase), error.code) from None
        except (urllib.error.URLError, TimeoutError, OSError):
            raise SandboxError("runner_unreachable", phase) from None

    def _json(self, method: str, path: str, phase: str, payload: dict | None = None, **kwargs) -> dict:
        raw, _ = self._call(method, path, phase, None if payload is None else json.dumps(payload).encode("utf-8"), **kwargs)
        return json.loads(raw or b"{}")

    def create(self, run_id: str, manifest: list[dict], **kwargs) -> dict:
        journal = os.getenv('AI_BOARD_OWNED_RUN_FILE')
        if journal:
            if not re.fullmatch(r'(?:loop|g5)-[a-f0-9]{24}', run_id):
                raise ValueError('invalid owned sandbox id')
            # Persist intent before HTTP: a killed worker cannot report a lost create reply.
            with open(journal, 'a', encoding='ascii') as handle:
                handle.write(run_id + '\n')
                handle.flush()
                os.fsync(handle.fileno())
        return self._json("POST", "/v1/runs", "provision", {"run_id": run_id, "manifest": manifest}, timeout=CREATE_TIMEOUT_S, **kwargs)

    def upload(self, run_id: str, archive: bytes, **kwargs) -> dict:
        raw, _ = self._call("PUT", f"/v1/runs/{run_id}/workspace", "upload", archive, content_type="application/gzip", timeout=UPLOAD_TIMEOUT_S, **kwargs)
        return json.loads(raw)

    def exec(self, run_id: str, argv: list[str], *, timeout: float, deadline=None) -> dict:
        payload = {"argv": argv}
        if deadline is not None:
            payload["timeout_s"] = _remaining(deadline, min(timeout, 1200))
        return self._json("POST", f"/v1/runs/{run_id}/exec", "exec", payload, timeout=timeout, deadline=deadline)

    def download(self, run_id: str, name: str, **kwargs) -> bytes:
        return self._call("GET", f"/v1/runs/{run_id}/artifacts/{name}", "download", timeout=ARTIFACT_TIMEOUT_S, **kwargs)[0]

    def renew(self, run_id: str, **kwargs) -> dict:
        return self._json("POST", f"/v1/runs/{run_id}/renew", "renew", **kwargs)

    def destroy(self, run_id: str, *, deadline=None) -> dict:
        return self._json("DELETE", f"/v1/runs/{run_id}", "destroy", deadline=deadline)


def _normalise(file: Path):
    """Stable tar mode/owner/mtime (Docker COPY cache key depends on them). Executable = shebang."""
    with file.open("rb") as handle:
        mode = 0o755 if handle.read(2) == b"#!" else 0o644

    def apply(info: tarfile.TarInfo) -> tarfile.TarInfo:
        info.mode, info.uid, info.gid, info.uname, info.gname, info.mtime = mode, 0, 0, "", "", 0
        return info

    return apply


def _lf_patterns(checkout: Path) -> list[str]:
    """`eol=lf` globs from the checkout's .gitattributes."""
    try:
        lines = (checkout / ".gitattributes").read_text(encoding="utf-8").splitlines()
    except OSError:
        return []
    return [parts[0] for parts in (line.split() for line in lines if not line.lstrip().startswith("#")) if len(parts) > 1 and "eol=lf" in parts[1:]]


def package(checkout: Path, state: dict, base_pages: dict[str, bytes]) -> bytes:
    """tar.gz of filtered checkout + state + base pages. Credential env files, .git, caches never leave the worker."""
    buffer = io.BytesIO()
    with tarfile.open(fileobj=buffer, mode="w:gz") as archive:
        def add_bytes(name: str, data: bytes) -> None:
            info = tarfile.TarInfo(name)
            info.size, info.mode = len(data), 0o644
            archive.addfile(info, io.BytesIO(data))

        lf = _lf_patterns(checkout)
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
            name = "/".join(parts)
            if any(fnmatch.fnmatch(name, pattern) for pattern in lf):
                # CRLF working tree (Windows autocrlf) must reach the guest as git's LF: the Dockerfile's check-skills rejects CRLF
                data = file.read_bytes().replace(b"\r\n", b"\n")
                info = _normalise(file)(tarfile.TarInfo("checkout/" + name))
                info.size = len(data)
                archive.addfile(info, io.BytesIO(data))
            else:
                archive.add(file, arcname="checkout/" + name, recursive=False, filter=_normalise(file))
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

    def __init__(self, client, run_id: str, lease_ok: Callable[[], bool], *, clock=time.monotonic, sleep=time.sleep, deadline=None, ready=True):
        self.client, self.run_id, self.lease_ok, self.clock, self.sleep = client, run_id, lease_ok, clock, sleep
        self.deadline, self.ready = deadline, ready
        self.stop, self.revoked = threading.Event(), False
        # copied context: the HSM authority held in a ContextVar must reach the renewal thread
        self.thread = threading.Thread(target=contextvars.copy_context().run, args=(self._loop,), name="sandbox-lease", daemon=True)

    def _loop(self) -> None:
        last_ok = self.clock()
        while not self.stop.wait(min(RENEW_EVERY_S, max(0, self.deadline - self.clock())) if self.deadline is not None else RENEW_EVERY_S):
            if (self.deadline is not None and self.clock() >= self.deadline) or not self.lease_ok():
                self._revoke()
                return
            if not self.ready:
                continue  # provisioning is not renewable, but still deadline-bound
            delay = iter(BACKOFF_S)
            while True:
                if self.deadline is not None and self.clock() >= self.deadline:
                    self._revoke()
                    return
                try:
                    self.client.renew(self.run_id, **({} if self.deadline is None else {"deadline": self.deadline}))
                    last_ok = self.clock()
                    break
                except SandboxError as error:
                    transient = error.status in (0, 429) or error.status >= 500
                    wait = next(delay, BACKOFF_S[-1]) + random.uniform(0, 0.25)
                    if not transient or self.clock() + wait >= last_ok + LEASE_S or self.stop.is_set():
                        if not transient:
                            self.revoked = True
                        return  # runner lease expiry cleans up; never recreate a VM silently
                    self.sleep(min(wait, max(0, self.deadline - self.clock())) if self.deadline is not None else wait)

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


class SandboxSession:
    """One microVM for one call: create + upload on enter, lease renew, destroy on exit. Retries belong to the caller."""

    def __init__(self, checkout: str | Path, *, client: RunnerClient | None = None, lease_ok: Callable[[], bool] | None = None,
                 deadline: float | None = None):
        self.client = client or RunnerClient.from_env()
        if self.client is None:
            raise SandboxError("not_configured", "config")
        self.checkout, self.deadline = Path(checkout), deadline
        self.run_id = f"loop-{uuid.uuid4().hex[:24]}"
        self.lease_ok = lease_ok or (lambda: True)
        self.lease, self.cleanup_pending = None, False

    def __enter__(self) -> "SandboxSession":
        self.lease = _Lease(self.client, self.run_id, self.lease_ok, deadline=self.deadline, ready=False)
        self.lease.__enter__()
        try:
            self.client.create(self.run_id, MANIFEST, **self._limits())
            self.lease.ready = True
            self.client.upload(self.run_id, package(self.checkout, {}, {}), **self._limits())
        except BaseException:
            self._close()
            raise
        return self

    def __exit__(self, exc_type, exc, tb) -> bool:
        self._close()
        if exc is None and self.cleanup_pending:
            raise SandboxError("cleanup_unconfirmed", "destroy")
        return False

    def exec(self, argv: list[str], timeout: float) -> dict:
        if self.lease.revoked or not self.lease_ok():
            raise SandboxError("lease_lost", "lease")
        outcome = self.client.exec(self.run_id, argv, timeout=_remaining(self.deadline, timeout), deadline=self.deadline)
        if self.lease.revoked or not self.lease_ok():
            raise SandboxError("lease_lost", "lease")
        return {"rc": outcome.get("code"), "stdout": outcome.get("stdout", ""), "stderr": outcome.get("stderr", ""),
                "truncated": bool(outcome.get("truncated") or outcome.get("timed_out"))}

    def _limits(self) -> dict:
        return {} if self.deadline is None else {"deadline": self.deadline}

    def _close(self) -> None:
        self.lease.__exit__(None, None, None)
        try:
            # no deadline: teardown must still run after the budget is spent
            destroyed = _retry(lambda: self.client.destroy(self.run_id), lambda error: error.status == 0 or error.status >= 500)
            self.cleanup_pending = not (isinstance(destroyed, dict) and destroyed.get("state") in {"destroyed", "expired", "failed"})
        except SandboxError:
            self.cleanup_pending = True


def _peak_kib(client: RunnerClient, run_id: str, limits_kw: dict) -> int | None:
    """Guest peak RSS from PEAK_PROBE; None when unreadable (evidence only, never the verdict)."""
    try:
        timeout = _remaining(limits_kw.get("deadline"), 30)
        return int(json.loads(client.exec(run_id, ["cat", PEAK_FILE], timeout=timeout, **limits_kw).get("stdout") or "{}")["peak_kib"])
    except (SandboxError, ValueError, KeyError, TypeError):
        return None


def _record_run_cost(result: dict, started: float, peak_kib: int | None) -> None:
    """Wall seconds (create to teardown), guest peak RSS, outcome into evidence.sandbox."""
    result["evidence"].setdefault("sandbox", {}).update(
        wall_s=round(time.monotonic() - started, 1), peak_kib=peak_kib,
        outcome="blocked" if result.get("blocked") else "passed")


def _blocked(reason: str, kind: str = "transient") -> dict:
    return {"gate": 5, "blocked": True, "reason": reason, "evidence": None, "failure_class": kind}


def run(state: dict, deps=None, budget=None, *, client: RunnerClient | None = None, checkout_dir: str | Path | None = None,
        lease_ok: Callable[[], bool] | None = None, exec_timeout: float = 1200.0) -> dict:
    """gates.verify.run contract, executed in a fresh microVM."""
    started = time.monotonic()
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

    deadline = None if budget is None else time.monotonic() + max(0, budget.max_wall_clock_s - budget.elapsed_s)
    request_limits = {} if deadline is None else {"deadline": deadline}
    try:
        _remaining(deadline, 1)
        archive = package(checkout, state, _base_pages(state, checkout))
        _remaining(deadline, 1)
    except SandboxError as error:
        return _blocked(f"sandbox {error.phase}: {error.code}")
    except ValueError as error:
        return _blocked(str(error), "ordinary")

    run_id = f"g5-{uuid.uuid4().hex[:24]}"  # one id per Gate 5 invocation; a retry is a new invocation
    result = None
    peak_kib = None
    created_run = busy = False
    try:
        # same run_id: the runner answers a repeated create for a live run with that run's view, so a lost reply is safe
        # to repeat. 429 (busy) = a previous VM is still tearing down. A 5xx burns the id (run 'failed'), so it is not retried.
        lease = _Lease(client, run_id, lease_ok, deadline=deadline, ready=False)

        def live() -> None:
            _remaining(deadline, 1)
            if lease.revoked:
                raise SandboxError("lease_revoked", "lease")

        with lease:
            live()
            created = _retry(lambda: client.create(run_id, MANIFEST, **request_limits), lambda error: error.status in (0, 429), deadline=deadline)
            created_run = True
            lease.ready = True
            live()
            client.upload(run_id, archive, **request_limits)
            live()
            client.exec(run_id, ["guest-boot.sh"], timeout=_remaining(deadline, 180), **request_limits)
            live()
            outcome = client.exec(run_id, ["python", "-c", PEAK_PROBE, PEAK_FILE, "sh", "-c", GUEST_ENTRY],
                                  timeout=_remaining(deadline, exec_timeout + 30), **request_limits)
            live()
            if outcome.get("code") != 0 or outcome.get("timed_out") or outcome.get("truncated"):
                return _blocked("sandbox gate 5 không hoàn tất (exit/timeout/output)")
            peak_kib = _peak_kib(client, run_id, request_limits)
            result = json.loads(client.download(run_id, "result", **request_limits))
            live()
            shots_archive = client.download(run_id, "shots", **request_limits)
            live()  # revoked after the guest finished: the verdict is stale
        result = _localise_screenshots(result, shots_archive)
        live()
        evidence = result.get("evidence")
        if isinstance(evidence, dict):
            evidence["sandbox"] = {"run_id": run_id, "policy_hash": created.get("policy_hash")}
            state["evidence"] = evidence
        return result
    except SandboxError as error:
        if deadline is not None and time.monotonic() >= deadline:
            return _blocked("sandbox budget: wall_clock_s")
        if error.status == 429 and not created_run:
            busy = True
            return _blocked("sandbox runner busy", "busy")
        return _blocked(f"sandbox {error.phase}: {error.code}")
    except (ValueError, KeyError, TypeError, AttributeError, OSError, tarfile.TarError):
        return _blocked("sandbox trả kết quả không hợp lệ")
    finally:
        try:
            # busy: no VM was created; a failing destroy would replace the busy verdict with cleanup_unconfirmed
            destroyed = {"state": "destroyed"} if busy else _retry(lambda: client.destroy(run_id), lambda error: error.status == 0 or error.status >= 500)
            if isinstance(destroyed, dict) and destroyed.get("state") not in {"destroyed", "expired", "failed"}:
                raise SandboxError("cleanup_unconfirmed", "destroy")
            if isinstance(result, dict) and isinstance(result.get("evidence"), dict):
                result["evidence"].setdefault("sandbox", {})["teardown_confirmed"] = True
                _record_run_cost(result, started, peak_kib)
        except SandboxError:
            blocked = _blocked("sandbox destroy: cleanup_unconfirmed")
            if isinstance(result, dict) and isinstance(result.get("evidence"), dict):
                blocked["evidence"] = result["evidence"]
                blocked["evidence"].setdefault("sandbox", {})["teardown_confirmed"] = False
                _record_run_cost(result, started, peak_kib)
                blocked["evidence"]["sandbox"]["outcome"] = "blocked"
                state["evidence"] = blocked["evidence"]
            return blocked


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
