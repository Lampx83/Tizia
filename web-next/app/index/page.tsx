import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import styles from './index.module.css';
import SolarStage from './SolarStage';
import HeroTutorButton from './HeroTutorButton';

// Trang chủ. absoluteTitle vì tiêu đề đã tự chứa thương hiệu — để template nối
// thêm "· Tizia" sẽ thành "Tizia … · Tizia". canonical LUÔN là "/" (route /index
// đã 301 về "/", xem next.config.mjs) để Google chỉ thấy một trang chủ duy nhất.
export const metadata: Metadata = pageMeta({
  absoluteTitle: 'Tizia — Vũ trụ giáo dục ảo 3D · VR · AI cho học sinh Việt Nam',
  title: 'Trang chủ',
  description:
    'Tizia (The Intelligent Zone for Interactive Academy) — vũ trụ giáo dục ảo do AI điều hành: trường Dược, CNTT, Kinh tế và phổ thông theo GDPT 2018, học bằng mô phỏng 2D · 3D · VR · Metaverse, có gia sư AI và bảng xếp hạng.',
  path: '/',
  keywords: [
    'học trực tuyến', 'giáo dục ảo', 'GDPT 2018', 'luyện thi',
    'mô phỏng 3D', 'VR giáo dục', 'gia sư AI', 'Tizia',
  ],
});

// ───────────────────────── Types (mirror API thật) ─────────────────────────
type Me = {
  id: number;
  username?: string;
  display_name: string;
  role: string;
  plan?: string;
  plan_expires_at?: number | null;
  enrolled_domain?: string | null;
  granted_domains?: string[];
};

type Rank = { name: string; icon: string; color: string; levels_to_next: number; next: { name: string; icon: string } | null };
type Quest = { kind: string; label: string; progress: number; target: number };
type Dashboard = {
  ok: boolean;
  personal: { level: number; xp_into_level: number; xp_span: number; xp_pct: number; rank: Rank; title: string };
  engagement: { streak: number; quests: Quest[]; quests_done: number; quests_total: number } | null;
  league: { tier: { icon: string; label: string }; my_rank: number | null } | null;
  wallet: { coins: number; achievements: number };
  skills: { earned: number };
  recommendation: { action: string; subject_name: string; emoji: string; reason: string; url: string } | null;
};

// ───────────────────────── Domain metadata (mirror public/js/engine/domain.js) ─────────────────────────
type Domain = {
  id: string; name: string; shortName: string; icon: string; tagline: string;
  accent: string; status: 'ready' | 'preview' | 'locked'; moduleCount?: number; level?: string;
};

const DOMAIN_LEVELS: Record<string, { label: string; icon: string; desc: string }> = {
  school: { label: 'Phổ thông', icon: '🎒', desc: 'Tiểu học · THCS · THPT' },
  he: { label: 'Đại học & Cao đẳng', icon: '🎓', desc: 'Higher Education — đào tạo nghề chuyên sâu' },
};

const DOMAIN_META: Domain[] = [
  { id: 'pharmacy', name: 'Trường Dược', shortName: 'Dược', icon: '💊', tagline: '5 năm · 102 module · Hoá hữu cơ → OSCE · hỗ trợ 2D/3D/VR/Metaverse', accent: '#fbbf24', status: 'ready', moduleCount: 102 },
  { id: 'it', name: 'Trường Công nghệ thông tin', shortName: 'CNTT', icon: '💻', tagline: '4 năm · Cử nhân CNTT · Python → ML · CTF · Hackathon · Cloud', accent: '#22c55e', status: 'preview', moduleCount: 35 },
  { id: 'preschool', name: 'Trường Mầm non', shortName: 'Mầm non', icon: '🧸', tagline: '3–5 tuổi (Mầm/Chồi/Lá) · đếm số · màu sắc · hình khối · học bằng hình ảnh vui', accent: '#f472b6', status: 'preview', moduleCount: 3 },
  { id: 'primary', name: 'Trường Tiểu học', shortName: 'Tiểu học', icon: '🎒', tagline: 'Lớp 1–5 · Toán (đã có) · Tiếng Việt · TN&XH · Tiếng Anh · học mà chơi', accent: '#f59e0b', status: 'preview', moduleCount: 5 },
  { id: 'secondary', name: 'Trường Trung học cơ sở', shortName: 'THCS', icon: '📐', tagline: 'Lớp 6–9 · Toán (đã có) · Ngữ văn (đã có) · Anh · KHTN · Sử-Địa · luyện thi vào 10', accent: '#10b981', status: 'preview', moduleCount: 8 },
  { id: 'highschool', name: 'Trường Trung học phổ thông', shortName: 'THPT', icon: '🏫', tagline: 'Lớp 10–12 · phân ban KHTN/KHXH · luyện thi tốt nghiệp THPT & ĐH', accent: '#6366f1', status: 'preview', moduleCount: 30 },
  { id: 'economics', name: 'Trường Kinh tế', shortName: 'Kinh tế', icon: '📉', tagline: 'Kinh tế Vi mô/Vĩ mô · Kinh tế lượng · chính sách công', accent: '#0ea5e9', status: 'locked' },
  { id: 'business', name: 'Trường Kinh doanh', shortName: 'Kinh doanh', icon: '📈', tagline: 'Quản trị · Marketing · Khởi nghiệp · Chiến lược · vận hành doanh nghiệp', accent: '#f97316', status: 'locked' },
  { id: 'finance', name: 'Trường Tài chính – Ngân hàng', shortName: 'Tài chính', icon: '🏦', tagline: 'Tài chính DN · Đầu tư · Ngân hàng · TTCK · FinTech', accent: '#16a34a', status: 'locked' },
  { id: 'medicine', name: 'Trường Y', shortName: 'Y', icon: '⚕️', tagline: 'Y đa khoa · Giải phẫu · Nội/Ngoại/Sản/Nhi · lâm sàng · OSCE', accent: '#ef4444', status: 'locked' },
  { id: 'nursing', name: 'Trường Điều dưỡng', shortName: 'Điều dưỡng', icon: '🩺', tagline: 'Chăm sóc · kỹ thuật điều dưỡng · cấp cứu · quản lý ca bệnh', accent: '#ec4899', status: 'locked' },
  { id: 'law', name: 'Trường Luật', shortName: 'Luật', icon: '⚖️', tagline: 'Luật dân sự · hình sự · kinh tế · quốc tế · tranh tụng mô phỏng', accent: '#64748b', status: 'locked' },
  { id: 'education', name: 'Trường Sư phạm', shortName: 'Sư phạm', icon: '🎓', tagline: 'Khoa học giáo dục · phương pháp giảng dạy · thực tập sư phạm', accent: '#a855f7', status: 'locked' },
  { id: 'engineering', name: 'Trường Kỹ thuật – Công nghệ', shortName: 'Kỹ thuật', icon: '⚙️', tagline: 'Cơ khí · Điện – Điện tử · Tự động hoá · Robot · CAD/CAM', accent: '#0891b2', status: 'locked' },
  { id: 'architecture', name: 'Trường Kiến trúc – Xây dựng', shortName: 'Kiến trúc', icon: '🏛️', tagline: 'Thiết kế kiến trúc · kết cấu · BIM · quy hoạch đô thị', accent: '#d97706', status: 'locked' },
  { id: 'language', name: 'Trường Ngoại ngữ', shortName: 'Ngoại ngữ', icon: '🗣️', tagline: 'Anh · Trung · Nhật · Hàn · từ vựng · phát âm AI · IELTS/TOEFL/HSK', accent: '#0ea5e9', status: 'preview', moduleCount: 4 },
  { id: 'agriculture', name: 'Trường Nông nghiệp', shortName: 'Nông nghiệp', icon: '🌾', tagline: 'Trồng trọt · chăn nuôi · thú y · công nghệ thực phẩm', accent: '#84cc16', status: 'locked' },
  { id: 'tourism', name: 'Trường Du lịch – Khách sạn', shortName: 'Du lịch', icon: '🏖️', tagline: 'Quản trị khách sạn · lữ hành · sự kiện · ẩm thực', accent: '#14b8a6', status: 'locked' },
  { id: 'arts', name: 'Trường Mỹ thuật – Thiết kế', shortName: 'Mỹ thuật', icon: '🎨', tagline: 'Đồ hoạ · UX/UI · thời trang · nội thất · multimedia', accent: '#f472b6', status: 'locked' },
  { id: 'media', name: 'Trường Báo chí – Truyền thông', shortName: 'Truyền thông', icon: '📰', tagline: 'Báo chí · PR · quảng cáo · sản xuất nội dung số', accent: '#fb7185', status: 'locked' },
  { id: 'social-sciences', name: 'Trường Khoa học Xã hội & Nhân văn', shortName: 'KHXH&NV', icon: '📚', tagline: 'Tâm lý · xã hội học · lịch sử · triết học · công tác xã hội', accent: '#8b5cf6', status: 'locked' },
  { id: 'natural-sciences', name: 'Trường Khoa học Tự nhiên', shortName: 'KHTN', icon: '🔬', tagline: 'Toán · Lý · Hoá · Sinh · Khoa học dữ liệu', accent: '#0ea5e9', status: 'locked' },
  { id: 'logistics', name: 'Trường Logistics – Chuỗi cung ứng', shortName: 'Logistics', icon: '🚚', tagline: 'Quản lý kho · vận tải · xuất nhập khẩu · tối ưu chuỗi', accent: '#eab308', status: 'locked' },
  { id: 'public-admin', name: 'Trường Quản trị Nhà nước', shortName: 'Hành chính', icon: '🏢', tagline: 'Hành chính công · chính sách · quản lý đô thị · e-government', accent: '#94a3b8', status: 'locked' },
  { id: 'driving', name: 'Trường Lái xe', shortName: 'Lái xe', icon: '🚗', tagline: 'B1/B2/C/D · 600 câu lý thuyết · biển báo · sa hình · mô phỏng cabin', accent: '#dc2626', status: 'preview', moduleCount: 3 },
];

const K12_IDS = new Set(['preschool', 'primary', 'secondary', 'highschool']);
for (const d of DOMAIN_META) d.level = K12_IDS.has(d.id) ? 'school' : 'he';

// Plan gating — mirror public/js/plans.js + domain.js
const PLAN_RANK: Record<string, number> = { guest: 0, free: 1, plus: 2, pro: 3 };
const GUEST_ALLOW = new Set(['preschool', 'primary', 'secondary', 'highschool', 'pharmacy', 'it', 'language', 'driving']);
// guest & free chia sẻ cùng domains_allow → getRequiredPlan trả 'guest' cho các trường này, 'plus' cho phần còn lại.
function getRequiredPlan(id: string): string { return GUEST_ALLOW.has(id) ? 'guest' : 'plus'; }
function effectivePlanId(me: Me | null): string {
  if (!me) return 'guest';
  const p = me.plan || 'free';
  if (p === 'guest' || p === 'free') return p;
  if (me.plan_expires_at && me.plan_expires_at < Date.now()) return 'free';
  return p;
}
function meetsPlan(userPlanId: string, requiredPlanId: string): boolean {
  return (PLAN_RANK[userPlanId] ?? 0) >= (PLAN_RANK[requiredPlanId] ?? 0);
}
function hasDomainGrant(id: string, me: Me | null): boolean {
  return !!me && Array.isArray(me.granted_domains) && me.granted_domains.includes(id);
}
function canEnterDomain(id: string, me: Me | null): boolean {
  if (hasDomainGrant(id, me)) return true;
  return meetsPlan(effectivePlanId(me), getRequiredPlan(id));
}

const STATUS_LABEL: Record<string, string> = { ready: '✓ Sẵn sàng', preview: 'Preview', locked: '🔒 Sắp mở' };
const STATUS_ORDER: Record<string, number> = { ready: 0, preview: 1, locked: 2 };

// ───────────────────────── Feature marquee ─────────────────────────
type Feat = { href: string; icon: string; label: string; tint?: string };
const FEATURES: Feat[] = [
  { href: '/assets', icon: '🧱', label: 'Thư viện Asset 3D' },
  { href: '/cast', icon: '📺', label: 'Cast trình chiếu' },
  { href: '/patient-sim', icon: '🩺', label: 'Mô phỏng bệnh nhân VN', tint: '220,38,38' },
  { href: '/nha-thuoc-3d', icon: '💊', label: 'Nhà thuốc 3D GPP', tint: '13,148,136' },
  { href: '/history-vn', icon: '👤', label: 'Gặp danh nhân VN', tint: '14,165,233' },
  { href: '/negotiation', icon: '🤝', label: 'Đàm phán Game Theory', tint: '245,158,11' },
  { href: '/teacher-live', icon: '🎛', label: 'GV điều khiển live', tint: '139,92,246' },
  { href: '/pdf-tutor', icon: '📖', label: 'Học SGK bằng AI', tint: '99,102,241' },
  { href: '/lesson-builder', icon: '✏️', label: 'Soạn bài no-code', tint: '16,185,129' },
  { href: '/marketplace', icon: '📚', label: 'Chợ bài giảng', tint: '236,72,153' },
  { href: '/voice-demo', icon: '🎙', label: 'Spatial VoIP', tint: '6,182,212' },
  { href: '/math-fun', icon: '🎮', label: 'Toán vui (lớp 2 & 6)', tint: '251,191,36' },
  { href: '/nang-luc', icon: '🎯', label: 'Năng lực của em', tint: '251,191,36' },
  { href: '/cay-tri-thuc', icon: '🌳', label: 'Cây Tri Thức', tint: '34,197,94' },
  { href: '/bao-so-hoc', icon: '⛈️', label: 'Bão Số Học', tint: '56,189,248' },
  { href: '/ban-do-vn', icon: '🗺️', label: 'Bản đồ Tri thức VN', tint: '239,68,68' },
  { href: '/lab-hoa-ao', icon: '🧪', label: 'Lab Hoá Học Ảo', tint: '124,58,237' },
  { href: '/do-chu-ghep-van', icon: '🔤', label: 'Đố Chữ Ghép Vần', tint: '236,72,153' },
  { href: '/pet-tri-thuc', icon: '🐣', label: 'Pet Tri Thức', tint: '250,204,21' },
  { href: '/bang-phong-than', icon: '🏆', label: 'Bảng Phong Thần', tint: '253,224,71' },
  { href: '/pixel-art-studio', icon: '🎨', label: 'Pixel Art Studio', tint: '139,92,246' },
  { href: '/code-quest', icon: '🤖', label: 'Code Quest (kéo thả)', tint: '59,130,246' },
];

const KIND_ICO: Record<string, string> = { lesson: '📘', quiz: '❓', minigame: '🎮', code: '💻' };
const KIND_HREF: Record<string, string> = { lesson: '/space', quiz: '/space', minigame: '/space#mini-games', code: '/lap-trinh-game' };
const KIND_CTA: Record<string, string> = { lesson: 'Học bài →', quiz: 'Làm bài →', minigame: 'Chơi →', code: 'Code →' };

// ───────────────────────── Page ─────────────────────────
export default async function IndexPage() {
  const [meRes, dashRes] = await Promise.all([
    tiziaFetch<{ user: Me | null }>('/api/auth/me'),
    tiziaFetch<Dashboard>('/api/dashboard/me'),
  ]);
  const me = meRes.data?.user ?? null;
  const isGuest = !me;
  const dash = dashRes.ok && dashRes.data?.ok ? dashRes.data : null;

  const greet = me ? (
    <>
      {me.role === 'teacher' ? 'Chào Thầy/Cô' : 'Chào'} <b>{me.display_name}</b> <span className={styles.wave}>👋</span>
    </>
  ) : (
    <>
      Chào <b>khách</b> ghé Tizia <span className={styles.wave}>👋</span>
    </>
  );

  const openCount = DOMAIN_META.filter((d) => d.status !== 'locked').length;
  const planLine = isGuest
    ? 'bạn đang ở chế độ khách — vào trường Mầm non, đăng nhập miễn phí để mở Tiểu học'
    : `chào ${me?.display_name || me?.username || ''}, chúc một buổi học vui`;
  const schoolsHint = `${openCount}/${DOMAIN_META.length} trường đã mở · ${planLine}`;

  const CLUSTER_ORDER = ['school', 'he'];

  return (
    <div className={styles.page}>
      {/* ============ HERO ============ */}
      <section className={styles.hero}>
        <div className={`${styles.aurora} ${styles.a1}`} />
        <div className={`${styles.aurora} ${styles.a2}`} />
        <div className={`${styles.aurora} ${styles.a3}`} />
        <div className={styles.shoot} />
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <h1 className={styles.greet}>{greet}</h1>
            <p className={styles.tagline}>
              Vũ trụ giáo dục <b>do AI điều hành</b> — học liệu, môi trường thực hành và <b>tự cải tiến mỗi ngày</b>.
            </p>
            <div className={styles.ctaRow}>
              <a className={`${styles.cta} ${styles.ctaPrimary}`} href="#schools">Vào trường của bạn</a>
              <HeroTutorButton />
              <Link className={`${styles.cta} ${styles.ctaGhost}`} href="/kham-pha">🌌 Toàn cảnh Tizia</Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <SolarStage />
          </div>
        </div>
      </section>

      {/* ============ DASHBOARD (chỉ khi /api/dashboard/me ok) ============ */}
      {dash && (
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h2>🎮 Bảng điều khiển</h2>
            <span className="hint">Tiếp tục hành trình của bạn</span>
          </div>
          {(() => {
            const p = dash.personal;
            const streak = dash.engagement?.streak || 0;
            const isRisk = streak > 0 && streak < 30;
            return (
              <div className={styles.heroCard} style={{ ['--rank-color' as string]: p.rank.color }}>
                <div className={styles.heroTop}>
                  <div className={styles.heroAvatarWrap} data-rank={p.rank.icon}>🐣</div>
                  <div className={styles.heroIdentity}>
                    <div className={styles.heroRankRow}>
                      <span className={styles.heroRankBadge}>{p.rank.icon} {p.rank.name}</span>
                      <span>{p.title}</span>
                    </div>
                    <div className={styles.heroCardTitle}>Lv.{p.level} · {p.xp_into_level}/{p.xp_span} XP</div>
                    <div className={styles.heroSubtitle}>
                      {p.rank.next ? (
                        <>→ {p.rank.next.icon} {p.rank.next.name} <span style={{ opacity: 0.7 }}>(còn {p.rank.levels_to_next} cấp)</span></>
                      ) : (
                        <span style={{ color: '#fde68a' }}>👑 Đã đạt hạng cao nhất</span>
                      )}
                    </div>
                  </div>
                  {streak > 0 && (
                    <div
                      className={`${styles.heroStreakBadge} ${isRisk ? styles.risk : ''}`}
                      title={isRisk ? 'Học 1 bài hôm nay để giữ chuỗi!' : 'Chuỗi học liên tục'}
                    >
                      🔥 <span className={styles.hsNum}>{streak}</span> ngày
                    </div>
                  )}
                </div>

                <div className={styles.heroXpBlock}>
                  <div className={styles.heroXpHead}>
                    <span><b>Cấp {p.level}</b> → Cấp {p.level + 1}</span>
                    <span className={styles.hxNext}>{p.xp_pct}%</span>
                  </div>
                  <div className={styles.heroXpBar}><i style={{ width: `${p.xp_pct}%` }} /></div>
                </div>

                <div className={styles.heroStats}>
                  <div className={`${styles.heroStat} ${styles.coins}`} title="Coin tích lũy">
                    <div className={styles.hsIcon}>🪙</div>
                    <div className={styles.hsText}><span className={styles.hsVal}>{dash.wallet.coins}</span><span className={styles.hsLabel}>coin</span></div>
                  </div>
                  <div className={`${styles.heroStat} ${styles.skills}`} title="Kỹ năng đã đạt">
                    <div className={styles.hsIcon}>🎯</div>
                    <div className={styles.hsText}><span className={styles.hsVal}>{dash.skills.earned}</span><span className={styles.hsLabel}>kỹ năng</span></div>
                  </div>
                  <div className={`${styles.heroStat} ${styles.badges}`} title="Huy hiệu sưu tầm">
                    <div className={styles.hsIcon}>🏆</div>
                    <div className={styles.hsText}><span className={styles.hsVal}>{dash.wallet.achievements}</span><span className={styles.hsLabel}>huy hiệu</span></div>
                  </div>
                  {dash.league && (
                    <div className={`${styles.heroStat} ${styles.league}`} title="Hạng tuần này">
                      <div className={styles.hsIcon}>{dash.league.tier.icon}</div>
                      <div className={styles.hsText}><span className={styles.hsVal}>#{dash.league.my_rank || '-'}</span><span className={styles.hsLabel}>{dash.league.tier.label}</span></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          <div className={styles.dashGrid}>
            {dash.recommendation && (
              <a href={dash.recommendation.url} className={styles.continueCard}>
                <div style={{ fontSize: 42 }}>{dash.recommendation.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: '#cbd5e1', letterSpacing: '.6px', textTransform: 'uppercase', fontWeight: 700 }}>{dash.recommendation.action}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, margin: '3px 0', color: '#fde68a' }}>{dash.recommendation.subject_name}</div>
                  <div style={{ fontSize: 12.5, color: '#cbd5e1' }}>{dash.recommendation.reason}</div>
                </div>
                <div style={{ background: '#fbbf24', color: '#1e293b', padding: '10px 16px', borderRadius: 12, fontWeight: 800, fontSize: 13, whiteSpace: 'nowrap' }}>Học ngay →</div>
              </a>
            )}
            {dash.engagement && dash.engagement.quests.length > 0 && (
              <div className={styles.questsCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>📋 Nhiệm vụ hôm nay</div>
                  <div style={{ color: '#86efac', fontSize: 13, fontWeight: 700 }}>{dash.engagement.quests_done || 0}/{dash.engagement.quests_total || 3}</div>
                </div>
                {dash.engagement.quests.map((q, idx) => {
                  const pct = Math.min(100, Math.round((q.progress / q.target) * 100));
                  const done = q.progress >= q.target;
                  const href = KIND_HREF[q.kind] || '/space';
                  const cta = KIND_CTA[q.kind] || 'Đi học →';
                  return (
                    <a key={idx} href={href} className={styles.questRow}>
                      <span style={{ fontSize: 18 }}>{done ? '✅' : KIND_ICO[q.kind] || '⭐'}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{q.label}</div>
                        <div style={{ height: 4, background: 'rgba(255,255,255,.08)', borderRadius: 3, overflow: 'hidden', marginTop: 4 }}>
                          <div style={{ height: '100%', background: 'linear-gradient(90deg,#22c55e,#4ade80)', width: `${pct}%` }} />
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: done ? '#86efac' : '#cbd5e1', fontWeight: 700, whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                        <span>{q.progress}/{q.target}</span>
                        {!done && <span style={{ fontSize: 11, color: '#fbbf24' }}>{cta}</span>}
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============ GUEST BANNER ============ */}
      {isGuest && (
        <div className={styles.guestBanner}>
          <div className={styles.gbInner}>
            <span className={styles.gbIcon}>🧸</span>
            <div className={styles.gbText}>
              <b>Bạn đang dùng thử ở chế độ khách.</b> Vào được trường <b>Mầm non</b> — các trường khác cần đăng nhập để mở khoá.
            </div>
            <a className={styles.gbCta} href="/login?return=%2F">Đăng nhập</a>
            <a className={styles.gbAlt} href="/register">Tạo tài khoản</a>
          </div>
        </div>
      )}

      {/* ============ SCHOOL SELECTOR ============ */}
      <section className={styles.section} id="schools" style={{ scrollMarginTop: 64 }}>
        <div className={styles.sectionTitle}>
          <h2>🏫 Chọn trường</h2>
          <span className="hint">{schoolsHint}</span>
        </div>
        {CLUSTER_ORDER.map((lvl) => {
          const meta = DOMAIN_LEVELS[lvl];
          const items = DOMAIN_META.filter((d) => d.level === lvl).sort((a, b) => (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9));
          if (!items.length) return null;
          const opened = items.filter((d) => d.status !== 'locked').length;
          return (
            <div key={lvl} className={styles.schoolCluster}>
              <div className={styles.clusterHead}>
                <span className={styles.chIcon}>{meta.icon}</span>
                <span className={styles.chLabel}>{meta.label}</span>
                <span className={styles.chDesc}>{meta.desc}</span>
                <span className={styles.chCount}>{opened}/{items.length} mở</span>
              </div>
              <div className={styles.schoolGrid}>
                {items.map((d) => (
                  <SchoolCard key={d.id} d={d} me={me} isGuest={isGuest} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ============ KHÁM PHÁ THÊM (marquee) ============ */}
      <section className={styles.section} style={{ marginBottom: 20 }}>
        <div className={styles.sectionTitle}>
          <h2>✨ Khám phá thêm</h2>
          <span className="hint">Công cụ &amp; trải nghiệm xuyên suốt Tizia</span>
        </div>
        <div className={styles.featureStrip} aria-label="Lối tắt tính năng">
          <div className={styles.featureTrack}>
            {[...FEATURES, ...FEATURES].map((f, i) => (
              <a
                key={i}
                className={styles.pill}
                href={f.href}
                style={f.tint ? { background: `rgba(${f.tint},0.15)`, borderColor: `rgba(${f.tint},0.4)` } : undefined}
              >
                {f.icon} {f.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ───────────────────────── School card (gating mirror) ─────────────────────────
function SchoolCard({ d, me, isGuest }: { d: Domain; me: Me | null; isGuest: boolean }) {
  const isComingSoon = d.status === 'locked';
  const enterable = !isComingSoon && canEnterDomain(d.id, me);
  const required = getRequiredPlan(d.id);
  const needLogin = isGuest && !enterable && required === 'free';
  const needUpgrade = !isGuest && !enterable && !isComingSoon;
  const guestLocked = isGuest && !enterable && !needLogin;

  const meta = isComingSoon ? <span className={styles.scMetaSub}>Đang phát triển</span> : <>{d.shortName} · {d.moduleCount} module</>;

  let enrollTag: React.ReactNode = null;
  if (me && !isGuest && me.enrolled_domain && !isComingSoon) {
    enrollTag = me.enrolled_domain === d.id
      ? <span className={styles.scPill} style={{ background: '#16a34a', color: '#fff' }}>🎓 Đang học</span>
      : <span className={styles.scPill} style={{ background: '#64748b', color: '#fff' }}>👀 Tham quan</span>;
  }

  let cta: string;
  let href: string | null;
  const cls = [styles.schoolCard];
  if (isComingSoon) {
    cta = '🔒 Sắp mở'; href = null; cls.push(styles.locked);
  } else if (needLogin) {
    cta = '🔐 Đăng nhập để vào';
    href = `/login?return=${encodeURIComponent('/school?domain=' + d.id)}`;
    cls.push(styles.locked, styles.guestLocked);
  } else if (needUpgrade || guestLocked) {
    cta = '🔒 Tạm chưa mở';
    href = `/pricing?want=${encodeURIComponent(required)}&domain=${encodeURIComponent(d.id)}`;
    cls.push(styles.locked, styles.planLocked);
  } else {
    cta = '→ Vào trường';
    href = `/school?domain=${encodeURIComponent(d.id)}`;
  }

  const inner = (
    <>
      <div className={styles.scHead}>
        <div className={styles.scIcon}>{d.icon}</div>
        <div>
          <div className={styles.scName}>{d.name}</div>
          <div className={styles.scShort}>{meta}</div>
        </div>
      </div>
      <div className={styles.scTagline}>{d.tagline}</div>
      <div className={styles.scMeta}>
        <span className={`${styles.scPill} ${styles[d.status]}`}>{STATUS_LABEL[d.status] || d.status}</span>
        {needLogin && <span className={`${styles.scPill} ${styles.locked}`}>🔐 Cần đăng nhập</span>}
        {enrollTag}
      </div>
      <div className={styles.scCta}>{cta}</div>
    </>
  );

  const style = { ['--sc-color' as string]: d.accent } as React.CSSProperties;
  return href
    ? <a className={cls.join(' ')} href={href} style={style}>{inner}</a>
    : <div className={cls.join(' ')} aria-disabled="true" title="Trường này đang được xây dựng — sắp mở" style={style}>{inner}</div>;
}
