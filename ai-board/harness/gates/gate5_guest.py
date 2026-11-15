"""Gate 5 entry inside the microVM: `python -m gates.gate5_guest <state.json> <checkout> <out_dir>` from the harness dir.
Baked into the guest image so the candidate checkout cannot replace gate code."""
from __future__ import annotations

import json
import os
import shutil
import sys
import tarfile
import time
from pathlib import Path


class _CheckSpans:
    """Trace stand-in: keeps check spans as offsets from guest start; the host re-anchors them."""

    def __init__(self, origin_ms: int):
        self.origin_ms, self.spans = origin_ms, []

    def add_span(self, name, attributes, *, start_ms, end_ms, status="ok", kind="internal"):
        self.spans.append({"name": name, "attributes": dict(attributes), "offset_ms": start_ms - self.origin_ms,
                           "duration_ms": end_ms - start_ms, "status": status})


def run_in_guest(state_path: Path, checkout: Path, out: Path) -> dict:
    """Run Gate 5; write out/result.json + out/shots.tgz; return result with screenshot paths made relative."""
    from types import SimpleNamespace

    from gates import verify

    state = json.loads(state_path.read_text(encoding="utf-8"))
    base_pages = state_path.parent / "base"
    if base_pages.is_dir():
        state["base_pages_dir"] = str(base_pages)
    spans = _CheckSpans(int(time.time() * 1000))
    result = verify.run(state, checkout_dir=checkout, deps=SimpleNamespace(trace=spans))
    result["check_spans"] = spans.spans

    shots_dir = out / "shots"
    shots_dir.mkdir(parents=True, exist_ok=True)
    evidence = result.get("evidence") or {}
    for shot in evidence.get("screenshots") or []:
        source = Path(shot["path"])
        if source.is_file():
            shutil.copy2(source, shots_dir / source.name)
        shot["path"] = source.name
    if evidence.get("screenshot"):
        evidence["screenshot"] = Path(evidence["screenshot"]).name
    with tarfile.open(out / "shots.tgz", "w:gz") as archive:
        for file in sorted(shots_dir.iterdir()):
            archive.add(file, arcname=file.name)
    (out / "result.json").write_text(json.dumps(result, ensure_ascii=False, default=str), encoding="utf-8")
    return result


if __name__ == "__main__":
    os.environ["AI_BOARD_VERIFY_NETWORK"] = "internal"  # candidate gets a no-egress network, reached by container IP
    state_arg, checkout_arg, out_arg = sys.argv[1:4]
    run_in_guest(Path(state_arg), Path(checkout_arg), Path(out_arg))
