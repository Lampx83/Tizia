"""Corpus app launcher for the fast tier. The corpus is pinned at an old commit whose app is SQLite-based, so this uses its own
fixture and a temp DATA_DIR instead of eval_fast.native_launcher (PostgreSQL-era app)."""
from __future__ import annotations

import contextlib
import json
import os
import shutil
import socket
import subprocess
import tempfile
import time
from pathlib import Path
from typing import Callable

import eval_fast

STARTUP_ATTEMPTS = 4
FIXTURE = Path(__file__).with_name("queue_fixture_sqlite.mjs")


def _spawn(tree: Path):
    data = Path(tempfile.mkdtemp(prefix="ai-board-fast-"))
    with socket.socket() as probe:
        probe.bind(("127.0.0.1", 0))
        port = probe.getsockname()[1]
    env = {k: os.environ[k] for k in eval_fast.KEEP_ENV if k in os.environ}
    env.update(NODE_ENV="production", PORT=str(port), HOST="127.0.0.1", DATA_DIR=str(data), BASE_PATH="")
    log = data / "app.log"
    with log.open("wb") as out:
        proc = subprocess.Popen(["node", "server/index.js"], cwd=tree, env=env, stdin=subprocess.DEVNULL, stdout=out, stderr=subprocess.STDOUT)
    return data, f"http://127.0.0.1:{port}", log, proc, env


def _stop(proc, data: Path) -> None:
    proc.terminate()
    try:
        proc.wait(10)
    except subprocess.TimeoutExpired:
        proc.kill()
    shutil.rmtree(data, ignore_errors=True)


def _fixture(tree: Path, data: Path, env: dict) -> Callable[[str], dict | None]:
    lines = [line for line in FIXTURE.read_text(encoding="utf-8").splitlines() if "createAiBoardStore }" not in line]
    script = tree / "verify-session.mjs"
    script.write_text("\n".join(lines).replace("'/data/tizia.db'", f"'{(data / 'tizia.db').as_posix()}'"), encoding="utf-8")

    def run(stage: str) -> dict | None:
        for _ in range(3):  # node 24 + better-sqlite3 11 aborts (exit 134) now and then
            done = subprocess.run(["node", str(script), "session"], cwd=tree, env=env, capture_output=True, text=True, encoding="utf-8",
                                  stdin=subprocess.DEVNULL, timeout=20)
            if done.returncode != 134:
                break
        if done.returncode:
            raise eval_fast.FastTierError(f"fixture {stage} thất bại: {done.stderr.strip()[-300:]}")
        return json.loads(done.stdout)
    return run


@contextlib.contextmanager
def sqlite_launcher(checkout: Path, root: Path):
    """App thật `node server/index.js` trên host; thử lại khi app thoát trước lúc /api/health lên (lỗi khởi động ngẫu nhiên của node 24)."""
    tree = eval_fast.build_tree(Path(checkout), Path(root))
    for attempt in range(STARTUP_ATTEMPTS):
        data, base, log, proc, env = _spawn(tree)
        deadline = time.monotonic() + eval_fast.START_TIMEOUT_S
        while not eval_fast._health(base) and proc.poll() is None and time.monotonic() <= deadline:
            time.sleep(0.5)
        if eval_fast._health(base):
            break
        crashed = proc.poll() is not None
        why = f"thoát mã {proc.returncode}" if crashed else f"không lên sau {eval_fast.START_TIMEOUT_S} s"
        tail = log.read_text(encoding="utf-8", errors="replace")[-600:]
        _stop(proc, data)
        if not crashed or attempt == STARTUP_ATTEMPTS - 1:
            raise eval_fast.FastTierError(f"app native {why}: {tail}")
    try:
        yield eval_fast.App(base, tree, _fixture(tree, data, env))
    finally:
        _stop(proc, data)
