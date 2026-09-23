"""Gate 5: run one user-state smoke flow in an isolated Docker Compose project."""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

_SECRET_NAME = re.compile(r"(?:SECRET|TOKEN|PASSWORD|API_KEY|SECKEY|PRIVATE_KEY)", re.I)
_REQUIRED_ABSENT = {"SCOREUP_API_KEY", "CODELAB_API_KEY", "GA_API_SECRET",
                    "OLLAMA_SECKEY", "AI_BOARD_KEY"}
_STYLE = re.compile(r"(?:\.css$|\bstyle\s*[:=.]|\bcss\b)", re.I)
SMOKE_SCRIPT = Path(__file__).resolve().parents[3] / "scripts" / "smoke-user-state.sh"


def _override(project: str) -> str:
    """!override replaces Compose lists; ordinary merge would retain prod port/volume."""
    volume = f"{project}-data"
    return f"""services:
  tizia:
    container_name: !reset null
    image: {project}:latest
    restart: "no"
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
    if os.name == "nt":
        git = shutil.which("git")
        if git:
            bash = Path(git).resolve().parent.parent / "bin" / "bash.exe"
            if bash.exists():
                return str(bash)
    return "bash"


def _visual_page(diffs: list[dict]) -> str | None:
    for item in diffs:
        path = item.get("file", "").replace("\\", "/")
        if path.startswith("public/") and path.endswith(".html"):
            return "/" + path.removeprefix("public/")
    if any(_STYLE.search(d.get("file", "")) or
           any(_STYLE.search(line[1:]) for line in d.get("diff", "").splitlines()
               if line.startswith("+") and not line.startswith("+++")) for d in diffs):
        return "/"
    return None


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


def run(state: dict, deps=None, budget=None, *, checkout_dir: str | Path | None = None,
        runner=None) -> dict:
    """Caller supplies a full checkout; a gate-3 scratch repo is never buildable."""
    checkout = checkout_dir if checkout_dir is not None else state.get("full_checkout")
    if not checkout:
        return {"gate": 5, "blocked": True, "reason": "thiếu full_checkout cho Docker verify", "evidence": None}
    checkout = Path(checkout)
    if not (checkout / "docker-compose.yml").is_file() or not (checkout / "Dockerfile").is_file():
        return {"gate": 5, "blocked": True, "reason": "full_checkout thiếu Dockerfile/docker-compose.yml", "evidence": None}

    skill_id = re.sub(r"[^a-z0-9-]+", "-", str(state.get("skill_id") or "").lower()).strip("-")
    if not skill_id:
        return {"gate": 5, "blocked": True, "reason": "thiếu skill_id cho Docker verify", "evidence": None}
    project = f"ai-verify-{skill_id}"
    runner = runner or subprocess.run
    logs: list[str] = []
    reason = None
    screenshot = None
    smoke_ok = False

    with tempfile.TemporaryDirectory(prefix="ai-verify-compose-") as temp:
        override = Path(temp) / "override.yml"
        override.write_text(_override(project), encoding="utf-8")
        compose = ["docker", "compose", "-p", project, "-f", str(checkout / "docker-compose.yml"),
                   "-f", str(override)]

        def command(args: list[str], *, env=None, log_output=True) -> subprocess.CompletedProcess:
            result = runner(args, cwd=checkout, env=env, text=True, encoding="utf-8", errors="replace", capture_output=True,
                            stdin=subprocess.DEVNULL, check=False)
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
            if (service.get("environment") != expected_env or service.get("env_file") or
                    service.get("secrets") or service.get("container_name") or
                    service.get("image") != f"{project}:latest" or
                    len(ports) != 1 or ports[0].get("target") != 8041 or
                    ports[0].get("host_ip") != "127.0.0.1" or ports[0].get("published") or
                    len(volumes) != 1 or volumes[0].get("source") != f"{project}-data" or
                    volumes[0].get("target") != "/data"):
                raise RuntimeError("Compose config không cách ly port/volume/env/image")
            command([*compose, "up", "--build", "-d", "--wait", "--wait-timeout", "120"])
            port_output = command([*compose, "port", "tizia", "8041"]).stdout.strip()
            match = re.search(r":(\d+)\s*$", port_output)
            if not match or int(match.group(1)) == 8041:
                raise RuntimeError(f"Docker trả host port không an toàn: {port_output!r}")
            port = int(match.group(1))

            env_output = command([*compose, "exec", "-T", "tizia", "env"], log_output=False).stdout
            container_env = dict(line.split("=", 1) for line in env_output.splitlines() if "=" in line)
            leaked = sorted(name for name, value in container_env.items()
                            if value and (name in _REQUIRED_ABSENT or _SECRET_NAME.search(name)))
            if leaked:
                raise RuntimeError(f"container có biến bí mật: {', '.join(leaked)}")
            logs.append("Container env: 5 biến ứng dụng cho phép; các key/secret/token đều vắng mặt hoặc rỗng.")

            base = f"http://127.0.0.1:{port}"
            env = os.environ.copy()
            env["BASE"] = base
            # Use the harness owner's script, not a possibly modified copy in the proposal checkout.
            smoke = command([_bash(), str(SMOKE_SCRIPT)], env=env)
            smoke_ok = smoke.returncode == 0

            page = _visual_page(state.get("diffs") or [])
            if page:
                screenshot = Path(tempfile.mkdtemp(prefix=f"{project}-artifact-")) / "screenshot.png"
                try:
                    capture_screenshot(base + page, screenshot)
                    logs.append(f"Screenshot: {screenshot}")
                except Exception as exc:  # best effort, including Playwright/browser absence
                    logs.append(f"Screenshot bỏ qua: {exc}")
                    shutil.rmtree(screenshot.parent, ignore_errors=True)
                    screenshot = None
        except (OSError, RuntimeError, ValueError, KeyError, TypeError) as exc:
            reason = str(exc)
        finally:
            try:
                command([*compose, "down", "-v"])
            except (OSError, RuntimeError) as exc:
                reason = f"{reason or 'verify'}; teardown thất bại: {exc}"

    evidence = {"text": "Smoke scripts/smoke-user-state.sh: một luồng user-state, không bao phủ toàn ứng dụng.\n"
                        + "\n".join(logs), "smoke_passed": smoke_ok, "screenshot": str(screenshot) if screenshot else None}
    state["evidence"] = evidence
    return {"gate": 5, "blocked": bool(reason), "reason": reason, "evidence": evidence}
