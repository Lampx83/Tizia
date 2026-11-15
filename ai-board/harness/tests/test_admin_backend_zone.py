"""LF/252 AI_BOARD_ADMIN_BACKEND_ZONE: admin writes server/contexts and public (minus refused list); refused list blocks
every role; students keep _ai-generated only. Flag off = unchanged."""
import pytest

import path_policy
from gates import brainstorm
from runtime import levels

ZONE = "AI_BOARD_ADMIN_BACKEND_ZONE"
REFUSED = ["server/index.js", "server/db.js", "server/db/pool.js", "server/contexts/identity/index.js",
           "server/contexts/security/guard.js", "server/contexts/payment/index.js", "server/contexts/billing/x.js",
           "server/contexts/economy/x.js", "server/ai-board/guard-lexicon.json", "ai-board/harness/gates/x.py",
           "Dockerfile", "docker-compose.yml", "docker-compose.tls.yml", ".env", ".env.production", ".github/workflows/ci.yml"]
CONTEXT = "server/contexts/content/lessons.js"
GENERATED = "server/contexts/_ai-generated/panel/index.js"


@pytest.fixture
def zone(monkeypatch):
    monkeypatch.setenv(ZONE, "1")


def _plan(file):
    return {"subtasks": [{"title": "t", "file": file, "verify": "node --test", "size": "small", "layer": "backend"}]}


def test_flag_defaults_off():
    from settings import Settings
    assert Settings().admin_backend_zone is False


def test_flag_off_admin_keeps_generated_only(monkeypatch):
    monkeypatch.delenv(ZONE, raising=False)
    assert path_policy.may_edit(CONTEXT, "admin") is False
    assert path_policy.may_edit(GENERATED, "admin") is True
    assert path_policy.refused("server/index.js") is False


def test_admin_zone_allows_context_and_public(zone):
    assert path_policy.may_edit(CONTEXT, "admin") is True
    assert path_policy.may_edit("public/js/widget.js", "admin") is True
    assert path_policy.may_edit("package.json", "admin") is True
    assert path_policy.may_edit("package-lock.json", "admin") is True


def test_student_keeps_generated_only_with_flag_on(zone):
    assert path_policy.may_edit(CONTEXT, "student") is False
    assert path_policy.may_edit("public/js/widget.js", "student") is False
    assert path_policy.may_edit("package.json", "student") is False
    assert path_policy.may_edit(GENERATED, "student") is True


def test_refused_list_is_refused_for_both_roles(zone):
    for path in REFUSED:
        assert path_policy.refused(path), path
        for role in ("admin", "student"):
            assert path_policy.may_edit(path, role) is False, (path, role)
            decision = levels.write_check(path, (), None, role)
            assert decision["allow"] is False and decision["level"] == levels.SELF, (path, role)


def test_write_check_admin_zone_is_surface_student_is_protected(zone):
    assert levels.write_check(CONTEXT, (), None, "admin")["level"] == levels.SURFACE
    assert levels.write_check(CONTEXT, (), None, "admin")["allow"] is True
    assert levels.write_check(CONTEXT, (), None, "student")["allow"] is False


def test_requirements_skip_admin_zone_but_not_students(zone):
    plan = _plan(CONTEXT)
    assert levels.requirements(plan, None, frozenset(), role="admin") == []
    needs = levels.requirements(plan, None, frozenset(), role="student")
    assert [item["level"] for item in needs] == [levels.PROTECTED]


def test_requirements_refused_path_is_self_for_admin(zone):
    needs = levels.requirements(_plan("server/index.js"), None, frozenset(), role="admin")
    assert [item["level"] for item in needs] == [levels.SELF]


def test_infer_layer_follows_role(zone):
    assert brainstorm.infer_layer(CONTEXT, "admin") == "backend"
    assert brainstorm.infer_layer(CONTEXT) == "wiring"
    assert brainstorm.infer_layer("public/js/widget.js", "admin") == "frontend"
    assert brainstorm.infer_layer("package.json", "admin") == "wiring"


def test_check_files_admin_passes_context_and_student_is_refused(zone):
    brainstorm.check_files(_plan(CONTEXT), None, None, None, role="admin")
    with pytest.raises(levels.ElevationRequired):
        brainstorm.check_files(_plan(CONTEXT), None, None, None, role="student")


def test_check_files_admin_still_refuses_the_banned_list(zone):
    with pytest.raises(ValueError, match="nằm ngoài vùng"):
        brainstorm.check_files(_plan("server/index.js"), None, None, None, role="admin")


def test_manifest_changes_names_package_files(zone):
    plan = {"subtasks": [{"file": "public/a.js"}, {"file": "package-lock.json"}, {"file": "./package.json"}]}
    assert brainstorm.manifest_changes(plan) == ["package-lock.json", "package.json"]


def _verdict_with(plan, functional=None):
    import test_exec_graph  # noqa: F401 puts ai-board/ on sys.path
    import worker
    execution = worker._Execution(plan, ticket_id=1, checkout_source=".", deps=None, budget=None, run_gate=None, cleanup=None,
                                  catalog=None, request_detail=None, memory_path=None, should_stop=None, candidate_opts=None,
                                  request_type=None, eval_tasks=None, preview_capture=None, checkpoint=None, plan_hash=None)
    execution.gates = [{"gate": 5, "blocked": False, "smoke_passed": True, "http_observed": True, "runner": "docker",
                        "functional": functional or {"passed": True, "oracle_passed": True}},
                       {"gate": 5.5, "blocked": False, "reason": None, "risk_level": "low"}]
    execution.kind = None
    execution.verdict()
    return execution.result


def test_passing_run_that_changes_a_manifest_stops_at_needs_review(zone):
    plan = {"subtasks": [{"file": "public/a.js"}, {"file": "package.json"}]}
    result = _verdict_with(plan)
    assert result["outcome"] == "needs_review" and "package.json" in result["reason"]
    assert _verdict_with({"subtasks": [{"file": "public/a.js"}]})["outcome"] == "ready_for_pr"
