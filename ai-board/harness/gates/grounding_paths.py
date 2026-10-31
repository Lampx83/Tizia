"""Neo đường dẫn plan vào danh sách file thật + BM25 tất định (stdlib) gợi ý file gần nhất."""
import math
import re
import unicodedata
from collections import Counter

import code_index

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


def bm25_top(query: str, paths, k: int = 3, k1: float = 1.5, b: float = 0.75) -> list[tuple[str, float]]:
    """Top-k (path, score) theo BM25 trên token của đường dẫn; điểm 0 bị loại."""
    docs = {p: _tokens(p) for p in sorted(paths) if p.startswith(_NEAR_ROOTS)}
    if not docs:
        return []
    avg = sum(map(len, docs.values())) / len(docs) or 1
    df = Counter(t for toks in docs.values() for t in set(toks))
    terms = set(_tokens(query))
    scored = []
    for path, toks in docs.items():
        tf = Counter(toks)
        score = sum(math.log(1 + (len(docs) - df[t] + .5) / (df[t] + .5)) * tf[t] * (k1 + 1)
                    / (tf[t] + k1 * (1 - b + b * len(toks) / avg)) for t in terms if t in tf)
        if score > 0 and len(terms & set(toks)) >= 2:
            scored.append((path, round(score, 3)))
    return sorted(scored, key=lambda item: (-item[1], item[0]))[:k]


def referenced_paths(plan: dict) -> list[str]:
    """Đường dẫn file plan nhắc trong title/verify/acceptance (kể cả đối số node --test/pytest)."""
    texts = [plan.get("acceptance") or [], *([t.get("title"), t.get("verify")] for t in plan.get("subtasks") or [])]
    found = []
    for text in (str(x) for group in texts for x in group if x):
        found += _ROOTED.findall(text) + _TEST_ARG.findall(text)
    return list(dict.fromkeys(p.lstrip("./") for p in found))


def ungrounded(plan: dict, files: set[str]) -> list[str]:
    """Đường dẫn plan nhắc nhưng không có trong repo và không do subtask nào tạo/sửa."""
    own = {t["file"] for t in plan.get("subtasks") or []}
    return [p for p in referenced_paths(plan) if p not in files and p not in own]


def named_tests_missing(request: dict, plan: dict, files: set[str]) -> list[str]:
    """File test request nêu tên mà repo không có và không subtask nào tạo."""
    text = " ".join(str(request.get(k) or "") for k in ("subject", "body", "clarified_spec"))
    named = [p.lstrip("./") for p in _ROOTED.findall(text) + _TEST_ARG.findall(text)]
    own = {t["file"] for t in plan.get("subtasks") or []}
    return [p for p in dict.fromkeys(named) if _TESTISH.search(p) and p not in files and p not in own]


def with_named_tests(plan: dict, request: dict, files: set[str]) -> dict:
    """Thêm subtask tạo mỗi file test request nêu tên mà repo và plan chưa có; verify = lệnh node --test của chính file đó."""
    missing = named_tests_missing(request, plan, files)
    if not missing:
        return plan
    count = len(plan["subtasks"])
    extra = [{"title": f"Tạo file test {path}", "file": path, "verify": f"node --test {path}", "size": "small",
              "layer": "wiring", "depends_on": list(range(1, count + 1))} for path in missing]
    return {**plan, "subtasks": [*plan["subtasks"], *extra]}


def check_references(plan: dict, source, sha: str | None, request: dict | None = None) -> None:
    """Raise ValueError (plan sửa được) nếu plan nhắc đường dẫn không có thật hoặc bỏ sót test request nêu."""
    files = listing(source, sha) if sha else set()
    if not files:
        return
    bad = ungrounded(plan, files)
    if bad:
        near = [] if _TESTISH.search(bad[0]) else bm25_top(bad[0], files)
        hint = (f"; file gần nhất: {', '.join(p for p, _ in near)}" if near
                else "; nếu là test mới, thêm subtask tạo file đó")
        raise ValueError(f"đường dẫn '{bad[0]}' không có trong repo và không phải file plan tạo (mỗi đường dẫn nhắc tới "
                         f"phải có thật hoặc do một subtask tạo){hint}")
    missing = named_tests_missing(request or {}, plan, files)
    if missing:
        raise ValueError(f"request nêu file test '{missing[0]}' nhưng không subtask nào tạo nó — thêm subtask tạo file test này")
