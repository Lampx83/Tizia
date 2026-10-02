"""Cổng 1 — request → plan JSON (kiểu writing-plans: subtask 2-5 phút, mỗi cái
nêu file + bước verify + nhãn size để cổng 3 chọn coder model).

Schema plan (hợp đồng với cổng 2, 2.5, 3 và worker.HarnessPlanner._canonical):
{
  "summary_vi":   str   # 1-2 câu tiếng Việt: giải quyết gì, đổi gì (cổng 5/7 ghép vào PR/Telegram)
  "capabilities": [str] # tên key surface plugin cần — cổng 2 chặn nếu có gì ngoài surface
  "subtasks": [
    {"title": str, "file": str, "verify": str, "size": "small" | "large"}
  ]
}

Prompt = context.manual() (AIBOARD.md) + prompts/brainstorm.md; phần {context} lấy từ
context.build_context(gate 1): harness chọn skill theo request, chạy tool của skill
(outline/tree/grep/graph/lessons ở 1 sha) rồi mới dựng prompt — model thấy css/js liên kết
của trang ứng viên nên chọn đúng file. Plan có file không tồn tại (ngoài đường mới được phép)
→ hỏi lại model đúng 1 lần kèm lý do, vẫn sai → blocked.
"""
from __future__ import annotations

import json
import posixpath
import re
from pathlib import Path

import code_index
import context
import functional
from gates.scope_check import load_capability_names

ROOT = Path(__file__).resolve().parents[3]
SIZES = ("small", "large")
SUBTASK_KEYS = ("title", "file", "verify", "size")
# File chưa có ở base chỉ được là trang mới, module JS mới, hoặc plugin _ai-generated mới.
_NEW_OK = re.compile(r"^(public/[a-z0-9][a-z0-9-]*\.html|public/js/[\w/-]+\.js"
                     r"|server/contexts/_ai-generated/[\w-]+/[\w-]+/index\.js)$")
RETRY_SUFFIX = "\n\nYOUR PREVIOUS ANSWER WAS REJECTED: {reason}\nFix exactly that. Output ONLY the JSON object."

# Prompt sống ở file riêng (ai-board/harness/prompts/), đọc 1 lần lúc import — phần trước
# {context} cố định byte-để-byte mọi lần gọi (kỷ luật cache, khoá bằng prompts.lock.json).
PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "brainstorm.md").read_text(encoding="utf-8")


def build_prompt(request: dict, surface: frozenset[str], context_text: str = "") -> str:
    """AIBOARD.md + prompt đã khoá (prefix cố định) rồi mới tới context/request thay đổi theo lượt."""
    thread = " | ".join(
        f"{m.get('role')}: {m.get('body')}" for m in (request.get("thread") or [])
    ) or "(không có)"
    return context.manual() + PROMPT.format(
        id=request.get("id"),
        domain=request.get("domain") or "(core)",
        type=request.get("type"),
        votes=request.get("votes", 0),
        subject=request.get("subject", ""),
        body=request.get("body", ""),
        thread=thread,
        surface=", ".join(sorted(surface)),
        context=context_text or "REPO DATA: (không có)",
    )


def parse_plan(text: str) -> dict:
    """Parse + validate. Raise ValueError với lý do ngắn nếu sai schema."""
    try:
        plan = json.loads(text)
    except (TypeError, ValueError) as e:
        raise ValueError(f"không phải JSON: {e}") from None
    if not isinstance(plan, dict):
        raise ValueError("plan phải là object")
    if not isinstance(plan.get("summary_vi"), str) or not plan["summary_vi"].strip():
        raise ValueError("thiếu summary_vi")
    subtasks = plan.get("subtasks")
    if not isinstance(subtasks, list) or not subtasks:
        raise ValueError("subtasks rỗng")
    for i, st in enumerate(subtasks):
        if not isinstance(st, dict):
            raise ValueError(f"subtask[{i}] không phải object")
        for k in SUBTASK_KEYS:
            if not isinstance(st.get(k), str) or not st[k].strip():
                raise ValueError(f"subtask[{i}] thiếu {k}")
        if st["size"] not in SIZES:
            raise ValueError(f"subtask[{i}].size='{st['size']}' không thuộc {SIZES}")
    caps = plan.get("capabilities") or []
    if not isinstance(caps, list):
        raise ValueError("capabilities phải là mảng")
    plan["capabilities"] = caps
    return plan


def check_files(plan: dict, source, sha: str | None) -> None:
    """Mỗi subtask.file phải có ở `sha` hoặc là đường mới được phép; không 2 subtask cùng file.
    Ghi lại file đã chuẩn hoá (posix, bỏ ./). Raise ValueError nêu file sai. sha None → chỉ kiểm trùng."""
    seen: list[str] = []
    for st in plan["subtasks"]:
        file = st["file"] = posixpath.normpath(st["file"].strip().replace("\\", "/").lstrip("./"))
        if file in seen:
            raise ValueError(f"2 subtask cùng sửa {file} — gộp thành 1")
        seen.append(file)
    must_exist = [f for f in seen if not _NEW_OK.match(f)]
    if sha is None or not must_exist:
        return
    try:  # 1 tiến trình git cho mọi file
        found = set(code_index.git(source, "ls-tree", "--name-only", sha, "--", *must_exist)
                    .decode("utf-8", "replace").splitlines())
    except OSError:
        found = set()
    missing = [f for f in must_exist if f not in found]
    if missing:
        raise ValueError(f"file '{missing[0]}' không có trong repo — chọn file có trong REPO DATA")


def run(request: dict, deps, budget, *, db_path=None, proposal_id: int | None = None,
        source=None, sha: str | None = None) -> dict:
    """1 lời gọi GATE1_MODEL (+1 lần hỏi lại nếu plan sai schema/file), tính phí budget.
    source/sha: repo + commit để đọc context (mặc định repo chứa harness, HEAD).
    db_path/proposal_id có cả hai thì ghi gate_trace — thiếu 1 thì bỏ qua, không phải lỗi."""
    source = source or ROOT
    ctx = context.build_context(1, request, None, source, sha or "HEAD")
    commit = ctx["sha"]
    prompt = build_prompt(request, load_capability_names()["surface"], ctx["text"])
    reason = None
    trace = getattr(deps, "trace", None)

    def judge(check, ok, detail=""):
        if trace:
            trace.attach_last("evaluation", {"check": check, "ok": ok, "detail": detail})

    for attempt in range(2):
        if attempt and not budget.tick():
            break
        if trace and not attempt:
            trace.note("knows", "yêu cầu", f"{request.get('subject') or ''} — {str(request.get('body') or '')[:300]}",
                       {"domain": request.get("domain"), "type": request.get("type")})
            context.report(trace, ctx)
        elif trace:
            trace.note("knows", "retry feedback", reason)
        ask = prompt if not attempt else prompt + RETRY_SUFFIX.format(reason=reason)
        body = deps.call_model(deps.models.gate1_model, ask, gate=1, budget=budget,
                               db_path=db_path, proposal_id=proposal_id, prompt_name="brainstorm.md")
        stage = "parse plan"
        try:
            plan = parse_plan(body.get("response", ""))
            judge(stage, True, plan.get("summary_vi", ""))
            stage = "file có trong repo"
            check_files(plan, source, commit)
            judge(stage, True, ", ".join(task["file"] for task in plan["subtasks"]))
            stage = "đúng file renderer / file khớp nhất"
            required = functional.expected_targets({'request_title': request.get('subject'), 'request_detail': request.get('body')})
            if required.intersection(ctx.get('targets') or []) and not required.intersection(task['file'] for task in plan['subtasks']):
                raise ValueError('Use the existing feature renderer: ' + ', '.join(sorted(required)))
            if ctx.get('best_match') and ctx['best_match'] not in (task['file'] for task in plan['subtasks']):
                raise ValueError(f"Sửa file khớp nhiều cụm người dùng viết nhất: {ctx['best_match']}")
            judge(stage, True, f"file khớp nhất: {ctx.get('best_match') or '(không có)'}")
        except ValueError as e:
            judge(stage, False, str(e))
            reason = str(e)
            continue
        return {"gate": 1, "blocked": False, "reason": None, "plan": plan,
                "skill": ctx["skill"], "context_chars": ctx["chars"], "repo_context": ctx['text'],
                'source_targets': ctx.get('targets') or [], 'best_match': ctx.get('best_match')}
    return {"gate": 1, "blocked": True, "reason": f"plan không hợp lệ: {reason}", "plan": None,
            "skill": ctx["skill"]}
