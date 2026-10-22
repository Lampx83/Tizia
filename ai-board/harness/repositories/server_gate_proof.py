"""Bằng chứng cổng kiểm chứng qua API worker: server là verifier, worker gửi pin hiện tại và nhận reuse hoặc lý do drift."""
from __future__ import annotations

import ast
import hashlib
import json
import uuid
from pathlib import Path

HARNESS = Path(__file__).resolve().parents[1]
REPO = HARNESS.parents[1]
VERIFIER_ENTRIES = ("gates/static_check.py", "gates/guard.py", "gates/risk_triage.py", "candidate.py",
                    "gates/adversarial_review.py", "gates/change_class.py")
DATA_GLOBS = ((HARNESS, "prompts/*"), (REPO, "server/ai-board/*.json"))
DYNAMIC_IMPORTERS = ("import_module", "__import__", "redirect")


def digest(value) -> str:
    raw = value if isinstance(value, bytes) else json.dumps(value, sort_keys=True, ensure_ascii=False, default=str).encode("utf-8")
    return hashlib.sha256(raw).hexdigest()


def _module_file(root: Path, parts: tuple) -> Path | None:
    base = root.joinpath(*parts)
    for cand in (base.with_suffix(".py"), base / "__init__.py"):
        if cand.is_file():
            return cand
    return None


def _ancestors(root: Path, parts: tuple) -> list[Path]:
    return [init for init in (root.joinpath(*parts[:i], "__init__.py") for i in range(1, len(parts))) if init.is_file()]


def _targets(path: Path, root: Path):
    """(dotted parts to resolve, uncertain) của một file nguồn; import tương đối và redirect được quy về tên tuyệt đối."""
    tree = ast.parse(path.read_bytes(), filename=str(path))
    pkg = path.relative_to(root).parts[:-1]
    found, uncertain = [], False
    impl = {id(n) for fn in ast.walk(tree) if isinstance(fn, ast.FunctionDef) and fn.name == "redirect" for n in ast.walk(fn)}
    for node in ast.walk(tree):
        if id(node) in impl:
            continue
        if isinstance(node, ast.Import):
            found += [tuple(alias.name.split(".")) for alias in node.names]
        elif isinstance(node, ast.ImportFrom):
            if node.level:
                if node.level - 1 > len(pkg):
                    uncertain = True
                    continue
                base = pkg[:len(pkg) - (node.level - 1)]
            else:
                base = ()
            mod = tuple(node.module.split(".")) if node.module else ()
            found.append(base + mod)
            found += [base + mod + (alias.name,) for alias in node.names if alias.name != "*"]
        elif isinstance(node, ast.Call):
            name = node.func.id if isinstance(node.func, ast.Name) else getattr(node.func, "attr", None)
            if name not in DYNAMIC_IMPORTERS:
                continue
            arg = node.args[1] if name == "redirect" and len(node.args) > 1 else (node.args[0] if node.args else None)
            if isinstance(arg, ast.Constant) and isinstance(arg.value, str):
                found.append(tuple(arg.value.split(".")))
            else:
                uncertain = True
    return found, uncertain


def verifier_closure(entries=VERIFIER_ENTRIES, harness=HARNESS, repo=REPO, data=DATA_GLOBS) -> tuple[bool, dict]:
    """(uncertain, {repo-relative path: sha256}) của bao đóng import in-repo, shim redirect và file dữ liệu."""
    files, uncertain = {}, False
    queue = [harness / entry for entry in entries]
    seen = set()
    while queue:
        path = queue.pop()
        if path in seen:
            continue
        seen.add(path)
        if "__pycache__" in path.parts:
            continue
        files[path.relative_to(repo).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
        found, dynamic = _targets(path, harness)
        uncertain |= dynamic
        for parts in found:
            module = _module_file(harness, parts)
            if module is not None:
                queue.append(module)
                queue += _ancestors(harness, parts)
    for root, pattern in data:
        for path in sorted(root.glob(pattern)):
            if path.is_file():
                files[path.relative_to(repo).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
    return uncertain, dict(sorted(files.items()))


def verifier_pin(**kwargs) -> str:
    """Pin của toàn bộ verifier; bao đóng không xác định được thì pin không bao giờ khớp."""
    uncertain, files = verifier_closure(**kwargs)
    if uncertain:
        return f"uncertain:{uuid.uuid4().hex}"
    return "v2:" + digest(files)[:32]


def gate4_pins(state: dict, *, plan_hash: str | None, model: str | None, tool_hash: str) -> dict:
    """Pin của bằng chứng Gate 4: artifact (diff), plan, base, mã verifier, prompt soát nội dung, tool, model, oracle (catalog)."""
    prompt = HARNESS / "prompts" / "content_guard.md"
    artifact = [{key: d.get(key) for key in ("title", "file", "test_file", "diff")} for d in state.get("diffs") or []]  # not the scratch commit sha: it changes with every commit time
    return {"candidate": digest(artifact), "plan": str(plan_hash or "none"), "base": str(state.get("base_sha") or "none"),
            "harness": verifier_pin(), "prompt": digest(prompt.read_bytes() if prompt.exists() else b"")[:32],
            "tool": str(tool_hash)[:32], "model": str(model or "none"), "oracle": digest(state.get("catalog"))[:32]}


class GateProofs:
    def __init__(self, client, ticket_id: int, lease: dict, run_id: int | None = None):
        self.client, self.lease, self.run_id = client, lease, run_id
        self.base = f"/api/ai-board/worker/tickets/{ticket_id}/gate-proof"

    def check(self, gate: int, pins: dict) -> dict:
        return self.client.post(f"{self.base}/check", {**self.lease, "gate": gate, "pins": pins})

    def record(self, gate: int, pins: dict, result: dict) -> None:
        self.client.post(f"{self.base}/record", {**self.lease, "gate": gate, "pins": pins, "result": result, "run_id": self.run_id})


if __name__ == "__main__":
    out = REPO / ".scratch" / "ai-board-quality-iteration" / "evidence" / "gate4-pin-manifest.json"
    uncertain, files = verifier_closure()
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({"uncertain": uncertain, "pin": verifier_pin(), "files": files}, indent=2, ensure_ascii=False), encoding="utf-8")
    print(out)
