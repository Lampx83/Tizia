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
