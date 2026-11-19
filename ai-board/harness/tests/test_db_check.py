"""Board migration runs on a throwaway DB first: destructive SQL blocked before any DB call, real PG drops its DB after."""
import os

import psycopg
import pytest

from verification import db_check

ADDITIVE = "CREATE TABLE IF NOT EXISTS faq_items (id bigserial PRIMARY KEY, question text NOT NULL);\n" \
           "ALTER TABLE faq_items ADD COLUMN IF NOT EXISTS slug text;\n"


class FakeRunner:
    def __init__(self, checks_ok=True):
        self.calls, self.checks_ok = [], checks_ok

    def run(self, sql, verify_sql):
        self.calls.append(sql)
        return {"schema_diff": {"added_tables": ["faq_items"]}, "checks": [{"sql": s, "ok": self.checks_ok} for s in verify_sql]}


@pytest.mark.parametrize("sql", [
    "DROP TABLE faq_items;",
    "ALTER TABLE faq_items DROP COLUMN question;",
    "TRUNCATE faq_items;",
    "DELETE FROM faq_items WHERE id > 0;",
    "ALTER TABLE faq_items RENAME TO faq;",
    "ALTER TABLE faq_items ALTER COLUMN question TYPE int;",
    "UPDATE faq_items SET question = 'x';",
])
def test_destructive_sql_is_blocked(sql):
    assert db_check.violations(sql)


def test_additive_sql_passes_and_comments_are_ignored():
    assert db_check.violations(ADDITIVE) == []
    assert db_check.violations("-- DROP TABLE old;\n/* TRUNCATE x; */\n" + ADDITIVE) == []


def test_blocked_migration_never_reaches_runner():
    runner = FakeRunner()
    report = db_check.check_migration("DROP TABLE faq_items;", runner)
    assert report["status"] == "blocked" and report["violations"] and runner.calls == []


def test_additive_migration_passes_when_checks_pass():
    runner = FakeRunner()
    report = db_check.check_migration(ADDITIVE, runner, verify_sql=["SELECT to_regclass('faq_items')"])
    assert report["status"] == "passed" and report["schema_diff"] == {"added_tables": ["faq_items"]}
    assert runner.calls == [ADDITIVE]


def test_failing_check_fails_report():
    report = db_check.check_migration(ADDITIVE, FakeRunner(checks_ok=False), verify_sql=["SELECT 1"])
    assert report["status"] == "failed"


def _admin_dsn():
    dsn = os.environ.get("TEST_PG_URL")
    if not dsn:
        pytest.skip("TEST_PG_URL chưa đặt (cần PostgreSQL vứt đi)")
    return dsn


def _leftover_check_dbs(dsn):
    with psycopg.connect(dsn, autocommit=True) as c:
        return c.execute("SELECT datname FROM pg_database WHERE datname LIKE 'dbcheck\\_%'").fetchall()


def test_pg_runner_applies_additive_and_reports_schema_diff():
    dsn = _admin_dsn()
    report = db_check.check_migration(ADDITIVE, db_check.PgRunner(dsn), verify_sql=["SELECT to_regclass('public.faq_items')"])
    assert report["status"] == "passed"
    assert "faq_items" in report["schema_diff"]["added_tables"]
    assert "slug" in report["schema_diff"]["added_columns"]["faq_items"]
    assert _leftover_check_dbs(dsn) == []


def test_pg_runner_failed_migration_still_drops_database():
    dsn = _admin_dsn()
    report = db_check.check_migration("CREATE TABLE broken (;", db_check.PgRunner(dsn))
    assert report["status"] == "failed" and report["error"]
    assert _leftover_check_dbs(dsn) == []


@pytest.mark.parametrize("sql", [
    "ALTER TABLE faq_items ADD COLUMN a int, DROP COLUMN question;",
    "ALTER TABLE faq_items ADD COLUMN a int NOT NULL;",
    "ALTER TABLE faq_items ALTER COLUMN question SET NOT NULL;",
    "ALTER TABLE faq_items ADD COLUMN a int; DROP TABLE faq_items",
    "INSERT INTO faq_items (id, question) VALUES (1, 'x') ON CONFLICT (id) DO UPDATE SET question = 'y';",
    "DELETE FROM faq_items;",
    "UPDATE faq_items SET question = 'x' WHERE id = 1;",
    "DO $$ BEGIN DROP TABLE faq_items; END $$;",
    "CREATE TABLE copy AS SELECT * FROM faq_items;",
    "DROP INDEX IF EXISTS faq_idx;",
])
def test_sneaky_destructive_sql_is_blocked(sql):
    assert db_check.violations(sql)


@pytest.mark.parametrize("sql", [
    "ALTER TABLE faq_items ADD COLUMN a int NOT NULL DEFAULT 0;",
    "ALTER TABLE faq_items ADD COLUMN IF NOT EXISTS a text, ADD COLUMN b int;",
    "ALTER TABLE faq_items ADD COLUMN a text CHECK (a <> 'not null');",
    "CREATE UNIQUE INDEX IF NOT EXISTS faq_slug ON faq_items (slug);",
    "INSERT INTO faq_items (id, question) VALUES (1, 'DROP TABLE x; -- not code');",
    "INSERT INTO faq_items (id, question) VALUES (2, $q$a; DROP TABLE x$q$);",
])
def test_additive_variants_pass(sql):
    assert db_check.violations(sql) == []


def test_semicolon_inside_string_does_not_hide_a_second_statement():
    assert db_check.violations("INSERT INTO t (a) VALUES ('x;'); DROP TABLE t;")


class _InitRaceSession:
    """Ready over the socket during initdb; psql fails until the TCP server is up."""

    def __init__(self):
        self.tcp_ready = False

    def exec(self, argv, timeout):
        if argv[:3] == ["docker", "exec", db_check.CONTAINER] and argv[3] == "sh":
            self.tcp_ready = "127.0.0.1" in argv[-1]
            return {"rc": 0, "stdout": "", "stderr": ""}
        if "psql" in argv:
            if not self.tcp_ready:
                return {"rc": 2, "stdout": "", "stderr": "FATAL: the database system is starting up"}
            return {"rc": 0, "stdout": "", "stderr": ""}
        return {"rc": 0, "stdout": "", "stderr": ""}


def test_ready_waits_for_final_tcp_server_not_init_socket():
    runner = db_check.SandboxPgRunner(_InitRaceSession())
    assert runner.run("CREATE TABLE t (a int);", [])["checks"] == []
    assert db_check.exec_allowed(db_check._READY)
