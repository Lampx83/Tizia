"""Neo đường dẫn plan vào danh sách file thật + BM25 tất định (stdlib) gợi ý file gần nhất."""
import json
import math
import re
import unicodedata
from collections import Counter
from pathlib import Path

import code_index

CONFIG = json.loads((Path(__file__).resolve().parents[3] / "server" / "ai-board" / "contract.json").read_text(encoding="utf-8"))["limits"]["retrieval"]

_EXT = r"(?:html?|m?js|css|json|sql|py|md)"
_ROOTED = re.compile(rf"(?<![\w./-])((?:public|server|test|tests|scripts|ai-board)/[\w./-]+\.{_EXT})(?![\w-])")
_TEST_ARG = re.compile(rf"(?:node --test|pytest|python[0-9.]*)\s+((?:[\w.-]+/)*[\w.-]+\.{_EXT})(?![\w-])")
_TOKEN = re.compile(r"[a-z0-9]{2,}")
_GENERIC = {"test", "tests", "js", "mjs", "html", "htm", "css", "json", "sql", "py", "md", "public", "server", "contexts"}
_NEAR_ROOTS = ("public/", "server/contexts/", "test/")
_TESTISH = re.compile(r"(?:^|/)tests?/|\.test\.m?js$|(?:^|/)test_[\w-]+\.py$")


def listing(source, sha: str) -> set[str]:
    """Mọi file ở `sha`; rỗng nếu git lỗi."""
    try:
        raw = code_index.git(source, "ls-tree", "-r", "--name-only", "-z", sha).decode("utf-8", "replace")
    except OSError:
        return set()
    return {p for p in raw.split("\0") if p}


def _tokens(text: str) -> list[str]:
    folded = "".join(c for c in unicodedata.normalize("NFD", text.lower()) if unicodedata.category(c) != "Mn")
    return [t for t in _TOKEN.findall(folded.replace("đ", "d")) if t not in _GENERIC]


def _bm25(terms: set[str], docs: dict[str, list[str]], k1: float, b: float) -> dict[str, float]:
    """Điểm BM25 của từng tài liệu đã tách token; chỉ giữ điểm dương."""
    if not docs:
        return {}
    avg = sum(map(len, docs.values())) / len(docs) or 1
    df = Counter(t for toks in docs.values() for t in set(toks))
    scores = {}
    for path, toks in docs.items():
        tf = Counter(toks)
        score = sum(math.log(1 + (len(docs) - df[t] + .5) / (df[t] + .5)) * tf[t] * (k1 + 1)
                    / (tf[t] + k1 * (1 - b + b * len(toks) / avg)) for t in terms if t in tf)
        if score > 0:
            scores[path] = score
    return scores


def bm25_top(query: str, paths, k: int | None = None, k1: float | None = None, b: float | None = None) -> list[tuple[str, float]]:
    """Top-k (path, score) theo BM25 trên token của đường dẫn; tham số mặc định từ contract.json retrieval.bm25."""
    cfg = CONFIG["bm25"]
    docs = {p: _tokens(p) for p in sorted(paths) if p.startswith(_NEAR_ROOTS)}
    terms = set(_tokens(query))
    scores = _bm25(terms, docs, k1 or cfg["k1"], b or cfg["b"])
    scored = [(p, round(s, 3)) for p, s in scores.items() if len(terms & set(docs[p])) >= cfg["min_shared_terms"]]
    return sorted(scored, key=lambda item: (-item[1], item[0]))[:k or cfg["top"]]


def similar_basis(claim: str, evidence_files, files: dict) -> bool:
    """Khẳng định 'đã có chức năng tương tự' có căn cứ: BM25 trên nội dung REPO DATA xếp một file dẫn chứng đã xác minh trong top, đạt ngưỡng."""
    cfg = CONFIG["similar_exists"]
    docs = {p: _tokens(text) for p, text in files.items()}
    scores = _bm25(set(_tokens(claim)), docs, CONFIG["bm25"]["k1"], CONFIG["bm25"]["b"])
    top = sorted(scores.items(), key=lambda item: (-item[1], item[0]))[:cfg["top"]]
    return any(path in set(evidence_files) and score >= cfg["min_score"] for path, score in top)


def referenced_paths(plan: dict) -> list[str]:
    """Đường dẫn file plan nhắc trong title/verify/acceptance (kể cả đối số node --test/pytest)."""
    texts = [plan.get("acceptance") or [], *([t.get("title"), t.get("verify")] for t in plan.get("subtasks") or [])]
    found = []
    for text in (str(x) for group in texts for x in group if x):
        found += _ROOTED.findall(text) + _TEST_ARG.findall(text)
    return list(dict.fromkeys(p.lstrip("./") for p in found))


def ungrounded(plan: dict, files: set[str], request: dict | None = None) -> list[str]:
    """Đường dẫn plan nhắc nhưng không có trong repo, không do subtask nào tạo/sửa, và không phải test request nêu."""
    own = {t["file"] for t in plan.get("subtasks") or []} | named_tests(request or {})
    return [p for p in referenced_paths(plan) if p not in files and p not in own]


def named_tests(request: dict) -> set[str]:
    """File test request nêu tên: đích test mới hợp lệ (gate 5 chạy/sinh), không phải scope của step."""
    text = " ".join(str(request.get(k) or "") for k in ("subject", "body", "clarified_spec"))
    return {p.lstrip("./") for p in _ROOTED.findall(text) + _TEST_ARG.findall(text) if _TESTISH.search(p)}


def check_references(plan: dict, source, sha: str | None, request: dict | None = None) -> None:
    """Raise ValueError (plan sửa được) nếu plan nhắc đường dẫn không có thật."""
    files = listing(source, sha) if sha else set()
    if not files:
        return
    bad = ungrounded(plan, files, request)
    if bad:
        near = [] if _TESTISH.search(bad[0]) else bm25_top(bad[0], files)
        hint = (f"; file gần nhất: {', '.join(p for p, _ in near)}" if near
                else "; chỉ dùng file có thật hoặc test request đã nêu")
        raise ValueError(f"đường dẫn '{bad[0]}' không có trong repo và không phải file plan tạo (mỗi đường dẫn nhắc tới "
                         f"phải có thật hoặc do một subtask tạo){hint}")
