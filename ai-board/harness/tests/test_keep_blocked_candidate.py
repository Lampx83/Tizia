"""Cờ KEEP_BLOCKED_CANDIDATE: run chặn ở cổng 4+ có commit giữ nhánh và gửi blocked_candidate để eval chấm diff."""
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

COMMIT = {"sha": "c" * 40, "title": "x", "files": ["public/a.html"]}


class Budget:
    units = 0


def _execution(tmp_path, gates, kind="ordinary"):
    import worker
    kept = []
    execution = worker._Execution({}, ticket_id=1, checkout_source=".", deps=None, budget=Budget(), run_gate=None,
                                  cleanup=lambda state, keep_branch: kept.append(keep_branch), catalog=None,
                                  request_detail=None, memory_path=None, should_stop=None, candidate_opts=None,
                                  request_type=None, eval_tasks=None, preview_capture=None, checkpoint=None, plan_hash=None)
    execution.plan, execution.kind, execution.gates = {"steps": []}, kind, gates
    execution.state = {"commits": [COMMIT], "branch": "ai-board/2026-11-18-ticket-1-abc", "base_sha": "b" * 40}
    execution.scratch = tmp_path / "scratch"
    execution.open = True
    return execution, kept


BLOCKED5 = [{"gate": 3, "blocked": False}, {"gate": 4, "blocked": False}, {"gate": 5, "blocked": True, "reason": "x"}]


def test_flag_off_drops_the_blocked_branch(tmp_path):
    execution, kept = _execution(tmp_path, BLOCKED5)
    execution.close_attempt()
    assert kept == [False] and execution.blocked_candidate is None


def test_flag_on_keeps_the_branch_of_a_gate_5_block(tmp_path, monkeypatch):
    monkeypatch.setenv("AI_BOARD_KEEP_BLOCKED_CANDIDATE", "1")
    execution, kept = _execution(tmp_path, BLOCKED5)
    execution.close_attempt()
    assert kept == [True]
    assert execution.blocked_candidate["head_sha"] == COMMIT["sha"] and execution.candidate is None


def test_flag_on_does_not_keep_a_critical_or_pre_gate_4_block(tmp_path, monkeypatch):
    monkeypatch.setenv("AI_BOARD_KEEP_BLOCKED_CANDIDATE", "1")
    execution, kept = _execution(tmp_path, BLOCKED5, kind="critical")
    execution.close_attempt()
    assert kept == [False] and execution.blocked_candidate is None
    execution, kept = _execution(tmp_path, [{"gate": 3, "blocked": True, "reason": "x"}])
    execution.close_attempt()
    assert kept == [False]


def test_verdict_carries_the_blocked_candidate(tmp_path, monkeypatch):
    monkeypatch.setenv("AI_BOARD_KEEP_BLOCKED_CANDIDATE", "1")
    execution, _ = _execution(tmp_path, [*BLOCKED5[:2], {**BLOCKED5[2], "risk_level": None}])
    execution.close_attempt()
    execution.verdict()
    assert execution.result["outcome"] == "blocked" and execution.result["candidate"] is None
    assert execution.result["blocked_candidate"]["head_sha"] == COMMIT["sha"]
