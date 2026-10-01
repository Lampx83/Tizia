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

PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "plan_validate.md").read_text(encoding="utf-8")

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
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT    NOT NULL UNIQUE,
  display_name  TEXT    NOT NULL,
  password_hash TEXT    NOT NULL,
  role          TEXT    NOT NULL DEFAULT 'student',
  created_at    INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS user_domain_grants (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id      INTEGER NOT NULL,
  domain_id    TEXT    NOT NULL,
  granted_at   INTEGER NOT NULL,
  granted_by   INTEGER,
  expires_at   INTEGER,
  note         TEXT
);
CREATE TABLE IF NOT EXISTS requests (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  domain      TEXT    NOT NULL,
  type        TEXT    NOT NULL DEFAULT 'other',
  title       TEXT    NOT NULL,
  detail      TEXT,
  student     TEXT    NOT NULL DEFAULT 'Ẩn danh',
  status      TEXT    NOT NULL DEFAULT 'pending',
  votes       INTEGER NOT NULL DEFAULT 1,
  admin_note  TEXT,
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS request_messages (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id  INTEGER NOT NULL,
  role        TEXT    NOT NULL,
  author_name TEXT,
  body        TEXT    NOT NULL,
  attachments TEXT,
  created_at  INTEGER NOT NULL
);
"""


def build_prompt(request: dict, plan: dict, repo_context: str = '(không có)') -> str:
    """AIBOARD.md (context.manual) đứng đầu, trước prompt đã khoá — prefix KV giống hệt mọi lần gọi."""
    thread = " | ".join(
        f"{m.get('role')}: {m.get('body')}" for m in (request.get("thread") or [])
    ) or "(không có)"
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
            "reason": str(out.get("reason") or '')[:500]}


def source_evidence(request: dict, plan: dict, state: dict) -> tuple[str | None, dict, str]:
    source = state.get('checkout_source') or Path(__file__).resolve().parents[3]
    try:
        sha = code_index.git(source, 'rev-parse', 'HEAD').decode().strip()
    except OSError:
        return None, {}, '(không đọc được commit nguồn)'
    files = {}
    chunks = [state.get('planning_context') or '']
    tasks = list(plan.get('subtasks') or []) + [{'file': path} for path in state.get('source_targets') or []]
    for task in tasks:
        path = str(task.get('file') or '')
        if not path.startswith(('public/', 'server/contexts/_ai-generated/', 'ai-board/harness/skills/', 'ai-board/harness/prompts/')) or '..' in Path(path).parts:
            continue
        try:
            text = code_index.git(source, 'show', f'{sha}:{path}').decode('utf8', 'replace')
        except OSError:
            continue
        files[path] = text
        chunks.append(f'FILE {path} at {sha}\n' + file_context.excerpt(text,
            file_context.keywords(request.get('subject'), request.get('body'), task.get('title')), budget=3500))
    return sha, files, '\n\n'.join(chunks)[:16000]


def _squash(text: str) -> str:
    return re.sub(r'\s+', ' ', text).strip()


_LINE_MARKER = re.compile(r'^[ \t]*(?:[\w./-]+:)?L?\d+\|[ ]?', re.M)


def checked_grounding(validation: dict, plan: dict, sha: str | None, files: dict) -> dict:
    records = validation.get('grounding')
    if not sha or not validation['grounded'] or not isinstance(records, list) or len(records) != len(plan.get('subtasks') or []):
        raise ValueError(validation.get('reason') or 'thiếu dẫn chứng hành vi từ code nguồn')
    clean = []
    for task, evidence in zip(plan['subtasks'], records):
        # `target` is free text for the model (often the subtask title); the file it quotes is what identifies the evidence
        if not isinstance(evidence, dict) or task['file'] not in (evidence.get('target'), evidence.get('file')):
            raise ValueError('dẫn chứng không khớp file dự định sửa')
        file = evidence.get('file')
        quote = evidence.get('quote')
        if isinstance(quote, str):  # REPO DATA shows lines as `path:N| text` / `LN| text`; models copy the marker too
            quote = _LINE_MARKER.sub('', quote)
            evidence = {**evidence, 'quote': quote}
        if task['file'] in files and file != task['file']:
            raise ValueError('trích dẫn phải thuộc file hiện có dự định sửa')
        if (not isinstance(quote, str) or len(quote.strip()) < 8 or len(quote) > 1200
                or _squash(quote) not in _squash(files.get(file, ''))):  # models join source lines: compare words, not layout
            raise ValueError(f'{task["file"]}: không tìm thấy trích dẫn hành vi trong code nguồn')
        if any(not isinstance(evidence.get(key), str) or not evidence[key].strip() for key in ('before', 'after', 'verify')):
            raise ValueError('thiếu hành vi trước/sau hoặc tiêu chí kiểm chứng')
        clean.append({key: evidence[key][:1200] for key in ('target', 'file', 'quote', 'before', 'after', 'verify')})
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
            "SELECT id, role FROM users WHERE display_name = ? LIMIT 1", (display_name,)
        ).fetchone()
    return {"id": row[0], "role": row[1]} if row else None


def _has_domain_grant(db_path, user_id: int, domain: str | None) -> bool:
    if not domain:
        return False
    with harness_db(db_path, ddl=_SCHEMA_DDL) as con:
        row = con.execute(
            """SELECT 1 FROM user_domain_grants
               WHERE user_id = ? AND domain_id = ? AND (expires_at IS NULL OR expires_at > ?) LIMIT 1""",
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
               VALUES (?, 'admin', 'AI Board', ?, NULL, ?)""",
            (db_id, question, now),
        )
        con.execute("UPDATE requests SET updated_at = ? WHERE id = ?", (now, db_id))


def run(request: dict, deps, budget, state: dict, *, db_path=None, proposal_id: int | None = None) -> dict:
    """Điểm vào cho main.run_gate. Đọc state['plan'] do cổng 1 để lại."""
    plan = state.get("plan")
    if not plan:
        return {"gate": 2.5, "blocked": True, "reason": "không có plan từ cổng 1"}

    sha, files, repo_context = source_evidence(request, plan, state) if request.get('grounding_required') else (None, {}, '(legacy dry-run)')
    prompt = build_prompt(request, plan, repo_context)
    short = {"type": "string", "maxLength": 200}
    record = {"type": "object", "additionalProperties": False,
              "properties": {name: ({"type": "string", "maxLength": 320} if name == "quote" else short)
                             for name in ("target", "file", "quote", "before", "after", "verify")},
              "required": ["target", "file", "quote", "before", "after", "verify"]}
    schema = {"type": "object", "additionalProperties": False,
              "properties": {"clear": {"type": "boolean"}, "question": {"type": ["string", "null"], "maxLength": 200},
                             "grounded": {"type": "boolean"}, "reason": short,
                             "grounding": {"type": "array", "maxItems": len(plan['subtasks']), "items": record}},
              "required": ["clear", "question", "grounded", "reason", "grounding"]}
    body = deps.call_model(deps.models.gate1_model, prompt, gate=2.5, budget=budget, format=schema,
                            db_path=db_path, proposal_id=proposal_id, prompt_name="plan_validate.md")
    if body.get('done_reason') == 'length':
        return {"gate": 2.5, "blocked": True, "reason": "validator output truncated at token limit",
                "public_message": "Kế hoạch đang chờ quản trị viên kiểm tra vì phản hồi kiểm chứng chưa hoàn chỉnh."}

    try:
        validation = parse_validation(body.get("response", ""))
    except ValueError as e:
        return {"gate": 2.5, "blocked": True, "reason": f"validator trả sai schema: {e}"}

    if not validation["clear"]:
        question = validation["question"] or "Plan chưa đủ rõ — bạn mô tả thêm chi tiết được không?"
        if db_path is not None:
            write_clarification(db_path, request, question)
        return {"gate": 2.5, "blocked": True, "reason": "needs_clarification", "outcome": "needs_clarification",
                "public_message": question}

    if request.get('grounding_required'):
        try:
            import functional
            targets = {task['file'] for task in plan['subtasks']}
            required = functional.expected_targets({'request_title': request.get('subject'), 'request_detail': request.get('body')})
            if required and not required.intersection(targets):
                raise ValueError('plan cần sửa renderer hiện có: ' + ', '.join(sorted(required)))
            if 'LƯU Ý: chữ người dùng nhắc KHÔNG nằm' in (state.get('planning_context') or '') and not targets.intersection(state.get('source_targets') or []):
                raise ValueError('plan không sửa module đang render nội dung người dùng yêu cầu')
            if state.get('best_match') and state['best_match'] not in targets:
                raise ValueError(f"plan không sửa file khớp nhiều cụm người dùng viết nhất: {state['best_match']}")
            state['grounding'] = checked_grounding(validation, plan, sha, files)
        except ValueError as error:
            return {'gate': 2.5, 'blocked': True, 'reason': 'plan_ungrounded', 'outcome': 'plan_ungrounded',
                    'signals': [str(error)], 'public_message': 'Kế hoạch cần quản trị viên kiểm tra vì chưa xác định đúng phần cần thay đổi.'}

    signals = complexity_signals(plan)
    if request.get("complexity_by_server"):
        # HTTP worker không có DB: server quyết qua tier (risk high → protected → admin cho phép plan).
        state["complexity_signals"] = signals
        return {"gate": 2.5, "blocked": False, "reason": None, "signals": signals}
    if signals and not (db_path is not None and is_authorized_for_complex(db_path, request)):
        return {"gate": 2.5, "blocked": True, "reason": "complexity_gated", "outcome": "complexity_gated",
                "signals": signals}

    return {"gate": 2.5, "blocked": False, "reason": None}
