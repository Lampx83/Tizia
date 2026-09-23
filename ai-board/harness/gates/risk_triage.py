"""Gate 5.5: deterministic risk signals from a plan, a real diff, and a parsed manifest."""
from __future__ import annotations

import re

TIERS = ("low", "medium", "high", "critical")
_ROUTE = re.compile(r"\b(?:app|router)\s*\.\s*(?:get|post|put|patch|delete|all|use)\s*\(")
_DOMAIN = re.compile(r"(?:^|/)(?:_ai-generated|domains)/([^/]+)/")
_TEST = re.compile(r"(?:^|/)(?:tests?|__tests__)/|(?:\.|_)(?:test|spec)\.[^/]+$")


def _sections(diffs: list[dict]) -> list[tuple[str, bool, list[str]]]:
    """(path, existing, added lines) from git's unified diff sections."""
    sections = []
    for item in diffs:
        path = item.get("file", "").replace("\\", "/")
        header = None
        lines: list[str] = []
        existing = True
        for line in item.get("diff", "").splitlines():
            if line.startswith("diff --git "):
                if header is not None:
                    sections.append((header, existing, lines))
                header = line.split(" b/", 1)[-1]
                lines = []
                existing = True
            elif line.startswith("new file mode ") or line == "--- /dev/null":
                existing = False
            elif line.startswith("+") and not line.startswith("+++"):
                lines.append(line[1:])
        sections.append((header or path, existing, lines))
    return sections


def run(state: dict, *, manifest: dict | None = None) -> dict:
    """Return structured active signals; never waive the later human review gate."""
    diffs = state.get("full_diff") or state.get("diffs") or []
    manifest = manifest if manifest is not None else state.get("manifest") or {}
    sections = _sections(diffs)
    paths = {path for path, _, _ in sections}
    touched_core = sorted(set((manifest.get("capabilities") or {}).get("core") or []))
    domains = sorted({m.group(1) for path in paths if (m := _DOMAIN.search(path))})
    signals = []

    def add(name: str, tier: str, detail: str) -> None:
        signals.append({"name": name, "tier": tier, "detail": detail})

    if touched_core:
        add("core", "critical", ", ".join(touched_core))
    if any(_ROUTE.search(line) for _, _, lines in sections for line in lines):
        add("new_route_or_middleware", "high", "diff thêm đăng ký route/middleware")
    if len(domains) >= 2:
        add("multiple_domains", "high", ", ".join(domains))
    if any(existing for _, existing, _ in sections):
        add("existing_file", "medium", "diff sửa file đã tồn tại")
    if not any(_TEST.search(path) for path in paths):
        add("missing_test", "bump", "diff không kèm file test")

    tier = max((TIERS.index(s["tier"]) for s in signals if s["tier"] in TIERS), default=0)
    if any(s["name"] == "missing_test" for s in signals):
        tier = min(tier + 1, len(TIERS) - 1)
    result = {"gate": 5.5, "blocked": False, "reason": None,
              "risk_level": TIERS[tier], "risk_signals": signals, "domains": domains}
    state["risk_signals"] = signals
    state["risk_level"] = TIERS[tier]
    return result
