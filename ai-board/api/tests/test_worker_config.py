"""CLI selection uses the private HTTP adapter without invoking a model or reading app secrets."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))


def test_cli_selects_remote_planning_with_local_revision_fallback(monkeypatch, tmp_path):
    import dotenv
    import worker
    import memory
    from models import OllamaClient
    from api.client import RemotePlanner

    monkeypatch.setattr(dotenv, 'load_dotenv', lambda *a, **kw: None)
    monkeypatch.setenv('AI_BOARD_ENGINE_URL', 'http://engine-fixture:8052')
    monkeypatch.setenv('AI_BOARD_INTERNAL_KEY', 'fixture-' + 'x' * 32)
    monkeypatch.setenv('AI_BOARD_SERVER_URL', 'http://host-fixture')
    monkeypatch.setenv('AI_BOARD_WORKER_KEY', 'fixture-worker-' + 'x' * 32)
    monkeypatch.setenv('AI_BOARD_GITHUB_TOKEN', '')
    monkeypatch.delenv('AI_BOARD_GITHUB_TOKEN_FILE', raising=False)
    monkeypatch.delenv('AI_BOARD_REPO_DIR', raising=False)
    monkeypatch.setenv('AI_BOARD_PROJECT', 'fixture-project')
    monkeypatch.setattr(OllamaClient, 'from_env', lambda *a, **kw: OllamaClient())
    monkeypatch.setattr(memory, 'DEFAULT_PATH', tmp_path / 'lessons.jsonl')
    monkeypatch.setattr(memory, 'prune', lambda *a, **kw: 0)
    local = object()
    monkeypatch.setattr(worker, 'HarnessPlanner', lambda *a, **kw: local)

    def poll(instance):
        assert isinstance(instance.planner, RemotePlanner)
        assert instance.planner.fallback is local
        assert instance.planner.project == 'fixture-project'
        assert instance.planner.tracer is instance.tracer
        assert instance.model_check.__self__ is instance.planner
        return {'status': 'off'}

    monkeypatch.setattr(worker, 'poll', poll)
    assert worker.main(['--mode', 'off', '--plan', '--once']) == 0
