"""Approved report arithmetic, no corpus/model/operator access."""
from evaluation.suite import metrics, runner
import json
from types import SimpleNamespace


def row(resolved=True, shipped=True, collateral=None, calls=2, tokens=20, wall=3):
    return {"id": "task", "mode": "gold", "resolved": resolved, "shipped": shipped, "collateral": collateral or [],
            "gate_passed": True, "gate4": "passed", "model_calls": calls, "tokens_in": tokens, "tokens_out": 0,
            "wall_s": wall, "retries": 0, "stuck": False, "truncated": False}


def test_clean_fixture_shipped_intersection_and_legacy_cost_unchanged():
    rows = [row(), row(shipped=False), row(resolved=False), row(collateral=["outside.html"])]
    report = metrics.report(rows)["gold"]["all"]
    assert report["resolved"]["k"] == 3 and report["resolved_clean"]["k"] == 2
    assert report["shipped"]["k"] == 3 and report["clean_fixture_shipped"]["k"] == 1
    assert report["cost"]["tokens_per_resolved"] == round(80 / 3)
    assert report["cost_per_resolved_clean"]["tokens"]["per_resolved_clean"] == 40


def test_failed_attempt_costs_and_missing_telemetry_never_become_free():
    cost = metrics.clean_cost([row(), row(resolved=False, calls=8, tokens=80, wall=7)])
    assert cost["denominator"] == 1 and cost["model_calls"]["total"] == 10
    assert cost["tokens"]["per_resolved_clean"] == 100 and cost["processing_s"]["per_resolved_clean"] == 10
    for rows in ([], [row(resolved=False)]):
        assert metrics.clean_cost(rows)["tokens"]["per_resolved_clean"] is None
    missing = row()
    del missing["tokens_out"]
    assert metrics.clean_cost([missing])["tokens"]["status"] == "missing_telemetry"
    report = metrics.report([missing])["gold"]["all"]
    assert report["cost"]["tokens_per_resolved"] is None
    assert report["cost_per_resolved_clean"]["tokens"]["per_resolved_clean"] is None
    assert metrics.clean_cost([row(wall=float("nan"))])["processing_s"]["per_resolved_clean"] is None


def test_separate_ten_percent_limits_and_timing_pending():
    baseline, candidate = [row(calls=10, tokens=100, wall=10)], [row(calls=11, tokens=111, wall=9)]
    checks = metrics.compare_clean_cost(baseline, candidate)
    assert checks["model_calls"]["status"] == "pass"
    assert checks["tokens"]["status"] == "fail"
    assert checks["processing_s"]["status"] == "pending"
    assert metrics.compare_clean_cost(baseline, candidate, timing_comparable=True)["processing_s"]["status"] == "pass"
    assert all(v["status"] == "pending" for v in metrics.compare_clean_cost([row(resolved=False)], candidate).values())
    assert metrics.compare_clean_cost([row(calls=0)], [row(calls=0)])["model_calls"]["status"] == "pass"
    assert metrics.compare_clean_cost([row(calls=0)], [row(calls=1)])["model_calls"]["status"] == "fail"
    assert metrics.compare_clean_cost([row(calls=0)], [row(calls=1e-13)])["model_calls"]["status"] == "fail"


def test_render_new_report_and_legacy_report_are_compatible():
    report = metrics.report([row()])
    text = runner.render(report)
    assert "clean fixture-shipped 1/1" in text
    assert "model_calls=2.0 (available)" in text
    assert "timing verdict pending" in text
    legacy = report["gold"]["all"]
    del legacy["clean_fixture_shipped"], legacy["cost_per_resolved_clean"]
    text = runner.render(report)
    assert "clean fixture-shipped" not in text
    assert "2.0" in text


def test_compare_rejects_unmatched_repeats_and_duplicate_trials():
    baseline = [{**row(), "repeat": 1}, {**row(), "repeat": 2}]
    for candidate in (baseline[:1], [baseline[0], baseline[0]], [{**baseline[0], "id": "other"}]):
        assert metrics.compare(baseline, candidate)["verdict"] == "incomparable"


def test_compare_cli_reports_separate_cost_checks_only_with_matching_pins(tmp_path, capsys):
    paths = [tmp_path / arm / "results.jsonl" for arm in ("control", "candidate")]
    meta = {"ref": "source", "dirty": False, "model": "model", "routing_catalog": "catalog",
            "prompt_lock": "prompt", "skill_lock": "skill", "contract_hash": "contract",
            "suite_hash": "suite", "pipeline_hash": "pipeline", "reasoning": {}, "corpus_sha": "corpus",
            "seed": 7, "repeats": 1, "modes": ["gold"], "fast_tier": True, "review": False,
            "packs": [], "budget": {"model_calls": 40}, "status": "complete", "integrity": []}
    for path, calls, tokens in zip(paths, (10, 11), (100, 111)):
        path.parent.mkdir()
        path.write_text(json.dumps({**row(calls=calls, tokens=tokens), "repeat": 1}) + "\n")
        path.with_name("run.json").write_text(json.dumps(meta))
    args = SimpleNamespace(baseline=str(paths[0]), candidate=str(paths[1]))
    assert runner.cmd_compare(args) == 0
    result = json.loads(capsys.readouterr().out.partition(" ")[2])
    assert result["cost_per_resolved_clean"]["model_calls"]["status"] == "pass"
    assert result["cost_per_resolved_clean"]["tokens"]["status"] == "fail"
    assert result["cost_per_resolved_clean"]["processing_s"]["status"] == "pending"
    timing = {"gpu": "fixture GPU", "load": "exclusive", "warm_cold": "warm", "protocol": "fixture protocol", "comparable": True}
    for path in paths:
        path.with_name("run.json").write_text(json.dumps({**meta, "timing_conditions": timing}))
    runner.cmd_compare(args)
    result = json.loads(capsys.readouterr().out.partition(" ")[2])
    assert result["cost_per_resolved_clean"]["processing_s"]["status"] == "pass"
    paths[1].with_name("run.json").write_text(json.dumps({**meta, "model": "different"}))
    runner.cmd_compare(args)
    result = json.loads(capsys.readouterr().out.partition(" ")[2])
    assert result["verdict"] == "incomparable"
    assert "missing or different pin: model" in result["reasons"]
    paths[1].with_name("run.json").unlink()
    assert runner.cmd_compare(args) == 0
    result = json.loads(capsys.readouterr().out.partition(" ")[2])
    assert result["verdict"] == "incomparable"
    assert all(check["status"] == "pending" for check in result["cost_per_resolved_clean"].values())
