"""Opt-in real check: the existing Gate 5 flow through the sandbox runner (needs the compose runner + pushed guest image).

docker run --rm --network tizia-local_sandbox-api -v <repo>/ai-board:/opt/ai-board/ai-board:ro -v <repo>/server:/opt/ai-board/server:ro -v <checkout>:/ck -v <token file>:/token:ro \
  -v <this script>:/real-gate5.py:ro python:3.12-slim-bookworm sh -c "pip install -q pydantic-settings && python /real-gate5.py <base_sha> <kind>"
"""
import os
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, "/opt/ai-board/ai-board/harness")
import sandbox_verify  # noqa: E402

base_sha = sys.argv[1]
TEST = "test/e2e-probe.test.js"
# Candidate diffs are verdict inputs (paths, hunks); they are not applied to /ck, which stays at base_sha.
KINDS = {
    "static-page": [{"file": "public/js/suggestion-fab.js", "test_file": TEST, "diff": (
        "@@ -12,6 +12,7 @@\n"
        " const FAB_SELECTOR = '#suggestion-fab';\n"
        "+const FAB_IDLE_HIDE_MS = 8000;\n"
        " export function mountFab(root) {\n")}],
    "js-module": [{"file": "public/js/request-thread.js", "test_file": TEST, "diff": (
        "@@ -40,7 +40,9 @@ export function renderThread(items) {\n"
        "-  return items.map(renderItem).join('');\n"
        "+  const ordered = [...items].sort((a, b) => a.createdAt - b.createdAt);\n"
        "+  return ordered.map(renderItem).join('');\n")}],
    "backend-route": [
        {"file": "server/contexts/admin/index.js", "test_file": TEST, "diff": (
            "@@ -88,3 +88,6 @@\n"
            "+  app.get('/api/admin/queue-eta', requireAdmin, async (req, res) => {\n"
            "+    res.json({ eta_minutes: await estimateQueueEta() });\n"
            "+  });\n")},
        {"file": "public/js/admin-dashboard.js", "test_file": TEST, "diff": (
            "@@ -20,4 +20,5 @@\n"
            "+  queueEta: '/api/admin/queue-eta',\n")},
    ],
}
kind = sys.argv[2] if len(sys.argv) > 2 else "static-page"
state = {
    "skill_id": "ticket-e2e", "full_checkout": "/ck", "base_sha": base_sha,
    "request_detail": "[Trang: Trường IT] /school.html?domain=it\nThêm ước tính phút chờ worker (ETA) trên dòng hàng đợi.",
    "diffs": KINDS[kind],
}
probe = Path("/ck") / TEST  # the gate copies the diff's generated test into the container; the driver has no worker to write one
created = not probe.exists()
if created:
    probe.parent.mkdir(parents=True, exist_ok=True)
    probe.write_text("import test from 'node:test';\ntest('probe', () => {});\n", encoding="utf-8")
client = sandbox_verify.RunnerClient(os.environ.get("AI_BOARD_SANDBOX_URL") or "http://sandbox-runner:8090", Path("/token").read_text().strip(), timeout=900)  # first create pulls the guest image
started = time.time()
result = sandbox_verify.run(state, client=client)
print(f"\n== gate 5 finished in {time.time() - started:.0f}s")
evidence = result.get("evidence") or {}
print(json.dumps({k: result.get(k) for k in ("gate", "blocked", "reason", "failure_class")}, ensure_ascii=False))
if os.environ.get("GATE5_EVIDENCE_OUT"):
    Path(os.environ["GATE5_EVIDENCE_OUT"]).write_text(evidence.get("text") or "", encoding="utf-8")
print("evidence text tail:\n" + (evidence.get("text") or "")[-3500:])
print(json.dumps({"smoke_passed": evidence.get("smoke_passed"), "http_observed": evidence.get("http_observed"), "runner": evidence.get("runner"),
                  "functional": evidence.get("functional"), "sandbox": evidence.get("sandbox"),
                  "shots": [{k: s.get(k) for k in ("phase", "page", "width")} for s in evidence.get("screenshots") or []]}, ensure_ascii=False))
for shot in evidence.get("screenshots") or []:
    assert Path(shot["path"]).stat().st_size > 1000, shot
if created:
    probe.unlink()
sys.exit(1 if result.get("blocked") else 0)
