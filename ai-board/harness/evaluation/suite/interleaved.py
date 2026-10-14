"""Pinned DEV scheduling around an operator-supplied isolated suite adapter.

The adapter receives one scheduled trial as JSON on stdin and emits its existing
suite result as JSON. This module never selects a model or enables candidate flags.
Each adapter owns an isolated process tree, cleaned on timeout, cancel and exit.
"""
from __future__ import annotations

import hashlib
import json
import os
import random
import subprocess
from pathlib import Path

from .process_tree import run_owned

ARMS = ("control", "B01", "B02", "B01+B02")
PINS = ("source", "model", "corpus", "catalog", "prompt", "harness", "budget")


def prepare(root: Path, blocks: list[dict], pins: dict, *, seed: int,
            warm_cold: str, load_notes: str) -> dict:
    """Freeze the schedule before any process starts; reject changed resume pins."""
    if any(not pins.get(key) for key in PINS):
        raise ValueError("missing common experiment pins")
    if not blocks or len({(b['id'], b['mode'], b['repeat']) for b in blocks}) != len(blocks):
        raise ValueError("empty or duplicate matched blocks")
    if any(b.get('split', 'dev') != 'dev' for b in blocks):
        raise ValueError("only public DEV blocks are allowed")
    rng, schedule = random.Random(seed), []
    for block_number, block in enumerate(blocks):
        arms = list(ARMS)
        rng.shuffle(arms)
        for arm in arms:
            schedule.append({**block, "split": "dev", "block": block_number,
                             "ordinal": len(schedule), "arm": arm, "pins": pins})
    manifest = {"version": 1, "seed": seed, "pins": pins, "warm_cold": warm_cold,
                "load_notes": load_notes, "timing_comparable": False, "schedule": schedule}
    root.mkdir(parents=True, exist_ok=True)
    path = root / 'schedule.json'
    if path.exists():
        if json.loads(path.read_text(encoding='utf-8')) != manifest:
            raise ValueError('experiment schedule or pins changed')
    else:
        with path.open('x', encoding='utf-8') as out:
            json.dump(manifest, out, ensure_ascii=False, indent=2)
            out.flush()
            os.fsync(out.fileno())
    return manifest


def execute(root: Path, command: list[str], *, timeout_s: float) -> list[dict]:
    """Run sequential isolated processes. Resume never silently retries an intent.

    shortcut: unresolved crash intents require operator reconciliation; add explicit
    linked reruns only after the experiment budget/retry protocol is approved.
    """
    if timeout_s <= 0 or not command:
        raise ValueError('positive timeout and explicit adapter command required')
    lock = root / 'execution.lock'
    with lock.open('x', encoding='utf-8'):
        pass
    try:
        manifest = json.loads((root / 'schedule.json').read_text(encoding='utf-8'))
        path = root / 'attempts.jsonl'
        events = [json.loads(line) for line in path.read_text(encoding='utf-8').splitlines()] if path.exists() else []
        intents = {e['attempt_id'] for e in events if e['event'] == 'intent'}
        finished = {e['attempt_id'] for e in events if e['event'] == 'result'}
        if intents - finished:
            raise ValueError('unresolved attempt: reconcile before resume; budget is not reset')
        protocol = {'command': command, 'timeout_s': timeout_s, 'containment': 'owned-tree-v1'}
        protocol_path = root / 'executor.json'
        if protocol_path.exists():
            if json.loads(protocol_path.read_text(encoding='utf-8')) != protocol:
                raise ValueError('executor protocol changed')
        else:
            with protocol_path.open('x', encoding='utf-8') as out:
                json.dump(protocol, out)
                out.flush()
                os.fsync(out.fileno())

        def append(event):
            with path.open('a', encoding='utf-8') as out:
                out.write(json.dumps(event, ensure_ascii=False) + '\n')
                out.flush()
                os.fsync(out.fileno())
            events.append(event)

        for row in manifest['schedule']:
            identity = hashlib.sha256(json.dumps(row, sort_keys=True).encode()).hexdigest()
            if identity in finished:
                continue
            append({'event': 'intent', 'attempt_id': identity, 'trial': row})
            status, result = 'failure', None
            detail = {}
            try:
                process = run_owned(command, input=json.dumps(row), timeout=timeout_s)
                status = 'cancel' if process.returncode == 130 else ('success' if process.returncode == 0 else 'failure')
                detail = {'returncode': process.returncode}
                result = json.loads(process.stdout)
                if not isinstance(result, dict):
                    result = None
                    raise ValueError('adapter must return one suite result object')
            except subprocess.TimeoutExpired:
                status, detail = 'timeout', {'cost_status': 'unknown; adapter did not finish'}
            except KeyboardInterrupt:
                status, detail = 'cancel', {'cost_status': 'unknown; adapter did not finish'}
            except (OSError, ValueError) as error:
                if status != 'cancel':
                    status = 'failure'
                detail.update({'error_type': type(error).__name__, 'cost_status': 'unknown'})
            append({'event': 'result', 'attempt_id': identity, 'status': status,
                    'result': result, **detail})
            if status == 'cancel':
                break
        return events
    finally:
        lock.unlink()
