"""Lớp 3 (nhãn mềm) của git tier: giám khảo có tham chiếu so candidate với gold diff theo rubric đóng băng.

Model chấm được GHIM (JUDGE_MODEL, đổi = đổi chuẩn: kết quả cũ không so được) và phải KHÁC họ với model sinh code; model nhận qua
deps.models.generate nên test bơm model giả. Mỗi kết quả ghi kèm model + rubric_sha. Kết quả mềm báo RIÊNG, nhãn "soft": ship rate
chính thức chỉ dùng lớp 1 + oracle sản xuất. Lượt giám khảo và lớp 1 bất đồng được liệt kê ở disagreements.txt cho người dùng lướt.
"""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

JUDGE_MODEL = "gemma4:26b"  # họ gemma; model sinh mặc định (qwen2.5-coder) khác họ
VERDICTS = ("equivalent", "partial", "different")
RUBRIC = """You grade one code change against a reference. You get the learner's request, the GOLD diff (what the original commit did) and the CANDIDATE diff (what an AI produced from the same starting files).
Judge only whether the candidate delivers the same behaviour or visible change that the gold delivers for this request. Ignore formatting, naming, comments and added tests. Do not trust the candidate because it looks plausible: compare it with the gold, change by change.
- equivalent: the candidate makes every change the gold makes (same visible text, style or behaviour), possibly written differently, and nothing in it breaks the page or other code.
- partial: it makes only some of the gold's changes, or has the right idea with a defect, or adds a harmful unrequested change.
- different: unrelated, empty, wrong text or behaviour, or it breaks the code.
Reply with JSON only: {"verdict": "equivalent" | "partial" | "different", "reason": "<one short sentence>"}"""
RUBRIC_SHA = hashlib.sha256(RUBRIC.encode("utf-8")).hexdigest()[:12]
LABEL = "soft: giám khảo có tham chiếu, KHÔNG vào ship rate chính thức"


def family(model: str) -> str:
    """Họ model từ tên (qwen2.5-coder:14b → qwen, gemma4:26b → gemma)."""
    return re.match(r"[a-z]*", model.lower())[0]


def prompt(case: dict, row: dict) -> str:
    return (f"{RUBRIC}\n\nLEARNER REQUEST:\n{case['detail']}\n\nGOLD DIFF:\n{case['gold_diff']}\n\nCANDIDATE DIFF:\n{row['diff']}\n")


def judge_one(deps, model: str, case: dict, row: dict) -> dict:
    try:
        body = deps.models.generate(model, prompt(case, row), format="json", temperature=0, num_predict=300)
        out = json.loads(body.get("response", ""))
        verdict = out.get("verdict") if isinstance(out, dict) else None
        return {"verdict": verdict if verdict in VERDICTS else "invalid", "reason": str(out.get("reason", ""))[:300] if isinstance(out, dict) else ""}
    except Exception as error:  # noqa: BLE001 — lỗi gateway/JSON vẫn là 1 kết quả, không dừng cả run
        return {"verdict": "error", "reason": f"{type(error).__name__}: {error}"[:300]}


def judge_all(deps, model: str, cases: list[dict], rows: list[dict], path: Path) -> dict:
    """{(case, lần lặp): kết quả} cho mọi lượt có candidate; resume theo judge.jsonl. ValueError nếu file ghi bằng model/rubric khác."""
    done = {}
    for line in path.read_text(encoding="utf-8").splitlines() if path.exists() else []:
        item = json.loads(line)
        if (item["judge_model"], item["rubric_sha"]) != (model, RUBRIC_SHA):
            raise ValueError(f"{path} ghi bằng giám khảo {item['judge_model']}/{item['rubric_sha']}, khác {model}/{RUBRIC_SHA}")
        done[(item["case"], item["repeat"])] = item
    by_id = {c["id"]: c for c in cases}
    with path.open("a", encoding="utf-8") as out:
        for row in rows:
            key = (row["case"], row["repeat"])
            if key in done or not row.get("diff") or not row["gate_passed"]:
                continue
            done[key] = {"case": row["case"], "repeat": row["repeat"], "judge_model": model, "rubric_sha": RUBRIC_SHA,
                         **judge_one(deps, model, by_id[row["case"]], row)}
            out.write(json.dumps(done[key], ensure_ascii=False) + "\n")
            out.flush()
    return done


def summarize(model: str, cases: list[dict], rows: list[dict], judged: dict, wilson) -> dict:
    """Báo cáo mềm: tỉ lệ equivalent + Wilson, phân bố phán quyết, và các lượt bất đồng với lớp 1 (oracle của row)."""
    mine = [(r, judged[(r["case"], r["repeat"])]) for r in rows if (r["case"], r["repeat"]) in judged]
    k = sum(j["verdict"] == "equivalent" for _, j in mine)
    lo, hi = wilson(k, len(mine)) if mine else (None, None)
    by_id = {c["id"]: c for c in cases}
    disagree = [{"case": r["case"], "repeat": r["repeat"], "commit": by_id[r["case"]]["gold_sha"][:9], "subject": by_id[r["case"]]["subject"],
                 "layer1": r["oracle"], "judge": j["verdict"], "reason": j["reason"]}
                for r, j in mine if r["oracle"] != (j["verdict"] == "equivalent")]
    return {"label": LABEL, "judge_model": model, "rubric_sha": RUBRIC_SHA, "judged": len(mine), "not_judged": len(rows) - len(mine),
            "equivalent": k, "rate": round(100 * k / len(mine), 1) if mine else None, "lo": lo, "hi": hi,
            "verdicts": {v: sum(j["verdict"] == v for _, j in mine) for v in (*VERDICTS, "invalid", "error")}, "disagreements": disagree}


def lines(soft: dict) -> list[str]:
    out = [f"giám khảo mềm ({soft['label']}): model {soft['judge_model']}, rubric {soft['rubric_sha']}: equivalent {soft['equivalent']}/{soft['judged']}"
           + (f" = {soft['rate']}% (Wilson 95%: {soft['lo']}-{soft['hi']}%)" if soft["judged"] else "")
           + "; " + ", ".join(f"{k}={v}" for k, v in soft["verdicts"].items() if v)
           + f"; chưa chấm {soft['not_judged']} lượt (cổng 3 chặn, không có candidate)",
           f"bất đồng giữa lớp 1 và giám khảo: {len(soft['disagreements'])} lượt (xem disagreements.txt)"]
    return out


def write_disagreements(soft: dict, path: Path) -> None:
    """Danh sách để người dùng lướt: mỗi dòng 1 lượt, kèm commit gốc để mở gold diff."""
    rows = [f"{d['case']} lượt {d['repeat']} | commit {d['commit']} {d['subject']} | lớp 1 {'ĐẠT' if d['layer1'] else 'RỚT'} nhưng giám khảo {d['judge']}: {d['reason']}"
            for d in soft["disagreements"]]
    path.write_text("\n".join(rows) + ("\n" if rows else ""), encoding="utf-8")
