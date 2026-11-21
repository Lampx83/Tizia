"""Budget and loop-control groups depend on no gate code."""
import ast
from pathlib import Path

RUNTIME = Path(__file__).resolve().parents[1] / "runtime"
GATE_PACKAGES = {"gates", "gate5", "verification"}


def test_budget_and_loop_groups_import_no_gate_package():
    for group in ("budgets", "loops"):
        for file in (RUNTIME / group).glob("*.py"):
            for node in ast.walk(ast.parse(file.read_text(encoding="utf-8"))):
                names = [a.name for a in node.names] if isinstance(node, ast.Import) else [node.module or ""] if isinstance(node, ast.ImportFrom) else []
                assert not {n.split(".")[0] for n in names} & GATE_PACKAGES, f"{file.name} imports a gate package"


def test_groups_do_not_import_each_other():
    for group, other in (("budgets", "loops"), ("loops", "budgets")):
        for file in (RUNTIME / group).glob("*.py"):
            assert f"runtime.{other}" not in file.read_text(encoding="utf-8"), file.name
