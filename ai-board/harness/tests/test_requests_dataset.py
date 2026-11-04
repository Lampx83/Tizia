import hashlib
import subprocess
from pathlib import Path

import pytest

from evaluation import requests_dataset as ds

FIELDS, ROWS = ds.read(ds.FIXTURE)
DATASETS = ds.FIXTURE.parents[1]  # evaluation/datasets


@pytest.fixture(autouse=True)
def _no_real_dataset(monkeypatch):
    """Default every test to the fixture, whatever the developer shell exports."""
    monkeypatch.delenv(ds.ENV, raising=False)


def test_columns_match_contract():
    assert tuple(FIELDS) == ds.COLUMNS


def test_dataset_satisfies_validator():
    assert ds.validate(FIELDS, ROWS) == []


def test_ids_unique():
    ids = [row["id"] for row in ROWS]
    assert len(ids) == len(set(ids))


def test_split_is_about_70_30():
    stats = ds.stats(ROWS)["split"]
    assert stats["dev"] + stats["gold"] == len(ROWS)
    assert stats["dev"] / len(ROWS) == pytest.approx(0.70, abs=0.05)
    assert stats["gold"] / len(ROWS) == pytest.approx(0.30, abs=0.05)
    assert set(stats) == set(ds.SPLITS)


def test_every_difficulty_has_cases():
    counts = ds.stats(ROWS)["difficulty"]
    assert set(counts) == {1, 2, 3, 4, 5}
    assert all(counts.values())


def test_request_text_has_no_repo_paths():
    leaks = {
        row["id"]: ds.repo_paths(row["request_title"] + " " + row["request_detail_vi"])
        for row in ROWS
    }
    assert {k: v for k, v in leaks.items() if v} == {}


def test_detail_stays_request_level():
    for row in ROWS:
        assert len(row["request_detail_vi"].split()) <= ds.MAX_DETAIL_WORDS, row["id"]


def test_expected_blocks_need_no_plan():
    for row in ROWS:
        no_plan = row["expected_outcome"] in ds.NO_PLAN
        assert (int(row["expected_steps"]) == 0) == no_plan, row["id"]


def test_unset_env_reads_the_in_repo_fixture():
    assert ds.data_path() == ds.FIXTURE
    loaded = ds.load()
    assert (loaded.path, loaded.fieldnames, loaded.rows) == (ds.FIXTURE, FIELDS, ROWS)
    assert loaded.sha256 == ds.dataset_hash()


def test_env_directory_and_direct_path_are_both_accepted(tmp_path, monkeypatch):
    copy = tmp_path / ds.DATASET_NAME
    copy.write_bytes(ds.FIXTURE.read_bytes())
    monkeypatch.setenv(ds.ENV, str(tmp_path))
    assert ds.data_path() == copy
    assert ds.load().rows == ROWS
    monkeypatch.setenv(ds.ENV, str(copy))
    assert ds.data_path() == copy
    assert ds.load().rows == ROWS


def test_missing_env_path_fails_instead_of_falling_back(tmp_path, monkeypatch):
    monkeypatch.setenv(ds.ENV, str(tmp_path / "gone"))
    with pytest.raises(FileNotFoundError, match="requests dataset not found"):
        ds.data_path()
    with pytest.raises(FileNotFoundError):
        ds.load()
    monkeypatch.setenv(ds.ENV, str(tmp_path))
    with pytest.raises(FileNotFoundError, match=ds.DATASET_NAME):
        ds.load()


def test_hash_is_the_file_bytes(tmp_path):
    path = tmp_path / "d.csv"
    path.write_bytes(ds.FIXTURE.read_bytes())
    assert ds.dataset_hash(path) == hashlib.sha256(ds.FIXTURE.read_bytes()).hexdigest()
    assert ds.dataset_hash(path) == ds.dataset_hash(tmp_path / "d.csv")


def test_same_bytes_same_hash_changed_bytes_changed_hash(tmp_path):
    first = tmp_path / "first" / ds.DATASET_NAME
    second = tmp_path / "second" / ds.DATASET_NAME
    for path in (first, second):
        path.parent.mkdir()
        path.write_bytes(ds.FIXTURE.read_bytes())
    assert ds.dataset_hash(first) == ds.dataset_hash(second) == ds.load(first).sha256
    second.write_bytes(first.read_bytes().replace(b"req-sam-01", b"req-sam-99"))
    assert ds.dataset_hash(second) != ds.dataset_hash(first)
    assert ds.load(second).sha256 != ds.load(first).sha256


def test_real_csv_is_not_in_the_repo():
    assert sorted(p.name for p in DATASETS.iterdir()) == ["README.md", "fixtures"]
    assert not any(DATASETS.rglob(ds.DATASET_NAME))
    try:
        tracked = subprocess.run(["git", "ls-files", "."], capture_output=True, text=True,
                                 cwd=DATASETS, timeout=30)
    except (OSError, subprocess.SubprocessError):
        pytest.skip("git not available")
    if tracked.returncode != 0:
        pytest.skip("not inside a git checkout")
    assert ds.DATASET_NAME not in tracked.stdout


def test_external_dataset_is_valid_when_present(monkeypatch):
    """The real file lives outside the repo; validate it only when the host has it."""
    external = Path(r"H:\01_Main_coding_projects\Tizia-eval\datasets") / ds.DATASET_NAME
    if not external.is_file():
        pytest.skip("external request dataset not present on this host")
    monkeypatch.setenv(ds.ENV, str(external.parent))
    loaded = ds.load()
    assert loaded.problems() == []
    assert loaded.stats()["total"] >= 37
    assert loaded.sha256 == ds.dataset_hash(external)


def test_suite_pins_the_dataset_hash(tmp_path, monkeypatch):
    from evaluation.suite import runner

    monkeypatch.delenv(ds.ENV, raising=False)
    assert runner.requests_dataset_pin() == {}
    assert "requests_dataset_sha256" in runner.FIXED
    assert "requests_dataset_sha256" in runner.OPTIONAL_PINS

    path = tmp_path / ds.DATASET_NAME
    path.write_bytes(ds.FIXTURE.read_bytes())
    pin = runner.requests_dataset_pin(str(path))
    assert pin == {"requests_dataset_sha256": ds.dataset_hash(path), "requests_dataset_path": str(path),
                   "requests_dataset_rows": len(ROWS)}
    monkeypatch.setenv(ds.ENV, str(tmp_path))
    assert runner.requests_dataset_pin() == {**pin, "requests_dataset_path": str(path)}
    assert runner._live_dataset_pin(pin) == {"requests_dataset_sha256": pin["requests_dataset_sha256"]}
    path.unlink()
    assert runner._live_dataset_pin(pin) == {"requests_dataset_sha256": None}
    with pytest.raises(FileNotFoundError):
        runner.requests_dataset_pin(str(path))
