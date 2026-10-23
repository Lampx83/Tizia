"""Execution graph: one LangGraph built from server/ai-board/contract.json, so the engine, the server and the admin diagram share one spec."""
from __future__ import annotations

import json
import operator
import os
from pathlib import Path
from typing import Annotated, Callable, TypedDict

PATH = Path(__file__).resolve().parents[3] / "server" / "ai-board" / "contract.json"


def spec() -> dict:
    return json.loads(PATH.read_text(encoding="utf-8"))["execution_graph"]


def persistence_enabled() -> bool:
    return os.environ.get("AI_BOARD_GRAPH_PERSISTENCE") == "1"


class GraphState(TypedDict, total=False):
    outcome: str
    path: Annotated[list, operator.add]


class GraphError(RuntimeError):
    """The spec and the handlers disagree, or a node reported an outcome the spec has no edge for."""


def compile_graph(handlers: dict[str, Callable[[], str]], entry: str, *, graph_spec: dict | None = None, checkpointer=None):
    """Every reachable node but a bare end node needs a handler; every outcome a handler returns needs an edge."""
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

    def make(nid: str):
        def node(_state: GraphState) -> GraphState:
            return {"outcome": handlers[nid](), "path": [nid]}
        return node

    def router(nid: str):
        def route(state: GraphState) -> str:
            if nodes[nid].get("end"):
                return END
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
        checkpointer=None, thread_id: str | None = None) -> list[str]:
    """Walk the graph from `entry`; return the executed node path including the end node reached.
    With `checkpointer` + `thread_id` a saved checkpoint of that thread resumes after its last finished node."""
    from langgraph.errors import GraphRecursionError

    graph_spec = graph_spec or spec()
    compiled, nodes, routes = compile_graph(handlers, entry, graph_spec=graph_spec, checkpointer=checkpointer)
    config = {"recursion_limit": int(graph_spec.get("recursion_limit", 80))}
    payload = {"path": []}
    if checkpointer is not None:
        config["configurable"] = {"thread_id": thread_id, "checkpoint_ns": ""}
        if checkpointer.get_tuple({"configurable": config["configurable"]}) is not None:
            payload = None
    try:
        final = compiled.invoke(payload, config=config)
    except GraphRecursionError as error:
        raise GraphError("the graph did not terminate within its recursion limit") from error
    path = list(final["path"])
    last = path[-1]
    ended = None if nodes[last].get("end") else routes[last].get(final.get("outcome"))
    return path + ([ended] if ended else [])
