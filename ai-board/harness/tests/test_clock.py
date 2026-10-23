import json
from datetime import datetime, timezone
from pathlib import Path

import clock

CONTRACT = Path(__file__).resolve().parents[3] / "server" / "ai-board" / "contract.json"


def _ms(*args):
    return int(datetime(*args, tzinfo=timezone.utc).timestamp() * 1000)


def test_fixed_utc_instant_prints_vietnam_time():
    assert clock.fmt(_ms(2026, 10, 23, 18, 30)) == "2026-10-24 01:30:00 +07:00"
    assert clock.fmt(_ms(2026, 10, 23, 0, 0)) == "2026-10-23 07:00:00 +07:00"


def test_tz_matches_contract():
    assert json.loads(CONTRACT.read_text(encoding="utf-8"))["clock"]["tz"] == str(clock.TZ)


def test_injected_clock_drives_now_ms():
    old = clock.set_source(lambda: 1_700_000_000_123)
    try:
        assert clock.now_ms() == 1_700_000_000_123
    finally:
        clock.set_source(old)
    assert clock.now_ms() != 1_700_000_000_123
