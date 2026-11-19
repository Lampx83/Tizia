"""Stub-server tests for board_http: login, retry, timeout, precheck, arm verify."""
import json
import threading
import unittest
from http.server import BaseHTTPRequestHandler, HTTPServer

import pytest

from evaluation.pipeline import DATA

if not DATA.exists():
    pytest.skip("needs the local AB data root (AB_DATA)", allow_module_level=True)

from evaluation.pipeline import board_http as bh


class Stub:
    """Serve scripted responses: routes maps path -> list of (status, body) consumed in order."""

    def __init__(self, routes):
        self.routes = {k: list(v) for k, v in routes.items()}
        self.hits = []
        outer = self

        class H(BaseHTTPRequestHandler):
            def log_message(self, *a):
                pass

            def _serve(self):
                length = int(self.headers.get("Content-Length") or 0)
                if length:
                    self.rfile.read(length)
                outer.hits.append((self.command, self.path))
                queue = outer.routes.get(self.path) or [(404, {"error": "not_found"})]
                status, body = queue.pop(0) if len(queue) > 1 else queue[0]
                if status == "hang":
                    threading.Event().wait(3)
                    return
                raw = json.dumps(body).encode()
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(raw)))
                self.end_headers()
                self.wfile.write(raw)

            do_GET = _serve
            do_POST = _serve

        self.server = HTTPServer(("127.0.0.1", 0), H)
        self.base = f"http://127.0.0.1:{self.server.server_port}"
        threading.Thread(target=self.server.serve_forever, daemon=True).start()

    def close(self):
        self.server.shutdown()
        self.server.server_close()


class BoardHttpTests(unittest.TestCase):
    def setUp(self):
        self.stub = None

    def tearDown(self):
        if self.stub:
            self.stub.close()

    def client(self, routes, **kw):
        self.stub = Stub(routes)
        return bh.BoardHttp(self.stub.base, user="u", password="p", timeout=1, retries=2, backoff=0, **kw)

    def test_login_then_get_json(self):
        c = self.client({"/api/auth/login": [(200, {"ok": True})],
                         "/api/admin/ai-board/queue": [(200, {"workers": []})]})
        c.login()
        self.assertEqual(c.get_json("/api/admin/ai-board/queue"), {"workers": []})

    def test_retry_on_503_then_ok(self):
        c = self.client({"/x": [(503, {"error": "busy"}), (200, {"v": 1})]})
        self.assertEqual(c.get_json("/x"), {"v": 1})
        self.assertEqual(len([h for h in self.stub.hits if h[1] == "/x"]), 2)

    def test_no_retry_on_404(self):
        c = self.client({"/x": [(404, {"error": "nope"})]})
        with self.assertRaises(bh.BoardError) as cm:
            c.get_json("/x")
        self.assertEqual(cm.exception.status, 404)
        self.assertEqual(len(self.stub.hits), 1)

    def test_timeout_raises_board_error(self):
        c = self.client({"/slow": [("hang", {})]})
        with self.assertRaises(bh.BoardError):
            c.get_json("/slow")

    def test_error_text_has_no_password(self):
        c = bh.BoardHttp(self.client({"/api/auth/login": [(401, {"error": "bad"})]}).base,
                         user="u", password="s3cret-xyz", timeout=1, retries=1, backoff=0)
        with self.assertRaises(bh.BoardError) as cm:
            c.login()
        self.assertNotIn("s3cret-xyz", str(cm.exception))

    def test_precheck_healthy(self):
        w = {"status": "idle", "last_seen_at": 1000, "gpu_retry_at": None, "gpu_error": None}
        self.assertEqual(bh.worker_problems(w, now_ms=1100), [])

    def test_precheck_problems(self):
        w = {"status": "waiting_gpu", "last_seen_at": 0, "gpu_retry_at": 9999, "gpu_error": "cooldown x"}
        problems = bh.worker_problems(w, now_ms=200_000)
        self.assertTrue(any("waiting_gpu" in p for p in problems))
        self.assertTrue(any("stale" in p or "last seen" in p for p in problems))

    def test_arm_verify_refuses_mismatch_and_prints_env(self):
        flags = {"AI_BOARD_PROGRESS_LOOP": "0", "AI_BOARD_MODEL_REPAIR": "0"}
        problems, env_lines = bh.verify_arm("B", flags)
        self.assertTrue(problems)
        self.assertIn("AI_BOARD_PROGRESS_LOOP=1", env_lines)
        self.assertIn("AI_BOARD_MODEL_REPAIR=1", env_lines)

    def test_arm_verify_missing_flags_refuses(self):
        problems, _ = bh.verify_arm("A", None)
        self.assertTrue(problems)
        self.assertIn("not reported", problems[0])

    def test_arm_verify_match(self):
        self.assertEqual(bh.verify_arm("A", {"AI_BOARD_PROGRESS_LOOP": "0", "AI_BOARD_MODEL_REPAIR": "0"}), ([], []))

    def test_arm_attestation_flags_contradiction(self):
        rec = bh.arm_attestation("A", False, {"stop_report_class": "x"})
        self.assertTrue(rec["arm_unverified"])
        self.assertFalse(rec["arm_attested"])
        self.assertIn("STOP_REPORT_V2", rec["arm_unverified_reason"])

    def test_arm_attestation_absence_is_not_proof(self):
        rec = bh.arm_attestation("A", True, {"stop_report_class": None})
        self.assertFalse(rec["arm_unverified"])
        self.assertTrue(rec["arm_attested"])

    def test_from_env_requires_explicit_base(self):
        with self.assertRaises(bh.BoardError):
            bh.BoardHttp.from_env("", environ={"AB_ADMIN_USER": "u", "AB_ADMIN_PASSWORD": "p", "AB_BASE": "http://x"})


if __name__ == "__main__":
    unittest.main()
