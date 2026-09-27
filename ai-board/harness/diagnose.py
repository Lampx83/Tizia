"""Chẩn đoán → yêu cầu self (self-improve ticket 06). Lấy phần học của task eval, gom lần hỏng thành cụm
(cổng, lớp lỗi, skill) bằng code, chọn 1 cụm, model 14B viết chẩn đoán theo khuôn, tạo tối đa 1 yêu cầu self.
Phần kiểm tra bỏ ngay khi nhận: không bao giờ vào prompt. Vòng đêm (ticket 07) gọi diagnose_to_self_request().
"""
from __future__ import annotations

import hashlib
import json
import os
import urllib.error
from collections import defaultdict
from pathlib import Path

from budget import Budget
from eval_strata import BASELINE
from gates.guard import SELF_EDIT
from memory import DEFAULT_PATH as LESSONS_PATH

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]
PROMPT_NAME = "diagnose.md"
PROMPT = (HERE / "prompts" / PROMPT_NAME).read_text(encoding="utf-8")
LIMITS = json.loads((REPO / "server" / "ai-board" / "contract.json").read_text(encoding="utf-8"))["limits"]["self_improve"]
TRACES_PATH = LESSONS_PATH.with_name("traces.jsonl")  # cùng file worker.main đưa meter.Tracer
DAY_MS = 86_400_000
WINDOW_DAYS = 30
ATTEMPTS = 3  # 1 lần + thử lại tối đa 2
MAX_TASKS, MAX_TEXT, MAX_TRACE = 8, 500, 4  # vừa num_ctx 8K: ~8 task × ~1.2K ký tự
RETRY_SUFFIX = "\n\nYOUR PREVIOUS ANSWER WAS REJECTED: {reason}\nFix exactly that. Output ONLY the JSON object."
KEYS = ("hypothesis", "target_file", "expected_effect")
SCHEMA = {"type": "object", "required": list(KEYS), "properties": {k: {"type": "string"} for k in KEYS}}

# Cụm → nhóm của bộ đo (eval_strata trục "type") qua skill cổng 1 của cụm: task không lưu trường/cách mô tả,
# skill là trục duy nhất cụm có. Skill tạo mới → feature, sửa JS → logic, sửa CSS/chữ → ui. Skill khác
# (default, thiếu) không có nhóm → điểm 100, thua mọi cụm có nhóm khi hoà số lần hỏng; hoà nữa → key tăng dần.
SKILL_STRATUM = {"new-feature": "type=feature", "new-static-page": "type=feature", "add-html-section": "type=feature",
                 "fix-js-behavior": "type=logic", "edit-css-style": "type=ui", "edit-html-text": "type=ui"}


def _key(task: dict) -> str:
    gate = task.get("gate")
    gate = "-" if gate is None else format(float(gate), "g")
    return f"{gate}|{task.get('failure_class') or '-'}|{task.get('skill') or '-'}"


def pick_cluster(tasks: list[dict], now_ms: int, strata: dict | None = None, skip=frozenset()) -> dict | None:
    """Cụm nhiều lần hỏng nhất trong 30 ngày (hoà → nhóm điểm thấp nhất, rồi key). Tất định. None nếu không có."""
    if strata is None:
        strata = json.loads(BASELINE.read_text(encoding="utf-8"))
    groups = defaultdict(list)
    for t in tasks:
        if t.get("source") == "miss" and (t.get("created_at") or 0) >= now_ms - WINDOW_DAYS * DAY_MS \
                and _key(t) not in skip:
            groups[_key(t)].append(t)
    if not groups:
        return None

    def score(key):
        return float(strata.get(SKILL_STRATUM.get(key.rsplit("|", 1)[1]), 100.0))

    key = min(groups, key=lambda k: (-len(groups[k]), score(k), k))
    first = groups[key][0]
    return {"key": key, "gate": first.get("gate"), "failure_class": first.get("failure_class"),
            "skill": first.get("skill"), "stratum": SKILL_STRATUM.get(first.get("skill")), "score": score(key),
            "tasks": sorted(groups[key], key=lambda t: (t.get("created_at") or 0, t["id"]))}


def allowed_files() -> list[str]:
    """File có thật trong vùng self được sửa (regex guard-lexicon self_edit_paths; regex đã loại diagnose.md)."""
    paths = []
    for root, dirs, files in os.walk(HERE):
        dirs[:] = [d for d in dirs if not d.startswith((".", "__"))]  # .venv, __pycache__: nghìn file vô ích
        paths += [(Path(root) / f).relative_to(REPO).as_posix() for f in files]
    return sorted(p for p in paths if any(rx.match(p) for rx in SELF_EDIT))


def _traces(path: Path, run_ids: set) -> dict:
    """{run_id: [≤ MAX_TRACE record cuối]} từ trace JSONL cục bộ; chỉ gate/prompt/kết quả/output, không prompt."""
    out = defaultdict(list)
    if not path.is_file():
        return out
    # ponytail: quét tuyến tính file hiện tại (Tracer tự xoay vòng), bỏ các bản .1 …; đủ cho 30 ngày gần nhất.
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        try:
            rec = json.loads(line)
        except ValueError:
            continue
        run = str(rec.get("call_id", "")).split(":", 1)[0].removeprefix("run")
        if "output" in rec and run in run_ids:
            out[run].append({"gate": rec.get("gate"), "prompt": rec.get("prompt_name"), "result": rec.get("result"),
                             "error": rec.get("error"), "output": str(rec.get("output") or "")[:MAX_TEXT]})
    return {run: recs[-MAX_TRACE:] for run, recs in out.items()}


def build_prompt(cluster: dict, trace_path: Path) -> str:
    tasks = cluster["tasks"][-MAX_TASKS:]
    traces = _traces(trace_path, {str(t.get("run_id")) for t in tasks})
    data = {"gate": cluster["gate"], "failure_class": cluster["failure_class"], "skill": cluster["skill"],
            "misses_30d": len(cluster["tasks"]),
            "tasks": [{"request": str(t.get("request_text") or "")[:MAX_TEXT],
                       "clarified_spec": (t.get("clarified_spec") or "")[:MAX_TEXT] or None,
                       "expected_files": t.get("expected_files"), "must_contain": t.get("must_contain"),
                       "must_not_contain": t.get("must_not_contain"),
                       "trace": traces.get(str(t.get("run_id"))) or []} for t in tasks]}
    return PROMPT.format(allowed="\n".join(f"- {f}" for f in allowed_files()),
                         cluster=json.dumps(data, ensure_ascii=False, indent=1))


def parse_diagnosis(text: str, allowed: list[str]) -> dict:
    """Khuôn cố định + file mục tiêu trong vùng. Raise ValueError với lý do ngắn."""
    try:
        out = json.loads(text)
    except (TypeError, ValueError) as error:
        raise ValueError(f"không phải JSON: {error}") from None
    if not isinstance(out, dict) or set(out) != set(KEYS):
        raise ValueError(f"cần đúng các khoá {list(KEYS)}")
    for k in KEYS:
        if not isinstance(out[k], str) or not out[k].strip():
            raise ValueError(f"{k} rỗng")
        out[k] = out[k].strip()[:1000]
    if out["target_file"] not in allowed:
        raise ValueError(f"target_file ngoài vùng được sửa: {out['target_file'][:200]}")
    return out


def _request(cluster: dict, diagnosis: dict, now_ms: int) -> dict:
    target = diagnosis["target_file"]
    ids = ", ".join(f"#{t['id']}" for t in cluster["tasks"])
    detail = (f"Board tự cải thiện từ cụm lỗi {cluster['key']} (cổng|lớp lỗi|skill): "
              f"{len(cluster['tasks'])} lần hỏng trong {WINDOW_DAYS} ngày, task eval {ids}.\n\n"
              f"Giả thuyết: {diagnosis['hypothesis']}\n\n"
              f"File cần sửa (đúng 1 file, không file nào khác): {target}\n\n"
              f"Hiệu quả mong đợi: {diagnosis['expected_effect']}")
    # 1 yêu cầu / cụm / ngày: chạy lại cùng ngày → server trả yêu cầu đã có.
    digest = hashlib.sha1(f"{cluster['key']}:{now_ms // DAY_MS}".encode()).hexdigest()[:20]
    return {"title": f"Tự cải thiện {cluster['key']}: {target}"[:200], "detail": detail,
            "target_file": target, "idempotency_key": f"self-diag:{digest}"}


def _log(**fields) -> None:
    print(json.dumps({"self_diagnosis": fields.pop("status"), **fields}, ensure_ascii=False))


def diagnose_to_self_request(client, deps, *, now_ms: int, budget: Budget | None = None, skip=frozenset(),
                             trace_path: Path = TRACES_PATH) -> dict:
    """Phần học → 1 cụm → chẩn đoán → ≤ 1 yêu cầu self. client.post(path, payload) = WorkerClient.
    budget mặc định = phần đề xuất của ngân sách đêm (contract limits.self_improve.night_gpu_s.propose).
    skip = key cụm bỏ qua (vòng đêm: cụm thất bại nhiều đêm).
    Trả {status: created|dropped|not_ready|no_cluster|budget, cluster, diagnosis, attempts, reason, request}.
    HTTP lỗi khác 422 self_target_outside_area → raise."""
    split = client.post("/api/ai-board/worker/eval-tasks", {})
    ready, learning = split.get("ready"), list(split.get("learning") or [])
    del split  # phần kiểm tra: không giữ, không đưa model
    out = {"status": "not_ready", "cluster": None, "diagnosis": None, "attempts": 0, "reason": None, "request": None}
    if not ready:
        return out
    cluster = pick_cluster(learning, now_ms, skip=skip)
    if cluster is None:
        return {**out, "status": "no_cluster"}
    out["cluster"] = {**{k: v for k, v in cluster.items() if k != "tasks"},
                      "misses": len(cluster["tasks"]), "task_ids": [t["id"] for t in cluster["tasks"]]}
    budget = budget or Budget(max_units=LIMITS["night_gpu_s"]["propose"], max_model_calls=ATTEMPTS)
    allowed, prompt, reason = allowed_files(), build_prompt(cluster, trace_path), None
    for attempt in range(ATTEMPTS):
        if not budget.tick():
            out.update(status="budget", reason=f"hết ngân sách đề xuất ({budget.exhausted()})")
            _log(**out)
            return out
        out["attempts"] = attempt + 1
        body = deps.call_model(deps.models.gate3_model, prompt + (RETRY_SUFFIX.format(reason=reason) if reason else ""),
                               gate=0, budget=budget, prompt_name=PROMPT_NAME, format=SCHEMA)
        try:
            out["diagnosis"] = parse_diagnosis(body.get("response", ""), allowed)
            break
        except ValueError as error:
            reason = str(error)
    else:
        out.update(status="dropped", reason=reason, diagnosis=None)
        _log(**out)
        return out
    try:
        out["request"] = client.post("/api/ai-board/worker/self-requests", _request(cluster, out["diagnosis"], now_ms))
    except urllib.error.HTTPError as error:
        if error.code != 422:
            raise
        code = json.loads(error.read().decode("utf-8") or "{}").get("error")
        out.update(status="dropped", reason=f"server từ chối: {code}")
        _log(**out)
        return out
    out["status"] = "created"
    _log(**out)
    return out
