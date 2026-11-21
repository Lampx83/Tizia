DECISION LEDGER. Each STEP above has a number. Put "decisions" next to "subtasks" in the plan object of finish.
Log every choice that shapes the plan, one entry each: {"decision": "choose_file" | "new_file" | "placement" | "wiring" | "skip_alternative", "target": "<path or place>", "evidence": [...], "rejected": [...]}
- evidence, 1-3 items, only what a STEP above read or ran: {"step_id": <n>, "file": "<path that STEP read>", "lines": "<a>-<b> inside the Lnn range it showed"} or {"step_id": <n>, "tool_output_excerpt": "<text copied verbatim from that STEP's result>"}.
- rejected, 0-2 items: {"target": "<option you did not take>", "reason": "<why>"}.
Your own knowledge is not evidence. A STEP number that does not exist, a file that STEP did not read, lines outside what it showed, or an excerpt not in its result rejects finish.
