import os
from pathlib import Path
import subprocess
import sys
import time

import pytest

from evaluation.suite.process_tree import run_owned

pytestmark = pytest.mark.slow


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


@pytest.mark.parametrize('ending', ['timeout', 'keyboard_cancel', 'exit_cancel', 'success', 'delayed_assignment'])
def test_owned_adapter_parent_child_grandchild_all_stop(tmp_path, monkeypatch, ending):
    if ending == 'delayed_assignment':
        if os.name != 'nt':
            pytest.skip('Windows launcher assignment race')
        from evaluation.suite import process_tree
        assign = process_tree._windows_job
        def delayed(process):
            time.sleep(1)
            return assign(process)
        monkeypatch.setattr(process_tree, '_windows_job', delayed)
        ending = 'success'
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
            run_owned(command, input='{}', timeout=10)
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


@pytest.mark.parametrize('ending,receipt', [('timeout', 'destroyed'), ('keyboard_cancel', 'destroyed'),
                                         ('success', 'destroyed'), ('success', 'indeterminate'), ('success', 'unreachable'),
                                         ('timeout', 'slow_error')])
def test_owned_trial_confirms_remote_cleanup_or_stops(tmp_path, monkeypatch, ending, receipt):
    import json
    import threading
    from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

    states = {}

    class API(BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass

        def do_POST(self):
            body = json.loads(self.rfile.read(int(self.headers['content-length'])))
            states[body['run_id']] = 'ready'
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b'{"state":"ready"}')

        def do_DELETE(self):
            states[self.path.rsplit('/', 1)[-1]] = receipt
            self.send_response(503 if receipt in {'unreachable', 'slow_error'} else 200)
            self.end_headers()
            if receipt == 'slow_error':
                # Each byte arrives before the socket timeout; only an absolute deadline stops this.
                for _ in range(20):
                    try:
                        self.wfile.write(b' ')
                        self.wfile.flush()
                    except OSError:
                        return
                    time.sleep(.2)
            self.wfile.write(json.dumps({'state': receipt}).encode())

    server = ThreadingHTTPServer(('127.0.0.1', 0), API)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    token = tmp_path / 'fixture-token'
    token.write_text('fixture-only')
    monkeypatch.setenv('AI_BOARD_SANDBOX_URL', f'http://127.0.0.1:{server.server_port}')
    monkeypatch.setenv('AI_BOARD_SANDBOX_TOKEN_FILE', str(token))
    import tempfile
    monkeypatch.setattr(tempfile, 'tempdir', str(tmp_path))
    program = (f'import sys; sys.path.insert(0, {str(Path(__file__).resolve().parents[1])!r}); '
               'from verification.sandbox import RunnerClient; import time; '
               'c=RunnerClient.from_env(); c.create("loop-0123456789abcdef01234567", []); '
               'c.create("g5-0123456789abcdef01234567", []); ' +
               ('time.sleep(60)' if ending != 'success' else 'print("ok")'))
    if ending == 'keyboard_cancel':
        def interrupt(process, input=None, timeout=None):
            process.stdin.write(input)
            process.stdin.close()
            deadline = time.monotonic() + 7
            while len(states) < 2 and time.monotonic() < deadline:
                time.sleep(.01)
            assert len(states) == 2
            raise KeyboardInterrupt
        monkeypatch.setattr(subprocess.Popen, 'communicate', interrupt)
    try:
        command = [sys.executable, '-c', program]
        if ending == 'timeout':
            started = time.monotonic()
            with pytest.raises(subprocess.TimeoutExpired):
                run_owned(command, input='{}', timeout=20)
            assert time.monotonic() - started < 20.5
        elif ending == 'keyboard_cancel':
            with pytest.raises(KeyboardInterrupt):
                run_owned(command, input='{}', timeout=10)
        elif receipt == 'destroyed':
            assert run_owned(command, input='{}', timeout=10).returncode == 0
        else:
            with pytest.raises(OSError, match='cleanup unconfirmed; journal:'):
                run_owned(command, input='{}', timeout=10)
            assert list(tmp_path.glob('ai-board-owned-*/runs')), 'retain intent for reconciliation'
        if receipt == 'destroyed':
            assert states == {'loop-0123456789abcdef01234567': 'destroyed',
                              'g5-0123456789abcdef01234567': 'destroyed'}
            assert not list(tmp_path.glob('ai-board-owned-*'))
    finally:
        server.shutdown()
        server.server_close()
        thread.join()
