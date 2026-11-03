"""Cổng 2.5 — soát plan (Q1) + phân quyền độ phức tạp (Q2) TRƯỚC
khi cổng 3 tiêu ngân sách. Một checkpoint (không phải 2 gate riêng) vì cả hai
là quyết định "dừng trước cổng 3" trên cùng 1 plan tại cùng 1 điểm trong loop.

Q1 — plan có đủ/nhất quán không? Gọi GATE1_MODEL LẦN NỮA ở vai validator
(khác vai tác giả cổng 1, dù cùng model — spec.md: vai này vốn đã dùng để
chấm lại diff, tránh "tự chấm bài mình"; ticket này mở rộng nó sang soát cả
plan). clear=false -> dừng, ghi câu hỏi thẳng vào request_messages (route
POST /api/requests/:id/messages đã có, tái dùng — harness INSERT trực tiếp,
đúng cách scripts/admin-reply.js đã làm), outcome='needs_clarification'.

Q2 — plan có "phức tạp" không? Tính THUẦN BẰNG CODE (không hỏi model), 3/5
tín hiệu gate 5.5 đã định nghĩa nhưng tính SỚM từ plan, trước khi
có diff:
  - >=2 capability riêng biệt trong plan.capabilities — proxy sớm nhất cho
    "chạm >=2 domain" khi schema plan (gates/brainstorm.py) chưa gắn domain
    vào từng capability, chỉ có 1 danh sách phẳng ("...trong plan.capabilities").
  - Bất kỳ subtask nào có `file` NẰM NGOÀI 2 vùng an toàn chuẩn
    (`server/contexts/_ai-generated/**`, `public/**`) — đây mới thật sự là
    "route/middleware mới" đáng cảnh giác. Một plugin `_ai-generated` MỚI
    KHÔNG tính vào tín hiệu này dù nó cũng "mount 1 router mới": đó là
    trường hợp THƯỜNG NGÀY, an toàn-theo-kiến-trúc (registry.js +
    capabilities.js dựng sẵn đúng để việc này rẻ/an toàn — mục đích toàn bộ
    ), và prompts/brainstorm.md đã tự giới hạn model CHỈ
    được nhắm 2 vùng này. Tính "route mới" bằng "có plugin _ai-generated
    hay không" sẽ trúng ~100% request (mọi domain-synthesized skill đều tạo
    plugin mới) — mâu thuẫn thẳng với chính Scope của ticket này ("Đường
    mặc định — đa số request đơn giản — không bị ảnh hưởng"). Tín hiệu thật
    phải là: plan đòi ghi ra NGOÀI 2 vùng đã được kiến trúc dọn sẵn (vd
    `server/index.js`, file context có sẵn, hay bất kỳ đường lạ nào) — hiếm
    khi xảy ra vì chính gate 1 đã tự giới hạn, nhưng là tấm lưới phòng thủ
    thêm 1 lớp khi plan lệch khỏi khuôn (giống tinh thần gate 2/4).
  - >=4 subtask.
Phức tạp + requester KHÔNG thuộc {role='admin'} hoặc {user_domain_grants đúng
domain} -> dừng, outcome='complexity_gated'. Request không map được sang
user thật (guest) -> fail-closed, coi như không được phép (giống nguyên tắc
guardrail nội dung).
"""
from __future__ import annotations

import json
import re
import time
from pathlib import Path

import context
import code_index
import file_context
from dbconn import harness_db
from gates import best_match, evidence, grounding_paths
from runtime import coverage
from settings import DEFAULT_GATE25_FIXES, get_settings

PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "plan_validate.md").read_text(encoding="utf-8")
# Request keys this gate reads (LF/125). plan_repair is planner-only and must stay out of this list.
VALIDATOR_INPUTS = ("subject", "body", "domain", "thread", "clarified_spec")
ANSWERABLE_PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "plan_answerable.md").read_text(encoding="utf-8")

# 2 vùng an toàn chuẩn model được phép nhắm (đúng giới hạn trong
# prompts/brainstorm.md) — file NGOÀI 2 vùng này mới tính là "route/
# middleware mới" đáng cảnh giác, xem docstring module.
_SAFE_FILE_PREFIX = re.compile(r"^(server/contexts/_ai-generated/|public/)")

# Mirror TỐI THIỂU của các bảng plan_validate.py đọc/ghi (users,
# user_domain_grants, requests, request_messages) — nguồn thật là
# server/db.js. Production luôn có sẵn 4 bảng này (Express đã tạo lúc khởi
# động); mirror ở đây chỉ để chạy được trên DB tạm trong test, đúng pattern
# SKILL_PROPOSALS_DDL/AI_DECISIONS_DDL/gate_trace.DDL đã có.
_SCHEMA_DDL = """
CREATE TABLE IF NOT EXISTS users (
  id            BIGSERIAL PRIMARY KEY,
  username      TEXT    NOT NULL UNIQUE,
  display_name  TEXT    NOT NULL,
  password_hash TEXT    NOT NULL,
  role          TEXT    NOT NULL DEFAULT 'student',
  created_at    BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS user_domain_grants (
  id           BIGSERIAL PRIMARY KEY,
  user_id      BIGINT NOT NULL,
  domain_id    TEXT    NOT NULL,
  granted_at   BIGINT NOT NULL,
  granted_by   BIGINT,
  expires_at   BIGINT,
  note         TEXT
);
CREATE TABLE IF NOT EXISTS requests (
  id          BIGSERIAL PRIMARY KEY,
  domain      TEXT    NOT NULL,
  type        TEXT    NOT NULL DEFAULT 'other',
  title       TEXT    NOT NULL,
  detail      TEXT,
  student     TEXT    NOT NULL DEFAULT 'Ẩn danh',
  status      TEXT    NOT NULL DEFAULT 'pending',
  votes       BIGINT NOT NULL DEFAULT 1,
  admin_note  TEXT,
  created_at  BIGINT NOT NULL,
  updated_at  BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS request_messages (
  id          BIGSERIAL PRIMARY KEY,
  request_id  BIGINT NOT NULL,
  role        TEXT    NOT NULL,
  author_name TEXT,
  body        TEXT    NOT NULL,
  attachments TEXT,
  created_at  BIGINT NOT NULL
);
"""


def build_prompt(request: dict, plan: dict, repo_context: str = '(không có)') -> str:
    """AIBOARD.md (context.manual) đứng đầu, trước prompt đã khoá — prefix KV giống hệt mọi lần gọi."""
    thread = context.thread_text(request.get("thread"), request.get("clarified_spec")) or "(không có)"
    return context.manual() + PROMPT.format(
        domain=request.get("domain") or "(core)",
        subject=request.get("subject", ""),
        body=request.get("body", ""),
        thread=thread,
        plan_json=json.dumps(plan, ensure_ascii=False),
        repo_context=repo_context,
    )


def parse_validation(text: str) -> dict:
    """Parse + validate output validator. Raise ValueError với lý do ngắn nếu sai schema."""
    try:
        out = json.loads(text)
    except (TypeError, ValueError) as e:
        raise ValueError(f"không phải JSON: {e}") from None
    if not isinstance(out, dict) or not isinstance(out.get("clear"), bool):
        raise ValueError("thiếu 'clear' (bool)")
    question = out.get("question")
    if question is not None and not isinstance(question, str):
        raise ValueError("'question' phải là string hoặc null")
    # clear=true thì câu hỏi (nếu model lỡ viết) bị bỏ; câu hỏi gửi thẳng học viên nên cắt 300 ký tự.
    return {"clear": out["clear"], "question": None if out["clear"] else ((question or "").strip()[:300] or None),
            "grounded": out.get("grounded") is True, "grounding": out.get("grounding"),
            "objection": evidence.parse(out.get("objection")), "reason": str(out.get("reason") or '')[:500]}


_PINNED_QUOTED = re.compile(r"""['"“‘]([^'"”’\n]{3,80})['"”’]""")
_PINNED_SELECTOR = re.compile(r"[.#][A-Za-z][\w-]*")


def pinned_words(task: dict) -> list[str]:
    """Quoted phrases and selector-like tokens of a subtask (`.yes`, `#toast`); the keyword cap must not drop them."""
    found = []
    for text in (task.get('title'), task.get('verify')):
        if text:
            found += [phrase.strip().lower() for phrase in _PINNED_QUOTED.findall(text)]
            found += [token.lower() for token in _PINNED_SELECTOR.findall(text)]
    return list(dict.fromkeys(found))


def source_evidence(request: dict, plan: dict, state: dict) -> tuple[str | None, dict, str]:
    source = state.get('checkout_source') or Path(__file__).resolve().parents[3]
    try:
        sha = code_index.git(source, 'rev-parse', 'HEAD').decode().strip()
    except OSError:
        return None, {}, '(không đọc được commit nguồn)'
    files = {}
    chunks = [state.get('planning_context') or '']
    tasks = list(plan.get('subtasks') or []) + [{'file': path} for path in state.get('source_targets') or []]
    named = coverage.requested_paths("\n".join(str(request.get(key) or "") for key in ("subject", "body", "detail")))
    tasks += [{'file': path} for path in named if path not in {str(task.get('file') or '') for task in tasks}]
    for task in tasks:
        path = str(task.get('file') or '')
        if not path.startswith(('public/', 'server/contexts/_ai-generated/', 'ai-board/harness/skills/', 'ai-board/harness/prompts/')) or '..' in Path(path).parts:
            continue
        try:
            text = code_index.git(source, 'show', f'{sha}:{path}').decode('utf8', 'replace')
        except OSError:
            continue
        files[path] = text
        wide = 'context' in fixes()
        words = file_context.keywords(request.get('subject'), request.get('body'), task.get('title'), task.get('verify') if wide else None)
        pins = tuple(pinned_words(task)) if 'pinned' in fixes() else ()
        chunks.append(f'FILE {path} at {sha}\n' + file_context.excerpt(text, list(dict.fromkeys([*pins, *words])),
            budget=6000 if wide else 3500, filename=path, pinned=pins))
        if 'targetpresent' in fixes() and pins and (lines := _anchor_lines(text, pins)):
            chunks.append(f'ANCHOR LINES {path} at {sha}\n' + lines)
    return sha, files, '\n\n'.join(chunks)[:16000]


_FILE_SUFFIX = re.compile(r'^\.(html?|css|m?js|json|md|py)$')


def _anchor_in(anchor: str, text: str) -> bool:
    """Anchor declared in source: quoted phrase as substring; `.name`/`#name` only as a class/id attribute or CSS selector."""
    if not anchor[:1] in '.#':
        return _squash(anchor).lower() in _squash(text).lower()
    if _FILE_SUFFIX.match(anchor):
        return False
    name = re.escape(anchor[1:])
    if anchor[0] == '.':
        pattern = rf'class\s*=\s*["\'][^"\']*\b{name}\b|\.{name}\s*[{{,:>.\s]'
    else:
        pattern = rf'id\s*=\s*["\']{name}["\']|#{name}\s*[{{,:>.\s]'
    return bool(re.search(pattern, text))


def _anchor_lines(text: str, anchors) -> str:
    """Source lines holding a plan anchor; the excerpt can cut the selector the plan names."""
    hits = [line.strip() for line in text.splitlines() if any(_anchor_in(a, line) for a in anchors)]
    return '\n'.join(hits[:8])


def target_anchored(plan: dict, files: dict, request: dict) -> bool:
    """`targetpresent` fix: each subtask's own file holds one of its anchors, and no quoted request text repeats there (ambiguous)."""
    if 'targetpresent' not in fixes() or not plan.get('subtasks'):
        return False
    literals = [_squash(lit).lower() for lit in file_context.literals(request.get('subject'), request.get('body'))]
    for task in plan['subtasks']:
        text = _squash(files.get(task['file'], '')).lower()
        if not any(_anchor_in(a, files.get(task['file'], '')) for a in pinned_words(task)):
            return False
        if any(lit and text.count(lit) > 1 for lit in literals):
            return False
    return True


def _squash(text: str) -> str:
    """Text without any whitespace: models join source lines with or without a space, so layout carries no evidence."""
    return re.sub(r'\s+', '', text)


_QUOTE_CHARS = re.compile('["`‘’“”]')
DEFAULT_FIXES = ",".join(sorted(DEFAULT_GATE25_FIXES))


def fixes() -> set[str]:
    """Gate 2.5 patches on: AI_BOARD_GATE25_FIXES comma list; unset or empty = none."""
    return set(get_settings().gate25_fixes)


def _fold(text: str) -> str:
    """_squash plus one quote style when `quotes` fix on: models rewrite "x" as 'x' when they copy HTML."""
    text = _squash(text)
    return _QUOTE_CHARS.sub("'", text) if "quotes" in fixes() else text


def _too_short(quote: str) -> bool:
    """Quote too small to prove grounding. `shortquote` counts identifier chars so a bare tag like `<style>` passes."""
    if 'shortquote' in fixes():
        return len(re.findall(r'\w', quote)) < 4
    return len(quote.strip()) < 8


_QUOTE_MAX = 320  # schema maxLength for a grounding quote
_GAP_QUOTES = re.compile('["\'`‘’“”]')


def _quoted_in(quote: str, text: str) -> bool:
    """Quote verbatim in text. `ellipsis` fix: `...` in quote is a gap; its pieces must appear in order."""
    if 'ellipsis' not in fixes() or '...' not in quote:
        return _fold(quote) in _fold(text)
    # a gap also swallows the attribute quotes around it: `class=...loading>` is `class="loading">`
    pieces = [piece for piece in (_GAP_QUOTES.sub('', _fold(p)) for p in quote.split('...')) if piece]
    if not pieces:
        return False
    haystack, pos = _GAP_QUOTES.sub('', _fold(text)), 0
    for piece in pieces:
        found = haystack.find(piece, pos)
        if found < 0:
            return False
        pos = found + len(piece)
    return True


_LINE_MARKER = re.compile(r'^[ \t]*(?:[\w./-]+:)?L?\d+\|[ ]?', re.M)


def literal_contradicts(request: dict, best: str | None, files: dict, source, sha: str | None) -> bool:
    """`literal` fix: a quoted user text exists in the best-match file but in none of the plan's files."""
    if 'literal' not in fixes() or not best or not sha:
        return False
    try:
        home = code_index.git(source, 'show', f'{sha}:{best}').decode('utf8', 'replace')
    except OSError:
        return False
    return any(lit in home and not any(lit in text for text in files.values())
               for lit in file_context.literals(request.get('subject'), request.get('body')))


def adds_files(plan: dict, files: dict) -> bool:
    """Plan có subtask trỏ file chưa tồn tại ở base (feature thêm file) hay không."""
    return any(task['file'] not in files for task in plan.get('subtasks') or [])


def feature_request(request: dict) -> bool:
    """Yêu cầu loại feature (hoặc server đã xác định là nhiều bước) — chỉ loại này mới thêm file mới."""
    return request.get('type') == 'feature' or bool(request.get('complexity_by_server'))


class Mismatch(ValueError):
    """Grounding sai chứng minh được; `evidence` = {item, target, file, quote, why} cho vết chặn."""

    def __init__(self, message, **evidence):
        super().__init__(message)
        self.evidence = {'why': message, **evidence}


def _named_new_files(plan, files, request):
    """New files named in the request, or inside a requested folder (>=2 segments): explicit targets."""
    text = " ".join(str(request.get(k) or "") for k in ("subject", "body", "clarified_spec"))
    added = [st["file"] for st in plan.get("subtasks") or [] if st.get("file") not in files]

    def named(path):
        parts = path.split("/")
        return path in text or any("/".join(parts[:i]) + "/" in text for i in range(2, len(parts)))

    return [path for path in added if named(path)]

def filled_grounding(validation: dict, plan: dict, files: dict, asserted: bool = False) -> list:
    """Grounding records for every subtask. A new file has no source line to quote, so the harness can state
    its before/after/verify from the subtask itself; an existing file still needs the validator's own record."""
    records = validation.get('grounding')
    records = records if isinstance(records, list) and len(records) == len(plan.get('subtasks') or []) else []
    filled = []
    for index, task in enumerate(plan.get('subtasks') or []):
        record = records[index] if index < len(records) and isinstance(records[index], dict) else {}
        if task['file'] in files:
            if asserted and not record.get('file') and not record.get('target') and not record.get('quote'):
                # Validator gave no record: nothing is provably wrong, so the harness states it and flags it unverified.
                record = {'target': task['file'], 'file': task['file'], 'quote': '', 'unverified': True,
                          'before': 'chưa xác minh bằng trích dẫn', 'after': str(task.get('title') or ''),
                          'verify': str(task.get('verify') or '')}
            filled.append(record)
            continue
        filled.append({'target': task['file'], 'file': task['file'], 'quote': str(record.get('quote') or ''),
                       'before': str(record.get('before') or 'chưa có file'),
                       'after': str(record.get('after') or task.get('title') or ''),
                       'verify': str(record.get('verify') or task.get('verify') or '')})
    return filled


def checked_grounding(validation: dict, plan: dict, sha: str | None, files: dict) -> dict:
    """Dẫn chứng hành vi cho từng subtask. File mới (chưa có ở base) không có dòng nguồn nào để trích:
    chấp nhận `quote` rỗng khi before/after/verify đã nêu; nếu có trích từ file mẫu có thật thì vẫn kiểm khớp."""
    records = validation.get('grounding')
    if not sha or not validation['grounded'] or not isinstance(records, list):
        raise ValueError(validation.get('reason') or 'thiếu dẫn chứng hành vi từ code nguồn')
    # Records identify their subtask by the file they quote; a model that adds a new file leaves that task
    # without a record, and the harness states it as unverified instead of shifting every later record.
    by_file = {}
    for record in records:
        if isinstance(record, dict):
            for name in (record.get('file'), record.get('target')):
                if isinstance(name, str) and name:
                    by_file.setdefault(name, record)
    clean = []
    for index, task in enumerate(plan['subtasks']):
        evidence = by_file.get(task['file'])
        if evidence is None:
            if task['file'] in files:
                raise Mismatch('dẫn chứng không khớp file dự định sửa', item=task['file'], target=None,
                               file=None, quote='')
            evidence = {'target': task['file'], 'file': task['file'], 'quote': '', 'unverified': True,
                        'before': 'chưa có file', 'after': str(task.get('title') or ''),
                        'verify': str(task.get('verify') or '')}
        file = evidence.get('file')
        quote = evidence.get('quote')
        cut_at_cap = isinstance(quote, str) and len(quote) >= _QUOTE_MAX
        if isinstance(quote, str):  # REPO DATA shows lines as `path:N| text` / `LN| text`; models copy the marker too
            quote = _LINE_MARKER.sub('', quote)
            evidence = {**evidence, 'quote': quote}
        if ('truncated' in fixes() and cut_at_cap and isinstance(quote, str)
                and not _quoted_in(quote, files.get(file, ''))):  # the schema cut the quote mid-token; its last token is unreliable
            quote = quote.rsplit(' ', 1)[0]
            evidence = {**evidence, 'quote': quote}
        new_target = task['file'] not in files
        if new_target:
            # A new file has no source line to quote. The plan still has to state the behaviour change and the
            # check; a quote is only accepted when it comes from a pattern file that really exists at the base.
            file = file or task['file']  # the record always names a file: the board's plan policy requires it
            if isinstance(quote, str) and quote.strip():
                if file == task['file'] and file not in files:  # quote "from" the file being created: nothing to verify, evidence only
                    quote = ''
                    evidence = {**evidence, 'quote': ''}
                elif file not in files or not _quoted_in(quote, files[file]):
                    raise ValueError(f'{task["file"]}: trích dẫn mẫu không có trong {file or "(file mới)"}')
            if any(not isinstance(evidence.get(key), str) or not evidence[key].strip() for key in ('before', 'after', 'verify')):
                raise ValueError('thiếu hành vi trước/sau hoặc tiêu chí kiểm chứng')
            clean.append({**{key: str(evidence.get(key) or '')[:1200] for key in ('quote', 'before', 'after', 'verify')},
                          'file': file, 'target': task['file']})
            continue
        if task['file'] in files and evidence.get('unverified'):
            clean.append({**{key: str(evidence.get(key) or '')[:1200] for key in ('quote', 'before', 'after', 'verify')},
                          'file': task['file'], 'target': task['file']})
            continue
        if task['file'] in files and file != task['file']:
            raise Mismatch('trích dẫn phải thuộc file hiện có dự định sửa', item=task['file'], target=evidence.get('target'),
                           file=file, quote=str(quote or '')[:200])
        if (not isinstance(quote, str) or _too_short(quote) or len(quote) > 1200
                or not _quoted_in(quote, files.get(file, ''))):  # models join source lines: compare content, not layout
            if 'advquote' in fixes() and all(isinstance(evidence.get(key), str) and evidence[key].strip() for key in ('before', 'after', 'verify')):
                by_file.get(task['file'], evidence)['unverified'] = True  # target file is verified: a rewritten quote is the validator's flaw, not the plan's
                clean.append({**{key: str(evidence[key])[:1200] for key in ('before', 'after', 'verify')}, 'quote': '',
                              'file': task['file'], 'target': task['file']})
                continue
            raise Mismatch(f'{task["file"]}: không tìm thấy trích dẫn hành vi trong code nguồn', item=task['file'],
                           target=evidence.get('target'), file=file, quote=str(quote or '')[:200])
        if any(not isinstance(evidence.get(key), str) or not evidence[key].strip() for key in ('before', 'after', 'verify')):
            raise ValueError('thiếu hành vi trước/sau hoặc tiêu chí kiểm chứng')
        clean.append({**{key: evidence[key][:1200] for key in ('file', 'quote', 'before', 'after', 'verify')}, 'target': task['file']})  # server matches target against the step's allowed_scope
    return {'sha': sha, 'evidence': clean}


def is_complex(plan: dict) -> bool:
    """3/5 tín hiệu gate 5.5, tính sớm từ plan — xem docstring module.
    Lưu ý cho người xây gate 5.5 thật: tín hiệu "route/
    middleware mới" ở ĐÂY đo vị trí file (ngoài _ai-generated/public hay
    không) — KHÔNG PHẢI cùng phép đo với "route/middleware mới=high" gate 5.5
    dự định làm trên DIFF thật (spec.md mục 09). Cùng tên, khác đối tượng đo
    — đừng giả định 2 cái tương đương khi build gate 5.5."""
    return bool(complexity_signals(plan))


def complexity_signals(plan: dict) -> list[str]:
    """Tín hiệu phức tạp đã bật, dạng '<tên>: <chi tiết>' cho admin đọc. Rỗng = đơn giản."""
    signals = []
    caps = sorted(set(plan.get("capabilities") or []))
    if len(caps) >= 2:
        signals.append(f"capabilities: {', '.join(caps)}")
    subtasks = plan.get("subtasks") or []
    outside = sorted({st.get("file", "") for st in subtasks if not _SAFE_FILE_PREFIX.match(st.get("file", ""))})
    if outside:
        signals.append(f"file ngoài vùng an toàn: {', '.join(outside)}")
    if len(subtasks) >= 4:
        signals.append(f"subtasks: {len(subtasks)}")
    return signals


def _lookup_requester(db_path, display_name: str | None) -> dict | None:
    """users.display_name khớp field 'from' của request item -> {id, role}.
    None nếu không map được (guest/tên không khớp) -> fail-closed phía caller."""
    if not display_name:
        return None
    with harness_db(db_path, ddl=_SCHEMA_DDL) as con:
        row = con.execute(
            "SELECT id, role FROM users WHERE display_name = %s LIMIT 1", (display_name,)
        ).fetchone()
    return {"id": row[0], "role": row[1]} if row else None


def _has_domain_grant(db_path, user_id: int, domain: str | None) -> bool:
    if not domain:
        return False
    with harness_db(db_path, ddl=_SCHEMA_DDL) as con:
        row = con.execute(
            """SELECT 1 FROM user_domain_grants
               WHERE user_id = %s AND domain_id = %s AND (expires_at IS NULL OR expires_at > %s) LIMIT 1""",
            (user_id, domain, int(time.time() * 1000)),
        ).fetchone()
    return row is not None


def is_authorized_for_complex(db_path, request: dict) -> bool:
    """Anh + Lampx (role='admin') hoặc domain expert có user_domain_grants
    đúng domain request. Request không map được sang user thật -> False
    (fail-closed), giống nguyên tắc guardrail nội dung."""
    user = _lookup_requester(db_path, request.get("from") or request.get("student"))
    if not user:
        return False
    if user["role"] == "admin":
        return True
    return _has_domain_grant(db_path, user["id"], request.get("domain"))


def write_clarification(db_path, request: dict, question: str) -> None:
    """INSERT trực tiếp vào request_messages (role='admin') — đúng cách
    scripts/admin-reply.js đã làm, KHÔNG qua HTTP/login (harness chạy cùng
    host, có quyền DB trực tiếp). request['db_id'] = requests.id thật."""
    db_id = request.get("db_id")
    if db_id is None:
        return  # request không map được sang row thật -> không có id để ghi vào
    now = int(time.time() * 1000)
    with harness_db(db_path, ddl=_SCHEMA_DDL) as con:
        con.execute(
            """INSERT INTO request_messages (request_id, role, author_name, body, attachments, created_at)
               VALUES (%s, 'admin', 'AI Board', %s, NULL, %s)""",
            (db_id, question, now),
        )
        con.execute("UPDATE requests SET updated_at = %s WHERE id = %s", (now, db_id))


def answered_on() -> bool:
    """AI_BOARD_GATE25_ANSWERED truthy: a clarification answerable by a verbatim request/source quote is answered, validator reruns."""
    return get_settings().gate25_answered


_WORD = re.compile(r"\w{3,}")


def verified_answer(text: str, question: str, haystacks: list[str]) -> str | None:
    """Answer from answerable-call JSON when its quote is verbatim in a haystack and shares a word with the question, else None."""
    try:
        out = json.loads(text)
    except (TypeError, ValueError):
        return None
    if not isinstance(out, dict) or out.get("answerable") is not True:
        return None
    answer, quote = out.get("answer"), out.get("quote")
    if not isinstance(answer, str) or not answer.strip() or not isinstance(quote, str):
        return None
    quote = _LINE_MARKER.sub("", quote)
    if _too_short(quote) or not set(_WORD.findall(question.lower())) & set(_WORD.findall(quote.lower())):
        return None
    return answer.strip()[:200] if any(_quoted_in(quote, h) for h in haystacks) else None


def settled_answer(request: dict, question: str, repo_context: str, files: dict, state: dict, deps, budget, *, db_path=None, proposal_id=None) -> str | None:
    """One extra model call: answer to `question` iff request or source quotes it verbatim."""
    thread = context.thread_text(request.get("thread"), request.get("clarified_spec")) or "(không có)"
    prompt = context.manual() + ANSWERABLE_PROMPT.format(subject=request.get("subject", ""), body=request.get("body", ""),
                                                          thread=thread, question=question, repo_context=repo_context)
    schema = {"type": "object", "additionalProperties": False,
              "properties": {"answerable": {"type": "boolean"}, "answer": {"type": "string", "maxLength": 200},
                             "quote": {"type": "string", "maxLength": 320}},
              "required": ["answerable", "answer", "quote"]}
    body = deps.call_model(deps.models.gate1_model, prompt, gate=2.5, budget=budget, format=schema, db_path=db_path,
                           proposal_id=proposal_id, prompt_name="plan_answerable.md", options={"num_predict": 1024})
    if body.get("done_reason") == "length":
        return None
    haystacks = [str(request.get("subject") or ""), str(request.get("body") or ""), state.get("planning_context") or "",
                 *(str(m.get("body") or "") for m in request.get("thread") or []), *files.values()]
    return verified_answer(body.get("response", ""), question, haystacks)


def _validator_options() -> dict | None:
    """Larger output budget for multi-subtask plans when AI_BOARD_GATE25_FIXES lists `tokens`."""
    return {"num_predict": 6144} if "tokens" in fixes() else None


LOW_RISK_FILES = (".html", ".css")


def _assumable(plan: dict, validation: dict, request: dict) -> bool:
    """One subtask on a static page/stylesheet, the validator found a verbatim grounding for it, and the request is not a feature or a guard case."""
    tasks = plan.get("subtasks") or []
    return (len(tasks) == 1 and tasks[0]["file"].endswith(LOW_RISK_FILES) and not plan.get("capabilities") == ["self.config"]
            and bool(validation.get("grounded")) and request.get("type") != "feature" and not complexity_signals(plan))


_CODE_QUESTION = re.compile(r"[\w./-]+\.(?:html|js|mjs|css|json|py|md)\b|\b(?:repo|codebase|selector|endpoint|building id|gx|gy|tọa độ|mã nguồn)\b", re.I)


def clarify_limit() -> int:
    """Trần vòng hỏi: limits.clarify.questions của contract.json."""
    path = Path(__file__).resolve().parents[3] / "server" / "ai-board" / "contract.json"
    return int(json.loads(path.read_text(encoding="utf-8"))["limits"]["clarify"]["questions"])


def rounds_asked(request: dict) -> int:
    """Số câu hỏi làm rõ cổng 2.5 đã gửi (tin nhắn admin trong thread)."""
    return sum(1 for item in request.get("thread") or [] if isinstance(item, dict) and item.get("role") == "admin")


def asks_about_code(question: str | None) -> bool:
    """Question names a file path or code detail: the student cannot answer it, the plan decides."""
    return bool(question and _CODE_QUESTION.search(question))


def _uncertain(validation: dict) -> bool:
    """The non-thinking validator did not clear the plan: unclear request or no verified grounding."""
    return not validation['clear'] or not validation.get('grounded')


_EXISTS_CLAIM = re.compile(r"đã (?:có|tồn tại)|tương tự|already exists?|similar", re.I)


_NOT_IN_DATA = re.compile(r'không (?:có|thấy|tìm thấy)[^.]{0,40}REPO DATA|not (?:in|found in) REPO DATA', re.I)


def retrieval_miss(validation: dict, files: dict) -> list[str]:
    """Files the validator calls absent from REPO DATA although they were loaded: a retrieval fault, not an objection to the plan."""
    reason = str(validation.get('reason') or '')
    return [path for path in files if _NOT_IN_DATA.search(reason) and path in reason]


def objection_advisory(validation: dict, files: dict) -> str | None:
    """Note when grounded=false has no verified citation (gate 2.5 does not block on it); None when it is verified."""
    if validation.get('grounded'):
        return None
    missed = retrieval_miss(validation, files)
    if missed:
        return f"lỗi truy xuất, không phải phản đối plan: validator báo thiếu trong REPO DATA nhưng file có trong dữ liệu: {', '.join(missed)}"
    verified = evidence.verified(validation.get('objection'), files)
    if verified:
        claim = str((validation.get('objection') or {}).get('claim') or '')
        if _EXISTS_CLAIM.search(claim) and not grounding_paths.similar_basis(claim, {item['file'] for item in verified}, files):
            return f"khẳng định 'đã có tương tự' không đạt ngưỡng BM25 trên repo, cổng 2.5 không chặn: {claim[:200]}"
        return None
    return f"grounded=false không có trích dẫn kiểm chứng được, cổng 2.5 không chặn: {str(validation.get('reason') or '')[:200]}"


def _brief(validation: dict) -> dict:
    return {'clear': validation['clear'], 'grounded': bool(validation.get('grounded')), 'reason': str(validation.get('reason') or '')[:200],
            'question': str(validation.get('question') or '')[:200]}


def run(request: dict, deps, budget, state: dict, *, db_path=None, proposal_id: int | None = None) -> dict:
    """Điểm vào cho main.run_gate. Đọc state['plan'] do cổng 1 để lại."""
    plan = state.get("plan")
    if not plan:
        return {"gate": 2.5, "blocked": True, "reason": "không có plan từ cổng 1"}

    sha, files, repo_context = source_evidence(request, plan, state) if request.get('grounding_required') else (None, {}, '(legacy dry-run)')
    prompt = build_prompt(request, plan, repo_context)
    trace = getattr(deps, "trace", None)

    def judge(check, ok, detail=""):
        if trace:
            trace.attach_last("evaluation", {"check": check, "ok": ok, "detail": detail})

    if trace:
        trace.note("knows", "plan under review", "; ".join(f"{t['file']} — {t['title']}" for t in plan["subtasks"]),
                   [{"file": t["file"], "verify": t.get("verify")} for t in plan["subtasks"]])
        if request.get("grounding_required"):
            trace.note("tool", "git show", f"read {len(files)} file{'s' if len(files) != 1 else ''} at {str(sha)[:7]}: {', '.join(files) or '(none)'}", {"sha": sha})
            trace.note("knows", "source evidence", f"{len(repo_context)} chars of source code given to the validator")
    short = {"type": "string", "maxLength": 200}
    record = {"type": "object", "additionalProperties": False,
              "properties": {name: ({"type": "string", "maxLength": _QUOTE_MAX} if name == "quote" else short)
                             for name in ("target", "file", "quote", "before", "after", "verify")},
              "required": ["target", "file", "quote", "before", "after", "verify"]}
    schema = {"type": "object", "additionalProperties": False,
              "properties": {"clear": {"type": "boolean"}, "question": {"type": ["string", "null"], "maxLength": 200},
                             "grounded": {"type": "boolean"}, "reason": short,
                             "grounding": {"type": "array", "maxItems": len(plan['subtasks']), "items": record},
                             "objection": {"type": ["object", "null"], "properties": {
                                 "claim": short, "evidence": {"type": "array", "maxItems": 3, "items": {
                                     "type": "object", "additionalProperties": False,
                                     "properties": {"file": short, "snippet": {"type": "string", "maxLength": _QUOTE_MAX}},
                                     "required": ["file", "snippet"]}}},
                                 "required": ["claim", "evidence"]}},
              "required": ["clear", "question", "grounded", "reason", "grounding", "objection"]}
    def validate(req, think=False):
        ask = lambda options: deps.call_model(deps.models.gate1_model, prompt if req is request else build_prompt(req, plan, repo_context),
                                              gate=2.5, budget=budget, format=schema, db_path=db_path, proposal_id=proposal_id,
                                              prompt_name="plan_validate.md", options=options,
                                              **({"extra": {"force_thinking": True}} if think else {}))
        body = ask(_validator_options())
        if body.get('done_reason') == 'length' and 'retry' in fixes() and not think:  # degenerate whitespace runs: resample once
            body = ask({**(_validator_options() or {}), 'temperature': 0.3})
        if body.get('done_reason') == 'length':
            return None, {"gate": 2.5, "blocked": True, "reason": "validator output truncated at token limit",
                          "public_message": "Kế hoạch đang chờ quản trị viên kiểm tra vì phản hồi kiểm chứng chưa hoàn chỉnh."}
        try:
            result = parse_validation(body.get("response", ""))
        except ValueError as e:
            return None, {"gate": 2.5, "blocked": True, "reason": f"validator trả sai schema: {e}"}
        judge("validator", result["clear"],
              f"clear={result['clear']}, grounded={result.get('grounded')}: {result.get('reason') or result.get('question') or ''}")
        return result, None

    validation, stop = validate(request)
    if stop:
        return stop
    if not validation['clear'] and asks_about_code(validation.get('question')):
        state['assumption'] = validation['question']
        judge('code question dropped', True, validation['question'])
        validation = {**validation, 'clear': True, 'question': None}
    anchored = bool(request.get('grounding_required')) and target_anchored(plan, files, request)
    if anchored and not validation['clear'] and validation.get('grounded'):
        judge('target anchored', True, 'anchors verified in plan files; clarification not raised')
        validation = {**validation, 'clear': True}
    if 'reasoning' in fixes() and _uncertain(validation) and budget.can_afford():
        # A hard case gets one more pass with thinking on. It can only confirm the block or open a review: it never passes a plan itself.
        second, second_stop = validate(request, think=True)
        state['reasoning'] = {'first': _brief(validation), 'second': _brief(second) if second else {'unknown': second_stop.get('reason')}}
        judge('reasoning pass', second is not None and _uncertain(second), json.dumps(state['reasoning'], ensure_ascii=False)[:600])  # ok = the second pass confirms the block
        if second and not _uncertain(second):
            message = 'Hai lần soát kế hoạch không đồng ý với nhau; cần quản trị viên xem trước khi làm tiếp.'
            return {'gate': 2.5, 'blocked': True, 'outcome': 'validator_disagreement', 'public_message': message,
                    'reason': f"validator_disagreement: lần 1 {state['reasoning']['first']['reason']} | lần 2 (reasoning) ok",
                    'review': state['reasoning']}
    if not validation["clear"] and validation["question"] and answered_on():
        answer = settled_answer(request, validation["question"], repo_context, files, state, deps, budget,
                                db_path=db_path, proposal_id=proposal_id)
        judge("answered clarification", answer is not None, f"{validation['question']} -> {answer}")
        if answer:
            thread = [*(request.get("thread") or []), {"role": "admin", "body": validation["question"]},
                      {"role": "answer found in request/source", "body": answer}]
            validation, stop = validate({**request, "thread": thread})
            if stop:
                return stop
    if not validation["clear"] and validation["question"] and request.get("_simulated_answer"):
        # Measurement only: the suite plays the requester who answers the question, to find the ceiling once clarification is solved.
        thread = [*(request.get("thread") or []), {"role": "admin", "body": validation["question"]},
                  {"role": "requester", "body": request["_simulated_answer"]}]
        state["simulated_answer"] = validation["question"]
        validation, stop = validate({**request, "thread": thread})
        if stop:
            return stop
    if not validation["clear"] and 'assume' in fixes() and _assumable(plan, validation, request):
        # A low-risk, single static file, grounded plan goes on with its most plausible reading; the admin sees the flagged assumption.
        state["assumption"] = validation["question"] or validation.get("reason") or "yêu cầu chưa nêu rõ"
        judge("assumed plan", True, state["assumption"])
        validation = {**validation, "clear": True}
    if not validation["clear"] and request.get("clarified_spec"):
        # The requester already answered the open points; the clarified spec is the decision record. What the
        # validator still wants (a title, a link, a layout) is carried by the spec into gate 3, so asking the
        # student again would only loop: clear the plan and record the note for the admin.
        state["assumption"] = validation["question"] or validation.get("reason") or "spec đã làm rõ"
        judge("clarified spec", True, state["assumption"])
        validation = {**validation, "clear": True}
    if not validation["clear"] and rounds_asked(request) >= clarify_limit():
        state["assumption"] = validation["question"] or validation.get("reason") or "yêu cầu chưa nêu rõ"
        judge("clarify limit", True, state["assumption"])
        validation = {**validation, "clear": True}
    if not validation["clear"]:
        question = validation["question"] or "Plan chưa đủ rõ — bạn mô tả thêm chi tiết được không?"
        if db_path is not None:
            write_clarification(db_path, request, question)
        return {"gate": 2.5, "blocked": True, "reason": "needs_clarification", "outcome": "needs_clarification",
                "public_message": question}

    # An objection we could not verify leaves the plan running without records; a bare grounded=false
    # with no objection, or a veto backed by verified evidence, keeps blocking at source grounding.
    objection = validation.get('objection')
    asserted = bool(validation.get('grounded')) or bool(objection) and not evidence.verified(objection, files)
    note = objection_advisory(validation, files)
    if note:
        # Unverifiable objection: the plan goes on, the admin sees the note in the trace.
        state['validator_note'] = note
        judge('validator objection', False, note)
        validation = {**validation, 'grounded': True}

    if request.get('grounding_required'):
        validation = {**validation, 'grounding': filled_grounding(validation, plan, files, asserted)}
        try:
            import functional
            targets = {task['file'] for task in plan['subtasks']}
            required = functional.expected_targets({'request_title': request.get('subject'), 'request_detail': request.get('body')})
            if required and not required.intersection(targets):
                # Oracle is advisory: a plan that names other files is reported, not forced to edit the oracle's file.
                state['oracle_conflict'] = 'plan không sửa renderer oracle gợi ý: ' + ', '.join(sorted(required))
                judge('oracle advisory', True, state['oracle_conflict'])
            if 'LƯU Ý: chữ người dùng nhắc KHÔNG nằm' in (state.get('planning_context') or '') and not targets.intersection(state.get('source_targets') or []):
                if _named_new_files(plan, files, request):
                    state['renderer_advisory'] = 'plan adds requested new files; renderer constraint is advisory'
                    judge('renderer advisory', True, state['renderer_advisory'])
                else:
                    raise ValueError('plan không sửa module đang render nội dung người dùng yêu cầu')
            contradicted = literal_contradicts(request, state.get('best_match'), files,
                                               state.get('checkout_source') or Path(__file__).resolve().parents[3], sha)
            if anchored and not contradicted:
                judge('best_match', True, 'targetpresent: anchors verified in plan files; advisory skipped')
            elif adds_files(plan, files) and feature_request(request):
                # A feature adds files that do not exist yet: there is no "most quoted file" to edit, so the
                # best-match is only recorded (the path/layer rules and grounding still apply). An edit request
                # that points at a file which does not exist still has to name the best-matching file.
                judge('best_match', True, f"{best_match.REASON_CODE}: plan adds new files; recommended "
                                          f"{state.get('best_match') or '(none)'}")
            else:
                best_match.enforce(state.get('best_match'), targets,
                                   f"plan không sửa file khớp nhiều cụm người dùng viết nhất: {state.get('best_match')}", judge,
                                   contradicted=contradicted)
            state['grounding'] = checked_grounding(validation, plan, sha, files)
            judge("source grounding", True, f"{len(state['grounding']['evidence'])} quotes matched verbatim in {', '.join(files)}")
            unverified = [r['file'] for r in validation['grounding'] if r.get('unverified')]
            if unverified:
                state['validator_note'] = 'validator không đưa trích dẫn khớp cho: ' + ', '.join(unverified) + ' (cổng 2.5 không chặn)'
                judge('unverified grounding', False, state['validator_note'])
        except ValueError as error:
            judge("source grounding", False, str(error))
            return {'gate': 2.5, 'blocked': True, 'reason': 'plan_ungrounded', 'outcome': 'plan_ungrounded',
                    'signals': [str(error)], 'evidence': getattr(error, 'evidence', None) or {'why': str(error)},
                    'public_message': 'Kế hoạch cần quản trị viên kiểm tra vì chưa xác định đúng phần cần thay đổi.'}

    signals = complexity_signals(plan)
    if request.get("complexity_by_server"):
        # HTTP worker không có DB: server quyết qua tier (risk high → protected → admin cho phép plan).
        state["complexity_signals"] = signals
        return {"gate": 2.5, "blocked": False, "reason": None, "signals": signals}
    if signals and not (db_path is not None and is_authorized_for_complex(db_path, request)):
        return {"gate": 2.5, "blocked": True, "reason": "complexity_gated", "outcome": "complexity_gated",
                "signals": signals}

    return {"gate": 2.5, "blocked": False, "reason": None}
