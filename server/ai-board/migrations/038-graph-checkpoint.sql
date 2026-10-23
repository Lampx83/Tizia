CREATE TABLE IF NOT EXISTS graph_checkpoint (
  thread_id TEXT NOT NULL,
  checkpoint_ns TEXT NOT NULL,
  checkpoint_id TEXT NOT NULL,
  parent_id TEXT,
  type TEXT NOT NULL,
  checkpoint TEXT NOT NULL,
  metadata TEXT NOT NULL,
  plan_hash TEXT NOT NULL,
  updated_at BIGINT NOT NULL,
  PRIMARY KEY (thread_id, checkpoint_ns, checkpoint_id)
);
CREATE TABLE IF NOT EXISTS graph_write (
  thread_id TEXT NOT NULL,
  checkpoint_ns TEXT NOT NULL,
  checkpoint_id TEXT NOT NULL,
  task_id TEXT NOT NULL,
  idx INTEGER NOT NULL,
  channel TEXT NOT NULL,
  type TEXT,
  value TEXT NOT NULL,
  PRIMARY KEY (thread_id, checkpoint_ns, checkpoint_id, task_id, idx)
);
