"""Eval suite seam: run_trial on the real frozen corpus at the pinned commit with a scripted model, plus the pure statistics."""
import dataclasses
import json
import re
import threading
from pathlib import Path

import pytest

import eval_corpus
import eval_run
from evaluation.suite import metrics, runner, trial
from main import ROOT, Deps

FILLER = {"test_file": "test/x.test.js", "test": "import test from 'node:test';\n"}
SEED = 11


def plan_json(key, file):
    return json.dumps({"summary_vi": "Sửa chữ.", "capabilities": [], "subtasks": [{"title": f"[{key}] sửa", "file": file, "verify": "thấy chữ mới", "size": "small"}]})


@dataclasses.dataclass
class SuiteModels:
    """Reads [key] from the prompt. Gate 1 answers the right page except at `wrong_level` (an unrelated new page); gate 3 answers the corpus gold."""

    root: Path
    cases: dict
    wrong_level: int = 2
    gate1_model: str = "fake"
    gate3_model: str = "fake"
    gate3_model_light: str = "fake"
    calls: list = dataclasses.field(default_factory=list)

    def generate(self, model, prompt, **kw):
        key = re.search(r"\[(\w{6,})\]", prompt).group(1)
        case = self.cases[key]
        if "summary_vi" in prompt and "capabilities" in prompt:
            self.calls.append(("gate1", key))
            file = "public/trang-khong-co.html" if case["level"] == self.wrong_level else case["file"]
            return {"response": plan_json(key, file), "prompt_eval_count": 500, "eval_count": 100}
        self.calls.append(("gate3", key))
        body = {"edits": case["gold"]["edits"]} if "edits" in case["gold"] else {"code": case["gold"]["code"]}
        return {"response": json.dumps({**body, **FILLER}, ensure_ascii=False), "prompt_eval_count": 120, "eval_count": 80}


@pytest.fixture(scope="module")
def world(tmp_path_factory):
    root = tmp_path_factory.mktemp("suite")
    assert eval_run.main(["corpus", "--seed", str(SEED), "--root", str(root)]) == 2
    for home in (root / "corpus", root / "heldout"):
        texts = {t["key"]: {"title": f"[{t['key']}] {t['types'][0]}", "verify": "kiểm", "detail": f"sửa {t['file']} [{t['key']}]"}
                 for t in json.loads((home / "texts-todo.json").read_text(encoding="utf-8"))}
        (home / "texts.json").write_text(json.dumps(texts, ensure_ascii=False), encoding="utf-8")
    tasks = eval_corpus.write_corpus(root, SEED, ROOT)
    return root, tasks


def deps_for(world, **kw):
    root, tasks = world
    models = SuiteModels(root, {t["key"]: t for t in tasks}, **kw)
    return Deps(models=models, notify=None, sleep=lambda _s: None), models


def pick(tasks, level, split="dev"):
    return next(t for t in tasks if t["level"] == level and t["split"] == split and t["kind"] != "new_page")


@pytest.fixture(autouse=True)
def validator_passes(monkeypatch):
    monkeypatch.setattr(trial.plan_validate, "run", lambda *a, **k: {"gate": 2.5, "blocked": False, "reason": None})


def test_e2e_right_plan_is_resolved_and_counts_both_stages(world):
    root, tasks = world
    deps, models = deps_for(world)
    task = pick(tasks, 1)
    row = trial.run_trial(task, "e2e", deps, root, ROOT)
    assert row["resolved"] and row["plan"]["first_hit"] and row["plan"]["first_exact"] and row["plan"]["final_hit"]
    assert [c[0] for c in models.calls] == ["gate1", "gate3"] and row["model_calls"] == 2
    assert row["tokens_in"] >= 620 and row["collateral"] == [] and metrics.failure_class(row) is None


def test_e2e_wrong_page_is_a_plan_miss_not_an_implementation_failure(world):
    root, tasks = world
    deps, models = deps_for(world)
    row = trial.run_trial(pick(tasks, 2), "e2e", deps, root, ROOT)
    assert not row["resolved"] and not row["plan"]["first_hit"] and row["plan"]["first_plans_new_page"]
    assert metrics.failure_class(row) == "plan_miss"


def test_gold_mode_skips_planning_and_matches_the_old_baseline_semantics(world):
    root, tasks = world
    deps, models = deps_for(world, wrong_level=2)
    row = trial.run_trial(pick(tasks, 2), "gold", deps, root, ROOT)
    assert row["resolved"] and row["plan"] is None and [c[0] for c in models.calls] == ["gate3"]


def test_validator_block_stops_before_gate3(world, monkeypatch):
    root, tasks = world
    monkeypatch.setattr(trial.plan_validate, "run", lambda *a, **k: {"gate": 2.5, "blocked": True, "reason": "needs_clarification"})
    deps, models = deps_for(world)
    row = trial.run_trial(pick(tasks, 1), "e2e", deps, root, ROOT)
    assert not row["resolved"] and row["plan"]["validator_blocked"] and "gate3" not in [c[0] for c in models.calls]
    assert metrics.failure_class(row) == "validator_blocked"


def test_two_workers_do_not_mix_trials(world):
    root, tasks = world
    picked = [pick(tasks, 1), pick(tasks, 4)]
    deps, models = deps_for(world)
    rows, errors = {}, []

    def go(task):
        try:
            rows[task["id"]] = trial.run_trial(task, "e2e", deps, root, ROOT)
        except Exception as error:  # noqa: BLE001
            errors.append(error)
    threads = [threading.Thread(target=go, args=(t,)) for t in picked]
    [t.start() for t in threads]
    [t.join() for t in threads]
    assert not errors and all(rows[t["id"]]["resolved"] and rows[t["id"]]["model_calls"] == 2 for t in picked)


def test_store_resumes_and_drops_a_half_written_last_line(tmp_path):
    dev, vault = tmp_path / "dev.jsonl", tmp_path / "vault" / "r.jsonl"
    row = {"id": "a", "mode": "e2e", "repeat": 1, "split": "dev"}
    dev.write_text(json.dumps(row) + "\n" + '{"id": "b", "mo', encoding="utf-8")
    store = runner.Store(dev, vault)
    assert set(store.rows) == {("a", "e2e", 1)}
    store.add({"id": "h", "mode": "gold", "repeat": 1, "split": "heldout"})
    assert vault.exists() and "h" not in dev.read_text(encoding="utf-8")
    assert set(runner.Store(dev, vault).rows) == {("a", "e2e", 1), ("h", "gold", 1)}


def _rows(outcomes, mode="e2e"):
    return [{"id": f"t{i}", "mode": mode, "repeat": rep, "resolved": ok, "collateral": [], "gate_passed": True, "gate4": "passed", "shipped": False, "model_calls": 2,
             "retries": 0, "stuck": False, "truncated": False, "tokens_in": 10, "tokens_out": 5, "wall_s": 1.0,
             "plan": {"blocked": False, "validator_blocked": False, "final_hit": True, "first_hit": True, "first_exact": True, "first_parse_ok": True,
                      "first_nonexistent": False, "first_plans_new_page": False, "first_extra": 0},
             "split": "dev", "kind": "k", "level": 1, "style": "named"}
            for i, flags in enumerate(outcomes) for rep, ok in enumerate(flags, 1)]


def test_statistics_pass_at_k_vs_pass_all_and_wilson():
    rows = _rows([(True, True, True), (True, False, False), (False, False, False)])
    g = metrics.summarize(rows)
    assert (g["resolved"]["k"], g["resolved"]["n"]) == (4, 9) and g["pass_any"]["k"] == 2 and g["pass_all"]["k"] == 1 and g["flaky_tasks"] == 1
    assert metrics.wilson(0, 10)[0] == 0.0 and metrics.wilson(10, 10)[1] == 100.0 and metrics.wilson(5, 10) == (23.7, 76.3)


def test_compare_calls_a_real_gain_improved_and_noise_not_significant():
    base = _rows([(False,) * 3] * 12)
    better = _rows([(True,) * 3] * 10 + [(False,) * 3] * 2)
    assert metrics.compare(base, better)["verdict"] == "improved"
    same = _rows([(True, False, False)] * 12)
    assert metrics.compare(same, same)["verdict"] == "no_significant_change"
    worse = metrics.compare(better, base)
    assert worse["verdict"] == "regressed" and worse["delta_points"] < 0


def test_run_end_to_end_parallel_resume_and_report(world, capsys):
    root, tasks = world
    deps, models = deps_for(world)
    argv = ["run", "--seed", str(SEED), "--split", "dev", "--cases", "4", "--repeats", "2", "--modes", "e2e,gold", "--workers", "2",
            "--root", str(root), "--allow-dirty"]
    assert runner.main(argv, deps) == 0
    out = capsys.readouterr().out
    run_dir = next((root / "suite").iterdir())
    meta = json.loads((run_dir / "run.json").read_text(encoding="utf-8"))
    rows = [json.loads(line) for line in (run_dir / "results.jsonl").read_text(encoding="utf-8").splitlines()]
    assert meta["status"] == "complete" and len(rows) == 4 * 2 * 2 and {r["mode"] for r in rows} == {"e2e", "gold"}
    assert "mode e2e" in out and "mode gold" in out and (run_dir / "report.json").exists()
    calls = len(models.calls)
    assert runner.main(argv, deps) == 0 and len(models.calls) == calls  # resume: nothing re-run
    assert runner.main([*argv[:-1], "--allow-dirty", "--repeats", "3"], deps) == 2  # different config in the same dir is refused


def test_nodia_variant_strips_diacritics_from_the_request_the_planner_sees(world):
    root, tasks = world
    assert trial.strip_diacritics("Đổi chữ nút 'Quay lại'") == "Doi chu nut 'Quay lai'"
    task = {**pick(tasks, 1), "title": "[abcdef] Đổi chữ", "detail": "Em muốn đổi"}
    assert trial.request_of(task, "nodia")["subject"].isascii() and trial.request_of(task)["subject"] == "[abcdef] Đổi chữ"
    deps, _ = deps_for(world)
    assert trial.run_trial(pick(tasks, 1), "e2e:nodia", deps, root, ROOT)["resolved"]


def test_integrity_flags_failover_foreign_model_and_silent_reasoning():
    meta = {"model": "m", "reasoning": {"gate1": True}, "ref": "a"}
    ok = {"mode": "e2e", "plan": {"attempts": 1}, "providers": ["vllm"], "served": ["m"], "reasoning_chars": 40}
    assert runner.integrity(meta, [ok], {"ref": "a", "model": "m"}) == []
    assert any("left vLLM" in p for p in runner.integrity(meta, [{**ok, "providers": ["vllm", "ollama"]}]))
    assert any("different served model" in p for p in runner.integrity(meta, [{**ok, "served": ["other"]}]))
    assert any("no reasoning text" in p for p in runner.integrity(meta, [{**ok, "reasoning_chars": 0}]))
    assert any("ref changed" in p for p in runner.integrity(meta, [ok], {"ref": "b", "model": "m"}))
