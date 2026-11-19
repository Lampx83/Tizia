"""db_check profile in the microVM: fake sandbox session, no VM, no docker, no network."""
import pytest

from runtime import limits, sandbox_tool
from settings import get_settings
from verification import db_check
from verification.sandbox import SandboxError

SQL = "CREATE TABLE IF NOT EXISTS faq_items (id bigserial PRIMARY KEY);"
OK = {"rc": 0, "stdout": "", "stderr": "", "truncated": False, "timed_out": False}
BEFORE = "users|id|bigint|NO\n"
AFTER = "faq_items|id|bigint|NO\nusers|id|bigint|NO\n"
ALLOWED = limits.sandbox_tool()["allowed_argv"]


class FakeSession:
    """exec() replies by argv substring; records every argv."""

    def __init__(self, replies=None, fail_enter=None, fail_exit=None):
        self.replies, self.execs, self.fail_enter, self.fail_exit, self.exited = replies or {}, [], fail_enter, fail_exit, False
        self.snapshots = [BEFORE, AFTER]

    def __enter__(self):
        if self.fail_enter:
            raise self.fail_enter
        return self

    def __exit__(self, *_):
        self.exited = True
        if self.fail_exit:
            raise self.fail_exit
        return False

    def exec(self, argv, timeout):
        self.execs.append(list(argv))
        flat = " ".join(argv)
        for needle, reply in self.replies.items():
            if needle in flat:
                return {**OK, **reply}
        if "information_schema" in flat:
            return {**OK, "stdout": self.snapshots.pop(0)}
        return dict(OK)


def run(session, sql=SQL, **kw):
    return db_check.run_db_check(sql, enabled=True, session_factory=lambda stage: session, **kw)


def test_flag_default_off(monkeypatch):
    monkeypatch.delenv("AI_BOARD_DB_CHECK", raising=False)
    assert get_settings().db_check is False
    monkeypatch.setenv("AI_BOARD_DB_CHECK", "1")
    assert get_settings().db_check is True


def test_disabled_never_creates_a_session():
    def boom(stage):
        raise AssertionError("session created")
    assert db_check.run_db_check(SQL, enabled=False, session_factory=boom)["status"] == "disabled"


def test_additive_migration_passes_with_schema_diff_and_vm_destroyed():
    session = FakeSession({"to_regclass": {"stdout": "faq_items\n"}})
    report = run(session, verify_sql=["SELECT to_regclass('public.faq_items')"])
    assert report["status"] == "passed" and report["profile"] == "db_check"
    assert report["schema_diff"]["added_tables"] == ["faq_items"]
    assert report["checks"] == [{"sql": "SELECT to_regclass('public.faq_items')", "ok": True}]
    assert session.exited
    assert session.execs[-1][:3] == ["docker", "rm", "-f"]


def test_destructive_migration_blocked_before_any_exec():
    session = FakeSession()
    report = run(session, sql="DROP TABLE users;")
    assert report["status"] == "blocked" and report["violations"] and session.execs == []


def test_missing_postgres_image_reports_unavailable_without_starting_anything():
    session = FakeSession({"image inspect": {"rc": 1}})
    report = run(session)
    assert report["status"] == "db_check_unavailable"
    assert not any(a[:2] == ["docker", "run"] for a in session.execs)


def test_runner_not_configured_is_unavailable():
    report = run(FakeSession(fail_enter=SandboxError("not_configured", "config")))
    assert report["status"] == "db_check_unavailable" and report["error"] == "not_configured"


def test_cleanup_unconfirmed_propagates():
    with pytest.raises(SandboxError):
        run(FakeSession(fail_exit=SandboxError("cleanup_unconfirmed", "destroy")))


def test_migration_error_fails_and_container_removed():
    session = FakeSession({"ON_ERROR_STOP": {"rc": 3, "stderr": "ERROR: syntax error"}})
    report = run(session)
    assert report["status"] == "failed" and "syntax error" in report["error"]
    assert session.execs[-1][:3] == ["docker", "rm", "-f"]


def test_failing_verify_check_fails_report():
    session = FakeSession({"SELECT 1": {"stdout": "f\n"}})
    assert run(session, verify_sql=["SELECT 1"])["status"] == "failed"


def test_target_is_inside_the_sandbox_only():
    session = FakeSession()
    run(session)
    for argv in session.execs:
        assert argv[0] in ("docker", "guest-boot.sh")
        assert "--network" not in argv or argv[argv.index("--network") + 1] == "none"
        assert not any("://" in token for token in argv)


@pytest.mark.parametrize("dsn", [
    "postgresql://u:p@db.example.com:5432/tizia", "postgresql://u@10.0.0.5/tizia", "postgresql://u@postgres:5432/tizia"])
def test_non_local_target_refused(dsn):
    with pytest.raises(db_check.TargetRefused):
        db_check.assert_sandbox_target(dsn)


@pytest.mark.parametrize("dsn", ["postgresql://u@127.0.0.1:5432/dbcheck", "postgresql://u@localhost/dbcheck", "postgresql:///dbcheck"])
def test_local_target_accepted(dsn):
    db_check.assert_sandbox_target(dsn)


def test_related_tests_run_in_same_vm_and_failure_fails_report():
    argv = ["node", "--test", "test/a.test.js"]
    report = run(FakeSession(), test_argv=[argv], allowed_argv=ALLOWED)
    assert report["tests"] == [{"argv": argv, "rc": 0}] and report["status"] == "passed"
    assert run(FakeSession({"--test": {"rc": 1}}), test_argv=[argv], allowed_argv=ALLOWED)["status"] == "failed"


def test_test_argv_outside_allowlist_is_refused_before_vm():
    session = FakeSession()
    with pytest.raises(sandbox_tool.Refused):
        run(session, test_argv=[["sh", "-c", "id"]], allowed_argv=ALLOWED)
    assert session.execs == []


def test_attach_to_admin_job_keeps_admin_as_applier():
    report = run(FakeSession())
    job = {"kind": "data", "payload": {"migration": SQL}, "evidence": {"x": 1}}
    out = db_check.attach_to_job(job, report)
    assert out["evidence"]["x"] == 1 and out["evidence"]["db_check"]["status"] == "passed"
    assert out["evidence"]["db_check"]["schema_diff"]["added_tables"] == ["faq_items"]
    assert out["payload"] == job["payload"] and "db_check" not in job["evidence"]
    assert out["apply_by"] == "admin"


def test_guest_dockerd_booted_before_any_docker_call():
    session = FakeSession()
    run(session)
    assert session.execs[0] == ["guest-boot.sh"]


def test_failed_guest_boot_is_unavailable_not_missing_image():
    session = FakeSession({"guest-boot.sh": {"rc": 1}})
    report = run(session)
    assert report["status"] == "db_check_unavailable" and "dockerd" in report["error"]
    assert session.execs == [["guest-boot.sh"]]


def test_every_exec_of_a_run_matches_the_db_check_policy():
    session = FakeSession({"to_regclass": {"stdout": "faq_items\n"}})
    run(session, verify_sql=["SELECT to_regclass('public.faq_items')"])
    assert len(session.execs) > 5 and all(db_check.exec_allowed(argv) for argv in session.execs)


START = ["docker", "run", "-d", "--name", "dbcheck", "--network", "none", "-e", "POSTGRES_HOST_AUTH_METHOD=trust", "postgres:16-alpine"]
PSQL = ["docker", "exec", "dbcheck", "psql", "-U", "postgres", "-At", "-F", "|", "-c", "SELECT 1"]


@pytest.mark.parametrize("argv", [
    [*START[:6], "bridge", *START[7:]],
    [*START[:6], "host", *START[7:]],
    [*START[:-1], "postgres:17-alpine"],
    [*START[:-1], "postgres:latest"],
    [*START[:-1], "-v", "/:/host", "postgres:16-alpine"],
    [*START[:-1], "--privileged", "postgres:16-alpine"],
    [*START[:-1], "-p", "5432:5432", "postgres:16-alpine"],
    [*START[:4], "other", *START[5:]],
    ["docker", "pull", "postgres:16-alpine"],
    ["docker", "exec", "other", *PSQL[3:]],
    [*PSQL[:-2], "-h", "db.example.com", "-c", "SELECT 1"],
    ["docker", "exec", "dbcheck", "sh", "-c", "id"],
    ["docker", "rm", "-f", "other"],
    ["sh", "-c", "guest-boot.sh"],
])
def test_near_variants_of_the_db_check_commands_are_refused(argv):
    assert not db_check.exec_allowed(argv)


def test_runner_refuses_an_argv_outside_the_policy_before_exec():
    session = FakeSession()
    with pytest.raises(db_check.ExecRefused):
        db_check.SandboxPgRunner(session)._exec(["docker", "run", "--network", "host", "postgres:16-alpine"])
    assert session.execs == []
