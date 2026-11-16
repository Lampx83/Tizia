"""Registry primitive check (LF/215): dữ liệu có version và hash; worker lệch bị chặn trước khi chạy check."""
import pytest

from gates import verify
from repositories import server_hsm
from test_gate_5_verify import FakeRunner, checkout as make_checkout, state as make_state
from verification import check_registry, checks
from verification import functional

BODY = b"// x\nChu moi\n"
CHECK = {"primitive": "text_present", "path": "/x.html", "text": "Chu moi"}


class Backend:
    def __init__(self, reason=None):
        self.reason = reason
        self.calls = []

    def register_check_registry(self, registry):
        self.calls.append(("register", registry["version"]))
        return {"status": "pending"}

    def authorize_action(self, action, **extra):
        self.calls.append((action, extra))
        if self.reason:
            raise server_hsm.AuthorityError(self.reason)
        return True


@pytest.fixture
def gate_env(monkeypatch):
    monkeypatch.setattr(verify, "probe_http", lambda url, *, token=None: (200, BODY))
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": functional.QUEUE_PROBE, "passed": True})


def run_with(tmp_path, backend=None, *, runner=None):
    state = make_state(make_checkout(tmp_path))
    state["plan"] = {"subtasks": [{"file": "public/x.js", "checks": [CHECK]}]}
    if backend is None:
        return verify.run(state, runner=runner or FakeRunner())
    with server_hsm.server_scope(backend):
        return verify.run(state, runner=runner or FakeRunner())


def test_registry_declares_exactly_the_primitives_the_validator_implements():
    assert set(check_registry.REGISTRY.primitives) == set(checks.PRIMITIVES)
    for name, params in check_registry.REGISTRY.primitives.items():
        assert set(params) == set(checks.PRIMITIVES[name]), name


def test_registry_hash_is_pinned_to_the_file_bytes_and_moves_with_content():
    data = check_registry.REGISTRY.data
    assert check_registry.canonical_hash(data) == check_registry.REGISTRY.hash
    changed = {**data, "primitives": {**data["primitives"], "text_present": ["path", "text", "extra"]}}
    assert check_registry.canonical_hash(changed) != check_registry.REGISTRY.hash


def test_registry_parse_rejects_bad_shape():
    with pytest.raises(ValueError):
        check_registry.parse({"version": "1", "primitives": {"text_present": ["path"]}})
    with pytest.raises(ValueError):
        check_registry.parse({"version": 1, "primitives": {}})
    with pytest.raises(ValueError):
        check_registry.parse({"version": 1, "primitives": {"text_present": "path"}})


def test_gate5_registers_then_authorizes_the_local_registry_hash(tmp_path, monkeypatch, gate_env):
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    backend = Backend()
    out = run_with(tmp_path, backend)
    assert backend.calls[0] == ("register", check_registry.REGISTRY.data["version"])
    assert backend.calls[1] == ("run_check", {"check_registry": check_registry.REGISTRY.hash})
    assert out["blocked"] is False and out["evidence"]["check_registry"] == check_registry.REGISTRY.hash


@pytest.mark.parametrize("reason", ["check_registry_not_approved", "check_registry_unknown"])
def test_unapproved_or_unknown_registry_blocks_before_any_container_runs(tmp_path, monkeypatch, gate_env, reason):
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    runner = FakeRunner()
    out = run_with(tmp_path, Backend(reason), runner=runner)
    assert out["blocked"] is True and out["reason"] == reason
    assert out["failure_class"] == "transient"  # admin duyệt rồi chạy lại
    assert runner.calls == []


def test_flag_off_does_not_touch_the_registry(tmp_path, monkeypatch, gate_env):
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS", raising=False)
    backend = Backend("check_registry_not_approved")
    out = run_with(tmp_path, backend)
    assert backend.calls == [] and out["blocked"] is False and "check_registry" not in out["evidence"]
