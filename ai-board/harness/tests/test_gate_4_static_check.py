"""Cổng 4 (static_check.py, ticket 12) — node --check + lint import +
minimalism guard (vượt ước lượng/file ngoài plan -> flag, không block)."""
from pathlib import Path

from gates import static_check


def _plan(subtasks):
    return {"summary_vi": "x", "capabilities": [], "subtasks": subtasks}


def _write(repo_dir: Path, rel: str, content: str) -> None:
    p = repo_dir / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")


# ── import cấm: db.js / context khác — BLOCK thật ───────────────────────────

def test_generated_code_importing_db_js_fails_gate_4(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "server/contexts/_ai-generated/x/index.js", "import { db } from '../../db.js';\n")
    diffs = [{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "diff": "+import { db } from '../../db.js';\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is True
    assert "db.js" in out["reason"]
    assert out["failure_class"] == "critical"


def test_generated_test_importing_db_js_fails_gate_4(tmp_path):
    plan = _plan([{"title": "t", "file": "public/x.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "public/x.js", "export const x = 1;\n")
    _write(tmp_path, "test/x.test.js", "import { db } from '../server/db.js';\n")
    diffs = [{"title": "t", "file": "public/x.js", "test_file": "test/x.test.js", "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is True
    assert "test/x.test.js" in out["reason"]
    assert "db.js" in out["reason"]


def test_generated_code_importing_another_context_directly_fails_gate_4(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "server/contexts/_ai-generated/x/index.js", "import { attachAdmin } from '../../admin/index.js';\n")
    diffs = [{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is True
    assert "contexts/admin" in out["reason"]


def test_generated_code_accessing_ctx_core_fails_gate_4(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "server/contexts/_ai-generated/x/index.js", "export const plugin = { mount(r, ctx) { ctx.core.db.prepare('x'); } };\n")
    diffs = [{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is True
    assert "ctx.core" in out["reason"]


def test_generated_code_using_only_ctx_surface_passes_gate_4(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "server/contexts/_ai-generated/x/index.js", "export const plugin = { mount(r, ctx) { return ctx.surface.quiz.getQuestion; } };\n")
    diffs = [{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is False
    assert out["needs_careful_review"] is False


# ── node --check: cú pháp hỏng -> BLOCK ─────────────────────────────────────

def test_syntax_error_in_generated_js_fails_gate_4(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "server/contexts/_ai-generated/x/index.js", "export const plugin = { mount(r, ctx) {\n")  # thiếu đóng ngoặc
    diffs = [{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is True
    assert "node --check" in out["reason"]
    assert out["failure_class"] == "ordinary"


def test_non_js_file_skips_node_check_and_import_lint(tmp_path):
    plan = _plan([{"title": "t", "file": "public/x.html", "verify": "v", "size": "small"}])
    _write(tmp_path, "public/x.html", "<html>không phải JS hợp lệ nếu bị check nhầm<")
    diffs = [{"title": "t", "file": "public/x.html", "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is False


# ── minimalism guard: flag, không block ─────────────────────────────────────

def test_diff_3x_plan_estimate_is_flagged_not_blocked(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])  # ước lượng 30 dòng
    big_diff = "\n".join(f"+line {i}" for i in range(95))  # 95 > 2*30=60 (và > 3*30=90)
    _write(tmp_path, "server/contexts/_ai-generated/x/index.js", "export const plugin = {};\n")
    diffs = [{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "diff": big_diff}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is False
    assert out["needs_careful_review"] is True
    assert any("vượt" in i for i in out["issues"])


def test_diff_touching_file_outside_plan_is_flagged_even_if_small():
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    diffs = [{"title": "t", "file": "server/index.js", "diff": "+// 1 dong nho\n"}]  # KHONG co trong plan

    out = static_check.run({"plan": plan, "diffs": diffs})

    assert out["blocked"] is False
    assert out["needs_careful_review"] is True
    assert any("không có trong plan" in i for i in out["issues"])


def test_diff_within_estimate_and_in_plan_passes_clean():
    plan = _plan([{"title": "t", "file": "a.js", "verify": "v", "size": "large"}])  # ước lượng 80 dòng
    diffs = [{"title": "t", "file": "a.js", "diff": "+line\n+line\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs})

    assert out["blocked"] is False
    assert out["needs_careful_review"] is False
    assert out["issues"] == []


def test_missing_plan_or_diffs_blocks():
    assert static_check.run({})["blocked"] is True
    assert static_check.run({"plan": _plan([])})["blocked"] is True


# ── code-review round: dynamic import cũng bị chặn (không chỉ static import) ─

def test_dynamic_import_of_db_js_fails_gate_4(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "server/contexts/_ai-generated/x/index.js",
           "export const plugin = { async mount(r, ctx) { const { db } = await import('../../db.js'); db.prepare('x'); } };\n")
    diffs = [{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is True
    assert "db.js" in out["reason"]


# ── code-review round: file NGOÀI plan vẫn phải qua lint/node-check thật ────

def test_file_outside_plan_still_gets_import_lint_not_just_flagged(tmp_path):
    """Trước fix: file ngoài plan chỉ bị needs_careful_review, KHÔNG bao giờ
    chạm lint_imports/node_check — đúng lúc là file đáng ngờ nhất thì lại
    được miễn kiểm tra cứng."""
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    rogue = "server/db.js"  # KHÔNG có trong plan
    _write(tmp_path, rogue, "export const evil = true; import { db } from './db.js';\n")
    diffs = [{"title": "t", "file": rogue, "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is True  # db.js tự import chính nó -> vẫn bắt được
    assert "db.js" in out["reason"]


def test_file_outside_plan_with_clean_code_only_flags_not_blocks(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    rogue = "server/contexts/_ai-generated/x/helper.js"
    _write(tmp_path, rogue, "export const clean = 1;\n")
    diffs = [{"title": "t", "file": rogue, "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is False
    assert out["needs_careful_review"] is True
    assert any("không có trong plan" in i for i in out["issues"])


# ── code-review round: size đo ĐÚNG file implementation, không tính lẫn test ─

def test_oversize_only_counts_the_implementation_files_own_diff_section():
    plan = _plan([{"title": "t", "file": "a.js", "verify": "v", "size": "small"}])  # ước lượng 30, limit=60
    # diff gộp 2 file (a.js NHỎ + a.test.js LỚN) giống thật _write_and_diff sinh ra.
    diff = (
        "diff --git a/a.js b/a.js\n"
        "new file mode 100644\n"
        "--- /dev/null\n"
        "+++ b/a.js\n"
        + "\n".join(f"+impl line {i}" for i in range(10)) + "\n"
        "diff --git a/a.test.js b/a.test.js\n"
        "new file mode 100644\n"
        "--- /dev/null\n"
        "+++ b/a.test.js\n"
        + "\n".join(f"+test line {i}" for i in range(80)) + "\n"
    )
    diffs = [{"title": "t", "file": "a.js", "diff": diff}]

    out = static_check.run({"plan": plan, "diffs": diffs})

    # 10 dòng impl < limit 60 -> KHÔNG flag, dù tổng cả diff (90 dòng) vượt xa.
    assert out["needs_careful_review"] is False
    assert out["issues"] == []


def test_oversize_still_flags_when_the_implementation_file_itself_is_big():
    plan = _plan([{"title": "t", "file": "a.js", "verify": "v", "size": "small"}])  # limit=60
    diff = (
        "diff --git a/a.js b/a.js\n"
        "+++ b/a.js\n"
        + "\n".join(f"+impl line {i}" for i in range(95)) + "\n"
        "diff --git a/a.test.js b/a.test.js\n"
        "+++ b/a.test.js\n"
        "+one test line\n"
    )
    diffs = [{"title": "t", "file": "a.js", "diff": diff}]

    out = static_check.run({"plan": plan, "diffs": diffs})

    assert out["needs_careful_review"] is True
    assert any("vượt" in i for i in out["issues"])


# ── code-review round: backslash path (Windows-style) vẫn bị chuẩn hoá ──────

def test_backslash_path_is_normalized_before_import_lint(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "server/contexts/_ai-generated/x/index.js", "import { db } from '../../db.js';\n")
    diffs = [{"title": "t", "file": r"server\contexts\_ai-generated\x\index.js", "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is True
    assert "db.js" in out["reason"]
