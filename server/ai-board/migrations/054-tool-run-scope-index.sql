CREATE INDEX IF NOT EXISTS idx_tool_run_scope_prefix ON tool_run (run_scope text_pattern_ops);
