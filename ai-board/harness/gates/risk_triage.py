"""Gate 5.5: deterministic risk signals from the real diff and the server's canonical capability catalog."""
from __future__ import annotations

import re

TIERS = ("low", "medium", "high", "critical")
_ROUTE = re.compile(r"\b(?:app|router)\s*\.\s*(?:get|post|put|patch|delete|all|use)\s*\(")
_DOMAIN = re.compile(r"(?:^|/)(?:_ai-generated|domains)/([^/]+)/")
_TEST = re.compile(r"(?:^|/)(?:tests?|__tests__)/|(?:\.|_)(?:test|spec)\.[^/]+$")
# catalog tier -> (privilege rank, risk it adds)
_CATALOG_TIER = {"surface": (0, None), "protected": (1, "high"), "core": (2, "critical")}
_GENERATED_TEST = re.compile(r"^tests?/")  # where gate 3/full checkout force generated tests


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


def _least_privileged(path: str, catalog: dict) -> tuple[str, str] | None:
    """(capability, tier) of the lowest-tier capability allowing path, None if none does."""
    allowed = [(_CATALOG_TIER[c["tier"]][0], name, c["tier"]) for name, c in sorted(catalog.items())
               if any(path.startswith(p) for p in c.get("allow") or [])
               and not any(path == d or path.startswith(d) for d in c.get("deny") or [])]
    return min(allowed)[1:] if allowed else None


def outside_catalog(diffs: list[dict], catalog: dict) -> list[str]:
    """Changed paths no catalog capability allows (generated test dirs exempt)."""
    # Generated tests live under test/ by gate 3/4 rules (guard forbids touching existing ones); no capability owns them.
    paths = {path for path, _, _ in _sections(diffs)}
    return sorted(p for p in paths if not _GENERATED_TEST.match(p) and not _least_privileged(p, catalog))


def run(state: dict) -> dict:
    """Return structured active signals; never waive the later human review gate.
    state['catalog'] (worker path) is authoritative; a path no capability allows blocks as critical."""
    diffs = state.get("full_diff") or state.get("diffs") or []
    catalog = state.get("catalog")
    sections = _sections(diffs)
    paths = {path for path, _, _ in sections}
    domains = sorted({m.group(1) for path in paths if (m := _DOMAIN.search(path))})
    signals = []

    def add(name: str, tier: str, detail: str) -> None:
        signals.append({"name": name, "tier": tier, "detail": detail})

    unmatched = outside_catalog(diffs, catalog) if catalog is not None else []
    for path in sorted(p for p in paths if catalog is not None and not _GENERATED_TEST.match(p)):
        match = _least_privileged(path, catalog)
        if match and _CATALOG_TIER[match[1]][1]:
            add("catalog_tier", _CATALOG_TIER[match[1]][1], f"{path}: {match[0]}")
    if unmatched:
        add("outside_catalog", "critical", ", ".join(unmatched))
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
    if unmatched:
        result.update(blocked=True, failure_class="critical",
                      reason=f"path ngoài catalog capability: {', '.join(unmatched)}"[:1000])
    state["risk_signals"] = signals
    state["risk_level"] = TIERS[tier]
    return result
