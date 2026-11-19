"""Clarification loop for ambiguous-request cases: rule-based simulated user, loop driver, scorer."""
from __future__ import annotations

import json
import unicodedata

NEUTRAL_REPLY = "Em không rõ, anh/chị cứ làm theo cách hợp lý."
MAX_ROUNDS = 3
GOAL_OUTCOMES = {"ready_for_pr", "needs_review"}

# Checked in order, first hit wins: one question maps to one slot, so only that slot's fact is given.
SLOT_KEYWORDS = [
    ("scope", ["khac", "other", "else", "only", "giu nguyen", "nen ", "vien", "co doi", "co sua", "anything"]),
    ("color", ["mau", "color", "colour", "xanh", "hex"]),
    ("position", ["o dau", "vi tri", "sau ", "truoc", "cuoi", "position", "where", "after", "before"]),
    ("new_text", ["chu gi", "ghi gi", "viet gi", "noi dung", "doi thanh", "new text", "say", "wording", "text"]),
    ("page", ["trang", "page", "man hinh", "screen"]),
    ("element", ["nut", "dong", "nhan", "tieu de", "cho nao", "phan nao", "cai nao", "element", "button",
                 "label", "heading", "which", "nao"]),
]


def _norm(text: str) -> str:
    folded = unicodedata.normalize("NFD", str(text).lower().replace("đ", "d"))
    return " ".join("".join(c for c in folded if unicodedata.category(c) != "Mn").split()) + " "


def slot_for(question: str) -> str | None:
    """Question -> slot name by keyword list, None if no keyword hits."""
    text = _norm(question)
    for slot, words in SLOT_KEYWORDS:
        if any(w in text for w in words):
            return slot
    return None


def reply(question: str, gaps: list[dict]) -> tuple[str | None, str]:
    """(slot, answer): the stored answer of the asked slot only, else the neutral reply."""
    slot = slot_for(question)
    stored = {g["slot"]: g["user_answer"] for g in gaps}
    return slot, stored.get(slot, NEUTRAL_REPLY)


def drive(board, gaps: list[dict], rounds_left: int = MAX_ROUNDS) -> dict:
    """Answer board questions up to rounds_left, confirm the summary. Returns {questions, end, resumed}.

    board: turns() -> list|None, step(answer|None) -> {kind, text}, confirm(spec) -> bool.
    """
    out = {"questions": [], "end": None, "resumed": False}
    turns = board.turns()
    if turns is None:
        out["end"] = "not_clarifying"
        return out
    last = turns[-1] if turns else None
    event = last if last and last["kind"] in ("question", "summary") else board.step(None)
    answered = 0
    while True:
        kind, text = event["kind"], event.get("text", "")
        if kind == "summary":
            out["resumed"] = bool(board.confirm(text))
            out["end"] = "confirmed" if out["resumed"] else "confirm_failed"
            return out
        if kind != "question":
            out["end"] = kind
            return out
        slot, answer = reply(text, gaps)
        entry = {"question": text, "slot": slot, "answer": None}
        out["questions"].append(entry)
        if answered >= rounds_left:
            out["end"] = "rounds_exhausted"
            return out
        entry["answer"] = answer
        answered += 1
        event = board.step(answer)


class HttpBoard:
    """Owner-side clarify endpoints of the intake context, through a driver Session."""

    def __init__(self, client, request_id: int):
        self.client, self.base = client, f"/api/ai-board/requests/{int(request_id)}/clarify"

    def turns(self):
        status, body = self.client.call("GET", self.base)
        return body.get("turns", []) if status == 200 and isinstance(body, dict) else None

    def step(self, answer=None):
        payload = {"model_source": "local"}
        if answer is not None:
            payload["answer"] = answer
        status, body = self.client.call("POST", self.base, payload, timeout=300)
        if status != 200:
            return {"kind": f"http_{status}", "text": str(body)[:200]}
        done = None
        for line in str(body).splitlines():
            try:
                event = json.loads(line)
            except ValueError:
                continue
            if event.get("t") == "done":
                done = event
        return {"kind": done["kind"], "text": done.get("text", "")} if done else {"kind": "no_done_event", "text": ""}

    def confirm(self, spec: str) -> bool:
        status, _ = self.client.call("POST", self.base + "/confirm", {"spec": spec})
        return status == 200


def score_row(row: dict, case: dict) -> dict:
    """One trial row + its vague-case entry -> asked, slots_asked, ask_correct, resolved_after, guessed."""
    questions = (row.get("clarify") or {}).get("questions") or []
    asked = bool(questions)
    gap_slots = {g["slot"] for g in case.get("gaps", [])}
    slots_asked = len({q["slot"] for q in questions} & gap_slots)
    vague = case["kind"] == "vague"
    shipped = row.get("outcome") in GOAL_OUTCOMES
    ask_correct = asked and slots_asked >= case["expected"]["min_slots_asked"] if vague else not asked
    resolved = row.get("resolved")
    return {"case": case["id"], "kind": case["kind"], "asked": asked, "slots_asked": slots_asked,
            "ask_correct": ask_correct, "resolved_after": resolved if resolved is None else bool(resolved),
            "guessed": vague and not asked and shipped}


def report(scored: list[dict]) -> dict:
    """Counts per kind (vague, control); control wrong = asked."""
    out = {}
    for kind in ("vague", "control"):
        rows = [s for s in scored if s["kind"] == kind]
        known = [s for s in rows if s["resolved_after"] is not None]
        out[kind] = {"n": len(rows), "asked": sum(s["asked"] for s in rows),
                     "ask_correct": sum(s["ask_correct"] for s in rows),
                     "resolved_after": sum(bool(s["resolved_after"]) for s in known), "resolved_known": len(known),
                     "guessed": sum(s["guessed"] for s in rows), "wrong": sum(not s["ask_correct"] for s in rows)
                     if kind == "control" else None}
    return out
