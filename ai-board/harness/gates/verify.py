"""Gate 5: run one user-state smoke flow in an isolated Docker Compose project."""
from __future__ import annotations

import ipaddress
import json
import os
import re
import shutil
import subprocess
import tempfile
import urllib.request
from pathlib import Path
from typing import Callable
from urllib.parse import urlsplit

from gates import visual
from meter import redact

_SECRET_NAME = re.compile(r"(?:SECRET|TOKEN|PASSWORD|API_KEY|SECKEY|PRIVATE_KEY)", re.I)
_REQUIRED_ABSENT = {"SCOREUP_API_KEY", "CODELAB_API_KEY", "GA_API_SECRET",
                    "OLLAMA_SECKEY", "AI_BOARD_KEY"}
SMOKE_SCRIPT = Path(__file__).resolve().parents[3] / "scripts" / "smoke-user-state.sh"


def _internal() -> bool:
    """AI_BOARD_VERIFY_NETWORK=internal: worker runs Docker-in-Docker, so the candidate gets a network
    with no egress and is reached on its container IP. Default publishes to 127.0.0.1 (local Docker Desktop)."""
    return os.getenv("AI_BOARD_VERIFY_NETWORK", "published") == "internal"


def _override(project: str) -> str:
    """!override replaces Compose lists; ordinary merge would retain prod port/volume."""
    volume = f"{project}-data"
    ports = "ports: !reset []" if _internal() else 'ports: !override\n      - "127.0.0.1::8041"'
    network = f"""networks:
  default:
    name: {project}-net
    internal: true
""" if _internal() else ""
    return f"""services:
  tizia:
    container_name: !reset null
    image: {project}:latest
    restart: "no"
    # ponytail: candidate inherits worker's 2 CPU/4 GB/512 PID ceiling; restore nested limits when DinD cgroup v2 works.
    {ports}
    volumes: !override
      - {volume}:/data
    environment: !override
      NODE_ENV: production
      PORT: "8041"
      HOST: 0.0.0.0
      DATA_DIR: /data
      BASE_PATH: ""
{network}volumes:
  pharmacysim-data: !reset null
  {volume}:
    name: {volume}
"""


_ESCAPE_KEYS = ("privileged", "network_mode", "pid", "ipc", "userns_mode", "cgroup_parent", "devices", "cap_add", "security_opt", "sysctls")


def _escape_hatch(config: dict) -> str | None:
    """First `service.setting` in any service that reaches past the app container (host namespaces, devices, bind mounts)."""
    for name, service in (config.get("services") or {}).items():
        for key in _ESCAPE_KEYS:
            if service.get(key):
                return f"{name}.{key}"
        if any(volume.get("type") == "bind" for volume in service.get("volumes") or []):
            return f"{name}.bind mount"
    return None


def _bash() -> str:
    """Git Bash on Windows. Bare "bash" lets CreateProcess pick System32's WSL bash first."""
    if os.name == "nt":
        git = shutil.which("git")
        if git:  # Git/cmd/git.exe or Git/mingw64/bin/git.exe -> Git/bin/bash.exe
            for parent in Path(git).resolve().parents:
                if (parent / "bin" / "bash.exe").exists():
                    return str(parent / "bin" / "bash.exe")
    return shutil.which("bash") or "bash"


def _public_paths(diffs: list[dict]) -> list[str]:
    """URL path of every changed file under public/ (HTML, CSS, JS, data), in diff order."""
    return list(dict.fromkeys(
        "/" + path.removeprefix("public/")
        for item in diffs
        if (path := item.get("file", "").replace("\\", "/")).startswith("public/")
    ))


_REQUEST_PAGE = re.compile(r"^\[Trang: .*\] (\S+)\s*$")


def _request_page(detail: str | None) -> str | None:
    """Internal path from the requester's `[Trang: …] /path` line; None for anything else.
    The request text is untrusted: '//host' or a scheme would point the browser off the isolated container."""
    match = _REQUEST_PAGE.match((detail or "").split("\n", 1)[0].strip())
    path = match.group(1) if match else ""
    if not path.startswith("/") or path.startswith("//") or "\\" in path:
        return None
    return path


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


class ScreenshotTargetError(RuntimeError):
    """Capture landed on another page (auth redirect) or an error status — not evidence of the change."""


def check_landing(requested: str, landed: str, status: int | None) -> None:
    """Raise ScreenshotTargetError unless landed on the requested path with a 2xx/3xx final status."""
    if status is None or status >= 400:
        raise ScreenshotTargetError(f"trang chụp trả HTTP {status}: {urlsplit(requested).path}")
    if urlsplit(landed).path != urlsplit(requested).path:
        raise ScreenshotTargetError(f"trang chụp bị chuyển hướng sang {urlsplit(landed).path}")


def _launch(playwright):
    """Chromium đi kèm Playwright; thiếu bản đúng phiên bản (chưa `playwright install`) thì dùng Chrome/Edge
    đã cài trên máy worker. Không có trình duyệt nào → raise lỗi gốc."""
    try:
        return playwright.chromium.launch(headless=True)
    except Exception as missing:
        if "Executable doesn't exist" not in str(missing):
            raise
        for channel in ("chrome", "msedge"):
            try:
                return playwright.chromium.launch(headless=True, channel=channel)
            except Exception:
                continue
        raise


SHOT_WIDTHS = (375, 1280)  # điện thoại, máy tính
MAX_SHOT_PAGES = 2         # ≤ 2 trang × 2 khổ × (trước, sau) = 8 ảnh
MAX_SHOT_HEIGHT = 2000     # cắt trang dài: PNG vừa trần upload của server


def capture_screenshot(url: str, path: Path, width: int = 1280, *, selectors: list[str] = (), token: str | None = None) -> dict:
    """Một lần chụp Chromium + đo cổng ảnh trên cùng trang đó, như khách hoặc (có token) như học viên đăng nhập. Trả kết quả visual.audit."""
    from playwright.sync_api import sync_playwright

    with sync_playwright() as playwright:
        browser = _launch(playwright)
        try:
            context = browser.new_context(viewport={"width": width, "height": 812 if width < 768 else 800})
            if token:
                context.add_cookies([{"name": "tizia_sid", "value": token, "url": url, "httpOnly": True}])
            page = context.new_page()
            response = page.goto(url, wait_until="domcontentloaded", timeout=15000)
            check_landing(url, page.url, response.status if response else None)
            visual.settle(page)
            height = min(max(int(page.evaluate("document.documentElement.scrollHeight") or 1), 1), MAX_SHOT_HEIGHT)
            page.screenshot(path=str(path), full_page=True, clip={"x": 0, "y": 0, "width": width, "height": height})
            return visual.audit(page, list(selectors))
        finally:
            browser.close()


def _loader_pages(checkout: Path, assets: list[str], depth: int = 3) -> list[str]:
    """Trang HTML nạp file JS/CSS đã đổi (link/script trực tiếp hoặc qua import, ≤ depth bước), gần trước rồi theo tên.
    ponytail: quét lại public/ mỗi lần (~600 file, dưới 1 s); dùng code_index.json lưu sẵn nếu chậm."""
    import code_index

    owners: dict[str, set[str]] = {}
    for file in sorted((checkout / "public").rglob("*")):
        rel = file.relative_to(checkout).as_posix()
        if file.suffix not in (".html", ".js", ".mjs") or not file.is_file() or file.stat().st_size > code_index.MAX_BYTES:
            continue
        entry = code_index.parse(rel, file.read_text(encoding="utf-8", errors="replace"))
        links = entry.get("links") or {}
        for target in [*links.get("css", []), *links.get("js", []), *entry.get("imports", [])]:
            owners.setdefault(target, set()).add(rel)
    found, frontier, seen = [], list(assets), set(assets)
    for _ in range(depth):
        nxt = []
        for owner in sorted({o for target in frontier for o in owners.get(target, ())} - seen):
            seen.add(owner)
            (found if owner.endswith(".html") else nxt).append(owner)
        frontier = nxt
    return found


def _shot_pages(checkout: Path, pages: list[str], primary: str | None) -> list[str]:
    """Trang chụp: HTML trong diff; không có thì trang người gửi đang xem + trang nạp JS/CSS đổi."""
    html = [page for page in pages if page.endswith(".html")]
    if html:
        return html[:MAX_SHOT_PAGES]
    loaders = ["/" + p.removeprefix("public/") for p in _loader_pages(checkout, ["public" + p for p in pages])]
    return list(dict.fromkeys([*([primary] if primary else []), *loaders]))[:MAX_SHOT_PAGES]


def _restore_base(state: dict, checkout: Path, pages: list[str], cp: Callable[[Path, str], None]) -> set[str] | None:
    """Chép bản base của file public đã đổi vào container đang chạy (server đọc file mỗi request) để chụp BEFORE
    không phải build base. Trả file mới ở candidate (base không có → không chụp BEFORE); None = không biết base.
    ponytail: file mới vẫn nằm trong container; trang base không trỏ tới nên không ảnh hưởng ảnh."""
    import code_index

    base_sha = state.get("base_sha")
    if not base_sha:
        return None
    base_dir = state.get("base_pages_dir")  # sandbox run: the worker staged base pages, the upload has no .git
    new: set[str] = set()
    with tempfile.TemporaryDirectory(prefix="ai-verify-base-") as temp:
        for index, page in enumerate(pages):
            try:
                blob = (Path(base_dir) / page.lstrip("/")).read_bytes() if base_dir else code_index.git(checkout, "show", f"{base_sha}:public{page}")
            except OSError:
                new.add(page)
                continue
            local = Path(temp) / str(index)
            local.write_bytes(blob)
            cp(local, f"/app/public{page}")
    return new


def _capture_all(base: str, shot_pages: list[str], primary: str | None, restore: Callable[[], set[str] | None],
                 logs: list[str], selectors: list[str] = (), token: str | None = None) -> list[dict]:
    """AFTER rồi BEFORE, mỗi trang × SHOT_WIDTHS. Ảnh AFTER của trang chính bắt buộc: lỗi → raise lỗi gốc.
    Ảnh khác lỗi (trang cần đăng nhập, base hỏng) chỉ ghi log."""
    shot_dir = Path(tempfile.mkdtemp(prefix="ai-verify-shots-"))
    shots: list[dict] = []
    for phase in ("after", "before"):
        targets = shot_pages
        if phase == "before":
            try:
                new = restore()
            except (OSError, RuntimeError) as exc:
                logs.append(f"Bỏ ảnh BEFORE: {exc}")
                break
            if new is None:
                logs.append("Bỏ ảnh BEFORE: không biết commit base")
                break
            targets = [page for page in shot_pages if page.split("?")[0] not in new]
        for page in targets:
            for width in SHOT_WIDTHS:
                path = shot_dir / f"{phase}-{len(shots)}-{width}.png"
                try:
                    audit = capture_screenshot(base + page, path, width, selectors=selectors, token=token)
                except Exception as exc:
                    if phase == "after" and page == primary:
                        shutil.rmtree(shot_dir, ignore_errors=True)
                        raise
                    logs.append(f"Bỏ ảnh {phase} {page} {width}px: {exc}")
                    continue
                shots.append({"phase": phase, "page": page, "width": width, "path": str(path),
                              **({"audit": audit} if isinstance(audit, dict) else {})})
                logs.append(f"Screenshot {phase} {page} {width}px: {path}")
    return shots


def visual_regressions(shots: list[dict]) -> list[str]:
    """So ảnh AFTER với BEFORE cùng trang + khổ; chỉ lỗi mới. Không đo được (ảnh không có audit) → bỏ qua."""
    before = {(s["page"], s["width"]): s.get("audit") for s in shots if s["phase"] == "before"}
    out = []
    for shot in shots:
        if shot["phase"] == "after" and shot.get("audit"):
            out += [f"{shot['page']} {shot['width']}px: {issue}"
                    for issue in visual.regressions(before.get((shot["page"], shot["width"])), shot["audit"])]
    return out


def probe_http(url: str) -> tuple[int, bytes]:
    with urllib.request.urlopen(url, timeout=15) as response:
        return response.status, response.read()


def run(state: dict, deps=None, budget=None, *, checkout_dir: str | Path | None = None,
        runner=None, http_probe=None, functional_probe=None) -> dict:
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
    pages = _public_paths(state.get("diffs") or [])
    if not pages:
        # Nothing the isolated server serves can show the change; a repair cannot fix that, the plan must.
        return {"gate": 5, "blocked": True, "reason": "thay đổi không chạm file public nào để quan sát qua HTTP",
                "evidence": None, "failure_class": "plan"}
    html = [page for page in pages if page.endswith(".html")]
    # Trang chính: ảnh AFTER bắt buộc (D0). Các trang/khổ/ảnh BEFORE khác là best-effort.
    primary = html[0] if html else _request_page(state.get("request_detail"))
    shots: list[dict] = []
    runner_name = "fake" if runner else "docker"  # injected runner = test double, never real evidence
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
    import functional
    probe_id = functional.select(state)
    functional_result = {'probe_id': probe_id, 'passed': False, 'reason': 'Behavior has not been verified'}

    with tempfile.TemporaryDirectory(prefix="ai-verify-compose-") as temp:
        override = Path(temp) / "override.yml"
        override.write_text(_override(project), encoding="utf-8")
        compose = ["docker", "compose", "-p", project, "-f", str(checkout / "docker-compose.yml"),
                   "-f", str(override)]

        def command(args: list[str], *, env=None, log_output=True, timeout=None) -> subprocess.CompletedProcess:
            result = runner(args, cwd=checkout, env=env, text=True, encoding="utf-8", errors="replace", capture_output=True,
                            stdin=subprocess.DEVNULL, check=False, timeout=timeout)
            output = "[output redacted]"
            if log_output:
                output = f"{result.stdout or ''}{result.stderr or ''}"
                output = (redact(output).strip()[-4000:] or "(không có chi tiết lỗi)") if result.returncode else f"exit {result.returncode}"
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
            if escape := _escape_hatch(config):
                raise RuntimeError(f"Compose config mở đường ra ngoài cách ly: {escape}")
            internal = _internal()
            network = (config.get("networks") or {}).get("default") or {}
            isolated_net = (not ports and network.get("internal") is True if internal else
                            len(ports) == 1 and ports[0].get("target") == 8041 and
                            ports[0].get("host_ip") == "127.0.0.1" and not ports[0].get("published"))
            if (service.get("environment") != expected_env or service.get("env_file") or
                    service.get("secrets") or service.get("container_name") or
                    service.get("image") != f"{project}:latest" or
                    not isolated_net or
                    len(volumes) != 1 or volumes[0].get("source") != f"{project}-data" or
                    volumes[0].get("target") != "/data"):
                raise RuntimeError("Compose config không cách ly port/network/volume/env/image")
            kind = "transient"
            command([*compose, "up", "--build", "-d", "--wait", "--wait-timeout", "120"])
            if internal:
                # Address from the daemon, not from inside the candidate container.
                cid = command([*compose, "ps", "-q", "tizia"]).stdout.strip()
                ip_output = command(["docker", "inspect", "-f",
                                     "{{range .NetworkSettings.Networks}}{{.IPAddress}} {{end}}", cid]).stdout
                kind = "critical"
                try:
                    ip = ipaddress.ip_address((ip_output.split() or [""])[0])
                except ValueError:
                    ip = None
                if ip is None or not ip.is_private or ip.is_loopback:
                    raise RuntimeError(f"Docker trả địa chỉ container không an toàn: {ip_output.strip()!r}")
                base = f"http://{ip}:8041"
            else:
                port_output = command([*compose, "port", "tizia", "8041"]).stdout.strip()
                kind = "critical"
                match = re.search(r":(\d+)\s*$", port_output)
                if not match or int(match.group(1)) == 8041:
                    raise RuntimeError(f"Docker trả host port không an toàn: {port_output!r}")
                base = f"http://127.0.0.1:{int(match.group(1))}"

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
            if not test_files and not probe_id:
                raise RuntimeError("không có generated test để chạy")
            if not test_files:
                logs.append(f"No generated test (advisory: the harness oracle '{probe_id}' decides)")
            for test_file in test_files:
                parent = str(Path("/app", test_file).parent).replace("\\", "/")
                command([*compose, "exec", "-T", "tizia", "mkdir", "-p", parent])
                command([*compose, "cp", test_file, f"tizia:/app/{test_file}"])
            try:
                if test_files:  # `node --test` with no file would run the whole suite
                    command([*compose, "exec", "-T", "tizia", "node", "--test",
                             *(f"/app/{test_file}" for test_file in test_files)], timeout=60)
            except (subprocess.TimeoutExpired, RuntimeError) as exc:
                failure = "generated tests timed out" if isinstance(exc, subprocess.TimeoutExpired) else "generated tests failed"
                if not probe_id:
                    raise RuntimeError(failure) from exc
                # A harness oracle judges this request; a model-written test is supplementary and often mangles quotes/escapes.
                logs.append(f"{failure} (advisory: the harness oracle '{probe_id}' decides): {', '.join(test_files)}")
            else:
                if test_files:
                    logs.append(f"Generated tests passed: {', '.join(test_files)}")

            env = os.environ.copy()
            env["BASE"] = base
            # Use the harness owner's script, not a possibly modified copy in the proposal checkout.
            smoke = command([_bash(), SMOKE_SCRIPT.as_posix()], env=env)
            smoke_ok = smoke.returncode == 0

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
            kind = 'plan'
            def fixture(stage):
                if stage in ('seed', 'thread', 'session'):
                    command([*compose, 'cp', str(Path(functional.__file__).with_name('queue_fixture.mjs')), 'tizia:/app/verify-queue.mjs'])
                response = command([*compose, 'exec', '-T', 'tizia', 'node', '/app/verify-queue.mjs', stage], log_output=False, timeout=20)
                return json.loads(response.stdout) if stage in ('seed', 'thread', 'session') else None
            observed_pages = html or ([primary] if primary else [])
            functional_result = (functional_probe(base, probe_id) if functional_probe
                                 else functional.run(base, probe_id, fixture, state=state, pages=observed_pages))
            logs.append('Independent functional check: ' + json.dumps(functional_result, ensure_ascii=False))
            if not functional_result.get('passed'):
                raise RuntimeError(functional_result.get('reason') or 'Independent functional check failed')
            kind = 'ordinary'
            # Changed HTML page, else the page the requester was on (CSS/JS change); none named = no shot.
            shot_pages = _shot_pages(checkout, pages, primary)
            if shot_pages:
                def cp(local: Path, target: str) -> None:
                    command([*compose, "cp", str(local), f"tizia:{target}"])

                try:
                    try:
                        shot_token = fixture('session')['token']
                    except (OSError, RuntimeError, ValueError, KeyError, TypeError, subprocess.TimeoutExpired) as exc:
                        shot_token = None
                        logs.append(f"Ảnh chụp như khách (không lấy được phiên học viên): {exc}")
                    shots = _capture_all(base, shot_pages, primary,
                                         lambda: _restore_base(state, checkout, pages, cp), logs,
                                         visual.changed_selectors(state.get("full_diff")), shot_token)
                except Exception as exc:  # D0: UI evidence is mandatory; absent browser = environment
                    # Wrong landing page is not fixed by a retry or a repair; admin decides.
                    kind = "plan" if isinstance(exc, ScreenshotTargetError) else "transient"
                    raise RuntimeError(f"thiếu screenshot bắt buộc cho thay đổi UI: {exc}") from exc
                screenshot = next((s["path"] for s in shots
                                   if s["phase"] == "after" and s["page"] == primary and s["width"] == 1280), None)
                visual_issues = visual_regressions(shots)
                logs += [f"Cổng ảnh: {issue}" for issue in visual_issues] or ["Cổng ảnh: không có lỗi hiển thị mới."]
                if visual_issues:  # bản sau tệ hơn bản trước: sửa được bằng lượt sửa, như test hỏng
                    raise RuntimeError("giao diện tệ hơn bản trước — " + " | ".join(visual_issues))
        except (OSError, RuntimeError, ValueError, KeyError, TypeError) as exc:
            reason = str(exc)
        finally:
            try:
                command([*compose, "down", "-v"])
            except (OSError, RuntimeError) as exc:
                reason = f"{reason or 'verify'}; teardown thất bại: {exc}"
                kind = "transient"  # leaked containers are the environment's problem, not the candidate's

    evidence = {"text": "Smoke scripts/smoke-user-state.sh: một luồng user-state, không bao phủ toàn ứng dụng.\n"
                        + "\n".join(logs), "smoke_passed": smoke_ok, "http_observed": http_observed, "runner": runner_name,
                "screenshot": str(screenshot) if screenshot else None, "screenshots": shots,
                "functional": functional_result}
    state["evidence"] = evidence
    return {"gate": 5, "blocked": bool(reason), "reason": reason, "evidence": evidence,
            "failure_class": kind if reason else None}
