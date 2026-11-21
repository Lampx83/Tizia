"""AI_BOARD_REQUESTER_FULLSTACK_DB: every role edits mounted contexts and public/, refused areas stay shut, a candidate with a DB
change runs on the sandbox Postgres and waits for an admin before any push. Flag off = unchanged."""
import subprocess
from pathlib import Path

import pytest

import path_policy
from gates import brainstorm
from runtime import levels
from services import db_approval
from test_http_worker import FakeTransport, PASSING, PublishingCandidates, _publishing_worker
from worker import HttpWorker, WorkerClient, execute_pre_pr

FLAG = "AI_BOARD_REQUESTER_FULLSTACK_DB"
CONTEXT = "server/contexts/teacher/quick-notes.js"
MIGRATION = "server/contexts/teacher/migrations/001-ghi-chu-nhanh.sql"
GOOD_SQL = ("CREATE TABLE IF NOT EXISTS ghi_chu_nhanh (id SERIAL PRIMARY KEY, noi_dung TEXT NOT NULL, "
            "tao_luc TIMESTAMPTZ NOT NULL DEFAULT now());\n"
            "CREATE INDEX IF NOT EXISTS ghi_chu_nhanh_tao_luc ON ghi_chu_nhanh (tao_luc);")
REFUSED_ALL = ["server/index.js", "server/db.js", "server/db/pool.js", "server/contexts/identity/index.js",
               "server/contexts/security/guard.js", "server/contexts/payment/index.js", "server/contexts/billing/x.js",
               "server/contexts/economy/x.js", "server/contexts/auth/x.js", "server/contexts/session/x.js",
               "server/ai-board/guard-lexicon.json", "ai-board/harness/gates/x.py", "Dockerfile", "docker-compose.yml",
               ".env", ".env.production", ".github/workflows/ci.yml"]
REFUSED_REQUESTER = ["server/contexts/admin/db-admin.js", "server/contexts/ai-board-intake/index.js",
                     "server/contexts/integration/x.js", "server/contexts/engagement/league.js",
                     "server/contexts/feature-gate/index.js", "server/contexts/safety/profanity-vi.js",
                     "server/contexts/_shared/x.js", "server/contexts/registry.js", "public/js/ai-board-chat.js",
                     "public/admin-request.html", "package.json", "package-lock.json"]


@pytest.fixture
def flag(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.setenv("AI_BOARD_DB_CHECK", "1")


def _new_file(path: str, body: str) -> str:
    lines = body.splitlines()
    return (f"diff --git a/{path} b/{path}\nnew file mode 100644\n--- /dev/null\n+++ b/{path}\n@@ -0,0 +1,{len(lines)} @@\n"
            + "".join(f"+{line}\n" for line in lines))


def _edit(path: str, added: list[str], removed: list[str] = ()) -> str:
    return (f"diff --git a/{path} b/{path}\n--- a/{path}\n+++ b/{path}\n@@ -1 +1 @@\n"
            + "".join(f"-{line}\n" for line in removed) + "".join(f"+{line}\n" for line in added))


FE_BE_DIFF = (_new_file("public/ghi-chu-nhanh.html", "<ul id=\"note-list\"></ul>")
              + _new_file(CONTEXT, "export function attachQuickNotes(router) { router.get('/api/ghi-chu-nhanh', () => {}); }")
              + _edit("server/contexts/teacher/index.js", ["import { attachQuickNotes } from './quick-notes.js';"]))
DB_DIFF = FE_BE_DIFF + _new_file(MIGRATION, GOOD_SQL)


# ── zone ──

def test_flag_defaults_off():
    from settings import Settings
    assert Settings().requester_fullstack_db is False


def test_flag_off_student_keeps_generated_only(monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    assert path_policy.may_edit(CONTEXT, "student") is False
    assert path_policy.may_edit("public/x.html", "student") is False
    assert path_policy.refused("server/index.js") is False
    assert path_policy.context_migration(MIGRATION) is False
    assert brainstorm.infer_layer(MIGRATION) == "wiring"
    assert db_approval.migration_path(MIGRATION) is False


def test_student_gets_the_admin_zone(flag):
    for role in ("student", "teacher", "pupil", "admin"):
        assert path_policy.may_edit(CONTEXT, role) is True, role
        assert path_policy.may_edit("public/ghi-chu-nhanh.html", role) is True, role
        decision = levels.write_check(CONTEXT, (), None, role)
        assert decision == {"allow": True, "level": levels.SURFACE, "reason": ""}, role
    assert levels.requirements({"subtasks": [{"file": CONTEXT, "verify": "node --test", "title": "t"}]}, None, frozenset()) == []


def test_existing_context_importing_db_needs_no_elevation(flag):
    repo = Path(__file__).resolve().parents[3]
    sha = subprocess.run(["git", "rev-parse", "HEAD"], cwd=repo, check=True, capture_output=True, text=True).stdout.strip()
    plan = {"subtasks": [{"file": "server/contexts/teacher/index.js", "verify": "node --test", "title": "t"}]}
    assert levels.requirements(plan, levels.source_reader(str(repo), sha), role="student") == []


def test_refused_list_blocks_every_role(flag):
    for path in REFUSED_ALL:
        for role in ("admin", "student"):
            assert path_policy.refused(path, role), (path, role)
            assert path_policy.may_edit(path, role) is False, (path, role)
            assert levels.write_check(path, (), None, role)["allow"] is False, (path, role)


def test_requester_extra_refusals(flag):
    for path in REFUSED_REQUESTER:
        assert path_policy.may_edit(path, "student") is False, path
        assert levels.write_check(path, (), None, "student")["allow"] is False, path
    assert path_policy.may_edit("server/contexts/admin/db-admin.js", "admin") is True, "admin zone unchanged for admin"


def test_check_files_accepts_context_migration_and_new_context_file(flag, tmp_path):
    repo = tmp_path / "repo"
    (repo / "server/contexts/teacher").mkdir(parents=True)
    (repo / "server/contexts/teacher/index.js").write_text("export const plugin = {};\n", encoding="utf-8")
    git = lambda *a: subprocess.run(["git", *a], cwd=repo, check=True, capture_output=True, text=True).stdout.strip()
    git("init", "-q")
    git("add", "-A")
    git("-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "base")
    sha = git("rev-parse", "HEAD")
    plan = {"subtasks": [{"title": "db", "file": MIGRATION, "verify": "node --test", "size": "small"},
                         {"title": "be", "file": CONTEXT, "verify": "node --test", "size": "small"},
                         {"title": "wire", "file": "server/contexts/teacher/index.js", "verify": "node --test", "size": "small"}]}
    brainstorm.check_files(plan, str(repo), sha)
    assert [st["layer"] for st in plan["subtasks"]] == ["db", "backend", "backend"]
    unmounted = {"subtasks": [{"title": "be", "file": "server/contexts/ghi-chu/index.js", "verify": "node --test", "size": "small"}]}
    with pytest.raises(ValueError, match="không có trong repo"):
        brainstorm.check_files(unmounted, str(repo), sha)
    with pytest.raises(ValueError, match="nằm ngoài vùng"):
        brainstorm.check_files({"subtasks": [{"title": "x", "file": "server/contexts/admin/db-admin.js", "verify": "node --test",
                                              "size": "small"}]}, str(repo), sha)


# ── DB review ──

def test_fe_be_only_diff_has_no_db_change(flag):
    assert db_approval.review([{"diff": FE_BE_DIFF}]) is None


def test_additive_idempotent_migration_passes_review(flag):
    change = db_approval.review([{"diff": DB_DIFF}])
    assert change["problems"] == []
    assert change["migrations"] == [{"path": MIGRATION, "sql": GOOD_SQL}]
    assert MIGRATION in change["files"] and CONTEXT in change["files"]


@pytest.mark.parametrize("sql", [
    "DROP TABLE users;",
    "ALTER TABLE users RENAME TO members;",
    "ALTER TABLE users RENAME COLUMN name TO full_name;",
    "ALTER TABLE users ALTER COLUMN age TYPE bigint;",
    "ALTER TABLE users DROP COLUMN age;",
    "TRUNCATE users;",
    "DELETE FROM users;",
    "DELETE FROM users WHERE id = 1;",
    "UPDATE users SET role = 'admin';",
    "CREATE TABLE ghi_chu (id int);",
    "ALTER TABLE users ADD COLUMN nick text;",
    "INSERT INTO ghi_chu (id) VALUES (1);",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS age int NOT NULL;",
])
def test_non_additive_or_non_idempotent_sql_is_blocked_before_the_admin(flag, sql):
    change = db_approval.review([{"diff": _new_file(MIGRATION, sql)}])
    assert change["problems"], sql
    out = db_approval.evaluate([{"diff": _new_file(MIGRATION, sql)}])
    assert out["status"] == "blocked" and out["db_change"] is None


def test_editing_an_existing_migration_or_sql_outside_migrations_is_blocked(flag):
    edited = db_approval.review([{"diff": _edit(MIGRATION, ["CREATE TABLE IF NOT EXISTS x (id int);"], ["-- old"])}])
    assert any("file mới" in p for p in edited["problems"])
    stray = db_approval.review([{"diff": _new_file("server/contexts/teacher/schema.sql", GOOD_SQL)}])
    assert any("ngoài thư mục migrations" in p for p in stray["problems"])
    refused = db_approval.review([{"diff": _new_file("server/contexts/billing/migrations/001-x.sql", GOOD_SQL)}])
    assert any("ngoài thư mục migrations" in p for p in refused["problems"])


def test_ddl_inside_code_is_blocked(flag):
    inline = _edit(CONTEXT, ["await db.exec(`CREATE TABLE IF NOT EXISTS notes (id int)`);"])
    assert any("DDL viết trong code" in p for p in db_approval.review([{"diff": inline}])["problems"])
    test_only = _edit("test/notes.test.js", ["await db.exec('CREATE TABLE IF NOT EXISTS t (id int)');"])
    assert db_approval.review([{"diff": test_only}]) is None


def test_sandbox_result_decides_hold_block_or_transient(flag, monkeypatch):
    seen = []
    monkeypatch.setattr(db_approval, "run_sandbox", lambda sql, stop=None: seen.append(sql) or {
        "status": "passed", "schema_diff": {"added_tables": ["ghi_chu_nhanh"]}, "checks": [], "tests": [], "error": None})
    held = db_approval.evaluate([{"diff": DB_DIFF}])
    assert held["status"] == "passed" and held["db_change"]["sandbox"]["status"] == "passed"
    assert "CREATE TABLE IF NOT EXISTS ghi_chu_nhanh" in seen[0]
    for status, kind in (("failed", "blocked"), ("db_check_unavailable", "transient"), ("disabled", "transient")):
        monkeypatch.setattr(db_approval, "run_sandbox", lambda sql, stop=None, s=status: {"status": s, "error": "x"})
        out = db_approval.evaluate([{"diff": DB_DIFF}])
        assert (out["status"], out["db_change"]) == (kind, None), status


def test_flag_is_inert_without_db_check(flag, monkeypatch):
    monkeypatch.delenv("AI_BOARD_DB_CHECK", raising=False)
    assert path_policy.fullstack_on() is False
    assert path_policy.may_edit(CONTEXT, "student") is False
    assert path_policy.context_migration(MIGRATION) is False


def test_dollar_inside_an_identifier_does_not_hide_a_statement(flag):
    sql = "CREATE TABLE IF NOT EXISTS t$x$ (a int); DROP TABLE IF EXISTS users; CREATE TABLE IF NOT EXISTS u$x$ (b int);"
    assert any("DROP TABLE" in p for p in db_approval.review([{"diff": _new_file(MIGRATION, sql)}])["problems"])
    body = "CREATE TABLE IF NOT EXISTS t (a text DEFAULT $$x;y$$);"
    assert db_approval.review([{"diff": _new_file(MIGRATION, body)}])["problems"] == []


def test_insert_takes_literal_rows_only(flag):
    ok = "INSERT INTO ghi_chu_nhanh (id, noi_dung) VALUES (1, 'a;b'), (2, NULL) ON CONFLICT (id) DO NOTHING;"
    assert db_approval.review([{"diff": _new_file(MIGRATION, ok)}])["problems"] == []
    for sql in ("INSERT INTO t SELECT pg_terminate_backend(pid) FROM pg_stat_activity ON CONFLICT DO NOTHING;",
                "INSERT INTO t (a) VALUES (now()) ON CONFLICT DO NOTHING;",
                "INSERT INTO t (a) VALUES ((SELECT 1)) ON CONFLICT DO NOTHING;"):
        assert any("VALUES hằng" in p for p in db_approval.review([{"diff": _new_file(MIGRATION, sql)}])["problems"]), sql


def test_identity_and_money_tables_need_explicit_attention(flag):
    sql = ("INSERT INTO users (email, role) VALUES ('x', 'admin') ON CONFLICT DO NOTHING;\n"
           "CREATE TABLE IF NOT EXISTS user_roles (id int);\nCREATE TABLE IF NOT EXISTS ghi_chu_nhanh (id int);")
    assert db_approval.review([{"diff": _new_file(MIGRATION, sql)}])["attention"] == ["user_roles", "users"]


def test_test_pattern_paths_under_server_are_not_exempt(flag):
    for path in ("server/contexts/teacher/tests/a.test.js", "server/contexts/teacher/__tests__/a.js",
                 "server/contexts/teacher/a.spec.js"):
        inline = _new_file(path, "await db.exec('DROP TABLE users');")
        assert any("DDL viết trong code" in p for p in db_approval.review([{"diff": inline}])["problems"]), path
        assert db_approval.backend_change([{"diff": inline}])["files"] == [path]


def test_push_hold_kinds(flag):
    fe = _new_file("public/a.html", "<p>x</p>") + _new_file("test/a.test.js", "import 'node:test';")
    assert db_approval.push_hold([{"diff": fe}], "student") is None
    assert db_approval.push_hold([{"diff": FE_BE_DIFF}], "student") == "backend"
    assert db_approval.push_hold([{"diff": FE_BE_DIFF}], "admin") is None
    assert db_approval.push_hold([{"diff": DB_DIFF}], "student") == "both"
    assert db_approval.push_hold([{"diff": DB_DIFF}], "admin") == "db"
    change = db_approval.backend_change([{"diff": FE_BE_DIFF}])
    assert change["files"] == ["server/contexts/teacher/index.js", CONTEXT] and "attachQuickNotes" in change["diff"]


# ── execution: gates 3→5.5 with fake models ──

PLAN = {"domain": "pharmacy", "goal": "fixture", "allowed_scope": [CONTEXT], "acceptance": ["200"], "tests": ["smoke"],
        "capabilities": ["context.write"], "risk": "low", "non_goals": [],
        "steps": [{"order": 1, "title": "Ghi chú", "description": "fixture", "allowed_scope": [CONTEXT], "acceptance": ["200"],
                   "tests": ["smoke"], "capability": "context.write", "risk": "low", "non_goals": []}]}


class _Budget:
    units = 0

    @staticmethod
    def tick():
        return True


def _execute(tmp_path, diff):
    def run_gate(gate, _request, _deps, _budget, state):
        if gate == 3:
            state.update(diffs=[{"file": CONTEXT, "test_file": None, "diff": "x"}], branch="ai-board/2026-11-21-ticket-1",
                         base_sha="a" * 40, full_diff=[{"file": "", "diff": diff}],
                         commits=[{"sha": "b" * 40, "title": "t", "files": [CONTEXT, MIGRATION]}])
            return {"gate": 3, "blocked": False, "reason": None}
        if gate == 4:
            return {"gate": 4, "blocked": False, "reason": None, "issues": []}
        if gate == 5:
            return {"gate": 5, "blocked": False, "reason": None,
                    "evidence": {"smoke_passed": True, "http_observed": True, "runner": "docker",
                                 "functional": {"probe_id": "queue-worker-availability-v1", "passed": True}}}
        return {"gate": 5.5, "blocked": False, "reason": None, "risk_level": "low", "risk_signals": []}

    kept = []
    out = execute_pre_pr(PLAN, ticket_id=1, checkout_source=tmp_path, deps=object(), budget=_Budget(), run_gate=run_gate,
                         cleanup=lambda _state, keep_branch: kept.append(keep_branch))
    return out, kept


def test_requester_fe_be_candidate_reaches_ready_for_pr(flag, tmp_path):
    out, kept = _execute(tmp_path, FE_BE_DIFF)
    assert out["outcome"] == "ready_for_pr" and out["candidate"]["head_sha"] == "b" * 40
    assert "db_change" not in out and kept == [True]
    assert out["backend_change"]["files"] == ["server/contexts/teacher/index.js", CONTEXT]


def test_db_candidate_is_kept_with_its_sandbox_report(flag, tmp_path, monkeypatch):
    monkeypatch.setattr(db_approval, "run_sandbox", lambda sql, stop=None: {"status": "passed", "schema_diff": None,
                                                                             "checks": [], "tests": [], "error": None})
    out, kept = _execute(tmp_path, DB_DIFF)
    assert out["outcome"] == "ready_for_pr" and kept == [True]
    assert out["db_change"]["migrations"][0]["path"] == MIGRATION and out["db_change"]["sandbox"]["status"] == "passed"


def test_non_additive_candidate_is_blocked_and_its_branch_dropped(flag, tmp_path, monkeypatch):
    monkeypatch.setattr(db_approval, "run_sandbox", lambda *a, **k: pytest.fail("non-additive SQL must not reach the sandbox"))
    out, kept = _execute(tmp_path, FE_BE_DIFF + _new_file(MIGRATION, "DROP TABLE users;"))
    assert out["outcome"] == "blocked" and out["candidate"] is None and kept[-1] is False
    assert "thay đổi DB bị chặn" in out["reason"]


def test_sandbox_crash_blocks_as_transient_and_still_cleans_up(flag, tmp_path, monkeypatch):
    def boom(*_a, **_k):
        raise RuntimeError("cleanup_unconfirmed")
    monkeypatch.setattr(db_approval, "run_sandbox", boom)
    out, kept = _execute(tmp_path, DB_DIFF)
    assert out["outcome"] == "blocked" and out["failure_class"] == "transient" and kept == [False]


def test_flag_off_db_candidate_is_unchanged(monkeypatch, tmp_path):
    monkeypatch.delenv(FLAG, raising=False)
    monkeypatch.setattr(db_approval, "run_sandbox", lambda *a, **k: pytest.fail("flag off must not run the DB gate"))
    out, _ = _execute(tmp_path, FE_BE_DIFF + _new_file(MIGRATION, "DROP TABLE users;"))
    assert out["outcome"] == "ready_for_pr" and "db_change" not in out


# ── worker: no push before approval ──

class DiffCandidates(PublishingCandidates):
    def __init__(self, diff, fail=None):
        super().__init__(fail)
        self._diff = diff

    def diff(self, _candidate):
        return self._diff


DB_VERDICT = {**PASSING, "db_change": {"migrations": [{"path": MIGRATION, "sql": GOOD_SQL}], "files": [MIGRATION],
                                       "sandbox": {"status": "passed"}}}


def _calls(transport):
    return [call[1].rsplit("/", 1)[-1] for call in transport.calls]


FE_DIFF = _new_file("public/ghi-chu-nhanh.html", "<ul></ul>") + _new_file("test/ghi-chu.test.js", "import 'node:test';")


class Admin(FakeTransport):
    def __call__(self, method, path, payload, headers):
        out = super().__call__(method, path, payload, headers)
        return {**out, "requester_role": "admin"} if path.endswith("/snapshot") else out


def test_worker_opens_the_pr_for_a_frontend_only_candidate(flag):
    transport, candidates = FakeTransport(), DiffCandidates(FE_DIFF)
    _publishing_worker(transport, candidates).run_once()
    assert len(candidates.published) == 1 and "pull-request" in _calls(transport)


def test_admin_backend_candidate_is_pushed_as_before(flag):
    transport, candidates = Admin(), DiffCandidates(FE_BE_DIFF)
    _publishing_worker(transport, candidates).run_once()
    assert len(candidates.published) == 1


def test_requester_backend_diff_is_never_pushed_without_approval(flag):
    transport, candidates = FakeTransport(), DiffCandidates(FE_BE_DIFF)
    _publishing_worker(transport, candidates).run_once()
    assert candidates.published == []
    assert "(backend)" in transport.calls[-1][2]["internal_detail"]


def test_flag_off_requester_backend_diff_is_pushed_as_before(monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    transport, candidates = FakeTransport(), DiffCandidates(FE_BE_DIFF)
    _publishing_worker(transport, candidates).run_once()
    assert len(candidates.published) == 1


def test_worker_never_pushes_a_held_db_candidate(flag):
    transport, candidates = FakeTransport(), DiffCandidates(DB_DIFF)
    _publishing_worker(transport, candidates, DB_VERDICT).run_once()
    assert candidates.published == [] and "pull-request" not in _calls(transport)
    assert _calls(transport)[-1] == "release"


def test_server_hold_marker_alone_stops_the_push(flag):
    transport, candidates = Admin(), DiffCandidates(FE_DIFF)
    _publishing_worker(transport, candidates, {**PASSING, "db_hold": True}).run_once()
    assert candidates.published == [] and "pull-request" not in _calls(transport)


def test_push_guard_refuses_a_db_diff_without_approval_for_that_head(flag):
    transport, candidates = FakeTransport(), DiffCandidates(DB_DIFF)
    _publishing_worker(transport, candidates).run_once()  # server did not mark it, the pushed diff still has SQL
    assert candidates.published == []
    assert transport.calls[-1][2]["internal_detail"].startswith("db_approval_required")


class Publishing(FakeTransport):
    def __init__(self, head):
        super().__init__()
        self.head = head

    def __call__(self, method, path, payload, headers):
        if path.endswith("/snapshot"):
            self.calls.append((method, path, payload, headers))
            return {"ticket": {"phase": "publishing"}, "request": {"id": 3, "title": "fixture", "detail": "x"},
                    "db_publish": {"run_id": 11, "head_sha": self.head, "verdict": DB_VERDICT, "plan": {}, "tier": "surface"}}
        if path.endswith("/claim"):
            self.calls.append((method, path, payload, headers))
            return {"ticket": {"id": 7, "lease_token": "lease-7", "trigger": "publish"}}
        if path.endswith("/db-publish"):
            self.calls.append((method, path, payload, headers))
            return {"status": "planned" if payload["ok"] else "waiting_admin"}
        return super().__call__(method, path, payload, headers)


def _publish_worker(transport, candidates):
    return HttpWorker(WorkerClient("http://fixture", "secret", transport=transport), worker_id="w1", mode="active",
                      planner=lambda _s: pytest.fail("publish must not plan"),
                      change_runner=lambda *a, **k: pytest.fail("publish must not run gates"),
                      candidates=candidates, open_prs=True)


def test_approved_db_candidate_is_pushed_once_on_the_publish_trigger(flag):
    transport, candidates = Publishing("b" * 40), DiffCandidates(DB_DIFF)
    out = _publish_worker(transport, candidates).run_once()
    assert out["publish"] == "ok" and len(candidates.published) == 1
    (pr,) = [c[2] for c in transport.calls if c[1].endswith("/pull-request")]
    assert pr["run_id"] == 11
    (done,) = [c[2] for c in transport.calls if c[1].endswith("/db-publish")]
    assert done["ok"] is True and "release" not in _calls(transport)


def test_approval_for_another_head_publishes_nothing(flag):
    transport, candidates = Publishing("c" * 40), DiffCandidates(DB_DIFF)
    out = _publish_worker(transport, candidates).run_once()
    assert out["publish"] == "failed" and candidates.published == []
    (done,) = [c[2] for c in transport.calls if c[1].endswith("/db-publish")]
    assert done["ok"] is False and done["detail"].startswith("db_approval_required")
