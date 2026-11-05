"""Repair agent: one heavy-model proposal for a failure the deterministic ladder can only hand to the admin.

Pure helpers only: build the fenced context, parse the reply, check it against scope/levels/permissions,
apply the accepted edits, pick the screenshots worth showing. The caller owns the model call, the budget and
the attempt cap.
"""
from __future__ import annotations

import base64
import json
import posixpath
import tempfile
from pathlib import Path

import path_policy
from runtime import levels, progress

PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "repair_agent.md").read_text(encoding="utf-8")
PROPOSAL_CHARS = 800
DIAGNOSIS_CHARS = PROPOSAL_CHARS
MAX_CHANGES = 4
MAX_IMAGES = 2
IMAGE_B64 = 1_500_000     # trần base64 mỗi ảnh; ~1.1 MB nhị phân, đủ 1 ảnh 1280px full-page
# Mỗi ảnh trừ IMAGE_CHARS khỏi context_chars: text ≤6000 ký tự ≈1.5K token, ảnh ~3.3K token/ảnh, cả hai vẫn dưới cửa sổ 32K.
IMAGE_CHARS = 1000
SHOT_DIR = "ai-verify-shots-"  # thư mục ảnh tạm do cổng 5 / sandbox tạo (tempfile.mkdtemp)
IMAGE_MIMES = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "webp": "image/webp"}
TRUNCATED = "…(cắt)"
SECTIONS = ("rules", "capability", "request", "spec", "failure", "tried", "plan", "target")


class ProposalError(ValueError):
    """Reply is not a proposal the harness can run: wrong shape or an action outside the allowlist."""


def prompt(context_text: str) -> str:
    """Fixed system prefix + fenced context; the prefix stays byte-identical between calls."""
    return PROMPT.format(context=context_text)


def applies(action) -> bool:
    """Only a ladder that would stop and ask the admin reaches the agent."""
    return str(action or "") == progress.STOP_ADMIN


ROUTABLE = frozenset({"syntax", "test_assertion", "acceptance_command", "unclassified"})


def routable(failure_class) -> bool:
    """Quality failures only; infra, busy, budget, timeout, scope and plan stops never reach the agent."""
    return str(failure_class or "") in ROUTABLE


def visual(result: dict) -> bool:
    """Gate 5 blocked because the new UI is worse than the base (reason prefix of gates/verify.py)."""
    return "giao diện tệ hơn" in str(result.get("reason") or "")


def images(result: dict, *, max_images: int = MAX_IMAGES, temp_root=None, read=None) -> list[dict]:
    """Ảnh đính kèm cho lời gọi: {'mime','b64','page','width','phase'}, tối đa 1 ảnh/trang đã đổi.

    [] khi lỗi không phải hiển thị. Cổng 5 chỉ chụp trang đã đổi nên mọi ảnh AFTER đều đúng trang; ảnh BEFORE là
    code cũ nên bỏ. Chỉ đọc file trong thư mục chụp của chính run (SHOT_DIR dưới temp), phần còn lại bị loại.
    """
    if not visual(result):
        return []
    evidence = result.get("evidence") or {}
    root = Path(temp_root or tempfile.gettempdir()).resolve()
    primary = str(evidence.get("screenshot") or "")
    read = read or (lambda path, size: Path(path).open("rb").read(size))

    def rank(shot: dict) -> tuple:
        return (bool(primary) and str(Path(shot["path"]).resolve()) != str(Path(primary).resolve()),
                bool(shot.get("focus")), shot.get("width") != 1280)

    best: dict[str, dict] = {}
    for shot in evidence.get("screenshots") or []:
        if not isinstance(shot, dict) or shot.get("phase") != "after" or not shot.get("path"):
            continue
        path = Path(shot["path"]).resolve()
        if path.parent.parent != root or not path.parent.name.startswith(SHOT_DIR) or not path.is_file():
            continue
        mime = IMAGE_MIMES.get(path.suffix.lower().lstrip("."))
        if mime is None:
            continue
        shot = {**shot, "path": str(path), "mime": mime}
        page = str(shot.get("page") or "")
        if page not in best or rank(shot) < rank(best[page]):
            best[page] = shot

    out = []
    for shot in sorted(best.values(), key=rank)[:max_images]:
        try:
            raw = read(shot["path"], IMAGE_B64 * 3 // 4 + 1)  # trần đọc: quá cỡ thì không vừa base64
        except OSError:
            continue
        b64 = base64.b64encode(raw).decode()
        if len(b64) > IMAGE_B64:
            continue
        out.append({"mime": shot["mime"], "b64": b64, "page": shot["page"],
                    "width": shot.get("width"), "phase": shot["phase"]})
    return out


def context(parts: dict[str, str], *, limit: int) -> str:
    """Sections as fenced data, each capped, total never above `limit`."""
    ordered = [name for name in SECTIONS if name in parts] + [name for name in parts if name not in SECTIONS]
    out, used = [], 0
    for name in ordered:
        head, tail = f"<{name}>\n", f"\n</{name}>"
        room = limit - used - len(head) - len(tail) - (1 if out else 0)
        if room <= 0:
            break
        text = str(parts[name] or "").replace("\x00", "")
        if len(text) > room:
            text = text[:max(0, room - len(TRUNCATED))] + TRUNCATED
        out.append(f"{head}{text}{tail}")
        used += len(head) + len(text) + len(tail) + (1 if len(out) > 1 else 0)
    return "\n".join(out)


def parse(raw) -> dict:
    """Proposal from the model reply. Raise ProposalError on anything the harness must not run."""
    text = str(raw or "").strip()
    if text.startswith("```"):
        text = text.strip("`").removeprefix("json").strip()
    try:
        body = json.loads(text)
    except ValueError as error:
        raise ProposalError(f"không phải JSON: {error}") from None
    if not isinstance(body, dict):
        raise ProposalError("kết quả phải là object")
    diagnosis = str(body.get("diagnosis") or "").strip()
    if not diagnosis:
        raise ProposalError("thiếu diagnosis")
    action = str(body.get("action") or "").strip()
    if action not in progress.ALLOWED_ACTIONS:
        raise ProposalError(f"action lạ: {action!r}")
    changes = body.get("changes")
    if not isinstance(changes, list) or len(changes) > MAX_CHANGES:
        raise ProposalError(f"changes phải là danh sách tối đa {MAX_CHANGES} mục")
    if action != progress.STOP_ADMIN and not changes:
        raise ProposalError("sửa code cần ít nhất một change")
    clean = []
    for item in changes:
        if not isinstance(item, dict) or set(item) != {"file", "search", "replace"}:
            raise ProposalError("mỗi change cần đúng file, search, replace")
        if not all(isinstance(item[key], str) and item[key] for key in ("file", "search")):
            raise ProposalError("change cần file và search khác rỗng")
        if not isinstance(item["replace"], str):
            raise ProposalError("replace phải là chuỗi")
        clean.append({"file": item["file"], "search": item["search"], "replace": item["replace"]})
    return {"diagnosis": diagnosis[:PROPOSAL_CHARS], "action": action, "changes": clean,
            "tool": str(body.get("tool") or "edit_file")}


def allowed_tools(manifest) -> frozenset[str]:
    """Manifest tools the agent may name: reads and draft writes, never a command or the control tool."""
    return frozenset(name for name, spec in manifest.tools.items()
                     if spec.effect in ("read", "draft_write") and name != "run_check")


def check(proposal: dict, *, scope, code: dict[str, str], elevation=(), plan_hash=None, manifest=None) -> dict:
    """{ok, reason, files, elevation_required}: schema was checked in parse; this is scope, levels and the edit itself."""
    tool = str(proposal.get("tool") or "edit_file")
    if manifest is not None and tool not in allowed_tools(manifest):
        return {"ok": False, "reason": f"tool {tool!r} không được dùng cho sửa tự động", "files": [],
                "elevation_required": []}
    scope = set(scope)
    files, required = [], []
    for change in proposal["changes"]:
        path = path_policy.normalize(change["file"])
        if path is None:
            return {"ok": False, "reason": f"path không hợp lệ: {change['file']!r}", "files": files,
                    "elevation_required": required}
        if path not in scope:
            return {"ok": False, "reason": f"{path} ngoài scope của plan", "files": files,
                    "elevation_required": required}
        allow = levels.write_check(path, elevation, plan_hash)
        if not allow["allow"]:
            if allow["level"] in (levels.PROTECTED, levels.CORE):
                required.append({"path": path, "level": allow["level"], "why": allow["reason"]})
                continue
            return {"ok": False, "reason": allow["reason"], "files": files, "elevation_required": required}
        text = str(code.get(path) or "")
        if text.count(change["search"]) != 1:
            return {"ok": False, "reason": f"{path}: search không khớp đúng 1 đoạn trong file", "files": files,
                    "elevation_required": required}
        if path not in files:
            files.append(path)
    if required:
        return {"ok": False, "reason": f"{len(required)} file cần elevation admin", "files": files,
                "elevation_required": required}
    return {"ok": True, "reason": "", "files": files, "elevation_required": []}


def apply(proposal: dict, code: dict[str, str]) -> dict[str, str]:
    """New file text after the accepted edits; the input mapping is not modified."""
    out = dict(code)
    for change in proposal["changes"]:
        path = posixpath.normpath(change["file"].replace("\\", "/"))
        out[path] = out[path].replace(change["search"], change["replace"], 1)
    return out
