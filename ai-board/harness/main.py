"""Ratchet loop: đọc snapshot inbox, đi 7 cổng, ghi kết quả vào skill_proposals.

Cổng 1 (plan) + 2 (scope-check) thật từ ticket 10; cổng 3 (implement) thật từ
ticket 11; 4-7 còn là stub, vào ở ticket 12-13. Chỉ chạy nhánh DRY_RUN=1 —
không git thật (repo Tizia), không GitHub, không Telegram ở bất kỳ đâu trong
file này (Ollama thì gọi thật ở cổng 1 + 3; cổng 3 có git cục bộ riêng vào 1
repo scratch tạm, xem gates/implement.py — không phải deps.git, cái đó vẫn
Unavailable).
"""
from __future__ import annotations

import json
import os
import posixpath
import re
import secrets
import shutil
import subprocess
import sys
import tempfile
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

from budget import Budget          # noqa: E402
from dbconn import harness_db      # noqa: E402
import gate_trace                  # noqa: E402
from gates import brainstorm, guard, implement, plan_validate, risk_triage, scope_check, static_check, verify  # noqa: E402
from models import OllamaClient    # noqa: E402
import prescreen                   # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
ENV_FILE = ROOT / ".env"

# 7 cổng + cổng 2.5 (plan-validate/complexity, ticket 22) + cổng 5.5
# (risk-triage). Thứ tự này là hợp đồng: gate_reached ghi lại đúng phần tử
# cuối cùng chạy xong, resume bắt đầu từ đó chứ không từ cổng 1.
GATES: tuple[float, ...] = (1, 2, 2.5, 3, 4, 5, 5.5, 6, 7)

# Nguồn thật của schema là server/db.js (bảng tạo lúc Express khởi động).
# Bản CREATE IF NOT EXISTS này chỉ để harness chạy được trên DB tạm trong test.
# ponytail: 2 bản DDL (JS + Python) là giá phải trả cho 2 ngôn ngữ; nếu về sau
# thêm cột thì sửa cả hai, hoặc tách DDL ra 1 file .sql chung cho cả hai bên đọc.
SKILL_PROPOSALS_DDL = """
CREATE TABLE IF NOT EXISTS skill_proposals (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  origin        TEXT    NOT NULL,
  domain        TEXT,
  gate_reached  REAL    NOT NULL,
  outcome       TEXT,
  request_ids   TEXT,
  template_key  TEXT,
  budget_json   TEXT,
  pr_url        TEXT,
  created_at    INTEGER NOT NULL,
  updated_at    INTEGER NOT NULL
);
"""


class Unavailable:
    """Chỗ giữ chỗ cho git/Telegram. Chạm vào là nổ — ticket 04 không được gọi."""

    def __init__(self, label: str):
        self._label = label

    def __getattr__(self, name: str):
        raise NotImplementedError(
            f"{self._label}.{name}() chưa có ở ticket 04 (DRY_RUN=1, không side effect ngoài)"
        )


@dataclass(frozen=True)
class Deps:
    """Mọi biên I/O ra ngoài process. Test bơm fake vào đây."""

    models: Any
    git: Any
    notify: Any
    verify: Any = None

    @classmethod
    def real(cls) -> "Deps":
        return cls(
            models=OllamaClient.from_env(),
            git=Unavailable("git"),
            notify=Unavailable("telegram"),
        )

    def call_model(self, model: str, prompt: str, *, gate: float, budget,
                    db_path=None, proposal_id: int | None = None, format: str | None = "json") -> dict:
        """1 lời gọi model + phí budget + trace — chỗ duy nhất 3 cổng (1, 2.5, 3)
        lặp lại trước đây (flagged ai-log 2026-09-19 "gate_trace call sites
        duplicated"). Behavior y hệt bản lặp: model_calls luôn +1, tokens cộng
        prompt_eval_count+eval_count, gate_trace.record() chỉ chạy khi có cả
        db_path và proposal_id (test gọi run() trực tiếp không truyền 2 cái đó
        vẫn chạy được, không phải lỗi — xem docstring gates/brainstorm.py)."""
        body = self.models.generate(model, prompt, format=format)
        budget.spend("model_calls")
        budget.spend("tokens", int(body.get("prompt_eval_count") or 0) + int(body.get("eval_count") or 0))
        if db_path is not None and proposal_id is not None:
            gate_trace.record(db_path, skill_proposal_id=proposal_id, gate=gate,
                               model=model, prompt=prompt, body=body)
        return body


class ScopeViolation(ValueError):
    """Candidate tried to write outside its child's allowed scope — critical, never repaired."""


def _git_out(args: list[str], cwd) -> str:
    """git with stderr kept in the error message (CalledProcessError hides it)."""
    result = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, encoding="utf-8",
                            errors="replace", stdin=subprocess.DEVNULL)
    if result.returncode:
        raise OSError(f"git {args[0]}: {(result.stderr or result.stdout).strip()[:300]}")
    return result.stdout


def prepare_full_checkout(state: dict, source_repo: str | os.PathLike, *, base_ref: str = "HEAD") -> None:
    """At the 3→4 seam: new git worktree on branch ai-board/<date>-<skill_id>-<hex6> from base_ref,
    one commit per child in plan order. Raise ScopeViolation (nothing left behind) on out-of-scope writes."""
    scratch = Path(state["scratch_repo"])
    slug = re.sub(r"[^a-z0-9-]+", "-", str(state.get("skill_id") or "").lower()).strip("-")
    if not slug:
        raise ValueError("thiếu skill_id để đặt tên nhánh AI Board")
    subtasks = (state.get("plan") or {}).get("subtasks") or []
    diffs = state["diffs"]
    if len(subtasks) != len(diffs):
        raise ValueError(f"cổng 3 chưa xong: {len(diffs)}/{len(subtasks)} child có diff")
    base = _git_out(["rev-parse", "--verify", f"{base_ref}^{{commit}}"], source_repo).strip()
    # Random suffix: a kept candidate from an earlier run must not block a rerun of the same ticket.
    branch = f"ai-board/{time.strftime('%Y-%m-%d')}-{slug}-{secrets.token_hex(3)}"
    checkout = Path(tempfile.mkdtemp(prefix="ai-board-worktree-"))
    try:
        _git_out(["worktree", "add", "-q", "-b", branch, str(checkout), base], source_repo)
    except OSError:
        shutil.rmtree(checkout, ignore_errors=True)
        raise
    owned = {"full_checkout": str(checkout), "checkout_repo": str(source_repo), "branch": branch}
    try:
        created: set[str] = set()
        commits = []
        for index, (subtask, item) in enumerate(zip(subtasks, diffs), start=1):
            allowed = {posixpath.normpath(p.replace("\\", "/"))
                       for p in subtask.get("allowed_scope") or [subtask["file"]]}
            file = posixpath.normpath(item["file"].replace("\\", "/"))
            test_file = posixpath.normpath(item["test_file"].replace("\\", "/"))
            if file not in allowed:
                raise ScopeViolation(f"child {index} ghi '{file}' ngoài allowed_scope {sorted(allowed)}")
            if not test_file.startswith(("test/", "tests/")):
                raise ScopeViolation(f"child {index} ghi test '{test_file}' ngoài test/ hoặc tests/")
            for rel in (file, test_file):
                dst = implement._safe_join(checkout, rel)
                if rel == test_file and dst.exists() and rel not in created:
                    raise ScopeViolation(f"test_file đã tồn tại trong checkout: {rel}")
                content = subprocess.run(["git", "show", f"{item['commit']}:{rel}"], cwd=scratch, check=True,
                                         capture_output=True, stdin=subprocess.DEVNULL).stdout
                dst.parent.mkdir(parents=True, exist_ok=True)
                dst.write_bytes(content)
                created.add(rel)
            title = f"ai-board({slug}): {index}/{len(diffs)} {subtask['title']}"
            _git_out(["add", "--", file, test_file], checkout)
            _git_out(["-c", "user.name=AI Board", "-c", "user.email=ai-board@tizia.local",
                      "commit", "-q", "-m", title], checkout)
            commits.append({"sha": _git_out(["rev-parse", "HEAD"], checkout).strip(), "title": title,
                            "files": [file, test_file]})
        diff = _git_out(["diff", "--no-ext-diff", base, "HEAD"], checkout)
    except BaseException:
        cleanup_full_checkout(owned, keep_branch=False)
        raise
    state.update(owned, _owned_full_checkout=True, base_sha=base, commits=commits,
                 full_diff=[{"file": "", "diff": diff}])


def cleanup_full_checkout(state: dict, *, keep_branch: bool) -> None:
    """Remove the AI Board worktree; delete its branch unless the candidate is kept for PR."""
    repo, checkout = state.get("checkout_repo"), state.get("full_checkout")
    if not repo or not checkout:
        return
    subprocess.run(["git", "worktree", "remove", "--force", checkout], cwd=repo,
                   capture_output=True, stdin=subprocess.DEVNULL)
    shutil.rmtree(checkout, ignore_errors=True)
    subprocess.run(["git", "worktree", "prune"], cwd=repo, capture_output=True, stdin=subprocess.DEVNULL)
    if not keep_branch and state.get("branch"):
        subprocess.run(["git", "branch", "-D", state["branch"]], cwd=repo,
                       capture_output=True, stdin=subprocess.DEVNULL)


def load_inbox(path: str | os.PathLike) -> list[dict]:
    """Đọc snapshot JSON do server/scripts/sync-inbox.mjs sinh. Trả items[]."""
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    return list(data.get("items") or [])


def _ensure_full_checkout(state: dict, gate: float) -> dict | None:
    """Dựng worktree nếu chưa có. None khi sẵn sàng/không có nguồn; dict blocked khi lỗi."""
    if state.get("full_checkout") or not state.get("checkout_source"):
        return None
    try:
        # Same base gate 3 showed the model, even if the source HEAD moved since.
        prepare_full_checkout(state, state["checkout_source"], base_ref=state.get("base_sha") or "HEAD")
    except (OSError, ValueError, subprocess.CalledProcessError) as e:
        # Scope escape is a boundary violation; anything else is the environment, not the code.
        kind = "critical" if isinstance(e, ScopeViolation) else "transient"
        return {"gate": gate, "blocked": True, "reason": f"không tạo được full_checkout: {e}",
                "evidence": None, "failure_class": kind}
    return None


def _base_public_contacts(state: dict) -> set[str]:
    """Contacts already in public/ at the base commit; empty without a worktree (nothing allowlisted)."""
    checkout, base = state.get("full_checkout"), state.get("base_sha")
    if not checkout or not base:
        return set()
    found = subprocess.run(["git", "grep", "-I", "-h", "-E", "@|[0-9]{9}", base, "--", "public"], cwd=checkout,
                           capture_output=True, text=True, encoding="utf-8", errors="replace",
                           stdin=subprocess.DEVNULL)
    return guard.contacts_in(found.stdout)  # exit 1 = no match, stdout empty


def run_gate(number: float, request: dict, deps: Deps, budget: Budget, state: dict,
             *, db_path=None, proposal_id: int | None = None) -> dict:
    """Điểm thay duy nhất khi 1 cổng có logic thật. `state` mang plan/artifact
    giữa các cổng trong cùng 1 lượt (cổng 1 ghi plan, cổng 2 đọc). db_path/
    proposal_id (ticket 23) chỉ để gate_trace ghi trace — cổng nào không gọi
    model (2, 4, 5.5) không cần và không dùng tới 2 tham số này."""
    if number == 1:
        out = brainstorm.run(request, deps, budget, db_path=db_path, proposal_id=proposal_id)
        state["plan"] = out.get("plan")
        return out
    if number == 2:
        return scope_check.run(state)
    if number == 2.5:
        return plan_validate.run(request, deps, budget, state, db_path=db_path, proposal_id=proposal_id)
    if number == 3:
        return implement.run(state, deps, budget, db_path=db_path, proposal_id=proposal_id)
    if number == 4:
        # Checks bắt buộc + cờ size cần diff thật base..HEAD nên worktree được dựng ngay ở 3→4.
        failed = _ensure_full_checkout(state, 4)
        if failed:
            return failed
        out = static_check.run(state)
        if out.get("blocked"):
            return out
        text = "".join(item.get("diff", "") for item in state.get("full_diff") or state.get("diffs") or [])
        scanned = guard.scan(text, state.get("full_checkout"), allowed_contacts=_base_public_contacts(state))
        state["ui_changed"] = scanned["ui_changed"]
        out = {**out, "checks": scanned["checks"]}
        found = scanned["findings"]
        if found:
            worst = "critical" if any(f["failure_class"] == "critical" for f in found) else "ordinary"
            reason = "; ".join(f"{f['check']}: {f['detail']}" for f in found)[:1000]
            out.update(blocked=True, reason=reason, failure_class=worst,
                       issues=[*out.get("issues", []), *(f"{f['check']}: {f['detail']}" for f in found)])
        return out
    if number == 5:
        if deps.verify is not None:
            return deps.verify.run(state, deps, budget)
        return _ensure_full_checkout(state, 5) or verify.run(state, deps, budget)
    if number == 5.5:
        return risk_triage.run(state)
    return {"gate": number, "blocked": False, "reason": None}


def create_proposal(db_path, *, request: dict) -> int:
    """INSERT khung skill_proposals TRƯỚC khi chạy cổng nào (gate_reached=0,
    outcome=NULL) — ticket 23: gate_trace cần id thật này ngay từ cổng 1, và
    spec.md's cơ chế resume (gate_reached đọc lại giữa các lần chạy) cũng cần
    dòng tồn tại trong lúc đang chạy, không chỉ sau khi xong. update_proposal()
    ghi lại kết quả cuối vào ĐÚNG dòng này (UPDATE, không INSERT thêm)."""
    now = int(time.time() * 1000)
    origin = "domain-synthesized" if request.get("domain") else "core-skill"
    with harness_db(db_path, ddl=SKILL_PROPOSALS_DDL) as con:
        cur = con.execute(
            """INSERT INTO skill_proposals
                 (origin, domain, gate_reached, outcome, request_ids,
                  template_key, budget_json, pr_url, created_at, updated_at)
               VALUES (?, ?, 0, NULL, ?, ?, NULL, NULL, ?, ?)""",
            (
                origin,
                request.get("domain"),
                json.dumps(request.get("request_ids") or [request.get("id")]),
                request.get("template_key"),
                now,
                now,
            ),
        )
        return cur.lastrowid


def update_proposal(db_path, proposal_id: int, *, gate_reached: float, outcome: str, budget: Budget) -> None:
    """Cập nhật dòng skill_proposals đã tạo từ create_proposal() với kết quả
    cuối cùng của lượt chạy."""
    with harness_db(db_path, ddl=SKILL_PROPOSALS_DDL) as con:
        con.execute(
            "UPDATE skill_proposals SET gate_reached=?, outcome=?, budget_json=?, updated_at=? WHERE id=?",
            (float(gate_reached), outcome, json.dumps(budget.snapshot()), int(time.time() * 1000), proposal_id),
        )


def record_proposal(db_path, *, request: dict, gate_reached: float, outcome: str, budget: Budget) -> int:
    """Tiện ích tạo+cập nhật 1 dòng skill_proposals trong 1 lần gọi — dùng để
    seed lịch sử trong test (xem tests/test_prescreen.py). run_once() tự dùng
    create_proposal()/update_proposal() tách rời vì cần proposal_id TRƯỚC khi
    cổng nào chạy (ticket 23: gate_trace cần id đó ngay từ cổng 1)."""
    proposal_id = create_proposal(db_path, request=request)
    update_proposal(db_path, proposal_id, gate_reached=gate_reached, outcome=outcome, budget=budget)
    return proposal_id


def run_once(request: dict, *, db_path, deps: Deps, budget: Budget | None = None,
             checkout_source=None, full_checkout=None) -> dict:
    """Đẩy 1 request qua 7 cổng, ghi đúng 1 dòng skill_proposals. Trả kết quả."""
    budget = budget or Budget.from_env()
    reached: float = 0.0
    outcome = "ok"
    reason = None
    state: dict = {"skill_id": request.get("id") or ""}
    if checkout_source is not None:
        state["checkout_source"] = checkout_source
    if full_checkout is not None:
        state["full_checkout"] = full_checkout

    proposal_id = create_proposal(db_path, request=request)

    # try/finally (code-review round): create_proposal() ghi dòng NGAY từ đầu
    # (ticket 23), khác bản cũ ghi 1 lần DUY NHẤT ở cuối sau khi mọi cổng đã
    # chạy xong — nếu 1 cổng raise (lỗi Ollama, bug gate...) mà không có
    # finally ở đây, dòng vừa tạo kẹt lại mãi mãi với gate_reached=0/
    # outcome=NULL, không ai cập nhật. finally đảm bảo LUÔN ghi lại trạng thái
    # cuối cùng — kể cả khi lỗi — rồi mới để exception tiếp tục bay lên
    # (không nuốt lỗi, main() vẫn thấy được).
    try:
        for gate in GATES:
            if not budget.tick():
                outcome = "budget_exhausted"
                break
            result = run_gate(gate, request, deps, budget, state, db_path=db_path, proposal_id=proposal_id)
            reached = gate
            if result.get("blocked"):
                # Cổng 2.5 (ticket 22) tự đặt outcome cụ thể (needs_clarification/
                # complexity_gated) thay vì generic blocked_gate_N — mọi cổng khác
                # không set key này nên hành vi cũ giữ nguyên.
                outcome = result.get("outcome") or f"blocked_gate_{gate}"
                reason = result.get("reason")
                break
    except Exception as e:
        outcome = f"error_gate_{reached}: {e}"
        raise
    finally:
        try:
            update_proposal(db_path, proposal_id, gate_reached=reached, outcome=outcome, budget=budget)
        finally:
            cleanup_full_checkout(state, keep_branch=False)

    return {
        "proposal_id": proposal_id,
        "request_id": request.get("id"),
        "gate_reached": reached,
        "outcome": outcome,
        "reason": reason,
        "plan": state.get("plan"),
        "budget": budget.snapshot(),
    }


def main(argv: list[str] | None = None, deps: Deps | None = None) -> int:
    # Console Windows mặc định cp1252 — mọi print tiếng Việt sẽ nổ
    # UnicodeEncodeError. Ép UTF-8 ngay ở entrypoint, đúng 1 chỗ cho mọi print.
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")

    try:
        from dotenv import load_dotenv
    except ImportError:
        pass
    else:
        load_dotenv(ENV_FILE)

    if os.environ.get("DRY_RUN") != "1":
        print("[harness] ticket 04 chỉ chạy nhánh DRY_RUN=1 — đặt DRY_RUN=1 rồi chạy lại", file=sys.stderr)
        return 2

    inbox_path = os.environ.get("TIZIA_INBOX_PATH") or (ROOT / "ai-board" / "inbox.json")
    db_path = os.environ.get("TIZIA_DB_PATH") or (ROOT / "data" / "tizia.db")
    deps = deps or Deps.real()

    items = [it for it in load_inbox(inbox_path) if it.get("status") != "done"]
    if not items:
        print(f"[harness] hộp thư trống: {inbox_path}")
        return 0

    # Ticket 17: gom trùng + chấm ưu tiên TRƯỚC cổng 1. PRESCREEN=0 → bỏ qua,
    # loop chạy y như walking skeleton (không embed, không ghi ai_decisions).
    if os.environ.get("PRESCREEN", "1") != "0":
        items = prescreen.run(items, models=deps.models, db_path=db_path)
        for c in items:
            print(f"[prescreen] {c['id']} ← {c['request_ids']} ưu tiên {c['priority_score']}")

    for item in items:
        out = run_once(item, db_path=db_path, deps=deps)
        why = f" — {out['reason']}" if out.get("reason") else ""
        print(f"[harness] {out['request_id']} → cổng {out['gate_reached']} ({out['outcome']}{why}) #{out['proposal_id']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
