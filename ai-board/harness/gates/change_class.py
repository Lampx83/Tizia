"""Deterministic one-way / two-way door classification of a real diff."""
from __future__ import annotations

import re

_TEST = re.compile(r"(?:^|/)(?:tests?|__tests__)/|(?:\.|_)(?:test|spec)\.[^/]+$")
_ROUTE = re.compile(r"\b(?:app|router|route)\s*\.\s*(?:get|post|put|patch|delete|all|use)\s*\(")
_MIGRATION = re.compile(r"(?:^|/)migrations?/|(?:^|/)[^/]*migration[^/]*\.sql$")
_AUTH = re.compile(r"(?:^|/)(?:auth|identity|session|login|password|oauth|csrf)(?:[-_.][^/]*)?(?:/|$)", re.I)
_PAYMENT = re.compile(r"(?:^|/)(?:payments?|billing)(?:[-_.][^/]*)?(?:/|$)", re.I)
_SCHEMA_FILE = re.compile(r"(?:^|/)(?:contract|openapi|swagger|schema)[^/]*\.(?:json|ya?ml)$", re.I)
_SERVER = ("server/", "api/")


def _files(diffs: list[dict]):
    """(path, deleted, added lines) per file section."""
    for item in diffs:
        text = item.get("diff", "")
        if not text.startswith("diff --git "):
            text = f"diff --git a/{item.get('file', '')} b/{item.get('file', '')}\n{text}"
        path, deleted, added = None, False, []
        for line in text.splitlines():
            if line.startswith("diff --git "):
                if path is not None:
                    yield path, deleted, added
                path, deleted, added = line.split(" b/", 1)[-1], False, []
            elif line.startswith("deleted file mode "):
                deleted = True
            elif line.startswith("+") and not line.startswith("+++"):
                added.append(line[1:])
        if path is not None:
            yield path, deleted, added


def classify(diffs: list[dict]) -> dict:
    """{'class': 'one_way'|'two_way', 'reasons': [{'kind','path'}]}; test files never classify."""
    reasons = []
    for path, deleted, added in _files(diffs):
        path = path.replace("\\", "/")
        if _TEST.search(path):
            continue
        if deleted:
            reasons.append({"kind": "file_deletion", "path": path})
        if _MIGRATION.search(path):
            reasons.append({"kind": "migration", "path": path})
        if _AUTH.search(path):
            reasons.append({"kind": "auth", "path": path})
        if _PAYMENT.search(path):
            reasons.append({"kind": "payment", "path": path})
        if _SCHEMA_FILE.search(path) or path.startswith(_SERVER) and any(_ROUTE.search(line) for line in added):
            reasons.append({"kind": "api_schema", "path": path})
    return {"class": "one_way" if reasons else "two_way", "reasons": reasons}
