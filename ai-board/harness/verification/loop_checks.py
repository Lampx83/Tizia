"""Named checks in the existing runner; candidate code never executes on the worker."""
from __future__ import annotations

import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import subprocess
import tarfile
import time
import uuid

from verification.sandbox import RunnerClient, SandboxError, _Lease

PROFILES = ('light', 'platform', 'relevant')
VERSION = 1
DENIED_PARTS = {'node_modules', '__pycache__', 'secrets', 'credentials', 'ai-board', 'evaluation', 'heldout', 'vault'}
SOURCE_EXTENSIONS = {'.html', '.css', '.js', '.mjs', '.cjs', '.ts', '.json', '.md', '.txt', '.py', '.yml', '.yaml', '.toml', '.sql', '.sh',
                     '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2', '.ttf'}


def runtime_hash():
    return hashlib.sha256(b''.join(Path(__file__).with_name(name).read_bytes().replace(b'\r\n', b'\n')
                                  for name in ('loop_checks.py', 'loop_check_guest.py', 'baseline_guest.py'))).hexdigest()


def readable(path: str) -> bool:
    parts = PurePosixPath(path).parts
    return bool(parts) and PurePosixPath(path).suffix.lower() in SOURCE_EXTENSIONS and not path.startswith('/') and '\\' not in path and all(
        not part.startswith('.') and part.lower() not in DENIED_PARTS
        and not any(word in part.lower() for word in ('credential', 'secret'))
        and part.lower() not in {'agents.md', 'claude.md'} for part in parts)


def digest(file: str, content: str, test_file, test, base: str, tools: str) -> str:
    return hashlib.sha256(json.dumps([VERSION, base, tools, file, content, test_file, test],
                                    ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()


def archive(files: dict[str, bytes]) -> bytes:
    out = io.BytesIO()
    with tarfile.open(fileobj=out, mode='w:gz', format=tarfile.GNU_FORMAT) as tar:
        for path, body in files.items():
            info = tarfile.TarInfo(path)
            info.mode, info.size = 0o644, len(body)
            tar.addfile(info, io.BytesIO(body))
    return out.getvalue()


class CheckSession:
    """One no-network VM, refreshed from immutable source before every check."""

    def __init__(self, source, sha, budget, tools, *, client=None):
        self.source, self.sha, self.budget, self.tools = source, sha, budget, tools
        self.client = client if client is not None else RunnerClient.from_env()
        self.run_id = 'loop-' + uuid.uuid4().hex[:24]
        self.created = self.lease = None
        self.artifacts = []
        self._files = None
        self.cleanup_pending = False
        self.deadline = time.monotonic() + max(0, budget.max_wall_clock_s - budget.elapsed_s)

    def _remaining(self):
        left = self.deadline - time.monotonic()
        if left <= 0 or not self.budget.tick():
            raise SandboxError('budget_exhausted', 'check')
        return min(30, left)

    def _start(self):
        if self.created:
            return
        if self.client is None:
            raise SandboxError('not_configured', 'check')
        self._remaining()
        self.cleanup_pending = True
        self.created = self.client.create(self.run_id, self.artifacts, deadline=self.deadline)
        if self.created.get('network') != 'none':
            raise SandboxError('network_none_required', 'check')
        self.lease = _Lease(self.client, self.run_id, lambda: self.budget.tick(), deadline=self.deadline)
        self.lease.__enter__()

    def source_files(self):
        """Return only regular public source blobs from the pinned commit."""
        if self._files is not None:
            return dict(self._files)
        raw = subprocess.run(['git', '-C', str(self.source), 'archive', '--format=tar', self.sha],
                             capture_output=True, check=True, timeout=self._remaining()).stdout
        files = {}
        with tarfile.open(fileobj=io.BytesIO(raw), mode='r:') as tar:
            for member in tar:
                if member.isfile() and readable(member.name):
                    files['checkout/' + member.name] = tar.extractfile(member).read()
        self._files = files
        return dict(files)

    def run(self, profile, ws):
        if profile not in PROFILES:
            raise ValueError('unknown named check')
        self._start()
        self._remaining()
        if self.lease.revoked:
            raise SandboxError('lease_revoked', 'check')
        files = self.source_files()
        files['checkout/' + ws.file] = ws.content.encode('utf-8')
        if ws.test_file:
            files['checkout/' + ws.test_file] = ws.test.encode('utf-8')
        pin = digest(ws.file, ws.content, ws.test_file, ws.test, self.sha, self.tools)
        request = {'profile': profile, 'file': ws.file, 'test_file': ws.test_file,
                   'base': self.sha, 'tools': self.tools, 'digest': pin, 'timeout_s': max(.05, min(20, self._remaining() - 5)),
                   'runtime_sha256': runtime_hash()}
        files['check-request.json'] = json.dumps(request).encode('utf-8')
        reset = self.client.exec(self.run_id, ['python', '-c',
                         "import shutil; shutil.rmtree('/workspace/checkout', ignore_errors=True)"],
                         timeout=self._remaining(), deadline=self.deadline)
        if reset.get('code') != 0 or reset.get('timed_out') or reset.get('truncated'):
            raise SandboxError('reset_incomplete', 'check')
        self.client.upload(self.run_id, archive(files), deadline=self.deadline)
        result = self.client.exec(self.run_id,
                    ['python', '/opt/ai-board/ai-board/harness/verification/loop_check_guest.py', '/workspace/check-request.json'],
                    timeout=self._remaining(), deadline=self.deadline)
        if result.get('code') != 0 or result.get('timed_out') or result.get('truncated'):
            raise SandboxError('check_incomplete', 'check')
        try:
            receipt = json.loads(result['stdout'])
            if (receipt['digest'] != pin or receipt['profile'] != profile
                    or type(receipt['passed']) is not bool or not isinstance(receipt.get('output'), str)
                    or len(receipt['output']) > 16000 or receipt.get('capability_version') != VERSION
                    or (receipt['passed'] and (receipt.get('exit_code') != 0 or receipt.get('timed_out') or receipt.get('truncated')))):
                raise ValueError()
        except (ValueError, KeyError, TypeError):
            raise SandboxError('invalid_check_receipt', 'check') from None
        self._remaining()
        if self.lease.revoked:
            raise SandboxError('lease_revoked', 'check')
        live = self.client.renew(self.run_id, deadline=self.deadline)
        if live.get('state') != 'ready' or live.get('policy_hash') != self.created['policy_hash']:
            raise SandboxError('stale_check_receipt', 'check')
        return {**receipt, 'run_id': self.run_id, 'policy_hash': self.created['policy_hash']}

    def close(self):
        if self.lease:
            self.lease.__exit__(None, None, None)
        if not self.cleanup_pending:
            return
        try:
            result = self.client.destroy(self.run_id)
            if result.get('state') in {'destroyed', 'expired', 'failed'}:
                self.cleanup_pending = False
        except SandboxError:
            pass
