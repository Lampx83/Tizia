"""Fixture chung cho seam Python. conftest ở đây cũng là thứ đẩy thư mục harness
vào sys.path để test import được main/budget/models."""
import json
import sys
from pathlib import Path

import pytest

HARNESS_DIR = Path(__file__).resolve().parent
if str(HARNESS_DIR) not in sys.path:
    sys.path.insert(0, str(HARNESS_DIR))


@pytest.fixture(autouse=True)
def _no_real_codegraph(monkeypatch):
    """Ticket 21: gates/brainstorm.py + gates/implement.py gọi codegraph.query()
    thật -> subprocess ra ngoài (graphify CLI), chậm và phụ thuộc máy có cài +
    graph.json đã build. Autouse fake trả [] cho MỌI test (đúng fallback
    "graphify chưa cài" — seam Python đã chốt: mọi biên I/O thật đều fake,
    xem main.py's Deps cho Ollama/git/Telegram). Test riêng của ticket 21 tự
    monkeypatch lại codegraph.query khi cần kiểm tra hành vi có gợi ý graph."""
    import codegraph
    monkeypatch.setattr(codegraph, "query", lambda *a, **kw: [])


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
    gate3_model_light = "fake-gate3-light"
    embed_model = "fake-embed"

    def __init__(self, plan, codegen=None, validation=None):
        self.plan = plan
        # Response mặc định cho cổng 3 (ticket 11) — generate() tự chọn theo
        # TÊN MODEL được gọi (gate1_model → plan, gate3_model*/… → codegen),
        # nên mọi fixture cũ gọi deps_with(plan_with(...)) vẫn tự đi hết tới
        # cổng 7 mà không cần biết gì về cổng 3.
        self.codegen = codegen or {
            "code": "// fixture code\n", "test_file": "test/fixture.test.js", "test": "// fixture test\n",
        }
        # Response mặc định cho cổng 2.5 (ticket 22) — clear=True nghĩa là "plan
        # ổn, đi tiếp", nên fixture cũ (không biết gì về cổng 2.5) tự qua trót
        # lọt tới cổng 7 mà không cần đổi gì. Cổng 2.5 dùng CHUNG gate1_model
        # với cổng 1 (đúng thiết kế thật — vai validator, không phải model
        # khác) nên generate() phân biệt 2 lời gọi bằng nội dung PROMPT
        # (marker "PLAN CẦN SOÁT" chỉ có trong prompts/plan_validate.md).
        self.validation = validation if validation is not None else {"clear": True, "question": None}
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
        if model in (self.gate3_model, self.gate3_model_light):
            payload = self.codegen
        elif "PLAN CẦN SOÁT" in prompt:  # cổng 2.5 — xem docstring __init__
            payload = self.validation
        else:
            payload = self.plan
        body = payload if isinstance(payload, str) else json.dumps(payload, ensure_ascii=False)
        return {"response": body, "prompt_eval_count": 120, "eval_count": 80}


class FakeVerify:
    """Older full-loop tests stay on the Python seam without a Docker daemon."""

    def run(self, state, deps, budget):
        state["evidence"] = {"text": "fixture smoke: one user-state flow", "smoke_passed": True,
                             "screenshot": None}
        return {"gate": 5, "blocked": False, "reason": None, "evidence": state["evidence"]}


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


def deps_with(models):
    """Deps với model fake (FakeModels hoặc plan cho FakeModels); git/telegram là
    MagicMock để khẳng định không bao giờ bị gọi."""
    from unittest.mock import MagicMock
    from main import Deps
    if not isinstance(models, FakeModels):
        models = FakeModels(models)
    return Deps(models=models, git=MagicMock(name="git"), notify=MagicMock(name="telegram"),
                verify=FakeVerify())


@pytest.fixture
def fake_deps():
    return deps_with(plan_with(["features"]))
