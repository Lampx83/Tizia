"""Run a board-generated migration on a throwaway PostgreSQL before the admin applies it.

Only additive statements pass the allowlist; anything else is blocked before any DB call.
PgRunner creates dbcheck_<hex> on a server; SandboxPgRunner runs PostgreSQL inside the microVM.
"""
from __future__ import annotations

import re
import secrets
import tempfile
from urllib.parse import urlsplit

PROFILE = "db_check"
IMAGE = "postgres:16-alpine"
CONTAINER = "dbcheck"
ALLOWED = (
    re.compile(r"^CREATE TABLE( IF NOT EXISTS)? \S+ \("),
    re.compile(r"^CREATE (UNIQUE )?INDEX( IF NOT EXISTS)? \S+ ON \S+"),
    re.compile(r"^ALTER TABLE( IF EXISTS)?( ONLY)? \S+ ADD (COLUMN|CONSTRAINT) "),
    re.compile(r"^COMMENT ON (TABLE|COLUMN) "),
    re.compile(r"^INSERT INTO \S+"),
)
_DOLLAR = re.compile(r"\$[A-Za-z_]*\$")
_IDENT = re.compile(r"[A-Za-z0-9_$]")
_ALTER = re.compile(r"^ALTER TABLE(?: IF EXISTS)?(?: ONLY)? \S+ (.*)$", re.S)
_STRING = re.compile(r"'(?:[^']|'')*'")


class TargetRefused(ValueError):
    """DB target outside the sandbox."""


class DbCheckUnavailable(RuntimeError):
    """Guest cannot host PostgreSQL (no image / docker)."""


def _split(sql: str, sep: str) -> list[str]:
    """Split on top-level `sep`; comments dropped, quotes/dollar bodies kept intact (';' only splits outside them, ',' also outside parens)."""
    out, buf, depth, i, n = [], [], 0, 0, len(sql)
    while i < n:
        c = sql[i]
        if sql.startswith("--", i):
            i = sql.find("\n", i)
            i = n if i < 0 else i
            buf.append(" ")
            continue
        if sql.startswith("/*", i):
            i = sql.find("*/", i + 2)
            i = n if i < 0 else i + 2
            buf.append(" ")
            continue
        if c in ("'", '"'):
            j = i + 1
            while j < n:
                if sql[j] == c:
                    if sql[j + 1:j + 2] == c:
                        j += 2
                        continue
                    break
                j += 1
            buf.append(sql[i:j + 1])
            i = j + 1
            continue
        # PostgreSQL lexer: `$` inside an identifier (t$x$) never opens a dollar quote.
        if c == "$" and not (i and _IDENT.match(sql[i - 1])) and (tag := _DOLLAR.match(sql, i)):
            j = sql.find(tag.group(), tag.end())
            j = n if j < 0 else j + len(tag.group())
            buf.append(sql[i:j])
            i = j
            continue
        if c == "(":
            depth += 1
        elif c == ")":
            depth -= 1
        if c == sep and (sep == ";" or depth == 0):
            out.append("".join(buf))
            buf = []
        else:
            buf.append(c)
        i += 1
    out.append("".join(buf))
    return [" ".join(s.split()) for s in out if s.strip()]


def _statements(sql: str) -> list[str]:
    return _split(sql, ";")


def _problem(stmt: str) -> str | None:
    up = stmt.upper()
    if not any(p.match(up) for p in ALLOWED):
        return "không additive"
    code = _STRING.sub("''", up)
    if up.startswith("INSERT") and re.search(r"\bDO UPDATE\b", code):
        return "INSERT ... DO UPDATE sửa dữ liệu có sẵn"
    alter = _ALTER.match(code)
    if alter:
        for clause in _split(alter.group(1), ","):
            if not re.match(r"^ADD (COLUMN|CONSTRAINT) ", clause):
                return "ALTER TABLE có hành động ngoài ADD COLUMN/CONSTRAINT"
            if re.search(r"\bNOT NULL\b", clause) and not re.search(r"\bDEFAULT\b", clause) and clause.startswith("ADD COLUMN"):
                return "ADD COLUMN NOT NULL không có DEFAULT"
    return None


def violations(sql: str) -> list[str]:
    """Statements outside the additive allowlist; [] when the migration is additive."""
    out = []
    for stmt in _statements(sql):
        if reason := _problem(stmt):
            out.append(f"{reason}: {stmt[:120]}")
    return out


def assert_sandbox_target(dsn: str) -> None:
    """Raise TargetRefused unless dsn host is loopback or a unix socket (inside the VM)."""
    host = urlsplit(dsn).hostname
    if host not in (None, "", "localhost", "127.0.0.1", "::1"):
        raise TargetRefused(f"db_check target must be inside the sandbox, got host {host!r}")


def check_migration(sql: str, runner, verify_sql: tuple[str, ...] | list[str] = ()) -> dict:
    """Blocked report if non-additive, else runner result; status passed|failed|blocked|db_check_unavailable."""
    found = violations(sql)
    if found:
        return {"status": "blocked", "violations": found, "schema_diff": None, "checks": [], "error": None}
    try:
        result = runner.run(sql, list(verify_sql))
    except DbCheckUnavailable as error:
        return {"status": "db_check_unavailable", "violations": [], "schema_diff": None, "checks": [], "error": str(error)[:300]}
    except Exception as error:  # noqa: BLE001 — migration failure is the report, not a crash
        return {"status": "failed", "violations": [], "schema_diff": None, "checks": [], "error": str(error)[:300]}
    checks = result["checks"]
    status = "passed" if all(c["ok"] for c in checks) else "failed"
    return {"status": status, "violations": [], "schema_diff": result["schema_diff"], "checks": checks, "error": None}


def _snapshot(conn) -> dict:
    cols = conn.execute("SELECT table_name, column_name, data_type, is_nullable FROM information_schema.columns "
                        "WHERE table_schema = 'public' ORDER BY 1, 2").fetchall()
    return _shape(cols)


def _shape(rows) -> dict:
    tables: dict[str, dict[str, str]] = {}
    for table, column, dtype, nullable in rows:
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


_SNAPSHOT_SQL = ("SELECT table_name, column_name, data_type, is_nullable FROM information_schema.columns "
                 "WHERE table_schema = 'public' ORDER BY 1, 2")
BOOT_TIMEOUT = 180.0  # dockerd over the warm vfs data dir; same budget as Gate 5's boot
_BOOT = ("guest-boot.sh",)
_INSPECT = ("docker", "image", "inspect", IMAGE)
_START = ("docker", "run", "-d", "--name", CONTAINER, "--network", "none", "-e", "POSTGRES_HOST_AUTH_METHOD=trust", IMAGE)
_READY = ("docker", "exec", CONTAINER, "sh", "-c", "until pg_isready -q -h 127.0.0.1; do sleep 0.2; done")
_PSQL = ("docker", "exec", CONTAINER, "psql", "-U", "postgres", "-At", "-F", "|")
_REMOVE = ("docker", "rm", "-f", CONTAINER)
# None = the SQL after -c, the only token that varies.
EXEC_POLICY = (_BOOT, _INSPECT, _START, _READY, (*_PSQL, "-c", None), (*_PSQL, "-v", "ON_ERROR_STOP=1", "-c", None), _REMOVE)


class ExecRefused(ValueError):
    """Guest argv outside EXEC_POLICY."""


def exec_allowed(argv) -> bool:
    """True if argv matches one EXEC_POLICY entry token for token."""
    return any(len(p) == len(argv) and all(a == t or (t is None and isinstance(a, str)) for t, a in zip(p, argv))
               for p in EXEC_POLICY)


class SandboxPgRunner:
    """PostgreSQL 16 container inside the microVM, no network, ready-checked over loopback TCP (the init-time server is socket-only); removed in finally."""

    def __init__(self, session, timeout: float = 60.0):
        self.session, self.timeout = session, timeout

    def _exec(self, argv, timeout: float | None = None) -> dict:
        """session.exec for EXEC_POLICY argv only. Raise ExecRefused before the guest sees anything else."""
        if not exec_allowed(argv):
            raise ExecRefused(f"db_check argv outside policy: {list(argv)[:4]!r}")
        return self.session.exec(list(argv), timeout or self.timeout)

    def _psql(self, sql: str, *flags: str) -> dict:
        return self._exec([*_PSQL, *flags, "-c", sql])

    def _snapshot(self) -> dict:
        out = self._psql(_SNAPSHOT_SQL)
        if out["rc"] != 0:
            raise RuntimeError(f"snapshot failed: {out['stderr'][:200]}")
        return _shape(tuple(line.split("|")) for line in out["stdout"].splitlines() if line)

    def run(self, sql: str, verify_sql: list[str]) -> dict:
        if self._exec(_BOOT, BOOT_TIMEOUT)["rc"] != 0:
            raise DbCheckUnavailable("guest dockerd did not start")
        if self._exec(_INSPECT)["rc"] != 0:
            raise DbCheckUnavailable(f"guest has no {IMAGE}")
        started = self._exec(_START)
        if started["rc"] != 0:
            raise DbCheckUnavailable(f"docker run failed: {started['stderr'][:200]}")
        try:
            ready = self._exec(_READY)
            if ready["rc"] != 0:
                raise RuntimeError("postgres not ready")
            before = self._snapshot()
            applied = self._psql(sql, "-v", "ON_ERROR_STOP=1")
            if applied["rc"] != 0:
                raise RuntimeError(applied["stderr"][:300] or "migration failed")
            after = self._snapshot()
            checks = []
            for check in verify_sql:
                out = self._psql(check)
                checks.append({"sql": check, "ok": out["rc"] == 0 and out["stdout"].strip() not in ("", "f")})
            return {"schema_diff": _diff(before, after), "checks": checks}
        finally:
            self._exec(_REMOVE)


def run_db_check(sql: str, *, enabled: bool, session_factory, verify_sql=(), test_argv=(), allowed_argv=(),
                 stage=None) -> dict:
    """db_check profile: additive check, throwaway PG in a microVM, then related tests in the same VM.

    session_factory(stage_dir) -> SandboxSession-like context manager; stage(stage_dir) fills the checkout.
    Raise runtime.sandbox_tool.Refused on test argv outside allowed_argv, before any VM. Raise SandboxError
    cleanup_unconfirmed when teardown is unconfirmed.
    """
    from runtime import sandbox_tool
    from verification.sandbox import SandboxError

    if not enabled:
        return {"status": "disabled", "profile": PROFILE}
    for argv in test_argv:
        sandbox_tool.check_argv(list(argv), allowed_argv)
    found = violations(sql)
    if found:
        return {**check_migration(sql, None), "profile": PROFILE, "tests": []}
    tests: list[dict] = []
    try:
        with tempfile.TemporaryDirectory(prefix="ai-dbcheck-stage-") as root:
            if stage:
                stage(root)
            with session_factory(root) as session:
                report = check_migration(sql, SandboxPgRunner(session), verify_sql)
                if report["status"] == "passed":
                    for argv in test_argv:
                        tests.append({"argv": list(argv), "rc": session.exec(list(argv), 120.0)["rc"]})
    except SandboxError as error:
        if error.code == "cleanup_unconfirmed":
            raise
        return {"status": "db_check_unavailable", "profile": PROFILE, "violations": [], "schema_diff": None, "checks": [],
                "tests": [], "error": error.code}
    if report["status"] == "passed" and any(t["rc"] != 0 for t in tests):
        report["status"] = "failed"
    return {**report, "profile": PROFILE, "tests": tests}


def attach_to_job(job: dict, report: dict) -> dict:
    """Copy of admin data job with db_check evidence; admin remains the one who applies."""
    keep = ("status", "profile", "violations", "schema_diff", "checks", "tests", "error")
    evidence = {**(job.get("evidence") or {}), PROFILE: {k: report.get(k) for k in keep}}
    return {**job, "evidence": evidence, "apply_by": "admin"}
