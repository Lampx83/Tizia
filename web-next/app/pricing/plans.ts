// Mirror dữ liệu gói từ public/js/plans.js — GIỮ NGUYÊN giá/quota. Đổi giá thì
// sửa cả server/contexts/billing/user-plans.js lẫn file này. Plan data là public.

export type UserPlan = {
  id: string;
  name: string;
  rank: number;
  price_month_vnd: number;
  price_year_vnd: number;
  ai_calls_day: number;
  domains_allow: string[] | '*';
};

export const USER_PLANS: Record<string, UserPlan> = {
  guest: { id: 'guest', name: 'Khách',    rank: 0, price_month_vnd: 0,      price_year_vnd: 0,       ai_calls_day: 0,   domains_allow: ['preschool', 'primary', 'secondary', 'highschool', 'pharmacy', 'it', 'language', 'driving'] },
  free:  { id: 'free',  name: 'Miễn phí', rank: 1, price_month_vnd: 0,      price_year_vnd: 0,       ai_calls_day: 20,  domains_allow: ['preschool', 'primary', 'secondary', 'highschool', 'pharmacy', 'it', 'language', 'driving'] },
  plus:  { id: 'plus',  name: 'Plus',     rank: 2, price_month_vnd: 79000,  price_year_vnd: 790000,  ai_calls_day: 50,  domains_allow: '*' },
  pro:   { id: 'pro',   name: 'Pro',      rank: 3, price_month_vnd: 149000, price_year_vnd: 1490000, ai_calls_day: 300, domains_allow: '*' },
};

export type Me = {
  plan?: string;
  plan_expires_at?: number | null;
  [k: string]: unknown;
} | null;

/** Plan có hiệu lực tại thời điểm gọi (xét hết hạn). null user → guest. */
export function effectivePlanId(me: Me): string {
  if (!me) return 'guest';
  const p = (me.plan as string) || 'free';
  if (p === 'guest' || p === 'free') return p;
  if (me.plan_expires_at && me.plan_expires_at < Date.now()) return 'free';
  return p;
}

/** Format giá: 79000 → "79.000đ". */
export function fmtVnd(n: number): string {
  return (Number(n) || 0).toLocaleString('vi-VN') + 'đ';
}
