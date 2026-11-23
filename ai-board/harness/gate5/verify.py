"""Gate 5: run one user-state smoke flow in an isolated Docker Compose project."""
from __future__ import annotations

import ipaddress
import hashlib
import json
import os
import re
import shutil
import subprocess
import tempfile
import time
import unicodedata
import uuid
import secrets
import urllib.request
from contextlib import ExitStack, contextmanager, nullcontext
from pathlib import Path
from typing import Callable
from urllib.parse import urlsplit

from gates import vision_advisory
from gate5 import visual
from gate5.session import STAGE_CLASS, Compose, failure_class, missing_tool
from gate5 import functional, style
from gate5.guest_inputs import ensure as ensure_guest_inputs, guest_input, missing as missing_guest_inputs
from runtime import limits
from runtime.budgets.meter import redact
from settings import get_settings
from gate5 import check_registry, checks as gate_checks
from repositories import server_hsm

_SECRET_NAME = re.compile(r"(?:SECRET|TOKEN|PASSWORD|API_KEY|SECKEY|PRIVATE_KEY)", re.I)
_REQUIRED_ABSENT = {"SCOREUP_API_KEY", "CODELAB_API_KEY", "GA_API_SECRET",
                    "OLLAMA_SECKEY", "AI_BOARD_KEY"}
SMOKE_SCRIPT = Path(__file__).resolve().parents[3] / "scripts" / "smoke-user-state.sh"
CA_DIR = Path('/usr/local/share/ca-certificates')


def acceptance_commands(state: dict) -> list[str]:
    """Lệnh acceptance cấp feature của plan, chỉ những lệnh chạy được (cổng 1 đã bắt buộc với plan nhiều lớp)."""
    from gates.brainstorm import is_runnable
    items = guest_input(state, "acceptance") or []
    return [str(item).strip() for item in items if isinstance(item, str) and is_runnable(item)]


_GREP_LITERAL = re.compile(r"""(\b[ef]?grep(?:\s+(?:-[A-Za-z]+|--))*)\s+(?:'([^']*)'|"([^"]*)")""")


def _nfd_forms(match: re.Match) -> tuple[str, str] | None:
    """(NFC, NFD) of a non-ASCII grep literal; None when it is ASCII or the shell would rewrite it."""
    literal = match.group(2) if match.group(2) is not None else match.group(3)
    if match.group(2) is None and re.search(r"[$`\\!]", literal):
        return None
    if literal.isascii():
        return None
    nfc, nfd = unicodedata.normalize("NFC", literal), unicodedata.normalize("NFD", literal)
    if "'" in nfc or "'" in nfd:
        return None
    return nfc, nfd


def expand_nfd_literals(item: str) -> str:
    """Rewrite grep '<non-ASCII>' to match its NFC and NFD forms; other commands unchanged."""
    # ponytail: quoted grep/egrep/fgrep patterns only; mixed-form page text still byte-matches.
    def swap(match: re.Match) -> str:
        forms = _nfd_forms(match)
        if forms is None:
            return match.group(0)
        flags = re.sub(r"\s+(?:--|-e)$", "", match.group(1))
        return f"{flags} -e '{forms[0]}' -e '{forms[1]}'"
    return _GREP_LITERAL.sub(swap, item)


def unnormalized_literals(item: str) -> list[str]:
    """Non-ASCII grep literals expand_nfd_literals leaves byte-matched (shell expansion, apostrophe)."""
    found = []
    for match in _GREP_LITERAL.finditer(item):
        literal = match.group(2) if match.group(2) is not None else match.group(3)
        if not literal.isascii() and _nfd_forms(match) is None:
            found.append(literal)
    return found


def oracle_defers(state: dict, acceptance: list[str], generated_ok: bool, smoke_ok: bool, result: dict) -> bool:
    """Oracle verdict (not an infra error) loses to green evidence: user-stated acceptance ran and passed, generated tests and smoke passed."""
    request = f"{guest_input(state, 'request_title') or ''} {guest_input(state, 'request_detail') or ''}"
    stated = [item for item in acceptance if item in request]
    return bool(stated and generated_ok and smoke_ok and result.get("probe_id") and result.get("observations"))


def no_oracle_review(generated_ok: bool, smoke_ok: bool, result: dict, tests_absent_ok: bool = False) -> bool:
    """No harness oracle exists: green evidence keeps the change for an admin, never an automatic pass.
    The plan's acceptance commands cannot be unfinished here: a failing one already raised."""
    return bool((generated_ok or tests_absent_ok) and smoke_ok and not result.get("probe_id")
                and result.get("reason") == functional.NO_ORACLE)


def text_report(oracle: dict, proven: bool) -> dict:
    """Checks decide, the text oracle only reports. Shape stays inside the server verdict contract: a covered oracle
    result (pass or review), else the no-oracle review."""
    probe = oracle.get("probe_id")
    covered = probe in functional.ORACLES and all((oracle.get("coverage") or {}).get(flag) is True for flag in functional.ORACLES[probe])
    seen = bool(oracle.get("passed"))
    out = {**oracle, "passed": True, "oracle_passed": seen, "report_only": True}
    if covered and proven:
        return out
    if covered and seen:
        return {**out, "needs_review": True}
    return {**out, "probe_id": None, "reason": functional.NO_ORACLE, "oracle_passed": False, "needs_review": True,
            "oracle_reason": oracle.get("reason")}


def deadline_s() -> float:
    """Wall-clock cap of one gate 5 run: the node cap from the contract."""
    return float(limits.budget()["node_wall_clock_s"])


def _internal() -> bool:
    """AI_BOARD_VERIFY_NETWORK=internal: worker runs Docker-in-Docker, so the candidate gets a network
    with no egress and is reached on its container IP. Default publishes to 127.0.0.1 (local Docker Desktop)."""
    return get_settings().verify_network == "internal"


_CURL_SHIM = Path(__file__).resolve().parent / "curl-shim.sh"


def _guest_ca() -> Path | None:
    """Public interception CA supplied by Microsandbox to this guest, never from the candidate checkout."""
    for path in sorted(CA_DIR.glob('microsandbox-ca.*')):
        if path.is_file():
            body = path.read_bytes()
            if body.startswith(b'-----BEGIN CERTIFICATE-----'):
                if hashlib.sha256(body).hexdigest() != os.getenv('GATE5_CA_SHA256'):
                    raise RuntimeError('Microsandbox CA fingerprint mismatch or missing pin')
                return path
    return None


def _app_env(password: str) -> dict:
    return {"NODE_ENV": "production", "PORT": "8041", "HOST": "0.0.0.0",
            "DATA_DIR": "/data", "BASE_PATH": "",
            "DATABASE_URL": f"postgresql://gate5:{password}@postgres:5432/gate5"}


def _override(project: str, password: str | None = None, checkout: Path | None = None) -> str:
    """Owned Compose, never merge candidate services or interpolate production credentials."""
    password = password or secrets.token_hex(24)
    config = {
        "services": {
            "tizia": {"build": {"context": str((checkout or Path.cwd()).resolve())},
                      "image": f"{project}:latest", "restart": "no",
                      "depends_on": {"postgres": {"condition": "service_healthy"}},
                      "ports": [] if _internal() else ["127.0.0.1::8041"],
                      "volumes": [f"{project}-data:/data"], "environment": _app_env(password)},
            "postgres": {"image": "postgres:16-alpine", "restart": "no",
                         "environment": {"POSTGRES_USER": "gate5", "POSTGRES_DB": "gate5", "POSTGRES_PASSWORD": password},
                         "healthcheck": {"test": ["CMD-SHELL", "pg_isready -h 127.0.0.1 -U gate5 -d gate5"],
                                         "interval": "2s", "timeout": "3s", "retries": 30},
                         "volumes": [f"{project}-pg:/var/lib/postgresql/data"]}},
        "networks": {"default": {"name": f"{project}-net", "internal": True}},
        "volumes": {name: {"name": name} for name in (f"{project}-data", f"{project}-pg")}}
    if ca := _guest_ca():
        config['secrets'] = {'msb_ca': {'file': str(ca)}}
        config['services']['tizia']['build']['secrets'] = ['msb_ca']
    return json.dumps(config, indent=2)


def _validate_config(config: dict, project: str, password: str) -> None:
    """Fail closed on any resource or DSN outside this invocation."""
    if escape := _escape_hatch(config):
        raise RuntimeError(f"Compose config mở đường ra ngoài cách ly: {escape}")
    ca = _guest_ca()
    secrets = config.get('secrets') or {}
    build_secrets = ((config.get('services') or {}).get('tizia') or {}).get('build', {}).get('secrets') or []
    if ca:
        source = secrets.get('msb_ca') or {}
        if (set(secrets) != {'msb_ca'} or source.get('file') != str(ca)
                or source.get('external') or source.get('environment')
                or build_secrets != [{'source': 'msb_ca'}]):
            raise RuntimeError('Compose build CA source changed')
    elif secrets or build_secrets:
        raise RuntimeError('Compose added an untrusted build secret')
    services = config.get("services") or {}
    app, pg = services.get("tizia") or {}, services.get("postgres") or {}
    network = (config.get("networks") or {}).get("default") or {}
    ports = app.get("ports") or []
    port_ok = not ports if _internal() else (len(ports) == 1 and ports[0].get("target") == 8041
                                            and ports[0].get("host_ip") == "127.0.0.1"
                                            and not ports[0].get("published"))
    if (set(services) != {"tizia", "postgres"} or app.get("environment") != _app_env(password)
            or pg.get("environment") != {"POSTGRES_USER": "gate5", "POSTGRES_DB": "gate5", "POSTGRES_PASSWORD": password}
            or app.get("image") != f"{project}:latest" or pg.get("image") != "postgres:16-alpine"
            or pg.get("ports") or not port_ok or network.get("internal") is not True
            or network.get("name") != f"{project}-net" or network.get("external")
            or set(config.get("networks") or {}) != {"default"}
            or set(config.get("volumes") or {}) != {f"{project}-data", f"{project}-pg"}):
        raise RuntimeError("Compose config không cách ly port/network/volume/env/image/DSN")
    for name, service, target in ((f"{project}-data", app, "/data"), (f"{project}-pg", pg, "/var/lib/postgresql/data")):
        volumes = service.get("volumes") or []
        declared = config["volumes"][name]
        if (service.get("env_file") or service.get("secrets") or service.get("container_name")
                or set(service.get("networks") or {}) != {"default"}
                or len(volumes) != 1 or volumes[0].get("source") != name or volumes[0].get("target") != target
                or declared.get("name") != name or declared.get("external")):
            raise RuntimeError("Compose config không cách ly port/network/volume/env/image/DSN")


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
    text = "".join(item.get("diff", "") for item in guest_input(state, "full_diff") or [])
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
MAX_SHOT_PAGES = 3         # ≤ 3 trang; ≤ 2 trang chụp cả 2 khổ, 3 trang chỉ khổ máy tính (xem _shot_widths)
MAX_SHOT_HEIGHT = 2000     # cắt trang dài: PNG vừa trần upload của server
FOCUS_PAD = 40             # lề quanh vùng thay đổi trong ảnh cận cảnh
FOCUS_MIN = (640, 200)     # vùng cận cảnh không nhỏ hơn cỡ này (rộng, cao)
FOCUS_MAX_HEIGHT = 1200
# Phiên học viên mới: không để popup chào mừng che trang (điểm danh hằng ngày, hướng dẫn 60 giây).
QUIET_POPUPS_JS = """try {
  localStorage.setItem('tizia:daily:shown', new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10));  // ngày giờ Việt Nam, như daily-login.js
  localStorage.setItem('tizia:onboarding:v1:done', '1');
} catch (e) {}"""
# Tìm tối đa 3 phần tử đổi: theo selector, rồi theo chữ (nút lá chứa đoạn chữ đó); giữ lại trong window.__tzFocus cho FOCUS_MARK_JS.
FOCUS_RECTS_JS = """([selectors, texts]) => {
  const els = [];
  const add = (el) => {
    if (!el || els.includes(el) || els.length >= 3) return;
    const r = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    if (r.width < 2 || r.height < 2 || style.display === 'none' || style.visibility === 'hidden') return;
    els.push(el);
  };
  for (const selector of selectors) { try { add(document.querySelector(selector)); } catch (e) {} }
  const norm = (t) => t.replace(/\\s+/g, ' ').trim().toLowerCase();
  for (const text of texts) {
    const want = norm(text);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (norm(node.textContent).includes(want)) { add(node.parentElement); break; }
    }
  }
  window.__tzFocus = els;
  return els.map((el) => { const r = el.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; });
}"""
FOCUS_MARK_JS = """(on) => (window.__tzFocus || []).forEach((el) => {
  if (on) { el.dataset.tzOutline = el.style.outline; el.style.outline = '3px solid #f97316'; el.style.outlineOffset = '3px'; }
  else { el.style.outline = el.dataset.tzOutline || ''; el.style.outlineOffset = ''; delete el.dataset.tzOutline; }
})"""


def _shot_widths(page_count: int) -> tuple[int, ...]:
    """Ngân sách ảnh: ≤ 2 trang chụp điện thoại + máy tính; nhiều trang hơn thì chỉ máy tính."""
    return SHOT_WIDTHS if page_count <= 2 else SHOT_WIDTHS[-1:]


def _focus_clip(page, selectors: list[str], texts: list[str], width: int) -> dict | None:
    """Khung cận cảnh quanh phần tử đổi (hợp ≤ 3 phần tử khớp đầu tiên), kẹp trong trang; None nếu không selector/chữ nào thấy được."""
    rects = page.evaluate(FOCUS_RECTS_JS, [list(selectors), list(texts)])
    if not rects:
        return None
    left, top = min(r["x"] for r in rects), min(r["y"] for r in rects)
    right, bottom = max(r["x"] + r["w"] for r in rects), max(r["y"] + r["h"] for r in rects)
    page_height = int(page.evaluate("document.documentElement.scrollHeight") or 1)
    box_w = max(right - left + 2 * FOCUS_PAD, FOCUS_MIN[0])
    box_h = min(max(bottom - top + 2 * FOCUS_PAD, FOCUS_MIN[1]), FOCUS_MAX_HEIGHT)
    x = min(max(left - (box_w - (right - left)) / 2, 0), max(width - box_w, 0))
    y = min(max(top - (box_h - (bottom - top)) / 2, 0), max(page_height - box_h, 0))
    return {"x": x, "y": y, "width": min(box_w, width), "height": min(box_h, page_height)}


class _Browsers:
    """One Playwright + Chromium for a batch of captures, launched on first use; reset() drops a browser after a failed shot."""

    def __init__(self):
        self.stack, self.playwright, self.browser = ExitStack(), None, None

    def get(self):
        if self.browser is None or not self.browser.is_connected():
            from playwright.sync_api import sync_playwright

            if self.playwright is None:
                self.playwright = self.stack.enter_context(sync_playwright())
            self.browser = _launch(self.playwright)
        return self.browser

    def reset(self) -> None:
        browser, self.browser = self.browser, None
        if browser is not None:
            try:
                browser.close()
            except Exception:
                pass  # already dead; the next get() launches a new one

    def close(self) -> None:
        self.reset()
        self.stack.close()


def capture_screenshot(url: str, path: Path, width: int = 1280, *, selectors: list[str] = (), token: str | None = None,
                       focus: Path | None = None, focus_texts: list[str] = (), browser: Callable | None = None) -> dict:
    """Một lần chụp Chromium + đo cổng ảnh trên cùng trang đó, như khách hoặc (có token) như học viên đăng nhập. Trả kết quả visual.audit.
    `focus` + (selector hoặc chữ đổi) nhìn thấy được → thêm ảnh cận cảnh quanh phần tử đó (viền cam) ở `focus`; không thấy thì không ghi file.
    `browser`: callable trả Browser dùng chung; mỗi lần chụp vẫn một context mới. Không có thì tự mở và đóng Chromium."""
    if browser is None:
        own = _Browsers()
        try:
            return capture_screenshot(url, path, width, selectors=selectors, token=token, focus=focus, focus_texts=focus_texts,
                                      browser=own.get)
        finally:
            own.close()
    context = browser().new_context(viewport={"width": width, "height": 812 if width < 768 else 800})
    try:
        if token:
            context.add_cookies([{"name": "tizia_sid", "value": token, "url": url, "httpOnly": True}])
            context.add_init_script(QUIET_POPUPS_JS)
        page = context.new_page()
        response = page.goto(url, wait_until="domcontentloaded", timeout=15000)
        check_landing(url, page.url, response.status if response else None)
        visual.settle(page)
        height = min(max(int(page.evaluate("document.documentElement.scrollHeight") or 1), 1), MAX_SHOT_HEIGHT)
        page.screenshot(path=str(path), full_page=True, clip={"x": 0, "y": 0, "width": width, "height": height})
        audit = visual.audit(page, list(selectors))
        clip = _focus_clip(page, list(selectors), list(focus_texts), width) if focus is not None else None
        if clip:
            page.evaluate(FOCUS_MARK_JS, True)
            try:
                page.screenshot(path=str(focus), full_page=True, clip=clip)
            finally:
                page.evaluate(FOCUS_MARK_JS, False)
        return audit
    finally:
        context.close()


def _loader_pages(checkout: Path, assets: list[str], depth: int = 3) -> list[str]:
    """Trang HTML nạp file JS/CSS đã đổi (link/script trực tiếp hoặc qua import, ≤ depth bước), gần trước rồi theo tên.
    ponytail: quét lại public/ mỗi lần (~600 file, dưới 1 s); dùng code_index.json lưu sẵn nếu chậm."""
    from repositories import code_index

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
    from repositories import code_index

    base_sha = guest_input(state, "base_sha")
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


@contextmanager
def _check_span(trace, kind: str, target: str):
    """Span cho một kiểm gate 5 (kind: browser/curl/route); yield dict thuộc tính, lỗi đi nguyên ra ngoài.
    Caller ghi `tizia.gate5.check.passed` = False khi kiểm không đạt → span error; mặc định đạt."""
    attrs = {"tizia.gate5.check.kind": kind, "tizia.gate5.check.target": redact(target)}
    start = int(time.time() * 1000)
    try:
        yield attrs
    except BaseException:
        attrs["tizia.gate5.check.passed"] = False
        raise
    finally:
        if trace is not None and hasattr(trace, "add_span"):
            passed = attrs.get("tizia.gate5.check.passed", True)
            trace.add_span(f"gate5 check {kind}", attrs, start_ms=start, end_ms=int(time.time() * 1000),
                           status="ok" if passed else "error")


GUEST_PHASES = ("gate5 setup config", "gate5 setup build", "gate5 setup app_up", "gate5 setup ready",
                "gate5 step tests", "gate5 step smoke", "gate5 teardown")


@contextmanager
def _phase_span(trace, name: str):
    """Span `name` around one Gate 5 setup/teardown phase; error status when it raises."""
    start, status = int(time.time() * 1000), "ok"
    try:
        yield
    except BaseException:
        status = "error"
        raise
    finally:
        if trace is not None and hasattr(trace, "add_span"):
            trace.add_span(name, {}, start_ms=start, end_ms=int(time.time() * 1000), status=status)


def _acceptance_probe(item: str) -> str | None:
    """Curl half of `curl ... | grep ...`, so a failed check can show what the app answered; None otherwise."""
    head, sep, _ = item.partition(" | ")
    return head.strip() if sep and head.strip().startswith("curl ") else None


def _acceptance_target(item: str) -> str:
    """Đường dẫn URL đầu tiên trong lệnh acceptance (không query); không có URL thì 'acceptance'."""
    url = re.search(r"https?://[^\s'\"]+", item)
    return (urlsplit(url.group(0)).path or "/") if url else "acceptance"


def _capture_all(base: str, shot_pages: list[str], primary: str | None, restore: Callable[[], set[str] | None],
                 logs: list[str], selectors: list[str] = (), token: str | None = None, texts: dict | None = None,
                 trace=None) -> list[dict]:
    """AFTER rồi BEFORE, mỗi trang × SHOT_WIDTHS. Ảnh AFTER của trang chính bắt buộc: lỗi → raise lỗi gốc.
    Ảnh khác lỗi (trang cần đăng nhập, base hỏng) chỉ ghi log."""
    shot_dir = Path(tempfile.mkdtemp(prefix="ai-verify-shots-"))
    shots: list[dict] = []
    browsers = _Browsers()
    try:
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
                for width in _shot_widths(len(shot_pages)):
                    path = shot_dir / f"{phase}-{len(shots)}-{width}.png"
                    phase_texts = list((texts or {}).get(phase) or [])
                    focus = shot_dir / f"{phase}-{len(shots)}-{width}-focus.png" if (selectors or phase_texts) and width == SHOT_WIDTHS[-1] else None
                    try:
                        with _check_span(trace, "browser", urlsplit(base + page).path):
                            audit = capture_screenshot(base + page, path, width, selectors=selectors, token=token, browser=browsers.get,
                                                       **({"focus": focus, "focus_texts": phase_texts} if focus else {}))
                    except Exception as exc:
                        browsers.reset()  # a crashed renderer must not fail the shots after it
                        if phase == "after" and page == primary:
                            shutil.rmtree(shot_dir, ignore_errors=True)
                            raise
                        logs.append(f"Bỏ ảnh {phase} {page} {width}px: {exc}")
                        continue
                    shots.append({"phase": phase, "page": page, "width": width, "path": str(path),
                                  **({"audit": audit} if isinstance(audit, dict) else {})})
                    logs.append(f"Screenshot {phase} {page} {width}px: {path}")
                    if focus and focus.exists():
                        shots.append({"phase": phase, "page": page, "width": width, "path": str(focus), "focus": True})
                        logs.append(f"Screenshot {phase} {page} vùng thay đổi: {focus}")
    finally:
        browsers.close()
    return shots


def _soft_miss(check: str, value, detail: str) -> dict:
    from runtime import limits
    return {"gate": 5, "check": check, "value": value, "threshold": limits.quality_checks()[check]["threshold"],
            "detail": detail[:500]}


def soft_line(miss: dict) -> str:
    """One line: check value (threshold) [page width]: detail."""
    where = f" {miss['page']} {miss['width']}px" if miss.get("page") else ""
    return f"{miss['check']} {miss['value']} (ngưỡng {miss['threshold']}){where}: {miss['detail']}"


def visual_misses(shots: list[dict]) -> list[dict]:
    """Soft misses of every after shot vs its before shot (same page + width), with page and width."""
    before = {(s["page"], s["width"]): s["audit"] for s in shots if s["phase"] == "before" and s.get("audit")}
    return [{**miss, "gate": 5, "page": shot["page"], "width": shot["width"]}
            for shot in shots if shot["phase"] == "after" and shot.get("audit")
            for miss in visual.regression_misses(before.get((shot["page"], shot["width"])), shot["audit"])]


def visual_regressions(shots: list[dict]) -> list[str]:
    """So ảnh AFTER với BEFORE cùng trang + khổ; chỉ lỗi mới. Không đo được (ảnh không có audit) → bỏ qua."""
    before = {(s["page"], s["width"]): s["audit"] for s in shots if s["phase"] == "before" and s.get("audit")}  # ảnh cận cảnh không có số đo
    out = []
    for shot in shots:
        if shot["phase"] == "after" and shot.get("audit"):
            out += [f"{shot['page']} {shot['width']}px: {issue}"
                    for issue in visual.regressions(before.get((shot["page"], shot["width"])), shot["audit"])]
    return out


class LoginRequired(RuntimeError):
    """The disposable app redirected a protected student page to login."""


class CheckInfra(RuntimeError):
    """A plan check could not run (tool missing, timeout): environment, not the candidate."""


def probe_http(url: str, *, token: str | None = None) -> tuple[int, bytes]:
    request = urllib.request.Request(url)
    if token:
        request.add_unredirected_header("Cookie", "tizia_sid=" + token)
    with urllib.request.urlopen(request, timeout=15) as response:
        landing, target = urllib.parse.urlsplit(response.url), urllib.parse.urlsplit(url)
        if (landing.scheme, landing.netloc) != (target.scheme, target.netloc):
            raise RuntimeError('changed page redirected outside disposable app origin')
        if landing.path == '/login.html' and target.path != '/login.html':
            raise LoginRequired('changed page requires a disposable student session')
        return response.status, response.read()


def probe_dom(url: str, selector: str, prop: str | None) -> tuple[bool, str | None]:
    """(selector có trong DOM, giá trị computed style của prop); trình duyệt thật, chỉ gọi khi có check DOM."""
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = _launch(p)
        try:
            page = browser.new_page()
            page.goto(url, wait_until="load", timeout=15000)
            exists, value = page.evaluate("""([selector, prop]) => {
                let el = null;
                try { el = document.querySelector(selector); } catch (e) { return [false, null]; }
                if (!el) return [false, null];
                return [true, prop ? getComputedStyle(el).getPropertyValue(prop).trim() : null];
            }""", [selector, prop])
            return bool(exists), value
        finally:
            browser.close()


def _check_passes(check: dict, base: str, http_probe, dom_probe, node_ok) -> bool:
    """Một check trên bản đang được phục vụ: node_test chạy trong container, còn lại qua HTTP (+ DOM nếu cần)."""
    if check["primitive"] == "node_test":
        return node_ok(check["file"])
    url = base + check["path"]
    status, body = http_probe(url)
    dom = dom_probe(url, check["selector"], check.get("prop")) if gate_checks.needs_dom(check) else None
    return gate_checks.passed(check, status, body, dom)


def run(state: dict, *args, **kwargs):
    """Gate 5 entry: apply the shipped critical_only_checks switch for this run, then verify."""
    token = functional.GUEST_CRITICAL_ONLY.set(bool(guest_input(state, "critical_only_checks")))
    try:
        out = _run(state, *args, **kwargs)
        if isinstance(out, dict):  # WHY: lets a trace show whether a guest flag actually arrived
            out["guest_switches"] = {"critical_only": functional.tolerant_literals(),
                                     "keys": sorted(k for k in state if not k.startswith("_"))[:40]}
        return out
    finally:
        functional.GUEST_CRITICAL_ONLY.reset(token)


def _run(state: dict, deps=None, budget=None, *, checkout_dir: str | Path | None = None,
        runner=None, http_probe=None, functional_probe=None, dom_probe=None) -> dict:
    """Caller supplies a full checkout; a gate-3 scratch repo is never buildable."""
    checkout = checkout_dir if checkout_dir is not None else state.get("full_checkout")
    if not checkout:
        return {"gate": 5, "blocked": True, "reason": "thiếu full_checkout cho Docker verify", "evidence": None,
                "failure_class": STAGE_CLASS["preflight"]}
    checkout = Path(checkout)
    if not (checkout / "docker-compose.yml").is_file() or not (checkout / "Dockerfile").is_file():
        return {"gate": 5, "blocked": True, "reason": "full_checkout thiếu Dockerfile/docker-compose.yml", "evidence": None,
                "failure_class": STAGE_CLASS["preflight"]}

    ensure_guest_inputs(state)
    absent = missing_guest_inputs(state)
    if absent:
        return {"gate": 5, "blocked": True, "reason": "thiếu guest input bắt buộc: " + ", ".join(absent), "evidence": None,
                "failure_class": STAGE_CLASS["preflight"]}

    skill_id = re.sub(r"[^a-z0-9-]+", "-", str(guest_input(state, "skill_id") or "").lower()).strip("-")
    if not skill_id:
        return {"gate": 5, "blocked": True, "reason": "thiếu skill_id cho Docker verify", "evidence": None,
                "failure_class": STAGE_CLASS["preflight"]}
    plan_checks_on = guest_input(state, "checks") is not None  # WHY: guest has no AI_BOARD_* env; the host ships "checks" only when the flag is on
    if plan_checks_on and state.get("checks_pin") not in (None, gate_checks.pin(state.get("plan"))):
        return {"gate": 5, "blocked": True, "reason": "check của plan đã đổi sau khi lập plan: cần lập lại plan",
                "evidence": None, "failure_class": STAGE_CLASS["plan"]}
    pages = _public_paths(guest_input(state, "diffs") or [])
    html = [page for page in pages if page.endswith(".html")]
    # Trang chính: ảnh AFTER bắt buộc (D0). Các trang/khổ/ảnh BEFORE khác là best-effort.
    primary = html[0] if html else _request_page(guest_input(state, "request_detail"))
    observed_pages = html or ([primary] if primary else [])
    quoted_on = bool(guest_input(state, "quoted_checks"))
    classify_on = bool(guest_input(state, "red_check_classify"))
    shadow_on = bool(guest_input(state, "legacy_probe_shadow"))
    quoted = functional.quoted_checks(state, observed_pages) if quoted_on and pages else []
    registry_on = (plan_checks_on and bool(guest_input(state, "checks"))) or bool(quoted)
    if registry_on:  # registry lệch phiên bản với bản admin đã duyệt: chặn trước khi chạy check, thử lại được sau duyệt
        try:
            server_hsm.register_check_registry(check_registry.REGISTRY.data)
            server_hsm.authorize_action("run_check", check_registry=check_registry.REGISTRY.hash)
        except server_hsm.AuthorityError as error:
            return {"gate": 5, "blocked": True, "reason": str(error), "evidence": None, "failure_class": error.failure_class}
    project = f"ai-verify-{skill_id[:24]}-{uuid.uuid4().hex[:12]}"
    password = secrets.token_hex(24)
    if functional.tolerant_literals():
        state.setdefault("full_checkout", str(checkout))  # edited-route detection reads the candidate file
    server_route = not pages and functional.select_fallback(state) == functional.ROUTE_PROBE
    # Flag on: smoke, acceptance and generated tests still run; green ends at needs_review, never an automatic pass.
    unobserved = not pages and not server_route and functional.tolerant_literals()
    if not pages and not server_route and not unobserved:
        # Nothing the isolated server serves can show the change; a repair cannot fix that, the plan must.
        return {"gate": 5, "blocked": True, "reason": "thay đổi không chạm file public nào để quan sát qua HTTP",
                "evidence": None, "failure_class": STAGE_CLASS["plan"]}
    shots: list[dict] = []
    runner_name = "fake" if runner else "docker"  # injected runner = test double, never real evidence
    trace = getattr(deps, "trace", None)
    runner = runner or subprocess.run
    http_probe = http_probe or probe_http
    dom_probe = dom_probe or probe_dom
    logs: list[str] = []
    reason = None
    # Failure class by stage: before containers run = environment (transient, retried once);
    # isolation/secret checks = critical boundary violation; after = the candidate (ordinary).
    stage = "boot"
    screenshot = None
    checks_result = None
    suspects: list[str] = []
    smoke_ok = False
    http_observed = False
    soft = get_settings().soft_quality_checks
    soft_misses: list[dict] = []
    probe_id = None if unobserved else functional.ROUTE_PROBE if server_route else functional.select(state) or style.select_style(state, pages, bool(guest_input(state, "oracle_css_size"))) or functional.select_fallback(state, pages)
    functional_result = {'probe_id': probe_id, 'passed': False, 'reason': 'Behavior has not been verified'}
    teardown_confirmed = False
    legacy = shadow = None

    with tempfile.TemporaryDirectory(prefix="ai-verify-compose-") as temp:
        override = Path(temp) / "override.yml"
        override.write_text(_override(project, password, checkout), encoding="utf-8")
        empty_env = Path(temp) / "empty-env"
        empty_env.write_text("", encoding="utf-8")
        compose = ["docker", "compose", "--env-file", str(empty_env), "-p", project, "-f", str(override)]

        owned = Compose(runner, checkout, project, password, compose, logs)
        command = owned.command
        owned.deadline = time.monotonic() + deadline_s()

        try:
            with _phase_span(trace, "gate5 setup config"):
                config = json.loads(command([*compose, "config", "--format", "json"]).stdout)
                stage = "config"
                _validate_config(config, project, password)
            internal = _internal()
            stage = "boot"
            # build apart from up: separate spans for image build and start + health wait
            with _phase_span(trace, "gate5 setup build"):
                command([*compose, "build"])
            with _phase_span(trace, "gate5 setup app_up"):
                command([*compose, "up", "-d", "--no-build", "--wait", "--wait-timeout", "120"])
            with _phase_span(trace, "gate5 setup ready"):
                if internal:
                    # Address from the daemon, not from inside the candidate container.
                    cid = command([*compose, "ps", "-q", "tizia"]).stdout.strip()
                    ip_output = command(["docker", "inspect", "-f",
                                         "{{range .NetworkSettings.Networks}}{{.IPAddress}} {{end}}", cid]).stdout
                    stage = "address"
                    try:
                        ip = ipaddress.ip_address((ip_output.split() or [""])[0])
                    except ValueError:
                        ip = None
                    if ip is None or not ip.is_private or ip.is_loopback:
                        raise RuntimeError(f"Docker trả địa chỉ container không an toàn: {ip_output.strip()!r}")
                    base = f"http://{ip}:8041"
                else:
                    port_output = command([*compose, "port", "tizia", "8041"]).stdout.strip()
                    stage = "address"
                    match = re.search(r":(\d+)\s*$", port_output)
                    if not match or int(match.group(1)) == 8041:
                        raise RuntimeError(f"Docker trả host port không an toàn: {port_output!r}")
                    base = f"http://127.0.0.1:{int(match.group(1))}"

                stage = "boot"
                env_output = command([*compose, "exec", "-T", "tizia", "env"], log_output=False).stdout
                stage = "env"
                container_env = dict(line.split("=", 1) for line in env_output.splitlines() if "=" in line)
                leaked = sorted(name for name, value in container_env.items()
                                if value and (name in _REQUIRED_ABSENT or _SECRET_NAME.search(name)))
                if container_env.get("DATABASE_URL") != _app_env(password)["DATABASE_URL"]:
                    raise RuntimeError("container DATABASE_URL is not this run disposable PostgreSQL DSN")
                if leaked:
                    raise RuntimeError(f"container có biến bí mật: {', '.join(leaked)}")
                logs.append("Container env: 6 biến ứng dụng cho phép; DATABASE_URL chỉ trỏ PostgreSQL disposable; các key/secret/token đều vắng mặt hoặc rỗng.")
            stage = "ordinary"

            test_files = sorted({item.get("test_file") for item in guest_input(state, "diffs") or []
                                 if item.get("test_file")} | set(guest_input(state, "surface_tests") or []))
            review_any = get_settings().no_oracle_review_any
            if not test_files and not probe_id and not review_any:
                raise RuntimeError("không có generated test để chạy")
            if not test_files:
                logs.append(f"No generated test (advisory: the harness oracle '{probe_id}' decides)")
            with _phase_span(trace, "gate5 step tests"):
                stage = "boot"  # copying files into the container is environment, not the candidate
                for test_file in test_files:
                    parent = str(Path("/app", test_file).parent).replace("\\", "/")
                    command([*compose, "exec", "-T", "tizia", "mkdir", "-p", parent])
                    command([*compose, "cp", test_file, f"tizia:/app/{test_file}"])
                stage = "ordinary"
                generated_ok = tests_advisory = False
                try:
                    if test_files:  # `node --test` with no file would run the whole suite
                        command([*compose, "exec", "-T", "tizia", "node", "--test",
                                 *(f"/app/{test_file}" for test_file in test_files)], timeout=60)
                except (subprocess.TimeoutExpired, RuntimeError) as exc:
                    failure = "generated tests timed out" if isinstance(exc, subprocess.TimeoutExpired) else "generated tests failed"
                    detail = (logs[-1][-400:] if logs else '').replace('\n', ' ')
                    if not probe_id and not functional.tolerant_literals():
                        raise RuntimeError(f"{failure}: {detail}") from exc
                    if not probe_id:
                        # A model-written test is no oracle: red alone sends the candidate to an admin, never blocks it.
                        tests_advisory = True
                        soft_misses.append(_soft_miss("generated_tests", 1, f"{failure}: {detail}"))
                    # A harness oracle judges this request; a model-written test is supplementary and often mangles quotes/escapes.
                    logs.append(f"{failure} (advisory: the harness oracle '{probe_id}' decides): {', '.join(test_files)}")
                else:
                    if test_files:
                        generated_ok = True
                        logs.append(f"Generated tests passed: {', '.join(test_files)}")

            # Feature acceptance (LF/107): lệnh e2e của plan chạy trong container disposable trước verdict.
            acceptance = acceptance_commands(state)
            if any("curl" in item for item in acceptance):
                try:
                    command([*compose, "exec", "-T", "tizia", "which", "curl"], log_output=False)
                except RuntimeError:
                    # The offline guest's layer cache holds no curl layer; busybox wget is already in the image.
                    command([*compose, "cp", str(_CURL_SHIM), "tizia:/usr/local/bin/curl"])
                    command([*compose, "exec", "-T", "-u", "root", "tizia", "chmod", "755", "/usr/local/bin/curl"])
            def fixture(stage):
                if stage in ('seed', 'thread', 'session'):
                    command([*compose, 'cp', str(Path(__file__).resolve().parents[1] / 'queue_fixture.mjs'), 'tizia:/app/verify-queue.mjs'])
                response = command([*compose, 'exec', '-T', 'tizia', 'node', '/app/verify-queue.mjs', stage], log_output=False, timeout=20)
                return json.loads(response.stdout) if stage in ('seed', 'thread', 'session') else None
            session_env = []
            if acceptance and (token := functional._session_token(fixture)):
                # /api/* sits behind the auth gate; acceptance runs as this run's disposable student, like the route probe.
                cookie = f"tizia_sid={token}"
                command([*compose, "exec", "-T", "tizia", "sh", "-c",
                         f"mkdir -p /tmp/acc-curl && printf 'cookie = \"%s\"\n' '{cookie}' > /tmp/acc-curl/.curlrc"], log_output=False)
                session_env = ["-e", "CURL_HOME=/tmp/acc-curl", "-e", f"CURL_COOKIE={cookie}"]
            for item in acceptance:
                for literal in unnormalized_literals(item):
                    logs.append(f"Acceptance literal not NFD-normalised (shell-expanded or apostrophe), byte match only: {literal}")
                try:
                    with (_check_span(trace, "curl", _acceptance_target(item)) if "curl" in item else nullcontext()):
                        command([*compose, "exec", "-T", *session_env, "tizia", "sh", "-lc", expand_nfd_literals(item)], timeout=120)
                except (subprocess.TimeoutExpired, RuntimeError) as exc:
                    tool = missing_tool(getattr(exc, 'output', ''), getattr(exc, 'returncode', None), item)
                    if tool:
                        stage = 'tooling'
                        raise RuntimeError(f"thiếu công cụ trong container: {tool} (acceptance: {item})") from exc
                    detail = (logs[-1][-400:] if logs else '').replace('\n', ' ')
                    if (probe := _acceptance_probe(item)):
                        try:
                            seen = command([*compose, "exec", "-T", *session_env, "tizia", "sh", "-lc", probe],
                                           timeout=30, log_output=False).stdout
                            detail = f"{detail} | response: {' '.join(seen.split())[:500]}"
                        except (subprocess.TimeoutExpired, RuntimeError):
                            pass
                    if not soft or functional.tolerant_literals():  # acceptance is the feature itself: critical even when other checks are soft
                        raise RuntimeError(f"feature acceptance failed: {item} | {detail}") from exc
                    soft_misses.append(_soft_miss("acceptance", 1, f"{item} | {detail}"))
                    logs.append(f"Feature acceptance failed (soft miss): {item}")
                    continue
                logs.append(f"Feature acceptance passed: {item}")

            env = os.environ.copy()
            env["BASE"] = base
            # Use the harness owner's script, not a possibly modified copy in the proposal checkout.
            with _phase_span(trace, "gate5 step smoke"):
                smoke = command([_bash(), SMOKE_SCRIPT.as_posix()], env=env)
            smoke_ok = smoke.returncode == 0

            for page in pages:
                try:
                    with _check_span(trace, "curl", urlsplit(base + page).path) as attrs:
                        status, body = http_probe(base + page)
                        attrs["tizia.gate5.check.http_status"] = status
                        attrs["tizia.gate5.check.passed"] = 200 <= status < 300
                except LoginRequired:
                    if http_probe is not probe_http:
                        raise
                    # Retry protected pages as a synthetic student in this run's
                    # disposable database. Anonymous public pages stay anonymous.
                    token = fixture('session')['token']
                    with _check_span(trace, "curl", urlsplit(base + page).path) as attrs:
                        status, body = probe_http(base + page, token=token)
                        attrs["tizia.gate5.check.http_status"] = status
                        attrs["tizia.gate5.check.passed"] = 200 <= status < 300
                    logs.append(f"Changed page HTTP authenticated disposable student: {page}")
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
            planned = guest_input(state, "checks") or []
            check_rows = [{"check": check, "base": None} for check in planned + [q for q in quoted if q not in planned]]
            def node_ok(file: str) -> bool:
                if not (Path(checkout) / file).is_file():
                    return False
                parent = str(Path("/app", file).parent).replace("\\", "/")
                command([*compose, "exec", "-T", "tizia", "mkdir", "-p", parent])
                command([*compose, "cp", str(Path(checkout) / file), f"tizia:/app/{file}"])
                try:
                    command([*compose, "exec", "-T", "tizia", "node", "--test", f"/app/{file}"], timeout=60)
                except (subprocess.TimeoutExpired, RuntimeError) as exc:
                    if classify_on and not owned.expired and (isinstance(exc, subprocess.TimeoutExpired) or (
                            tool := missing_tool(getattr(exc, "output", ""), getattr(exc, "returncode", None), "node"))):
                        raise CheckInfra("timeout" if isinstance(exc, subprocess.TimeoutExpired) else f"thiếu công cụ {tool}") from exc
                    return False
                return True

            def check_passes(row: dict) -> bool:
                nonlocal stage
                try:
                    return _check_passes(row["check"], base, http_probe, dom_probe, node_ok)
                except (CheckInfra, OSError, subprocess.TimeoutExpired) as exc:
                    if not classify_on or isinstance(exc, urllib.error.HTTPError):  # HTTPError is an OSError: the app answered
                        raise
                    row["class"], stage = gate_checks.INFRA, "tooling"
                    where = f"{row['check']['primitive']} {gate_checks.target(row['check'])}"
                    logs.append(f"Check Gate 5 {gate_checks.INFRA}: {where}: {exc}")
                    raise RuntimeError(f"check không chạy được (hạ tầng): {where}: {exc}") from exc
            for row in check_rows:  # candidate phase: container still serves the candidate
                with _check_span(trace, "curl", gate_checks.target(row["check"])) as attrs:
                    row["candidate"] = check_passes(row)
                    attrs["tizia.gate5.check.passed"] = row["candidate"]
            http_observed = True
            stage = 'plan'
            owned.check_deadline()
            probe_kind = "route" if probe_id == functional.ROUTE_PROBE else "browser"
            with _check_span(trace, probe_kind, ",".join(urlsplit(p).path for p in observed_pages)) as probe_span:
                functional_result = (functional_probe(base, probe_id) if functional_probe
                                     else functional.run(base, probe_id, fixture, state=state, pages=observed_pages))
                probe_span["tizia.gate5.check.passed"] = bool(functional_result.get("passed"))
            logs.append('Independent functional check: ' + json.dumps(functional_result, ensure_ascii=False))
            if unobserved:
                logs.append('Không có trang public, route thêm/sửa nào để quan sát; chỉ smoke, acceptance và generated tests: needs_review')
            if server_route and functional_result.get('probe_id') != functional.ROUTE_PROBE:
                raise RuntimeError(functional_result.get('note') or functional_result.get('reason') or functional.NO_ORACLE)
            text_oracle = functional_result if (quoted_on and probe_id == functional.TEXT_PROBE) or (shadow_on and probe_id) else None
            if text_oracle:
                legacy = {key: text_oracle.get(key) for key in ("probe_id", "passed", "reason")}
                functional_result = text_report(text_oracle, False)
                logs.append('Oracle chữ chỉ báo cáo; check từ chữ người dùng trích quyết định' if probe_id == functional.TEXT_PROBE
                            else f"Probe cũ {probe_id} chạy song song, chỉ báo cáo; check mới quyết định")
            elif not functional_result.get('passed'):
                if oracle_defers(state, acceptance, generated_ok, smoke_ok, functional_result):
                    functional_result = {**functional_result, 'passed': True, 'oracle_passed': False, 'needs_review': True}
                    logs.append('Oracle fail kèm acceptance của người dùng, generated tests và smoke đều xanh: needs_review, không chặn: '
                                + str(functional_result.get('reason')))
                elif no_oracle_review(generated_ok, smoke_ok, functional_result, (review_any and not test_files) or tests_advisory):
                    functional_result = {**functional_result, 'passed': True, 'oracle_passed': False, 'needs_review': True}
                    logs.append('Không có oracle hành vi cho yêu cầu này; generated tests, smoke và acceptance của plan đều xanh: '
                                'needs_review, admin xem xét, không tự đạt: ' + str(functional_result.get('reason')))
                elif soft and functional_result.get('probe_id') in (functional.TEXT_PROBE, functional.FALLBACK_TEXT_PROBE):
                    soft_misses.append(_soft_miss("text_oracle", 1, str(functional_result.get('reason'))))
                    functional_result = {**functional_result, 'passed': True, 'oracle_passed': False, 'soft_miss': True}
                    logs.append('Oracle chữ trượt (soft miss): ' + str(functional_result.get('reason')))
                else:
                    raise RuntimeError(functional_result.get('reason') or 'Independent functional check failed')
            if (probe_id in (functional.ROUTE_PROBE, functional.FALLBACK_TEXT_PROBE, functional.STYLE_PROBE) and functional_result.get('passed')
                    and test_files and not generated_ok):
                functional_result = {**functional_result, 'needs_review': True, 'oracle_passed': True, 'disagree': True}
                logs.append('Oracle từ diff đạt nhưng generated test đỏ: needs_review, admin xem xét, không tự đạt')
            stage = 'ordinary'
            # Changed HTML page, else the page the requester was on (CSS/JS change); none named = no shot.
            shot_pages = [] if server_route or unobserved else _shot_pages(checkout, pages, primary)
            skipped = [page for page in html if page not in shot_pages]
            if skipped:
                logs.append(f"Chỉ chụp {len(shot_pages)} trong {len(html)} trang đổi; không chụp: {', '.join(skipped)}")
            owned.check_deadline()
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
                                         visual.changed_selectors(guest_input(state, "full_diff")), shot_token,
                                         {"after": visual.changed_texts(guest_input(state, "full_diff"), "+"),
                                          "before": visual.changed_texts(guest_input(state, "full_diff"), "-")},
                                         trace=trace)
                except Exception as exc:  # D0: UI evidence is mandatory; absent browser = environment
                    # Wrong landing page is not fixed by a retry or a repair; admin decides.
                    stage = "plan" if isinstance(exc, ScreenshotTargetError) else "screenshot"
                    raise RuntimeError(f"thiếu screenshot bắt buộc cho thay đổi UI: {exc}") from exc
                screenshot = next((s["path"] for s in shots
                                   if s["phase"] == "after" and s["page"] == primary and s["width"] == 1280), None)
                visual_issues = visual_regressions(shots)
                logs += [f"Cổng ảnh: {issue}" for issue in visual_issues] or ["Cổng ảnh: không có lỗi hiển thị mới."]
                if visual_issues and soft:
                    soft_misses += visual_misses(shots)
                elif visual_issues:  # bản sau tệ hơn bản trước: sửa được bằng lượt sửa, như test hỏng
                    raise RuntimeError("giao diện tệ hơn bản trước — " + " | ".join(visual_issues))
            if check_rows:  # base phase after screenshots: _restore_base overwrites the candidate files
                try:
                    restored = _restore_base(state, checkout, pages,
                                             lambda local, target: command([*compose, "cp", str(local), f"tizia:{target}"]))
                except (OSError, RuntimeError) as exc:
                    restored = None
                    logs.append(f"Check không có base để so: {exc}")
                for row in check_rows:  # chỉ trang đã đổi khôi phục được; route/API không có base → không biết
                    page = gate_checks.target(row["check"]).split("?")[0]
                    if restored is None or page not in pages:
                        continue
                    if page in restored:  # file mới: base không có trang, đỏ trên base
                        row["base"] = False
                        continue
                    row["base"] = check_passes(row)
                verdict = gate_checks.classify(check_rows)
                red = [row for row in check_rows if row["base"] is False and not row["candidate"]]
                if classify_on:
                    request = f"{guest_input(state, 'request_title') or ''}\n{guest_input(state, 'request_detail') or ''}".strip()
                    diff = "\n".join(str(item.get("diff") or "") for item in guest_input(state, "full_diff") or [])
                    for row in red:
                        why = gate_checks.suspect(row["check"], request, diff)
                        row.update({"class": gate_checks.CHECK_SUSPECT if why else gate_checks.CANDIDATE_WRONG,
                                    "origin": "harness" if row["check"] in quoted else "plan", **({"suspect": why} if why else {})})
                checks_result = {"verdict": verdict,
                                 "rows": [{key: row[key] for key in ("check", "base", "candidate", "class", "origin", "suspect")
                                           if key in row} for row in check_rows]}
                logs.append("Check Gate 5: " + json.dumps(checks_result, ensure_ascii=False))
                wrong = [row for row in red if row.get("class") != gate_checks.CHECK_SUSPECT]
                if wrong:
                    raise RuntimeError("check đỏ trên cả base lẫn candidate: " + ", ".join(
                        f"{row['check']['primitive']} {gate_checks.target(row['check'])}" for row in wrong))
                if fixed := [row for row in red if row["origin"] == "harness"]:
                    raise RuntimeError(f"{gate_checks.SUSPECT_STOP}: " + " | ".join(
                        f"{row['check']['primitive']} {gate_checks.target(row['check'])}: {row['suspect']}" for row in fixed))
                suspects = [row["suspect"] for row in red]
                if suspects:
                    logs.append(f"Check Gate 5 {gate_checks.CHECK_SUSPECT}: không sửa code, needs_review: " + " | ".join(suspects))
                if checks_result["verdict"] == gate_checks.NONE:
                    functional_result = {**functional_result, 'needs_review': True}
                    logs.append("Không có check nào đỏ trên base rồi xanh trên candidate: needs_review, admin xem ảnh trước/sau")
            if text_oracle:
                functional_result = text_report(text_oracle, bool(checks_result) and checks_result["verdict"] == gate_checks.PROOF)
                if functional_result.get("needs_review") and not check_rows:
                    logs.append("Không dựng được check từ chữ trích: needs_review, admin xem ảnh trước/sau")
            if suspects:
                functional_result = {**functional_result, "needs_review": True, "check_suspect": suspects}
            if shadow_on and legacy:
                proven = None if not check_rows else bool(checks_result) and checks_result["verdict"] == gate_checks.PROOF
                shadow = {"legacy": legacy, "new": {"verdict": checks_result["verdict"] if checks_result else None, "passed": proven}}
        except (OSError, RuntimeError, ValueError, KeyError, TypeError, subprocess.TimeoutExpired) as exc:
            reason = (str(exc) or type(exc).__name__).replace(password, "[synthetic credential]")
            if owned.expired:
                reason, stage = "gate5_deadline: gate 5 exceeded its wall-clock cap", "deadline"
        finally:
            owned.deadline = None
            with _phase_span(trace, "gate5 teardown"):
                try:
                    diagnostic = command([*compose, "logs", "--no-color"], log_output=False)
                    logs.append("Container logs before teardown:\n" + redact((diagnostic.stdout or "").replace(password, "[synthetic credential]"))[-8000:])
                except (OSError, RuntimeError, subprocess.TimeoutExpired):
                    pass
                try:
                    owned.down()
                    teardown_confirmed = True
                except (OSError, RuntimeError, subprocess.TimeoutExpired) as exc:
                    reason = f"{reason or 'verify'}; teardown thất bại: {exc}"
                    stage = "teardown"  # leaked containers are the environment's problem, not the candidate's

    advisory = None
    if get_settings().vision_advisory and not reason and shots:
        with _check_span(trace, "vision", "advisory") as span:
            advisory = vision_advisory.run(state, {"screenshot": screenshot, "screenshots": shots}, deps, budget)
            span["tizia.gate5.vision.status"] = advisory["status"]
            span["tizia.gate5.vision.overall"] = advisory.get("overall") or ""
    evidence = {"text": "Smoke scripts/smoke-user-state.sh: một luồng user-state, không bao phủ toàn ứng dụng.\n"
                        + "\n".join(logs), "smoke_passed": smoke_ok, "http_observed": http_observed, "runner": runner_name,
                "screenshot": str(screenshot) if screenshot else None, "screenshots": shots,
                "functional": functional_result, "postgres": {"project": project, "network": f"{project}-net",
                "data_volume": f"{project}-pg", "disposable": True}, "teardown_confirmed": teardown_confirmed,
                **({"checks": checks_result} if checks_result else {}),
                **({"probe_shadow": shadow} if shadow else {}),
                **({"vision_advisory": advisory} if advisory else {}),
                **({"check_registry": check_registry.REGISTRY.hash} if registry_on else {})}
    soft_only = bool(soft_misses) and not reason
    if soft_misses:
        evidence["soft_misses"] = soft_misses
    if soft_only and functional.tolerant_literals():
        evidence["needs_review"] = True
        soft_only = False
    elif soft_only:  # repairable like a failed test; the worker lets it pass after one soft repair round
        reason = "kiểm mềm dưới ngưỡng: " + " | ".join(soft_line(m) for m in soft_misses)[:1000]
    state["evidence"] = evidence
    return {"gate": 5, "blocked": bool(reason), "reason": reason, "evidence": evidence,
            "failure_class": "ordinary" if soft_only else failure_class(stage, reason), "soft_only": soft_only}
