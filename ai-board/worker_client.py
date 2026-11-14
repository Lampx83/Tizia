"""AI Board worker: HTTP client and the pieces every worker module shares (harness path, server contract, lease errors)."""
from __future__ import annotations

import json
import os
import re
import socket
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Callable


Transport = Callable[[str, str, dict, dict], dict]
REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "ai-board" / "harness"))
# Worker <-> server contract, shared with server/ai-board/store.js; loader in harness runtime/limits.py.
from runtime.limits import contract  # noqa: E402
from settings import get_settings  # noqa: E402
CONTRACT = contract()
PLAN_GATES = tuple(CONTRACT["gates"]["plan"])
PRE_PR_GATES = tuple(CONTRACT["gates"]["pre_pr"])
DEFAULT_BUDGET_LIMIT = CONTRACT["default_budget_limit"]
LIMITS = CONTRACT["limits"]


class LeaseLostError(RuntimeError):
    pass


def _is_stale_lease(error: Exception) -> bool:
    if not isinstance(error, urllib.error.HTTPError) or error.code != 409:
        return False
    try:
        return json.loads(error.read().decode("utf-8")).get("error") == "stale_lease"
    except (ValueError, UnicodeError):
        return False


def take_secret(name: str) -> str:
    """Read a secret and drop it from os.environ so no subprocess (git, docker compose, smoke) inherits it."""
    return os.environ.pop(name, "") or ""


def server_url(env=None) -> str:
    """App base URL: AI_BOARD_SERVER_URL (compose: http://tizia:8041), else this machine on PORT."""
    env = os.environ if env is None else env
    return (get_settings(env).server_url or f"http://127.0.0.1:{env.get('PORT') or '8041'}").rstrip("/")


def default_worker_id() -> str:
    """Per-machine worker id from hostname. Per-request identity is the server's lease token + run id."""
    host = re.sub(r"[^a-z0-9]+", "-", socket.gethostname().lower()).strip("-")[:60]
    return f"{host}-worker" if host else "local-worker"


class WorkerClient:
    def __init__(self, base_url: str, key: str, *, timeout: float = 30.0, transport: Transport | None = None):
        self.base_url = base_url.rstrip("/")
        self.key = key
        self.timeout = timeout
        self.transport = transport or self._request

    def _request(self, method: str, path: str, payload: dict, headers: dict) -> dict:
        request = urllib.request.Request(
            self.base_url + path,
            data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),  # tiếng Việt: 2-3 byte, không phải 6
            headers={"content-type": "application/json", **headers},
            method=method,
        )
        with urllib.request.urlopen(request, timeout=self.timeout) as response:
            return json.loads(response.read().decode("utf-8"))

    def post(self, path: str, payload: dict, content_type: str | None = None) -> dict:
        """content_type riêng (vd SHOTS_TYPE) → bỏ qua express.json 64kb chung, route tự parse với trần riêng."""
        headers = {"x-ai-worker-key": self.key, **({"content-type": content_type} if content_type else {})}
        return self.transport("POST", path, payload, headers)


def _with_body(error):
    """HTTPError kèm thân phản hồi (code + lý do server) trong message để admin thấy vì sao plan bị từ chối."""
    try:
        body = error.read().decode("utf-8", "replace")[:400]
    except Exception:
        return error
    return RuntimeError(f"{error} — {body}") if body else error


def _plan_rejection(error) -> str | None:
    """Nội dung từ chối của server khi plan sai schema; None nếu không phải lỗi nội dung plan."""
    if getattr(error, "code", None) not in (400, 409):
        return None
    try:
        body = error.read().decode("utf-8", "replace")
    except Exception:
        return None
    return body[:400] if "malformed_plan" in body else None
