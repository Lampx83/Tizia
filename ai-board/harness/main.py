"""Ratchet loop: đọc snapshot inbox, đi 7 cổng, ghi kết quả vào skill_proposals.

Ticket 04 = walking skeleton: mọi cổng còn là stub pass-through, logic thật lần
lượt vào ở ticket 10-13. Chỉ chạy nhánh DRY_RUN=1 — không git, không GitHub,
không Telegram ở bất kỳ đâu trong file này.
"""
from __future__ import annotations

import json
import os
import sqlite3
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

from budget import Budget          # noqa: E402
from models import OllamaClient    # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
ENV_FILE = ROOT / ".env"

# 7 cổng + cổng 5.5 (risk-triage). Thứ tự này là hợp đồng: gate_reached ghi lại
# đúng phần tử cuối cùng chạy xong, resume bắt đầu từ đó chứ không từ cổng 1.
GATES: tuple[float, ...] = (1, 2, 3, 4, 5, 5.5, 6, 7)

# Nguồn thật của schema là server/db.js (bảng tạo lúc Express khởi động).
# Bản CREATE IF NOT EXISTS này chỉ để harness chạy được trên DB tạm trong test.
# ponytail: 2 bản DDL (JS + Python) là giá phải trả cho 2 ngôn ngữ; nếu về sau
# thêm cột thì sửa cả hai, hoặc tách DDL ra 1 file .sql chung cho cả hai bên đọc.
SKILL_PROPOSALS_DDL = """
CREATE TABLE IF NOT EXISTS skill_proposals (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  origin        TEXT    NOT NULL,
  domain        TEXT,
  gate_reached  REAL    NOT NULL,
  outcome       TEXT,
  request_ids   TEXT,
  template_key  TEXT,
  budget_json   TEXT,
  pr_url        TEXT,
  created_at    INTEGER NOT NULL,
  updated_at    INTEGER NOT NULL
);
"""


class Unavailable:
    """Chỗ giữ chỗ cho git/Telegram. Chạm vào là nổ — ticket 04 không được gọi."""

    def __init__(self, label: str):
        self._label = label

    def __getattr__(self, name: str):
        raise NotImplementedError(
            f"{self._label}.{name}() chưa có ở ticket 04 (DRY_RUN=1, không side effect ngoài)"
        )


@dataclass(frozen=True)
class Deps:
    """Mọi biên I/O ra ngoài process. Test bơm fake vào đây."""

    models: Any
    git: Any
    notify: Any

    @classmethod
    def real(cls) -> "Deps":
        return cls(
            models=OllamaClient.from_env(),
            git=Unavailable("git"),
            notify=Unavailable("telegram"),
        )


def load_inbox(path: str | os.PathLike) -> list[dict]:
    """Đọc snapshot JSON do server/scripts/sync-inbox.mjs sinh. Trả items[]."""
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    return list(data.get("items") or [])


def run_gate(number: float, request: dict, deps: Deps) -> dict:
    """Stub pass-through. Cổng thật thay từng cái ở ticket 10-13."""
    return {"gate": number, "blocked": False, "reason": None}


def record_proposal(db_path, *, request: dict, gate_reached: float, outcome: str, budget: Budget) -> int:
    """INSERT 1 dòng lineage. Trả id."""
    now = int(time.time() * 1000)
    origin = "domain-synthesized" if request.get("domain") else "core-skill"
    con = sqlite3.connect(str(db_path))
    try:
        con.execute(SKILL_PROPOSALS_DDL)
        cur = con.execute(
            """INSERT INTO skill_proposals
                 (origin, domain, gate_reached, outcome, request_ids,
                  template_key, budget_json, pr_url, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                origin,
                request.get("domain"),
                float(gate_reached),
                outcome,
                json.dumps([request.get("id")]),
                request.get("template_key"),
                json.dumps(budget.snapshot()),
                None,
                now,
                now,
            ),
        )
        con.commit()
        return cur.lastrowid
    finally:
        con.close()


def run_once(request: dict, *, db_path, deps: Deps, budget: Budget | None = None) -> dict:
    """Đẩy 1 request qua 7 cổng, ghi đúng 1 dòng skill_proposals. Trả kết quả."""
    budget = budget or Budget.from_env()
    reached: float = 0.0
    outcome = "ok"

    for gate in GATES:
        if not budget.tick():
            outcome = "budget_exhausted"
            break
        result = run_gate(gate, request, deps)
        reached = gate
        if result.get("blocked"):
            outcome = f"blocked_gate_{gate}"
            break

    proposal_id = record_proposal(
        db_path, request=request, gate_reached=reached, outcome=outcome, budget=budget
    )
    return {
        "proposal_id": proposal_id,
        "request_id": request.get("id"),
        "gate_reached": reached,
        "outcome": outcome,
        "budget": budget.snapshot(),
    }


def main(argv: list[str] | None = None) -> int:
    # Console Windows mặc định cp1252 — mọi print tiếng Việt sẽ nổ
    # UnicodeEncodeError. Ép UTF-8 ngay ở entrypoint, đúng 1 chỗ cho mọi print.
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")

    try:
        from dotenv import load_dotenv
    except ImportError:
        pass
    else:
        load_dotenv(ENV_FILE)

    if os.environ.get("DRY_RUN") != "1":
        print("[harness] ticket 04 chỉ chạy nhánh DRY_RUN=1 — đặt DRY_RUN=1 rồi chạy lại", file=sys.stderr)
        return 2

    inbox_path = os.environ.get("TIZIA_INBOX_PATH") or (ROOT / "ai-board" / "inbox.json")
    db_path = os.environ.get("TIZIA_DB_PATH") or (ROOT / "data" / "tizia.db")
    deps = Deps.real()

    items = [it for it in load_inbox(inbox_path) if it.get("status") != "done"]
    if not items:
        print(f"[harness] hộp thư trống: {inbox_path}")
        return 0

    for item in items:
        out = run_once(item, db_path=db_path, deps=deps)
        print(f"[harness] {out['request_id']} → cổng {out['gate_reached']} ({out['outcome']}) #{out['proposal_id']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
