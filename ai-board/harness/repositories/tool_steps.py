"""Checkpoint tool-step của loop cổng 3 trong PostgreSQL: pin tương thích, ledger, intent/result theo identity."""
from __future__ import annotations

import hashlib
import json
import os
import time

from repositories.dbconn import harness_db

DDL = """
CREATE TABLE IF NOT EXISTS tool_run (
  proposal_id BIGINT NOT NULL,
  child       INTEGER NOT NULL,
  pins_json   TEXT NOT NULL,
  ledger_json TEXT,
  updated_at  BIGINT NOT NULL,
  PRIMARY KEY (proposal_id, child)
);
CREATE TABLE IF NOT EXISTS tool_step (
  proposal_id BIGINT NOT NULL,
  child       INTEGER NOT NULL,
  step        INTEGER NOT NULL,
  identity    TEXT NOT NULL,
  tool        TEXT NOT NULL,
  args_json   TEXT NOT NULL,
  status      TEXT NOT NULL,
  kind        TEXT,
  observation TEXT,
  resolved_by TEXT,
  updated_at  BIGINT NOT NULL,
  PRIMARY KEY (proposal_id, child, step)
);
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = current_schema()
                 AND table_name = 'tool_run' AND column_name = 'run_scope') THEN
    ALTER TABLE tool_run ADD COLUMN run_scope TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = current_schema()
                 AND table_name = 'tool_step' AND column_name = 'resolved_at') THEN
    ALTER TABLE tool_step ADD COLUMN resolution_reason TEXT, ADD COLUMN resolution_evidence TEXT,
                          ADD COLUMN resolved_at BIGINT;
  END IF;
END $$;
"""
# status: intent (ghi trước khi chạy) | done | unknown (dừng chờ đối chiếu) | applied | void | compensate (kết quả đối chiếu)
RESOLUTIONS = {"applied": "applied", "not_applied": "void", "compensate": "compensate"}
OPEN_STATUSES = ("intent", "unknown", "compensate")  # chưa chốt: không dọn, resume không đi tiếp
TTL_ENV = "AI_BOARD_CHECKPOINT_TTL_DAYS"
DEFAULT_TTL_DAYS = 30.0


def identity(proposal_id: int, child: int, step: int, tool: str, args: dict) -> str:
    raw = json.dumps([proposal_id, child, step, tool, args], sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:32]


def _now() -> int:
    return int(time.time() * 1000)


class PgSteps:
    """Checkpoint của 1 loop = (proposal_id, child). Lỗi DB raise: mất checkpoint thì không được đi tiếp."""

    def __init__(self, dsn, proposal_id: int, child: int | None, scope: str | None = None):
        self.dsn, self.proposal_id, self.child, self.scope = dsn, proposal_id, child or 0, scope

    def identity(self, step: int, tool: str, args: dict) -> str:
        return identity(self.proposal_id, self.child, step, tool, args)

    def load(self) -> dict:
        """{pins, ledger, steps[]} đã lưu; pins None nếu chưa có checkpoint."""
        where = (self.proposal_id, self.child)
        with harness_db(self.dsn, ddl=DDL, dict_rows=True) as con:
            run = con.execute("SELECT pins_json, ledger_json FROM tool_run WHERE proposal_id=%s AND child=%s",
                              where).fetchone()
            rows = con.execute("SELECT step, identity, tool, args_json, status, kind, observation FROM tool_step "
                               "WHERE proposal_id=%s AND child=%s ORDER BY step", where).fetchall()
        steps = [{**row, "args": json.loads(row["args_json"])} for row in rows]
        return {"pins": json.loads(run["pins_json"]) if run else None,
                "ledger": json.loads(run["ledger_json"]) if run and run["ledger_json"] else None, "steps": steps}

    def save_pins(self, pins: dict) -> None:
        with harness_db(self.dsn, ddl=DDL) as con:
            con.execute("INSERT INTO tool_run (proposal_id, child, pins_json, updated_at, run_scope) "
                        "VALUES (%s, %s, %s, %s, %s) ON CONFLICT DO NOTHING",
                        (self.proposal_id, self.child, json.dumps(pins, sort_keys=True), _now(), self.scope))

    def save_ledger(self, snapshot: dict) -> None:
        with harness_db(self.dsn, ddl=DDL) as con:
            con.execute("UPDATE tool_run SET ledger_json=%s, updated_at=%s WHERE proposal_id=%s AND child=%s",
                        (json.dumps(snapshot), _now(), self.proposal_id, self.child))

    def intent(self, step: int, tool: str, args: dict) -> None:
        """INSERT trước khi chạy; trùng khoá (2 worker cùng chạy 1 bước) raise."""
        with harness_db(self.dsn, ddl=DDL) as con:
            con.execute("INSERT INTO tool_step (proposal_id, child, step, identity, tool, args_json, status, updated_at) "
                        "VALUES (%s, %s, %s, %s, %s, %s, 'intent', %s)",
                        (self.proposal_id, self.child, step, self.identity(step, tool, args),
                         tool, json.dumps(args, sort_keys=True), _now()))

    def done(self, step: int, tool: str, args: dict, observation: str, kind: str) -> None:
        with harness_db(self.dsn, ddl=DDL) as con:
            con.execute("INSERT INTO tool_step (proposal_id, child, step, identity, tool, args_json, status, kind, "
                        "observation, updated_at) VALUES (%s, %s, %s, %s, %s, %s, 'done', %s, %s, %s) "
                        "ON CONFLICT (proposal_id, child, step) DO UPDATE SET status='done', kind=EXCLUDED.kind, "
                        "observation=EXCLUDED.observation, updated_at=EXCLUDED.updated_at",
                        (self.proposal_id, self.child, step, self.identity(step, tool, args), tool,
                         json.dumps(args, sort_keys=True), kind, observation, _now()))

    def mark(self, step: int, status: str) -> None:
        with harness_db(self.dsn, ddl=DDL) as con:
            con.execute("UPDATE tool_step SET status=%s, updated_at=%s WHERE proposal_id=%s AND child=%s AND step=%s",
                        (status, _now(), self.proposal_id, self.child, step))

    def drop(self, step: int) -> None:
        with harness_db(self.dsn, ddl=DDL) as con:
            con.execute("DELETE FROM tool_step WHERE proposal_id=%s AND child=%s AND step=%s",
                        (self.proposal_id, self.child, step))

    def reconcile(self, step: int, resolution: str, by: str, reason: str | None = None, evidence: dict | None = None) -> None:
        """Chốt bước unknown → applied/not_applied/compensate (compensate chốt tiếp được sau khi bù trừ); ghi người, lý do, evidence."""
        status = RESOLUTIONS[resolution]
        allowed = ["unknown"] if status == "compensate" else ["unknown", "compensate"]
        now = _now()
        with harness_db(self.dsn, ddl=DDL) as con:
            hit = con.execute("UPDATE tool_step SET status=%s, resolved_by=%s, resolution_reason=%s, resolution_evidence=%s, "
                              "resolved_at=%s, updated_at=%s WHERE proposal_id=%s AND child=%s AND step=%s AND status = ANY(%s)",
                              (status, by, reason, json.dumps(evidence or {}, sort_keys=True, ensure_ascii=False), now, now,
                               self.proposal_id, self.child, step, allowed)).rowcount
        if not hit:
            raise ValueError(f"bước không ở trạng thái {'/'.join(allowed)}")


def scope_key(*parts) -> int:
    """Khoá BIGINT 60-bit ổn định từ các phần định danh (ticket, plan, lần, base sha)."""
    return int(hashlib.sha256(":".join(str(p) for p in parts).encode("utf-8")).hexdigest()[:15], 16)


class Checkpoint:
    """Checkpoint 1 lượt worker: định danh ổn định (ticket + plan) qua crash/resume; nhớ mọi khoá đã dùng để purge."""

    def __init__(self, dsn, run_scope: str, attempt: int = 0, keys: set | None = None):
        self.dsn, self.run_scope, self.n = dsn, run_scope, attempt
        self.keys = set() if keys is None else keys
        self._pinned = False

    def attempt(self, n: int) -> "Checkpoint":
        """Cùng lượt, lần sửa n; dùng chung tập khoá."""
        return Checkpoint(self.dsn, self.run_scope, n, self.keys)

    def store(self, base_sha: str, child: int) -> PgSteps:
        """PgSteps cho 1 subtask; base_sha đổi thì checkpoint mới."""
        key = scope_key(self.run_scope, self.n, base_sha)
        self.keys.add(key)
        return PgSteps(self.dsn, key, child, self.run_scope)

    def _ledger(self) -> PgSteps:
        key = scope_key(self.run_scope, "ledger")
        self.keys.add(key)
        return PgSteps(self.dsn, key, 0, self.run_scope)

    def restore(self, budget) -> None:
        """Nạp ledger cấp worker đã lưu (absorb: max, không cộng đôi)."""
        saved = self._ledger().load()["ledger"]
        if saved:
            budget.absorb(saved)

    def save(self, budget) -> None:
        store = self._ledger()
        if not self._pinned:
            store.save_pins({"kind": "worker_ledger"})
            self._pinned = True
        store.save_ledger(budget.snapshot())

    def purge(self) -> None:
        """Xoá step + ledger của lượt đã có kết luận cuối."""
        keys = sorted(self.keys)
        if keys:
            with harness_db(self.dsn, ddl=DDL) as con:
                con.execute("DELETE FROM tool_step WHERE proposal_id = ANY(%s)", (keys,))
                con.execute("DELETE FROM tool_run WHERE proposal_id = ANY(%s)", (keys,))


def ttl_days(env=None) -> float:
    """TTL checkpoint (ngày) từ AI_BOARD_CHECKPOINT_TTL_DAYS; thiếu/sai/không dương → 30."""
    try:
        value = float((os.environ if env is None else env).get(TTL_ENV, DEFAULT_TTL_DAYS))
    except ValueError:
        return DEFAULT_TTL_DAYS
    return value if value > 0 else DEFAULT_TTL_DAYS


def purge_checkpoints(dsn, *, ticket_id: int | None = None, ttl: float | None = None, apply: bool = False,
                      now: int | None = None) -> list[dict]:
    """Dọn run hết hạn TTL (hoặc mọi run của ticket_id); dry-run mặc định. Run còn bước intent/unknown/compensate luôn được giữ."""
    cutoff = (now if now is not None else _now()) - int((ttl if ttl is not None else ttl_days()) * 86_400_000)
    marks = ",".join(["%s"] * len(OPEN_STATUSES))
    with harness_db(dsn, ddl=DDL, dict_rows=True) as con:
        if apply:
            con.execute("LOCK TABLE tool_run, tool_step IN SHARE ROW EXCLUSIVE MODE")
        rows = con.execute(
            "SELECT r.proposal_id, r.run_scope, GREATEST(r.updated_at, COALESCE("
            "(SELECT MAX(s.updated_at) FROM tool_step s WHERE s.proposal_id = r.proposal_id), 0)) AS last, "
            f"EXISTS (SELECT 1 FROM tool_step s WHERE s.proposal_id = r.proposal_id AND s.status IN ({marks})) AS open "
            "FROM tool_run r", OPEN_STATUSES).fetchall()
        runs: dict[str, dict] = {}
        for row in rows:
            run = runs.setdefault(row["run_scope"] or f"key:{row['proposal_id']}",
                                  {"scope": row["run_scope"], "keys": [], "last": 0, "open": False})
            run["keys"].append(row["proposal_id"])
            run["last"], run["open"] = max(run["last"], row["last"]), run["open"] or row["open"]
        prefix = f"ticket-{int(ticket_id)}:" if ticket_id is not None else None
        report = []
        for run in runs.values():
            if not ((run["scope"] or "").startswith(prefix) if prefix else run["last"] < cutoff):
                continue
            deleted = apply and not run["open"]
            if deleted:
                con.execute("DELETE FROM tool_step WHERE proposal_id = ANY(%s)", (run["keys"],))
                con.execute("DELETE FROM tool_run WHERE proposal_id = ANY(%s)", (run["keys"],))
            report.append({"scope": run["scope"], "keys": run["keys"], "last_update": run["last"],
                           "protected": run["open"], "deleted": deleted})
    return report
