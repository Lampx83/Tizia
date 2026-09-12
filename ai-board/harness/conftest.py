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


class FakeModels:
    """Fake OllamaClient: generate() trả 1 body /api/generate cố định, ghi lại
    prompt để soi. Không chạm mạng."""

    gate1_model = "fake-gate1"
    gate3_model = "fake-gate3"
    embed_model = "fake-embed"

    def __init__(self, plan):
        self.plan = plan
        self.calls = []
        self.embed_calls = []
        # text → vector; text lạ nhận one-hot riêng (không giống ai). Vector
        # ngắn được đệm 0 tới 16 chiều để cùng cỡ.
        self.vectors = {}

    def embed(self, text):
        self.embed_calls.append(text)
        v = self.vectors.get(text)
        if v is None:
            v = [0.0] * 16
            v[3 + (sum(map(ord, text)) % 13)] = 1.0
        else:
            v = list(v) + [0.0] * (16 - len(v))
        return {"embedding": v}

    def generate(self, model, prompt, **kw):
        self.calls.append({"model": model, "prompt": prompt, **kw})
        body = self.plan if isinstance(self.plan, str) else json.dumps(self.plan, ensure_ascii=False)
        return {"response": body, "prompt_eval_count": 120, "eval_count": 80}


def plan_with(caps):
    """Plan hợp lệ theo schema gates/brainstorm.py, xin đúng `caps`."""
    return {
        "summary_vi": "Thêm bộ thẻ ghi nhớ tên thuốc cho SV Dược.",
        "capabilities": caps,
        "subtasks": [
            {"title": "Tạo plugin", "file": "server/contexts/_ai-generated/pharmacy/flashcards/index.js",
             "verify": "curl /api/flashcards trả 200", "size": "small"},
            {"title": "Trang HTML", "file": "public/flashcards.html",
             "verify": "mở trang thấy 3 thẻ", "size": "large"},
        ],
    }


@pytest.fixture
def fake_deps():
    """Deps với model fake trả plan surface-only; git/telegram là MagicMock để
    khẳng định không bao giờ bị gọi."""
    from unittest.mock import MagicMock
    from main import Deps
    return Deps(models=FakeModels(plan_with(["features"])), git=MagicMock(name="git"), notify=MagicMock(name="telegram"))
