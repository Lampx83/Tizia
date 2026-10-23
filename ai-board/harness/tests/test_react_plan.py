"""Vòng ReAct cổng 2: tool chỉ-đọc qua path_policy, trích dẫn nguyên văn, trần loop_budget, cờ tắt = cũ. Model fake."""
import json
import subprocess
from types import SimpleNamespace

import pytest

from budget import Budget
from conftest import plan_with
from gates import brainstorm, react_plan
from tools.readonly import ReadOnlyTools

PAGE = '<main>\n  <button id="go">Bắt đầu</button>\n</main>\n'
QUOTE = '<button id="go">Bắt đầu</button>'
DENIED = "ai-board/harness/main.py"


@pytest.fixture
def repo(tmp_path):
    (tmp_path / "public").mkdir()
    (tmp_path / "public" / "a.html").write_text(PAGE, encoding="utf-8")
    (tmp_path / "ai-board" / "harness").mkdir(parents=True)
    (tmp_path / "ai-board" / "harness" / "main.py").write_text("x = 1\n", encoding="utf-8")
    git = ["git", "-C", str(tmp_path), "-c", "user.email=t@t", "-c", "user.name=t"]
    subprocess.run(["git", "-C", str(tmp_path), "init", "-q"], check=True)
    subprocess.run(git + ["add", "-A"], check=True)
    subprocess.run(git + ["commit", "-qm", "base"], check=True)
    sha = subprocess.run(["git", "-C", str(tmp_path), "rev-parse", "HEAD"], check=True,
                         capture_output=True, text=True).stdout.strip()
    return tmp_path, sha


@pytest.fixture
def react_on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_REACT_PLAN", "1")


class Scripted:
    """Deps fake: call_model trả lần lượt `replies`; lặp reply cuối khi hết."""

    def __init__(self, *replies):
        self.replies, self.prompts = list(replies), []
        self.models = SimpleNamespace(gate1_model="fake-gate1")
        self.trace = None

    def call_model(self, model, prompt, *, gate, budget, **kwargs):
        self.prompts.append(prompt)
        text = self.replies[min(len(self.prompts) - 1, len(self.replies) - 1)]
        return {"response": text if isinstance(text, str) else json.dumps(text, ensure_ascii=False)}


def finish(quotes_by_subtask):
    subtasks = [{"title": "Đổi chữ", "file": "public/a.html", "verify": "có Bắt đầu", "size": "small", "quotes": q}
                for q in quotes_by_subtask]
    return {"tool": "finish", "arguments": {"plan": {"summary_vi": "Sửa chữ nút.", "capabilities": [], "subtasks": subtasks}}}


def test_readonly_read_file_is_numbered_and_path_policy_refuses(repo):
    root, sha = repo
    tools = ReadOnlyTools(root, sha)
    assert tools.run("read_file", {"file": "public/a.html"}).splitlines()[1] == f"L2| {'  ' + QUOTE}"
    assert tools.run("read_file", {"file": DENIED}).startswith("từ chối đọc")
    assert tools.run("outline", {"file": DENIED}).startswith("từ chối")
    assert tools.run("grep", {"words": ["Bắt"], "file": "../secret"}).startswith("từ chối")


def test_readonly_rejects_unknown_tool_and_bad_arguments(repo):
    root, sha = repo
    tools = ReadOnlyTools(root, sha)
    with pytest.raises(ValueError):
        tools.run("write_file", {"file": "public/a.html"})
    with pytest.raises(ValueError):
        tools.run("read_file", {})
    with pytest.raises(ValueError):
        tools.run("grep", {"words": "Bắt"})


def test_loop_reads_then_finishes_with_quoted_plan(repo, react_on):
    root, sha = repo
    deps = Scripted({"tool": "read_file", "arguments": {"file": "public/a.html"}}, finish([[QUOTE]]))

    out = react_plan.run("PROMPT", deps, Budget(max_wall_clock_s=999), model="m", source=root, sha=sha)

    assert out["quotes"] == [[QUOTE]]
    plan = json.loads(out["response"])
    assert "quotes" not in plan["subtasks"][0]
    assert f"L2|   {QUOTE}" in deps.prompts[1]
    assert deps.prompts[1].startswith("PROMPT")


def test_quote_not_verbatim_is_rejected_then_retried(repo, react_on):
    root, sha = repo
    deps = Scripted({"tool": "read_file", "arguments": {"file": "public/a.html"}},
                    finish([["<button>Bắt đầu</button>"]]), finish([[QUOTE]]))

    out = react_plan.run("P", deps, Budget(max_wall_clock_s=999), model="m", source=root, sha=sha)

    assert out is not None and out["quotes"] == [[QUOTE]]
    assert "BỊ LOẠI" in deps.prompts[2]


def test_stuck_repeat_stops_loop_and_falls_back(repo, react_on):
    root, sha = repo
    deps = Scripted({"tool": "read_file", "arguments": {"file": "public/a.html"}})

    assert react_plan.run("P", deps, Budget(max_wall_clock_s=999), model="m", source=root, sha=sha) is None
    assert len(deps.prompts) == 3


def test_model_call_cap_stops_loop(repo, react_on):
    root, sha = repo
    deps = Scripted({"tool": "tree", "arguments": {"path": "public"}}, {"tool": "outline", "arguments": {"file": "public/a.html"}},
                    {"tool": "read_file", "arguments": {"file": "public/a.html"}}, {"tool": "grep", "arguments": {"words": ["zz"]}},
                    {"tool": "tree", "arguments": {"path": "public"}}, {"tool": "outline", "arguments": {"file": "public/a.html"}},
                    {"tool": "read_file", "arguments": {"file": "public/a.html"}})

    assert react_plan.run("P", deps, Budget(max_wall_clock_s=999), model="m", source=root, sha=sha) is None
    assert len(deps.prompts) <= 6


def test_denied_read_is_refused_and_not_quotable(repo, react_on):
    root, sha = repo
    deps = Scripted({"tool": "read_file", "arguments": {"file": DENIED}}, finish([["x = 1"]]))

    assert react_plan.run("P", deps, Budget(max_wall_clock_s=999), model="m", source=root, sha=sha) is None
    assert "từ chối đọc" in deps.prompts[1]


def test_bad_json_is_an_observation_not_a_crash(repo, react_on):
    root, sha = repo
    deps = Scripted("không phải json", {"tool": "read_file", "arguments": {"file": "public/a.html"}}, finish([[QUOTE]]))

    out = react_plan.run("P", deps, Budget(max_wall_clock_s=999), model="m", source=root, sha=sha)

    assert out["quotes"] == [[QUOTE]]
    assert "lỗi định dạng" in deps.prompts[1]


def test_pop_quotes_requires_quote_for_every_subtask():
    plan = {"subtasks": [{"quotes": ["a"]}, {"quotes": []}]}
    with pytest.raises(ValueError, match="subtask\\[1\\]"):
        react_plan.pop_quotes(plan, "a")


def test_flag_off_keeps_one_shot_plan(request_item, monkeypatch):
    monkeypatch.delenv("AI_BOARD_REACT_PLAN", raising=False)
    assert react_plan.enabled() is False
    deps = Scripted(plan_with(["features"]))

    out = brainstorm.run(request_item, deps, Budget(max_wall_clock_s=999))

    assert out["blocked"] is False
    assert len(deps.prompts) == 1
    assert "REACT MODE" not in deps.prompts[0]
    assert "react_quotes" not in out


def test_flag_on_falls_back_to_one_shot_when_loop_never_finishes(request_item, react_on):
    deps = Scripted({"tool": "tree", "arguments": {"path": "public"}}, plan_with(["features"]))

    out = brainstorm.run(request_item, deps, Budget(max_wall_clock_s=999))

    assert out["blocked"] is False
    assert "react_quotes" not in out
    assert "REACT MODE" in deps.prompts[0]
    assert "REACT MODE" not in deps.prompts[-1]


def test_flag_on_returns_react_quotes_when_loop_finishes(request_item, react_on, monkeypatch):
    seen = {}

    def fake_run(prompt, deps, budget, **kw):
        seen.update(kw)
        return {"response": json.dumps(plan_with(["features"]), ensure_ascii=False), "quotes": [["Thêm"]]}

    monkeypatch.setattr(react_plan, "run", fake_run)
    deps = Scripted("unused")

    out = brainstorm.run(request_item, deps, Budget(max_wall_clock_s=999))

    assert out["blocked"] is False
    assert out["react_quotes"] == [["Thêm"]]
    assert deps.prompts == []
    assert seen["model"] == "fake-gate1"
