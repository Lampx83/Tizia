"""gate_trace (ticket 23) — 1 dòng mỗi lần harness gọi Ollama THẬT ở bất kỳ
cổng nào (1, 2.5, 3, validator). Nguồn thật của schema là server/db.js; DDL ở
đây chỉ để test chạy trên DB tạm, đúng pattern SKILL_PROPOSALS_DDL/
AI_DECISIONS_DDL đã có (main.py/prescreen.py) — 2 bản DDL là giá phải trả cho
2 ngôn ngữ, sửa cột thì sửa cả hai.

Ghi lỗi (DB khoá, hết đĩa) KHÔNG được làm hỏng cổng đang chạy — best-effort,
log lại rồi bỏ qua, không raise ra ngoài (chốt trong acceptance criteria).
"""
from __future__ import annotations

import time

from dbconn import harness_db

DDL = """
CREATE TABLE IF NOT EXISTS gate_trace (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  skill_proposal_id    INTEGER NOT NULL,
  gate                 REAL    NOT NULL,
  model                TEXT,
  prompt               TEXT,
  raw_response         TEXT,
  prompt_eval_count    INTEGER,
  eval_count           INTEGER,
  prompt_eval_duration INTEGER,
  eval_duration        INTEGER,
  created_at           INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_gate_trace_proposal
  ON gate_trace(skill_proposal_id, created_at);
"""


def record(db_path, *, skill_proposal_id: int, gate: float, model: str | None, prompt: str, body: dict) -> None:
    """1 dòng từ response thật của deps.models.generate() (`body` = nguyên
    dict /api/generate trả về — response/prompt_eval_count/eval_count/
    prompt_eval_duration/eval_duration đọc thẳng từ đó, không tính lại)."""
    try:
        with harness_db(db_path, ddl=DDL) as con:
            con.execute(
                """INSERT INTO gate_trace
                     (skill_proposal_id, gate, model, prompt, raw_response,
                      prompt_eval_count, eval_count, prompt_eval_duration, eval_duration, created_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    skill_proposal_id, float(gate), model, prompt, body.get("response"),
                    body.get("prompt_eval_count"), body.get("eval_count"),
                    body.get("prompt_eval_duration"), body.get("eval_duration"),
                    int(time.time() * 1000),
                ),
            )
    except Exception as e:  # best-effort thật — không raise, chỉ báo rồi bỏ qua
        print(f"[gate_trace] ghi lỗi (bỏ qua, không làm hỏng cổng đang chạy): {e}")
