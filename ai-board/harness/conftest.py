"""Fixture chung cho seam Python. conftest ở đây cũng là thứ đẩy thư mục harness
vào sys.path để test import được main/budget/models."""
import json
import sys
from pathlib import Path

import pytest

HARNESS_DIR = Path(__file__).resolve().parent
if str(HARNESS_DIR) not in sys.path:
    sys.path.insert(0, str(HARNESS_DIR))


@pytest.fixture
def request_item():
    """Đúng hình dạng 1 item do server/scripts/sync-inbox.mjs sinh ra."""
    return {
        "id": "req-42",
        "db_id": 42,
        "from": "Ha SV Duoc",
        "domain": "pharmacy",
        "type": "feature",
        "subject": "Them the ghi nho ten thuoc",
        "body": "Muon co bo the lat de hoc ten hoat chat.",
        "status": "pending",
        "votes": 7,
        "admin_note": None,
        "attachments": [],
        "thread": [
            {"role": "student", "author": "Ha", "body": "Bo sung: uu tien nhom khang sinh.",
             "at": "2026-09-01T03:00:00.000Z"},
        ],
        "created_at": "2026-09-01T02:00:00.000Z",
        "updated_at": "2026-09-01T03:00:00.000Z",
    }


@pytest.fixture
def inbox_file(tmp_path, request_item):
    p = tmp_path / "inbox.json"
    p.write_text(json.dumps({"_doc": "fixture", "items": [request_item]}), encoding="utf-8")
    return p


@pytest.fixture
def db_file(tmp_path):
    """DB tạm — không bao giờ chạm data/tizia.db thật."""
    return tmp_path / "tizia-test.db"
