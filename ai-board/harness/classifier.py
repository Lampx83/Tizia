"""Logprob classifier (ticket 04), harness side of server/ai-board/classifier.js: same labels, prompt and
thresholds (server/ai-board/classifier-calibration.json). One token from AI_BOARD_CLASSIFIER_MODEL, softmax over
the task's letters only. It runs next to the JSON guardrails and may only raise severity."""
from __future__ import annotations

import json
import math
import re
from pathlib import Path

CONFIG_PATH = Path(__file__).resolve().parents[2] / "server" / "ai-board" / "classifier-calibration.json"
CLASSIFIER = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
MAX_TEXT = 2000
_LETTER = re.compile(r"^([A-Z])[.):]?$")
LOGPROB_FIELDS = {"think": False, "logprobs": True, "top_logprobs": 20}


def build_prompt(task: str, text: str) -> str:
    """Same prompt as the Node side; the student's text is fenced and cannot close the fence."""
    spec = CLASSIFIER["tasks"][task]
    fenced = re.sub(r"<{3,}|>{3,}", "", text or "")[:MAX_TEXT]
    options = "\n".join(f"{label['letter']}. {label['text']}" for label in spec["labels"])
    return (CLASSIFIER["prompt"].replace("{question}", spec["question"], 1)
            .replace("{options}", options, 1).replace("{text}", fenced, 1))


def label_probs(body: dict, task: str, temperature: float | None = None) -> dict[str, float]:
    """{key: p} over the task's letters. Raise ValueError when the response has no label logprobs."""
    temperature = temperature or CLASSIFIER["temperature"]
    first = (body.get("logprobs") or [None])[0] or {}
    top = first.get("top_logprobs") or ([first] if first else [])
    by_letter: dict[str, float] = {}
    for item in top:
        match = _LETTER.match(str(item.get("token") or "").strip())
        logprob = item.get("logprob")
        if match and match.group(1) not in by_letter and isinstance(logprob, (int, float)) and math.isfinite(logprob):
            by_letter[match.group(1)] = float(logprob)
    labels = CLASSIFIER["tasks"][task]["labels"]
    seen = [label for label in labels if label["letter"] in by_letter]
    if not seen:
        raise ValueError("classifier: no label logprobs in the response")
    scaled = [by_letter[label["letter"]] / temperature for label in seen]
    top_value = max(scaled)
    total = sum(math.exp(v - top_value) for v in scaled)
    probs = {label["key"]: 0.0 for label in labels}
    for label, value in zip(seen, scaled):
        probs[label["key"]] = math.exp(value - top_value) / total
    return probs


def decide_clarity(probs: dict, t: dict | None = None) -> dict:
    t = t or CLASSIFIER["thresholds"]["clarity"]
    if probs.get("too_broad", 0) >= t["split_min"]:
        return {"needed": True, "mode": "split"}
    if probs.get("clear", 0) < t["clear_min"]:
        return {"needed": True, "mode": "ask"}
    return {"needed": False, "mode": None}


def decide_danger(probs: dict, t: dict | None = None) -> dict:
    """escalate → human review, never a block on its own. logged = unsafe labels worth keeping (ticket 01)."""
    t = t or CLASSIFIER["thresholds"]["danger"]
    unsafe = [(key, p) for key, p in probs.items() if key != "safe"]
    return {"escalate": any(p >= t["escalate_min"] for _, p in unsafe),
            "labels": [key for key, p in unsafe if p >= t["escalate_min"]],
            "logged": [{"key": key, "p": p} for key, p in unsafe if p >= t["log_min"]]}


def classify(task: str, text: str, deps, budget, *, gate: float, db_path=None, proposal_id=None) -> dict | None:
    """{model, probs} via deps.call_model (metered + traced). None when no classifier model, no budget, or any
    error: callers keep the old behaviour (nothing extra blocked, no hard rule dropped)."""
    model = getattr(deps.models, "classifier_model", "")
    if not model or task_mode(task) == "off" or not budget.tick():
        return None
    try:
        body = deps.call_model(model, build_prompt(task, text), gate=gate, budget=budget, db_path=db_path,
                               proposal_id=proposal_id, format=None, options={"num_predict": 1},
                               extra=LOGPROB_FIELDS)
        return {"model": model, "probs": label_probs(body, task)}
    except Exception as error:  # noqa: BLE001 — outage/format: fall back, never fail the gate here
        print(f"[classifier] {task} lỗi: {str(error)[:200]}")
        return None


def task_mode(task: str) -> str:
    """active acts, shadow only logs, off skips the call (ticket 08)."""
    return CLASSIFIER["tasks"][task].get("mode", "active")


def danger(text: str, deps, budget, **kwargs) -> dict | None:
    """Danger task + decision, or None (see classify). Shadow mode: probs kept, never escalates."""
    out = classify("danger", text, deps, budget, **kwargs)
    if not out:
        return None
    decision = decide_danger(out["probs"])
    if task_mode("danger") == "shadow":
        decision.update(escalate=False, labels=[], shadow=True)
    return {**out, **decision}
