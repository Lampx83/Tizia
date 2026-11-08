"""File trạng thái có cấu trúc giữa subtask: nội dung, ghi theo cổng, prompt không replay lịch sử; off = y như cũ."""
import json

import pytest

from runtime import pipeline, state_file
from runtime.budget import Budget
from settings import get_settings

PLAN = {"subtasks": [
    {"title": "Thêm nút", "file": "public/a.html", "verify": "thấy nút", "depends_on": []},
    {"title": "Style nút", "file": "public/a.css", "verify": "nút đỏ", "depends_on": [1]},
    {"title": "Test nút", "file": "test/a.test.js", "verify": "node --test", "depends_on": [1, 2]},
], "acceptance": ["node --test test/a.test.js"]}
REQUEST = {"subject": "Nút mới", "body": "Thêm nút đỏ vào trang a. " * 3}


def make_state(tmp_path, **extra):
    return {"plan": PLAN, "acceptance": PLAN["acceptance"], "produced": {"public/a.html": "x"}, "base_sha": "abc123",
            "state_dir": str(tmp_path), **extra}


@pytest.fixture
def flag_on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_STATE_FILE", "1")


def test_default_off(monkeypatch):
    monkeypatch.delenv("AI_BOARD_STATE_FILE", raising=False)
    assert get_settings().state_file is False and state_file.enabled() is False


def test_build_has_required_sections(tmp_path):
    doc = state_file.build(make_state(tmp_path), REQUEST)
    assert doc["task"].startswith("Nút mới") and "Thêm nút đỏ" in doc["task"]
    assert [s["status"] for s in doc["plan"]] == ["done", "pending", "pending"]
    assert doc["next"] == {"index": 2, "file": "public/a.css", "title": "Style nút"}
    assert doc["plan"][1]["depends_on"] == [1] and doc["plan"][1]["verify"] == "nút đỏ"
    assert doc["done_when"] == ["node --test test/a.test.js"]
    assert doc["artifacts"] == {"produced": ["public/a.html"], "base_sha": "abc123"}


def test_next_none_when_all_done(tmp_path):
    state = make_state(tmp_path, produced={s["file"]: "x" for s in PLAN["subtasks"]})
    doc = state_file.build(state, REQUEST)
    assert doc["next"] is None and {s["status"] for s in doc["plan"]} == {"done"}


def test_task_capped(tmp_path):
    doc = state_file.build(make_state(tmp_path), {"subject": "s", "body": "x" * 50000})
    assert len(doc["task"]) <= state_file.TASK_MAX_CHARS


def test_write_atomic_roundtrip(tmp_path, flag_on):
    state = make_state(tmp_path)
    path = state_file.write(state, REQUEST)
    assert path == state["state_file"] and json.loads(open(path, encoding="utf-8").read())["next"]["index"] == 2
    assert [p.name for p in tmp_path.iterdir()] == [path.rsplit("/", 1)[-1].rsplit("\\", 1)[-1]]


def test_write_noop_when_off(tmp_path, monkeypatch):
    monkeypatch.delenv("AI_BOARD_STATE_FILE", raising=False)
    state = make_state(tmp_path)
    assert state_file.write(state, REQUEST) is None
    assert "state_file" not in state and list(tmp_path.iterdir()) == []


def test_block_empty_when_off_or_missing(tmp_path, monkeypatch):
    monkeypatch.delenv("AI_BOARD_STATE_FILE", raising=False)
    assert state_file.block(make_state(tmp_path)) == ""
    monkeypatch.setenv("AI_BOARD_STATE_FILE", "1")
    assert state_file.block(make_state(tmp_path)) == ""


def test_block_reads_file_not_history(tmp_path, flag_on):
    history = "OLD-TURN-" * 5000
    state = make_state(tmp_path, history=[history], messages=[{"role": "assistant", "content": history}])
    state_file.write(state, REQUEST)
    text = state_file.block(state)
    assert "Style nút" in text and "public/a.html" in text and "OLD-TURN" not in text
    assert len(text) < 4000
    state["plan"] = {"subtasks": []}
    assert "Style nút" in state_file.block(state)


def test_block_ignores_corrupt_file(tmp_path, flag_on):
    state = make_state(tmp_path)
    path = state_file.write(state, REQUEST)
    open(path, "w", encoding="utf-8").write("{not json")
    assert state_file.block(state) == ""


def test_run_gate_writes_after_gate_when_on(tmp_path, flag_on):
    state = make_state(tmp_path)
    out = pipeline.run_gate(6, REQUEST, pipeline.Deps.real(), Budget(), state)
    assert out["stub"] and json.loads(open(state["state_file"], encoding="utf-8").read())["task"].startswith("Nút mới")


def test_run_gate_unchanged_when_off(tmp_path, monkeypatch):
    monkeypatch.delenv("AI_BOARD_STATE_FILE", raising=False)
    state = make_state(tmp_path)
    pipeline.run_gate(6, REQUEST, pipeline.Deps.real(), Budget(), state)
    assert "state_file" not in state and list(tmp_path.iterdir()) == []


def test_run_gate_blocked_gate_still_writes(tmp_path, flag_on, monkeypatch):
    monkeypatch.setitem(pipeline._GATE_FNS, 6, lambda *a, **k: {"gate": 6, "blocked": True, "reason": "x"})
    state = make_state(tmp_path)
    assert pipeline.run_gate(6, REQUEST, pipeline.Deps.real(), Budget(), state)["blocked"]
    assert state["state_file"]


def test_write_failure_does_not_break_gate(tmp_path, flag_on):
    state = make_state(tmp_path, state_dir=str(tmp_path / "file.txt"))
    (tmp_path / "file.txt").write_text("x")
    out = pipeline.run_gate(6, REQUEST, pipeline.Deps.real(), Budget(), state)
    assert out["stub"] and "state_file" not in state
