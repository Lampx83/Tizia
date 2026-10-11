import json
import sys

import pytest

from evaluation.suite.interleaved import prepare, execute


def test_four_arms_keep_failures_and_resume_without_reexecuting(tmp_path):
    pins = {key: "fixture" for key in ("source", "model", "corpus", "catalog", "prompt", "harness", "budget")}
    manifest = prepare(tmp_path, [{"id": "task-a", "mode": "e2e", "repeat": 1}], pins, seed=17,
                       warm_cold="cold each arm", load_notes="fake executor; no GPU")
    assert set(row["arm"] for row in manifest["schedule"]) == {"control", "B01", "B02", "B01+B02"}
    fake = [sys.executable, "-c", "import json,sys; r=json.load(sys.stdin); print(json.dumps({'model_calls':2,'tokens_in':10,'tokens_out':3})); sys.exit(2 if r['arm']=='B02' else 0)"]
    execute(tmp_path, fake, timeout_s=10)
    before = (tmp_path / "attempts.jsonl").read_bytes()
    execute(tmp_path, fake, timeout_s=10)
    assert (tmp_path / "attempts.jsonl").read_bytes() == before


    events = [json.loads(line) for line in before.splitlines()]
    assert len(events) == 8
    assert sum(event.get("status") == "failure" for event in events) == 1
    assert all(event["result"]["model_calls"] == 2 for event in events if event["event"] == "result")
    assert prepare(tmp_path, [{"id": "task-a", "mode": "e2e", "repeat": 1}], pins, seed=17,
                   warm_cold="cold each arm", load_notes="fake executor; no GPU") == manifest
    with pytest.raises(ValueError, match="changed"):
        prepare(tmp_path, [{"id": "task-a", "mode": "e2e", "repeat": 1}], pins, seed=18,
                warm_cold="cold each arm", load_notes="fake executor; no GPU")


def test_adapter_cancel_retains_partial_block_and_original_cost(tmp_path):
    pins = {key: "fixture" for key in ("source", "model", "corpus", "catalog", "prompt", "harness", "budget")}
    prepare(tmp_path, [{"id": "task-a", "mode": "e2e", "repeat": 1}], pins, seed=1,
            warm_cold="unknown", load_notes="")
    cancel = [sys.executable, "-c", "import json,sys; json.load(sys.stdin); print(json.dumps({'model_calls':1})); sys.exit(130)"]
    events = execute(tmp_path, cancel, timeout_s=10)
    assert len(events) == 2
    assert events[1]["status"] == "cancel"
    assert events[1]["result"]["model_calls"] == 1


@pytest.mark.parametrize("output", ["", "not-json"])
def test_cancel_without_result_stops_remaining_arms(tmp_path, output):
    pins = {key: "fixture" for key in ("source", "model", "corpus", "catalog", "prompt", "harness", "budget")}
    prepare(tmp_path, [{"id": "task-a", "mode": "e2e", "repeat": 1}], pins, seed=1,
            warm_cold="unknown", load_notes="")
    cancel = [sys.executable, "-c", f"import sys; sys.stdout.write({output!r}); sys.exit(130)"]
    events = execute(tmp_path, cancel, timeout_s=10)
    assert len(events) == 2
    assert events[1]["status"] == "cancel"
    assert events[1]["result"] is None
    assert events[1]["cost_status"] == "unknown"


def test_timeout_stays_in_ledger_and_crash_intent_cannot_reset_budget(tmp_path):
    pins = {key: "fixture" for key in ("source", "model", "corpus", "catalog", "prompt", "harness", "budget")}
    prepare(tmp_path, [{"id": "task-a", "mode": "e2e", "repeat": 1}], pins, seed=1,
            warm_cold="unknown", load_notes="")
    slow = [sys.executable, "-c", "import time; time.sleep(5)"]
    events = execute(tmp_path, slow, timeout_s=.05)
    assert sum(event.get("status") == "timeout" for event in events) == 4
    assert all(event.get("cost_status") == "unknown; adapter did not finish" for event in events if event["event"] == "result")
    with (tmp_path / "attempts.jsonl").open("a", encoding="utf-8") as out:
        out.write(json.dumps({"event": "intent", "attempt_id": "interrupted-original"}) + "\n")
    before = (tmp_path / "attempts.jsonl").read_bytes()
    with pytest.raises(ValueError, match="budget is not reset"):
        execute(tmp_path, slow, timeout_s=.05)
    assert (tmp_path / "attempts.jsonl").read_bytes() == before
