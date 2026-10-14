"""Run one owned adapter tree; cleanup also applies after a normal adapter exit."""
from __future__ import annotations

import json
import os
import signal
import subprocess
import sys


def _windows_job(process):
    import ctypes
    from ctypes import wintypes

    class Basic(ctypes.Structure):
        _fields_ = [('process_time', ctypes.c_int64), ('job_time', ctypes.c_int64),
                    ('flags', wintypes.DWORD), ('minimum', ctypes.c_size_t),
                    ('maximum', ctypes.c_size_t), ('active', wintypes.DWORD),
                    ('affinity', ctypes.c_size_t), ('priority', wintypes.DWORD),
                    ('scheduling', wintypes.DWORD)]

    class IO(ctypes.Structure):
        _fields_ = [(name, ctypes.c_uint64) for name in
                    ('read_ops', 'write_ops', 'other_ops', 'read_bytes', 'write_bytes', 'other_bytes')]

    class Extended(ctypes.Structure):
        _fields_ = [('basic', Basic), ('io', IO), ('process_memory', ctypes.c_size_t),
                    ('job_memory', ctypes.c_size_t), ('peak_process', ctypes.c_size_t),
                    ('peak_job', ctypes.c_size_t)]

    kernel = ctypes.WinDLL('kernel32', use_last_error=True)
    kernel.CreateJobObjectW.argtypes = [ctypes.c_void_p, wintypes.LPCWSTR]
    kernel.CreateJobObjectW.restype = wintypes.HANDLE
    kernel.SetInformationJobObject.argtypes = [wintypes.HANDLE, ctypes.c_int,
                                               ctypes.c_void_p, wintypes.DWORD]
    kernel.AssignProcessToJobObject.argtypes = [wintypes.HANDLE, wintypes.HANDLE]
    kernel.CloseHandle.argtypes = [wintypes.HANDLE]
    job = kernel.CreateJobObjectW(None, None)
    if not job:
        raise ctypes.WinError(ctypes.get_last_error())
    try:
        limits = Extended()
        limits.basic.flags = 0x2000  # KILL_ON_JOB_CLOSE; no breakaway permission.
        if not kernel.SetInformationJobObject(job, 9, ctypes.byref(limits), ctypes.sizeof(limits)):
            raise ctypes.WinError(ctypes.get_last_error())
        if not kernel.AssignProcessToJobObject(job, wintypes.HANDLE(int(process._handle))):
            raise ctypes.WinError(ctypes.get_last_error())
    except BaseException:
        kernel.CloseHandle(job)
        raise
    return lambda: kernel.CloseHandle(job)


def run_owned(command: list[str], *, input: str, timeout: float) -> subprocess.CompletedProcess:
    """Contain before sending stdin; never silently fall back to direct-child kill.

    shortcut: POSIX adapters must not daemonize into another session; use cgroups
    before accepting an untrusted adapter that can deliberately escape its group.
    """
    windows = os.name == 'nt'
    launch = command
    payload = input
    if windows:
        # The launcher blocks on stdin until its Job Object has been assigned.
        launch = [sys.executable, '-c',
                  'import json,subprocess,sys; r=json.load(sys.stdin); '
                  'p=subprocess.run(r["command"],input=r["input"],text=True); '
                  'sys.exit(p.returncode)']
        payload = json.dumps({'command': command, 'input': input})
    process = subprocess.Popen(launch, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE, text=True, start_new_session=not windows)
    close_job = None
    try:
        if windows:
            close_job = _windows_job(process)
        stdout, stderr = process.communicate(payload, timeout=timeout)
        return subprocess.CompletedProcess(command, process.returncode, stdout, stderr)
    finally:
        if close_job:
            close_job()
        elif windows:
            process.kill()  # Assignment failed before the adapter was launched.
        else:
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
        process.wait()
        for pipe in (process.stdin, process.stdout, process.stderr):
            if pipe:
                pipe.close()
