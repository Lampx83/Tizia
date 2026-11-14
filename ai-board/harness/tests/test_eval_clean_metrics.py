"""Approved report arithmetic, no corpus/model/operator access."""
from evaluation.suite import metrics, runner
from runtime import limits
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


def test_compare_requires_the_dataset_pin_only_when_a_run_records_it(tmp_path, capsys):
    paths = [tmp_path / arm / "results.jsonl" for arm in ("control", "candidate")]
    meta = {"ref": "source", "dirty": False, "model": "model", "routing_catalog": "catalog",
            "prompt_lock": "prompt", "skill_lock": "skill", "contract_hash": "contract", "config_sha256": "config", "tool_manifest": "tools",
            "suite_hash": "suite", "pipeline_hash": "pipeline", "reasoning": {}, "corpus_sha": "corpus",
            "seed": 7, "repeats": 1, "modes": ["gold"], "fast_tier": True, "review": False,
            "packs": [], "budget": {"model_calls": 40}, "status": "complete", "integrity": []}
    for path in paths:
        path.parent.mkdir()
        path.write_text(json.dumps({**row(), "repeat": 1}) + "\n")
        path.with_name("run.json").write_text(json.dumps(meta))
    args = SimpleNamespace(baseline=str(paths[0]), candidate=str(paths[1]))
    runner.cmd_compare(args)
    assert json.loads(capsys.readouterr().out.partition(" ")[2])["verdict"] != "incomparable"  # neither run used it

    pin = {"requests_dataset_sha256": "a" * 64, "requests_dataset_path": "H:/eval/requests-v1.csv", "requests_dataset_rows": 37}
    paths[0].with_name("run.json").write_text(json.dumps({**meta, **pin}))
    runner.cmd_compare(args)
    result = json.loads(capsys.readouterr().out.partition(" ")[2])
    assert result["verdict"] == "incomparable"
    assert "missing or different pin: requests_dataset_sha256" in result["reasons"]

    paths[1].with_name("run.json").write_text(json.dumps({**meta, **pin, "requests_dataset_sha256": "b" * 64}))
    runner.cmd_compare(args)
    assert "missing or different pin: requests_dataset_sha256" in json.loads(capsys.readouterr().out.partition(" ")[2])["reasons"]

    paths[1].with_name("run.json").write_text(json.dumps({**meta, **pin}))
    runner.cmd_compare(args)
    assert json.loads(capsys.readouterr().out.partition(" ")[2])["verdict"] != "incomparable"


def test_manifest_integrity_flags_a_changed_or_missing_dataset(tmp_path):
    path = tmp_path / "requests-v1.csv"
    path.write_bytes(b"id,split\n1,dev\n")
    from evaluation import requests_dataset
    meta = {"requests_dataset_sha256": requests_dataset.dataset_hash(path), "requests_dataset_path": str(path)}
    assert runner._live_dataset_pin(meta) == {"requests_dataset_sha256": meta["requests_dataset_sha256"]}
    path.write_bytes(b"id,split\n1,gold\n")
    assert runner._live_dataset_pin(meta) != {"requests_dataset_sha256": meta["requests_dataset_sha256"]}
    path.unlink()
    assert runner._live_dataset_pin(meta) == {"requests_dataset_sha256": None}
    assert runner._live_dataset_pin({}) == {}


def test_compare_rejects_unmatched_repeats_and_duplicate_trials():
    baseline = [{**row(), "repeat": 1}, {**row(), "repeat": 2}]
    for candidate in (baseline[:1], [baseline[0], baseline[0]], [{**baseline[0], "id": "other"}]):
        assert metrics.compare(baseline, candidate)["verdict"] == "incomparable"


def test_compare_cli_reports_separate_cost_checks_only_with_matching_pins(tmp_path, capsys):
    paths = [tmp_path / arm / "results.jsonl" for arm in ("control", "candidate")]
    meta = {"ref": "source", "dirty": False, "model": "model", "routing_catalog": "catalog",
            "prompt_lock": "prompt", "skill_lock": "skill", "contract_hash": "contract", "config_sha256": "config", "tool_manifest": "tools",
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


def trial(task, rep, ok, kind="a", infra=False):
    return {**row(resolved=ok), "id": f"t{task}", "repeat": rep, "kind": kind, "infra_error": infra}


def test_infra_above_threshold_is_inconclusive_at_boundary_is_not():
    over = [trial(i, 1, True, infra=i < 3) for i in range(10)]
    at = [trial(i, 1, True, infra=i < 1) for i in range(10)]
    group = metrics.summarize(over)
    assert group["valid"]["rate"] == 70.0 and group["conclusive"] is False
    assert metrics.summarize(at)["conclusive"] is True
    clean = [trial(i, 1, True) for i in range(10)]
    verdict = metrics.compare(clean, over)
    assert verdict["verdict"] == "inconclusive_infra" and verdict["valid_percent"] == {"baseline": 100.0, "candidate": 70.0}
    assert metrics.compare(clean, at)["verdict"] != "inconclusive_infra"


def test_integrity_flags_infra_only_above_threshold():
    rows = lambda bad: [{"mode": "e2e", "infra_error": i < bad, "providers": ["vllm"], "served": ["m"]} for i in range(10)]
    meta = {"model": "m"}
    assert not any("infrastructure" in p for p in runner.integrity(meta, rows(1)))
    assert any("infrastructure" in p for p in runner.integrity(meta, rows(2)))


def test_small_cell_groups_are_display_only_and_large_ones_get_a_verdict():
    base = [trial(i, 1, False, kind="a") for i in range(12)] + [trial(100 + i, 1, False, kind="b") for i in range(3)]
    better = [trial(i, 1, True, kind="a") for i in range(12)] + [trial(100 + i, 1, True, kind="b") for i in range(3)]
    groups = metrics.compare_groups(base, better)
    assert groups["kind=a"]["verdict"] == "improved"
    assert groups["kind=b"] == {"verdict": None, "display_only": True, "tasks": 3}
    assert metrics.compare(base, better)["verdict"] == "improved"


def test_inconclusive_infra_hides_conclusion_fields():
    clean = [trial(i, 1, True) for i in range(10)]
    over = [trial(i, 1, False, infra=i < 3) for i in range(10)]
    result = metrics.compare(clean, over)
    assert result["verdict"] == "inconclusive_infra" and result["inconclusive_infra"] is True
    assert result["delta_points"] is None and result["ci95_points"] is None and result["sign_test_p"] is None


def test_group_gate_counts_common_tasks_only():
    a = [trial(i, 1, False) for i in range(12)]
    b = [trial(i + 6, 1, True) for i in range(12)]
    assert metrics.compare_groups(a, b)["kind=a"] == {"verdict": None, "display_only": True, "tasks": 6}


def test_group_over_infra_threshold_is_inconclusive():
    a = [trial(i, 1, False) for i in range(12)]
    b = [trial(i, 1, True, infra=i < 4) for i in range(12)]
    group = metrics.compare_groups(a, b)["kind=a"]
    assert group["verdict"] == "inconclusive_infra" and group["delta_points"] is None


def _compare_cli(tmp_path, capsys, infra=0, model_b="model"):
    meta = {"ref": "source", "dirty": False, "model": "model", "routing_catalog": "catalog",
            "prompt_lock": "prompt", "skill_lock": "skill", "contract_hash": "contract", "config_sha256": "config", "tool_manifest": "tools",
            "suite_hash": "suite", "pipeline_hash": "pipeline", "reasoning": {}, "corpus_sha": "corpus",
            "seed": 7, "repeats": 1, "modes": ["gold"], "fast_tier": True, "review": False,
            "packs": [], "budget": {"model_calls": 40}, "status": "complete", "integrity": []}
    paths = [tmp_path / arm / "results.jsonl" for arm in ("control", "candidate")]
    for path, bad, model in zip(paths, (0, infra), ("model", model_b)):
        path.parent.mkdir()
        path.write_text("".join(json.dumps({**trial(i, 1, True, infra=i < bad), "repeat": 1}) + "\n" for i in range(10)))
        path.with_name("run.json").write_text(json.dumps({**meta, "model": model}))
    runner.cmd_compare(SimpleNamespace(baseline=str(paths[0]), candidate=str(paths[1])))
    return json.loads(capsys.readouterr().out.partition(" ")[2])


def test_cmd_compare_infra_heavy_rows(tmp_path, capsys):
    result = _compare_cli(tmp_path, capsys, infra=3)
    assert result["verdict"] == "inconclusive_infra" and result["inconclusive_infra"] is True
    assert result["valid_percent"] == {"baseline": 100.0, "candidate": 70.0}
    assert result["delta_points"] is None and result["sign_test_p"] is None


def test_cmd_compare_pin_mismatch_keeps_validity_fields(tmp_path, capsys):
    result = _compare_cli(tmp_path, capsys, infra=3, model_b="other")
    assert result["verdict"] == "incomparable" and "missing or different pin: model" in result["reasons"]
    assert result["valid_percent"] == {"baseline": 100.0, "candidate": 70.0} and result["inconclusive_infra"] is True


def ctrial(i, infra=False, kind="k"):
    return {"id": f"t{i}", "mode": "gold", "repeat": 0, "resolved": True, "infra_error": infra, "kind": kind,
            "collateral": [], "shipped": True}


def test_contract_thresholds_match_previous_constants():
    assert metrics.infra_max_rate() == 0.1
    assert metrics.min_group_tasks() == 10


def test_infra_branch_over_and_at_contract_threshold():
    base = [ctrial(i) for i in range(10)]
    assert metrics.compare([ctrial(i, infra=i < 2) for i in range(10)], base)["inconclusive_infra"] is True
    assert metrics.compare([ctrial(i, infra=i < 1) for i in range(10)], base)["inconclusive_infra"] is False
    assert metrics.summarize([dict(row(), infra_error=i < 2) for i in range(10)])["conclusive"] is False
    assert metrics.summarize([dict(row(), infra_error=i < 1) for i in range(10)])["conclusive"] is True


def test_group_size_branch_small_and_large_from_contract():
    small = metrics.compare_groups([ctrial(i) for i in range(9)], [ctrial(i) for i in range(9)])
    large = metrics.compare_groups([ctrial(i) for i in range(10)], [ctrial(i) for i in range(10)])
    assert small["kind=k"] == {"verdict": None, "display_only": True, "tasks": 9}
    assert large["kind=k"]["verdict"] is not None and "display_only" not in large["kind=k"]


def test_changed_contract_value_changes_verdict(monkeypatch):
    base = [ctrial(i) for i in range(10)]
    infra_rows = [ctrial(i, infra=i < 2) for i in range(10)]
    monkeypatch.setattr(limits, "contract", lambda: {"evaluation": {"infra_max_rate": 0.5, "min_group_tasks": 5}})
    assert metrics.compare(infra_rows, base)["inconclusive_infra"] is False
    assert metrics.compare_groups([ctrial(i) for i in range(9)], [ctrial(i) for i in range(9)])["kind=k"]["verdict"] is not None
