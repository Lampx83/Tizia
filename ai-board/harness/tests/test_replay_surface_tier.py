import pytest

import path_policy
from evaluation import replay_surface_tier as rs

CTX = ["billing", "campus", "identity", "ai-board-intake", "admin"]


def _run(monkeypatch):
    monkeypatch.setattr(rs, "context_dirs", lambda: CTX)
    return rs.run(None, CTX)


def test_off_identical_to_pre_lf189_baseline(monkeypatch):
    result = _run(monkeypatch)
    assert result["off_identical_to_baseline"] is True


def test_hard_invariants_hold_with_every_context_listed(monkeypatch):
    result = _run(monkeypatch)
    assert set(result["violations_by_rule"]) <= {"opened by test naming only basename"}
    for ctx in ("billing", "identity", "ai-board-intake", "admin"):
        assert all(c["opened"] == 0 for c in result["per_context"][ctx].values())


def test_forbidden_list_shrunk_is_caught(monkeypatch):
    monkeypatch.setattr(path_policy, "FORBIDDEN_CONTEXTS", frozenset())
    result = _run(monkeypatch)
    assert result["verdict"] == rs.FAIL
    assert any(v["rule"] == "forbidden/deny path opened" for v in result["invariant_violations"])


def test_no_test_stays_protected_and_valid_test_opens_campus(monkeypatch):
    cell = _run(monkeypatch)["per_context"]["campus"]
    assert cell["test_absent"]["on"] != "surface" and cell["test_present"]["opened"] >= 1
    assert cell["cross_import"]["opened"] == 0


def test_verdict_vocabulary(monkeypatch):
    monkeypatch.setattr(rs, "baseline_outputs", lambda s: None)
    assert _run(monkeypatch)["verdict"] == rs.NOT_MEASURABLE
    monkeypatch.undo()
    monkeypatch.setattr(rs, "check_invariants", lambda *a: [])
    assert _run(monkeypatch)["verdict"] == rs.PASS
