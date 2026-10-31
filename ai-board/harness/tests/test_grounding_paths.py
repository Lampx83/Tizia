import subprocess

import pytest

from gates import grounding_paths as gp


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


def so_tay_plan(with_test):
    subtasks = [task("public/so-tay-git.html", "node --test test/so-tay-git.test.js"),
                task("public/js/school.js", "node --test test/so-tay-git.test.js")]
    if with_test:
        subtasks.append(task("test/so-tay-git.test.js", "node --test test/so-tay-git.test.js"))
    return {"subtasks": subtasks}


def test_request_named_test_that_no_step_creates_is_repairable_and_has_no_noise_hint(repo):
    source, sha = repo
    with pytest.raises(ValueError) as err:
        gp.check_references(so_tay_plan(False), source, sha, SO_TAY_REQUEST)
    message = str(err.value)
    assert "test/so-tay-git.test.js" in message and "tạo" in message
    assert "file gần nhất" not in message and "test_eval_git" not in message


def test_request_named_test_created_by_a_step_passes(repo):
    source, sha = repo
    gp.check_references(so_tay_plan(True), source, sha, SO_TAY_REQUEST)


def test_request_named_test_missing_alone_is_reported(repo):
    source, sha = repo
    plan = {"subtasks": [task("public/so-tay-git.html", "mở trang")]}
    assert gp.named_tests_missing(SO_TAY_REQUEST, plan, gp.listing(source, sha)) == ["test/so-tay-git.test.js"]


def test_nearest_files_ignore_harness_and_single_token_matches():
    paths = {"ai-board/harness/tests/test_eval_git.py", "public/bao-so-hoc.html", "public/dem-ngon-tay.html"}
    assert gp.bm25_top("public/so-tay-git.html", paths) == []


def test_error_message_has_no_placeholder_path_for_the_repeat_signature(repo):
    from runtime import objection_repeat
    source, sha = repo
    with pytest.raises(ValueError) as err:
        gp.check_references(so_tay_plan(False), source, sha, SO_TAY_REQUEST)
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


def test_root43_named_test_is_appended_deterministically(repo):
    source, sha = repo
    plan = root43_plan()
    out = gp.with_named_tests(plan, ROOT43_REQUEST, gp.listing(source, sha))
    last = out["subtasks"][-1]
    assert len(out["subtasks"]) == 5 and last["file"] == "test/so-tay-git.test.js"
    assert last["verify"] == "node --test test/so-tay-git.test.js" and last["depends_on"] == [1, 2, 3, 4]
    gp.check_references(out, source, sha, ROOT43_REQUEST)


def test_named_test_already_in_plan_or_repo_is_left_alone(repo):
    source, sha = repo
    files = gp.listing(source, sha)
    assert gp.with_named_tests(so_tay_plan(True), SO_TAY_REQUEST, files)["subtasks"] == so_tay_plan(True)["subtasks"]
    existing = {"subject": "x", "body": "node --test test/existing.test.js"}
    assert gp.with_named_tests(so_tay_plan(False), existing, files) == so_tay_plan(False)


def test_unnamed_paths_stay_closed_world(repo):
    source, sha = repo
    plan = {"subtasks": [task("public/index.html", "node --test test/invented.test.js")]}
    out = gp.with_named_tests(plan, {"subject": "s", "body": "không nêu test"}, gp.listing(source, sha))
    assert out == plan
    with pytest.raises(ValueError):
        gp.check_references(out, source, sha, {})


def test_gate1_run_accepts_root43_plan_with_appended_test(repo, monkeypatch):
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
    out = brainstorm.run(ROOT43_REQUEST, deps_with(FakeModels(json.loads(json.dumps(root43_plan())))), Budget(), source=source)
    assert out["blocked"] is False, out["reason"]
    assert out["plan"]["subtasks"][-1]["file"] == "test/so-tay-git.test.js"
