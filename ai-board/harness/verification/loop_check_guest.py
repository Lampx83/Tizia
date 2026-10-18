"""Trusted guest entry point; candidate processes run as the unprivileged gate user."""
from __future__ import annotations

import json
import os
from pathlib import Path
import re
import signal
import subprocess
import sys
import tempfile
import time

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from verification.loop_checks import digest, readable, runtime_hash
from runtime.tool_manifest import canonical_hash
from gates.static_check import lint_imports
from verification.baseline_guest import cleanup


def execute(argv, timeout):
    started = time.monotonic()
    with tempfile.TemporaryFile() as out:
        process = subprocess.Popen(['runuser', '-u', 'gate', '--', *argv], cwd='/workspace/checkout',
                                   stdout=out, stderr=subprocess.STDOUT, stdin=subprocess.DEVNULL,
                                   start_new_session=True)
        timed_out = truncated = False
        try:
            while process.poll() is None:
                truncated = os.fstat(out.fileno()).st_size > 16000
                timed_out = time.monotonic() - started >= timeout
                if truncated or timed_out:
                    break
                time.sleep(.02)
        finally:
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
            process.wait()
            # A test may detach from its process group; its guest UID cannot escape this fence.
            cleanup()
        out.seek(0)
        output = out.read(16000).decode('utf-8', 'replace')
        truncated = truncated or os.fstat(out.fileno()).st_size > 16000
        return {'passed': process.returncode == 0 and not timed_out and not truncated,
                'exit_code': process.returncode, 'output': output, 'timed_out': timed_out, 'truncated': truncated}


def main():
    request = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
    manifest = json.loads((Path(__file__).resolve().parents[1] / 'runtime' / 'tool_manifest.json').read_text(encoding='utf-8'))
    if runtime_hash() != request['runtime_sha256'] or canonical_hash(manifest) != request['tools']:
        raise ValueError('guest runtime or approved tool manifest drift')
    file, test_file = request['file'], request['test_file']
    if not readable(file) or (test_file and (not readable(test_file) or not test_file.startswith(('test/', 'tests/')))):
        raise ValueError('invalid candidate path')
    root = Path('/workspace/checkout')
    content = (root / file).read_text(encoding='utf-8')
    test = (root / test_file).read_text(encoding='utf-8') if test_file else None
    pin = digest(file, content, test_file, test, request['base'], request['tools'])
    if pin != request['digest']:
        raise ValueError('candidate digest mismatch')
    profile = request['profile']
    result = {'passed': False, 'exit_code': None, 'output': 'unsupported check profile', 'timed_out': False, 'truncated': False}
    if profile == 'relevant':
        if test_file and test_file.endswith(('.test.js', '.test.mjs', '.test.cjs', '.spec.js', '.spec.mjs', '.spec.cjs')):
            result = execute(['node', '--test', '--test-reporter=tap', test_file], request['timeout_s'])
            if not re.search(r'^# tests [1-9][0-9]*$', result['output'], re.M):
                result.update(passed=False, output=result['output']+'\nNo executed tests reported.')
        else:
            result['output'] = 'A supported Node test file is required; packages are not installed.'
    elif profile in ('light', 'platform'):
        if file.endswith(('.js', '.mjs', '.cjs')):
            errors = lint_imports(content, file)
            result = execute(['node', '--check', file], request['timeout_s'])
            if errors:
                result.update(passed=False, output='\n'.join(errors)[:16000])
        elif file.endswith('.json'):
            try:
                json.loads(content)
                result.update(passed=True, exit_code=0, output='JSON parses.')
            except ValueError as error:
                result['output'] = str(error)[:16000]
        elif file.endswith(('.html', '.css')):
            # Public DOM/style smoke only, without oracle data or a task-correctness claim.
            script = '''import pathlib,sys
from playwright.sync_api import sync_playwright
s=pathlib.Path(sys.argv[1]).read_text(encoding="utf-8")
with sync_playwright() as p:
    b=p.chromium.launch(headless=True,args=["--no-sandbox"])
    page=b.new_page(java_script_enabled=False)
    page.route("**/*", lambda r:r.abort())
    page.set_content("<style>"+s+"</style><main>style probe</main>" if sys.argv[1].endswith(".css") else s)
    assert page.locator("body").count() == 1
    b.close()
print("Public DOM/style parse smoke passed; semantic correctness is not asserted.")
'''
            result = execute([sys.executable, '-c', script, file], request['timeout_s'])
    print(json.dumps({**result, 'digest': pin, 'profile': profile, 'capability_version': 1}))


if __name__ == '__main__':
    main()
