"""codegraph.py (ticket 21) — nối `graphify query` vào cổng 1/3 để thu hẹp
phạm vi đọc TRƯỚC khi đọc file thật, giảm số file model phải đọc hết khi
`num_ctx` giới hạn 16384 (spec.md mục 23). KHÔNG BAO GIỜ là nguồn sự thật —
đúng ràng buộc ticket 18 đã ghi ngay trong chính ticket đó: "một gate hỏi
graph vẫn phải tự đọc file thật trước khi kết luận bất cứ điều gì". Không
MCP, không protocol mới — subprocess gọi thẳng CLI `graphify` (per-machine
personal install, KHÔNG phải dependency của repo — xem ticket 18 Comments,
"graphify-out/ added to .gitignore as a regenerable build artifact").

`query()` không bao giờ raise và không bao giờ chặn cổng 1/3 chạy: thiếu
binary `graphify`, thiếu `graphify-out/graph.json`, lỗi subprocess, hay
timeout — mọi trường hợp đều trả `[]` êm re (fallback = hành vi hôm nay,
không có gợi ý graph).
"""
from __future__ import annotations

import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
GRAPH_JSON = ROOT / "graphify-out" / "graph.json"

_NODE_SRC = re.compile(r"^NODE .*?\[src=([^\s\]]+)")


def available() -> bool:
    """graphify-out/graph.json phải tồn tại — không tự ý chạy `graphify
    update` (build tốn CPU, không phải việc của 1 lời gọi query)."""
    return GRAPH_JSON.exists()


def query(question: str, *, budget: int = 500, timeout_s: float = 15.0) -> list[str]:
    """Trả list đường dẫn candidate theo thứ tự BFS trả về (có thể rỗng).
    KHÔNG BAO GIỜ raise ra ngoài — mọi lỗi (binary thiếu, timeout, output lạ)
    đều trả [] thay vì làm sập cổng đang gọi nó."""
    if not available():
        return []
    try:
        result = subprocess.run(
            ["graphify", "query", question, "--budget", str(budget), "--graph", str(GRAPH_JSON)],
            capture_output=True, text=True, timeout=timeout_s, stdin=subprocess.DEVNULL,
        )
    except (OSError, subprocess.TimeoutExpired):
        return []
    if result.returncode != 0:
        return []
    seen: list[str] = []
    for line in result.stdout.splitlines():
        m = _NODE_SRC.match(line)
        if m and m.group(1) not in seen:
            seen.append(m.group(1))
    return seen
