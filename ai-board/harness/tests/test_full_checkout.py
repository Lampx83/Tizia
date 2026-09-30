"""Ticket 04: AI Board worktree/branch with one commit per ordered child.

Git runs for real, but only inside tmp_path repos — never the Tizia checkout.
"""
import hashlib
import json
import re
import subprocess
from dataclasses import replace
from pathlib import Path

import pytest

import candidate
import main
from gates import implement


def git(cwd, *args):
    return subprocess.run(["git", *args], cwd=cwd, check=True, capture_output=True, text=True, encoding="utf-8",
                          stdin=subprocess.DEVNULL).stdout.strip()


@pytest.fixture
def source(tmp_path):
    repo = tmp_path / "source"
    (repo / "public").mkdir(parents=True)
    (repo / "public" / "a.html").write_text("<p>old a</p>\n", encoding="utf-8")
    (repo / "test").mkdir()
    (repo / "test" / "trusted.test.js").write_text("// trusted\n", encoding="utf-8")
    git(repo, "init", "-q")
    git(repo, "-c", "user.name=t", "-c", "user.email=t@t", "add", "-A")
    git(repo, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "base")
    return repo


def child(scratch, title, file, code, test_file="test/generated.test.js", test="// t\n"):
    diff = implement._write_and_diff(scratch, file, code, test_file, test)
    return {"title": title, "file": file, "test_file": test_file, "diff": diff,
            "commit": git(scratch, "rev-parse", "HEAD")}


def state_for(tmp_path, children, scopes=None):
    subtasks = [{"title": c["title"], "file": c["file"], "size": "small",
                 "allowed_scope": (scopes or {}).get(c["title"], [c["file"]])} for c in children]
    return {"skill_id": "ticket-7", "scratch_repo": str(tmp_path / "scratch"),
            "plan": {"subtasks": subtasks}, "diffs": children}


def test_children_commit_in_order_on_an_ai_board_branch(tmp_path, source):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    children = [
        child(scratch, "Sửa trang A", "public/a.html", "<p>new a</p>\n", "test/a.test.js"),
        child(scratch, "Thêm trang B", "public/b.html", "<p>b</p>\n", "test/b.test.js"),
    ]
    state = state_for(tmp_path, children)
    head_before = git(source, "rev-parse", "HEAD")

    candidate.create(state, source)
    try:
        branch = state["branch"]
        assert re.fullmatch(r"ai-board/\d{4}-\d{2}-\d{2}-ticket-7-[0-9a-f]{6}", branch)
        checkout = Path(state["full_checkout"])
        assert git(checkout, "branch", "--show-current") == branch
        assert (checkout / "public" / "a.html").read_text(encoding="utf-8").strip() == "<p>new a</p>"
        # One commit per child, in plan order, directly on top of the base.
        log = git(checkout, "log", "--format=%H %P %s", f"{state['base_sha']}..HEAD").splitlines()[::-1]
        assert [line.split(" ", 2)[2] for line in log] == [
            "ai-board(ticket-7): 1/2 Sửa trang A", "ai-board(ticket-7): 2/2 Thêm trang B"]
        assert log[0].split()[1] == state["base_sha"] == head_before
        assert log[1].split()[1] == log[0].split()[0]
        assert [c["files"] for c in state["commits"]] == [
            ["public/a.html", "test/a.test.js"], ["public/b.html", "test/b.test.js"]]
        assert "public/a.html" in state["full_diff"][0]["diff"]
        # The human's checkout is untouched.
        assert git(source, "rev-parse", "HEAD") == head_before
        assert (source / "public" / "a.html").read_text(encoding="utf-8") == "<p>old a</p>\n"
    finally:
        candidate.cleanup(state, keep_branch=True)
    assert not Path(state["full_checkout"]).exists()
    assert git(source, "branch", "--list", branch).strip().endswith(branch)


def test_out_of_scope_file_is_rejected_without_leaving_a_branch(tmp_path, source):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    children = [child(scratch, "Lạc phạm vi", "server/index.js", "// hijack\n")]
    state = state_for(tmp_path, children, scopes={"Lạc phạm vi": ["public/a.html"]})

    with pytest.raises(candidate.ScopeViolation, match="server/index.js"):
        candidate.create(state, source)
    assert "full_checkout" not in state
    assert git(source, "branch", "--list", "ai-board/*") == ""
    assert len(git(source, "worktree", "list").splitlines()) == 1


def test_generated_test_outside_test_dirs_is_rejected(tmp_path, source):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    children = [child(scratch, "x", "public/a.html", "<p>x</p>\n", test_file="public/evil.test.js")]
    with pytest.raises(candidate.ScopeViolation, match="public/evil.test.js"):
        candidate.create(state_for(tmp_path, children), source)


def test_existing_trusted_test_is_not_overwritten(tmp_path, source):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    children = [child(scratch, "x", "public/a.html", "<p>x</p>\n", test_file="test/trusted.test.js")]
    with pytest.raises(candidate.ScopeViolation, match="đã tồn tại"):
        candidate.create(state_for(tmp_path, children), source)
    assert git(source, "branch", "--list", "ai-board/*") == ""


def test_rerun_after_a_kept_candidate_gets_its_own_branch(tmp_path, source):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    children = [child(scratch, "x", "public/a.html", "<p>x</p>\n")]
    first, second = state_for(tmp_path, children), state_for(tmp_path, children)
    candidate.create(first, source)
    candidate.cleanup(first, keep_branch=True)
    candidate.create(second, source)
    candidate.cleanup(second, keep_branch=True)
    assert first["branch"] != second["branch"]
    assert len(git(source, "branch", "--list", "ai-board/*").splitlines()) == 2


def test_cleanup_without_keep_deletes_the_branch(tmp_path, source):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    state = state_for(tmp_path, [child(scratch, "x", "public/a.html", "<p>x</p>\n")])
    candidate.create(state, source)
    candidate.cleanup(state, keep_branch=False)
    assert git(source, "branch", "--list", "ai-board/*") == ""
    assert not Path(state["full_checkout"]).exists()


def test_missing_git_checkout_blocks_gate_5_clearly(tmp_path, fake_deps):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    state = state_for(tmp_path, [child(scratch, "x", "public/a.html", "<p>x</p>\n")])
    state["checkout_source"] = str(tmp_path / "not-a-repo")
    (tmp_path / "not-a-repo").mkdir()

    out = main.run_gate(5, {}, replace(fake_deps, verify=None), None, state)

    assert out["blocked"] is True
    assert out["reason"].startswith("không tạo được full_checkout")
    assert out["failure_class"] == "transient"


def test_scope_violation_at_gate_5_is_critical(tmp_path, source, fake_deps):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    state = state_for(tmp_path, [child(scratch, "x", "server/index.js", "// x\n")],
                      scopes={"x": ["public/a.html"]})
    state["checkout_source"] = str(source)

    out = main.run_gate(5, {}, replace(fake_deps, verify=None), None, state)

    assert out["blocked"] is True
    assert out["failure_class"] == "critical"


def test_gate_4_lint_block_needs_no_worktree(tmp_path, source, fake_deps):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    state = state_for(tmp_path, [child(scratch, "x", "public/a.js", "import db from '../server/db.js';\n")])
    state["checkout_source"] = str(source)

    out = main.run_gate(4, {}, fake_deps, None, state)

    assert out["blocked"] is True and out["failure_class"] == "critical"
    assert "full_checkout" not in state
    assert git(source, "branch", "--list", "ai-board/*") == ""


def test_gate_4_without_gate_3_output_blocks_instead_of_raising(tmp_path, source, fake_deps):
    out = main.run_gate(4, {}, fake_deps, None, {"skill_id": "ticket-7", "checkout_source": str(source),
                                                 "plan": {"subtasks": []}})
    assert out["blocked"] is True
    assert "diffs" in out["reason"]


def test_gate_4_blocks_a_path_outside_the_catalog_before_docker(tmp_path, source, fake_deps):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    state = state_for(tmp_path, [child(scratch, "x", "public/a.html", "<p>x</p>\n")])
    state["checkout_source"] = str(source)
    state["catalog"] = {"generated.context": {"tier": "surface", "allow": ["server/contexts/_ai-generated/"],
                                              "deny": []}}
    try:
        out = main.run_gate(4, {}, fake_deps, None, state)
    finally:
        candidate.cleanup(state, keep_branch=False)

    assert out["blocked"] is True and out["failure_class"] == "critical"
    assert "public/a.html" in out["reason"] and "catalog" in out["checks"]


def test_gate_4_size_flag_counts_the_real_base_diff_not_the_scratch_rewrite(tmp_path, source, fake_deps):
    page = "".join(f"<p>line {i}</p>\n" for i in range(100))
    (source / "public" / "big.html").write_text(page, encoding="utf-8")
    git(source, "add", "-A")
    git(source, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "big page")
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    edited = page.replace("<p>line 7</p>", "<p>line seven</p>")
    state = state_for(tmp_path, [child(scratch, "x", "public/big.html", edited)])
    state["checkout_source"] = str(source)
    assert state["diffs"][0]["diff"].count("\n+<p>") == 100  # scratch sees the whole file as new

    try:
        out = main.run_gate(4, {}, fake_deps, None, state)
    finally:
        candidate.cleanup(state, keep_branch=False)

    assert out["blocked"] is False
    assert not any("vượt" in issue for issue in out["issues"])
    assert out["needs_careful_review"] is False


def test_gate_4_allows_contacts_already_public_at_the_base_commit(tmp_path, source, fake_deps):
    (source / "public" / "contact.html").write_text("<p>hotro@truong.edu.vn · 0912345678</p>\n", encoding="utf-8")
    git(source, "add", "-A")
    git(source, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "contact page")
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    page = "<p>old a</p>\n<p>Liên hệ hotro@truong.edu.vn, 0912345678</p>\n"
    state = state_for(tmp_path, [child(scratch, "x", "public/a.html", page)])
    state["checkout_source"] = str(source)

    try:
        out = main.run_gate(4, {}, fake_deps, None, state)
    finally:
        candidate.cleanup(state, keep_branch=False)

    assert not any(issue.startswith("pii") for issue in out["issues"])  # base's own contacts are allowlisted
    assert out["blocked"] is False


def test_long_skill_id_still_yields_a_contract_branch_name():
    branch = candidate.branch_name("ticket-" + "Rất dài " * 40)
    assert candidate.BRANCH_PATTERN.fullmatch(branch), branch
    assert re.search(r"-[0-9a-f]{6}$", branch)  # truncation keeps the unique suffix
    with pytest.raises(ValueError):
        candidate.branch_name("!!!")


# ── Feature-folders ticket 05: every run of a folder cycle commits onto one branch ──

def _commit_file(repo, rel, text, msg):
    (Path(repo) / rel).parent.mkdir(parents=True, exist_ok=True)
    (Path(repo) / rel).write_text(text, encoding="utf-8")
    git(repo, "-c", "user.name=t", "-c", "user.email=t@t", "add", "-A")
    git(repo, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", msg)


def _folder_run(tmp_path, source, branch, name, file, text):
    """1 lượt folder như worker: nguồn = đỉnh nhánh đã gộp HEAD, candidate nối tiếp nhánh."""
    path, tip = candidate.folder_source(source, branch, "HEAD")
    scratch = implement._ensure_scratch_repo(tmp_path / f"scratch-{name}")
    state = state_for(tmp_path, [child(scratch, name, file, text, f"test/{name}.test.js")])
    state["scratch_repo"] = str(scratch)
    state.update(branch_name=branch, branch_restore=tip)
    candidate.create(state, path, base_ref=git(path, "rev-parse", "HEAD"))
    return path, tip, state


def test_folder_runs_stack_on_one_branch_and_pick_up_dev(tmp_path, source):
    branch = candidate.folder_branch("tro-doan-tu")
    path, tip, first = _folder_run(tmp_path, source, branch, "trang", "public/game.html", "<p>v1</p>\n")
    assert tip is None and first["branch"] == branch
    candidate.cleanup(first, keep_branch=True)
    candidate.drop_source(source, path)
    _commit_file(source, "public/other.html", "<p>dev moved</p>\n", "dev work")  # dev tiến lên giữa 2 lượt

    path, tip, second = _folder_run(tmp_path, source, branch, "diem", "public/game.js", "export const s = 1;\n")
    try:
        assert tip == first["commits"][-1]["sha"]
        checkout = Path(second["full_checkout"])
        # Lượt 2 thấy code lượt 1 và code dev mới.
        assert (checkout / "public" / "game.html").read_text(encoding="utf-8") == "<p>v1</p>\n"
        assert (checkout / "public" / "other.html").exists()
    finally:
        candidate.cleanup(second, keep_branch=True)
        candidate.drop_source(source, path)
    subjects = git(source, "log", "--format=%s", branch).splitlines()
    assert subjects[0].endswith("1/1 diem") and any(s.endswith("1/1 trang") for s in subjects)
    assert git(source, "branch", "--list", "ai-board/*").strip().endswith(branch)  # vẫn 1 nhánh


def test_a_failed_folder_run_puts_the_branch_back_instead_of_deleting_it(tmp_path, source):
    branch = candidate.folder_branch("bang-xep-hang")
    path, _, first = _folder_run(tmp_path, source, branch, "trang", "public/rank.html", "<p>v1</p>\n")
    candidate.cleanup(first, keep_branch=True)
    candidate.drop_source(source, path)
    kept = git(source, "rev-parse", branch)
    path, _, second = _folder_run(tmp_path, source, branch, "loi", "public/rank.js", "x\n")
    candidate.cleanup(second, keep_branch=False)
    candidate.drop_source(source, path)
    assert git(source, "rev-parse", branch) == kept


def test_a_folder_that_conflicts_with_dev_stops_for_a_human(tmp_path, source):
    branch = candidate.folder_branch("xung-dot")
    path, _, first = _folder_run(tmp_path, source, branch, "a", "public/a.html", "<p>folder</p>\n")
    candidate.cleanup(first, keep_branch=True)
    candidate.drop_source(source, path)
    _commit_file(source, "public/a.html", "<p>dev</p>\n", "dev edits the same line")
    before = git(source, "worktree", "list")
    with pytest.raises(candidate.FolderConflict):
        candidate.folder_source(source, branch, "HEAD")
    assert git(source, "worktree", "list") == before  # không để lại worktree


SKILL = "ai-board/harness/skills/demo/SKILL.md"
SKILLS_LOCK = "ai-board/harness/skills/skills.lock.json"
PROMPTS_LOCK = "ai-board/harness/prompts/prompts.lock.json"
SELF_CATALOG = {"self.config": {"tier": "protected",
                                "allow": ["ai-board/harness/skills/", "ai-board/harness/prompts/",
                                          "ai-board/harness/retrieval_weights.json"],
                                "deny": [SKILLS_LOCK, PROMPTS_LOCK, "ai-board/harness/prompts/AIBOARD.md"]}}


def _sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


@pytest.fixture
def board_source(tmp_path):
    """Repo có skill + prompt thật và 2 file khoá đúng hash."""
    repo = tmp_path / "board"
    files = {SKILL: b"match: sua chu\n", "ai-board/harness/prompts/brainstorm.md": b"plan\n",
             ".gitattributes": b"ai-board/harness/prompts/*.md text eol=lf\nai-board/harness/skills/*/SKILL.md text eol=lf\n"}
    for rel, data in files.items():
        (repo / rel).parent.mkdir(parents=True, exist_ok=True)
        (repo / rel).write_bytes(data)
    (repo / SKILLS_LOCK).write_text(json.dumps({"demo": _sha(files[SKILL])}, indent=2) + "\n", encoding="utf-8")
    (repo / PROMPTS_LOCK).write_text(json.dumps({"brainstorm.md": _sha(b"plan\n")}, indent=2) + "\n", encoding="utf-8")
    git(repo, "init", "-q")
    git(repo, "-c", "user.name=t", "-c", "user.email=t@t", "add", "-A")
    git(repo, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "base")
    return repo


def _skill_edit(tmp_path, board_source, request_type):
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    state = state_for(tmp_path, [child(scratch, "Thêm từ khoá", SKILL, "match: sua chu, doi ten\n",
                                       "tests/test_demo_skill.py", "def test_x():\n    pass\n")])
    state.update(checkout_source=str(board_source), catalog=SELF_CATALOG, request_type=request_type)
    return state


def test_a_self_skill_edit_passes_gate_4_and_the_pipeline_relocks_in_the_same_commit(tmp_path, board_source, fake_deps):
    state = _skill_edit(tmp_path, board_source, "self")
    try:
        out = main.run_gate(4, {}, fake_deps, None, state)
        assert out["blocked"] is False, out
        checkout = Path(state["full_checkout"])
        lock = json.loads((checkout / SKILLS_LOCK).read_text(encoding="utf-8"))
        assert lock == {"demo": _sha((checkout / SKILL).read_bytes())} != {"demo": _sha(b"match: sua chu\n")}
        # Khoá nằm trong đúng commit của thay đổi: không commit thêm, không file bẩn, head mới về server.
        assert git(checkout, "rev-list", "--count", f"{state['base_sha']}..HEAD") == "1"
        assert state["commits"][-1]["sha"] == git(checkout, "rev-parse", "HEAD")
        assert git(checkout, "status", "--porcelain") == ""
        changed = git(checkout, "show", "--name-only", "--format=", "HEAD").split()
        assert SKILLS_LOCK in changed and SKILLS_LOCK in state["commits"][-1]["files"]
        assert PROMPTS_LOCK not in changed  # prompt không đổi → khoá prompt giữ nguyên
    finally:
        candidate.cleanup(state, keep_branch=False)


def test_the_same_skill_edit_is_a_protected_path_for_any_other_request(tmp_path, board_source, fake_deps):
    state = _skill_edit(tmp_path, board_source, "other")
    try:
        out = main.run_gate(4, {}, fake_deps, None, state)
        assert out["blocked"] is True and out["failure_class"] == "critical"
        assert "protected_path" in out["reason"]
        assert sorted(git(Path(state["full_checkout"]), "show", "--name-only", "--format=", "HEAD").split()) == [
            SKILL, "tests/test_demo_skill.py"]  # không tính lại khoá
    finally:
        candidate.cleanup(state, keep_branch=False)
