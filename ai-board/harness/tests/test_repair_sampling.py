"""Repair thứ hai đổi nhiệt độ sampling: cờ mặc định tắt, repair đầu giữ nhiệt độ cũ, trace ghi từng call."""
import dataclasses

import pytest

import meter
from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from runtime import limits


def call(tmp_path, attempt, gate=3, options=None):
    tracer = meter.Tracer(tmp_path / "t.jsonl")
    sent = []
    tracer.begin(1, sent.extend)
    tracer.attempt = attempt
    models = FakeModels(plan_with(["features"]))
    deps = dataclasses.replace(deps_with(models), trace=tracer)
    deps.call_model("m", "p", gate=gate, budget=Budget(), options=options)
    span = next(s for s in tracer.spans if s["attributes"].get("gen_ai.operation.name") == "chat")
    return models.calls[0]["temperature"], span["attributes"]["gen_ai.request.temperature"]


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_REPAIR_SAMPLING_DIVERSITY", "1")


def test_contract_holds_value():
    spec = limits.repair_sampling()
    assert spec["from_attempt"] == 2 and 0 < spec["temperature"] <= 1


@pytest.mark.parametrize("attempt", [0, 1, 2, 3])
def test_flag_off_keeps_temperature_zero(tmp_path, attempt):
    assert call(tmp_path, attempt)[0] == 0


@pytest.mark.parametrize("attempt,expected", [(0, 0), (1, 0), (2, "contract"), (3, "contract")])
def test_flag_on_second_repair_changes_temperature(tmp_path, on, attempt, expected):
    want = limits.repair_sampling()["temperature"] if expected == "contract" else expected
    assert call(tmp_path, attempt)[0] == want


def test_trace_records_temperature_per_call(tmp_path, on):
    sent_temp = call(tmp_path, 2)[1]
    assert sent_temp == limits.repair_sampling()["temperature"]


def test_other_gates_and_explicit_options_untouched(tmp_path, on):
    assert call(tmp_path, 2, gate=4)[0] == 0
    assert call(tmp_path, 2, options={"temperature": 0.9})[0] == 0.9
