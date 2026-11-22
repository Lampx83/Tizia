"""Single-driver lock file + parent-death watchdog for the eval driver."""
from __future__ import annotations

import contextlib
import json
import os
import signal
import sys
import threading
import time
from pathlib import Path


class DriverBusy(RuntimeError):
    pass


def pid_alive(pid: int) -> bool:
    if pid <= 0:
        return False
    if sys.platform == "win32":
        import ctypes
        from ctypes import wintypes
        k32 = ctypes.WinDLL("kernel32", use_last_error=True)
        k32.OpenProcess.restype = wintypes.HANDLE
        handle = k32.OpenProcess(0x1000, False, pid)  # PROCESS_QUERY_LIMITED_INFORMATION
        if not handle:
            return False
        try:
            code = wintypes.DWORD()
            return bool(k32.GetExitCodeProcess(handle, ctypes.byref(code))) and code.value == 259  # STILL_ACTIVE
        finally:
            k32.CloseHandle(handle)
    try:
        os.kill(pid, 0)
    except ProcessLookupError:
        return False
    except PermissionError:
        return True
    return True


def kill_pid(pid: int) -> None:
    os.kill(pid, signal.SIGTERM)  # Windows: TerminateProcess


def _holder(path: Path) -> int | None:
    try:
        return int(json.loads(path.read_text(encoding="utf-8"))["pid"])
    except (OSError, ValueError, KeyError, TypeError):
        return None


def acquire(path: Path, cmd: str, pid: int | None = None, alive=pid_alive) -> None:
    pid = pid or os.getpid()
    body = json.dumps({"pid": pid, "cmd": cmd, "started": time.time()})
    for _ in range(2):
        try:
            fd = os.open(path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
        except FileExistsError:
            holder = _holder(path)
            if holder is not None and holder != pid and alive(holder):
                raise DriverBusy(f"another driver (pid {holder}) holds {path}; run `driver stop` first")
            path.unlink(missing_ok=True)  # stale or unreadable lock
            continue
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            f.write(body)
        return
    raise DriverBusy(f"cannot take {path}")


def release(path: Path, pid: int | None = None) -> None:
    if _holder(path) == (pid or os.getpid()):
        path.unlink(missing_ok=True)


def stop(path: Path, alive=pid_alive, kill=kill_pid) -> int | None:
    """Terminate live lock holder, drop the lock. Return its pid, None if no live driver."""
    holder = _holder(path)
    path.unlink(missing_ok=True)
    if holder is None or not alive(holder):
        return None
    kill(holder)
    return holder


def watch_parent(ppid: int, on_gone, alive=pid_alive, interval: float = 2.0, sleep=time.sleep) -> threading.Thread:
    def loop() -> None:
        while alive(ppid):
            sleep(interval)
        on_gone()

    thread = threading.Thread(target=loop, daemon=True, name="driver-parent-watch")
    thread.start()
    return thread


@contextlib.contextmanager
def guard(path: Path, cmd: str, ppid: int | None = None):
    acquire(path, cmd)

    def gone() -> None:
        print("[driver] parent process gone, exiting", flush=True)
        release(path)
        os._exit(4)

    # ppid captured at start: Windows getppid keeps the dead parent's pid, POSIX reparents to 1.
    ppid = os.getppid() if ppid is None else ppid
    if ppid > 1:
        watch_parent(ppid, gone)
    try:
        yield
    finally:
        release(path)
