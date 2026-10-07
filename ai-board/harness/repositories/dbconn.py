"""connect()/DDL-replay/close — 8 copies across gate_trace.py, main.py,
prescreen.py, plan_validate.py before this (flagged twice in ai-log
2026-09-19 "7+ copies", grew to 8, never fixed). 1 context manager, callers
keep only their own DDL constant + query/insert body."""
from __future__ import annotations

import sqlite3
from contextlib import contextmanager


@contextmanager
def harness_db(db_path, *, ddl: str | None = None):
    """Connect, replay `ddl` (executescript — handles multi-statement DDL like
    gate_trace's CREATE TABLE + CREATE INDEX), yield the connection, commit on
    clean exit, always close. An exception raised in the `with` body skips the
    commit (same as every hand-rolled copy: query-then-commit sequentially, so
    a failing query never reached commit either) but still closes the
    connection. Read-only callers pass no `ddl` and never write, so the
    unconditional commit() is a harmless no-op."""
    con = sqlite3.connect(str(db_path))
    try:
        if ddl:
            con.executescript(ddl)
        yield con
        con.commit()
    finally:
        con.close()
