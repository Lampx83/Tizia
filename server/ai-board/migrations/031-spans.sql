CREATE TABLE ai_spans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id INTEGER NOT NULL REFERENCES ai_runs(id),
  trace_id TEXT NOT NULL,
  span_id TEXT NOT NULL,
  parent_span_id TEXT,
  name TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('internal', 'client')),
  start_ms INTEGER NOT NULL,
  end_ms INTEGER,
  status TEXT NOT NULL CHECK(status IN ('unset', 'ok', 'error')),
  attributes_json TEXT NOT NULL,
  events_json TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  UNIQUE(trace_id, span_id)
);
CREATE INDEX idx_ai_spans_run ON ai_spans(run_id, start_ms);
