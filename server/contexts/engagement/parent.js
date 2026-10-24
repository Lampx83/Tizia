// ============================================================
// Parent Portal — Trục B (monetization). Phụ huynh xem nhanh:
//   streak · hearts · league tier · mastery % · quest hôm nay  CỦA TỪNG CON.
// ============================================================
// Tận dụng family_links sẵn có + read-only API engagement/skills/league.
// FE: /parent/dashboard.html.
// ============================================================

import {
  listChildrenOfParent,
  getUserById,
} from '../../db.js';
import { getEngagementReadOnly } from './index.js';
import { getLeagueBoardForUser } from './league.js';
import { getUserSkillTree, getUserSkillSummary } from '../../skills.js';

async function summarizeChild(child) {
  const id = child.id;
  let engagement = null, league = null, skills = null;
  try { engagement = await getEngagementReadOnly(id); } catch {}
  try {
    const lb = await getLeagueBoardForUser(id);
    league = lb ? { tier: lb.tier, tier_meta: lb.tier_meta, week_xp: lb.week_xp, my_rank: lb.my_rank } : null;
  } catch {}
  try {
    const tree = await getUserSkillTree(id);
    const summary = await getUserSkillSummary(id);
    // Tổng mastery_pct = trung bình mastery của các competency CÓ skill đã đạt.
    const hasEarned = tree.filter(t => t.earned_skills.length > 0);
    const overallMastery = hasEarned.length > 0
      ? Math.round(hasEarned.reduce((s, t) => s + (t.mastery_pct || 0), 0) / hasEarned.length)
      : 0;
    skills = {
      earned: summary.earned, total: summary.total,
      overall_mastery_pct: overallMastery,
      top_competencies: tree
        .filter(t => t.earned_skills.length > 0)
        .sort((a,b) => (b.mastery_pct||0) - (a.mastery_pct||0))
        .slice(0, 3)
        .map(t => ({
          name: t.competency.name,
          code: t.competency.code,
          mastery_pct: t.mastery_pct || 0,
          earned: t.earned_skills.length,
          total: t.total_skills,
        })),
    };
  } catch {}
  return {
    id, username: child.username, display_name: child.display_name,
    role: child.role, enrolled_domain: child.enrolled_domain,
    engagement, league, skills,
  };
}

export function attachParentDashboard(router, requireAuth) {
  router.get('/api/parent/dashboard', requireAuth, async (req, res) => {
    // PH = parent role-capable (kiểm trong billing/canBeParent đã có; ở đây
    // tin tưởng listChildrenOfParent: nếu user không phải parent → trả []).
    const children = await listChildrenOfParent(req.user.id) || [];
    const items = [];
    for (const c of children) {
      const full = (await getUserById(c.id)) || c;
      items.push(await summarizeChild(full));
    }
    res.json({ ok: true, parent: { id: req.user.id, display_name: req.user.display_name }, children: items });
  });
}
