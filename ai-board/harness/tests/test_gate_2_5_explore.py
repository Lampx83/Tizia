"""Gate 2.5 khám phá file đích khi target tin cậy thấp (AI_BOARD_EXPLORE_LOW_CONFIDENCE, mặc định tắt)."""
import json
import subprocess
from pathlib import Path

import pytest

from budget import Budget
from conftest import FakeModels, deps_with
from gates import plan_validate

TARGET = "public/trang.html"
OTHER = "public/khac.html"
QUOTE = "<h1>Trang</h1>"
WRONG = {"clear": True, "question": None, "grounded": True, "reason": "ok", "grounding": [
    {"target": TARGET, "file": TARGET, "quote": "<h1>Không có trong file</h1>",
     "before": "a", "after": "b", "verify": "c"}]}


def _repo(tmp_path):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    for path, text in ((TARGET, f'{QUOTE}\n'), (OTHER, '<p>khac</p>\n')):
        (tmp_path / path).parent.mkdir(parents=True, exist_ok=True)
        (tmp_path / path).write_text(text, encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)


def _plan(file=TARGET):
    return {"capabilities": [], "subtasks": [{"title": "Đổi chữ", "file": file, "verify": "trang có chữ mới",
                                              "size": "small", "layer": "frontend", "depends_on": []}]}


def _request(target=TARGET):
    return {"subject": "Sửa trang", "body": f"đổi chữ trong {target}", "grounding_required": True,
            "complexity_by_server": True}


class _Scripted(FakeModels):
    """Validator trả WRONG; lượt khám phá lấy lần lượt từ `actions` (dict)."""

    def __init__(self, plan, *actions):
        super().__init__(plan, validation=WRONG)
        self.actions = list(actions)

    def generate(self, model, prompt, **kw):
        if plan_validate.EXPLORE_MARK in prompt:
            self.calls.append({"model": model, "prompt": prompt, **kw})
            action = self.actions.pop(0) if self.actions else {"op": "finish", "target": ""}
            return {"response": json.dumps(action, ensure_ascii=False), "done_reason": "stop"}
        return super().generate(model, prompt, **kw)


def _explore_calls(models):
    return [call for call in models.calls if plan_validate.EXPLORE_MARK in call["prompt"]]


@pytest.fixture
def repo(tmp_path):
    _repo(tmp_path)
    return tmp_path


def _run(repo, models, plan=None, request=None):
    plan = plan or _plan()
    return plan_validate.run(request or _request(OTHER), deps_with(models), Budget(),
                             {"plan": plan, "checkout_source": str(repo)})


def test_flag_off_never_explores(repo, monkeypatch):
    monkeypatch.delenv("AI_BOARD_EXPLORE_LOW_CONFIDENCE", raising=False)
    models = _Scripted(_plan(), {"op": "finish", "target": OTHER})

    out = _run(repo, models)

    assert out["reason"] == "plan_target_uncertain" and "explored" not in out
    assert _explore_calls(models) == []


def test_flag_on_returns_in_scope_target_as_evidence_and_still_blocks(repo, monkeypatch):
    monkeypatch.setenv("AI_BOARD_EXPLORE_LOW_CONFIDENCE", '1')
    models = _Scripted(_plan(), {"op": "grep", "pattern": "<h1>Trang</h1>"}, {"op": "finish", "target": TARGET})

    out = _run(repo, models)

    assert out["blocked"] is True and out["reason"] == "plan_target_uncertain"
    assert out["explored"] == {"target": TARGET, "steps": 2}
    assert len(_explore_calls(models)) == 2


@pytest.mark.parametrize("target", ["server/index.js", "../etc/passwd", "public/missing.html", "ai-board/harness/gates/plan_validate.py"])
def test_out_of_scope_or_missing_target_is_rejected(repo, monkeypatch, target):
    monkeypatch.setenv("AI_BOARD_EXPLORE_LOW_CONFIDENCE", '1')
    models = _Scripted(_plan(), {"op": "finish", "target": target})

    out = _run(repo, models)

    assert out["reason"] == "plan_target_uncertain" and "explored" not in out


def test_read_outside_scope_returns_notice_not_content(repo):
    text = plan_validate._explore_result('read', {"path": "server/index.js", "start": 1, "end": 5}, repo, "HEAD")
    assert text.startswith('(ngoài phạm vi')


def test_exploration_respects_existing_tool_and_model_caps(repo, monkeypatch):
    monkeypatch.setenv("AI_BOARD_EXPLORE_LOW_CONFIDENCE", '1')
    monkeypatch.setenv('AI_BOARD_LOOP_MODEL_CALLS', '2')
    monkeypatch.setenv('AI_BOARD_LOOP_TOOL_CALLS', '2')
    models = _Scripted(_plan(), *[{"op": "grep", "pattern": "<h1>Trang</h1>"}] * 10)

    out = _run(repo, models)

    assert "explored" not in out
    assert len(_explore_calls(models)) == 2


def test_ai_board_path_is_blocked_before_any_exploration(repo, monkeypatch):
    monkeypatch.setenv("AI_BOARD_EXPLORE_LOW_CONFIDENCE", '1')
    target = "ai-board/harness/gates/plan_validate.py"
    models = _Scripted(_plan(target), {"op": "finish", "target": TARGET})

    out = _run(repo, models, plan=_plan(target), request=_request(target))

    assert out["blocked"] is True and out["reason"].startswith("path AI Board luôn bị chặn")
    assert _explore_calls(models) == []
