"""Run a board-generated migration on a throwaway PostgreSQL before the admin applies it.

Only additive statements pass the allowlist; anything else is blocked before any DB call.
The runner never connects to the target DB: it creates dbcheck_<hex>, runs there, drops it.
"""
from __future__ import annotations

import re
import secrets

ALLOWED = (
    re.compile(r"^CREATE TABLE( IF NOT EXISTS)? \S+ \("),
    re.compile(r"^CREATE (UNIQUE )?INDEX( IF NOT EXISTS)? \S+ ON \S+"),
    re.compile(r"^ALTER TABLE( IF EXISTS)? \S+ ADD (COLUMN|CONSTRAINT) "),
    re.compile(r"^COMMENT ON (TABLE|COLUMN) "),
    re.compile(r"^INSERT INTO \S+"),
)
_COMMENT = re.compile(r"--[^\n]*|/\*.*?\*/", re.S)


def _statements(sql: str) -> list[str]:
    return [" ".join(s.split()) for s in _COMMENT.sub(" ", sql).split(";") if s.strip()]


def violations(sql: str) -> list[str]:
    """Statements outside the additive allowlist; [] when the migration is additive."""
    out = []
    for stmt in _statements(sql):
        if not any(p.match(stmt.upper()) for p in ALLOWED):
            out.append(f"không additive: {stmt[:120]}")
    return out


def check_migration(sql: str, runner, verify_sql: tuple[str, ...] | list[str] = ()) -> dict:
    """Blocked report if non-additive, else runner result; status passed|failed|blocked."""
    found = violations(sql)
    if found:
        return {"status": "blocked", "violations": found, "schema_diff": None, "checks": [], "error": None}
    try:
        result = runner.run(sql, list(verify_sql))
    except Exception as error:  # noqa: BLE001 — migration failure is the report, not a crash
        return {"status": "failed", "violations": [], "schema_diff": None, "checks": [], "error": str(error)[:300]}
    checks = result["checks"]
    status = "passed" if all(c["ok"] for c in checks) else "failed"
    return {"status": status, "violations": [], "schema_diff": result["schema_diff"], "checks": checks, "error": None}


def _snapshot(conn) -> dict:
    cols = conn.execute("SELECT table_name, column_name, data_type, is_nullable FROM information_schema.columns "
                        "WHERE table_schema = 'public' ORDER BY 1, 2").fetchall()
    tables: dict[str, dict[str, str]] = {}
    for table, column, dtype, nullable in cols:
        tables.setdefault(table, {})[column] = f"{dtype}{'' if nullable == 'YES' else ' not null'}"
    return tables


def _diff(before: dict, after: dict) -> dict:
    added_cols = {t: sorted(set(after[t]) - set(before.get(t, {}))) for t in after if set(after[t]) - set(before.get(t, {}))}
    removed_cols = {t: sorted(set(before[t]) - set(after.get(t, {}))) for t in before if set(before[t]) - set(after.get(t, {}))}
    return {"added_tables": sorted(set(after) - set(before)), "removed_tables": sorted(set(before) - set(after)),
            "added_columns": added_cols, "removed_columns": removed_cols}


class PgRunner:
    """Throwaway database on the server behind admin_dsn; dropped in finally."""

    def __init__(self, admin_dsn: str):
        self.admin_dsn = admin_dsn

    def run(self, sql: str, verify_sql: list[str]) -> dict:
        import psycopg
        from psycopg.conninfo import make_conninfo

        name = f"dbcheck_{secrets.token_hex(6)}"
        with psycopg.connect(self.admin_dsn, autocommit=True) as admin:
            admin.execute(f'CREATE DATABASE "{name}"')
        try:
            target = make_conninfo(self.admin_dsn, dbname=name)
            with psycopg.connect(target, autocommit=True) as conn:
                before = _snapshot(conn)
                with conn.transaction():
                    conn.execute(sql)
                after = _snapshot(conn)
                checks = []
                for check in verify_sql:
                    row = conn.execute(check).fetchone()
                    checks.append({"sql": check, "ok": bool(row and row[0] is not None and row[0] is not False)})
            return {"schema_diff": _diff(before, after), "checks": checks}
        finally:
            with psycopg.connect(self.admin_dsn, autocommit=True) as admin:
                admin.execute(f'DROP DATABASE IF EXISTS "{name}" WITH (FORCE)')
