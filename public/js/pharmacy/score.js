import { MODULE_WEIGHTS, BONUS_RULES, STAGE_ORDER } from "./rubric.js";
import { SCENARIOS } from "./scenarios.js";
import { detectFatalErrors } from "./fatal.js";

function scoreStage(text, keywords, required, partial) {
  const matched = [];
  const missing = [];
  for (const k of keywords) {
    if (text.includes(k.toLowerCase())) matched.push(k);
    else missing.push(k);
  }
  let score = 0;
  if (matched.length >= required) score = 2;
  else if (matched.length >= partial) score = 1;
  return { score, matched, missing };
}

export function computeScore(state) {
  const moduleId = state.moduleId;
  const spec = SCENARIOS[moduleId];
  const weights = MODULE_WEIGHTS[moduleId];
  const transcript = state.messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase())
    .join("\n");

  const stages = STAGE_ORDER.map((stage) => {
    const rule = spec.stageRules.find((r) => r.stage === stage);
    const { score, matched, missing } = scoreStage(
      transcript, rule.keywords, rule.required, rule.partial
    );
    let finalScore = score;
    if (stage === "G") {
      const doneActions = new Set(state.actions.map((a) => a.type));
      const requiredDone = spec.requiredActions.filter((a) => doneActions.has(a));
      const ratio = requiredDone.length / Math.max(1, spec.requiredActions.length);
      if (ratio < 0.5) finalScore = 0;
      else if (ratio < 1 && finalScore === 2) finalScore = 1;
    }
    return {
      stage,
      score: finalScore,
      matchedKeywords: matched,
      missingKeywords: missing,
      comment: rule.hint
    };
  });

  const weightForStage = (s) =>
    s === "S" ? weights.S : s === "E1" ? weights.E1 : s === "G" ? weights.G : s === "U" ? weights.U : weights.E2;
  const weighted = stages.reduce((sum, st) => sum + (st.score / 2) * weightForStage(st.stage), 0);

  const bonusRule = BONUS_RULES[moduleId];
  const bonusHits = spec.bonusKeywords.filter((k) => transcript.includes(k));
  const bonus = Math.min(bonusRule.max, bonusHits.length * 2);

  const fatalErrors = detectFatalErrors(state);
  const autoFail = fatalErrors.length > 0;
  const total = autoFail ? 0 : Math.round(weighted + bonus);
  const feedback = buildFeedback(stages, fatalErrors, bonusHits, moduleId);

  return {
    moduleId, stages, weights,
    weighted: Math.round(weighted),
    bonus, total, autoFail, fatalErrors, feedback
  };
}

function buildFeedback(stages, fatal, bonusHits, moduleId) {
  const lines = [];
  if (fatal.length) {
    lines.push("LỖI ĐIỂM LIỆT (Auto-Fail):");
    fatal.forEach((f) => lines.push(`- ${f.label}: ${f.evidence}`));
  }
  lines.push("Nhận xét theo SEGUE:");
  for (const st of stages) {
    const label = st.stage === "E1" ? "E (Elicit)" : st.stage === "E2" ? "E (End)" : st.stage;
    if (st.score === 2) lines.push(`- ${label}: tốt, đủ từ khóa cốt lõi.`);
    else if (st.score === 1) lines.push(`- ${label}: sơ sài. Thiếu: ${st.missingKeywords.slice(0, 5).join(", ")}.`);
    else lines.push(`- ${label}: chưa đạt. Cần: ${st.comment}`);
  }
  if (bonusHits.length) lines.push(`Bonus (${moduleId}): ${bonusHits.join(", ")}`);
  return lines.join("\n");
}
