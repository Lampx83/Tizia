"""Failed trace calls become draft eval cases: infra excluded, logic kept, reruns and duplicates dropped."""
import json

import pytest

from evaluation import failed_cases as fc


def _call(call_id, **over):
    rec = {"call_id": call_id, "gate": 3, "child": None, "attempt": 0, "iteration": 0, "provider": "vllm", "model": "m",
           "prompt_name": "implement.md", "prompt_hash": "h1", "prompt_len": 10, "output_len": 5,
           "metrics": {"done_reason": "stop"}, "budget_units": 1, "result": "ok", "error": None, "at": 1,
           "notes": [], "edits": None, "evaluation": [], "prompt_var": "ask A", "output": "reply A"}
    rec.update(over)
    return rec


def _write(path, rows):
    path.write_text("\n".join(json.dumps(r, ensure_ascii=False) for r in rows) + "\n", encoding="utf-8")
    return path


def test_ok_call_is_not_a_case(tmp_path):
    trace = _write(tmp_path / "t.jsonl", [_call("run1:g3:cNone:a0:i0:s1")])
    assert fc.build_cases(fc.read_calls([trace])) == []


def test_logic_failure_becomes_pending_case_with_source(tmp_path):
    rec = _call("run1:g3:cNone:a0:i0:s1", result="retry", error="search did not match", notes=[
        {"kind": "knows", "name": "skill", "summary": "skill campus-layout · repo abc1234 · 900 chars", "data": None}])
    cases = fc.build_cases(fc.read_calls([_write(tmp_path / "t.jsonl", [rec])]))
    (case,) = cases
    assert case["status"] == "pending_review" and case["reason"] == "result_not_ok"
    assert case["source"] == {"call_id": "run1:g3:cNone:a0:i0:s1", "run_id": "1", "gate": 3, "prompt_name": "implement.md",
                              "prompt_hash": "h1", "skill": "campus-layout"}
    assert case["prompt"] == "ask A" and case["output"] == "reply A" and case["split"] in ("tune", "confirm")


def test_partial_update_merges_into_call(tmp_path):
    base = _call("run1:g3:cNone:a0:i0:s1")
    update = {"call_id": "run1:g3:cNone:a0:i0:s1", "result": "retry", "error": "bad edit"}
    cases = fc.build_cases(fc.read_calls([_write(tmp_path / "t.jsonl", [base, update])]))
    assert [c["reason"] for c in cases] == ["result_not_ok"]


def test_infra_error_is_not_a_case(tmp_path):
    rec = _call("run1:g3:cNone:a0:i0:s1", result="retry", error="read timed out after 120s")
    assert fc.build_cases(fc.read_calls([_write(tmp_path / "t.jsonl", [rec])])) == []


def test_abnormal_stop_is_a_case_even_when_ok(tmp_path):
    rec = _call("run1:g3:cNone:a0:i0:s1", metrics={"done_reason": "length"})
    (case,) = fc.build_cases(fc.read_calls([_write(tmp_path / "t.jsonl", [rec])]))
    assert case["reason"] == "stop_abnormal"


def test_admin_rejection_by_call_or_run_id_is_a_case(tmp_path):
    rec = _call("run9:g5:cNone:a0:i0:s1")
    calls = fc.read_calls([_write(tmp_path / "t.jsonl", [rec])])
    (by_run,) = fc.build_cases(calls, rejected={"9"})
    assert by_run["reason"] == "admin_rejected"
    (by_call,) = fc.build_cases(calls, rejected={"run9:g5:cNone:a0:i0:s1"})
    assert by_call["reason"] == "admin_rejected"


def test_duplicate_content_collapses_to_one_case(tmp_path):
    a = _call("run1:g3:cNone:a0:i0:s1", result="retry")
    b = _call("run2:g3:cNone:a0:i0:s1", result="retry")
    assert len(fc.build_cases(fc.read_calls([_write(tmp_path / "t.jsonl", [a, b])]))) == 1


def test_rerun_appends_nothing_new(tmp_path):
    rec = _call("run1:g3:cNone:a0:i0:s1", result="retry")
    cases = fc.build_cases(fc.read_calls([_write(tmp_path / "t.jsonl", [rec])]))
    out = tmp_path / "cases.jsonl"
    assert fc.append_new(cases, out) == 1
    assert fc.append_new(cases, out) == 0
    assert len(out.read_text(encoding="utf-8").splitlines()) == 1


def test_split_is_deterministic_and_only_tune_or_confirm():
    ids = [f"case-{i}" for i in range(60)]
    splits = [fc.split_for(i) for i in ids]
    assert set(splits) == {"tune", "confirm"} and splits == [fc.split_for(i) for i in ids]


def test_heldout_or_sealed_output_refused(tmp_path):
    with pytest.raises(ValueError):
        fc.append_new([], tmp_path / "heldout" / "cases.jsonl")
    with pytest.raises(ValueError):
        fc.append_new([], tmp_path / "sealed-cases.jsonl")


def test_cli_writes_drafts_from_trace(tmp_path):
    trace = _write(tmp_path / "t.jsonl", [_call("run1:g3:cNone:a0:i0:s1", result="retry"),
                                          _call("run1:g3:cNone:a0:i0:s2", result="retry", error="connection refused")])
    out = tmp_path / "cases.jsonl"
    assert fc.main(["--trace", str(trace), "--out", str(out)]) == 0
    rows = [json.loads(line) for line in out.read_text(encoding="utf-8").splitlines()]
    assert len(rows) == 1 and rows[0]["status"] == "pending_review"
