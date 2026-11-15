"""Prompt labels (production/staging) over immutable prompt hashes; every change writes a receipt.

Authority for disk content is prompts.lock.json. A label must point at the lock hash; otherwise
the runtime refuses (LabelMismatch), so a label can never silently serve other text.
"""
from __future__ import annotations

import hashlib
import json
import os
from datetime import datetime, timezone
from pathlib import Path

LABELS = ("production", "staging")
_DIR = Path(__file__).resolve().parent.parent / "prompts"
LABELS_PATH = _DIR / "labels.json"
RECEIPTS_PATH = _DIR / "labels.receipts.jsonl"


class LabelError(ValueError):
    """Refused admin change: bad label, unknown version, nothing to roll back to."""


class LabelMismatch(RuntimeError):
    """Label points at a hash that is not the current lock hash."""

    def __init__(self, name: str, label: str, want: str | None, have: str | None):
        super().__init__(f"label {label} of {name} -> {want} but lock has {have}")
        self.name, self.label, self.want, self.have = name, label, want, have


def load(path: Path = LABELS_PATH) -> dict[str, dict[str, str]]:
    """{name: {label: sha}}; {} if file missing."""
    try:
        return json.loads(Path(path).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}


def _receipts(path: Path) -> list[dict]:
    try:
        return [json.loads(line) for line in Path(path).read_text(encoding="utf-8").splitlines() if line.strip()]
    except OSError:
        return []


def _write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    os.replace(tmp, path)


def _change(name: str, label: str, sha: str, actor: str, kind: str, *, lock: dict, labels_path: Path,
            receipts_path: Path, reason: str = "") -> dict:
    if label not in LABELS:
        raise LabelError(f"label must be one of {LABELS}: {label}")
    receipts = _receipts(receipts_path)
    known = {lock.get(name)} | {r["to"] for r in receipts if r["name"] == name}
    if sha not in known:
        raise LabelError(f"{name}: version {sha} unknown (not lock, not in receipts)")
    labels = load(labels_path)
    prev = labels.get(name, {}).get(label)
    labels.setdefault(name, {})[label] = sha
    _write_json(labels_path, labels)
    receipt = {"name": name, "label": label, "from": prev, "to": sha, "kind": kind, "actor": actor, "reason": reason,
               "at": datetime.now(timezone.utc).isoformat(timespec="seconds")}
    receipts_path.parent.mkdir(parents=True, exist_ok=True)
    with receipts_path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(receipt, ensure_ascii=False) + "\n")
    return receipt


def set_label(name: str, label: str, sha: str, actor: str, *, lock: dict, labels_path: Path = LABELS_PATH,
              receipts_path: Path = RECEIPTS_PATH, reason: str = "") -> dict:
    """Point label at a known version; writes receipt. Raises LabelError."""
    return _change(name, label, sha, actor, "set", lock=lock, labels_path=Path(labels_path), receipts_path=Path(receipts_path),
                   reason=reason)


def rollback(name: str, label: str, actor: str, *, lock: dict, labels_path: Path = LABELS_PATH,
             receipts_path: Path = RECEIPTS_PATH, reason: str = "") -> dict:
    """Move label back to the version it had before its current one. Raises LabelError if no history."""
    receipts_path = Path(receipts_path)
    seq: list[str] = []
    for r in _receipts(receipts_path):
        if r["name"] == name and r["label"] == label and (not seq or seq[-1] != r["to"]):
            seq.append(r["to"])
    current = load(labels_path).get(name, {}).get(label)
    if current is None or len(seq) < 2 or seq[-1] != current:
        raise LabelError(f"{name}/{label}: no previous version to roll back to")
    return _change(name, label, seq[-2], actor, "rollback", lock=lock, labels_path=Path(labels_path),
                   receipts_path=receipts_path, reason=reason)


def check(name: str, *, lock: dict, labels: dict, label: str = "production") -> str | None:
    """Lock hash for name; raise LabelMismatch if the label is set and points elsewhere."""
    have, want = lock.get(name), labels.get(name, {}).get(label)
    if want is not None and want != have:
        raise LabelMismatch(name, label, want, have)
    return have


def check_all(*, lock: dict, labels: dict) -> list[dict]:
    """Every label that does not match the lock; [] when consistent."""
    return [{"name": name, "label": label, "want": sha, "have": lock.get(name)}
            for name, by_label in sorted(labels.items()) for label, sha in sorted(by_label.items()) if lock.get(name) != sha]


def fingerprint(labels: dict) -> str:
    """Stable sha256 of the label table; workers pin it like the other run pins."""
    return hashlib.sha256(json.dumps(labels, sort_keys=True, ensure_ascii=False).encode("utf-8")).hexdigest()


def label_mismatch(pinned: str | None, current: str) -> list[str]:
    """Fail closed like pin_mismatch: missing pin -> ['missing'], drift -> ['labels'], else []."""
    if not pinned:
        return ["missing"]
    return [] if pinned == current else ["labels"]
