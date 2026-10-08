"""Fast tier: sau cổng 3, cổng 4 cơ học + oracle sản xuất (functional.select → text-visible-v1) trên app chạy bằng node ngay trên host.

Không docker compose, không microVM → số liệu gắn nhãn "fast tier", KHÔNG trộn vào ship rate chính thức.
Cổng 4 ở đây = lint import + node --check (static_check.run) + guard.scan trên diff base→candidate. Bỏ: soát nội dung LLM, catalog (cần model / checkout đầy đủ).
Oracle sản xuất chỉ chạy khi request có kỳ vọng chữ parse được (functional.text_expectation); không thì `no_oracle` = Gate 5 thật dừng plan_unfit.
Launcher cắm được: launcher(checkout, root) → context manager trả App(base, tree, fixture); mặc định native_launcher, test dùng bản giả.
"""
from __future__ import annotations

import contextlib
import functools
import json
import os
import shutil
import socket
import subprocess
import sys
import tarfile
import tempfile
import time
import urllib.parse
import urllib.request
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

sys.path.insert(0, str(Path(__file__).resolve().parent))
import functional  # noqa: E402
from gates import guard, implement, static_check, verify  # noqa: E402
from main import ROOT  # noqa: E402

APP_PATHS = ("server", "public", "scripts", "package.json", "ai-board/harness/prompts")  # như COPY của Dockerfile; thiếu ở commit ghim thì bỏ
KEEP_ENV = ("PATH", "SYSTEMROOT", "TEMP", "TMP", "HOME", "USERPROFILE")  # app không thấy key/secret nào của harness
START_TIMEOUT_S = 90


class FastTierError(RuntimeError):
    """Môi trường fast tier hỏng (app không lên, thiếu trình duyệt...): dừng run, không tính vào số liệu."""


@dataclass
class App:
    base: str
    tree: Path
    fixture: Callable[[str], dict | None]


def _git(checkout: Path, *args: str) -> subprocess.CompletedProcess:
    return subprocess.run(["git", "--git-dir", str(checkout), *args], capture_output=True, stdin=subprocess.DEVNULL)


def build_tree(checkout: Path, root: Path) -> Path:
    """Cây app ở <root>/apptree/<sha12> từ git archive của checkout (HEAD ghim), dựng 1 lần; node_modules nối từ repo gốc."""
    sha = _git(checkout, "rev-parse", "HEAD").stdout.decode().strip()[:12]
    tree = root / "apptree" / sha
    if not (tree / ".ready").exists():  # dựng dở bị kill thì dựng lại (chưa có link node_modules nên xóa an toàn)
        shutil.rmtree(tree, ignore_errors=True)
        tree.mkdir(parents=True)
        paths = [p for p in APP_PATHS if not _git(checkout, "cat-file", "-e", f"HEAD:{p}").returncode]
        git = subprocess.Popen(["git", "--git-dir", str(checkout), "archive", "HEAD", *paths], stdout=subprocess.PIPE, stdin=subprocess.DEVNULL)
        with tarfile.open(fileobj=git.stdout, mode="r|") as tar:
            tar.extractall(tree, **({"filter": "data"} if hasattr(tarfile, "data_filter") else {}))
        if git.wait():
            raise FastTierError(f"git archive {checkout} thất bại (mã {git.returncode})")
        (tree / ".ready").write_text("", encoding="utf-8")
    link, source = tree / "node_modules", ROOT / "node_modules"
    if not link.exists():
        if not source.is_dir():
            raise FastTierError(f"thiếu {source}: chạy npm install ở gốc repo (app native dùng chung node_modules)")
        if os.name == "nt":  # junction không cần quyền admin như symlink
            subprocess.run(["cmd", "/c", "mklink", "/J", str(link), str(source)], check=True, capture_output=True)
        else:
            link.symlink_to(source, target_is_directory=True)
    return tree


def _fixture(tree: Path, env: dict) -> Callable[[str], dict | None]:
    """Phiên học viên cho oracle chữ, từ queue_fixture.mjs của Gate 5 (PostgreSQL; import /app/ → cây native). Bỏ import store ai-board:
    commit ghim có thể chưa có server/ai-board, và oracle chữ chỉ cần token → mọi stage (seed/session) đều trả {token}."""
    source = (Path(__file__).resolve().parent / "queue_fixture.mjs").read_text(encoding="utf-8")
    lines = [line for line in source.splitlines() if "createAsyncAiBoardStore }" not in line]
    script = tree / "verify-session.mjs"
    script.write_text("\n".join(lines).replace("'/app/", f"'{tree.as_posix()}/"), encoding="utf-8")

    def run(stage: str) -> dict | None:
        done = subprocess.run(["node", str(script), "session"], cwd=tree, env=env, capture_output=True, text=True, encoding="utf-8",
                              stdin=subprocess.DEVNULL, timeout=20)
        if done.returncode:
            raise FastTierError(f"fixture {stage} thất bại: {done.stderr.strip()[-300:]}")
        return json.loads(done.stdout)
    return run


def _health(base: str) -> bool:
    try:
        with urllib.request.urlopen(base + "/api/health", timeout=3):
            return True
    except OSError:
        return False


def _with_db(admin_url: str, name: str) -> str:
    """admin_url với tên database thay bằng name."""
    parts = urllib.parse.urlsplit(admin_url)
    return urllib.parse.urlunsplit(parts._replace(path="/" + name))


@contextlib.contextmanager
def throwaway_database(admin_url: str):
    """CREATE DATABASE evalfast_<hex> trên PostgreSQL của EVAL_PG_ADMIN_URL, yield DSN của nó, DROP ... WITH (FORCE) khi xong."""
    import psycopg  # noqa: PLC0415 — lazy: harness không DB không cần driver
    name = "evalfast_" + uuid.uuid4().hex[:12]
    with psycopg.connect(admin_url, autocommit=True) as admin:
        admin.execute(f'CREATE DATABASE "{name}"')
        try:
            yield _with_db(admin_url, name)
        finally:
            admin.execute(f'DROP DATABASE IF EXISTS "{name}" WITH (FORCE)')


@contextlib.contextmanager
def native_launcher(checkout: Path, root: Path):
    """App thật bằng `node server/index.js` trên host: database PostgreSQL tạm (EVAL_PG_ADMIN_URL → DATABASE_URL), DATA_DIR tạm cho log, 127.0.0.1, cổng trống.
    Raise FastTierError kèm đuôi log nếu app không lên, hoặc thiếu EVAL_PG_ADMIN_URL."""
    admin_url = os.environ.get("EVAL_PG_ADMIN_URL")
    if not admin_url:
        raise FastTierError("EVAL_PG_ADMIN_URL chưa set: cần URL PostgreSQL (quyền CREATE DATABASE) cho database tạm của fast tier")
    with throwaway_database(admin_url) as database_url:
        yield from _run_native(checkout, root, database_url)


def _run_native(checkout: Path, root: Path, database_url: str):
    tree = build_tree(Path(checkout), Path(root))
    data = Path(tempfile.mkdtemp(prefix="ai-board-fast-"))
    with socket.socket() as probe:
        probe.bind(("127.0.0.1", 0))
        port = probe.getsockname()[1]
    env = {k: os.environ[k] for k in KEEP_ENV if k in os.environ}
    env.update(NODE_ENV="production", PORT=str(port), HOST="127.0.0.1", DATA_DIR=str(data), BASE_PATH="", DATABASE_URL=database_url)
    log = data / "app.log"
    with log.open("wb") as out:
        proc = subprocess.Popen(["node", "server/index.js"], cwd=tree, env=env, stdin=subprocess.DEVNULL, stdout=out, stderr=subprocess.STDOUT)
    base = f"http://127.0.0.1:{port}"
    try:
        deadline = time.monotonic() + START_TIMEOUT_S
        while not _health(base):
            if proc.poll() is not None or time.monotonic() > deadline:
                why = f"thoát mã {proc.returncode}" if proc.poll() is not None else f"không lên sau {START_TIMEOUT_S} s"
                raise FastTierError(f"app native {why}: {log.read_text(encoding='utf-8', errors='replace')[-600:]}")
            time.sleep(0.5)
        yield App(base, tree, _fixture(tree, env))
    finally:
        proc.terminate()
        try:
            proc.wait(10)
        except subprocess.TimeoutExpired:
            proc.kill()
        shutil.rmtree(data, ignore_errors=True)


def _base_bytes(checkout: Path, rel: str) -> bytes | None:
    shown = _git(Path(checkout), "show", f"HEAD:{rel}")
    return None if shown.returncode else shown.stdout


@contextlib.contextmanager
def overlay(app: App, checkout: Path, files: dict[str, str]):
    """Ghi file candidate đè lên cây app (server đọc file mỗi request); xong thì trả về bản base lấy từ git, kể cả khi lỗi
    (không lấy base từ cây: lần chạy bị kill để lại file candidate sẽ thành 'base' sai)."""
    paths = {rel: implement._safe_join(app.tree, rel) for rel in files}
    try:
        for rel, path in paths.items():
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(files[rel].encode("utf-8"))
        yield
    finally:
        for rel, path in paths.items():
            if (base := _base_bytes(checkout, rel)) is None:
                path.unlink(missing_ok=True)
            else:
                path.write_bytes(base)


def _section(rel: str, before: bytes | None, after: str) -> str:
    """Đoạn `diff --git` của 1 file: sửa file có sẵn hoặc file mới (guard.scan đọc đúng dạng này)."""
    head = f"diff --git a/{rel} b/{rel}\n" + ("" if before is not None else "new file mode 100644\n")
    return head + implement._unified("" if before is None else before.decode("utf-8"), after, rel) + "\n"


def gate4(state: dict, files: dict[str, str]) -> tuple[bool, str | None]:
    """Phần cơ học của cổng 4 trên candidate scratch: (qua?, lý do chặn). Contact có sẵn trên trang base không bị tính PII."""
    out = static_check.run(state, check_size=False)  # không deps/budget → không gọi model
    if out.get("blocked"):
        return False, out["reason"]
    subtasks = state["plan"]["subtasks"]
    base = implement._existing_files(state["checkout_source"], subtasks)[1]
    text = "".join(_section(rel, base.get(rel), body) for rel, body in files.items())
    allowed = guard.contacts_in("\n".join(b.decode("utf-8", "replace") for b in base.values()))
    found = guard.scan(text, None, allowed_contacts=allowed, request_text=state.get("request_detail"), request_type=state.get("request_type"))["findings"]
    if found:
        return False, "; ".join(f"{f['check']}: {f['detail']}" for f in found)[:300]
    return True, None


class FastTier:
    """Hook cho eval_gold.run_case. App khởi động lười (lần đầu có candidate qua cổng 4), giữ 1 app mỗi checkout, đóng ở close()."""

    def __init__(self, launcher, root: Path):
        self.launcher, self.root, self.stack, self.apps = launcher, Path(root), contextlib.ExitStack(), {}

    def close(self) -> None:
        self.stack.close()

    def app(self, checkout) -> App:
        key = str(checkout)
        if key not in self.apps or not _health(self.apps[key].base):  # app chết giữa run: dựng lại (hỏng tiếp thì launcher raise)
            self.apps[key] = self.stack.enter_context(self.launcher(Path(checkout), self.root))
        return self.apps[key]

    def hook(self, record: dict) -> Callable:
        title = (record.get("subtask") or record["subtasks"][0])["title"]
        return functools.partial(self.after, title)

    def after(self, title: str, state: dict, scratch, files: dict[str, str]) -> dict:
        state = {**state, "request_title": title}
        passed, reason = gate4(state, files)
        if not passed:
            return {"gate4": "blocked", "gate4_reason": reason, "prod": "skipped"}
        out = {"gate4": "passed", "prod": "no_oracle", "prod_probe": functional.select(state)}
        if out["prod_probe"] != functional.TEXT_PROBE:  # fast tier chỉ dựng được fixture/trang cho oracle chữ
            out["prod_reason"] = "request không có kỳ vọng chữ parse được" if out["prod_probe"] is None else f"oracle {out['prod_probe']} chưa hỗ trợ ở fast tier"
            return out
        pages = [p for p in verify._public_paths(state["diffs"]) if p.endswith(".html")]
        app = self.app(state["checkout_source"])
        try:
            with overlay(app, state["checkout_source"], files):
                result = functional.run(app.base, out["prod_probe"], app.fixture, state=state, pages=pages)
        except FastTierError:
            raise
        except Exception as error:  # noqa: BLE001 — functional.run tự bắt lỗi trang; ném ra ngoài = không có trình duyệt/playwright
            raise FastTierError(f"oracle sản xuất không chạy được: {type(error).__name__}: {str(error)[:300]}") from error
        out["prod"] = "passed" if result.get("passed") else "failed"
        out["prod_reason"] = None if result.get("passed") else str(result.get("reason"))[:300]
        return out


def finish(row: dict) -> dict:
    """Thêm `ended` (tầng dừng lượt: gate3/gate4/no_oracle/oracle/gold/shipped) và `shipped` (qua oracle sản xuất, như Gate 5 sẽ cho ship).
    ended=gold: oracle sản xuất cho qua nhưng gold nói sai (false pass)."""
    if not row["gate_passed"]:
        ended = "gate3"
    elif row.get("gate4") != "passed":
        ended = "gate4"
    elif row["prod"] == "no_oracle":
        ended = "no_oracle"
    elif row["prod"] != "passed":
        ended = "oracle"
    else:
        ended = "shipped" if row["oracle"] else "gold"
    return {**row, "ended": ended, "shipped": ended in ("shipped", "gold")}


STAGES = (("gate3", lambda r: r["gate_passed"]), ("gate4", lambda r: r.get("gate4") == "passed"),
          ("production_oracle", lambda r: r.get("prod") == "passed"), ("gold_oracle", lambda r: r["oracle"]))


def gap(rows: list[dict]) -> dict:
    """Độ phủ oracle của 1 nhóm: đúng theo gold vs ship theo oracle sản xuất, và vì sao lệch."""
    count = lambda ended, correct: sum(r["ended"] == ended and r["oracle"] == correct for r in rows)  # noqa: E731
    return {"correct": sum(r["oracle"] for r in rows), "shipped": sum(r["shipped"] for r in rows),
            "correct_no_oracle": count("no_oracle", True), "correct_gate4_blocked": count("gate4", True),
            "correct_oracle_failed": count("oracle", True), "false_pass": count("gold", False)}
