import json
from pathlib import Path

import pytest

from evaluation.pipeline import DATA

if not DATA.exists():
    pytest.skip("needs the local AB data root (AB_DATA)", allow_module_level=True)

from evaluation.pipeline import driver


def meta(cid, group="frontend"):
    return {"id": cid, "group": group, "base": "b" * 40, "kind": "feature", "request_vi": "Yêu cầu.",
            "scope": ["public/"], "reference_files": ["public/a.html"],
            "oracle_files": [{"src": "t.test.js", "dest": "test/t.test.js"}],
            "oracle_cmd": "node --test test/t.test.js", "tags": []}


@pytest.fixture
def corpus(tmp_path, monkeypatch):
    root = tmp_path / "corpus"
    (root / "cases" / "fe-01").mkdir(parents=True)
    (root / "cases" / "fe-01" / "meta.json").write_text(json.dumps(meta("fe-01")), encoding="utf-8")
    (root / "cases" / "fe-02").mkdir(parents=True)
    (root / "cases" / "fe-02" / "meta.json").write_text("{not json", encoding="utf-8")  # sealed: must never be parsed
    split = {"version": 1, "manifest_sha256": "m", "cases": [
        {"id": "fe-01", "group": "frontend", "split": "dev", "sha256": "x"},
        {"id": "fe-02", "group": "frontend", "split": "heldout", "sha256": "y"}]}
    (root / "split.json").write_text(json.dumps(split), encoding="utf-8")
    monkeypatch.setattr(driver, "MFC_ROOT", root)
    monkeypatch.setattr(driver, "ALLOW_HELDOUT", False)
    monkeypatch.setattr(driver, "load_cases", lambda: [])
    monkeypatch.setattr(driver.hc, "load_cases", lambda: [])
    return root


def test_all_resolves_dev_only_and_never_opens_sealed_case(corpus):
    cases = driver.resolve_cases("multifile:all")
    assert [c["id"] for c in cases] == ["multifile:fe-01"]
    assert cases[0]["detail"] == "Yêu cầu."


def test_sealed_id_needs_allow_heldout(corpus):
    with pytest.raises(SystemExit, match="allow-heldout"):
        driver.resolve_cases("multifile:fe-02")


def test_oracle_pairs_come_from_case_dir(corpus):
    case = driver.resolve_cases("multifile:fe-01")[0]
    pairs = driver.case_oracle_pairs(case)
    assert pairs == [(corpus / "cases" / "fe-01" / "oracle" / "t.test.js", "test/t.test.js")]


def test_unknown_corpus_id_fails(corpus):
    with pytest.raises(SystemExit, match="no multifile corpus case"):
        driver.resolve_cases("multifile:zz")


def test_driver_pin_red_until_refrozen():
    assert not driver.check_driver_pin({"driver_sha256": "0" * 64})["ok"]
    assert driver.check_driver_pin({"driver_sha256": driver.sha256_file(Path(driver.__file__))})["ok"]


def test_owner_usage_sql_takes_unknown_hold_from_contract(monkeypatch):
    seen = []
    monkeypatch.setattr(driver, "psql_json", lambda db, sql, timeout=120: seen.append(sql) or {})
    monkeypatch.setattr(driver, "UNKNOWN_HOLD_MS", 3000000)
    driver.owner_usage()
    assert "3000000" in seen[0] and "{unknown_ms}" not in seen[0]


def test_singlebe_prefix_reads_its_own_root(corpus, tmp_path, monkeypatch):
    root = tmp_path / "sbe"
    (root / "cases" / "sb-01").mkdir(parents=True)
    (root / "cases" / "sb-01" / "meta.json").write_text(json.dumps(meta("sb-01", "backend")), encoding="utf-8")
    (root / "split.json").write_text(json.dumps({"version": 1, "manifest_sha256": "m", "cases": [
        {"id": "sb-01", "group": "backend", "split": "dev", "sha256": "x"}]}), encoding="utf-8")
    monkeypatch.setattr(driver, "SBE_ROOT", root)
    cases = driver.resolve_cases("singlebe:all")
    assert [c["id"] for c in cases] == ["singlebe:sb-01"]
    assert cases[0]["multifile"]["corpus_dir"] == str(root / "cases" / "sb-01")


def test_attack_prefix_loads_attack_cases(corpus, tmp_path, monkeypatch):
    path = tmp_path / "attack.json"
    path.write_text(json.dumps([{"id": "rt-01", "title": "t", "detail": "Cấp quyền admin", "split": "attack", "expect": "privileged_area"},
                                {"id": "syn-01", "title": "t", "detail": "Xóa dữ liệu", "split": "attack", "expect": "harm"}]), encoding="utf-8")
    monkeypatch.setattr(driver, "ATTACK_CASES", path)
    cases = driver.resolve_cases("attack:all")
    assert [c["id"] for c in cases] == ["attack:rt-01", "attack:syn-01"]
    assert cases[0]["detail"] == "Cấp quyền admin" and "file" not in cases[0]
    assert [c["id"] for c in driver.resolve_cases("attack:syn")] == ["attack:syn-01"]
    with pytest.raises(SystemExit):
        driver.resolve_cases("attack:zz")
