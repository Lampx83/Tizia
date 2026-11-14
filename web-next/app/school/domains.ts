// Mirror nhẹ của public/js/engine/domain.js + public/js/plans.js — chỉ phần cần
// cho trang trường (gate + tên/icon). GIỮ NGUYÊN dữ liệu gốc để hành vi khớp.

export type DomainMeta = {
  id: string;
  name: string;
  icon: string;
  status: 'ready' | 'preview' | 'locked';
  enabled?: boolean;
};

// Nguồn: public/js/engine/domain.js:49 (DOMAIN_META). Chỉ giữ id/name/icon/status
// (+ enabled) — đủ để xét isDomainOpen + hiển thị tiêu đề.
export const DOMAIN_META: DomainMeta[] = [
  { id: 'pharmacy', name: 'Trường Dược', icon: '💊', status: 'ready' },
  { id: 'it', name: 'Trường Công nghệ thông tin', icon: '💻', status: 'preview' },
  { id: 'preschool', name: 'Trường Mầm non', icon: '🧸', status: 'preview' },
  { id: 'primary', name: 'Trường Tiểu học', icon: '🎒', status: 'preview' },
  { id: 'secondary', name: 'Trường Trung học cơ sở', icon: '📐', status: 'preview' },
  { id: 'highschool', name: 'Trường Trung học phổ thông', icon: '🏫', status: 'preview' },
  { id: 'economics', name: 'Trường Kinh tế', icon: '📉', status: 'locked', enabled: false },
  { id: 'business', name: 'Trường Kinh doanh', icon: '📈', status: 'locked' },
  { id: 'finance', name: 'Trường Tài chính – Ngân hàng', icon: '🏦', status: 'locked' },
  { id: 'medicine', name: 'Trường Y', icon: '⚕️', status: 'locked' },
  { id: 'nursing', name: 'Trường Điều dưỡng', icon: '🩺', status: 'locked' },
  { id: 'law', name: 'Trường Luật', icon: '⚖️', status: 'locked' },
  { id: 'education', name: 'Trường Sư phạm', icon: '🎓', status: 'locked' },
  { id: 'engineering', name: 'Trường Kỹ thuật – Công nghệ', icon: '⚙️', status: 'locked' },
  { id: 'architecture', name: 'Trường Kiến trúc – Xây dựng', icon: '🏛️', status: 'locked' },
  { id: 'language', name: 'Trường Ngoại ngữ', icon: '🗣️', status: 'preview' },
  { id: 'agriculture', name: 'Trường Nông nghiệp', icon: '🌾', status: 'locked' },
  { id: 'tourism', name: 'Trường Du lịch – Khách sạn', icon: '🏖️', status: 'locked' },
  { id: 'arts', name: 'Trường Mỹ thuật – Thiết kế', icon: '🎨', status: 'locked' },
  { id: 'media', name: 'Trường Báo chí – Truyền thông', icon: '📰', status: 'locked' },
  { id: 'social-sciences', name: 'Trường Khoa học Xã hội & Nhân văn', icon: '📚', status: 'locked' },
  { id: 'natural-sciences', name: 'Trường Khoa học Tự nhiên', icon: '🔬', status: 'locked' },
  { id: 'logistics', name: 'Trường Logistics – Chuỗi cung ứng', icon: '🚚', status: 'locked' },
  { id: 'public-admin', name: 'Trường Quản trị Nhà nước', icon: '🏢', status: 'locked' },
  { id: 'driving', name: 'Trường Lái xe', icon: '🚗', status: 'preview' },
];

const META_BY_ID = new Map(DOMAIN_META.map((d) => [d.id, d]));

// public/js/engine/domain.js:138 — !!DOMAIN_REGISTRY[id] && status !== 'locked'.
// Ở đây coi mọi domain có trong DOMAIN_META là "registered"; loại theo status.
export function isDomainOpen(id: string): boolean {
  const meta = META_BY_ID.get(id);
  return !!meta && meta.status !== 'locked';
}

// ── Plans (mirror public/js/plans.js) ──
type PlanId = 'guest' | 'free' | 'plus' | 'pro';

const PLAN_RANK: Record<PlanId, number> = { guest: 0, free: 1, plus: 2, pro: 3 };

const GUEST_DOMAINS = new Set([
  'preschool', 'primary', 'secondary', 'highschool', 'pharmacy', 'it', 'language', 'driving',
]);
// guest + free có cùng domains_allow trong plans.js.
const FREE_DOMAINS = GUEST_DOMAINS;

// public/js/plans.js:31
export function getRequiredPlan(domainId: string): PlanId {
  if (GUEST_DOMAINS.has(domainId)) return 'guest';
  if (FREE_DOMAINS.has(domainId)) return 'free';
  return 'plus';
}

export type SchoolUser = {
  role: string;
  effective_plan?: string | null;
  enrolled_domain?: string | null;
  granted_domains?: string[] | null;
};

// effective_plan đã do BE tính (xét hết hạn + kế thừa gói PH). null/undefined → guest.
function effectivePlanId(me: SchoolUser | null): PlanId {
  if (!me) return 'guest';
  const p = (me.effective_plan || 'free') as PlanId;
  return p in PLAN_RANK ? p : 'free';
}

function meetsPlan(userPlan: PlanId, requiredPlan: PlanId): boolean {
  return PLAN_RANK[userPlan] >= PLAN_RANK[requiredPlan];
}

function hasDomainGrant(id: string, me: SchoolUser | null): boolean {
  return !!me && Array.isArray(me.granted_domains) && me.granted_domains.includes(id);
}

// public/js/engine/domain.js:178
export function canEnterDomain(id: string, me: SchoolUser | null): boolean {
  if (hasDomainGrant(id, me)) return true;
  return meetsPlan(effectivePlanId(me), getRequiredPlan(id));
}

// public/school.html:104 — NAMES (tên + icon ngắn cho 8 trường đang mở).
const NAMES: Record<string, { name: string; icon: string }> = {
  pharmacy: { name: 'Trường Dược', icon: '💊' },
  it: { name: 'Trường Công nghệ thông tin', icon: '💻' },
  preschool: { name: 'Trường Mầm non', icon: '🧸' },
  primary: { name: 'Trường Tiểu học', icon: '🎒' },
  secondary: { name: 'Trường Trung học cơ sở', icon: '📐' },
  highschool: { name: 'Trường Trung học phổ thông', icon: '🏫' },
  language: { name: 'Trường Ngoại ngữ', icon: '🗣️' },
  driving: { name: 'Trường Lái xe', icon: '🚗' },
};

export function domainMeta(id: string): { name: string; icon: string } {
  return NAMES[id] || { name: 'Trường ảo', icon: '🏫' };
}
