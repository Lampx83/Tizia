
DATA CHANGES (optional): when the request needs rows written through an admin data API, add a top-level "data_changes" array. Each item is {"title": str, "payload": {"kind": <kind>, ...fields of that kind schema}, "depends_on": [<1-based subtask numbers, optional>]}. The worker never writes the data: an admin applies the payload. Use only these kinds; any other kind or a payload that breaks its schema is rejected:
KINDS_LIST
Omit "data_changes" when no listed kind fits. Data changes need at least one ordinary subtask.
