// ============================================================
// Feature Gate — Progressive Disclosure (Duolingo-style)
// ============================================================
// Mọi feature mới mặc định KHOÁ. Mở dần theo journey của user:
//   - Tier 0 (mới): Home + AI Tutor + Trường (chỉ Mầm non + Tiểu học)
//   - Tier 1 (đã làm 1 quiz): Streak HUD + Daily Quest
//   - Tier 2 (streak ≥3 ngày): League tuần + Pet đồng hành
//   - Tier 3 (≥30 quiz đúng): Skills page + Combat + Shop
//   - Tier 4 (≥10 skill mastered): Knowledge Graph + Adaptive + SRS
//   - Tier 5 (≥30 ngày active): Battle Pass + UGC Marketplace play
//   - Tier 6 (Pro plan): UGC create + Live Quiz join
//
// Role override:
//   - teacher/admin: thấy thêm Team Quest, Live Quiz host, AI Quiz Gen
//   - admin: thêm School Wizard, Experiments, Event Registry
//
// Mặc định mở:
//   - parent (role): Parent Dashboard + Report
// ============================================================

import { db, getUserWallet } from '../../db.js';
import { requireAuth } from '../identity/auth.js';

// ── Feature catalog với rule ────────────────────────────────
// `domains`: array — chỉ hiện feature ở các trường này. null = mọi trường.
// `scope`: 'school' | 'global' — 'school' xuất hiện trong khám-phá của trường,
//          'global' nằm ở HUD/widget toàn cục.
const FEATURES = {
  // ───── Tier 0: Mặc định mở cho mọi user ─────
  'home':          { tier: 0, name: 'Trang chủ', url: '/', scope: 'global' },
  'ai-tutor':      { tier: 0, name: 'AI Tutor 🦉', desc: 'Hỏi bài thầy AI bất cứ lúc nào', scope: 'school' },
  'school-mam':    { tier: 0, name: 'Trường Mầm non', scope: 'global' },
  'school-tieuhoc':{ tier: 0, name: 'Trường Tiểu học', scope: 'global' },

  // ───── Tier 1: Vào học lần đầu ─────
  // Streak + thưởng đăng nhập: CHỈ trường phổ thông (mầm non + tiểu học + THCS +
  // THPT). Trường ĐH/nghề khác → ẩn (lọc theo enrolled_domain ở /api/features/me).
  'hud-streak':    { tier: 1, name: 'Streak hằng ngày 🔥', scope: 'global',
                     domains: ['preschool', 'primary', 'secondary', 'highschool'],
                     unlock_text: 'Làm 1 câu quiz để mở' },
  'daily-quest':   { tier: 1, name: 'Nhiệm vụ hôm nay 📋', scope: 'school',
                     unlock_text: 'Làm 1 câu quiz để mở' },
  'daily-bonus':   { tier: 1, name: 'Thưởng đăng nhập 🎁', scope: 'global',
                     domains: ['preschool', 'primary', 'secondary', 'highschool'],
                     unlock_text: 'Mở khi giữ streak 2 ngày' },

  // ───── Tier 2: Bắt đầu kiên trì ─────
  'pet':           { tier: 2, name: 'Pet đồng hành 🐲', url: '/index.html', scope: 'global',
                     unlock_text: 'Mở khi giữ streak 3 ngày' },
  'league':        { tier: 2, name: 'League tuần 🏆', url: '/league.html', scope: 'global',
                     unlock_text: 'Mở khi streak ≥ 3 ngày' },
  'school-thcs':   { tier: 2, name: 'Trường THCS', scope: 'global' },
  'school-thpt':   { tier: 2, name: 'Trường THPT', scope: 'global' },

  // ───── Tier 3: HS chăm chỉ ─────
  'skills':        { tier: 3, name: 'Cây năng lực 🎯', url: '/nang-luc.html', scope: 'school',
                     unlock_text: 'Mở khi đã đúng 30 câu quiz' },
  'combat':        { tier: 3, name: 'Trận đấu kiến thức ⚔', url: '/tran-dau.html', scope: 'school',
                     unlock_text: 'Mở khi đã đúng 30 câu quiz' },
  'shop':          { tier: 3, name: 'Cửa hàng skin 🛒', url: '/cua-hang.html', scope: 'global',
                     unlock_text: 'Mở khi đã đúng 30 câu quiz' },

  // ───── Tier 4: Học sâu ─────
  'adaptive':      { tier: 4, name: 'Học thông minh 🧠', url: '/hoc-thong-minh.html', scope: 'school',
                     unlock_text: 'Mở khi đạt 10 kỹ năng' },
  'srs':           { tier: 4, name: 'Flashcards SRS 🃏', url: '/srs.html', scope: 'school',
                     unlock_text: 'Mở khi đạt 10 kỹ năng' },
  'campus-mp':     { tier: 4, name: 'Campus đa người chơi 🌍', url: '/campus-mp.html', scope: 'global',
                     unlock_text: 'Mở khi đạt 10 kỹ năng' },

  // ───── Tier 5: Học dài hạn ─────
  'battle-pass':   { tier: 5, name: 'Battle Pass 🎖', url: '/battle-pass.html', scope: 'global',
                     unlock_text: 'Mở khi học 30 ngày' },
  'ugc-play':      { tier: 5, name: 'Quest Marketplace 🎨', url: '/ugc/index.html', scope: 'school',
                     unlock_text: 'Mở khi học 30 ngày' },
  'code-game':     { tier: 5, name: 'Lập trình game 💻', url: '/lap-trinh-game.html', scope: 'school',
                     // chỉ school CNTT + tiểu học/THCS/THPT
                     domains: ['it', 'primary', 'secondary', 'highschool'],
                     unlock_text: 'Mở khi học 30 ngày' },

  // ───── Tier 6: Creator (cần Pro hoặc role teacher) ─────
  'ugc-create':    { tier: 6, name: 'Tạo quest 🎨+', url: '/ugc/create.html', scope: 'school',
                     unlock_text: 'Cần gói Pro hoặc role GV' },
  'ai-quiz-gen':   { tier: 6, name: 'AI Quiz Generator 🤖', url: '/ai-quiz-gen.html', scope: 'school',
                     unlock_text: 'Cần role GV/Admin' },
  'live-quiz':     { tier: 6, name: 'Live Quiz host 🎤', url: '/live-quiz/host.html', scope: 'school',
                     unlock_text: 'Cần role GV/Admin' },

  // ───── Role-based: Parent ─────
  'parent-dash':   { tier: 0, name: 'Bảng theo dõi con 👨‍👩‍👧', url: '/parent/dashboard.html', scope: 'global',
                     roles: ['student', 'teacher', 'admin'],
                     desc: 'Phụ huynh xem tiến độ con (cần link con)' },
  'parent-report': { tier: 0, name: 'Báo cáo PDF tuần 📄', url: '/parent/report.html', scope: 'global',
                     roles: ['student', 'teacher', 'admin'] },

  // ───── Role-based: Teacher ─────
  'team-quest':    { tier: 0, name: 'Team Quest GV 👨‍🏫', url: '/gv/team-quest.html', scope: 'school',
                     roles: ['teacher', 'admin'] },

  // ───── Role-based: Admin ─────
  'admin-panel':   { tier: 0, name: 'Quản trị Tizia ⚙', url: '/admin.html', scope: 'global',
                     roles: ['admin'] },
};

// ── User progress checker ────────────────────────────────
async function getUserProgress(userId) {
  const wallet = (await getUserWallet(userId)) || {};
  const streak = wallet.streak || 0;
  const longestStreak = wallet.longestStreak || 0;
  // Streak engagement riêng (cross-domain)
  let engStreak = 0;
  try {
    const er = await db.prepare(`SELECT streak FROM engagement_state WHERE user_id = ?`).get(userId);
    engStreak = er?.streak || 0;
  } catch {}
  // Quiz đúng tổng (lifetime)
  const quizCorrect = (await db.prepare(
    `SELECT COUNT(*) AS n FROM question_attempts WHERE user_id = ? AND correct = 1`
  ).get(userId))?.n || 0;
  // Skills earned
  const skillsEarned = (await db.prepare(
    `SELECT COUNT(*) AS n FROM user_skills WHERE user_id = ?`
  ).get(userId))?.n || 0;
  // Số ngày active (distinct days từ user_activity hoặc engagement)
  const activeDays = (await db.prepare(`
    SELECT COUNT(DISTINCT NULLIF(last_active_date, '')::date) AS n FROM engagement_state WHERE user_id = ?
  `).get(userId))?.n || 0;

  // User createdAt → days since signup
  const u = await db.prepare(`SELECT created_at FROM users WHERE id = ?`).get(userId);
  const daysSinceSignup = u ? Math.floor((Date.now() - u.created_at) / 86400_000) : 0;

  return {
    streak: Math.max(streak, engStreak),
    longest_streak: longestStreak,
    quiz_correct: quizCorrect,
    skills_earned: skillsEarned,
    active_days: Math.max(activeDays, daysSinceSignup),
  };
}

// ── Compute tier of user based on progress ────────────────
function computeUserTier(progress, role) {
  // Admin/teacher always full access
  if (role === 'admin') return 6;
  if (role === 'teacher') return 5;

  let tier = 0;
  if (progress.quiz_correct >= 1)                          tier = 1;
  if (progress.streak >= 3 || progress.longest_streak >= 3) tier = Math.max(tier, 2);
  if (progress.quiz_correct >= 30)                          tier = Math.max(tier, 3);
  if (progress.skills_earned >= 10)                         tier = Math.max(tier, 4);
  if (progress.active_days >= 30)                           tier = Math.max(tier, 5);
  return tier;
}

function isFeatureUnlocked(featureKey, user, progress, userTier) {
  const f = FEATURES[featureKey];
  if (!f) return false;
  // Role gate
  if (f.roles && Array.isArray(f.roles)) {
    if (!f.roles.includes(user.role)) return false;
  }
  // Tier gate
  return userTier >= (f.tier || 0);
}

function isFeatureRelevantToDomain(f, domain) {
  if (!domain) return true;             // không lọc
  if (!f.domains) return true;          // mặc định mọi trường
  return f.domains.includes(domain);
}

export function attachFeatureGate(router) {
  router.get('/api/features/me', requireAuth, async (req, res) => {
    const progress = await getUserProgress(req.user.id);
    const userTier = computeUserTier(progress, req.user.role);
    // Query filter:
    //   ?domain=primary  → chỉ feature relevant cho trường này
    //   ?scope=school    → chỉ scope:'school' (đặt trong khám phá trường)
    //   ?scope=global    → chỉ scope:'global'
    const domain = String(req.query.domain || '');
    const scope = String(req.query.scope || '');   // '', 'school', 'global'
    const out = {};
    for (const [key, def] of Object.entries(FEATURES)) {
      if (scope && def.scope && def.scope !== scope) continue;
      if (domain && !isFeatureRelevantToDomain(def, domain)) continue;
      // Lọc theo TRƯỜNG ĐÃ CHỌN của user: feature gắn `domains` (vd streak chỉ
      // dành cho phổ thông) sẽ ẩn nếu user đang học trường ngoài danh sách đó.
      if (!isFeatureRelevantToDomain(def, req.user.enrolled_domain)) continue;
      const unlocked = isFeatureUnlocked(key, req.user, progress, userTier);
      out[key] = {
        unlocked,
        name: def.name,
        url: def.url || null,
        tier: def.tier || 0,
        scope: def.scope || 'global',
        unlock_text: unlocked ? null : (def.unlock_text || ''),
        desc: def.desc || null,
      };
    }
    // Next unlock — what to push user toward
    const nextLocked = Object.values(out).filter(f => !f.unlocked).sort((a, b) => a.tier - b.tier)[0];
    res.json({
      ok: true,
      user_tier: userTier,
      role: req.user.role,
      domain: domain || null,
      progress,
      features: out,
      next_unlock: nextLocked ? { name: nextLocked.name, hint: nextLocked.unlock_text } : null,
    });
  });

  // Public catalog (không cần auth) — FE check trước login
  router.get('/api/features/catalog', (_req, res) => {
    const list = Object.entries(FEATURES).map(([key, def]) => ({
      key, name: def.name, tier: def.tier || 0, url: def.url || null,
      roles: def.roles || null,
    }));
    res.json({ items: list });
  });
}

export { FEATURES };
