// req #236 — xếp bậc năng lực theo nhiệm vụ cho Nhà thuốc thực hành (thuần, không đụng DB → test được).
// Xếp bậc theo nhiệm vụ từ các lượt 'mission_result'. Lượt "tự chủ" = gợi ý đã ẩn, 0 lỗi, không hỏi trợ lý AI.
//  Bậc 1 Làm được: hoàn thành ít nhất 1 lượt (có thể còn sai sót / cần hỗ trợ).
//  Bậc 2 Làm đúng: ≥ 2 lượt tự chủ (mỗi lượt một bộ thuốc mới) — ổn định qua nhiều tình huống.
//  Bậc 3 Làm thành thạo: trong các lượt tự chủ, ≥ 2 lượt ở mức Khó / Rất khó (nhiều tủ, nhiều tình huống đan xen).
export const TIER_RULE = { solo: 2, hardSolo: 2, hardTier: 3 };
export function gradeMission(results, doneCount) {
  const solo = results.filter((r) => r.hintsOff && !r.errors && !r.asks);
  const hard = solo.filter((r) => Number(r.tier) >= TIER_RULE.hardTier);
  const done = Math.max(doneCount || 0, results.length);
  const level = !done ? 0 : solo.length >= TIER_RULE.solo ? (hard.length >= TIER_RULE.hardSolo ? 3 : 2) : 1;
  return { level, done, solo: solo.length, hardSolo: hard.length };
}
