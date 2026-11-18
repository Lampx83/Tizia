"""AI Board worker: PR side (PR text, forge, base observation, PR state sync, screenshot upload payload)."""
from __future__ import annotations

import json
import re
from pathlib import Path

from worker_client import CONTRACT, WorkerClient
from settings import get_settings, pr_base  # noqa: E402


_MENTION = re.compile(r"@(?=[\w-])")


def pr_text(snapshot: dict, plan: dict, tier: str | None, verdict: dict) -> tuple[str, str, list[str]]:
    """(title, body, labels) of the candidate's PR. Request text is the requester's, untrusted: no name, no @mention."""
    request = snapshot.get("request") or {}

    def safe(text) -> str:
        return _MENTION.sub("@​", str(text or "")).strip()

    candidate = verdict["candidate"]
    gates = verdict.get("gates") or []
    risk = next((g for g in gates if g.get("gate") == 5.5), {})
    smoke = next((g for g in gates if g.get("gate") == 5), {})
    level = risk.get("risk_level") or "?"
    names = CONTRACT["gates"]["names"]
    soft = [m for g in gates for m in g.get("soft_misses") or []]
    tests = list(dict.fromkeys([*(plan.get("tests") or []),
                                *(t for step in plan.get("steps") or [] for t in step.get("tests") or [])]))
    lines = [
        "## Yêu cầu",
        f"Yêu cầu #{request.get('id')} ({request.get('domain') or '—'}): **{safe(request.get('title'))}**",
        "", safe(request.get("clarified_spec") or request.get("detail")) or "(không có mô tả)", "",
        "## Thay đổi",
        f"Mục tiêu: {safe(plan.get('goal'))}",
        *(f"- `{c['sha'][:10]}` {safe(c.get('title'))} — {', '.join(f'`{f}`' for f in c.get('files') or [])}"
          for c in candidate.get("commits") or []),
        "", "## Rủi ro",
        f"Mức rủi ro cổng 5.5: **{level}**; tier: **{tier or '—'}**."
        + (f" Tín hiệu: {', '.join(s['name'] for s in risk['risk_signals'])}." if risk.get("risk_signals") else ""),
        "", "## Kiểm thử",
        *(f"- `{safe(t)}`" for t in tests),
        (f"- Eval (self): thắng {ev['wins']}, thua {ev['losses']}, hoà {ev['ties']} trên {ev['tasks']} task kiểm tra; "
         f"{ev['gpu_s']}/{ev['gpu_s_limit']} GPU-s; gốc `{ev['base_sha'][:10]}` → biến thể `{ev['variant_sha'][:10]}`."
         if (ev := smoke.get("eval")) else
         f"- Docker smoke: {'đạt' if smoke.get('smoke_passed') else 'không đạt'}; quan sát qua HTTP: "
         f"{'có' if smoke.get('http_observed') else 'không'}."),
        *(["", "## Cảnh báo chất lượng",
            "Các kiểm mềm dưới đây chưa đạt ngưỡng sau một lượt sửa; thay đổi vẫn được gửi để người review quyết định.",
            *(f"- Cổng {m.get('gate')}: {m.get('check')} {m.get('value')} (ngưỡng {m.get('threshold')})"
              + (f" {m['page']} {m.get('width')}px" if m.get("page") else "") + f" — {safe(m.get('detail'))}"
              for m in soft)] if soft else []),
        "", "## Kết quả các cổng",
        *(f"- Cổng {g.get('gate')} ({names.get(str(g.get('gate')).removesuffix('.0'), '')}): "
          f"{'chặn — ' + safe(g.get('reason')) if g.get('blocked') else 'qua'}" for g in gates),
        "", "## Bằng chứng SHA",
        f"- base (`dev` lúc kiểm): `{candidate['base_sha']}`",
        f"- head (đã kiểm): `{candidate['head_sha']}`",
        "Base hoặc head đổi thì bằng chứng trên hết hiệu lực: kiểm lại bằng `python ai-board/review_pr.py <số PR>`.",
        "", "_Mở tự động bởi AI Board. Không tự merge, không tự duyệt: người review quyết định._",
    ]
    labels = ["ai-board", f"ai-board:tier-{tier or 'unknown'}"]
    if request.get("type") == "self":
        labels.append("ai-board:self")  # review_pr.py soát guard theo luật của yêu cầu self
    if soft:
        labels.append("ai-board:soft-warnings")
    if level in ("high", "critical"):
        labels.append("ai-board:review-carefully")
    elif tier == "surface":
        labels.append("ai-board:daily-batch")  # surface PRs are reviewed together once a day
    return f"AI Board #{request.get('id')}: {safe(request.get('title'))}"[:120], "\n".join(lines), labels


def _forge(candidate, token):
    """GitHub client, or a local bare-repo forge when AI_BOARD_LOCAL_FORGE names one (demo: no remote PR ever leaves the machine)."""
    local = get_settings().local_forge
    if local:
        from services.local_forge import local_github
        return local_github(local, candidate.GitHub)
    return candidate.GitHub(get_settings().github_repo, token) if token else None


def observe_base(client: WorkerClient, repo) -> dict:
    """Report the current tip of the PR base branch so the server can tell which kept candidates were verified on an older base."""
    from services import candidate
    from services import reverify

    tip = reverify.base_tip(repo)
    if not tip:
        return {"status": "no_base"}
    return {"status": "observed", **client.post("/api/ai-board/worker/base", {"ref": pr_base(), "sha": tip})}


def sync_pull_requests(client: WorkerClient, github) -> dict:
    """Ask GitHub about the PRs the server still thinks are open; report merged/closed ones.
    github None (no token) → skip with a log line. One PR's GitHub/HTTP error → listed in errors, retried next sync."""
    if github is None:
        print(json.dumps({"pr_sync": "skipped", "reason": "AI_BOARD_GITHUB_TOKEN not set"}))
        return {"status": "skipped"}
    prs = client.post("/api/ai-board/worker/pull-requests/open", {})["pull_requests"]
    out = {"status": "synced", "open": len(prs), "merged": [], "closed": [], "errors": []}
    for pr in prs:
        number = pr["number"]
        try:
            info = github.pull(number)
            if info.get("state") != "closed":
                continue
            state = "merged" if info.get("merged_at") else "closed"
            client.post("/api/ai-board/worker/pull-requests/state", {
                "number": number, "state": state, "closed_at": info.get("merged_at") or info.get("closed_at"),
                "files": github.pull_files(number)})
        except (OSError, ValueError, KeyError) as error:  # urllib HTTPError/URLError are OSError
            print(json.dumps({"pr_sync_error": number, "error": str(error)[:200]}))
            out["errors"].append(number)
            continue
        out[state].append(number)
    return out


# Khớp server/ai-board/drafts.js: PNG, ≤ 16 ảnh, mỗi ảnh ≤ 2 MB.
SHOTS_TYPE = "application/vnd.tizia.screenshots+json"
MAX_SHOT_BYTES = 2 * 1024 * 1024
MAX_SHOTS = 16


def screenshot_payload(shots: list[dict]) -> list[dict]:
    """Ảnh cổng 5 → body upload (base64). Bỏ ảnh quá trần/không đọc được; không bao giờ raise."""
    import base64

    images = []
    for shot in shots[:MAX_SHOTS]:
        try:
            data = Path(shot["path"]).read_bytes()
        except (OSError, KeyError, TypeError):
            continue
        if not data or len(data) > MAX_SHOT_BYTES:
            continue
        images.append({"phase": shot.get("phase"), "page": shot.get("page"), "width": shot.get("width"),
                       **({"focus": True} if shot.get("focus") else {}), "png_base64": base64.b64encode(data).decode("ascii")})
    return images
