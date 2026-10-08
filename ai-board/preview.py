"""Publish only the retained Git commit, never the mutable developer checkout."""
from __future__ import annotations

import json
import re
import subprocess
import tarfile
import tempfile
import urllib.request
from pathlib import Path


def commit_archive(repo, sha: str) -> bytes:
    from verification.sandbox import package

    if not re.fullmatch(r"[a-f0-9]{40}", sha or ""):
        raise ValueError("invalid candidate SHA")
    with tempfile.TemporaryDirectory(prefix="ai-preview-commit-") as directory:
        checkout = Path(directory) / "checkout"
        checkout.mkdir()
        raw = Path(directory) / "commit.tar"
        with raw.open("wb") as output, subprocess.Popen(
            ["git", "archive", "--format=tar", sha], cwd=repo, stdout=subprocess.PIPE
        ) as process:
            total = 0
            try:
                while chunk := process.stdout.read(1024 * 1024):
                    total += len(chunk)
                    if total > 512 * 1024 * 1024:
                        raise ValueError("expanded candidate archive too large")
                    output.write(chunk)
                if process.wait(timeout=120):
                    raise ValueError("candidate archive failed")
            except BaseException:
                process.kill()
                process.wait()
                raise
        if raw.stat().st_size > 512 * 1024 * 1024:
            raise ValueError("expanded candidate archive too large")
        with tarfile.open(raw, mode="r:") as archive:
            for member in archive:
                if not (member.isfile() or member.isdir()):
                    raise ValueError("candidate contains a link or special file")
                archive.extract(member, checkout, filter="data")
        # Existing sandbox packager excludes credentials/caches and normalizes the checkout tar.
        packed = package(checkout, {}, {})
        if len(packed) > 64 * 1024 * 1024:
            raise ValueError("candidate archive too large")
        return packed


class PreviewPublisher:
    def __init__(self, base_url: str, worker_key: str):
        self.base_url, self.worker_key = base_url.rstrip("/"), worker_key
        self.opener = urllib.request.build_opener(_NoRedirect())

    def publish(self, request_id: int, run_id: int, worker_id: str, candidate: dict, repo) -> dict:
        sha = candidate["head_sha"]
        archive = commit_archive(repo, sha)
        return self.publish_archive(request_id, run_id, worker_id, sha, archive)

    def publish_archive(self, request_id: int, run_id: int, worker_id: str, sha: str, archive: bytes) -> dict:
        req = urllib.request.Request(f"{self.base_url}/api/ai-board/worker/requests/{int(request_id)}/runs/{int(run_id)}/preview/candidate",
            data=archive, method="POST", headers={"Content-Type": "application/gzip", "X-AI-Worker-Key": self.worker_key,
                                                   "X-AI-Worker-Id": worker_id, "X-Candidate-Sha": sha})
        with self.opener.open(req, timeout=900) as response:
            return json.loads(response.read())


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None  # private worker credential must never follow a redirect
