"""DB change of a candidate (flag requester_fullstack_db): migrations, additive + idempotent rules, sandbox PostgreSQL run."""
from __future__ import annotations

import json
import posixpath
import re
from functools import lru_cache
from pathlib import Path

import path_policy
from gates import change_class
from gate5 import db_check

_GENERATED_MIGRATION = re.compile(rf"^{re.escape(path_policy.GENERATED_ROOT)}[a-z0-9][a-z0-9-]*/migrations/[a-z0-9][a-z0-9._-]*\.sql$")
_INLINE = re.compile(rf"{change_class._DDL.pattern}|(?<!\w)truncate\s+(?:table\s+)?[\w.\"]+", re.I)
SQL_CAP = 20_000
TOO_LARGE = "quá lớn để admin duyệt; tách yêu cầu nhỏ hơn"
_TOP_TEST = re.compile(r"^tests?/")
# INSERT carries literal rows only: no SELECT, no function call can run inside a migration.
_LITERAL = r"(?:''|-?\d+(?:\.\d+)?|NULL|TRUE|FALSE|DEFAULT)"
_ROW = rf"\(\s*{_LITERAL}(?:\s*,\s*{_LITERAL})*\s*\)"
_INSERT_LITERAL = re.compile(rf"^INSERT INTO [\w.\"]+(?: \([\w\" ,]*\))? VALUES {_ROW}(?:\s*,\s*{_ROW})* "
                             rf"ON CONFLICT(?: \([\w\" ,]*\))? DO NOTHING$")
_TABLE = re.compile(r"^(?:CREATE TABLE(?: IF NOT EXISTS)?|ALTER TABLE(?: IF EXISTS)?(?: ONLY)?|INSERT INTO"
                    r"|CREATE (?:UNIQUE )?INDEX(?: IF NOT EXISTS)? \S+ ON|COMMENT ON (?:TABLE|COLUMN)) ([\w.\"]+)")
# Identity, permission and money tables: shown to the admin as needing explicit attention.
_SENSITIVE = re.compile(r"(?:^|_)(?:users?|roles?|permissions?|grants?|sessions?|admins?|auth|accounts?|wallets?|coins?|"
                        r"payments?|billing|invoices?|transactions?)(?:_|$)", re.I)
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
        if up.startswith("INSERT") and not _INSERT_LITERAL.match(db_check._STRING.sub("''", up)):
            out.append(f"INSERT chỉ được VALUES hằng, không SELECT hay gọi hàm: {stmt[:120]}")
    return out


def sensitive_tables(sql: str) -> list[str]:
    """Tables the migration touches whose name looks like identity, permission or money data."""
    names = {m.group(1).strip('"').split(".")[-1].lower() for stmt in db_check._statements(sql)
             if (m := _TABLE.match(stmt.upper()))}
    return sorted(name for name in names if _SENSITIVE.search(name))


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
            if len(sql) > SQL_CAP:
                problems.append(f"{path}: migration {len(sql)} ký tự, {TOO_LARGE}")
            migrations.append({"path": path, "sql": sql})
        elif not _TOP_TEST.match(path) and any(_INLINE.search(line) for line in added):
            problems.append(f"{path}: DDL viết trong code; thay đổi DB phải nằm trong file migrations/*.sql")
    if not migrations and not problems:
        return None
    attention = sorted({name for m in migrations for name in sensitive_tables(m["sql"])})
    return {"migrations": migrations, "files": sorted(set(files)), "problems": problems, "attention": attention}


DIFF_CAP = 20_000
_FRONTEND_ONLY = re.compile(r"^(?:public|tests?)/")
_PUBLIC_CODE = re.compile(r"^public/.+\.[cm]?js$")
_SERVER_CODE = re.compile(r"^server/.+\.[cm]?js$")
# Literal specifiers only: quotes, or a backtick template without ${}.
_SPEC = r"""(?:'([^']+)'|"([^"]+)"|`([^`$]+)`)"""
_IMPORT = re.compile(rf"(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*){_SPEC}")
_PATH_LITERAL = re.compile(r"""(?:'([^'\s]+)'|"([^"\s]+)"|`([^`$\s]+)`)""")
PULLED_NOTE = "\n# --- pulled in by an added import (full current content, not part of the diff): {path}\n"
CLIP_NOTE = "\n# --- clipped at {cap} characters ---\n"
_DML = re.compile(r"(?<!\w)(?:insert\s+into|update\s+[\w.\"]+\s+set|delete\s+from)\b", re.I)
ADMIN_ROLE = path_policy.ADMIN_ROLE


def _imports(path: str, text: str):
    """Repo paths a module imports through literal relative specifiers (static, import(), require)."""
    for spec in ("".join(groups) for groups in _IMPORT.findall(text)):
        if spec.startswith("."):
            yield posixpath.normpath(posixpath.join(posixpath.dirname(path), spec))


@lru_cache(maxsize=8)
def server_imported_public(source: str, sha: str) -> frozenset[str] | None:
    """public/ modules server/** code loads at base, transitively; None when the tree cannot be read (callers fail closed)."""
    from repositories import repo_at_commit
    try:
        tree = repo_at_commit.at(source, sha)
        files = tree.files()
        server = sorted(f for f in files if _SERVER_CODE.match(f))
        seen, found = set(server), set()
        public_code = sorted(f for f in files if _PUBLIC_CODE.match(f))
        # Computed loads (resolve(__dirname, '../../public/x', p) then import()): a relative literal naming a public file or
        # folder counts, and other literals in the same file also resolve against each such public folder (seed registries).
        for path, body in tree.read_many(server).items():
            specs = ["".join(groups) for groups in _PATH_LITERAL.findall((body or b"").decode("utf-8", "replace"))]
            folders = []
            for spec in specs:
                if not spec.startswith("."):
                    continue
                target = posixpath.normpath(posixpath.join(posixpath.dirname(path), spec)).rstrip("/")
                if target.startswith("public/"):
                    found.update(f for f in public_code if f == target or f.startswith(target + "/"))
                    if target not in files:
                        folders.append(target)
            for folder in folders:
                found.update(t for spec in specs if (t := posixpath.normpath(posixpath.join(folder, spec))) in files
                             and _PUBLIC_CODE.match(t))
        todo = server + sorted(found)
        seen |= found
        while todo:
            blobs = tree.read_many(todo)
            todo = []
            for path, body in blobs.items():
                for target in _imports(path, (body or b"").decode("utf-8", "replace")):
                    if target.startswith("public/") and target in files and target not in seen:
                        seen.add(target)
                        found.add(target)
                        todo.append(target)
        return frozenset(found)
    except Exception:  # noqa: BLE001 - unreadable base: every public module counts as server code
        return None


def _runs_on_server(path: str, added: list[str], server_public) -> bool:
    """Diff section counts as backend: outside public/ and top-level tests, a public module the server loads,
    a public module that newly imports outside public/, or a top-level test that issues DB statements."""
    if path.startswith("public/"):
        if not _PUBLIC_CODE.match(path):
            return False
        if server_public is None or path in server_public:
            return True
        return any(not target.startswith("public/") for line in added for target in _imports(path, line))
    if _FRONTEND_ONLY.match(path):
        return any(_INLINE.search(line) or _DML.search(line) for line in added)
    return True


def _pulled(roots: dict[str, list[str]], diffed: set[str], read) -> dict[str, str]:
    """Public modules a held file newly imports, transitively, with full current content; files already in the diff skipped."""
    out: dict[str, str] = {}
    todo = [t for path, added in roots.items() for line in added for t in _imports(path, line) if _PUBLIC_CODE.match(t)]
    while todo:
        path = todo.pop()
        if path in out or path in diffed:
            continue
        text = read(path) if read else None
        out[path] = text if text is not None else "(không đọc được nội dung)"
        todo += [t for t in _imports(path, text or "") if _PUBLIC_CODE.match(t)]
    return out


def backend_change(diffs: list[dict], server_public: frozenset[str] | None = frozenset(), read=None) -> dict | None:
    """Files that run on the server with their diff text, plus modules they newly pull in (full content); clipped.
    read(path) -> current text at the candidate head, or None."""
    files, parts, roots, diffed = [], [], {}, set()
    for item in diffs:
        for section in ("diff --git " + chunk for chunk in item.get("diff", "").split("diff --git ")[1:]):
            path = section.split("\n", 1)[0].split(" b/", 1)[-1].replace("\\", "/")
            diffed.add(path)
            added = [line[1:] for line in section.splitlines() if line.startswith("+") and not line.startswith("+++")]
            if _runs_on_server(path, added, server_public):
                files.append(path)
                parts.append(section)
                roots[path] = added
    if not files:
        return None
    pulled = _pulled(roots, diffed, read)
    parts += [PULLED_NOTE.format(path=path) + text for path, text in sorted(pulled.items())]
    text = "".join(parts)
    clipped = len(text) > DIFF_CAP
    if clipped:
        text = text[:DIFF_CAP] + CLIP_NOTE.format(cap=DIFF_CAP)
    return {"files": sorted(set(files) | set(pulled)), "diff": text, **({"clipped": True} if clipped else {})}


def push_hold(diffs: list[dict], role: str, server_public: frozenset[str] | None = frozenset()) -> str | None:
    """Kind of admin approval the real diff needs before any push: db, backend, both; None = push freely."""
    kinds = [kind for kind, needed in (("db", review(diffs, role) is not None),
                                       ("backend", role != ADMIN_ROLE and backend_change(diffs, server_public) is not None))
             if needed]
    return "both" if len(kinds) == 2 else kinds[0] if kinds else None


def run_sandbox(sql: str, should_stop=None, base_sql: str = "") -> dict:
    """db_check profile on the sandbox runner; report of gate5.db_check.run_db_check."""
    from settings import get_settings
    from verification.sandbox import SandboxSession
    lease_ok = (lambda: not should_stop()) if should_stop else None
    return db_check.run_db_check(sql, enabled=get_settings().db_check, base_sql=base_sql,
                                 session_factory=lambda root: SandboxSession(root, lease_ok=lease_ok))


def _outcome(sql: str, should_stop, base_sql: str = "") -> dict:
    """Sandbox run -> {status: passed|blocked|transient, reason, sandbox}."""
    report = run_sandbox(sql, should_stop, base_sql) if base_sql else run_sandbox(sql, should_stop)
    sandbox = {k: report.get(k) for k in ("status", "schema_diff", "checks", "tests", "error")}
    if report.get("status") == "passed":
        return {"status": "passed", "reason": None, "sandbox": sandbox}
    kind = "transient" if report.get("status") in ("disabled", "db_check_unavailable") else "blocked"
    detail = "; ".join(report.get("violations") or []) or report.get("error") or report.get("status")
    return {"status": kind, "reason": f"migration chưa chạy được trên Postgres sandbox ({report.get('status')}): {detail}"[:800],
            "sandbox": sandbox}


BASE_SCHEMA = Path(__file__).resolve().parents[3] / "server" / "db-required-schema.json"
# Tables a data INSERT may never target: audit trail and board/AI logs.
_INTERNAL = re.compile(r"^(?:admin_db_audit|ai_decisions|ai_prompt_log|ai_token_usage|schema_migrations)$")


@lru_cache(maxsize=1)
def base_tables() -> dict[str, list[str]]:
    """Platform tables and their columns, from server/db-required-schema.json."""
    return json.loads(BASE_SCHEMA.read_text(encoding="utf-8"))["tables"]


def base_schema_sql() -> str:
    """CREATE TABLE per platform table, text columns: lets the sandbox PG resolve a data INSERT's table and columns."""
    q = chr(34)
    return ";\n".join(f'CREATE TABLE {q}{table}{q} ({", ".join(f"{q}{col}{q} text" for col in cols)})'
                      for table, cols in sorted(base_tables().items())) + ";"


def insert_problems(sql: str) -> list[str]:
    """Why sql is not one literal INSERT ... ON CONFLICT DO NOTHING into an existing, non-sensitive platform table."""
    stmts = db_check._statements(sql)
    if len(stmts) != 1:
        return ["data INSERT phải đúng một câu lệnh"]
    out = [*db_check.violations(sql), *idempotency_problems(sql)]
    if len(sql) > SQL_CAP:
        out.append(f"INSERT {len(sql)} ký tự, {TOO_LARGE}")
    match = _TABLE.match(stmts[0].upper())
    if not stmts[0].upper().startswith("INSERT INTO ") or not match:
        return [*out, "chỉ chấp nhận INSERT INTO"]
    table = match.group(1).strip('"').split(".")[-1].lower()
    if table not in base_tables():
        out.append(f"bảng {table} không có trong schema base")
    elif _INTERNAL.match(table) or sensitive_tables(stmts[0]):
        out.append(f"bảng {table} thuộc nhóm nhạy cảm hoặc nội bộ, không ghi bằng bước dữ liệu")
    return out


def evaluate_insert(sql: str, should_stop=None) -> dict:
    """Sandbox verdict for a data INSERT: {status: passed|blocked|transient, reason}; base schema loaded first."""
    if problems := insert_problems(sql):
        return {"status": "blocked", "reason": "INSERT bị chặn: " + "; ".join(problems)[:800]}
    out = _outcome(sql, should_stop, base_schema_sql())
    return {"status": out["status"], "reason": out["reason"]}


def evaluate(diffs: list[dict], role: str = "student", should_stop=None) -> dict | None:
    """None = no DB change. Else {status: passed|blocked|transient, reason, db_change}; only passed may wait for the admin."""
    change = review(diffs, role)
    if change is None:
        return None
    if change["problems"]:
        return {"status": "blocked", "reason": "thay đổi DB bị chặn: " + "; ".join(change["problems"])[:800], "db_change": None}
    sql = ";\n".join(m["sql"].rstrip().rstrip(";") for m in change["migrations"]) + ";"
    out = _outcome(sql, should_stop)
    if out["status"] == "passed":
        return {"status": "passed", "reason": None, "db_change": {**change, "sandbox": out["sandbox"]}}
    return {"status": out["status"], "reason": out["reason"], "db_change": None}
