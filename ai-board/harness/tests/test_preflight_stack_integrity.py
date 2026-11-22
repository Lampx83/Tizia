import subprocess

from evaluation.pipeline import driver


def _done(out: str, code: int = 0):
    return subprocess.CompletedProcess([], code, out.encode(), b"")


def _code(tmp_path, pin):
    f = tmp_path / "ai-board" / "sandbox-runner" / "sandbox-policy.dev.yaml"
    f.parent.mkdir(parents=True)
    f.write_text(f"vm: x\nguest_image: reg/gate5@sha256:{pin}\n", encoding="utf-8")
    return tmp_path


def test_runner_pin_matches_code(monkeypatch, tmp_path):
    monkeypatch.setattr(driver, "CODE", _code(tmp_path, "aa11"))
    monkeypatch.setattr(driver, "_docker", lambda cmd, timeout=120: _done("guest_image: reg/gate5@sha256:aa11\n"))
    assert driver.check_runner_guest_pin()["ok"]


def test_runner_on_other_pin_is_red(monkeypatch, tmp_path):
    monkeypatch.setattr(driver, "CODE", _code(tmp_path, "aa11"))
    monkeypatch.setattr(driver, "_docker", lambda cmd, timeout=120: _done("guest_image: reg/gate5@sha256:bb22\n"))
    out = driver.check_runner_guest_pin()
    assert not out["ok"] and "bb22" in out["detail"]


def test_workers_on_different_bases_are_red(monkeypatch):
    monkeypatch.setattr(driver, "WORKER_PAIRS", [("w1", "c1"), ("w2", "c2")])
    heads = {"c1": "e813c7f1", "c2": "6fc31f3a"}
    monkeypatch.setattr(driver, "_docker", lambda cmd, timeout=120: _done(heads[cmd[2]] + "\n"))
    assert not driver.check_worker_base()["ok"]
    heads["c2"] = "e813c7f1"
    assert driver.check_worker_base()["ok"]
