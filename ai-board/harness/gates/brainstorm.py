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
import os
import posixpath
import re
from pathlib import Path

import code_index
import context
import functional
from gates import best_match, react_plan
from gates.scope_check import load_capability_names
from runtime.plan_merge import merge_same_file

ROOT = Path(__file__).resolve().parents[3]
SIZES = ("small", "large")
SUBTASK_KEYS = ("title", "file", "verify", "size")
LAYERS = ("db", "backend", "frontend", "wiring")
GEN_CONTEXT = "server/contexts/_ai-generated/"
DB_MIGRATION = re.compile(r"^server/contexts/_ai-generated/[a-z0-9][a-z0-9-]*/migrations/[a-z0-9][a-z0-9._-]*\.sql$")
# Plan nhiều lớp: verify/acceptance phải là lệnh chạy được, không phải câu mô tả.
RUNNABLE = re.compile(r"^(node --test\b|node\s|npx\s|npm\s+(test|run)\b|curl\s|python[0-9.]*\s|pytest\b|bash\s|sh\s|docker compose\s|psql\s)")
# File chưa có ở base chỉ được là trang mới, module JS mới, plugin _ai-generated mới, hoặc migration mới.
_NEW_OK = re.compile(r"^(public/[a-z0-9][a-z0-9-]*\.html|public/js/[\w/-]+\.js"
                     r"|server/contexts/_ai-generated/[\w-]+/[\w-]+/index\.js"
                     r"|server/contexts/_ai-generated/[a-z0-9][a-z0-9-]*/migrations/[a-z0-9][a-z0-9._-]*\.sql)$")
RETRY_SUFFIX = "\n\nYOUR PREVIOUS ANSWER WAS REJECTED: {reason}\nFix exactly that. Output ONLY the JSON object."

# Prompt sống ở file riêng (ai-board/harness/prompts/), đọc 1 lần lúc import — phần trước
# {context} cố định byte-để-byte mọi lần gọi (kỷ luật cache, khoá bằng prompts.lock.json).
PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "brainstorm.md").read_text(encoding="utf-8")


def build_prompt(request: dict, surface: frozenset[str], context_text: str = "") -> str:
    """AIBOARD.md + prompt đã khoá (prefix cố định) rồi mới tới context/request thay đổi theo lượt."""
    thread = context.thread_text(request.get("thread"), request.get("clarified_spec")) or "(không có)"
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


def infer_layer(file: str) -> str:
    """Suy ra lớp từ đường dẫn khi model không khai layer."""
    if DB_MIGRATION.match(file):
        return "db"
    if file.startswith(GEN_CONTEXT):
        return "backend"
    if file.startswith("public/"):
        return "frontend"
    return "wiring"


def check_dag(subtasks: list[dict]) -> None:
    """depends_on là số thứ tự 1-based của subtask khác; cấm tự trỏ và chu trình."""
    size = len(subtasks)
    for i, st in enumerate(subtasks):
        deps = st["depends_on"]
        for dep in deps:
            if dep == i + 1:
                raise ValueError(f"subtask[{i}] phụ thuộc chính nó")
            if dep < 1 or dep > size:
                raise ValueError(f"subtask[{i}].depends_on={dep} ngoài 1..{size}")
        if len(set(deps)) != len(deps):
            raise ValueError(f"subtask[{i}].depends_on bị trùng")
    state: dict[int, int] = {}

    def visit(node: int) -> bool:
        if state.get(node) == 1:
            return True
        if state.get(node) == 2:
            return False
        state[node] = 1
        for dep in subtasks[node - 1]["depends_on"]:
            if visit(dep):
                return True
        state[node] = 2
        return False

    if any(visit(node) for node in range(1, size + 1)):
        raise ValueError("depends_on tạo chu trình — DAG phải acyclic")


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
        if 'task_type' in st:
            from services.default_skills import TASK_TYPES
            if not isinstance(st['task_type'], str) or st['task_type'] not in TASK_TYPES:
                raise ValueError(f'subtask[{i}].task_type không hợp lệ')
        if st.get("layer") is not None and st["layer"] not in LAYERS:
            raise ValueError(f"subtask[{i}].layer='{st['layer']}' không thuộc {LAYERS}")
        deps = st.get("depends_on")
        if deps is None:
            deps = [i] if i else []  # mặc định giữ chuỗi cũ: mỗi bước phụ thuộc bước trước
        if not isinstance(deps, list) or any(not isinstance(dep, int) or isinstance(dep, bool) for dep in deps):
            raise ValueError(f"subtask[{i}].depends_on phải là mảng số thứ tự")
        st["depends_on"] = deps
    check_dag(subtasks)
    acceptance = plan.get("acceptance")
    if acceptance is not None:
        if not isinstance(acceptance, list) or not acceptance or any(
                not isinstance(item, str) or not item.strip() for item in acceptance):
            raise ValueError("acceptance phải là mảng chuỗi không rỗng")
    feature_plan = ((acceptance is not None or any(st.get("layer") for st in subtasks))
                    and (len(subtasks) > 1 or any(st.get("layer") in ("db", "backend") for st in subtasks)))
    if feature_plan:
        for i, st in enumerate(subtasks):
            if not RUNNABLE.match(st["verify"].strip()):
                raise ValueError(f"subtask[{i}].verify phải là lệnh chạy được (node --test/curl/pytest/...): {st['verify'][:80]}")
        for item in acceptance or []:
            if not RUNNABLE.match(item.strip()):
                raise ValueError(f"acceptance phải là lệnh chạy được: {item[:80]}")
    caps = plan.get("capabilities") or []
    if not isinstance(caps, list):
        raise ValueError("capabilities phải là mảng")
    plan["capabilities"] = caps
    return plan


def check_files(plan: dict, source, sha: str | None) -> None:
    """Mỗi subtask.file phải có ở `sha` hoặc là đường mới được phép; không 2 subtask cùng file.
    Ghi lại file đã chuẩn hoá (posix, bỏ ./) và layer (suy ra nếu thiếu). Raise ValueError nêu file sai.
    sha None → chỉ kiểm trùng/đường dẫn, không kiểm tồn tại."""
    import path_policy
    seen: list[str] = []
    db_files: list[str] = []
    for st in plan["subtasks"]:
        file = st["file"] = posixpath.normpath(st["file"].strip().replace("\\", "/").lstrip("./"))
        if file in seen:
            raise ValueError(f"2 subtask cùng sửa {file} — gộp thành 1")
        seen.append(file)
        st["layer"] = st.get("layer") or infer_layer(file)
        denied = path_policy.check(file, "write")
        if not denied["allow"]:
            raise ValueError(f"file '{file}' nằm ngoài vùng được phép: {denied['reason']}")
        if st["layer"] == "db":
            if not DB_MIGRATION.match(file):
                raise ValueError("subtask db phải là migration mới: server/contexts/_ai-generated/<name>/migrations/<file>.sql")
            db_files.append(file)
        elif st["layer"] == "backend" and not file.startswith(GEN_CONTEXT):
            raise ValueError("subtask backend chỉ được trong server/contexts/_ai-generated/<name>/")
    must_exist = [f for f in seen if not _NEW_OK.match(f)]
    if sha is None:
        return
    try:  # 1 tiến trình git cho mọi file
        found = set(code_index.git(source, "ls-tree", "--name-only", sha, "--", *must_exist)
                    .decode("utf-8", "replace").splitlines()) if must_exist else set()
        existing_migrations = set(code_index.git(source, "ls-tree", "--name-only", sha, "--", *db_files)
                                  .decode("utf-8", "replace").splitlines()) if db_files else set()
    except OSError:
        found, existing_migrations = set(), set()
    missing = [f for f in must_exist if f not in found]
    if missing:
        raise ValueError(f"file '{missing[0]}' không có trong repo — chọn file có trong REPO DATA")
    if existing_migrations:
        raise ValueError(f"migration '{sorted(existing_migrations)[0]}' đã tồn tại — migration phải additive (file mới)")


SEARCH_PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "search_terms.md").read_text(encoding="utf-8")


def parse_search_terms(text: str) -> list[str]:
    """Up to 4 literal strings from {"terms": [...]}; anything malformed gives no terms (the plan call still runs)."""
    try:
        terms = json.loads(text).get("terms")
    except (TypeError, ValueError, AttributeError):
        return []
    if not isinstance(terms, list):
        return []
    clean = [t.strip() for t in terms if isinstance(t, str) and 3 <= len(t.strip()) <= 60 and chr(10) not in t]
    return list(dict.fromkeys(clean))[:4]


def ask_search_terms(request: dict, deps, budget, *, db_path=None, proposal_id: int | None = None) -> list[str]:
    schema = {"type": "object", "additionalProperties": False, "properties": {"terms": {"type": "array", "maxItems": 4,
              "items": {"type": "string", "maxLength": 60}}}, "required": ["terms"]}
    prompt = SEARCH_PROMPT.format(subject=request.get("subject", ""), body=re.sub(r"^\s*\[Trang:.*$", "", request.get("body") or "", flags=re.M))
    body = deps.call_model(deps.models.gate1_model, prompt, gate=1, budget=budget, format=schema, db_path=db_path,
                           proposal_id=proposal_id, prompt_name="search_terms.md", options={"num_predict": 256})
    return [] if body.get("done_reason") == "length" else parse_search_terms(body.get("response", ""))


def new_files(plan: dict, source, sha: str | None) -> set[str]:
    """Plan files that do not exist at sha: a new file has no source line to match (feature adds files)."""
    files = [st["file"] for st in plan["subtasks"]]
    if sha is None or not files:
        return set()
    try:
        found = set(code_index.git(source, "ls-tree", "--name-only", sha, "--", *files)
                    .decode("utf-8", "replace").splitlines())
    except OSError:
        return set()
    return {f for f in files if f not in found}


def run(request: dict, deps, budget, *, db_path=None, proposal_id: int | None = None,
        source=None, sha: str | None = None) -> dict:
    """1 lời gọi GATE1_MODEL (+1 lần hỏi lại nếu plan sai schema/file), tính phí budget.
    source/sha: repo + commit để đọc context (mặc định repo chứa harness, HEAD).
    db_path/proposal_id có cả hai thì ghi gate_trace — thiếu 1 thì bỏ qua, không phải lỗi."""
    source = source or ROOT
    trace0 = getattr(deps, "trace", None)
    if os.environ.get("AI_BOARD_RETRIEVAL") == "model" and budget.can_afford():
        terms = ask_search_terms(request, deps, budget, db_path=db_path, proposal_id=proposal_id)
        request = {**request, "_search_terms": terms}
        if trace0:
            trace0.note("tool", "search_terms", f"the model asked the harness to search for: {', '.join(terms) or '(nothing usable)'}")
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
            trace.note("knows", "request", f"{request.get('subject') or ''} — {str(request.get('body') or '')[:300]}",
                       {"domain": request.get("domain"), "type": request.get("type")})
            context.report(trace, ctx)
        elif trace:
            trace.note("knows", "retry feedback", reason)
        ask = prompt if not attempt else prompt + RETRY_SUFFIX.format(reason=reason)
        skill_context = {'task_type': request.get('task_type'), 'file': (ctx.get('targets') or [''])[0]}
        react = None
        if not attempt and react_plan.enabled():
            react = react_plan.run(prompt, deps, budget, model=deps.models.gate1_model, source=source, sha=commit,
                                   db_path=db_path, proposal_id=proposal_id, skill_context=skill_context)
        body = react or deps.call_model(deps.models.gate1_model, ask, gate=1, budget=budget,
                                        db_path=db_path, proposal_id=proposal_id, prompt_name="brainstorm.md",
                                        skill_context=skill_context,
                                        # Lượt sửa plan: phá vòng lặp của model nhỏ (LF/106).
                                        options=({"temperature": 0.7, "top_p": 0.9, "presence_penalty": 0.4}
                                                 if os.environ.get("AI_BOARD_PLAN_REPAIR") == "1" else None))
        stage = "plan parse"
        try:
            plan = parse_plan(body.get("response", ""))
            # Gộp subtask cùng file NGAY sau khi parse: validator cổng 1 từ chối plan trùng file
            # trước khi tới _canonical, nên gộp muộn hơn là vô nghĩa.
            if isinstance(plan, dict) and plan.get("subtasks"):
                plan = {**plan, "subtasks": merge_same_file(plan["subtasks"])}
            judge(stage, True, plan.get("summary_vi", ""))
            stage = "files exist"
            check_files(plan, source, commit)
            judge(stage, True, ", ".join(task["file"] for task in plan["subtasks"]))
            stage = "renderer match"
            required = functional.expected_targets({'request_title': request.get('subject'), 'request_detail': request.get('body')})
            if required.intersection(ctx.get('targets') or []) and not required.intersection(task['file'] for task in plan['subtasks']):
                raise ValueError('Use the existing feature renderer: ' + ', '.join(sorted(required)))
            added = new_files(plan, source, commit)
            feature = request.get('type') == 'feature' or bool(request.get('complexity_by_server'))
            if added and feature:
                # A feature adds files that do not exist yet: no "most quoted file" to edit, so record the
                # recommendation instead of blocking the plan (path/layer rules still apply). An edit request
                # that names a file absent from the base still has to pick the best-matching file.
                judge(stage, True, f"{best_match.REASON_CODE}: plan adds new files ({', '.join(sorted(added))}); "
                                   f"best-match {ctx.get('best_match') or '(none)'}")
            else:
                best_match.enforce(ctx.get('best_match'), {task['file'] for task in plan['subtasks']},
                                   f"Sửa file khớp nhiều cụm người dùng viết nhất: {ctx.get('best_match')}", judge)
            judge(stage, True, f"best-match file: {ctx.get('best_match') or '(none)'}")
        except ValueError as e:
            judge(stage, False, str(e))
            reason = str(e)
            continue
        return {"gate": 1, "blocked": False, "reason": None, "plan": plan,
                "skill": ctx["skill"], "context_chars": ctx["chars"], "repo_context": ctx['text'],
                'source_targets': ctx.get('targets') or [], 'best_match': ctx.get('best_match'),
                **({'react_quotes': react['quotes']} if react else {})}
    return {"gate": 1, "blocked": True, "reason": f"plan không hợp lệ: {reason}", "plan": None,
            "skill": ctx["skill"], "context_chars": ctx["chars"], "repo_context": ctx["text"],
            "source_targets": ctx.get("targets") or [], "best_match": ctx.get("best_match")}
