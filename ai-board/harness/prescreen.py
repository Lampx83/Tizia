"""Pre-screen trước cổng 1 (ticket 17): gom request trùng bằng embedding
(bge-m3) theo domain, rồi chấm ưu tiên 0-100 từ 4 đầu vào đo được để harness
làm hàng đợi giá trị nhất trước. Không phải cổng — không chặn gì, chỉ định
hình cái cổng 1 nhìn thấy. PRESCREEN=0 tắt hẳn, loop chạy y như ticket 04.
"""
from __future__ import annotations

import json
import math
import sqlite3
import time
from datetime import datetime, timedelta, timezone

# cosine ≥ DUP → "cùng một yêu cầu"; RELATED ≤ cos < DUP → liên quan nhưng khác
# (đầu vào `dependencies`). Ngưỡng cho bge-m3; chỉnh khi có gold set (ticket 16).
DUP_THRESHOLD = 0.85
RELATED_THRESHOLD = 0.6
RECENT_DAYS = 7
WEIGHTS = {"urgency": 25, "importance": 25, "dependencies": 25, "cost_benefit": 25}

# Bản mirror của server/contexts/ai-agent/decisions.js để test chạy trên DB tạm.
# ponytail: 2 bản DDL như skill_proposals ở main.py — thêm cột thì sửa cả hai.
AI_DECISIONS_DDL = """
CREATE TABLE IF NOT EXISTS ai_decisions (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  request_id     INTEGER NOT NULL,
  decided_by     TEXT    NOT NULL,
  model          TEXT,
  action         TEXT    NOT NULL,
  status_applied TEXT,
  reason         TEXT,
  public_note    TEXT,
  priority_score INTEGER,
  confidence     REAL,
  input_snapshot TEXT,
  raw_output     TEXT,
  created_at     INTEGER NOT NULL
);
"""


def text_of(item: dict) -> str:
    return f"{item.get('subject') or ''}\n{item.get('body') or ''}".strip()


def cosine(a, b) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    na = math.sqrt(sum(x * x for x in a)) or 1.0
    nb = math.sqrt(sum(y * y for y in b)) or 1.0
    return dot / (na * nb)


def cluster(items: list[dict], vectors: list, threshold: float = DUP_THRESHOLD) -> list[list[int]]:
    """Greedy theo domain: item vào cụm đầu tiên có đại diện cos ≥ threshold.
    Trả list cụm, mỗi cụm là list index vào `items`.
    ponytail: O(n²) theo domain — inbox vài trăm item là đủ; cần hơn thì ANN."""
    clusters: list[list[int]] = []
    for i, it in enumerate(items):
        for c in clusters:
            head = items[c[0]]
            if head.get("domain") == it.get("domain") and cosine(vectors[c[0]], vectors[i]) >= threshold:
                c.append(i)
                break
        else:
            clusters.append([i])
    return clusters


def merge(items: list[dict], idx: list[int]) -> dict:
    """1 cụm → 1 candidate hình dạng request: đại diện = nhiều votes nhất
    (hoà thì cũ nhất), votes gộp, request_ids đủ cả cụm."""
    members = [items[i] for i in idx]
    rep = max(members, key=lambda m: (int(m.get("votes") or 0), -_ts(m.get("created_at"))))
    return {
        **rep,
        "votes": sum(int(m.get("votes") or 0) for m in members),
        "request_ids": [m.get("id") for m in members],
        "members": members,
    }


def _ts(iso: str | None) -> float:
    if not iso:
        return 0.0
    return datetime.fromisoformat(iso.replace("Z", "+00:00")).timestamp()


def history_factor(db_path, cand: dict) -> float:
    """cost/benefit từ skill_proposals: lần thử gần nhất cùng request_ids (ưu
    tiên) hoặc cùng domain. Chưa thử → 0.5; chặn ở cổng 2 (scope) → 0 (không
    làm được); chặn cổng sau → 0.25 (làm được nhưng khó); ok → 1."""
    con = sqlite3.connect(str(db_path))
    try:
        if not con.execute("SELECT name FROM sqlite_master WHERE name='skill_proposals'").fetchone():
            return 0.5
        rows = con.execute(
            "SELECT request_ids, gate_reached, outcome FROM skill_proposals WHERE domain IS ? ORDER BY id DESC",
            (cand.get("domain"),),
        ).fetchall()
    finally:
        con.close()
    if not rows:
        return 0.5
    ids = set(cand["request_ids"])
    same = [r for r in rows if ids & set(json.loads(r[0] or "[]"))]
    _, gate, outcome = (same or rows)[0]
    if outcome == "ok":
        return 1.0
    if outcome and outcome.startswith("blocked_gate_"):
        return 0.0 if float(gate) <= 2 else 0.25
    return 0.5


def score(cand: dict, others: list[dict], vec: list, other_vecs: list, *, db_path, now: datetime) -> tuple[int, dict]:
    """(0..100, 4 đầu vào 0..1)."""
    cutoff = (now - timedelta(days=RECENT_DAYS)).timestamp()
    recent = sum(1 for m in cand["members"] if _ts(m.get("created_at")) >= cutoff)
    related = sum(
        1 for o, ov in zip(others, other_vecs)
        if o.get("domain") == cand.get("domain") and RELATED_THRESHOLD <= cosine(vec, ov) < DUP_THRESHOLD
    )
    inputs = {
        "urgency": min(1.0, recent / 3),
        "importance": min(1.0, int(cand.get("votes") or 0) / 10),
        "dependencies": min(1.0, related / 3),
        "cost_benefit": history_factor(db_path, cand),
    }
    total = round(sum(WEIGHTS[k] * v for k, v in inputs.items()))
    return max(0, min(100, total)), inputs


def record(db_path, cand: dict, model: str | None) -> None:
    """1 dòng ai_decisions (decided_by='rule', action='priority') cho MỖI request trong cụm."""
    now = int(time.time() * 1000)
    con = sqlite3.connect(str(db_path))
    try:
        con.execute(AI_DECISIONS_DDL)
        con.executemany(
            """INSERT INTO ai_decisions
                 (request_id, decided_by, model, action, reason, priority_score, input_snapshot, created_at)
               VALUES (?, 'rule', ?, 'priority', ?, ?, ?, ?)""",
            [
                (m.get("db_id"), model, json.dumps(cand["priority_inputs"]), cand["priority_score"],
                 json.dumps({"request_ids": cand["request_ids"], "representative": cand.get("id")}), now)
                for m in cand["members"] if m.get("db_id") is not None
            ],
        )
        con.commit()
    finally:
        con.close()


def run(items: list[dict], *, models, db_path, now: datetime | None = None) -> list[dict]:
    """items → candidates đã gộp + chấm điểm, sắp giảm dần priority_score."""
    if not items:
        return []
    now = now or datetime.now(timezone.utc)
    vectors = [models.embed(text_of(it))["embedding"] for it in items]
    clusters = cluster(items, vectors)
    cands = [merge(items, idx) for idx in clusters]
    heads = [idx[0] for idx in clusters]
    for k, cand in enumerate(cands):
        others = [c for j, c in enumerate(cands) if j != k]
        other_vecs = [vectors[heads[j]] for j in range(len(cands)) if j != k]
        cand["priority_score"], cand["priority_inputs"] = score(
            cand, others, vectors[heads[k]], other_vecs, db_path=db_path, now=now
        )
        record(db_path, cand, getattr(models, "embed_model", None))
    cands.sort(key=lambda c: -c["priority_score"])
    return cands
