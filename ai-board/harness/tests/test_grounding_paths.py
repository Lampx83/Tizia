import subprocess

import pytest

from gates import grounding_paths as gp
from gates import grounding_paths


@pytest.fixture
def repo(tmp_path):
    for rel in ("public/index.html", "public/faq-co-so-du-lieu.html", "test/existing.test.js", "public/js/school.js"):
        (tmp_path / rel).parent.mkdir(parents=True, exist_ok=True)
        (tmp_path / rel).write_text("x")
    env = ["-c", "user.name=t", "-c", "user.email=t@t"]
    for args in (["init", "-q"], ["add", "."], [*env, "commit", "-qm", "i"]):
        subprocess.run(["git", "-C", str(tmp_path), *args], check=True)
    sha = subprocess.run(["git", "-C", str(tmp_path), "rev-parse", "HEAD"], capture_output=True, text=True).stdout.strip()
    return tmp_path, sha


def task(file, verify, title="t"):
    return {"title": title, "file": file, "verify": verify, "size": "small"}


def root39_plan():
    """Hình plan request 10 (root 39): trang slug thư mục bị coi là có sẵn, hai đường test khác nhau."""
    return {"acceptance": ["node --test test/faq.test.js"], "subtasks": [
        task("public/faq-co-so-du-lieu.html", "node --test test/faq-co-so-du-lieu.test.js",
             "Thêm link vào public/them-trang-faq-mon-co-so-du-lieu-4.html có sẵn")]}


def test_root39_plan_is_rejected_with_nearest_real_file(repo):
    source, sha = repo
    with pytest.raises(ValueError) as err:
        gp.check_references(root39_plan(), source, sha)
    assert "them-trang-faq-mon-co-so-du-lieu-4.html" in str(err.value) or "test/faq" in str(err.value)


def test_each_inconsistent_test_path_is_reported(repo):
    source, sha = repo
    bad = gp.ungrounded(root39_plan(), gp.listing(source, sha))
    assert set(bad) == {"public/them-trang-faq-mon-co-so-du-lieu-4.html", "test/faq.test.js", "test/faq-co-so-du-lieu.test.js"}


def test_message_names_bm25_nearest_file(repo):
    source, sha = repo
    plan = {"subtasks": [task("public/index.html", "mở trang", "Sửa public/faq-co-so-du-lieu-moi.html có sẵn")]}
    with pytest.raises(ValueError, match="faq-co-so-du-lieu.html"):
        gp.check_references(plan, source, sha)


def test_consistent_plan_passes(repo):
    source, sha = repo
    plan = {"acceptance": ["node --test test/faq.test.js"], "subtasks": [
        task("public/faq-co-so-du-lieu.html", "node --test test/faq.test.js", "Sửa public/index.html"),
        task("test/faq.test.js", "node --test test/faq.test.js"),
        task("public/index.html", "node --test test/existing.test.js")]}
    gp.check_references(plan, source, sha)


def test_no_sha_or_empty_listing_skips(repo):
    source, _ = repo
    gp.check_references(root39_plan(), source, None)
    assert gp.listing(source, "0" * 40) == set()


def test_bm25_ranks_deterministically():
    paths = {"public/faq-co-so-du-lieu.html", "public/index.html", "public/js/school.js"}
    assert gp.bm25_top("faq co so du lieu", paths)[0][0] == "public/faq-co-so-du-lieu.html"
    assert gp.bm25_top("zzz", paths) == []


SO_TAY_REQUEST = {"subject": "Thêm trang Sổ tay Git", "body": "Kiểm tra: node --test test/so-tay-git.test.js xác nhận trang"}


def so_tay_plan(with_test=False):
    return {"subtasks": [task("public/so-tay-git.html", "node --test test/so-tay-git.test.js"),
                         task("public/js/school.js", "node --test test/so-tay-git.test.js")]}








def test_nearest_files_ignore_harness_and_single_token_matches():
    paths = {"ai-board/harness/tests/test_eval_git.py", "public/bao-so-hoc.html", "public/dem-ngon-tay.html"}
    assert gp.bm25_top("public/so-tay-git.html", paths) == []


def test_error_message_has_no_placeholder_path_for_the_repeat_signature(repo):
    from runtime import objection_repeat
    source, sha = repo
    with pytest.raises(ValueError) as err:
        gp.check_references(so_tay_plan(False), source, sha, {})
    stopped = {"gate": 1, "result": {"reason": f"plan không hợp lệ: {err.value}"}}
    assert objection_repeat.describe(stopped)["paths"] == ["test/so-tay-git.test.js"]


def test_signature_ignores_extensionless_placeholders():
    from runtime import objection_repeat
    reason = "mỗi test/file nhắc tới; xem public/a.html và public/js/x"
    assert objection_repeat.describe({"gate": 1, "result": {"reason": reason}})["paths"] == ["public/a.html"]


def root43_plan():
    pages = ["public/so-tay-git.html", "public/js/domains/it/experiences.js", "public/js/domains/it/modules.js",
             "public/campus-proto/b-iso-canvas.html"]
    return {"summary_vi": "Thêm trang Sổ tay Git.", "capabilities": ["public.ui"], "acceptance": ["node --test test/so-tay-git.test.js"],
            "subtasks": [{"title": f"Sửa {p}", "file": p, "size": "small", "layer": "frontend",
                          "verify": "node --test test/so-tay-git.test.js"} for p in pages]}


ROOT43_REQUEST = {"subject": "Thêm trang Sổ tay Git cho Trường CNTT", "type": "feature", "domain": "it", "complexity_by_server": True,
                  "body": "Tạo public/so-tay-git.html. Kiểm tra: node --test test/so-tay-git.test.js xác nhận trang tồn tại"}


def test_request_named_test_is_a_valid_new_target_without_a_subtask(repo):
    source, sha = repo
    gp.check_references(so_tay_plan(), source, sha, SO_TAY_REQUEST)


def test_test_path_the_request_did_not_name_stays_closed_world(repo):
    source, sha = repo
    with pytest.raises(ValueError, match="test/so-tay-git.test.js"):
        gp.check_references(so_tay_plan(), source, sha, {"subject": "s", "body": "không nêu test"})
    assert "file gần nhất" not in _msg(so_tay_plan(), source, sha)


def _msg(plan, source, sha):
    try:
        gp.check_references(plan, source, sha, {})
    except ValueError as err:
        return str(err)


def root43_plan():
    pages = ["public/so-tay-git.html", "public/js/domains/it/experiences.js", "public/js/domains/it/modules.js",
             "public/campus-proto/b-iso-canvas.html"]
    return {"summary_vi": "Thêm trang Sổ tay Git.", "capabilities": ["public.ui"], "acceptance": ["node --test test/so-tay-git.test.js"],
            "subtasks": [{"title": f"Sửa {p}", "file": p, "size": "small", "layer": "frontend",
                          "verify": "node --test test/so-tay-git.test.js"} for p in pages]}


ROOT43_REQUEST = {"subject": "Thêm trang Sổ tay Git cho Trường CNTT", "type": "feature", "domain": "it", "complexity_by_server": True,
                  "body": "Tạo public/so-tay-git.html. Kiểm tra: node --test test/so-tay-git.test.js xác nhận trang tồn tại"}


def test_gate1_run_accepts_root43_plan_without_a_test_subtask(repo):
    import json
    from budget import Budget
    from conftest import FakeModels, deps_with
    from gates import brainstorm

    source, _ = repo
    for rel in ("public/js/domains/it/experiences.js", "public/js/domains/it/modules.js", "public/campus-proto/b-iso-canvas.html"):
        (source / rel).parent.mkdir(parents=True, exist_ok=True)
        (source / rel).write_text("x")
    subprocess.run(["git", "-C", str(source), "add", "."], check=True)
    subprocess.run(["git", "-C", str(source), "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-qm", "pages"], check=True)
    out = brainstorm.run(ROOT43_REQUEST, deps_with(FakeModels(root43_plan())), Budget(), source=source)
    assert out["blocked"] is False, out["reason"]
    assert [t["file"] for t in out["plan"]["subtasks"]][-1] == "public/campus-proto/b-iso-canvas.html"
    assert not any(t["file"].startswith("test/") for t in out["plan"]["subtasks"])


def test_server_422_body_is_kept_in_the_worker_error():
    import io
    import urllib.error
    from worker import _with_body

    body = b'{"code":"scope_not_granted","reason":"scope test/x.js is not granted to capability generated.context"}'
    error = urllib.error.HTTPError("http://x/plan", 422, "Unprocessable Entity", {}, io.BytesIO(body))
    assert "scope_not_granted" in str(_with_body(error)) and "not granted" in str(_with_body(
        urllib.error.HTTPError("http://x/plan", 422, "Unprocessable Entity", {}, io.BytesIO(body))))


FILES = {
    "public/js/features/faq/search.js": "export function filterQuestions(list, term) { return list.filter((q) => q.includes(term)); }\n" * 3,
    "public/other.html": "<html><body>không liên quan gì</body></html>",
}
CLAIM = "đã có hàm filterQuestions lọc danh sách câu hỏi theo từ khoá"


def test_bm25_parameters_come_from_the_contract():
    assert grounding_paths.CONFIG["bm25"] == {"k": 3, "k1": 1.5, "b": 0.75, "min_shared_terms": 2, "top": 3}
    assert grounding_paths.CONFIG["similar_exists"]["min_score"] > 0


def test_similar_exists_has_basis_only_when_evidence_file_ranks_in_bm25_top():
    assert grounding_paths.similar_basis(CLAIM, {"public/js/features/faq/search.js"}, FILES) is True
    assert grounding_paths.similar_basis(CLAIM, {"public/other.html"}, FILES) is False
    assert grounding_paths.similar_basis("hoàn toàn khác biệt xyz", {"public/js/features/faq/search.js"}, FILES) is False


def test_exists_objection_without_bm25_basis_is_advisory_and_with_basis_still_blocks():
    from gates import plan_validate
    snippet = "export function filterQuestions(list, term)"
    objection = lambda file: {"claim": CLAIM, "evidence": [{"file": file, "snippet": snippet}]}
    files = FILES
    grounded = {"grounded": False, "objection": objection("public/js/features/faq/search.js")}
    assert plan_validate.objection_advisory(grounded, files) is None
    weak = {"grounded": False, "objection": {"claim": CLAIM, "evidence": [{"file": "public/other.html", "snippet": "không liên quan gì"}]}}
    assert "BM25" in plan_validate.objection_advisory(weak, files)
    unverified = {"grounded": False, "objection": {"claim": CLAIM, "evidence": [{"file": "public/other.html", "snippet": "không có"}]}}
    assert plan_validate.objection_advisory(unverified, files) is not None
