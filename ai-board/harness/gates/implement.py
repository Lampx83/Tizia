"""Cổng 3 — plan (cổng 1) → code thật, mỗi subtask 1 lần gọi model riêng, context
mới hoàn toàn (chỉ subtask đó, không lịch sử các subtask trước — spec
subagent-driven-development). Routing theo `size` (ticket 10): "small" →
model nhẹ (GATE3_MODEL_LIGHT), "large" → GATE3_MODEL. Cổng 4 (ticket 12) mới
lint/kiểm tra 2x ponytail/caveman — cổng này chỉ sinh code + test (TDD) và ghi
diff thật, không tự chấm.
"""
from __future__ import annotations

import json
import subprocess
import tempfile
from pathlib import Path

def _git(args: list[str], cwd: Path, **kw) -> subprocess.CompletedProcess:
    """subprocess.run(['git', ...]) với stdin=DEVNULL — pytest capture trên
    Windows thay stdin bằng 1 handle không nhân bản được, subprocess.Popen vỡ
    với WinError 6 nếu không tự cấp stdin rõ ràng."""
    return subprocess.run(
        ["git", *args], cwd=cwd, check=True, capture_output=True,
        stdin=subprocess.DEVNULL, **kw,
    )


SIZE_MODEL_ATTR = {"small": "gate3_model_light", "large": "gate3_model"}
CODEGEN_KEYS = ("code", "test_file", "test")

# Prompt sống ở file riêng (ai-board/harness/prompts/) — xem lý do ở
# gates/brainstorm.py, cùng quyết định.
PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "implement.md").read_text(encoding="utf-8")


def build_prompt(subtask: dict) -> str:
    """Prompt CHỈ từ 1 subtask — không plan, không subtask khác. Đây là cơ chế
    (không phải quy ước) đảm bảo context mới hoàn toàn mỗi lần gọi."""
    return PROMPT.format(title=subtask["title"], file=subtask["file"], verify=subtask["verify"])


def model_for(subtask: dict, models) -> str:
    """size → tên model trên `models` (OllamaClient hoặc FakeModels). Route lộ ra
    ở đây, không chôn trong nhánh if/else của run() — test gọi thẳng hàm này."""
    attr = SIZE_MODEL_ATTR.get(subtask.get("size"))
    if not attr:
        raise ValueError(f"subtask.size lạ: {subtask.get('size')!r}")
    return getattr(models, attr)


def parse_codegen(text: str) -> dict:
    """Parse + validate output 1 subtask. Raise ValueError với lý do ngắn nếu sai schema."""
    try:
        out = json.loads(text)
    except (TypeError, ValueError) as e:
        raise ValueError(f"không phải JSON: {e}") from None
    if not isinstance(out, dict):
        raise ValueError("kết quả phải là object")
    for k in CODEGEN_KEYS:
        if not isinstance(out.get(k), str) or not out[k].strip():
            raise ValueError(f"thiếu {k}")
    return out


def _ensure_scratch_repo(repo_dir: str | Path | None) -> Path:
    """Repo git để diff thật vào — KHÔNG bao giờ là Tizia thật (deps.git còn
    Unavailable ở ticket này). Không truyền repo_dir → tạo 1 thư mục tạm mới."""
    p = Path(repo_dir) if repo_dir else Path(tempfile.mkdtemp(prefix="ai-board-gate3-"))
    p.mkdir(parents=True, exist_ok=True)
    if not (p / ".git").exists():
        _git(["init", "-q"], cwd=p)
        _git(["config", "user.email", "ai-board@tizia.local"], cwd=p)
        _git(["config", "user.name", "AI Board Gate 3"], cwd=p)
    return p


def _write_and_diff(repo_dir: Path, file_rel: str, code: str, test_file_rel: str, test_code: str) -> str:
    """Ghi code + test vào repo scratch, trả diff thật (git diff --cached), rồi
    commit để lần ghi kế tiếp (subtask sau) diff đúng phần MỚI thêm."""
    for rel, content in ((file_rel, code), (test_file_rel, test_code)):
        path = repo_dir / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
    _git(["add", "-A"], cwd=repo_dir)
    diff = _git(["diff", "--cached"], cwd=repo_dir, text=True, encoding="utf-8").stdout
    _git(["commit", "-q", "-m", f"gate3: {file_rel}"], cwd=repo_dir)
    return diff


def run(state: dict, deps, budget, *, repo_dir: str | Path | None = None) -> dict:
    """Điểm vào cho main.run_gate. Đọc state['plan'] do cổng 1 để lại, sinh code
    cho từng subtask với model theo size, ghi diff thật vào repo scratch."""
    plan = state.get("plan")
    subtasks = (plan or {}).get("subtasks")
    if not subtasks:
        return {"gate": 3, "blocked": True, "reason": "không có plan/subtasks từ cổng 1", "diffs": None}

    repo = _ensure_scratch_repo(repo_dir if repo_dir is not None else state.get("scratch_repo"))
    diffs = []
    for subtask in subtasks:
        # Budget kiểm TRƯỚC mỗi lần gọi model, không chỉ 1 lần trước cả gate —
        # nhiều subtask nghĩa là nhiều lần gọi model bên trong CÙNG 1 lời gọi
        # run_gate(3, ...), main.run_once() chỉ tick() giữa các cổng chứ không
        # giữa các subtask. Không kiểm ở đây thì 1 plan nhiều subtask chọc thủng
        # max_model_calls/max_wall_clock_s âm thầm (budget.py: "không bao giờ im
        # lặng báo xong").
        if not budget.tick():
            state["diffs"] = diffs
            return {
                "gate": 3, "blocked": True,
                "reason": f"budget cạn giữa chừng (đã xong {len(diffs)}/{len(subtasks)} subtask)",
                "diffs": diffs,
            }
        model = model_for(subtask, deps.models)
        body = deps.models.generate(model, build_prompt(subtask), format="json")
        budget.spend("model_calls")
        budget.spend("tokens", int(body.get("prompt_eval_count") or 0) + int(body.get("eval_count") or 0))
        try:
            out = parse_codegen(body.get("response", ""))
        except ValueError as e:
            reason = f"subtask '{subtask.get('title')}': {e}"
            state["diffs"] = diffs
            return {"gate": 3, "blocked": True, "reason": reason, "diffs": diffs}
        diff_text = _write_and_diff(repo, subtask["file"], out["code"], out["test_file"], out["test"])
        diffs.append({
            "title": subtask["title"], "file": subtask["file"], "test_file": out["test_file"],
            "model": model, "diff": diff_text,
        })

    state["diffs"] = diffs
    state["scratch_repo"] = str(repo)
    return {"gate": 3, "blocked": False, "reason": None, "diffs": diffs}
