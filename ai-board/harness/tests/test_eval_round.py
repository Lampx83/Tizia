import json
from types import SimpleNamespace

from evaluation.pipeline import eval_round as R


def test_round_gate_reads_model_seeds_from_the_trials_dir(tmp_path, monkeypatch):
    trials = tmp_path / "trials"
    trials.mkdir()
    (tmp_path / "rounds").mkdir()
    (tmp_path / "cases-dev.json").write_text(json.dumps([{"id": "c1"}]), encoding="utf-8")
    rows = []
    for rep in (1, 2):
        (trials / f"B0-r{rep}-c1.json").write_text(json.dumps({"case": "c1", "arm": "B0", "repeat": rep, "model_seed": 5}),
                                                   encoding="utf-8")
        rows.append({"trial": f"B0-r{rep}-c1", "case": "c1", "arm": "B0", "repeat": rep, "criterion": "x", "match": True})
    (tmp_path / "rounds" / "grades.jsonl").write_text("\n".join(map(json.dumps, rows)), encoding="utf-8")
    fake = SimpleNamespace(owner_password=lambda: None, load_cases=lambda: [{"id": "c1"}],
                           resolve_cases=lambda spec: [{"id": "c1"}],
                           trial_path=lambda arm, cid, rep: trials / f"{arm}-r{rep}-{cid}.json")
    calls = []
    monkeypatch.setattr(R, "_driver", lambda: fake)
    monkeypatch.setattr(R, "DATA", tmp_path)
    monkeypatch.setattr(R, "run", lambda args, log, check=True: calls.append(args) or 0)
    R.main(["--repeat", "2", "--prev", "1", "--suites", "cases-dev", "--skip-arm"])
    gate = [c for c in calls if "evaluation.pipeline.eval_gate" in c]
    assert len(gate) == 2 and all(c[c.index("--trials") + 1] == str(trials) for c in gate)
