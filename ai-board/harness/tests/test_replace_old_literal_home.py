"""A replace request edits the file holding the old text; gate 4 requires only the new sides, not quoted keep-as-is text."""
import dataclasses

import pytest

from conftest import FakeModels, deps_with
from gates import best_match, brainstorm, plan_validate, react_plan, static_check
from runtime import meter
from runtime.budget import Budget
from test_code_index import _SeqModels, _commit, _git

pytestmark = pytest.mark.usefixtures('high_target_confidence')

HOME, CATALOG, THIRD = "public/vuon-hoa.html", "public/khu-vuc.html", "public/gioi-thieu.html"
OLD, NEW, KEEP = "🌲 Rừng Chữ", "Ôn bài mỗi ngày.", "↩ Trang chủ"
REPLACE = {"id": "req-1", "domain": "it", "type": "other", "votes": 1, "thread": [], "complexity_by_server": True,
           "subject": f"Đổi chữ liên kết '{OLD}' thành '{NEW}'",
           "body": f"Trang vườn hoa có hai liên kết ở đầu trang, em muốn cái thứ hai ('{OLD}') đổi chữ thành '{NEW}', "
                   f"cái '{KEEP}' để nguyên ạ."}
INSERT = {**REPLACE, "subject": f"Thêm liên kết '{OLD}' vào trang giới thiệu", "body": f"Thêm liên kết '{OLD}' vào trang giới thiệu"}


@pytest.fixture(autouse=True)
def _one_shot_planner(monkeypatch):
    monkeypatch.setattr(react_plan, "exploration_enabled", lambda: False)


def _repo(tmp_path):
    src = tmp_path / "src"
    src.mkdir()
    _git(src, "init", "-q")
    _git(src, "config", "user.email", "t@t")
    _git(src, "config", "user.name", "t")
    _commit(src, {HOME: f'<a class="back" href="/">{KEEP}</a>\n<a class="back" href="/rung.html">{OLD}</a>\n',
                  CATALOG: "const AREAS = [{ic:'🌲', name:'Rừng Chữ'}];\n",
                  THIRD: "<h1>Giới thiệu nhà trường</h1>\n"})
    return src


def _plan(file):
    return {"summary_vi": "Đổi chữ liên kết.", "capabilities": [],
            "subtasks": [{"title": "Đổi chữ liên kết", "file": file, "verify": f"{file} có chữ mới", "size": "small"}]}


def _gate25(tmp_path, request, file, quote):
    plan = _plan(file)
    validation = {"clear": True, "question": None, "grounded": True, "grounding": [
        {"target": file, "file": file, "quote": quote, "before": "a", "after": "b", "verify": "c"}]}
    tracer, batches = meter.Tracer(None), []
    tracer.begin(2.5, batches.append)
    deps = dataclasses.replace(deps_with(FakeModels(plan, validation=validation)), trace=tracer)
    out = plan_validate.run({**request, "grounding_required": True}, deps, Budget(), {"plan": plan, "checkout_source": str(_repo(tmp_path))})
    tracer.flush()
    return out, {e["check"]: e for e in batches[0][0]["evaluation"]}


def test_refusal_names_the_file_holding_the_old_text(tmp_path):
    src = _repo(tmp_path)
    reason = best_match.old_literal_refusal(REPLACE, {CATALOG}, src, "HEAD")
    assert OLD in reason and HOME in reason
    assert best_match.old_literal_refusal(REPLACE, {HOME}, src, "HEAD") == ""
    assert best_match.old_literal_refusal(INSERT, {THIRD}, src, "HEAD") == ""
    assert best_match.old_literal_refusal({**REPLACE, "type": "feature"}, {CATALOG}, src, "HEAD") == ""
    missing = {**REPLACE, "subject": "Đổi chữ 'Không có ở đâu' thành 'Mới'", "body": ""}
    assert best_match.old_literal_refusal(missing, {CATALOG}, src, "HEAD") == ""


def test_gate25_refuses_a_replace_plan_that_edits_a_file_without_the_old_text(tmp_path):
    out, _ = _gate25(tmp_path, REPLACE, CATALOG, "const AREAS = [{ic:'🌲', name:'Rừng Chữ'}];")
    assert out["blocked"] and out["reason"] == "plan_ungrounded"
    assert OLD in out["signals"][0] and HOME in out["signals"][0]


def test_gate25_allows_a_replace_plan_that_edits_the_old_text_home(tmp_path):
    out, _ = _gate25(tmp_path, REPLACE, HOME, f'<a class="back" href="/rung.html">{OLD}</a>')
    assert not out["blocked"]


def test_gate25_only_traces_an_insert_quote_found_elsewhere(tmp_path):
    out, checks = _gate25(tmp_path, INSERT, THIRD, "<h1>Giới thiệu nhà trường</h1>")
    assert not out["blocked"]
    assert checks["quoted text elsewhere"]["ok"] is False and HOME in checks["quoted text elsewhere"]["detail"]


def test_gate1_sends_back_a_replace_plan_on_the_wrong_file(tmp_path):
    models = _SeqModels([_plan(CATALOG), _plan(HOME)])
    out = brainstorm.run(REPLACE, deps_with(models), Budget(max_wall_clock_s=999), source=_repo(tmp_path), sha="HEAD")
    assert out["blocked"] is False and out["plan"]["subtasks"][0]["file"] == HOME and len(models.calls) == 2
    assert HOME in models.calls[1]["prompt"].rsplit("REJECTED", 1)[1]


def _diff(*hunk):
    return f"diff --git a/{HOME} b/{HOME}\n--- a/{HOME}\n+++ b/{HOME}\n@@ -1,2 +1,2 @@\n" + "".join(f"{line}\n" for line in hunk)


def _misses(request, text, checkout=None, **state):
    return static_check.literal_misses({"request_title": request["subject"], "request_detail": request["body"], **state}, text, checkout)


def test_keep_literal_is_a_reference_and_only_the_new_text_must_be_added():
    keep = f' <a class="back" href="/">{KEEP}</a>'
    assert _misses(REPLACE, _diff(keep, f'-<a class="back" href="/rung.html">{OLD}</a>', f'+<a class="back" href="/rung.html">{NEW}</a>')) == []
    found = _misses(REPLACE, _diff(keep, f'-<a class="back" href="/rung.html">{OLD}</a>',
                                   f'+<a class="back" href="/rung.html">{NEW.rstrip(".")}</a>'))
    assert len(found) == 1 and NEW in found[0] and KEEP not in found[0]


def test_quote_already_in_the_base_tree_is_a_reference_for_a_non_replace_request(tmp_path):
    src = _repo(tmp_path)
    request = {"subject": f"Hiển thị '{KEEP}' ở trang giới thiệu", "body": ""}
    text = (f"diff --git a/{THIRD} b/{THIRD}\n--- a/{THIRD}\n+++ b/{THIRD}\n@@ -1 +1,2 @@\n"
            f" <h1>Giới thiệu nhà trường</h1>\n+<a href=\"/\">Về đầu</a>\n")
    assert _misses(request, text, src, base_sha="HEAD") == []
    assert _misses(request, text, src) and _misses({**request, "subject": "Hiển thị 'Chưa có ở đâu' ở trang giới thiệu"},
                                                   text, src, base_sha="HEAD")
