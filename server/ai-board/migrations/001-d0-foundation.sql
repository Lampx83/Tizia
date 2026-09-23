ALTER TABLE requests ADD COLUMN owner_user_id INTEGER REFERENCES users(id);
ALTER TABLE requests ADD COLUMN owner_domain TEXT;
ALTER TABLE requests ADD COLUMN idempotency_key TEXT;
ALTER TABLE requests ADD COLUMN owner_state TEXT NOT NULL DEFAULT 'legacy_uncertain';

CREATE UNIQUE INDEX ux_requests_owner_idempotency
  ON requests(owner_user_id, idempotency_key)
  WHERE owner_user_id IS NOT NULL AND idempotency_key IS NOT NULL;
CREATE INDEX idx_requests_owner ON requests(owner_user_id, created_at DESC);

CREATE TABLE ai_tickets (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id           INTEGER REFERENCES ai_tickets(id),
  source_request_id   INTEGER NOT NULL REFERENCES requests(id),
  sequence            INTEGER NOT NULL DEFAULT 0,
  kind                TEXT NOT NULL CHECK(kind IN ('root', 'implementation', 'review_fix', 'security')),
  title               TEXT NOT NULL,
  description         TEXT,
  status              TEXT NOT NULL,
  phase               TEXT NOT NULL,
  priority            INTEGER NOT NULL DEFAULT 0,
  public_note         TEXT,
  internal_reason     TEXT,
  tier                TEXT,
  lease_owner         TEXT,
  lease_token         TEXT,
  lease_expires_at    INTEGER,
  plan_hash           TEXT,
  plan_revision       INTEGER NOT NULL DEFAULT 0,
  auto_rounds         INTEGER NOT NULL DEFAULT 0,
  cumulative_budget   INTEGER NOT NULL DEFAULT 0,
  created_at          INTEGER NOT NULL,
  updated_at          INTEGER NOT NULL
);
CREATE UNIQUE INDEX ux_ai_tickets_one_root
  ON ai_tickets(source_request_id) WHERE parent_id IS NULL;
CREATE UNIQUE INDEX ux_ai_tickets_child_sequence
  ON ai_tickets(parent_id, plan_revision, sequence) WHERE parent_id IS NOT NULL;
CREATE INDEX idx_ai_tickets_queue
  ON ai_tickets(kind, status, priority DESC, created_at);

CREATE TABLE ai_ticket_tags (
  ticket_id INTEGER NOT NULL REFERENCES ai_tickets(id) ON DELETE CASCADE,
  tag       TEXT NOT NULL,
  PRIMARY KEY(ticket_id, tag)
);

CREATE TABLE ai_runs (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id          INTEGER NOT NULL REFERENCES ai_tickets(id),
  attempt            INTEGER NOT NULL,
  trigger            TEXT NOT NULL,
  outcome            TEXT,
  gate               REAL,
  cumulative_budget  INTEGER NOT NULL DEFAULT 0,
  worker_id          TEXT,
  idempotency_key    TEXT NOT NULL,
  evidence_json      TEXT,
  failure_reason     TEXT,
  created_at         INTEGER NOT NULL,
  updated_at         INTEGER NOT NULL,
  UNIQUE(ticket_id, idempotency_key)
);

CREATE TABLE ai_events (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id          INTEGER NOT NULL REFERENCES ai_tickets(id),
  run_id             INTEGER REFERENCES ai_runs(id),
  event_type         TEXT NOT NULL,
  actor_type         TEXT NOT NULL,
  actor_id           TEXT,
  transition         TEXT,
  public_message     TEXT,
  internal_detail    TEXT,
  idempotency_key    TEXT NOT NULL,
  created_at         INTEGER NOT NULL,
  UNIQUE(ticket_id, idempotency_key)
);

CREATE TABLE ai_release_receipts (
  ticket_id        INTEGER NOT NULL REFERENCES ai_tickets(id),
  idempotency_key  TEXT NOT NULL,
  worker_id        TEXT NOT NULL,
  status           TEXT NOT NULL,
  phase            TEXT NOT NULL,
  created_at       INTEGER NOT NULL,
  PRIMARY KEY(ticket_id, idempotency_key)
);

CREATE TABLE ai_gate_traces (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id          INTEGER NOT NULL REFERENCES ai_runs(id),
  gate            REAL NOT NULL,
  status          TEXT NOT NULL,
  public_reason   TEXT,
  internal_reason TEXT,
  evidence_json   TEXT,
  created_at      INTEGER NOT NULL
);

CREATE TABLE ai_alerts (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id       INTEGER REFERENCES ai_tickets(id),
  severity        TEXT NOT NULL,
  category        TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'open',
  public_message  TEXT,
  internal_detail TEXT,
  created_at      INTEGER NOT NULL,
  updated_at      INTEGER NOT NULL
);

CREATE TABLE ai_alert_receipts (
  alert_id        INTEGER NOT NULL REFERENCES ai_alerts(id) ON DELETE CASCADE,
  admin_user_id   INTEGER NOT NULL REFERENCES users(id),
  read_at         INTEGER,
  acknowledged_at INTEGER,
  PRIMARY KEY(alert_id, admin_user_id)
);

CREATE TABLE ai_workers (
  worker_id          TEXT PRIMARY KEY,
  version            TEXT NOT NULL,
  mode               TEXT NOT NULL,
  status             TEXT NOT NULL,
  current_ticket_id  INTEGER REFERENCES ai_tickets(id),
  last_seen_at       INTEGER NOT NULL,
  updated_at         INTEGER NOT NULL
);

CREATE TABLE ai_plans (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  root_ticket_id    INTEGER NOT NULL REFERENCES ai_tickets(id),
  revision          INTEGER NOT NULL,
  plan_hash         TEXT NOT NULL,
  capability_policy_hash TEXT NOT NULL,
  plan_json         TEXT NOT NULL,
  status            TEXT NOT NULL,
  tier              TEXT NOT NULL,
  public_reason     TEXT,
  internal_reason   TEXT,
  created_at        INTEGER NOT NULL,
  invalidated_at    INTEGER,
  UNIQUE(root_ticket_id, revision)
);
CREATE INDEX idx_ai_plans_root_hash ON ai_plans(root_ticket_id, plan_hash);

CREATE TABLE ai_authorizations (
  root_ticket_id  INTEGER NOT NULL REFERENCES ai_tickets(id),
  plan_hash       TEXT NOT NULL,
  plan_revision   INTEGER NOT NULL,
  admin_user_id   INTEGER NOT NULL REFERENCES users(id),
  created_at      INTEGER NOT NULL,
  PRIMARY KEY(root_ticket_id, plan_revision)
);
