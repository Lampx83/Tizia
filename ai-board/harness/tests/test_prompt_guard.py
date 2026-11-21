"""Prompt Guard shadow scorer: off does nothing, shadow records without changing outcome, fail-open, segmented."""
import json
from types import SimpleNamespace

import pytest

from runtime import pipeline
from runtime.budgets.budget import Budget
from security import prompt_guard


class FakeBackend:
    """One id per word; score = share of words equal to 'attack' in the window."""

    def __init__(self):
        self.windows = []

    def encode(self, text):
        return [1 if word == "attack" else 0 for word in text.split()]

    def score(self, windows):
        self.windows.extend(windows)
        return [sum(w) / max(len(w), 1) for w in windows]


@pytest.fixture
def fake(monkeypatch):
    backend = FakeBackend()
    monkeypatch.setattr(prompt_guard, "_load", lambda path: backend)
    monkeypatch.setattr(prompt_guard, "_loaded", {})
    return backend


def _fail_load(path):
    raise AssertionError("model must not load when the flag is off")


def test_off_does_nothing(monkeypatch):
    monkeypatch.setattr(prompt_guard, "_load", _fail_load)
    monkeypatch.setattr(prompt_guard, "_loaded", {})
    assert prompt_guard.shadow({"title": "attack attack"}) is None


def test_shadow_records_score_and_label(monkeypatch, fake):
    monkeypatch.setenv("AI_BOARD_PROMPT_GUARD", "shadow")
    out = prompt_guard.shadow({"title": "attack attack", "body": "sửa chữ nút", "thread": ""})
    assert out["status"] == "ok" and out["score"] == 1.0 and out["label"] == "malicious"
    assert out["fields"] == {"title": 1.0, "body": 0.0}


def test_missing_model_is_unavailable_and_fails_open(monkeypatch, tmp_path):
    monkeypatch.setattr(prompt_guard, "_loaded", {})
    monkeypatch.setenv("AI_BOARD_PROMPT_GUARD", "shadow")
    monkeypatch.setenv("AI_BOARD_PROMPT_GUARD_PATH", str(tmp_path / "absent"))
    out = prompt_guard.shadow({"title": "x"})
    assert out["status"] == "unavailable" and out["reason"]


def test_empty_model_dir_without_runtime_is_unavailable(monkeypatch, tmp_path):
    monkeypatch.setattr(prompt_guard, "_loaded", {})
    monkeypatch.setenv("AI_BOARD_PROMPT_GUARD", "shadow")
    monkeypatch.setenv("AI_BOARD_PROMPT_GUARD_PATH", str(tmp_path))
    assert prompt_guard.shadow({"title": "x"})["status"] == "unavailable"


def test_scoring_error_fails_open(monkeypatch, fake):
    monkeypatch.setenv("AI_BOARD_PROMPT_GUARD", "shadow")
    monkeypatch.setattr(fake, "score", lambda windows: 1 / 0)
    assert prompt_guard.shadow({"title": "x"})["status"] == "error"


def test_segments_cover_long_input_with_overlap():
    ids = list(range(1200))
    windows, truncated = prompt_guard.segments(ids)
    size = prompt_guard.WINDOW - 2
    assert not truncated and all(len(w) <= size for w in windows)
    assert windows[0][-prompt_guard.OVERLAP:] == windows[1][:prompt_guard.OVERLAP]
    assert sorted(set(i for w in windows for i in w)) == ids


def test_segments_short_and_capped():
    assert prompt_guard.segments([5, 6]) == ([[5, 6]], False)
    windows, truncated = prompt_guard.segments(list(range(100_000)))
    assert truncated and len(windows) == prompt_guard.MAX_SEGMENTS


def test_long_input_takes_max_over_segments(monkeypatch, fake):
    monkeypatch.setenv("AI_BOARD_PROMPT_GUARD", "shadow")
    text = " ".join(["ok"] * 1500 + ["attack"] * 300)
    out = prompt_guard.shadow({"body": text})
    assert len(fake.windows) > 1 and out["segments"] == len(fake.windows)
    assert out["score"] == round(max(sum(w) / len(w) for w in fake.windows), 4) and out["score"] > 0.5


def test_malicious_index_from_config():
    assert prompt_guard.malicious_indices({"id2label": {"0": "LABEL_0", "1": "LABEL_1"}}) == [1]
    assert prompt_guard.malicious_indices({"id2label": {"0": "MALICIOUS", "1": "BENIGN"}}) == [0]
    assert prompt_guard.malicious_indices({"id2label": {"0": "BENIGN", "1": "INJECTION", "2": "JAILBREAK"}}) == [1, 2]


def _intake(monkeypatch, verdict):
    guard = {"verdict": verdict, "labels": ["ok"] if verdict == "allow" else ["prompt_injection"],
             "public_message": None if verdict == "allow" else "msg", "internal_reason": "r"}
    monkeypatch.setattr(pipeline.intake_guard, "run", lambda *a, **k: guard)
    monkeypatch.setattr(pipeline.brainstorm, "run", lambda *a, **k: {"plan": {"subtasks": []}})
    request = {"subject": "attack", "body": "sửa", "thread": [{"role": "student", "body": "attack attack"},
                                                             {"role": "ai", "body": "attack"}]}
    state = {}
    notes = []
    deps = SimpleNamespace(models=None, trace=SimpleNamespace(note=lambda *a: notes.append(a)))
    out = pipeline._intake_and_plan(request, deps, Budget(), state)
    return out, state, notes, guard


@pytest.mark.parametrize("verdict", ["allow", "human_review"])
def test_shadow_never_changes_intake_outcome(monkeypatch, fake, verdict):
    off, off_state, off_notes, guard = _intake(monkeypatch, verdict)
    monkeypatch.setenv("AI_BOARD_PROMPT_GUARD", "shadow")
    on, on_state, on_notes, _ = _intake(monkeypatch, verdict)
    assert not off_notes and "prompt_guard" not in off_state["intake"] and "evidence" not in off
    assert {k: v for k, v in on.items() if k != "evidence"} == off
    assert {k: v for k, v in on_state["intake"].items() if k != "prompt_guard"} == off_state["intake"]
    assert "prompt_guard" not in guard  # cached intake result stays untouched
    record = on_state["intake"]["prompt_guard"]
    assert record["fields"] == {"title": 1.0, "body": 0.0, "thread": 1.0} and on_notes
    if verdict != "allow":
        assert on["evidence"] == {"prompt_guard": record}


def test_attachment_text_scored_without_fence_lines(monkeypatch, fake):
    from services import attachments
    monkeypatch.setenv("AI_BOARD_PROMPT_GUARD", "shadow")
    fenced = f"\n\n{attachments.FENCE_OPEN}\nattack ok\n{attachments.FENCE_CLOSE}"
    monkeypatch.setattr(pipeline.attachments, "enrich", lambda r, **k: ({**r, "body": r["body"] + fenced}, {"items": []}))
    _, state, _, _ = _intake(monkeypatch, "allow")
    assert state["intake"]["prompt_guard"]["fields"]["attachments"] == 0.5


def test_fetch_url_receipt_records_shadow_score(monkeypatch, fake):
    from runtime import network_request
    monkeypatch.setenv("AI_BOARD_PROMPT_GUARD", "shadow")
    broker = network_request.FetchBroker(config={"allow_hosts": ["example.com"], "max_bytes": 1000, "timeout_s": 1},
                                         fetcher=lambda url, n, ip: (200, "text/plain", b"attack attack"),
                                         resolver=lambda host: ["93.184.216.34"])
    out = broker.resolve({"kind": "fetch_url", "url": "https://example.com/a", "call_id": "c1"})
    assert out["receipt"]["prompt_guard"]["score"] == 1.0
    monkeypatch.delenv("AI_BOARD_PROMPT_GUARD")
    out = broker.resolve({"kind": "fetch_url", "url": "https://example.com/a", "call_id": "c2"})
    assert "prompt_guard" not in out["receipt"]


def test_measurement_reports_tpr_fpr_per_threshold(tmp_path, fake, capsys):
    from evaluation import prompt_guard_eval
    attack = [{"id": "a1", "title": "attack", "detail": "attack", "expect": "prompt_injection"},
              {"id": "a2", "title": "ok", "detail": "ok", "expect": "harm"}]
    benign = [{"id": "b1", "title": "ok", "detail": "ok"}, {"id": "b2", "title": "attack ok", "detail": "ok ok"}]
    (tmp_path / "a.json").write_text(json.dumps(attack), encoding="utf-8")
    (tmp_path / "b.json").write_text(json.dumps(benign), encoding="utf-8")
    code = prompt_guard_eval.main(["--model", str(tmp_path), "--attack", str(tmp_path / "a.json"),
                                   "--benign", str(tmp_path / "b.json"), "--thresholds", "0.2,0.9"])
    out = capsys.readouterr().out
    assert code == 0
    assert "0.20  TPR 0.500  FPR 0.500" in out and "0.90  TPR 0.500  FPR 0.000" in out
    assert "prompt_injection" in out and "harm" in out
