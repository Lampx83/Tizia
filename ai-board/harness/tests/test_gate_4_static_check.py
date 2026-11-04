"""Cổng 4 (static_check.py) — node --check + lint import +
minimalism guard (vượt ước lượng/file ngoài plan -> flag, không block)."""
import json
import subprocess
from pathlib import Path

from gates import static_check, subtask_contract
import pytest


@pytest.mark.parametrize('stop', ['revoked', 'action_budget_exhausted', 'local_budget'])
@pytest.mark.parametrize('after_json', [False, True])
def test_content_review_stops_before_next_model(stop, after_json):
    from types import SimpleNamespace
    from repositories import server_hsm
    from runtime.budget import Budget

    calls = []
    class Authority:
        def authorize_action(self, _action):
            if (calls or not after_json) and stop != 'local_budget':
                raise server_hsm.AuthorityError(stop)
            return True

    budget = Budget(max_model_calls=int(after_json) if stop == 'local_budget' else 40)
    def call_model(_model, _prompt, **kwargs):
        calls.append(kwargs['prompt_name'])
        budget.spend('model_calls')
        return {'response': '{"labels": ["ok"]}'}

    deps = SimpleNamespace(models=SimpleNamespace(gate1_model='guard', classifier_model='classifier'),
                           call_model=call_model)
    diffs = [{'file': 'public/x.html', 'diff': '+<h1>Study</h1>\n'}]
    with server_hsm.server_scope(Authority()):
        result = static_check.content_review({'diffs': diffs}, deps, budget)
    assert result['blocked'] is True
    assert result['failure_class'] == ('critical' if stop == 'revoked' else 'budget')
    assert calls == (['content_guard.md'] if after_json else [])


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


# ── import đã có ở base: sửa module protected vốn import db/admin là hợp lệ ─────

BASE_CONTENT = ("import { db } from '../../db.js';\n"
                "import { requireAdmin } from '../admin/index.js';\n"
                "export const plugin = { name: 'content' };\n")


def _git(repo: Path, *args: str) -> str:
    out = subprocess.run(["git", *args], cwd=repo, capture_output=True, text=True,
                         stdin=subprocess.DEVNULL)
    assert out.returncode == 0, out.stderr
    return out.stdout.strip()


def _base_repo(tmp_path: Path, rel: str, code: str) -> tuple[Path, str]:
    repo = tmp_path / "base"
    repo.mkdir()
    _git(repo, "init", "-q")
    _git(repo, "config", "user.email", "t@t.local")
    _git(repo, "config", "user.name", "t")
    path = repo / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(code, encoding="utf-8")
    _git(repo, "add", "-A")
    _git(repo, "commit", "-q", "-m", "base")
    return repo, _git(repo, "rev-parse", "HEAD")


def _scratch(tmp_path: Path, rel: str, code: str) -> Path:
    scratch = tmp_path / "scratch"
    path = scratch / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(code, encoding="utf-8")
    return scratch


def _gate4_for(tmp_path, rel, base_code, new_code):
    repo, sha = _base_repo(tmp_path, rel, base_code)
    scratch = _scratch(tmp_path, rel, new_code)
    plan = _plan([{"title": "t", "file": rel, "verify": "v", "size": "small"}])
    diffs = [{"title": "t", "file": rel, "diff": "+x\n"}]
    return static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(scratch),
                             "checkout_source": str(repo), "base_sha": sha})


def test_editing_a_protected_file_that_already_imports_db_and_admin_passes_gate_4(tmp_path):
    out = _gate4_for(tmp_path, "server/contexts/content/index.js", BASE_CONTENT,
                     BASE_CONTENT + "export const extra = 1;\n")

    assert out["blocked"] is False, out
    assert "db.js" not in (out.get("reason") or "")


def test_adding_a_new_admin_import_to_that_same_file_still_blocks(tmp_path):
    out = _gate4_for(tmp_path, "server/contexts/content/index.js", BASE_CONTENT,
                     BASE_CONTENT + "import { attachAdmin } from '../admin/routes.js';\n")

    assert out["blocked"] is True
    assert "contexts/admin" in out["reason"]
    assert out["failure_class"] == "critical"


def test_adding_a_new_db_import_to_a_file_without_one_still_blocks(tmp_path):
    base = "export const x = 1;\n"
    out = _gate4_for(tmp_path, "server/contexts/content/index.js", base,
                     base + "import { db } from '../../db.js';\n")

    assert out["blocked"] is True
    assert "db.js" in out["reason"]


def test_a_brand_new_file_gets_no_baseline_exemption(tmp_path):
    out = _gate4_for(tmp_path, "server/contexts/content/fresh.js", "export const x = 1;\n",
                     "import { db } from '../../db.js';\n")
    assert out["blocked"] is True and "db.js" in out["reason"]


def test_importing_a_sibling_file_of_the_same_context_is_not_a_boundary_violation():
    assert static_check.lint_imports("import { x } from './helper.js';\n",
                                     "server/contexts/content/index.js") == []


def test_lint_compares_against_the_base_imports_only():
    code = BASE_CONTENT + "export const extra = 1;\n"
    assert static_check.lint_imports(code, "server/contexts/content/index.js")  # không có base -> chặn
    assert static_check.lint_imports(code, "server/contexts/content/index.js", BASE_CONTENT) == []


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


# ── dynamic import cũng bị chặn (không chỉ static import) ─

def test_dynamic_import_of_db_js_fails_gate_4(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "server/contexts/_ai-generated/x/index.js",
           "export const plugin = { async mount(r, ctx) { const { db } = await import('../../db.js'); db.prepare('x'); } };\n")
    diffs = [{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is True
    assert "db.js" in out["reason"]


# ── file NGOÀI plan vẫn phải qua lint/node-check thật ────

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


# ── size đo ĐÚNG file implementation, không tính lẫn test ─

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


# ── backslash path (Windows-style) vẫn bị chuẩn hoá ──────

def test_backslash_path_is_normalized_before_import_lint(tmp_path):
    plan = _plan([{"title": "t", "file": "server/contexts/_ai-generated/x/index.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "server/contexts/_ai-generated/x/index.js", "import { db } from '../../db.js';\n")
    diffs = [{"title": "t", "file": r"server\contexts\_ai-generated\x\index.js", "diff": "+x\n"}]

    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)})

    assert out["blocked"] is True
    assert "db.js" in out["reason"]


# ── a model-written test that cannot even be parsed: dropped, never shipped, when a harness oracle decides ──

ORACLE_REQUEST = "Thêm 'Xin chào' vào đầu trang"  # the quoted words give the harness a text oracle


def _broken_test_case(tmp_path):
    plan = _plan([{"title": "t", "file": "public/x.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "public/x.js", "export const x = 1;\n")
    _write(tmp_path, "test/x.test.js", "assert.ok(js.includes('<div class='a'>'));\n")  # unbalanced quotes
    return plan, [{"title": "t", "file": "public/x.js", "test_file": "test/x.test.js", "diff": "+x\n"}]


def test_unparseable_generated_test_is_dropped_when_a_harness_oracle_decides(tmp_path):
    plan, diffs = _broken_test_case(tmp_path)
    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path), "request_detail": ORACLE_REQUEST})
    assert out["blocked"] is False
    assert diffs[0]["test_file"] is None and not (tmp_path / "test/x.test.js").exists()
    assert any("dropped" in issue and "oracle" in issue for issue in out["issues"])


def test_unparseable_generated_test_without_an_oracle_is_dropped_when_no_plan_verify_names_it(tmp_path):
    plan, diffs = _broken_test_case(tmp_path)
    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path), "request_detail": "Đổi màu nền"})
    assert out["blocked"] is False
    assert diffs[0]["test_file"] is None and not (tmp_path / "test/x.test.js").exists()


def test_unparseable_generated_test_named_by_a_plan_verify_still_blocks(tmp_path):
    plan, diffs = _broken_test_case(tmp_path)
    plan["subtasks"][0]["verify"] = "node --test test/x.test.js"
    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path), "request_detail": "Đổi màu nền"})
    assert out["blocked"] is True and "test/x.test.js" in out["reason"] and "node --check" in out["reason"]


def test_forbidden_import_in_a_generated_test_still_blocks_even_with_an_oracle(tmp_path):
    plan = _plan([{"title": "t", "file": "public/x.js", "verify": "v", "size": "small"}])
    _write(tmp_path, "public/x.js", "export const x = 1;\n")
    _write(tmp_path, "test/x.test.js", "import { db } from '../server/db.js';\n")
    diffs = [{"title": "t", "file": "public/x.js", "test_file": "test/x.test.js", "diff": "+x\n"}]
    out = static_check.run({"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path), "request_detail": ORACLE_REQUEST})
    assert out["blocked"] is True and out["failure_class"] == "critical"


def test_content_review_root_allowance_exhaustion_is_budget_not_outage():
    from types import SimpleNamespace
    from runtime.budget import Budget, BudgetExhausted

    def call_model(*_args, **_kwargs):
        raise BudgetExhausted('root_allowance_exhausted')

    deps = SimpleNamespace(models=SimpleNamespace(gate1_model='guard', classifier_model=''), call_model=call_model)
    diffs = [{'file': 'public/x.html', 'diff': '+<h1>Study</h1>\n'}]
    result = static_check.content_review({'diffs': diffs}, deps, Budget())
    assert result['blocked'] is True
    assert result['failure_class'] == 'budget'
    assert result['reason'] == 'root_allowance_exhausted'


# ── hợp đồng giữa các bước: thiếu định nghĩa route/bảng/export → block ordinary ──

API = "server/contexts/_ai-generated/faq/index.js"
PAGE = "public/faq.html"
SQL = "server/contexts/_ai-generated/faq/migrations/001-faq.sql"


def _contract_plan(page_verify="node --test test/faq.test.js",
                   api_verify="curl -s localhost:8041/api/faq | grep -q items"):
    return _plan([{"title": "API FAQ", "file": API, "verify": api_verify, "size": "large", "layer": "backend"},
                  {"title": "Trang FAQ", "file": PAGE, "verify": page_verify, "size": "small", "layer": "frontend"}])


def _contract_state(tmp_path: Path, contents: dict, plan=None) -> dict:
    plan = plan or _contract_plan()
    for rel, code in contents.items():
        _write(tmp_path, rel, code)
    diffs = [{"title": step["title"], "file": step["file"], "diff": "+\n"} for step in plan["subtasks"]]
    return {"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path)}


def test_gate_4_blocks_when_a_page_uses_a_route_the_backend_never_defines(tmp_path):
    state = _contract_state(tmp_path, {API: "export const plugin = { name: 'faq' };\n",
                                       PAGE: "<script>fetch('/api/faq')</script>\n"})

    out = static_check.run(state)

    assert out["blocked"] is True and out["failure_class"] == "ordinary"
    assert PAGE in out["reason"] and API in out["reason"] and "/api/faq" in out["reason"]
    assert out["cross_check"]["count"] == 1
    assert out["needs_careful_review"] is True


def test_gate_4_passes_when_the_other_file_really_defines_the_route(tmp_path):
    state = _contract_state(tmp_path, {API: "router.get('/api/faq', (req, res) => res.json({ items: [] }));\n",
                                       PAGE: "<script>fetch('/api/faq')</script>\n"})

    out = static_check.run(state)

    assert out["blocked"] is False
    assert out["cross_check"] == {"count": 0, "findings": []}


def test_gate_4_does_not_block_an_ambiguous_contract_name(tmp_path):
    # cả hai bước cùng nêu /api/faq → không biết file nào phải định nghĩa → không chặn
    plan = _contract_plan(page_verify="curl -s localhost:8041/api/faq | grep -q items")
    state = _contract_state(tmp_path, {API: "export const plugin = {};\n", PAGE: "fetch('/api/faq');\n"}, plan)

    assert static_check.run(state)["blocked"] is False


def test_gate_4_does_not_block_when_the_owner_file_is_unreadable(tmp_path):
    plan = _contract_plan()
    _write(tmp_path, PAGE, "fetch('/api/faq');\n")  # file API không có trong scratch: không đủ chắc để chặn
    state = {"plan": plan, "diffs": [{"title": "p", "file": PAGE, "diff": "+\n"}], "scratch_repo": str(tmp_path)}

    assert static_check.run(state)["blocked"] is False


def test_gate_4_blocks_an_import_the_other_file_does_not_export(tmp_path):
    client = "public/js/features/faq/faq-client.js"
    plan = _plan([{"title": "API FAQ", "file": API, "verify": "curl -s localhost:8041/api/faq | grep -q items",
                   "size": "large", "layer": "backend"},
                  {"title": "Module FAQ", "file": client, "verify": "node --test test/faq.test.js",
                   "size": "small", "layer": "frontend"}])
    state = _contract_state(tmp_path, {
        API: "export const plugin = { name: 'faq' };\n",
        client: "import { loadFaq } from '../../../../server/contexts/_ai-generated/faq/index.js';\nexport const go = loadFaq;\n",
    }, plan)

    out = static_check.run(state)

    assert out["blocked"] is True and "loadFaq" in out["reason"] and client in out["reason"] and API in out["reason"]


def test_gate_4_blocks_sql_using_a_table_the_migration_never_creates(tmp_path):
    plan = _plan([{"title": "Migration FAQ", "file": SQL, "verify": "psql \"$DATABASE_URL\" -c 'select 1 from faq_entries'",
                   "size": "large", "layer": "db"},
                  {"title": "API FAQ", "file": API, "verify": "curl -s localhost:8041/api/faq | grep -q items",
                   "size": "large", "layer": "backend"}])
    state = _contract_state(tmp_path, {SQL: "create table if not exists something_else (id int);\n",
                                       API: "export const list = () => db.query('select id from faq_entries');\n"}, plan)

    out = static_check.run(state)

    assert out["blocked"] is True and "faq_entries" in out["reason"] and SQL in out["reason"]


def test_gate_4_evidence_records_the_contract_without_any_diff(tmp_path):
    state = _contract_state(tmp_path, {API: "export const plugin = {};\n", PAGE: "fetch('/api/faq');\n"})

    out = static_check.run(state)

    assert out["blocked"] is True
    assert out["contract"]["owners"]["/api/faq"] == [1]
    assert [step["file"] for step in out["contract"]["steps"]] == [API, PAGE]
    assert len(json.dumps(out["contract"], ensure_ascii=False)) <= subtask_contract.MAX_EVIDENCE_CHARS
    assert "fetch('/api/faq')" not in json.dumps(out, ensure_ascii=False)  # evidence không mang nội dung diff
