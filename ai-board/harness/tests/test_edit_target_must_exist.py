"""An edit request must change the page that exists, not create a new public page; added text never locates the target."""
import pytest

import tools
from conftest import FakeModels, deps_with
from gates import brainstorm, plan_validate, react_plan
from runtime.budget import Budget
from services import context
from test_code_index import _SeqModels, _commit, _git
from test_repomap import _real_matching

pytestmark = pytest.mark.usefixtures('high_target_confidence')


@pytest.fixture(autouse=True)
def _one_shot_planner(monkeypatch):
    monkeypatch.setattr(react_plan, "exploration_enabled", lambda: False)

HOME, OTHER, INVENTED = "public/vuon-thu.html", "public/bang-xep-hang.html", "public/vuon.html"
LITERAL = "🌲 Rừng Kiến Thức"
EDIT = {"id": "req-1", "domain": "it", "type": "other", "votes": 1, "thread": [], "complexity_by_server": True,
        "subject": f"Đổi chữ liên kết '{LITERAL}' thành 'Quay về'", "body": f"Đổi chữ liên kết '{LITERAL}' thành 'Quay về'"}


def _repo(tmp_path):
    src = tmp_path / "src"
    src.mkdir()
    _git(src, "init", "-q")
    _git(src, "config", "user.email", "t@t")
    _git(src, "config", "user.name", "t")
    _commit(src, {HOME: f'<h1>Vườn thú</h1>\n<a class="back" href="/rung.html">{LITERAL}</a>\n',
                  OTHER: f'<h1>Bảng xếp hạng</h1>\n<a href="/rung.html">{LITERAL}</a>\n'})
    return src


def _plan(file):
    return {"summary_vi": "Đổi chữ liên kết.", "capabilities": [],
            "subtasks": [{"title": "Đổi chữ liên kết quay về", "file": file, "verify": f"{file} có chữ Quay về", "size": "small"}]}


def _gate1(tmp_path, plans, request=EDIT):
    models = _SeqModels(plans)
    out = brainstorm.run(request, deps_with(models), Budget(max_wall_clock_s=999), source=_repo(tmp_path), sha="HEAD")
    return out, models


def test_gate1_sends_back_an_edit_plan_that_invents_a_page_and_names_the_pages_holding_the_quote(tmp_path):
    out, models = _gate1(tmp_path, [_plan(INVENTED), _plan(HOME)])
    assert out["blocked"] is False and out["plan"]["subtasks"][0]["file"] == HOME and len(models.calls) == 2
    feedback = models.calls[1]["prompt"].rsplit("REJECTED", 1)[1]
    assert INVENTED in feedback and HOME in feedback and OTHER in feedback


def test_gate1_blocks_an_edit_request_that_keeps_inventing_a_page(tmp_path):
    out, models = _gate1(tmp_path, [_plan(INVENTED)] * 2)
    assert out["blocked"] and INVENTED in out["reason"] and len(models.calls) == 2


@pytest.mark.parametrize("request_", [
    {**EDIT, "type": "feature"},
    {**EDIT, "body": EDIT["body"] + f" trong trang mới {INVENTED}"},
    {**EDIT, "subject": "Tạo trang mới cho vườn thú", "body": f"Tạo một trang mới có liên kết '{LITERAL}'"},
    {**EDIT, "subject": "Create a new page for the zoo", "body": "New page with a back link"},
])
def test_gate1_lets_a_request_that_asks_for_the_page_add_it(tmp_path, request_):
    out, models = _gate1(tmp_path, [_plan(INVENTED)], request_)
    assert out["blocked"] is False and out["plan"]["subtasks"][0]["file"] == INVENTED and len(models.calls) == 1


def test_gate25_blocks_an_edit_plan_that_adds_a_page(tmp_path):
    src = _repo(tmp_path)
    plan = _plan(INVENTED)
    validation = {"clear": True, "question": None, "grounded": True, "grounding": [
        {"target": INVENTED, "file": INVENTED, "quote": "", "before": "chưa có", "after": "Quay về", "verify": "có chữ"}]}
    state = {"plan": plan, "checkout_source": str(src), "source_targets": [HOME]}
    out = plan_validate.run({**EDIT, "grounding_required": True}, deps_with(FakeModels(plan, validation=validation)), Budget(), state)
    assert out["blocked"] and INVENTED in " ".join(out["signals"])
    feature = {**EDIT, "type": "feature", "grounding_required": True}
    assert not plan_validate.run(feature, deps_with(FakeModels(plan, validation=validation)), Budget(),
                                 {"plan": plan, "checkout_source": str(src), "source_targets": [HOME]})["blocked"]


def test_text_an_add_request_puts_after_its_colon_does_not_pick_the_best_match(tmp_path, monkeypatch):
    monkeypatch.setattr(tools, "matching_files", _real_matching)
    src = tmp_path / "src"
    src.mkdir()
    _git(src, "init", "-q")
    _git(src, "config", "user.email", "t@t")
    _git(src, "config", "user.name", "t")
    _commit(src, {"public/do-vui.html": "<h2>Đố vui động vật</h2>\n<p class='q'>Câu hỏi 1</p>\n",
                  "public/nha-bep.html": "<h2>Chọn công thức nấu canh</h2>\n<p>Công thức nấu canh chua ngon</p>\n"})
    subject = "Thêm dòng mới ngay dưới câu hỏi trong phần đố vui động vật: Công thức nấu canh chua."
    ctx = context.build_context(1, {"subject": subject, "body": subject, "type": "other"}, None, src, "HEAD")
    assert ctx["best_match"] != "public/nha-bep.html"
