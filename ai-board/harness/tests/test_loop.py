"""Seam Python duy nhất: chạy nguyên ratchet loop 1 lượt trên fixture, mọi biên
I/O (Ollama, git, Telegram) đều fake. Không test chi tiết nội bộ từng cổng."""
import json
import sqlite3

import pytest

import main
from budget import Budget
from main import Deps, Unavailable, load_inbox, run_once


def rows(db_file):
    con = sqlite3.connect(str(db_file))
    try:
        con.row_factory = sqlite3.Row
        return [dict(r) for r in con.execute("SELECT * FROM skill_proposals ORDER BY id")]
    finally:
        con.close()


def test_load_inbox_doc_snapshot(inbox_file, request_item):
    assert load_inbox(inbox_file) == [request_item]


def test_full_loop_reaches_gate_7_and_writes_one_row(inbox_file, db_file, fake_deps):
    (item,) = load_inbox(inbox_file)

    out = run_once(item, db_path=db_file, deps=fake_deps)

    assert out["gate_reached"] == 7
    assert out["outcome"] == "ok"

    written = rows(db_file)
    assert len(written) == 1
    (row,) = written
    assert row["gate_reached"] == 7.0
    assert row["outcome"] == "ok"
    assert row["origin"] == "domain-synthesized"
    assert row["domain"] == "pharmacy"
    assert json.loads(row["request_ids"]) == ["req-42"]
    assert json.loads(row["budget_json"])["exhausted"] is None
    assert row["pr_url"] is None
    assert row["id"] == out["proposal_id"]


def test_dry_run_never_calls_git_or_telegram(inbox_file, db_file, fake_deps):
    (item,) = load_inbox(inbox_file)

    run_once(item, db_path=db_file, deps=fake_deps)

    assert fake_deps.git.mock_calls == []
    assert fake_deps.notify.mock_calls == []
    # Cổng 1 (1 lần) + cổng 2.5 (1 lần, ticket 22) + cổng 3 (1 lần/subtask,
    # plan_with có 2) — tất cả qua fake, không mạng.
    assert len(fake_deps.models.calls) == 2 + len(fake_deps.models.plan["subtasks"])


def test_real_deps_make_git_and_telegram_explode_if_touched():
    deps = Deps.real()
    with pytest.raises(NotImplementedError):
        deps.git.push("nhanh-nao-do")
    with pytest.raises(NotImplementedError):
        deps.notify.send("canh bao")
    assert isinstance(deps.git, Unavailable)


def test_budget_exhausted_stops_loop_and_is_recorded(inbox_file, db_file, fake_deps):
    (item,) = load_inbox(inbox_file)

    out = run_once(item, db_path=db_file, deps=fake_deps, budget=Budget(max_wall_clock_s=0))

    assert out["outcome"] == "budget_exhausted"
    assert out["gate_reached"] == 0.0

    (row,) = rows(db_file)
    assert row["outcome"] == "budget_exhausted"
    assert json.loads(row["budget_json"])["exhausted"] == "wall_clock_s"


def test_budget_model_call_cap_blocks_further_spend():
    b = Budget(max_model_calls=2, max_wall_clock_s=999)
    assert b.spend("model_calls") is True
    assert b.spend("model_calls") is False
    assert b.exhausted() == "model_calls"
    assert Budget.restore(b.snapshot()).model_calls == 2


def test_gate_sequence_includes_plan_validate_2_5_and_risk_triage_5_5():
    assert main.GATES == (1, 2, 2.5, 3, 4, 5, 5.5, 6, 7)


def test_gate_exception_still_finalizes_the_skill_proposals_row(inbox_file, db_file, fake_deps, monkeypatch):
    """code-review round: trước fix, create_proposal() ghi khung ngay đầu
    run_once() nhưng KHÔNG có finally — 1 cổng raise giữa chừng để lại dòng
    gate_reached=0/outcome=NULL vĩnh viễn, không ai cập nhật. Giờ phải luôn
    ghi lại trạng thái cuối (outcome bắt đầu bằng 'error_gate_'), và exception
    vẫn phải bay lên (không nuốt lỗi)."""
    (item,) = load_inbox(inbox_file)

    def _boom(*a, **kw):
        raise RuntimeError("gia lap loi Ollama")
    monkeypatch.setattr(main.brainstorm, "run", _boom)

    with pytest.raises(RuntimeError, match="gia lap loi Ollama"):
        run_once(item, db_path=db_file, deps=fake_deps)

    (row,) = rows(db_file)
    assert row["outcome"].startswith("error_gate_")
    assert "gia lap loi Ollama" in row["outcome"]
    assert row["gate_reached"] == 0.0  # raise xảy ra TRONG cổng 1, chưa cổng nào xong


def test_cli_refuses_to_run_without_dry_run(monkeypatch, inbox_file, db_file, tmp_path, capsys):
    monkeypatch.delenv("DRY_RUN", raising=False)
    monkeypatch.setenv("TIZIA_INBOX_PATH", str(inbox_file))
    monkeypatch.setenv("TIZIA_DB_PATH", str(db_file))
    # .env thật repo có thể chứa placeholder (ví dụ OLLAMA_URL) làm nổ code
    # sau nhánh DRY_RUN nếu lỡ chạy tới — trỏ ENV_FILE sang file không
    # tồn tại để load_dotenv là no-op, cô lập test khỏi .env thật.
    monkeypatch.setattr(main, "ENV_FILE", tmp_path / "no-such.env")

    assert main.main([]) == 2
    assert not db_file.exists()


def test_cli_full_run_writes_one_row_per_pending_item(monkeypatch, inbox_file, db_file, fake_deps):
    monkeypatch.setenv("DRY_RUN", "1")
    monkeypatch.setenv("TIZIA_INBOX_PATH", str(inbox_file))
    monkeypatch.setenv("TIZIA_DB_PATH", str(db_file))

    assert main.main([], deps=fake_deps) == 0

    (row,) = rows(db_file)
    assert row["gate_reached"] == 7.0
    assert row["outcome"] == "ok"


def test_wall_clock_accumulates_across_resume():
    """Resume không được cấp lại đồng hồ mới — nếu không, fail rồi resume N lần là
    N × max_wall_clock_s GPU mà budget chẳng bao giờ báo chạm trần."""
    first = Budget(max_wall_clock_s=10)
    snapshot = first.snapshot()
    snapshot["elapsed_s"] = 9.5

    resumed = Budget.restore(snapshot)

    assert resumed.elapsed_s >= 9.5
    assert resumed.max_wall_clock_s == 10
    assert Budget.restore({**snapshot, "elapsed_s": 10.0}).exhausted() == "wall_clock_s"


def test_ollama_client_takes_seckey_from_injected_env_only():
    from models import OllamaClient

    client = OllamaClient.from_env({"OLLAMA_URL": "http://fake:1", "OLLAMA_SECKEY": "tu-env-gia"})
    assert client.seckey == "tu-env-gia"
    assert OllamaClient.from_env({}).seckey is None


def test_ollama_client_from_env_has_no_hardcoded_fallback():
    # Bien moi truong la nguon su that duy nhat -- thieu bien thi rong, khong
    # am tham roi ve 1 endpoint/model mac dinh nao do nam trong source.
    from models import OllamaClient

    client = OllamaClient.from_env({})
    assert client.base_url == ""
    assert client.gate1_model == ""
    assert client.gate3_model == ""
    assert client.gate3_model_light == ""
    assert client.embed_model == ""


def test_ollama_client_post_raises_clearly_when_base_url_missing():
    from models import OllamaClient

    client = OllamaClient.from_env({})
    with pytest.raises(RuntimeError, match="OLLAMA_URL"):
        client.generate("some-model", "hi")


def test_ollama_client_uses_seckey_header_not_bearer(monkeypatch):
    # server/ai.js goi gateway noi bo bang header x-ollama-seckey -- harness
    # phai gui DUNG header do de noi chuyen duoc voi cung gateway, khong phai
    # Authorization: Bearer (gateway khong hieu header do).
    import models as models_mod
    from models import OllamaClient

    captured = {}
    client = OllamaClient.from_env({"OLLAMA_URL": "http://fake.invalid", "OLLAMA_SECKEY": "s3cr3t"})

    class FakeResp:
        def read(self):
            return b'{"response":"ok"}'

        def __enter__(self):
            return self

        def __exit__(self, *a):
            return False

    def fake_urlopen(req, timeout=None):
        captured['headers'] = dict(req.header_items())
        return FakeResp()

    monkeypatch.setattr(models_mod.urllib.request, 'urlopen', fake_urlopen)
    client.generate("m", "hi")

    assert captured['headers'].get('X-ollama-seckey') == 's3cr3t'
    assert 'Authorization' not in captured['headers']
