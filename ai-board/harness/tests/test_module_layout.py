"""Public imports retain one stateful module after responsibility-based moves."""
import importlib
from pathlib import Path


def test_provider_and_guard_boundaries_preserve_public_imports_and_assets():
    harness = Path(__file__).resolve().parents[1]
    for legacy, canonical in (
        ('models', 'providers.client'),
        ('model_routing', 'providers.routing'),
        ('classifier', 'security.classifier'),
    ):
        assert importlib.import_module(legacy) is importlib.import_module(canonical)
    routing = importlib.import_module('providers.routing')
    classifier = importlib.import_module('security.classifier')
    pipeline = importlib.import_module('runtime.pipeline')
    assert routing.CATALOG == harness.parents[1] / 'server/ai-board/model-routing.json'
    assert classifier.CONFIG_PATH == harness.parents[1] / 'server/ai-board/classifier-calibration.json'
    assert routing.CATALOG.is_file() and classifier.CONFIG_PATH.is_file()
    assert pipeline.GATES == (1, 2, 2.5, 3, 4, 5, 5.5, 6, 7)
    assert not (harness / 'ml').exists()
