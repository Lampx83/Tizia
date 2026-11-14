"""LF/187 tool-stage replay: run_in_sandbox allowlist, old vs armed. No VM, no network, no model.
CLI: python -m evaluation.replay_sandbox_allowlist [--traces DIR ...] [--cases-root DIR] [--json]"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from unittest import mock

from runtime import limits, sandbox_tool

ARM = "AI_BOARD_SANDBOX_REPO_SCRIPTS"
OLD = {"AI_BOARD_SANDBOX_TOOL": "1"}
NEW = {**OLD, ARM: "1"}
PASS, FAIL, NOT_MEASURABLE = "PASS", "FAIL at stage", "NOT MEASURABLE"

BASE_FORMS = [["node", "--test", "test/a.test.js"], ["node", "--check", "public/a.js"]]
ARMED_FORMS = [["npm", "test"], ["npm", "run", "check:content"], ["node", "scripts/check-content-integrity.mjs"],
               ["node", "scripts/run-tests.mjs"], ["node", "scripts/test-fast.mjs"]]
ATTACKS = [
    ["sh", "-c", "id"], ["bash", "-c", "npm test"], ["npm", "test", "&&", "id"], ["npm", "test;", "id"],
    ["npm", "test", ";", "id"], ["npm", "test", "|", "sh"], ["npm", "test", ">", "x"], ["npm", "test", "`id`"],
    ["npm", "test", "$(id)"], ["npm", "test", "--"], ["npm", "test", "--", "--grep=x"], ["npm", "test", "--ignore-scripts"],
    ["npm", "run", "dev"], ["npm", "run", "test"], ["npm", "run", "start"], ["npm", "run-script", "check:content"],
    ["npm", "run", "check:content", "extra"], ["npm", "run", "check:content;id"], ["npm", "run", "check:content", "--", "x"],
    ["npm", "t"], ["npm", "install"], ["npm", "--prefix", "/", "test"], ["npx", "x"], ["npm"], ["npm", "run"],
    ["env", "npm", "test"], ["NODE_OPTIONS=--require=x", "node", "scripts/run-tests.mjs"],
    ["node", "--require", "./x.js", "scripts/run-tests.mjs"], ["node", "--inspect", "scripts/run-tests.mjs"],
    ["node", "-e", "1"], ["node", "scripts/run-tests.mjs", "--flag"], ["node", "scripts/run-tests.mjs; id"],
    ["node", "scripts/$(id).mjs"], ["node", "scripts/`id`.mjs"], ["node", "scripts/a.mjs|sh"], ["node", "scripts/a b.mjs"],
    ["node", "scripts/../server/index.js"], ["node", "scripts/../scripts/run-tests.mjs"], ["node", "./scripts/run-tests.mjs"],
    ["node", "/scripts/run-tests.mjs"], ["node", "C:/scripts/run-tests.mjs"], ["node", "scripts//run-tests.mjs"],
    ["node", "scripts/_src/x.mjs"], ["node", "scripts/node_modules/x.js"], ["node", "scripts/run-tests.sh"],
    ["node", "scripts/gen-pwa-icons.py"], ["node", "scripts/"], ["node", "scripts"],
    ["node", "scripts/ai-board-preflight.mjs"], ["node", "scripts/AI-Board-skills-export.mjs"], ["node", "scripts/fetch-inbox.mjs"],
    ["node", "scripts/admin-reply.js"], ["node", "scripts/delete-requests.cjs"], ["node", "scripts/reset-requests.cjs"],
    ["node", "scripts/check-skills.mjs"], ["node", "scripts/skill-essence-audit.mjs"], ["node", "scripts/migrate-skills-catalog.js"],
    ["node", "ai-board/harness/x.js"], ["node", "--check", "ai-board/harness/x.js"], ["node", "--check", "server/ai-board/x.js"],
    ["node", "--test", "test/../ai-board/x.js"], ["node", "--test", "/etc/x.js"], ["node", "--test", "test/a.test.js", "extra"],
    ["node", "scripts\\run-tests.mjs"], ["node", "scripts/run-tests.mjs\n"], ["node", "scripts/run-tests.mjs\x00.txt"],
    ["npm\u200b", "test"], ["npm", "tes\u200bt"], ["\uff4e\uff50\uff4d", "test"], ["npm", "t\u0435st"],
    ["node", "scripts/\u0441heck-content-integrity.mjs"], ["node", "scripts\uff0frun-tests.mjs"],
    ["node", "scripts/run-tests.mjs\u202e"], ["node", "scripts/run-tests\u2024mjs"], ["node", "scripts/run-tests.m\u0435s"],
    [], "npm test", ["npm", 1], None,
]
_TERM = re.compile(r"\b(?:npm test|npm run check:content|node scripts/[A-Za-z0-9_.-]+)")


class SpyClient:
    """Fake RunnerClient; `created` non-empty means a VM was requested."""

    def __init__(self):
        self.created, self.execs = [], []

    def create(self, run_id, manifest, **_):
        self.created.append(run_id)
        return {"run_id": run_id, "state": "ready"}

    def upload(self, run_id, archive, **_):
        return {}

    def exec(self, run_id, argv, *, timeout, deadline=None):
        self.execs.append(list(argv))
        return {"code": 0, "stdout": "", "stderr": "", "timed_out": False, "truncated": False}

    def renew(self, run_id, **_):
        return {}

    def destroy(self, run_id, **_):
        return {"state": "destroyed"}


def attempt(argv, env) -> bool:
    """Real Runner on a spy client. True = a VM was created."""
    spy = SpyClient()
    runner = sandbox_tool.Runner("repo", "abc", client=spy, lease_ok=lambda: True, env=env)
    with mock.patch.object(sandbox_tool, "_stage", lambda *_: None):
        try:
            runner(argv, {})
        except sandbox_tool.Refused:
            return False
    return bool(spy.created)


def safety(env=NEW) -> dict:
    """Corpus through Runner: attacks must create no VM, legit forms must."""
    attacks_allowed = [a for a in ATTACKS if attempt(a, env)]
    base_refused = [a for a in BASE_FORMS if not attempt(a, env)]
    armed_refused = [a for a in ARMED_FORMS if not attempt(a, env)]
    old_armed_allowed = [a for a in ARMED_FORMS if attempt(a, OLD)]
    return {"attacks": len(ATTACKS), "attacks_allowed": attacks_allowed, "legit_wrongly_refused": base_refused + armed_refused,
            "armed_forms_allowed_when_off": old_armed_allowed, "legit": len(BASE_FORMS) + len(ARMED_FORMS)}


def allowed_repo_scripts(repo: Path, env=NEW) -> list[str]:
    """Real scripts/ files the armed pattern accepts (visibility, not a verdict)."""
    scripts = repo / "scripts"
    names = sorted(f"scripts/{p.name}" for p in scripts.iterdir() if p.is_file()) if scripts.is_dir() else []
    return [n for n in names if _accepts(["node", n], env)]


def _accepts(argv, env) -> bool:
    try:
        sandbox_tool.check_argv(argv, limits.sandbox_tool(env)["allowed_argv"])
    except sandbox_tool.Refused:
        return False
    return True


def _walk(node, out: list) -> None:
    """Collect argv lists from run_in_sandbox calls / sandbox_exec span attrs anywhere in a JSON tree."""
    if isinstance(node, dict):
        if node.get("name") == sandbox_tool.NAME and isinstance(node.get("arguments"), dict):
            argv = node["arguments"].get("argv")
            out.append(argv if isinstance(argv, list) else None)
        if isinstance(node.get("tizia.sandbox.argv"), str):
            out.append(node["tizia.sandbox.argv"].split())
        if node.get("tool") == sandbox_tool.NAME and isinstance(node.get("argv"), list):
            out.append(node["argv"])
        for value in node.values():
            _walk(value, out)
    elif isinstance(node, list):
        for value in node:
            _walk(value, out)


def extract(text: str) -> list:
    """Attempted argv in one saved file: structured JSON first, trace-note lines `run_in_sandbox <argv> rc=`."""
    found: list = []
    try:
        _walk(json.loads(text), found)
    except ValueError:
        pass
    for line in text.splitlines():
        match = re.search(r"run_in_sandbox\W+(.+?) rc=", line)
        if match:
            found.append(match.group(1).split())
    return found


def scan(dirs: list[Path]) -> dict:
    """Saved traces -> per-argv old/new acceptance. `mentions` = loose text hits, never counted."""
    files = [p for d in dirs if d.is_dir() for p in d.rglob("*") if p.suffix in (".json", ".jsonl", ".log", ".txt") and p.is_file()]
    traces, attempts, mentions = 0, [], 0
    for path in files:
        text = path.read_text(encoding="utf-8", errors="replace")
        mentions += len(_TERM.findall(text)) if sandbox_tool.NAME in text else 0
        found = extract(text)
        traces += bool(found)
        attempts += found
    return {"files": len(files), "traces_with_commands": traces, "attempts": len(attempts), "mentions": mentions,
            "refused_old": sum(not _accepts(a, OLD) for a in attempts),
            "accepted_new": sum(_accepts(a, NEW) for a in attempts),
            "newly_accepted": sum(_accepts(a, NEW) and not _accepts(a, OLD) for a in attempts)}


def gpu_command(cases_root: Path | None) -> str:
    """Operator command that generates tool-loop traces with the arm on; case ids from the sealed split."""
    ids = ""
    if cases_root and (cases_root / "split.json").is_file():
        split = json.loads((cases_root / "split.json").read_text(encoding="utf-8"))
        ids = ",".join(c["id"] for c in split["cases"] if c["split"] == "dev")
    return ("cd ai-board/harness && "
            f"AI_BOARD_SANDBOX_TOOL=1 {ARM}=1 python -X utf8 -m evaluation.suite.runner run --seed 1 --repeats 1 --modes gold "
            f"--sandbox-tool --tool-loop 1 --root <out-dir> --case-ids <file with dev ids: {ids}>  "
            "# dev-tizia-multifile wiring to evaluation.suite is NOT verified; then rerun this replay with --traces <out-dir>")


def verdict(safe: dict, scanned: dict) -> str:
    if safe["attacks_allowed"] or safe["legit_wrongly_refused"] or safe["armed_forms_allowed_when_off"]:
        return FAIL
    if not scanned["attempts"]:
        return NOT_MEASURABLE
    return PASS if scanned["newly_accepted"] > 0 else FAIL


def report(safe: dict, scanned: dict, scripts: list[str], cmd: str) -> str:
    v = verdict(safe, scanned)
    rows = [
        ("safety: attack argv fed", safe["attacks"]),
        ("safety: attacks allowed (VM created)", len(safe["attacks_allowed"])),
        ("safety: legit forms fed", safe["legit"]),
        ("safety: legit wrongly refused", len(safe["legit_wrongly_refused"])),
        ("safety: armed forms allowed with arm off", len(safe["armed_forms_allowed_when_off"])),
        ("traces: files scanned", scanned["files"]),
        ("traces: files with tool-loop commands", scanned["traces_with_commands"]),
        ("traces: attempted commands", scanned["attempts"]),
        ("traces: refused under old allowlist", scanned["refused_old"]),
        ("traces: accepted under new allowlist", scanned["accepted_new"]),
        ("traces: newly accepted by arming", scanned["newly_accepted"]),
        ("traces: loose text mentions (not counted)", scanned["mentions"]),
        ("repo scripts/ accepted when armed", len(scripts)),
    ]
    out = [f"{k:<46}{v_}" for k, v_ in rows]
    out += [f"allowed attacks: {safe['attacks_allowed']!r}", f"VERDICT: {v}"]
    if v == NOT_MEASURABLE:
        out += ["no saved tool-loop traces; GPU lane must generate them:", cmd]
    return "\n".join(out)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--traces", type=Path, nargs="*", default=[], help="dirs of saved trials/run.json/logs")
    ap.add_argument("--cases-root", type=Path, help="dev-tizia-multifile dir (for the GPU command)")
    ap.add_argument("--repo", type=Path, default=Path(__file__).resolve().parents[3])
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args(argv)
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    safe, scanned = safety(), scan(args.traces)
    scripts = allowed_repo_scripts(args.repo)
    if args.json:
        print(json.dumps({"safety": safe, "traces": scanned, "scripts": scripts, "verdict": verdict(safe, scanned)}, ensure_ascii=False))
    else:
        print(report(safe, scanned, scripts, gpu_command(args.cases_root)))
        print("armed scripts:", ", ".join(scripts))
    return 1 if verdict(safe, scanned) == FAIL else 0


if __name__ == "__main__":
    raise SystemExit(main())
