// ============================================================
// Parent Weekly Report — Trục B monetize
// ============================================================
// Tạo báo cáo tuần dạng HTML in-browser (parent click Print → Save as PDF).
// Tránh dependency wkhtmltopdf / puppeteer cho dev; production có thể nâng
// cấp sau. Mỗi parent có thể xem báo cáo tuần bất kỳ trong 12 tuần gần nhất.
// ============================================================

import { db, listChildrenOfParent, getUserById } from '../../db.js';
import { requireAuth } from '../identity/auth.js';
import { getEngagementReadOnly } from '../engagement/index.js';
import { getLeagueBoardForUser } from '../engagement/league.js';
import { getUserSkillTree, getUserSkillSummary } from '../../skills.js';

const TZ = 7 * 3600_000;
function vnNow() { return new Date(Date.now() + TZ); }
function startOfWeekMon(date = vnNow()) {
  const d = new Date(date.getTime());
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - day + 1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

async function buildReport(childId, weekStartDate) {
  const ws = startOfWeekMon(weekStartDate);
  const we = new Date(ws.getTime() + 7 * 86400_000);
  const wsMs = ws.getTime() - TZ;   // back to UTC ms for DB query
  const weMs = we.getTime() - TZ;

  const child = await getUserById(childId);
  if (!child) return null;

  // Engagement
  const eng = await getEngagementReadOnly(childId);
  // League
  let league = null;
  try {
    const lb = await getLeagueBoardForUser(childId);
    league = lb ? { tier: lb.tier_meta, week_xp: lb.week_xp, my_rank: lb.my_rank } : null;
  } catch {}
  // Skills overall
  const sk = await (async () => {
    const tree = await getUserSkillTree(childId);
    const summary = await getUserSkillSummary(childId);
    const hasEarned = tree.filter(t => t.earned_skills.length > 0);
    const overallMastery = hasEarned.length > 0
      ? Math.round(hasEarned.reduce((s, t) => s + (t.mastery_pct || 0), 0) / hasEarned.length)
      : 0;
    const newThisWeek = tree.flatMap(t => t.earned_skills)
      .filter(s => s.earned_at >= wsMs && s.earned_at < weMs)
      .map(s => s.name);
    return {
      earned: summary.earned, total: summary.total,
      overall_mastery_pct: overallMastery,
      new_this_week: newThisWeek,
      top_comp: tree.filter(t => t.earned_skills.length > 0)
        .sort((a,b) => (b.mastery_pct||0) - (a.mastery_pct||0))
        .slice(0, 5)
        .map(t => ({ name: t.competency.name, mastery: t.mastery_pct, earned: t.earned_skills.length, total: t.total_skills })),
    };
  })();
  // Quiz attempts trong tuần
  const quizRows = (await db.prepare(`
    SELECT COUNT(*) AS n, SUM(CASE WHEN correct THEN 1 ELSE 0 END) AS c
      FROM question_attempts
     WHERE user_id = ? AND attempted_at >= ? AND attempted_at < ?
  `).get(childId, wsMs, weMs)) || { n: 0, c: 0 };
  // Scenario runs
  const scenarioRows = (await db.prepare(`
    SELECT COUNT(*) AS n, AVG(best_score) AS avg
      FROM scenario_runs
     WHERE user_id = ? AND created_at >= ? AND created_at < ?
  `).get(childId, wsMs, weMs)) || { n: 0, avg: 0 };
  // Codelab
  const codeRows = (await db.prepare(`
    SELECT COUNT(*) AS n, SUM(CASE WHEN status='accepted' THEN 1 ELSE 0 END) AS accepted
      FROM codelab_submissions
     WHERE user_id = ? AND received_at >= ? AND received_at < ?
  `).get(childId, wsMs, weMs)) || { n: 0, accepted: 0 };

  // Đề xuất ngắn dựa trên data
  const tips = [];
  if (eng?.streak >= 7) tips.push(`👏 Streak ${eng.streak} ngày — em rất kiên trì! Phụ huynh có thể thưởng nhỏ.`);
  if (eng?.streak < 3) tips.push('🔥 Streak còn ngắn. Hãy nhắc em vào học mỗi tối 15 phút.');
  if (quizRows.n < 20) tips.push('📝 Tuần này em làm ít câu quiz. Khuyến khích em vào /hoc-thong-minh.html để luyện adaptive.');
  if (sk.new_this_week.length === 0) tips.push('🎯 Tuần này em chưa đạt skill mới. Cần xem lại lộ trình knowledge graph.');
  if (codeRows.accepted > 0) tips.push(`💻 Em vừa pass ${codeRows.accepted} bài lập trình — rất giỏi!`);
  if (tips.length === 0) tips.push('✨ Tuần này em học khá đều — duy trì nhịp này nhé!');

  return {
    child: { id: child.id, name: child.display_name, username: child.username, role: child.role },
    week: {
      start: ws.toISOString().slice(0, 10),
      end:   new Date(we.getTime() - 86400_000).toISOString().slice(0, 10),
    },
    engagement: eng ? { streak: eng.streak, longest: eng.longestStreak, hearts: `${eng.hearts}/${eng.heartsMax}` } : null,
    league,
    skills: sk,
    activity: {
      quiz_attempts: quizRows.n, quiz_correct: quizRows.c,
      quiz_accuracy: quizRows.n > 0 ? Math.round((quizRows.c / quizRows.n) * 100) : 0,
      scenarios: scenarioRows.n,
      scenarios_avg_score: Math.round(scenarioRows.avg || 0),
      codelab_submissions: codeRows.n,
      codelab_accepted: codeRows.accepted,
    },
    tips,
  };
}

export function attachParentReport(router) {
  // Liệt kê 12 tuần gần nhất (parent chọn xem)
  router.get('/api/parent/report/weeks', requireAuth, (_req, res) => {
    const now = vnNow();
    const ws = startOfWeekMon(now);
    const weeks = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(ws.getTime() - i * 7 * 86400_000);
      weeks.push({
        week_start: d.toISOString().slice(0, 10),
        label: i === 0 ? 'Tuần này' : i === 1 ? 'Tuần trước' : `${i} tuần trước`,
      });
    }
    res.json({ weeks });
  });

  router.get('/api/parent/report/:child_id', requireAuth, async (req, res) => {
    const childId = Number(req.params.child_id);
    const weekStart = String(req.query.week || '').slice(0, 10);
    // Verify child belongs to this parent
    const children = (await listChildrenOfParent(req.user.id)) || [];
    if (!children.find(c => c.id === childId)) {
      return res.status(403).json({ error: 'not_your_child' });
    }
    const date = weekStart
      ? new Date(weekStart + 'T00:00:00Z')
      : vnNow();
    const report = await buildReport(childId, date);
    if (!report) return res.status(404).json({ error: 'not_found' });
    res.json({ ok: true, report });
  });
}
