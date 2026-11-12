import pytest

from gates.gate5_session import missing_tool


@pytest.mark.parametrize("output,expected", [
    ("sh: 1: curl: not found\n", "curl"),
    ("sh: line 1: curl: command not found\n", "curl"),
    ("/bin/sh: 1: wget: not found", "wget"),
    ("bash: line 3: jq: command not found", "jq"),
    ("sh: curl: not found", "curl"),
    ("sh: 1: curl: not found | grep -q x", "curl"),
    ("zsh-like: node: command not found", "node"),
])
def test_shell_not_found_names_the_tool(output, expected):
    assert missing_tool(output) == expected


@pytest.mark.parametrize("output", [
    "",
    "AssertionError: expected 3 got 2",
    "grep: input.txt: No such file or directory",
    "cp: foo: not found in archive",
])
def test_plain_output_is_not_a_missing_tool(output):
    assert missing_tool(output) is None


def test_exit_127_without_message_uses_first_command_word():
    assert missing_tool("", 127, "curl -fsS http://127.0.0.1:8041/") == "curl"


def test_exit_127_skips_env_assignments():
    assert missing_tool("", 127, "NODE_ENV=test npx playwright test") == "npx"


def test_other_exit_codes_without_message_are_not_missing_tools():
    assert missing_tool("", 1, "npm test") is None
    assert missing_tool("", 0, "npm test") is None
