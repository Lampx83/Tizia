import json
from pathlib import Path

import pytest

from evaluation.suite import case_select
from test_eval_suite import SEED, deps_for, world  # noqa: F401  (fixture)
from evaluation.suite import runner

pytestmark = [pytest.mark.usefixtures("pinned_head"), pytest.mark.slow]


def write(tmp_path, name, data):
    path = tmp_path / name
    path.write_text(json.dumps(data), encoding="utf-8")
    return path


TASKS = [{"id": "a-1", "split": "dev"}, {"id": "b-2", "split": "dev"}, {"id": "h-3", "split": "heldout"}]


def test_load_list_and_keyed_dict_and_hash(tmp_path):
    path = write(tmp_path, "l.json", ["b-2", "a-1"])
    ids, sha = case_select.load(path, None)
    assert ids == ["b-2", "a-1"] and len(sha) == 64
    ids, _ = case_select.load(write(tmp_path, "d.json", {"tune": ["a-1"], "confirm": ["b-2"]}), "confirm")
    assert ids == ["b-2"]


def test_dict_without_key_or_missing_key_is_refused(tmp_path):
    path = write(tmp_path, "d.json", {"tune": ["a-1"], "confirm": ["b-2"]})
    with pytest.raises(case_select.SelectionError, match="--case-key"):
        case_select.load(path, None)
    with pytest.raises(case_select.SelectionError, match="không có khóa"):
        case_select.load(path, "other")


def test_non_string_list_is_refused(tmp_path):
    with pytest.raises(case_select.SelectionError, match="mảng id"):
        case_select.load(write(tmp_path, "x.json", [1, 2]), None)


def test_permuted_list_selects_same_cases_in_sorted_order():
    assert [t["id"] for t in case_select.select(TASKS, ["b-2", "a-1"], "dev")] == ["a-1", "b-2"]
    assert [t["id"] for t in case_select.select(TASKS, ["a-1", "b-2"], "dev")] == ["a-1", "b-2"]


@pytest.mark.parametrize("ids, split, message", [
    (["zz-9"], "dev", "không tồn tại"),
    (["a-1", "a-1"], "dev", "trùng lặp"),
    (["a-1", "h-3"], "dev", "thuộc heldout"),
    (["a-1"], "heldout", "thuộc dev"),
    ([], "dev", "rỗng"),
])
def test_bad_ids_are_refused(ids, split, message):
    with pytest.raises(case_select.SelectionError, match=message):
        case_select.select(TASKS, ids, split)


def test_split_all_accepts_heldout_ids():
    assert [t["id"] for t in case_select.select(TASKS, ["h-3"], "all")] == ["h-3"]


def test_run_with_case_ids_runs_exact_set_records_hash_and_resumes(world, tmp_path, capsys):
    root, tasks = world
    dev = [t["id"] for t in tasks if t["split"] == "dev"]
    chosen = [dev[5], dev[1]]
    path = write(tmp_path, "ids.json", chosen)
    deps, models = deps_for(world)
    argv = ["run", "--seed", str(SEED), "--split", "dev", "--case-ids", str(path), "--repeats", "1", "--modes", "gold",
            "--root", str(root), "--allow-dirty"]
    assert runner.main(argv, deps) == 0
    run_dir = next(p for p in (root / "suite").iterdir() if "cases-" in p.name)
    meta = json.loads((run_dir / "run.json").read_text(encoding="utf-8"))
    rows = [json.loads(line) for line in (run_dir / "results.jsonl").read_text(encoding="utf-8").splitlines()]
    assert {r["id"] for r in rows} == set(chosen) and len(rows) == 2
    assert meta["case_ids"] == {"file": "ids.json", "key": None, "sha256": case_select.load(path, None)[1], "n": 2}
    calls = len(models.calls)
    assert runner.main(argv, deps) == 0 and len(models.calls) == calls


def test_case_ids_refuse_with_cases_or_kinds(world, tmp_path):
    root, _ = world
    path = write(tmp_path, "ids.json", ["x"])
    base = ["run", "--seed", str(SEED), "--split", "dev", "--case-ids", str(path), "--root", str(root), "--allow-dirty", "--modes", "gold"]
    assert runner.main([*base, "--cases", "2"], deps_for(world)[0]) == 2
    assert runner.main([*base, "--kinds", "insert_text"], deps_for(world)[0]) == 2
