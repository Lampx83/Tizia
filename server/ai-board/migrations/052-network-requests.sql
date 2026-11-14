CREATE TABLE ai_network_requests (
  id BIGSERIAL PRIMARY KEY,
  root_ticket_id BIGINT NOT NULL,
  request_id BIGINT NOT NULL,
  call_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  decided_by BIGINT,
  decision_reason TEXT,
  created_at BIGINT NOT NULL,
  decided_at BIGINT,
  UNIQUE (root_ticket_id, call_id)
);
CREATE INDEX idx_ai_network_requests_pending ON ai_network_requests(request_id, status, id);
