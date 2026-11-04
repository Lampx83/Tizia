"""Cổng 2.5 (plan_validate.py) — soát plan (Q1) + phân quyền độ
phức tạp (Q2) trước khi cổng 3 tiêu ngân sách."""
import json
import subprocess
import time
from pathlib import Path

import pytest

from budget import Budget
from conftest import FakeModels, connect, deps_with, plan_with
from gates import plan_validate
from main import load_inbox, run_once


def _seed_user(db_path, *, display_name, role="student", domain_grant=None):
    con = connect(db_path)
    try:
        con.execute(plan_validate._SCHEMA_DDL)
        now = int(time.time() * 1000)
        cur = con.execute(
            "INSERT INTO users (username, display_name, password_hash, role, created_at) VALUES (%s, %s, 'x', %s, %s) RETURNING id",
            (display_name.lower().replace(" ", "."), display_name, role, now),
        )
        user_id = cur.fetchone()[0]
        if domain_grant:
            con.execute(
                "INSERT INTO user_domain_grants (user_id, domain_id, granted_at) VALUES (%s, %s, %s)",
                (user_id, domain_grant, now),
            )
        con.commit()
        return user_id
    finally:
        con.close()


def _seed_request_row(db_path, *, req_id, domain, student):
    """requests.id thật (khác id string của inbox item) — cần cho
    write_clarification()/request_messages join đúng bảng."""
    con = connect(db_path)
    try:
        con.execute(plan_validate._SCHEMA_DDL)
        now = int(time.time() * 1000)
        con.execute(
            """INSERT INTO requests (id, domain, title, student, created_at, updated_at)
               VALUES (%s, %s, 'x', %s, %s, %s)""",
            (req_id, domain, student, now, now),
        )
        con.commit()
    finally:
        con.close()


# ── is_complex(): tín hiệu tính từ plan, không gọi model ────────────────────

def test_is_complex_true_for_2_distinct_capabilities():
    assert plan_validate.is_complex(plan_with(["features", "quiz"])) is True


def test_is_complex_false_for_simple_default_plan():
    # plan_with mặc định: 1 capability, 2 subtask, cả 2 trong vùng an toàn.
    assert plan_validate.is_complex(plan_with(["features"])) is False


def test_is_complex_true_for_4_or_more_subtasks():
    plan = plan_with(["features"])
    plan["subtasks"] = plan["subtasks"] * 2  # 4 subtask
    assert plan_validate.is_complex(plan) is True


def test_is_complex_true_for_file_outside_safe_zones():
    plan = plan_with(["features"])
    plan["subtasks"][0]["file"] = "server/index.js"  # NGOÀI _ai-generated/public
    assert plan_validate.is_complex(plan) is True


def test_is_complex_false_for_routine_new_ai_generated_plugin():
    """Tạo 1 plugin _ai-generated MỚI (trường hợp thường ngày) KHÔNG tự nó
    tính là 'route mới' đáng cảnh giác — xem docstring module lý do đổi từ
    thiết kế ban đầu (tránh mâu thuẫn với "đa số request đơn giản không bị
    ảnh hưởng")."""
    plan = plan_with(["features"])
    assert all(
        st["file"].startswith(("server/contexts/_ai-generated/", "public/"))
        for st in plan["subtasks"]
    )
    assert plan_validate.is_complex(plan) is False


# ── AC 1: plan không rõ -> needs_clarification, cổng 3 không chạy ──────────

def test_unclear_plan_blocks_before_gate_3_and_writes_clarification(db_file, request_item):
    _seed_request_row(db_file, req_id=request_item["db_id"], domain=request_item["domain"], student=request_item["from"])
    models = FakeModels(plan_with(["features"]), validation={"clear": False, "question": "File nào chứa danh sách hoạt chất?"})
    deps = deps_with(models)

    out = run_once(request_item, db_path=db_file, deps=deps)

    assert out["outcome"] == "needs_clarification"
    assert out["gate_reached"] == 2.5
    assert out["public_message"] == "File nào chứa danh sách hoạt chất?"
    # cổng 3 không được gọi: chỉ có lời gọi cổng 1 + cổng 2.5, không có subtask nào.
    assert len(models.calls) == 3  # intake + cổng 1 + cổng 2.5

    con = connect(db_file)
    try:
        rows = con.execute(
            "SELECT role, body FROM request_messages WHERE request_id = %s", (request_item["db_id"],)
        ).fetchall()
    finally:
        con.close()
    assert rows == [("admin", "File nào chứa danh sách hoạt chất?")]


def test_a_clarified_spec_clears_the_plan_instead_of_asking_the_student_again(tmp_path):
    """Người gửi đã trả lời trong spec làm rõ: điểm validator còn hỏi là việc của plan/code,
    không được hỏi lại người gửi (vòng lặp clarify từng đốt hết ngân sách root)."""
    plan = plan_with(["features"])
    request = {"subject": "Thêm hai trang ôn tập", "body": "hai trang mới độc lập",
               "clarified_spec": "1) title và h1 là 'Sổ tay thuật ngữ CNTT'; 2) một API duy nhất; 3) danh sách đơn giản.",
               "grounding_required": False}
    state = {"plan": plan, "checkout_source": str(tmp_path)}
    models = FakeModels(plan, validation={"clear": False, "question": "Tiêu đề và h1 cụ thể là gì?"})

    out = plan_validate.run(request, deps_with(models), Budget(), state)

    assert out["blocked"] is False, out
    assert state["assumption"] == "Tiêu đề và h1 cụ thể là gì?"


def test_a_grounding_veto_that_names_a_file_which_exists_nowhere_is_ignored(tmp_path):
    """Validator tự bịa "yêu cầu trước đã tạo file X" (X không có ở base, không có trong plan) thì không được chặn."""
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    (tmp_path / 'public').mkdir(parents=True)
    (tmp_path / 'public' / 'index.html').write_text('<h1>Tizia</h1>\n', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)
    plan = plan_with(["features"])
    plan["subtasks"] = [{"title": "Trang mới", "file": "public/trang-moi.html", "verify": "node --test test/trang-moi.test.js",
                         "size": "small", "layer": "frontend", "depends_on": []}]
    request = {"subject": "Thêm một trang mới", "body": "trang mới cho khoa CNTT", "grounding_required": True,
               "type": "feature", "complexity_by_server": True}
    validation = {"clear": True, "grounded": False, "reason":
                  "REPO DATA chỉ ra một yêu cầu trước đó đã tạo file public/khong-co-that.html cho cùng mục đích.",
                  "grounding": [{"target": "public/trang-moi.html", "file": "", "quote": "",
                                 "before": "chưa có trang", "after": "trang mới", "verify": "node --test test/trang-moi.test.js"}]}
    state = {"plan": plan, "checkout_source": str(tmp_path)}

    out = plan_validate.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(), state)

    assert out["blocked"] is False, out
    assert "public/khong-co-that.html" in state["validator_note"]


def test_a_question_about_a_file_that_exists_nowhere_does_not_block_a_specified_feature(tmp_path):
    """Đúng ca live: validator vừa hỏi lại vừa grounded=false vì một file không tồn tại; spec đã chốt thì plan đi tiếp."""
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    (tmp_path / 'public').mkdir(parents=True)
    (tmp_path / 'public' / 'index.html').write_text('<h1>Tizia</h1>\n', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)
    plan = plan_with(["features"])
    plan["subtasks"] = [{"title": "Trang mới", "file": "public/trang-moi.html", "verify": "node --test test/trang-moi.test.js",
                         "size": "small", "layer": "frontend", "depends_on": []}]
    request = {"subject": "Thêm một trang mới", "body": "trang mới cho khoa CNTT", "grounding_required": True,
               "type": "feature", "complexity_by_server": True,
               "clarified_spec": "1) trang mới hoàn toàn; 2) danh sách đơn giản; 3) title 'Trang mới'."}
    validation = {"clear": False, "question": "Trang mới có thay thế trang cũ không?",
                  "grounded": False,
                  "reason": "REPO DATA cho thấy một yêu cầu trước đã tạo public/khong-co-that.html cho cùng mục đích.",
                  "grounding": [{"target": "public/trang-moi.html", "file": "", "quote": "",
                                 "before": "chưa có trang", "after": "trang mới", "verify": "node --test test/trang-moi.test.js"}]}
    state = {"plan": plan, "checkout_source": str(tmp_path)}

    out = plan_validate.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(), state)

    assert out["blocked"] is False, out
    assert "public/khong-co-that.html" in state["validator_note"]


def test_a_grounding_veto_about_a_real_plan_file_still_blocks(tmp_path):
    """Cùng lý do nhưng file được nêu CÓ trong plan: vẫn chặn (guard chỉ bỏ veto bịa đường dẫn)."""
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    (tmp_path / 'public').mkdir(parents=True)
    (tmp_path / 'public' / 'trang.html').write_text('<h1>Trang</h1>\n', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)
    plan = plan_with(["features"])
    plan["subtasks"] = [{"title": "Sửa trang", "file": "public/trang.html", "verify": "trang có chữ mới",
                         "size": "small", "layer": "frontend", "depends_on": []}]
    request = {"subject": "Sửa trang", "body": "đổi chữ", "grounding_required": True}
    validation = {"clear": True, "grounded": False,
                  "reason": "Plan sửa public/trang.html nhưng không có dẫn chứng hành vi.",
                  "objection": {"claim": "trang đã có", "evidence": [{"file": "public/trang.html", "snippet": "<h1>Trang</h1>"}]}}
    state = {"plan": plan, "checkout_source": str(tmp_path)}

    out = plan_validate.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(), state)

    # Vẫn chặn: verdict có bằng chứng thì không bị hạ thành "chưa rõ mục tiêu".
    assert out["blocked"] is True and out["reason"].startswith("plan_")


def test_an_unverifiable_objection_without_records_is_unverified_not_blocking(tmp_path):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    (tmp_path / 'public').mkdir(parents=True)
    (tmp_path / 'public' / 'trang.html').write_text('<h1>Trang</h1>\n', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)
    plan = plan_with(["features"])
    plan["subtasks"] = [{"title": "Sửa trang", "file": "public/trang.html", "verify": "trang có chữ mới",
                         "size": "small", "layer": "frontend", "depends_on": []}]
    request = {"subject": "Sửa trang", "body": "đổi chữ", "grounding_required": True}
    validation = {"clear": True, "grounded": False, "grounding": [],
                  "reason": "Plan sửa public/trang.html nhưng không có dẫn chứng hành vi.",
                  "objection": {"claim": "đã có yêu cầu trước tạo trang này",
                                "evidence": [{"file": "FEATURE BRIEF", "snippet": "trang: public/trang.html"}]}}
    state = {"plan": plan, "checkout_source": str(tmp_path)}

    out = plan_validate.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(), state)

    assert out.get("blocked") is not True
    assert "không đưa trích dẫn" in state.get("validator_note", "")


def test_a_grounding_veto_without_a_verifiable_snippet_is_advisory(tmp_path):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    (tmp_path / 'public').mkdir(parents=True)
    (tmp_path / 'public' / 'trang.html').write_text('<h1>Trang</h1>\n', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)
    plan = plan_with(["features"])
    plan["subtasks"] = [{"title": "Sửa trang", "file": "public/trang.html", "verify": "trang có chữ mới",
                         "size": "small", "layer": "frontend", "depends_on": []}]
    request = {"subject": "Sửa trang", "body": "đổi chữ", "grounding_required": True}
    validation = {"clear": True, "grounded": False,
                  "reason": "Plan sửa public/trang.html nhưng không có dẫn chứng hành vi.",
                  "objection": {"claim": "trang đã có", "evidence": [{"file": "public/trang.html", "snippet": "chữ không có"}]},
                  "grounding": [{"target": "public/trang.html", "file": "public/trang.html", "quote": "<h1>Trang</h1>",
                                 "before": "h1 là Trang", "after": "h1 mới", "verify": "trang có chữ mới"}]}
    state = {"plan": plan, "checkout_source": str(tmp_path)}

    out = plan_validate.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(), state)

    assert "không chặn" in state["validator_note"]
    assert out["reason"] != "plan_ungrounded"


# ── AC 2: plan phức tạp + user thường -> complexity_gated ───────────────────

def test_complex_plan_from_ordinary_user_is_gated(db_file, request_item):
    _seed_user(db_file, display_name=request_item["from"], role="student")
    models = FakeModels(plan_with(["features", "quiz"]))  # 2 capability -> complex
    deps = deps_with(models)

    out = run_once(request_item, db_path=db_file, deps=deps)

    assert out["outcome"] == "complexity_gated"
    assert out["gate_reached"] == 2.5
    assert len(models.calls) == 3  # intake + cổng 1 + cổng 2.5, cổng 3 không chạy


def test_complexity_gate_names_the_signals_that_fired():
    plan = plan_with(["features", "quiz"])
    plan["subtasks"] = [{**plan["subtasks"][0], "file": "server/index.js"}] * 4
    signals = plan_validate.complexity_signals(plan)
    assert [s.split(":")[0] for s in signals] == ["capabilities", "file ngoài vùng an toàn", "subtasks"]
    assert plan_validate.complexity_signals(plan_with(["features"])) == []


def test_complex_plan_from_unmapped_guest_is_gated_fail_closed(db_file, request_item):
    # KHÔNG seed user nào -> display_name không map được sang user thật.
    models = FakeModels(plan_with(["features", "quiz"]))
    out = run_once(request_item, db_path=db_file, deps=deps_with(models))
    assert out["outcome"] == "complexity_gated"


# ── AC 3: cùng plan phức tạp, requester admin/có grant -> cổng 3 chạy bình thường ──

def test_complex_plan_from_admin_reaches_gate_7(db_file, request_item):
    _seed_user(db_file, display_name=request_item["from"], role="admin")
    models = FakeModels(plan_with(["features", "quiz"]))
    out = run_once(request_item, db_path=db_file, deps=deps_with(models))
    assert out["outcome"] == "ok"
    assert out["gate_reached"] == 7


def test_complex_plan_from_domain_expert_with_matching_grant_reaches_gate_7(db_file, request_item):
    _seed_user(db_file, display_name=request_item["from"], role="student", domain_grant=request_item["domain"])
    models = FakeModels(plan_with(["features", "quiz"]))
    out = run_once(request_item, db_path=db_file, deps=deps_with(models))
    assert out["outcome"] == "ok"
    assert out["gate_reached"] == 7


def test_complex_plan_from_grant_in_different_domain_is_still_gated(db_file, request_item):
    _seed_user(db_file, display_name=request_item["from"], role="student", domain_grant="economics")
    models = FakeModels(plan_with(["features", "quiz"]))  # request_item.domain == "pharmacy"
    out = run_once(request_item, db_path=db_file, deps=deps_with(models))
    assert out["outcome"] == "complexity_gated"


# ── AC 4: plan đơn giản, user thường -> luôn qua, không bị ảnh hưởng ────────

def test_simple_plan_from_ordinary_user_always_reaches_gate_3(db_file, request_item):
    _seed_user(db_file, display_name=request_item["from"], role="student")
    models = FakeModels(plan_with(["features"]))  # 1 capability, 2 subtask, vùng an toàn
    out = run_once(request_item, db_path=db_file, deps=deps_with(models))
    assert out["outcome"] == "ok"
    assert out["gate_reached"] == 7


# ── AC 5: message làm rõ đúng request_id, đọc lại được ──────────────────────

def test_clarification_message_targets_correct_request_id(db_file, request_item):
    other_id = request_item["db_id"] + 1
    _seed_request_row(db_file, req_id=request_item["db_id"], domain=request_item["domain"], student=request_item["from"])
    _seed_request_row(db_file, req_id=other_id, domain=request_item["domain"], student="Ai khac")

    plan_validate.write_clarification(db_file, request_item, "Câu hỏi làm rõ")

    con = connect(db_file)
    try:
        mine = con.execute("SELECT body FROM request_messages WHERE request_id = %s", (request_item["db_id"],)).fetchall()
        others = con.execute("SELECT body FROM request_messages WHERE request_id = %s", (other_id,)).fetchall()
    finally:
        con.close()
    assert mine == [("Câu hỏi làm rõ",)]
    assert others == []


# ── validator trả sai schema -> block với lý do rõ (không phải outcome đặc biệt) ──

def test_validator_bad_schema_blocks_generically():
    deps = deps_with(FakeModels(plan_with(["features"]), validation="khong phai JSON hop le"))
    out = plan_validate.run({"id": "x", "domain": "pharmacy"}, deps, Budget(max_wall_clock_s=999), {"plan": plan_with(["features"])})
    assert out["blocked"] is True
    assert "reason" in out
    assert out.get("outcome") is None


def test_run_blocks_without_plan_in_state():
    deps = deps_with(plan_with(["features"]))
    out = plan_validate.run({"id": "x"}, deps, Budget(max_wall_clock_s=999), {})
    assert out["blocked"] is True


def test_validator_uses_bounded_schema_and_never_accepts_truncated_output():
    class Truncated(FakeModels):
        def generate(self, *args, **kwargs):
            body = super().generate(*args, **kwargs)
            body['done_reason'] = 'length'
            return body
    plan = plan_with(['features'])
    models = Truncated(plan)
    result = plan_validate.run({'id': 'x'}, deps_with(models), Budget(), {'plan': plan})
    assert result['blocked'] and 'truncated' in result['reason']
    assert models.calls[0]['format']['properties']['grounding']['items']['properties']['quote']['maxLength'] == 320
    assert models.calls[0]['num_predict'] == 3072


def test_retry_fix_resamples_a_truncated_validator_once(monkeypatch):
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', 'retry')

    class FirstTruncated(FakeModels):
        def generate(self, *args, **kwargs):
            body = super().generate(*args, **kwargs)
            if len(self.calls) == 1:
                body['done_reason'] = 'length'
            return body
    plan = plan_with(['features'])
    models = FirstTruncated(plan)
    result = plan_validate.run({'id': 'x'}, deps_with(models), Budget(), {'plan': plan})
    assert 'truncated' not in (result.get('reason') or '') and len(models.calls) == 2
    assert models.calls[1]['temperature'] == 0.3


def test_context_fix_widens_the_excerpt_with_the_subtask_verify(monkeypatch):
    seen = {}
    monkeypatch.setattr(plan_validate.file_context, 'excerpt', lambda text, words, *, budget, filename, pinned=(): seen.update(words=words, budget=budget) or '')
    monkeypatch.setattr(plan_validate.code_index, 'git', lambda *a: b'abc' if a[1] == 'rev-parse' else b'x')
    plan = {'subtasks': [{'file': 'public/a.html', 'title': 't', 'verify': 'chứa "Tất cả"'}]}
    plan_validate.source_evidence({'subject': 's'}, plan, {'checkout_source': '.'})
    assert seen['budget'] == 3500 and 'tất cả' not in seen['words']
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', 'context')
    plan_validate.source_evidence({'subject': 's'}, plan, {'checkout_source': '.'})
    assert seen['budget'] == 6000 and 'tất cả' in seen['words']


def test_named_request_file_is_loaded_even_when_the_plan_omits_it(monkeypatch):
    monkeypatch.setattr(plan_validate.code_index, 'git',
                        lambda *a: b'abc' if a[1] == 'rev-parse' else b'<section id="campus"></section>')
    plan = {'subtasks': [{'file': 'public/a.html', 'title': 't', 'verify': 'x'}]}
    _, files, context = plan_validate.source_evidence(
        {'subject': 'them toa nha', 'body': 'layout trong public/campus-proto/b-iso-canvas.html'},
        plan, {'checkout_source': '.'})
    assert 'public/campus-proto/b-iso-canvas.html' in files
    assert 'FILE public/campus-proto/b-iso-canvas.html' in context


def test_http_worker_leaves_complexity_to_the_server_tier():
    from conftest import FakeModels, deps_with
    from budget import Budget
    plan = plan_with(["features", "quiz"])  # 2 capabilities: complex
    state = {"plan": plan}
    out = plan_validate.run({"id": "req-1", "complexity_by_server": True}, deps_with(FakeModels(plan)), Budget(), state)
    assert out["blocked"] is False and out["signals"] and state["complexity_signals"] == out["signals"]


def test_complex_http_plan_is_submitted_as_high_risk():
    import sys
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    from worker import HarnessPlanner
    old = {"summary_vi": "x", "capabilities": ["features"],
           "subtasks": [{"title": "t", "file": "public/a.html", "verify": "v", "size": "small"}]}
    assert HarnessPlanner._canonical({"domain": "it"}, old, ["subtasks: 4"])["risk"] == "high"
    assert HarnessPlanner._canonical({"domain": "it"}, old)["risk"] == "low"


# ── conditional reasoning: one thinking pass on a hard case, never a pass on its own ──

def _reasoning_run(monkeypatch, first, second, fixes='reasoning'):
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', fixes)
    plan = plan_with(['features'])
    answers = [first, second]
    seen = []

    class Models(FakeModels):
        def generate_for(self, role, model, prompt, **kw):
            seen.append(kw.get('extra'))
            return {'response': json.dumps(answers[min(len(seen) - 1, 1)]), 'done_reason': 'stop', 'prompt_eval_count': 1, 'eval_count': 1}

        def generate(self, model, prompt, **kw):
            return self.generate_for('gate1', model, prompt, **kw)
    deps = deps_with(Models(plan))
    state = {'plan': plan}
    out = plan_validate.run({'id': 'x', 'domain': 'pharmacy'}, deps, Budget(max_wall_clock_s=999), state)
    return out, state, seen


UNSURE = {'clear': False, 'question': 'Tab nào?', 'grounded': False, 'reason': 'chưa rõ', 'grounding': []}
SURE = {'clear': True, 'question': None, 'grounded': True, 'reason': 'ok', 'grounding': []}


def test_reasoning_is_off_by_default_and_a_clear_plan_never_pays_for_it(monkeypatch):
    out, state, seen = _reasoning_run(monkeypatch, UNSURE, SURE, fixes='')
    assert len(seen) == 1 and 'reasoning' not in state
    out, state, seen = _reasoning_run(monkeypatch, SURE, UNSURE)
    assert len(seen) == 1 and 'reasoning' not in state


def test_a_second_pass_that_confirms_the_block_keeps_the_original_outcome(monkeypatch):
    out, state, seen = _reasoning_run(monkeypatch, UNSURE, UNSURE)
    assert out['outcome'] == 'needs_clarification' and len(seen) == 2
    assert seen[1] == {'force_thinking': True} and not seen[0]
    assert state['reasoning']['first']['clear'] is False and state['reasoning']['second']['clear'] is False


def test_a_disagreement_goes_to_review_and_is_never_a_pass(monkeypatch):
    out, state, _ = _reasoning_run(monkeypatch, UNSURE, SURE)
    assert out['blocked'] is True and out['outcome'] == 'validator_disagreement'
    assert out['review']['first']['reason'] == 'chưa rõ' and out['review']['second']['clear'] is True
    assert 'quản trị viên' in out['public_message']


def test_an_unusable_second_pass_is_recorded_as_unknown_and_the_block_stands(monkeypatch):
    out, state, _ = _reasoning_run(monkeypatch, UNSURE, {'not': 'a validation'})
    assert out['outcome'] == 'needs_clarification' and 'unknown' in state['reasoning']['second']


def test_search_terms_parse_keeps_four_clean_strings_and_ignores_garbage():
    from gates import brainstorm
    assert brainstorm.parse_search_terms('{"terms": ["Câu hỏi mới", "x", "btn-new", "Câu hỏi mới", "a\\nb", 5, "một hai ba", "bốn năm"]}') == [
        "Câu hỏi mới", "btn-new", "một hai ba", "bốn năm"]
    assert brainstorm.parse_search_terms("không phải JSON") == [] and brainstorm.parse_search_terms('{"terms": "x"}') == []


def _clarify_request(rounds):
    thread = [{"role": "admin", "body": f"Câu {i + 1}?"} for i in range(rounds)]
    return {"subject": "Thêm trang", "body": "trang mới", "thread": thread, "grounding_required": False}


def test_clarify_rounds_come_from_the_contract_and_count_admin_messages():
    assert plan_validate.clarify_limit() == 2
    assert plan_validate.rounds_asked(_clarify_request(2)) == 2
    assert plan_validate.rounds_asked({"thread": [{"role": "requester", "body": "x"}]}) == 0


def test_gate_asks_while_under_the_round_limit_then_assumes(tmp_path):
    plan = plan_with(["features"])
    question = {"clear": False, "question": "Bạn muốn trang có màu gì?"}
    state = {"plan": plan, "checkout_source": str(tmp_path)}
    out = plan_validate.run(_clarify_request(1), deps_with(FakeModels(plan, validation=question)), Budget(), state)
    assert out["blocked"] and out["outcome"] == "needs_clarification"

    state = {"plan": plan, "checkout_source": str(tmp_path)}
    out = plan_validate.run(_clarify_request(2), deps_with(FakeModels(plan, validation=question)), Budget(), state)
    assert out["blocked"] is False
    assert state["assumption"] == "Bạn muốn trang có màu gì?"


def test_validator_claiming_a_loaded_file_is_missing_is_a_retrieval_fault_not_an_objection():
    validation = {'grounded': False, 'objection': None, 'reason': 'public/js/domains/it/modules.js không có trong REPO DATA'}
    note = plan_validate.objection_advisory(validation, {'public/js/domains/it/modules.js': 'x'})
    assert note.startswith('lỗi truy xuất') and 'modules.js' in note
    other = plan_validate.objection_advisory(validation, {'public/other.js': 'x'})
    assert other and not other.startswith('lỗi truy xuất')


# ── repairable retry: plan đã nhắm đúng file mà yêu cầu nói tới ─────────────

TARGET = "public/trang.html"
QUOTE = "<h1>Trang</h1>"
WRONG = {"clear": True, "question": None, "grounded": True, "reason": "ok", "grounding": [
    {"target": TARGET, "file": TARGET, "quote": "<h1>Không có trong file</h1>",
     "before": "a", "after": "b", "verify": "c"}]}
RIGHT = {**WRONG, "grounding": [{**WRONG["grounding"][0], "quote": QUOTE}]}


def _target_repo(tmp_path):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    page = tmp_path / Path(TARGET)
    page.parent.mkdir(parents=True, exist_ok=True)
    page.write_text(f'{QUOTE}\n', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)


def _target_plan(file=TARGET):
    return {"capabilities": [], "subtasks": [{"title": "Đổi chữ", "file": file, "verify": "trang có chữ mới",
                                              "size": "small", "layer": "frontend", "depends_on": []}]}


def _named_request(target=TARGET):
    return {"subject": "Sửa trang", "body": f"đổi chữ trong {target}", "grounding_required": True,
            "complexity_by_server": True}


class _ValidationQueue(FakeModels):
    """Cổng 2.5 trả lần lượt từng validation; các lời gọi khác giữ reply mặc định."""

    def __init__(self, plan, *validations):
        super().__init__(plan, validation=validations[0])
        self.queue = list(validations[1:])
        self.seen = 0

    def generate(self, model, prompt, **kw):
        if "PLAN CẦN SOÁT" in prompt:
            if self.seen and self.queue:
                self.validation = self.queue.pop(0)
            self.seen += 1
        return super().generate(model, prompt, **kw)


def _validator_prompts(models):
    return [call["prompt"] for call in models.calls if "PLAN CẦN SOÁT" in call["prompt"]]


def test_a_grounding_block_on_the_named_target_gets_one_clean_second_pass(tmp_path):
    _target_repo(tmp_path)
    plan = _target_plan()
    models = _ValidationQueue(plan, WRONG, RIGHT)
    state = {"plan": plan, "checkout_source": str(tmp_path)}
    request = _named_request()

    out = plan_validate.run(request, deps_with(models), Budget(), state)

    assert plan_validate.final_hit(plan, request, state) is True
    assert out["blocked"] is False, out
    prompts = _validator_prompts(models)
    assert len(prompts) == 2
    assert "SOÁT LẠI MỘT ĐIỂM ĐÃ BỊ CHẶN" in prompts[1] and TARGET in prompts[1]
    assert "không tìm thấy trích dẫn" in prompts[1]  # the exact defect
    assert state["grounding"]["evidence"][0]["quote"] == QUOTE
    assert out["retry"].startswith("repairable_retry") and state["validator_retry"] == out["retry"]


def test_a_second_identical_failure_blocks_exactly_as_before(tmp_path):
    _target_repo(tmp_path)
    plan = _target_plan()
    models = _ValidationQueue(plan, WRONG, WRONG)
    state = {"plan": plan, "checkout_source": str(tmp_path)}

    out = plan_validate.run(_named_request(), deps_with(models), Budget(), state)

    assert out["blocked"] is True and out["reason"] == "plan_ungrounded"
    assert len(_validator_prompts(models)) == 2  # exactly one extra pass, never a third
    assert TARGET in out["signals"][0]
    assert out["retry"].startswith("repairable_retry")  # the admin sees why the plan was retried


def test_a_low_confidence_target_is_parked_with_its_own_reason(tmp_path):
    _target_repo(tmp_path)
    plan = _target_plan()
    models = _ValidationQueue(plan, WRONG)
    state = {"plan": plan, "checkout_source": str(tmp_path)}

    request = _named_request("public/khac.html")
    out = plan_validate.run(request, deps_with(models), Budget(), state)

    assert plan_validate.final_hit(plan, request, state) is False
    assert len(_validator_prompts(models)) == 1
    assert out["blocked"] is True and out["reason"] == "plan_target_uncertain"
    assert out["confidence"]["level"] == "low" and out["confidence"]["reason"]
    assert "validator_retry" not in state  # a wrong target is not repaired by re-asking


def test_a_high_confidence_target_keeps_the_old_grounding_block(tmp_path, monkeypatch):
    _target_repo(tmp_path)
    plan = _target_plan()
    models = _ValidationQueue(plan, WRONG)
    state = {"plan": plan, "checkout_source": str(tmp_path)}
    monkeypatch.setattr(plan_validate.target_confidence, "assess",
                        lambda *a, **k: {"level": "high", "signals": {}, "candidates": [], "reason": ""})

    request = _named_request("public/khac.html")
    out = plan_validate.run(request, deps_with(models), Budget(), state)

    assert out["reason"] == "plan_ungrounded" and "confidence" not in out


def test_an_ai_board_path_still_blocks_on_the_first_verdict(tmp_path):
    target = "ai-board/harness/gates/plan_validate.py"
    plan = _target_plan(target)
    models = _ValidationQueue(plan, RIGHT)

    out = plan_validate.run(_named_request(target), deps_with(models), Budget(),
                            {"plan": plan, "checkout_source": str(tmp_path)})

    assert out["blocked"] is True and out["reason"].startswith("path AI Board luôn bị chặn")
    assert models.calls == []  # no validator pass, so no retry either


def test_a_core_path_still_asks_for_elevation_on_the_first_verdict(tmp_path):
    plan = _target_plan("server/index.js")
    models = _ValidationQueue(plan, RIGHT)

    out = plan_validate.run(_named_request("server/index.js"), deps_with(models), Budget(),
                            {"plan": plan, "checkout_source": str(tmp_path)})

    assert out["blocked"] is True and out["outcome"] == "elevation_required"
    assert models.calls == []


def test_a_verified_objection_is_not_retried_even_when_the_target_is_right(tmp_path):
    _target_repo(tmp_path)
    plan = _target_plan()
    veto = {"clear": True, "question": None, "grounded": False, "reason": "trang đã có chữ này", "grounding": [],
            "objection": {"claim": "trang đã có", "evidence": [{"file": TARGET, "snippet": QUOTE}]}}
    models = _ValidationQueue(plan, veto)
    state = {"plan": plan, "checkout_source": str(tmp_path)}

    out = plan_validate.run(_named_request(), deps_with(models), Budget(), state)

    assert out["blocked"] is True and out["reason"] == "plan_ungrounded"
    assert len(_validator_prompts(models)) == 1 and "validator_retry" not in state


# ── plan 4-6 bước: mọi subtask phải có verify chạy được + depends_on (DAG) ──

def _steps(count, *, depends=True, verify="curl -s localhost:8041/api/x | grep -q items"):
    """`count` subtask hợp lệ; depends=False để thử plan thiếu hẳn depends_on."""
    steps = []
    for index in range(1, count + 1):
        step = {"title": f"Bước {index}", "file": f"public/step-{index}.html", "verify": verify, "size": "small"}
        if depends:
            step["depends_on"] = [] if index == 1 else [index - 1]
        steps.append(step)
    return steps


def _plan_with_steps(count, **kwargs):
    return {"summary_vi": "x", "capabilities": [], "subtasks": _steps(count, **kwargs)}


def test_a_six_subtask_plan_with_runnable_verifies_passes_validation():
    plan = _plan_with_steps(6)
    models = FakeModels(plan)
    request = {"subject": "Thêm 6 trang", "body": "sáu trang độc lập", "complexity_by_server": True}

    assert plan_validate.unfit_issues(plan) == []
    out = plan_validate.run(request, deps_with(models), Budget(), {"plan": plan})

    assert out["blocked"] is False
    assert models.calls  # plan hợp lệ vẫn đi tiếp tới validator


def test_a_five_subtask_plan_with_one_sentence_verify_is_plan_unfit():
    plan = _plan_with_steps(5)
    plan["subtasks"][2]["verify"] = "trang hiển thị danh sách thuật ngữ"
    models = FakeModels(plan)

    out = plan_validate.run({"subject": "x", "complexity_by_server": True}, deps_with(models), Budget(), {"plan": plan})

    assert out["blocked"] is True and out["outcome"] == "plan_unfit"
    assert out["reason"].startswith("plan_unfit: bước 3") and "lệnh chạy được" in out["reason"]
    assert out["signals"] == [f"bước 3 'public/step-3.html': verify phải là lệnh chạy được "
                              f"(node --test/curl/pytest/...): trang hiển thị danh sách thuật ngữ"]
    assert models.calls == []  # chặn tất định, chưa tiêu lời gọi model nào
    from worker import _plan_repairable
    assert _plan_repairable({"gate": 2.5, "result": {"reason": out["reason"]}})  # sửa được: một lượt lập lại plan


def test_a_four_subtask_plan_without_depends_on_is_plan_unfit():
    plan = _plan_with_steps(4, depends=False)
    models = FakeModels(plan)

    out = plan_validate.run({"subject": "x", "complexity_by_server": True}, deps_with(models), Budget(), {"plan": plan})

    assert out["blocked"] is True and out["outcome"] == "plan_unfit"
    assert all("thiếu depends_on" in issue for issue in out["signals"]) and len(out["signals"]) == 4
    assert models.calls == []


def test_a_three_subtask_plan_behaves_exactly_as_today():
    """Ngưỡng là > 3: plan 3 bước (kể cả verify là câu mô tả, không depends_on) không bị luật mới đụng tới."""
    plan = _plan_with_steps(3, depends=False)
    plan["subtasks"][1]["verify"] = "trang hiển thị danh sách thuật ngữ"
    models = FakeModels(plan)

    assert plan_validate.unfit_issues(plan) == []
    out = plan_validate.run({"subject": "x"}, deps_with(models), Budget(), {"plan": plan})

    assert out["blocked"] is False
    assert models.calls
