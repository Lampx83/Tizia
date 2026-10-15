CREATE TABLE ai_tool_manifests (
  manifest_hash TEXT PRIMARY KEY,
  version INTEGER NOT NULL,
  manifest_json TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('pending','approved','revoked')),
  reported_by TEXT NOT NULL,
  decided_by INTEGER REFERENCES users(id),
  decided_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE TABLE ai_tool_manifest_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  manifest_hash TEXT NOT NULL REFERENCES ai_tool_manifests(manifest_hash),
  action TEXT NOT NULL CHECK(action IN ('reported','approved','revoked')),
  actor TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_ai_tool_manifest_audit_hash ON ai_tool_manifest_audit(manifest_hash,id);
