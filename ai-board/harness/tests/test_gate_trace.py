"""gate_trace (ticket 23) — 1 dòng mỗi lần gọi Ollama thật, join được với
skill_proposals, best-effort khi DB lỗi."""
import sqlite3

import pytest

import gate_trace
from conftest import deps_with, plan_with
from main import run_once


def rows(db_file, table):
    con = sqlite3.connect(str(db_file))
    try:
        con.row_factory = sqlite3.Row
        return [dict(r) for r in con.execute(f"SELECT * FROM {table} ORDER BY id")]
    finally:
        con.close()


def test_full_loop_writes_one_gate_trace_row_per_model_call(inbox_file, db_file, fake_deps):
    from main import load_inbox
    (item,) = load_inbox(inbox_file)

    out = run_once(item, db_path=db_file, deps=fake_deps)

    traces = rows(db_file, "gate_trace")
    # cổng 1 (1 lần gọi) + cổng 3 (1 lần/subtask, plan_with có 2 subtask) = 3.
    assert len(traces) == 1 + len(fake_deps.models.plan["subtasks"])
    assert {t["gate"] for t in traces} == {1.0, 3.0}
    assert all(t["prompt"] for t in traces)
    assert all(t["raw_response"] for t in traces)
    assert out["outcome"] == "ok"


def test_gate_trace_joins_to_its_skill_proposal(inbox_file, db_file, fake_deps):
    from main import load_inbox
    (item,) = load_inbox(inbox_file)

    out = run_once(item, db_path=db_file, deps=fake_deps)

    con = sqlite3.connect(str(db_file))
    try:
        joined = con.execute(
            """SELECT gt.id, sp.id AS sp_id FROM gate_trace gt
               JOIN skill_proposals sp ON sp.id = gt.skill_proposal_id
               WHERE sp.id = ?""",
            (out["proposal_id"],),
        ).fetchall()
    finally:
        con.close()
    assert len(joined) == 1 + len(fake_deps.models.plan["subtasks"])
    assert all(sp_id == out["proposal_id"] for _id, sp_id in joined)


def test_gate_trace_carries_ollama_cache_evidence_fields(inbox_file, db_file, fake_deps):
    from main import load_inbox
    (item,) = load_inbox(inbox_file)

    run_once(item, db_path=db_file, deps=fake_deps)

    traces = rows(db_file, "gate_trace")
    # FakeModels.generate() luôn trả prompt_eval_count=120, eval_count=80
    # (conftest.py) — duration không có trong fake nên None là đúng, nhưng 2
    # field count phải có mặt ở MỌI dòng (bằng chứng cache-hit rule 5).
    assert all(t["prompt_eval_count"] == 120 for t in traces)
    assert all(t["eval_count"] == 80 for t in traces)


def test_blocked_at_gate_2_writes_only_gate_1_trace(inbox_file, db_file):
    from main import load_inbox
    (item,) = load_inbox(inbox_file)
    deps = deps_with(plan_with(["db"]))  # capability core -> chặn ở cổng 2, không gọi model

    out = run_once(item, db_path=db_file, deps=deps)

    assert out["outcome"] == "blocked_gate_2"
    traces = rows(db_file, "gate_trace")
    assert len(traces) == 1
    assert traces[0]["gate"] == 1.0


def test_gate_trace_record_best_effort_swallows_db_error(tmp_path, capsys):
    """DB path trỏ vào 1 thư mục (không phải file) -> sqlite3 lỗi thật. Không
    được raise ra ngoài — best-effort, chỉ log rồi bỏ qua."""
    bad_db_path = tmp_path  # là directory, không phải file .db

    gate_trace.record(
        bad_db_path, skill_proposal_id=1, gate=1, model="m", prompt="p",
        body={"response": "r", "prompt_eval_count": 1, "eval_count": 1},
    )

    assert "[gate_trace] ghi lỗi" in capsys.readouterr().out


def test_gate_trace_record_noop_without_db_path_or_proposal_id(inbox_file, db_file, fake_deps):
    """gates/brainstorm.py, gates/implement.py: gọi run() trực tiếp (không qua
    main.run_once, như phần lớn test hiện có) không truyền db_path/proposal_id
    -> không ghi trace, không lỗi."""
    from gates import brainstorm
    from budget import Budget

    out = brainstorm.run({"id": "req-x", "subject": "s", "body": "b"}, fake_deps, Budget(max_wall_clock_s=999))

    assert out["blocked"] is False
    assert not db_file.exists()  # chưa ai tạo DB — chứng minh không có ghi nào xảy ra
