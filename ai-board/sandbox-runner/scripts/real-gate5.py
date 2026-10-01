"""Opt-in real check: the existing Gate 5 flow through the sandbox runner (needs the compose runner + pushed guest image).

docker run --rm --network tizia_sandbox-api -v <repo>/ai-board:/opt/ai-board/ai-board:ro -v <repo>/server:/opt/ai-board/server:ro -v <checkout>:/ck -v <token file>:/token:ro \
  -v <this script>:/real-gate5.py:ro python:3.12-slim-bookworm python /real-gate5.py <base_sha>
"""
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, "/opt/ai-board/ai-board/harness")
import sandbox_verify  # noqa: E402

base_sha = sys.argv[1]
state = {
    "skill_id": "ticket-e2e", "full_checkout": "/ck", "base_sha": base_sha,
    "request_detail": "[Trang: Trường IT] /school.html?domain=it\nThêm ước tính phút chờ worker (ETA) trên dòng hàng đợi.",
    "diffs": [{"file": "public/js/suggestion-fab.js", "test_file": "test/e2e-probe.test.js", "diff": "+// e2e probe: harmless change"}],
}
client = sandbox_verify.RunnerClient("http://sandbox-runner:8090", Path("/token").read_text().strip(), timeout=900)  # first create pulls the guest image
started = time.time()
result = sandbox_verify.run(state, client=client)
print(f"\n== gate 5 finished in {time.time() - started:.0f}s")
evidence = result.get("evidence") or {}
print(json.dumps({k: result.get(k) for k in ("gate", "blocked", "reason", "failure_class")}, ensure_ascii=False))
print("evidence text tail:\n" + (evidence.get("text") or "")[-3500:])
print(json.dumps({"smoke_passed": evidence.get("smoke_passed"), "http_observed": evidence.get("http_observed"), "runner": evidence.get("runner"),
                  "functional": evidence.get("functional"), "sandbox": evidence.get("sandbox"),
                  "shots": [{k: s.get(k) for k in ("phase", "page", "width")} for s in evidence.get("screenshots") or []]}, ensure_ascii=False))
for shot in evidence.get("screenshots") or []:
    assert Path(shot["path"]).stat().st_size > 1000, shot
sys.exit(1 if result.get("blocked") else 0)
