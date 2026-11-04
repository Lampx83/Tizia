"""Request-level dataset for AI board measurement: schema, enums, loader, validator.

One row per realistic request. The CSV is the source of truth; this module only reads
and checks it (no model calls).

Real data is host-only: `AI_BOARD_EVAL_DATA` names the directory holding `requests-v1.csv`
(or the CSV itself). Unset = the small synthetic fixture in `datasets/fixtures/`, so tests
and CI need no external file. Gold stays out of worker/candidate mounts; grading reads it here.
"""
from __future__ import annotations

import csv
import hashlib
import os
import re
from dataclasses import dataclass
from pathlib import Path

ENV = "AI_BOARD_EVAL_DATA"
DATASET_NAME = "requests-v1.csv"
FIXTURE = Path(__file__).resolve().parent / "datasets" / "fixtures" / "requests-sample.csv"

COLUMNS = (
    "id", "split", "domain", "request_title", "request_detail_vi", "difficulty", "difficulty_reason",
    "expected_steps", "expected_layers", "touches_db", "touches_core_or_protected", "needs_elevation",
    "needs_ui", "ambiguity", "acceptance_checks", "expected_outcome", "labels", "notes",
)
SPLITS = ("dev", "gold")
DOMAINS = ("admin", "campus", "faq", "leagues", "lessons", "portal")
LAYERS = ("frontend", "backend", "db", "wiring")
BINARY = ("touches_db", "touches_core_or_protected", "needs_elevation", "needs_ui")
AMBIGUITY = ("low", "medium", "high")
OUTCOMES = ("plan_pass", "gate25_block", "clarify", "intake_review")
NO_PLAN = ("clarify", "intake_review")
DEV_SHARE = (0.65, 0.75)  # split rule: dev 70 %, gold 30 % held out
MAX_DETAIL_WORDS = 80
TAG = re.compile(r"^[a-z0-9][a-z0-9-]*$")
# A requester does not know the codebase: no repo paths, no file names in the request text.
REPO_PATH = (
    re.compile(r"(?<![\w-])(?:public|server|src|test|tests|scripts|domains|docs|ai-board|harness)/", re.I),
    re.compile(r"\.(?:html?|jsx?|mjs|cjs|tsx?|py|sql|json|css|md|ya?ml|sh|ps1)\b", re.I),
    re.compile(r"[\w-]+[\\/][\w.-]+\.[A-Za-z0-9]{2,4}\b"),
)


def _require(path: Path) -> Path:
    """CSV file from a path that may be the dataset directory. Raise FileNotFoundError, never fall back."""
    candidate = path / DATASET_NAME if path.is_dir() else path
    if not candidate.is_file():
        raise FileNotFoundError(
            f"requests dataset not found: {candidate}. Set {ENV} to the directory holding "
            f"{DATASET_NAME} (or to the CSV); without it only the in-repo fixture {FIXTURE.name} is read")
    return candidate


def data_path(path=None) -> Path:
    """Resolved CSV: explicit path, else $AI_BOARD_EVAL_DATA, else the in-repo fixture."""
    if path:
        return _require(Path(path))
    env = os.environ.get(ENV, "").strip()
    if not env:
        return _require(FIXTURE)
    return _require(Path(env).expanduser())


def dataset_hash(path=None) -> str:
    """sha256 hex of the dataset bytes; same bytes = same hash, no newline rewriting."""
    return hashlib.sha256(data_path(path).read_bytes()).hexdigest()


@dataclass(frozen=True)
class Dataset:
    """Loaded dataset: resolved CSV, sha256 of its bytes, fieldnames and rows."""

    path: Path
    sha256: str
    fieldnames: list[str]
    rows: list[dict]

    def problems(self) -> list[str]:
        return validate(self.fieldnames, self.rows)

    def stats(self) -> dict:
        return stats(self.rows)


def load(path=None) -> Dataset:
    """Dataset from data_path(), with the sha256 of the file that was read."""
    resolved = data_path(path)
    fieldnames, rows = read(resolved)
    return Dataset(path=resolved, sha256=dataset_hash(resolved), fieldnames=fieldnames, rows=rows)


def read(path=None) -> tuple[list[str], list[dict]]:
    """(fieldnames, rows) from the dataset CSV."""
    with data_path(path).open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        return list(reader.fieldnames or []), list(reader)


def repo_paths(text: str) -> list[str]:
    """Path-like tokens found in request text; [] means the text stays request-level."""
    return [m.group(0) for pattern in REPO_PATH for m in pattern.finditer(text)]


def validate(fieldnames: list[str], rows: list[dict]) -> list[str]:
    """Problems as human-readable strings; [] = dataset satisfies the v1 contract."""
    problems: list[str] = []
    if tuple(fieldnames) != COLUMNS:
        problems.append(f"columns mismatch: missing={sorted(set(COLUMNS) - set(fieldnames))} "
                        f"extra={sorted(set(fieldnames) - set(COLUMNS))} order={fieldnames}")
    ids = [row.get("id", "") for row in rows]
    duplicates = sorted({i for i in ids if ids.count(i) > 1})
    if duplicates:
        problems.append(f"duplicate ids: {duplicates}")
    difficulties = set()
    for row in rows:
        rid = row.get("id") or "<missing id>"
        bad = lambda msg: problems.append(f"{rid}: {msg}")  # noqa: E731
        if not row.get("id"):
            bad("empty id")
        if row.get("split") not in SPLITS:
            bad(f"split={row.get('split')!r} not in {SPLITS}")
        if row.get("domain") not in DOMAINS:
            bad(f"domain={row.get('domain')!r} not in {DOMAINS}")
        for field in ("request_title", "request_detail_vi", "difficulty_reason"):
            if not (row.get(field) or "").strip():
                bad(f"empty {field}")
        detail = (row.get("request_detail_vi") or "").strip()
        if len(detail.split()) > MAX_DETAIL_WORDS:
            bad(f"detail has {len(detail.split())} words > {MAX_DETAIL_WORDS}")
        try:
            difficulty = int(row["difficulty"])
            if not 1 <= difficulty <= 5:
                bad(f"difficulty={difficulty} outside 1-5")
            difficulties.add(difficulty)
        except (KeyError, TypeError, ValueError):
            bad(f"difficulty={row.get('difficulty')!r} not an int")
        layers = [x for x in (row.get("expected_layers") or "").split(";") if x]
        if not layers:
            bad("empty expected_layers")
        unknown = sorted(set(layers) - set(LAYERS))
        if unknown:
            bad(f"unknown layers {unknown}")
        if len(layers) != len(set(layers)):
            bad("duplicate layers")
        for field in BINARY:
            if row.get(field) not in ("0", "1"):
                bad(f"{field}={row.get(field)!r} not 0/1")
        if row.get("ambiguity") not in AMBIGUITY:
            bad(f"ambiguity={row.get('ambiguity')!r} not in {AMBIGUITY}")
        outcome = row.get("expected_outcome")
        if outcome not in OUTCOMES:
            bad(f"expected_outcome={outcome!r} not in {OUTCOMES}")
        try:
            steps = int(row["expected_steps"])
            if steps < 0:
                bad(f"expected_steps={steps} negative")
            if (steps == 0) != (outcome in NO_PLAN):
                bad(f"expected_steps={steps} inconsistent with outcome={outcome!r}")
        except (KeyError, TypeError, ValueError):
            bad(f"expected_steps={row.get('expected_steps')!r} not an int")
        try:
            checks = int(row["acceptance_checks"])
            if checks < 1:
                bad("acceptance_checks must be >= 1")
        except (KeyError, TypeError, ValueError):
            bad(f"acceptance_checks={row.get('acceptance_checks')!r} not an int")
        if row.get("touches_db") == "1" and "db" not in layers:
            bad("touches_db=1 without db layer")
        if row.get("touches_db") == "0" and "db" in layers:
            bad("touches_db=0 with db layer")
        if row.get("needs_ui") == "1" and "frontend" not in layers:
            bad("needs_ui=1 without frontend layer")
        if row.get("needs_ui") == "0" and "frontend" in layers:
            bad("needs_ui=0 with frontend layer")
        if row.get("needs_elevation") == "1" and row.get("touches_core_or_protected") != "1":
            bad("needs_elevation=1 without core/protected target")
        tags = [t for t in (row.get("labels") or "").split(";") if t]
        if not tags:
            bad("empty labels")
        if [t for t in tags if not TAG.match(t)]:
            bad(f"bad labels {[t for t in tags if not TAG.match(t)]}")
        paths = repo_paths((row.get("request_title") or "") + " " + detail)
        if paths:
            bad(f"request text leaks repo paths {paths}")
    if set(difficulties) != {1, 2, 3, 4, 5}:
        problems.append(f"difficulties present {sorted(difficulties)} != 1-5")
    if rows:
        dev = sum(row.get("split") == "dev" for row in rows)
        share = dev / len(rows)
        if not DEV_SHARE[0] <= share <= DEV_SHARE[1]:
            problems.append(f"dev share {share:.3f} outside {DEV_SHARE[0]}-{DEV_SHARE[1]}")
        if not {row.get("split") for row in rows} >= set(SPLITS):
            problems.append(f"both splits required, got {sorted({row.get('split') for row in rows})}")
    return problems


def stats(rows: list[dict]) -> dict:
    """Case counts per split and difficulty, for reports and quick checks."""
    by_difficulty = {d: sum(row["difficulty"] == str(d) for row in rows) for d in range(1, 6)}
    return {
        "total": len(rows),
        "split": {s: sum(row["split"] == s for row in rows) for s in SPLITS},
        "difficulty": by_difficulty,
        "outcome": {o: sum(row["expected_outcome"] == o for row in rows) for o in OUTCOMES},
    }
