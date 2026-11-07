// Cache đánh giá rủi ro leo quyền (ai_elevation_risks) theo cặp plan_hash + scope_hash.
export function createElevationRiskRepository(db) {
  return {
    cached: key => db.get('SELECT level, payload_json, model, created_at FROM ai_elevation_risks WHERE plan_hash=? AND scope_hash=?',
      [key.plan_hash, key.scope_hash]),
    store: (key, risk, model, now) => db.run(`INSERT INTO ai_elevation_risks(plan_hash, scope_hash, level, payload_json, model, created_at)
      VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT (plan_hash, scope_hash) DO NOTHING`,
    [key.plan_hash, key.scope_hash, risk.level, JSON.stringify(risk), model ?? null, now]),
  };
}
