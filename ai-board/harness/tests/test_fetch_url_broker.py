"""fetch_url broker: allowlist auto-approve, admin queue for other hosts, scheme/private-IP refusal, size cap, receipts."""
import pytest

import tools
from runtime import limits, network_request, tool_loop
from runtime.budget import Budget
from runtime.network_request import FetchBroker, Queue, tool_request
from test_tool_loop import EDIT, FINISH, PAGE, SUBTASK, TEST, Deps

CONFIG = {"allow_hosts": ["docs.example.com"], "max_bytes": 1000, "timeout_s": 5}
PUBLIC = lambda host: ["93.184.216.34"]
HTML = b"<html><head><style>p{}</style><script>alert(1)</script></head><body><p>Hello <b>docs</b></p></body></html>"


class Fetcher:
    def __init__(self, body=HTML, status=200, content_type="text/html; charset=utf-8"):
        self.body, self.status, self.content_type, self.calls = body, status, content_type, []

    def __call__(self, url, max_bytes):
        self.calls.append(url)
        return self.status, self.content_type, self.body[:max_bytes + 1]


def fetch(url, reason="read docs", **extra):
    return tool_request("fetch_url", {"url": url, "reason": reason, **extra})


def queue_with(fetcher=None, resolver=PUBLIC, config=CONFIG):
    return Queue(broker=FetchBroker(config, fetcher=fetcher or Fetcher(), resolver=resolver))


def test_allowlisted_host_is_fetched_without_pausing():
    fetcher = Fetcher()
    queue = queue_with(fetcher)
    text = queue.observe(fetch("https://docs.example.com/api"))
    assert text is not None and fetcher.calls == ["https://docs.example.com/api"]
    assert queue.pending == []


def test_contract_allowlist_fetches_docs_and_queues_other_hosts():
    config = limits.fetch_url()
    assert config["allow_hosts"] == ["developer.mozilla.org", "nodejs.org", "expressjs.com", "www.postgresql.org", "docs.npmjs.com", "playwright.dev"]
    fetcher = Fetcher()
    queue = queue_with(fetcher, config=config)
    assert queue.observe(fetch("https://nodejs.org/api/fs.html")) is not None
    assert queue.observe(fetch("https://other.net/page")) is None
    assert queue.pending[0]["url"] == "https://other.net/page" and fetcher.calls == ["https://nodejs.org/api/fs.html"]


def test_allowlist_matches_subdomains_not_lookalikes():
    fetcher, queue = Fetcher(), queue_with()
    assert queue.observe(fetch("https://api.docs.example.com/x")) is not None
    assert queue.observe(fetch("https://docs.example.com.evil.net/x")) is None
    assert queue.observe(fetch("https://evil-docs.example.com/x")) is None


def test_non_allowlisted_host_pauses_and_admin_approval_fetches():
    fetcher = Fetcher()
    queue = queue_with(fetcher)
    request = fetch("https://other.net/page")
    assert queue.observe(request) is None
    assert fetcher.calls == [] and queue.pending[0]["url"] == "https://other.net/page"
    queue.decisions[request["call_id"]] = {"decision": network_request.APPROVED}
    assert "Hello docs" in queue.observe(request) and fetcher.calls == ["https://other.net/page"]


def test_admin_rejection_is_denied_without_fetch():
    fetcher = Fetcher()
    request = fetch("https://other.net/page")
    queue = queue_with(fetcher)
    queue.decisions[request["call_id"]] = {"decision": network_request.REJECTED, "reason": "no"}
    assert queue.observe(request) == "denied: no" and fetcher.calls == []


@pytest.mark.parametrize("url", ["file:///etc/passwd", "ftp://docs.example.com/a", "javascript:alert(1)", "https:///nohost"])
def test_non_http_scheme_is_refused_before_anything_else(url):
    fetcher, queue = Fetcher(), queue_with()
    assert queue.observe(fetch(url)).startswith("denied:")
    assert fetcher.calls == [] and queue.pending == []


@pytest.mark.parametrize("url, resolved", [
    ("https://docs.example.com/a", ["10.0.0.5"]),
    ("https://docs.example.com/a", ["93.184.216.34", "192.168.1.9"]),
    ("https://docs.example.com/a", ["127.0.0.1"]),
    ("https://docs.example.com/a", ["169.254.169.254"]),
    ("https://docs.example.com/a", ["::1"]),
    ("https://docs.example.com/a", ["fe80::1"]),
    ("https://docs.example.com/a", ["::ffff:10.1.2.3"]),
    ("https://docs.example.com/a", ["100.64.0.1"]),
    ("https://other.net/a", ["172.16.0.1"]),
    ("http://127.0.0.1:8041/api/x", ["127.0.0.1"]),
    ("http://localhost/x", ["127.0.0.1"]),
])
def test_host_resolving_to_private_or_loopback_is_refused(url, resolved):
    fetcher = Fetcher()
    queue = queue_with(fetcher, resolver=lambda host: resolved)
    assert queue.observe(fetch(url)).startswith("denied:")
    assert fetcher.calls == [] and queue.pending == []


def test_unresolvable_host_is_refused():
    def nxdomain(host):
        raise OSError("no such host")
    fetcher = Fetcher()
    queue = queue_with(fetcher, resolver=nxdomain)
    assert queue.observe(fetch("https://docs.example.com/a")).startswith("denied:")
    assert fetcher.calls == []


def test_body_over_cap_is_truncated_with_marker():
    queue = queue_with(Fetcher(body=b"z" * 10_000, content_type="text/plain"))
    text = queue.observe(fetch("https://docs.example.com/big"))
    assert "[truncated at 1000 bytes]" in text
    assert 1000 >= text.count("z") > 0


def test_html_is_stripped_to_text_and_labelled_untrusted():
    queue = queue_with()
    text = queue.observe(fetch("https://docs.example.com/api"))
    assert "Hello docs" in text and "alert(1)" not in text and "<p>" not in text and "p{}" not in text
    assert "UNTRUSTED DATA" in text and "https://docs.example.com/api" in text


def test_non_text_content_type_is_refused():
    queue = queue_with(Fetcher(body=b"\x89PNG", content_type="image/png"))
    assert queue.observe(fetch("https://docs.example.com/a.png")).startswith("denied:")


def test_each_fetch_leaves_a_receipt():
    queue = queue_with()
    queue.observe(fetch("https://docs.example.com/a"))
    queue.observe(fetch("https://docs.example.com/a"))
    queue.observe(fetch("file:///x"))
    assert [r["decision"] for r in queue.receipts] == ["auto", "auto", "refused"]
    assert queue.receipts[0]["url"] == "https://docs.example.com/a" and len(queue.receipts[0]["sha256"]) == 64
    assert queue.report()["receipts"] == queue.receipts


def test_fetch_error_is_a_failed_receipt_not_a_crash():
    def boom(url, max_bytes):
        raise TimeoutError("slow")
    queue = queue_with(fetcher=boom)
    assert queue.observe(fetch("https://docs.example.com/a")).startswith("fetch failed")
    assert queue.receipts[0]["decision"] == "failed"


def test_package_kind_still_delegates_to_fallback():
    queue = Queue(broker=FetchBroker(CONFIG, fetcher=Fetcher(), resolver=PUBLIC))
    assert queue.observe(network_request.package_request("lodash")) is None


@pytest.fixture
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


def test_tool_loop_sees_fetched_text_as_untrusted_data_without_pausing(base_file, monkeypatch):
    deps = Deps([{"tool": "fetch_url", "arguments": {"url": "https://docs.example.com/api", "reason": "read api"}},
                 EDIT, TEST, FINISH])
    deps.network = queue_with()
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc",
                                check=lambda out: None)
    assert out["status"] == "proposed"
    assert "UNTRUSTED DATA" in deps.prompts[1] and "Hello docs" in deps.prompts[1]
