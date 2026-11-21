"""Flag AI_BOARD_PROMPT_LABELS: worker registers prompt versions, takes the server label table, pins its fingerprint to every authority call."""
import json
import urllib.error

import pytest

from repositories.server_hsm import AuthorityError, RemoteGate4
from runtime import prompt_labels as pl

LOCK = {"implement.md": "a" * 64}


class Client:
    def __init__(self, labels=None, authority_error=None):
        self.labels, self.authority_error, self.posts = labels or {}, authority_error, []

    def post(self, path, body):
        self.posts.append((path, body))
        if path.endswith("/prompt-labels"):
            return {"labels": self.labels}
        if self.authority_error:
            raise urllib.error.HTTPError(path, 409, "x", {}, __import__("io").BytesIO(json.dumps({"error": self.authority_error}).encode()))
        return {"authorized": True}


@pytest.fixture
def disk(monkeypatch):
    from runtime.budgets import meter
    monkeypatch.setattr(pl, "disk_versions", lambda *_: {"implement.md": {"hash": "a" * 64, "content": "x"}})
    monkeypatch.setattr(meter, "prompt_lock", lambda: LOCK)


def gate(client):
    return RemoteGate4(client, ticket_id=1, run_id=2, worker_id="w", lease_token="l", contract={"hash": "c"})


def test_flag_off_sends_nothing_new(monkeypatch, disk):
    monkeypatch.delenv("AI_BOARD_PROMPT_LABELS", raising=False)
    client = Client()
    gate(client).authorize_action("model")
    assert [p for p, _ in client.posts] == ["/api/ai-board/worker/tickets/1/hsm/authority"]
    assert "prompt_labels" not in client.posts[0][1]


def test_flag_on_registers_once_and_pins_fingerprint(monkeypatch, disk):
    monkeypatch.setenv("AI_BOARD_PROMPT_LABELS", "1")
    labels = {"implement.md": {"production": "a" * 64}}
    client, g = Client(labels), gate(Client(labels))
    g.authorize_action("model")
    g.authorize_action("model")
    paths = [p for p, _ in g.client.posts]
    assert paths.count("/api/ai-board/worker/tickets/1/prompt-labels") == 1
    assert g.client.posts[0][1]["versions"] == {"implement.md": {"hash": "a" * 64, "content": "x"}}
    assert g.client.posts[-1][1]["prompt_labels"] == pl.fingerprint(labels)


def test_server_label_that_disk_does_not_match_blocks_transient(monkeypatch, disk):
    monkeypatch.setenv("AI_BOARD_PROMPT_LABELS", "1")
    g = gate(Client({"implement.md": {"production": "b" * 64}}))
    with pytest.raises(AuthorityError) as error:
        g.authorize_action("model")
    assert error.value.failure_class == "transient" and "prompt_label_mismatch" in str(error.value)
    assert all(not p.endswith("/authority") for p, _ in g.client.posts)


def test_server_rejecting_stale_fingerprint_is_transient(monkeypatch, disk):
    monkeypatch.setenv("AI_BOARD_PROMPT_LABELS", "1")
    g = gate(Client({}, authority_error="prompt_labels_mismatch"))
    with pytest.raises(AuthorityError) as error:
        g.authorize_action("model")
    assert error.value.failure_class == "transient"


def test_real_prompts_dir_matches_its_lock():
    from runtime.budgets import meter
    assert pl.check_all(lock=meter.prompt_lock(), labels={}, disk={n: v["hash"] for n, v in pl.disk_versions().items()}) == []


def test_edited_prompt_without_label_is_refused(monkeypatch, disk):
    monkeypatch.setenv("AI_BOARD_PROMPT_LABELS", "1")
    from runtime.budgets import meter
    monkeypatch.setattr(meter, "prompt_lock", lambda: {"implement.md": "f" * 64})
    with pytest.raises(AuthorityError, match="prompt_label_mismatch"):
        gate(Client({})).authorize_action("model")
