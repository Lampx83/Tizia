"""Read-only worker health gate for a round. Exit 1 with reasons if not healthy."""
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone

CONTAINER = "aiboard-worker"
MIN_UP_S = 90
BAD_LOG = ("Traceback", "cooldown", "chưa load được")


def evaluate(state: str, started_at: datetime, now: datetime, log_text: str, last_status: dict | None) -> list[str]:
    """Problems list, empty when healthy. Pure: inputs come from docker."""
    problems = []
    if state != "running":
        problems.append(f"state is {state!r}, not running")
    up = (now - started_at).total_seconds()
    if up <= MIN_UP_S:
        problems.append(f"up {up:.0f}s, need > {MIN_UP_S}s")
    for line in log_text.splitlines():
        for needle in BAD_LOG:
            if needle in line:
                problems.append(f"log has {needle!r}: {line.strip()[:160]}")
                break
    if last_status is None:
        problems.append("no status JSON line in last 5 min of log")
    elif last_status.get("status") != "idle":
        problems.append(f"latest status {last_status.get('status')!r}, need 'idle'")
    return problems


def last_status_json(log_text: str) -> dict | None:
    for line in reversed(log_text.splitlines()):
        line = line.strip()
        if line.startswith("{") and '"status"' in line:
            try:
                return json.loads(line)
            except ValueError:
                continue
    return None


def _docker(args: list[str]) -> str:
    p = subprocess.run(["docker", *args], capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=60)
    if p.returncode != 0:
        raise SystemExit(f"docker {' '.join(args)} failed: {p.stderr.strip()[:300]}")
    return p.stdout


def _parse_started(text: str) -> datetime:
    m = re.match(r"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})", text)
    if not m:
        raise SystemExit(f"bad StartedAt: {text!r}")
    return datetime.strptime(m.group(1), "%Y-%m-%dT%H:%M:%S").replace(tzinfo=timezone.utc)


def main_http() -> int:
    import argparse

    from evaluation.pipeline import board_http
    ap = argparse.ArgumentParser()
    ap.add_argument("--base-url", default=None, help="remote web base URL, required in http mode")
    base = ap.parse_known_args()[0].base_url
    if not base:
        raise SystemExit("http mode needs --base-url (explicit)")
    client = board_http.BoardHttp.from_env(base)
    client.login()
    problems = board_http.worker_problems(client.get_json(board_http.WORKER_PATH))
    if problems:
        print("precheck FAILED (http):")
        for p in problems:
            print(" -", p)
        return 1
    print("precheck ok (http): remote worker idle, fresh, no gpu cooldown/error")
    return 0


def main() -> int:
    if os.environ.get("AB_BACKEND") == "http":
        return main_http()
    state, started = _docker(["inspect", CONTAINER, "--format", "{{.State.Status}}|{{.State.StartedAt}}"]).strip().split("|", 1)
    log_text = _docker(["logs", "--since", "5m", CONTAINER])
    problems = evaluate(state, _parse_started(started), datetime.now(timezone.utc), log_text, last_status_json(log_text))
    if problems:
        print("precheck FAILED:")
        for p in problems:
            print(" -", p)
        return 1
    print(f"precheck ok: {CONTAINER} running, idle, no cooldown/traceback in last 5 min")
    return 0


if __name__ == "__main__":
    sys.exit(main())
