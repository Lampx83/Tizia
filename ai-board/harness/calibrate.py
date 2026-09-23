"""Ticket 16 — hiệu chuẩn model nội bộ cho cổng 1-2.

So gemma4:26b (hoặc model khác truyền qua --model) với quyết định Opus lịch sử
(ai_decisions.decided_by='ai', ghi bởi Routine "Ban điều hành AI" ngoài repo —
xem server/contexts/ai-agent/decisions.js). KHÔNG cần Opus sống — chỉ đọc
input_snapshot + action đã ghi sẵn trong DB, chạy input đó qua cổng 1 (plan) +
cổng 2 (scope-check) thật với model ứng viên, rồi so kết luận.

Opus action (approve/reject/defer/priority) không map 1:1 vào blocked/not-blocked
của cổng 1-2 — approve/priority coi là "đi tiếp" (go=True), reject là "chặn"
(go=False), defer không có tín hiệu go/no-go rõ ràng nên bị loại khỏi so sánh
(đếm riêng ở excluded_no_signal, không tính vào agreement_rate).

Chỉ scope phán đoán/plan (cổng 1-2) — KHÔNG đụng cổng 3 (codegen, ticket 11)
và KHÔNG tự chỉnh DUP_THRESHOLD/history_factor của prescreen.py (những chỗ đó
tự ghi chú "chờ gold set ticket 16" — để lại cho vòng sau, không phải đây).

Quyết định gemma có thay Opus mặc định ở cổng 1-2 hay không LÀ JUDGMENT CALL
của người — script này chỉ ra số liệu, không tự kết luận (xem ticket
06-retrofit.../16-model-calibration-gold-set.md mục Comments).
"""
from __future__ import annotations

import argparse
import dataclasses
import json
import os
import sqlite3
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from gates import brainstorm, scope_check  # noqa: E402
from budget import Budget  # noqa: E402
from main import Deps, Unavailable  # noqa: E402
from models import OllamaClient  # noqa: E402
from prescreen import AI_DECISIONS_DDL  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
ENV_FILE = ROOT / ".env"

# approve/priority: Opus cho đi tiếp. reject: Opus chặn. defer: không rõ ràng,
# loại khỏi so sánh — ép defer vào 1 trong 2 phía sẽ bịa tín hiệu không có thật.
ACTION_TO_GO = {"approve": True, "priority": True, "reject": False}


def load_opus_decisions(db_path) -> list[dict]:
    """ai_decisions WHERE decided_by='ai' — quyết định Opus lịch sử, có input_snapshot."""
    con = sqlite3.connect(str(db_path))
    con.row_factory = sqlite3.Row
    try:
        con.execute(AI_DECISIONS_DDL)  # DB test/tạm chưa có bảng — DDL là IF NOT EXISTS, vô hại trên DB thật
        rows = con.execute(
            """SELECT id, request_id, action, reason, priority_score, confidence,
                      input_snapshot, raw_output, created_at
               FROM ai_decisions WHERE decided_by = 'ai' ORDER BY created_at"""
        ).fetchall()
        return [dict(r) for r in rows]
    finally:
        con.close()


def request_from_snapshot(row: dict) -> dict | None:
    """input_snapshot → request dict theo hình dạng gates/brainstorm.py cần (id,
    domain, type, subject, body, thread, votes). Opus Routine đọc cùng nguồn
    /api/ai-board/inbox (subject/body/thread, xem README) nên format khớp phần
    lớn — tolerant thêm title/detail phòng khi snapshot ghi khác tên field
    (snapshot do process NGOÀI repo tạo, không có hợp đồng schema cứng)."""
    raw = row.get("input_snapshot")
    if not raw:
        return None
    try:
        snap = json.loads(raw)
    except (TypeError, ValueError):
        return None
    if not isinstance(snap, dict):
        return None
    return {
        "id": snap.get("id") or f"req-{row['request_id']}",
        "domain": snap.get("domain"),
        "type": snap.get("type"),
        "votes": snap.get("votes", 0),
        "subject": snap.get("subject") or snap.get("title") or "",
        "body": snap.get("body") or snap.get("detail") or "",
        "thread": snap.get("thread") or [],
    }


def gates_1_2_go(request: dict, deps, budget) -> tuple[bool, str]:
    """Chạy cổng 1 (plan) + cổng 2 (scope-check) thật. Trả (go, lý do) — go=False
    nếu 1 trong 2 cổng block."""
    out1 = brainstorm.run(request, deps, budget)
    if out1["blocked"]:
        return False, f"gate1: {out1['reason']}"
    out2 = scope_check.run({"plan": out1["plan"]})
    if out2["blocked"]:
        return False, f"gate2: {out2['reason']}"
    return True, "ok"


def categorize(opus_go: bool, candidate_go: bool) -> str:
    if opus_go == candidate_go:
        return "agrees"
    return "gemma_stricter" if not candidate_go else "gemma_looser"


def run(db_path, *, deps) -> dict:
    """Đẩy toàn bộ quyết định Opus lịch sử qua cổng 1-2 với `deps.models`. Trả
    {results, excluded_no_signal} — mỗi results[i] có category agrees/
    gemma_stricter/gemma_looser."""
    rows = load_opus_decisions(db_path)
    results = []
    excluded = 0
    for row in rows:
        opus_go = ACTION_TO_GO.get(row["action"])
        request = request_from_snapshot(row)
        if opus_go is None or request is None:
            excluded += 1
            continue
        budget = Budget.from_env()
        go, reason = gates_1_2_go(request, deps, budget)
        results.append({
            "request_id": row["request_id"],
            "opus_action": row["action"],
            "opus_go": opus_go,
            "candidate_go": go,
            "candidate_reason": reason,
            "category": categorize(opus_go, go),
        })
    return {"results": results, "excluded_no_signal": excluded}


def summarize(run_result: dict) -> dict:
    """agreement_rate + đếm theo loại — KHÔNG chỉ 1 con số pass/fail (acceptance
    criteria ticket 16)."""
    results = run_result["results"]
    n = len(results)
    counts = {"agrees": 0, "gemma_stricter": 0, "gemma_looser": 0}
    for r in results:
        counts[r["category"]] += 1
    return {
        "n_compared": n,
        "n_excluded_no_signal": run_result["excluded_no_signal"],
        "agreement_rate": round(counts["agrees"] / n, 3) if n else None,
        "counts": counts,
    }


def main(argv: list[str] | None = None) -> int:
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")

    try:
        from dotenv import load_dotenv
    except ImportError:
        pass
    else:
        load_dotenv(ENV_FILE)

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--model", default=os.environ.get("CALIBRATION_MODEL", "gemma4:26b"),
                         help="Model ứng viên chạy cổng 1 (mặc định gemma4:26b, hoặc env CALIBRATION_MODEL)")
    parser.add_argument("--db", default=os.environ.get("TIZIA_DB_PATH") or str(ROOT / "data" / "tizia.db"))
    parser.add_argument("--out", default=None, help="Ghi thêm report JSON ra file này (tuỳ chọn)")
    args = parser.parse_args(argv)

    base = OllamaClient.from_env()
    candidate_models = dataclasses.replace(base, gate1_model=args.model)
    deps = Deps(models=candidate_models, git=Unavailable("git"), notify=Unavailable("telegram"))

    run_result = run(args.db, deps=deps)
    report = {"model": args.model, **summarize(run_result), "results": run_result["results"]}

    print(f"[calibrate] model={report['model']} n_compared={report['n_compared']} "
          f"n_excluded_no_signal={report['n_excluded_no_signal']}")
    print(f"[calibrate] agreement_rate={report['agreement_rate']}")
    print(f"[calibrate] counts={report['counts']}")
    for r in run_result["results"]:
        if r["category"] != "agrees":
            print(f"  [{r['category']}] req={r['request_id']} opus={r['opus_action']} "
                  f"→ {r['candidate_reason']}")

    if args.out:
        Path(args.out).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"[calibrate] report → {args.out}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
