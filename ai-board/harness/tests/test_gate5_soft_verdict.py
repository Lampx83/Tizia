"""Gate 5 kiểm mềm: trượt ghi soft_misses (giá trị, ngưỡng), một lượt sửa, sau đó cho qua; kiểm cứng vẫn chặn."""
import subprocess

import pytest

from gates import verify, visual
from tests.test_gate_5_verify import FakeRunner, checkout, served, state  # noqa: F401 (served: autouse fake app)


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_SOFT_QUALITY_CHECKS", "1")


class FailingAcceptance(FakeRunner):
    def __call__(self, args, **kwargs):
        if "exec" in args and "sh" in args:
            self.calls.append((args, kwargs))
            return subprocess.CompletedProcess(args, 1, "", "acceptance failed")
        return super().__call__(args, **kwargs)


def test_contrast_miss_carries_the_measured_ratio_and_threshold():
    after = {"contrast": ['button.type "Bậc nhất" 3.68', 'button.type "Lượng giác" 3.71']}
    misses = visual.regression_misses({"contrast": []}, after)
    assert misses == [{"check": "contrast", "value": 3.68, "threshold": 4.5,
                       "detail": 'button.type "Bậc nhất" 3.68; button.type "Lượng giác" 3.71'}]


def test_count_checks_report_how_many_new_problems():
    misses = visual.regression_misses({}, {"overflow": True, "covered": ["a dưới b", "c dưới d"]})
    assert {(m["check"], m["value"], m["threshold"]) for m in misses} == {("overflow", 1, 0), ("covered", 2, 0)}


def test_visual_misses_name_page_and_width():
    shots = [{"phase": "before", "page": "/g.html", "width": 375, "audit": {"contrast": []}},
             {"phase": "after", "page": "/g.html", "width": 375, "audit": {"contrast": ['b "x" 3.68']}}]
    (miss,) = verify.visual_misses(shots)
    assert (miss["gate"], miss["check"], miss["page"], miss["width"], miss["value"]) == (5, "contrast", "/g.html", 375, 3.68)


def test_flag_off_failing_acceptance_still_blocks(tmp_path):
    out = verify.run({**state(checkout(tmp_path)), "acceptance": ["npm test"]}, runner=FailingAcceptance())
    assert out["blocked"] is True and not out.get("soft_only")


def test_failing_acceptance_is_a_soft_miss_and_the_rest_still_runs(tmp_path, on):
    out = verify.run({**state(checkout(tmp_path)), "acceptance": ["npm test"]}, runner=FailingAcceptance())
    assert out["blocked"] is True and out["soft_only"] is True and out["failure_class"] == "ordinary"
    (miss,) = out["evidence"]["soft_misses"]
    assert (miss["gate"], miss["check"], miss["value"], miss["threshold"]) == (5, "acceptance", 1, 0)
    assert "npm test" in miss["detail"] and out["evidence"]["smoke_passed"] is True


def test_missing_requested_text_is_a_soft_miss(tmp_path, on):
    s = {**state(checkout(tmp_path)), "request_title": "Thêm dòng chữ 'Chào mừng các bạn'"}
    failed = {"probe_id": "text-visible-v1", "passed": False, "reason": "Chữ người dùng yêu cầu không hiển thị trên trang: 'Chào mừng các bạn'"}
    out = verify.run(s, runner=FakeRunner(), functional_probe=lambda base, _: failed)
    assert out["soft_only"] is True
    assert [m["check"] for m in out["evidence"]["soft_misses"]] == ["text_oracle"]
    assert out["evidence"]["functional"]["oracle_passed"] is False


def test_a_hard_failure_beside_a_soft_miss_is_not_soft_only(tmp_path, on):
    out = verify.run({**state(checkout(tmp_path)), "acceptance": ["npm test"]},
                     runner=FailingAcceptance(container_env="NODE_ENV=production\nPORT=8041\nAPI_KEY=leak\n"))
    assert out["blocked"] is True and not out.get("soft_only")
