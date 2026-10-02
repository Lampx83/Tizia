"""Gate 5 through the sandbox runner: the runner API is faked at the client boundary."""
import io
import json
import tarfile
import time
from pathlib import Path

import pytest

import sandbox_verify
from gates import gate5_guest
from gates import verify as gate_verify
from sandbox_verify import SandboxError


class FakeClient:
    def __init__(self, *, result=None, shots=None, fail=None, exec_outcome=None):
        self.calls, self.fail = [], fail
        self.result = result if result is not None else {"gate": 5, "blocked": False, "reason": None, "failure_class": None,
                                                            "evidence": {"runner": "docker", "screenshots": [], "screenshot": None}}
        self.shots = shots if shots is not None else _tgz({})
        self.exec_outcome = exec_outcome or {"code": 0, "stdout": "", "stderr": "", "timed_out": False, "truncated": False}
        self.archive = None

    def _step(self, name, *args):
        self.calls.append(name)
        if self.fail == name:
            raise SandboxError("injected", name, 502)

    def create(self, run_id, manifest):
        self._step("create")
        self.run_id, self.manifest = run_id, manifest
        return {"run_id": run_id, "state": "ready", "policy_hash": "h" * 64}

    def upload(self, run_id, archive):
        self._step("upload")
        self.archive = archive

    def exec(self, run_id, argv, *, timeout):
        self._step("exec")
        self.calls.append(argv[0])
        return self.exec_outcome

    def download(self, run_id, name):
        self._step("download")
        return json.dumps(self.result).encode() if name == "result" else self.shots

    def renew(self, run_id):
        self.calls.append("renew")

    def destroy(self, run_id):
        self.calls.append("destroy")
        if self.fail == "destroy":
            raise SandboxError("cleanup_unconfirmed", "destroy", 502)


def _tgz(files: dict[str, bytes]) -> bytes:
    buffer = io.BytesIO()
    with tarfile.open(fileobj=buffer, mode="w:gz") as archive:
        for name, data in files.items():
            info = tarfile.TarInfo(name)
            info.size = len(data)
            archive.addfile(info, io.BytesIO(data))
    return buffer.getvalue()


def checkout(tmp_path):
    for rel, text in {"Dockerfile": "FROM scratch\n", "docker-compose.yml": "services: {}\n", "public/x.html": "<h1>x</h1>\n",
                      ".env": "SECRET=1\n", ".env.production": "SECRET=2\n", "app/.env": "SECRET=3\n",
                      "node_modules/m/index.js": "x", ".git/config": "[core]\n", "server/index.js": "// s\n"}.items():
        path = tmp_path / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")
    return tmp_path


def state(path):
    return {"skill_id": "skill-1", "full_checkout": str(path), "diffs": [{"file": "public/x.html", "diff": "+x"}]}


def names(archive: bytes) -> set[str]:
    with tarfile.open(fileobj=io.BytesIO(archive), mode="r:gz") as tar:
        return {m.name for m in tar.getmembers()}


def test_package_never_ships_credentials_git_or_caches(tmp_path):
    files = names(sandbox_verify.package(checkout(tmp_path), state(tmp_path), {"/x.html": b"base"}))
    assert files == {"checkout", "checkout/public", "checkout/server", "checkout/Dockerfile", "checkout/docker-compose.yml",
                     "checkout/public/x.html", "checkout/server/index.js", "state.json", "base/x.html"}


def test_package_uses_stable_modes_and_owners_so_docker_cache_keys_match(tmp_path):
    root = checkout(tmp_path)
    (root / "run.sh").write_text("#!/bin/sh\necho hi\n", encoding="utf-8")
    (root / "Dockerfile").chmod(0o777)
    with tarfile.open(fileobj=io.BytesIO(sandbox_verify.package(root, state(root), {})), mode="r:gz") as tar:
        info = {m.name: (m.mode, m.uid, m.gid, m.mtime) for m in tar.getmembers()}
    assert info["checkout/Dockerfile"] == (0o644, 0, 0, 0)
    assert info["checkout/run.sh"] == (0o755, 0, 0, 0)
    assert info["checkout"] == (0o755, 0, 0, 0)


def test_package_refuses_a_symlink_in_the_checkout(tmp_path):
    root = checkout(tmp_path)
    try:
        (root / "link").symlink_to(root / "Dockerfile")
    except OSError:
        pytest.skip("symlinks need privileges on this host")
    with pytest.raises(ValueError, match="symlink"):
        sandbox_verify.package(root, state(root), {})


def test_state_json_carries_no_callable_and_matches_what_the_gate_reads(tmp_path):
    root = checkout(tmp_path)
    st = {**state(root), "should_stop": lambda: False}
    with tarfile.open(fileobj=io.BytesIO(sandbox_verify.package(root, st, {})), mode="r:gz") as tar:
        data = json.loads(tar.extractfile("state.json").read())
    assert data["skill_id"] == "skill-1" and "should_stop" not in data


def test_pass_runs_boot_then_gate_in_a_fresh_vm_and_always_destroys(tmp_path):
    client = FakeClient()
    st = state(checkout(tmp_path))
    result = sandbox_verify.run(st, client=client)
    assert result["blocked"] is False and result["evidence"]["runner"] == "docker"
    assert client.calls == ["create", "upload", "exec", "guest-boot.sh", "exec", "sh", "download", "download", "destroy"]
    assert client.run_id.startswith("g5-") and client.manifest[0]["name"] == "result"
    assert result["evidence"]["sandbox"] == {"run_id": client.run_id, "policy_hash": "h" * 64}
    assert st["evidence"] is result["evidence"]


def test_each_invocation_gets_a_new_run_id(tmp_path):
    root = checkout(tmp_path)
    ids = []
    for _ in range(2):
        client = FakeClient()
        sandbox_verify.run(state(root), client=client)
        ids.append(client.run_id)
    assert ids[0] != ids[1]


@pytest.mark.parametrize("phase", ["create", "upload", "exec", "download"])
def test_runner_failures_are_sanitized_transient_blocks_with_cleanup(tmp_path, phase):
    client = FakeClient(fail=phase)
    result = sandbox_verify.run(state(checkout(tmp_path)), client=client)
    assert result["blocked"] is True and result["failure_class"] == "transient"
    assert result["reason"] == f"sandbox {phase}: injected"
    assert client.calls[-1] == "destroy"


def test_unreachable_runner_never_falls_back_to_host_docker(tmp_path, monkeypatch):
    monkeypatch.setattr(sandbox_verify.verify.subprocess, "run", lambda *a, **k: pytest.fail("host docker used"))
    result = sandbox_verify.run(state(checkout(tmp_path)), client=FakeClient(fail="create"))
    assert result["blocked"] and result["failure_class"] == "transient"


def test_guest_crash_or_timeout_is_transient_not_a_candidate_verdict(tmp_path):
    for outcome in ({"code": 1}, {"code": None, "timed_out": True}, {"code": 0, "truncated": True}):
        result = sandbox_verify.run(state(checkout(tmp_path)), client=FakeClient(exec_outcome=outcome))
        assert result["blocked"] and result["failure_class"] == "transient"


def test_missing_runner_config_blocks_transient(tmp_path, monkeypatch):
    monkeypatch.delenv("AI_BOARD_SANDBOX_URL", raising=False)
    assert sandbox_verify.run(state(checkout(tmp_path)))["failure_class"] == "transient"


def test_guest_blocked_result_passes_through_with_its_failure_class(tmp_path):
    guest = {"gate": 5, "blocked": True, "reason": "smoke failed", "evidence": {"runner": "docker", "screenshots": []},
             "failure_class": "ordinary"}
    result = sandbox_verify.run(state(checkout(tmp_path)), client=FakeClient(result=guest))
    assert (result["blocked"], result["reason"], result["failure_class"]) == (True, "smoke failed", "ordinary")


def test_screenshots_are_unpacked_locally_and_evidence_paths_point_at_them(tmp_path):
    guest = {"gate": 5, "blocked": False, "reason": None, "failure_class": None, "evidence": {
        "runner": "docker", "screenshot": "after-0-1280.png",
        "screenshots": [{"phase": "after", "page": "/x.html", "width": 1280, "path": "after-0-1280.png"}]}}
    client = FakeClient(result=guest, shots=_tgz({"after-0-1280.png": b"PNG"}))
    result = sandbox_verify.run(state(checkout(tmp_path)), client=client)
    shot = Path(result["evidence"]["screenshots"][0]["path"])
    assert shot.read_bytes() == b"PNG" and shot.is_absolute()
    assert result["evidence"]["screenshot"] == str(shot)


def test_screenshot_archive_with_a_path_is_rejected(tmp_path):
    guest = {"gate": 5, "blocked": False, "evidence": {"screenshot": "a.png", "screenshots": [{"path": "a.png"}]}}
    client = FakeClient(result=guest, shots=_tgz({"../evil.png": b"x"}))
    assert sandbox_verify.run(state(checkout(tmp_path)), client=client)["failure_class"] == "transient"


def test_a_revoked_lease_suppresses_the_verdict(tmp_path, monkeypatch):
    class Slow(FakeClient):
        def exec(self, run_id, argv, *, timeout):
            out = super().exec(run_id, argv, timeout=timeout)
            if argv[0] == "sh":
                time.sleep(0.3)  # the lease thread revokes while the guest is still running
            return out

    monkeypatch.setattr(sandbox_verify, "RENEW_EVERY_S", 0.01)
    client = Slow()
    result = sandbox_verify.run(state(checkout(tmp_path)), client=client, lease_ok=lambda: False)
    assert result["blocked"] and result["failure_class"] == "transient" and "lease_revoked" in result["reason"]
    assert "download" not in client.calls and client.calls[-1] == "destroy"


@pytest.mark.parametrize("guest, shots", [
    ({"gate": 5, "evidence": {"screenshots": ["not-a-dict"]}}, _tgz({"a.png": b"x"})),
    ({"gate": 5, "evidence": {"screenshots": [{"path": "a.png"}]}}, _tgz({"a.png": b"x" * (sandbox_verify.MAX_SHOT_BYTES + 1)})),
    ({"gate": 5, "evidence": {"screenshots": [{"path": "a.png"}]}}, _tgz({f"s{i}.png": b"x" for i in range(sandbox_verify.MAX_SHOTS + 1)})),
    (["not", "an", "object"], _tgz({}))], ids=["shot-not-a-dict", "oversize-shot", "too-many-shots", "result-not-an-object"])
def test_malformed_or_oversize_guest_output_is_a_sanitized_block(tmp_path, guest, shots):
    result = sandbox_verify.run(state(checkout(tmp_path)), client=FakeClient(result=guest, shots=shots))
    assert result["blocked"] and result["failure_class"] == "transient" and result["reason"] == "sandbox trả kết quả không hợp lệ"


def test_create_waits_long_enough_for_a_cold_image_import(monkeypatch):
    client = sandbox_verify.RunnerClient("http://runner", "token")
    seen = {}
    monkeypatch.setattr(client, "_call", lambda method, path, phase, body=None, **kw: (seen.update(kw) or (b"{}", {})))
    client.create("g5-x", [])
    assert seen["timeout"] >= 300  # the first boot after a cache wipe imports a multi-GB image; giving up mid-boot orphans the VM


def test_lease_loss_stops_renewal_and_destroys_the_vm():
    renewed, destroyed = [], []

    class Client:
        def renew(self, _id): renewed.append(1)
        def destroy(self, _id): destroyed.append(1)

    lease = sandbox_verify._Lease(Client(), "g5-x", lambda: False)
    sandbox_verify.RENEW_EVERY_S, original = 0.01, sandbox_verify.RENEW_EVERY_S
    try:
        with lease:
            lease.thread.join(timeout=2)
    finally:
        sandbox_verify.RENEW_EVERY_S = original
    assert lease.revoked and destroyed == [1] and renewed == []


def test_transient_renew_errors_back_off_but_a_terminal_one_stops():
    calls = []

    class Client:
        def renew(self, _id):
            calls.append(1)
            raise SandboxError("runner_unreachable" if len(calls) < 3 else "run_closed", "renew", 0 if len(calls) < 3 else 409)

        def destroy(self, _id): pass

    sleeps = []
    original = sandbox_verify.RENEW_EVERY_S
    sandbox_verify.RENEW_EVERY_S = 0.01
    try:
        lease = sandbox_verify._Lease(Client(), "g5-x", lambda: True, sleep=sleeps.append)
        with lease:
            lease.thread.join(timeout=2)
    finally:
        sandbox_verify.RENEW_EVERY_S = original
    assert len(calls) == 3 and lease.revoked
    assert [round(s) for s in sleeps] == [1, 2]


def test_guest_entry_makes_screenshot_paths_relative_and_writes_the_bundle(tmp_path, monkeypatch):
    shot = tmp_path / "tmp-shot.png"
    shot.write_bytes(b"PNG")
    seen = {}

    def fake_run(st, checkout_dir=None, **_):
        seen["base"] = st.get("base_pages_dir")
        return {"gate": 5, "blocked": False, "evidence": {"screenshot": str(shot), "screenshots": [{"path": str(shot)}]}}

    monkeypatch.setattr(gate_verify, "run", fake_run)
    work = tmp_path / "ws"
    (work / "base").mkdir(parents=True)
    (work / "state.json").write_text(json.dumps({"skill_id": "s"}), encoding="utf-8")
    out = tmp_path / "out"
    result = gate5_guest.run_in_guest(work / "state.json", work / "checkout", out)
    assert result["evidence"]["screenshots"][0]["path"] == "tmp-shot.png"
    assert json.loads((out / "result.json").read_text())["evidence"]["screenshot"] == "tmp-shot.png"
    assert names((out / "shots.tgz").read_bytes()) == {"tmp-shot.png"}
    assert seen["base"] == str(work / "base")


class Flaky(FakeClient):
    """create/destroy fail `times` times with the given status before they work."""

    def __init__(self, *, create_status=None, destroy_status=None, times=2, **kwargs):
        super().__init__(**kwargs)
        self.create_status, self.destroy_status, self.left = create_status, destroy_status, {"create": times, "destroy": times}

    def create(self, run_id, manifest):
        if self.create_status is not None and self.left["create"] > 0:
            self.left["create"] -= 1
            self.calls.append("create")
            raise SandboxError("runner_unreachable" if self.create_status == 0 else "busy", "provision", self.create_status)
        return super().create(run_id, manifest)

    def destroy(self, run_id):
        self.calls.append("destroy")
        if self.destroy_status is not None and self.left["destroy"] > 0:
            self.left["destroy"] -= 1
            raise SandboxError("cleanup_unconfirmed", "destroy", self.destroy_status)


@pytest.fixture(autouse=True)
def sleeps(monkeypatch):  # no real backoff in any test
    waited = []
    monkeypatch.setattr(sandbox_verify, "_sleep", waited.append)
    return waited


@pytest.mark.parametrize("status", [0, 429])
def test_create_retries_a_transient_runner_error_with_the_same_run_id(tmp_path, sleeps, status):
    client = Flaky(create_status=status, times=2)
    result = sandbox_verify.run(state(checkout(tmp_path)), client=client)
    assert result["blocked"] is False
    assert client.calls.count("create") == 3 and len(sleeps) == 2 and sleeps[0] < sleeps[1]


def test_create_gives_up_after_three_attempts_and_never_retries_a_terminal_error(tmp_path, sleeps):
    busy = Flaky(create_status=429, times=99)
    result = sandbox_verify.run(state(checkout(tmp_path)), client=busy)
    assert result["blocked"] and result["failure_class"] == "transient" and busy.calls.count("create") == 3
    sleeps.clear()
    assert sandbox_verify.run(state(checkout(tmp_path)), client=FakeClient(fail="create"))["blocked"]  # 502 create_failed: id burned
    assert sleeps == []


def test_destroy_is_retried_until_the_runner_confirms_teardown(tmp_path, sleeps):
    client = Flaky(destroy_status=502, times=2)
    assert sandbox_verify.run(state(checkout(tmp_path)), client=client)["blocked"] is False
    assert client.calls.count("destroy") == 3
    stuck = Flaky(destroy_status=502, times=99)
    assert sandbox_verify.run(state(checkout(tmp_path)), client=stuck)["blocked"] is False  # the verdict stands; the lease expiry cleans up
    assert stuck.calls.count("destroy") == 3


def test_state_json_ships_only_the_keys_the_guest_gate_reads(tmp_path):
    root = checkout(tmp_path)
    st = {**state(root), "request_title": "t", "request_detail": "d", "full_diff": [{"diff": "+x"}], "base_sha": "a" * 40,
          "plan": {"goal": "private planning"}, "memory": "x", "github_token": "never", "evidence": {"x": 1}}
    with tarfile.open(fileobj=io.BytesIO(sandbox_verify.package(root, st, {})), mode="r:gz") as tar:
        data = json.loads(tar.extractfile("state.json").read())
    assert set(data) == {"skill_id", "diffs", "request_title", "request_detail", "full_diff", "base_sha"}


def test_every_state_key_the_guest_gate_reads_is_uploaded():
    """A new state.get('x') in the gate must be added to GUEST_STATE_KEYS, or the sandbox would silently see None."""
    import re
    root = Path(__file__).resolve().parents[1]
    read = set()
    for rel in ("gates/verify.py", "functional.py", "gates/visual.py"):
        read |= set(re.findall(r"""state(?:\.get\(|\[)["']([a-z_]+)["']""", (root / rel).read_text(encoding="utf-8")))
    written_or_guest_side = {"evidence", "base_pages_dir", "full_checkout"}  # gate output / set by gate5_guest / replaced by checkout_dir
    assert read - written_or_guest_side <= set(sandbox_verify.GUEST_STATE_KEYS), read
