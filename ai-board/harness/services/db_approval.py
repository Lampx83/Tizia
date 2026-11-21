"""DB change of a candidate (flag requester_fullstack_db): migrations, additive + idempotent rules, sandbox PostgreSQL run."""
from __future__ import annotations

import re

import path_policy
from gates import change_class
from verification import db_check

_GENERATED_MIGRATION = re.compile(rf"^{re.escape(path_policy.GENERATED_ROOT)}[a-z0-9][a-z0-9-]*/migrations/[a-z0-9][a-z0-9._-]*\.sql$")
_INLINE = re.compile(rf"{change_class._DDL.pattern}|(?<!\w)truncate\s+(?:table\s+)?[\w.\"]+", re.I)
SQL_CAP = 20_000
# Context file runs on every boot: each statement must be a no-op the second time.
_IDEMPOTENT = (
    (re.compile(r"^CREATE TABLE "), re.compile(r"^CREATE TABLE IF NOT EXISTS "), "CREATE TABLE thiếu IF NOT EXISTS"),
    (re.compile(r"^CREATE (UNIQUE )?INDEX "), re.compile(r"^CREATE (UNIQUE )?INDEX IF NOT EXISTS "), "CREATE INDEX thiếu IF NOT EXISTS"),
    (re.compile(r"^ALTER TABLE "), re.compile(r"^ALTER TABLE( IF EXISTS)?( ONLY)? \S+ ADD COLUMN IF NOT EXISTS [^,]+$"),
     "ALTER TABLE chỉ được một ADD COLUMN IF NOT EXISTS"),
    (re.compile(r"^INSERT "), re.compile(r"\bON CONFLICT\b[^;]*\bDO NOTHING$"), "INSERT thiếu ON CONFLICT DO NOTHING"),
)


def migration_path(path: str, role: str = "student") -> bool:
    return bool(_GENERATED_MIGRATION.match(path)) or path_policy.context_migration(path, role)


def _sections(diffs: list[dict]):
    """(path, new_file, added, removed) per file section of a unified diff."""
    for item in diffs:
        text = item.get("diff", "")
        path, new, added, removed = None, False, [], 0
        for line in text.splitlines():
            if line.startswith("diff --git "):
                if path is not None:
                    yield path, new, added, removed
                path, new, added, removed = line.split(" b/", 1)[-1], False, [], 0
            elif line.startswith("new file mode "):
                new = True
            elif line.startswith("+") and not line.startswith("+++"):
                added.append(line[1:])
            elif line.startswith("-") and not line.startswith("---"):
                removed += 1
        if path is not None:
            yield path, new, added, removed


def idempotency_problems(sql: str) -> list[str]:
    out = []
    for stmt in db_check._statements(sql):
        up = stmt.upper()
        for applies, ok, why in _IDEMPOTENT:
            if applies.match(up) and not ok.search(up):
                out.append(f"{why}: {stmt[:120]}")
    return out


def review(diffs: list[dict], role: str = "student") -> dict | None:
    """None when the diff has no DB change. Else {migrations:[{path, sql}], files, problems}; problems [] = may run on sandbox."""
    migrations, problems, files = [], [], []
    for path, new, added, removed in _sections(diffs):
        path = path.replace("\\", "/")
        files.append(path)
        if path.lower().endswith(".sql"):
            sql = "\n".join(added)
            if not migration_path(path, role):
                problems.append(f"{path}: SQL ngoài thư mục migrations được phép")
            elif not new or removed:
                problems.append(f"{path}: migration phải là file mới, không sửa file đã có")
            problems += [f"{path}: {item}" for item in db_check.violations(sql)]
            problems += [f"{path}: {item}" for item in idempotency_problems(sql)]
            migrations.append({"path": path, "sql": sql[:SQL_CAP]})
        elif not change_class._TEST.search(path) and any(_INLINE.search(line) for line in added):
            problems.append(f"{path}: DDL viết trong code; thay đổi DB phải nằm trong file migrations/*.sql")
    if not migrations and not problems:
        return None
    return {"migrations": migrations, "files": sorted(set(files)), "problems": problems}


def run_sandbox(sql: str, should_stop=None) -> dict:
    """db_check profile on the sandbox runner; report of verification.db_check.run_db_check."""
    from settings import get_settings
    from verification.sandbox import SandboxSession
    lease_ok = (lambda: not should_stop()) if should_stop else None
    return db_check.run_db_check(sql, enabled=get_settings().db_check,
                                 session_factory=lambda root: SandboxSession(root, lease_ok=lease_ok))


def evaluate(diffs: list[dict], role: str = "student", should_stop=None) -> dict | None:
    """None = no DB change. Else {status: passed|blocked|transient, reason, db_change}; only passed may wait for the admin."""
    change = review(diffs, role)
    if change is None:
        return None
    if change["problems"]:
        return {"status": "blocked", "reason": "thay đổi DB bị chặn: " + "; ".join(change["problems"])[:800], "db_change": None}
    sql = ";\n".join(m["sql"].rstrip().rstrip(";") for m in change["migrations"]) + ";"
    report = run_sandbox(sql, should_stop)
    sandbox = {k: report.get(k) for k in ("status", "schema_diff", "checks", "tests", "error")}
    if report.get("status") == "passed":
        return {"status": "passed", "reason": None, "db_change": {**change, "sandbox": sandbox}}
    kind = "transient" if report.get("status") in ("disabled", "db_check_unavailable") else "blocked"
    detail = "; ".join(report.get("violations") or []) or report.get("error") or report.get("status")
    return {"status": kind, "reason": f"migration chưa chạy được trên Postgres sandbox ({report.get('status')}): {detail}"[:800],
            "db_change": None}
