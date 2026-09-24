"""Cổng 2.5 (ticket 22) — soát plan (Q1) + phân quyền độ phức tạp (Q2) TRƯỚC
khi cổng 3 tiêu ngân sách. Một checkpoint (không phải 2 gate riêng) vì cả hai
là quyết định "dừng trước cổng 3" trên cùng 1 plan tại cùng 1 điểm trong loop.

Q1 — plan có đủ/nhất quán không? Gọi GATE1_MODEL LẦN NỮA ở vai validator
(khác vai tác giả cổng 1, dù cùng model — spec.md: vai này vốn đã dùng để
chấm lại diff, tránh "tự chấm bài mình"; ticket này mở rộng nó sang soát cả
plan). clear=false -> dừng, ghi câu hỏi thẳng vào request_messages (route
POST /api/requests/:id/messages đã có, tái dùng — harness INSERT trực tiếp,
đúng cách scripts/admin-reply.js đã làm), outcome='needs_clarification'.

Q2 — plan có "phức tạp" không? Tính THUẦN BẰNG CODE (không hỏi model), 3/5
tín hiệu gate 5.5 (ticket 13) đã định nghĩa nhưng tính SỚM từ plan, trước khi
có diff:
  - >=2 capability riêng biệt trong plan.capabilities — proxy sớm nhất cho
    "chạm >=2 domain" khi schema plan (gates/brainstorm.py) chưa gắn domain
    vào từng capability, chỉ có 1 danh sách phẳng; ticket 22 chỉ đích danh
    field này ("...trong plan.capabilities").
  - Bất kỳ subtask nào có `file` NẰM NGOÀI 2 vùng an toàn chuẩn
    (`server/contexts/_ai-generated/**`, `public/**`) — đây mới thật sự là
    "route/middleware mới" đáng cảnh giác. Một plugin `_ai-generated` MỚI
    KHÔNG tính vào tín hiệu này dù nó cũng "mount 1 router mới": đó là
    trường hợp THƯỜNG NGÀY, an toàn-theo-kiến-trúc (registry.js +
    capabilities.js dựng sẵn đúng để việc này rẻ/an toàn — mục đích toàn bộ
    ticket 04/06/08), và prompts/brainstorm.md đã tự giới hạn model CHỈ
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
guardrail nội dung ticket 14).
"""
from __future__ import annotations

import json
import re
import time
from pathlib import Path

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


def build_prompt(request: dict, plan: dict) -> str:
    thread = " | ".join(
        f"{m.get('role')}: {m.get('body')}" for m in (request.get("thread") or [])
    ) or "(không có)"
    return PROMPT.format(
        domain=request.get("domain") or "(core)",
        subject=request.get("subject", ""),
        body=request.get("body", ""),
        thread=thread,
        plan_json=json.dumps(plan, ensure_ascii=False),
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
    return {"clear": out["clear"], "question": question}


def is_complex(plan: dict) -> bool:
    """3/5 tín hiệu gate 5.5 (ticket 13), tính sớm từ plan — xem docstring module.
    Lưu ý cho người xây gate 5.5 thật (code-review round): tín hiệu "route/
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
    (fail-closed), giống nguyên tắc guardrail nội dung ticket 14."""
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

    prompt = build_prompt(request, plan)
    body = deps.call_model(deps.models.gate1_model, prompt, gate=2.5, budget=budget,
                            db_path=db_path, proposal_id=proposal_id)

    try:
        validation = parse_validation(body.get("response", ""))
    except ValueError as e:
        return {"gate": 2.5, "blocked": True, "reason": f"validator trả sai schema: {e}"}

    if not validation["clear"]:
        question = validation["question"] or "Plan chưa đủ rõ — bạn mô tả thêm chi tiết được không?"
        if db_path is not None:
            write_clarification(db_path, request, question)
        return {"gate": 2.5, "blocked": True, "reason": "needs_clarification", "outcome": "needs_clarification"}

    signals = complexity_signals(plan)
    if signals and not (db_path is not None and is_authorized_for_complex(db_path, request)):
        return {"gate": 2.5, "blocked": True, "reason": "complexity_gated", "outcome": "complexity_gated",
                "signals": signals}

    return {"gate": 2.5, "blocked": False, "reason": None}
