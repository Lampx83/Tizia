"""Gold-set eval cho cổng 3 với model thật: tỉ lệ đạt, số lần thử, giây GPU, token, số lần nạp model.

Mỗi case = 1 subtask cố định trên file thật ở HEAD + oracle kiểm nội dung file sau khi áp edits.
Chạy cổng 3 trong repo scratch (không Docker, không đụng checkout). Kết quả ghi
ai-board/memory/eval/ (gitignored) để so model nhẹ/nặng theo capability, không chỉ theo budget.

    python eval_gold.py --models qwen2.5-coder:14b,qwen3:8b [--repeat 1] [--cases insert-text,css-color]
"""
from __future__ import annotations

import argparse
import dataclasses
import json
import re
import sys
import tempfile
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import meter  # noqa: E402
from budget import Budget  # noqa: E402
from gates import implement  # noqa: E402
from main import ROOT, Deps  # noqa: E402

PAGE = "public/tinh-nang.html"
CASES = {
    "insert-text": {
        "subtask": {"title": "Thêm câu giới thiệu cuối trang tính năng", "file": PAGE, "size": "small",
                    "verify": "Mở trang thấy dòng 'Tizia được cập nhật liên tục theo góp ý của người học.'"},
        "detail": "Thêm một đoạn ngắn ở cuối nội dung trang: 'Tizia được cập nhật liên tục theo góp ý của người học.'",
        "oracle": lambda html: html.count("Tizia được cập nhật liên tục theo góp ý của người học.") == 1
        and html.index("Tizia được cập nhật liên tục") > html.index("<body>")
        and html.index("Tizia được cập nhật liên tục") < html.index("</body>") and html.rstrip().endswith("</html>"),
    },
    "css-color": {
        "subtask": {"title": "Đổi màu tiêu đề trang tính năng sang xanh dương", "file": PAGE, "size": "small",
                    "verify": "Rule CSS `.top h1` có color #1d4ed8"},
        "detail": "Đổi màu chữ tiêu đề trang (.top h1) thành #1d4ed8. Chỉ sửa CSS trong file này.",
        "oracle": lambda html: bool(re.search(r"\.top h1\s*\{[^}]*color\s*:\s*#1d4ed8", html, re.I))
        and html.count(".top h1") == 1,
    },
    "edit-text": {
        "subtask": {"title": "Đổi tiêu đề trang thành 'Tính năng nổi bật'", "file": PAGE, "size": "small",
                    "verify": "Tiêu đề h1 là '✨ Tính năng nổi bật'"},
        "detail": "Đổi chữ tiêu đề h1 '✨ Tính năng' thành '✨ Tính năng nổi bật'.",
        "oracle": lambda html: html.count("<h1>✨ Tính năng nổi bật</h1>") == 1 and "<h1>✨ Tính năng</h1>" not in html,
    },
    "new-page": {
        "subtask": {"title": "Tạo trang cảm ơn góp ý", "file": "public/cam-on-gop-y.html", "size": "small",
                    "verify": "Mở /cam-on-gop-y.html thấy tiêu đề 'Cảm ơn góp ý' và link về /index.html"},
        "detail": "Tạo trang tĩnh mới cảm ơn học viên đã góp ý, có tiêu đề 'Cảm ơn góp ý' và link về trang chủ.",
        "oracle": lambda html: "Cảm ơn góp ý" in html and "index.html" in html and "<html" in html.lower(),
    },
}


class Collect(meter.Tracer):
    """Tracer không ghi file, giữ record trong bộ nhớ để tổng hợp."""

    def __init__(self):
        super().__init__(None)
        self.records: list[dict] = []
        self.begin(0, self.records.extend)


def run_case(name: str, case: dict, model: str, base: Deps) -> dict:
    tracer = Collect()
    models = dataclasses.replace(base.models, gate3_model=model, gate3_model_light=model)
    deps = dataclasses.replace(base, models=models, trace=tracer)
    scratch = Path(tempfile.mkdtemp(prefix="ai-board-eval-"))
    state = {"plan": {"subtasks": [case["subtask"]]}, "checkout_source": str(ROOT), "request_detail": case["detail"]}
    started = time.monotonic()
    try:
        out = implement.run(state, deps, Budget(max_wall_clock_s=900, max_units=600), repo_dir=scratch)
    except Exception as error:  # noqa: BLE001 — 504/timeout vẫn là 1 kết quả eval
        out = {"blocked": True, "reason": f"{type(error).__name__}: {error}"[:300]}
    tracer.flush()
    written = scratch / case["subtask"]["file"]
    content = written.read_text(encoding="utf-8") if written.exists() else ""
    calls = tracer.records
    total = lambda key: sum((c["metrics"].get(key) or 0) for c in calls)  # noqa: E731
    return {
        "case": name, "model": model, "gate_passed": not out.get("blocked"),
        "oracle": bool(content) and not out.get("blocked") and case["oracle"](content),
        "reason": out.get("reason"), "calls": len(calls),
        "retries": sum(c["result"] == "retry" for c in calls),
        "gpu_s": round(total("gpu_ms") / 1000, 1), "wall_s": round(time.monotonic() - started, 1),
        "tokens_in": total("tokens_in"), "tokens_out": total("tokens_out"),
        "model_loads": sum((c["metrics"].get("load_ms") or 0) > 500 for c in calls),
        "done_reasons": [c["metrics"].get("done_reason") for c in calls],
    }


def main(argv=None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--models", required=True, help="danh sách model cách nhau dấu phẩy")
    parser.add_argument("--cases", default=",".join(CASES))
    parser.add_argument("--repeat", type=int, default=1)
    args = parser.parse_args(argv)
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding="utf-8")
    from main import ENV_FILE
    from dotenv import load_dotenv
    load_dotenv(ENV_FILE)  # như worker; không in giá trị nào
    base = Deps.real()
    rows = []
    for model in args.models.split(","):
        for name in args.cases.split(","):
            for _ in range(args.repeat):
                row = run_case(name, CASES[name], model.strip(), base)
                rows.append(row)
                print(json.dumps(row, ensure_ascii=False), flush=True)
    out_dir = ROOT / "ai-board" / "memory" / "eval"
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / f"gold-{time.strftime('%Y%m%d-%H%M%S')}.json"
    path.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n{'model':22} {'đạt':>5} {'lần gọi':>8} {'GPU s':>7} {'tok in':>7} {'tok out':>8} {'nạp':>4}")
    for model in dict.fromkeys(r["model"] for r in rows):
        mine = [r for r in rows if r["model"] == model]
        print(f"{model:22} {sum(r['oracle'] for r in mine):>2}/{len(mine):<2} {sum(r['calls'] for r in mine):>8} "
              f"{sum(r['gpu_s'] for r in mine):>7.1f} {sum(r['tokens_in'] for r in mine):>7} "
              f"{sum(r['tokens_out'] for r in mine):>8} {sum(r['model_loads'] for r in mine):>4}")
    print(f"→ {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
