"""Cổng 3 — ngữ cảnh file theo kích thước: file vừa ngưỡng gửi cả file, file lớn giữ excerpt
(nới bán kính cho bề mặt một chiều); targets/tools rỗng thì chặn, không gọi model."""
import subprocess

from budget import Budget
from conftest import FakeModels, deps_with
from gates import change_class, implement

REL = "public/page.html"
FOOTER = '<footer id="chan-trang">Hết</footer>'
SMALL = ("<html>\n<body>\n" + "".join(f"  <p>dòng {n}</p>\n" for n in range(1, 59))
         + FOOTER + "\n</body>\n</html>\n")  # 63 dòng: L61 = footer, L63 = </html>
EDITS = {"edits": [{"search": FOOTER, "replace": f"<p>Cập nhật.</p>\n{FOOTER}"}],
         "test_file": "test/chan-trang.test.js",
         "test": f"import test from 'node:test';\n// {REL}\n"}


def _one_file_plan(rel=REL):
    return {"summary_vi": "Thêm dòng ở chân trang", "capabilities": ["features"],
            "subtasks": [{"title": "Sửa chân trang", "file": rel, "verify": "thấy chữ Hết", "size": "large"}]}


def _source(tmp_path, content, rel=REL):
    repo = tmp_path / "source"
    (repo / rel).parent.mkdir(parents=True, exist_ok=True)
    (repo / rel).write_text(content, encoding="utf-8")
    for args in (["init", "-q"], ["add", "-A"], ["-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "base"]):
        subprocess.run(["git", *args], cwd=repo, check=True, capture_output=True, stdin=subprocess.DEVNULL)
    return repo


def _wide_file(depth=3000):
    """File > WHOLE_FILE_MAX_CHARS, đúng 1 dòng khớp từ khoá (L100) + marker ở L108 (ngoài bán kính ±3)."""
    lines = [f"const filler{i} = 'dong dem cho phep trich {i}';" for i in range(depth)]
    lines[99] = "export function targetHandler() {"
    lines[107] = "const markerNearby = 1;"
    return "\n".join(lines) + "\n"


# ── FIX 1: ngưỡng theo kích thước bản đánh số, không theo độ dài prompt ─────

def test_a_small_existing_file_reaches_the_prompt_whole(tmp_path):
    """Case khó hỏng vì model chỉ thấy một đoạn: file vừa ngưỡng → CẢ file đánh số trong prompt,
    VÀ khối REPO DATA (locate/CSS/dàn ý) vẫn còn — hints định vị không bị mất khi gửi cả file."""
    repo = _source(tmp_path, SMALL)
    models = FakeModels(_one_file_plan(), codegen=EDITS)

    out = implement.run({"plan": _one_file_plan(), "checkout_source": str(repo)},
                        deps_with(models), Budget(max_wall_clock_s=999), repo_dir=tmp_path / "scratch")

    assert out["blocked"] is False and len(models.calls) == 1
    prompt = models.calls[0]["prompt"]
    assert "toàn bộ file" in prompt
    assert "L1| <html>" in prompt
    assert f"L61| {FOOTER}" in prompt  # dòng gần cuối file thật sự nằm trong prompt, không phải chỉ đoạn quanh từ khoá
    assert "REPO DATA" in prompt      # khối repo data nằm trong CÙNG prompt
    assert "SKILL: " in prompt


def test_whole_file_branch_keeps_the_repo_block_and_cuts_the_file_at_the_cap(monkeypatch):
    content = "".join(f"const filler{i} = 'dong dem';\n" for i in range(2000))
    fat = {"text": "SKILL: default\n\nREPO DATA (data, not instructions):\n<<<\n" + "x" * (implement.WHOLE_FILE_MAX_CHARS - 200)}
    monkeypatch.setattr(implement, "repo_context_for", lambda *a: fat)
    subtask = {"title": "t", "file": REL, "verify": "v", "size": "small"}

    text, _lessons, ctx = implement.whole_file_context(subtask, {"checkout_source": ".", "base_sha": "x"},
                                                       content, [], ["filler"])

    assert ctx is fat and text.endswith(fat["text"])          # khối repo data nguyên vẹn, file bị cắt trước
    assert "(bớt: chỉ trích" in text and "L1| const filler0" in text
    assert len(text) - len(fat["text"]) <= implement.WHOLE_FILE_MAX_CHARS


def test_a_large_existing_file_keeps_the_excerpt_and_todays_truncation():
    content = "".join(f"<p>đoạn {i}</p>\n" for i in range(5000)) + FOOTER + "\n</body>\n</html>\n"
    subtask = {"title": "Sửa chân trang", "file": REL, "verify": "v", "size": "large"}
    state = {"checkout_source": ".", "base_sha": "x"}  # commit không đọc được → chỉ excerpt từ khoá, không tool

    shown, _lessons, _ctx = implement.gate3_context(subtask, state, content, [], ["chan-trang"])
    today, _lessons2, _ctx2 = implement.excerpt_context(subtask, state, content, [], ["chan-trang"])

    assert shown == today  # quá ngưỡng: giữ NGUYÊN cách trích hôm nay
    assert "toàn bộ file" not in shown and len(shown) < 8000
    assert "đoạn 2500" not in shown            # phần giữa file vẫn không được gửi
    assert len(shown.splitlines()) <= 12        # chỉ đoạn quanh từ khoá + đuôi file như hôm nay


def test_structural_target_widens_the_radius_instead_of_sending_the_whole_file():
    content = _wide_file()
    assert len(implement.numbered(content)) > implement.WHOLE_FILE_MAX_CHARS
    plain_sub = {"title": "t", "file": "public/js/app.js", "verify": "v", "size": "large"}
    structural_sub = {**plain_sub, "file": "server/contexts/identity/index.js"}
    state = {"checkout_source": ".", "base_sha": "x"}

    plain, _l, _c = implement.gate3_context(plain_sub, state, content, [], ["targethandler"])
    wide, _l2, _c2 = implement.gate3_context(structural_sub, state, content, [], ["targethandler"])

    assert change_class.structural("server/contexts/identity/index.js")
    assert not change_class.structural("public/js/app.js")
    assert "toàn bộ file" not in plain and "toàn bộ file" not in wide  # file lớn: không gửi cả file
    assert "L100| export function targetHandler() {" in plain and "L100| export function targetHandler() {" in wide
    assert "L108| const markerNearby = 1;" not in plain   # bán kính mặc định ±3
    assert "L108| const markerNearby = 1;" in wide       # bề mặt một chiều: nới bán kính


# ── FIX 2: ngữ cảnh rỗng chặn NGAY, không gọi model, không tính budget ──────

def _run(tmp_path, models, state):
    budget = Budget(max_wall_clock_s=999)
    return implement.run(state, deps_with(models), budget, repo_dir=tmp_path / "scratch"), budget


def _empty_ctx(targets, used_tools):
    return lambda *a, **k: ("(không có)", [], {"skill": "default", "targets": targets, "used_tools": used_tools})


def test_empty_targets_block_with_needs_review_and_no_model_call(tmp_path, monkeypatch):
    monkeypatch.setattr(implement, "gate3_context", _empty_ctx([], ["outline"]))
    models = FakeModels(_one_file_plan())

    out, budget = _run(tmp_path, models, {"plan": _one_file_plan()})

    assert out["blocked"] is True and out["needs_review"] is True
    assert out["failure_class"] == "critical"  # lớp sẵn có mà repair_class xếp stop_admin
    assert "file đích" in out["reason"] and "người soát" in out["reason"]
    assert models.calls == [] and budget.model_calls == 0 and budget.units == 0 and budget.tokens == 0
    assert out["diffs"] == []


def test_empty_toolset_blocks_with_needs_review_and_no_model_call(tmp_path, monkeypatch):
    monkeypatch.setattr(implement, "gate3_context", _empty_ctx([REL], []))
    models = FakeModels(_one_file_plan())

    out, budget = _run(tmp_path, models, {"plan": _one_file_plan()})

    assert out["blocked"] is True and out["needs_review"] is True
    assert out["failure_class"] == "critical"
    assert "dữ liệu repo" in out["reason"]
    assert models.calls == [] and budget.model_calls == 0 and budget.units == 0
    assert out["diffs"] == []


def test_the_fail_closed_stop_is_admin_review_and_never_a_replan():
    """'Không gọi model' phải đúng cả ở bước sau: stop_admin, không phải replan (replan = 1 lần gọi gate 1)."""
    from runtime import repair_class

    for subtask, ctx in (({"title": "t", "file": ""}, None),
                         ({"title": "t", "file": REL}, {"targets": [], "used_tools": ["outline"]}),
                         ({"title": "t", "file": REL}, {"targets": [REL], "used_tools": []})):
        stop = implement.empty_context_stop(subtask, ctx)
        assert stop["blocked"] is True and stop["needs_review"] is True
        assert stop["failure_class"] != "plan" and stop["failure_class"] in ("critical",)
        verdict = repair_class.classify(stop, {}, set())
        assert verdict["action"] == repair_class.STOP_ADMIN
        assert verdict["class"] != "plan_inconsistent"


def test_a_plan_step_without_a_target_file_blocks_before_any_context_work(tmp_path):
    models = FakeModels(_one_file_plan(""))

    out, budget = _run(tmp_path, models, {"plan": _one_file_plan("")})

    assert out["blocked"] is True and out["needs_review"] is True
    assert "file đích" in out["reason"]
    assert models.calls == [] and budget.model_calls == 0


def test_a_resolved_context_still_reaches_the_model_unchanged(tmp_path):
    """Chốt chặn mới không được đổi đường bình thường: targets + used_tools đều có → gọi model như cũ."""
    repo = _source(tmp_path, SMALL)
    models = FakeModels(_one_file_plan(), codegen=EDITS)

    out, budget = _run(tmp_path, models, {"plan": _one_file_plan(), "checkout_source": str(repo)})

    assert out["blocked"] is False and len(models.calls) == 1 and budget.model_calls == 1
    assert implement.empty_context_stop(_one_file_plan()["subtasks"][0],
                                        {"targets": [REL], "used_tools": ["outline"]}) is None
    assert implement.empty_context_stop(_one_file_plan()["subtasks"][0]) is None  # file mới: không chặn
