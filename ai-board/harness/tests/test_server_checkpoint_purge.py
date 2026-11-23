"""Worker ledger checkpoint over HTTP: a save after purge recreates the row instead of hitting 409 checkpoint_missing."""
from repositories.server_checkpoint import HttpCheckpoint


class FakeServer:
    def __init__(self):
        self.rows = set()

    def post(self, path, body):
        op, key = path.rsplit("/", 1)[1], body.get("proposal_id")
        if op == "pins":
            self.rows.add(key)
        elif op == "ledger" and key not in self.rows:
            raise RuntimeError("409 checkpoint_missing")
        elif op == "purge":
            self.rows -= set(body["proposal_ids"])
        return {"ok": True}


class Budget:
    def snapshot(self):
        return {"units": 1}


def test_save_after_purge_and_from_another_attempt_object():
    server = FakeServer()
    first = HttpCheckpoint(server, 7, {"worker_id": "w", "lease_token": "t"}, "ticket-7:run")
    first.save(Budget())
    first.purge()
    first.save(Budget())
    second = first.attempt(1)
    second.purge()
    first.save(Budget())
