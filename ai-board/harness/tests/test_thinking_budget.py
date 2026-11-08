"""LF/179: one source for thinking on/off + token budget per role; flag off = old behavior."""
import pytest

from providers import thinking
from providers.routing import ModelRouter
from runtime import pipeline, prompt_roles

ROLES = ("gate1", "gate25", "gate3_light", "gate3_heavy", "gate4_review", "classifier",
         "calibration", "eval_judge", "elevation_risk", "repair_planner")
# Shipped catalog, no flags, no overrides: (single prompt, split prompt)
EFFECTIVE = {"gate1": (False, True), "gate25": (False, False), "gate3_light": (False, False),
             "gate3_heavy": (True, False), "gate4_review": (False, True), "classifier": (False, False),
             "calibration": (True, True), "eval_judge": (True, True), "elevation_risk": (False, False),
             "repair_planner": (False, False)}


@pytest.fixture
def router():
    return ModelRouter({})


def test_effective_thinking_per_role_is_locked(router):
    table = {role: (thinking.effective(role, router), thinking.effective(role, router, split=True)) for role in ROLES}
    assert table == EFFECTIVE


def test_table_matches_what_call_params_sends(router):
    for role in ("gate1", "gate4_review", "gate3_light", "gate3_heavy"):
        extra, _ = prompt_roles.call_params(role, router)
        assert extra["thinking"] is thinking.effective(role, router, split=True)


def test_reasoning_off_setting_beats_catalog_but_not_force(router):
    router = ModelRouter({"AI_BOARD_REASONING_OFF": "gate3_heavy"})
    assert thinking.effective("gate3_heavy", router) is False
    _, opts = thinking.apply("gate3_heavy", router, {"force_thinking": True}, {"num_predict": 100})
    assert opts["num_predict"] == 100 + router.reasoning_tokens()


def test_flag_off_keeps_caller_total_and_default_allowance(router):
    extra, opts = thinking.apply("gate3_heavy", router, {"max_total_output_tokens": 4096}, {"num_predict": 100})
    assert extra == {"thinking": True} and opts["num_predict"] == 4096
    extra, opts = thinking.apply("gate3_heavy", router, None, {"num_predict": 3072})
    assert opts["num_predict"] == 3072 + router.reasoning_tokens()
    extra, opts = thinking.apply("gate3_light", router, None, {"num_predict": 3072})
    assert extra == {"thinking": False} and opts == {"num_predict": 3072}


def test_flag_on_answer_cap_plus_separate_budget(router, monkeypatch):
    monkeypatch.setenv("AI_BOARD_THINKING_BUDGET", "1")
    _, opts = thinking.apply("gate3_heavy", router, {"max_total_output_tokens": 3072}, {"num_predict": 100})
    assert opts["num_predict"] == 3072 + router.reasoning_tokens()
    _, opts = thinking.apply("gate4_review", router, {"force_thinking": True}, {"num_predict": 1024})
    assert opts["num_predict"] == 1024 + router.reasoning_tokens()


def test_flag_on_per_role_budget_override(monkeypatch):
    monkeypatch.setenv("AI_BOARD_THINKING_BUDGET", "1")
    catalog = ModelRouter({}).catalog | {"thinking_budget": {"gate4_review": 2048}}
    router = ModelRouter({}, catalog)
    _, opts = thinking.apply("gate4_review", router, {"force_thinking": True}, {"num_predict": 1024})
    assert opts["num_predict"] == 3072


def test_split_reasoning_roles_flag_off_vs_on(router, monkeypatch):
    extra, opts = prompt_roles.call_params("gate4_review", router)
    assert extra["max_total_output_tokens"] == 16384 and opts["num_predict"] == 16384
    monkeypatch.setenv("AI_BOARD_THINKING_BUDGET", "1")
    extra, opts = prompt_roles.call_params("gate4_review", router)
    assert "max_total_output_tokens" not in extra and "num_predict" not in opts and extra["thinking"] is True


def test_length_with_thinking_is_flagged_separately():
    attrs = pipeline._request_attrs({"num_predict": 10}, {"thinking": True}, {"done_reason": "length"}, "gate1")
    assert attrs["thinking_truncated"] is True
    attrs = pipeline._request_attrs({"num_predict": 10}, {"thinking": False}, {"done_reason": "length"}, "gate1")
    assert "thinking_truncated" not in attrs
    attrs = pipeline._request_attrs({"num_predict": 10}, {"thinking": True}, {"done_reason": "stop"}, "gate1")
    assert "thinking_truncated" not in attrs
