"""Gate 4 pin đóng bao phụ thuộc: đổi helper gián tiếp, shim redirect, lexicon hay prompt đều làm pin đổi."""
import re
from pathlib import Path


from repositories.server_gate_proof import gate4_pins, verifier_closure, verifier_pin



def write(root, rel, text):
    path = root / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def tree(tmp_path):
    repo = tmp_path
    harness = repo / "ai-board" / "harness"
    write(harness, "gates/__init__.py", "")
    write(harness, "gates/guard.py", "from gates import helper\nLEX = open('x')\n")
    write(harness, "gates/helper.py", "def f(): return 1\n")
    write(harness, "gates/unrelated.py", "X = 1\n")
    write(harness, "candidate.py", "from _compat import redirect\nredirect(__name__, 'services.impl', cli=False)\n")
    write(harness, "_compat.py", "def redirect(name, target, *, cli=False):\n    pass\n")
    write(harness, "services/__init__.py", "")
    write(harness, "services/impl.py", "def g(): return 2\n")
    write(harness, "prompts/content_guard.md", "guard prompt\n")
    write(repo, "server/ai-board/guard-lexicon.json", "{}\n")
    return repo, harness


def closure(repo, harness, entries=("gates/guard.py", "candidate.py")):
    data = ((harness, "prompts/*"), (repo, "server/ai-board/*.json"))
    return verifier_closure(entries=entries, harness=harness, repo=repo, data=data)


def pin(repo, harness, entries=("gates/guard.py", "candidate.py")):
    data = ((harness, "prompts/*"), (repo, "server/ai-board/*.json"))
    return verifier_pin(entries=entries, harness=harness, repo=repo, data=data)


def test_closure_follows_imports_redirects_and_data(tmp_path):
    repo, harness = tree(tmp_path)
    uncertain, files = closure(repo, harness)
    assert uncertain is False
    assert {"ai-board/harness/gates/helper.py", "ai-board/harness/services/impl.py",
            "ai-board/harness/_compat.py", "ai-board/harness/prompts/content_guard.md",
            "server/ai-board/guard-lexicon.json"} <= set(files)
    assert "ai-board/harness/gates/unrelated.py" not in files


def test_changing_an_indirect_helper_or_data_file_changes_the_pin(tmp_path):
    repo, harness = tree(tmp_path)
    base = pin(repo, harness)
    write(harness, "services/impl.py", "def g(): return 3\n")
    assert pin(repo, harness) != base
    base = pin(repo, harness)
    write(repo, "server/ai-board/guard-lexicon.json", '{"x": 1}\n')
    assert pin(repo, harness) != base
    base = pin(repo, harness)
    write(harness, "prompts/content_guard.md", "other\n")
    assert pin(repo, harness) != base


def test_unrelated_file_keeps_the_pin_and_same_tree_is_stable(tmp_path):
    repo, harness = tree(tmp_path)
    base = pin(repo, harness)
    assert pin(repo, harness) == base
    write(harness, "gates/unrelated.py", "X = 2\n")
    assert pin(repo, harness) == base


def test_dynamic_import_is_uncertain_so_the_pin_never_matches(tmp_path):
    repo, harness = tree(tmp_path)
    write(harness, "gates/helper.py", "import importlib\ndef f(n): return importlib.import_module(n)\n")
    uncertain, _ = closure(repo, harness)
    assert uncertain is True
    assert pin(repo, harness) != pin(repo, harness)


def test_non_literal_redirect_is_uncertain(tmp_path):
    repo, harness = tree(tmp_path)
    write(harness, "candidate.py", "from _compat import redirect\nredirect(__name__, TARGET)\n")
    assert closure(repo, harness, entries=("candidate.py",))[0] is True


def test_real_tree_closure_covers_the_known_dependencies():
    uncertain, files = verifier_closure()
    assert uncertain is False
    for rel in ("ai-board/harness/gates/adversarial_review.py", "ai-board/harness/gates/change_class.py",
                "ai-board/harness/services/candidate.py", "ai-board/harness/security/classifier.py",
                "server/ai-board/guard-lexicon.json", "ai-board/harness/prompts/content_guard.md",
                "server/ai-board/classifier-calibration.json"):
        assert rel in files, rel


def test_gate4_harness_pin_is_bounded_and_versioned():
    state = {"diffs": [], "base_sha": "a", "catalog": {}}
    pins = gate4_pins(state, plan_hash="p", model="m", tool_hash="t")
    assert pins["harness"].startswith("v2:") and len(pins["harness"]) <= 200
    assert re.fullmatch(r"v2:[0-9a-f]{32}", pins["harness"])


def test_manifest_hashes_are_sha256_per_file(tmp_path):
    repo, harness = tree(tmp_path)
    _, files = closure(repo, harness)
    assert all(re.fullmatch(r"[0-9a-f]{64}", digest) for digest in files.values())
    assert files == closure(repo, harness)[1]

