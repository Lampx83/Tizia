"""Legacy probe runs beside the new checks at Gate 5, report-only; replay report compares the two."""
import io
import json
import tarfile

import pytest

from evaluation import replay_probe_shadow as replay
from gates import verify
from verification import functional, guest_inputs, sandbox as sandbox_verify
from test_gate_5_verify import FakeRunner, checkout as make_checkout, state as make_state

FLAG = "AI_BOARD_LEGACY_PROBE_SHADOW"
QUOTED = "AI_BOARD_QUOTED_CHECKS"
COVERED = {"coverage": {"rendered_text": True}}
STYLE_FAIL = {"probe_id": functional.TEXT_PROBE, "passed": False, "reason": "chu sai", **COVERED}
STYLE_PASS = {"probe_id": functional.TEXT_PROBE, "passed": True, "reason": None, **COVERED}


@pytest.fixture
def world(monkeypatch):
    box = {"oracle": STYLE_FAIL, "body": b"<h1>changed</h1>\n", "mode": "candidate"}

    def restore(state, checkout, pages, cp):
        box["mode"] = "base"
        return set()
    monkeypatch.setattr(verify, "_shot_pages", lambda *_: [])
    monkeypatch.setattr(verify, "_restore_base", restore)
    monkeypatch.setattr(verify, "probe_http", lambda url, *, token=None: (200, box["body"] if box["mode"] == "candidate" else b"<h1>old</h1>\n"))
    monkeypatch.setattr(functional, "run", lambda *_, **__: box["oracle"])
    monkeypatch.setattr(functional, "select", lambda state: functional.TEXT_PROBE)
    monkeypatch.setenv(QUOTED, "1")
    return box


def run(tmp_path):
    root = make_checkout(tmp_path)
    state = make_state(root, visual=True)
    state["diffs"] = [{"file": "public/x.html", "test_file": "test/generated.test.js", "diff": "+x"}]
    state["request_detail"] = "Đổi 'old' thành 'changed'"
    state["base_sha"] = "abc"
    return verify.run(state, runner=FakeRunner())


def test_flag_off_legacy_failure_still_blocks(tmp_path, world, monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    monkeypatch.delenv(QUOTED)
    out = run(tmp_path)
    assert out["blocked"] is True and "probe_shadow" not in out["evidence"]


def test_flag_on_failing_legacy_never_blocks_and_both_verdicts_recorded(tmp_path, world, monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    out = run(tmp_path)
    shadow = out["evidence"]["probe_shadow"]
    assert out["blocked"] is False
    assert shadow["legacy"]["passed"] is False and shadow["legacy"]["probe_id"] == functional.TEXT_PROBE
    assert shadow["new"] == {"verdict": "proving", "passed": True}
    assert out["evidence"]["functional"]["report_only"] is True


def test_flag_on_passing_legacy_does_not_rescue_red_new_check(tmp_path, world, monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    world["oracle"], world["body"] = STYLE_PASS, b"<h1>old</h1>\n"
    out = run(tmp_path)
    assert out["blocked"] is True


def test_flag_on_without_new_checks_records_none_and_needs_review(tmp_path, world, monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.delenv(QUOTED)
    out = run(tmp_path)
    assert out["blocked"] is False and out["evidence"]["functional"]["needs_review"] is True
    assert out["evidence"]["probe_shadow"]["new"] == {"verdict": None, "passed": None}


def test_flag_reaches_the_guest_through_state_not_env(tmp_path, monkeypatch):
    def shipped(path):
        path.mkdir()
        root = make_checkout(path)
        st = {**make_state(root), "request_title": "t", "request_detail": "d", "full_diff": [], "base_sha": "a" * 40}
        with tarfile.open(fileobj=io.BytesIO(sandbox_verify.package(root, st, {})), mode="r:gz") as tar:
            return json.loads(tar.extractfile("state.json").read())
    monkeypatch.delenv(FLAG, raising=False)
    assert "legacy_probe_shadow" not in shipped(tmp_path / "off")
    monkeypatch.setenv(FLAG, "1")
    assert shipped(tmp_path / "on")["legacy_probe_shadow"] is True
    assert "legacy_probe_shadow" in guest_inputs.GUEST_INPUTS


def _rec(case, legacy, new):
    return {"case": case, "evidence": {"probe_shadow": {"legacy": {"probe_id": "p", "passed": legacy, "reason": "r"},
                                                         "new": {"verdict": "x", "passed": new}}}}


def test_replay_report_counts_and_lists_disagreements():
    records = [_rec("a", True, True), _rec("b", False, False), _rec("c", True, False), _rec("d", False, True),
               {"case": "e", "evidence": {}}]
    table = replay.rows(records)
    assert [r["agree"] for r in table] == [True, True, False, False]
    assert replay.summary(table) == {"both_pass": 1, "both_fail": 1, "legacy_only_pass": 1, "new_only_pass": 1}
    text = replay.report(records)
    assert "c: legacy=pass new=fail" in text and "d: legacy=fail new=pass" in text and len(table) == 4


def test_replay_loads_bare_evidence_and_jsonl(tmp_path):
    path = tmp_path / "r.jsonl"
    path.write_text(json.dumps(_rec("a", True, True)["evidence"]) + "\n", encoding="utf-8")
    assert replay.rows(replay.load(path))[0]["agree"] is True
