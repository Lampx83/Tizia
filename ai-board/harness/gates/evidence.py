"""Claim + evidence format shared by gates that may veto (gate 2.5 now, gate 5 reviewer later)."""
import re

_SPACE = re.compile(r"\s+")


def _norm(text):
    return _SPACE.sub(" ", text).strip()


def parse(raw):
    """Claim dict -> {claim, evidence:[{file, snippet}]}; None when shape is wrong."""
    if not isinstance(raw, dict) or not isinstance(raw.get("claim"), str):
        return None
    evidence = [{"file": item["file"], "snippet": item["snippet"]} for item in raw.get("evidence") or []
                if isinstance(item, dict) and isinstance(item.get("file"), str) and isinstance(item.get("snippet"), str)]
    return {"claim": raw["claim"], "evidence": evidence}


def verified(raw, files):
    """Evidence entries whose file is in REPO DATA and whose snippet appears in it verbatim (whitespace-insensitive).

    Empty list = the claim is unverifiable; the caller must not block on it.
    """
    claim = parse(raw)
    if not claim:
        return []
    return [item for item in claim["evidence"]
            if item["file"] in files and _norm(item["snippet"]) and _norm(item["snippet"]) in _norm(files[item["file"]])]
