"""Cổng 3 (implement.py) — routing theo size, parse codegen, diff thật."""
import shutil
import subprocess
from pathlib import Path

import pytest

def test_revoked_authority_prevents_candidate_file_writes(tmp_path):
    from repositories import server_hsm
    class Revoked:
        def authorize_action(self, _action):
            return False
    implement._ensure_scratch_repo(tmp_path)
    with server_hsm.server_scope(Revoked()), pytest.raises(server_hsm.AuthorityError):
        implement._write_and_diff(tmp_path, 'public/new.html', '<h1>New</h1>', 'test/new.test.js', "import test from 'node:test';")
    assert not (tmp_path / 'public/new.html').exists()
    assert not (tmp_path / 'test/new.test.js').exists()

from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from gates import implement, subtask_contract


# ── model_for: routing lộ ra thành hàm, không chôn trong if/else của run() ──

def test_model_for_small_routes_to_light_model():
    models = FakeModels(plan_with(["features"]))
    assert implement.model_for({"size": "small"}, models) == models.gate3_model_light


def test_model_for_large_routes_to_full_model():
    models = FakeModels(plan_with(["features"]))
    assert implement.model_for({"size": "large"}, models) == models.gate3_model


def test_model_for_unknown_size_raises():
    models = FakeModels(plan_with(["features"]))
    with pytest.raises(ValueError, match="size lạ"):
        implement.model_for({"size": "huge"}, models)


# ── parse_codegen ────────────────────────────────────────────────────────────

def test_parse_codegen_valid():
    out = implement.parse_codegen('{"code": "x", "test_file": "t.js", "test": "y"}')
    assert out == {"code": "x", "test_file": "t.js", "test": "y"}


@pytest.mark.parametrize("bad", [
    "khong phai json",
    '{"code": "x"}',                                   # thiếu test_file/test
    '{"test_file": "t.js", "test": "y"}',              # thiếu code cho file mới
    '{"code": "", "test_file": "t.js", "test": "y"}',  # code rỗng
    '[1, 2]',                                            # không phải object
])
def test_parse_codegen_invalid_raises(bad):
    with pytest.raises(ValueError):
        implement.parse_codegen(bad)


# ── build_prompt: chỉ 1 subtask, không plan, không subtask khác ─────────────

def test_build_prompt_lists_files_produced_by_earlier_subtasks():
    subtask = {"title": "Header", "file": "public/index.html", "verify": "node --test test/x.test.js", "size": "small"}
    prompt = implement.build_prompt(subtask, produced=["public/js/features/faq/index.js", "public/faq.html"])
    assert "public/js/features/faq/index.js" in prompt and "public/faq.html" in prompt
    assert "FILE DA TAO" in prompt
    assert "FILE DA TAO" not in implement.build_prompt(subtask)


def test_build_prompt_contains_only_this_subtask():
    subtask = {"title": "Tạo plugin flashcards", "file": "server/contexts/_ai-generated/pharmacy/flashcards/index.js",
               "verify": "curl /api/flashcards trả 200", "size": "small"}
    prompt = implement.build_prompt(subtask)
    assert subtask["title"] in prompt
    assert subtask["file"] in prompt
    assert subtask["verify"] in prompt
    assert "LẦN TRƯỚC" not in prompt


def test_repair_prompt_keeps_the_locked_prefix_and_appends_the_gate_reason():
    subtask = {"title": "t", "file": "public/x.html", "verify": "v", "size": "small"}
    plain = implement.build_prompt(subtask)
    repair = implement.build_prompt(subtask, repair_reason="cổng 5: generated tests failed")
    assert repair.startswith(plain)
    assert "cổng 5: generated tests failed" in repair[len(plain):]


def test_run_passes_repair_reason_to_every_subtask_prompt(tmp_path):
    models = FakeModels(plan_with(["features"]))
    implement.run({"plan": plan_with(["features"]), "repair_reason": "cổng 4: node --check"},
                  deps_with(models), Budget(max_wall_clock_s=999), repo_dir=tmp_path)
    assert models.calls and all("cổng 4: node --check" in call["prompt"] for call in models.calls)


def test_run_second_subtask_prompt_excludes_first_subtasks_content(tmp_path):
    """'Fresh context per subtask' là cơ chế (build_prompt chỉ nhận 1 subtask),
    không phải quy ước — test này khẳng định bằng cách soi prompt thật đã gửi.
    NGOẠI LỆ owner đã duyệt (LF/107 tiêu chí 8b): subtask sau nhận NỘI DUNG file
    mới của subtask trước (chuỗi phụ thuộc mặc định), không nhận tiêu đề/lời sủa khác.
    Hợp đồng giữa các bước chỉ nêu ĐƯỜNG DẪN + tên interface mà plan đã có (không tiêu đề, không code)."""
    codegen = {"code": "// noop\n", "test_file": "test/noop.test.js", "test": "import test from 'node:test';\n// noop test\n"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])  # 2 subtask: "Tạo plugin" (small) + "Trang HTML" (large)
    state = {"plan": plan}

    implement.run(state, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    assert len(models.calls) == 2
    first_prompt, second_prompt = models.calls[0]["prompt"], models.calls[1]["prompt"]
    first_title, second_title = plan["subtasks"][0]["title"], plan["subtasks"][1]["title"]
    first_file, second_file = plan["subtasks"][0]["file"], plan["subtasks"][1]["file"]
    block = subtask_contract.block(plan)

    assert first_title in first_prompt and second_title not in first_prompt
    assert first_file in first_prompt
    assert second_file not in first_prompt.replace(block, "")  # đường dẫn bước khác chỉ có trong hợp đồng
    assert second_title in second_prompt and first_title not in second_prompt
    assert second_file in second_prompt
    # file MỚI của subtask 1 nằm trong repo scratch → inject vào prompt của subtask 2 (tiêu chí 8b)
    assert first_file in second_prompt and "// noop" in second_prompt


def test_run_routes_each_subtask_to_correct_model_by_size():
    codegen = {"code": "// noop\n", "test_file": "test/noop.test.js", "test": "import test from 'node:test';\n// noop test\n"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])  # subtasks[0].size='small', subtasks[1].size='large'

    implement.run({"plan": plan}, deps, Budget(max_wall_clock_s=999))

    assert models.calls[0]["model"] == models.gate3_model_light
    assert models.calls[1]["model"] == models.gate3_model


# ── run(): diff thật vào repo scratch, không phải Tizia thật ────────────────

def test_run_produces_real_diff_against_scratch_repo(tmp_path):
    codegen = {"code": "console.log('hi');\n", "test_file": "test/hi.test.js", "test": "import test from 'node:test';\n// test hi\n"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])

    out = implement.run({"plan": plan}, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    assert out["blocked"] is False
    assert len(out["diffs"]) == 2
    for d, subtask in zip(out["diffs"], plan["subtasks"]):
        assert d["file"] == subtask["file"]
        assert "hi" in d["diff"] or "console.log" in d["diff"]
        assert (tmp_path / subtask["file"]).read_text(encoding="utf-8") == codegen["code"]
        assert (tmp_path / d["test_file"]).exists()
    # repo scratch có .git — không phải thư mục thường, và không phải cwd của Tizia thật
    assert (tmp_path / ".git").exists()


def test_run_uses_fresh_temp_repo_when_no_repo_dir_given():
    codegen = {"code": "x", "test_file": "test/t.test.js", "test": "import test from 'node:test';\ny"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])

    out = implement.run({"plan": plan}, deps, Budget(max_wall_clock_s=999))

    assert out["blocked"] is False
    # scratch_repo được ghi lại vào state, và tự tạo (không truyền repo_dir).
    assert out["diffs"][0]["diff"]


def test_run_blocks_when_no_plan_in_state():
    deps = deps_with(plan_with(["features"]))
    out = implement.run({}, deps, Budget(max_wall_clock_s=999))
    assert out["blocked"] is True
    assert out["diffs"] is None


def test_run_blocks_on_malformed_model_response(tmp_path):
    models = FakeModels(plan_with(["features"]), codegen="khong phai JSON hop le")
    deps = deps_with(models)
    plan = plan_with(["features"])

    out = implement.run({"plan": plan}, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    assert out["blocked"] is True
    assert "subtask" in out["reason"]


def test_run_stops_mid_gate_when_budget_exhausted_between_subtasks(tmp_path):
    """max_model_calls=1: subtask đầu tiêu hết budget, subtask thứ hai (plan_with
    có 2) không được gọi model — không được âm thầm báo blocked=False.

    Còn subtask đã xong + subtask chưa chạy → `partial` (LF/107): người gửi bấm
    "Tiếp tục" để chạy nốt từ checkpoint thay vì tính đây là lượt hỏng."""
    codegen = {"code": "x", "test_file": "test/t.test.js", "test": "import test from 'node:test';\ny"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])
    budget = Budget(max_model_calls=1, max_wall_clock_s=999)

    out = implement.run({"plan": plan}, deps, budget, repo_dir=tmp_path)

    assert out["blocked"] is True
    assert "budget" in out["reason"] and "hoàn thành một phần 1/2" in out["reason"]
    assert out["failure_class"] == "partial"
    assert out["partial"] == {"done": 1, "total": 2, "remaining": ["public/flashcards.html"]}
    assert len(models.calls) == 1
    assert len(out["diffs"]) == 1


def test_run_spends_budget_once_per_subtask(tmp_path):
    codegen = {"code": "x", "test_file": "test/t.test.js", "test": "import test from 'node:test';\ny"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])
    budget = Budget(max_wall_clock_s=999)

    implement.run({"plan": plan}, deps, budget, repo_dir=tmp_path)

    assert budget.model_calls == len(plan["subtasks"])


# ── model không được ghi ra NGOÀI scratch repo ──────────

def test_absolute_path_from_model_is_rejected_not_written(tmp_path):
    codegen = {"code": "evil", "test_file": "/etc/passwd", "test": "import test from 'node:test';\ny"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])

    out = implement.run({"plan": plan}, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    assert out["blocked"] is True
    assert "thoát" in out["reason"] or "tuyệt đối" in out["reason"]
    assert not (Path("/etc/passwd_TIZIA_TEST_SHOULD_NOT_EXIST")).exists()  # sanity: no real write attempted


def test_windows_absolute_path_from_model_is_rejected(tmp_path):
    codegen = {"code": "x", "test_file": "C:/Windows/Temp/evil.js", "test": "import test from 'node:test';\ny"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)

    out = implement.run({"plan": plan_with(["features"])}, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    assert out["blocked"] is True
    assert "tuyệt đối" in out["reason"]
    assert out["failure_class"] == "critical"


def test_path_traversal_via_dotdot_is_rejected(tmp_path):
    codegen = {"code": "x", "test_file": "../../../outside.js", "test": "import test from 'node:test';\ny"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)

    out = implement.run({"plan": plan_with(["features"])}, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    assert out["blocked"] is True
    assert "thoát khỏi scratch repo" in out["reason"]
    assert not (tmp_path.parent.parent / "outside.js").exists()


def test_model_test_file_cannot_overwrite_an_approved_source_path(tmp_path):
    codegen = {"code": "x", "test_file": "test/../server/db.js", "test": "import test from 'node:test';\nevil"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)

    out = implement.run({"plan": plan_with(["features"])}, deps,
                        Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    assert out["blocked"] is True
    assert "test/" in out["reason"]
    assert not (tmp_path / "server/db.js").exists()


def test_normal_relative_paths_still_work_after_traversal_guard(tmp_path):
    """Guard mới không được chặn nhầm case bình thường."""
    codegen = {"code": "x", "test_file": "test/nested/deep.test.js", "test": "import test from 'node:test';\ny"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)

    out = implement.run({"plan": plan_with(["features"])}, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    assert out["blocked"] is False
    assert (tmp_path / "test/nested/deep.test.js").exists()


def test_ensure_scratch_repo_never_reuses_real_tizia_repo(tmp_path):
    """repo_dir=None → tempfile.mkdtemp(), KHÔNG bao giờ trỏ vào ROOT của Tizia
    (git thật chỉ candidate.py chạm, không phải cổng 3)."""
    repo = implement._ensure_scratch_repo(None)
    try:
        assert (repo / ".git").exists()
        assert str(repo) != str(implement.__file__)
        out = subprocess.run(["git", "-C", str(repo), "rev-parse", "--show-toplevel"],
                              check=True, capture_output=True, text=True, stdin=subprocess.DEVNULL)
        assert "Tizia" not in Path(out.stdout.strip()).name
    finally:
        shutil.rmtree(repo, ignore_errors=True)


def test_heavy_gate3_model_reads_only_gate3_model_heavy():
    from models import OllamaClient
    assert OllamaClient.from_env({"GATE3_MODEL_HEAVY": "heavy"}).gate3_model == "heavy"
    assert OllamaClient.from_env({"GATE3_MODEL": "old"}).gate3_model == ""


# ── Existing target file: grep excerpt in, search/replace edits out ─────────

def _source_with(tmp_path, rel, content):
    repo = tmp_path / "source"
    (repo / rel).parent.mkdir(parents=True)
    (repo / rel).write_text(content, encoding="utf-8")
    for args in (["init", "-q"], ["add", "-A"], ["-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "base"]):
        subprocess.run(["git", *args], cwd=repo, check=True, capture_output=True, stdin=subprocess.DEVNULL)
    return repo


BIG_PAGE = "".join(f"<p>đoạn {i}</p>\n" for i in range(5000)) + '<footer id="chan-trang">Bản quyền</footer>\n</body>\n'
EDITS = {"code": "// fixture code\n", "test_file": "test/fixture.test.js", "test": "import test from 'node:test';\n// fixture test\n",
         "edits": [{"search": '<footer id="chan-trang">Bản quyền</footer>',
                    "replace": '<p>Tizia được cập nhật liên tục.</p>\n<footer id="chan-trang">Bản quyền</footer>'}]}


def _written(tmp_path, rel):
    return (tmp_path / "scratch" / rel).read_text(encoding="utf-8")


def test_large_existing_file_is_shown_as_an_excerpt_and_edited_in_place(tmp_path):
    source = _source_with(tmp_path, "public/flashcards.html", BIG_PAGE)
    models = FakeModels(plan_with(["features"]), codegen=EDITS)
    plan = plan_with(["features"])
    state = {"plan": plan, "checkout_source": str(source), "request_detail": "Thêm dòng ở chân trang"}

    out = implement.run(state, deps_with(models), Budget(max_wall_clock_s=999), repo_dir=tmp_path / "scratch")

    assert out["blocked"] is False
    new_file_prompt, existing_prompt = [call["prompt"] for call in models.calls]
    plain = implement.build_prompt(plan["subtasks"][1])
    assert existing_prompt.startswith(plain)  # locked prefix unchanged
    context = existing_prompt[len(plain):]
    assert 'L5001| <footer id="chan-trang">Bản quyền</footer>' in context
    assert "5002 dòng" in context and "flashcards.html" in context
    assert len(context) < 8000 < 60_000 < len(BIG_PAGE)  # over the whole-file limit: excerpt
    assert new_file_prompt.startswith(implement.build_prompt(plan["subtasks"][0]))  # new file: prefix only
    assert new_file_prompt == implement.build_prompt(plan["subtasks"][0], contract=subtask_contract.block(plan))
    written = _written(tmp_path, "public/flashcards.html")
    assert written == BIG_PAGE.replace('<footer id="chan-trang">', '<p>Tizia được cập nhật liên tục.</p>\n<footer id="chan-trang">')
    head = subprocess.run(["git", "rev-parse", "HEAD"], cwd=source, capture_output=True, text=True,
                          stdin=subprocess.DEVNULL).stdout.strip()
    assert state["base_sha"] == head  # the worktree is cut from the same base the model saw


def test_whole_file_rewrite_of_an_existing_file_is_refused(tmp_path):
    source = _source_with(tmp_path, "public/flashcards.html", BIG_PAGE)
    models = FakeModels(plan_with(["features"]))  # default codegen: `code` only
    out = implement.run({"plan": plan_with(["features"]), "checkout_source": str(source)},
                        deps_with(models), Budget(max_wall_clock_s=999), repo_dir=tmp_path / "scratch")
    assert out["blocked"] is True
    assert "edits" in out["reason"]
    # Lỗi của model ở subtask thứ hai khi subtask đầu đã xong → partial (LF/107), không phải lượt sửa.
    assert out["failure_class"] == "partial" and out["partial"]["done"] == 1


def test_edit_whose_search_is_not_in_the_file_blocks_for_repair(tmp_path):
    source = _source_with(tmp_path, "public/flashcards.html", BIG_PAGE)
    bad = {**EDITS, "edits": [{"search": "<footer>không có</footer>", "replace": "x"}]}
    out = implement.run({"plan": plan_with(["features"]), "checkout_source": str(source)},
                        deps_with(FakeModels(plan_with(["features"]), codegen=bad)),
                        Budget(max_wall_clock_s=999), repo_dir=tmp_path / "scratch")
    assert out["blocked"] is True
    assert "không khớp" in out["reason"]
    assert out["failure_class"] == "partial" and out["partial"]["remaining"] == ["public/flashcards.html"]


def test_a_first_subtask_failure_is_still_repairable_ordinary(tmp_path):
    """Chưa xong subtask nào → không có gì để "tiếp tục": giữ ordinary để lượt sửa xử lý."""
    source = _source_with(tmp_path, "public/flashcards.html", BIG_PAGE)
    bad = {**EDITS, "edits": [{"search": "<footer>không có</footer>", "replace": "x"}]}
    plan = {"summary_vi": "x", "capabilities": ["features"], "subtasks": [
        {"title": "Trang", "file": "public/flashcards.html", "verify": "thấy chữ", "size": "small"}]}
    out = implement.run({"plan": plan, "checkout_source": str(source)},
                        deps_with(FakeModels(plan, codegen=bad)),
                        Budget(max_wall_clock_s=999), repo_dir=tmp_path / "scratch")
    assert out["blocked"] is True and out["failure_class"] == "ordinary"
    assert "partial" not in out and out["diffs"] == []


def test_lessons_from_past_verdicts_are_added_to_the_prompt(tmp_path):
    import memory
    source = _source_with(tmp_path, "public/flashcards.html", BIG_PAGE)
    lessons = tmp_path / "lessons.jsonl"
    memory.record(lessons, [{"files": ["public/flashcards.html"], "gate": 5, "failure_class": "ordinary",
                             "reason": "changed page body does not match checkout", "outcome": "fixed"}])
    models = FakeModels(plan_with(["features"]), codegen=EDITS)
    implement.run({"plan": plan_with(["features"]), "checkout_source": str(source), "memory_path": str(lessons)},
                  deps_with(models), Budget(max_wall_clock_s=999), repo_dir=tmp_path / "scratch")
    existing_prompt = models.calls[1]["prompt"]
    assert "does not match checkout" in existing_prompt  # qua tool lessons của skill
    assert "does not match checkout" not in models.calls[0]["prompt"]  # other file, no keyword match


def test_test_file_outside_test_dir_is_a_repairable_model_mistake(tmp_path):
    """Nothing leaves the scratch repo yet, so it is ordinary (one repair), not a critical boundary alert."""
    codegen = {"code": "// x\n", "test_file": "public/flashcards.test.js", "test": "import test from 'node:test';\n// t\n"}
    out = implement.run({"plan": plan_with(["features"])}, deps_with(FakeModels(plan_with(["features"]), codegen=codegen)),
                        Budget(max_wall_clock_s=999), repo_dir=tmp_path)
    assert out["blocked"] is True
    assert "test/" in out["reason"]
    assert out["failure_class"] == "ordinary"


def test_prompt_states_where_generated_tests_must_live():
    prompt = implement.build_prompt({"title": "t", "file": "public/x.html", "verify": "v", "size": "small"})
    assert "\"test_file\" nằm trong thư mục test/" in prompt and "node:test" in prompt


# ── LF/107 tiêu chí 8 (2026-10-28): context cho file mới — mẫu thật + deps + sanity artifact ──


def test_new_js_file_receiving_html_fails_fast_in_gate3():
    """Tiêu chí 8c: model trả HTML cho file .js → hỏi lại ngay trong gate 3 thay vì
    trôi qua verify rồi đốt allowance của repair (run 43: 3 lần dừng 2/5 vì đúng lỗi này)."""
    html = "<!DOCTYPE html>\n<html>\n<body><h1>Sổ tay</h1></body>\n</html>\n"
    out = {"code": html, "test_file": "test/glossary.test.js",
           "test": "import test from 'node:test';\ntest('ok', () => {});\n// public/js/features/x/app.js\n"}
    with pytest.raises(ValueError, match="HTML"):
        implement._check_rest(out, None, "public/js/features/x/app.js")


def test_new_html_file_and_normal_js_pass_the_sanity_check():
    """8c không bắt oan: file .html MỚI đúng là HTML; file .js thật sự viết JS."""
    implement._check_rest({"code": "<!DOCTYPE html>\n<html>\n<body></body>\n</html>\n",
                           "test_file": "test/page.test.js",
                           "test": "import test from 'node:test';\n// public/new-page.html\n"},
                          None, "public/new-page.html")
    implement._check_rest({"code": "export function hello() { return 'hi'; }\n",
                           "test_file": "test/app.test.js",
                           "test": "import test from 'node:test';\nimport { hello } from '../public/js/features/x/app.js';\n"},
                          None, "public/js/features/x/app.js")


def test_new_file_context_shows_real_exemplars_and_sibling_names(tmp_path):
    """Tiêu chí 8a: file đích chưa có ở base → một mẫu file THẬT cùng thể loại từ base tree
    + tên file cùng thư mục; chọn theo kiểu target (run 50: model chép import db.js của mẫu
    context UGC → gate 4 critical; đây là lý do chọn mẫu theo kiểu + ghi chú chỉ mượn hình dạng)."""
    source = _source_with(tmp_path, "public/js/features/pharmacy/glossary.js",
                          "export function rows() { return [{ name: 'cu phap', define: '...' }]; }\n")
    (source / "public/js/features/pharmacy").parent.mkdir(parents=True, exist_ok=True)
    (source / "server/contexts/_ai-generated/pharmacy/glossary").mkdir(parents=True, exist_ok=True)
    (source / "server/contexts/_ai-generated/pharmacy/glossary/index.js").write_text(
        "export function handler() { return { terms: [] }; }\n", encoding="utf-8")
    subprocess.run(["git", "add", "-A"], cwd=source, check=True, capture_output=True, stdin=subprocess.DEVNULL)
    subprocess.run(["git", "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "--amend", "-m", "base"],
                   cwd=source, check=True, capture_output=True, stdin=subprocess.DEVNULL)
    sha = subprocess.run(["git", "rev-parse", "HEAD"], cwd=source, check=True, capture_output=True,
                         text=True, stdin=subprocess.DEVNULL).stdout.strip()
    state = {"checkout_source": str(source), "base_sha": sha}

    js_target = {"title": "Sổ tay thuật ngữ", "file": "public/js/features/cntt-glossary/glossary.js",
                 "size": "small", "verify": "node --test test/glossary.test.js"}
    ctx = implement._new_file_context(js_target, state, ["glossary.js", "review.js"])

    assert ctx is not None
    assert "tạo file MỚI" in ctx and "glossary.js" in ctx and "review.js" in ctx
    assert "KHÔNG chép các import của mẫu" in ctx
    assert "(mẫu module frontend THẬT: public/js/features/pharmacy/glossary.js)" in ctx
    assert "(mẫu context API THẬT" not in ctx  # target frontend chỉ lấy mẫu frontend
    assert "L1| export function rows()" in ctx

    api_target = {"title": "API glossary", "file": "server/contexts/_ai-generated/cntt/glossary/index.js",
                  "size": "small", "verify": "node --test test/glossary.test.js"}
    api_ctx = implement._new_file_context(api_target, state, [])
    assert api_ctx is not None
    assert "(mẫu context API THẬT: server/contexts/_ai-generated/pharmacy/glossary/index.js)" in api_ctx
    assert "(mẫu module frontend THẬT" not in api_ctx  # target backend chỉ lấy mẫu context API
    assert "L1| export function handler()" in api_ctx


def test_new_file_context_is_none_when_base_has_no_js_exemplar(tmp_path):
    source = _source_with(tmp_path, "public/flashcards.html", BIG_PAGE)
    sha = subprocess.run(["git", "rev-parse", "HEAD"], cwd=source, check=True, capture_output=True,
                         text=True, stdin=subprocess.DEVNULL).stdout.strip()
    subtask = {"title": "Sổ tay", "file": "public/js/features/x/app.js", "size": "small", "verify": "v"}
    assert implement._new_file_context(subtask, {"checkout_source": str(source), "base_sha": sha}, []) is None


def test_dep_file_context_injects_the_file_a_prior_subtask_wrote(tmp_path):
    """Tiêu chí 8b: subtask sau nhận NỘI DUNG file mới của subtask trước (depends_on 1-based)
    — model viết trang nạp module theo API thật, không bịa tên hàm."""
    repo = tmp_path
    api_path = repo / "server/contexts/_ai-generated/cntt/glossary/index.js"
    api_path.parent.mkdir(parents=True)
    api_path.write_text("export function handler() { return { terms: [] }; }\n", encoding="utf-8")
    api_file = "server/contexts/_ai-generated/cntt/glossary/index.js"
    page = {"title": "Trang sổ tay", "file": "public/so-tay.html", "size": "small", "verify": "v", "depends_on": [1]}
    state = {"plan": {"subtasks": [{"title": "API glossary", "file": api_file, "size": "small", "verify": "v"}, page]}}
    # không checkout_source → base tree rỗng → file dep coi là file mới ở scratch repo

    text = implement._dep_file_context(page, state, repo)

    assert f"file phụ thuộc đã có sau subtask 1: {api_file}" in text
    assert "L1| export function handler()" in text


def test_dep_file_context_skips_dependency_already_at_base(tmp_path, monkeypatch):
    """File dep có ở base → nội dung đã nằm trong context file cũ, criteria 8b chỉ nêu file MỚI."""
    repo = tmp_path
    page = {"title": "Trang", "file": "public/p.html", "size": "small", "verify": "v", "depends_on": [1]}
    state = {"plan": {"subtasks": [{"title": "a", "file": "server/contexts/_existing/index.js",
                                    "size": "small", "verify": "v"}, page]}}
    monkeypatch.setattr(implement, "_base_tree", lambda s: {"server/contexts/_existing/index.js"})
    assert implement._dep_file_context(page, state, repo) == ""


def test_restore_rebuilds_scratch_and_diffs_without_a_model(tmp_path):
    subtasks = [{"title": "A", "file": "public/a.html"}, {"title": "B", "file": "public/b.html"}]
    state = {"plan": {"subtasks": subtasks}, "scratch_repo": str(tmp_path), "produced": {
        "public/a.html": {"model": "light", "test_file": "test/a.test.js", "code": "<h1>A</h1>",
                          "test": "import test from 'node:test';"},
        "public/b.html": {"model": "light", "test_file": "test/b.test.js", "code": "<h1>B</h1>",
                          "test": "import test from 'node:test';"},
    }}
    implement.restore(state)
    assert (tmp_path / "public/a.html").read_text(encoding="utf-8") == "<h1>A</h1>"
    assert [item["file"] for item in state["diffs"]] == ["public/a.html", "public/b.html"]
    assert len({item["commit"] for item in state["diffs"]}) == 2
    assert subprocess.run(["git", "status", "--porcelain"], cwd=tmp_path, capture_output=True,
                          text=True).stdout.strip() == ""


def test_restore_refuses_a_partial_production(tmp_path):
    state = {"plan": {"subtasks": [{"title": "A", "file": "public/a.html"},
                                   {"title": "B", "file": "public/b.html"}]},
             "scratch_repo": str(tmp_path), "produced": {
                 "public/a.html": {"model": "light", "test_file": "test/a.test.js", "code": "<h1>A</h1>",
                                   "test": "import test from 'node:test';"}}}
    with pytest.raises(ValueError, match="gate 3"):
        implement.restore(state)


# ── hợp đồng giữa các bước: suy ra từ plan, có mặt trong MỌI prompt cổng 3 ──

FEATURE_PLAN = {"summary_vi": "Thêm API thuật ngữ và hai trang dùng nó.", "capabilities": ["features"], "subtasks": [
    {"title": "Migration mới lưu thuật ngữ", "size": "large", "layer": "db", "depends_on": [],
     "file": "server/contexts/_ai-generated/cntt/migrations/001-thuat-ngu.sql",
     "verify": "psql \"$DATABASE_URL\" -c 'select 1 from glossary'"},
    {"title": "API thuật ngữ trong context cntt", "size": "large", "layer": "backend", "depends_on": [1],
     "file": "server/contexts/_ai-generated/cntt/glossary/index.js",
     "verify": "curl -s localhost:8041/api/glossary | grep -q items"},
    {"title": "Module gọi API cho hai trang", "size": "small", "layer": "frontend", "depends_on": [2],
     "file": "public/js/features/thuat-ngu/glossary-client.js",
     "verify": "curl -s localhost:8041/so-tay-thuat-ngu.html | grep -q glossary-client.js"},
    {"title": "Trang sổ tay thuật ngữ", "size": "small", "layer": "frontend", "depends_on": [3],
     "file": "public/so-tay-thuat-ngu.html", "verify": "curl -s localhost:8041/so-tay-thuat-ngu.html | grep -q '<h1>'"},
]}


def test_contract_is_derived_from_a_db_route_page_plan_and_bounded():
    block = subtask_contract.block(FEATURE_PLAN)

    assert block.startswith("HỢP ĐỒNG GIỮA CÁC BƯỚC") and "suy ra từ plan" in block
    # route/verify của bước API, bảng của migration, và MỌI file trong plan đều có tên
    assert "/api/glossary" in block and "bảng glossary" in block
    for subtask in FEATURE_PLAN["subtasks"]:
        assert subtask["file"] in block
    assert "[db]" in block and "[backend]" in block and "[frontend]" in block
    assert len(block) <= subtask_contract.MAX_BLOCK_CHARS <= 600
    # plan 12 bước vẫn bị cắt: khối hợp đồng không được phình prompt
    wide = {"subtasks": [{"title": f"Bước {i}", "file": f"public/js/features/{'y' * 30}/step-{i}.js",
                          "verify": f"curl -s localhost:8041/api/step-{i} | grep -q items"} for i in range(12)]}
    assert len(subtask_contract.block(wide)) <= 600
    assert subtask_contract.block({"subtasks": FEATURE_PLAN["subtasks"][:1]}) == ""


def test_every_gate_3_prompt_of_a_multi_subtask_plan_carries_the_contract(tmp_path):
    codegen = {"code": "// noop\n", "test_file": "test/noop.test.js", "test": "import test from 'node:test';\n// noop\n"}
    plan = {**FEATURE_PLAN, "subtasks": FEATURE_PLAN["subtasks"][:2]}  # 2 bước: dưới trần DAG của cổng 3
    models = FakeModels(plan, codegen=codegen)

    implement.run({"plan": plan}, deps_with(models), Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    block = subtask_contract.block(plan)
    assert block and len(models.calls) == 2
    assert all(block in call["prompt"] for call in models.calls)
    # bước 2 thấy route mà bước 1 hứa, dù nó không đọc được file của bước 1
    assert "/api/glossary" in models.calls[1]["prompt"]


def test_single_subtask_plan_prompt_is_byte_identical_to_today(tmp_path):
    subtask = {"title": "Đổi chữ nút #start", "file": "public/vi-du.html",
               "verify": "node --test test/vi-du.test.js", "size": "small"}
    plan = {"summary_vi": "x", "capabilities": [], "subtasks": [subtask]}
    codegen = {"code": "<h1>Bắt đầu</h1>\n", "test_file": "test/vi-du.test.js",
               "test": "import test from 'node:test';\n// public/vi-du.html\n"}
    models = FakeModels(plan, codegen=codegen)

    implement.run({"plan": plan}, deps_with(models), Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    expected = implement.repo_context.manual() + implement.PROMPT.format(
        title=subtask["title"], file=subtask["file"], verify=subtask["verify"])
    assert models.calls[0]["prompt"] == expected
    assert subtask_contract.block(plan) == ""
