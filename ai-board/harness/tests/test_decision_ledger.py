"""Sổ quyết định (cờ model_first): kiểm bằng chứng tất định, trả model làm lại, hết vòng = lỗi thường. Model fake."""
import hashlib
import json
import subprocess
from types import SimpleNamespace

import pytest

from runtime.budgets.budget import Budget
from gates import brainstorm, decision_ledger, react_plan

PAGE = '<main>\n  <button id="go">Bắt đầu</button>\n</main>\n'
QUOTE = '<button id="go">Bắt đầu</button>'
OFF_DUMP_SHA = "7e4e5d6813b48e20d830f6b8a8c7063508d1e197a861568026bb516a26415c7c"  # sha256 of the flag-off dump taken on dev before the ledger existed


@pytest.fixture
def repo(tmp_path):
    (tmp_path / "public").mkdir()
    (tmp_path / "public" / "a.html").write_text(PAGE, encoding="utf-8")
    git = ["git", "-C", str(tmp_path), "-c", "user.email=t@t", "-c", "user.name=t"]
    subprocess.run(["git", "-C", str(tmp_path), "init", "-q"], check=True)
    subprocess.run(git + ["add", "-A"], check=True)
    subprocess.run(git + ["commit", "-qm", "base"], check=True)
    sha = subprocess.run(["git", "-C", str(tmp_path), "rev-parse", "HEAD"], check=True, capture_output=True, text=True).stdout.strip()
    return tmp_path, sha


@pytest.fixture(autouse=True)
def react_on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_REACT_PLAN", "1")


class Scripted:
    def __init__(self, *replies):
        self.replies, self.prompts = list(replies), []
        self.models = SimpleNamespace(gate1_model="fake-gate1")
        self.trace = None

    def call_model(self, model, prompt, *, gate, budget, **kwargs):
        self.prompts.append(prompt)
        text = self.replies[min(len(self.prompts) - 1, len(self.replies) - 1)]
        return {"response": text if isinstance(text, str) else json.dumps(text, ensure_ascii=False)}


READ = {"tool": "read_file", "arguments": {"file": "public/a.html"}}


def finish(decisions=None, quotes=(QUOTE,)):
    plan = {"summary_vi": "Sửa chữ nút.", "capabilities": [],
            "subtasks": [{"title": "Đổi chữ", "file": "public/a.html", "verify": "có Bắt đầu", "size": "small", "quotes": list(quotes)}]}
    if decisions is not None:
        plan["decisions"] = decisions
    return {"tool": "finish", "arguments": {"plan": plan}}


def decision(evidence, kind="choose_file", rejected=()):
    return {"decision": kind, "target": "public/a.html", "evidence": evidence, "rejected": list(rejected)}


GOOD = decision([{"step_id": 1, "file": "public/a.html", "lines": "2-2"}])
BAD = decision([{"step_id": 7, "file": "public/a.html", "lines": "1-2"}])


def run(deps, repo, **kw):
    root, sha = repo
    return react_plan.run("P", deps, Budget(max_wall_clock_s=999), model="m", source=root, sha=sha, **kw)


def log_with_read(repo):
    from tools.readonly import ReadOnlyTools
    root, sha = repo
    log = decision_ledger.StepLog()
    log.add(1, "read_file", READ["arguments"], ReadOnlyTools(root, sha).run("read_file", READ["arguments"]))
    return log


@pytest.mark.parametrize("item,ok", [
    ({"step_id": 1, "file": "public/a.html", "lines": "1-3"}, True),
    ({"step_id": 1, "file": "public/a.html", "lines": [2, 2]}, True),
    ({"step_id": 1, "tool_output_excerpt": QUOTE}, True),
    ({"step_id": 1, "tool_output_excerpt": f"L2|   {QUOTE}"}, True),
    ({"step_id": 9, "file": "public/a.html", "lines": "1-3"}, False),
    ({"step_id": 1, "file": "public/a.html", "lines": "1-9"}, False),
    ({"step_id": 1, "file": "public/other.html", "lines": "1-3"}, False),
    ({"step_id": 1, "tool_output_excerpt": "<button>Khác</button>"}, False),
    ({"step_id": 1, "tool_output_excerpt": "  "}, False),
    ({"step_id": 1, "file": "public/a.html", "lines": "3-1"}, False),
    ({"step_id": 1, "file": "public/a.html"}, False),
    ({"step_id": True, "file": "public/a.html", "lines": "1-3"}, False),
    ("a.html:1", False),
])
def test_check_evidence(repo, item, ok):
    assert (decision_ledger.check_evidence(item, log_with_read(repo)) is None) is ok


def test_outline_step_gives_no_line_range():
    log = decision_ledger.StepLog()
    log.add(1, "outline", {"file": "public/a.html"}, "public/a.html: main")
    assert "ngoài khoảng" in decision_ledger.check_evidence({"step_id": 1, "file": "public/a.html", "lines": "1-1"}, log)
    assert decision_ledger.check_evidence({"step_id": 1, "tool_output_excerpt": "main"}, log) is None


def test_pop_caps_and_kinds(repo):
    log = log_with_read(repo)
    ev = {"step_id": 1, "file": "public/a.html", "lines": "1-1"}
    for bad in (decision([ev] * 4), decision([ev], rejected=[{"target": "a", "reason": "r"}] * 3), decision([]),
                decision([ev], kind="guess"), {**GOOD, "target": ""}):
        with pytest.raises(ValueError):
            decision_ledger.pop({"decisions": [bad]}, log)
    with pytest.raises(ValueError, match="thiếu decisions"):
        decision_ledger.pop({}, log)
    plan = {"decisions": [decision([ev] * 3, rejected=[{"target": "a", "reason": "r"}] * 2)]}
    assert len(decision_ledger.pop(plan, log)) == 1 and "decisions" not in plan


def test_confidence_comes_from_signals_only():
    assert decision_ledger.confidence(evidence_valid=False, repair_rounds=0)["level"] == "low"
    assert decision_ledger.confidence(evidence_valid=True, repair_rounds=0, checks_passed=True, reviewer_agrees=True)["level"] == "high"
    assert decision_ledger.confidence(evidence_valid=True, repair_rounds=1, checks_passed=True, reviewer_agrees=True)["level"] == "medium"
    assert decision_ledger.confidence(evidence_valid=True, repair_rounds=0, reviewer_agrees=False)["level"] == "low"


def test_valid_ledger_is_accepted_and_returned(repo):
    deps = Scripted(READ, finish([GOOD]))
    out = run(deps, repo, ledger=True)
    assert out["ledger"]["decisions"][0]["target"] == "public/a.html" and out["ledger"]["signals"]["repair_rounds"] == 0
    assert "decisions" not in json.loads(out["response"])
    assert "DECISION LEDGER" in deps.prompts[0] and "STEP 1 read_file" in deps.prompts[1]


def test_invalid_evidence_goes_back_to_the_model_then_passes(repo):
    far = decision([{"step_id": 1, "file": "public/a.html", "lines": "1-40"}])
    deps = Scripted(READ, finish([BAD]), finish([far]), finish([GOOD]))
    out = run(deps, repo, ledger=True)
    assert "step_id 7" in deps.prompts[2] and "ngoài khoảng đã đọc" in deps.prompts[3]
    assert out["ledger"]["signals"]["repair_rounds"] == 2 and out["ledger"]["signals"]["level"] == "medium"


def test_still_invalid_at_loop_end_raises_ordinary_failure(repo):
    deps = Scripted(READ, finish([BAD]))
    with pytest.raises(decision_ledger.LedgerInvalid, match="step_id 7"):
        run(deps, repo, ledger=True)


def test_missing_ledger_is_returned_to_the_model(repo):
    deps = Scripted(READ, finish(None), finish([GOOD]))
    assert run(deps, repo, ledger=True)["ledger"]["decisions"]
    assert "thiếu decisions" in deps.prompts[2]


def test_gate1_blocks_as_ordinary_when_ledger_never_valid(repo, request_item, monkeypatch):
    root, sha = repo
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")
    deps = Scripted(READ, finish([BAD]))
    out = brainstorm.run(request_item, deps, Budget(max_wall_clock_s=999), source=root, sha=sha)
    assert out["blocked"] is True and out["reason"].startswith("sổ quyết định không hợp lệ")
    assert "failure_class" not in out


def test_flag_off_react_loop_is_byte_identical(repo):
    deps = Scripted(READ, finish(None))
    out = run(deps, repo)
    dump = json.dumps({"prompts": deps.prompts, "out": out}, ensure_ascii=False, sort_keys=True)
    assert "ledger" not in out and "DECISION LEDGER" not in dump and "STEP 1" not in dump
    assert hashlib.sha256(dump.encode()).hexdigest() == OFF_DUMP_SHA


def test_gate4_reviewer_sees_overridden_choices_only_when_there_are_some():
    from gates import intent_review
    base = intent_review.render("yêu cầu", None, {}, "diff", [], [])
    assert intent_review.render("yêu cầu", None, {}, "diff", [], [], choices="") == base
    note = decision_ledger.review_block({"ledger_overrides": ["plan thêm file mới x"]})
    assert "plan thêm file mới x" in intent_review.render("yêu cầu", None, {}, "diff", [], [], choices=note)
    assert decision_ledger.review_block({}) == ""


def test_coverage_needs_wired_new_file_and_a_rejected_existing_file(repo):
    log = log_with_read(repo)
    exists = lambda path: path == "public/a.html"
    plan = {"subtasks": [{"file": "public/a.html"}, {"file": "public/new.html"}]}
    wired = {"step_id": 1, "file": "public/a.html", "lines": "1-2"}
    ok = [decision([wired]), {**decision([wired], kind="new_file"), "target": "public/new.html",
                              "rejected": [{"target": "public/a.html", "reason": "other page"}]}]
    assert decision_ledger.coverage(plan, ok, log, exists) == []
    assert decision_ledger.coverage(plan, ok[:1], log, exists) == ["file public/new.html chưa có quyết định nào trong sổ"]
    log.add(2, "grep", {"words": ["x"]}, "file khớp từ khoá: public/a.html (2)")
    unwired = [ok[0], {**ok[1], "evidence": [{"step_id": 2, "tool_output_excerpt": "file khớp từ khoá"}]}]
    assert "bằng chứng nối" in " ".join(decision_ledger.coverage(plan, unwired, log, exists))
    norej = [ok[0], {**ok[1], "rejected": [{"target": "public/none.html", "reason": "r"}]}]
    assert "rejected" in " ".join(decision_ledger.coverage(plan, norej, log, exists))
    wrong = [ok[0], {**ok[1], "decision": "placement"}]
    assert "new_file" in " ".join(decision_ledger.coverage(plan, wrong, log, exists))
