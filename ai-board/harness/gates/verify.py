"""Gate 5: run one user-state smoke flow in an isolated Docker Compose project."""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import tempfile
import urllib.request
from pathlib import Path

_SECRET_NAME = re.compile(r"(?:SECRET|TOKEN|PASSWORD|API_KEY|SECKEY|PRIVATE_KEY)", re.I)
_REQUIRED_ABSENT = {"SCOREUP_API_KEY", "CODELAB_API_KEY", "GA_API_SECRET",
                    "OLLAMA_SECKEY", "AI_BOARD_KEY"}
SMOKE_SCRIPT = Path(__file__).resolve().parents[3] / "scripts" / "smoke-user-state.sh"


def _override(project: str) -> str:
    """!override replaces Compose lists; ordinary merge would retain prod port/volume."""
    volume = f"{project}-data"
    return f"""services:
  tizia:
    container_name: !reset null
    image: {project}:latest
    restart: "no"
    cpus: 1.0
    mem_limit: 512m
    pids_limit: 128
    ports: !override
      - "127.0.0.1::8041"
    volumes: !override
      - {volume}:/data
    environment: !override
      NODE_ENV: production
      PORT: "8041"
      HOST: 0.0.0.0
      DATA_DIR: /data
      BASE_PATH: ""
volumes:
  pharmacysim-data: !reset null
  {volume}:
    name: {volume}
"""


def _bash() -> str:
    """Git Bash on Windows. Bare "bash" lets CreateProcess pick System32's WSL bash first."""
    if os.name == "nt":
        git = shutil.which("git")
        if git:  # Git/cmd/git.exe or Git/mingw64/bin/git.exe -> Git/bin/bash.exe
            for parent in Path(git).resolve().parents:
                if (parent / "bin" / "bash.exe").exists():
                    return str(parent / "bin" / "bash.exe")
    return shutil.which("bash") or "bash"


def _visual_pages(diffs: list[dict]) -> list[str]:
    return list(dict.fromkeys(
        "/" + path.removeprefix("public/")
        for item in diffs
        if (path := item.get("file", "").replace("\\", "/")).startswith("public/")
        and path.endswith(".html")
    ))


def _expected_lines(state: dict, checkout: Path, page: str) -> list[str]:
    """Trimmed lines the candidate added to the page (base..HEAD diff); whole file when no diff is known."""
    rel = "public" + page
    text = "".join(item.get("diff", "") for item in state.get("full_diff") or [])
    added, in_page = [], False
    for line in text.splitlines():
        if line.startswith("diff --git "):
            in_page = line.rstrip().endswith(f" b/{rel}")
        elif in_page and line.startswith("+") and not line.startswith("+++"):
            added.append(line[1:].strip())
    lines = added or (checkout / rel).read_text(encoding="utf-8").splitlines()
    return [line.strip() for line in lines if line.strip()]


def capture_screenshot(url: str, path: Path) -> None:
    """Optional dependency: a single Chromium capture, with no visual diff engine."""
    from playwright.sync_api import sync_playwright

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            page = browser.new_page()
            page.goto(url, wait_until="domcontentloaded", timeout=15000)
            page.screenshot(path=str(path), full_page=True)
        finally:
            browser.close()


def probe_http(url: str) -> tuple[int, bytes]:
    with urllib.request.urlopen(url, timeout=15) as response:
        return response.status, response.read()


def run(state: dict, deps=None, budget=None, *, checkout_dir: str | Path | None = None,
        runner=None, http_probe=None) -> dict:
    """Caller supplies a full checkout; a gate-3 scratch repo is never buildable."""
    checkout = checkout_dir if checkout_dir is not None else state.get("full_checkout")
    if not checkout:
        return {"gate": 5, "blocked": True, "reason": "thiếu full_checkout cho Docker verify", "evidence": None,
                "failure_class": "transient"}
    checkout = Path(checkout)
    if not (checkout / "docker-compose.yml").is_file() or not (checkout / "Dockerfile").is_file():
        return {"gate": 5, "blocked": True, "reason": "full_checkout thiếu Dockerfile/docker-compose.yml", "evidence": None,
                "failure_class": "transient"}

    skill_id = re.sub(r"[^a-z0-9-]+", "-", str(state.get("skill_id") or "").lower()).strip("-")
    if not skill_id:
        return {"gate": 5, "blocked": True, "reason": "thiếu skill_id cho Docker verify", "evidence": None,
                "failure_class": "transient"}
    project = f"ai-verify-{skill_id}"
    runner = runner or subprocess.run
    http_probe = http_probe or probe_http
    logs: list[str] = []
    reason = None
    # Failure class by stage: before containers run = environment (transient, retried once);
    # isolation/secret checks = critical boundary violation; after = the candidate (ordinary).
    kind = "transient"
    screenshot = None
    smoke_ok = False
    http_observed = False

    with tempfile.TemporaryDirectory(prefix="ai-verify-compose-") as temp:
        override = Path(temp) / "override.yml"
        override.write_text(_override(project), encoding="utf-8")
        compose = ["docker", "compose", "-p", project, "-f", str(checkout / "docker-compose.yml"),
                   "-f", str(override)]

        def command(args: list[str], *, env=None, log_output=True, timeout=None) -> subprocess.CompletedProcess:
            result = runner(args, cwd=checkout, env=env, text=True, encoding="utf-8", errors="replace", capture_output=True,
                            stdin=subprocess.DEVNULL, check=False, timeout=timeout)
            output = f"{result.stdout or ''}{result.stderr or ''}" if log_output else "[output redacted]"
            logs.append(f"$ {' '.join(str(a) for a in args)}\n{output}")
            if result.returncode:
                raise RuntimeError(f"{' '.join(str(a) for a in args[:4])} exit {result.returncode}")
            return result

        try:
            config = json.loads(command([*compose, "config", "--format", "json"]).stdout)
            service = config["services"]["tizia"]
            ports = service.get("ports") or []
            volumes = service.get("volumes") or []
            expected_env = {"NODE_ENV": "production", "PORT": "8041", "HOST": "0.0.0.0",
                            "DATA_DIR": "/data", "BASE_PATH": ""}
            kind = "critical"
            if (service.get("environment") != expected_env or service.get("env_file") or
                    service.get("secrets") or service.get("container_name") or
                    service.get("image") != f"{project}:latest" or
                    float(service.get("cpus") or 0) != 1.0 or
                    int(service.get("mem_limit") or 0) != 536870912 or
                    int(service.get("pids_limit") or 0) != 128 or
                    len(ports) != 1 or ports[0].get("target") != 8041 or
                    ports[0].get("host_ip") != "127.0.0.1" or ports[0].get("published") or
                    len(volumes) != 1 or volumes[0].get("source") != f"{project}-data" or
                    volumes[0].get("target") != "/data"):
                raise RuntimeError("Compose config không cách ly port/volume/env/image")
            kind = "transient"
            command([*compose, "up", "--build", "-d", "--wait", "--wait-timeout", "120"])
            port_output = command([*compose, "port", "tizia", "8041"]).stdout.strip()
            kind = "critical"
            match = re.search(r":(\d+)\s*$", port_output)
            if not match or int(match.group(1)) == 8041:
                raise RuntimeError(f"Docker trả host port không an toàn: {port_output!r}")
            port = int(match.group(1))

            kind = "transient"
            env_output = command([*compose, "exec", "-T", "tizia", "env"], log_output=False).stdout
            kind = "critical"
            container_env = dict(line.split("=", 1) for line in env_output.splitlines() if "=" in line)
            leaked = sorted(name for name, value in container_env.items()
                            if value and (name in _REQUIRED_ABSENT or _SECRET_NAME.search(name)))
            if leaked:
                raise RuntimeError(f"container có biến bí mật: {', '.join(leaked)}")
            logs.append("Container env: 5 biến ứng dụng cho phép; các key/secret/token đều vắng mặt hoặc rỗng.")
            kind = "ordinary"

            test_files = sorted({item.get("test_file") for item in state.get("diffs") or []
                                 if item.get("test_file")})
            if not test_files:
                raise RuntimeError("không có generated test để chạy")
            for test_file in test_files:
                parent = str(Path("/app", test_file).parent).replace("\\", "/")
                command([*compose, "exec", "-T", "tizia", "mkdir", "-p", parent])
                command([*compose, "cp", test_file, f"tizia:/app/{test_file}"])
            try:
                command([*compose, "exec", "-T", "tizia", "node", "--test",
                         *(f"/app/{test_file}" for test_file in test_files)], timeout=60)
            except subprocess.TimeoutExpired as exc:
                raise RuntimeError("generated tests timed out") from exc
            except RuntimeError as exc:
                raise RuntimeError("generated tests failed") from exc
            logs.append(f"Generated tests passed: {', '.join(test_files)}")

            base = f"http://127.0.0.1:{port}"
            env = os.environ.copy()
            env["BASE"] = base
            # Use the harness owner's script, not a possibly modified copy in the proposal checkout.
            smoke = command([_bash(), SMOKE_SCRIPT.as_posix()], env=env)
            smoke_ok = smoke.returncode == 0

            pages = _visual_pages(state.get("diffs") or [])
            if pages:
                for page in pages:
                    status, body = http_probe(base + page)
                    if not 200 <= status < 300:
                        smoke_ok = False
                        raise RuntimeError(f"changed page returned HTTP {status}: {page}")
                    # The server injects analytics/SEO tags into every HTML page, so compare the
                    # candidate's own lines, not bytes: each must be served.
                    served = body.decode("utf-8", "replace")
                    if any(line not in served for line in _expected_lines(state, checkout, page)):
                        smoke_ok = False
                        raise RuntimeError(f"changed page body does not match checkout: {page}")
                    logs.append(f"Changed page HTTP {status}: {page}")
                http_observed = True
                screenshot = Path(tempfile.mkdtemp(prefix=f"{project}-artifact-")) / "screenshot.png"
                try:
                    capture_screenshot(base + pages[0], screenshot)
                    logs.append(f"Screenshot: {screenshot}")
                except Exception as exc:  # D0: UI changes require a screenshot; absent browser = environment
                    shutil.rmtree(screenshot.parent, ignore_errors=True)
                    screenshot = None
                    kind = "transient"
                    raise RuntimeError(f"thiếu screenshot bắt buộc cho thay đổi UI: {exc}") from exc
        except (OSError, RuntimeError, ValueError, KeyError, TypeError) as exc:
            reason = str(exc)
        finally:
            try:
                command([*compose, "down", "-v"])
            except (OSError, RuntimeError) as exc:
                reason = f"{reason or 'verify'}; teardown thất bại: {exc}"
                kind = "transient"  # leaked containers are the environment's problem, not the candidate's

    evidence = {"text": "Smoke scripts/smoke-user-state.sh: một luồng user-state, không bao phủ toàn ứng dụng.\n"
                        + "\n".join(logs), "smoke_passed": smoke_ok, "http_observed": http_observed,
                "screenshot": str(screenshot) if screenshot else None}
    state["evidence"] = evidence
    return {"gate": 5, "blocked": bool(reason), "reason": reason, "evidence": evidence,
            "failure_class": kind if reason else None}
