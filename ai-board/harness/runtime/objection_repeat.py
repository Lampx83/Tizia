"""Chữ ký phản đối plan (gate, lớp lý do, tập đường dẫn được trích) và quyết định dừng khi lặp."""
import re

_PATH = re.compile(r"(?<![\w/.-])((?:public|server|test|scripts|ai-board)/[\w./-]*[\w-])")


def signature(stopped: dict) -> tuple:
    """Từ cấu trúc: gate + tiền tố lý do trước ':' + tập đường dẫn nêu trong lý do. Không so văn bản thô."""
    reason = str((stopped.get("result") or {}).get("reason") or "")
    reason_class = reason.split(":", 1)[0].strip()
    return (float(stopped.get("gate") or 0), reason_class, frozenset(_PATH.findall(reason)))


def describe(stopped: dict) -> dict:
    """Chữ ký dạng JSON-safe để ghi vào bằng chứng cho admin."""
    gate, reason_class, paths = signature(stopped)
    return {"gate": gate, "reason_class": reason_class, "paths": sorted(paths)}


def repeated(history: list[dict], threshold: int) -> bool:
    """True khi `threshold` lượt gần nhất có cùng chữ ký (mặc định 2: lượt sau trùng lượt trước → dừng)."""
    if threshold < 2 or len(history) < threshold:
        return False
    recent = [signature(item) for item in history[-threshold:]]
    return all(sig == recent[0] for sig in recent)
