import os
from pathlib import Path
import subprocess
import sys
import time

import pytest

from evaluation.suite.process_tree import run_owned


def alive(pid):
    if os.name == 'nt':
        import ctypes
        from ctypes import wintypes
        kernel = ctypes.WinDLL('kernel32', use_last_error=True)
        kernel.OpenProcess.argtypes = [wintypes.DWORD, wintypes.BOOL, wintypes.DWORD]
        kernel.OpenProcess.restype = wintypes.HANDLE
        kernel.GetExitCodeProcess.argtypes = [wintypes.HANDLE, ctypes.POINTER(wintypes.DWORD)]
        kernel.CloseHandle.argtypes = [wintypes.HANDLE]
        handle = kernel.OpenProcess(0x1000, False, pid)
        if not handle:
            return False
        try:
            code = wintypes.DWORD()
            assert kernel.GetExitCodeProcess(handle, ctypes.byref(code))
            return code.value == 259
        finally:
            kernel.CloseHandle(handle)
    stat = Path(f'/proc/{pid}/stat')
    if stat.exists() and stat.read_text().split(') ')[1].startswith('Z'):
        return False
    try:
        os.kill(pid, 0)
        return True
    except ProcessLookupError:
        return False


@pytest.mark.parametrize('ending', ['timeout', 'keyboard_cancel', 'exit_cancel', 'success'])
def test_owned_adapter_parent_child_grandchild_all_stop(tmp_path, monkeypatch, ending):
    script = tmp_path / 'tree.py'
    script.write_text('''import json,os,pathlib,subprocess,sys,time
root=pathlib.Path(sys.argv[1]); depth=int(sys.argv[2]); ending=sys.argv[3]
(root/f"pid-{depth}").write_text(str(os.getpid()))
if depth:
    subprocess.Popen([sys.executable,__file__,str(root),str(depth-1),ending],
                     stdin=subprocess.DEVNULL,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
if depth == 2 and ending in ('exit_cancel','success'):
    deadline=time.monotonic()+5
    while not (root/'pid-0').exists() and time.monotonic()<deadline: time.sleep(.01)
    print(json.dumps({'model_calls':0}),flush=True)
    sys.exit(130 if ending=='exit_cancel' else 0)
time.sleep(60)
''', encoding='utf-8')
    if ending == 'keyboard_cancel':
        def interrupt(process, input=None, timeout=None):
            # Actually release the gated Windows adapter, then cancel after all
            # three real processes exist (not a mocked tree cleanup).
            process.stdin.write(input)
            process.stdin.close()
            deadline = time.monotonic() + 5
            while not (tmp_path / 'pid-0').exists() and time.monotonic() < deadline:
                time.sleep(.01)
            raise KeyboardInterrupt

        monkeypatch.setattr(subprocess.Popen, 'communicate', interrupt)
    command = [sys.executable, str(script), str(tmp_path), '2', ending]
    if ending == 'timeout':
        with pytest.raises(subprocess.TimeoutExpired):
            run_owned(command, input='{}', timeout=5)
    elif ending == 'keyboard_cancel':
        with pytest.raises(KeyboardInterrupt):
            run_owned(command, input='{}', timeout=10)
    else:
        result = run_owned(command, input='{}', timeout=10)
        assert result.returncode == (130 if ending == 'exit_cancel' else 0)
    pids = [int((tmp_path / f'pid-{depth}').read_text()) for depth in range(3)]
    deadline = time.monotonic() + 5
    while any(alive(pid) for pid in pids) and time.monotonic() < deadline:
        time.sleep(.01)
    assert not any(alive(pid) for pid in pids), pids


@pytest.mark.skipif(os.name != 'nt', reason='Windows assignment failure')
def test_job_assignment_failure_never_launches_adapter(tmp_path, monkeypatch):
    from evaluation.suite import process_tree

    def refuse(process):
        raise OSError('job containment unavailable')

    monkeypatch.setattr(process_tree, '_windows_job', refuse)
    marker = tmp_path / 'started'
    with pytest.raises(OSError, match='containment unavailable'):
        run_owned([sys.executable, '-c', f'from pathlib import Path; Path({str(marker)!r}).touch()'],
                  input='{}', timeout=5)
    assert not marker.exists()
