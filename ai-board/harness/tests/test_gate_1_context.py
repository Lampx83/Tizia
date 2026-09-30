"""Cổng 1 dùng context: màu chữ trên trang → file CSS trang liên kết; file bịa → hỏi lại 1 lần."""
from budget import Budget
from conftest import deps_with
import context
from gates import brainstorm, plan_validate
from test_code_index import _SeqModels, repo  # noqa: F401 — repo là fixture


def test_requester_eta_context_names_existing_renderer_without_user_file_hint():
    from pathlib import Path
    source = Path(__file__).resolve().parents[3]
    request = {"subject": "Bổ sung giải thích thời gian chờ khi worker chưa sẵn sàng",
               "body": "[Trang: Trường CNTT] /school.html?domain=it\nỞ tab Của bạn, thêm câu sau chưa thể ước tính. Worker busy/ready vẫn có ETA."}
    result = context.build_context(1, request, None, source, "HEAD")
    assert "public/js/suggestion-fab.js" in result["targets"]
    assert "chưa thể ước tính" in result["text"]


# ── cổng 1: context vào prompt, màu chữ → file CSS trang liên kết ───────────

COLOUR_REQUEST = {"id": "req-1", "domain": "primary", "type": "other", "votes": 1,
                  "subject": "Đổi màu chữ trên trang school.html thành xanh dương", "body": "", "thread": []}


def _plan(file):
    return {"summary_vi": "Đổi màu chữ tiêu đề sang xanh dương.", "capabilities": [],
            "subtasks": [{"title": "Đổi color của .big thành #2563eb", "file": file,
                          "verify": f"rule .big trong {file} có color: #2563eb", "size": "small"}]}


def test_gate1_colour_request_resolves_to_linked_css(repo):
    src, sha = repo
    models = _SeqModels([_plan("public/css/school.css")])
    out = brainstorm.run(COLOUR_REQUEST, deps_with(models), Budget(max_wall_clock_s=999), source=src, sha=sha)
    assert out["blocked"] is False and out["skill"] == "edit-css-style"
    assert out["plan"]["subtasks"][0]["file"] == "public/css/school.css"
    prompt = models.calls[0]["prompt"]
    assert "css liên kết: public/css/school.css" in prompt          # trang → CSS liên kết
    assert "public/css/school.css [css" in prompt and ".big" in prompt  # selector của CSS đó
    assert "SKILL: edit-css-style" in prompt
    assert prompt.index("REQUEST\n<<<") > prompt.index("REPO DATA")    # dữ liệu request bọc delimiter


def test_gate1_nonexistent_file_gets_one_retry(repo):
    src, sha = repo
    models = _SeqModels([_plan("public/css/khong-co.css"), _plan("public/css/school.css")])
    budget = Budget(max_wall_clock_s=999)
    out = brainstorm.run(COLOUR_REQUEST, deps_with(models), budget, source=src, sha=sha)
    assert out["blocked"] is False and budget.model_calls == 2
    assert "public/css/khong-co.css" in models.calls[1]["prompt"].rsplit("REJECTED", 1)[1]


def test_gate1_blocks_after_second_bad_plan_and_allows_new_page(repo):
    src, sha = repo
    bad = _plan("public/css/khong-co.css")
    out = brainstorm.run(COLOUR_REQUEST, deps_with(_SeqModels([bad, bad])), Budget(max_wall_clock_s=999),
                         source=src, sha=sha)
    assert out["blocked"] is True and "khong-co.css" in out["reason"]
    ok = brainstorm.run(COLOUR_REQUEST, deps_with(_SeqModels([_plan("./public/meo-hoc.html")])),
                        Budget(max_wall_clock_s=999), source=src, sha=sha)
    assert ok["blocked"] is False and ok["plan"]["subtasks"][0]["file"] == "public/meo-hoc.html"


def test_gate1_and_2_5_prompts_start_with_aiboard_manual_and_fixed_prefix():
    a = brainstorm.build_prompt({"subject": "a"}, frozenset({"features"}), "CTX-A")
    b = brainstorm.build_prompt({"subject": "b"}, frozenset({"features"}), "CTX-B")
    assert a.startswith(context.manual()) and context.manual().startswith("# AIBOARD.md")
    assert a.split("CTX-A")[0] == b.split("CTX-B")[0]              # mọi thứ trước context giống hệt
    assert plan_validate.build_prompt({"subject": "x"}, {"subtasks": []}).startswith(context.manual())
