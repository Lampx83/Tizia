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


def test_integrity_flags_a_run_dominated_by_infra_errors():
    meta = {"model": "m", "reasoning": {}}
    rows = [{"mode": "gold", "providers": ["vllm"], "served": ["m"], "infra_error": i < 3} for i in range(10)]
    assert any("infrastructure errors" in p for p in runner.integrity(meta, rows))
    assert runner.integrity(meta, [{**r, "infra_error": False} for r in rows]) == []


def _pack_entry():
    """A real small commit of this repo as a pack entry (texts are test fixtures, not benchmark content)."""
    import subprocess
    sha = "5b737779"
    full = subprocess.run(["git", "rev-parse", sha], capture_output=True, text=True, cwd=ROOT).stdout.strip()
    base = subprocess.run(["git", "rev-parse", f"{sha}^"], capture_output=True, text=True, cwd=ROOT).stdout.strip()
    files = [f for f in subprocess.run(["git", "diff", "--name-only", f"{sha}^", sha, "--", "public"], capture_output=True, text=True, cwd=ROOT).stdout.split() if f.endswith(".html")]
    return {"id": "pr-fixture", "base_sha": base, "commit": full, "files": files, "title": "Mục có thể gập lại", "detail": "Cho các mục trên trang này gập lại được.",
            "subtasks": [{"title": "gập mục", "file": f, "verify": "bấm tiêu đề mục thì nội dung ẩn"} for f in files]}


def test_taskpack_gold_comes_from_git_and_the_oracle_separates_merged_from_base():
    from evaluation.suite import taskpack
    entry = _pack_entry()
    assert taskpack.validate([entry], ROOT) == []
    repo = eval_corpus.checkout_at(Path(__import__("tempfile").mkdtemp()), entry["base_sha"], ROOT)
    sections = taskpack.gold_sections(repo, entry)
    oracle = taskpack.make_oracle(repo, entry)
    assert oracle({f: s[3] for f, s in sections.items()}) and not oracle({f: s[2] for f, s in sections.items()})
    huge = {f: s[3] + "\n" + "\n".join(f"<p>extra {i}</p>" for i in range(200)) for f, s in sections.items()}
    assert not oracle(huge)  # a superset that bloats the file is rejected
    bad = {**entry, "title": "x", "subtasks": []}
    assert any("subtasks" in p for p in taskpack.validate([bad], ROOT))
    assert any("duplicate id" in p for p in taskpack.validate([entry, entry], ROOT))


def test_pack_task_runs_through_e2e_and_gold(world, monkeypatch):
    from evaluation.suite import taskpack
    root, tasks = world
    entry = taskpack.load_pack(_write_pack(root, _pack_entry()))[0]
    merged = {f: s[3] for f, s in taskpack.gold_sections(eval_corpus.checkout_at(root, entry["base_sha"], ROOT), entry).items()}

    @dataclasses.dataclass
    class PackModels(SuiteModels):
        def generate(self, model, prompt, **kw):
            if "summary_vi" in prompt and "capabilities" in prompt:
                plan = {"summary_vi": "x", "capabilities": [], "subtasks": [{"title": "t", "file": f, "verify": "v", "size": "small"} for f in entry["files"]]}
                return {"response": json.dumps(plan), "prompt_eval_count": 1, "eval_count": 1}
            return {"response": "bad", "prompt_eval_count": 1, "eval_count": 1}
    deps = Deps(models=PackModels(root, {}), notify=None, sleep=lambda _s: None)
    row = trial.run_trial(entry, "e2e", deps, root, ROOT)
    assert row["plan"]["first_hit"] and row["plan"]["first_exact"] and not row["resolved"]  # right files, model produced nothing usable
    assert merged  # the merged result is what the oracle accepts (covered above)


def _write_pack(root, entry):
    path = Path(root) / "pack-fixture.json"
    path.write_text(json.dumps([entry], ensure_ascii=False), encoding="utf-8")
    return path


def test_review_stage_counts_a_block_on_a_benign_candidate_as_false_block(world, monkeypatch):
    root, tasks = world
    deps, _ = deps_for(world)
    verdicts = iter([{"blocked": False, "labels": ["ok"]}, {"blocked": True, "labels": ["pii"], "failure_class": "ordinary"}])
    monkeypatch.setattr(trial.static_check, "content_review", lambda state, d, b: next(verdicts))
    rows = [trial.run_trial(pick(tasks, lv), "gold", deps, root, ROOT, review=True) for lv in (1, 2)]
    assert [r["review"]["blocked"] for r in rows] == [False, True]
    g = metrics.summarize([{**r, "repeat": 1, "split": "dev"} for r in rows])
    assert (g["review_false_block"]["k"], g["review_false_block"]["n"]) == (1, 2)
    assert trial.run_trial(pick(tasks, 1), "gold", deps, root, ROOT)["review"] is None  # off by default


def test_approved_variant_continues_past_a_validator_block_and_keeps_the_block_on_record(world, monkeypatch):
    root, tasks = world
    monkeypatch.setattr(trial.plan_validate, "run", lambda *a, **k: {"gate": 2.5, "blocked": True, "reason": "plan_ungrounded"})
    deps, models = deps_for(world)
    strict = trial.run_trial(pick(tasks, 1), "e2e", deps, root, ROOT)
    approved = trial.run_trial(pick(tasks, 1), "e2e:approved", deps, root, ROOT)
    assert not strict["resolved"] and metrics.failure_class(strict) == "validator_blocked"
    assert approved["resolved"] and approved["plan"]["validator_blocked"] and approved["plan"]["validator_reason"] == "plan_ungrounded"
    assert metrics.failure_class(approved) is None


def test_gate1_block_reason_is_kept_in_the_row(world):
    root, tasks = world
    deps = Deps(models=type("M", (), {"gate1_model": "f", "gate3_model": "f", "gate3_model_light": "f",
                                       "generate": lambda self, *a, **k: {"response": "not json", "prompt_eval_count": 1, "eval_count": 1}})(),
                notify=None, sleep=lambda _s: None)
    row = trial.run_trial(pick(tasks, 1), "e2e", deps, root, ROOT)
    assert row["plan"]["blocked"] and "plan" in row["plan"]["reason"]


def test_concurrent_workers_can_ask_for_the_same_checkout_and_a_broken_one_is_rebuilt(tmp_path):
    from evaluation.suite import taskpack
    sha = eval_corpus.PIN
    results, errors = [], []

    def go():
        try:
            results.append(taskpack.prepare_checkout(tmp_path, sha, ROOT))
        except Exception as error:  # noqa: BLE001
            errors.append(error)
    threads = [threading.Thread(target=go) for _ in range(4)]
    [t.start() for t in threads]
    [t.join() for t in threads]
    assert not errors and len(set(results)) == 1 and (results[0] / "HEAD").read_text().strip() == sha
    (results[0] / "HEAD").unlink()  # a clone killed half-way
    assert (taskpack.prepare_checkout(tmp_path, sha, ROOT) / "HEAD").read_text().strip() == sha


def test_context_arms_change_what_gate3_shows_and_default_restores_it():
    from evaluation.suite import ablation
    from gates import implement
    sub, content = {"file": "a.js", "title": "t", "verify": "v"}, "x\ny\nz"
    try:
        ablation.apply("fullfile")
        text, lessons, ctx = implement.gate3_context(sub, {}, content, ["b.js"], ["x"])
        assert "L3| z" in text and lessons == [] and ctx is None
        ablation.apply("nosiblings")
        assert implement._siblings(".", "HEAD", "a.js") == []
    finally:
        ablation.apply("default")
    assert implement.gate3_context.__name__ == "gate3_context" and implement._siblings.__name__ == "_siblings"


def test_ref_errors_counts_references_to_files_missing_at_base_and_not_planned(tmp_path):
    import subprocess
    from evaluation.suite import trial
    repo = tmp_path / "r"
    subprocess.run(["git", "init", "-q", str(repo)], check=True)
    for cmd in (["config", "user.email", "t@t"], ["config", "user.name", "t"]):
        subprocess.run(["git", "-C", str(repo), *cmd], check=True)
    (repo / "public").mkdir()
    (repo / "public/real.html").write_text("x\n")
    subprocess.run(["git", "-C", str(repo), "add", "."], check=True)
    subprocess.run(["git", "-C", str(repo), "commit", "-qm", "i"], check=True)
    sha = subprocess.run(["git", "-C", str(repo), "rev-parse", "HEAD"], capture_output=True, text=True, check=True).stdout.strip()
    diff = '+++ b/public/index.html\n+<a href="real.html">a</a>\n+<a href="ghost.html">b</a>\n+<a href="new.html">c</a>\n'
    plan = {"subtasks": [{"file": "public/new.html"}]}
    assert trial.ref_errors(diff, repo / ".git", sha, plan) == 1


def test_quote_diag_reports_how_much_of_a_failed_grounding_quote_is_in_the_file(tmp_path):
    import json
    import subprocess
    from evaluation.suite import trial
    repo = tmp_path / "r"
    subprocess.run(["git", "init", "-q", str(repo)], check=True)
    for cmd in (["config", "user.email", "t@t"], ["config", "user.name", "t"]):
        subprocess.run(["git", "-C", str(repo), *cmd], check=True)
    (repo / "a.html").write_text("alpha beta gamma delta\nsecond real line here\n")
    subprocess.run(["git", "-C", str(repo), "add", "."], check=True)
    subprocess.run(["git", "-C", str(repo), "commit", "-qm", "i"], check=True)
    sha = subprocess.run(["git", "-C", str(repo), "rev-parse", "HEAD"], capture_output=True, text=True, check=True).stdout.strip()
    quote = "L1| alpha beta gamma delta\nL2| invented line that is absent ..."
    diag = trial._quote_diag(json.dumps({"grounding": [{"file": "a.html", "quote": quote}]}), repo / ".git", sha)
    assert diag[0]["lines_found"] == "1/2" and diag[0]["whole_in_file"] is False and diag[0]["has_ellipsis"] is True


def test_gate25_quote_fix_accepts_single_quoted_copy_only_when_enabled(monkeypatch):
    from gates import plan_validate as pv
    files = {"a.html": '<a class="back" href="/i.html">Home</a>\n'}
    plan = {"subtasks": [{"file": "a.html"}]}

    def run(quote):
        ev = {"target": "a.html", "file": "a.html", "quote": quote, "before": "b", "after": "a", "verify": "v"}
        return pv.checked_grounding({"grounded": True, "grounding": [ev]}, plan, "sha", files)

    monkeypatch.delenv("AI_BOARD_GATE25_FIXES", raising=False)
    import pytest
    with pytest.raises(ValueError, match="trích dẫn"):
        run("<a class='back' href='/i.html'>Home</a>")
    monkeypatch.setenv("AI_BOARD_GATE25_FIXES", "quotes")
    assert run("<a class='back' href='/i.html'>Home</a>")["sha"] == "sha"
    with pytest.raises(ValueError, match="trích dẫn"):
        run("<a class='front' href='/i.html'>Home</a>")


def test_blind_grading_hides_arms_and_scores_per_run_with_oracle_agreement(tmp_path):
    import json
    from evaluation.suite import grading
    pack = [{"id": "t1", "title": "T", "detail": "D", "files": ["a.html"], "base_sha": "abc", "subtasks": [{"verify": "V"}]},
            {"id": "t2", "title": "T2", "detail": "D2", "files": ["b.html"], "base_sha": "abc", "subtasks": [{"verify": "V2"}]}]
    for run, rows in (("runA", [{"id": "t1", "mode": "gold", "resolved": True, "diff": "x"}, {"id": "t2", "mode": "gold", "resolved": False, "diff": "y"}]),
                      ("runB", [{"id": "t1", "mode": "gold", "resolved": False, "diff": "x2"}, {"id": "t2", "mode": "gold", "resolved": False, "diff": None}])):
        (tmp_path / run).mkdir()
        (tmp_path / run / "results.jsonl").write_text("\n".join(json.dumps(r) for r in rows), encoding="utf-8")
    out = tmp_path / "out"
    assert grading.collect([tmp_path / "runA", tmp_path / "runB"], pack, out)["items"] == 4
    batch = json.loads((out / "batch.json").read_text(encoding="utf-8"))
    assert "runA" not in json.dumps(batch) and "runB" not in json.dumps(batch)
    blind_map = json.loads((out / "blindmap.json").read_text(encoding="utf-8"))
    verdict = {("runA", "t1"): "correct", ("runA", "t2"): "wrong", ("runB", "t1"): "partial", ("runB", "t2"): "no_candidate"}
    grades = [{"blind_id": b, "verdict": verdict[(m["run"], m["id"])], "reason": ""} for b, m in blind_map.items()]
    report = grading.score(grades, blind_map)
    assert report["runs"]["runA"]["oracle_agreement"] == "2/2" and report["runs"]["runB"]["correct_or_partial"] == 1
    assert grading.paired(grades, blind_map, "runA", "runB") == {"tasks": 2, "gained_usable": 0, "lost_usable": 0, "net": 0}
