"""Pre-screen trước cổng 1: gom request trùng (embedding fake) + chấm ưu tiên
từ 4 đầu vào đo được, ghi ai_decisions.priority_score."""
import json
import sqlite3
from datetime import datetime, timedelta, timezone

import prescreen
from conftest import FakeModels, deps_with, plan_with
from main import record_proposal, run_once
from budget import Budget

NOW = datetime(2026, 9, 12, tzinfo=timezone.utc)


def item(i, domain, subject, votes=0, days_ago=1, body=""):
    at = (NOW - timedelta(days=days_ago)).isoformat().replace("+00:00", "Z")
    return {"id": f"req-{i}", "db_id": i, "domain": domain, "type": "feature", "subject": subject,
            "body": body, "status": "pending", "votes": votes, "thread": [], "created_at": at, "updated_at": at}


def models_with(vectors):
    """FakeModels mà embed(text) tra bảng theo subject — text nào không có thì
    vector trực giao riêng, coi như không giống ai."""
    m = FakeModels(plan_with(["features"]))
    m.vectors = vectors
    return m


def decisions(db_file):
    con = sqlite3.connect(str(db_file)); con.row_factory = sqlite3.Row
    try:
        return [dict(r) for r in con.execute("SELECT * FROM ai_decisions ORDER BY request_id")]
    finally:
        con.close()


def test_near_duplicates_collapse_into_one_candidate(db_file):
    items = [
        item(1, "pharmacy", "Thẻ ghi nhớ tên thuốc", votes=3),
        item(2, "pharmacy", "Flashcard học tên hoạt chất", votes=5),
        item(3, "pharmacy", "Bảng tương tác thuốc", votes=1),
        item(4, "it", "Thẻ ghi nhớ tên thuốc", votes=9),   # cùng text, KHÁC domain → không gộp
    ]
    models = models_with({
        "Thẻ ghi nhớ tên thuốc": [1.0, 0.0, 0.0],
        "Flashcard học tên hoạt chất": [0.95, 0.31, 0.0],   # cos ≈ 0.95 với #1
        "Bảng tương tác thuốc": [0.0, 1.0, 0.0],
    })

    out = prescreen.run(items, models=models, db_path=db_file, now=NOW)

    ids = sorted(tuple(c["request_ids"]) for c in out)
    assert ids == [("req-1", "req-2"), ("req-3",), ("req-4",)]
    merged = next(c for c in out if c["request_ids"] == ["req-1", "req-2"])
    assert merged["id"] == "req-2"          # đại diện = nhiều votes nhất
    assert merged["votes"] == 8             # votes gộp
    assert merged["domain"] == "pharmacy"


def test_priority_uses_all_four_inputs_and_writes_ai_decisions(db_file):
    items = [
        item(1, "pharmacy", "A", votes=10, days_ago=1),
        item(2, "pharmacy", "A bis", votes=10, days_ago=1),
        item(3, "pharmacy", "B", votes=0, days_ago=60),
    ]
    models = models_with({"A": [1, 0, 0], "A bis": [0.97, 0.24, 0], "B": [0.7, 0.71, 0]})
    # Lịch sử: domain pharmacy từng qua ok tới cổng 7 → cost/benefit dương.
    record_proposal(db_file, request=item(9, "pharmacy", "cũ"), gate_reached=7, outcome="ok", budget=Budget())

    out = prescreen.run(items, models=models, db_path=db_file, now=NOW)

    top = out[0]
    assert top["request_ids"] == ["req-1", "req-2"]
    assert top["priority_score"] > out[1]["priority_score"]
    parts = top["priority_inputs"]
    assert set(parts) == {"urgency", "importance", "dependencies", "cost_benefit"}
    assert parts["urgency"] > 0            # 2 request mới trong 7 ngày
    assert parts["importance"] > 0         # votes 20
    assert parts["dependencies"] > 0       # "B" liên quan (cos ≈ 0.7) nhưng không trùng
    assert parts["cost_benefit"] > 0.5     # domain từng đi hết cổng 7
    assert 0 <= top["priority_score"] <= 100

    rows = decisions(db_file)
    assert [r["request_id"] for r in rows] == [1, 2, 3]
    assert all(r["decided_by"] == "rule" and r["action"] == "priority" for r in rows)
    assert rows[0]["priority_score"] == top["priority_score"]
    assert json.loads(rows[0]["reason"]) == parts
    assert json.loads(rows[0]["input_snapshot"])["request_ids"] == ["req-1", "req-2"]


def test_scope_blocked_history_drags_cost_benefit_down(db_file):
    items = [item(1, "economics", "X", votes=1)]
    models = models_with({"X": [1, 0, 0]})
    record_proposal(db_file, request=item(7, "economics", "cũ"), gate_reached=2, outcome="blocked_gate_2", budget=Budget())

    (cand,) = prescreen.run(items, models=models, db_path=db_file, now=NOW)

    assert cand["priority_inputs"]["cost_benefit"] == 0.0


def test_merged_candidate_records_all_request_ids_in_skill_proposals(db_file):
    items = [item(1, "pharmacy", "A", votes=1), item(2, "pharmacy", "A'", votes=2)]
    models = models_with({"A": [1, 0, 0], "A'": [0.99, 0.14, 0]})
    (cand,) = prescreen.run(items, models=models, db_path=db_file, now=NOW)

    run_once(cand, db_path=db_file, deps=deps_with(models))

    con = sqlite3.connect(str(db_file))
    (row,) = con.execute("SELECT request_ids FROM skill_proposals").fetchall()
    con.close()
    assert json.loads(row[0]) == ["req-1", "req-2"]


def test_prescreen_off_leaves_items_untouched(monkeypatch, inbox_file, db_file, fake_deps):
    """PRESCREEN=0: walking skeleton chạy y như trước, không embed, không ai_decisions."""
    import main
    monkeypatch.setenv("DRY_RUN", "1")
    monkeypatch.setenv("PRESCREEN", "0")
    monkeypatch.setenv("TIZIA_INBOX_PATH", str(inbox_file))
    monkeypatch.setenv("TIZIA_DB_PATH", str(db_file))

    assert main.main([], deps=fake_deps) == 0

    con = sqlite3.connect(str(db_file))
    assert con.execute("SELECT COUNT(*) FROM skill_proposals").fetchone()[0] == 1
    assert con.execute("SELECT name FROM sqlite_master WHERE name='ai_decisions'").fetchone() is None
    con.close()
    assert not getattr(fake_deps.models, "embed_calls", [])


def test_prescreen_on_by_default_runs_before_gate_1(monkeypatch, inbox_file, db_file, fake_deps):
    import main
    monkeypatch.setenv("DRY_RUN", "1")
    monkeypatch.delenv("PRESCREEN", raising=False)
    monkeypatch.setenv("TIZIA_INBOX_PATH", str(inbox_file))
    monkeypatch.setenv("TIZIA_DB_PATH", str(db_file))

    assert main.main([], deps=fake_deps) == 0

    (row,) = decisions(db_file)
    assert row["request_id"] == 42
    assert 0 <= row["priority_score"] <= 100
