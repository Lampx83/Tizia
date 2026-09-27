"""Bộ đo theo nhóm (feature-folders ticket 12): loại (ui | logic | feature) × trường (it | pharmacy) ×
cách mô tả (named: có tên riêng/ngoặc | plain: lời thường). Chỉ số tất định chạy trong CI: cổng 1 có nhắm
đúng file không (targets, hoặc trang mẫu với loại feature). Quy tắc nhận thay đổi: không nhóm nào tụt quá
MAX_DROP điểm so với mốc eval/strata-baseline.json (tests/test_eval_strata.py).

    python eval_strata.py                 # in bảng theo nhóm
    python eval_strata.py --write-baseline  # ghi mốc mới (chỉ khi thay đổi đã được chấp nhận)
    python eval_strata.py --live          # thêm cổng 1→2.5 với model thật: đạt/chặn, GPU-s, độ dài tầng
"""
from __future__ import annotations

import argparse
import json
import sys
import time
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import context  # noqa: E402

REPO = Path(__file__).resolve().parents[2]
BASELINE = Path(__file__).resolve().parent / "eval" / "strata-baseline.json"
MAX_DROP = 10.0  # điểm %: 1 nhóm tụt hơn mức này so với mốc thì thay đổi không được nhận

IT_PAGE = "[Trang: 💻 Trường Công nghệ thông tin] /school.html?domain=it"
# Mỗi ô 1 kịch bản; expect = file nào cũng được tính là nhắm đúng (file thật ở HEAD).
SCENARIOS = [
    {"id": "it-ui-named", "type": "ui", "school": "it", "style": "named",
     "subject": "Thẻ IT Game Master che mất nút trên điện thoại",
     "body": f"{IT_PAGE}\nThẻ thành tựu IT Game Master hiện ra đè lên nút con cú, không bấm được",
     "expect": ["public/js/engine/path-renderer.js"]},
    {"id": "it-ui-plain", "type": "ui", "school": "it", "style": "plain",
     "subject": "nút quay lại khuôn viên trường nhỏ quá",
     "body": "[Trang: Sân chơi web] /it-web-playground.html\nnút quay lại khuôn viên trường ở góc trên nhỏ quá khó bấm",
     "expect": ["public/it-web-playground.html"]},
    {"id": "it-logic-named", "type": "logic", "school": "it", "style": "named",
     "subject": "Bảng Nhiệm vụ hôm nay không cập nhật số việc đã xong",
     "body": f"{IT_PAGE}\nlàm xong việc rồi mà ô Nhiệm vụ hôm nay vẫn hiện 0",
     "expect": ["public/js/engine/path-renderer.js", "public/js/engagement-hud.js"]},
    {"id": "it-logic-plain", "type": "logic", "school": "it", "style": "plain",
     "subject": "bấm bắt đầu học mà không có gì xảy ra",
     "body": f"{IT_PAGE}\nlần đầu vào trang bấm bắt đầu học không chuyển sang bước tiếp",
     "expect": ["public/js/onboarding-60s.js"]},
    {"id": "it-feature-named", "type": "feature", "school": "it", "style": "named",
     "subject": "Trò đoán từ khoá lập trình", "body": f"{IT_PAGE}\nôn từ khoá khi học lập trình, giống trò giải mật mã CTF",
     "expect": ["public/it-cipher-ctf.html", "public/it-web-playground.html", "public/it-code-lab.html"]},
    {"id": "it-feature-plain", "type": "feature", "school": "it", "style": "plain",
     "subject": "trò chơi ôn từ khoá lập trình cho lớp", "body": f"{IT_PAGE}\ncả lớp thi đoán từ khoá lập trình cho vui",
     "expect": ["public/it-cipher-ctf.html", "public/it-web-playground.html", "public/it-code-lab.html"]},
    {"id": "ph-ui-named", "type": "ui", "school": "pharmacy", "style": "named",
     "subject": "Nút \"Bắt đầu pha chế\" bị che trên điện thoại",
     "body": "[Trang: Phòng pha chế] /compounding-lab.html\nnút Bắt đầu pha chế bị che mất một nửa",
     "expect": ["public/compounding-lab.html"]},
    {"id": "ph-ui-plain", "type": "ui", "school": "pharmacy", "style": "plain",
     "subject": "chữ ở ô đơn thuốc hiện tại mờ quá",
     "body": "[Trang: Ca lâm sàng SOAP] /duoc-soap.html\nchữ trong khung đơn thuốc hiện tại mờ, khó đọc",
     "expect": ["public/duoc-soap.html"]},
    {"id": "ph-logic-named", "type": "logic", "school": "pharmacy", "style": "named",
     "subject": "Nút Chọn bài pha chế không mở danh sách",
     "body": "[Trang: Phòng pha chế] /compounding-lab.html\nbấm Chọn bài pha chế thì không hiện danh sách bài",
     "expect": ["public/compounding-lab.html"]},
    {"id": "ph-logic-plain", "type": "logic", "school": "pharmacy", "style": "plain",
     "subject": "chọn đơn pha chế xong không vào được bài",
     "body": "[Trang: Bào chế] /bao-che-hub.html\nchọn một đơn pha chế rồi mà không vào được bài",
     "expect": ["public/bao-che-hub.html"]},
    {"id": "ph-feature-named", "type": "feature", "school": "pharmacy", "style": "named",
     "subject": "Thẻ ghi nhớ tên hoạt chất", "body": "lật thẻ để học tên hoạt chất, giống Flashcards SRS",
     "expect": ["public/srs.html", "public/hoc-thong-minh.html"]},
    {"id": "ph-feature-plain", "type": "feature", "school": "pharmacy", "style": "plain",
     "subject": "trò chơi luyện cân thuốc", "body": "cho sinh viên dược luyện cân hoạt chất trước khi pha chế",
     "expect": ["public/compounding-lab.html", "public/bao-che-hub.html", "public/dispense.html"]},
]
STRATA = ("type", "school", "style")


def _exemplars(ctx: dict) -> list[str]:
    for line in ctx["text"].splitlines():
        if line.startswith("trang mẫu gần nhất"):
            return [p.strip() for p in line.split(":", 1)[1].split(",")]
    return []


def score(scenario: dict, source=REPO, sha: str = "HEAD") -> dict:
    """Cổng 1 tất định (không model): nhắm đúng file = targets hoặc trang mẫu chứa 1 file trong expect."""
    ctx = context.build_context(1, {"subject": scenario["subject"], "body": scenario["body"],
                                    "type": "feature" if scenario["type"] == "feature" else "other",
                                    "domain": scenario["school"]}, None, source, sha, memory_path=Path("nope.jsonl"))
    picked = [*ctx["targets"], *_exemplars(ctx)]
    return {"id": scenario["id"], "hit": any(f in picked for f in scenario["expect"]), "picked": picked[:4],
            "skill": ctx["skill"], "tiers": ctx.get("tiers")}


def by_stratum(results: list[dict]) -> dict[str, float]:
    """{"type=ui": %đúng, …} cho mỗi giá trị của mỗi trục."""
    buckets: dict[str, list[bool]] = defaultdict(list)
    index = {s["id"]: s for s in SCENARIOS}
    for r in results:
        for axis in STRATA:
            buckets[f"{axis}={index[r['id']][axis]}"].append(r["hit"])
    return {k: round(100 * sum(v) / len(v), 1) for k, v in sorted(buckets.items())}


def regressions(current: dict[str, float], baseline: dict[str, float], max_drop: float = MAX_DROP) -> list[str]:
    """Nhóm tụt quá max_drop điểm so với mốc (nhóm mới không có mốc thì bỏ qua)."""
    return [f"{k}: {baseline[k]} → {v}" for k, v in current.items() if k in baseline and baseline[k] - v > max_drop]


def _live(scenario: dict) -> dict:
    """Cổng 1→2.5 với model thật (cần env model): chặn/đạt, GPU-s. Không chạy trong CI."""
    from worker import HarnessPlanner, PlanBlockedError
    planner = HarnessPlanner(source=REPO)
    snapshot = {"request": {"id": 0, "title": scenario["subject"], "detail": scenario["body"], "domain": scenario["school"],
                            "type": "feature" if scenario["type"] == "feature" else "other"}, "ticket": {}}
    started = time.monotonic()
    try:
        plan, units = planner(snapshot)
        return {"planned": True, "units": units, "files": [s["allowed_scope"][0] for s in plan["steps"]],
                "wall_s": round(time.monotonic() - started, 1)}
    except PlanBlockedError as error:
        return {"planned": False, "reason": error.detail.get("reason"), "wall_s": round(time.monotonic() - started, 1)}


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--write-baseline", action="store_true")
    parser.add_argument("--live", action="store_true")
    args = parser.parse_args(argv)
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")
    results = [score(s) for s in SCENARIOS]
    for r in results:
        print(f"{'✓' if r['hit'] else '✗'} {r['id']:<18} {r['skill']:<16} {', '.join(r['picked'])}")
    strata = by_stratum(results)
    print(json.dumps(strata, ensure_ascii=False, indent=1))
    if args.live:
        from dotenv import load_dotenv
        from main import ENV_FILE
        load_dotenv(ENV_FILE)
        live = {s["id"]: _live(s) for s in SCENARIOS}
        out = REPO / "ai-board" / "memory" / "eval" / f"strata-{time.strftime('%Y%m%d-%H%M%S')}.json"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps({"strata": strata, "results": results, "live": live}, ensure_ascii=False, indent=1),
                       encoding="utf-8")
        print(f"live → {out}")
    if args.write_baseline:
        BASELINE.parent.mkdir(parents=True, exist_ok=True)
        BASELINE.write_text(json.dumps(strata, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(f"baseline → {BASELINE}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
