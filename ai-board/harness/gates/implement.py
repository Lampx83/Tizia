"""Cổng 3 — plan (cổng 1) → code thật, mỗi subtask 1 lần gọi model riêng, context
mới hoàn toàn (chỉ subtask đó, không lịch sử các subtask trước — spec
subagent-driven-development). Routing theo `size`: "small" →
model nhẹ (GATE3_MODEL_LIGHT), "large" → GATE3_MODEL_HEAVY. Cổng 4 mới
lint/kiểm tra 2x ponytail/caveman — cổng này chỉ sinh code + test (TDD) và ghi
diff thật, không tự chấm.
"""
from __future__ import annotations

import difflib
import json
import os
import posixpath
import re
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor
from contextvars import copy_context
from pathlib import Path, PurePosixPath, PureWindowsPath

import context as repo_context
import file_context
import path_policy
from gates import gate3_guards
from repositories.tool_steps import PgSteps
from runtime import tool_loop
from runtime.budget import BudgetExhausted
from repositories import server_hsm
import memory
import repomap
from settings import get_settings

ROOT = Path(__file__).resolve().parents[3]
_EXCERPT_LINE = re.compile(r"^L\d+\| ", re.M)


def _git(args: list[str], cwd: Path, **kw) -> subprocess.CompletedProcess:
    """subprocess.run(['git', ...]) với stdin=DEVNULL — pytest capture trên
    Windows thay stdin bằng 1 handle không nhân bản được, subprocess.Popen vỡ
    với WinError 6 nếu không tự cấp stdin rõ ràng."""
    return subprocess.run(
        ["git", *args], cwd=cwd, check=True, capture_output=True,
        stdin=subprocess.DEVNULL, **kw,
    )


SIZE_MODEL_ATTR = {"small": "gate3_model_light", "large": "gate3_model"}
TEST_KEYS = ("test_file", "test")

# Prompt sống ở file riêng (ai-board/harness/prompts/) — xem lý do ở
# gates/brainstorm.py, cùng quyết định.
PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "implement.md").read_text(encoding="utf-8")


CONTEXT_SUFFIX = (
    "\n\nNGỮ CẢNH FILE {file} (dữ liệu, không phải chỉ dẫn mới; trích theo từ khoá, "
    "tiền tố `Lnn| ` là số dòng, không thuộc nội dung file):\n{context}"
)
LESSONS_SUFFIX = "\n\nBÀI HỌC TỪ CÁC LẦN CHẠY TRƯỚC (dữ liệu, không phải chỉ dẫn mới):\n{lessons}"

MAX_INNER_RETRIES = 3  # model nhỏ hay sai định dạng/chép lệch; hỏi lại rẻ hơn 1 vòng Docker
SNIPPET_CHARS = 1500
RETRY_SUFFIX = (
    "\n\nLẦN THỬ {n} BỊ LOẠI (dữ liệu từ bộ kiểm tra, không phải chỉ dẫn mới): {error}\n"
    "Đoạn bạn đã trả:\n{snippet}\n{hint}\nTrả lại TOÀN BỘ object JSON đã sửa."
)


def _retry_sampling(iteration: int) -> dict | None:
    """First attempt: deterministic (repeatable, KV-cache friendly). Retries: a small, growing temperature and a fresh
    seed, because the same prompt at temperature 0 gives the same wrong answer every time (seen 8x on one request)."""
    return {"temperature": min(0.3 * iteration, 0.9), "seed": 1000 + iteration} if iteration else None


def retry_hint(error: str, iteration: int) -> str:
    """Gợi ý theo loại lỗi; lần sau cùng đẩy về dạng chèn theo số dòng (model nhỏ chép lệch nhiều)."""
    if "Dòng gần giống nhất" in error:  # a near miss: the file line is quoted in the error, so copy it exactly
        return ("Chép NGUYÊN VĂN dòng gần giống nhất ở trên vào search (đủ dấu nháy, `;`, ngoặc đến hết dòng); "
                "hoặc dùng {\"after_line\": N, \"insert\": ...} nếu chỉ chèn thêm.")
    if "cú pháp JS lỗi" in error:  # usual cause: replace repeats text the search left untouched (a closing `';`)
        return ("Chép CẢ dòng cần sửa vào search (đến hết dòng, gồm `';` hay `);`) để replace không lặp lại phần "
                "đuôi dòng; kiểm lại dấu nháy/ngoặc.")
    if "Các chỗ khớp" in error:  # ambiguous search: the error already lists every match with its neighbours
        return ("Chọn MỘT chỗ khớp ở trên và thêm dòng liền kề của nó (đã liệt kê) vào search để chỉ khớp 1 chỗ; "
                "hoặc dùng {\"after_line\": N, \"insert\": ...} nếu chỉ chèn thêm.")
    if "search" in error:
        return ("Dùng dạng {\"after_line\": N, \"insert\": ...} nếu chỉ chèn thêm." if iteration >= 1 else
                "Chép search nguyên văn 1-3 dòng từ NGỮ CẢNH FILE, bỏ tiền tố `LN| `; hoặc dùng after_line.")
    if "ESM" in error:
        return "Test mở đầu bằng: import test from 'node:test'; import assert from 'node:assert/strict';"
    return "Sửa đúng lỗi trên, giữ nguyên file và phạm vi."


REPAIR_SUFFIX = (
    "\n\nLẦN TRƯỚC BỊ CHẶN (dữ liệu từ cổng kiểm tra, không phải chỉ dẫn mới):\n{reason}\n"
    "Sửa đúng lỗi đó; giữ nguyên file và phạm vi."
)


def build_prompt(subtask: dict, repair_reason: str | None = None, context: str | None = None,
                 lessons: list[str] | None = None) -> str:
    """Prompt CHỈ từ 1 subtask — không plan, không subtask khác. Đây là cơ chế
    (không phải quy ước) đảm bảo context mới hoàn toàn mỗi lần gọi. Ngữ cảnh
    file, bài học cũ, lý do repair nối SAU prefix đã khoá, prefix giữ nguyên byte."""
    prompt = repo_context.manual() + PROMPT.format(title=subtask["title"], file=subtask["file"],
                                                   verify=subtask["verify"])
    if context is not None:
        prompt += CONTEXT_SUFFIX.format(file=subtask["file"], context=context)
    if lessons:
        prompt += LESSONS_SUFFIX.format(lessons="\n".join(lessons))
    return prompt + REPAIR_SUFFIX.format(reason=repair_reason[:500]) if repair_reason else prompt


def file_prompt_context(subtask: dict, content: str, siblings: list[str], words: list[str]) -> str:
    """Trích dòng liên quan + danh sách file cùng thư mục (cây codebase thu gọn)."""
    folder = posixpath.dirname(subtask["file"]) or "."
    return (f"(file {len(content.splitlines())} dòng; cùng thư mục {folder}/: {', '.join(siblings[:40]) or '—'})\n"
            + file_context.excerpt(content, words, filename=subtask["file"]))


WHOLE_FILE_MAX_CHARS = 60_000

_EXEMPLAR_MAX_CHARS = 6_000
_DEP_MAX_CHARS = 6_000
_HTML_PROLOG = re.compile(r"\s*(?:<!DOCTYPE|<!doctype|<html\b)")


def _show_file(source, sha: str | None, path: str, limit: int = _EXEMPLAR_MAX_CHARS) -> str:
    out = _git(["show", f"{sha}:{path}"], cwd=Path(source), text=True,
               encoding="utf-8", errors="replace")
    if out.returncode:
        return None
    lines, used = [], 0
    for line in out.stdout.splitlines():
        if used + len(line) > limit:
            lines.append(f"(bớt: chỉ trích {len(lines)} dòng đầu của mẫu)")
            break
        lines.append(line)
        used += len(line)
    return "\n".join(lines)


def _new_file_context(subtask: dict, state: dict, siblings: list[str]) -> str | None:
    """File đích chưa tồn tại: một mẫu file THẬT cùng thể loại ở base + siblings
    (LF/107 mở rộng 2026-10-28, tiêu chí 8a) — run 43 trả HTML cho file JS chỉ vì không có gì
    chỉ ra hình dạng file đích. Chọn mẫu theo kiểu target (frontend khác API).
    None khi không tìm được mẫu."""
    source, sha = state.get("checkout_source"), state.get("base_sha")
    if not source or not sha:
        return None
    target = subtask["file"]
    if target.startswith(("public/",)):
        groups = (("mẫu module frontend THẬT", ("public/js/features/", "public/js/")),)
    elif target.startswith(("server/",)):
        groups = (("mẫu context API THẬT", ("server/contexts/_ai-generated/", "server/contexts/")),)
    else:
        groups = (("mẫu module frontend THẬT", ("public/js/features/", "public/js/")),
                  ("mẫu context API THẬT", ("server/contexts/_ai-generated/", "server/contexts/")))
    folder = posixpath.dirname(target)
    parts = [f"(file đích chưa tồn tại ở base — tạo file MỚI hoàn toàn; cùng thư mục {folder or '.'}/: "
             f"{', '.join(siblings[:40]) or '—'})\n"
             "(CHỈ mượn HÌNH DẠNG từ mẫu: cách export, cấu trúc object trả về, cách test; KHÔNG chép các "
             "import của mẫu — chỉ import đúng những gì đề bài yêu cầu; đề bài yêu cầu dữ liệu tĩnh thì "
             "nhúng trực tiếp trong code, không import db/auth/feed/user/vui)"]
    js = [p for p in sorted(_base_tree(state)) if p.endswith((".js", ".mjs"))]
    for label, prefixes in groups:
        same = [p for p in js if any(p.startswith(pre) for pre in prefixes)]
        if not same:
            continue
        sample = same[-1]  # gần nhất theo thứ tự cây
        if (shown := _show_file(source, sha, sample)) is not None:
            parts.append(f"\n({label}: {sample})\n{numbered(shown)}")
    return "\n".join(parts) if len(parts) > 1 else None


def _dep_file_context(subtask: dict, state: dict, repo: Path) -> str:
    """File mà subtask này phụ thuộc (depends_on, 1-based) và subtask đó đã viết trong lượt
    run này (file MỚI ở base, nằm sẵn trong repo scratch): đưa nội dung thật vào context
    (LF/107 tiêu chí 8b) — model viết trang nạp module theo API thật, không bịa tên hàm."""
    deps = [d for d in (subtask.get("depends_on") or []) if isinstance(d, int) and not isinstance(d, bool)]
    subs = (state.get("plan") or {}).get("subtasks") or []
    base_tree = _base_tree(state)
    parts = []
    for n in deps:
        if not 1 <= n <= len(subs):
            continue
        dep_file = subs[n - 1].get("file")
        if not dep_file or dep_file == subtask["file"] or dep_file in base_tree:
            continue  # file có ở base → content đã nằm trong context của file cũ; criteria chỉ nêu file MỚI
        try:
            dep_path = _safe_join(repo, dep_file)
        except ValueError:
            continue
        if not dep_path.is_file():
            continue
        content = dep_path.read_text(encoding="utf-8", errors="replace")
        if not content:
            continue
        lines, used = [], 0
        for line in content.splitlines():
            if used + len(line) > _DEP_MAX_CHARS:
                lines.append(f"(bớt: chỉ trích {len(lines)} dòng đầu của file phụ thuộc)")
                break
            lines.append(line)
            used += len(line)
        parts.append(f"\n(file phụ thuộc đã có sau subtask {n}: {dep_file})\n{numbered(chr(10).join(lines))}")
    return "\n".join(parts)


def numbered(content: str) -> str:
    return "\n".join(f"L{n}| {line}" for n, line in enumerate(content.splitlines(), 1))


def whole_file_context(subtask: dict, state: dict, current: str | None, siblings: list[str], words: list[str]) -> tuple:
    """(context, lessons, ctx) with the whole numbered file; file MỚI → mẫu file thật (như excerpt)."""
    if current is None:
        return _new_file_context(subtask, state, siblings), [], None
    return f"(file {len(current.splitlines())} dòng; toàn bộ file)\n{numbered(current)}", [], None


def gate3_context(subtask: dict, state: dict, current: str | None, siblings: list[str], words: list[str]) -> tuple:
    """Excerpt by default; AI_BOARD_GATE3_CONTEXT=hybrid sends the whole file when it is <= WHOLE_FILE_MAX_CHARS."""
    if (current is None or len(current) <= WHOLE_FILE_MAX_CHARS) and get_settings().gate3_context == "hybrid":
        return whole_file_context(subtask, state, current, siblings, words)
    return excerpt_context(subtask, state, current, siblings, words)


def excerpt_context(subtask: dict, state: dict, current: str | None, siblings: list[str], words: list[str]) -> tuple:
    """(context, lessons, ctx): trích file model thấy ở cổng 3 + bài học + kết quả build_context. Bộ đo recall dùng chung."""
    if current is None:
        # File MỚI: mẫu file thật cùng thể loại + siblings (LF/107 tiêu chí 8a); lessons vẫn giữ.
        return (_new_file_context(subtask, state, siblings),
                memory.recall(state["memory_path"], subtask["file"], words) if state.get("memory_path") else [],
                None)
    context = file_prompt_context(subtask, current, siblings, words)
    lessons = memory.recall(state["memory_path"], subtask["file"], words) if state.get("memory_path") else []
    ctx = None
    if current is not None:
        # Skill chọn tool (grep `Lnn|`, dàn ý, bài học) trên base sha. Không có trích dòng → giữ excerpt cũ.
        ctx = repo_context.build_context(
            3, {"subject": subtask["title"], "body": state.get("request_detail") or subtask["verify"],
                "folder_brief": state.get("folder_brief"),
                # Folder chức năng: trang/module mới chọn skill new-feature (có dòng script module được phép).
                "type": "feature" if state.get("folder_brief") else None},
            subtask, state["checkout_source"], state["base_sha"], memory_path=state.get("memory_path"))
        if _EXCERPT_LINE.search(ctx["text"]):
            context = context.split("\n", 1)[0] + "\n" + ctx["text"]
            lessons = []  # skill đã kèm tool lessons
    return context, lessons, ctx


_TREES: dict[tuple, frozenset] = {}


def _base_tree(state: dict) -> set[str]:
    key = (str(state.get("checkout_source")), state.get("base_sha"))
    if key not in _TREES:
        listed = subprocess.run(["git", "ls-tree", "-r", "--name-only", str(key[1])], cwd=key[0], capture_output=True,
                                text=True, encoding="utf-8", errors="replace", stdin=subprocess.DEVNULL) if key[1] else None
        _TREES[key] = frozenset(listed.stdout.splitlines()) if listed is not None and not listed.returncode else frozenset()
    return set(_TREES[key])


def _siblings(source, sha: str, file: str) -> list[str]:
    """Tên file cùng thư mục với `file` ở base sha (rỗng nếu lỗi)."""
    folder = posixpath.dirname(file)
    listed = subprocess.run(["git", "ls-tree", "--name-only", sha, "--", f"{folder}/" if folder else "."],
                            cwd=source, capture_output=True, text=True, encoding="utf-8", errors="replace",
                            stdin=subprocess.DEVNULL)
    return [posixpath.basename(name) for name in listed.stdout.splitlines()] if not listed.returncode else []


def _existing_files(source, subtasks: list[dict]) -> tuple[str, dict[str, bytes]]:
    """(base sha, {file: bytes at base}) for targets already in checkout_source. Raise OSError if not a repo."""
    base = subprocess.run(["git", "rev-parse", "--verify", "HEAD^{commit}"], cwd=source, capture_output=True,
                          text=True, stdin=subprocess.DEVNULL)
    if base.returncode:
        raise OSError(f"checkout_source không đọc được: {base.stderr.strip()[:200]}")
    sha = base.stdout.strip()
    found = {}
    for subtask in subtasks:
        shown = subprocess.run(["git", "show", f"{sha}:{subtask['file']}"], cwd=source, capture_output=True,
                               stdin=subprocess.DEVNULL)
        if not shown.returncode:  # nonzero = file mới ở base
            found[subtask["file"]] = shown.stdout
    return sha, found


def model_for(subtask: dict, models) -> str:
    if getattr(models, 'routing', None):
        role = 'gate3_heavy' if subtask.get('size') == 'large' else 'gate3_light'
        return models.routing.first(role)['model']
    """size → tên model trên `models` (OllamaClient hoặc FakeModels). Route lộ ra
    ở đây, không chôn trong nhánh if/else của run() — test gọi thẳng hàm này."""
    attr = SIZE_MODEL_ATTR.get(subtask.get("size"))
    if not attr:
        raise ValueError(f"subtask.size lạ: {subtask.get('size')!r}")
    return getattr(models, attr)


def parse_codegen(text: str, *, existing: bool = False) -> dict:
    """Parse + validate output 1 subtask. File đã có: bắt buộc `edits` (không nhận cả file vì model
    chỉ thấy phần trích); file mới: bắt buộc `code`. Raise ValueError với lý do ngắn nếu sai schema."""
    try:
        out = json.loads(text)
    except (TypeError, ValueError) as e:
        raise ValueError(f"không phải JSON: {e}") from None
    if not isinstance(out, dict):
        raise ValueError("kết quả phải là object")
    for k in TEST_KEYS:
        if not isinstance(out.get(k), str) or not out[k].strip():
            raise ValueError(f"thiếu {k}")
    if not existing:
        if not isinstance(out.get("code"), str) or not out["code"].strip():
            raise ValueError("thiếu code")
        return out
    edits = out.get("edits")
    if not isinstance(edits, list) or not edits:
        raise ValueError("file đã có: phải trả `edits` tìm/thay, không viết lại cả file")
    for e in edits:
        anchored = isinstance(e, dict) and isinstance(e.get("after_line"), int) and isinstance(e.get("insert"), str)
        searched = (isinstance(e, dict) and isinstance(e.get("search"), str) and e["search"].strip()
                    and isinstance(e.get("replace"), str))
        if not (anchored or searched):
            raise ValueError("mỗi edit là {after_line: số, insert: chuỗi} hoặc {search: chuỗi không rỗng, replace: chuỗi}")
    return out


_COMMONJS = re.compile(r"\brequire\s*\(|\bmodule\.exports\b")


def check_output(out: dict, current: str | None, done_reason: str | None, file: str | None = None,
                 report=None) -> dict:
    """Kiểm output đã parse như cổng 4/5 sẽ kiểm, để hỏi lại ngay trong cổng 3. Trả out đã có `code`
    (edits đã áp) + test_file chuẩn hoá. Raise ValueError (lỗi sửa được) — path thoát repo KHÔNG ở đây.
    report(check, ok, detail): tường thuật từng phép kiểm cho trace."""
    report = report or (lambda *_: None)
    if done_reason == "length":
        message = "output bị cắt vì quá dài; chỉ trả các edit cần thiết, test ngắn"
        report("output length", False, message)
        raise ValueError(message)
    if current is not None:
        try:
            out["code"] = file_context.apply_edits(current, out["edits"], filename=file)
        except ValueError as error:
            report("apply edits", False, str(error))
            raise
        n = len(out["edits"])
        report("apply edits", True, f"{n} edit{'s' if n != 1 else ''} applied to the original file")
    try:
        _check_rest(out, current, file)
    except ValueError as error:
        report("output checks", False, str(error))
        raise
    report("output checks", True, "JS syntax, insert position and ESM test all pass")
    return out


def _check_rest(out: dict, current: str | None, file: str | None) -> None:
    if current is None:
        if file and file.endswith((".js", ".mjs")) and _HTML_PROLOG.match(out.get("code", "")):
            # Sanity artifact (LF/107 tiêu chí 8c): file JS nhận HTML phải fail ngay lần gọi đầu
            # thay vì trôi qua verify rồi đốt framework allowance của repair.
            raise ValueError(f"'{file}' là file JavaScript nhưng output là HTML — viết JS module "
                             "thật (ESM), đúng như mẫu trong context")
    if current is not None:
        if file and file.endswith((".js", ".mjs")):  # Gate 4 would catch this one round later; ask now, while it is cheap
            from gates import static_check
            if static_check.syntax_error(current) is None and (broken := static_check.syntax_error(out["code"])):
                raise ValueError(f"cú pháp JS lỗi sau khi áp edit: {broken[-600:]}\n"
                                 f"Các dòng edit của bạn tạo ra (số dòng thật):\n{_produced_lines(current, out['code'])}")
        if "</body>" in current and out["code"].rsplit("</body>", 1)[-1] != current.rsplit("</body>", 1)[-1]:
            line = current[:current.rindex("</body>")].count("\n") + 1
            raise ValueError(f"nội dung bị chèn sau </body> (dòng L{line}); chèn trước nó: after_line {line - 1}")
    test_file = posixpath.normpath(out["test_file"].replace("\\", "/"))
    if not test_file.startswith(("test/", "tests/")):
        raise ValueError(f"test_file '{out['test_file']}' phải nằm trong test/")
    if file and not path_policy.names_scope(out["test"], [file]):
        raise ValueError(f"test phải import hoặc nêu file trong phạm vi: {file}")
    if test_file.endswith((".js", ".mjs")) and (_COMMONJS.search(out["test"]) or "node:test" not in out["test"]):
        raise ValueError("test phải là ESM dùng node:test (import), không dùng require/module.exports")
    out["test_file"] = test_file


def check_file_path(subtask_file: str) -> None:
    """TRƯỚC khi sinh code, xác nhận subtask.file khớp (hoặc gần
    khớp) thứ gì đó thật trong codebase — KHÔNG BAO GIỜ tự thay path, chỉ in
    cảnh báo cho người soát. File thật (mới tạo) CHƯA tồn tại trên đĩa là
    chuyện bình thường (đa số skill AI sinh là file _ai-generated hoàn toàn
    mới) — hàm này chỉ cảnh báo khi repomap tìm ra 1 file thật KHÁC path plan
    chọn (gợi ý lệch extension/folder), không
    cảnh báo khi không có file nào đủ gần (trường hợp file mới, không phải typo).
    """
    if (ROOT / subtask_file).exists():
        return
    near = repomap.closest(subtask_file, ROOT)
    if near and near != subtask_file:
        print(f"[repomap] subtask.file '{subtask_file}' không khớp file thật — "
              f"gần nhất: '{near}' (KHÔNG tự thay, chỉ cảnh báo)")


def _ensure_scratch_repo(repo_dir: str | Path | None) -> Path:
    """Repo git để diff thật vào — KHÔNG bao giờ là Tizia thật (nhánh trên repo thật
    chỉ do candidate.py tạo). Không truyền repo_dir → tạo 1 thư mục tạm mới."""
    p = Path(repo_dir) if repo_dir else Path(tempfile.mkdtemp(prefix="ai-board-gate3-"))
    p.mkdir(parents=True, exist_ok=True)
    if not (p / ".git").exists():
        _git(["init", "-q"], cwd=p)
        _git(["config", "user.email", "ai-board@tizia.local"], cwd=p)
        _git(["config", "user.name", "AI Board Gate 3"], cwd=p)
    return p


def _safe_join(repo_dir: Path, rel: str) -> Path:
    """rel (subtask['file'] từ plan, hoặc out['test_file'] model TỰ đặt tên ở
    cổng 3) là chuỗi KHÔNG đáng tin — model có thể trả path tuyệt đối hay
    '../..' để thoát khỏi repo scratch. Path(repo_dir) / rel của pathlib ÂM
    THẦM bỏ qua repo_dir nếu rel là tuyệt đối (Unix '/etc/x' HAY Windows
    'C:/Windows/x' — kể cả khi harness chạy trên Windows, chỉ tự check bằng
    Path().is_absolute() của chính platform đang chạy sẽ bỏ lọt dạng kia,
    nên check CẢ HAI kiểu tường minh bằng PurePosixPath/PureWindowsPath).
    Raise ValueError nếu rel thoát khỏi repo_dir dưới bất kỳ hình thức nào —
    không bao giờ ghi ra ngoài scratch repo."""
    if PurePosixPath(rel).is_absolute() or PureWindowsPath(rel).is_absolute():
        raise ValueError(f"path tuyệt đối không được phép: '{rel}'")
    candidate = (repo_dir / rel).resolve()
    repo_resolved = repo_dir.resolve()
    if candidate != repo_resolved and repo_resolved not in candidate.parents:
        raise ValueError(f"path thoát khỏi scratch repo: '{rel}'")
    return candidate


def _write_and_diff(repo_dir: Path, file_rel: str, code: str, test_file_rel: str, test_code: str) -> str:
    """Ghi code + test vào repo scratch, trả diff thật (git diff --cached), rồi
    commit để lần ghi kế tiếp (subtask sau) diff đúng phần MỚI thêm."""
    for rel, content in ((file_rel, code), (test_file_rel, test_code)):
        path = _safe_join(repo_dir, rel)
        server_hsm.authorize_action('write_candidate')
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
    server_hsm.authorize_action('stage_candidate')
    _git(["add", "-A"], cwd=repo_dir)
    diff = _git(["diff", "--cached"], cwd=repo_dir, text=True, encoding="utf-8").stdout
    server_hsm.authorize_action('commit_candidate')
    _git(["commit", "-q", "-m", f"gate3: {file_rel}"], cwd=repo_dir)
    return diff


def _produced_lines(old: str, new: str, limit: int = 12) -> str:
    """`Lnn| text` for the lines of `new` that differ from `old`: the model sees what its edit really wrote (e.g. a doubled `';`)."""
    shown, matcher = [], difflib.SequenceMatcher(None, old.splitlines(), new.splitlines(), autojunk=False)
    new_lines = new.splitlines()
    for tag, _i1, _i2, j1, j2 in matcher.get_opcodes():
        if tag in ("replace", "insert"):
            shown += [f"L{j + 1}| {new_lines[j]}" for j in range(j1, j2)]
    return "\n".join(shown[:limit]) or "(không có dòng nào đổi)"


def _unified(old: str, new: str, file: str) -> str:
    return "\n".join(difflib.unified_diff(old.splitlines(), new.splitlines(), f"a/{file}", f"b/{file}", lineterm="", n=2))


def _line_ranges(text: str | None) -> str:
    """'L12-L30, L45' from the `Lnn| ` markers of the excerpt the model was shown."""
    ranges: list[list[int]] = []
    for number in (int(n) for n in re.findall(r"^L(\d+)\| ", text or "", re.M)):
        if ranges and number == ranges[-1][1] + 1:
            ranges[-1][1] = number
        else:
            ranges.append([number, number])
    return ", ".join(f"L{a}" if a == b else f"L{a}-L{b}" for a, b in ranges)


def _note_inputs(trace, subtask, model, state, current, context, siblings, words, lessons, ctx) -> None:
    """Tell the trace what the model is given for this subtask and which harness tools produced it."""
    trace.note("knows", "subtask", f"{subtask['title']} | verify: {subtask['verify']} | model {model} (size {subtask.get('size')})")
    if state.get("request_detail"):
        trace.note("knows", "request", str(state["request_detail"])[:400])
    if current is None:
        trace.note("knows", "target file", f"{subtask['file']}: new file, absent at base; AI writes the whole file")
    else:
        lines = len(current.splitlines())
        trace.note("knows", "target file", f"{subtask['file']} ({lines} lines, base {str(state.get('base_sha'))[:7]})")
        trace.note("tool", "git ls-tree", f"{len(siblings)} sibling files", {"folder": posixpath.dirname(subtask["file"]) or "."})
        ranges = _line_ranges(context)
        trace.note("knows", "excerpt", f"{ranges} (of {lines} lines)" if ranges else "no numbered lines; AI sees only part of the file",
                   {"lines": ranges, "keywords": words[:12]})
    if lessons:
        trace.note("knows", "lessons", f"{len(lessons)} lessons from earlier runs", lessons)
    if state.get("repair_reason"):
        trace.note("knows", "repair reason", str(state["repair_reason"])[:500])
    if ctx:
        repo_context.report(trace, ctx)


def _checkpoint_store(state: dict, db_path, proposal_id, child: int):
    """PgSteps theo state['checkpoint'] (worker) hoặc db_path+proposal_id (pipeline); None = không checkpoint."""
    if state.get("checkpoint"):
        return state["checkpoint"].store(state["base_sha"], child)
    return PgSteps(db_path, proposal_id, child) if db_path is not None and proposal_id is not None else None


FANOUT_ENV = "AI_BOARD_FANOUT_MAX"
DEFAULT_FANOUT = 2
PROGRESS_CAP = 150_000  # ký tự JSON tiến độ cổng 3 giữ được trong checkpoint (server cắt ledger ở 200 KB)


def fanout_limit(env=None) -> int:
    """Số model call song song trong 1 lớp DAG: 1 = tuần tự, trần 4 (một workload vLLM, không mở workload thứ hai)."""
    raw = (os.environ if env is None else env).get(FANOUT_ENV, DEFAULT_FANOUT)
    try:
        value = int(raw)
    except (TypeError, ValueError):
        return DEFAULT_FANOUT
    return min(max(value, 1), 4)


def _progress_store(state: dict):
    """Checkpoint tiến độ cổng 3 (subtask đã ghi xong) — None khi không có checkpoint hoặc base sha."""
    store, base = state.get("checkpoint"), state.get("base_sha")
    return store if store is not None and base and hasattr(store, "load_progress") else None


def _load_progress(state: dict, trace=None) -> dict:
    """{child: proposal đã ghi xong} của lượt trước cùng plan + base; {} khi chưa có hoặc checkpoint hỏng."""
    store = _progress_store(state)
    if store is None:
        return {}
    try:
        return dict(store.load_progress(state["base_sha"]) or {})
    except Exception as error:  # noqa: BLE001 — checkpoint hỏng chỉ tốn phần làm lại, không được chặn cổng 3
        if trace:
            trace.note("tool", "gate 3 progress", f"không đọc được tiến độ đã lưu ({str(error)[:200]}); làm lại từ đầu")
        return {}


def _save_progress(state: dict, saved: dict, *, trace) -> bool:
    """Ghi tiến độ cổng 3; False khi checkpoint không nhận (quá lớn/lỗi) — lượt sau chỉ làm lại phần chưa lưu."""
    store = _progress_store(state)
    if store is None:
        return False
    try:
        store.save_progress(state["base_sha"], saved)
        return True
    except Exception as error:  # noqa: BLE001 — thiếu checkpoint không được đổi kết quả cổng 3
        if trace:
            trace.note("tool", "gate 3 progress", f"không lưu được tiến độ ({str(error)[:200]})")
        return False


def _progress_entry(out: dict, model: str) -> dict:
    """Phần tối thiểu để dựng lại 1 subtask đã xong mà không gọi model lần nữa."""
    return {"model": model, "test_file": out["test_file"], "code": out["code"], "test": out["test"],
            **({"verification": out["verification"]} if out.get("verification") else {})}


def _generate_one(child: int, subtask: dict, *, state: dict, deps, budget, current: str | None, repo: Path,
                  known: set, db_path, proposal_id) -> tuple:
    """Một subtask: gọi model (loop/retry) tới khi ra code hợp lệ. → ("ok", out, model, receipts) | ("blocked", gate result).

    Không ghi file: fan-out chạy nhiều subtask cùng lúc nên chỉ phần gọi model ở đây là song song được."""
    # Budget kiểm TRƯỚC mỗi lần gọi model, không chỉ 1 lần trước cả gate —
    # nhiều subtask nghĩa là nhiều lần gọi model bên trong CÙNG 1 lời gọi
    # run_gate(3, ...), main.run_once() chỉ tick() giữa các cổng chứ không
    # giữa các subtask. Không kiểm ở đây thì 1 plan nhiều subtask chọc thủng
    # max_model_calls/max_wall_clock_s âm thầm (budget.py: "không bao giờ im
    # lặng báo xong").
    if not budget.tick():
        return "blocked", {"gate": 3, "blocked": True, "failure_class": "budget",
                           "reason": f"budget cạn trước subtask '{subtask.get('title')}'"}
    check_file_path(subtask["file"])
    model = model_for(subtask, deps.models)
    role = 'gate3_heavy' if subtask.get('size') == 'large' else 'gate3_light'
    words = file_context.keywords(subtask["title"], subtask["verify"], state.get("request_detail"))
    siblings = _siblings(state.get("checkout_source"), state.get("base_sha") or "", subtask["file"])
    context, lessons, ctx = gate3_context(subtask, state, current, siblings, words)
    if dep_lines := _dep_file_context(subtask, state, repo):
        context = f"{context}\n{dep_lines}" if context else dep_lines.lstrip("\n")
    trace = getattr(deps, "trace", None)
    prompt = build_prompt(subtask, state.get("repair_reason"), context, lessons)
    feedback = ""
    routing = getattr(deps.models, 'routing', None)
    failed_candidates = set()
    receipts: list = []
    if trace:
        _note_inputs(trace, subtask, model, state, current, context, siblings, words, lessons, ctx)
    out = None

    def run_loop():
        """(proposal | None, blocked gate result | None)"""
        looped = tool_loop.run_subtask(
            subtask, current, deps=deps, budget=budget, model=model, source=state["checkout_source"], sha=state["base_sha"],
            check=lambda o: (_check_rest(o, current, subtask["file"]), gate3_guards.check(o, current, subtask["file"], known)),
            role=role, db_path=db_path, proposal_id=proposal_id, child=child,
            store=_checkpoint_store(state, db_path, proposal_id, child),
            pins={"role": role}, repair_reason=state.get("repair_reason"), context=context)
        if looped.get("stale_reset") and trace:
            trace.note("tool", "stale checkpoint", f"an upstream artifact changed ({', '.join(looped['stale_reset'])}); this subtask was checked again from scratch")
        receipts.extend(looped.get("sandbox_receipts", []))
        if looped["status"] != "proposed":
            return None, {"gate": 3, "blocked": True, "failure_class": looped["failure_class"],
                          "reason": f"subtask '{subtask.get('title')}': {looped['reason']}",
                          **({"unknown_outcome": looped["unknown_outcome"]} if looped.get("unknown_outcome") else {}),
                          "tool_manifest": tool_loop.MANIFEST.hash,
                          **({"sandbox_receipts": receipts} if receipts else {})}
        return looped["out"], None

    # auto: one-shot first; the loop repairs a gate-4 rejection (repair_reason) or an exhausted one-shot attempt.
    if tool_loop.enabled() or (tool_loop.mode() == "auto" and state.get("repair_reason")):
        out, stop = run_loop()
        if stop:
            return "blocked", stop
    for iteration in range(0 if out is not None else MAX_INNER_RETRIES + 1):
        routing_options = {'role': role}
        if routing:
            # One quality switch uses the final existing repair attempt, never a fresh budget.
            if (iteration == MAX_INNER_RETRIES and not getattr(budget, 'quality_switches', 0)
                    and routing.candidates(role, exclude=failed_candidates)):
                if budget.spend_quality_switch():
                    routing_options.update(exclude_candidates=failed_candidates, route_reason='quality_switch')
        from runtime.root_allowance import current as root_allowance
        if iteration and root_allowance() is not None and not budget.spend_repair():
            return "blocked", {'gate': 3, 'blocked': True, 'reason': 'root repair allowance exhausted', 'failure_class': 'budget'}
        if trace and iteration:
            trace.note("knows", "retry feedback", str(error), {"hint": retry_hint(str(error), iteration - 1),
                                                                "ai_output": raw[:SNIPPET_CHARS]})
        # Phản hồi nối SAU prompt cố định + ngữ cảnh: prefix giữ nguyên byte, Ollama tái dùng KV cache.
        call = dict(gate=3, budget=budget, db_path=db_path, proposal_id=proposal_id, prompt_name="implement.md", child=child,
                    iteration=iteration, options=_retry_sampling(iteration),
                    skill_context={'file': subtask['file'], 'task_type': subtask.get('task_type')}, **routing_options)
        try:
            server_hsm.authorize_action('model')
        except server_hsm.AuthorityError as error:
            return "blocked", {'gate':3,'blocked':True,'reason':str(error),'failure_class':error.failure_class}
        if gate3_guards.enabled("schema"):
            try:
                body = deps.call_model(model, prompt + feedback, format=gate3_guards.edit_schema(current is not None), **call)
            except BudgetExhausted:
                raise  # allowance/request-bound block, not a schema refusal: asking again would spend a call the root does not have
            except Exception:  # noqa: BLE001 - server refused the schema: ask once the old way, and count it
                try:
                    server_hsm.authorize_action('model')
                except server_hsm.AuthorityError as error:
                    return "blocked", {'gate':3,'blocked':True,'reason':str(error),'failure_class':error.failure_class}
                gate3_guards.note_fallback()
                body = deps.call_model(model, prompt + feedback, **call)
        else:
            body = deps.call_model(model, prompt + feedback, **call)
        raw = body.get("response", "")
        if body.get('_route'):
            failed_candidates.add(body['_route']['candidate'])
            model = routing.catalog['candidates'][body['_route']['candidate']]['model']
        try:
            out = parse_codegen(raw, existing=current is not None)
        except ValueError as e:
            error = e
            if trace:
                trace.attach_last("edits", {"parsed": raw, "applied": False})
                trace.attach_last("evaluation", {"check": "parse output", "ok": False, "detail": str(e)})
        else:
            if trace:
                trace.attach_last("evaluation", {"check": "parse output", "ok": True, "detail": "valid edits + test schema"})
            try:
                _safe_join(repo, out["test_file"])
            except ValueError as e:  # path tuyệt đối/thoát repo: chặn NGAY, không hỏi lại, không ghi gì
                return "blocked", {"gate": 3, "blocked": True, "reason": f"subtask '{subtask.get('title')}': {e}",
                                   "failure_class": "critical"}
            report = (lambda check, ok, detail: trace.attach_last("evaluation", {"check": check, "ok": ok, "detail": detail})) if trace else None
            parsed = json.dumps(out.get("edits") or {"code": "(file mới)"}, ensure_ascii=False)
            try:
                out = check_output(out, current, (body.get("_metrics") or {}).get("done_reason")
                                   or body.get("done_reason"), subtask.get("file"), report)
                gate3_guards.check(out, current, subtask["file"], known)
                if trace:
                    trace.attach_last("edits", {"parsed": parsed, "applied": True,
                                                "diff": _unified(current or "", out["code"], subtask["file"])})
                return "ok", out, model, receipts
            except ValueError as e:
                error = e
                if trace:
                    trace.attach_last("edits", {"parsed": parsed, "applied": False})
        if trace:
            trace.mark_last("retry" if iteration < MAX_INNER_RETRIES else "error", str(error))
        spent = (body.get("_metrics") or {}).get("gpu_ms") or 0
        room = getattr(budget, "max_units", None) is None or budget.units + spent / 1000 < budget.max_units
        if iteration == MAX_INNER_RETRIES or not budget.tick() or not room:
            if tool_loop.mode() == "auto" and budget.tick() and not state.get("repair_reason"):
                out, stop = run_loop()
                if stop:
                    return "blocked", stop
                return "ok", out, model, receipts
            # Lý do kèm đoạn lỗi để lượt sửa sau Docker (REPAIR_SUFFIX) cũng dùng được.
            return "blocked", {"gate": 3, "blocked": True, "failure_class": "ordinary",
                               "reason": f"subtask '{subtask.get('title')}': {error} (sau {iteration + 1} lần thử); "
                                         f"đoạn cuối: {raw[:300]}"}
        feedback = RETRY_SUFFIX.format(n=iteration + 1, error=error, snippet=raw[:SNIPPET_CHARS],
                                       hint=retry_hint(str(error), iteration))
    if out is not None:  # loop đã ra proposal ở lượt đầu, không cần one-shot
        return "ok", out, model, receipts
    return "blocked", {"gate": 3, "blocked": True, "failure_class": "ordinary",
                       "reason": f"subtask '{subtask.get('title')}': hết lượt thử"}


def _budget_stop(subtask: dict, error: Exception) -> tuple:
    """Allowance hết NGAY TRONG lời gọi model của 1 subtask → cùng dạng với chặn trước subtask,
    để caller dừng và `_stop_result` báo các subtask đã xong là `partial`."""
    return "blocked", {"gate": 3, "blocked": True, "failure_class": "budget",
                       "reason": f"budget cạn trước subtask '{subtask.get('title')}': {error}"}


def _fan_out(tasks: list[tuple], *, state: dict, deps, budget, texts: dict, repo: Path, known: set,
             db_path, proposal_id) -> dict:
    """Chạy các subtask độc lập của một lớp DAG; 1 subtask thì tuần tự, nhiều thì batch trên cùng model.

    Mỗi task chạy trong context đã copy để ContextVar (authority, root allowance) không rơi mất."""
    def one(child: int, subtask: dict) -> tuple:
        return _generate_one(child, subtask, state=state, deps=deps, budget=budget, current=texts.get(subtask["file"]),
                             repo=repo, known=known, db_path=db_path, proposal_id=proposal_id)

    def guarded(child: int, subtask: dict) -> tuple:
        try:
            return one(child, subtask)
        except BudgetExhausted as error:  # root allowance cạn giữa lượt: không để cả gate văng lỗi
            return _budget_stop(subtask, error)

    if len(tasks) <= 1 or fanout_limit() == 1:
        return {order: guarded(child, subtask) for order, child, subtask in tasks}
    results = {}
    with ThreadPoolExecutor(max_workers=min(fanout_limit(), len(tasks)), thread_name_prefix="gate3") as pool:
        futures = {}
        for order, child, subtask in tasks:
            context = copy_context()  # một context mỗi task: không context nào bị vào 2 thread
            futures[pool.submit(context.run, guarded, child, subtask)] = order
        for future, order in futures.items():
            results[order] = future.result()
    return results


def _stop_result(stop: dict, *, diffs: list, total: int, remaining: list[str]) -> dict:
    """Kết quả dừng giữa chừng. Còn subtask đã xong + subtask chưa chạy → `partial` để người gửi bấm tiếp tục."""
    result = {**stop, "diffs": diffs}
    if diffs and len(diffs) < total and result.get("failure_class") in ("ordinary", "budget", "transient"):
        result["failure_class"] = "partial"
        result["partial"] = {"done": len(diffs), "total": total, "remaining": remaining}
        result["reason"] = (f"hoàn thành một phần {len(diffs)}/{total} subtask; còn {len(remaining)}; "
                            f"{result.get('reason')}")
    return result


def run(state: dict, deps, budget, *, repo_dir: str | Path | None = None,
        db_path=None, proposal_id: int | None = None) -> dict:
    """Điểm vào cho main.run_gate. Đọc state['plan'] do cổng 1 để lại, sinh code
    cho từng subtask với model theo size, ghi diff thật vào repo scratch.

    Subtask độc lập trong cùng lớp DAG chạy song song (batch trên cùng model); ghi file và commit
    luôn tuần tự. Tiến độ từng subtask nằm trong checkpoint nên lượt resume chỉ làm phần còn thiếu."""
    plan = state.get("plan")
    subtasks = (plan or {}).get("subtasks")
    if not subtasks:
        return {"gate": 3, "blocked": True, "reason": "không có plan/subtasks từ cổng 1", "diffs": None}

    existing: dict[str, bytes] = {}
    if state.get("checkout_source"):
        try:
            state["base_sha"], existing = _existing_files(state["checkout_source"], subtasks)
        except OSError as e:
            return {"gate": 3, "blocked": True, "reason": str(e), "diffs": None, "failure_class": "transient"}
        try:
            texts = {f: content.decode("utf-8") for f, content in existing.items()}
        except UnicodeDecodeError:
            return {"gate": 3, "blocked": True, "diffs": None, "failure_class": "plan",
                    "reason": "file đích không phải text UTF-8, AI không sửa được"}
    else:
        texts = {}

    from runtime import schedule
    prepared = schedule.prepare(subtasks)
    try:
        plan_levels = schedule.levels(prepared)
        schedule.check_conflicts(prepared)
    except ValueError as error:
        return {"gate": 3, "blocked": True, "reason": str(error), "diffs": [], "failure_class": "plan"}

    repo = _ensure_scratch_repo(repo_dir if repo_dir is not None else state.get("scratch_repo"))
    trace = getattr(deps, "trace", None)
    known = _base_tree(state) | {st["file"] for st in subtasks} if gate3_guards.enabled("refs") else set()
    saved = _load_progress(state, trace)
    child_by_file = {step["file"]: index for index, step in enumerate(prepared, start=1)}
    for file, entry in (state.get("reuse") or {}).items():
        if file in child_by_file:
            saved.setdefault(str(child_by_file[file]), entry)
    diffs: list[dict] = []
    diff_child: list[int] = []
    receipts: list = []
    stop = None
    child_of = {step["order"]: index for index, step in enumerate(prepared, start=1)}

    def write(child: int, subtask: dict, out: dict, model: str) -> None:
        diff_text = _write_and_diff(repo, subtask["file"], out["code"], out["test_file"], out["test"])
        diffs.append({
            "title": subtask["title"], "file": subtask["file"], "test_file": out["test_file"],
            "model": model, "diff": diff_text,
            **({'verification': out['verification']} if out.get('verification') else {}),
            "commit": _git(["rev-parse", "HEAD"], cwd=repo, text=True).stdout.strip(),
        })
        diff_child.append(child)
        state.setdefault("produced", {})[subtask["file"]] = _progress_entry(
            {"test_file": out["test_file"], "code": out["code"], "test": out["test"]}, model)

    def remember(child: int, out: dict, model: str) -> None:
        saved[str(child)] = _progress_entry(out, model)
        if len(json.dumps(saved, ensure_ascii=False)) > PROGRESS_CAP:
            saved.pop(str(child), None)  # checkpoint quá lớn: subtask này sẽ được làm lại ở lượt resume
            if trace:
                trace.note("tool", "gate 3 progress", "tiến độ vượt trần checkpoint; subtask cuối không được lưu")
            return
        _save_progress(state, saved, trace=trace)

    for level in plan_levels:
        for order in level:  # subtask đã xong ở lượt trước: dựng lại file, không gọi model, không tính phí
            child, subtask = child_of[order], prepared[child_of[order] - 1]
            entry = saved.get(str(child))
            if not entry:
                continue
            try:
                write(child, subtask, entry, entry.get("model"))
            except ValueError as error:  # path tuyệt đối/thoát repo scratch
                stop = stop or {"gate": 3, "blocked": True, "failure_class": "critical",
                                "reason": f"subtask '{subtask.get('title')}': {error}"}
            if trace:
                trace.note("tool", "gate 3 resume", f"'{subtask['title']}' đã xong ở lượt trước; dựng lại từ checkpoint")
        if stop is not None:
            break
        tasks = [(order, child_of[order], prepared[child_of[order] - 1]) for order in level if str(child_of[order]) not in saved]
        if not tasks:
            continue
        results = _fan_out(tasks, state=state, deps=deps, budget=budget, texts=texts, repo=repo, known=known,
                           db_path=db_path, proposal_id=proposal_id)
        for order in sorted(results):
            child, subtask = child_of[order], prepared[child_of[order] - 1]
            status, payload, *rest = results[order]
            if status == "blocked":
                receipts.extend(payload.get("sandbox_receipts") or [])
                stop = stop or payload
                continue
            out, model, produced = payload, rest[0], rest[1]
            receipts.extend(produced or [])
            try:
                write(child, subtask, out, model)
            except ValueError as error:
                stop = stop or {"gate": 3, "blocked": True, "failure_class": getattr(error, 'failure_class', 'critical'),
                                "reason": f"subtask '{subtask.get('title')}': {error}"}
                continue
            remember(child, out, model)
        if stop is not None:
            break
    # Cổng 4 ghép diff với subtask theo THỨ TỰ PLAN (zip ở services/candidate.py), không phải
    # thứ tự hoàn thành: các lớp DAG chạy [2,4] song song trước [3,5] làm diffs bị lệch → run 51
    # bị chặn ScopeViolation oan ("child 3 ghi lich-client.js"). Sắp lại theo child.
    if diff_child:
        diffs[:] = [d for _, d in sorted(zip(diff_child, diffs), key=lambda pair: pair[0])]

    state["diffs"] = diffs
    state["scratch_repo"] = str(repo)
    if receipts:
        state.setdefault("sandbox_receipts", []).extend(receipts)
    if stop is not None:
        remaining = [step["file"] for step in prepared if str(child_of[step["order"]]) not in saved]
        return _stop_result(stop, diffs=diffs, total=len(prepared), remaining=remaining)
    return {"gate": 3, "blocked": False, "reason": None, "diffs": diffs,
            **({"tool_manifest": tool_loop.MANIFEST.hash} if tool_loop.mode() else {}),
            **({"sandbox_receipts": state["sandbox_receipts"]} if state.get("sandbox_receipts") else {})}
