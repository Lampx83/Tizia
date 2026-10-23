"""Đồng hồ AI Board: epoch ms (DB) → hiển thị giờ Việt Nam. Múi giờ đọc từ contract.json."""
import json
import time
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

_CONTRACT = Path(__file__).resolve().parents[2] / "server" / "ai-board" / "contract.json"
TZ = ZoneInfo(json.loads(_CONTRACT.read_text(encoding="utf-8"))["clock"]["tz"])
_source = lambda: int(time.time() * 1000)


def now_ms() -> int:
    """Epoch ms từ nguồn đồng hồ hiện tại."""
    return _source()


def set_source(fn):
    """Thay nguồn đồng hồ (test). Trả về hàm cũ để khôi phục."""
    global _source
    old, _source = _source, fn
    return old


def fmt(ts_ms: int) -> str:
    """Epoch ms → 'YYYY-MM-DD HH:mm:ss +07:00'."""
    d = datetime.fromtimestamp(ts_ms / 1000, TZ)
    off = d.utcoffset().total_seconds()
    sign = "+" if off >= 0 else "-"
    hh, mm = divmod(int(abs(off)) // 60, 60)
    return f"{d:%Y-%m-%d %H:%M:%S} {sign}{hh:02d}:{mm:02d}"
