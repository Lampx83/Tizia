"""Fast-tier launcher on PostgreSQL: DSN rewrite, missing admin URL, fixture paths. No DB needed."""
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import eval_fast  # noqa: E402


def test_with_db_replaces_only_the_database_name():
    assert eval_fast._with_db("postgres://u:p@h:5432/postgres?sslmode=disable", "evalfast_x") == \
        "postgres://u:p@h:5432/evalfast_x?sslmode=disable"


def test_launcher_needs_admin_url(monkeypatch, tmp_path):
    monkeypatch.delenv("EVAL_PG_ADMIN_URL", raising=False)
    with pytest.raises(eval_fast.FastTierError, match="EVAL_PG_ADMIN_URL"):
        with eval_fast.native_launcher(tmp_path, tmp_path):
            pass


def test_fixture_points_at_the_native_tree_and_has_no_sqlite(tmp_path):
    eval_fast._fixture(tmp_path, {})
    text = (tmp_path / "verify-session.mjs").read_text(encoding="utf-8")
    assert "/app/" not in text and "sqlite" not in text.lower() and "tizia.db" not in text
    assert f"{tmp_path.as_posix()}/server/ai-board/db/index.js" in text
