"""Manifest tool: parse chặt, băm canonical, registry và trần sinh từ manifest, băm vào pin của suite."""
import copy
import json

import pytest

import tools
from runtime import tool_loop, tool_manifest
from runtime.budget import Budget, ChildBudget

RAW = json.loads(tool_manifest.PATH.read_text(encoding="utf-8"))
KNOWN = tool_loop.IMPLEMENTED


def mutated(change):
    data = copy.deepcopy(RAW)
    change(data)
    return data


def test_registry_comes_from_the_manifest():
    assert set(tool_loop.SCHEMAS) == {t["name"] for t in RAW["tools"]} == KNOWN
    for tool in RAW["tools"]:
        assert tool_loop.SCHEMAS[tool["name"]] == tool["parameters"]
        assert tool_loop.DESCRIPTIONS[tool["name"]] == tool["description"]


def test_repo_read_tools_do_not_drift_from_the_context_tools():
    for name in tool_loop.REPO_TOOLS:
        assert tool_loop.SCHEMAS[name] == tools.TOOLS[name].parameters
        assert tool_loop.DESCRIPTIONS[name] == tools.TOOLS[name].description


def test_hash_follows_content_not_layout_and_changes_with_a_schema():
    base = tool_manifest.canonical_hash(RAW)
    assert tool_loop.MANIFEST.hash == base
    assert tool_manifest.canonical_hash(json.loads(json.dumps(RAW, indent=7))) == base
    changed = mutated(lambda d: d["tools"][3]["parameters"]["properties"].update(extra={"type": "string"}))
    assert tool_manifest.canonical_hash(changed) != base
    capped = mutated(lambda d: d["tools"][0].update(max_output_chars=1999))
    assert tool_manifest.canonical_hash(capped) != base


@pytest.mark.parametrize("change", [
    lambda d: d["tools"].append({**d["tools"][0], "name": "shell"}),
    lambda d: d["tools"].append(dict(d["tools"][0])),
    lambda d: d["tools"][0].update(effect="network"),
    lambda d: d["tools"][0].pop("max_seconds"),
    lambda d: d["tools"][0].update(max_arg_bytes=0),
    lambda d: d["tools"][0].update(max_output_chars=True),
    lambda d: d["tools"][0].update(parameters={"type": "string"}),
    lambda d: d.update(tools=[]),
    lambda d: d.update(version="1"),
], ids=["unimplemented", "duplicate", "effect", "missing-field", "zero-cap", "bool-cap", "schema-type", "empty", "version"])
def test_bad_manifest_is_refused(change):
    with pytest.raises(tool_manifest.ManifestError):
        tool_manifest.parse(mutated(change), known=KNOWN)


def test_effects_drive_the_write_set():
    assert tool_loop.WRITE_TOOLS == ("edit_file", "write_test")
    assert tool_loop.MANIFEST.names("control") == ("finish",)


def test_argument_byte_cap_is_enforced_before_the_tool_runs():
    cap = tool_loop.MANIFEST.tools["read_file"].max_arg_bytes
    with pytest.raises(tool_loop.ToolError, match="trần"):
        tool_loop.validate("read_file", {"file": "x" * cap})


def test_slow_tool_is_rolled_back_and_refused(monkeypatch):
    ws = tool_loop.Workspace(None, "sha", "public/a.html", "<p>a</p>\n")
    monkeypatch.setattr(tool_loop.tools, "_show", lambda *a: "<p>a</p>\n")
    ticks = iter([0.0, tool_loop.MANIFEST.tools["edit_file"].max_seconds + 1])
    monkeypatch.setattr(tool_loop.time, "monotonic", lambda: next(ticks))
    with pytest.raises(tool_loop.ToolError, match="thời gian"):
        ws.run("edit_file", {"file": "public/a.html", "edits": [{"after_line": 1, "insert": "<p>b</p>"}]})
    assert ws.content == "<p>a</p>\n"


def test_checkpoint_pin_is_the_manifest_hash():
    ws = tool_loop.Workspace(None, "sha", "public/a.html", "x\n")
    pins = tool_loop._pins({"title": "t", "file": "public/a.html", "verify": "v"}, "sha", ws, None)
    assert pins["tools"] == tool_loop.MANIFEST.hash[:16]


def test_suite_provenance_pins_the_manifest():
    from pathlib import Path
    from evaluation.suite import runner
    root = Path(__file__).resolve().parents[3]
    meta = runner.provenance(root, "m", None)
    assert meta["tool_manifest"] == tool_loop.MANIFEST.hash and "tool_manifest" in runner.FIXED


@pytest.mark.parametrize("argv", [
    ["rm", "-rf", "dist"],
    ["npm", "install", "left-pad"],
    ["npx", "cowsay"],
    ["git", "push", "origin", "main"],
    ["git", "-C", "/x", "status"],
    ["node", "--test", "--", "DROP TABLE users"],
    ["git", "log", "-rf"],
], ids=["rm", "install", "npx", "git-write", "git-C", "drop-sql", "deny-arg"])
def test_command_outside_policy_is_refused(argv):
    assert tool_loop.MANIFEST.policy.command_reason(argv)


def test_allowed_commands_pass():
    for argv in (["git", "status"], ["npm", "test"], ["python", "-m", "pytest", "-q"]):
        assert tool_loop.MANIFEST.policy.command_reason(argv) is None


@pytest.mark.parametrize("path", ["package-lock.json", "app/yarn.lock", "dist/a.js", "x/generated/b.js"])
def test_generated_and_lock_files_are_write_denied(path):
    assert tool_loop.MANIFEST.policy.write_reason(path)
    assert tool_loop.MANIFEST.policy.write_reason("public/a.html") is None


@pytest.mark.parametrize("change", [
    lambda d: d.pop("command_policy"),
    lambda d: d["command_policy"].update(allow=[]),
    lambda d: d["command_policy"].update(allow=[[]]),
    lambda d: d["command_policy"].update(deny_write="*.lock"),
    lambda d: d["command_policy"].pop("deny_sql"),
], ids=["absent", "no-allow", "empty-prefix", "deny-not-list", "missing-key"])
def test_bad_command_policy_is_refused(change):
    with pytest.raises(tool_manifest.ManifestError):
        tool_manifest.parse(mutated(change), known=KNOWN)


def test_policy_change_changes_manifest_hash():
    base = tool_manifest.canonical_hash(RAW)
    loosened = mutated(lambda d: d["command_policy"]["allow"].append(["npx"]))
    assert tool_manifest.canonical_hash(loosened) != base
