"""Platform-owned cleanup/export for the baseline VM; no evaluator is present."""
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import time

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from verification.loop_checks import readable


def cleanup():
    result = subprocess.run(['pkill', '-KILL', '-u', '10001'], capture_output=True, timeout=3)
    if result.returncode not in (0, 1):
        raise RuntimeError('candidate process cleanup failed')
    deadline = time.monotonic() + 3
    while True:
        result = subprocess.run(['ps', '-u', '10001', '-o', 'stat='], capture_output=True, text=True, timeout=3)
        if not any(line.strip() and not line.strip().startswith('Z') for line in result.stdout.splitlines()):
            return
        if time.monotonic() >= deadline:
            raise RuntimeError('candidate processes remain active')
        time.sleep(.02)


def export():
    cleanup()
    root = Path('/workspace/checkout')
    baseline = json.loads(Path('/workspace/base-hashes.json').read_text(encoding='utf-8'))
    changed, seen, total = {}, set(), 0
    for directory, dirs, files in os.walk(root, followlinks=False):
        dirs[:] = [name for name in dirs if name != '.git']
        for name in dirs + files:
            if (Path(directory) / name).is_symlink():
                raise ValueError('candidate symlink cannot be exported')
        for name in files:
            path = Path(directory) / name
            rel = path.relative_to(root).as_posix()
            if not readable(rel):
                raise ValueError('candidate contains an unsupported path')
            seen.add(rel)
            size = path.stat().st_size
            if size > 1_000_000 and rel in baseline:
                with path.open('rb') as handle:
                    if hashlib.file_digest(handle, 'sha256').hexdigest() == baseline[rel]:
                        continue
            if size > 1_000_000 or len(seen) > 20000:
                raise ValueError('candidate export bound exceeded')
            body = path.read_bytes()
            if hashlib.sha256(body).hexdigest() != baseline.get(rel):
                total += len(body)
                if total > 10_000_000:
                    raise ValueError('candidate export bound exceeded')
                changed[rel] = body.decode('utf-8')
    changed.update({path: None for path in baseline if path not in seen})
    Path('/workspace/candidate.json').write_text(json.dumps(changed, ensure_ascii=False), encoding='utf-8')


if __name__ == '__main__':
    {'cleanup': cleanup, 'export': export}[sys.argv[1]]()
