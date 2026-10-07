"""Sơ đồ repo của AI Board — gợi ý file liên quan, dựng tại chỗ ở đúng commit, không dùng công cụ ngoài.

related(): file có chữ hiển thị / tên đường dẫn khớp câu hỏi (IDF, chuẩn hoá theo độ dài file) + 1 bước theo
đồ thị import (file nó import và file import nó), trên code_index.ui_index (public/, RAM, theo commit).
closest(): file thật gần nhất với 1 đường dẫn plan chọn nhưng chưa tồn tại (bắt lỗi gõ, cổng 3).
Chỉ là gợi ý — cổng vẫn phải đọc file thật trước khi kết luận.
"""
from __future__ import annotations

import difflib
import math
import re
from pathlib import Path

from repositories import code_index
from services import file_context

ROOT = Path(__file__).resolve().parents[3]
SEEDS = file_context.WEIGHTS["repomap_seeds"]


def _tokens(text: str) -> set[str]:
    return {w for w in re.split(r"[^a-z0-9]+", file_context.fold(text)) if len(w) >= file_context.WEIGHTS["min_term_len"]}


def related(source, sha: str, question: str, *, limit: int = file_context.WEIGHTS["repomap_limit"]) -> list[str]:
    """File liên quan tới câu hỏi, file khớp nhất trước rồi hàng xóm import của nó. Rỗng khi không khớp gì."""
    commit = code_index.git(source, "rev-parse", "--verify", f"{sha}^{{commit}}").decode().strip()
    index = code_index.ui_index(source, commit)
    files, total = index["files"], max(len(index["files"]), 1)
    terms = _tokens(question)
    score = dict.fromkeys(files, 0.0)
    for term in terms:
        holders = index["words"].get(term, set())
        if holders and len(holders) <= total * file_context.WEIGHTS["common_word_share"]:  # từ quá phổ biến không phân biệt được file
            for path in holders:
                score[path] += math.log(total / len(holders))
        for path in files:
            if term in _tokens(path):  # tên file/thư mục khớp: tín hiệu mạnh hơn 1 từ trong nội dung
                score[path] += math.log(total)
    size = {p: len({w for _, t in files[p]["text"] for w in t.split()}) or 1 for p in files}
    ranked = sorted((p for p in files if score[p] > 0), key=lambda p: -score[p] / math.sqrt(size[p]))
    out: list[str] = []
    for seed in ranked[:SEEDS]:
        out += [seed, *files[seed]["imports"], *(p for p, e in files.items() if seed in e["imports"])]
    return list(dict.fromkeys(out))[:limit]


def closest(path: str, root: Path = ROOT) -> str | None:
    """File thật có đường dẫn gần nhất (difflib ≥ 0.8); None khi không có gì đủ gần (file mới thật)."""
    try:
        listing = code_index.git(root, "ls-files").decode("utf-8", "replace").splitlines()
    except OSError:
        listing = []
    if not listing:  # không phải repo git (hoặc thư mục con không có file tracked)
        listing = [p.relative_to(root).as_posix() for p in Path(root).rglob("*") if p.is_file() and ".git" not in p.parts]
    found = difflib.get_close_matches(path, listing, n=1, cutoff=0.8)
    return found[0] if found else None
