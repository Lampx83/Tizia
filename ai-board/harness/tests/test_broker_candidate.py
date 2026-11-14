"""Approved broker diff enters the candidate commit path; Gate 4 / publish exempt exactly that diff, nothing else."""
import json
from pathlib import Path

import pytest

from gates import guard, implement
from runtime import package_broker
from services import candidate
from services.candidate import Candidates
from test_full_checkout import child, git, state_for
from test_package_broker import LOCK, PKG, REQUEST, make


@pytest.fixture
def source(tmp_path):
    repo = tmp_path / "source"
    (repo / "public").mkdir(parents=True)
    (repo / "public" / "a.html").write_text("<p>old a</p>\n", encoding="utf-8")
    (repo / "package.json").write_text(json.dumps(PKG, indent=2) + "\n")
    (repo / "package-lock.json").write_text(json.dumps(LOCK, indent=2) + "\n")
    git(repo, "init", "-q")
    git(repo, "-c", "user.name=t", "-c", "user.email=t@t", "add", "-A")
    git(repo, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "base")
    return repo


@pytest.fixture
def built(tmp_path, source):
    broker, _ = make(source, tmp_path)
    out = broker.resolve(REQUEST)
    item = {"call_id": "pkg:lodash", "name": "lodash", "diff": out["diff"]}
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    state = state_for(tmp_path, [child(scratch, "Sửa A", "public/a.html", "<p>new a</p>\n", "test/a.test.js")])
    state.update(broker_diffs=[item], broker_receipts=str(broker.receipts_file))
    candidate.create(state, source)
    yield state, item, broker
    candidate.cleanup(state, keep_branch=False)


def diff_text(state):
    return "".join(item["diff"] for item in state["full_diff"])


def test_approved_diff_lands_in_its_own_commit_in_the_candidate(built):
    state, item, _ = built
    checkout = Path(state["full_checkout"])
    assert json.loads((checkout / "package.json").read_text())["dependencies"]["lodash"] == "^4.17.21"
    last = state["commits"][-1]
    assert last["title"].startswith(package_broker.DEPS_COMMIT_PREFIX + "lodash") and last["files"] == list(package_broker.FILES)
    assert git(checkout, "rev-parse", "HEAD") == last["sha"]
    assert "diff --git a/package.json" in diff_text(state)


def test_gate4_exempts_exactly_the_broker_diff(built):
    state, item, _ = built
    protected = lambda found: [f for f in found["findings"] if f["check"] == "protected_path"]
    assert not protected(guard.scan(diff_text(state), broker_diffs=[item["diff"]]))
    assert protected(guard.scan(diff_text(state)))
    other = dict(item, diff=item["diff"].replace("lodash", "dayjs"))
    assert protected(guard.scan(diff_text(state), broker_diffs=[other["diff"]]))
    smuggled = diff_text(state).replace('+    "lodash": "^4.17.21"', '+    "lodash": "^4.17.21",\n+    "left-pad": "^1.0.0"', 1)
    assert protected(guard.scan(smuggled, broker_diffs=[item["diff"]]))


def test_publish_check_allows_only_receipted_manifest_changes(built, source):
    state, _, broker = built
    cand = candidate.record(state)
    assert Candidates(source, broker_receipts=broker.receipts_file).denied_paths(cand) == []
    assert any("package.json" in reason for reason in Candidates(source).denied_paths(cand))
    forged = broker.receipts_file.parent / "forged.jsonl"
    forged.write_text("")
    assert any("package.json" in reason for reason in Candidates(source, broker_receipts=forged).denied_paths(cand))

    checkout = Path(state["full_checkout"])
    pkg = json.loads((checkout / "package.json").read_text())
    pkg["dependencies"]["left-pad"] = "^1.0.0"
    (checkout / "package.json").write_text(json.dumps(pkg, indent=2) + "\n")
    git(checkout, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-qam", "model edit")
    tampered = {**cand, "head_sha": git(checkout, "rev-parse", "HEAD")}
    assert any("package.json" in reason for reason in Candidates(source, broker_receipts=broker.receipts_file).denied_paths(tampered))


def test_attach_receipt_is_written_and_diff_that_does_not_apply_blocks_create(built, tmp_path, source):
    state, item, broker = built
    rows = [json.loads(line) for line in broker.receipts_file.read_text().splitlines()]
    assert [r["action"] for r in rows if r["action"] == "attach"] == ["attach"]
    assert package_broker.attached(broker.receipts_file, package_broker.digest([item["diff"]]))
    assert not package_broker.attached(broker.receipts_file, package_broker.digest([item["diff"].replace("lodash", "x")]))

    scratch = implement._ensure_scratch_repo(tmp_path / "scratch2")
    bad = state_for(tmp_path, [child(scratch, "Sửa A", "public/a.html", "<p>new a</p>\n", "test/a.test.js")])
    bad["scratch_repo"] = str(tmp_path / "scratch2")
    bad["broker_diffs"] = [{"name": "x", "diff": "diff --git a/package.json b/package.json\n--- a/package.json\n+++ b/package.json\n@@ -9 +9 @@\n-zzz\n+yyy\n"}]
    with pytest.raises(package_broker.BrokerError):
        candidate.create(bad, source)
