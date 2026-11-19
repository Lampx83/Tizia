"""HTTP-only board client for the AB driver. No docker, no psql. Creds from env names only."""
import json
import os
import time
import urllib.error
import urllib.request
from http.cookiejar import CookieJar

ENV_BASE = "AB_BASE"
ENV_USER = "AB_ADMIN_USER"
ENV_PASSWORD = "AB_ADMIN_PASSWORD"
STALE_MS = 120_000
WORKER_PATH = "/api/admin/ai-board/driver/worker"
OWNER_GPU_PATH = "/api/admin/ai-board/driver/owner-gpu"


class BoardError(RuntimeError):
    """Board call failed. status None = transport error or timeout."""

    def __init__(self, message, status=None):
        super().__init__(message)
        self.status = status


class BoardHttp:
    """Cookie-session JSON client; retries 5xx and transport errors only."""

    def __init__(self, base, user, password, timeout=15, retries=3, backoff=2.0):
        self.base = str(base).rstrip("/")
        self.user = user
        self._password = password
        self.timeout = timeout
        self.retries = retries
        self.backoff = backoff
        self.jar = CookieJar()
        self._opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(self.jar))

    @classmethod
    def from_env(cls, base, environ=None):
        env = os.environ if environ is None else environ
        user, password = env.get(ENV_USER, ""), env.get(ENV_PASSWORD, "")
        missing = [n for n, v in ((ENV_USER, user), (ENV_PASSWORD, password)) if not v]
        if not base:
            missing.append("--base-url")
        if missing:
            raise BoardError(f"missing env: {', '.join(missing)}")
        return cls(base, user, password)

    def login(self):
        self._call("POST", "/api/auth/login", {"username": self.user, "password": self._password}, retry=False)

    def get_json(self, path):
        return self._call("GET", path)

    def _call(self, method, path, body=None, retry=True):
        data = None if body is None else json.dumps(body).encode("utf-8")
        req_headers = {"Accept": "application/json"} | ({"Content-Type": "application/json"} if data else {})
        attempts = self.retries if retry else 1
        last = None
        for attempt in range(attempts):
            req = urllib.request.Request(self.base + path, data=data, method=method, headers=req_headers)
            try:
                with self._opener.open(req, timeout=self.timeout) as resp:
                    return json.loads(resp.read().decode("utf-8") or "null")
            except urllib.error.HTTPError as exc:
                exc.close()
                if exc.code < 500:
                    raise BoardError(f"{method} {path} -> {exc.code}", status=exc.code) from None
                last = BoardError(f"{method} {path} -> {exc.code}", status=exc.code)
            except (urllib.error.URLError, TimeoutError, OSError) as exc:
                last = BoardError(f"{method} {path} transport: {type(exc).__name__}")
            if attempt + 1 < attempts:
                time.sleep(self.backoff * (2 ** attempt))
        raise last


def worker_problems(worker, now_ms=None):
    """Health problems for one worker row from WORKER_PATH; [] when idle and fresh."""
    now_ms = int(time.time() * 1000) if now_ms is None else now_ms
    problems = []
    if worker is None:
        return ["no worker reported"]
    if worker.get("status") != "idle":
        problems.append(f"worker status {worker.get('status')!r}, need 'idle'")
    seen = worker.get("last_seen_at")
    if seen is None or now_ms - int(seen) > STALE_MS:
        problems.append(f"worker last seen too long ago ({seen})")
    if worker.get("gpu_retry_at") and int(worker["gpu_retry_at"]) > now_ms:
        problems.append(f"gpu cooldown until {worker['gpu_retry_at']}")
    if worker.get("gpu_error"):
        problems.append(f"gpu error: {str(worker['gpu_error'])[:160]}")
    return problems


def verify_arm(arm, reported_flags):
    """(problems, portainer_env_lines) for arm vs worker-reported flags. None flags = refuse."""
    from evaluation.pipeline import driver

    expected = driver.arm_env(arm)
    if reported_flags is None:
        return (["worker flags not reported over HTTP; cannot verify arm"], [f"{k}={v}" for k, v in expected.items()])
    diffs = [k for k, v in expected.items() if str(reported_flags.get(k, "")) != v]
    if not diffs:
        return [], []
    lines = [f"{k}={expected[k]}" for k in diffs]
    return ([f"arm {arm}: {k} is {reported_flags.get(k)!r}, need {expected[k]!r}" for k in diffs], lines)


def arm_attestation(arm, attested, record):
    """Trial fields: attested by --confirm-arm; unverified when trace evidence contradicts the arm env.

    Only one direction is inferred: evidence present while the flag is off. Absence proves nothing.
    """
    from evaluation.pipeline import driver
    env = driver.arm_env(arm)
    reasons = []
    stop_report_off = env.get("AI_BOARD_STOP_REPORT_V2", "0") in ("", "0")  # unset = product default off
    if stop_report_off and record.get("stop_report_class"):
        reasons.append("stop_report present but AI_BOARD_STOP_REPORT_V2=0")
    return {"arm_attested": bool(attested), "arm_unverified": bool(reasons),
            "arm_unverified_reason": "; ".join(reasons)}
