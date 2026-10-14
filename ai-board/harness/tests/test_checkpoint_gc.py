"""TTL + dọn thủ công checkpoint: hết hạn theo run, theo ticket, bảo vệ bước chưa đối chiếu. PG thật cần TEST_PG_URL."""
import pytest

from conftest import connect
from repositories.tool_steps import Checkpoint, DDL, PgSteps, purge_checkpoints, ttl_days

DAY = 86_400_000
NOW = 100 * DAY


def seed(dsn, scope, *, age_days=0, steps=("done",)):
    """1 run (ledger + 1 subtask) của scope, mọi dòng cũ age_days ngày."""
    cp = Checkpoint(dsn, scope)
    cp.save(_Budget())
    store = cp.store("sha", 1)
    store.save_pins({"p": 1})
    for n, status in enumerate(steps):
        store.intent(n, "edit_file", {"n": n})
        if status != "intent":
            store.done(n, "edit_file", {"n": n}, "ok", "ok")
        if status in ("unknown", "compensate"):
            store.mark(n, status)
    with connect(dsn) as con:
        con.execute("UPDATE tool_run SET updated_at=%s WHERE proposal_id = ANY(%s)", (NOW - age_days * DAY, list(cp.keys)))
        con.execute("UPDATE tool_step SET updated_at=%s WHERE proposal_id = ANY(%s)", (NOW - age_days * DAY, list(cp.keys)))
    return cp


class _Budget:
    def snapshot(self):
        return {"model_calls": 1}


def scopes(dsn):
    with connect(dsn) as con:
        return {r[0] for r in con.execute("SELECT run_scope FROM tool_run")}


@pytest.fixture
def dsn(db_file):
    with connect(db_file) as con:
        con.execute(DDL)
    return db_file


def test_run_scope_is_stored_for_ledger_and_subtask_keys(dsn):
    seed(dsn, "ticket-7:abc")
    assert scopes(dsn) == {"ticket-7:abc"}


def test_dry_run_lists_expired_runs_and_deletes_nothing(dsn):
    seed(dsn, "ticket-1:old", age_days=40)
    seed(dsn, "ticket-2:new", age_days=2)
    report = purge_checkpoints(dsn, now=NOW)
    assert [r["scope"] for r in report] == ["ticket-1:old"] and not report[0]["deleted"]
    assert scopes(dsn) == {"ticket-1:old", "ticket-2:new"}


def test_apply_deletes_whole_expired_run_including_its_ledger(dsn):
    seed(dsn, "ticket-1:old", age_days=40)
    seed(dsn, "ticket-2:new", age_days=2)
    report = purge_checkpoints(dsn, apply=True, now=NOW)
    assert report[0]["deleted"] and len(report[0]["keys"]) == 2
    assert scopes(dsn) == {"ticket-2:new"}
    with connect(dsn) as con:
        assert con.execute("SELECT COUNT(*) FROM tool_step WHERE proposal_id = ANY(%s)", (report[0]["keys"],)).fetchone()[0] == 0


def test_ttl_argument_overrides_default(dsn):
    seed(dsn, "ticket-1:a", age_days=5)
    assert purge_checkpoints(dsn, now=NOW) == []
    assert len(purge_checkpoints(dsn, ttl=3, now=NOW)) == 1


@pytest.mark.parametrize("status", ["unknown", "intent", "compensate"])
def test_run_with_an_open_step_is_never_deleted(dsn, status):
    seed(dsn, "ticket-1:open", age_days=400, steps=("done", status))
    report = purge_checkpoints(dsn, apply=True, now=NOW)
    assert report[0]["protected"] and not report[0]["deleted"]
    assert purge_checkpoints(dsn, ticket_id=1, apply=True, now=NOW)[0]["protected"]
    assert scopes(dsn) == {"ticket-1:open"}


def test_resolved_steps_do_not_protect(dsn):
    cp = seed(dsn, "ticket-1:r", age_days=40, steps=("unknown",))
    cp.store("sha", 1).reconcile(0, "not_applied", "op")
    with connect(dsn) as con:
        con.execute("UPDATE tool_step SET updated_at=%s", (NOW - 40 * DAY,))
    assert purge_checkpoints(dsn, apply=True, now=NOW)[0]["deleted"]


def test_by_ticket_ignores_age_and_does_not_match_a_longer_id(dsn):
    seed(dsn, "ticket-1:a", age_days=1)
    seed(dsn, "ticket-12:b", age_days=1)
    report = purge_checkpoints(dsn, ticket_id=1, apply=True, now=NOW)
    assert [r["scope"] for r in report] == ["ticket-1:a"]
    assert scopes(dsn) == {"ticket-12:b"}


def test_run_without_scope_is_grouped_by_its_own_key(dsn):
    store = PgSteps(dsn, 99, 0)
    store.save_pins({"p": 1})
    with connect(dsn) as con:
        con.execute("UPDATE tool_run SET updated_at=%s", (NOW - 50 * DAY,))
    assert purge_checkpoints(dsn, apply=True, now=NOW)[0]["deleted"]


def test_ttl_env_parsing():
    assert ttl_days({}) == 30 and ttl_days({"AI_BOARD_CHECKPOINT_TTL_DAYS": "7"}) == 7
    assert ttl_days({"AI_BOARD_CHECKPOINT_TTL_DAYS": "x"}) == 30 and ttl_days({"AI_BOARD_CHECKPOINT_TTL_DAYS": "0"}) == 30


def test_cli_is_dry_run_unless_apply(dsn, monkeypatch, capsys):
    import checkpoint_gc
    seed(dsn, "ticket-3:x", age_days=1)
    monkeypatch.setenv("DATABASE_URL", dsn)
    assert checkpoint_gc.main(["--ticket", "3"]) == 0
    assert scopes(dsn) == {"ticket-3:x"}
    assert checkpoint_gc.main(["--ticket", "3", "--apply"]) == 0
    assert scopes(dsn) == set()
