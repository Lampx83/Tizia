import json

import gate5_summary


def _run(gates, kind="frontend"):
    return {"run_id": 7, "kind": kind, "evidence_json": json.dumps({"verdict": {"gates": gates}})}


def test_rows_read_only_gate5_entries_with_sandbox_metrics():
    gates = [{"gate": 3}, {"gate": 5, "sandbox": {"wall_s": 812.4, "peak_kib": 1048576, "outcome": "passed"}}]
    assert gate5_summary.rows([_run(gates)]) == [
        {"run": 7, "kind": "frontend", "seconds": 812.4, "peak_mb": 1024.0, "outcome": "passed"}]


def test_pre_metric_and_bad_json_rows_are_skipped():
    assert gate5_summary.rows([_run([{"gate": 5, "blocked": True}]), {"run_id": 8, "evidence_json": "{not json"}]) == []


def test_missing_peak_renders_dash():
    items = gate5_summary.rows([_run([{"gate": 5, "sandbox": {"wall_s": 5.0, "peak_kib": None, "outcome": "blocked"}}], kind="docs")])
    assert gate5_summary.table(items).splitlines()[-1] == "| 7 | docs | 5.0 | - | blocked |"
