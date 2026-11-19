from datetime import datetime, timedelta, timezone

from evaluation.pipeline import precheck as pc

NOW = datetime(2026, 11, 5, 12, 0, tzinfo=timezone.utc)
OLD = NOW - timedelta(hours=2)
IDLE = '{"status": "idle"}'


def test_healthy():
    assert pc.evaluate("running", OLD, NOW, "log\n" + IDLE, pc.last_status_json("log\n" + IDLE)) == []


def test_fresh_restart_fails():
    assert any("up 30s" in p for p in pc.evaluate("running", NOW - timedelta(seconds=30), NOW, IDLE, {"status": "idle"}))


def test_traceback_fails():
    log = "Traceback (most recent call last):\n" + IDLE
    assert any("Traceback" in p for p in pc.evaluate("running", OLD, NOW, log, {"status": "idle"}))


def test_cooldown_and_vi_load_fail():
    log = "[worker] model x chưa load được, chờ GPU 60s\nendpoint cooldown\n" + IDLE
    probs = pc.evaluate("running", OLD, NOW, log, {"status": "idle"})
    assert any("chưa load được" in p for p in probs) and any("cooldown" in p for p in probs)


def test_waiting_gpu_fails():
    log = '{"status": "waiting_gpu", "retry_in_s": 60}'
    probs = pc.evaluate("running", OLD, NOW, log, pc.last_status_json(log))
    assert any("waiting_gpu" in p for p in probs)


def test_restarting_and_no_status_fail():
    probs = pc.evaluate("restarting", OLD, NOW, "plain text only", None)
    assert any("restarting" in p for p in probs) and any("no status" in p for p in probs)
