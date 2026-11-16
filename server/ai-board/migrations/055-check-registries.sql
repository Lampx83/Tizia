CREATE TABLE ai_check_registries (
  registry_hash TEXT PRIMARY KEY,
  version INTEGER NOT NULL,
  registry_json TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('pending','approved','revoked')),
  reported_by TEXT NOT NULL,
  decided_by INTEGER REFERENCES users(id),
  decided_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE TABLE ai_check_registry_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  registry_hash TEXT NOT NULL REFERENCES ai_check_registries(registry_hash),
  action TEXT NOT NULL CHECK(action IN ('reported','approved','revoked')),
  actor TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX idx_ai_check_registry_audit_hash ON ai_check_registry_audit(registry_hash,id);
