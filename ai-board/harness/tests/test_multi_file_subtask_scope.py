"""LF/182 multi-file subtask: gate 3 tool loop, candidate, gate 4 scope; out-of-scope edits stay rejected."""
import json
import subprocess
from pathlib import Path

import pytest

import candidate
import tools
from gates import implement, static_check, subtask_contract
from runtime import schedule, tool_loop
from runtime.budget import Budget


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_MAX", "3")


def task(**kw):
    return {"title": "t", "file": "public/a.js", "verify": "node --test", "size": "small", **kw}


def multi(**kw):
    return task(file="public/a.html", files=["public/b.html"], **kw)


FILES = {"public/a.html": "<main>\n<h1>A</h1>\n</main>\n", "public/b.html": "<main>\n<h1>B</h1>\n</main>\n",
         "public/c.html": "<main>\n<h1>C</h1>\n</main>\n"}


@pytest.fixture
def repo(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda source, sha, path: FILES.get(path))


def edit(file, text="<p>x</p>"):
    return {"tool": "edit_file", "arguments": {"file": file, "edits": [{"after_line": 2, "insert": text}]}}


TEST = {"tool": "write_test", "arguments": {"test_file": "test/a.test.js",
                                              "test": "import test from 'node:test';\n// public/a.html\n"}}
FINISH = {"tool": "finish", "arguments": {}}


class Deps:
    def __init__(self, script):
        self.script, self.prompts = list(script), []

    def call_model(self, model, prompt, *, budget, **kw):
        budget.spend("model_calls")
        budget.spend("tokens", 100)
        self.prompts.append(prompt)
        item = self.script.pop(0) if len(self.script) > 1 else self.script[0]
        return {"response": json.dumps(item)}


def run_loop(script, st, budget=None):
    budget = budget or Budget()
    deps = Deps(script)
    result = tool_loop.run_subtask(st, FILES["public/a.html"], deps=deps, budget=budget, model="m", source=".",
                                   sha="abc", check=lambda out: None)
    return result, budget, deps


# ── tool loop: scope on read/edit, budget ──────────────────────────────────

def test_edits_extra_file_and_reports_it(on, repo):
    result, _, _ = run_loop([edit("public/a.html"), edit("public/b.html", "<p>b</p>"), TEST, FINISH], multi())
    assert result["status"] == "proposed"
    assert list(result["out"]["extra_files"]) == ["public/b.html"]
    assert "<p>b</p>" in result["out"]["extra_files"]["public/b.html"]
    assert "<p>b</p>" not in result["out"]["code"]


def test_out_of_scope_edit_is_forbidden_when_flag_on(on, repo):
    result, _, _ = run_loop([edit("public/a.html"), edit("public/c.html"), TEST, FINISH], multi())
    assert result["status"] == "blocked" and result["failure_class"] == "critical"
    assert "public/c.html" in result["reason"]


def test_out_of_scope_read_is_forbidden_when_flag_on(on, repo):
    result, _, _ = run_loop([{"tool": "read_file", "arguments": {"file": "public/c.html"}}, FINISH], multi())
    assert result["status"] == "blocked" and result["failure_class"] == "critical"


def test_extra_file_edit_is_forbidden_when_flag_off(repo):
    result, _, _ = run_loop([edit("public/a.html"), edit("public/b.html"), TEST, FINISH], multi())
    assert result["status"] == "blocked" and result["failure_class"] == "critical"
    assert "public/b.html" in result["reason"]


def test_unchanged_extra_is_not_reported(on, repo):
    result, _, _ = run_loop([edit("public/a.html"), TEST, FINISH], multi())
    assert result["status"] == "proposed" and "extra_files" not in result["out"]


def test_multi_file_blocked_with_sandbox_offer(on, repo, monkeypatch):
    monkeypatch.setattr(tool_loop.sandbox_tool, "offered", lambda _type: True)
    result, _, _ = run_loop([edit("public/a.html"), TEST, FINISH], multi())
    assert result["status"] == "blocked" and "multi-file" in result["reason"]


def test_budget_scales_with_file_count_only_when_flag_on(on, monkeypatch):
    base = tool_loop.child_caps()
    assert tool_loop.child_caps(task()) == base
    assert tool_loop.child_caps(multi()) == {"max_model_calls": base["max_model_calls"] * 2,
                                             "max_tool_calls": base["max_tool_calls"] * 2}
    monkeypatch.delenv("AI_BOARD_MULTI_FILE_SUBTASK")
    assert tool_loop.child_caps(multi()) == base


def test_parent_budget_still_stops_a_scaled_child(on, repo):
    result, budget, _ = run_loop([edit("public/a.html", "<p>1</p>"), edit("public/a.html", "<p>2</p>"), TEST, FINISH],
                                 multi(), budget=Budget(max_model_calls=1))
    assert result["status"] == "paused" and result["failure_class"] == "budget"
    assert budget.model_calls == 1


def test_prompt_lists_files_only_when_multi(on, repo):
    _, _, deps = run_loop([edit("public/a.html"), TEST, FINISH], multi())
    assert "public/a.html, public/b.html" in deps.prompts[0]
    _, _, deps = run_loop([edit("public/a.html"), TEST, FINISH], task(file="public/a.html"))
    assert "no others" not in deps.prompts[0]


# ── scheduling / candidate / gate 4 scope ──────────────────────────────────

def test_schedule_conflict_on_extra_file(on):
    steps = [{"order": 1, "file": "public/a.js", "files": ["public/s.js"]}, {"order": 2, "file": "public/s.js"}]
    with pytest.raises(ValueError, match="public/s.js"):
        schedule.check_conflicts(steps)


def test_schedule_ignores_extras_when_flag_off():
    schedule.check_conflicts([{"order": 1, "file": "public/a.js", "files": ["public/s.js"]},
                              {"order": 2, "file": "public/s.js"}])


def git(cwd, *args):
    return subprocess.run(["git", *args], cwd=cwd, check=True, capture_output=True, text=True, encoding="utf-8",
                          stdin=subprocess.DEVNULL).stdout.strip()


@pytest.fixture
def source(tmp_path):
    repo_dir = tmp_path / "source"
    (repo_dir / "public").mkdir(parents=True)
    (repo_dir / "public" / "a.js").write_text("// a\n", encoding="utf-8")
    git(repo_dir, "init", "-q")
    git(repo_dir, "-c", "user.name=t", "-c", "user.email=t@t", "add", "-A")
    git(repo_dir, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "base")
    return repo_dir


def multi_state(tmp_path, extras, planned):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    diff = implement._write_and_diff(scratch, "public/a.js", "// a2\n", "test/a.test.js", "// t\n// public/a.js\n", extras)
    item = {"title": "m", "file": "public/a.js", "test_file": "test/a.test.js", "diff": diff,
            "commit": git(scratch, "rev-parse", "HEAD"), "extra_files": sorted(extras)}
    subtask = {"title": "m", "file": "public/a.js", "size": "small", "verify": "node --test", **planned}
    return {"skill_id": "t", "scratch_repo": str(scratch), "plan": {"subtasks": [subtask]}, "diffs": [item]}


def test_candidate_writes_extra_files_when_planned(on, tmp_path, source):
    state = multi_state(tmp_path, {"public/b.js": "// b\n"}, {"files": ["public/b.js"]})
    candidate.create(state, source)
    try:
        assert (Path(state["full_checkout"]) / "public" / "b.js").read_text(encoding="utf-8") == "// b\n"
        assert state["commits"][0]["files"] == ["public/a.js", "test/a.test.js", "public/b.js"]
    finally:
        candidate.cleanup(state, keep_branch=False)


def test_candidate_rejects_diff_touching_unplanned_file(on, tmp_path, source):
    state = multi_state(tmp_path, {"public/c.js": "// c\n"}, {"files": ["public/b.js"]})
    with pytest.raises(candidate.ScopeViolation, match="public/c.js"):
        candidate.create(state, source)
    assert "full_checkout" not in state


def test_candidate_rejects_planned_extra_when_flag_off(tmp_path, source):
    state = multi_state(tmp_path, {"public/b.js": "// b\n"}, {"files": ["public/b.js"]})
    with pytest.raises(candidate.ScopeViolation, match="public/b.js"):
        candidate.create(state, source)


def test_gate4_blocks_diff_touching_unplanned_file(on, tmp_path):
    state = multi_state(tmp_path, {"public/c.js": "// c\n"}, {"files": ["public/b.js"]})
    result = static_check.run(state, check_size=False)
    assert result["blocked"] and result["failure_class"] == "critical" and "public/c.js" in result["reason"]


def test_gate4_blocks_extra_when_flag_off(tmp_path):
    state = multi_state(tmp_path, {"public/b.js": "// b\n"}, {"files": ["public/b.js"]})
    result = static_check.run(state, check_size=False)
    assert result["blocked"] and "public/b.js" in result["reason"]


def test_gate4_passes_planned_extras(on, tmp_path):
    state = multi_state(tmp_path, {"public/b.js": "// b\n"}, {"files": ["public/b.js"]})
    assert not static_check.run(state, check_size=False)["blocked"]


def test_gate4_lints_extra_file_syntax(on, tmp_path):
    state = multi_state(tmp_path, {"public/b.js": "export const = ;\n"}, {"files": ["public/b.js"]})
    result = static_check.run(state, check_size=False)
    assert result["blocked"] and "public/b.js" in result["reason"]


# ── gate 3 journal ─────────────────────────────────────────────────────────

def test_allowed_extras_rejects_unlisted(on):
    with pytest.raises(ValueError, match="public/c.js"):
        implement._allowed_extras(multi(), {"extra_files": {"public/c.js": "x"}})
    assert implement._allowed_extras(multi(), {"extra_files": {"public/b.html": "x"}}) == {"public/b.html": "x"}
    assert implement._allowed_extras(multi(), {}) == {}


def test_progress_entry_keeps_extras_and_restore_rebuilds_them(on, tmp_path):
    out = {"test_file": "test/a.test.js", "code": "// a2\n", "test": "// t\n// public/a.js\n",
           "extra_files": {"public/b.js": "// b\n"}}
    entry = implement._progress_entry(out, "m")
    assert entry["extra_files"] == {"public/b.js": "// b\n"}
    assert "extra_files" not in implement._progress_entry({k: v for k, v in out.items() if k != "extra_files"}, "m")
    subtask = task(files=["public/b.js"])
    state = {"plan": {"subtasks": [subtask]}, "produced": {"public/a.js": entry}, "scratch_repo": str(tmp_path / "s")}
    implement.restore(state)
    assert state["diffs"][0]["extra_files"] == ["public/b.js"]
    assert (tmp_path / "s" / "public" / "b.js").read_text(encoding="utf-8") == "// b\n"


def test_restore_flag_off_rejects_journaled_extras(tmp_path):
    out = {"test_file": "test/a.test.js", "code": "// a2\n", "test": "// t\n", "extra_files": {"public/b.js": "// b\n"}}
    state = {"plan": {"subtasks": [task(files=["public/b.js"])]},
             "produced": {"public/a.js": implement._progress_entry(out, "m")}, "scratch_repo": str(tmp_path / "s")}
    with pytest.raises(ValueError, match="public/b.js"):
        implement.restore(state)


def test_generate_one_blocks_multi_without_tool_loop(on, tmp_path):
    class Models:
        routing = None
        small = large = "m"

    class D:
        models = Models()
        trace = None

    status, payload = implement._generate_one(1, multi(), state={"plan": {"subtasks": [multi()]}, "checkout_source": None},
                                              deps=D(), budget=Budget(), current="x", repo=tmp_path, known=set(),
                                              db_path=None, proposal_id=None)
    assert status == "blocked" and payload["failure_class"] == "plan"


# ── subtask_contract ───────────────────────────────────────────────────────

def test_contract_flag_off_ignores_files_key():
    plan = {"subtasks": [task(files=["public/b.js"]), task(file="public/z.js")]}
    assert subtask_contract.derive(plan)[0]["files"] == ["public/a.js"]
    assert subtask_contract.block(plan) == subtask_contract.block({"subtasks": [task(), task(file="public/z.js")]})


def write_tree(tmp_path, **files):
    (tmp_path / "public").mkdir(exist_ok=True)
    for name, text in files.items():
        (tmp_path / "public" / f"{name}.js").write_text(text, encoding="utf-8")


def test_contract_import_between_files_of_one_step_is_not_a_finding(on, tmp_path):
    write_tree(tmp_path, a="import { x } from './b.js';\n", b="export const y = 1;\n", z="// z\n")
    plan = {"subtasks": [task(files=["public/b.js"]), task(file="public/z.js")]}
    assert subtask_contract.cross_check({"plan": plan, "scratch_repo": str(tmp_path)}) == []


def test_contract_import_into_another_steps_extra_file_is_checked(on, tmp_path):
    write_tree(tmp_path, a="// a\n", b="export const y = 1;\n", z="import { x } from './b.js';\n")
    plan = {"subtasks": [task(files=["public/b.js"]), task(file="public/z.js")]}
    findings = subtask_contract.cross_check({"plan": plan, "scratch_repo": str(tmp_path)})
    assert [(f["file"], f["owner"], f["name"]) for f in findings] == [("public/z.js", "public/b.js", "x")]
