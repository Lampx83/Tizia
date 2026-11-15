"""Prompt labels: admin set/rollback writes receipts; runtime blocks label != disk lock; worker label drift fails closed."""
import json

import pytest

from runtime import prompt_labels as pl

OLD, NEW = "a" * 64, "b" * 64


@pytest.fixture
def files(tmp_path):
    return tmp_path / "labels.json", tmp_path / "receipts.jsonl"


def _lock(sha):
    return {"implement.md": sha}


def test_set_label_writes_label_and_receipt(files):
    labels_path, receipts_path = files
    receipt = pl.set_label("implement.md", "production", OLD, "admin", lock=_lock(OLD),
                           labels_path=labels_path, receipts_path=receipts_path, reason="first")
    assert receipt["kind"] == "set" and receipt["from"] is None and receipt["to"] == OLD
    assert pl.load(labels_path) == {"implement.md": {"production": OLD}}
    (line,) = receipts_path.read_text(encoding="utf-8").splitlines()
    assert json.loads(line)["actor"] == "admin"


def test_set_label_refuses_unknown_version_and_bad_label(files):
    labels_path, receipts_path = files
    with pytest.raises(pl.LabelError):
        pl.set_label("implement.md", "production", NEW, "admin", lock=_lock(OLD), labels_path=labels_path, receipts_path=receipts_path)
    with pytest.raises(pl.LabelError):
        pl.set_label("implement.md", "beta", OLD, "admin", lock=_lock(OLD), labels_path=labels_path, receipts_path=receipts_path)


def test_check_without_label_uses_lock_and_mismatch_blocks(files):
    labels_path, _ = files
    assert pl.check("implement.md", lock=_lock(OLD), labels={}) == OLD
    labels = {"implement.md": {"production": NEW}}
    with pytest.raises(pl.LabelMismatch):
        pl.check("implement.md", lock=_lock(OLD), labels=labels)
    assert pl.check("implement.md", lock=_lock(NEW), labels=labels) == NEW


def test_rollback_restores_previous_label_and_is_receipted(files):
    labels_path, receipts_path = files
    kw = dict(lock=_lock(OLD), labels_path=labels_path, receipts_path=receipts_path)
    pl.set_label("implement.md", "production", OLD, "admin", **kw)
    pl.set_label("implement.md", "production", NEW, "admin", **{**kw, "lock": _lock(NEW)})
    receipt = pl.rollback("implement.md", "production", "admin", lock=_lock(NEW), labels_path=labels_path, receipts_path=receipts_path)
    assert receipt["kind"] == "rollback" and receipt["to"] == OLD
    assert pl.load(labels_path)["implement.md"]["production"] == OLD
    assert len(receipts_path.read_text(encoding="utf-8").splitlines()) == 3
    with pytest.raises(pl.LabelMismatch):
        pl.check("implement.md", lock=_lock(NEW), labels=pl.load(labels_path))


def test_rollback_without_history_refused(files):
    labels_path, receipts_path = files
    pl.set_label("implement.md", "production", OLD, "admin", lock=_lock(OLD), labels_path=labels_path, receipts_path=receipts_path)
    with pytest.raises(pl.LabelError):
        pl.rollback("implement.md", "production", "admin", lock=_lock(OLD), labels_path=labels_path, receipts_path=receipts_path)


def test_check_all_lists_every_drifted_label():
    labels = {"implement.md": {"production": NEW, "staging": OLD}, "judge.md": {"production": OLD}}
    drift = pl.check_all(lock={"implement.md": OLD, "judge.md": OLD}, labels=labels)
    assert [(d["name"], d["label"]) for d in drift] == [("implement.md", "production")]


def test_worker_label_drift_fails_closed():
    fp_old = pl.fingerprint({"implement.md": {"production": OLD}})
    fp_new = pl.fingerprint({"implement.md": {"production": NEW}})
    assert pl.label_mismatch(None, fp_new) == ["missing"]
    assert pl.label_mismatch(fp_old, fp_new) == ["labels"]
    assert pl.label_mismatch(fp_new, fp_new) == []
