"""Cổng 4 — static-check + minimalism guard. Nửa CƠ HỌC của
ponytail/caveman minimalism (nửa kia là prompt cố định của cổng 3):
`node --check` trên JS sinh ra, lint import (code AI sinh chỉ được chạm
`ctx.surface.*`; import MỚI vào `db.js` hay context khác bị chặn — import đã có
sẵn ở base thì không tính, nếu không thì không sửa được module nào vốn đã import
db/admin), và
so kích thước diff với ước lượng size khai trong plan (`small`/`large`, xem
gates/brainstorm.py), và kiểm chéo hợp đồng giữa các bước (route/bảng/export mà bước
này dùng nhưng file của bước kia không định nghĩa — gates/subtask_contract.py). Import cấm
/ lỗi cú pháp → BLOCK thật (không có gì chạy được thì không có gì để review). Vượt ~2x
ước lượng hoặc chạm file ngoài plan → KHÔNG block, chỉ gắn cờ `needs_careful_review=True`
(cổng 5.5 đọc cờ này khi có) — "flagged, not silently passed", không phải "rejected".
"""
from __future__ import annotations

import html
import posixpath
import re
import subprocess
import unicodedata
from collections import Counter
from pathlib import Path

import path_policy

from services import candidate
from security import classifier, spotlight
from gate5 import functional
from gates import adversarial_review, best_match, change_class, guard, intake_guard, intent_review, reviewer_fix, risk_triage, subtask_contract
from repositories import code_index, repo_at_commit, server_hsm
from settings import get_settings
from runtime import levels, limits, subtask_files
from runtime.budgets.budget import BudgetExhausted

CONTENT_PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "content_guard.md").read_text(encoding="utf-8")
CONTENT_LABELS = tuple(x for x in intake_guard.LABELS
                       if x not in ("privileged_area", "money", "personal_data", "copyright", "off_topic"))
# prompt_injection trên chữ hiển thị do guard.scan quyết định (tất định); nhãn cùng tên của model chỉ là
# tín hiệu cho người soát — model từng gán nhãn này cho câu vô nghĩa/ghi chú giao diện (đo 2026-11-04).
ADVISORY_LABELS = ("prompt_injection",)
MAX_CONTENT_CHARS = limits.prompt_cap_chars("static_content")

# ponytail: hằng số ước lượng dòng/size, không đo thật từ template — đủ cho
# ngưỡng "vượt xa" (2x). Cần chính xác hơn thì hiệu chuẩn qua gold set.
SIZE_ESTIMATE_LINES = {"small": 30, "large": 80}
OVERSIZE_MULTIPLIER = 2

# `from '...'` (static import) LẪN `import('...')` (dynamic import, ES2020) —
# thiếu nhánh dynamic là lỗ hổng thật: `await import('../../db.js')` lách qua
# lint mà cú pháp vẫn hợp lệ 100% (node --check không bắt được vì đây không
# phải lỗi cú pháp). `require('...')` (CommonJS) vẫn giữ.
_IMPORT_PATH = re.compile(r"""(?:from\s+|import\(\s*|require\(\s*)['"]([^'"]+)['"]""")
_CORE_ACCESS = re.compile(r"\bctx\.core\b")
# 1 context KHÁC _ai-generated, dạng path đã resolve (vd 'server/contexts/admin/index.js').
_OTHER_CONTEXT = re.compile(r"(^|/)contexts/(?!" + path_policy.GENERATED_DIR + r"/)[^/]+/")
_CONTEXT_ROOT = re.compile(r"(?:^|.*/)contexts/([^/]+)/")


def _context_of(path: str):
    """Tên context chứa path (None nếu không nằm trong contexts/<name>/)."""
    match = _CONTEXT_ROOT.search(path)
    return match.group(1) if match else None


def _resolved_imports(code: str, base: str) -> list[tuple[str, str]]:
    """[(spec, path đã resolve)] cho import tương đối trong `code`, base = thư mục file."""
    found = []
    for m in _IMPORT_PATH.finditer(code or ""):
        spec = m.group(1)
        if not spec.startswith('.'):
            continue
        found.append((spec, posixpath.normpath(posixpath.join(base, spec))))
    return found


def _posix(path: str) -> str:
    """Model JSON trả path dạng chuỗi tự do — chuẩn hoá backslash (Windows-
    style, nếu model lỡ trả) về forward-slash TRƯỚC khi so/parse, vì mọi regex
    ở file này (_OTHER_CONTEXT, đuôi 'db.js') giả định posix-style. Không
    chuẩn hoá thì 1 path kiểu 'server\\contexts\\admin\\index.js' lách qua
    lint êm re."""
    return path.replace('\\', '/')


def _added_lines_for_file(diff_text: str, file_path: str) -> int:
    """`git diff --cached` của implement.py gộp CẢ file implementation lẫn
    file test vào 1 diff (cùng 1 lần `git add -A` + `git diff --cached`, xem
    _write_and_diff). Đếm dòng '+' CHỈ trong đúng section `diff --git a/<file>
    b/<file>` của file_path — không tính lẫn dòng '+' của file test, vì
    SIZE_ESTIMATE_LINES chỉ ước lượng cho 1 file implementation, không phải
    cả cặp impl+test gộp lại (đếm gộp thổi phồng tỉ lệ flag sai cho mọi
    subtask có test tử tế)."""
    target = _posix(file_path)
    lines = diff_text.splitlines()
    if not any(line.startswith('diff --git ') for line in lines):
        # Không có header đa-file (diff 1 file thô, hoặc fixture test) — cả
        # diff coi như của đúng file_path, không có gì để tách.
        return sum(1 for line in lines if line.startswith('+') and not line.startswith('+++'))
    in_target = False
    count = 0
    for line in lines:
        if line.startswith('diff --git '):
            in_target = line.rstrip().endswith(f'b/{target}')
            continue
        if in_target and line.startswith('+') and not line.startswith('+++'):
            count += 1
    return count


def privileged_imports(code: str, file_path: str, base_code: str = "") -> list[str]:
    """New imports of server/db.js or another context's module, as 'spec -> resolved'."""
    base = posixpath.dirname(_posix(file_path))
    already = {resolved for _, resolved in _resolved_imports(base_code, base)}
    return [f"{spec} -> {resolved}" for spec, resolved in _resolved_imports(code, base)
            if resolved not in already and _privileged(resolved, file_path)]


def _privileged(resolved: str, file_path: str) -> bool:
    other_context = _OTHER_CONTEXT.search(resolved) and _context_of(resolved) != _context_of(_posix(file_path))
    return bool(resolved.endswith('db.js') or other_context)


_TEST_DIR = re.compile(r"^tests?/")


def _importable(code, test_path, planned_files, scratch_repo, base_read) -> frozenset:
    """Imports of a test file that exist (base, plan or checkout) and are not protected or money paths."""
    out = set()
    for _, resolved in _resolved_imports(code, posixpath.dirname(_posix(test_path))):
        names = [resolved + tail for tail in ("", ".js", "/index.js")]
        found = any(n in planned_files or (Path(scratch_repo) / n).is_file() or (base_read is not None and base_read(n) is not None) for n in names)
        if found and not any(path_policy.denied(n) or path_policy.refused(n) or n in guard.MONEY_PATHS for n in names):
            out.add(resolved)
    return frozenset(out)


def lint_imports(code: str, file_path: str, base_code: str = "", privileged_ok: bool = False,
                 allowed: frozenset = frozenset()) -> list[str]:
    """Trả list vi phạm (rỗng = sạch). Import tương đối ('./...'/'../...') được
    RESOLVE theo `file_path` trước khi so — chuỗi thô như '../../db.js' không
    tự chứa 'contexts/'/'db.js' theo nghĩa path thật nếu không resolve. Package
    import (express, ws…) không bắt đầu bằng '.' — bỏ qua, không phải path nội
    bộ cần chặn.

    `base_code` là nội dung file ở base: import đã có sẵn ở đó KHÔNG tính vi phạm
    (sửa một module protected vốn đã import db/admin là hợp lệ; cổng chặn import
    MỚI — quyền mới — chứ không chặn việc sửa module đã có quyền đó).
    """
    base = posixpath.dirname(_posix(file_path))
    already = {resolved for _, resolved in _resolved_imports(base_code, base)}
    violations = []
    for spec, resolved in _resolved_imports(code, base):
        if resolved in already or privileged_ok or resolved in allowed:
            continue
        # Context khác là ranh giới quyền thật; file cùng context thì không.
        if _privileged(resolved, file_path):
            violations.append(f"import cấm: '{spec}' (chạm {resolved})")
    if _CORE_ACCESS.search(code) and not _CORE_ACCESS.search(base_code):
        violations.append("truy cập ctx.core — plugin AI sinh chỉ nhận ctx.surface")
    return violations


def missing_imports(code: str, file_path: str, base_code: str, exists, locate) -> tuple[list[str], frozenset]:
    """(repair hints, resolved paths) for new relative imports of files that do not exist. `exists(path)` probes the tree; `locate(name)` = known paths with that basename, for the did-you-mean."""
    base = posixpath.dirname(_posix(file_path))
    already = {resolved for _, resolved in _resolved_imports(base_code, base)}
    hints, missing = [], set()
    for spec, resolved in _resolved_imports(code, base):
        if resolved in already or any(exists(resolved + tail) for tail in ("", ".js", "/index.js")):
            continue
        parts, match, known = resolved.split("/"), [], set(locate(posixpath.basename(resolved)))
        for i in range(1, len(parts)):  # longest tail first so a wrong leading dir (test/server/...) is dropped
            tail = "/".join(parts[i:])
            match = [c for c in known if c == tail or c.endswith("/" + tail)]
            if match:
                break
        if len(match) != 1 and _privileged(resolved, file_path):
            continue  # an unlocated privileged target stays a boundary violation
        missing.add(resolved)
        if len(match) == 1:
            fix = posixpath.relpath(match[0], base)
            hints.append(f"import '{spec}' resolves to '{resolved}', which does not exist; did you mean '{fix if fix.startswith('.') else './' + fix}'?")
        else:
            hints.append(f"import '{spec}' resolves to '{resolved}': file not found")
    return hints, frozenset(missing)


_TEST_PATH = re.compile(r"\b((?:tests?)/[\w./-]+\.(?:js|mjs))")


def _planned_tests(plan: dict) -> set[str]:
    """Test paths a plan verify names. The plan has no test field; a runnable verify like `node --test test/x.test.js` is the only trace."""
    named: set[str] = set()
    for st in plan["subtasks"]:
        named.update(_TEST_PATH.findall(str(st.get("verify") or "")))
    return named


def node_check(path: Path) -> str | None:
    """`node --check` 1 file .js dạng ES module (repo Tizia `"type": "module"`).
    Đọc qua stdin + `--input-type=module` thay vì truyền thẳng path — scratch
    repo (implement.py) không có package.json khai `"type"`, nên `node --check
    <path>` rơi vào suy đoán CommonJS/ESM không đáng tin (tự kiểm chứng: 1 file
    ESM cú pháp hỏng vẫn exit 0 khi thiếu ngữ cảnh "type":"module" xác nhận
    module-ness). None nếu sạch, string lỗi nếu không."""
    return syntax_error(path.read_text(encoding="utf-8"))


def syntax_error(code: str) -> str | None:
    """`node --check` trên chuỗi mã ES module. None nếu sạch, string lỗi nếu không."""
    # encoding tường minh: mặc định Windows là cp1252, chữ Việt làm luồng ghi stdin vỡ, stdin không đóng
    # và node chờ mãi (demo 2026-09-25 treo ở đây). timeout chặn mọi trường hợp treo khác.
    try:
        result = subprocess.run(
            ["node", "--input-type=module", "--check"],
            input=code, capture_output=True, text=True, encoding="utf-8",
            errors="replace", timeout=60,
        )
    except subprocess.TimeoutExpired:
        return "node --check quá 60 giây"
    return None if result.returncode == 0 else (result.stderr.strip() or "node --check thất bại")


def oversize_issues(state: dict) -> list[str]:
    """Cờ size (không chặn) cho file trong plan; đếm trên full_diff base..HEAD khi có, không thì diff scratch."""
    plan, diffs = state.get("plan") or {}, state.get("diffs") or []
    size_by_file = {_posix(st["file"]): st["size"] for st in plan.get("subtasks") or []}
    # Scratch repo không có base nên file sẵn có hiện như viết lại toàn bộ; diff thật base..HEAD thì không.
    full_diff = "".join(item.get("diff", "") for item in state.get("full_diff") or [])
    issues = []
    for d in diffs:
        file_path = _posix(d["file"])
        if file_path not in size_by_file:
            continue
        limit = SIZE_ESTIMATE_LINES[size_by_file[file_path]] * OVERSIZE_MULTIPLIER
        added = _added_lines_for_file(full_diff or d["diff"], file_path)
        if added > limit:
            issues.append(f"'{d['file']}': +{added} dòng, vượt {OVERSIZE_MULTIPLIER}x ước lượng ({limit})")
    return issues


def content_review(state: dict, deps, budget, *, db_path=None, proposal_id: int | None = None) -> dict | None:
    """LLM soát chữ hiển thị mới (prompts/content_guard.md). None nếu diff không đổi chữ hiển thị.
    Nhãn ≠ ok, model lỗi, JSON sai hay hết budget → blocked cần người (fail closed, không bao giờ tự duyệt).
    Dùng full_diff (base..HEAD) khi có; diff scratch coi file sẵn có như viết lại toàn bộ."""
    diffs = state.get("full_diff") or state.get("diffs") or []
    parts = []
    for item in diffs:
        text = item.get("diff", "")
        if not text.startswith("diff --git "):  # diff scratch 1 file thô, không header
            text = f"diff --git a/{item.get('file', '')} b/{item.get('file', '')}\n{text}"
        for path, deleted, added, *_ in guard._sections(text):
            visible = "" if deleted or guard._TEST_PATH.search(path) else guard.visible_text(path, added)
            if visible.strip():
                parts.append(f"[{path}] {intake_guard._fence(visible, MAX_CONTENT_CHARS)}")
    if not parts:
        return None
    labels = ["classifier_error"]
    blocking = labels        # nhãn còn được phép chặn (advisory bị loại)
    advisory: list[str] = []
    why = "hết budget, không gọi được bộ soát nội dung"
    outage = False  # the model could not be reached: nothing was judged, so this is retryable rather than a violation
    trace = getattr(deps, "trace", None)
    called = False
    if budget.tick():
        called = True
        if trace:
            trace.note("knows", "rendered text",
                       f"{len(parts)} segments from:{', '.join(part.split(']', 1)[0].lstrip('[') for part in parts)}")
        prompt = spotlight.fence(CONTENT_PROMPT).format(content=spotlight.scrub("\n".join(parts)[:MAX_CONTENT_CHARS]))
        try:
            server_hsm.authorize_action('model')
            body = deps.call_model(deps.models.gate1_model, prompt, gate=4, budget=budget,
                                   db_path=db_path, proposal_id=proposal_id, prompt_name="content_guard.md",
                                   format=intake_guard.labels_format(CONTENT_LABELS))
        except server_hsm.AuthorityError as error:
            return {"blocked": True, "labels": labels, "reason": str(error), "failure_class": error.failure_class}
        except BudgetExhausted as error:
            return {"blocked": True, "labels": labels, "reason": str(error), "failure_class": error.failure_class}
        except Exception as e:  # model sập/timeout — chuyển người soát (chạy lại được), không cho qua im lặng
            why, outage = f"bộ soát nội dung lỗi: {str(e)[:200]}", True
        else:
            try:
                labels, why = intake_guard.parse_labels(body.get("response", ""), CONTENT_LABELS), ""
            except Exception as e:  # trả lời không phải phán quyết hợp lệ — vẫn là chặn nghiêm trọng
                why = f"bộ soát nội dung lỗi: {str(e)[:200]}"
            else:
                advisory = [x for x in labels if x in ADVISORY_LABELS]
                blocking = [x for x in labels if x not in ADVISORY_LABELS] or ["ok"]
    if trace and called:  # before the classifier call, which records its own model call
        shown = [x for x in labels if x not in advisory] or ["ok"]
        trace.attach_last("evaluation", {"check": "content guard", "ok": blocking == ["ok"],
                                         "detail": ", ".join(shown) + (f" (advisory: {', '.join(advisory)})" if advisory else "")
                                         + (f" ({why})" if why else "")})
    # Logprob classifier beside the JSON guard: may only add a "needs a human" block.
    if (getattr(deps.models, "classifier_model", "") or getattr(deps.models, "routing", None)) and classifier.task_mode("danger") != "off":
        if not budget.tick():
            return {"blocked": True, "labels": labels, "reason": "content_guard: exhausted budget", "failure_class": "budget"}
        try:
            server_hsm.authorize_action('model')
        except server_hsm.AuthorityError as error:
            return {"blocked": True, "labels": labels, "reason": str(error), "failure_class": error.failure_class}
    scored = classifier.danger("\n".join(parts), deps, budget, gate=4, db_path=db_path, proposal_id=proposal_id)
    if scored and scored["escalate"]:
        blocking = [x for x in blocking if x != "ok"] + [f"model_{key}" for key in scored["labels"]]
    extra = {"classifier": scored} if scored else {}
    extra["advisory"] = advisory
    if blocking == ["ok"]:
        return {"blocked": False, "labels": blocking, **extra}
    reason = f"content_guard: {', '.join(blocking)}" + (f" ({why})" if why else "") + " — cần người soát"
    failure_class = "budget" if not called else "transient" if outage and blocking == ["classifier_error"] else guard.SEVERITY_CLASS["high"]
    return {"blocked": True, "labels": blocking, "reason": reason, "failure_class": failure_class, **extra}


def run(state: dict, *, check_size: bool = True, deps=None, budget=None, db_path=None,
        proposal_id: int | None = None) -> dict:
    """Điểm vào cho main.run_gate. Đọc state['plan'] (cổng 1) + state['diffs']/
    state['scratch_repo'] (cổng 3). Không gọi model — trừ khi có cả deps.models lẫn budget: khi đó
    chữ hiển thị mới đi qua content_review (1 lời gọi gate1_model, gate=4).
    check_size=False: bỏ cờ size để caller tính lại trên full_diff (oversize_issues)."""
    plan = state.get("plan")
    diffs = state.get("diffs")
    if not plan or not diffs:
        return {"gate": 4, "blocked": True, "reason": "không có plan/diffs từ cổng 1/3", "needs_careful_review": True}

    planned_files = {_posix(path) for st in plan["subtasks"] for path in subtask_files.files_of(st)}
    planned_tests = _planned_tests(plan)
    scratch_repo = state.get("scratch_repo")
    # Import đã có ở base không phải vi phạm: cổng chỉ chặn import MỚI (quyền mới).
    base_read = levels.source_reader(state.get("checkout_source"), state.get("base_sha")) if state.get("checkout_source") else None
    base_cache: dict[str, str] = {}

    def base_code(path: str) -> str:
        if base_read is None:
            return ""
        if path not in base_cache:
            base_cache[path] = base_read(path) or ""
        return base_cache[path]

    check_header = get_settings().file_header_check
    outside_on, role = get_settings().out_of_plan_files, state.get("requester_role") or "student"
    out_of_plan: set[str] = set()
    issues: list[str] = oversize_issues(state) if check_size else []
    needs_careful_review = bool(issues)
    for d in diffs:
        file_path = _posix(d["file"])
        in_plan = file_path in planned_files
        if not in_plan:
            # File NGOÀI plan là chính xác trường hợp đáng ngờ nhất — flag để
            # người soát để ý, nhưng KHÔNG bỏ qua lint/node-check bên dưới:
            # đây là điểm cũ từng có `continue` ở đây, vô tình miễn luôn kiểm
            # tra import cấm/cú pháp cho đúng file dễ bị lợi dụng nhất.
            issues.append(f"file '{d['file']}' không có trong plan")
            needs_careful_review = True

        extras = [_posix(path) for path in d.get("extra_files") or []]
        stray = [path for path in extras if path not in planned_files]
        if outside_on:
            out_of_plan.update(path for path in stray if path_policy.outside_plan_ok(path, role))
            stray = [path for path in stray if path not in out_of_plan]
        if stray:
            reason = f"file ngoài plan trong diff: {_clip_list(stray)}"
            return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True,
                    "issues": [*issues, reason], "failure_class": "critical"}

        if not scratch_repo:
            continue
        for candidate in (file_path, _posix(d.get("test_file", "")), *extras):
            if not candidate:
                continue
            path = Path(scratch_repo) / candidate
            if not path.exists() or path.suffix not in (".js", *code_index.HEADER_EXTS):
                continue
            code = path.read_text(encoding="utf-8")
            if check_header and base_read is not None and base_read(candidate) is None and not code_index.file_header(candidate, code):
                reason = f"'{candidate}': file mới thiếu dòng chú thích đầu file nói file dùng để làm gì"
                return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True,
                        "issues": [*issues, reason], "failure_class": "ordinary"}
            if path.suffix != ".js":
                continue
            # Flag on, mounted context: db/other-context imports are the context convention; the admin hold reviews them.
            mounted = path_policy.fullstack_on() and path_policy.mounted_context(candidate)
            # A generated test may import a server file the plan itself edits (critical_only_checks + fullstack zone).
            plan_edits = (frozenset(planned_files) if candidate == _posix(d.get("test_file") or "") and candidate != file_path
                          and functional.tolerant_literals() and path_policy.fullstack_on() else frozenset())
            if functional.tolerant_literals():
                def exists(rel, _root=Path(scratch_repo)):
                    return rel in planned_files or (_root / rel).is_file() or (base_read is not None and base_read(rel) is not None)
                def locate(name, _root=Path(scratch_repo)):
                    named = {x for x in planned_files | {_posix(d["file"]) for d in diffs} if posixpath.basename(x) == name}
                    return named | {q.relative_to(_root).as_posix() for q in _root.rglob(name) if "node_modules" not in q.parts}
                hints, gone = missing_imports(code, candidate, base_code(candidate), exists, locate)
                plan_edits = plan_edits | gone
                if hints:
                    reason = f"'{candidate}': {'; '.join(hints)}"
                    return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True,
                            "issues": [*issues, reason], "failure_class": "ordinary"}
            if functional.tolerant_literals() and _TEST_DIR.match(candidate):
                plan_edits = plan_edits | _importable(code, candidate, planned_files, scratch_repo, base_read)
            bad_imports = lint_imports(code, candidate, base_code(candidate), privileged_ok=mounted, allowed=plan_edits)
            if mounted:
                state["privileged_imports"] = sorted({*state.get("privileged_imports", ()),
                                                      *(f"{candidate}: {item}" for item in
                                                        privileged_imports(code, candidate, base_code(candidate)))})
            if bad_imports:
                reason = f"'{candidate}': {'; '.join(bad_imports)}"
                return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True,
                        "issues": [*issues, reason], "failure_class": "critical"}
            err = node_check(path)
            if err and candidate != file_path and candidate not in extras:
                oracle = functional.select(state)
                if oracle or candidate not in planned_tests:
                    # Harness oracle or no plan entry: a model-invented test that cannot be parsed is dropped, never shipped.
                    why = "the harness oracle verifies this request" if oracle else "no plan verify names this test"
                    path.unlink()
                    d["test_file"] = None
                    issues.append(f"generated test '{candidate}' dropped (syntax error; {why}): {err[:200]}")
                    continue
            if err:
                reason = f"'{candidate}' node --check: {err}"
                return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True,
                        "issues": [*issues, reason], "failure_class": "ordinary"}

    # Hợp đồng giữa các bước: file này dùng route/bảng/tên của file kia thì file kia phải định
    # nghĩa. Chặn sửa được (ordinary), không bao giờ cho qua im lặng; mơ hồ thì không chặn.
    findings = subtask_contract.cross_check(state)
    report = {"contract": subtask_contract.evidence(plan),
              "cross_check": subtask_contract.findings_evidence(findings)}
    if findings:
        reason = "; ".join(subtask_contract.describe(finding) for finding in findings)[:600]
        return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True,
                "issues": [*issues, reason], "failure_class": "ordinary", **report}

    if out_of_plan:
        uncovered = _uncovered_logic(sorted(out_of_plan), diffs, scratch_repo)
        if uncovered:
            state["outside_cover_tries"] = tries = state.get("outside_cover_tries", 0) + 1
            reason = f"file logic ngoài plan thiếu test phủ: {_clip_list(uncovered)}"
            return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True,
                    "issues": [*issues, reason], "failure_class": "ordinary" if tries == 1 else "critical"}
    if outside_on:
        report["files"] = {"in_plan": sorted(planned_files & {_posix(d["file"]) for d in diffs}),
                           "out_of_plan": sorted(out_of_plan)}

    advisory: list[str] = []
    if deps is not None and budget is not None and getattr(deps, "models", None) is not None:
        review = content_review(state, deps, budget, db_path=db_path, proposal_id=proposal_id)
        if review and review["blocked"]:
            return {"gate": 4, "blocked": True, "reason": review["reason"], "needs_careful_review": True,
                    "issues": [*issues, review["reason"]], "failure_class": review["failure_class"],
                    "content_labels": review["labels"], **report}
        advisory = (review or {}).get("advisory") or []
    return {"gate": 4, "blocked": False, "reason": None,
            "needs_careful_review": needs_careful_review or bool(advisory),
            "issues": issues, "content_advisory": advisory, **report}


def _clip_list(paths: list[str], limit: int = 600) -> str:
    """Join paths up to limit chars; rest counted."""
    shown, size = [], 0
    for path in paths:
        if shown and size + len(path) + 2 > limit:
            break
        shown.append(path)
        size += len(path) + 2
    rest = len(paths) - len(shown)
    return ", ".join(shown) + (f" (+{rest} file nữa)" if rest else "")


def _uncovered_logic(paths: list[str], diffs: list[dict], scratch_repo) -> list[str]:
    """Out-of-plan logic files (not display-only) that no generated test names."""
    tests = []
    for d in diffs:
        test = d.get("test_file")
        if test and scratch_repo and (Path(scratch_repo) / test).exists():
            tests.append((Path(scratch_repo) / test).read_text(encoding="utf-8"))
    return [p for p in paths if not change_class.display_only([(p, "", "x")])
            and not any(path_policy.names_scope(text, [p]) for text in tests)]


def _base_public_contacts(state: dict) -> set[str]:
    """Contacts already in public/ at the base commit; empty without a worktree (nothing allowlisted)."""
    checkout, base = state.get("full_checkout"), state.get("base_sha")
    if not checkout or not base:
        return set()
    # ponytail: crude "@ or 9 digits" line prefilter, exact matching is contacts_in; fine while public/ stays small.
    try:
        out = repo_at_commit.grep(checkout, base, ["-I", "-h", "-E", "@|[0-9]{9}"], ("public",))
    except OSError:
        out = ""
    return guard.contacts_in(out)


_TAG_ONLY = re.compile(r"\s*(?:<[^>]*>\s*)*")


def _ws(text: str) -> str:
    return " ".join(unicodedata.normalize("NFC", html.unescape(text)).split())


def _hunks(diff_text: str) -> list[tuple[str, list[tuple[str, str]]]]:
    """(path, [(sign, line)]) per hunk of non-test files; '-' lines kept, the new-file view is the rest."""
    hunks = []
    for chunk in re.split(r"^(?=diff --git )", diff_text, flags=re.M):
        path = chunk.splitlines()[0].split(" b/", 1)[-1].strip() if chunk.startswith("diff --git ") else ""
        if not path or guard._TEST_PATH.search(path):
            continue
        for body in re.split(r"^@@[^\n]*\n", chunk, flags=re.M)[1:]:
            hunks.append((path, [(line[0], _ws(line[1:])) for line in body.splitlines() if line[:1] in (" ", "+", "-")]))
    return hunks


def _existing(checkout, paths: list[str], text: str, added: int) -> bool:
    """Changed files hold text beyond what the diff adds: a reference the request points at, not new text."""
    count = 0
    for path in paths if checkout else ():
        try:
            count += _ws((Path(checkout) / path).read_text(encoding="utf-8")).count(text)
        except (OSError, UnicodeDecodeError):
            continue
    return count > added


def _follows(view: list[tuple[str, str]], at: int, text: str, anchor: str) -> bool:
    """Added line `at` holds text right after the anchor: same line, or only tag lines between them; hunk start = unknown, passes."""
    if anchor in view[at][1] and view[at][1].index(anchor) < view[at][1].index(text):
        return True
    for _, line in reversed(view[:at]):
        if anchor in line:
            return True
        if not _TAG_ONLY.fullmatch(line):
            return False
    return True


def _pieces(line: str, text: str) -> list[str]:
    """Text between tags holding `text`; else the string literals/attribute values holding it; else the whole line."""
    found = [piece.strip() for piece in re.split(r"<[^>]*>", line) if text in piece]
    if found:
        return found
    values = [value for value in _literals(line) if text in value]
    return values or ([line] if text in line else [])


_STRING = re.compile(r"""(["'`])((?:\.|(?!\1).)*)\1""")


def _literals(line: str) -> list[str]:
    """Quoted, backtick or attribute string values on a line."""
    return [m.group(2).strip() for m in _STRING.finditer(line)]


def _segments(line: str) -> set[str]:
    """What one line can show: the whole line, each text between tags, each string literal / attribute value (and its inner text)."""
    values = _literals(line)
    parts = [line, *values, *(piece for text in [line, *values] for piece in re.split(r"<[^>]*>", text))]
    return {seg.strip() for seg in parts if seg.strip()}


def _kind(line: str) -> str:
    """Head-only lines (meta, title, comment) are a different kind of element than page content."""
    return "meta" if line.startswith("<meta") else "comment" if "<!--" in line else "title" if "<title" in line else ""


def _shown(rows, kinds: set[str]) -> Counter:
    """Segments of the added lines whose kind is one of `kinds`."""
    return Counter(seg for sign, line in rows if sign == "+" and _kind(line) in kinds for seg in _segments(line))


def _by_hunk(hunks) -> dict[str, list[list[tuple[str, str]]]]:
    files: dict[str, list[list[tuple[str, str]]]] = {}
    for path, hunk in hunks:
        files.setdefault(path, []).append(hunk)
    return files


def _page_path(path: str) -> bool:
    return bool(re.search(r"\.html?$", path))


def _loads(checkout, page: str, script: str) -> bool:
    """The page's own script links include `script`; unknown without a checkout counts as yes (no certain finding)."""
    try:
        text = (Path(checkout) / page).read_text(encoding="utf-8")
    except (OSError, TypeError, UnicodeDecodeError):
        return checkout is None
    return script in code_index.parse(page, text)["links"]["js"]


def _replacement_misses(pairs: list[tuple[str, str]], hunks, several, checkout=None) -> tuple[list[str], set[str]]:
    """Per replace pair: each removed segment holding the old text needs its exact replacement as an added segment of the same hunk
    (head-only lines only count when the removed element was one); failing that, the identical element with only the text
    changed in another hunk of the file. A removed line that comes back unchanged (reindent) is not a target.
    Several pages (or scripts no touched page loads) holding the old text = one miss unless the request names several places.
    Returns (misses, new texts judged this way); a pair whose old text no hunk removes is left to the plain presence check."""
    misses, judged = [], set()
    files = _by_hunk(hunks)
    for old, text in pairs:
        old, text = _ws(old), _ws(text)
        found: dict[str, list[str]] = {}
        for path, group in files.items():
            moved = [{line for sign, line in rows if sign == "+"} for rows in group]
            for i, rows in enumerate(group):
                unchanged = Counter(line for sign, line in rows if sign == "+")
                before = []
                for sign, line in rows:
                    if sign != "-" or old not in line:
                        continue
                    if unchanged[line]:
                        unchanged[line] -= 1
                    else:
                        before += [(seg, line) for seg in _pieces(line, old)]
                if not before:
                    continue
                judged.add(text)
                found.setdefault(path, [])
                added = _shown(rows, {_kind(line) for _, line in before})
                for seg, line in before:
                    want = seg.replace(old, text)
                    alike = added[want] and want or next((a for a in added if added[a] and _tolerant_hit(want, [a])
                                                          and functional.literal_key(a) == functional.literal_key(want)), None)
                    if alike:
                        added[alike] -= 1
                    elif any(line.replace(old, text) in other for j, other in enumerate(moved) if j != i):
                        continue
                    else:
                        near = next((a for a in sorted(added) if text.rstrip(".!?…") in a or want[:12] in a), None)
                        found[path].append(f'{path}: đổi "{old}" thành "{text}": phần tử "{seg[:80]}" phải thành đúng "{want[:120]}", '
                                           + (f'đang là "{near[:120]}"' if near else "không có phần tử thay thế trong dòng thêm"))
        pages = [path for path in found if _page_path(path)]
        units = pages + [path for path in found if not _page_path(path) and not any(_loads(checkout, page, path) for page in pages)]
        if len(units) > 1 and not several(units):
            keep = [path for path in units if not found[path]]
            misses.append(f'đổi "{old}" thành "{text}" chỉ ở MỘT trang yêu cầu chỉ tới, diff đang sửa {len(units)} file ({", ".join(units)}): '
                          + (f"giữ {keep[0]}, hoàn tác các file khác" if keep else
                             f"giữ đúng một trang (sửa thành đúng chữ mới), hoàn tác các file khác; {next(m for p in units for m in found[p])}"))
        else:
            misses += [m for path in found for m in found[path]]
    return misses, judged


def _colon_misses(texts: list[str], hunks) -> list[str]:
    """Unquoted 'thành: X': a hunk that removes something must add, in an element of the removed kind, a segment, string literal
    or attribute value equal to X; X elsewhere does not count."""
    misses = []
    for text in map(_ws, texts):
        if any(any(sign == "-" for sign, _ in rows) and _shown(rows, {_kind(line) for sign, line in rows if sign == "-"})[text]
               for _, rows in hunks):
            continue
        if any(any(sign == "-" for sign, _ in rows) and _tolerant_hit(text, list(_shown(rows, {_kind(line) for sign, line in rows if sign == "-"})))
               for _, rows in hunks):
            continue
        path, closest = next(((path, line) for path, rows in hunks for sign, line in rows
                              if sign == "+" and text.rstrip(".!?…") in line), (", ".join(dict.fromkeys(p for p, _ in hunks)), None))
        misses.append(f'{path}: chữ yêu cầu "{text}" phải là đúng nguyên văn một phần tử trong dòng thêm thay cho chữ cũ (từng ký tự, cả dấu câu)'
                      + (f'; dòng đang thêm: "{closest[:120]}"' if closest else ""))
    return misses


def _several(state: dict, homes: list[str], checkout) -> bool:
    """Request names several places, by the plan gate's resolver on the candidate tree; undecidable without a tree counts as yes."""
    if functional.all_pages(state) or not checkout:
        return True
    request = {"subject": functional.guest_input(state, "request_title"), "body": functional.guest_input(state, "request_detail")}
    sha = state.get("base_sha") or "HEAD"
    try:
        code_index.git(checkout, "rev-parse", "--verify", f"{sha}^{{commit}}")
    except OSError:
        return True
    return best_match.requested_page(request, homes, checkout, sha)[1]


def _missing_tail(text: str, closest: str | None) -> str:
    """Repair hint naming the dropped trailing punctuation and the exact literal to paste; "" when flag off or nothing dropped."""
    stem = text.rstrip(".!?…")
    if not (get_settings().literal_exact_feedback or functional.tolerant_literals()) or not closest or stem == text or stem not in closest or text in closest:
        return ""
    return f'; thiếu ký tự "{text[len(stem):]}" ngay sau "{stem}"; dán đúng nguyên văn "{text}"'


def _tolerant_hit(text: str, lines) -> bool:
    """critical_only_checks: `text` sits in one of `lines` up to entities, Unicode form, spacing and trailing punctuation."""
    if not functional.tolerant_literals():
        return False
    key = functional.literal_key(text)
    return bool(key) and any(key in functional.literal_key(line) for line in lines)


# Placeholder slot: lone N/M/X/Y/K, <name> or {name}; "Lớp A" stays a literal.
_SLOT = re.compile(r"(?<![\w])(?:[NMXYK]|<[^<>]+>|\{[^{}]+\})(?![\w])")


def is_template(text: str) -> bool:
    """Quoted text is a format with value slots ("N chế độ · M sẵn sàng"), not words to copy verbatim."""
    return bool(_SLOT.search(text))


# readFileSync('<x>.js') in a test: the assertion is on the code's text, so it passes once the text is typed.
_READ_JS = re.compile(r"""readFileSync\(\s*(?:new URL\(\s*)?['"`]([^'"`]+\.(?:m?js|cjs))['"`]""")


def source_text_tests(diff_text: str) -> list[str]:
    """Added test files that read a JS module as text instead of importing and calling it."""
    misses = []
    for chunk in re.split(r"^(?=diff --git )", diff_text, flags=re.M):
        path = chunk.splitlines()[0].split(" b/", 1)[-1].strip() if chunk.startswith("diff --git ") else ""
        if not path or not guard._TEST_PATH.search(path):
            continue
        added = "\n".join(line[1:] for line in chunk.splitlines() if line.startswith("+") and not line.startswith("+++"))
        for module in dict.fromkeys(m.group(1) for m in _READ_JS.finditer(added)):
            misses.append(f"{path}: test đọc {module} như chữ (readFileSync) rồi so chuỗi, nên xanh ngay khi chữ được gõ vào; "
                          f"import module đó và gọi hàm với input thật, assert kết quả")
    return misses


def literal_misses(state: dict, diff_text: str, checkout=None) -> list[str]:
    """Requester's literals the non-test diff does not carry verbatim, as repair reasons; [] when none pinned.
    checkout = candidate tree; text already in a changed file counts as a reference, not as text to add."""
    want = functional.text_expectation(state)
    anchor = functional.anchor(state)
    raw = functional._request_raw(state)
    pairs = functional.replace_pairs(state) if want["absent"] else []
    colon = [_ws(t) for t in functional.colon_replace(state)]
    hunks = _hunks(diff_text)
    paths = list(dict.fromkeys(path for path, _ in hunks))
    misses, judged = _replacement_misses(pairs, hunks, lambda homes: _several(state, homes, checkout), checkout)
    misses += _colon_misses(colon, hunks)
    present = [text for _, text in pairs] or want["present"]
    new = list(dict.fromkeys(_ws(t) for t in present if _ws(t) != _ws(anchor or "") and not functional._is_css_selector(t)))
    new = [text for text in new if text not in judged and text not in colon and not is_template(text)]
    added = {text: sum(line.count(text) for _, hunk in hunks for sign, line in hunk if sign == "+") for text in new}
    # Only the changed files count: text that sits on another page still has to be added where the request asks.
    new = [text for text in new if not _existing(checkout, paths, text, added[text])]
    if functional.quoted(raw) and not want["absent"] and len(new) > 1:
        new = []  # a plain add quoting several texts: which one is new is not pinned down
    plus = [line for _, hunk in hunks for sign, line in hunk if sign == "+"]
    for text in new:
        if not added[text] and not _tolerant_hit(text, plus):
            path, closest = next(((path, line) for path, hunk in hunks for sign, line in hunk
                                  if sign == "+" and text.rstrip(".!?…") in line), (", ".join(paths), None))
            misses.append(f'{path}: chữ yêu cầu "{text}" phải có nguyên văn (từng ký tự, cả dấu câu) trong dòng thêm'
                          + _missing_tail(text, closest)
                          + (f'; dòng đang thêm: "{closest[:120]}"' if closest else ""))
    if anchor:
        anchor = _ws(anchor)
        for text in new:
            spots = [(path, view, i) for path, hunk in hunks for view in [[row for row in hunk if row[0] != "-"]]
                     for i, (sign, line) in enumerate(view) if sign == "+" and text in line]
            if spots and not any(_follows(view, i, text, anchor) for _, view, i in spots):
                misses.append(f'{spots[0][0]}: chữ "{text}" phải nằm ngay sau phần tử chứa "{anchor}"')
    return misses


def run_gate(state: dict, deps, budget, *, db_path=None, proposal_id: int | None = None) -> dict:
    """Cổng 4 đầy đủ cho main.run_gate: lint/node --check rẻ trước; qua thì dựng candidate (diff thật
    base..HEAD) rồi size, guard, catalog, soát nội dung LLM. Mọi finding gộp thành 1 kết quả blocked."""
    out = run(state, check_size=False)
    if out.get("blocked"):
        return out
    failed = candidate.ensure(state, 4)
    if failed:
        return failed
    size = oversize_issues(state)
    out = {**out, "issues": [*size, *out.get("issues", [])],
           "needs_careful_review": out.get("needs_careful_review") or bool(size)}
    diffs = state.get("full_diff") or state.get("diffs") or []
    text = "".join(item.get("diff", "") for item in diffs)
    scanned = guard.scan(text, state.get("full_checkout"), allowed_contacts=_base_public_contacts(state),
                         request_text=state.get("request_detail"), request_type=state.get("request_type"),
                         broker_diffs=[item["diff"] for item in state.get("broker_diffs") or []])
    state["ui_changed"] = scanned["ui_changed"]
    state["guard_flags"] = scanned["flags"]
    state["review_required"] = scanned["review_required"]
    state["soft_misses"] = [m for m in state.get("soft_misses") or [] if m.get("gate") != 4] + scanned["soft_misses"]
    out = {**out, "checks": scanned["checks"], "soft_misses": scanned["soft_misses"]}
    found = scanned["findings"]
    out["checks"] = [*out["checks"], "request_literal"]
    found = [*found, *({"check": "request_literal", "failure_class": "ordinary", "detail": miss[:300]}
                       for miss in literal_misses(state, text, state.get("full_checkout")))]
    out["checks"] = [*out["checks"], "test_reads_source"]
    found = [*found, *({"check": "test_reads_source", "failure_class": "ordinary", "detail": miss[:300]}
                       for miss in source_text_tests(text))]
    if state.get("catalog") is not None:
        # Catalog boundary is a pure diff check: stop here, before Gate 5 runs the code in Docker.
        out["checks"] = [*out["checks"], "catalog"]
        outside = risk_triage.outside_catalog(diffs, state["catalog"])
        if outside:
            found = [*found, {"check": "catalog", "failure_class": "critical",
                              "detail": f"path ngoài catalog capability: {', '.join(outside)}"[:300]}]
    if intent_review.enabled():
        found, review = intent_review.apply(state, deps, budget, found, out["checks"], db_path=db_path, proposal_id=proposal_id)
        out = {**out, "checks": [*out["checks"], "intent_review"], "intent_review": review}
    if not found and budget is not None and getattr(deps, "models", None) is not None:
        # Chữ hiển thị mới trên diff thật (base..HEAD) qua LLM soát nội dung; lỗi/không chắc → người soát.
        review = content_review(state, deps, budget, db_path=db_path, proposal_id=proposal_id)
        if review and review["blocked"]:
            found = [{"check": "content_guard", "failure_class": review["failure_class"],
                      "detail": review["reason"][:300]}]
        elif review and review.get("advisory"):
            # Nhãn advisory (prompt_injection) không chặn: quyết định thuộc guard.scan tất định ở trên.
            out["content_advisory"] = review["advisory"]
            state["guard_flags"] = [*state["guard_flags"], {
                "check": "injection", "severity": "medium",
                "detail": f"bộ soát chữ nghi điều khiển AI ({', '.join(review['advisory'])}) — người soát"}]
    change = change_class.classify(diffs)
    state["change_class"] = change["class"]
    out["change_class"] = change["class"]
    if not found and change["class"] == "one_way" and budget is not None and getattr(deps, "models", None) is not None:
        review = adversarial_review.run(state, deps, budget, db_path=db_path, proposal_id=proposal_id)
        out["adversarial_review"] = {k: review[k] for k in ("verdict", "findings", "truncated")}
        if review.get("advisory"):
            out["needs_careful_review"] = True
            out["issues"] = [*out.get("issues", []), f"adversarial review: {review['advisory']}"]
        if review["blocked"] and review.get("failure_class") == "ordinary" and reviewer_fix.allowed(state):
            fixed = reviewer_fix.run(state, deps, budget, review["findings"], db_path=db_path, proposal_id=proposal_id)
            if fixed["applied"]:
                return run_gate(state, deps, budget, db_path=db_path, proposal_id=proposal_id)
        if review["blocked"]:
            found = [{"check": "adversarial_review", "failure_class": review["failure_class"], "detail": review["reason"]}]
    if found:
        classes = {f["failure_class"] for f in found}  # an outage alone is retryable; any real finding outranks it
        worst = "critical" if "critical" in classes else "transient" if classes == {"transient"} else "ordinary"
        reason = "; ".join(f"{f['check']}: {f['detail']}" for f in found)[:1000]
        out.update(blocked=True, reason=reason, failure_class=worst,
                   issues=[*out.get("issues", []), *(f"{f['check']}: {f['detail']}" for f in found)])
    elif state.get("request_type") == "self":
        try:  # board tự sửa: file khoá skill/prompt do pipeline tính lại, cùng commit, sau khi guard đã qua
            candidate.relock(state)
        except (OSError, ValueError) as e:
            out.update(blocked=True, reason=f"không tính lại được file khoá: {e}"[:1000], failure_class="transient")
    return out
