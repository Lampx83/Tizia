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


def test_guest_flags_red_when_worker_drops_flag(monkeypatch):
    monkeypatch.setattr(driver, "WORKER_PAIRS", [("w1", "c1")])
    monkeypatch.setattr(driver, "arm_env", lambda arm: {"AI_BOARD_CRITICAL_ONLY_CHECKS": "1", "AI_BOARD_QUOTED_CHECKS": "0"})
    monkeypatch.setattr(driver, "_docker", lambda cmd, timeout=120: _done('["critical_only_checks"]'))
    assert driver.check_guest_flags("X")["ok"]
    monkeypatch.setattr(driver, "_docker", lambda cmd, timeout=120: _done("[]"))
    out = driver.check_guest_flags("X")
    assert not out["ok"] and "critical_only_checks" in out["detail"]


def _guest_docker(guest_hash):
    pin = "sha256:" + "a" * 64

    def fake(cmd, timeout=120):
        if "cat" in cmd[-1]:
            return _done(f"guest_image: image-registry:5000/gate5@{pin}\n")
        return _done((guest_hash if cmd[1] == "run" else "h1") + "  -\n")
    return fake


def test_guest_harness_hash_match_and_mismatch(monkeypatch):
    monkeypatch.setattr(driver, "WORKER_PAIRS", [("w1", "c1")])
    monkeypatch.setattr(driver, "_docker", _guest_docker("h1"))
    assert driver.check_guest_harness()["ok"]
    monkeypatch.setattr(driver, "_docker", _guest_docker("h2"))
    assert not driver.check_guest_harness()["ok"]
