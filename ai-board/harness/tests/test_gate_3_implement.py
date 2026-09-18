"""Cổng 3 (implement.py, ticket 11) — routing theo size, parse codegen, diff thật."""
import shutil
import subprocess
from pathlib import Path

import pytest

from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from gates import implement


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
    '{"code": "", "test_file": "t.js", "test": "y"}',  # code rỗng
    '[1, 2]',                                            # không phải object
])
def test_parse_codegen_invalid_raises(bad):
    with pytest.raises(ValueError):
        implement.parse_codegen(bad)


# ── build_prompt: chỉ 1 subtask, không plan, không subtask khác ─────────────

def test_build_prompt_contains_only_this_subtask():
    subtask = {"title": "Tạo plugin flashcards", "file": "server/contexts/_ai-generated/pharmacy/flashcards/index.js",
               "verify": "curl /api/flashcards trả 200", "size": "small"}
    prompt = implement.build_prompt(subtask)
    assert subtask["title"] in prompt
    assert subtask["file"] in prompt
    assert subtask["verify"] in prompt


def test_run_second_subtask_prompt_excludes_first_subtasks_content(tmp_path):
    """'Fresh context per subtask' là cơ chế (build_prompt chỉ nhận 1 subtask),
    không phải quy ước — test này khẳng định bằng cách soi prompt thật đã gửi."""
    codegen = {"code": "// noop\n", "test_file": "test/noop.test.js", "test": "// noop test\n"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])  # 2 subtask: "Tạo plugin" (small) + "Trang HTML" (large)
    state = {"plan": plan}

    implement.run(state, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    assert len(models.calls) == 2
    first_prompt, second_prompt = models.calls[0]["prompt"], models.calls[1]["prompt"]
    first_title, second_title = plan["subtasks"][0]["title"], plan["subtasks"][1]["title"]
    first_file, second_file = plan["subtasks"][0]["file"], plan["subtasks"][1]["file"]

    assert first_title in first_prompt and second_title not in first_prompt
    assert first_file in first_prompt and second_file not in first_prompt
    assert second_title in second_prompt and first_title not in second_prompt
    assert second_file in second_prompt and first_file not in second_prompt


def test_run_routes_each_subtask_to_correct_model_by_size():
    codegen = {"code": "// noop\n", "test_file": "test/noop.test.js", "test": "// noop test\n"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])  # subtasks[0].size='small', subtasks[1].size='large'

    implement.run({"plan": plan}, deps, Budget(max_wall_clock_s=999))

    assert models.calls[0]["model"] == models.gate3_model_light
    assert models.calls[1]["model"] == models.gate3_model


# ── run(): diff thật vào repo scratch, không phải Tizia thật ────────────────

def test_run_produces_real_diff_against_scratch_repo(tmp_path):
    codegen = {"code": "console.log('hi');\n", "test_file": "test/hi.test.js", "test": "// test hi\n"}
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
    codegen = {"code": "x", "test_file": "t.js", "test": "y"}
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
    có 2) không được gọi model — không được âm thầm báo blocked=False."""
    codegen = {"code": "x", "test_file": "t.js", "test": "y"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])
    budget = Budget(max_model_calls=1, max_wall_clock_s=999)

    out = implement.run({"plan": plan}, deps, budget, repo_dir=tmp_path)

    assert out["blocked"] is True
    assert "budget" in out["reason"]
    assert len(models.calls) == 1
    assert len(out["diffs"]) == 1


def test_run_spends_budget_once_per_subtask(tmp_path):
    codegen = {"code": "x", "test_file": "t.js", "test": "y"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])
    budget = Budget(max_wall_clock_s=999)

    implement.run({"plan": plan}, deps, budget, repo_dir=tmp_path)

    assert budget.model_calls == len(plan["subtasks"])


def test_ensure_scratch_repo_never_reuses_real_tizia_repo(tmp_path):
    """repo_dir=None → tempfile.mkdtemp(), KHÔNG bao giờ trỏ vào ROOT của Tizia
    (ticket 04: deps.git vẫn Unavailable, git thật không được chạm)."""
    repo = implement._ensure_scratch_repo(None)
    try:
        assert (repo / ".git").exists()
        assert str(repo) != str(implement.__file__)
        out = subprocess.run(["git", "-C", str(repo), "rev-parse", "--show-toplevel"],
                              check=True, capture_output=True, text=True, stdin=subprocess.DEVNULL)
        assert "Tizia" not in Path(out.stdout.strip()).name
    finally:
        shutil.rmtree(repo, ignore_errors=True)
