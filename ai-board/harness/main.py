"""Ratchet loop: đọc snapshot inbox, đi 7 cổng, ghi kết quả vào skill_proposals.

Cổng 1-5 (+2.5, 5.5) thật; cổng 6-7 còn là stub cho qua. Chỉ chạy nhánh DRY_RUN=1 —
không git thật (repo Tizia), không GitHub, không Telegram ở bất kỳ đâu trong
file này (Ollama thì gọi thật ở cổng 1 + 3; cổng 3 có git cục bộ riêng vào 1
repo scratch tạm, xem gates/implement.py; nhánh candidate do candidate.py lo).
"""
from __future__ import annotations

import functools
import json
import os
import sys
import time
import urllib.error
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

sys.path.insert(0, str(Path(__file__).resolve().parent))

from budget import Budget          # noqa: E402
from dbconn import harness_db      # noqa: E402
import candidate                   # noqa: E402
import gate_trace                  # noqa: E402
import meter                       # noqa: E402
import context                     # noqa: E402
from gates import brainstorm, implement, intake_guard, plan_validate, risk_triage, scope_check, static_check, verify  # noqa: E402
from models import OllamaClient    # noqa: E402
import prescreen                   # noqa: E402
import self_eval                   # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
ENV_FILE = ROOT / ".env"

# 7 cổng + cổng 2.5 (plan-validate/complexity) + cổng 5.5
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
    """Chỗ giữ chỗ cho Telegram. Chạm vào là nổ — không được gọi."""

    def __init__(self, label: str):
        self._label = label

    def __getattr__(self, name: str):
        raise NotImplementedError(
            f"{self._label}.{name}() chưa có (DRY_RUN=1, không side effect ngoài)"
        )


# Trần output theo cổng: Gate 3 ~43 s ở 72 tok/s, dưới timeout gateway ~60 s; cổng khác chỉ trả JSON ngắn.
NUM_PREDICT = {2.5: 3072, 3: 3072}
NUM_PREDICT_DEFAULT = 1024
PROMPTS_DIR = Path(__file__).resolve().parent / "prompts"
_PROMPT_LOCK = json.loads((PROMPTS_DIR / "prompts.lock.json").read_text(encoding="utf-8"))

# Backoff cho lỗi hạ tầng thoáng qua khi gọi Ollama (GPU dùng chung, tenant khác chiếm chỗ →
# 500/timeout/connection ngắt). 2 lần thử lại, 2s rồi 5s — đủ ngắn để không đội thời gian lease
# (BUDGET_MAX_WALL_CLOCK_S mặc định 1200s), đủ để vượt qua 1 lần nghẽn thoáng qua.
# ponytail: hằng số cố định, chỉnh tại đây nếu thực tế cần khác.
MODEL_RETRY_BACKOFF_S = (2.0, 5.0)


def _retryable_model_error(error: Exception) -> bool:
    """Lỗi hạ tầng thoáng qua (5xx, timeout, mất kết nối) mới thử lại — lỗi 4xx (request/cấu hình
    sai) thử lại vô ích, tốn ngân sách GPU-s oan."""
    if isinstance(error, urllib.error.HTTPError):
        return error.code >= 500
    if isinstance(error, TimeoutError):
        return True
    if isinstance(error, urllib.error.URLError):
        return True
    return False


@functools.lru_cache(maxsize=None)
def _static_prefix(prompt_name: str | None) -> str:
    """Phần prompt cố định (trước placeholder đầu tiên) — trace chỉ gửi phần sau nó."""
    if not prompt_name:
        return ""
    return (PROMPTS_DIR / prompt_name).read_text(encoding="utf-8").split("{", 1)[0]


@dataclass(frozen=True)
class Deps:
    """Mọi biên I/O ra ngoài process. Test bơm fake vào đây."""

    models: Any
    notify: Any
    verify: Any = None
    trace: Any = None  # meter.Tracer; None = không trace (test cũ, CLI)
    progress: Callable[[float], None] = lambda _gate: None  # run_gate báo cổng vừa bắt đầu (worker → server)
    provider: str = "ollama"
    sleep: Callable[[float], None] = time.sleep  # test bơm no-op: backoff thật không làm chậm test suite

    @classmethod
    def real(cls) -> "Deps":
        return cls(
            models=OllamaClient.from_env(),
            notify=Unavailable("telegram"),
        )

    def call_model(self, model: str, prompt: str, *, gate: float, budget,
                    db_path=None, proposal_id: int | None = None, format: str | dict | None = "json",
                    prompt_name: str | None = None, child: int | None = None, iteration: int = 0,
                    options: dict | None = None, extra: dict | None = None) -> dict:
        """1 lời gọi model + phí budget + trace — chỗ duy nhất mọi cổng đi qua.
        Phí: model_calls +1, tokens, units (meter: giây GPU ollama / 1K token api).
        Lỗi HTTP/timeout vẫn tính units theo wall (GPU có thể đã chạy) rồi raise lại.
        body["_metrics"] = metrics đã chuẩn hoá cho cổng dùng (done_reason, …)."""
        options = {"num_predict": NUM_PREDICT.get(gate, NUM_PREDICT_DEFAULT), "temperature": 0, **(options or {})}
        for attempt, wait_s in enumerate((0.0,) + MODEL_RETRY_BACKOFF_S):
            if wait_s:
                self.sleep(wait_s)
            started = time.monotonic()
            try:
                body = (self.models.generate(model, prompt, format=format, extra=extra, **options) if extra
                        else self.models.generate(model, prompt, format=format, **options))
                break
            except Exception as error:
                metrics = meter.measure(self.provider, {}, int((time.monotonic() - started) * 1000))
                n = meter.units(self.provider, metrics)
                budget.spend("model_calls")
                budget.spend("units", n)
                last_attempt = attempt == len(MODEL_RETRY_BACKOFF_S)
                if last_attempt or not _retryable_model_error(error):
                    self._trace(gate, model, prompt, prompt_name, "", metrics, n,
                                "timeout" if isinstance(error, TimeoutError) else "http_error", str(error),
                                child, iteration)
                    raise
        metrics = meter.measure(self.provider, body, int((time.monotonic() - started) * 1000))
        n = meter.units(self.provider, metrics)
        budget.spend("model_calls")
        budget.spend("tokens", int(body.get("prompt_eval_count") or 0) + int(body.get("eval_count") or 0))
        budget.spend("units", n)
        if db_path is not None and proposal_id is not None:
            gate_trace.record(db_path, skill_proposal_id=proposal_id, gate=gate,
                               model=model, prompt=prompt, body=body)
        self._trace(gate, model, prompt, prompt_name, body.get("response", ""), metrics, n, "ok", None, child, iteration)
        body["_metrics"] = metrics
        return body

    def _trace(self, gate, model, prompt, prompt_name, output, metrics, n, result, error, child, iteration):
        if self.trace is None:
            return
        prefix = _static_prefix(prompt_name)
        if prompt_name and prompt.startswith(context.manual()):
            prefix = context.manual() + prefix  # AIBOARD.md luôn đứng đầu, cũng là phần cố định
        self.trace.record(gate=gate, model=model, prompt=prompt, prompt_name=prompt_name,
                          prompt_hash=_PROMPT_LOCK.get(prompt_name), static_prefix=prefix,
                          output=output, metrics=metrics, budget_units=n, result=result, error=error,
                          child=child, iteration=iteration)


def load_inbox(path: str | os.PathLike) -> list[dict]:
    """Đọc snapshot JSON do server/scripts/sync-inbox.mjs sinh. Trả items[]."""
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    return list(data.get("items") or [])


def _intake_and_plan(request, deps, budget, state, **trace) -> dict:
    """Cổng 1: guardrail yêu cầu (tất định rồi LLM; chỉ leo thang tới người soát) rồi lập plan."""
    g = intake_guard.run(request.get("subject"), request.get("body"), deps, budget, **trace)
    state["intake"] = g
    if g["verdict"] != "allow":
        return {"gate": 1, "blocked": True, "reason": f"intake_{g['verdict']}: {g['internal_reason']}"[:1000],
                "outcome": f"intake_{g['verdict']}", "signals": g["labels"],
                "public_message": g["public_message"]}
    # Worker clone at origin/<base> when set; else the repo holding the harness.
    out = brainstorm.run(request, deps, budget, source=state.get("checkout_source"), **trace)
    state["plan"] = out.get("plan")
    state['planning_context'] = out.get('repo_context')
    state['source_targets'] = out.get('source_targets') or []
    return out


def _smoke(request, deps, budget, state, **_) -> dict:
    """Cổng 5: yêu cầu self → eval 2 sha thay Docker smoke; khác: verify bơm vào (test) hoặc Docker thật."""
    if state.get("request_type") == "self":
        return candidate.ensure(state, 5) or self_eval.run(state, deps, budget)
    if deps.verify is not None:
        return deps.verify.run(state, deps, budget)
    if os.getenv("AI_BOARD_SANDBOX_URL"):  # Gate 5 inside a Microsandbox microVM instead of worker-side Docker
        import sandbox_verify
        return candidate.ensure(state, 5) or sandbox_verify.run(state, deps, budget)
    return candidate.ensure(state, 5) or verify.run(state, deps, budget)


# gate → fn(request, deps, budget, state, db_path=, proposal_id=). Cổng không có ở đây (6, 7) là stub cho qua.
_GATE_FNS = {
    1: _intake_and_plan,
    2: lambda request, deps, budget, state, **_: scope_check.run(state),
    2.5: plan_validate.run,
    3: lambda request, deps, budget, state, **trace: implement.run(state, deps, budget, **trace),
    4: lambda request, deps, budget, state, **trace: static_check.run_gate(state, deps, budget, **trace),
    5: _smoke,
    5.5: lambda request, deps, budget, state, **_: risk_triage.run(state),
}


def run_gate(number: float, request: dict, deps: Deps, budget: Budget, state: dict,
             *, db_path=None, proposal_id: int | None = None) -> dict:
    """Điểm thay duy nhất khi 1 cổng có logic thật. `state` mang plan/artifact
    giữa các cổng trong cùng 1 lượt (cổng 1 ghi plan, cổng 2 đọc). db_path/
    proposal_id chỉ để gate_trace ghi trace. Báo deps.progress trước khi chạy."""
    deps.progress(number)
    fn = _GATE_FNS.get(number)
    if fn is None:
        return {"gate": number, "blocked": False, "reason": None}
    return fn(request, deps, budget, state, db_path=db_path, proposal_id=proposal_id)


def create_proposal(db_path, *, request: dict) -> int:
    """INSERT khung skill_proposals TRƯỚC khi chạy cổng nào (gate_reached=0,
    outcome=NULL) — gate_trace cần id thật này ngay từ cổng 1, và
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
    cổng nào chạy (gate_trace cần id đó ngay từ cổng 1)."""
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
    result = {}
    if checkout_source is not None:
        state["checkout_source"] = checkout_source
    if full_checkout is not None:
        state["full_checkout"] = full_checkout

    proposal_id = create_proposal(db_path, request=request)

    # try/finally: create_proposal() ghi dòng NGAY từ đầu (không chỉ 1 lần ở cuối
    # sau khi mọi cổng đã chạy xong) — nếu 1 cổng raise (lỗi Ollama, bug gate...) mà không có
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
                # Cổng 2.5 tự đặt outcome cụ thể (needs_clarification/
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
            candidate.cleanup(state, keep_branch=False)

    return {
        "proposal_id": proposal_id,
        "request_id": request.get("id"),
        "gate_reached": reached,
        "outcome": outcome,
        "reason": reason,
        **({'public_message': result['public_message']} if result.get('public_message') else {}),
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

    # Gom trùng + chấm ưu tiên TRƯỚC cổng 1. PRESCREEN=0 → bỏ qua,
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
