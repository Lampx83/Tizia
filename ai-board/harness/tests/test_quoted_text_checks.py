"""Quoted request text becomes text_present/text_absent checks at Gate 5; the text oracle only reports."""
import io
import json
import tarfile

import pytest

from gate5 import verify
from verification import sandbox as sandbox_verify
from gate5 import checks, functional, guest_inputs
from test_gate_5_verify import FakeRunner, checkout as make_checkout, state as make_state

FLAG = "AI_BOARD_QUOTED_CHECKS"
# Shapes run_text really returns: a run that observed the page carries coverage, an infra failure does not.
COVERED = {"coverage": {"rendered_text": True}}
ORACLE_FAIL = {"probe_id": functional.TEXT_PROBE, "passed": False, "reason": "Chữ người dùng yêu cầu không hiển thị", **COVERED}
ORACLE_PASS = {"probe_id": functional.TEXT_PROBE, "passed": True, "reason": None, **COVERED}
ORACLE_INFRA = {"probe_id": functional.TEXT_PROBE, "passed": False, "reason": "browser crashed", "infra": True}


def server_accepts(functional_result, outcome):
    """Mirror of the gate 5 rules in server/ai-board/repositories/store-contract.js for a low-risk run."""
    probe = functional_result.get("probe_id")
    coverage = functional_result.get("coverage") or {}
    covered = functional_result.get("passed") is True and probe in functional.ORACLES and all(
        coverage.get(flag) is True for flag in functional.ORACLES[probe])
    oracle_passed = functional_result.get("oracle_passed") is not False
    review = functional_result.get("needs_review") is True
    no_oracle = (functional_result.get("passed") is True and not oracle_passed and review and not probe
                 and functional_result.get("reason") == functional.NO_ORACLE)
    if not (covered or no_oracle):
        return False
    if outcome == "ready_for_pr":
        return not no_oracle and not review
    return no_oracle or (covered and review and oracle_passed)


def outcome(out):
    return "needs_review" if out["evidence"]["functional"].get("needs_review") else "ready_for_pr"


@pytest.fixture
def flag_on(monkeypatch):
    monkeypatch.setenv(FLAG, "1")


@pytest.fixture
def oracle(monkeypatch):
    """Text oracle answer; tests set it, default a failure so only the checks can let the change through."""
    answer = {"value": ORACLE_FAIL}
    monkeypatch.setattr(verify, "_shot_pages", lambda *_: [])
    monkeypatch.setattr(functional, "run", lambda *_, **__: answer["value"])
    return answer


@pytest.fixture
def served(monkeypatch):
    """Serve body by phase: _restore_base flips the container from candidate to base."""
    bodies = {"base": b"<h1>changed</h1>\n", "candidate": b"<h1>changed</h1>\n", "mode": "candidate"}

    def restore(state, checkout, pages, cp):
        bodies["mode"] = "base"
        return set()
    monkeypatch.setattr(verify, "_restore_base", restore)
    monkeypatch.setattr(verify, "probe_http", lambda url, *, token=None: (200, bodies[bodies["mode"]]))
    return bodies


def run(tmp_path, request, files=("public/x.html",)):
    root = make_checkout(tmp_path)
    (root / "public" / "y.html").write_text("<h1>changed</h1>\n", encoding="utf-8")
    state = make_state(root, visual=True)
    state["diffs"] = [{"file": f, "test_file": "test/generated.test.js", "diff": "+x"} for f in files]
    state["request_detail"] = request
    state["base_sha"] = "abc"
    return verify.run(state, runner=FakeRunner())


def rows(out):
    return [row["check"] for row in out["evidence"]["checks"]["rows"]]


def test_replace_red_on_base_green_on_candidate_is_proof_despite_failing_oracle(tmp_path, flag_on, oracle, served):
    served.update(base=b"<h1>changed</h1>\n<p>Chu cu</p>\n", candidate=b"<h1>changed</h1>\n<p>Chu moi</p>\n")
    out = run(tmp_path, "Đổi 'Chu cu' thành 'Chu moi'")
    assert out["blocked"] is False
    assert rows(out) == [{"primitive": "text_present", "path": "/x.html", "text": "Chu moi"},
                         {"primitive": "text_absent", "path": "/x.html", "text": "Chu cu"}]
    assert out["evidence"]["checks"]["verdict"] == checks.PROOF
    functional_result = out["evidence"]["functional"]
    assert functional_result["report_only"] is True and functional_result["oracle_passed"] is False
    assert outcome(out) == "ready_for_pr" and server_accepts(functional_result, "ready_for_pr")


def test_proof_with_oracle_infra_failure_is_review_the_server_accepts(tmp_path, flag_on, oracle, served):
    oracle["value"] = ORACLE_INFRA
    served.update(base=b"<h1>changed</h1>\n<p>Chu cu</p>\n", candidate=b"<h1>changed</h1>\n<p>Chu moi</p>\n")
    out = run(tmp_path, "Đổi 'Chu cu' thành 'Chu moi'")
    assert out["blocked"] is False and out["evidence"]["checks"]["verdict"] == checks.PROOF
    assert outcome(out) == "needs_review" and server_accepts(out["evidence"]["functional"], "needs_review")


def test_old_text_inside_new_text_is_not_demanded_absent(tmp_path, flag_on, oracle, served):
    served.update(base=b"<h1>changed</h1>\n<p>Chao ban</p>\n", candidate=b"<h1>changed</h1>\n<p>Chao ban nhe</p>\n")
    out = run(tmp_path, "Đổi 'Chao ban' thành 'Chao ban nhe'")
    assert rows(out) == [{"primitive": "text_present", "path": "/x.html", "text": "Chao ban nhe"}]
    assert out["blocked"] is False and out["evidence"]["checks"]["verdict"] == checks.PROOF


def test_red_on_both_blocks_even_when_oracle_passes(tmp_path, flag_on, oracle, served):
    oracle["value"] = ORACLE_PASS
    served.update(base=b"<h1>changed</h1>\n", candidate=b"<h1>changed</h1>\n")
    out = run(tmp_path, "Thêm dòng 'Liên hệ: 0123' vào trang")
    assert out["blocked"] is True and "check đỏ trên cả base lẫn candidate" in out["reason"]
    assert out["failure_class"] == verify.STAGE_CLASS["ordinary"]


@pytest.mark.parametrize("answer", [ORACLE_FAIL, ORACLE_PASS])
def test_text_already_on_base_is_ignored_so_needs_review(tmp_path, flag_on, oracle, served, answer):
    oracle["value"] = answer
    served.update(base=b"<h1>changed</h1>\nLien he\n", candidate=b"<h1>changed</h1>\nLien he\n")
    out = run(tmp_path, "Thêm 'Lien he' vào trang")
    assert out["blocked"] is False and out["evidence"]["checks"]["verdict"] == checks.NONE
    assert outcome(out) == "needs_review" and server_accepts(out["evidence"]["functional"], "needs_review")


def test_removal_wording_makes_text_absent_only(tmp_path, flag_on, oracle, served):
    served.update(base=b"<h1>changed</h1>\nQuang cao\n", candidate=b"<h1>changed</h1>\n")
    out = run(tmp_path, "Xóa chữ 'Quang cao' khỏi trang")
    assert rows(out) == [{"primitive": "text_absent", "path": "/x.html", "text": "Quang cao"}]
    assert out["evidence"]["checks"]["verdict"] == checks.PROOF and out["blocked"] is False


def test_css_selector_quote_never_becomes_a_text_check(tmp_path, flag_on, oracle, served):
    # conftest keeps the oracle's own selector skip off: the check builder must drop the selector itself.
    served.update(base=b"<h1>changed</h1>\n", candidate=b"<h1>changed</h1>\nMua ngay\n")
    out = run(tmp_path, "Thêm chữ 'Mua ngay' vào '.types button'")
    assert rows(out) == [{"primitive": "text_present", "path": "/x.html", "text": "Mua ngay"}]
    assert out["blocked"] is False


@pytest.mark.parametrize("answer", [ORACLE_FAIL, ORACLE_PASS, ORACLE_INFRA])
def test_two_observed_pages_make_no_check_and_need_review_not_pass(tmp_path, flag_on, oracle, served, answer):
    oracle["value"] = answer
    out = run(tmp_path, "Thêm 'Xin chao' vào trang", files=("public/x.html", "public/y.html"))
    assert out["blocked"] is False and "checks" not in out["evidence"]
    assert outcome(out) == "needs_review" and server_accepts(out["evidence"]["functional"], "needs_review")


def test_non_text_oracle_gets_no_quoted_checks(tmp_path, flag_on, monkeypatch, served):
    monkeypatch.setattr(verify, "_shot_pages", lambda *_: [])
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": functional.COPY_PROBE, "passed": True})
    out = run(tmp_path, "Nút copy phản hồi hiện 'Đã chép'")
    assert out["blocked"] is False and "checks" not in out["evidence"]


def test_flag_off_text_oracle_still_blocks_and_probes_once(tmp_path, monkeypatch, oracle):
    monkeypatch.delenv(FLAG, raising=False)
    seen = []
    monkeypatch.setattr(verify, "probe_http", lambda url, *, token=None: seen.append(url) or (200, b"<h1>changed</h1>\n"))
    out = run(tmp_path, "Đổi 'Chu cu' thành 'Chu moi'")
    assert out["blocked"] is True and "không hiển thị" in out["reason"]
    assert "checks" not in out["evidence"] and "report_only" not in out["evidence"]["functional"]
    assert len(seen) == 1


def _shipped(tmp_path):
    tmp_path.mkdir()
    root = make_checkout(tmp_path)
    st = {**make_state(root), "request_title": "t", "request_detail": "d", "full_diff": [], "base_sha": "a" * 40}
    with tarfile.open(fileobj=io.BytesIO(sandbox_verify.package(root, st, {})), mode="r:gz") as tar:
        return json.loads(tar.extractfile("state.json").read())


def test_flag_reaches_the_guest_through_state_not_env(tmp_path, monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    assert "quoted_checks" not in _shipped(tmp_path / "off")
    monkeypatch.setenv(FLAG, "1")
    assert _shipped(tmp_path / "on")["quoted_checks"] is True
    assert "quoted_checks" in guest_inputs.GUEST_INPUTS
