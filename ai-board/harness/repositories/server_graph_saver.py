"""LangGraph checkpointer qua API server: worker không giữ DB credential; mọi ghi/đọc mang lease và pin kế hoạch."""
from __future__ import annotations

import base64
import json
from typing import Any, Iterator, Sequence

from langgraph.checkpoint.base import BaseCheckpointSaver, Checkpoint, CheckpointMetadata, CheckpointTuple, ChannelVersions


def _pack(serde, value: Any) -> str:
    kind, blob = serde.dumps_typed(value)
    return json.dumps([kind, base64.b64encode(blob).decode("ascii")])


def _unpack(serde, packed: str) -> Any:
    kind, blob = json.loads(packed)
    return serde.loads_typed((kind, base64.b64decode(blob)))


class HttpGraphSaver(BaseCheckpointSaver):
    """Thread = `ticket-<id>:<scope>`; `pin` (plan_hash + base) khác với lúc ghi đầu thì server từ chối resume."""

    def __init__(self, client, ticket_id: int, lease: dict, pin: str):
        super().__init__()
        self.client, self.lease, self.pin = client, lease, pin
        self.base = f"/api/ai-board/worker/tickets/{ticket_id}/checkpoint"

    def _call(self, op: str, **body) -> dict:
        return self.client.post(f"{self.base}/{op}", {**self.lease, "pin": self.pin, **body})

    @staticmethod
    def _address(config: dict) -> tuple[str, str]:
        configurable = config["configurable"]
        return str(configurable["thread_id"]), str(configurable.get("checkpoint_ns", ""))

    def put(self, config, checkpoint: Checkpoint, metadata: CheckpointMetadata, new_versions: ChannelVersions) -> dict:
        thread, ns = self._address(config)
        parent = config["configurable"].get("checkpoint_id")
        self._call("graph_put", thread_id=thread, checkpoint_ns=ns, checkpoint_id=checkpoint["id"], parent_id=parent,
                   type="", checkpoint=_pack(self.serde, checkpoint), metadata=_pack(self.serde, metadata))
        return {"configurable": {"thread_id": thread, "checkpoint_ns": ns, "checkpoint_id": checkpoint["id"]}}

    def put_writes(self, config, writes: Sequence[tuple[str, Any]], task_id: str, task_path: str = "") -> None:
        thread, ns = self._address(config)
        rows = [{"idx": idx, "channel": channel, "type": "", "value": _pack(self.serde, value)}
                for idx, (channel, value) in enumerate(writes)]
        self._call("graph_writes", thread_id=thread, checkpoint_ns=ns, checkpoint_id=config["configurable"]["checkpoint_id"],
                   task_id=task_id, writes=rows)

    def purge(self, thread_id: str, checkpoint_ns: str = "") -> None:
        self._call("graph_purge", thread_id=thread_id, checkpoint_ns=checkpoint_ns)

    def get_tuple(self, config) -> CheckpointTuple | None:
        thread, ns = self._address(config)
        found = self._call("graph_get", thread_id=thread, checkpoint_ns=ns, checkpoint_id=config["configurable"].get("checkpoint_id"))
        return self._tuple(thread, ns, found.get("checkpoint"), found.get("writes") or [])

    def list(self, config, *, filter=None, before=None, limit=None) -> Iterator[CheckpointTuple]:
        thread, ns = self._address(config)
        before_id = before["configurable"]["checkpoint_id"] if before else None
        for row in self._call("graph_list", thread_id=thread, checkpoint_ns=ns, before=before_id, limit=limit or 10).get("checkpoints", []):
            yield self._tuple(thread, ns, row, [])

    def _tuple(self, thread: str, ns: str, row: dict | None, writes: list) -> CheckpointTuple | None:
        if not row:
            return None
        address = {"configurable": {"thread_id": thread, "checkpoint_ns": ns, "checkpoint_id": row["checkpoint_id"]}}
        parent = {"configurable": {"thread_id": thread, "checkpoint_ns": ns, "checkpoint_id": row["parent_id"]}} if row.get("parent_id") else None
        return CheckpointTuple(
            config=address,
            checkpoint=_unpack(self.serde, row["checkpoint"]),
            metadata=_unpack(self.serde, row["metadata"]),
            parent_config=parent,
            pending_writes=[(w["task_id"], w["channel"], _unpack(self.serde, w["value"])) for w in writes],
        )
