"""requester_profile_context: domain_expertise hint in gate 1; flag off or no profile = unchanged."""
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

import worker_planner  # noqa: E402
from gates import brainstorm  # noqa: E402

FLAG = "AI_BOARD_REQUESTER_PROFILE_CONTEXT"
MSG = "Kế hoạch đang chờ quản trị viên kiểm tra."


def _snapshot(profile=None):
    snap = {"request": {"id": 7, "student": "a", "domain": "pharmacy", "type": "other", "title": "t", "detail": "d",
                        "clarified_spec": None, "votes": 1},
            "thread": [], "plan_repair": None}
    if profile is not None:
        snap["requester_profile"] = profile
    return snap


def test_flag_off_request_unchanged(monkeypatch):
    monkeypatch.setenv(FLAG, "0")
    profile = {"role": "pupil", "tech_level": "none", "domain_expertise": ["pharmacy"]}
    with_profile = worker_planner.HarnessPlanner._request(_snapshot(profile))
    without = worker_planner.HarnessPlanner._request(_snapshot())
    assert with_profile == without
    assert "requester_profile" not in with_profile


def test_flag_on_threads_profile(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    profile = {"role": "parent", "tech_level": "some", "domain_expertise": ["pharmacy"]}
    request = worker_planner.HarnessPlanner._request(_snapshot(profile))
    assert request["requester_profile"] == profile



@pytest.mark.parametrize("profile", [None, {}])
def test_flag_on_missing_or_empty_profile_no_change(monkeypatch, profile):
    monkeypatch.setenv(FLAG, "1")
    snap = _snapshot(profile)
    assert worker_planner.HarnessPlanner._request(snap) == worker_planner.HarnessPlanner._request(_snapshot())
    assert brainstorm.requester_domain_hint(worker_planner.HarnessPlanner._request(snap)) == ""


def test_domain_hint_when_domain_in_expertise(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    request = worker_planner.HarnessPlanner._request(_snapshot({"role": "student", "domain_expertise": ["pharmacy", "it"]}))
    hint = brainstorm.requester_domain_hint(request)
    assert "pharmacy" in hint and "không dùng để chặn" in hint
    assert "\n" not in hint


def test_domain_hint_absent_when_domain_not_in_expertise(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    request = worker_planner.HarnessPlanner._request(_snapshot({"role": "student", "domain_expertise": ["it"]}))
    assert brainstorm.requester_domain_hint(request) == ""


def test_domain_hint_ignores_non_list_expertise():
    assert brainstorm.requester_domain_hint({"domain": "it", "requester_profile": {"domain_expertise": "it"}}) == ""


def test_flag_defaults_on(monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    from settings import Settings
    assert Settings().requester_profile_context is True
