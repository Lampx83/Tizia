"""Gate 3 hỏi lại ngay trong cổng: lỗi sửa được → phản hồi + đoạn lỗi, tối đa MAX_INNER_RETRIES lần."""
import subprocess

import file_context
from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from gates import implement

PAGE = "<html>\n<body>\n  <main>\n    <h1>Tính năng</h1>\n  </main>\n</body>\n</html>\n"
ESM_TEST = "import test from 'node:test';\nimport assert from 'node:assert/strict';\n"
GOOD = {"edits": [{"after_line": 4, "insert": "    <p>Mới.</p>"}], "test_file": "test/moi.test.js", "test": ESM_TEST}
BAD_SEARCH = {**GOOD, "edits": [{"search": "<h1>Không có</h1>", "replace": "x"}]}


class SeqModels(FakeModels):
    """Gate 3 trả lần lượt từng payload trong `seq` (hết thì lặp cái cuối)."""

    def __init__(self, seq, done_reasons=()):
        super().__init__(_one_file_plan(), codegen=seq[0])
        self.seq, self.done_reasons = list(seq), list(done_reasons)

    def generate(self, model, prompt, **kw):
        if model in (self.gate3_model, self.gate3_model_light):
            self.codegen = self.seq.pop(0) if len(self.seq) > 1 else self.seq[0]
        body = super().generate(model, prompt, **kw)
        if self.done_reasons:
            body["done_reason"] = self.done_reasons.pop(0)
        return body


def _one_file_plan():
    return {"summary_vi": "Thêm dòng", "capabilities": ["features"],
            "subtasks": [{"title": "Thêm dòng", "file": "public/tinh-nang.html", "verify": "thấy dòng Mới.",
                          "size": "small"}]}


def _source(tmp_path):
    repo = tmp_path / "source"
    (repo / "public").mkdir(parents=True)
    (repo / "public/tinh-nang.html").write_text(PAGE, encoding="utf-8")
    for args in (["init", "-q"], ["add", "-A"], ["-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "b"]):
        subprocess.run(["git", *args], cwd=repo, check=True, capture_output=True, stdin=subprocess.DEVNULL)
    return repo


def _run(tmp_path, models, budget=None):
    state = {"plan": _one_file_plan(), "checkout_source": str(_source(tmp_path))}
    out = implement.run(state, deps_with(models), budget or Budget(max_wall_clock_s=999), repo_dir=tmp_path / "scratch")
    return out, [c["prompt"] for c in models.calls]


def test_search_mismatch_is_retried_with_the_error_and_snippet_then_passes(tmp_path):
    out, prompts = _run(tmp_path, SeqModels([BAD_SEARCH, GOOD]))
    assert out["blocked"] is False
    assert len(prompts) == 2
    assert prompts[1].startswith(prompts[0])  # prefix + ngữ cảnh giữ nguyên byte → KV cache
    retry = prompts[1][len(prompts[0]):]
    assert "LẦN THỬ 1" in retry and "không khớp" in retry and "Không có" in retry
    assert (tmp_path / "scratch/public/tinh-nang.html").read_text(encoding="utf-8").count("<p>Mới.</p>") == 1


def test_gives_up_after_the_retry_cap_as_ordinary_with_the_last_snippet(tmp_path):
    out, prompts = _run(tmp_path, SeqModels([BAD_SEARCH]))
    assert len(prompts) == implement.MAX_INNER_RETRIES + 1
    assert out["blocked"] is True and out["failure_class"] == "ordinary"
    assert "sau 4 lần thử" in out["reason"] and "Không có" in out["reason"]
    assert "after_line" in prompts[-1][len(prompts[0]):]  # lần sau cùng gợi ý chèn theo số dòng


def test_commonjs_test_is_retried_as_esm():
    cjs = {**GOOD, "test": "const test = require('node:test');\n"}
    try:
        implement.check_output(dict(cjs), PAGE, "stop")
    except ValueError as e:
        assert "ESM" in str(e)
    else:
        raise AssertionError("CommonJS test phải bị loại")


def test_truncated_output_is_retried(tmp_path):
    out, prompts = _run(tmp_path, SeqModels([GOOD, GOOD], done_reasons=["length", "stop"]))
    assert out["blocked"] is False and len(prompts) == 2
    assert "bị cắt" in prompts[1]


def test_path_escape_is_critical_without_retry(tmp_path):
    out, prompts = _run(tmp_path, SeqModels([{**GOOD, "test_file": "../../evil.js"}]))
    assert out["failure_class"] == "critical" and len(prompts) == 1


def test_no_retry_without_budget_room(tmp_path):
    budget = Budget(max_wall_clock_s=999, max_model_calls=1)
    out, prompts = _run(tmp_path, SeqModels([BAD_SEARCH, GOOD]), budget)
    assert out["blocked"] is True and len(prompts) == 1


def test_after_line_inserts_by_original_numbering_bottom_up():
    text = "a\nb\nc\n"
    out = file_context.apply_edits(text, [{"after_line": 1, "insert": "x"}, {"after_line": 3, "insert": "y"}])
    assert out == "a\nx\nb\nc\ny\n"
    try:
        file_context.apply_edits(text, [{"after_line": 4, "insert": "z"}])
    except ValueError as e:
        assert "ngoài file" in str(e)
    else:
        raise AssertionError("after_line ngoài file phải lỗi")


def test_search_tolerates_indentation_drift_but_stays_unique():
    text = "<main>\n    <h1>A</h1>\n</main>\n"
    assert file_context.apply_edits(text, [{"search": "<h1>A</h1>", "replace": "<h1>B</h1>"}]).count("    <h1>B</h1>") == 1
    drift = file_context.apply_edits(text, [{"search": "  <main>\n  <h1>A</h1>", "replace": "<main>\n    <h1>C</h1>"}])
    assert "<h1>C</h1>" in drift and "<h1>A</h1>" not in drift
    try:
        file_context.apply_edits("<p>x</p>\n  <p>x</p>\n", [{"search": " <p>x</p> ", "replace": "y"}])
    except ValueError as e:
        assert "2 chỗ" in str(e)
    else:
        raise AssertionError("khớp nhiều chỗ phải lỗi")



def test_insert_after_body_close_is_retried_with_the_right_line(tmp_path):
    after_body = {**GOOD, "edits": [{"after_line": 6, "insert": "<p>Mới.</p>"}]}
    out, prompts = _run(tmp_path, SeqModels([after_body, GOOD]))
    assert out["blocked"] is False and len(prompts) == 2
    assert "sau </body>" in prompts[1] and "after_line 5" in prompts[1]


def test_node_check_handles_vietnamese_source(tmp_path):
    from gates import static_check
    f = tmp_path / "t.test.js"
    f.write_text("import test from 'node:test';\ntest('trang có dòng giới thiệu cuối', () => {});\n", encoding="utf-8")
    assert static_check.node_check(f) is None
    f.write_text("const x = ;\n// chữ Việt\n", encoding="utf-8")
    assert static_check.node_check(f)


def test_js_edit_that_breaks_syntax_is_retried_inside_gate_3_with_the_node_error(tmp_path):
    repo = tmp_path / "source"
    (repo / "public").mkdir(parents=True)
    (repo / "public/app.js").write_text("const msg = 'hello';\nexport default msg;\n", encoding="utf-8")
    for args in (["init", "-q"], ["add", "-A"], ["-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "b"]):
        subprocess.run(["git", *args], cwd=repo, check=True, capture_output=True, stdin=subprocess.DEVNULL)
    plan = {"summary_vi": "Đổi lời chào", "capabilities": ["features"],
            "subtasks": [{"title": "Đổi lời chào", "file": "public/app.js", "verify": "msg đổi", "size": "small"}]}
    broken = {"edits": [{"search": "'hello'", "replace": "'bye';'"}], "test_file": "test/app.test.js", "test": ESM_TEST}
    fixed = {"edits": [{"search": "'hello'", "replace": "'bye'"}], "test_file": "test/app.test.js", "test": ESM_TEST}
    models = SeqModels([broken, fixed])
    out = implement.run({"plan": plan, "checkout_source": str(repo)}, deps_with(models), Budget(max_wall_clock_s=999),
                        repo_dir=tmp_path / "scratch")
    prompts = [c["prompt"] for c in models.calls]
    assert out["blocked"] is False and len(prompts) == 2
    retry = prompts[1][len(prompts[0]):]
    assert "cú pháp" in retry and "SyntaxError" in retry   # node's own message reaches the model
    assert (tmp_path / "scratch/public/app.js").read_text(encoding="utf-8").startswith("const msg = 'bye';")


def test_a_file_that_was_already_broken_is_not_blamed_on_the_edit(tmp_path):
    broken_base = "const msg = ;\n"
    out = {"edits": [{"search": "msg", "replace": "text"}], "test_file": "test/x.test.js", "test": ESM_TEST}
    checked = implement.check_output(dict(out), broken_base, "stop", file="public/app.js")
    assert checked["code"] == "const text = ;\n"


def test_syntax_retry_hint_says_to_copy_the_whole_line():
    hint = implement.retry_hint("cú pháp JS lỗi sau khi áp edit: SyntaxError", 0)
    assert "CẢ dòng" in hint


def test_near_miss_retry_hint_says_to_copy_the_quoted_line_exactly():
    hint = implement.retry_hint("edit 1: search không khớp đoạn nào trong file: 'x'\nDòng gần giống nhất trong file (chép nguyên văn từ đây):\nL2| y", 0)
    assert "NGUYÊN VĂN" in hint


def test_inner_retries_vary_the_sampling_so_a_deterministic_loop_can_break(tmp_path):
    models = SeqModels([BAD_SEARCH, BAD_SEARCH, GOOD])
    out, _ = _run(tmp_path, models)
    assert out["blocked"] is False and len(models.calls) == 3
    temperatures = [call["temperature"] for call in models.calls]
    assert temperatures[0] == 0                        # the first attempt stays deterministic (KV cache, repeatability)
    assert 0 < temperatures[1] < temperatures[2]       # identical prompt + temperature 0 would give the identical answer
    assert len({call.get("seed") for call in models.calls[1:]}) == 2


def _traced(tmp_path, models):
    import dataclasses
    import meter
    tracer, batches = meter.Tracer(None), []
    tracer.begin(1, batches.append)
    state = {"plan": _one_file_plan(), "checkout_source": str(_source(tmp_path))}
    deps = dataclasses.replace(deps_with(models), trace=tracer)
    out = implement.run(state, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path / "scratch")
    tracer.flush()
    return out, [call for batch in batches for call in batch]


def test_every_gate_3_call_says_what_the_ai_knew_which_tools_ran_what_it_changed_and_how_it_was_judged(tmp_path):
    out, calls = _traced(tmp_path, SeqModels([BAD_SEARCH, GOOD]))
    assert out["blocked"] is False and len(calls) == 2
    bad, good = calls
    knows = {n["name"]: n for n in bad["notes"] if n["kind"] == "knows"}
    assert "public/tinh-nang.html" in knows["target file"]["summary"]
    assert "L" in knows["excerpt"]["data"]  # which line numbers the model could see
    tool_notes = [n for n in bad["notes"] if n["kind"] == "tool"]
    assert tool_notes and all(n["name"] and n["summary"] for n in tool_notes)
    assert "Không có" in bad["edits"]["parsed"] and bad["edits"]["applied"] is False
    assert [(e["check"], e["ok"]) for e in bad["evaluation"]] == [("parse output", True), ("apply edits", False)]
    assert "không khớp" in bad["evaluation"][1]["detail"]
    retry = {n["name"]: n for n in good["notes"] if n["kind"] == "knows"}
    assert "không khớp" in retry["retry feedback"]["summary"]  # the AI was shown its previous mistake
    assert good["edits"]["applied"] is True and "+    <p>Mới.</p>" in good["edits"]["diff"]
    assert [e["check"] for e in good["evaluation"]] == ["parse output", "apply edits", "output checks"]
    assert all(e["ok"] for e in good["evaluation"])


def test_syntax_error_feedback_shows_the_lines_the_edit_produced_so_the_model_can_see_its_stray_quote():
    current = "function f(q) {\n  return '<b>old</b>';\n}\n"
    out = {"edits": [{"search": "return '<b>old</b>';", "replace": "return '<b>new</b>';';"}],  # the model writes the closing quote twice
           "test_file": "test/a.test.js", "test": ESM_TEST}
    try:
        implement.check_output(out, current, "stop", "public/js/a.js")
    except ValueError as e:
        message = str(e)
    else:
        raise AssertionError("a doubled quote must be a syntax error")
    assert "L2| " in message and "return '<b>new</b>';';" in message  # the produced line, with its real number
