"""PostgreSQL connect/DDL-replay/close, 1 context manager. `db_path` ở mọi chỗ gọi = DSN
(DATABASE_URL), tên giữ nguyên cho khỏi đổi ~30 chữ ký. psycopg import lười: harness
không có DB (guest Gate 5) vẫn chạy được."""
from __future__ import annotations

from contextlib import contextmanager


@contextmanager
def harness_db(dsn, *, ddl: str | None = None, dict_rows: bool = False):
    """Connect, replay `ddl` (IF NOT EXISTS, multi-statement ok), yield connection (`con.execute`
    trả cursor, placeholder %s), commit khi thoát sạch, luôn close. Exception trong body → rollback."""
    import psycopg
    from psycopg.rows import dict_row

    kw = {"row_factory": dict_row} if dict_rows else {}
    con = psycopg.connect(str(dsn), connect_timeout=10, **kw)
    try:
        if ddl:
            con.execute(ddl)
        yield con
        con.commit()
    finally:
        con.close()
