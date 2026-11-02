"""Execution graph: one LangGraph built from server/ai-board/contract.json, so the engine, the server and the admin diagram share one spec."""
from __future__ import annotations

import hashlib
import json
import operator
import time
from pathlib import Path
from typing import Annotated, Callable, TypedDict

from langchain_core.runnables import RunnableConfig

from runtime import limits, loop_guard
from settings import get_settings

PATH = Path(__file__).resolve().parents[3] / "server" / "ai-board" / "contract.json"


def spec() -> dict:
    return json.loads(PATH.read_text(encoding="utf-8"))["execution_graph"]


def digest() -> str:
    """sha256 của graph spec: đổi spec là mọi resume cũ mất hiệu lực."""
    raw = json.dumps(spec(), sort_keys=True, ensure_ascii=False, separators=(",", ":"))
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def persistence_enabled() -> bool:
    return get_settings().graph_persistence


class GraphState(TypedDict, total=False):
    outcome: str
    path: Annotated[list, operator.add]
    hashes: Annotated[list, operator.add]
    halt: str


class GraphError(RuntimeError):
    """The spec and the handlers disagree, or a node reported an outcome the spec has no edge for."""


def compile_graph(handlers: dict[str, Callable[[], str]], entry: str, *, graph_spec: dict | None = None, journal: Callable | None = None, checkpointer=None,
                  observe: dict[str, Callable[[], tuple | None]] | None = None, report: dict | None = None,
                  resume_nodes: dict[str, str] | None = None):
    """Every reachable node but a bare end node needs a handler; every outcome a handler returns needs an edge.
    `observe[node]` returns (code, error, signature) before the node runs; a state seen again skips the node and halts the walk.
    `report` receives {reason, node, detail} of the halt; a halt routes to the verdict node (or the end when there is none).
    `resume_nodes` maps node -> recorded outcome: the first visit returns it without running the handler (journal-driven resume)."""
    from langgraph.graph import END, START, StateGraph

    graph_spec = graph_spec or spec()
    nodes = {node["id"]: node for node in graph_spec["nodes"]}
    if entry not in nodes:
        raise GraphError(f"unknown entry node {entry}")
    routes: dict[str, dict[str, str]] = {nid: {} for nid in nodes}
    for edge in graph_spec["edges"]:
        routes[edge["from"]][edge["on"]] = edge["to"]
    reachable, todo = {entry}, [entry]
    while todo:  # a trigger runs only the part of the graph reachable from its entry
        for target in routes[todo.pop()].values():
            if target not in reachable:
                reachable.add(target)
                todo.append(target)
    work = {nid for nid in reachable if not nodes[nid].get("end") or nid in handlers}  # an end node may still do work (the verdict)
    missing = work - set(handlers)
    extra = set(handlers) - work
    if missing or extra:
        raise GraphError(f"handlers do not match the graph: missing {sorted(missing)}, extra {sorted(extra)}")

    guard = limits.loop_guard()
    observe = observe or {}
    report = report if report is not None else {}
    resumed: set[str] = set()

    def halt_at(nid: str, reason: str, detail: str) -> dict:
        report.update(reason=reason, node=nid, detail=detail)
        return {"halt": reason}

    def make(nid: str):
        def node(state: GraphState, config: RunnableConfig) -> GraphState:
            from runtime import budget

            if resume_nodes and nid in resume_nodes and nid not in resumed:
                resumed.add(nid)  # one replay only: a repair re-enters the node for real
                return {"path": [nid], "outcome": resume_nodes[nid]}
            seconds = (config.get("configurable") or {}).get("node_wall_clock_s")
            seconds = limits.budget()["node_wall_clock_s"] if seconds is None else seconds
            if nid in observe and (material := observe[nid]()) is not None:
                digest = loop_guard.state_hash(*material)
                if loop_guard.repeated(state.get("hashes") or [], digest, guard["repeat_state_count"]):
                    detail = f"same code, error and signature seen {guard['repeat_state_count']} times before {nid}"
                    return {"path": [nid], **halt_at(nid, loop_guard.REASON_STATE_REPEAT, detail)}
                hashed = {"hashes": [digest]}
            else:
                hashed = {}
            started = time.monotonic()
            budget.start_node(seconds)
            try:
                outcome = handlers[nid]()
            finally:
                budget.start_node(None)
            update = {"outcome": outcome, "path": [nid], **hashed}
            if journal:
                journal(nid, outcome)
            elapsed = time.monotonic() - started
            if "gate" in nodes[nid] and seconds and elapsed >= seconds:
                update.update(halt_at(nid, loop_guard.REASON_NODE_TIMEOUT, f"{nid} ran {elapsed:.0f}s of {seconds:.0f}s"))
            return update
        return node

    halt_target = next((t for t in ("verdict",) if t in work), END)

    def router(nid: str):
        def route(state: GraphState) -> str:
            if nodes[nid].get("end"):
                return END
            if state.get("halt"):
                return halt_target
            outcome = state.get("outcome")
            if outcome not in routes[nid]:
                raise GraphError(f"node {nid} reported {outcome!r}; the graph has no such edge")
            target = routes[nid][outcome]
            return END if nodes[target].get("end") and target not in handlers else target
        return route

    graph = StateGraph(GraphState)
    for nid in work:
        graph.add_node(nid, make(nid))
    graph.add_edge(START, entry)
    for nid in work:
        graph.add_conditional_edges(nid, router(nid))
    # An end node is where the walk stops; remember which one so callers can tell verdict from plan_stopped.
    return graph.compile(checkpointer=checkpointer), nodes, routes


def run(handlers: dict[str, Callable[[], str]], entry: str, *, graph_spec: dict | None = None,
        checkpointer=None, thread_id: str | None = None, observe: dict | None = None, report: dict | None = None,
        journal: Callable | None = None, resume_nodes: dict[str, str] | None = None) -> list[str]:
    """Walk the graph from `entry`; return the executed node path including the end node reached.
    `observe`/`report`: see compile_graph; the node time budget travels in config["configurable"].
    With `checkpointer` + `thread_id` each node's progress is saved; the thread is purged first, so a
    rerun re-enters from `entry` (resume is the caller's replay of tool steps, not a graph jump).
    `resume_nodes` (from the attempt journal) replays the recorded outcome and leaves the old thread intact:
    the journal, not the checkpoint, decides where a resumed attempt continues."""
    from langgraph.errors import GraphRecursionError

    graph_spec = graph_spec or spec()
    if resume_nodes:
        checkpointer = None  # the old thread stays intact; the journal drives the resume
    compiled, nodes, routes = compile_graph(handlers, entry, graph_spec=graph_spec, checkpointer=checkpointer,
                                           observe=observe, report=report, journal=journal, resume_nodes=resume_nodes)
    config = {"recursion_limit": int(graph_spec.get("recursion_limit", 80)),
              "configurable": {"node_wall_clock_s": limits.budget()["node_wall_clock_s"]}}
    if checkpointer is not None:
        checkpointer.purge(thread_id)
        config["configurable"].update(thread_id=thread_id, checkpoint_ns="")
    payload = {"path": []}
    try:
        final = compiled.invoke(payload, config=config)
    except GraphRecursionError as error:
        raise GraphError("the graph did not terminate within its recursion limit") from error
    path = list(final["path"])
    last = path[-1]
    ended = None if nodes[last].get("end") else routes[last].get(final.get("outcome"))
    return path + ([ended] if ended else [])
