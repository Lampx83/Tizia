"""Package broker with fake registry/npm/docker: install-script reject, layer reuse + LRU, exact diff, protected manifest, receipts."""
import json
import subprocess

import pytest

import path_policy
import tools
from gates import guard
from runtime import network_request, package_broker
from runtime.budget import Budget
from test_network_request import ASK, loop
from test_tool_checkpoint import MemSteps
from test_tool_loop import EDIT, FINISH, PAGE, TEST

PKG = {"name": "tizia", "version": "1.0.0", "dependencies": {"express": "^4.0.0"}}
LOCK = {"name": "tizia", "lockfileVersion": 3, "packages": {"": {"name": "tizia", "dependencies": {"express": "^4.0.0"}},
                                                           "node_modules/express": {"version": "4.19.0"}}}
REQUEST = {"kind": "package", "name": "lodash", "version_range": "^4", "reason": "chunk", "call_id": "pkg:lodash"}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


class FakeRegistry:
    def __init__(self, scripts=None, version="4.17.21", fail=False):
        self.scripts, self.version, self.fail, self.calls = scripts or {}, version, fail, []

    def metadata(self, name, version_range):
        self.calls.append((name, version_range))
        if self.fail:
            raise package_broker.BrokerError("registry down")
        return {"version": self.version, "license": "MIT", "scripts": self.scripts, "age_days": 900, "weekly_downloads": 5_000_000}


class FakeNpm:
    """Rewrites the temp copy like `npm install --package-lock-only` would."""

    def __init__(self, extra=None, tamper=None):
        self.extra, self.tamper, self.specs = extra or {}, tamper, []

    def lock_only(self, workdir, spec):
        self.specs.append(spec)
        name, version = spec.rsplit("@", 1)
        pkg = json.loads((workdir / "package.json").read_text())
        pkg["dependencies"][name] = f"^{version}"
        lock = json.loads((workdir / "package-lock.json").read_text())
        lock["packages"][""]["dependencies"][name] = f"^{version}"
        lock["packages"][f"node_modules/{name}"] = {"version": version}
        lock["packages"].update(self.extra)
        if self.tamper:
            self.tamper(pkg, lock)
        (workdir / "package.json").write_text(json.dumps(pkg, indent=2) + "\n")
        (workdir / "package-lock.json").write_text(json.dumps(lock, indent=2) + "\n")


class FakeLayers:
    def __init__(self):
        self.built, self.loaded, self.removed = [], [], []

    def build(self, context, key):
        assert (context / "package-lock.json").is_file() and "tizia-deps" in (context / "Dockerfile").read_text()
        self.built.append(key)
        return f"tizia-deps:{key[:12]}"

    def load(self, ref):
        self.loaded.append(ref)

    def remove(self, ref):
        self.removed.append(ref)


class Clock:
    def __init__(self):
        self.now = 0

    def __call__(self):
        self.now += 1
        return self.now


@pytest.fixture
def checkout(tmp_path):
    root = tmp_path / "checkout"
    root.mkdir()
    (root / "package.json").write_text(json.dumps(PKG, indent=2) + "\n")
    (root / "package-lock.json").write_text(json.dumps(LOCK, indent=2) + "\n")
    return root


def make(checkout, tmp_path, *, registry=None, npm=None, cap=5):
    layers = FakeLayers()
    cache = package_broker.LayerCache(tmp_path / "cache", layers, cap, clock=Clock())
    return package_broker.Broker(checkout, registry or FakeRegistry(), npm or FakeNpm(), cache), layers


def test_install_script_package_is_rejected_before_any_install(checkout, tmp_path):
    for script in package_broker.INSTALL_SCRIPTS:
        npm = FakeNpm()
        broker, layers = make(checkout, tmp_path, registry=FakeRegistry({script: "node x.js"}), npm=npm)
        out = broker.resolve(REQUEST)
        assert out["decision"] == "rejected" and "install scripts" in out["reason"] and script in out["metadata"]["install_scripts"]
        assert not npm.specs and not layers.built and "diff" not in out


def test_transitive_install_script_in_lock_is_rejected(checkout, tmp_path):
    npm = FakeNpm({"node_modules/evil": {"version": "1.0.0", "hasInstallScript": True}})
    broker, layers = make(checkout, tmp_path, npm=npm)
    out = broker.resolve(REQUEST)
    assert out["decision"] == "rejected" and "node_modules/evil" in out["reason"] and not layers.built


def test_same_lockfile_same_layer_key_and_layer_is_reused(checkout, tmp_path):
    broker, layers = make(checkout, tmp_path)
    first, second = broker.resolve(REQUEST), broker.resolve(REQUEST)
    assert first["layer_key"] == second["layer_key"] and len(layers.built) == 1 == len(layers.loaded)
    assert [r["reused"] for r in broker.receipts if r["action"] == "resolve"] == [False, True]
    other = broker.resolve({**REQUEST, "name": "dayjs"})
    assert other["layer_key"] != first["layer_key"] and len(layers.built) == 2


def test_layer_key_is_sha256_of_resulting_lockfile(checkout, tmp_path):
    broker, _ = make(checkout, tmp_path)
    out = broker.resolve(REQUEST)
    new_lock = [line[1:] for line in out["diff"].splitlines() if line.startswith("+") and not line.startswith("+++")]
    assert out["layer_key"] == package_broker.lock_key(
        json.dumps({**LOCK, "packages": {**LOCK["packages"], "": {"name": "tizia", "dependencies": {"express": "^4.0.0", "lodash": "^4.17.21"}},
                    "node_modules/lodash": {"version": "4.17.21"}}}, indent=2) + "\n") and new_lock


def test_lru_eviction_past_cap_keeps_the_newest_and_drops_the_least_recently_used(checkout, tmp_path):
    broker, layers = make(checkout, tmp_path, cap=2)
    a = broker.resolve({**REQUEST, "name": "a"})["layer_key"]
    b = broker.resolve({**REQUEST, "name": "b"})["layer_key"]
    broker.resolve({**REQUEST, "name": "a"})
    c = broker.resolve({**REQUEST, "name": "c"})["layer_key"]
    assert broker.cache.keys() == sorted([a, c]) and layers.removed == [f"tizia-deps:{b[:12]}"]


def test_diff_is_limited_to_the_two_manifest_files_and_the_approved_package(checkout, tmp_path):
    broker, _ = make(checkout, tmp_path, npm=FakeNpm({"node_modules/dep": {"version": "1.0.0"}}))
    out = broker.resolve(REQUEST)
    heads = [line for line in out["diff"].splitlines() if line.startswith("diff --git")]
    assert heads == ["diff --git a/package.json b/package.json", "diff --git a/package-lock.json b/package-lock.json"]
    assert '+    "lodash": "^4.17.21"' in out["diff"] and out["metadata"]["transitive_count"] == 1
    assert not [l for l in out["diff"].splitlines() if l.startswith("-") and not l.startswith("---") and '"express": "^4.0.0"' not in l]
    assert (checkout / "package.json").read_text() == json.dumps(PKG, indent=2) + "\n"


@pytest.mark.parametrize("tamper, why", [
    (lambda pkg, lock: pkg["dependencies"].update(left_pad="^1"), "unexpected package.json change"),
    (lambda pkg, lock: pkg.update(scripts={"postinstall": "x"}), "unexpected package.json change"),
    (lambda pkg, lock: lock["packages"]["node_modules/express"].update(version="4.99.0"), "existing lock entries changed"),
])
def test_edits_beyond_the_approved_package_are_refused(checkout, tmp_path, tamper, why):
    broker, layers = make(checkout, tmp_path, npm=FakeNpm(tamper=tamper))
    out = broker.resolve(REQUEST)
    assert out["decision"] == "error" and why in out["reason"] and "diff" not in out and not layers.built


def test_metadata_for_the_card_and_registry_failure(checkout, tmp_path):
    broker, _ = make(checkout, tmp_path)
    meta = broker.screen(REQUEST)["metadata"]
    assert (meta["age_days"], meta["weekly_downloads"], meta["license"], meta["install_scripts"]) == (900, 5_000_000, "MIT", [])
    down, _ = make(checkout, tmp_path / "x", registry=FakeRegistry(fail=True))
    assert down.resolve(REQUEST)["decision"] == "error"


def test_every_broker_action_leaves_a_receipt_on_disk(checkout, tmp_path):
    broker, _ = make(checkout, tmp_path)
    broker.resolve(REQUEST)
    rows = [json.loads(line) for line in broker.receipts_file.read_text().splitlines()]
    assert [(r["action"], r["decision"]) for r in rows] == [("screen", "approved"), ("resolve", "approved")]
    assert rows[1]["layer_key"] and rows[1]["version"] == "4.17.21" and rows[1]["name"] == "lodash"


def test_non_package_request_is_not_handled(checkout, tmp_path):
    broker, _ = make(checkout, tmp_path)
    assert broker.resolve({"kind": "fetch_url", "url": "https://x", "call_id": "n"})["decision"] == "error"


def test_attach_applies_the_broker_diff_and_refuses_other_paths(checkout, tmp_path):
    broker, _ = make(checkout, tmp_path)
    out = broker.resolve(REQUEST)
    subprocess.run(["git", "init", "-q"], cwd=checkout, check=True)
    package_broker.attach(checkout, [out])
    assert json.loads((checkout / "package.json").read_text())["dependencies"]["lodash"] == "^4.17.21"
    with pytest.raises(package_broker.BrokerError):
        package_broker.attach(checkout, [{"diff": "diff --git a/server/index.js b/server/index.js\n"}])


def test_model_cannot_edit_the_manifest_or_lockfile():
    for path in ("package.json", "package-lock.json", "sub/package.json"):
        assert path_policy.denied(path, "write")
        findings = guard.scan(f"diff --git a/{path} b/{path}\n--- a/{path}\n+++ b/{path}\n@@ -1 +1,2 @@\n a\n+b\n")["findings"]
        assert any(f["check"] == "protected_path" and f["severity"] == "critical" for f in findings)
    out, deps = loop([{"tool": "edit_file", "arguments": {"file": "package.json", "edits": [{"after_line": 0, "insert": "{}"}]}},
                      EDIT, TEST, FINISH], network_request.Queue(), MemSteps())
    assert (out["status"], out["failure_class"]) == ("blocked", "critical") and "deny_paths" in out["reason"] and not out["steps"]


def test_queue_attaches_the_approved_diff_and_screens_install_scripts(checkout, tmp_path):
    broker, _ = make(checkout, tmp_path)
    queue = network_request.Queue({"pkg:lodash": {"decision": "approved"}}, broker=broker)
    assert queue.observe(REQUEST) == "approved lodash@4.17.21"
    [dep] = queue.report()["dependencies"]
    assert dep["name"] == "lodash" and dep["layer_key"] and dep["diff"].startswith("diff --git a/package.json")

    scripted, _ = make(checkout, tmp_path / "s", registry=FakeRegistry({"postinstall": "x"}))
    fresh = network_request.Queue(broker=scripted)
    assert fresh.observe(REQUEST).startswith("denied: lodash@4.17.21 runs install scripts") and not fresh.pending

    clean = network_request.Queue(broker=broker)
    assert clean.observe({**REQUEST, "call_id": "pkg:new"}) is None
    assert clean.pending[0]["metadata"]["weekly_downloads"] == 5_000_000


def test_one_queue_routes_packages_to_the_package_broker_and_fetches_to_the_fetch_broker(checkout, tmp_path):
    package, _ = make(checkout, tmp_path)
    fetch = network_request.FetchBroker({"allow_hosts": ["docs.example.com"], "max_bytes": 1000, "timeout_s": 1},
                                        fetcher=lambda url, cap, ip: (200, "text/plain", b"hello"), resolver=lambda host: ["93.184.216.34"],
                                        fallback=package)
    queue = network_request.Queue({"pkg:lodash": {"decision": "approved"}}, broker=fetch)
    assert queue.observe(REQUEST) == "approved lodash@4.17.21" and queue.report()["dependencies"][0]["name"] == "lodash"
    doc = {"kind": "fetch_url", "url": "https://docs.example.com/a", "reason": "r", "call_id": "net:1"}
    assert "UNTRUSTED DATA" in queue.observe(doc) and queue.receipts[0]["decision"] == "auto"
    assert queue.broker_state()["broker_diffs"][0]["name"] == "lodash" and queue.broker_state()["broker_receipts"].endswith("receipts.jsonl")
    assert queue.observe({"kind": "package", "name": "dayjs", "version_range": "^1", "reason": "r", "call_id": "pkg:dayjs"}) is None


def test_two_approved_packages_with_overlapping_hunks_attach_cleanly_in_order(checkout, tmp_path):
    base = {name: (checkout / name).read_text() for name in package_broker.FILES}
    alone = [make(checkout, tmp_path / f"alone{i}")[0].resolve({**REQUEST, "name": n, "call_id": f"pkg:{n}"})
             for i, n in enumerate(("lodash", "dayjs"))]
    naive = checkout.parent / "naive"
    naive.mkdir()
    for name, text in base.items():
        (naive / name).write_text(text)
    with pytest.raises(package_broker.BrokerError, match="does not apply"):
        package_broker.attach(naive, [{"name": n, "diff": out["diff"]} for n, out in zip(("lodash", "dayjs"), alone)])

    broker, _ = make(checkout, tmp_path)
    first = broker.resolve(REQUEST)
    second = broker.resolve({**REQUEST, "name": "dayjs", "call_id": "pkg:dayjs"})
    assert first["decision"] == second["decision"] == "approved"
    items = [{"name": "lodash", "diff": first["diff"]}, {"name": "dayjs", "diff": second["diff"]}]
    package_broker.attach(checkout, items)
    locked = json.loads((checkout / "package-lock.json").read_text())["packages"]
    assert {"node_modules/lodash", "node_modules/dayjs"} <= set(locked)
    assert second["layer_key"] == package_broker.lock_key((checkout / "package-lock.json").read_text())

    whole = "".join(package_broker.unified(n, base[n], (checkout / n).read_text()) for n in package_broker.FILES)
    assert package_broker.digest([i["diff"] for i in items]) == package_broker.digest([whole])
    assert package_broker.digest([items[0]["diff"]]) != package_broker.digest([whole])


def test_resolving_an_earlier_call_again_keeps_later_diffs_consistent(checkout, tmp_path):
    broker, _ = make(checkout, tmp_path)
    first, second = broker.resolve(REQUEST), broker.resolve({**REQUEST, "name": "dayjs", "call_id": "pkg:dayjs"})
    again = broker.resolve(REQUEST)
    assert again["diff"] == first["diff"] and [c for c, _ in broker.applied] == ["pkg:lodash", "pkg:dayjs"]
    assert broker.applied[1][1] == second["diff"]


def test_rejected_resolve_is_not_stacked_under_the_next_package(checkout, tmp_path):
    broker, _ = make(checkout, tmp_path, registry=FakeRegistry({"postinstall": "x"}))
    assert broker.resolve(REQUEST)["decision"] == "rejected" and broker.applied == []
