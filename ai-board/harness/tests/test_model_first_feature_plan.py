"""model_first: an unanchored feature request ("trang ghi chú nhanh", no paths/ids/schema) gets a page + context + migration plan."""
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

import pytest

from conftest import FakeModels, deps_with
from gates import best_match, brainstorm, plan_validate, react_plan
from runtime.budgets.budget import Budget
from settings import Settings
from test_code_index import _SeqModels

REPO = Path(__file__).resolve().parents[3]
BODY = ("Mình muốn có một trang ghi chú nhanh: gõ một ghi chú ngắn, bấm Lưu thì ghi chú hiện trong danh sách bên dưới, "
        "và tải lại trang vẫn còn. Chỉ cần thêm và xem, chưa cần sửa hay xoá.\n[Trang: Trường CNTT] /school.html?domain=it")
REQUEST = {"id": "r1", "domain": "it", "type": "other", "subject": "Trang ghi chú nhanh", "body": BODY,
           "requester_role": "teacher", "complexity_by_server": True}
CTX = "server/contexts/teacher"
PAGE = "public/ghi-chu-nhanh.html"
PLAN = {"summary_vi": "Trang ghi chú nhanh, ghi chú lưu theo tài khoản.", "capabilities": [],
        "acceptance": ["curl -s localhost:8041/api/teacher/quick-notes | grep -q items"],
        "subtasks": [
            {"title": "Migration bảng ghi chú", "file": f"{CTX}/migrations/001-quick-notes.sql",
             "verify": "psql \"$DATABASE_URL\" -c 'select 1 from quick_notes'", "size": "small", "layer": "db", "depends_on": []},
            {"title": "Route ghi chú", "file": f"{CTX}/quick-notes.js",
             "verify": "curl -s localhost:8041/api/teacher/quick-notes | grep -q items", "size": "large", "layer": "backend",
             "depends_on": [1]},
            {"title": "Mount route", "file": f"{CTX}/index.js", "verify": f"grep -q quick-notes {CTX}/index.js",
             "size": "small", "layer": "wiring", "depends_on": [2]},
            {"title": "Module trang", "file": "public/js/features/ghi-chu-nhanh/index.js",
             "verify": f"grep -q features/ghi-chu-nhanh {PAGE}", "size": "large", "layer": "frontend", "depends_on": [3]},
            {"title": "Trang ghi chú", "file": PAGE, "verify": "curl -s localhost:8041/ghi-chu-nhanh.html | grep -q '<h1>'",
             "size": "small", "layer": "frontend", "depends_on": [4]}]}


def _sha():
    return subprocess.run(["git", "rev-parse", "HEAD"], cwd=REPO, check=True, capture_output=True, text=True).stdout.strip()


@pytest.fixture
def fullstack(monkeypatch):
    for name in ("REQUESTER_FULLSTACK_DB", "DB_CHECK", "GATE1_UNIFIED_VERIFY"):
        monkeypatch.setenv(f"AI_BOARD_{name}", "1")
    monkeypatch.setattr(react_plan, "exploration_enabled", lambda: False)


LINE = "// Teacher Team Quest + Class Leaderboard (Classcraft-style)"
WIRED = {"step_id": 1, "file": f"{CTX}/index.js", "lines": "1-3"}


def _ledger(drop=(), wiring=True, rejected=True):
    """One decision per planned file: the mount edits an existing file, the other four are new and wired through the context index."""
    out = [{"decision": "choose_file", "target": f"{CTX}/index.js", "evidence": [WIRED], "rejected": []}]
    for task in PLAN["subtasks"]:
        if task["file"] != f"{CTX}/index.js" and task["file"] not in drop:
            out.append({"decision": "new_file", "target": task["file"], "evidence": [WIRED if wiring else {"step_id": 2, "tool_output_excerpt": "file khớp từ khoá"}],
                        "rejected": [{"target": "public/school.html", "reason": "school page is the origin, not a notes page"}] if rejected else []})
    return out


def _ledger_replies(**kw):
    """With model_first the plan comes from the react loop and carries a decision ledger."""
    plan = {**PLAN, "subtasks": [{**t, "quotes": [LINE]} for t in PLAN["subtasks"]], "decisions": _ledger(**kw)}
    reads = [{"tool": "read_file", "arguments": {"file": f"{CTX}/index.js"}}, {"tool": "grep", "arguments": {"words": ["Teacher"], "path": CTX}}]
    return reads + [{"tool": "finish", "arguments": {"plan": plan}}] * 6


def _gate1(request=REQUEST, replies=None):
    deps = deps_with(_SeqModels(replies or (_ledger_replies() if os.environ.get("AI_BOARD_MODEL_FIRST") else [PLAN, PLAN])))
    out = brainstorm.run(request, deps, Budget(max_wall_clock_s=999), source=str(REPO), sha=_sha())
    return out, deps.models.calls[0]["prompt"]


def test_flag_defaults_off():
    assert Settings().model_first is False


def test_flag_off_unquoted_page_request_is_refused_and_prompt_unchanged(fullstack, monkeypatch):
    monkeypatch.delenv("AI_BOARD_MODEL_FIRST", raising=False)
    out, prompt = _gate1()
    assert out["blocked"] and "không tạo trang mới" in out["reason"]
    assert "FEATURE REQUESTS" not in prompt and "_ai-generated/<domain>/<skill>/index.js: server plugin" in prompt


def test_flag_on_gate1_and_gate25_accept_page_context_migration(fullstack, monkeypatch):
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")
    out, prompt = _gate1()
    assert not out["blocked"], out["reason"]
    assert "FEATURE REQUESTS" in prompt and "ORACLE HINT" not in prompt
    contexts = prompt.split("EDITABLE CONTEXTS: ", 1)[1].splitlines()[0].split(", ")
    assert "teacher" in contexts and not {"identity", "payment", "admin", "security"} & set(contexts)
    assert not any(c.startswith(("_", "ai-board")) for c in contexts)
    assert "a new context directory and server/contexts/_ai-generated/ are not mounted" in prompt

    plan = out["plan"]
    grounding = [{"target": t["file"], "file": t["file"], "quote": "export const plugin = {" if t["file"] == f"{CTX}/index.js" else "",
                  "before": "a", "after": "b", "verify": "c"} for t in plan["subtasks"]]
    validation = {"clear": True, "question": None, "grounded": True, "reason": "", "grounding": grounding, "objection": None}
    state = {"plan": plan, "checkout_source": str(REPO), "base_sha": _sha()}
    out25 = plan_validate.run({**REQUEST, "grounding_required": True}, deps_with(FakeModels(plan, validation=validation)),
                              Budget(max_wall_clock_s=999), state)
    assert not out25["blocked"], out25["reason"]


@pytest.mark.skipif(shutil.which("node") is None, reason="node not installed")
def test_flag_on_server_policy_accepts_canonical_plan(fullstack, monkeypatch):
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")
    out, _ = _gate1()
    env = {**os.environ, "AI_BOARD_REQUESTER_FULLSTACK_DB": "1"}
    script = ("const { CAPABILITY_CATALOG, validatePlan } = await import('./server/ai-board/security/policy.js');"
              "const plan = process.argv[1] ? JSON.parse(process.argv[1]) : null;"
              "if (!plan) { console.log(JSON.stringify(CAPABILITY_CATALOG.capabilities)); }"
              "else { const r = validatePlan(plan, plan.domain); console.log(JSON.stringify(r.stepTiers)); }")
    node = lambda *args: subprocess.run(["node", "--input-type=module", "-e", script, *args], cwd=REPO, env=env,
                                        check=True, capture_output=True, text=True, encoding="utf-8").stdout
    sys.path.insert(0, str(REPO / "ai-board"))
    from worker_planner import HarnessPlanner
    canon = HarnessPlanner._canonical(REQUEST, out["plan"], None, json.loads(node("")))
    assert [(s["capability"], s["layer"]) for s in canon["steps"]] == [
        ("context.write", "db"), ("context.write", "backend"), ("context.write", "wiring"),
        ("public.ui", "frontend"), ("public.ui", "frontend")]
    assert json.loads(node(json.dumps(canon, ensure_ascii=False))) == ["surface"] * 5


def test_flag_on_anchored_edit_request_still_refuses_new_page(fullstack, monkeypatch):
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")
    quoted = {**REQUEST, "body": 'Đổi chữ "Trường" trên trang thành "Khoa".'}
    assert best_match.literal_homes(quoted, str(REPO), _sha())["Trường"], "fixture literal must exist in the repo"
    assert not best_match.unanchored_feature(quoted, {PAGE, f"{CTX}/quick-notes.js"}, str(REPO), _sha())
    assert best_match.new_page_refusal(quoted, {PAGE, f"{CTX}/quick-notes.js"}, str(REPO), _sha())
    assert best_match.new_page_refusal(REQUEST, {PAGE}, str(REPO), _sha()), "a lone new page is still an edit-request refusal"


def test_new_paths_widen_only_with_the_flag(fullstack, monkeypatch):
    style, nested = "public/css/ghi-chu-nhanh.css", f"{CTX}/notes/routes.js"
    monkeypatch.delenv("AI_BOARD_MODEL_FIRST", raising=False)
    assert not brainstorm.new_path_ok(style) and not brainstorm.new_path_ok(nested, "teacher")
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")
    assert brainstorm.new_path_ok(style) and brainstorm.new_path_ok(nested, "teacher")
    for refused in ("server/contexts/identity/notes/x.js", "server/contexts/_ai-board/x/y.js", "public/Bad Name.css"):
        assert not brainstorm.new_path_ok(refused, "teacher"), refused
    plan = {"subtasks": [{"title": "t", "file": "server/contexts/ghi-chu/notes/routes.js", "verify": "node --test", "size": "small"}]}
    with pytest.raises(ValueError, match="không có trong repo"):
        brainstorm.check_files(plan, str(REPO), _sha(), role="teacher")


def test_realistic_request_every_file_choice_carries_valid_evidence(fullstack, monkeypatch):
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")
    assert not react_plan.warranted(REQUEST, {}), "the old trigger (quoted text, two paths) would not have explored"
    out, _ = _gate1()
    assert not out["blocked"], out["reason"]
    assert {d["target"] for d in out["ledger"]["decisions"]} == {t["file"] for t in out["plan"]["subtasks"]}
    assert out["ledger"]["signals"]["repair_rounds"] == 0 and "decisions" not in out["plan"]


@pytest.mark.parametrize("kw,why", [({"drop": (PAGE,)}, "chưa có quyết định"), ({"wiring": False}, "bằng chứng nối"),
                                    ({"rejected": False}, "file có sẵn trong rejected")])
def test_gate1_refuses_a_plan_whose_choices_lack_evidence(fullstack, monkeypatch, kw, why):
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")
    out, _ = _gate1(replies=_ledger_replies(**kw))
    assert out["blocked"] and why in out["reason"] and "failure_class" not in out


def test_evidenced_new_file_overrides_the_new_page_refusal(fullstack, monkeypatch):
    quoted = {**REQUEST, "body": 'Đổi chữ "Trường" trên trang thành "Khoa".'}
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")
    ctx = best_match.literal_homes(quoted, str(REPO), _sha())["Trường"]
    assert best_match.new_page_refusal(quoted, {PAGE, f"{CTX}/quick-notes.js"}, str(REPO), _sha())
    ledger = _ledger()
    ledger += [{"decision": "skip_alternative", "target": home, "evidence": [WIRED], "rejected": []} for home in ctx]
    plan = {**PLAN, "subtasks": [{**t, "quotes": [LINE]} for t in PLAN["subtasks"]], "decisions": ledger}
    replies = _ledger_replies()[:2] + [{"tool": "finish", "arguments": {"plan": plan}}]
    out, _ = _gate1(request=quoted, replies=replies)
    assert not out["blocked"], out["reason"]
    assert any(PAGE in note for note in out["ledger_overrides"])


def test_flag_off_has_no_ledger_keys(fullstack, monkeypatch):
    monkeypatch.delenv("AI_BOARD_MODEL_FIRST", raising=False)
    out, _ = _gate1(request={**REQUEST, "type": "feature"})
    assert "ledger" not in out and "ledger_overrides" not in out


def test_gate25_keeps_an_evidenced_choice_and_refuses_the_same_plan_without_it(fullstack, monkeypatch):
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")
    quoted = {**REQUEST, "body": 'Đổi chữ "Trường" trên trang thành "Khoa".', "grounding_required": True}
    homes = best_match.literal_homes(quoted, str(REPO), _sha())["Trường"]
    ledger = _ledger() + [{"decision": "skip_alternative", "target": home, "evidence": [WIRED], "rejected": []} for home in homes]
    grounding = [{"target": t["file"], "file": t["file"], "quote": "export const plugin = {" if t["file"] == f"{CTX}/index.js" else "",
                  "before": "a", "after": "b", "verify": "c"} for t in PLAN["subtasks"]]
    validation = {"clear": True, "question": None, "grounded": True, "reason": "", "grounding": grounding, "objection": None}

    def run(state):
        return plan_validate.run(quoted, deps_with(FakeModels(PLAN, validation=validation)), Budget(max_wall_clock_s=999),
                                 {"plan": PLAN, "checkout_source": str(REPO), "base_sha": _sha(), **state})

    kept = run({"ledger": ledger, "best_match": homes[0]})
    assert not kept["blocked"], kept["reason"]
    assert run({})["blocked"]
