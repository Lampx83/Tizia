"""Ticket 16 — calibrate.py: so model ứng viên với quyết định Opus lịch sử."""
import json
import sqlite3
import time

import pytest

import calibrate
from conftest import FakeModels, deps_with, plan_with
from main import Deps, Unavailable
from prescreen import AI_DECISIONS_DDL


def insert_decision(db_path, *, request_id, action, snapshot):
    con = sqlite3.connect(str(db_path))
    try:
        con.execute(AI_DECISIONS_DDL)
        con.execute(
            """INSERT INTO ai_decisions
                 (request_id, decided_by, model, action, input_snapshot, created_at)
               VALUES (?, 'ai', 'claude-opus', ?, ?, ?)""",
            (request_id, action, json.dumps(snapshot), int(time.time() * 1000)),
        )
        con.commit()
    finally:
        con.close()


def snapshot_for(request_id):
    return {
        "id": f"req-{request_id}", "domain": "pharmacy", "type": "feature",
        "subject": "Yeu cau test", "body": "Chi tiet.", "votes": 3, "thread": [],
    }


# ── request_from_snapshot ────────────────────────────────────────────────────

def test_request_from_snapshot_reads_subject_body_thread():
    row = {"request_id": 1, "input_snapshot": json.dumps(snapshot_for(1))}
    req = calibrate.request_from_snapshot(row)
    assert req["subject"] == "Yeu cau test"
    assert req["body"] == "Chi tiet."
    assert req["domain"] == "pharmacy"


def test_request_from_snapshot_falls_back_to_title_detail():
    row = {"request_id": 2, "input_snapshot": json.dumps({"title": "T", "detail": "D"})}
    req = calibrate.request_from_snapshot(row)
    assert req["subject"] == "T"
    assert req["body"] == "D"


@pytest.mark.parametrize("raw", [None, "", "khong phai json", json.dumps([1, 2])])
def test_request_from_snapshot_returns_none_when_unusable(raw):
    assert calibrate.request_from_snapshot({"request_id": 1, "input_snapshot": raw}) is None


# ── categorize ────────────────────────────────────────────────────────────────

@pytest.mark.parametrize("opus_go,candidate_go,expected", [
    (True, True, "agrees"),
    (False, False, "agrees"),
    (True, False, "gemma_stricter"),
    (False, True, "gemma_looser"),
])
def test_categorize(opus_go, candidate_go, expected):
    assert calibrate.categorize(opus_go, candidate_go) == expected


# ── run() + summarize(): DB thật (tạm), FakeModels ───────────────────────────

def test_run_reads_only_decided_by_ai_and_excludes_defer(db_file):
    insert_decision(db_file, request_id=1, action="approve", snapshot=snapshot_for(1))
    insert_decision(db_file, request_id=2, action="defer", snapshot=snapshot_for(2))
    con = sqlite3.connect(str(db_file))
    con.execute(AI_DECISIONS_DDL)
    con.execute(
        """INSERT INTO ai_decisions (request_id, decided_by, action, input_snapshot, created_at)
           VALUES (3, 'rule', 'priority', ?, ?)""",
        (json.dumps(snapshot_for(3)), int(time.time() * 1000)),
    )
    con.commit()
    con.close()

    deps = deps_with(plan_with(["features"]))  # plan hợp lệ, không xin gì ngoài surface → go=True
    out = calibrate.run(db_file, deps=deps)

    # request 3 (decided_by='rule') không thuộc phạm vi — chỉ 2 dòng 'ai' được xét,
    # 1 trong đó (defer) không có tín hiệu go/no-go → loại.
    assert out["excluded_no_signal"] == 1
    assert len(out["results"]) == 1
    assert out["results"][0]["request_id"] == 1
    assert out["results"][0]["opus_go"] is True
    assert out["results"][0]["candidate_go"] is True
    assert out["results"][0]["category"] == "agrees"


def test_run_flags_gemma_looser_when_opus_rejected_but_gates_pass(db_file):
    insert_decision(db_file, request_id=10, action="reject", snapshot=snapshot_for(10))
    deps = deps_with(plan_with(["features"]))  # gate 1-2 không chặn → candidate_go=True

    out = calibrate.run(db_file, deps=deps)

    assert out["results"][0]["opus_go"] is False
    assert out["results"][0]["candidate_go"] is True
    assert out["results"][0]["category"] == "gemma_looser"


def test_run_flags_gemma_stricter_when_opus_approved_but_gate2_blocks(db_file):
    insert_decision(db_file, request_id=11, action="approve", snapshot=snapshot_for(11))
    deps = deps_with(plan_with(["db"]))  # 'db' ngoài surface → gate 2 chặn → candidate_go=False

    out = calibrate.run(db_file, deps=deps)

    assert out["results"][0]["opus_go"] is True
    assert out["results"][0]["candidate_go"] is False
    assert out["results"][0]["category"] == "gemma_stricter"


def test_summarize_reports_rate_and_counts_not_just_pass_fail():
    run_result = {
        "excluded_no_signal": 1,
        "results": [
            {"category": "agrees"}, {"category": "agrees"},
            {"category": "gemma_stricter"}, {"category": "gemma_looser"},
        ],
    }
    out = calibrate.summarize(run_result)
    assert out["n_compared"] == 4
    assert out["n_excluded_no_signal"] == 1
    assert out["agreement_rate"] == 0.5
    assert out["counts"] == {"agrees": 2, "gemma_stricter": 1, "gemma_looser": 1}


def test_summarize_handles_zero_comparable_rows():
    out = calibrate.summarize({"excluded_no_signal": 3, "results": []})
    assert out["n_compared"] == 0
    assert out["agreement_rate"] is None


def test_run_never_touches_git_or_telegram(db_file):
    insert_decision(db_file, request_id=20, action="approve", snapshot=snapshot_for(20))
    models = FakeModels(plan_with(["features"]))
    deps = Deps(models=models, git=Unavailable("git"), notify=Unavailable("telegram"))

    report = calibrate.summarize(calibrate.run(db_file, deps=deps))

    assert report["n_compared"] == 1
    with pytest.raises(NotImplementedError):
        deps.git.push("x")
