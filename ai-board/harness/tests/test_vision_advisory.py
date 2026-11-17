"""Vision advisory: structured questions about base/candidate focus shots; never changes gate 5 verdict."""
import json
import tempfile
from pathlib import Path
from types import SimpleNamespace

import pytest

from gates import verify, vision_advisory
from runtime.budget import BudgetExhausted
from test_gate_5_verify import FakeRunner, checkout, state
from verification import functional

REQUEST = 'Đổi nút #sgf-send từ "Gửi tới Ban điều hành" thành "Gửi yêu cầu"'
DIFF = "SECRET_DIFF_LINE_xyz"
REPLY = {"answers": [{"q": "Q1", "yes_no": "yes", "confidence": 0.9}], "overall": "pass"}


class Budget:
    def __init__(self, afford=True):
        self.afford = afford

    def can_afford(self, reserve=None):
        return self.afford


class Deps:
    def __init__(self, reply=None, error=None):
        self.reply, self.error, self.calls = reply if reply is not None else REPLY, error, []
        self.models = SimpleNamespace(gate1_model="m", routing=None)

    def call_model(self, model, prompt, **kw):
        self.calls.append((prompt, kw))
        if self.error:
            raise self.error
        return {"response": json.dumps(self.reply)}


def shots_in(root):
    folder = Path(tempfile.mkdtemp(prefix="ai-verify-shots-", dir=root))
    rows = []
    for phase in ("after", "before"):
        path = folder / f"{phase}-focus.png"
        path.write_bytes(b"png")
        rows.append({"phase": phase, "page": "/x.html", "width": 1280, "path": str(path), "focus": True})
    return {"screenshots": rows}


def st(detail=REQUEST):
    return {"request_detail": detail, "full_diff": [{"diff": DIFF}], "diffs": [{"diff": DIFF}]}


def ask(tmp_path, deps=None, budget=None, evidence=None, detail=REQUEST):
    return vision_advisory.run(st(detail), evidence or shots_in(tmp_path), deps or Deps(), budget or Budget(),
                               temp_root=tmp_path)


def test_records_answers_and_sends_two_images_base_first(tmp_path):
    deps = Deps()
    out = ask(tmp_path, deps)
    assert out["status"] == "ok" and out["overall"] == "pass" and out["answers"][0]["yes_no"] == "yes"
    _, kw = deps.calls[0]
    assert [i["phase"] for i in kw["extra"]["images"]] == ["before", "after"]
    assert kw["gate"] == 5 and kw["budget"] is not None


def test_questions_come_from_request_only_no_diff_no_claim(tmp_path):
    deps = Deps()
    ask(tmp_path, deps)
    prompt, kw = deps.calls[0]
    assert "Gửi yêu cầu" in prompt and "#sgf-send" in prompt and "outside" in prompt
    assert DIFF not in prompt and DIFF not in kw["extra"]["system"]


def test_model_failure_is_unavailable_with_reason(tmp_path):
    out = ask(tmp_path, Deps(error=RuntimeError("vllm down")))
    assert out == {"status": "unavailable", "reason": "model call failed: vllm down"}


def test_budget_exhausted_error_is_unavailable(tmp_path):
    assert ask(tmp_path, Deps(error=BudgetExhausted("x")))["status"] == "unavailable"


def test_bad_json_shape_is_unavailable(tmp_path):
    out = ask(tmp_path, Deps(reply={"overall": "maybe"}))
    assert out["status"] == "unavailable" and "shape" in out["reason"]


def test_budget_skip_makes_no_call(tmp_path):
    deps = Deps()
    out = ask(tmp_path, deps, Budget(afford=False))
    assert out["status"] == "unavailable" and "budget" in out["reason"] and deps.calls == []


def test_no_budget_object_skips(tmp_path):
    deps = Deps()
    out = vision_advisory.run(st(), shots_in(tmp_path), deps, None, temp_root=tmp_path)
    assert out["status"] == "unavailable" and deps.calls == []


def test_missing_images_is_unavailable(tmp_path):
    deps = Deps()
    out = ask(tmp_path, deps, evidence={"screenshots": []})
    assert out["status"] == "unavailable" and "image" in out["reason"] and deps.calls == []


def test_after_only_is_unavailable(tmp_path):
    ev = shots_in(tmp_path)
    ev["screenshots"] = ev["screenshots"][:1]
    assert ask(tmp_path, evidence=ev)["status"] == "unavailable"


@pytest.fixture(autouse=True)
def served(monkeypatch):
    monkeypatch.setattr(verify, "probe_http", lambda _url: (200, b"<h1>changed</h1>\n"))
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": functional.QUEUE_PROBE, "passed": True})
    monkeypatch.setattr(functional, "select", lambda _s: functional.ROUTE_PROBE)


def gate5(tmp_path, monkeypatch, flag, deps=None, budget=None):
    shots = shots_in(None)["screenshots"]
    monkeypatch.setattr(verify, "_capture_all", lambda *a, **k: shots)
    monkeypatch.setenv("AI_BOARD_VISION_ADVISORY", flag)
    root = tmp_path / flag / str(len(list(tmp_path.glob("*/*"))))
    root.mkdir(parents=True)
    s = state(checkout(root), visual=True)
    s["request_detail"] = REQUEST
    return verify.run(s, deps or Deps(), budget or Budget(), runner=FakeRunner(),
                      http_probe=lambda _u: (200, b"<h1>changed</h1>\n"))


def test_flag_off_no_advisory_no_call(tmp_path, monkeypatch):
    deps = Deps()
    out = gate5(tmp_path, monkeypatch, "0", deps)
    assert "vision_advisory" not in out["evidence"] and deps.calls == []


def test_flag_on_records_and_verdict_unchanged(tmp_path, monkeypatch):
    off = gate5(tmp_path, monkeypatch, "0")
    on = gate5(tmp_path, monkeypatch, "1", Deps(reply={**REPLY, "overall": "fail"}))
    assert on["evidence"]["vision_advisory"]["overall"] == "fail"
    assert (on["blocked"], on["reason"], on["failure_class"]) == (off["blocked"], off["reason"], off["failure_class"])


def test_flag_on_failure_never_blocks(tmp_path, monkeypatch):
    out = gate5(tmp_path, monkeypatch, "1", Deps(error=RuntimeError("boom")))
    assert out["blocked"] is False and out["evidence"]["vision_advisory"]["status"] == "unavailable"
