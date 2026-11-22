import json
import os
import subprocess
import sys

import pytest

from evaluation.pipeline import driver_lock as dl


def test_second_driver_refused_while_holder_alive(tmp_path):
    lock = tmp_path / "driver.lock"
    dl.acquire(lock, "trial", pid=111, alive=lambda p: True)
    with pytest.raises(dl.DriverBusy):
        dl.acquire(lock, "run", pid=222, alive=lambda p: True)
    assert json.loads(lock.read_text())["pid"] == 111


def test_stale_lock_taken_over(tmp_path):
    lock = tmp_path / "driver.lock"
    dl.acquire(lock, "trial", pid=111, alive=lambda p: True)
    dl.acquire(lock, "run", pid=222, alive=lambda p: False)
    assert json.loads(lock.read_text())["pid"] == 222


def test_release_only_own_lock(tmp_path):
    lock = tmp_path / "driver.lock"
    dl.acquire(lock, "trial", pid=111)
    dl.release(lock, pid=999)
    assert lock.exists()
    dl.release(lock, pid=111)
    assert not lock.exists()


def test_stop_kills_live_holder_and_clears_lock(tmp_path):
    lock = tmp_path / "driver.lock"
    dl.acquire(lock, "trial", pid=111)
    killed = []
    assert dl.stop(lock, alive=lambda p: True, kill=killed.append) == 111
    assert killed == [111] and not lock.exists()


def test_stop_without_live_driver(tmp_path):
    lock = tmp_path / "driver.lock"
    assert dl.stop(lock, kill=lambda p: pytest.fail("no kill")) is None
    dl.acquire(lock, "trial", pid=111)
    assert dl.stop(lock, alive=lambda p: False, kill=lambda p: pytest.fail("no kill")) is None
    assert not lock.exists()


def test_watch_parent_fires_when_parent_dies():
    states = iter([True, True, False])
    fired = []
    dl.watch_parent(7, lambda: fired.append(1), alive=lambda p: next(states), sleep=lambda s: None).join(2)
    assert fired == [1]


def test_pid_alive_real_processes():
    assert dl.pid_alive(os.getpid())
    proc = subprocess.Popen([sys.executable, "-c", "pass"])
    proc.wait()
    assert not dl.pid_alive(proc.pid)
    assert not dl.pid_alive(0)
