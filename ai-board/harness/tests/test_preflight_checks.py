import subprocess

import pytest

from evaluation.pipeline import DATA

if not DATA.exists():
    pytest.skip("needs the local AB data root (AB_DATA)", allow_module_level=True)

from evaluation.pipeline import driver


def test_contract_red_when_server_and_worker_differ(monkeypatch):
    monkeypatch.setattr(driver, "_container_sha", lambda c, p: "aaaa" if c == "aiboard-server" else "bbbb")
    assert not driver.check_contract()["ok"]


def test_contract_green_when_all_pairs_match(monkeypatch):
    monkeypatch.setattr(driver, "_container_sha", lambda c, p: "same")
    assert driver.check_contract()["ok"]


def test_contract_red_when_file_missing(monkeypatch):
    monkeypatch.setattr(driver, "_container_sha", lambda c, p: "missing(no such file)")
    assert not driver.check_contract()["ok"]


def test_manifest_pending_is_red(monkeypatch):
    monkeypatch.setattr(driver, "uses_tool_loop", lambda arm: True)
    rows = [{"manifest_hash": "abcdef123456", "version": driver.WORKER_MANIFEST_VERSION, "status": "pending"}]
    monkeypatch.setattr(driver, "psql_json", lambda db, sql, timeout=120: rows)
    res = driver.check_manifest_approved("B1")
    assert not res["ok"] and "pending" in res["detail"]


def test_manifest_approved_is_green(monkeypatch):
    monkeypatch.setattr(driver, "uses_tool_loop", lambda arm: True)
    rows = [{"manifest_hash": "abcdef123456", "version": driver.WORKER_MANIFEST_VERSION, "status": "approved"}]
    monkeypatch.setattr(driver, "psql_json", lambda db, sql, timeout=120: rows)
    assert driver.check_manifest_approved("B1")["ok"]


def test_guest_probe_red_when_base_image_missing(monkeypatch):
    monkeypatch.setattr(driver, "_docker", lambda cmd, timeout=120: subprocess.CompletedProcess(cmd, 125, b"", b"no such image"))
    assert not driver.check_guest_probes()["ok"]


def test_guest_probe_green_when_every_acceptance_kind_runs(monkeypatch):
    monkeypatch.setattr(driver, "_docker", lambda cmd, timeout=120: subprocess.CompletedProcess(cmd, 0, b"", b""))
    assert driver.check_guest_probes()["ok"]
