// ============================================================
// Billing context — gói cước + subscription + entitlement (#5 mô hình lợi nhuận)
// ============================================================
// B2C: mỗi USER đăng ký 1 gói. Gói quyết định entitlement (quyền dùng tính năng).
// Thanh toán đi qua payment context (VNPay); khi invoice settled, kích hoạt
// subscription. Ở đây tách bạch:
//   plans (định nghĩa) · subscriptions (user ↔ plan) · entitlement (suy ra từ plan).
//
// requireFeature(feature) gate tính năng premium theo user → đây là nơi "khoá
// giá trị" để bán. activateSubscription() được payment gọi khi thu tiền thành công.
// ============================================================

import { db,
         linkChildToParent, unlinkChildFromParent, listChildrenOfParent,
         getUserByUsername, getUserById, setUserPlan } from '../../db.js';
import { USER_PLANS as USER_PLANS_B2C } from './user-plans.js';

// Schema (subscriptions) do server/schema.sql sở hữu sau khi migrate sang Postgres.

// ── Catalog gói (code-defined; Phase sau có thể đưa vào DB cho admin sửa) ──
// price_vnd theo tháng. features = tập entitlement. limits = hạn mức.
export const PLANS = {
  free: {
    id: 'free', name: 'Miễn phí', price_vnd: 0,
    features: ['core_learning', 'leaderboard', 'ai_tutor_basic'],
    limits: { ai_calls_day: 50, classes: 3, custom_branding: false },
  },
  pro: {
    id: 'pro', name: 'Pro (giáo viên)', price_vnd: 99000,
    features: ['core_learning', 'leaderboard', 'ai_tutor_basic', 'ai_tutor_unlimited', 'analytics_dashboard', 'lesson_builder_pro', 'export_data'],
    limits: { ai_calls_day: 1000, classes: 50, custom_branding: false },
  },
  school: {
    id: 'school', name: 'Trường học', price_vnd: 1990000,
    features: ['core_learning', 'leaderboard', 'ai_tutor_basic', 'ai_tutor_unlimited', 'analytics_dashboard', 'lesson_builder_pro', 'export_data', 'sso', 'custom_branding', 'priority_support', 'ai_agent_admin'],
    limits: { ai_calls_day: 20000, classes: 0, custom_branding: true },
  },
};
const VALID_PLANS = new Set(Object.keys(PLANS));

const getSubStmt = db.prepare(`SELECT * FROM subscriptions WHERE user_id = ?`);
const upsertSubStmt = db.prepare(`
  INSERT INTO subscriptions (user_id, plan, status, seats, current_period_end, order_ref, created_at, updated_at)
  VALUES (@user_id, @plan, @status, @seats, @current_period_end, @order_ref, @t, @t)
  ON CONFLICT(user_id) DO UPDATE SET
    plan = @plan, status = @status, seats = @seats,
    current_period_end = @current_period_end, order_ref = @order_ref, updated_at = @t
`);

/** Subscription hiện tại của user (mặc định free nếu chưa có row). */
export async function getSubscription(user_id) {
  const row = await getSubStmt.get(Number(user_id));
  if (row) {
    // Hết hạn → coi như free (downgrade mềm, không xoá lịch sử).
    if (row.current_period_end && row.current_period_end < Date.now() && row.plan !== 'free') {
      return { ...row, plan: 'free', status: 'past_due', _expired_plan: row.plan };
    }
    return row;
  }
  return { user_id: Number(user_id) || null, plan: 'free', status: 'active', current_period_end: null };
}

/** Entitlement suy ra từ plan hiện tại. */
export async function getEntitlements(user_id) {
  const sub = await getSubscription(user_id);
  const plan = PLANS[sub.plan] || PLANS.free;
  return { plan: plan.id, plan_name: plan.name, status: sub.status, features: plan.features, limits: plan.limits, current_period_end: sub.current_period_end ?? null };
}

export async function hasFeature(user_id, feature) {
  return (await getEntitlements(user_id)).features.includes(feature);
}

/** Kích hoạt/đổi gói cho user. periodDays=null → vĩnh viễn (free). */
export async function activateSubscription({ user_id, plan, status = 'active', periodDays = 30, order_ref = null }) {
  if (!VALID_PLANS.has(plan)) throw new Error(`plan không hợp lệ: ${plan}`);
  const now = Date.now();
  const current_period_end = (plan === 'free' || periodDays == null) ? null : now + periodDays * 24 * 3600 * 1000;
  await upsertSubStmt.run({ user_id: Number(user_id), plan, status, seats: 0, current_period_end, order_ref, t: now });
  return getSubscription(user_id);
}

// ── Middleware gate tính năng premium theo user ──
export function requireFeature(feature) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    if (await hasFeature(req.user.id, feature)) return next();
    const ent = await getEntitlements(req.user.id);
    return res.status(402).json({  // 402 Payment Required
      error: 'feature_locked', feature, current_plan: ent.plan,
      message: `Tính năng "${feature}" cần nâng cấp gói. Gói hiện tại: ${ent.plan_name}.`,
      upgrade: Object.values(PLANS).filter((p) => p.features.includes(feature)).map((p) => p.id),
    });
  };
}

// ── Routes ──
export function attachBilling(r) {
  r.get('/api/billing/plans', (_req, res) => res.json({ plans: Object.values(PLANS) }));

  r.get('/api/billing/me', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    res.json({ user_id: req.user.id, ...(await getEntitlements(req.user.id)) });
  });

  // Đăng ký/đổi gói. Gói trả phí → tạo subscription 'pending' + trả amount để
  // client gọi payment create-order; khi IPN settled, payment gọi activateSubscription.
  // (Bản demo: cho phép kích hoạt trial ngay nếu PLAN free hoặc BILLING_DEMO_ACTIVATE=1.)
  r.post('/api/billing/subscribe', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    const plan = String(req.body?.plan || '').trim();
    if (!VALID_PLANS.has(plan)) return res.status(400).json({ error: 'invalid_plan' });
    const planDef = PLANS[plan];
    if (planDef.price_vnd === 0) {
      const sub = await activateSubscription({ user_id: req.user.id, plan, periodDays: null });
      return res.json({ ok: true, activated: true, subscription: sub });
    }
    if (process.env.BILLING_DEMO_ACTIVATE === '1') {
      const sub = await activateSubscription({ user_id: req.user.id, plan, periodDays: 30 });
      return res.json({ ok: true, activated: true, demo: true, subscription: sub });
    }
    // Trả phí: tạo bản ghi pending, hướng client sang thanh toán.
    await activateSubscription({ user_id: req.user.id, plan, status: 'pending', periodDays: 30 });
    res.json({
      ok: true, activated: false, plan, amount_vnd: planDef.price_vnd,
      next: 'POST /api/payment/create-order với amount tương ứng; kích hoạt khi IPN thành công.',
    });
  });

  // ── Trục 4: family plan ──
  // Mặc định cho phép cả role student/teacher làm "phụ huynh" cho con HS (vì có
  // SV làm anh chị, GV làm chủ nhiệm trả gói). Pupil KHÔNG làm parent (tránh
  // trẻ tự link chéo nhau).
  function canBeParent(user) {
    return user && (user.role === 'student' || user.role === 'teacher');
  }

  // POST /api/family/link { childUsername }
  r.post('/api/family/link', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    if (!canBeParent(req.user)) {
      return res.status(403).json({ error: 'role_not_parent', message: 'Tài khoản HS không thể làm phụ huynh. Hãy đổi vai trò sang Sinh viên hoặc Giảng viên.' });
    }
    const uname = String(req.body?.childUsername || '').trim();
    if (!uname) return res.status(400).json({ error: 'missing_child' });
    const child = await getUserByUsername(uname);
    if (!child) return res.status(404).json({ error: 'child_not_found', message: 'Không tìm thấy tài khoản này.' });
    if (child.id === req.user.id) return res.status(400).json({ error: 'self_link', message: 'Không thể link chính bạn.' });
    if (child.role !== 'pupil') {
      return res.status(400).json({ error: 'child_not_pupil', message: 'Chỉ link được tài khoản Học sinh.' });
    }
    const out = await linkChildToParent({ parent_user_id: req.user.id, child_user_id: child.id });
    if (!out.linked) return res.status(409).json({ error: 'already_linked' });
    res.json({ ok: true, child: { id: child.id, username: child.username, display_name: child.display_name } });
  });

  r.post('/api/family/unlink', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    const childId = Number(req.body?.childId);
    if (!childId) return res.status(400).json({ error: 'missing_child' });
    const out = await unlinkChildFromParent({ parent_user_id: req.user.id, child_user_id: childId });
    res.json({ ok: out.unlinked });
  });

  // GET /api/family/me — list con của user (chỉ trả nếu canBeParent)
  r.get('/api/family/me', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    if (!canBeParent(req.user)) return res.json({ children: [], can_be_parent: false });
    const me = await getUserById(req.user.id);
    const meEff = me ? me.plan || 'free' : 'free';
    const children = await listChildrenOfParent(req.user.id);
    res.json({
      children, can_be_parent: true,
      parent_plan: meEff,
      message: meEff === 'free'
        ? 'Mua gói Plus/Pro để chia sẻ cho con đã link.'
        : `Gói ${USER_PLANS_B2C[meEff]?.name || meEff} đang chia sẻ cho ${children.length} con.`,
    });
  });

  console.log('[billing] routes mounted: /api/billing/{plans,me,subscribe} + /api/family/*');
}
