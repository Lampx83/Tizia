import sys
import types

from verification import functional


class _Page:
    def __init__(self, cards, search_box):
        self.cards, self.search_box = cards, search_box

    def goto(self, *args, **kwargs):
        pass

    def wait_for_timeout(self, ms):
        pass

    def evaluate(self, script):
        if script is functional._CARDS:
            return self.cards
        return self.search_box


def _run(monkeypatch, cards, search_box):
    class _Playwright:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return False

    fake = types.ModuleType("playwright.sync_api")
    fake.sync_playwright = lambda: _Playwright()
    monkeypatch.setitem(sys.modules, "playwright.sync_api", fake)
    monkeypatch.setattr(functional, "_open", lambda p, base, token, clipboard=False: (None, _Page(cards, search_box)))
    return functional.run_search("http://x", lambda name: {"token": "t"})


def test_missing_search_box_is_not_applicable_not_failure(monkeypatch):
    cards = [{"name": "Đại số", "shown": True}, {"name": "Hình học", "shown": True}]
    out = _run(monkeypatch, cards, search_box=False)
    assert out["passed"] is True and out["applicable"] is False


def test_missing_activity_list_is_not_applicable(monkeypatch):
    out = _run(monkeypatch, cards=[], search_box=True)
    assert out["applicable"] is False and out["passed"] is True
