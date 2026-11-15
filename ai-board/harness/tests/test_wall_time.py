from evaluation import wall_time as wt


def _ev(at, transition):
    return {"created_at": at, "transition": transition}


def _sp(name, a, b):
    return {"name": name, "start_ms": a, "end_ms": b}


ROOT = {"created_at": 0}
EVENTS = [_ev(0, "created->queued"), _ev(10_000, "queued->running"), _ev(60_000, "running->waiting:clarifying"),
          _ev(80_000, "clarifying->intake"), _ev(80_000, "intake->running"), _ev(120_000, "running->done")]


def test_parts_sum_to_wall_and_split_by_span():
    spans = [_sp("invoke_agent gate 2", 10_000, 30_000), _sp("chat m", 12_000, 20_000),
             _sp("invoke_agent gate 5", 30_000, 60_000), _sp("sandbox_exec", 35_000, 45_000),
             _sp("invoke_agent gate 5", 80_000, 120_000)]
    got = wt.attribute(ROOT, EVENTS, spans, 120_000)
    p = got["parts"]
    assert (p["queue"], p["clarify_wait"]) == (10.0, 20.0)
    assert (p["model"], p["sandbox"], p["gate 2"]) == (8.0, 10.0, 12.0)
    assert p["gate 5 other"] == 20.0 + 40.0
    assert got["wall_s"] == 120.0 and got["ok"] and abs(got["gap_s"]) < 1e-9


def test_gate5_checks_split_into_browser_curl_other():
    spans = [_sp("invoke_agent gate 2", 10_000, 30_000), _sp("invoke_agent gate 5", 30_000, 60_000),
             _sp("invoke_agent gate 3", 80_000, 120_000), _sp("gate5 check browser", 35_000, 40_000),
             _sp("gate5 check curl", 50_000, 52_000), _sp("gate5 check route", 53_000, 54_000)]
    got = wt.attribute(ROOT, EVENTS, spans, 120_000)
    p = got["parts"]
    assert (p["gate 5 browser"], p["gate 5 curl"], p["gate 5 other"]) == (5.0, 2.0, 23.0)
    assert "gate 5 checks" not in p
    assert got["wall_s"] == 120.0 and got["ok"] and abs(got["gap_s"]) < 1e-9


def test_untracked_running_and_outside_spans_flag():
    got = wt.attribute(ROOT, EVENTS, [_sp("chat m", 10_000, 20_000)], 120_000)
    assert got["unexplained_s"] == 80.0 and not got["ok"]
    out = wt.attribute(ROOT, EVENTS, [_sp("chat m", 62_000, 70_000)], 120_000)
    assert out["outside_s"] == 8.0 and not out["ok"]


def test_rows_use_child_runs_and_root_events_only():
    tickets = [{"id": 1, "parent_id": None}, {"id": 2, "parent_id": 1}]
    roots = [{"id": 1, "created_at": 0, "updated_at": 20_000}]
    events = [{"id": 1, "ticket_id": 1, "run_id": None, **_ev(0, "queued->running")},
              {"id": 2, "ticket_id": 2, "run_id": 9, **_ev(5_000, "queued->done")}]
    spans = [{"run_id": 9, **_sp("chat m", 0, 20_000)}, {"run_id": 8, **_sp("chat m", 0, 20_000)}]
    got = wt.rows(roots, tickets, events, spans)
    assert got[0]["parts"] == {"model": 20.0} and got[0]["ok"]


def test_from_trial_polled_timeline():
    trial = {"trial_wall_s": 100.0, "model_wall_s": 30.0, "timeline": [
        {"t": 5.0, "status": "queued", "phase": "intake"}, {"t": 10.0, "status": "running", "phase": "planning"},
        {"t": 40.0, "status": "queued", "phase": "clarifying"}, {"t": 60.0, "status": "running", "phase": "ticketized"}]}
    got = wt.from_trial(trial)
    assert got["parts"] == {"queue": 10.0, "gate:planning": 30.0, "clarify_wait": 20.0, "gate:ticketized": 40.0}
    assert got["ok"] and got["model_s"] == 30.0
    assert not wt.from_trial({"trial_wall_s": 50.0, "timeline": []})["ok"]


def test_table_flags_not_rounds():
    got = wt.attribute(ROOT, EVENTS, [], 120_000)
    got["label"] = "t1"
    assert "OVER TOL" in wt.table([got], "case")
