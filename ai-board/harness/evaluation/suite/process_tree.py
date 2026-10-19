"""Run one owned adapter tree; cleanup also applies after a normal adapter exit."""
from __future__ import annotations

import json
import os
from os import environ
from pathlib import Path
import re
import signal
import subprocess
import sys
import tempfile
import time


def _cleanup_remote(journal, deadline):
    with journal.open('rb') as handle:
        raw = handle.read(8193)
    if not raw:
        return
    if len(raw) > 8192:
        raise OSError('owned sandbox journal exceeds limit')
    ids = raw.decode('ascii').splitlines()
    if any(not re.fullmatch(r'(?:loop|g5)-[a-f0-9]{24}', run_id) for run_id in ids):
        raise OSError('invalid owned sandbox journal')
    from verification.sandbox import RunnerClient, SandboxError

    client = RunnerClient.from_env()
    if client is None:
        raise OSError('owned sandbox runner unavailable')
    for run_id in dict.fromkeys(ids):
        try:
            result = client.destroy(run_id, deadline=deadline)
            if result.get('state') not in {'destroyed', 'expired', 'failed'}:
                raise OSError('owned sandbox cleanup unconfirmed')
        except (SandboxError, ValueError) as error:
            raise OSError('owned sandbox cleanup unconfirmed') from error


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

    class ThreadEntry(ctypes.Structure):
        _fields_ = [('size', wintypes.DWORD), ('usage', wintypes.DWORD),
                    ('thread_id', wintypes.DWORD), ('process_id', wintypes.DWORD),
                    ('base_priority', wintypes.LONG), ('delta_priority', wintypes.LONG),
                    ('flags', wintypes.DWORD)]

    kernel = ctypes.WinDLL('kernel32', use_last_error=True)
    kernel.CreateJobObjectW.argtypes = [ctypes.c_void_p, wintypes.LPCWSTR]
    kernel.CreateJobObjectW.restype = wintypes.HANDLE
    kernel.SetInformationJobObject.argtypes = [wintypes.HANDLE, ctypes.c_int,
                                               ctypes.c_void_p, wintypes.DWORD]
    kernel.AssignProcessToJobObject.argtypes = [wintypes.HANDLE, wintypes.HANDLE]
    kernel.CloseHandle.argtypes = [wintypes.HANDLE]
    kernel.CreateToolhelp32Snapshot.argtypes = [wintypes.DWORD, wintypes.DWORD]
    kernel.CreateToolhelp32Snapshot.restype = wintypes.HANDLE
    for name in ('Thread32First', 'Thread32Next'):
        getattr(kernel, name).argtypes = [wintypes.HANDLE, ctypes.POINTER(ThreadEntry)]
    kernel.OpenThread.argtypes = [wintypes.DWORD, wintypes.BOOL, wintypes.DWORD]
    kernel.OpenThread.restype = wintypes.HANDLE
    kernel.ResumeThread.argtypes = [wintypes.HANDLE]
    kernel.ResumeThread.restype = wintypes.DWORD
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
        snapshot = kernel.CreateToolhelp32Snapshot(4, 0)  # TH32CS_SNAPTHREAD
        if snapshot == wintypes.HANDLE(-1).value:
            raise ctypes.WinError(ctypes.get_last_error())
        try:
            entry = ThreadEntry()
            entry.size = ctypes.sizeof(entry)
            found = kernel.Thread32First(snapshot, ctypes.byref(entry))
            while found and entry.process_id != process.pid:
                found = kernel.Thread32Next(snapshot, ctypes.byref(entry))
            if not found:
                raise OSError('owned launcher thread missing')
            thread = kernel.OpenThread(2, False, entry.thread_id)  # THREAD_SUSPEND_RESUME
            if not thread:
                raise ctypes.WinError(ctypes.get_last_error())
            try:
                if kernel.ResumeThread(thread) == 0xffffffff:
                    raise ctypes.WinError(ctypes.get_last_error())
            finally:
                kernel.CloseHandle(thread)
        finally:
            kernel.CloseHandle(snapshot)
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
    deadline = time.monotonic() + timeout
    cleanup_reserve = min(30, timeout / 10)
    journal_dir = Path(tempfile.mkdtemp(prefix='ai-board-owned-'))
    journal = journal_dir / 'runs'
    journal.touch()
    child_env = dict(environ, AI_BOARD_OWNED_RUN_FILE=str(journal))
    launch = command
    payload = input
    if windows:
        # Suspend the OS process too: venv shims can spawn before Python reads stdin.
        launch = [sys.executable, '-c',
                  'import json,subprocess,sys; r=json.load(sys.stdin); '
                  'p=subprocess.run(r["command"],input=r["input"],text=True); '
                  'sys.exit(p.returncode)']
        payload = json.dumps({'command': command, 'input': input})
    process = subprocess.Popen(launch, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE, text=True, encoding="utf-8", errors="replace",
                               start_new_session=not windows, env=child_env,
                               creationflags=4 if windows else 0)  # CREATE_SUSPENDED
    close_job = None
    try:
        if windows:
            close_job = _windows_job(process)
        stdout, stderr = process.communicate(payload, timeout=max(.001, deadline - time.monotonic() - cleanup_reserve))
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
        original_error = sys.exc_info()[1]
        try:
            _cleanup_remote(journal, deadline)
        except (OSError, ValueError) as error:
            # Keep uncertain intent for reconciliation; callers must stop the suite.
            message = f'owned sandbox cleanup unconfirmed; journal: {journal}; {error.__cause__ or error}'
            if original_error is None:
                raise OSError(message) from error
            original_error.add_note(message)
        else:
            journal.unlink()
            journal_dir.rmdir()
