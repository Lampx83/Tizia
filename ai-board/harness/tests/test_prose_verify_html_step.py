"""critical_only: a prose verify on a step with no JS file still reaches the server as a runnable command."""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import worker_planner  # noqa: E402

SERVER_RUNNABLE = re.compile(r"^(node --test\b|node\s|npx\s|npm\s+(test|run)\b|curl\s|python[0-9.]*\s|pytest\b|grep\s|rg\s|bash\s|sh\s|docker compose\s|psql\s)")


def test_html_step_prose_verify_becomes_a_command_and_keeps_the_prose(monkeypatch):
    monkeypatch.setenv("AI_BOARD_CRITICAL_ONLY_CHECKS", "1")
    prose = "public/bao-che-hub.html chứa id='topic-summary' và gọi getTopicSummary('bao-che')"
    command, kept = worker_planner._runnable_verify(prose, ["public/bao-che-hub.html"])
    assert SERVER_RUNNABLE.match(command) and "public/bao-che-hub.html" in command
    assert kept == prose
    assert worker_planner._runnable_verify(prose, ["public/js/a.js"])[0] == "node --check public/js/a.js"
