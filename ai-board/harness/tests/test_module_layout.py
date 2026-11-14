"""Provider and guard modules resolve at canonical paths with their assets."""
import importlib
from pathlib import Path


def test_provider_and_guard_boundaries_keep_assets():
    harness = Path(__file__).resolve().parents[1]
    routing = importlib.import_module('providers.routing')
    classifier = importlib.import_module('security.classifier')
    pipeline = importlib.import_module('runtime.pipeline')
    assert routing.CATALOG == harness.parents[1] / 'server/ai-board/model-routing.json'
    assert classifier.CONFIG_PATH == harness.parents[1] / 'server/ai-board/classifier-calibration.json'
    assert routing.CATALOG.is_file() and classifier.CONFIG_PATH.is_file()
    assert pipeline.GATES == (1, 2, 2.5, 3, 4, 5, 5.5, 6, 7)
    assert not (harness / 'ml').exists()
