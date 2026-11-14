"""Wall-time split per trial: queue, clarify wait, waits, gates, model, sandbox. Read-only; CLI: python -m evaluation.wall_time [--trials AB_DIR]."""
from __future__ import annotations

import glob
import json
import os
import sys

TOL_ABS_S = 2.0
TOL_REL = 0.02
GATE5 = "5"
_PRIO = {"gate": 1, "model": 3, "sandbox": 4}


def tolerance(wall_s: float) -> float:
    """Allowed unexplained seconds."""
    return max(TOL_ABS_S, TOL_REL * wall_s)


def _state(name: str) -> str:
    if name == "queued" or name == "created":
        return "queue"
    if name in ("running", "planned"):
        return "running"
    if name == "clarifying" or name.endswith(":clarifying"):
        return "clarify_wait"
    return f"wait:{name}"


def _intervals(root: dict, events: list[dict], end_ms: int) -> list[tuple[int, int, str]]:
    """Root lifetime -> (start, end, state). Interval ending at an event has that event's source state."""
    marks = sorted(((e["created_at"], e.get("id", 0), e["transition"]) for e in events
                    if "->" in (e.get("transition") or "")))
    out, prev, state = [], root["created_at"], "queue"
    for at, _, transition in marks:
        src, dst = transition.split("->", 1)
        out.append((prev, max(at, prev), _state(src)))
        prev, state = max(at, prev), _state(dst)
    out.append((prev, max(end_ms, prev), state))
    return [i for i in out if i[1] > i[0]]


def _span_items(spans: list[dict]) -> list[tuple[int, int, str, int]]:
    items = []
    for s in spans:
        if s.get("end_ms") is None:
            continue
        name = str(s["name"])
        if name == "sandbox_exec":
            bucket, kind = "sandbox", "sandbox"
        elif name.startswith("chat"):
            bucket, kind = "model", "model"
        elif name.startswith("invoke_agent gate "):
            number = name.rsplit(" ", 1)[1]
            bucket, kind = (f"gate {number} checks" if number == GATE5 else f"gate {number}"), "gate"
        else:
            continue
        items.append((s["start_ms"], s["end_ms"], bucket, _PRIO[kind]))
    return items


def attribute(root: dict, events: list[dict], spans: list[dict], end_ms: int) -> dict:
    """root {created_at}; events {created_at, transition}; spans {name, start_ms, end_ms}, all epoch ms.
    Spans only count inside running windows; span time outside them is reported, not hidden."""
    windows = _intervals(root, events, end_ms)
    items = _span_items(spans)
    points = sorted({p for w in windows for p in w[:2]} | {p for i in items for p in i[:2]})
    parts: dict[str, float] = {}
    outside = 0.0
    for x, y in zip(points, points[1:]):
        state = next((w[2] for w in windows if w[0] <= x and y <= w[1]), None)
        active = [i for i in items if i[0] <= x and y <= i[1]]
        sec = (y - x) / 1000
        if state is None:
            outside += sec if active else 0.0
        elif state != "running":
            parts[state] = parts.get(state, 0.0) + sec
            outside += sec if active else 0.0
        else:
            bucket = max(active, key=lambda i: (i[3], i[0]))[2] if active else "running_untracked"
            parts[bucket] = parts.get(bucket, 0.0) + sec
    return _verdict(parts, windows[-1][1] - windows[0][0] if windows else 0, outside)


def _verdict(parts: dict, wall_ms: float, outside_s: float) -> dict:
    wall = wall_ms / 1000
    tol = tolerance(wall)
    unexplained = parts.get("running_untracked", 0.0)
    gap = wall - sum(parts.values())
    return {"wall_s": wall, "parts": parts, "unexplained_s": unexplained, "outside_s": outside_s, "gap_s": gap, "tol_s": tol,
            "ok": unexplained <= tol and outside_s <= tol and abs(gap) <= tol}


def from_trial(trial: dict) -> dict:
    """Saved trial JSON (polled timeline, no spans): gates are phases, boundaries blur by poll interval, sandbox not split."""
    total = float(trial.get("trial_wall_s") or 0.0)
    tl = sorted(trial.get("timeline") or [], key=lambda e: float(e["t"]))
    parts: dict[str, float] = {}
    if tl and float(tl[0]["t"]) > 0:
        parts["queue"] = float(tl[0]["t"])
    for i, e in enumerate(tl):
        end = float(tl[i + 1]["t"]) if i + 1 < len(tl) else total
        phase = e.get("phase") or "none"
        status = e.get("status")
        if phase == "clarifying":
            bucket = "clarify_wait"
        elif status == "queued":
            bucket = "queue"
        elif status in ("running", "planned"):
            bucket = f"gate:{phase}"
        else:
            bucket = f"wait:{phase}"
        parts[bucket] = parts.get(bucket, 0.0) + max(0.0, end - float(e["t"]))
    out = _verdict(parts, total * 1000, 0.0)
    out["model_s"] = float(trial.get("model_wall_s") or 0.0)
    out["ok"] = out["ok"] and bool(tl) and total > 0
    return out


def rows(roots: list[dict], tickets: list[dict], events: list[dict], runs: list[dict], spans: list[dict]) -> list[dict]:
    """DB rows -> one attribution per root ticket. Child-ticket events are ignored; child runs' spans count."""
    root_of = {t["id"]: (t["id"] if t.get("parent_id") is None else t["parent_id"]) for t in tickets}
    run_root = {r["id"]: root_of.get(r["ticket_id"]) for r in runs}
    out = []
    for root in sorted(roots, key=lambda r: r["id"]):
        mine = [e for e in events if e["ticket_id"] == root["id"]]
        own = [s for s in spans if run_root.get(s["run_id"]) == root["id"]]
        out.append({"root_id": root["id"], **attribute(root, mine, own, root["updated_at"])})
    return out


def _order(buckets) -> list[str]:
    def key(b):
        fixed = {"queue": 0, "clarify_wait": 1, "model": 4, "sandbox": 5, "running_untracked": 6}
        return (fixed.get(b, 2 if b.startswith("wait") else 3), b)
    return sorted(buckets, key=key)


def table(items: list[dict], label: str = "trial") -> str:
    """Markdown table, seconds; flagged rows say OVER TOL, residuals are never rounded away."""
    cols = _order({b for r in items for b in r["parts"]})
    head = f"| {label} | wall s | " + " | ".join(cols) + " | gap s | outside s | ok |\n"
    head += "|---|---|" + "---|" * (len(cols) + 3) + "\n"
    body = ""
    for r in items:
        cells = " | ".join(f"{r['parts'].get(c, 0.0):.1f}" for c in cols)
        body += (f"| {r.get('label', r.get('root_id'))} | {r['wall_s']:.1f} | {cells} | {r['gap_s']:+.1f} | "
                 f"{r['outside_s']:.1f} | {'yes' if r['ok'] else 'OVER TOL'} |\n")
    return head + body


def summary(items: list[dict]) -> str:
    """Totals, flagged count, share by bucket."""
    wall = sum(r["wall_s"] for r in items) or 1.0
    share: dict[str, float] = {}
    for r in items:
        for b, s in r["parts"].items():
            share[b] = share.get(b, 0.0) + s
    bad = sum(not r["ok"] for r in items)
    lines = [f"Trials: {len(items)}; flagged: {bad}. Tolerance per trial: max({TOL_ABS_S:g} s, {TOL_REL:.0%} of wall) "
             "on unexplained running time, span time outside running windows, and parts-vs-wall gap.", "",
             "| bucket | seconds | share |", "|---|---|---|"]
    lines += [f"| {b} | {share[b]:.1f} | {share[b] / wall:.1%} |" for b in sorted(share, key=lambda b: -share[b])]
    return "\n".join(lines) + "\n"


def trial_report(trials_dir: str, dev_ids: list[str], multifile_ids: list[str]) -> str:
    """Report over saved trials; latest trial per case; list cases with no saved trial."""
    latest: dict[str, tuple[str, dict]] = {}
    for f in sorted(glob.glob(os.path.join(trials_dir, "*.json"))):
        with open(f, encoding="utf-8") as fh:
            d = json.load(fh)
        case = str(d["case"]).split(":", 1)[-1]
        if case not in latest or d.get("started_at", "") >= latest[case][1].get("started_at", ""):
            latest[case] = (os.path.basename(f), d)
    text = ["# Wall time by trial (LF/175)", "", "Source: saved trials (polled timeline; no DB, no model, no GPU). "
            "Phase boundaries are only as sharp as the poll interval (about 8-10 s); sandbox and gate 5 browser/curl time "
            "sit inside their gate phase here. `model s` is model_wall_s and overlaps gates.", ""]
    for title, ids in (("Dev cases", dev_ids), ("Multi-file tasks", multifile_ids)):
        found = [i for i in ids if i in latest]
        items = [{"label": i, **from_trial(latest[i][1])} for i in found]
        text += [f"## {title}: {len(found)}/{len(ids)} with a saved trial", ""]
        if items:
            text += [table(items, "case"), summary(items)]
        if len(found) < len(ids):
            text += ["No saved trial: " + ", ".join(i for i in ids if i not in latest), ""]
    return "\n".join(text)


def main(argv: list[str]) -> int:
    if len(argv) > 1 and argv[1] == "--trials":
        base = argv[2]
        with open(os.path.join(base, "cases-dev.json"), encoding="utf-8") as fh:
            dev = [c["id"] for c in json.load(fh)]
        mf = sorted(os.listdir(os.path.join(base, "dev-multifile", "tasks")))
        out = trial_report(os.path.join(base, "trials"), dev, mf)
        sys.stdout.write(out)
        return 0
    from repositories.dbconn import harness_db

    with harness_db(os.environ["DATABASE_URL"], dict_rows=True) as con:
        get = lambda sql: [dict(r) for r in con.execute(sql).fetchall()]  # noqa: E731
        tickets = get("SELECT id, parent_id, created_at, updated_at FROM ai_tickets")
        events = get("SELECT id, ticket_id, created_at, transition FROM ai_events WHERE transition IS NOT NULL")
        runs = get("SELECT id, ticket_id FROM ai_runs")
        spans = get("SELECT run_id, name, start_ms, end_ms FROM ai_spans")
    items = rows([t for t in tickets if t["parent_id"] is None], tickets, events, runs, spans)
    sys.stdout.write((table(items, "root") + "\n" + summary(items)) if items else "no root tickets\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
