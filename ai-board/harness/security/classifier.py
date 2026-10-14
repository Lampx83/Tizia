"""Guard classifier, harness side of server/ai-board/classifier.js: same labels, prompt and
thresholds (server/ai-board/classifier-calibration.json). One token from AI_BOARD_CLASSIFIER_MODEL, softmax over
the task's letters only. It runs next to the JSON guardrails and may only raise severity; a scoring reject
signal is observational until a separately approved runtime policy consumes it."""
from __future__ import annotations

import json
import math
import re
from pathlib import Path

CONFIG_PATH = Path(__file__).resolve().parents[3] / "server" / "ai-board" / "classifier-calibration.json"
CLASSIFIER = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
MAX_TEXT = 2000
_LETTER = re.compile(r"^([A-Z])[.):]?$")
# keep_alive: model nhỏ dùng chung với chat làm rõ, giữ nạp sẵn.
LOGPROB_FIELDS = {"think": False, "logprobs": True, "top_logprobs": 20, "keep_alive": CLASSIFIER["keep_alive"]}


def build_prompt(task: str, text: str) -> str:
    """Same prompt as the Node side; the student's text is fenced and cannot close the fence."""
    spec = CLASSIFIER["tasks"][task]
    fenced = re.sub(r"<{3,}|>{3,}", "", text or "")[:MAX_TEXT]
    options = "\n".join(f"{label['letter']}. {label['text']}" for label in spec["labels"])
    return (spec.get("prompt", CLASSIFIER["prompt"]).replace("{question}", spec["question"], 1)
            .replace("{options}", options, 1).replace("{text}", fenced, 1))


def label_probs(body: dict, task: str, temperature: float | None = None, coverage: dict | None = None) -> dict[str, float]:
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
    if coverage is not None:
        coverage.update(observed_labels=[label["key"] for label in seen],
                        missing_labels=[label["key"] for label in labels if label["letter"] not in by_letter],
                        status="complete" if len(seen) == len(labels) else "partial" if seen else "parser_failure")
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


LOGIT_CLIP = 1e-6


def stacker_score(probs: dict, scoring: dict) -> float:
    """Logistic score over the label logits (standardised, last weight is the bias); a missing key counts as 0."""
    keys, z = scoring["keys"], scoring["b"][len(scoring["keys"])]
    for i, key in enumerate(keys):
        p = min(1 - LOGIT_CLIP, max(LOGIT_CLIP, float(probs.get(key) or 0)))
        z += scoring["b"][i] * (math.log(p / (1 - p)) - scoring["mu"][i]) / scoring["sd"][i]
    return 1 / (1 + math.exp(-z))


def decide_danger(probs: dict, t: dict | None = None, scoring: dict | None = None) -> dict:
    """escalate → human review; reject only when scoring.reject_min is set. logged = unsafe labels worth keeping."""
    t = t or CLASSIFIER["thresholds"]["danger"]
    unsafe = [(key, p) for key, p in probs.items() if key != "safe"]
    logged = [{"key": key, "p": p} for key, p in unsafe if p >= t["log_min"]]
    if scoring and scoring.get("rule") == "stacker":
        score = stacker_score(probs, scoring)
        escalate = score > scoring["review_min"]
        top = max(unsafe, key=lambda item: item[1], default=None)
        reject = escalate and scoring.get("reject_min") is not None and score > scoring["reject_min"]
        return {"escalate": escalate, "reject": reject, "score": score,
                "labels": [top[0]] if escalate and top else [], "logged": logged}
    return {"escalate": any(p >= t["escalate_min"] for _, p in unsafe),
            "labels": [key for key, p in unsafe if p >= t["escalate_min"]], "logged": logged}


def classify(task: str, text: str, deps, budget, *, gate: float, db_path=None, proposal_id=None) -> dict | None:
    """{model, probs} via deps.call_model (metered + traced). None when no classifier model, no budget, or any
    error: callers keep the old behaviour (nothing extra blocked, no hard rule dropped)."""
    model = getattr(deps.models, "classifier_model", "")
    if (not model and not getattr(deps.models, 'routing', None)) or task_mode(task) == "off" or not budget.tick():
        return None
    body, coverage = None, {}
    trace = getattr(deps, "trace", None)
    try:
        body = deps.call_model(model, build_prompt(task, text), gate=gate, budget=budget, db_path=db_path,
                               proposal_id=proposal_id, prompt_name=f"classifier_{task}", format=None, options={"num_predict": 1},
                               extra=LOGPROB_FIELDS)
        probs = label_probs(body, task, coverage=coverage)
        if trace and hasattr(trace, "attach_last"):
            trace.attach_last("evaluation", {"check": f"classifier_{task}_coverage", "ok": coverage["status"] == "complete",
                                             "detail": json.dumps(coverage, ensure_ascii=False)})
        return {"model": body.get('_model', model), "probs": probs, "coverage": coverage,
                **({'route': body['_route']} if body.get('_route') else {})}
    except Exception as error:  # noqa: BLE001 — outage/format: fall back, never fail the gate here
        if body is not None and trace and hasattr(trace, "attach_last"):
            trace.attach_last("evaluation", {"check": f"classifier_{task}_coverage", "ok": False,
                                             "detail": json.dumps({**coverage, "status": "parser_failure"}, ensure_ascii=False)})
        print(f"[classifier] {task} lỗi: {str(error)[:200]}")
        return None


def task_mode(task: str) -> str:
    """active acts, shadow only logs, off skips the call."""
    return CLASSIFIER["tasks"][task].get("mode", "active")


def danger(text: str, deps, budget, **kwargs) -> dict | None:
    """Danger task + decision, or None (see classify). Shadow mode: probs kept, never escalates."""
    out = classify("danger", text, deps, budget, **kwargs)
    if not out:
        return None
    decision = decide_danger(out["probs"], scoring=CLASSIFIER["tasks"]["danger"].get("scoring"))
    if task_mode("danger") == "shadow":
        decision.update(escalate=False, labels=[], shadow=True)
        if "reject" in decision:
            decision["reject"] = False
    return {**out, **decision}
