"""Metering + trace: đo ollama/api, units theo nhà cung cấp, Deps.call_model tính phí và ghi trace."""
import dataclasses
import json

import meter
from budget import Budget
from conftest import FakeModels, deps_with, plan_with

OLLAMA_BODY = {"response": "{}", "total_duration": 21_000_000_000, "load_duration": 150_000_000,
               "prompt_eval_duration": 900_000_000, "eval_duration": 8_900_000_000,
               "prompt_eval_count": 3900, "eval_count": 640, "done_reason": "stop"}


def test_ollama_metrics_charge_gpu_seconds_and_keep_tokens_as_baseline():
    m = meter.measure("ollama", OLLAMA_BODY, wall_ms=22_500)
    assert m["gpu_ms"] == 9950 and m["load_ms"] == 150 and m["eval_ms"] == 8900
    assert m["queue_ms"] == 1500 and m["tokens_in"] == 3900 and m["tokens_out"] == 640
    assert m["tok_s"] == 71.9 and m["done_reason"] == "stop"
    assert meter.units("ollama", m) == 10


def test_api_metrics_charge_per_thousand_tokens():
    m = meter.measure("api", {"usage": {"input_tokens": 1500, "output_tokens": 700}, "stop_reason": "end_turn"}, 3000)
    assert m["gpu_ms"] is None and m["done_reason"] == "end_turn"
    assert meter.units("api", m) == 3


def test_missing_durations_fall_back_to_wall_time():
    assert meter.units("ollama", meter.measure("ollama", {}, 2400)) == 3


def test_call_model_spends_units_and_records_a_redacted_capped_trace(tmp_path):
    tracer = meter.Tracer(tmp_path / "traces.jsonl")
    sent = []
    tracer.begin(7, sent.extend)
    models = FakeModels(plan_with(["features"]))
    deps = dataclasses.replace(deps_with(models), trace=tracer)
    budget = Budget()
    secret = 'api_key = "abcdefghijk123"'
    body = deps.call_model("m", "x" * 9000 + secret, gate=1, budget=budget, prompt_name=None)
    assert budget.units == 1 and body["_metrics"]["tokens_in"] == 120
    assert models.calls[0]["num_predict"] == 1024 and models.calls[0]["temperature"] == 0
    tracer.flush()
    (rec,) = sent
    assert rec["call_id"] == "run7:g1:cNone:a0:i0:s1" and rec["result"] == "ok"
    assert len(rec["prompt_var"]) == meter.TRACE_CAP and rec["truncated"] == {"prompt": True, "output": False}
    local = json.loads((tmp_path / "traces.jsonl").read_text(encoding="utf-8").splitlines()[0])
    assert "abcdefghijk123" not in local["prompt_var"] and "[đã che]" in local["prompt_var"]


def test_gate3_gets_a_bigger_output_cap():
    models = FakeModels(plan_with(["features"]))
    deps_with(models).call_model("m", "p", gate=3, budget=Budget())
    assert models.calls[0]["num_predict"] == 3072


def test_failed_call_is_charged_by_wall_time_traced_and_reraised(tmp_path):
    class Down(FakeModels):
        def generate(self, *a, **k):
            raise TimeoutError("gateway 504")

    tracer = meter.Tracer(None)
    sent = []
    tracer.begin(1, sent.extend)
    base = deps_with(Down(plan_with(["features"])))
    deps = dataclasses.replace(base, trace=tracer)
    budget = Budget()
    try:
        deps.call_model("m", "p", gate=3, budget=budget)
    except TimeoutError:
        pass
    else:
        raise AssertionError("lỗi gọi model phải raise lại")
    tracer.flush()
    assert budget.units == 1 and budget.model_calls == 1 and sent[0]["result"] == "timeout"


def test_trace_batches_per_gate_and_marks_retries():
    tracer = meter.Tracer(None)
    batches = []
    tracer.begin(3, batches.append)
    common = dict(model="m", prompt="p", prompt_name=None, prompt_hash=None, static_prefix="", output="o",
                  metrics={"gpu_ms": 1000}, budget_units=1, result="ok")
    tracer.record(gate=3, **common)
    tracer.mark_last("retry", "search không khớp")
    tracer.record(gate=4, **common)
    tracer.flush()
    assert [len(b) for b in batches] == [1, 1]
    assert batches[0][0]["result"] == "retry" and batches[1][0]["gate"] == 4


def test_hourly_gpu_cap():
    tracer = meter.Tracer(None)
    # Cap comes from contract.json limits; two calls summing exactly to it trip it.
    tracer._gpu.extend([(10**9, meter.HOURLY_GPU_S * 2 / 3), (10**9, meter.HOURLY_GPU_S / 3)])
    assert tracer.over_hourly_cap()
    assert not meter.Tracer(None).over_hourly_cap()


def test_local_trace_rotates_keeping_three_files(tmp_path, monkeypatch):
    monkeypatch.setattr(meter, "ROTATE_BYTES", 10)
    monkeypatch.setattr(meter, "ROTATE_KEEP", 3)
    tracer = meter.Tracer(tmp_path / "t.jsonl")
    for _ in range(5):
        tracer._write({"x": "y" * 20})
    assert sorted(p.name for p in tmp_path.iterdir()) == ["t.jsonl", "t.jsonl.1", "t.jsonl.2"]


def test_post_failure_never_breaks_the_gate():
    tracer = meter.Tracer(None)

    def boom(_calls):
        raise RuntimeError("409 stale_lease")

    tracer.begin(1, boom)
    tracer.record(gate=1, model="m", prompt="p", prompt_name=None, prompt_hash=None, static_prefix="",
                  output="o", metrics={}, budget_units=1, result="ok")
    tracer.flush()  # không raise
    assert tracer.pending == []
