"""Official AB eval round pipeline. Cases, trials and rounds live outside git under DATA (env AB_DATA)."""
import os
from pathlib import Path

WORKTREE = Path(os.environ.get("AB_WORKTREE", r"H:\01_Main_coding_projects\Tizia"))
DATA = Path(os.environ.get("AB_DATA") or WORKTREE / ".scratch" / "ab-driver")
HARNESS = Path(__file__).resolve().parents[2]
REPO = HARNESS.parents[1]
